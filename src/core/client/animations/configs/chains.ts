import type { AnimationChainData } from "../types";
import { dance, kneelWatch, kneelSearch, reviveSavior, reviveVictim } from "../chains";

export const chains: Record<string, AnimationChainData[]> = {
  reviveSavior,
  reviveVictim,
  dance,
  kneelWatch,
  kneelSearch,
};
