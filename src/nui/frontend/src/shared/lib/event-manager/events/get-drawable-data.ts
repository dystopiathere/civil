import type { CollectionData } from "@civil/types";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  componentId: number;
};

type EventResponseData = {
  data: CollectionData;
};

const mockResponseData: EventResponseData = {
  data: {},
};

export const getDrawableData: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getDrawableData", data);
};
