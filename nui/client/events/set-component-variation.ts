import { ComponentVariations } from "types/civil";

RegisterNuiCallback("setComponentVariation", (data: Partial<ComponentVariations>, cb: CallableFunction) => {
  const componentVariations = (global.LocalPlayer as LocalPlayerInterface).state.component_variations;

  Object.assign(componentVariations, data);

  (global.LocalPlayer as LocalPlayerInterface).state.set("component_variations", componentVariations, true);

  cb([{ status: true }, false]);
});
