export function setEyeColor(data: string, cb: CallableFunction) {
  (globalThis.LocalPlayer).state.set("eye_color", data, true);

  cb([{ status: true }, false]);
}
