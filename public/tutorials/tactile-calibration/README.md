# Blank tactile calibration record

RoboSkin.ai, 2026-09-16. This header-only CSV has **no measurements**. It is a
recording aid, not a hardware experiment, calibration certificate or safe-motion
program. No third-party software is bundled. Template and dictionary: CC0-1.0.

Use one row per reference comparison at a location, independent repeat and
loading phase. Keep raw images, reference data, settings and software revision
with the run. Multiple video frames from one contact are not independent repeats.
For depth maps, the scalar estimate/reference should describe a named summary
point or metric, with complete maps retained under raw_data_path/reference_id.

## Field dictionary

| Fields | Recording rule |
| --- | --- |
| run_id, record_id | Stable identifiers. Do not reuse a record ID within a run. |
| evidence_type | hardware_measurement, synthetic_demo or source_note. Separate evidence types into different runs/reports. |
| sensor_model, sensor_serial, gel_id, gel_condition | Device and replaceable surface identity; note wear, contamination, markings and replacement. |
| calibration_target | image_baseline, depth or force; do not pool target quantities. |
| quantity, quantity_unit | For example normal_force/N, depth/mm or mean_pixel_difference/digital_count. Choose and define before collecting. |
| coordinate_frame, axis | Physical frame, origin and signed axis convention. |
| probe_id, probe_geometry, probe_dimension, probe_dimension_unit | Traceable probe identity and geometry; dimension and unit such as sphere radius in mm. |
| location_x, location_y, location_unit | Contact position in the named sensor coordinate frame. |
| reference_id, reference_value, reference_unit, reference_uncertainty | Reference device/certificate or geometry record; uncertainty uses reference_unit. Never substitute a commanded position for a verified reference without disclosure. |
| estimated_value, estimated_unit | Output being evaluated; convert to the reference unit before error calculations. |
| planned_repeats, repeat_index, loading_phase | Planned independent contacts; one-based completed repeat; loading/unloading/dwell/no_contact. |
| sample_time_s, sample_clock, receive_time_s, receive_clock, sync_method | Separate sample and host receive time in seconds, with clock domains and alignment method. Subtraction is not latency unless clocks and endpoints support it. |
| temperature_c, humidity_percent, environment_notes | Record actual conditions or leave unknown with a note. |
| camera_settings, baseline_id | Resolution, FPS, crop, exposure, illumination and any automatic controls; baseline capture identity. |
| software_revision, model_revision | Acquisition/reconstruction code and calibration/model revision. |
| split | train/validation/test; split by contact, position or session according to the claim, not neighboring frames. |
| valid, invalid_reason | true/false; explain absent references, tracking failures or corrupted samples. Missing is not zero. |
| raw_data_path, notes | Relative evidence path and deviations from the planned protocol. |

## Suggested recording sequence

1. Define the target, unit, operating range, reference, uncertainty and acceptance criteria.
2. Fix and log image settings; capture repeated no-contact baselines.
3. Collect planned contact positions, independent repetitions and load/unload phases.
4. Retain failed samples with invalid reasons, references and raw evidence paths.
5. Evaluate held-out contacts: residual = estimate - reference; report bias, MAE,
   RMSE, counts and reference uncertainty in the target unit. Evaluate spatial
   variation, independent repeatability, hysteresis and temporal drift separately.

No numeric acceptance threshold or device accuracy is supplied. The sensor and
reference equipment, trained model, operating conditions and task determine them.

## Sources checked 2026-09-16

- https://arxiv.org/abs/2511.03078 (3D Cal: geometry/depth; force work is future work)
- https://digit.ml/digit.html
- https://github.com/facebookresearch/digit-interface/tree/87a28bbf2beee8008a5308e9a12d72e1bc4fefb9
- https://www.gelsightmini.com/
- https://github.com/gelsightinc/gsrobotics/tree/321d6a22da64529138ff10237335038fd8c5189f

This template does not reproduce those authors' data, claim their precision,
or override the licenses and equipment instructions of their projects.
