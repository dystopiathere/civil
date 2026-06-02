import { CharacterState } from "@civil/types";

export type Key = "eyeColor" | "headBlends" | "faceFeatures" | "componentVariations" | "headOverlays" | "model";

export type AppearanceData = Pick<CharacterState, Key>;
