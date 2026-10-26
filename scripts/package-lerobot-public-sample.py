"""Package public inspection scripts and evidence, never dataset shards or environments."""
from pathlib import Path
from tutorial_bundle import package_public_files

root = Path(__file__).resolve().parents[1] / 'public/tutorials/lerobot-public-sample'
target = root / 'lerobot-public-sample.zip'
count = package_public_files(root, target)
print(f'Packaged {count} files: {target.name} ({target.stat().st_size} bytes)')
