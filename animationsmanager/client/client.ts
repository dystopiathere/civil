import './lib'
import './cmd'
import mapping from './mapping'

const exports = global.exports as CitizenExports

exports('getMapping', () => mapping)