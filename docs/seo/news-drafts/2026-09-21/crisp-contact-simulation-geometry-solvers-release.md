# CRISP details contact simulation for tight-tolerance robot assembly

Somang Lee and colleagues in Seoul National University's Department of Mechanical Engineering describe CRISP, the Contact-Rich Simulation Platform, in a September 18, 2026 preprint. The physics engine combines several collision-geometry representations with contact solvers designed for tightly coupled interactions, including peg insertion and threaded assembly. Its public package makes the work inspectable through examples, but access is restricted to academic and noncommercial research. [Paper record](https://arxiv.org/abs/2609.21761) and [official project](https://inrol.github.io/crisp/).

The paper is the new research event covered here. It should not be confused with a first software launch: the inspected GitHub releases list version 1.1.0 on September 17, following earlier packages. This article distinguishes the paper's evaluation from the versioned software readers can obtain.

## Key takeaways

- CRISP supports meshes and function-based geometry, allowing collision representation and solver choice to be examined together rather than treating contact as one fixed approximation.
- The reported comparisons use MuJoCo 3.4.0 and Isaac Sim 4.5.0 under specified geometry, friction and timestep conditions; they do not establish universal simulator superiority.
- The public repository supplies example code and integration for a prebuilt library. Its restrictive license means public availability should not be described as a full open-source engine release. [Paper](https://arxiv.org/html/2609.21761v1), [repository](https://github.com/INRoL/crisp) and [license](https://github.com/INRoL/crisp/blob/fc0684bdb3f325ab1586fc6df987c15839f08733/LICENSE).

## Why geometry and solver choice belong together

A simulator must first locate contacts and then resolve the resulting motion, forces and constraints. Improving one stage does not automatically fix errors in the other. CRISP supports primitives, convex shapes, triangle meshes, signed distance fields and differentiable support functions. A signed distance field describes distance to a surface; a support function describes a convex shape in terms of directional support. These representations expose different information to collision detection. [Geometry and architecture](https://arxiv.org/html/2609.21761v1#S4).

For contact resolution, CRISP provides Cascaded Newton-based Augmented Lagrangian, or CANAL, and Subsystem-based Alternating Direction Method of Multipliers, or SubADMM. The former combines outer multiplier updates with inner Newton iterations; the latter separates dynamics and constraint updates. Official documentation says SubADMM's algorithm is parallelizable but CRISP does not currently exploit that parallelism. A related GPU paper is not evidence that this package supplies the same GPU implementation. [Solver documentation](https://inrol.github.io/crisp/docs/contact-solvers/).

## What did the assembly comparisons show?

The paper evaluates several contact scenarios on an AMD Ryzen 7 9800X3D CPU, using MuJoCo 3.4.0 and Isaac Sim 4.5.0 as comparison platforms. Geometry, physical parameters and timesteps are matched as closely as possible, but their representations and numerical methods remain different. [Evaluation](https://arxiv.org/html/2609.21761v1#S6).

For peg insertion, a 2.5 cm-radius, 10 cm-high peg enters a hole with 50–200 micrometers of tolerance. Friction is set to 0.01, initial tilt to 0.5 degrees and timestep to 2 ms. At 50 micrometers, the CANAL configuration using a differentiable support-function peg and torus-specialized hole reports average penetration of approximately 37.8 micrometers; the Isaac Sim configuration fails to assemble at that tolerance. None of the compared engines is strictly intersection-free. [Table II and Appendix D](https://arxiv.org/html/2609.21761v1).

That metric is the time average of each step's maximum penetration in a reduced two-dimensional representation. In the threaded bolt-nut test, the measurement instead averages maximum detected contact penetration during the middle of engagement, uses a 10 ms timestep, and sets friction to zero. Those are different measurement procedures, not interchangeable evidence of real manufacturing tolerances.

The paper also reports cases where CRISP's mesh discretization prevents assembly, and where SubADMM's limited convergence produces larger penetration. Its appendix acknowledges that tuning MuJoCo parameters can mitigate some observed artifacts. The robot demonstrations follow predefined joint keyframes with proportional-derivative control; they are not demonstrations of a learned policy transferring to a physical robot.

## What is actually available to download?

RoboSkin inspected repository revision `fc0684bdb3f325ab1586fc6df987c15839f08733` on September 21. The [README](https://github.com/INRoL/crisp/blob/fc0684bdb3f325ab1586fc6df987c15839f08733/README.md) identifies two assembly examples and CMake integration for a prebuilt package. The repository's engine directory is a download location, rather than the complete solver implementation source.

[Version 1.1.0 release assets](https://github.com/INRoL/crisp/releases/tag/v1.1.0) list Windows x86-64, Linux x86-64/AArch64 and macOS packages with checksum files. Setup requires CMake 3.20 or later, a C++20 compiler and an OpenGL-capable desktop. Default configuration fetches the latest engine package and Eigen 3.4.0. The examples use a Franka arm, Robotiq 2F-85 gripper and prescribed joint targets. [Installation guide](https://inrol.github.io/crisp/docs/installation/).

The license permits academic and noncommercial research but prohibits redistribution, modification and reverse engineering without written authorization. Those conditions are material for integration. RoboSkin verified the listed files and documentation, but did not install or run the engine.

## What should a reproduction record?

RoboSkin analysis: pinning the example repository alone is insufficient when CMake downloads the latest binary. Record the engine archive version, checksum, example revision, collision representation, timestep and solver settings together. Version 1.1.0 changes default budgets and replaces a shared iteration-limit option with separate CANAL and SubADMM options; old settings should not silently be assumed equivalent. [Release notes](https://inrol.github.io/crisp/docs/release-notes/).

For tactile research, better contact mechanics could improve the inputs to a sensor simulator, but CRISP's contact solver is not itself a calibrated tactile-image or pressure-array generator. Soft-body dynamics is listed as future work. Compare the [tactile benchmark directory](/benchmarks) and [sensor guide](/sensors) before equating collision accuracy with sensor fidelity. The platform paper remains a preprint; its earlier method publications do not independently validate every result in this release.

## Sources

- [CRISP arXiv v1](https://arxiv.org/html/2609.21761v1)
- [Official project and documentation](https://inrol.github.io/crisp/)
- [Public repository and versioned packages](https://github.com/INRoL/crisp)
- [Reviewed license](https://github.com/INRoL/crisp/blob/fc0684bdb3f325ab1586fc6df987c15839f08733/LICENSE)
