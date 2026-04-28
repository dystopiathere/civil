import type { CharacterEntity } from "types/civil";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = Pick<CharacterEntity, "model">;

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
