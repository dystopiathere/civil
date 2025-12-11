export function sendPlayerMaxHealth(value: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerMaxHealth",
      data: {
        armour: value,
      },
    })
  );
}
