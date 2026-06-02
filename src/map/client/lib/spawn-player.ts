import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export async function spawnPlayer() {
  const player = TypedLocalPlayer();

  global.exports.spawnmanager.spawnPlayer({
    x: player.state.lastPosition?.x ?? 410.213,
    y: player.state.lastPosition?.y ?? -963.708,
    z: player.state.lastPosition?.z ?? 28.651,
    heading: player.state.lastPosition?.heading ?? undefined,
    model: player.state.model,
    skipFade: true,
  });
}
