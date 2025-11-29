import { AnimationChainName } from 'civil'
import { playAnimation } from './playAnimation'
import { animationChains } from '../config'

let delay = 0

let pool: Set<NodeJS.Timeout> = new Set()

export async function playAnimationChain (ped: number, chainName: AnimationChainName): Promise<number> {
  delay = 0

  pool.forEach((id) => {
    clearTimeout(id)
  })

  pool.clear()

  const chainData = animationChains[chainName]

  ClearPedTasks(ped)

  for (const { dictionary, name, flags, duration } of chainData) {
    let timeout = duration

    const animDuration = GetAnimDuration(dictionary, name) * 1000

    if (!timeout) {
      timeout = animDuration
    }

    if (timeout < 0) {
      timeout = animDuration + timeout
    }

    const id = setTimeout(() => {
      playAnimation(ped, dictionary, name, flags, duration, true)

      pool.delete(id)
    }, delay)

    pool.add(id)

    delay += timeout
  }

  return delay
}