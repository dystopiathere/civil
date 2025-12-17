RegisterNuiCallback("getHeadBlend", (data: {}, cb: CallableFunction) => {
  cb([global.LocalPlayer.state.head_blends, false]);
});

export {};
