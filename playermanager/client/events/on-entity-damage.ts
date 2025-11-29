import { setPlayerState } from '../lib'

export function onEntityDamageHandler (args: any[]) {
  const [pedId] = args

  const playerPed = GetPlayerPed(-1)

  if (pedId === playerPed) {
    setPlayerState({ health: GetEntityHealth(playerPed), armour: GetPedArmour(playerPed) })
  }
}