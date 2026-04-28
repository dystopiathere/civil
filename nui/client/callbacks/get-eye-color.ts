export function getEyeColor(data: {}, cb: CallableFunction) {
  cb([(global.LocalPlayer as LocalPlayerInterface).state.eye_color, false]);
}
