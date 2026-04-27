import { onArmourChanged, onHealthChanged, onKnockdownChanged, onMaxArmourChanged, onMaxHealthChanged } from "../bags";
import { Key } from "../types";

export const stateBagHandlers: Record<Key, CallableFunction> = {
  health: onHealthChanged,
  max_health: onMaxHealthChanged,
  armour: onArmourChanged,
  max_armour: onMaxArmourChanged,
  knockdown: onKnockdownChanged,
};
