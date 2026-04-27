import { onModelChanged } from "../bags";
import { updateFreemodeModel } from "../lib";
import { Key } from "../types";

export const stateBagHandlers: Record<Key, CallableFunction> = {
  model: onModelChanged,
  eye_color: () => updateFreemodeModel(),
  head_blends: () => updateFreemodeModel(),
  face_features: () => updateFreemodeModel(),
  component_variations: () => updateFreemodeModel(),
  head_overlays: () => updateFreemodeModel(),
};
