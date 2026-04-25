import {
  setModel,
  setPedHeadBlendData,
  setPedHeadOverlayData,
  setPedComponentVariationData,
  setPedFaceFeatureData,
  updateFreemodeModel,
} from "./lib";

const exports = global.exports as CitizenExports;

type Keys = "eye_color" | "head_blends" | "face_features" | "component_variations" | "head_overlays" | "model";

const keys: Keys[] = ["eye_color", "head_blends", "face_features", "component_variations", "head_overlays", "model"];

let stateBagHandler: number | undefined;

function init() {
  if (stateBagHandler) {
    RemoveStateBagChangeHandler(stateBagHandler);
  }

  stateBagHandler = AddStateBagChangeHandler(
    "",
    `player:${GetPlayerServerId(PlayerId())}`,
    (bagName: string, key: Keys, value: LocalPlayerStateBagInterface[Keys]) => {
      if (!keys.includes(key)) {
        return;
      }

      const player = GetPlayerFromStateBagName(bagName);
      const ped = GetPlayerPed(player);

      if (key === "model") {
        value = value as string;
        setModel(ped, value);
      }

      updateFreemodeModel(ped);
    },
  );

  return () => {
    if (stateBagHandler) {
      RemoveStateBagChangeHandler(stateBagHandler);
      stateBagHandler = undefined;
    }
  };
}

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
