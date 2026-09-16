"""Package only the tutorial deliverables; omit caches, environments and the ZIP itself."""
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1] / "public/tutorials/python-tactile"
files = ["README.md", "process_tactile.py", "generate_sample.py", "test_process_tactile.py",
         "synthetic_tactile.csv", "requirements.txt", "requirements-lock.txt", "LICENSE.txt",
         "DATA-LICENSE.txt", "verification.json", "results/processed.csv", "results/frames.csv",
         "results/contact_events.csv", "results/summary.json", "results/heatmap.png", "results/timeline.png"]
archive = root / "python-tactile-project.zip"
with ZipFile(archive, "w", compression=ZIP_DEFLATED) as handle:
    for name in files:
        info = ZipInfo("python-tactile/" + name, date_time=(2026, 9, 16, 0, 0, 0))
        info.compress_type = ZIP_DEFLATED
        handle.writestr(info, (root / name).read_bytes())
print(f"Packaged {len(files)} files into {archive.name} ({archive.stat().st_size} bytes)")
