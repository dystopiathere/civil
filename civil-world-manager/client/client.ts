import { toggleAmbientSounds, toggleEntityDensity } from "./lib";
import { zonesMapping } from "./config";

const exports = global.exports as CitizenExports;

let interval: NodeJS.Timer;
let densityTick: number;

on("onResourceStart", () => {
  if (densityTick) {
    clearTick(densityTick);
  }

  densityTick = toggleEntityDensity(false);
  toggleAmbientSounds(false);
  SetArtificialLightsState(true);
});

on("onResourceStop", () => {
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
  SetArtificialLightsState(false);
});

on("playerSpawned", () => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const player = global.LocalPlayer as LocalPlayerInterface;

    const playerPed = GetPlayerPed(-1);
    const [x, y, z] = GetEntityCoords(playerPed, false);
    const heading = GetEntityHeading(playerPed);

    const [streetNameHash] = GetStreetNameAtCoord(x, y, z);
    const streetName = GetStreetNameFromHashKey(streetNameHash);
    const zoneName = GetNameOfZone(x, y, z);

    player.state.set("last_position", { x, y, z, heading }, true);

    const hours = GetClockHours().toString().padStart(2, "0");
    const minutes = GetClockMinutes().toString().padStart(2, "0");

    const time = `${hours}:${minutes}`;

    exports.civil_nui.sendWorldData({
      streetName,
      zoneName: zonesMapping[zoneName] ?? zoneName,
      time,
    });
  }, 100);
});
