import { init as commandsInit } from "./commands";
import { init as worldManagerInit } from "./world-manager";
import { init as characterManagerInit } from "./character-manager";
import { init as modelsInit } from "./models";
import { init as skillsInit } from "./skills";
import { toggleAmbientSounds, toggleEntityDensity } from "./world-manager/lib";

on("onClientResourceStart", (resource: string) => {
  if (resource !== GetCurrentResourceName()) {
    return;
  }

  // Init modules
  commandsInit();
  worldManagerInit();
  characterManagerInit();
  modelsInit();
  skillsInit();

  // Environment configuration
  DisableIdleCamera(true);
  SetArtificialLightsState(true);
  toggleEntityDensity(false);
  toggleAmbientSounds(false);
});

on("onClientResourceStop", (resource: string) => {
  if (resource !== GetCurrentResourceName()) {
    return;
  }

  // Reset environment configuration
  DisableIdleCamera(false);
  SetArtificialLightsState(false);
  toggleEntityDensity(true);
  toggleAmbientSounds(true);
});
