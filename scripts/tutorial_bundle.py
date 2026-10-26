"""Build tutorial downloads from an explicit public manifest, never local runs."""
from pathlib import Path
import tempfile
from zipfile import ZipFile, ZIP_DEFLATED


PUBLIC_FILES = {
    'lerobot-public-sample': (
        'LICENSE-CODE.txt', 'README.txt', 'download_sample.py',
        'verify_public_sample.py', 'selected-repository.json',
        'requirements-windows-py313.lock.txt', 'reference-verification.json',
    ),
    'lerobot-validation': (
        'LICENSE-CODE.txt', 'LICENSE-DATA.txt', 'README.md',
        'check_dataset.py', 'example-contract.json', 'generate_fixtures.py',
        'requirements.txt', 'test_validator.py', 'verification.json',
        'outputs/invalid-report.json', 'outputs/valid-report.json',
        'fixtures/invalid/data/chunk-000/file-000.parquet',
        'fixtures/invalid/meta/episodes/chunk-000/file-000.parquet',
        'fixtures/invalid/meta/info.json',
        'fixtures/valid/data/chunk-000/file-000.parquet',
        'fixtures/valid/meta/episodes/chunk-000/file-000.parquet',
        'fixtures/valid/meta/info.json',
    ),
    'lerobot-loader': (
        'LICENSE-CODE.txt', 'LICENSE-DATA.txt', 'README.md',
        'requirements-windows-py313.lock.txt', 'requirements.txt',
        'verify_loader.py', 'outputs/verification.json',
        'outputs/dataset/data/chunk-000/file-000.parquet',
        'outputs/dataset/meta/episodes/chunk-000/file-000.parquet',
        'outputs/dataset/meta/info.json', 'outputs/dataset/meta/stats.json',
        'outputs/dataset/meta/tasks.parquet',
    ),
}


def public_files(project: Path) -> list[tuple[str, Path]]:
    """Require every published file and reject links outside the tutorial root."""
    root = project.resolve(strict=True)
    files = []
    for name in sorted(PUBLIC_FILES[project.name]):
        source = (root / name).resolve(strict=True)
        if not source.is_relative_to(root):
            raise ValueError(f'Public tutorial file escapes its root: {name}')
        if not source.is_file():
            raise ValueError(f'Public tutorial file is not a regular file: {name}')
        files.append((name, source))
    return files


def package_public_files(project: Path, target: Path) -> int:
    """Validate before writing; replace the old download only after completion."""
    files = public_files(project)
    with tempfile.NamedTemporaryFile(dir=project, suffix='.zip.tmp', delete=False) as handle:
        temporary = Path(handle.name)
    try:
        with ZipFile(temporary, 'w', compression=ZIP_DEFLATED) as archive:
            for name, source in files:
                archive.write(source, name)
        temporary.replace(target)
    finally:
        temporary.unlink(missing_ok=True)
    return len(files)
