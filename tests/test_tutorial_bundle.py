"""Public downloads must not collect local environments or unpublished results."""
import sys
import os
import subprocess
import tempfile
import unittest
from pathlib import Path
from zipfile import ZipFile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from tutorial_bundle import PUBLIC_FILES, package_public_files


class TutorialBundleTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)

    def fixture(self, name):
        project = self.root / name
        for filename in PUBLIC_FILES[name]:
            file = project / filename
            file.parent.mkdir(parents=True, exist_ok=True)
            file.write_text(f'Public content: {filename}\n', encoding='utf-8')
        target = project / 'download.zip'
        target.write_bytes(b'previous download')
        return project, target

    def test_only_public_files_are_packaged(self):
        for name in PUBLIC_FILES:
            with self.subTest(project=name):
                project, target = self.fixture(name)
                for filename in ('.venv/pyvenv.cfg', '.env', '__pycache__/local.pyc',
                                 'results/local.json', 'outputs/unpublished.json'):
                    extra = project / filename
                    extra.parent.mkdir(parents=True, exist_ok=True)
                    extra.write_bytes(b'local-only sentinel')
                before = {filename: (project/filename).read_bytes() for filename in PUBLIC_FILES[name]}
                self.assertEqual(package_public_files(project, target), len(before))
                with ZipFile(target) as archive:
                    self.assertEqual(set(archive.namelist()), set(before))
                    for filename, content in before.items():
                        self.assertEqual(archive.read(filename), content)
                        self.assertEqual((project/filename).read_bytes(), content)

    def test_missing_file_preserves_existing_download(self):
        for name in PUBLIC_FILES:
            with self.subTest(project=name):
                project, target = self.fixture(name)
                readme = next(filename for filename in PUBLIC_FILES[name] if filename.startswith('README.'))
                (project/readme).unlink()
                with self.assertRaises(FileNotFoundError):
                    package_public_files(project, target)
                self.assertEqual(target.read_bytes(), b'previous download')

    def test_external_file_symlink_is_rejected(self):
        project, target = self.fixture('lerobot-loader')
        outside = self.root/'outside.txt'
        outside.write_bytes(b'external content')
        link = project/'README.md'
        link.unlink()
        try:
            link.symlink_to(outside)
        except OSError as error:
            self.skipTest(f'Creating symlinks is unavailable: {error}')
        with self.assertRaisesRegex(ValueError, 'escapes its root'):
            package_public_files(project, target)
        self.assertEqual(target.read_bytes(), b'previous download')

    def test_external_directory_symlink_is_rejected(self):
        project, target = self.fixture('lerobot-loader')
        outputs = project/'outputs'
        outside = self.root/'outside-outputs'
        outputs.rename(outside)
        try:
            outputs.symlink_to(outside, target_is_directory=True)
        except OSError as error:
            self.skipTest(f'Creating symlinks is unavailable: {error}')
        with self.assertRaisesRegex(ValueError, 'escapes its root'):
            package_public_files(project, target)
        self.assertEqual(target.read_bytes(), b'previous download')

    @unittest.skipUnless(os.name == 'nt', 'Windows junctions only')
    def test_external_directory_junction_is_rejected(self):
        project, target = self.fixture('lerobot-loader')
        outputs = project/'outputs'
        outside = self.root/'outside-outputs'
        outputs.rename(outside)
        # Junctions need no symlink privilege and exercise Windows path resolution.
        quote = lambda path: "'" + str(path).replace("'", "''") + "'"
        subprocess.run(['powershell.exe', '-NoProfile', '-Command',
                        f'New-Item -ItemType Junction -Path {quote(outputs)} -Target {quote(outside)} -ErrorAction Stop | Out-Null'],
                       check=True, capture_output=True, text=True)
        with self.assertRaisesRegex(ValueError, 'escapes its root'):
            package_public_files(project, target)
        self.assertEqual(target.read_bytes(), b'previous download')


if __name__ == '__main__':
    unittest.main()
