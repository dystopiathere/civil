import { TypedLocalPlayer } from "../lib/typed-local-player";

export function getHeadOverlay(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.headOverlays, false]);
}
