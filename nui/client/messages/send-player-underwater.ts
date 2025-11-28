
const exports = global.exports as CitizenExports

function sendPlayerUnderwater (isInWater: boolean) {
  SendNuiMessage(JSON.stringify({
    name: 'setPlayerUnderwater',
    data: {
      breath: GetPlayerUnderwaterTimeRemaining(PlayerId()),
      isInWater,
    }
  }))
}

exports('sendPlayerUnderwater', sendPlayerUnderwater)