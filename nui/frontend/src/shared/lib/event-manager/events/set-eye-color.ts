import type { CharacterEntity } from "types/civil";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = Pick<CharacterEntity, "eye_color">;

type EventResponseData = {
  status: boolean;
};

const mockResponseData: EventResponseData = {
  status: true,
};

export const setEyeColor: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("setEyeColor", data);
};
