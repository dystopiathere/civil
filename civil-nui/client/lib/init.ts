import { sendSafeZone } from "../messages";

let nuiTick: number | undefined;
let nuiInterval: NodeJS.Timeout | undefined;

export function init() {
  if (nuiTick) {
    clearTick(nuiTick);
  }

  if (nuiInterval) {
    clearInterval(nuiInterval);
  }

  const minimap = RequestScaleformMovie("minimap");
  SetRadarBigmapEnabled(true, false);
  SetRadarBigmapEnabled(false, false);

  nuiTick = setTick(() => {
    [1, 2, 3, 4, 6, 7, 8, 9, 13, 20].forEach((el) => {
      HideHudComponentThisFrame(el);
    });

    BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR");
    ScaleformMovieMethodAddParamInt(3);
    EndScaleformMovieMethod();
  });

  nuiInterval = setInterval(() => {
    sendSafeZone(GetSafeZoneSize());
  }, 500);

  return () => {
    if (nuiTick) {
      clearTick(nuiTick);
      nuiTick = undefined;
    }

    if (nuiInterval) {
      clearInterval(nuiInterval);
      nuiInterval = undefined;
    }
  };
}
