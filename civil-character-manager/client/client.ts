import { ADDITIONAL_PED_HEALTH } from "./config";
import { init } from "./lib";

on("gameEventTriggered", (name: string, args: any[]) => {
  // console.log(`game event triggered: ${name}, args: ${args.join(", ")}`);

  if (name === "CEventNetworkEntityDamage") {
    const victim = args[0];
    const ped = GetPlayerPed(-1);

    if (victim === ped) {
      const localPlayer = global.LocalPlayer as LocalPlayerInterface;
      localPlayer.state.set("health", GetEntityHealth(ped), true);

      const shake = global.exports.civil_helpers.random(3, 7, 0.4);

      ShakeGameplayCam("FPS_BULLET_HIT_SHAKE", shake);
    }
  }
});

global.exports.civil_helpers.initialize(GetCurrentResourceName(), init);

on("playerSpawned", () => {
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

  global.exports.civil_nui.sendPlayerMaxHealth(player.state.max_health - ADDITIONAL_PED_HEALTH);
  global.exports.civil_nui.sendPlayerHealth(player.state.health - ADDITIONAL_PED_HEALTH);
  global.exports.civil_nui.sendPlayerMaxArmour(player.state.max_armour);
  global.exports.civil_nui.sendPlayerArmour(player.state.armour);
});
