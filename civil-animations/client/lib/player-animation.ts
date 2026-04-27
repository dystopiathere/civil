import { AnimationFlag } from "types/civil";
import { flagsMapping } from "../config";

export async function playAnimation(
  ped: number,
  animDict: string,
  anim: string,
  flags?: AnimationFlag[],
  duration?: number,
): Promise<number> {
  if (!flags) {
    flags = [];
  }

  if (DoesAnimDictExist(animDict)) {
    RequestAnimDict(animDict);

    while (!HasAnimDictLoaded(animDict)) {
      await global.exports.civil_helpers.delay(500);
    }

    const animDuration = GetAnimDuration(animDict, anim) * 1000;

    if (!duration) {
      duration = animDuration;
    }

    if (duration < 0) {
      duration = animDuration + duration;
    }

    if (flags.length && flags.includes("LOOPING")) {
      duration = -1;
    }

    const calculatedFlags = flags.reduce((acc, flag) => acc + flagsMapping[flag], 0);

    TaskPlayAnim(ped, animDict, anim, 1.0, 1.0, duration, calculatedFlags, 0.0, false, false, false);

    return duration;
  }

  return 0;
}
