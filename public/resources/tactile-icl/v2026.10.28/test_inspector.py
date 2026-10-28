"""Synthetic rejection tests. These do not test a model or robot."""
import tempfile
import unittest
from pathlib import Path

import numpy as np
from PIL import Image

from inspect_release import bounds, check_strip, decode, safe_media_path, selected_rows


class InspectorContracts(unittest.TestCase):
    def test_segments_include_preceding_boundary_once(self):
        self.assertEqual(bounds([0, 0, 1, 1, 2], ["a", "a", "b", "b", "c"]),
                         [(0, 1), (1, 3), (3, 4)])
        with self.assertRaises(ValueError):
            bounds([0], [])

    def test_selection_rejects_invalid_timing_and_missing_endpoints(self):
        steps = np.array([10, 12, 14, 16, 18, 20])
        self.assertEqual(selected_rows(steps, [12, 16, 18], 1, 4), [1, 3, 4])
        for chosen in ([12, 12, 18], [18, 12], [12, 16], [10, 12, 18], [12, 15, 18]):
            with self.subTest(chosen=chosen), self.assertRaises(ValueError):
                selected_rows(steps, chosen, 1, 4)
        with self.assertRaises(ValueError):
            selected_rows(np.array([10, 10, 14]), [10, 14], 0, 2)
        with self.assertRaises(ValueError):
            selected_rows(steps, list(steps), 0, 5)

    def test_download_paths_cannot_escape_images_directory(self):
        self.assertEqual(safe_media_path("images/demo.png"), Path("images/demo.png"))
        for value in ("../demo.png", "images/../demo.png", "images/../../x.png", "/images/x.png",
                      "https://host/x.png", "images\\x.png", "images/x.jpg", "images/C:x.png"):
            with self.subTest(path=value), self.assertRaises(ValueError):
                safe_media_path(value)

    def test_strip_rejects_shape_and_pixel_corruption(self):
        first = np.full((4, 6, 3), 20, dtype=np.uint8)
        second = np.full((4, 6, 3), 90, dtype=np.uint8)
        strip = np.concatenate([np.zeros((30, 12, 3), dtype=np.uint8), np.concatenate([first, second], axis=1)])
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "strip.png"
            Image.fromarray(strip).save(path)
            self.assertEqual(check_strip(path, [first, second]), 2)
            strip[31, 8, 0] += 1
            Image.fromarray(strip).save(path)
            with self.assertRaisesRegex(ValueError, "Pixel mismatch"):
                check_strip(path, [first, second])
            Image.fromarray(strip[1:]).save(path)
            with self.assertRaisesRegex(ValueError, "geometry"):
                check_strip(path, [first, second])

    def test_bad_jpeg_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "Undecodable"):
            decode(b"not an image")


if __name__ == "__main__":
    unittest.main()
