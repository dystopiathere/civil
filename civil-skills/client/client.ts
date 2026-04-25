import { init } from "./lib";

const exports = global.exports as CitizenExports;

exports.civil_helpers.initialize(GetCurrentResourceName(), init);

on("playerSpawned", () => {
  StatSetInt("MP0_STAMINA", (global.LocalPlayer as LocalPlayerInterface).state.stamina, true);
  StatSetInt("MP0_STRENGTH", (global.LocalPlayer as LocalPlayerInterface).state.strength, true);
  StatSetInt("MP0_LUNG_CAPACITY", (global.LocalPlayer as LocalPlayerInterface).state.lung_capacity, true);
  StatSetInt("MP0_WHEELIE_ABILITY", (global.LocalPlayer as LocalPlayerInterface).state.wheelie_ability, true);
  StatSetInt("MP0_FLYING_ABILITY", (global.LocalPlayer as LocalPlayerInterface).state.flying_ability, true);
  StatSetInt("MP0_SHOOTING_ABILITY", (global.LocalPlayer as LocalPlayerInterface).state.shooting_ability, true);
  StatSetInt("MP0_STEALTH_ABILITY", (global.LocalPlayer as LocalPlayerInterface).state.stealth_ability, true);
});
