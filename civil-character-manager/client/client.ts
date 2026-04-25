import { ADDITIONAL_PED_HEALTH } from "./config";
import { init } from "./lib";

const exports = global.exports as CitizenExports;

on("gameEventTriggered", (name: string, args: any[]) => {
  // console.log(`game event triggered: ${name}, args: ${args.join(", ")}`);

  if (name === "CEventNetworkEntityDamage") {
    const victim = args[0];
    const ped = GetPlayerPed(-1);

    if (victim === ped) {
      (global.LocalPlayer as LocalPlayerInterface).state.set("health", GetEntityHealth(ped), true);
    }
  }
});

exports.civil_helpers.initialize(GetCurrentResourceName(), init);

on("playerSpawned", () => {
  const player = global.LocalPlayer as LocalPlayerInterface;

  const ped = GetPlayerPed(-1);

  SetEntityMaxHealth(ped, player.state.max_health);
  SetPedMaxHealth(ped, player.state.max_health);
  SetEntityHealth(ped, player.state.health);
  SetPlayerMaxArmour(PlayerId(), player.state.max_armour);
  SetPedArmour(ped, player.state.armour);

  player.state.set("knockdown", player.state.knockdown, true);

  exports.civil_nui.sendPlayerMaxHealth(player.state.max_health - ADDITIONAL_PED_HEALTH);
  exports.civil_nui.sendPlayerHealth(player.state.health - ADDITIONAL_PED_HEALTH);
  exports.civil_nui.sendPlayerMaxArmour(player.state.max_armour);
  exports.civil_nui.sendPlayerArmour(player.state.armour);
});

export {};
