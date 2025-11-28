
const exports = global.exports as CitizenExports

import { setPlayerState } from './set-player-state'
import { setPlayerSkills } from './set-player-skills'
import { setPlayerRegeneration } from './set-player-regeneration'
import { setPlayerModel } from './set-player-model'
import { updateFreemodeModel } from './update-freemode-model'

export * from './set-player-state'
export * from './set-player-skills'
export * from './set-player-regeneration'
export * from './set-player-model'
export * from './update-freemode-model'

exports('setPlayerState', setPlayerState)
exports('setPlayerSkills', setPlayerSkills)
exports('setPlayerRegeneration', setPlayerRegeneration)
exports('setPlayerModel', setPlayerModel)
exports('updateFreemodeModel', updateFreemodeModel)