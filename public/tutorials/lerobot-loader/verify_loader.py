"""Apache-2.0. Local synthetic numeric round trip through LeRobot 0.6.1.

No robot, video, network upload, policy training or physical calibration.
Generated data and reports are CC0-1.0. Use a new output directory per run.
"""
import argparse
import importlib.metadata
import json
import os
from pathlib import Path
import platform

os.environ['HF_HUB_OFFLINE'] = '1'
os.environ['HF_HUB_DISABLE_TELEMETRY'] = '1'

import numpy as np
from lerobot.datasets.lerobot_dataset import LeRobotDataset


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    if args.output.exists():
        parser.error('Output already exists; choose a new directory to preserve prior results.')
    args.output.mkdir(parents=True)
    dataset_root = args.output / 'dataset'
    features = {
        'observation.state': {'dtype': 'float32', 'shape': (2,), 'names': ['state_a', 'state_b']},
        'action': {'dtype': 'float32', 'shape': (2,), 'names': ['action_a', 'action_b']},
        'observation.tactile': {'dtype': 'float32', 'shape': (4,), 'names': ['taxel_0', 'taxel_1', 'taxel_2', 'taxel_3']},
    }
    repo_id = 'roboskin-local/synthetic-numeric-check'
    writer = LeRobotDataset.create(repo_id=repo_id, fps=10, features=features,
        root=dataset_root, robot_type='synthetic_numeric', use_videos=False, video_backend='pyav')
    rejected = []
    for case in ['missing_action', 'wrong_state_shape']:
        invalid = {key: np.zeros(spec['shape'], dtype=np.float32) for key, spec in features.items()}
        invalid['task'] = 'Invalid synthetic input; expected rejection'
        if case == 'missing_action':
            del invalid['action']
        else:
            invalid['observation.state'] = np.zeros((3,), dtype=np.float32)
        try:
            writer.add_frame(invalid)
        except ValueError as error:
            rejected.append({'case': case, 'exception': type(error).__name__, 'message': str(error)})
        else:
            raise AssertionError(f'Official writer accepted invalid case: {case}')
    expected = []
    for episode in range(2):
        for frame in range(4):
            values = {
                'observation.state': np.array([episode, frame / 10], dtype=np.float32),
                'action': np.array([frame / 20, -frame / 20], dtype=np.float32),
                'observation.tactile': np.array([0.1, 0.2, 0.3, frame / 10], dtype=np.float32),
            }
            expected.append(values)
            writer.add_frame({**values, 'task': 'Synthetic numeric round trip; no robot action'})
        writer.save_episode()
    writer.finalize()
    del writer
    reader = LeRobotDataset(repo_id=repo_id, root=dataset_root, download_videos=False, video_backend='pyav')
    assert len(reader) == 8 and reader.num_episodes == 2
    rows = []
    for index in range(len(reader)):
        frame = reader[index]
        episode, within = divmod(index, 4)
        assert int(frame['episode_index']) == episode
        assert int(frame['frame_index']) == within
        assert int(frame['index']) == index
        timestamp = float(frame['timestamp'])
        assert abs(timestamp - within / 10) < 1e-6
        for key, array in expected[index].items():
            np.testing.assert_array_equal(frame[key].numpy(), array)
        rows.append({'index': index, 'episode_index': episode, 'frame_index': within, 'timestamp_s': timestamp})
    info = json.loads((dataset_root / 'meta/info.json').read_text())
    assert info['codebase_version'] == 'v3.0'
    assert info['total_frames'] == 8 and info['total_episodes'] == 2 and info['fps'] == 10
    assert all(info['features'][key]['shape'] == list(spec['shape']) for key, spec in features.items())
    assert not list(dataset_root.rglob('*.mp4'))
    report = {
        'status': 'pass', 'python': platform.python_version(), 'platform': platform.platform(),
        'versions': {key: importlib.metadata.version(key) for key in ['lerobot', 'torch', 'datasets', 'pyarrow', 'numpy']},
        'format': info['codebase_version'], 'frames': len(reader), 'episodes': reader.num_episodes,
        'rejected_inputs': rejected,
        'checked': ['official writer finalization', 'official local loader', 'numeric values and shapes', 'episode and frame indices', '10 Hz synthetic timestamps', 'info metadata totals'],
        'tactile_field': 'Example custom float32 vector of 4 normalized arbitrary values; no policy support implied.',
        'excluded': ['video encoding/decoding', 'policy training', 'real robot data', 'force calibration', 'complete format compatibility certification'],
        'rows': rows,
    }
    (args.output / 'verification.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    print(f"PASS: LeRobot {report['versions']['lerobot']} wrote and loaded 8 numeric frames in 2 episodes ({report['format']}).")
    print('Report:', args.output / 'verification.json')


if __name__ == '__main__':
    main()
