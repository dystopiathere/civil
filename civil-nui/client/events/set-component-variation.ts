import { ComponentVariations } from "civil";

RegisterNuiCallback("setComponentVariation", (data: ComponentVariations, cb: CallableFunction) => {
  global.LocalPlayer.state.set("component_variations", data, true);

  cb([{ status: true }, false]);
});
