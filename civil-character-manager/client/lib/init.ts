import { ADDITIONAL_PED_HEALTH } from "../config";

type Keys = "health" | "max_health" | "armour" | "max_armour" | "knockdown";

const keys: Keys[] = ["health", "max_health", "armour", "max_armour", "knockdown"];

let mainTick: number | undefined;
let knockdownTick: number | undefined;
let stateBagHandler: number | undefined;

export function init() {
  if (mainTick) {
    clearTick(mainTick);
  }

  if (stateBagHandler) {
    RemoveStateBagChangeHandler(stateBagHandler);
  }

  mainTick = setTick(() => {
    if (IsPedSwimmingUnderWater(GetPlayerPed(-1))) {
      exports.civil_nui.sendPlayerUnderwater(true);
    } else {
      exports.civil_nui.sendPlayerUnderwater(false);
    }
  });

  stateBagHandler = AddStateBagChangeHandler("", `player:${GetPlayerServerId(PlayerId())}`, handleStateBagChange);

  DisableIdleCamera(true);

  SetRunSprintMultiplierForPlayer(PlayerId(), 1.49);
  SetSwimMultiplierForPlayer(PlayerId(), 1.49);

  return () => {
    if (mainTick) {
      clearTick(mainTick);
      mainTick = undefined;
    }

    if (stateBagHandler) {
      RemoveStateBagChangeHandler(stateBagHandler);
      stateBagHandler = undefined;
    }

    if (knockdownTick) {
      clearTick(knockdownTick);
      knockdownTick = undefined;
    }

    DisableIdleCamera(false);
  };
}

async function handleStateBagChange(bagName: string, key: Keys, value: LocalPlayerStateBagInterface[Keys]) {
  if (!keys.includes(key)) {
    return;
  }

  const localPlayer = global.LocalPlayer as LocalPlayerInterface;

  const player = GetPlayerFromStateBagName(bagName);
  const ped = GetPlayerPed(player);

  switch (key) {
    case "health":
      value = value as number;

      if (value <= ADDITIONAL_PED_HEALTH) {
        value = ADDITIONAL_PED_HEALTH;

        if (!localPlayer.state.knockdown) {
          localPlayer.state.set("knockdown", true, true);
        }
      }

      SetEntityHealth(ped, value);
      exports.civil_nui.sendPlayerHealth(value - ADDITIONAL_PED_HEALTH);

      break;
    case "max_health":
      value = value as number;

      SetEntityMaxHealth(ped, value);
      SetPedMaxHealth(ped, value);

      exports.civil_nui.sendPlayerMaxHealth(value - ADDITIONAL_PED_HEALTH);

      break;
    case "armour":
      value = value as number;

      SetPedArmour(ped, value);
      exports.civil_nui.sendPlayerArmour(value);

      break;
    case "max_armour":
      value = value as number;

      SetPlayerMaxArmour(player, value);
      exports.civil_nui.sendPlayerMaxArmour(value);

      break;
    case "knockdown":
      value = value as boolean;

      if (knockdownTick) {
        clearTick(knockdownTick);
        knockdownTick = undefined;
      }

      SetEntityInvincible(ped, !!value);

      if (value) {
        if (IsPedInAnyVehicle(ped, false)) {
          const vehicle = GetVehiclePedIsIn(ped, false);
          const vehClass = GetVehicleClass(vehicle);

          ClearPedTasksImmediately(ped);

          if (vehClass !== 8 && vehClass !== 13) {
            SetVehicleDoorOpen(vehicle, 0, false, false);
          }

          const [velX, velY, velZ] = GetEntityVelocity(vehicle);
          SetEntityVelocity(ped, velX, velY, velZ);
        }

        knockdownTick = setTick(() => {
          SetPedToRagdoll(ped, 2000, 2000, 0, true, true, false);
          DisableControlAction(0, 30, true);
          DisableControlAction(0, 31, true);
          DisableControlAction(0, 32, true);
          DisableControlAction(0, 34, true);
        });
      }

      break;
  }
}
