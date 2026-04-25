export function sendSafeZone(value: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setSafeZone",
      data: {
        safeZone: value,
      },
    }),
  );
}
