"""Summarize an already downloaded Hugging Face file listing; never fetch payloads."""

import argparse
import csv
import json
import re
from collections import Counter
from datetime import date
from pathlib import Path


def summarize(manifest, checked_date):
    date.fromisoformat(checked_date)
    revision = manifest['sha']
    if not re.fullmatch(r'[a-f0-9]{40}', revision):
        raise ValueError('Expected a pinned 40-character provider revision')
    if manifest['id'] != 'byml/UniVTAC':
        raise ValueError('Expected the byml/UniVTAC dataset listing')
    paths = [item['rfilename'] for item in manifest['siblings']]
    if len(paths) != len(set(paths)):
        raise ValueError('Duplicate paths in provider listing')
    counts = Counter()
    for path in paths:
        if not path.endswith('.hdf5'):
            continue
        parts = path.split('/')
        if len(parts) != 4 or parts[0] not in {'isaac45', 'isaac51', 'contact'} or parts[2] != 'hdf5':
            raise ValueError(f'Unreviewed HDF5 path layout: {path}')
        counts[(parts[0], parts[1])] += 1
    if not counts:
        raise ValueError('No HDF5 file paths found')
    return [
        [checked_date, revision, component, group, count,
         f'https://huggingface.co/datasets/byml/UniVTAC/tree/{revision}/{component}/{group}',
         'provider_file_listing_only; payloads_not_validated']
        for (component, group), count in sorted(counts.items())
    ]


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest', type=Path)
    parser.add_argument('--checked-date', required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    rows = summarize(json.loads(args.manifest.read_text(encoding='utf-8')), args.checked_date)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open('w', encoding='utf-8', newline='') as handle:
        writer = csv.writer(handle)
        writer.writerow(['checked_date', 'dataset_revision', 'component', 'group', 'hdf5_file_count', 'source_directory', 'verification_scope'])
        writer.writerows(rows)
    print(f'{len(rows)} groups; {sum(row[4] for row in rows)} listed HDF5 paths. No payload validation.')
