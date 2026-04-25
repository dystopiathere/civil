import {
  navigate,
  sendPlayerArmour,
  sendPlayerHealth,
  sendPlayerMaxArmour,
  sendPlayerMaxHealth,
  sendPlayerUnderwater,
  sendWorldData,
} from "./messages";
import { setFocus, openPage, init } from "./lib";
import "./events";

const exports = global.exports as CitizenExports;

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
