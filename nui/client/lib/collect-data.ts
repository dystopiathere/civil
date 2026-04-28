import { zonesMapping } from "../configs";
import {
  sendPlayerArmour,
  sendPlayerHealth,
  sendPlayerMaxArmour,
  sendPlayerMaxHealth,
  sendPlayerUnderwater,
  sendSafeZone,
  sendWorldData,
} from "../messages";

export function collectData() {
  const ped = GetPlayerPed(-1);

  if (IsPedSwimmingUnderWater(GetPlayerPed(-1))) {
    sendPlayerUnderwater(true);
  } else {
    sendPlayerUnderwater(false);
  }

  sendSafeZone(GetSafeZoneSize());

  sendPlayerHealth(GetEntityHealth(ped));
  sendPlayerMaxHealth(GetEntityMaxHealth(ped));
  sendPlayerArmour(GetPedArmour(ped));
  sendPlayerMaxArmour(GetPlayerMaxArmour(PlayerId()));

  const [x, y, z] = GetEntityCoords(ped, false);
  const [streetNameHash] = GetStreetNameAtCoord(x, y, z);
  const streetName = GetStreetNameFromHashKey(streetNameHash);
  const zoneName = GetNameOfZone(x, y, z);

  const hours = GetClockHours().toString().padStart(2, "0");
  const minutes = GetClockMinutes().toString().padStart(2, "0");

  const time = `${hours}:${minutes}`;

  sendWorldData({
    streetName,
    zoneName: zonesMapping[zoneName] ?? zoneName,
    time,
  });
}
