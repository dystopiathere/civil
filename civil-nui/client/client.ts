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

global.exports.civil_helpers.initialize(GetCurrentResourceName(), init);

// EXPORT MESSAGES
global.exports("sendPlayerHealth", sendPlayerHealth);
global.exports("sendPlayerMaxHealth", sendPlayerMaxHealth);
global.exports("sendPlayerArmour", sendPlayerArmour);
global.exports("sendPlayerMaxArmour", sendPlayerMaxArmour);
global.exports("sendWorldData", sendWorldData);
global.exports("sendPlayerUnderwater", sendPlayerUnderwater);
global.exports("navigate", navigate);

// EXPORT LIB
global.exports("setFocus", setFocus);
global.exports("openPage", openPage);
