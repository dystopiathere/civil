import { HeadOverlays } from "civil";

RegisterNuiCallback("setHeadOverlay", (data: Partial<HeadOverlays>, cb: CallableFunction) => {
  const headOverlays = global.LocalPlayer.state.head_overlays;

  Object.assign(headOverlays, data);

  global.LocalPlayer.state.set("head_overlays", headOverlays, true);

  cb([{ status: true }, false]);
});
