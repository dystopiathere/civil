import { TypedLocalPlayer } from "@civil/typed-helpers/client";
import { ADDITIONAL_PED_HEALTH } from "../configs";

export function onHealthChanged(value: number) {
  const ped = PlayerPedId();
  const player = TypedLocalPlayer();

  if (value <= ADDITIONAL_PED_HEALTH) {
    value = ADDITIONAL_PED_HEALTH;

    if (!player.state.knockdown) {
      player.state.set("knockdown", true, true);
    }
  }

  SetEntityHealth(ped, value);
}
