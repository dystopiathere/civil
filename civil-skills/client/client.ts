const keys: (keyof LocalPlayerStateBagInterface)[] = [
  "stamina",
  "strength",
  "lung_capacity",
  "wheelie_ability",
  "flying_ability",
  "shooting_ability",
  "stealth_ability",
];

let stateBagHandler: number;
let superJumpTick: number;

on("onResourceStart", () => {
  if (stateBagHandler) {
    RemoveStateBagChangeHandler(stateBagHandler);
  }

  if (superJumpTick) {
    clearTick(superJumpTick);
  }

  superJumpTick = setTick(() => {
    SetSuperJumpThisFrame(PlayerId());
  });

  stateBagHandler = AddStateBagChangeHandler(
    null,
    `player:${GetPlayerServerId(PlayerId())}`,
    (bagName: string, key: keyof LocalPlayerStateBagInterface, value: any) => {
      if (!keys.includes(key)) {
        return;
      }

      const skill = "MP0_" + key.toUpperCase();

      StatSetInt(skill, value, true);
    }
  );
});

on("onResourceStop", () => {
  if (stateBagHandler) {
    RemoveStateBagChangeHandler(stateBagHandler);
    stateBagHandler = undefined;
  }

  if (superJumpTick) {
    clearTick(superJumpTick);
    superJumpTick = undefined;
  }
});

on("playerSpawned", () => {
  StatSetInt("MP0_STAMINA", global.LocalPlayer.state.stamina, true);
  StatSetInt("MP0_STRENGTH", global.LocalPlayer.state.strength, true);
  StatSetInt("MP0_LUNG_CAPACITY", global.LocalPlayer.state.lung_capacity, true);
  StatSetInt("MP0_WHEELIE_ABILITY", global.LocalPlayer.state.wheelie_ability, true);
  StatSetInt("MP0_FLYING_ABILITY", global.LocalPlayer.state.flying_ability, true);
  StatSetInt("MP0_SHOOTING_ABILITY", global.LocalPlayer.state.shooting_ability, true);
  StatSetInt("MP0_STEALTH_ABILITY", global.LocalPlayer.state.stealth_ability, true);
});

export {};
