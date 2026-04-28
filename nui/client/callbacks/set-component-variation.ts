import { ComponentVariationsEntity } from "types/civil";

export function setComponentVariation(data: Partial<ComponentVariationsEntity>, cb: CallableFunction) {
  const componentVariations = (global.LocalPlayer as LocalPlayerInterface).state.component_variations;

  Object.assign(componentVariations, data);

  (global.LocalPlayer as LocalPlayerInterface).state.set("component_variations", componentVariations, true);

  cb([{ status: true }, false]);
}
