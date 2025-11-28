import './events'
import './lib'
import { FullCharacterEntity } from 'civil'
import { setPlayerState } from './lib'

const exports = global.exports as CitizenExports

setTick(() => {
  if (IsPedSwimmingUnderWater(GetPlayerPed(-1))) {
    exports.nui.sendPlayerUnderwater(true)
  } else {
    exports.nui.sendPlayerUnderwater(false)
  }
})

AddStateBagChangeHandler('character', null, (bagName: string, key: string, character: FullCharacterEntity) => {
  setPlayerState(character)
  exports.nui.sendPlayerStats()
  exports.nui.sendCharacterData()
})