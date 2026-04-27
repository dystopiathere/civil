export async function spawnPlayer() {
  const localPlayer = global.LocalPlayer as LocalPlayerInterface;

  global.exports.spawnmanager.spawnPlayer({
    x: localPlayer.state.last_position.x ?? 410.213,
    y: localPlayer.state.last_position.y ?? -963.708,
    z: localPlayer.state.last_position.z ?? 28.651,
    heading: localPlayer.state.last_position?.heading ?? undefined,
    model: localPlayer.state.model,
    skipFade: true,
  });
}
