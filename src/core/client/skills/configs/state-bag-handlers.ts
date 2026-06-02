import { SkillsEntity } from "@civil/types";
import { Key } from "../types";

export const stateBagHandlers: Record<Key, CallableFunction> = {
  skills: (data: SkillsEntity) => {
    Object.entries(data).forEach(([key, value]) => {
      switch (key as keyof SkillsEntity) {
        case "stamina":
          return StatSetInt("MP0_STAMINA", value as number, true);
        case "strength":
          return StatSetInt("MP0_STRENGTH", value as number, true);
        case "lungCapacity":
          return StatSetInt("MP0_LUNG_CAPACITY", value as number, true);
        case "wheelieAbility":
          return StatSetInt("MP0_WHEELIE_ABILITY", value as number, true);
        case "flyingAbility":
          return StatSetInt("MP0_FLYING_ABILITY", value as number, true);
        case "shootingAbility":
          return StatSetInt("MP0_SHOOTING_ABILITY", value as number, true);
        case "stealthAbility":
          return StatSetInt("MP0_STEALTH_ABILITY", value as number, true);
      }
    });
  },
};
