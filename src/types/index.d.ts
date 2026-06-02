declare global {
  interface CitizenExports {
    // Base resources
    sessionmanager: any;
    mapmanager: MapManager;
    spawnmanager: SpawnManager;
  }

  var exports: CitizenExports;

  function DrawMarker(
    _type: number,
    posX: number,
    posY: number,
    posZ: number,
    dirX: number,
    dirY: number,
    dirZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    scaleX: number,
    scaleY: number,
    scaleZ: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    bobUpAndDown: boolean,
    faceCamera: boolean,
    rotationOrder: number,
    rotate: boolean,
    textureDict: string | null,
    textureName: string | null,
    drawOnEnts: boolean,
  ): void;
}

export type TypedStateBag<T extends object> = T & {
  set<K extends keyof T>(key: K, value: T[K], replicated: boolean): void;
};

export interface TypedEntityInterface<T extends object> {
  state: TypedStateBag<T>;
}

export type StateBagFields<T> = {
  [K in keyof T]: T[K];
};

export type BaseEvents =
  | "baseevents:onPlayerDied"
  | "baseevents:onPlayerKilled"
  | "baseevents:onPlayerWasted"
  | "baseevents:enteringVehicle"
  | "baseevents:enteringAborting"
  | "baseevents:enteredVehicle"
  | "baseevents:leftVehicle";

export type SpawnData = {
  x: number;
  y: number;
  z: number;
  heading?: number;
  model: string;
  skipFade?: boolean;
};

export type DeathData = {
  killerType: number;
  weaponHash: string;
  killerInVeh: boolean;
  killerVehSeat: number;
  killerVehName: string;
  deathCoords: [number, number, number];
};

export type BaseEventOnPlayerDiedCallback = (killerType: number, deathCoords: [number, number, number]) => void;

export type BaseEventOnPlayerKilledCallback = (killerId: number, deathData: DeathData) => void;

export type BaseEventOnPlayerWastedCallback = (deathCoords: [number, number, number]) => void;

export type BaseEventEnteringVehicleCallback = (
  targetVehicle: number,
  vehicleSeat: number,
  vehicleDisplayName: string,
) => void;

export type BaseEventEnteringAbortedCallback = () => void;

export type BaseEventEnteredVehicleCallback = (
  currentVehicle: number,
  currentSeat: number,
  vehicleDisplayName: string,
) => void;

export type BaseEventLeftVehicleCallback = (
  currentVehicle: number,
  currentSeat: number,
  vehicleDisplayName: string,
  vehicleNetId: number,
) => void;

export type KeyboardKeys =
  | "LBUTTON"
  | "RBUTTON"
  | "MBUTTON"
  | "XBUTTON1"
  | "XBUTTON2"
  | "TAB"
  | "RETURN"
  | "SHIFT"
  | "CONTROL"
  | "MENU"
  | "SPACE"
  | "PRIOR"
  | "NEXT"
  | "HOME"
  | "END"
  | "LEFT"
  | "UP"
  | "RIGHT"
  | "DOWN"
  | "INSERT"
  | "DELETE"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "N"
  | "M"
  | "P"
  | "U"
  | "X"
  | "Y"
  | "Z"
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12";

export interface CharacterState extends CharacterEntity {
  playerId: number;
  frozen: boolean;
  breath: number;
  isInWater: boolean;
}

export interface SpawnManager {
  /**
   * Choose specifically when or where to spawn a player.
   *
   * Once the player has spawned, the playerSpawned event will be triggered.
   *
   * @param spawnIdx Spawn point from a map resource registered by mapmanager,
   * or can be added with addSpawnPoint. Instead of an integer, you can pass
   * a table defining a spawn point. If this isn't specified, a random spawn point
   * will be picked out of the already registered spawn points (if any).
   * @param callback Executed once the player has successfully spawned and passes
   * a spawn object as specified in playerSpawned.
   */
  spawnPlayer(spawnIdx?: number | SpawnData, callback?: (spawn: SpawnData) => void): void;

  /**
   * Add a spawn point to the spawnmanager and returns an index for that spawnpoint.
   *
   * @param spawn
   */
  addSpawnPoint(spawn: SpawnData): number;

