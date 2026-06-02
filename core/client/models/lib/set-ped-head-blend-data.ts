import { HeadBlendsEntity } from "@civil/types";
import { TypedLocalPlayer } from "~/helpers";

export function setPedHeadBlendData(ped: number, data: Partial<HeadBlendsEntity> = {}) {
  const localData = { ...TypedLocalPlayer().state.headBlends };

  Object.assign(localData, data);

  SetPedHeadBlendData(
    ped,
    localData.shapeFirstId,
    localData.shapeSecondId,
    localData.shapeThirdId,
    localData.skinFirstId,
    localData.skinSecondId,
    localData.skinThirdId,
    localData.shapeMix,
    localData.skinMix,
    localData.thirdMix,
    false,
  );
}
