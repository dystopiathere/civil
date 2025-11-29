import { navigate, sendCharacterData, sendPlayerStats, sendPlayerUnderwater, sendWorldData } from './messages'
import { setFocus, openPage } from './lib'
import './events'
import './keys'

// @ts-ignore
const exports = global.exports as CitizenExports

on('onClientGameTypeStart', async () => {
  DisplayRadar(false)

  setTick(() => {
    [1, 2, 3, 4, 6, 7, 8, 9, 13, 20].forEach((el) => {
      HideHudComponentThisFrame(el)
    })
  })
})

on('playerSpawned', async () => {
  sendPlayerStats()
})

// EXPORT MESSAGES
exports('sendCharacterData', sendCharacterData)
exports('sendWorldData', sendWorldData)
exports('navigate', navigate)
exports('sendPlayerStats', sendPlayerStats)
exports('sendPlayerUnderwater', sendPlayerUnderwater)

// EXPORT LIB
exports('setFocus', setFocus)
exports('openPage', openPage)