import { type EventSend, invoke } from "~/shared/lib/event-manager";
import type { Character } from "~/entities/character";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = Pick<Character, "model">;

const mockResponseData: EventResponseData = {
  model: "mockModel",
};

export const getModel: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getModel", data);
};
