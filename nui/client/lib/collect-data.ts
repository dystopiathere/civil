import { sendPlayerUnderwater, sendSafeZone } from "../messages";

export function collectData() {
  if (IsPedSwimmingUnderWater(GetPlayerPed(-1))) {
    sendPlayerUnderwater(true);
  } else {
    sendPlayerUnderwater(false);
  }

  sendSafeZone(GetSafeZoneSize());
}
