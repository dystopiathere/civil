import { FaceFeaturesEntity } from "@civil/types";
import { TypedLocalPlayer } from "@civil/typed-helpers/client";

export function setPedFaceFeatureData(ped: number, data: Partial<FaceFeaturesEntity> = {}) {
  const localData = { ...TypedLocalPlayer().state.faceFeatures };

  Object.assign(localData, data);

  const faceFeatures = [
    localData.noseWidth,
    localData.nosePeak,
    localData.noseLength,
    localData.noseBoneCurveness,
    localData.noseTip,
    localData.noseBoneTwist,
    localData.eyebrowUpDown,
    localData.eyebrowInOut,
    localData.cheekBones,
    localData.cheekSidewaysBoneSize,
    localData.cheekBonesWidth,
    localData.eyeOpening,
    localData.lipThickness,
    localData.jawBoneWidth,
    localData.jawBoneShape,
    localData.chinBone,
    localData.chinBoneLength,
    localData.chinBoneShape,
    localData.chinHole,
    localData.neckThickness,
  ];

  faceFeatures.forEach((value, key) => {
    SetPedFaceFeature(ped, key, value);
  });
}
