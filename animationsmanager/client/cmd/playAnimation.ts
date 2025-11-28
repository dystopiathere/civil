import { delay } from '../utils'
import { playAnimation } from '../lib/playAnimation'

RegisterCommand('playAnimation', async (source: number, args: string[], raw: string) => {
  const playerPed = GetPlayerPed(-1)

  const timer = await playAnimation(playerPed, args[0], args[1])

  console.log(timer)
}, false)