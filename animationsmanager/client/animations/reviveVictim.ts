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

export const reviveVictim: AnimationChainData[] = [
  { dictionary: 'mini@cpr@char_b@cpr_def', name: 'cpr_intro', flags },
  { dictionary: 'mini@cpr@char_b@cpr_def', name: 'cpr_pumpchest_idle', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_pumpchest', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_pumpchest', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_pumpchest', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_cpr_to_kol', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_kol_idle', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_kol', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_kol', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_kol', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_kol_to_cpr', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_pumpchest', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_pumpchest', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_pumpchest', flags },
  { dictionary: 'mini@cpr@char_b@cpr_str', name: 'cpr_success', flags, duration: 20000 },
]