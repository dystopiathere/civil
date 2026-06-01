export function setModel(data: string, cb: CallableFunction) {
  (globalThis.LocalPlayer).state.set("model", data, true);

  cb([{ status: true }, false]);
}
