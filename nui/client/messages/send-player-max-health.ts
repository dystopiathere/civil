export function sendPlayerMaxHealth(value: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerMaxHealth",
      data: {
        maxHealth: value,
      },
    })
  );
}
