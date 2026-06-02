import { HeadOverlaysEntity } from "@civil/types";
import { TypedLocalPlayer } from "@civil/typed-helpers/client";

type HeadOverlayElement = {
  value: number;
  opacity: number;
  colorType?: number;
  color1?: number;
  color2?: number;
};

export function setPedHeadOverlayData(ped: number, data: Partial<HeadOverlaysEntity> = {}) {
  const localData = { ...TypedLocalPlayer().state.headOverlays };

  Object.assign(localData, data);

  const headOverlay: HeadOverlayElement[] = [
    {
      value: localData.blemishes,
      opacity: localData.blemishesOpacity,
    },
    {
      value: localData.facialHair,
      opacity: localData.facialHairColor,
      colorType: 1,
      color1: localData.facialHairSecondColor,
      color2: localData.facialHairOpacity,
    },
    {
      value: localData.eyebrows,
      opacity: localData.eyebrowsColor,
      colorType: 1,
      color1: localData.eyebrowsSecondColor,
      color2: localData.eyebrowsOpacity,
    },
    {
      value: localData.ageing,
      opacity: localData.ageingOpacity,
    },
    {
      value: localData.makeup,
      opacity: localData.makeupColor,
      colorType: 1,
      color1: localData.makeupSecondColor,
      color2: localData.makeupOpacity,
    },
    {
      value: localData.blush,
      opacity: localData.blushColor,
      colorType: 2,
      color1: localData.blushSecondColor,
      color2: localData.blushOpacity,
    },
    {
      value: localData.complexion,
      opacity: localData.complexionOpacity,
    },
    {
      value: localData.sunDamage,
      opacity: localData.sunDamageOpacity,
    },
    {
      value: localData.lipstick,
      opacity: localData.lipstickColor,
      colorType: 2,
      color1: localData.lipstickSecondColor,
      color2: localData.lipstickOpacity,
    },
    {
      value: localData.molesFreckles,
      opacity: localData.molesFrecklesOpacity,
      colorType: 0,
      color1: localData.molesFrecklesColor,
      color2: localData.molesFrecklesSecondColor,
    },
    {
      value: localData.chestHair,
      opacity: localData.chestHairOpacity,
      colorType: 1,
      color1: localData.chestHairColor,
      color2: localData.chestHairSecondColor,
    },
    {
      value: localData.bodyBlemishes,
      opacity: localData.bodyBlemishesOpacity,
    },
    {
      value: localData.addBodyBlemishes,
      opacity: localData.addBodyBlemishesOpacity,
    },
  ];

  headOverlay.forEach(({ value, opacity, colorType, color1, color2 }, key) => {
    SetPedHeadOverlay(ped, key, value, opacity);

    if (colorType) {
      SetPedHeadOverlayColor(ped, key, colorType, color1 ?? 0, color2 ?? 0);
    }
  });
}
