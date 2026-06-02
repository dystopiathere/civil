import "@citizenfx/client";

import { CharacterState, TypedEntityInterface } from "@civil/types";

export function TypedLocalPlayer(): TypedEntityInterface<CharacterState> {
  return global.LocalPlayer as TypedEntityInterface<CharacterState>;
}
