export function sendPlayerMaxArmour(max_armour: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerMaxArmour",
      data: { max_armour },
    }),
  );
}
