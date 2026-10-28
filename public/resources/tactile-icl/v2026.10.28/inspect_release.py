"""Audit published Tactile-ETA inputs against pinned UniVTAC files, offline.

No simulator, robot connection, policy inference, or success evaluation is run.
Use --download explicitly to fetch about 0.97 GB of public third-party inputs.
RoboSkin.ai, 2026. Code license: MIT (see LICENSE.txt in this package).
"""
from __future__ import annotations

import argparse
import hashlib
import json
import platform
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen

import cv2
import h5py
import numpy as np
import PIL
from PIL import Image

ETA_REV = "e7e5efbd42d3be7532ff5eb940a3cb015c2f7818"
DATA_REV = "e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd"
ETA_BASE = f"https://raw.githubusercontent.com/No-518/Tactile-ETA/{ETA_REV}/demonstrations/lift_bottle/"
DATA_BASE = f"https://huggingface.co/datasets/byml/UniVTAC/resolve/{DATA_REV}/isaac51/lift_bottle/"
EXPECTED = {
    "expert_demonstrations.json": "728d73024ee0946aca5ba39975eafa30d9e27a6242a6ec27c0092e254a17f55c",
    "0.hdf5": "b18596a52c52dfd25f495e8cca4587aaa2be8efd6600706b3d410db3a664024d",
    "1.hdf5": "949416b2eefc32f009c0dd3834462ff33c016809138ae8ec0c0ff842a4cff8a9",
}
VIEWS = {"head": "observation/head/rgb", "wrist": "observation/wrist/rgb",
         "left_tactile": "tactile/left_tactile/rgb_marker", "right_tactile": "tactile/right_tactile/rgb_marker"}


def digest(path):
    with Path(path).open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def safe_media_path(value):
    # Released paths are POSIX relative paths; do not accept arbitrary manifest URLs.
    parts = value.split("/")
    require(len(parts) == 2 and parts[0] == "images" and parts[1].endswith(".png")
            and "\\" not in value and ":" not in value and ".." not in parts,
            f"Unexpected media path: {value}")
    return Path(*parts)


def fetch(url, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        return
    temporary = destination.with_suffix(destination.suffix + ".partial")
    with urlopen(url, timeout=90) as response, temporary.open("wb") as stream:
        while chunk := response.read(1024 * 1024):
            stream.write(chunk)
    temporary.replace(destination)


def download(root):
    fetch(ETA_BASE + "expert_demonstrations.json", root / "expert_demonstrations.json")
    require(digest(root / "expert_demonstrations.json") == EXPECTED["expert_demonstrations.json"], "Manifest checksum mismatch")
    manifest = json.loads((root / "expert_demonstrations.json").read_text(encoding="utf-8"))
    for name in ("0.hdf5", "1.hdf5"):
        fetch(DATA_BASE + "hdf5/" + name, root / name)
    def fetch_media(entry):
        relative = safe_media_path(entry["path"])
        fetch(ETA_BASE + relative.as_posix(), root / relative)
    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(fetch_media, manifest["images"]))


def bounds(atom_ids, tags):
    require(len(atom_ids) == len(tags) and len(tags) > 0, "Empty or unaligned segmentation fields")
    starts = [i for i in range(len(tags)) if i == 0 or atom_ids[i] != atom_ids[i-1] or tags[i] != tags[i-1]]
    # Match the preparation script: each new segment includes the preceding row.
    return [(max(0, a-1), b-1) for a, b in zip(starts, starts[1:] + [len(tags)])]


def selected_rows(steps, selected, start, end):
    require(len(steps) > 1 and np.all(np.diff(steps) > 0), "Recorded steps must increase strictly")
    require(selected == sorted(set(selected)) and 1 <= len(selected) <= 4, "Selection must be ordered, unique and at most four times")
    require(selected[0] == int(steps[start]) and selected[-1] == int(steps[end]), "Selection must retain both segment endpoints")
    index = {int(step): i for i, step in enumerate(steps)}
    require(all(step in index and start <= index[step] <= end for step in selected), "Selection outside raw segment")
    return [index[step] for step in selected]


def decode(value):
    pixels = cv2.imdecode(np.frombuffer(value, dtype=np.uint8), cv2.IMREAD_COLOR)
    require(pixels is not None, "Undecodable JPEG")
    # The author's producer passed numeric RGB arrays to OpenCV's JPEG encoder.
    # Match its decoder: do not perform a second channel swap.
    return pixels


def check_strip(path, frames):
    with Image.open(path) as image:
        strip = np.asarray(image.convert("RGB"))
    height, width, channels = frames[0].shape
    require(strip.shape == (height + 30, width * len(frames), channels), f"Strip geometry mismatch: {path.name}")
    for i, pixels in enumerate(frames):
        require(np.array_equal(strip[30:, i*width:(i+1)*width], pixels), f"Pixel mismatch: {path.name}, panel {i}")
    return len(frames)


