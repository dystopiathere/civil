export function setModel(data: string, cb: CallableFunction) {
  (global.LocalPlayer as LocalPlayerInterface).state.set("model", data, true);

  cb([{ status: true }, false]);
}
