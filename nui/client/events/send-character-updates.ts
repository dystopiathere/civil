import { FullCharacterEntity } from 'civil'

// @ts-ignore
const exports = global.exports as CitizenExports

RegisterNuiCallback('sendCharacterUpdates', (data: Partial<FullCharacterEntity>, cb: CallableFunction) => {
  const {
    head_blends,
    head_overlays,
    face_features,
    component_variations
  } = data

  exports.playermanager.updateFreemodeModel({
    eye_color: 1,
    head_blends,
    head_overlays,
    face_features,
    component_variations,
  })

  cb([{ status: true }, false])
})