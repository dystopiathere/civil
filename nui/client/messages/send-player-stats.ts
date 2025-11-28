
const exports = global.exports as CitizenExports

function sendPlayerStats () {
  const playerPed = GetPlayerPed(-1)

  SendNuiMessage(JSON.stringify({
    name: 'setPlayerStats',
    data: {
      health: GetEntityHealth(playerPed) - 100,
      maxHealth: GetPedMaxHealth(playerPed) - 100,
      armour: GetPedArmour(playerPed),
      maxArmour: GetPlayerMaxArmour(PlayerId()),
    }
  }))
}

exports('sendPlayerStats', sendPlayerStats)