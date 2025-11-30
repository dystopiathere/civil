// @ts-ignore
const exports = global.exports as CitizenExports

RegisterCommand('respawn', async (source: number, args: string[], raw: string) => {
  const playerPed = GetPlayerPed(-1)

  const [x, y, z] = GetEntityCoords(playerPed, true)

  NetworkResurrectLocalPlayer(x, y, z, GetEntityHeading(playerPed), 0, true)
  ClearPedBloodDamage(playerPed)

  exports.playermanager.setPlayerState({health: 300})
}, false)