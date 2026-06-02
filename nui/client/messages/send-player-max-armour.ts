export function sendPlayerMaxArmour(maxArmour: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerMaxArmour",
      data: { maxArmour },
    }),
  );
}
