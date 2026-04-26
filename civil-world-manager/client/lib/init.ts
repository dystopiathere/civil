import { placeMarkers } from "./place-markers";
import { toggleAmbientSounds } from "./toggle-ambient-sounds";
import { toggleEntityDensity } from "./toggle-entity-density";
import { updateWorldData } from "./update-world-data";

let interval: NodeJS.Timeout | undefined;
let densityTick: number | undefined;
let markersTick: number | undefined;

export function init() {
  if (interval) {
    clearInterval(interval);
  }

  if (densityTick) {
    clearTick(densityTick);
  }

  if (markersTick) {
    clearTick(markersTick);
  }

  interval = updateWorldData();
  densityTick = toggleEntityDensity(false);
  toggleAmbientSounds(false);
  SetArtificialLightsState(true);

  markersTick = placeMarkers();

  return () => {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    if (densityTick) {
      clearTick(densityTick);
      densityTick = undefined;
    }

    if (markersTick) {
      clearTick(markersTick);
      markersTick = undefined;
    }

    toggleEntityDensity(true);
    toggleAmbientSounds(true);
  };
}
