"""Original synthetic numeric fixtures, not recorded robot demonstrations.
Code: Apache-2.0. Generated data: CC0-1.0. No actuator commands are executed.
"""
import copy
import json
from pathlib import Path
import pyarrow as pa
import pyarrow.parquet as pq

DATA = "data/chunk-000/file-000.parquet"
EPISODES = "meta/episodes/chunk-000/file-000.parquet"


def samples():
    features = {key: {"dtype": "int64", "shape": [1]} for key in ("index", "episode_index", "frame_index", "task_index")}
    features.update({
        "timestamp": {"dtype": "float32", "shape": [1]},
        "observation.state": {"dtype": "float32", "shape": [3], "names": ["x", "y", "z"]},
        "action": {"dtype": "float32", "shape": [2], "names": ["dx", "dy"]},
        "observation.tactile": {"dtype": "float32", "shape": [4]},
        "observation.tactile_valid": {"dtype": "bool", "shape": [4]},
    })
    info = {"codebase_version": "v3.0", "fps": 10, "total_frames": 8, "total_episodes": 2,
            "features": features, "data_path": "data/chunk-{chunk_index:03d}/file-{file_index:03d}.parquet", "video_path": None}
    rows = [{"index": e*4+f, "episode_index": e, "frame_index": f, "task_index": 0,
             "timestamp": f/10, "observation.state": [f/100, e/100, 0.0], "action": [0.01, 0.0],
             "observation.tactile": [0.1, 0.2+f/10, 0.3, 0.1], "observation.tactile_valid": [True]*4}
            for e in range(2) for f in range(4)]
    rows[2]["observation.tactile"][1] = None
    rows[2]["observation.tactile_valid"][1] = False
    episodes = [{"episode_index": e, "length": 4, "dataset_from_index": e*4, "dataset_to_index": (e+1)*4,
                 "data/chunk_index": 0, "data/file_index": 0} for e in range(2)]
    return info, rows, episodes


def write(root, info, rows, episodes):
    for name in (DATA, EPISODES): (root/name).parent.mkdir(parents=True, exist_ok=True)
    (root/"meta/info.json").write_text(json.dumps(info, indent=2)+"\n", encoding="utf-8")
    fields = []
    for key in rows[0]:
        dtype = {"int64": pa.int64(), "float32": pa.float32(), "bool": pa.bool_()}[info["features"][key]["dtype"]]
        fields.append(pa.field(key, pa.list_(dtype) if isinstance(rows[0][key], list) else dtype))
    pq.write_table(pa.Table.from_pylist(rows, schema=pa.schema(fields)), root/DATA)
    pq.write_table(pa.Table.from_pylist(episodes), root/EPISODES)


def generate(root):
    info, rows, episodes = samples()
    write(root/"valid", info, rows, episodes)
    bad = copy.deepcopy(rows)
    for row in bad: del row["action"]
    bad[1]["observation.state"] = [0.0, 0.0]
    bad[2]["timestamp"] = bad[1]["timestamp"]
    episodes[0]["dataset_to_index"] = 5
    write(root/"invalid", info, bad, episodes)


if __name__ == "__main__": generate(Path(__file__).parent/"fixtures")
