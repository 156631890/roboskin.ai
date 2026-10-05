import type { TrackerEntry } from './world-model-tracker.types';

export function assertTrackerEntries(value: unknown): asserts value is TrackerEntry[];
