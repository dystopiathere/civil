import { type EventSend, invoke } from "~/shared/lib/event-manager";
import type { ComponentVariations } from "~/entities/character";

type EventRequestData = Omit<ComponentVariations, "id" | "created_at" | "updated_at">;

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
