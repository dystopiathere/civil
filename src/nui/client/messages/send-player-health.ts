export function sendPlayerHealth(health: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerHealth",
      data: { health },
    }),
  );
}
