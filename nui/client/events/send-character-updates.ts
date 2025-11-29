import { FullCharacterEntity } from 'civil'

// @ts-ignore
const exports = global.exports as CitizenExports

RegisterNuiCallback('sendCharacterUpdates', (data: Partial<FullCharacterEntity>, cb: CallableFunction) => {
  exports.playermanager.updateFreemodeModel({
    eye_color: 1,
    ...data
  })

  cb([{ status: true }, false])
})