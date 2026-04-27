export function onPlayerSpawned() {
  const player = global.LocalPlayer as LocalPlayerInterface;

  const ped = GetPlayerPed(-1);

  SetEntityMaxHealth(ped, player.state.max_health);
  SetPedMaxHealth(ped, player.state.max_health);
  SetEntityHealth(ped, player.state.health);
  SetPlayerMaxArmour(PlayerId(), player.state.max_armour);
  SetPedArmour(ped, player.state.armour);

  SetPedConfigFlag(ped, 149, true);
  SetPedConfigFlag(ped, 438, true);

  player.state.set("knockdown", player.state.knockdown, true);
}
