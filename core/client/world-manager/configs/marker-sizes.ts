import { MarkerSize } from "../types";

export const markerSizes: Record<MarkerSize, { x: number; y: number; z: number }> = {
  small: { x: 1.0, y: 1.0, z: 0.5 },
  medium: { x: 2.0, y: 2.0, z: 0.5 },
  large: { x: 3.0, y: 3.0, z: 0.5 },
};
