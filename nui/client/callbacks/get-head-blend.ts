export function getHeadBlend(data: {}, cb: CallableFunction) {
  cb([(globalThis.LocalPlayer).state.head_blends, false]);
}
