import { TypedLocalPlayer } from "~/helpers";

export function respawn(source: number, args: string[], raw: string) {
  const player = TypedLocalPlayer();

  const ped = GetPlayerPed(-1);

  const [x, y, z] = GetEntityCoords(ped, true);

  NetworkResurrectLocalPlayer(x, y, z, GetEntityHeading(ped), 0, true);
  ClearPedBloodDamage(ped);

  player.state.set("health", player.state.maxHealth, true);
  player.state.set("knockdown", false, true);
}
