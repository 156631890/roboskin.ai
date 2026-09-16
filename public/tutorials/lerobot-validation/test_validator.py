"""Behavior tests for the documented numeric snapshot contract. Apache-2.0."""
import tempfile
import unittest
from pathlib import Path
from check_dataset import validate
from generate_fixtures import samples, write


class ValidationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.info, self.rows, self.episodes = samples()

    def check(self):
        write(self.root, self.info, self.rows, self.episodes)
        return validate(self.root)

    def has_error(self, prefix):
        result = self.check()
        self.assertFalse(result["ok"])
        self.assertTrue(any(e.startswith(prefix) for e in result["errors"]), result)

    def test_valid_and_episode_clock_reset(self):
        result = self.check()
        self.assertTrue(result["ok"], result)
        self.assertEqual(result["unknown_tactile_values"], 1)
        self.assertIsNone(self.rows[2]["observation.tactile"][1])

    def test_missing_column(self):
        for row in self.rows: del row["action"]
        self.has_error("fields:")

    def test_missing_required_metadata(self):
        del self.episodes[0]["length"]
        self.has_error("boundary:")

    def test_backward_timestamp(self):
        self.rows[2]["timestamp"] = 0.05
        self.has_error("time:")

    def test_duplicate_timestamp(self):
        self.rows[2]["timestamp"] = 0.1
        self.has_error("time:")

    def test_cadence(self):
        self.rows[2]["timestamp"] = 0.25
        self.has_error("cadence:")

    def test_overlap(self):
        self.episodes[1]["dataset_from_index"] = 3
        self.has_error("boundary:")

    def test_wrong_dimensions(self):
        self.rows[1]["observation.state"] = [0.0]
        self.has_error("dimension:")

    def test_missing_valid_measurement(self):
        self.rows[2]["observation.tactile_valid"][1] = True
        self.has_error("values:")

    def test_nan_is_not_valid(self):
        self.rows[0]["observation.state"][0] = float('nan')
        self.has_error("values:")

    def test_uncovered_rows(self):
        self.episodes.pop()
        self.has_error("boundary:")

    def test_wrong_shard_reference(self):
        self.episodes[1]["data/file_index"] = 1
        self.has_error("path:")

    def test_unsupported_video(self):
        self.info["video_path"] = "videos/{video_key}/file.mp4"
        self.has_error("unsupported:")

    def test_counts(self):
        self.info["total_frames"] = 9
        self.has_error("counts:")

    def test_invalid_tolerance(self):
        self.assertFalse(validate(self.root, float('nan'))['ok'])

    def test_unreadable_input(self):
        self.assertFalse(validate(self.root)['ok'])


if __name__ == "__main__": unittest.main()
