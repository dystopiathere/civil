import { type EventSend, invoke } from "~/shared/lib/event-manager";
import type { HeadOverlays } from "~/entities/character";

type EventRequestData = Omit<HeadOverlays, "id" | "created_at" | "updated_at">;

type EventResponseData = {
  status: boolean;
};

const mockResponseData: EventResponseData = {
  status: true,
};

export const setHeadOverlay: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("setHeadOverlay", data);
};
