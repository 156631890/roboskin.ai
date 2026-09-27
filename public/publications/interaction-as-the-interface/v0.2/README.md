# Interaction as the Interface - reproduction package v0.2

Prepared for RoboSkin.ai, 27 September 2026.

This package accompanies the v0.2 audited research proposal, *Interaction as the Interface: A Belief-Space Framework for Generalist Embodied Intelligence*. It contains an executed synthetic decision benchmark and its recorded numerical outputs. The manuscript and benchmark were prepared with AI assistance. No named human author or institutional authorship is assigned by this package.

## Evidence status

The executable evaluates known-model policies in an explicitly specified binary decision problem. It does not train a neural network, run a robot simulator, collect physical sensor measurements, or control a robot. The value-of-information calculation is standard Bayesian decision theory. These results do not establish a new control principle, an advantage of the proposed neural architecture, robot generalization, cross-embodiment learning, emergence, or a scaling law. The full architecture remains a proposal.

All confidence intervals quantify Monte Carlo sampling error under the stipulated artificial distribution only. They do not quantify uncertainty about real-world performance, model misspecification, calibration, safety, or learned model generalization.

## Run

The numerical calculation requires only the Python standard library. It was executed and reproduced with Python 3.13.3. From the extracted package directory:

```text
python run_benchmark.py --episodes 10000 --output reproduced/results
```

This writes new numerical outputs to `reproduced/results/` and an accompanying summary to `reproduced/summary.md`, leaving the bundled numerical results unchanged. The script uses the same fixed set of 20 seeds on every run. If matplotlib is already installed, it also creates PNG and PDF figures; otherwise the numerical experiment and CSV/JSON output still work. No hardware, service credentials, network requests, or downloaded dataset are needed to run the experiment.

The optional plotting library and its tested version are listed in `requirements-optional.txt`. Installing that library is not required for numerical reproduction.

## Model and counts

The latent state is a balanced binary variable. A visual cue is correct with probability `q`, and an informative probe is correct with probability `p=0.90`. These channels are conditionally independent given the latent state. A final action receives reward 1 when it matches the state and 0 otherwise. One probe has deterministic cost `c=0.10`; it does not change the state. Net utility equals success minus probe cost.

- Seeds: the 20 integers from `2026092700` through `2026092719`.
- Base random-variable sets: **200,000**, from 20 seeds x 10,000 episodes.
- Visual-accuracy conditions: `q = 0.50, 0.75, 0.95`.
- Episode-condition evaluations: **600,000**, from the same 200,000 base random-variable sets evaluated under three q conditions.
- Policies: eight, evaluated on shared episode variables; this gives 4,800,000 policy decisions, not 4,800,000 independent samples.

The same seeds are reset across q conditions. Accordingly, the three conditions are coupled and must not be treated as independent collections of 200,000 fresh random episodes. The original result metadata field `total_unique_episode_scenarios` retains the original value 600000 for fidelity; here it means episode-condition evaluations, not 600000 independent base samples. The manifest supplies both counts explicitly.

## Policies and limits

`passive` uses visual MAP estimation. `always_probe` always pays for an informative observation and then uses Bayesian MAP. `selective` probes only when the exactly known expected improvement exceeds cost. `uninformative_probe` observes a correctly modeled fair coin, while `dummy_probe` pays the same abstract cost without observing a new signal. Both use the same visual tie-breaking rule and are identical episode by episode in this implementation. `oracle` receives the true hidden state for free and is a privileged, unattainable upper bound.

Two further policies invert a synthetic sensor token: one retains the wrong likelihood interpretation, while the other receives a known inverse encoding. This is an encoding/misspecification stress test; no calibration is learned and no second robot is introduced. Dummy probing matches an abstract action budget and charge, not measured wall-clock time.

Within each fixed-q condition the posterior confidence is constant. Selective probing therefore probes every episode at q=0.50 and q=0.75 and skips every episode at q=0.95. This experiment does not demonstrate episode-dependent learned adaptation. The implementation uses a `1e-12` tolerance when deciding whether to probe; exact indifference is resolved by skipping. The reported grid has step size 0.01 and is unaffected by that tolerance.

## Recorded results

| q | Visual net utility | Selective net utility | Paired difference | 95% Monte Carlo interval |
|---:|---:|---:|---:|---|
| 0.50 | 0.500350 | 0.799110 | 0.298760 | [0.295565, 0.301955] |
| 0.75 | 0.749655 | 0.799110 | 0.049455 | [0.046493, 0.052417] |
| 0.95 | 0.950395 | 0.950395 | 0.000000 | [0.000000, 0.000000] |

Intervals use the sample standard deviation of 20 seed-wise paired means and the two-sided Student-t critical value with 19 degrees of freedom. They are approximate Monte Carlo intervals; the 18 released comparisons are pointwise, not a multiple-comparison-adjusted family. A zero-width interval arises when policies coincide episode by episode, not when a physical system has zero risk.

The 7,803-row parameter sweep contains exact formula evaluations, not additional sampled trials: three q values x 51 probe accuracies x 51 costs. A separate 5,151-point check compares the closed form against explicit observation-branch enumeration. These are analytical consistency checks, not validation of the model assumptions in real robots.

## Files and integrity

- `run_benchmark.py`: unchanged original executable.
- `results/per_seed_metrics.csv`: 480 seed/policy/condition metric rows.
- `results/aggregate_metrics.csv`: 24 aggregate policy/condition rows.
- `results/paired_per_seed.csv`: 360 seed-wise paired differences.
- `results/paired_comparisons.csv`: 18 paired aggregate comparisons and intervals.
- `results/exact_parameter_scan.csv`: 7,803 exact parameter combinations.
- `results/results.json`: original numeric results, seeds, and script hash, with the optional plot inventory cleared because plots are not included in this download.
- `requirements-optional.txt`: optional plotting dependency only.
- `manifest.json`: relative filenames, byte lengths, SHA-256 hashes, count definitions, and the single metadata transformation.

The script and all five CSV files are byte-for-byte copies of the released experiment. Numerical JSON values are unchanged; only `plots` is set to an empty list. A new run with matplotlib installed will list generated figures in that field. Numerical comparisons should ignore this presentation-only difference. The manifest does not hash itself; it hashes every other member. ZIP entries use fixed timestamps and sorted relative paths for deterministic packaging in the recorded compression environment.

The paper PDF and standalone LaTeX source are offered separately. This archive contains no third-party papers, local audit logs, personal filesystem paths, hidden credentials, or additional dataset files. No new license is assigned by this packaging step.
