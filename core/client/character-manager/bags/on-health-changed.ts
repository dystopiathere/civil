import { ADDITIONAL_PED_HEALTH } from "../configs";

export function onHealthChanged(value: number) {
  const ped = GetPlayerPed(-1);
  const localPlayer = global.LocalPlayer as LocalPlayerInterface;

  if (value <= ADDITIONAL_PED_HEALTH) {
    value = ADDITIONAL_PED_HEALTH;

    if (!localPlayer.state.knockdown) {
      localPlayer.state.set("knockdown", true, true);
    }
  }

  SetEntityHealth(ped, value);
}
