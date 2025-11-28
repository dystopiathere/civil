import { playAnimationChain } from './animationsmanager/client/lib/playAnimationChain'

declare module 'civil' {
  export type SpawnData = {
    x: number;
    y: number;
    z: number;
    heading?: number;
    model: string;
    skipFade?: boolean;
  };

  export enum PedTypes {
    Michael = 0,
    Franklin = 1,
    Trevor = 2,

    Army = 29,
    Animal = 28,
    SWAT = 27,
    LSFD = 21,
    Paramedic = 20,

    Cop = 6,

    Male = 4,
    Female = 5,

    Human = 26,
  }

  export type AnimationFlag =
    | 'LOOPING'
    | 'HOLD_LAST_FRAME'
    | 'REPOSITION_WHEN_FINISHED'
    | 'NOT_INTERRUPTABLE'
    | 'UPPERBODY'
    | 'SECONDARY'
    | 'REORIENT_WHEN_FINISHED'
    | 'ABORT_ON_PED_MOVEMENT'
    | 'ADDITIVE'
    | 'TURN_OFF_COLLISION'
    | 'OVERRIDE_PHYSICS'
    | 'IGNORE_GRAVITY'
    | 'EXTRACT_INITIAL_OFFSET'
    | 'EXIT_AFTER_INTERRUPTED'
    | 'TAG_SYNC_IN'
    | 'TAG_SYNC_OUT'
    | 'TAG_SYNC_CONTINUOUS'
    | 'FORCE_START'
    | 'USE_KINEMATIC_PHYSICS'
    | 'USE_MOVER_EXTRACTION'
    | 'HIDE_WEAPON'
    | 'ENDS_IN_DEAD_POSE'
    | 'ACTIVATE_RAGDOLL_ON_COLLISION'
    | 'DONT_EXIT_ON_DEATH'
    | 'ABORT_ON_WEAPON_DAMAGE'
    | 'DISABLE_FORCED_PHYSICS_UPDATE'
    | 'PROCESS_ATTACHMENTS_ON_START'
    | 'EXPAND_PED_CAPSULE_FROM_SKELETON'
    | 'USE_ALTERNATIVE_FP_ANIM'
    | 'BLENDOUT_WRT_LAST_FRAME'
    | 'USE_FULL_BLENDING';

  export type AnimationChainName =
    | 'reviveSavior'
    | 'reviveVictim';

  export type AnimationChainData = {
    dictionary: string;
    name: string;
    flags: AnimationFlag[];
    duration?: number;
  }

  export enum BaseEvents {
    OnPlayerDied = 'baseevents:onPlayerDied',
    OnPlayerKilled = 'baseevents:onPlayerKilled',
    OnPlayerWasted = 'baseevents:onPlayerWasted',
    EnteringVehicle = 'baseevents:enteringVehicle',
    EnteringAborted = 'baseevents:enteringAborting',
    EnteredVehicle = 'baseevents:enteredVehicle',
    LeftVehicle = 'baseevents:leftVehicle',
  }

  export type DeathData = {
    killerType: PedTypes;
    weaponHash: string;
    killerInVeh: boolean;
    killerVehSeat: number;
    killerVehName: string;
    deathCoords: [number, number, number];
  };

  export type BaseEventOnPlayerDiedCallback = (killerType: PedTypes, deathCoords: [number, number, number]) => void;

  export type BaseEventOnPlayerKilledCallback = (killerId: number, deathData: DeathData) => void;

  export type BaseEventOnPlayerWastedCallback = (deathCoords: [number, number, number]) => void;

  export type BaseEventEnteringVehicleCallback = (targetVehicle: number, vehicleSeat: number, vehicleDisplayName: string) => void;

  export type BaseEventEnteringAbortedCallback = () => void;

  export type BaseEventEnteredVehicleCallback = (currentVehicle: number, currentSeat: number, vehicleDisplayName: string) => void;

  export type BaseEventLeftVehicleCallback = (currentVehicle: number, currentSeat: number, vehicleDisplayName: string, vehicleNetId: number) => void;

