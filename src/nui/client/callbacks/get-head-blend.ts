import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function getHeadBlend(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.headBlends, false]);
}
