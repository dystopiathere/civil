import { type EventSend, invoke } from "~/shared/lib/event-manager";
import type { HeadBlends } from "~/entities/character";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = Omit<HeadBlends, "id" | "created_at" | "updated_at">;

const mockResponseData: EventResponseData = {
  shape_first_id: 1,
  shape_second_id: 1,
  shape_mix: 1,
  skin_first_id: 1,
  skin_second_id: 1,
  skin_mix: 1,
  shape_third_id: 1,
  skin_third_id: 1,
  third_mix: 1,
};

export const getHeadBlendData: EventSend<EventRequestData, EventResponseData> = () => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getHeadBlendData");
};
