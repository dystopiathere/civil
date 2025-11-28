import { AnimationChainName } from 'civil'
import { playAnimation } from './playAnimation'
import { animations } from '../animations'

const exports = global.exports as CitizenExports

let delay = 0

let pool: Set<number> = new Set()

export async function playAnimationChain (ped: number, chainName: AnimationChainName): Promise<number> {
  delay = 0

  pool.forEach((id) => {
    clearTimeout(id)
  })

  pool.clear()

  const animationsData = animations[chainName]

  ClearPedTasks(ped)

  for (const { dictionary, name, flags, duration } of animationsData) {
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

exports('playAnimationChain', playAnimationChain)