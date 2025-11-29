export function sendPlayerUnderwater (isInWater: boolean) {
  SendNuiMessage(JSON.stringify({
    name: 'setPlayerUnderwater',
    data: {
      breath: GetPlayerUnderwaterTimeRemaining(PlayerId()),
      isInWater,
    }
  }))
}