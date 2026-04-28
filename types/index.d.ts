import { MapManager, SpawnManager, FullCharacterEntity } from "types/civil";

declare global {
  interface CitizenExports {
    // Base resources
    sessionmanager: any;
    mapmanager: MapManager;
    spawnmanager: SpawnManager;
  }

  interface LocalPlayerStateBagInterface extends FullCharacterEntity {
    set(key: keyof LocalPlayerStateBagInterface, value: any, replicated: boolean): void;

    player_id: number;
    frozen: boolean;
  }

  interface LocalPlayerInterface {
    state: LocalPlayerStateBagInterface;
  }

  namespace globalThis {
    var LocalPlayer: LocalPlayerInterface;
  }
}
