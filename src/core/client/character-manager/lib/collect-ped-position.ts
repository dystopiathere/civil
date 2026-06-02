import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function collectPedPosition() {
  setInterval(() => {
    const player = TypedLocalPlayer();

    const ped = GetPlayerPed(-1);
    const [x, y, z] = GetEntityCoords(ped, false);
    const heading = GetEntityHeading(ped);
    player.state.set("lastPosition", { x, y, z, heading }, true);
  }, 100);
}
