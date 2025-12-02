export function sendPlayerHealth (value: number) {
  SendNuiMessage(JSON.stringify({
    name: 'setPlayerHealth',
    data: {
      health: value,
    }
  }))
}