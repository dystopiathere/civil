import {
  CharacterRoleEntity,
  ComponentVariationsEntity,
  FaceFeaturesEntity,
  HeadBlendsEntity,
  HeadOverlaysEntity,
  SkillsEntity
} from 'civil'

export interface ICharacter {
  getHeadBlends (id: number): Promise<HeadBlendsEntity | null>;

  getFaceFeatures (id: number): Promise<FaceFeaturesEntity | null>;

  getSkills (id: number): Promise<SkillsEntity | null>;

  getComponentVariations (id: number): Promise<ComponentVariationsEntity | null>;

  getHeadOverlays (id: number): Promise<HeadOverlaysEntity | null>;

  getRoles (id: number): Promise<CharacterRoleEntity[]>;

  assignToPlayer (id: number, playerId: number): Promise<boolean>;
}