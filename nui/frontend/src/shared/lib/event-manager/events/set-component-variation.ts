import type { ComponentVariationsEntity } from "types/civil";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = Partial<Omit<ComponentVariationsEntity, "id" | "created_at" | "updated_at">>;

type EventResponseData = {
  status: boolean;
};

const mockResponseData: EventResponseData = {
  status: true,
};

export const setComponentVariation: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("setComponentVariation", data);
};
