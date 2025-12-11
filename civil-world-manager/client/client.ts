import { disableAmbientSounds, disableEntityDensity } from "./lib";
import { zonesMapping } from "./config";

// @ts-ignore
const exports = global.exports as CivilExports;

let interval: NodeJS.Timer;

on("onClientGameTypeStart", () => {
  disableEntityDensity();
  disableAmbientSounds();
});

on("playerSpawned", () => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const playerPed = GetPlayerPed(-1);
    const [x, y, z] = GetEntityCoords(playerPed, false);
    const heading = GetEntityHeading(playerPed);

    const [streetNameHash] = GetStreetNameAtCoord(x, y, z);
    const streetName = GetStreetNameFromHashKey(streetNameHash);
    const zoneName = GetNameOfZone(x, y, z);

    global.LocalPlayer.state.set("last_position", { x, y, z, heading }, true);

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
