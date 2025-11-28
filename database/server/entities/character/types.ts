import { HeadBlends } from '../head-blends'
import { FaceFeatures } from '../face-features'
import { Skills } from '../skills'
import { ComponentVariations } from '../component-variations'
import { HeadOverlays } from '../head-overlays'
import { CharacterRole } from '../character-role'

export interface ICharacter {
  getHeadBlends (id: number): Promise<HeadBlends | null>;

  getFaceFeatures (id: number): Promise<FaceFeatures | null>;

  getSkills (id: number): Promise<Skills | null>;

  getComponentVariations (id: number): Promise<ComponentVariations | null>;

  getHeadOverlays (id: number): Promise<HeadOverlays | null>;

  getRoles (id: number): Promise<CharacterRole[]>;

  assignToPlayer (id: number, playerId: number): Promise<boolean>;
}

export type Character = {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  sex: boolean;
  health: number;
  max_health: number;
  armour: number;
  max_armour: number;
  eye_color: number;
  hair_first_color: number;
  head_blends_id: number;
  face_features_id: number;
  skills_id: number;
  component_variations_id: number;
  head_overlays_id: number;
  last_position: {
    x: number;
    y: number;
    z: number;
    heading: number;
  }
  model: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type FullCharacter = Character & {
  head_blends: HeadBlends;
  face_features: FaceFeatures;
  skills: Skills;
  head_overlays: HeadOverlays;
  component_variations: ComponentVariations;
}