setTick(() => {
  if (IsPedSwimmingUnderWater(GetPlayerPed(-1))) {
    exports.civil_nui.sendPlayerUnderwater(true)
  } else {
    exports.civil_nui.sendPlayerUnderwater(false)
  }
})
