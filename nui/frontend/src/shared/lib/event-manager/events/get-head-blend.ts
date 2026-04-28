import type { HeadBlendsEntity } from "types/civil";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = HeadBlendsEntity;

const mockResponseData: EventResponseData = {
  id: 1,
  shape_first_id: 1,
  shape_second_id: 1,
  shape_mix: 1,
  skin_first_id: 1,
  skin_second_id: 1,
  skin_mix: 1,
  shape_third_id: 1,
  skin_third_id: 1,
  third_mix: 1,
  created_at: "",
  updated_at: "",
};

export const getHeadBlendData: EventSend<EventRequestData, EventResponseData> = () => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getHeadBlend");
};
