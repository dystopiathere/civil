export function respawn(source: number, args: string[], raw: string) {
  const player = global.LocalPlayer as LocalPlayerInterface;

  const ped = GetPlayerPed(-1);

  const [x, y, z] = GetEntityCoords(ped, true);

  NetworkResurrectLocalPlayer(x, y, z, GetEntityHeading(ped), 0, true);
  ClearPedBloodDamage(ped);

  player.state.set("health", player.state.max_health, true);
  player.state.set("knockdown", false, true);
}
