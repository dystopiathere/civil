import { setState } from './lib'

// @ts-ignore
const exports = global.exports as CitizenExports

setTick(() => {
  if (IsPedSwimmingUnderWater(GetPlayerPed(-1))) {
    exports.nui.sendPlayerUnderwater(true)
  } else {
    exports.nui.sendPlayerUnderwater(false)
  }
})

on('playerSpawned', async () => {
  setState()
})

// EXPORT LIB
exports('setState', setState)