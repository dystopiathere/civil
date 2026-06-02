import type { HeadBlendsEntity } from "@civil/types";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = HeadBlendsEntity;

const mockResponseData: EventResponseData = {
  id: 1,
  shapeFirstId: 1,
  shapeSecondId: 1,
  shapeThirdId: 1,
  skinFirstId: 1,
  skinSecondId: 1,
  skinThirdId: 1,
  shapeMix: 1,
  skinMix: 1,
  thirdMix: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const getHeadBlendData: EventSend<EventRequestData, EventResponseData> = () => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getHeadBlend");
};
