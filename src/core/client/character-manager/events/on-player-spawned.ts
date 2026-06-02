import { TypedLocalPlayer } from "~/helpers";

export function onPlayerSpawned() {
  const player = TypedLocalPlayer();

  const ped = GetPlayerPed(-1);

  SetEntityMaxHealth(ped, player.state.maxHealth);
  SetPedMaxHealth(ped, player.state.maxHealth);
  SetEntityHealth(ped, player.state.health);
  SetPlayerMaxArmour(PlayerId(), player.state.maxArmour);
  SetPedArmour(ped, player.state.armour);

  SetPedConfigFlag(ped, 149, true);
  SetPedConfigFlag(ped, 438, true);

  player.state.set("knockdown", player.state.knockdown, true);
}
