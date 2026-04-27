import { openPage, collectData } from "./lib";
import "./events";

const minimap = RequestScaleformMovie("minimap");
SetRadarBigmapEnabled(true, false);
SetRadarBigmapEnabled(false, false);

setTick(() => {
  [1, 2, 3, 4, 6, 7, 8, 9, 13, 20].forEach((el) => {
    HideHudComponentThisFrame(el);
  });

  BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR");
  ScaleformMovieMethodAddParamInt(3);
  EndScaleformMovieMethod();

  collectData();
});

RegisterCommand("inventory", () => openPage("inventory"), true);
RegisterKeyMapping("inventory", "Open inventory", "keyboard", "i");