def inspect(root):
    inputs = []
    for name, expected in EXPECTED.items():
        path = root / name
        actual = digest(path)
        require(actual == expected, f"Checksum mismatch: {name}")
        inputs.append({"path": name, "bytes": path.stat().st_size, "sha256": actual})
    manifest = json.loads((root / "expert_demonstrations.json").read_text(encoding="utf-8"))
    text = manifest["text"]
    images = {row["label"]: safe_media_path(row["path"]) for row in manifest["images"]}
    require(len(images) == len(manifest["images"]), "Duplicate image labels")
    touch = {(row["example_id"], row["segment"]): row for row in text["historical_touch"]}
    require(len(touch) == len(text["historical_touch"]), "Duplicate touch segment")
    require([x["example_id"] for x in text["examples"]] == ["official_episode_0", "official_episode_1"], "Unexpected example IDs")
    segments, episodes, used, panels = [], [], set(), 0
    for episode_id, example in enumerate(text["examples"]):
        with h5py.File(root / f"{episode_id}.hdf5", "r") as file:
            steps = file["step"][:]
            require(len(steps) > 1 and np.all(np.diff(steps) > 0), "Non-increasing recorded steps")
            segmentation = bounds(file["atom/id"][:], file["atom/tag"][:])
            require(len(file["atom/id"]) == len(steps), "Segmentation/step length mismatch")
            require(len(example["segments"]) == len(segmentation), "Segment count mismatch")
            require(all(len(file[key]) == len(steps) for key in [*VIEWS.values(), "embodiment/ee", "embodiment/joint"]), "Stream length mismatch")
            # Decode every image in the four input streams, not only the selected panels.
            pixels = {view: [decode(value) for value in file[key][:]] for view, key in VIEWS.items()}
            episodes.append({"episode": episode_id, "rows": len(steps), "segments": len(segmentation),
                             "decoded_images": sum(map(len, pixels.values())), "first_step": int(steps[0]), "last_step": int(steps[-1])})
            for number, ((a, b), segment) in enumerate(zip(segmentation, example["segments"]), 1):
                require(segment["segment"] == number, "Unexpected segment number")
                for boundary, row in [("before", a), ("after", b)]:
                    state = segment[boundary]
                    require(state["recorded_step"] == int(steps[row]), "Boundary step mismatch")
                    require(np.array_equal(np.asarray(state["ee_xyz_wxyz"]), file["embodiment/ee"][row]), "EE state mismatch")
                    require(np.array_equal(np.asarray(state["joint"]), file["embodiment/joint"][row]), "Joint state mismatch")
                context = touch[(example["example_id"], number)]
                chosen = selected_rows(steps, context["recorded_steps"], a, b)
                media = {}
                for view in VIEWS:
                    selected = [a, b] if view in ("head", "wrist") else chosen
                    label = f"example {episode_id} segment {number} {view} " + ("before/after" if view in ("head", "wrist") else "history")
                    require(label in images, f"Missing image label: {label}")
                    relative = images[label]
                    require(str(relative) not in used, "Reused media path")
                    panels += check_strip(root / relative, [pixels[view][i] for i in selected])
                    media[view] = {"path": relative.as_posix(), "sha256": digest(root / relative)}
                    used.add(str(relative))
                segments.append({"episode": episode_id, "segment": number, "start_step": int(steps[a]), "end_step": int(steps[b]),
                    "selected_steps": context["recorded_steps"], "A_observations_per_fingertip": len(set([a, b])),
                    "B_released_observations_per_fingertip": len(chosen), "C_observations_per_fingertip": b-a+1,
                    "shared_vision_strips": {view: media[view] for view in ("head", "wrist")},
                    "released_tactile_strips": {view: media[view] for view in ("left_tactile", "right_tactile")}})
    require(len(used) == len(images) and len(segments) == len(touch), "Unaccounted media or touch records")
    totals = {key: sum(row[key] for row in segments) for key in ["A_observations_per_fingertip", "B_released_observations_per_fingertip", "C_observations_per_fingertip"]}
    return {"schema_version": 1, "evidence_type": "offline_published_input_audit", "status": "pass",
        "executed_at_utc": datetime.now(timezone.utc).isoformat(),
        "inspector_sha256": digest(Path(__file__)),
        "task": "Lift Bottle", "eta_revision": ETA_REV, "univtac_revision": DATA_REV,
        "environment": {"python": platform.python_version(), "platform": platform.system(), "numpy": np.__version__, "h5py": h5py.__version__, "opencv": cv2.__version__, "pillow": PIL.__version__},
        "input_files": inputs, "episodes": episodes, "segments": segments,
        "totals": {**totals, "raw_rows": sum(row["rows"] for row in episodes),
                   "decoded_images": sum(row["decoded_images"] for row in episodes),
                   "segments": len(segments), "strips_checked": len(used), "image_panels_checked": panels},
        "limits": ["The released B selection is checked against raw rows and image panels; its optical feature scores and peak-selection algorithm are not recomputed.",
                   "A and C are counted from the same raw segment boundaries. They are not submitted to a model. Shared vision hashes describe the fixed inputs for a future packaging comparison.",
                   "Segment boundaries overlap by one row. Totals count context appearances, not unique recorded frames, tokens, API images or costs.",
                   "Recorded simulation steps are not measured wall-clock timestamps. No force calibration, online controller, robot task success or hardware reliability is evaluated.",
                   "The two upstream episodes were selected as successful demonstrations; no success predicate was rerun."]}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data-dir", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--download", action="store_true")
    args = parser.parse_args()
    if args.download:
        download(args.data_dir)
    report = inspect(args.data_dir)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["totals"], indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
