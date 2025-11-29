export function sendWorldData (data: { streetName: string, zoneName: string, time: string }) {
  SendNuiMessage(JSON.stringify({
    name: 'setWorldData',
    data: {
      streetName: data.streetName,
      zoneName: data.zoneName,
      time: data.time,
    }
  }))
}
