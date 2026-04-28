export function sendWorldData(data: { streetName: string; zoneName: string; time: string }) {
  SendNuiMessage(
    JSON.stringify({
      name: "setWorldData",
      data,
    }),
  );
}
