import { CharacterState, TypedEntityInterface } from "@civil/types";

export function entityToCharacterState(entity: TypedEntityInterface<CharacterState>): CharacterState {
  const data: CharacterState = {
    playerId: entity.state.playerId,
    id: entity.state.id,
    firstname: entity.state.firstname,
    lastname: entity.state.lastname,
    age: entity.state.age,
    sex: entity.state.sex,
    health: entity.state.health,
    maxHealth: entity.state.maxHealth,
    armour: entity.state.armour,
    maxArmour: entity.state.maxArmour,
    eyeColor: entity.state.eyeColor,
    hairFirstColor: entity.state.hairFirstColor,
    headBlends: entity.state.headBlends,
    faceFeatures: entity.state.faceFeatures,
    skills: entity.state.skills,
    componentVariations: entity.state.componentVariations,
    headOverlays: entity.state.headOverlays,
    lastPosition: entity.state.lastPosition,
    model: entity.state.model,
    knockdown: entity.state.knockdown,
    breath: entity.state.breath,
    isInWater: entity.state.isInWater,
    player: entity.state.player,
    frozen: entity.state.frozen,
    createdAt: entity.state.createdAt,
    updatedAt: entity.state.updatedAt,
    deletedAt: entity.state.deletedAt,
  };

  return data;
}
