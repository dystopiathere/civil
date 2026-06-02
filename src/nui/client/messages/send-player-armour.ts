export function sendPlayerArmour(armour: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerArmour",
      data: { armour },
    }),
  );
}
