import type { AnimationChainData, AnimationChainName } from "types/civil";
import { dance, kneelWatch, kneelSearch, reviveSavior, reviveVictim } from "../chains";

export const chains: Record<AnimationChainName, AnimationChainData[]> = {
  reviveSavior,
  reviveVictim,
  dance,
  kneelWatch,
  kneelSearch,
};
