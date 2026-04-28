import { HeadOverlaysEntity } from "types/civil";

type HeadOverlayElement = {
  value: number;
  opacity: number;
  colorType?: number;
  color1?: number;
  color2?: number;
};

export function setPedHeadOverlayData(ped: number, data: Partial<HeadOverlaysEntity> = {}) {
  const localData = { ...(global.LocalPlayer as LocalPlayerInterface).state.head_overlays };

  Object.assign(localData, data);

  const headOverlay: HeadOverlayElement[] = [
    {
      value: localData.blemishes,
      opacity: localData.blemishes_opacity,
    },
    {
      value: localData.facial_hair,
      opacity: localData.facial_hair_opacity,
      colorType: 1,
      color1: localData.facial_hair_color,
      color2: localData.facial_hair_second_color,
    },
    {
      value: localData.eyebrows,
      opacity: localData.eyebrows_opacity,
      colorType: 1,
      color1: localData.eyebrows_color,
      color2: localData.eyebrows_second_color,
    },
    {
      value: localData.ageing,
      opacity: localData.ageing_opacity,
    },
    {
      value: localData.makeup,
      opacity: localData.makeup_opacity,
      colorType: 1,
      color1: localData.makeup_color,
      color2: localData.makeup_second_color,
    },
    {
      value: localData.blush,
      opacity: localData.blush_opacity,
      colorType: 2,
      color1: localData.blush_color,
      color2: localData.blush_second_color,
    },
    {
      value: localData.complexion,
      opacity: localData.complexion_opacity,
    },
    {
      value: localData.sun_damage,
      opacity: localData.sun_damage_opacity,
    },
    {
      value: localData.lipstick,
      opacity: localData.lipstick_opacity,
      colorType: 2,
      color1: localData.lipstick_color,
      color2: localData.lipstick_second_color,
    },
    {
      value: localData.moles_freckles,
      opacity: localData.moles_freckles_opacity,
      colorType: 0,
      color1: localData.moles_freckles_color,
      color2: localData.moles_freckles_second_color,
    },
    {
      value: localData.chest_hair,
      opacity: localData.chest_hair_opacity,
      colorType: 1,
      color1: localData.chest_hair_color,
      color2: localData.chest_hair_second_color,
    },
    {
      value: localData.body_blemishes,
      opacity: localData.body_blemishes_opacity,
    },
    {
      value: localData.add_body_blemishes,
      opacity: localData.add_body_blemishes_opacity,
    },
  ];

  headOverlay.forEach(({ value, opacity, colorType, color1, color2 }, key) => {
    SetPedHeadOverlay(ped, key, value, opacity);

    if (colorType) {
      SetPedHeadOverlayColor(ped, key, colorType, color1 ?? 0, color2 ?? 0);
    }
  });
}
