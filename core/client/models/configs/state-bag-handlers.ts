import { onModelChanged } from "../bags";
import { updateFreemodeModel } from "../lib";
import { Key } from "../types";

export const stateBagHandlers: Record<Key, CallableFunction> = {
  model: onModelChanged,
  eyeColor: () => updateFreemodeModel(),
  headBlends: () => updateFreemodeModel(),
  faceFeatures: () => updateFreemodeModel(),
  componentVariations: () => updateFreemodeModel(),
  headOverlays: () => updateFreemodeModel(),
};
