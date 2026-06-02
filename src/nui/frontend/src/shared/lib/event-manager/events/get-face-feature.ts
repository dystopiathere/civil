import type { FaceFeaturesEntity } from "@civil/types";
import { type EventSend, invoke } from "~/shared/lib";

type EventRequestData = {
  nodata: null;
};

type EventResponseData = FaceFeaturesEntity;

const mockResponseData: EventResponseData = {
  id: 1,
  noseWidth: 1,
  nosePeak: 1,
  noseLength: 1,
  noseBoneCurveness: 1,
  noseTip: 1,
  noseBoneTwist: 1,
  eyebrowUpDown: 1,
  eyebrowInOut: 1,
  cheekBones: 1,
  cheekSidewaysBoneSize: 1,
  cheekBonesWidth: 1,
  eyeOpening: 1,
  lipThickness: 1,
  jawBoneWidth: 1,
  jawBoneShape: 1,
  chinBone: 1,
  chinBoneLength: 1,
  chinBoneShape: 1,
  chinHole: 1,
  neckThickness: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const getFaceFeature: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false]);
    });
  }

  return invoke<EventRequestData, EventResponseData>("getFaceFeature", data);
};
