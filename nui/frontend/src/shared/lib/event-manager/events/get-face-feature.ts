import { type EventSend, invoke } from "~/shared/lib/event-manager";
import type { FaceFeatures } from "~/entities/character";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = Omit<FaceFeatures, "id" | "created_at" | "updated_at">;

const mockResponseData: EventResponseData = {
  nose_width: 1,
  nose_peak: 1,
  nose_length: 1,
  nose_bone_curveness: 1,
  nose_tip: 1,
  nose_bone_twist: 1,
  eyebrow_up_down: 1,
  eyebrow_in_out: 1,
  cheek_bones: 1,
  cheek_sideways_bone_size: 1,
  cheek_bones_width: 1,
  eye_opening: 1,
  lip_thickness: 1,
  jaw_bone_width: 1,
  jaw_bone_shape: 1,
  chin_bone: 1,
  chin_bone_length: 1,
  chin_bone_shape: 1,
  chin_hole: 1,
  neck_thickness: 1,
};

export const getFaceFeature: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getFaceFeature", data);
};
