import { type EventSend, invoke } from "~/shared/lib/event-manager";

type EventRequestData = {
  componentId: number;
};

type EventResponseData = {
  list: number[];
};

const mockResponseData: EventResponseData = {
  list: [0, 1],
};

export const getDrawablesList: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getDrawablesList", data);
};
