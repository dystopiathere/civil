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

on("onClientGameTypeStart", () => {
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
});

on("onClientGameTypeStop", () => {
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
