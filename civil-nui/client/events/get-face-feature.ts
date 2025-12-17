RegisterNuiCallback("getFaceFeature", (data: {}, cb: CallableFunction) => {
  cb([global.LocalPlayer.state.face_features, false]);
});

export {};
