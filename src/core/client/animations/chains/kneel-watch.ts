import type { AnimationChainData, AnimationFlag } from "../types";

const flags: AnimationFlag[] = [
  "TAG_SYNC_IN",
  "TAG_SYNC_OUT",
  "TAG_SYNC_CONTINUOUS",
  "TURN_OFF_COLLISION",
  "NOT_INTERRUPTABLE",
  "USE_FULL_BLENDING",
];

export const kneelWatch: AnimationChainData[] = [
  {
    dictionary: "amb@medic@standing@kneel@enter",
    name: "enter",
    flags,
  },
  {
    dictionary: "amb@medic@standing@kneel@base",
    name: "base",
    flags,
  },
  {
    dictionary: "amb@medic@standing@kneel@idle_a",
    name: "idle_a",
    flags,
  },
  {
    dictionary: "amb@medic@standing@kneel@idle_a",
    name: "idle_b",
    flags,
  },
  {
    dictionary: "amb@medic@standing@kneel@idle_a",
    name: "idle_c",
    flags,
  },
  {
    dictionary: "amb@medic@standing@kneel@exit",
    name: "exit",
    flags,
  },
];
