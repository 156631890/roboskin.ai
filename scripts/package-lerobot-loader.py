"""Package the verified optional loader exercise; never include environments/caches."""
from pathlib import Path
from tutorial_bundle import package_public_files

root = Path(__file__).resolve().parents[1] / 'public/tutorials/lerobot-loader'
target = root / 'lerobot-official-loader.zip'
count = package_public_files(root, target)
print(f'Packaged {count} files: {target.name} ({target.stat().st_size} bytes)')
