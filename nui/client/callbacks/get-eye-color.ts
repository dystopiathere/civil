export function getEyeColor(data: {}, cb: CallableFunction) {
  cb([(globalThis.LocalPlayer).state.eye_color, false]);
}
