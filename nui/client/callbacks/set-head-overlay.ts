import { HeadOverlaysEntity } from "types/civil";

export function setHeadOverlay(data: Partial<HeadOverlaysEntity>, cb: CallableFunction) {
  const headOverlays = (global.LocalPlayer as LocalPlayerInterface).state.head_overlays;

  Object.assign(headOverlays, data);

  (global.LocalPlayer as LocalPlayerInterface).state.set("head_overlays", headOverlays, true);

  cb([{ status: true }, false]);
}
