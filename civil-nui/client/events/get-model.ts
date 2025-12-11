RegisterNuiCallback("getModel", (data: {}, cb: CallableFunction) => {
  cb([global.LocalPlayer.state.model, false]);
});
