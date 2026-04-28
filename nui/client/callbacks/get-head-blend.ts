export function getHeadBlend(data: {}, cb: CallableFunction) {
  cb([(global.LocalPlayer as LocalPlayerInterface).state.head_blends, false]);
}
