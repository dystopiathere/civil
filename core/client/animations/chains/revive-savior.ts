import type { AnimationChainData, AnimationFlag } from "types/civil";

const flags: AnimationFlag[] = [
  "TAG_SYNC_IN",
  "TAG_SYNC_OUT",
  "TAG_SYNC_CONTINUOUS",
  "TURN_OFF_COLLISION",
  "NOT_INTERRUPTABLE",
  "USE_FULL_BLENDING",
];

export const reviveSavior: AnimationChainData[] = [
  { dictionary: "mini@cpr@char_a@cpr_def", name: "cpr_intro", flags },
  { dictionary: "mini@cpr@char_a@cpr_def", name: "cpr_pumpchest_idle", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_pumpchest", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_pumpchest", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_pumpchest", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_cpr_to_kol", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_kol_idle", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_kol", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_kol", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_kol", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_kol_to_cpr", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_pumpchest", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_pumpchest", flags },
  { dictionary: "mini@cpr@char_a@cpr_str", name: "cpr_pumpchest", flags },
  {
    dictionary: "mini@cpr@char_a@cpr_str",
    name: "cpr_success",
    flags,
    duration: 25000,
  },
];
