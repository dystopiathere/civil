import { AnimationChainName } from 'civil'
import { playAnimationChain } from '../lib'

RegisterCommand('playAnimationChain', async (source: number, args: string[], raw: string) => {
  const playerPed = GetPlayerPed(-1)

  const timer = await playAnimationChain(playerPed, args[0] as AnimationChainName)

  console.log(timer)
}, false)