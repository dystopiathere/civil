import type { AnimationChainData, AnimationFlag } from "../types";

const flags: AnimationFlag[] = [
  "TAG_SYNC_IN",
  "TAG_SYNC_OUT",
  "TAG_SYNC_CONTINUOUS",
  "TURN_OFF_COLLISION",
  "NOT_INTERRUPTABLE",
  "USE_FULL_BLENDING",
];

export const dance: AnimationChainData[] = [
  {
    dictionary: "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
    name: "intro",
    flags,
  },
  {
    dictionary: "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
    name: "low_left",
    flags,
  },
  {
    dictionary: "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
    name: "low_center",
    flags,
  },
  {
    dictionary: "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
    name: "low_right",
    flags,
  },
  {
    dictionary: "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
    name: "outro",
    flags,
  },
];
