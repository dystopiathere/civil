import { AnimationChainData, AnimationChainName } from 'civil'
import { dance, reviveSavior, reviveVictim } from '../animations'

export const animationChains: Record<AnimationChainName, AnimationChainData[]> = {
  reviveSavior,
  reviveVictim,
  dance,
}