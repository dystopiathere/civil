export function getHeadOverlay(data: {}, cb: CallableFunction) {
  cb([(global.LocalPlayer as LocalPlayerInterface).state.head_overlays, false]);
}
