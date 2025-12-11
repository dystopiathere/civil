import { HeadBlends } from "civil";

export function setPedHeadBlendData(ped: number, data: Partial<HeadBlends> = {}) {
  const localData = { ...global.LocalPlayer.state.head_blends };

  Object.assign(localData, data);

  SetPedHeadBlendData(
    ped,
    localData.shape_first_id,
    localData.shape_second_id,
    localData.shape_third_id,
    localData.skin_first_id,
    localData.skin_second_id,
    localData.skin_third_id,
    localData.shape_mix,
    localData.skin_mix,
    localData.third_mix,
    false
  );
}
