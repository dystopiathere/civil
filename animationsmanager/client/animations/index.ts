import { AnimationChainName, AnimationChainData } from 'civil'
import { reviveSavior } from './reviveSavior'
import { reviveVictim } from './reviveVictim'

export const animations: Record<AnimationChainName, AnimationChainData[]> = {
  reviveSavior,
  reviveVictim,
}