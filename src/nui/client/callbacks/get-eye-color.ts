import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function getEyeColor(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.eyeColor, false]);
}
