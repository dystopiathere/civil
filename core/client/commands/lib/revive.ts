export function revive(source: number, args: string[], raw: string) {
  const localPlayer = globalThis.LocalPlayer;

  localPlayer.state.set("health", localPlayer.state.max_health, true);
  localPlayer.state.set("knockdown", false, true);
}
