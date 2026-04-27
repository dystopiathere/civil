import {
  setModel,
  setPedHeadBlendData,
  setPedHeadOverlayData,
  setPedComponentVariationData,
  setPedFaceFeatureData,
  updateFreemodeModel,
  init,
  freeze,
} from "./lib";

global.exports.civil_helpers.initialize(GetCurrentResourceName(), init);

on("playerSpawned", () => {
  updateFreemodeModel(GetPlayerPed(-1));
});

// EXPORT LIB
global.exports("setModel", setModel);
global.exports("setPedHeadBlendData", setPedHeadBlendData);
global.exports("setPedHeadOverlayData", setPedHeadOverlayData);
global.exports("setPedComponentVariationData", setPedComponentVariationData);
global.exports("setPedFaceFeatureData", setPedFaceFeatureData);
global.exports("updateFreemodeModel", updateFreemodeModel);
global.exports("freeze", freeze);
