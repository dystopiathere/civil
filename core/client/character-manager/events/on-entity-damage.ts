import { random } from "~/helpers";

export function onEntityDamage(args: any[]) {
  const victim = args[0];
  const ped = GetPlayerPed(-1);

  if (victim !== ped) {
    return;
  }

  const localPlayer = global.LocalPlayer as LocalPlayerInterface;
  localPlayer.state.set("health", GetEntityHealth(ped), true);
  localPlayer.state.set("armour", GetPedArmour(ped), true);

  const shake = random(3, 7, 0.4);

  ShakeGameplayCam("FPS_BULLET_HIT_SHAKE", shake);
}
