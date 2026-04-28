export type MarkerSize = "small" | "medium" | "large";

export type MarkerData = {
  type: number;
  coords: { x: number; y: number; z: number };
  action: CallableFunction;
  size: MarkerSize;
  color: { red: number; green: number; blue: number; alpha: number };
  label?: string;
  helpText?: string;
  blip?: { sprite: number; shortRange: boolean };
};
