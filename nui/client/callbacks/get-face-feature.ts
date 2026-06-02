import { TypedLocalPlayer } from "../lib/typed-local-player";

export function getFaceFeature(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.faceFeatures, false]);
}
