import { HeadOverlays } from "civil";

RegisterNuiCallback("setHeadOverlay", (data: HeadOverlays, cb: CallableFunction) => {
  global.LocalPlayer.state.set("head_overlays", data, true);

  cb([{ status: true }, false]);
});
