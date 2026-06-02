import {
  CharacterDto,
  CharacterState,
  ComponentVariationsEntity,
  FaceFeaturesEntity,
  HeadBlendsEntity,
  HeadOverlaysEntity,
  SkillsEntity,
} from "@civil/types";

export function prepareCharacterDto(data: CharacterState): CharacterDto {
  const dto: Partial<CharacterState> = { ...data };

  delete dto.playerId;
  delete dto.frozen;
  delete dto.breath;
  delete dto.isInWater;

  delete dto.id;
  delete dto.player;
  delete dto.createdAt;
  delete dto.updatedAt;
  delete dto.deletedAt;

  const headBlends = dto.headBlends as Partial<HeadBlendsEntity>;
  delete headBlends.id;
  delete headBlends.createdAt;
  delete headBlends.updatedAt;
  delete headBlends.character;

  const faceFeatures = dto.faceFeatures as Partial<FaceFeaturesEntity>;
  delete faceFeatures.id;
  delete faceFeatures.createdAt;
  delete faceFeatures.updatedAt;
  delete faceFeatures.character;

  const skills = dto.skills as Partial<SkillsEntity>;
  delete skills.id;
  delete skills.createdAt;
  delete skills.updatedAt;
  delete skills.character;

  const componentVariations = dto.componentVariations as Partial<ComponentVariationsEntity>;
  delete componentVariations.id;
  delete componentVariations.createdAt;
  delete componentVariations.updatedAt;
  delete componentVariations.character;

  const headOverlays = dto.headOverlays as Partial<HeadOverlaysEntity>;
  delete headOverlays.id;
  delete headOverlays.createdAt;
  delete headOverlays.updatedAt;
  delete headOverlays.character;

  return dto as CharacterDto;
}
