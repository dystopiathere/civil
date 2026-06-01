import { HeadOverlaysEntity } from "types/civil";

export function setHeadOverlay(data: Partial<HeadOverlaysEntity>, cb: CallableFunction) {
  const headOverlays = (globalThis.LocalPlayer).state.head_overlays;

  Object.assign(headOverlays, data);

  (globalThis.LocalPlayer).state.set("head_overlays", headOverlays, true);

  cb([{ status: true }, false]);
}
