let tick: number | undefined;

export function toggleEntityDensity(state: boolean): number {
  if (tick) {
    clearTick(tick);
    tick = undefined;
  }

  SetPedPopulationBudget(state ? 3 : 0);
  SetVehiclePopulationBudget(state ? 3 : 0);

  SetPoliceIgnorePlayer(PlayerId(), !state);
  SetDispatchCopsForPlayer(PlayerId(), state);
  SetPlayerWantedLevel(PlayerId(), 0, state);
  SetPlayerWantedLevelNow(PlayerId(), state);
  SetPlayerWantedLevelNoDrop(PlayerId(), 0, state);
  Array.from({ length: 14 }).forEach((_, id) => EnableDispatchService(id + 1, state));

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
