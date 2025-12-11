RegisterNuiCallback("getComponentVariation", (data: {}, cb: CallableFunction) => {
  cb([global.LocalPlayer.state.component_variations, false]);
});
