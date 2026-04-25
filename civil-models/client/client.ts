import {
  setModel,
  setPedHeadBlendData,
  setPedHeadOverlayData,
  setPedComponentVariationData,
  setPedFaceFeatureData,
  updateFreemodeModel,
  init,
} from "./lib";

const exports = global.exports as CitizenExports;

exports.civil_helpers.initialize(GetCurrentResourceName(), init);

on("playerSpawned", () => {
  updateFreemodeModel(GetPlayerPed(-1));
});

// EXPORT LIB
exports("setModel", setModel);
exports("setPedHeadBlendData", setPedHeadBlendData);
exports("setPedHeadOverlayData", setPedHeadOverlayData);
exports("setPedComponentVariationData", setPedComponentVariationData);
exports("setPedFaceFeatureData", setPedFaceFeatureData);
exports("updateFreemodeModel", updateFreemodeModel);
