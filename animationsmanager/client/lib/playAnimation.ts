import { delay } from '../utils'
import { AnimationFlag } from 'civil'

const exports = global.exports as CitizenExports

export async function playAnimation (ped: number, animDict: string, anim: string, flags?: AnimationFlag[] = [], duration?: number, chained?: boolean = false): Promise<number> {
  if (!chained) {
    ClearPedTasks(ped)
  }

  if (DoesAnimDictExist(animDict)) {
    RequestAnimDict(animDict)

    while (!HasAnimDictLoaded(animDict)) {
      await delay(500)
    }

    const animDuration = GetAnimDuration(animDict, anim) * 1000

    if (!duration) {
      duration = animDuration
    }

    if (duration < 0) {
      duration = animDuration + duration
    }

    const calculatedFlags = flags.reduce((acc, cur) => acc + cur, 0)

    TaskPlayAnim(ped, animDict, anim, 1.0, 1.0, duration, calculatedFlags, 0.0, false, false, false)

    return duration
  }

  return 0
}

exports('playAnimation', playAnimation)