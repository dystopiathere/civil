AddStateBagChangeHandler("stamina", null, (bagName: string, key: string, value: number) => {
  const skill = "MP0_" + key.toUpperCase();

  StatSetInt(skill, value, true);
});

AddStateBagChangeHandler("strength", null, (bagName: string, key: string, value: number) => {
  const skill = "MP0_" + key.toUpperCase();

  StatSetInt(skill, value, true);
});

AddStateBagChangeHandler("lung_capacity", null, (bagName: string, key: string, value: number) => {
  const skill = "MP0_" + key.toUpperCase();

  StatSetInt(skill, value, true);
});

AddStateBagChangeHandler("wheelie_ability", null, (bagName: string, key: string, value: number) => {
  const skill = "MP0_" + key.toUpperCase();

  StatSetInt(skill, value, true);
});

AddStateBagChangeHandler("flying_ability", null, (bagName: string, key: string, value: number) => {
  const skill = "MP0_" + key.toUpperCase();

  StatSetInt(skill, value, true);
});

AddStateBagChangeHandler("shooting_ability", null, (bagName: string, key: string, value: number) => {
  const skill = "MP0_" + key.toUpperCase();

  StatSetInt(skill, value, true);
});

AddStateBagChangeHandler("stealth_ability", null, (bagName: string, key: string, value: number) => {
  const skill = "MP0_" + key.toUpperCase();

  StatSetInt(skill, value, true);
});

on("playerSpawned", async () => {
  StatSetInt("MP0_STAMINA", global.LocalPlayer.state.stamina, true);
  StatSetInt("MP0_STRENGTH", global.LocalPlayer.state.strength, true);
  StatSetInt("MP0_LUNG_CAPACITY", global.LocalPlayer.state.lung_capacity, true);
  StatSetInt("MP0_WHEELIE_ABILITY", global.LocalPlayer.state.wheelie_ability, true);
  StatSetInt("MP0_FLYING_ABILITY", global.LocalPlayer.state.flying_ability, true);
  StatSetInt("MP0_SHOOTING_ABILITY", global.LocalPlayer.state.shooting_ability, true);
  StatSetInt("MP0_STEALTH_ABILITY", global.LocalPlayer.state.stealth_ability, true);
});
