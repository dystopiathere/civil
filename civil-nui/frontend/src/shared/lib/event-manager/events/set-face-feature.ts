import { type EventSend, invoke } from "~/shared/lib/event-manager";
import type { FaceFeatures } from "~/entities/character";

type EventRequestData = Omit<FaceFeatures, "id" | "created_at" | "updated_at">;

type EventResponseData = {
  status: boolean;
};

const mockResponseData: EventResponseData = {
  status: true,
};

export const setFaceFeature: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("setFaceFeature", data);
};
