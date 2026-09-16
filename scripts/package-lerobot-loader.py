"""Package the verified optional loader exercise; never include environments/caches."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1] / 'public/tutorials/lerobot-loader'
target = root / 'lerobot-official-loader.zip'
files = sorted(path for path in root.rglob('*') if path.is_file() and path != target)
assert not any('__pycache__' in path.parts or path.suffix == '.pyc' for path in files)
with ZipFile(target, 'w', compression=ZIP_DEFLATED) as archive:
    for path in files:
        archive.write(path, path.relative_to(root).as_posix())
print(f'Packaged {len(files)} files: {target.name} ({target.stat().st_size} bytes)')
