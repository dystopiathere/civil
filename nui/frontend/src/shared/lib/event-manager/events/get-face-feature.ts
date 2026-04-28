import type { FaceFeaturesEntity } from "types/civil";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = FaceFeaturesEntity;

const mockResponseData: EventResponseData = {
  id: 1,
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
  created_at: "",
  updated_at: "",
};

export const getFaceFeature: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getFaceFeature", data);
};
