export function sendPlayerUnderwater(is_in_water: boolean) {
  SendNuiMessage(
    JSON.stringify({
      name: "setPlayerUnderwater",
      data: {
        breath: GetPlayerUnderwaterTimeRemaining(PlayerId()),
        is_in_water,
      },
    }),
  );
}
