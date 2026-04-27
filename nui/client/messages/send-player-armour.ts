export function sendPlayerArmour(value: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerArmour",
      data: {
        armour: value,
      },
    })
  );
}
