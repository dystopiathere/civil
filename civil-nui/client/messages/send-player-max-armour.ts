export function sendPlayerMaxArmour(value: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerMaxArmour",
      data: {
        armour: value,
      },
    })
  );
}