  /**
   * Remove an existing spawnpoint from the spawnmanager.
   *
   * @param spawnIdx The index of the spawnpoint to remove.
   */
  removeSpawnPoint(spawnIdx: number): void;

  /**
   * Loads a set of spawn points into the spawnmanager from a JSON string.
   *
   * @param spawnString An array of spawn objects in JSON format
   * @example {'spawns': [{ x: 466.8401, y: 197.7201, z: 111.5291, heading: 291.71, model: 'a_m_m_farmer_01'}]}
   */
  loadSpawns(spawnString: string): void;

  /**
   * Change the auto-spawning flag.
   * When this is enabled, players will be automatically spawned upon joining the server at a random spawnpoint.
   * After dying, they will also be respawned after 2 seconds.
   * To instantly and forcefully respawn the player without the cooldown, use forceRespawn.
   *
   * To determine which spawn point to use in auto-spawning, use setAutoSpawnCallback.
   *
   * If auto-spawning is disabled, you have to manually call spawnPlayer.
   *
   * @param enabled
   */
  setAutoSpawn(enabled: boolean): void;

  /**
   * Choose your own callback for autospawning.
   *
   * @param callback
   */
  setAutoSpawnCallback(callback: CallableFunction): void;

  /**
   * If the auto-spawn flag is enabled, instantly and forcefully respawns the player, disregarding the 2 second cooldown.
   */
  forceRespawn(): void;
}

export interface MapManager {
  /**
   * Returns the current game type.
   */
  getCurrentGameType(): string;

  /**
   * Returns the current map.
   */
  getCurrentMap(): string;

  /**
   * Changes the current game type.
   *
   * @param gameType
   */
  changeGameType(gameType: string): void;

  /**
   * Changes the current map.
   *
   * @param map
   */
  changeMap(map: string): void;

  /**
   * Returns a bool variables as to whether or not a map supports a game type.
   *
   * @param gameType
   * @param map
   */
  doesMapSupportGameType(gameType: string, map: string): boolean;

  /**
   * Returns a table of all available maps.
   */
  getMaps(): string[];

  /**
   * Will end a round.
   */
  roundEnded(): void;
}

export type PlayerEntity = {
  id: number;
  steam: string;
  discord: string;
  license: string;
  whitelisted: boolean;
  banned: boolean;
  banReason: string;
  characters: CharacterEntity[];
  connections: ConnectionEntity[];
  createdAt: Date;
  updatedAt: Date;
};

export type PlayerRoleEntity = {
  id: number;
  name: string;
};

