import { FullCharacterEntity } from 'civil'
import { openPage } from '../lib'

RegisterNuiCallback('closeComponent', (data: Partial<FullCharacterEntity>, cb: CallableFunction) => {
  openPage('hud')

  cb([{ status: true }, false])
})