  interface AnimationsManager {
    /**
     * Play solo animation from chosen dictionary
     *
     * @param ped
     * @param animDict
     * @param anim
     * @param flags
     * @param duration
     * @param chained
     */
    playAnimation (ped: number, animDict: string, anim: string, flags?: AnimationFlag[], duration?: number, chained?: boolean): Promise<number>;

    /**
     * Play pre-configured animations chain
     *
     * @param ped
     * @param chainName
     */
    playAnimationChain (ped: number, chainName: AnimationChainName): Promise<number>;
  }

  interface SpawnManager {
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
    spawnPlayer (spawnIdx?: number | SpawnData, callback?: (spawn: SpawnData) => void): void;

    /**
     * Add a spawn point to the spawnmanager and returns an index for that spawnpoint.
     *
     * @param spawn
     */
    addSpawnPoint (spawn: SpawnData): number;

    /**
     * Remove an existing spawnpoint from the spawnmanager.
     *
     * @param spawnIdx The index of the spawnpoint to remove.
     */
    removeSpawnPoint (spawnIdx: number): void;

    /**
     * Loads a set of spawn points into the spawnmanager from a JSON string.
     *
     * @param spawnString An array of spawn objects in JSON format
     * @example {'spawns': [{ x: 466.8401, y: 197.7201, z: 111.5291, heading: 291.71, model: 'a_m_m_farmer_01'}]}
     */
    loadSpawns (spawnString: string): void;

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
    setAutoSpawn (enabled: boolean): void;

    /**
     * Choose your own callback for autospawning.
     *
     * @param callback
     */
    setAutoSpawnCallback (callback: CallableFunction): void;

    /**
     * If the auto-spawn flag is enabled, instantly and forcefully respawns the player, disregarding the 2 second cooldown.
     */
    forceRespawn (): void;
  }

  interface MapManager {

    /**
     * Returns the current game type.
     */
    getCurrentGameType (): string;

    /**
     * Returns the current map.
     */
    getCurrentMap (): string;

    /**
     * Changes the current game type.
     *
     * @param gameType
     */
    changeGameType (gameType: string): void;

    /**
     * Changes the current map.
     *
     * @param map
     */
    changeMap (map: string): void;

    /**
     * Returns a bool variables as to whether or not a map supports a game type.
     *
     * @param gameType
     * @param map
     */
    doesMapSupportGameType (gameType: string, map: string): boolean;

    /**
     * Returns a table of all available maps.
     */
    getMaps (): string[];

    /**
     * Will end a round.
     */
    roundEnded (): void;
  }

  interface NuiManager {
    /**
     * Send update player state NUI event
     */
    sendPlayerStats (): void;

    /**
     * Send update player underwater state NUI event
     *
     * @param isInWater
     */
    sendPlayerUnderwater (isInWater: boolean): void;

    /**
     * Send world data NUI event
     *
     * @param data
     */
    sendWorldData (data: { streetName: string, zoneName: string, time: string }): void;

    /**
     * Send character data
     */
    sendCharacterData (): void;

    /**
     *
     * @param page
     */
    navigate (page: string): void;
  }

  interface PlayerManager {
    /**
     * Change player state
     *
     * @param data
     */
    setPlayerState (data: Partial<FullCharacterEntity>): void;

    /**
     * Set player skills level
     *
     * @param data
     */
    setPlayerSkills (data: Partial<FullCharacterEntity>): void;

    /**
     * Set and enable player regeneration
     *
     * @param limit
     * @param regenRate
     * @param enabled
     */
    setPlayerRegeneration (limit: number, regenRate: number, enabled: boolean): void;

    /**
     * Update ped components
     *
     * @param data
     */
    updateFreemodeModel (data: Partial<FullCharacterEntity>): void
  }

  export type PlayerEntity = {
    id: number;
    steam: string;
    discord: string;
    license: string;
    whitelisted: boolean;
    banned: boolean;
    ban_reason: string;
    last_connection_at: string;
    created_at: string;
    updated_at: string;
  }

