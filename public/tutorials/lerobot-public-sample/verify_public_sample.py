"""Inspect one pinned public episode locally; no upload, training or robot control.

Reads unchanged source shards downloaded separately. Does not certify acquisition
synchronization, physical units, calibration or the whole dataset.
"""
import os
from pathlib import Path
import argparse
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent)
parser.add_argument('--output', type=Path, default=Path('verification.json'))
args = parser.parse_args()
ROOT = args.root.resolve()
OUTPUT = args.output if args.output.is_absolute() else ROOT / args.output
if OUTPUT.exists():
    raise FileExistsError('Output exists; choose a fresh --output path.')
os.environ['HF_HUB_OFFLINE'] = '1'
os.environ['HF_HUB_DISABLE_TELEMETRY'] = '1'
os.environ['HF_HOME'] = str(ROOT / 'hf-cache')
os.environ['HF_DATASETS_CACHE'] = str(ROOT / 'hf-cache' / 'datasets')
import hashlib
import importlib.metadata
import json
import platform
from datetime import datetime, timezone
import av
import numpy as np
import pyarrow.parquet as pq
from lerobot.datasets.lerobot_dataset import LeRobotDataset
from lerobot.datasets.video_utils import decode_video_frames_pyav

manifest = json.loads((ROOT / 'selected-repository.json').read_text(encoding='utf-8'))
dataset_root = ROOT / 'dataset'
info = json.loads((dataset_root / 'meta/info.json').read_text(encoding='utf-8'))
episode = pq.read_table(dataset_root / 'meta/episodes/chunk-000/file-000.parquet').to_pylist()[0]
assert episode['episode_index'] == 0
dataset = LeRobotDataset(manifest['repo'], root=dataset_root, episodes=[0],
    revision=manifest['revision'], video_backend='pyav', download_videos=False,
    tolerance_s=1e-4, token=False)
assert len(dataset) == episode['length']
raw = [dataset.get_raw_item(i) for i in range(len(dataset))]
timestamps = np.array([float(row['timestamp']) for row in raw])
frame_indices = [int(row['frame_index']) for row in raw]
assert frame_indices == list(range(len(dataset)))
assert all(int(row['episode_index']) == 0 for row in raw)
assert [int(row['index']) for row in raw] == list(range(episode['dataset_from_index'], episode['dataset_to_index']))
assert np.all(np.diff(timestamps) > 0)
cadence_error = float(np.max(np.abs(np.diff(timestamps) - 1 / info['fps'])))
assert cadence_error < 1e-4
parquet = pq.read_table(dataset_root / 'data/chunk-000/file-000.parquet').to_pylist()
for i, row in enumerate(raw):
    for field in ['observation.state', 'action']:
        vector = np.asarray(row[field])
        assert vector.shape == tuple(info['features'][field]['shape'])
        assert np.isfinite(vector).all()
        np.testing.assert_array_equal(vector, np.asarray(parquet[i][field], dtype=np.float32))
samples = sorted({0, len(dataset)//4, len(dataset)//2, 3*len(dataset)//4, len(dataset)-1})
video_results = []
for camera in dataset.meta.video_keys:
    path = dataset_root / info['video_path'].format(video_key=camera,
        chunk_index=episode[f'videos/{camera}/chunk_index'], file_index=episode[f'videos/{camera}/file_index'])
    offset = episode[f'videos/{camera}/from_timestamp']
    requested = timestamps + offset
    pts = []
    with av.open(str(path)) as container:
        stream = container.streams.video[0]
        codec, shape, rate = stream.codec_context.name, [stream.height, stream.width, 3], str(stream.average_rate)
        for frame in container.decode(stream):
            assert frame.pts is not None
            time_s = float(frame.pts * stream.time_base)
            pts.append(time_s)
            if time_s >= requested[-1] - 1e-8:
                break
    distances = np.abs(requested[:, None] - np.array(pts)[None, :])
    matched = distances.argmin(axis=1)
    errors = distances.min(axis=1)
    assert len(set(matched.tolist())) == len(dataset)
    assert float(errors.max()) < 1e-4
    assert shape == info['features'][camera]['shape']
    # A half-frame query should fail this explicit 0.1 ms file-timestamp tolerance.
    rejected = None
    try:
        decode_video_frames_pyav(path, [float(requested[0] + 0.5/info['fps'])], tolerance_s=1e-4)
    except Exception as error:
        if type(error).__name__ != 'FrameTimestampError':
            raise
        rejected = {'type': type(error).__name__, 'query_seconds': float(requested[0] + 0.5/info['fps'])}
    assert rejected is not None
    video_results.append({'key':camera,'codec':codec,'decoded_shape_hwc':shape,'stream_rate':rate,
        'episode_video_offset_s':offset,'decoded_pts_count':len(pts),'matched_data_rows':len(dataset),
        'max_file_timestamp_error_s':float(errors.max()),'negative_control':rejected})
sample_results = []
for i in samples:
    row = dataset[i]
    sample = {'frame_index':i,'timestamp_s':float(row['timestamp']),'task':row['task'],'camera_tensors':{}}
    for camera in dataset.meta.video_keys:
        tensor = row[camera]
        assert tuple(tensor.shape) == (3,480,640)
        assert np.isfinite(tensor.numpy()).all()
        assert float(tensor.min()) >= 0 and float(tensor.max()) <= 1
        sample['camera_tensors'][camera] = {'shape':list(tensor.shape),'dtype':str(tensor.dtype),
            'min':float(tensor.min()),'max':float(tensor.max()),
            'sha256':hashlib.sha256(tensor.numpy().tobytes()).hexdigest()}
    sample_results.append(sample)
report = {'status':'pass','verified_at':datetime.now(timezone.utc).isoformat(),
    'repository':manifest['repo'],'revision':manifest['revision'],'source_license_metadata':manifest['license'],
    'python':platform.python_version(),'platform':platform.platform(),
    'versions':{x:importlib.metadata.version(x) for x in ['lerobot','torch','torchvision','av','datasets','pyarrow','numpy']},
    'scope':{'episode':0,'numeric_frames_checked':len(dataset),'official_loader_video_samples':len(samples),
        'camera_count':len(video_results),'downloaded_parquet_contains_other_episodes':True,
        'format':info['codebase_version'],'metadata_robot_type':info['robot_type'],'metadata_fps':info['fps']},
    'numeric':{'state_shape':[6],'action_shape':[6],'finite':True,'matches_parquet':True,
        'max_cadence_error_s':cadence_error},'videos':video_results,'samples':sample_results,
    'limitations':['One episode only; not a full-dataset validation.',
        'File timestamps and nominal cadence are not measured sensor acquisition latency or physical cross-camera synchronization.',
        'No tactile channel is declared; observation.state/action units are not certified.',
        'robot_type remains unknown in the metadata; the repository name is not hardware identity evidence.',
        'No visualizer UI, policy training, hardware control, force calibration or ROS 2 runtime was tested.',
        'Source dataset files stay local and are not bundled with the website.']}
output = OUTPUT
if output.exists():
    raise FileExistsError('Preserve prior report; choose a fresh evidence directory for another run.')
output.write_text(json.dumps(report, indent=2)+'\n', encoding='utf-8')
print(json.dumps({'status':'pass','frames':len(dataset),'camera_count':len(video_results),'official_samples':samples,
    'max_video_timestamp_errors_s':[v['max_file_timestamp_error_s'] for v in video_results]}))
