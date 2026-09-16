"""Behavior tests for missing data, timestamps and teaching events. Apache-2.0."""
import csv
from pathlib import Path
import tempfile
import unittest
from process_tactile import FIELDS, analyze, load_frames


class TactileTests(unittest.TestCase):
    def load(self, records, rows=1, columns=1):
        with tempfile.TemporaryDirectory() as directory:
            file = Path(directory) / "input.csv"
            with file.open("w", newline="", encoding="utf-8") as handle:
                writer = csv.writer(handle)
                writer.writerow(FIELDS)
                writer.writerows(records)
            return load_frames(file, rows, columns)

    def record(self, t, value, valid=1, row=0, column=0, unit="normalized"):
        return [t, "demo", row, column, value, unit, valid]

    def test_invalid_high_value_is_unknown_not_zero_or_contact(self):
        frames = self.load([self.record(0, .95, valid=0)])
        rows, events, _ = analyze(frames)
        self.assertEqual(rows[0]["contact_state"], "unknown")
        self.assertIsNone(rows[0]["max_value"])
        self.assertEqual(events, [])

    def test_missing_nonfinite_and_range_violations_stay_unknown(self):
        for value in ["", "nan", "inf", "-inf", 1.2, -.1]:
            with self.subTest(value=value):
                rows, _, _ = analyze(self.load([self.record(0, value)]))
                self.assertEqual(rows[0]["contact_state"], "unknown")
                self.assertIsNone(rows[0]["max_value"])

    def test_missing_taxel_is_materialized_without_zero_filling(self):
        frames = self.load([self.record(0, .1)], columns=2)
        self.assertEqual(frames[0]["cells"][(0, 1)]["status"], "missing_taxel")
        self.assertEqual(analyze(frames)[0][0]["contact_state"], "unknown")

    def test_known_high_taxel_can_establish_contact_in_partial_frame(self):
        frames = self.load([self.record(0, .6)], columns=2)
        self.assertEqual(analyze(frames)[0][0]["contact_state"], "contact")

    def test_duplicate_taxel_rejected(self):
        with self.assertRaisesRegex(ValueError, "duplicate"):
            self.load([self.record(0, .1), self.record(0, .2)])

    def test_anomalous_timestamps_rejected(self):
        for records in [[self.record(-1, .1)], [self.record("1.5", .1)],
                        [self.record(2, .1), self.record(1, .2)]]:
            with self.subTest(records=records), self.assertRaises(ValueError):
                self.load(records)

    def test_grid_validity_and_unit_contract(self):
        for record in [self.record(0, .1, column=1), self.record(0, .1, row=-1),
                       self.record(0, .1, valid=2), self.record(0, .1, unit="N")]:
            with self.subTest(record=record), self.assertRaises(ValueError):
                self.load([record])

    def test_unknown_frame_splits_events_and_censors_boundaries(self):
        frames = self.load([self.record(i * 100_000_000, value, valid) for i, (value, valid)
                            in enumerate([(.1, 1), (.6, 1), (.9, 0), (.8, 1), (.1, 1)])])
        _, events, _ = analyze(frames)
        self.assertEqual(len(events), 2)
        self.assertFalse(events[0]["left_censored"])
        self.assertTrue(events[0]["right_censored"])
        self.assertEqual(events[0]["end_reason"], "unknown_frame")
        self.assertTrue(events[1]["left_censored"])
        self.assertFalse(events[1]["right_censored"])

    def test_large_gap_does_not_join_contacts(self):
        _, events, _ = analyze(self.load([self.record(0, .8), self.record(1_000_000_000, .8)]))
        self.assertEqual(len(events), 2)
        self.assertEqual(events[0]["end_reason"], "time_gap")
        self.assertTrue(events[1]["left_censored"])
        self.assertEqual(events[1]["end_reason"], "end_of_recording")

    def test_clear_frame_releases_contact_and_threshold_is_inclusive(self):
        frames = self.load([self.record(i * 100_000_000, v) for i, v in enumerate([.1, .6, .8, .1])])
        rows, events, _ = analyze(frames)
        self.assertEqual([r["contact_state"] for r in rows], ["clear", "contact", "contact", "clear"])
        self.assertEqual(events[0]["observed_span_ms"], 100)
        self.assertEqual(events[0]["boundary_timestamp_ns"], 300_000_000)
        self.assertFalse(events[0]["right_censored"])

    def test_invalid_analysis_parameters(self):
        frames = self.load([self.record(0, .1)])
        for threshold in [0, -1, float("nan"), 2]:
            with self.assertRaises(ValueError):
                analyze(frames, threshold=threshold)
        for gap in [0, -1, float("inf")]:
            with self.assertRaises(ValueError):
                analyze(frames, max_gap_ms=gap)

    def test_empty_file_rejected(self):
        with self.assertRaisesRegex(ValueError, "at least one"):
            self.load([])


if __name__ == "__main__":
    unittest.main()