export type CharacterEntity = {
  id: number;
  player: Promise<PlayerEntity>;
  firstname: string;
  lastname: string;
  age: number;
  sex: boolean;
  health: number;
  maxHealth: number;
  armour: number;
  maxArmour: number;
  eyeColor: number;
  hairFirstColor: number;
  headBlends: HeadBlendsEntity;
  faceFeatures: FaceFeaturesEntity;
  skills: SkillsEntity;
  componentVariations: ComponentVariationsEntity;
  headOverlays: HeadOverlaysEntity;
  lastPosition?: {
    x: number;
    y: number;
    z: number;
    heading: number;
  };
  model: string;
  knockdown: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type ConnectionEntity = {
  id: number;
  player: Promise<PlayerEntity>;
  identifiers: Record<string, string | number>;
  createdAt: Date;
};

export type CharacterRoleEntity = {
  id: number;
  name: string;
};

export type HeadBlendsEntity = {
  id: number;
  character: CharacterEntity;
  shapeFirstId: number;
  shapeSecondId: number;
  shapeThirdId: number;
  skinFirstId: number;
  skinSecondId: number;
  skinThirdId: number;
  shapeMix: number;
  skinMix: number;
  thirdMix: number;
  createdAt: Date;
  updatedAt: Date;
};

export type FaceFeaturesEntity = {
  id: number;
  character: CharacterEntity;
  noseWidth: number;
  nosePeak: number;
  noseLength: number;
  noseBoneCurveness: number;
  noseTip: number;
  noseBoneTwist: number;
  eyebrowUpDown: number;
  eyebrowInOut: number;
  cheekBones: number;
  cheekSidewaysBoneSize: number;
  cheekBonesWidth: number;
  eyeOpening: number;
  lipThickness: number;
  jawBoneWidth: number;
  jawBoneShape: number;
  chinBone: number;
  chinBoneLength: number;
  chinBoneShape: number;
  chinHole: number;
  neckThickness: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SkillsEntity = {
  id: number;
  character: CharacterEntity;
  stamina: number;
  strength: number;
  lungCapacity: number;
  wheelieAbility: number;
  flyingAbility: number;
  shootingAbility: number;
  stealthAbility: number;
  createdAt: Date;
  updatedAt: Date;
};

export type HeadOverlaysEntity = {
  id: number;
  character: CharacterEntity;
  blemishes: number;
  blemishesOpacity: number;
  facialHair: number;
  facialHairColor: number;
  facialHairSecondColor: number;
  facialHairOpacity: number;
  eyebrows: number;
  eyebrowsColor: number;
  eyebrowsSecondColor: number;
  eyebrowsOpacity: number;
  ageing: number;
  ageingOpacity: number;
  makeup: number;
  makeupColor: number;
  makeupSecondColor: number;
  makeupOpacity: number;
  blush: number;
  blushColor: number;
  blushSecondColor: number;
  blushOpacity: number;
  complexion: number;
  complexionOpacity: number;
  sunDamage: number;
  sunDamageOpacity: number;
  lipstick: number;
  lipstickColor: number;
  lipstickSecondColor: number;
  lipstickOpacity: number;
  molesFreckles: number;
  molesFrecklesColor: number;
  molesFrecklesSecondColor: number;
  molesFrecklesOpacity: number;
  chestHair: number;
  chestHairColor: number;
  chestHairSecondColor: number;
  chestHairOpacity: number;
  bodyBlemishes: number;
  bodyBlemishesOpacity: number;
  addBodyBlemishes: number;
  addBodyBlemishesOpacity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ComponentVariationsEntity = {
  id: number;
  character: CharacterEntity;
  faceDrawable: number;
  faceTexture: number;
  facePalette: number;
  maskDrawable: number;
  maskTexture: number;
  maskPalette: number;
  hairDrawable: number;
  hairTexture: number;
  hairPalette: number;
  torsoDrawable: number;
  torsoTexture: number;
  torsoPalette: number;
  legDrawable: number;
  legTexture: number;
  legPalette: number;
  bagDrawable: number;
  bagTexture: number;
  bagPalette: number;
  shoesDrawable: number;
  shoesTexture: number;
  shoesPalette: number;
  accessoryDrawable: number;
  accessoryTexture: number;
  accessoryPalette: number;
  undershirtDrawable: number;
  undershirtTexture: number;
  undershirtPalette: number;
  kevlarDrawable: number;
  kevlarTexture: number;
  kevlarPalette: number;
  badgeDrawable: number;
  badgeTexture: number;
  badgePalette: number;
  torsoSecondDrawable: number;
  torsoSecondTexture: number;
  torsoSecondPalette: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ExcludeDTOFields = "id" | "player" | "character" | "createdAt" | "updatedAt" | "deletedAt";

export type HeadBlendsDto = Omit<HeadBlendsEntity, ExcludeDTOFields>;
export type FaceFeaturesDto = Omit<FaceFeaturesEntity, ExcludeDTOFields>;
export type SkillsDto = Omit<SkillsEntity, ExcludeDTOFields>;
export type ComponentVariationsDto = Omit<ComponentVariationsEntity, ExcludeDTOFields>;
export type HeadOverlaysDto = Omit<HeadOverlaysEntity, ExcludeDTOFields>;

export type CharacterDto = Omit<CharacterEntity, ExcludeDTOFields> & {
  headBlends: HeadBlendsDto;
  faceFeatures: FaceFeaturesDto;
  skills: SkillsDto;
  componentVariations: ComponentVariationsDto;
  headOverlays: HeadOverlaysDto;
};
