RegisterNuiCallback("getHeadOverlay", (data: {}, cb: CallableFunction) => {
  cb([global.LocalPlayer.state.head_overlays, false]);
});
