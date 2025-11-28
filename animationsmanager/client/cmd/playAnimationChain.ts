import { delay } from '../utils'
import { playAnimationChain } from '../lib/playAnimationChain'

RegisterCommand('playAnimationChain', async (source: number, args: string[], raw: string) => {
  const playerPed = GetPlayerPed(-1)

  const timer = await playAnimationChain(playerPed, args[0])

  console.log(timer)
}, false)