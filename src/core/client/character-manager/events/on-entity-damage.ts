import { TypedLocalPlayer } from "@civil/typed-helpers/client";
import { random } from "~/helpers";

export function onEntityDamage(args: any[]) {
  const victim = args[0];
  const ped = PlayerPedId();

  if (victim !== ped) {
    return;
  }

  const player = TypedLocalPlayer();
  player.state.set("health", GetEntityHealth(ped), true);
  player.state.set("armour", GetPedArmour(ped), true);

  const shake = random(3, 7, 0.4);

  ShakeGameplayCam("FPS_BULLET_HIT_SHAKE", shake);
}
