let tick: number;

export function toggleEntityDensity(state: boolean): number {
  SetPedPopulationBudget(state ? 3 : 0);
  SetVehiclePopulationBudget(state ? 3 : 0);

  SetPoliceIgnorePlayer(PlayerId(), !state);
  SetDispatchCopsForPlayer(PlayerId(), state);
  SetPlayerWantedLevel(PlayerId(), 0, state);
  SetPlayerWantedLevelNow(PlayerId(), state);
  SetPlayerWantedLevelNoDrop(PlayerId(), 0, state);
  Array.from({ length: 12 }).forEach((_, id) => EnableDispatchService(id + 1, state));

  if (state && tick) {
    clearTick(tick);
    tick = undefined;
    return 0;
  }

  if (state) {
    return 0;
  }

  tick = setTick(() => {
    SetPedDensityMultiplierThisFrame(0);
    SetScenarioPedDensityMultiplierThisFrame(0, 0);

    SetVehicleDensityMultiplierThisFrame(0);
    SetRandomVehicleDensityMultiplierThisFrame(0);
    SetParkedVehicleDensityMultiplierThisFrame(0);
    SetAmbientVehicleRangeMultiplierThisFrame(0);
  });

  return tick;
}
