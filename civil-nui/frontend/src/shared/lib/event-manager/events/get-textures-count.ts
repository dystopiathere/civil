import { type EventSend, invoke } from "~/shared/lib/event-manager";

type EventRequestData = {
  componentId: number;
  drawableId: number;
};

type EventResponseData = {
  count: number;
};

const mockResponseData: EventResponseData = {
  count: 100,
};

export const getTexturesCount: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getTexturesCount", data);
};
