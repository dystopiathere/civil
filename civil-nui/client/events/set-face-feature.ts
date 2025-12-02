import { FaceFeatures } from 'civil'

RegisterNuiCallback('setFaceFeature', (data: FaceFeatures, cb: CallableFunction) => {
  global.LocalPlayer.state.set('face_features', data, true)

  cb([{ status: true }, false])
})