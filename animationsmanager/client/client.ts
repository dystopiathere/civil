import { playAnimation, playAnimationChain } from './lib'
import './cmd'

const exports = global.exports as CitizenExports

// EXPORT LIB
exports('playAnimation', playAnimation)
exports('playAnimationChain', playAnimationChain)