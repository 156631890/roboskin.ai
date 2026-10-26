"""Download pinned public source shards with size and SHA-256 checks. No credentials."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import urllib.request

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parent)
args = parser.parse_args()
root = args.root.resolve()
manifest = json.loads((root / 'selected-repository.json').read_text(encoding='utf-8'))
assert manifest['repo'] == 'lerobot/koch_pick_place_1_lego'
assert manifest['revision'] == 'afc0b3e54679cb8a94283fbab5a4ccf0d405f10b'
assert sum(f['bytes'] for f in manifest['files']) < 420_000_000
dataset = root / 'dataset'
print(f"Pinned public download: {sum(f['bytes'] for f in manifest['files']):,} bytes; episode 0 inspection only.", flush=True)
for entry in manifest['files']:
    relative = PurePosixPath(entry['path'])
    if relative.is_absolute() or '..' in relative.parts or '\\' in entry['path']:
        raise ValueError('Invalid manifest path')
    target = dataset.joinpath(*relative.parts)
    if target.exists():
        with target.open('rb') as source:
            digest = hashlib.file_digest(source, 'sha256').hexdigest()
        if target.stat().st_size != entry['bytes'] or digest != entry['sha256']:
            raise ValueError(f'Existing source differs: {relative}; preserve it and choose a fresh folder.')
        print(f'Reused verified file: {relative}', flush=True)
        continue
    target.parent.mkdir(parents=True, exist_ok=True)
    partial = target.with_suffix(target.suffix + '.part')
    if partial.exists():
        raise FileExistsError(f'Unfinished download: {partial}; inspect it before retrying.')
    url = f"https://huggingface.co/datasets/{manifest['repo']}/resolve/{manifest['revision']}/{relative}"
    size, digest = 0, hashlib.sha256()
    with urllib.request.urlopen(url, timeout=90) as response, partial.open('xb') as output:
        while block := response.read(1024 * 1024):
            size += len(block)
            if size > entry['bytes']:
                raise ValueError(f'Source exceeded recorded size: {relative}')
            output.write(block)
            digest.update(block)
    if size != entry['bytes'] or digest.hexdigest() != entry['sha256']:
        raise ValueError(f'Source integrity mismatch: {relative}; partial file preserved.')
    partial.rename(target)
    print(f'Downloaded and verified: {relative}', flush=True)
