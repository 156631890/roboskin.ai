import data from './world-model-tracker.json';
import { assertTrackerEntries } from './world-model-tracker-validation.mjs';
import type { TrackerEntry } from './world-model-tracker.types';

assertTrackerEntries(data);

/** T2 seed data: pending editorial review; not yet connected to any public route. */
export const worldModelTrackerEntries: TrackerEntry[] = data;
export type { TrackerEntry } from './world-model-tracker.types';
