import type { ComponentVariationsEntity } from "@civil/types";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = ComponentVariationsEntity;

const mockResponseData: EventResponseData = {
  id: 1,
  faceDrawable: 1,
  faceTexture: 1,
  facePalette: 1,
  maskDrawable: 1,
  maskTexture: 1,
  maskPalette: 1,
  hairDrawable: 1,
  hairTexture: 1,
  hairPalette: 1,
  torsoDrawable: 1,
  torsoTexture: 1,
  torsoPalette: 1,
  legDrawable: 1,
  legTexture: 1,
  legPalette: 1,
  bagDrawable: 1,
  bagTexture: 1,
  bagPalette: 1,
  shoesDrawable: 1,
  shoesTexture: 1,
  shoesPalette: 1,
  accessoryDrawable: 1,
  accessoryTexture: 1,
  accessoryPalette: 1,
  undershirtDrawable: 1,
  undershirtTexture: 1,
  undershirtPalette: 1,
  kevlarDrawable: 1,
  kevlarTexture: 1,
  kevlarPalette: 1,
  badgeDrawable: 1,
  badgeTexture: 1,
  badgePalette: 1,
  torsoSecondDrawable: 1,
  torsoSecondTexture: 1,
  torsoSecondPalette: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const getComponentVariation: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getComponentVariation", data);
};
