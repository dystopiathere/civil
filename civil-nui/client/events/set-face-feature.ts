import { FaceFeatures } from "types/civil";

RegisterNuiCallback("setFaceFeature", (data: Partial<FaceFeatures>, cb: CallableFunction) => {
  const faceFeatures = (global.LocalPlayer as LocalPlayerInterface as LocalPlayerInterface).state.face_features;

  Object.assign(faceFeatures, data);

  (global.LocalPlayer as LocalPlayerInterface).state.set("face_features", faceFeatures, true);

  cb([{ status: true }, false]);
});
