import { onArmourChanged, onHealthChanged, onKnockdownChanged, onMaxArmourChanged, onMaxHealthChanged } from "../bags";
import { Key } from "../types";

export const stateBagHandlers: Record<Key, CallableFunction> = {
  health: onHealthChanged,
  maxHealth: onMaxHealthChanged,
  armour: onArmourChanged,
  maxArmour: onMaxArmourChanged,
  knockdown: onKnockdownChanged,
};
