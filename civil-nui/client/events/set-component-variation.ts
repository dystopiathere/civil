import { ComponentVariations } from "civil";

RegisterNuiCallback("setComponentVariation", (data: Partial<ComponentVariations>, cb: CallableFunction) => {
  const componentVariations = global.LocalPlayer.state.component_variations;

  Object.assign(componentVariations, data);

  global.LocalPlayer.state.set("component_variations", componentVariations, true);

  cb([{ status: true }, false]);
});
