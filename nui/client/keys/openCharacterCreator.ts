import { openPage } from '../lib'

RegisterCommand('characterCreator', () => {
  openPage('characterCreatorGenetics')
}, false)

RegisterKeyMapping('characterCreator', 'Open character creator', 'keyboard', 'g')