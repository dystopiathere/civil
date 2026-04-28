import { FaceFeaturesEntity } from "types/civil";

export function setPedFaceFeatureData(ped: number, data: Partial<FaceFeaturesEntity> = {}) {
  const localData = { ...(global.LocalPlayer as LocalPlayerInterface).state.face_features };

  Object.assign(localData, data);

  const faceFeatures = [
    localData.nose_width,
    localData.nose_peak,
    localData.nose_length,
    localData.nose_bone_curveness,
    localData.nose_tip,
    localData.nose_bone_twist,
    localData.eyebrow_up_down,
    localData.eyebrow_in_out,
    localData.cheek_bones,
    localData.cheek_sideways_bone_size,
    localData.cheek_bones_width,
    localData.eye_opening,
    localData.lip_thickness,
    localData.jaw_bone_width,
    localData.jaw_bone_shape,
    localData.chin_bone,
    localData.chin_bone_length,
    localData.chin_bone_shape,
    localData.chin_hole,
    localData.neck_thickness,
  ];

  faceFeatures.forEach((value, key) => {
    SetPedFaceFeature(ped, key, value);
  });
}
