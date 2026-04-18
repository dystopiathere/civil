import { AnimationChainData, AnimationChainName } from "types/civil";
import { dance, kneelWatch, kneelSearch, reviveSavior, reviveVictim } from "../animations";

export const animationChains: Record<AnimationChainName, AnimationChainData[]> = {
  reviveSavior,
  reviveVictim,
  dance,
  kneelWatch,
  kneelSearch,
};
