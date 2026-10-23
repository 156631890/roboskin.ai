"""Rebuild and verify the public numeric teaching download with its pinned Python environment."""
import hashlib
from datetime import datetime, timezone
import json
import os
import platform
from pathlib import Path
import subprocess
import sys
import pyarrow
from tutorial_bundle import package_public_files, public_files

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / 'public/tutorials/lerobot-validation'
assert pyarrow.__version__ == '23.0.1', 'Use the pinned requirements.txt environment'
environment = dict(os.environ, PYTHONDONTWRITEBYTECODE='1')


def run(args, expected=0):
    result = subprocess.run([sys.executable, '-B', *args], cwd=PROJECT, env=environment, text=True, capture_output=True)
    assert result.returncode == expected, result.stdout + result.stderr
    print(result.stdout + result.stderr, end='')
    return {'command': 'python -B ' + ' '.join(args), 'exit_code': result.returncode,
            'stdout': result.stdout, 'stderr': result.stderr}


public_files(PROJECT)  # Fail before regenerating files if the public set is incomplete or escapes the root.
run(['generate_fixtures.py'])
checks = [run(['-m', 'unittest', '-v', 'test_validator'])]
for fixture, expected in [('valid', 0), ('invalid', 1)]:
    checks.append(run(['check_dataset.py', f'fixtures/{fixture}', '--report', f'outputs/{fixture}-report.json'], expected))

verification = {
    'checked_on': datetime.now(timezone.utc).date().isoformat(), 'python': platform.python_version(),
    'system': platform.system(), 'machine': platform.machine(), 'pyarrow': pyarrow.__version__,
    'scope': 'Original synthetic numeric snapshot; no complete LeRobot loader, video, training or hardware validation.',
    'checks': checks,
    'output_sha256': {name: hashlib.sha256((PROJECT/'outputs'/name).read_bytes()).hexdigest()
                      for name in ('invalid-report.json', 'valid-report.json')},
}
(PROJECT/'verification.json').write_text(json.dumps(verification, indent=2)+'\n', encoding='utf-8')
archive = PROJECT/'lerobot-numeric-validation.zip'
package_public_files(PROJECT, archive)
print(f'ZIP: {archive.stat().st_size} bytes; sha256 {hashlib.sha256(archive.read_bytes()).hexdigest()}')
