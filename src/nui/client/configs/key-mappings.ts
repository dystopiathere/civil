import { openPage } from "../lib";
import { KeyMappingData } from "../types";

export const keyMappings: Record<string, KeyMappingData> = {
  inventory: {
    key: "i",
    description: "Open inventory",
    handler: () => openPage("inventory"),
  },
};
