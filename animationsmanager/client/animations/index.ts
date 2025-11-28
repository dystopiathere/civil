import { AnimationChainName, AnimationChainData } from 'civil'
import { reviveSavior } from './reviveSavior'
import { reviveVictim } from './reviveVictim'
import { dance } from './dance'

export const animations: Record<AnimationChainName, AnimationChainData[]> = {
  reviveSavior,
  reviveVictim,
  dance,
}