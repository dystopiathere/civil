export function getModel(data: {}, cb: CallableFunction) {
  cb([(global.LocalPlayer as LocalPlayerInterface).state.model, false]);
}
