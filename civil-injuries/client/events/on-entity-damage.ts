export function onEntityDamageHandler (args: any[]) {
  const [pedId] = args

  const playerPed = GetPlayerPed(-1)

  if (pedId === playerPed) {
    LocalPlayer.state.set('health', GetEntityHealth(playerPed), true)
    LocalPlayer.state.set('armour', GetPedArmour(playerPed), true)
  }
}