import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function getHeadOverlay(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.headOverlays, false]);
}
