import {
  AnimationsManager,
  MapManager,
  NuiManager,
  SpawnManager,
  FaceFeatures,
  HeadBlends,
  ComponentVariations,
  HeadOverlays,
  Skills,
  CivilHelpers, CivilModels
} from 'civil'

declare global {
  interface CitizenExports {
    (exportKey: string | number, exportFunction: Function): void;

    // Base resources
    sessionmanager: any;
    mapmanager: MapManager;
    spawnmanager: SpawnManager;

    // Main resources
    civil_animations: AnimationsManager;
    civil_character_manager: any;
    civil_character_creator: any;
    civil_helpers: CivilHelpers;
    civil_injuries: any;
    civil_medicine: any;
    civil_models: CivilModels;
    civil_nui: NuiManager;
    civil_skills: any
    civil_spawn_manager: any
    civil_world_manager: any
  }

  interface StateBagInterface {
    set (key: keyof StateBagInterface, value: any, replicated: boolean): void

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
    head_blends: HeadBlends;
    face_features: FaceFeatures;
    skills: Skills;
    component_variations: ComponentVariations;
    head_overlays: HeadOverlays;
    last_position: {
      x: number;
      y: number;
      z: number;
      heading: number;
    }
    model: string;
  }

  interface EntityInterface {
    state: StateBagInterface;
  }

  namespace globalThis {
    var LocalPlayer: EntityInterface
    // @ts-ignore
    var exports: CitizenExports
  }
}