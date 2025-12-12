import {
  setModel,
  setPedHeadBlendData,
  setPedHeadOverlayData,
  setPedComponentVariationData,
  setPedFaceFeatureData,
  updateFreemodeModel,
} from "./lib";

// @ts-ignore
const exports = global.exports as CivilExports;

on("onClientGameTypeStart", async () => {
  AddStateBagChangeHandler(
    null,
    `player:${GetPlayerServerId(PlayerId())}`,
    (bagName: string, key: keyof LocalPlayerStateBagInterface, value: any) => {
      const ped = GetEntityFromStateBagName(bagName);

      if (key === "eye_color") {
        SetPedEyeColor(ped, value);
      }

      if (key === "head_blends") {
        setPedHeadBlendData(ped, value);
      }

      if (key === "face_features") {
        setPedFaceFeatureData(ped, value);
      }

      if (key === "component_variations") {
        setPedComponentVariationData(ped, value);
      }

      if (key === "head_overlays") {
        setPedHeadOverlayData(ped, value);
      }

      if (key === "model") {
        setModel(ped, value);
      }
    }
  );
});

on("playerSpawned", async () => {
  updateFreemodeModel(GetPlayerPed(-1));
});

// EXPORT LIB
exports("setModel", setModel);
exports("setPedHeadBlendData", setPedHeadBlendData);
exports("setPedHeadOverlayData", setPedHeadOverlayData);
exports("setPedComponentVariationData", setPedComponentVariationData);
exports("setPedFaceFeatureData", setPedFaceFeatureData);
exports("updateFreemodeModel", updateFreemodeModel);
