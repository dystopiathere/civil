export function collectPedPosition() {
  setInterval(() => {
    const player = global.LocalPlayer as LocalPlayerInterface;

    const ped = GetPlayerPed(-1);
    const [x, y, z] = GetEntityCoords(ped, false);
    const heading = GetEntityHeading(ped);
    player.state.set("last_position", { x, y, z, heading }, true);
  }, 100);
}