  export type CharacterEntity = {
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
    created_at: string;
    updated_at: string;
  }

  export type HeadBlendsEntity = {
    id: number;
    shape_first_id: number;
    shape_second_id: number;
    shape_third_id: number;
    skin_first_id: number;
    skin_second_id: number;
    skin_third_id: number;
    shape_mix: number;
    skin_mix: number;
    third_mix: number;
    created_at: string;
    updated_at: string;
  }

  export type FaceFeaturesEntity = {
    id: number;
    nose_width: number;
    nose_peak: number;
    nose_length: number;
    nose_bone_curveness: number;
    nose_tip: number;
    nose_bone_twist: number;
    eyebrow_up_down: number;
    eyebrow_in_out: number;
    cheek_bones: number;
    cheek_sideways_bone_size: number;
    cheek_bones_width: number;
    eye_opening: number;
    lip_thickness: number;
    jaw_bone_width: number;
    jaw_bone_shape: number;
    chin_bone: number;
    chin_bone_length: number;
    chin_bone_shape: number;
    chin_hole: number;
    neck_thickness: number;
    created_at: string;
    updated_at: string;
  }

  export type SkillsEntity = {
    id: number;
    stamina: number;
    strength: number;
    lung_capacity: number;
    wheelie_ability: number;
    flying_ability: number;
    shooting_ability: number;
    stealth_ability: number;
  }

  export type HeadOverlaysEntity = {
    id: number;
    blemishes: number;
    blemishes_opacity: number;
    facial_hair: number;
    facial_hair_color: number;
    facial_hair_second_color: number;
    facial_hair_opacity: number;
    eyebrows: number;
    eyebrows_color: number;
    eyebrows_second_color: number;
    eyebrows_opacity: number;
    ageing: number;
    ageing_opacity: number;
    makeup: number;
    makeup_color: number;
    makeup_second_color: number;
    makeup_opacity: number;
    blush: number;
    blush_color: number;
    blush_second_color: number;
    blush_opacity: number;
    complexion: number;
    complexion_opacity: number;
    sun_damage: number;
    sun_damage_opacity: number;
    lipstick: number;
    lipstick_color: number;
    lipstick_second_color: number;
    lipstick_opacity: number;
    moles_freckles: number;
    moles_freckles_color: number;
    moles_freckles_second_color: number;
    moles_freckles_opacity: number;
    chest_hair: number;
    chest_hair_color: number;
    chest_hair_second_color: number;
    chest_hair_opacity: number;
    body_blemishes: number;
    body_blemishes_opacity: number;
    add_body_blemishes: number;
    add_body_blemishes_opacity: number;
    created_at: string;
    updated_at: string;
  }

  export type ComponentVariationsEntity = {
    id: number;
    face_drawable: number;
    face_texture: number;
    face_palette: number;
    mask_drawable: number;
    mask_texture: number;
    mask_palette: number;
    hair_drawable: number;
    hair_texture: number;
    hair_palette: number;
    torso_drawable: number;
    torso_texture: number;
    torso_palette: number;
    leg_drawable: number;
    leg_texture: number;
    leg_palette: number;
    bag_drawable: number;
    bag_texture: number;
    bag_palette: number;
    shoes_drawable: number;
    shoes_texture: number;
    shoes_palette: number;
    accessory_drawable: number;
    accessory_texture: number;
    accessory_palette: number;
    undershirt_drawable: number;
    undershirt_texture: number;
    undershirt_palette: number;
    kevlar_drawable: number;
    kevlar_texture: number;
    kevlar_palette: number;
    badge_drawable: number;
    badge_texture: number;
    badge_palette: number;
    torso_second_drawable: number;
    torso_second_texture: number;
    torso_second_palette: number;
    created_at: string;
    updated_at: string;
  }

  export type FullCharacterEntity = CharacterEntity & {
    head_blends: HeadBlendsEntity;
    face_features: FaceFeaturesEntity;
    skills: SkillsEntity;
    head_overlays: HeadOverlaysEntity;
    component_variations: ComponentVariationsEntity;
  }
}