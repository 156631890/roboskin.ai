"""Summarize an English/Chinese GSC Performance CSV ZIP without inferring hidden rows."""

import argparse
import csv
import hashlib
import io
import json
import zipfile
from datetime import datetime, timezone
from pathlib import Path


def summarize(archive_path):
    with zipfile.ZipFile(archive_path) as archive:
        def read_rows(names):
            member = next((name for name in archive.namelist() if Path(name).name in names), None)
            if member is None:
                raise ValueError(f"Missing CSV: expected one of {names}")
            return list(csv.reader(io.StringIO(archive.read(member).decode('utf-8-sig'))))[1:]

        chart = read_rows(['Chart.csv', '\u56fe\u8868.csv'])
        pages = read_rows(['Pages.csv', '\u7f51\u9875.csv'])
        queries = read_rows(['Queries.csv', '\u67e5\u8be2\u6570.csv'])

    def metrics(row, dimension):
        label, clicks, impressions, ctr, position = row
        return {
            dimension: label,
            'clicks': int(clicks),
            'impressions': int(impressions),
            'ctrPercent': float(ctr.rstrip('%')),
            'averagePosition': float(position),
        }

    daily = [metrics(row, 'date') for row in chart]
    if not daily:
        raise ValueError('Chart has no daily rows; no reporting window can be established.')
    for day in daily:
        datetime.strptime(day['date'], '%Y-%m-%d')
    return {
        'summarizedAt': datetime.now(timezone.utc).isoformat(),
        'sourceArchive': str(archive_path),
        'sourceSha256': hashlib.sha256(archive_path.read_bytes()).hexdigest(),
        'start': min(day['date'] for day in daily),
        'end': max(day['date'] for day in daily),
        'chartTotals': {
            'clicks': sum(day['clicks'] for day in daily),
            'impressions': sum(day['impressions'] for day in daily),
        },
        'pages': sorted((metrics(row, 'url') for row in pages), key=lambda row: (-row['clicks'], -row['impressions'])),
        'queries': sorted((metrics(row, 'query') for row in queries), key=lambda row: (-row['clicks'], -row['impressions'])),
        'daily': daily,
        'limitations': [
            'Confirm property, search type and active filters against the original export or dashboard.',
            'Missing disclosed rows are not observed zeroes; page and query tables can be incomplete.',
            'Chart totals are not computed by summing page or query rows.',
            'No causal conclusion, automatic publication decision or future count is inferred.',
        ],
    }


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archive', type=Path)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    result = summarize(args.archive)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f"{result['start']} to {result['end']}: {result['chartTotals']['clicks']} clicks, "
          f"{result['chartTotals']['impressions']} impressions; {len(result['pages'])} page rows, "
          f"{len(result['queries'])} disclosed query rows. Saved {args.output}")
