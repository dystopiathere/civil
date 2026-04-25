import { HeadOverlays } from "types/civil";

RegisterNuiCallback("setHeadOverlay", (data: Partial<HeadOverlays>, cb: CallableFunction) => {
  const headOverlays = (global.LocalPlayer as LocalPlayerInterface).state.head_overlays;

  Object.assign(headOverlays, data);

  (global.LocalPlayer as LocalPlayerInterface).state.set("head_overlays", headOverlays, true);

  cb([{ status: true }, false]);
});
