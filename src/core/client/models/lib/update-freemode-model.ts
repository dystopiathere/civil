import { TypedLocalPlayer } from "@civil/typed-helpers/client";
import { setPedHeadBlendData } from "./set-ped-head-blend-data";
import { setPedFaceFeatureData } from "./set-ped-face-feature-data";
import { setPedHeadOverlayData } from "./set-ped-head-overlay-data";
import { setPedComponentVariationData } from "./set-ped-component-variation-data";
import { AppearanceData } from "../types";

export function updateFreemodeModel(data: Partial<AppearanceData> = {}) {
  const ped = GetPlayerPed(-1);

  setPedHeadBlendData(ped, data.headBlends);
  setPedFaceFeatureData(ped, data.faceFeatures);
  setPedHeadOverlayData(ped, data.headOverlays);
  setPedComponentVariationData(ped, data.componentVariations);
  SetPedEyeColor(ped, data.eyeColor ?? TypedLocalPlayer().state.eyeColor);
}
