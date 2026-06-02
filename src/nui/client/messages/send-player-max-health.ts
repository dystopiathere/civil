export function sendPlayerMaxHealth(maxHealth: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerMaxHealth",
      data: { maxHealth },
    }),
  );
}
