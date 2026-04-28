import type { FaceFeaturesEntity } from "types/civil";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = Partial<Omit<FaceFeaturesEntity, "id" | "created_at" | "updated_at">>;

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
