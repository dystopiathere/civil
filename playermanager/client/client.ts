import { FullCharacterEntity } from 'civil'
import { setPlayerModel, setPlayerRegeneration, setPlayerSkills, setPlayerState, updateFreemodeModel } from './lib'
import { onEntityDamageHandler } from './events'

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

on('playerSpawned', async () => {
  setPlayerState()
  updateFreemodeModel()
  setPlayerSkills()
})

const eventHandlers: Record<string, (args: any[]) => void> = {
  CEventNetworkEntityDamage: onEntityDamageHandler
}

on('gameEventTriggered', (name: string, args: any[]) => {
  if (eventHandlers[name]) {
    eventHandlers[name](args)
  } else {
    // console.log(`Game event ${name} ${args.join(', ')}`)
  }
})


// EXPORT LIB
exports('setPlayerState', setPlayerState)
exports('setPlayerSkills', setPlayerSkills)
exports('setPlayerRegeneration', setPlayerRegeneration)
exports('setPlayerModel', setPlayerModel)
exports('updateFreemodeModel', updateFreemodeModel)