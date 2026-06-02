import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function getFaceFeature(_: {}, cb: CallableFunction) {
  cb([TypedLocalPlayer().state.faceFeatures, false]);
}
