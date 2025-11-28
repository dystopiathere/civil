import { AnimationChainData } from 'civil'
import mapping from '../mapping'

const flags = [
  mapping.TAG_SYNC_IN,
  mapping.TAG_SYNC_OUT,
  mapping.TAG_SYNC_CONTINUOUS,
  mapping.TURN_OFF_COLLISION,
  mapping.NOT_INTERRUPTABLE,
  mapping.USE_FULL_BLENDING,
]

export const dance: AnimationChainData[] = [
  { dictionary: 'anim@amb@casino@mini@dance@dance_solo@female@var_b@', name: 'intro', flags },
  { dictionary: 'anim@amb@casino@mini@dance@dance_solo@female@var_b@', name: 'low_left', flags },
  { dictionary: 'anim@amb@casino@mini@dance@dance_solo@female@var_b@', name: 'low_center', flags },
  { dictionary: 'anim@amb@casino@mini@dance@dance_solo@female@var_b@', name: 'low_right', flags },
  { dictionary: 'anim@amb@casino@mini@dance@dance_solo@female@var_b@', name: 'outro', flags },
]