import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  componentId: number;
  drawableId: number;
};

type EventResponseData = {
  list: number[];
};

const mockResponseData: EventResponseData = {
  list: [0, 1],
};

export const getTexturesList: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getTexturesList", data);
};
