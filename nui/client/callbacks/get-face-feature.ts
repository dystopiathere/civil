export function getFaceFeature(data: {}, cb: CallableFunction) {
  cb([(globalThis.LocalPlayer).state.face_features, false]);
}
