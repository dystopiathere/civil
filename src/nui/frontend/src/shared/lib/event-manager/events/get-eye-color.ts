import type { CharacterState } from "@civil/types";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = Pick<CharacterState, "eyeColor">;

const mockResponseData: EventResponseData = {
  eyeColor: 0,
};

export const getEyeColor: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getEyeColor", data);
};
