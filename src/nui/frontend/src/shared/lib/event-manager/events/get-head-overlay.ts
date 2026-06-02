import type { HeadOverlaysEntity } from "@civil/types";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = HeadOverlaysEntity;

const mockResponseData: EventResponseData = {
  id: 1,
  blemishes: 1,
  blemishesOpacity: 1,
  facialHair: 1,
  facialHairColor: 1,
  facialHairSecondColor: 1,
  facialHairOpacity: 1,
  eyebrows: 1,
  eyebrowsColor: 1,
  eyebrowsSecondColor: 1,
  eyebrowsOpacity: 1,
  ageing: 1,
  ageingOpacity: 1,
  makeup: 1,
  makeupColor: 1,
  makeupSecondColor: 1,
  makeupOpacity: 1,
  blush: 1,
  blushColor: 1,
  blushSecondColor: 1,
  blushOpacity: 1,
  complexion: 1,
  complexionOpacity: 1,
  sunDamage: 1,
  sunDamageOpacity: 1,
  lipstick: 1,
  lipstickColor: 1,
  lipstickSecondColor: 1,
  lipstickOpacity: 1,
  molesFreckles: 1,
  molesFrecklesColor: 1,
  molesFrecklesSecondColor: 1,
  molesFrecklesOpacity: 1,
  chestHair: 1,
  chestHairColor: 1,
  chestHairSecondColor: 1,
  chestHairOpacity: 1,
  bodyBlemishes: 1,
  bodyBlemishesOpacity: 1,
  addBodyBlemishes: 1,
  addBodyBlemishesOpacity: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const getHeadOverlay: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getHeadOverlay", data);
};
