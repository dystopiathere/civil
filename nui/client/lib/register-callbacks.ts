import {
  closeComponent,
  getComponentVariation,
  getDrawablesList,
  getEyeColor,
  getFaceFeature,
  getHeadBlend,
  getHeadOverlay,
  getModel,
  getTexturesList,
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
  getDrawablesList,
  getEyeColor,
  getFaceFeature,
  getHeadBlend,
  getHeadOverlay,
  getModel,
  getTexturesList,
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
