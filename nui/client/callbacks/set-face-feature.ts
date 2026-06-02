import { FaceFeaturesEntity } from "@civil/types";
import { TypedLocalPlayer } from "../lib/typed-local-player";

export function setFaceFeature(data: Partial<FaceFeaturesEntity>, cb: CallableFunction) {
  const player = TypedLocalPlayer();

  const faceFeatures = { ...player.state.faceFeatures };
  Object.assign(faceFeatures, data);

  player.state.set("faceFeatures", faceFeatures, true);

  cb([{ status: true }, false]);
}
