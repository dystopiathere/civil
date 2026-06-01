import { FaceFeaturesEntity } from "types/civil";

export function setFaceFeature(data: Partial<FaceFeaturesEntity>, cb: CallableFunction) {
  const faceFeatures = (globalThis.LocalPlayer as LocalPlayerInterface).state.face_features;

  Object.assign(faceFeatures, data);

  (globalThis.LocalPlayer).state.set("face_features", faceFeatures, true);

  cb([{ status: true }, false]);
}
