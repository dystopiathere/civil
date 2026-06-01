export function getModel(data: {}, cb: CallableFunction) {
  cb([(globalThis.LocalPlayer).state.model, false]);
}
