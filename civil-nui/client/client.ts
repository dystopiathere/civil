import {
  navigate,
  sendPlayerArmour,
  sendPlayerHealth,
  sendPlayerMaxArmour,
  sendPlayerMaxHealth,
  sendPlayerUnderwater,
  sendSafeZone,
  sendWorldData,
} from "./messages";
import { setFocus, openPage } from "./lib";
import "./events";

const exports = global.exports as CitizenExports;

let nuiTick: number | undefined;
let nuiInterval: NodeJS.Timeout | undefined;

function init() {
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

exports.civil_helpers.initialize(GetCurrentResourceName(), init);

RegisterCommand(
  "characterCreator",
  () => {
    openPage("characterCreatorGenetics");
  },
  false,
);

RegisterKeyMapping("characterCreator", "Open character creator", "keyboard", "g");

// EXPORT MESSAGES
exports("sendPlayerHealth", sendPlayerHealth);
exports("sendPlayerMaxHealth", sendPlayerMaxHealth);
exports("sendPlayerArmour", sendPlayerArmour);
exports("sendPlayerMaxArmour", sendPlayerMaxArmour);
exports("sendWorldData", sendWorldData);
exports("sendPlayerUnderwater", sendPlayerUnderwater);
exports("navigate", navigate);

// EXPORT LIB
exports("setFocus", setFocus);
exports("openPage", openPage);
