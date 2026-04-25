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

let stateBagHandler: number | undefined;
let superJumpTick: number | undefined;

export function init() {
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
