export function getComponentVariation(data: {}, cb: CallableFunction) {
  cb([(globalThis.LocalPlayer).state.component_variations, false]);
}
