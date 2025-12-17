RegisterNuiCallback("setEyeColor", (data: string, cb: CallableFunction) => {
  global.LocalPlayer.state.set("eye_color", data, true);

  cb([{ status: true }, false]);
});

export {};
