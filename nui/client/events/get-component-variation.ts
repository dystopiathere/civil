RegisterNuiCallback("getComponentVariation", (data: {}, cb: CallableFunction) => {
  cb([(global.LocalPlayer as LocalPlayerInterface).state.component_variations, false]);
});

export {};
