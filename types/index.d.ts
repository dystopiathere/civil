import {
  MapManager,
  SpawnManager,
  FaceFeaturesEntity,
  HeadBlendsEntity,
  ComponentVariationsEntity,
  HeadOverlaysEntity,
  SkillsEntity,
} from "types/civil";

declare global {
  interface CitizenExports {
    // Base resources
    sessionmanager: any;
    mapmanager: MapManager;
    spawnmanager: SpawnManager;
  }

  interface LocalPlayerStateBagInterface {
    set(key: keyof LocalPlayerStateBagInterface, value: any, replicated: boolean): void;

    id: number;
    player_id: number;
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
    head_blends: HeadBlendsEntity;
    face_features: FaceFeaturesEntity;
    skills: SkillsEntity;
    component_variations: ComponentVariationsEntity;
    head_overlays: HeadOverlaysEntity;
    last_position: {
      x: number;
      y: number;
      z: number;
      heading: number;
    };
    model: string;
    knockdown: boolean;
  }

  interface LocalPlayerInterface {
    state: LocalPlayerStateBagInterface;
  }

  namespace globalThis {
    var LocalPlayer: LocalPlayerInterface;
  }
}
