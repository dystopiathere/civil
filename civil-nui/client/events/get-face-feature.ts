RegisterNuiCallback("getFaceFeature", (data: {}, cb: CallableFunction) => {
  cb([(global.LocalPlayer as LocalPlayerInterface).state.face_features, false]);
});

export {};
