import { TypedLocalPlayer } from "../lib/typed-local-player";

export function getHeadBlend(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.headBlends, false]);
}
