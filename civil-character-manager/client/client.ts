const exports = global.exports as CitizenExports;

type Keys = "health" | "max_health" | "armour" | "max_armour" | "knockdown";

const keys: Keys[] = ["health", "max_health", "armour", "max_armour", "knockdown"];

let underwaterTick: number;
let knockdownInterval: NodeJS.Timer;
let stateBagHandler: number;

const ADDITIONAL_PED_HEALTH = 300;

on("gameEventTriggered", (name: string, args: any[]) => {
  // console.log(`game event triggered: ${name}, args: ${args.join(", ")}`);

  if (name === "CEventNetworkEntityDamage") {
    const victim = args[0];
    const ped = GetPlayerPed(-1);

    if (victim === ped) {
      global.LocalPlayer.state.set("health", GetEntityHealth(ped), true);
    }
  }
});

on("onClientGameTypeStart", () => {
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

  stateBagHandler = AddStateBagChangeHandler(
    null,
    `player:${GetPlayerServerId(PlayerId())}`,
    (bagName: string, key: Keys, value: LocalPlayerStateBagInterface[Keys]) => {
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

          value = value as boolean;

          if (value) {
            SetEntityInvincible(ped, true);

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
  );
});

on("onClientGameTypeStop", () => {
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
});

on("playerSpawned", () => {
  const player = global.LocalPlayer as LocalPlayerInterface;

  const ped = GetPlayerPed(-1);

  SetEntityMaxHealth(ped, player.state.max_health);
  SetPedMaxHealth(ped, player.state.max_health);
  SetEntityHealth(ped, player.state.health);
  SetPlayerMaxArmour(PlayerId(), player.state.max_armour);
  SetPedArmour(ped, player.state.armour);

  if (player.state.knockdown) {
    SetPedToRagdoll(ped, 2000, 2000, 0, false, false, true);

    knockdownInterval = setInterval(() => {
      ResetPedRagdollTimer(ped);
    }, 1000);
  }

  exports.civil_nui.sendPlayerMaxHealth(player.state.max_health - ADDITIONAL_PED_HEALTH);
  exports.civil_nui.sendPlayerHealth(player.state.health - ADDITIONAL_PED_HEALTH);
  exports.civil_nui.sendPlayerMaxArmour(player.state.max_armour);
  exports.civil_nui.sendPlayerArmour(player.state.armour);
});

export {};
