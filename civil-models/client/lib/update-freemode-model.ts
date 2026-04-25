import { FullCharacterEntity } from "types/civil";
import { setPedHeadBlendData } from "./set-ped-head-blend-data";
import { setPedFaceFeatureData } from "./set-ped-face-feature-data";
import { setPedHeadOverlayData } from "./set-ped-head-overlay-data";
import { setPedComponentVariationData } from "./set-ped-component-variation-data";

export function updateFreemodeModel(ped: number, data: Partial<FullCharacterEntity> = {}) {
  setPedHeadBlendData(ped, data.head_blends);
  setPedFaceFeatureData(ped, data.face_features);
  setPedHeadOverlayData(ped, data.head_overlays);
  setPedComponentVariationData(ped, data.component_variations);
  SetPedEyeColor(ped, (global.LocalPlayer as LocalPlayerInterface).state.eye_color);
}
