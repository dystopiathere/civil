import { AnimationsManager, MapManager, NuiManager, PlayerManager, SpawnManager } from 'civil'

declare global {
  interface CitizenExports {
    mapmanager: MapManager;
    sessionmanager: any;
    spawnmanager: SpawnManager;
    playermanager: PlayerManager;
    nui: NuiManager;
    animationsmanager: AnimationsManager;
  }
}