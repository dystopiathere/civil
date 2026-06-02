import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function onPlayerSpawned() {
  const player = TypedLocalPlayer();

  StatSetInt("MP0_STAMINA", player.state.skills.stamina, true);
  StatSetInt("MP0_STRENGTH", player.state.skills.strength, true);
  StatSetInt("MP0_LUNG_CAPACITY", player.state.skills.lungCapacity, true);
  StatSetInt("MP0_WHEELIE_ABILITY", player.state.skills.wheelieAbility, true);
  StatSetInt("MP0_FLYING_ABILITY", player.state.skills.flyingAbility, true);
  StatSetInt("MP0_SHOOTING_ABILITY", player.state.skills.shootingAbility, true);
  StatSetInt("MP0_STEALTH_ABILITY", player.state.skills.stealthAbility, true);
}
