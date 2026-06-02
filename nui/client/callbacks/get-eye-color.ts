import { TypedLocalPlayer } from "../lib/typed-local-player";

export function getEyeColor(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.eyeColor, false]);
}
