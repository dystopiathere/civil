export function onPlayerSpawned() {
  const localPlayer = global.LocalPlayer as LocalPlayerInterface;

  StatSetInt("MP0_STAMINA", localPlayer.state.stamina, true);
  StatSetInt("MP0_STRENGTH", localPlayer.state.strength, true);
  StatSetInt("MP0_LUNG_CAPACITY", localPlayer.state.lung_capacity, true);
  StatSetInt("MP0_WHEELIE_ABILITY", localPlayer.state.wheelie_ability, true);
  StatSetInt("MP0_FLYING_ABILITY", localPlayer.state.flying_ability, true);
  StatSetInt("MP0_SHOOTING_ABILITY", localPlayer.state.shooting_ability, true);
  StatSetInt("MP0_STEALTH_ABILITY", localPlayer.state.stealth_ability, true);
}
