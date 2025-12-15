RegisterNuiCallback("getEyeColor", (data: {}, cb: CallableFunction) => {
  cb([global.LocalPlayer.state.eye_color, false]);
});
