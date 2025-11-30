let tick: number

export function disableEntityDensity () {
  if (tick) {
    clearTick(tick)
  }

  SetPedPopulationBudget(0)
  SetVehiclePopulationBudget(0)

  SetPoliceIgnorePlayer(PlayerId(), true)
  SetDispatchCopsForPlayer(PlayerId(), false)
  SetPlayerWantedLevel(PlayerId(), 0, false)
  SetPlayerWantedLevelNow(PlayerId(), false)
  SetPlayerWantedLevelNoDrop(PlayerId(), 0, false)
  Array.from({ length: 12 }).forEach((_, id) => EnableDispatchService(id + 1, false))

  tick = setTick(() => {
    SetPedDensityMultiplierThisFrame(0)
    SetScenarioPedDensityMultiplierThisFrame(0, 0)

    SetVehicleDensityMultiplierThisFrame(0)
    SetRandomVehicleDensityMultiplierThisFrame(0)
    SetParkedVehicleDensityMultiplierThisFrame(0)
    SetAmbientVehicleRangeMultiplierThisFrame(0)
  })
}