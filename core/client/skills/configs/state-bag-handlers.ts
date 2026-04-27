import { Key } from "../types";

export const stateBagHandlers: Record<Key, CallableFunction> = {
  stamina: (value: number) => StatSetInt("MP0_STAMINA", value, true),
  strength: (value: number) => StatSetInt("MP0_STRENGTH", value, true),
  lung_capacity: (value: number) => StatSetInt("MP0_LUNG_CAPACITY", value, true),
  wheelie_ability: (value: number) => StatSetInt("MP0_WHEELIE_ABILITY", value, true),
  flying_ability: (value: number) => StatSetInt("MP0_FLYING_ABILITY", value, true),
  shooting_ability: (value: number) => StatSetInt("MP0_SHOOTING_ABILITY", value, true),
  stealth_ability: (value: number) => StatSetInt("MP0_STEALTH_ABILITY", value, true),
};
