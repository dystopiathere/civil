import {
  AnimationsManager,
  MapManager,
  CivilNuiManager,
  SpawnManager,
  FaceFeatures,
  HeadBlends,
  ComponentVariations,
  HeadOverlays,
  Skills,
  CivilHelpers,
  CivilModels,
} from "civil";

declare global {
  interface CitizenExports {
    // Base resources
    sessionmanager: any;
    mapmanager: MapManager;
    spawnmanager: SpawnManager;

    // Main resources
    civil_animations: AnimationsManager;
    civil_character_manager: any;
    civil_helpers: CivilHelpers;
    civil_injuries: any;
    civil_medicine: any;
    civil_models: CivilModels;
    civil_nui: CivilNuiManager;
    civil_skills: any;
    civil_spawn_manager: any;
    civil_world_manager: any;
  }

  interface LocalPlayerStateBagInterface {
    set(key: keyof LocalPlayerStateBagInterface, value: any, replicated: boolean): void;

    player_id: number;
    character_id: number;

    // character
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
    };
    model: string;
    knockdown: boolean;

    // skills
    stamina: number;
    strength: number;
    lung_capacity: number;
    wheelie_ability: number;
    flying_ability: number;
    shooting_ability: number;
    stealth_ability: number;
  }

  interface LocalPlayerInterface {
    state: LocalPlayerStateBagInterface;
  }

  namespace globalThis {
    var LocalPlayer: LocalPlayerInterface;
  }
}
