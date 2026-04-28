export function onPlayerSpawned() {
  const localPlayer = global.LocalPlayer as LocalPlayerInterface;

  StatSetInt("MP0_STAMINA", localPlayer.state.skills.stamina, true);
  StatSetInt("MP0_STRENGTH", localPlayer.state.skills.strength, true);
  StatSetInt("MP0_LUNG_CAPACITY", localPlayer.state.skills.lung_capacity, true);
  StatSetInt("MP0_WHEELIE_ABILITY", localPlayer.state.skills.wheelie_ability, true);
  StatSetInt("MP0_FLYING_ABILITY", localPlayer.state.skills.flying_ability, true);
  StatSetInt("MP0_SHOOTING_ABILITY", localPlayer.state.skills.shooting_ability, true);
  StatSetInt("MP0_STEALTH_ABILITY", localPlayer.state.skills.stealth_ability, true);
}
