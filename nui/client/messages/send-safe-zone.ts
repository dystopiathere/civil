export function sendSafeZone(safeZone: number) {
  SendNuiMessage(
    JSON.stringify({
      name: "setSafeZone",
      data: { safeZone },
    }),
  );
}
