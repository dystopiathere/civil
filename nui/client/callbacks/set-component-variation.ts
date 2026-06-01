import { ComponentVariationsEntity } from "types/civil";

export function setComponentVariation(data: Partial<ComponentVariationsEntity>, cb: CallableFunction) {
  const componentVariations = (globalThis.LocalPlayer).state.component_variations;

  Object.assign(componentVariations, data);

  (globalThis.LocalPlayer).state.set("component_variations", componentVariations, true);

  cb([{ status: true }, false]);
}
