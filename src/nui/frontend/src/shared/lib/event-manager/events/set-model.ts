import type { CharacterState } from "@civil/types";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = Pick<CharacterState, "model">;

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
