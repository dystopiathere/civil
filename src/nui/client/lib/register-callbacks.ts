import {
  closeComponent,
  getComponentVariation,
  getDrawableData,
  getEyeColor,
  getFaceFeature,
  getHeadBlend,
  getHeadOverlay,
  getModel,
  renavigate,
  setComponentVariation,
  setEyeColor,
  setFaceFeature,
  setHeadBlend,
  setHeadOverlay,
  setModel,
} from "../callbacks";

const callbacks = {
  closeComponent,
  getComponentVariation,
  getDrawableData,
  getEyeColor,
  getFaceFeature,
  getHeadBlend,
  getHeadOverlay,
  getModel,
  renavigate,
  setComponentVariation,
  setEyeColor,
  setFaceFeature,
  setHeadBlend,
  setHeadOverlay,
  setModel,
};

export function registerCallbacks() {
  Object.entries(callbacks).forEach(([callback, handler]) => {
    RegisterNuiCallback(callback, handler);
  });
}
