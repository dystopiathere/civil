export function onEntityDamageHandler(args: any[]) {
  const [pedId] = args;

  const playerPed = GetPlayerPed(-1);

  if (pedId === playerPed) {
    (global.LocalPlayer as LocalPlayerInterface).state.set("health", GetEntityHealth(playerPed), true);
    (global.LocalPlayer as LocalPlayerInterface).state.set("armour", GetPedArmour(playerPed), true);
  }
}
