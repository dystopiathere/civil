import { CharacterState, TypedEntityInterface } from "@civil/types";

export function TypedPlayer(entity: number | string): TypedEntityInterface<CharacterState> {
  return Player(entity) as TypedEntityInterface<CharacterState>;
}
