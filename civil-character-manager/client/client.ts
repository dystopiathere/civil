// @ts-ignore
const exports = global.exports as CivilExports;

setTick(() => {
  if (IsPedSwimmingUnderWater(GetPlayerPed(-1))) {
    exports.civil_nui.sendPlayerUnderwater(true);
  } else {
    exports.civil_nui.sendPlayerUnderwater(false);
  }
});

AddStateBagChangeHandler("health", null, (bagName: string, key: string, value: number) => {
  const ped = GetEntityFromStateBagName(bagName);

  SetEntityHealth(ped, value);
  exports.civil_nui.sendPlayerHealth(value);
});

AddStateBagChangeHandler("max_health", null, (bagName: string, key: string, value: number) => {
  const ped = GetEntityFromStateBagName(bagName);

  SetEntityMaxHealth(ped, value);
  exports.civil_nui.sendPlayerMaxHealth(value);
});

AddStateBagChangeHandler("armour", null, (bagName: string, key: string, value: number) => {
  const ped = GetEntityFromStateBagName(bagName);

  SetPedArmour(ped, value);
  exports.civil_nui.sendPlayerArmour(value);
});

AddStateBagChangeHandler("max_armour", null, (bagName: string, key: string, value: number) => {
  const player = GetPlayerFromStateBagName(bagName);

  SetPlayerMaxArmour(player, value);
  exports.civil_nui.sendPlayerMaxArmour(value);
});

on("playerSpawned", () => {
  exports.civil_nui.sendPlayerMaxHealth(global.LocalPlayer.state.max_health);
  exports.civil_nui.sendPlayerHealth(global.LocalPlayer.state.health);
  exports.civil_nui.sendPlayerMaxArmour(global.LocalPlayer.state.max_armour);
  exports.civil_nui.sendPlayerArmour(global.LocalPlayer.state.armour);
});
