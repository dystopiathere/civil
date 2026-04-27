import type { AnimationChainData, AnimationFlag } from "types/civil";

const flags: AnimationFlag[] = [
  "TAG_SYNC_IN",
  "TAG_SYNC_OUT",
  "TAG_SYNC_CONTINUOUS",
  "TURN_OFF_COLLISION",
  "NOT_INTERRUPTABLE",
  "USE_FULL_BLENDING",
];

export const kneelSearch: AnimationChainData[] = [
  {
    dictionary: "amb@medic@standing@tendtodead@enter",
    name: "enter",
    flags,
  },
  {
    dictionary: "amb@medic@standing@tendtodead@base",
    name: "base",
    flags,
  },
  {
    dictionary: "amb@medic@standing@tendtodead@idle_a",
    name: "idle_a",
    flags,
  },
  {
    dictionary: "amb@medic@standing@tendtodead@idle_a",
    name: "idle_b",
    flags,
  },
  {
    dictionary: "amb@medic@standing@tendtodead@idle_a",
    name: "idle_c",
    flags,
  },
  {
    dictionary: "amb@medic@standing@tendtodead@exit",
    name: "exit",
    flags,
  },
];
