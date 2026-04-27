RegisterNuiCallback("setEyeColor", (data: string, cb: CallableFunction) => {
  (global.LocalPlayer as LocalPlayerInterface).state.set("eye_color", data, true);

  cb([{ status: true }, false]);
});

export {};
