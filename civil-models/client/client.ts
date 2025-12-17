import {
  setModel,
  setPedHeadBlendData,
  setPedHeadOverlayData,
  setPedComponentVariationData,
  setPedFaceFeatureData,
  updateFreemodeModel,
} from "./lib";

const exports = global.exports as CitizenExports;

const keys: (keyof LocalPlayerStateBagInterface)[] = [
  "eye_color",
  "head_blends",
  "face_features",
  "component_variations",
  "head_overlays",
  "model",
];

let stateBagHandler: number;

on("onResourceStart", () => {
  if (stateBagHandler) {
    RemoveStateBagChangeHandler(stateBagHandler);
  }

  stateBagHandler = AddStateBagChangeHandler(
    null,
    `player:${GetPlayerServerId(PlayerId())}`,
    (bagName: string, key: keyof LocalPlayerStateBagInterface, value: any) => {
      if (!keys.includes(key)) {
        return;
      }

      const player = GetPlayerFromStateBagName(bagName);
      const ped = GetPlayerPed(player);

      if (key === "model") {
        setModel(ped, value);
      }

      updateFreemodeModel(ped);
    }
  );
});

on("onResourceStop", () => {
  if (stateBagHandler) {
    RemoveStateBagChangeHandler(stateBagHandler);
    stateBagHandler = undefined;
  }
});

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
