import {
  navigate,
  sendPlayerArmour,
  sendPlayerHealth,
  sendPlayerMaxArmour,
  sendPlayerMaxHealth,
  sendPlayerUnderwater,
  sendWorldData,
} from "./messages";
import { setFocus, openPage } from "./lib";
import "./events";

// @ts-ignore
const exports = global.exports as CivilExports;

on("onClientGameTypeStart", () => {
  DisplayRadar(false);

  setTick(() => {
    [1, 2, 3, 4, 6, 7, 8, 9, 13, 20].forEach((el) => {
      HideHudComponentThisFrame(el);
    });
  });
});

RegisterCommand(
  "characterCreator",
  () => {
    openPage("characterCreatorGenetics");
  },
  false
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
