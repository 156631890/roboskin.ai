"""Run only the pinned synthetic starter-kit demo; no hardware or actuator commands."""
import argparse
import json
import math
import os
from pathlib import Path
import platform
import signal
import subprocess
import time

import rclpy
from rclpy.qos import qos_profile_sensor_data
from rclpy.serialization import deserialize_message
import rosbag2_py
from roboskin_tactile_msgs.msg import TactileArray


def stamp(message):
    return message.header.stamp.sec * 1_000_000_000 + message.header.stamp.nanosec


def validate(message):
    assert (message.rows, message.columns) == (4, 4)
    assert list(message.channels) == ['pressure', 'shear_x', 'shear_y']
    assert list(message.units) == ['normalized'] * 3
    assert len(message.values) == 48 and list(message.valid) == [1] * 16
    assert all(math.isfinite(value) for value in message.values)
    assert all(0 <= value <= 1 for value in message.values[:16])
    assert message.header.frame_id == 'demo_tactile_surface'
    assert message.sensor_id == 'demo_surface'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--workspace', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    bag = output / 'tactile_demo'
    assert not bag.exists(), 'Use a fresh output directory; recordings are never overwritten.'
    kit = args.workspace / 'src/ros2-tactile-starter-kit'
    qos = kit / 'src/roboskin_tactile_demo/config/rosbag2_qos_overrides.yaml'
    processes = []
    logs = []

    def start(name, command):
        log = (output / f'{name}.log').open('w')
        logs.append(log)
        process = subprocess.Popen(command, stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
        processes.append(process)
        return process

    def stop(process):
        if process.poll() is None:
            os.killpg(process.pid, signal.SIGINT)
            try:
                process.wait(timeout=15)
            except subprocess.TimeoutExpired:
                os.killpg(process.pid, signal.SIGKILL)
                process.wait(timeout=5)
                raise RuntimeError('A ROS process failed to stop cleanly')

    rclpy.init()
    node = rclpy.create_node('roboskin_tutorial_verifier')
    received = []

    def on_message(message):
        validate(message)
        received.append((message, time.time_ns()))

    subscription = node.create_subscription(TactileArray, '/tactile/array', on_message, qos_profile_sensor_data)

    def collect(count, timeout=25):
        deadline = time.monotonic() + timeout
        while len(received) < count and time.monotonic() < deadline:
            rclpy.spin_once(node, timeout_sec=0.1)
        assert len(received) >= count, f'Only received {len(received)}/{count} frames'

    try:
        publisher = start('live', ['ros2', 'launch', 'roboskin_tactile_demo', 'demo.launch.py', 'rows:=4', 'columns:=4', 'publish_rate_hz:=10.0'])
        collect(10)
        recorder = start('record', ['ros2', 'bag', 'record', '--topics', '/tactile/array', '--qos-profile-overrides-path', str(qos), '-o', str(bag)])
        collect(70)
        with (output / 'message.yaml').open('w') as stream:
            subprocess.run(['ros2', 'topic', 'echo', '/tactile/array', '--once', '--qos-reliability', 'best_effort', '--qos-durability', 'volatile'], stdout=stream, check=True, timeout=20)
        stop(recorder)
        stop(publisher)
        live = list(received)
        assert all(stamp(b[0]) > stamp(a[0]) for a, b in zip(live, live[1:]))
        with (output / 'bag-info.txt').open('w') as stream:
            subprocess.run(['ros2', 'bag', 'info', str(bag)], stdout=stream, check=True, timeout=20)
        reader = rosbag2_py.SequentialReader()
        reader.open(rosbag2_py.StorageOptions(uri=str(bag), storage_id=''), rosbag2_py.ConverterOptions('', ''))
        recorded = {}
        while reader.has_next():
            topic, payload, receive_time = reader.read_next()
            assert topic == '/tactile/array'
            message = deserialize_message(payload, TactileArray)
            validate(message)
            recorded[stamp(message)] = list(message.values)
        assert len(recorded) >= 20
        del reader
        # Destroy the live subscriber to discard its pending DDS history.
        node.destroy_subscription(subscription)
        deadline = time.monotonic() + 10
        while node.count_publishers('/tactile/array') and time.monotonic() < deadline:
            rclpy.spin_once(node, timeout_sec=0.1)
        assert node.count_publishers('/tactile/array') == 0, 'Live publishing must stop before replay'
        received.clear()
        subscription = node.create_subscription(TactileArray, '/tactile/array', on_message, qos_profile_sensor_data)
        monitor = start('replay-monitor', ['ros2', 'run', 'roboskin_tactile_demo', 'contract_monitor'])
        time.sleep(2)
        player = start('replay', ['ros2', 'bag', 'play', str(bag), '--qos-profile-overrides-path', str(qos)])
        collect(20)
        stop(player)
        stop(monitor)
        assert all(stamp(message) in recorded and list(message.values) == recorded[stamp(message)] for message, _ in received)
        assert all(arrival > stamp(message) for message, arrival in received)
        for log in logs:
            log.flush()
        assert 'pressure mean=' in (output / 'live.log').read_text()
        assert 'pressure mean=' in (output / 'replay-monitor.log').read_text()
        report = {
            'verified_at_utc': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
            'starter_kit_commit': subprocess.check_output(['git', '-C', str(kit), 'rev-parse', 'HEAD'], text=True).strip(),
            'ros_distro': os.environ.get('ROS_DISTRO'), 'python': platform.python_version(),
            'os_release': Path('/etc/os-release').read_text(),
            'workflow_run': os.environ.get('GITHUB_RUN_ID'),
            'live_frames_checked': len(live), 'recorded_frames_checked': len(recorded),
            'replayed_frames_checked': len(received), 'shape': [4, 4, 3],
            'units': ['normalized'] * 3, 'recorded_payloads_and_stamps_preserved': True,
            'live_publishers_before_replay': 0,
            'scope': 'Synthetic software transport only. No physical sampling, sensor-to-action latency, hardware, calibration or robot control test.',
        }
        (output / 'verification.json').write_text(json.dumps(report, indent=2) + '\n')
        print(json.dumps(report, indent=2))
    finally:
        for process in reversed(processes):
            stop(process)
        node.destroy_node()
        rclpy.shutdown()
        for log in logs:
            log.close()


if __name__ == '__main__':
    main()
