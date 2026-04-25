import { toggleAmbientSounds } from "./toggle-ambient-sounds";
import { toggleEntityDensity } from "./toggle-entity-density";
import { updateWorldData } from "./update-world-data";

let interval: NodeJS.Timeout | undefined;
let densityTick: number | undefined;

export function init() {
  if (interval) {
    clearInterval(interval);
  }

  if (densityTick) {
    clearTick(densityTick);
  }

  interval = updateWorldData();
  densityTick = toggleEntityDensity(false);
  toggleAmbientSounds(false);
  SetArtificialLightsState(true);

  return () => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    if (densityTick) {
      clearTick(densityTick);
      densityTick = undefined;
    }

    toggleEntityDensity(true);
    toggleAmbientSounds(true);
  };
}
