RegisterNuiCallback("setModel", (data: string, cb: CallableFunction) => {
  global.LocalPlayer.state.set("model", data, true);

  cb([{ status: true }, false]);
});

export {};
