let knockdownTick: number | undefined;

export function onKnockdownChanged(value: boolean) {
  if (knockdownTick) {
    clearTick(knockdownTick);
    knockdownTick = undefined;
  }

  const ped = GetPlayerPed(-1);

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
}
