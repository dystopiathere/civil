export function getHeadOverlay(data: {}, cb: CallableFunction) {
  cb([(globalThis.LocalPlayer).state.head_overlays, false]);
}
