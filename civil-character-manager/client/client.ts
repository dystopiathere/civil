// @ts-ignore
const exports = global.exports as CivilExports;

const keys: (keyof LocalPlayerStateBagInterface)[] = ["health", "max_health", "armour", "max_armour"];

on("onClientGameTypeStart", () => {
  DisplayRadar(false);

  setTick(() => {
    if (IsPedSwimmingUnderWater(GetPlayerPed(-1))) {
      exports.civil_nui.sendPlayerUnderwater(true);
    } else {
      exports.civil_nui.sendPlayerUnderwater(false);
    }
  });

  AddStateBagChangeHandler(
    null,
    `player:${GetPlayerServerId(PlayerId())}`,
    (bagName: string, key: keyof LocalPlayerStateBagInterface, value: number) => {
      if (!keys.includes(key)) {
        return;
      }

      const player = GetPlayerFromStateBagName(bagName);
      const ped = GetPlayerPed(player);

      if (key === "health") {
        SetEntityHealth(ped, value);
        exports.civil_nui.sendPlayerHealth(value);
      }

      if (key === "max_health") {
        SetEntityMaxHealth(ped, value);
        exports.civil_nui.sendPlayerMaxHealth(value);
      }

      if (key === "armour") {
        SetPedArmour(ped, value);
        exports.civil_nui.sendPlayerArmour(value);
      }

      if (key === "max_armour") {
        SetPlayerMaxArmour(player, value);
        exports.civil_nui.sendPlayerMaxArmour(value);
      }
    }
  );
});

on("playerSpawned", () => {
  exports.civil_nui.sendPlayerMaxHealth(global.LocalPlayer.state.max_health);
  exports.civil_nui.sendPlayerHealth(global.LocalPlayer.state.health);
  exports.civil_nui.sendPlayerMaxArmour(global.LocalPlayer.state.max_armour);
  exports.civil_nui.sendPlayerArmour(global.LocalPlayer.state.armour);
});

export {};
