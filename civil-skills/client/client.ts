type Keys =
  | "stamina"
  | "strength"
  | "lung_capacity"
  | "wheelie_ability"
  | "flying_ability"
  | "shooting_ability"
  | "stealth_ability";

const keys: Keys[] = [
  "stamina",
  "strength",
  "lung_capacity",
  "wheelie_ability",
  "flying_ability",
  "shooting_ability",
  "stealth_ability",
];

const exports = global.exports as CitizenExports;

let stateBagHandler: number | undefined;
let superJumpTick: number | undefined;

function init() {
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
    "",
    `player:${GetPlayerServerId(PlayerId())}`,
    (bagName: string, key: Keys, value: LocalPlayerStateBagInterface[Keys]) => {
      if (!keys.includes(key)) {
        return;
      }

      const skill = "MP0_" + key.toUpperCase();

      StatSetInt(skill, value, true);
    },
  );

  return () => {
    if (stateBagHandler) {
      RemoveStateBagChangeHandler(stateBagHandler);
      stateBagHandler = undefined;
    }

    if (superJumpTick) {
      clearTick(superJumpTick);
      superJumpTick = undefined;
    }
  };
}

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

export {};
