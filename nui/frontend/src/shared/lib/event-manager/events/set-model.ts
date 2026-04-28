import type { CharacterEntity } from "types/civil";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = Pick<CharacterEntity, "model">;

type EventResponseData = {
  status: boolean;
};

const mockResponseData: EventResponseData = {
  status: true,
};

export const setModel: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("setModel", data);
};
