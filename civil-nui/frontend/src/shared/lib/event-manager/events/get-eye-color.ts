import { type EventSend, invoke } from "~/shared/lib/event-manager";
import type { Character } from "~/entities/character";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = Pick<Character, "eye_color">;

const mockResponseData: EventResponseData = {
  eye_color: 0,
};

export const getEyeColor: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getEyeColor", data);
};
