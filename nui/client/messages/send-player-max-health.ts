export function sendPlayerMaxHealth(max_health: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerMaxHealth",
      data: { max_health },
    }),
  );
}
