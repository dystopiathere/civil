import { ADDITIONAL_PED_HEALTH } from "../config";

type Keys = "health" | "max_health" | "armour" | "max_armour" | "knockdown";

const keys: Keys[] = ["health", "max_health", "armour", "max_armour", "knockdown"];

let underwaterTick: number | undefined;
let knockdownInterval: NodeJS.Timeout | undefined;
let stateBagHandler: number | undefined;
let knockdownOutOfVehicleTick: number | undefined;

export function init() {
  if (underwaterTick) {
    clearTick(underwaterTick);
  }

  if (stateBagHandler) {
    RemoveStateBagChangeHandler(stateBagHandler);
  }

  underwaterTick = setTick(() => {
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
    if (underwaterTick) {
      clearTick(underwaterTick);
      underwaterTick = undefined;
    }

    if (stateBagHandler) {
      RemoveStateBagChangeHandler(stateBagHandler);
      stateBagHandler = undefined;
    }

    if (knockdownInterval) {
      clearInterval(knockdownInterval);
      knockdownInterval = undefined;
    }

    if (knockdownOutOfVehicleTick) {
      clearTick(knockdownOutOfVehicleTick);
      knockdownOutOfVehicleTick = undefined;
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

      SetEntityHealth(ped, value);
      exports.civil_nui.sendPlayerHealth(value - ADDITIONAL_PED_HEALTH);

      if (value <= ADDITIONAL_PED_HEALTH && !localPlayer.state.knockdown) {
        localPlayer.state.set("knockdown", true, true);
      }

      if (value > ADDITIONAL_PED_HEALTH && localPlayer.state.knockdown) {
        localPlayer.state.set("knockdown", false, true);
      }

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
      if (knockdownInterval) {
        clearInterval(knockdownInterval);
      }

      if (knockdownOutOfVehicleTick) {
        clearTick(knockdownOutOfVehicleTick);
      }

      value = value as boolean;

      if (value) {
        SetEntityInvincible(ped, true);

        if (IsPedInAnyVehicle(ped, true)) {
          const veh = GetVehiclePedIsIn(ped, false);
          TaskLeaveVehicle(ped, veh, 320);

          await new Promise((resolve) => {
            knockdownOutOfVehicleTick = setTick(() => {
              if (!IsPedInAnyVehicle(ped, true) && knockdownOutOfVehicleTick) {
                clearTick(knockdownOutOfVehicleTick);
                resolve(true);
              }
            });
          });
        }

        if (IsPedRagdoll(ped)) {
          ResetPedRagdollTimer(ped);
        } else {
          SetPedToRagdoll(ped, 2000, 2000, 0, false, false, true);
        }

        knockdownInterval = setInterval(() => {
          ResetPedRagdollTimer(ped);
        }, 200);
      } else {
        SetEntityInvincible(ped, false);

        if (knockdownInterval) {
          clearInterval(knockdownInterval);
          knockdownInterval = undefined;
        }
      }

      break;
  }
}
