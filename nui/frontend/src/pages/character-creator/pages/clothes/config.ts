import type { ComponentVariationsEntity } from "types/civil";

type ClothesData = {
  title: {
    drawable: string;
    texture: string;
  };
  drawableKey: keyof ComponentVariationsEntity;
  textureKey: keyof ComponentVariationsEntity;
  componentId: number;
};

export const clothes: ClothesData[] = [
  {
    title: {
      drawable: "Руки",
      texture: "Цвет рук",
    },
    drawableKey: "torso_drawable",
    textureKey: "torso_texture",
    componentId: 3,
  },
  {
    title: {
      drawable: "Маска",
      texture: "Цвет маски",
    },
    drawableKey: "mask_drawable",
    textureKey: "mask_texture",
    componentId: 1,
  },
  {
    title: {
      drawable: "Куртка",
      texture: "Цвет куртки",
    },
    drawableKey: "torso_second_drawable",
    textureKey: "torso_second_texture",
    componentId: 11,
  },
  {
    title: {
      drawable: "Футболка",
      texture: "Цвет футболки",
    },
    drawableKey: "undershirt_drawable",
    textureKey: "undershirt_texture",
    componentId: 8,
  },
  {
    title: {
      drawable: "Штаны",
      texture: "Цвет штанов",
    },
    drawableKey: "leg_drawable",
    textureKey: "leg_texture",
    componentId: 4,
  },
  {
    title: {
      drawable: "Обувь",
      texture: "Цвет обуви",
    },
    drawableKey: "shoes_drawable",
    textureKey: "shoes_texture",
    componentId: 6,
  },
  {
    title: {
      drawable: "Жилет",
      texture: "Цвет жилета",
    },
    drawableKey: "kevlar_drawable",
    textureKey: "kevlar_texture",
    componentId: 9,
  },
  {
    title: {
      drawable: "Рюкзак",
      texture: "Цвет рюкзака",
    },
    drawableKey: "bag_drawable",
    textureKey: "bag_texture",
    componentId: 5,
  },
  {
    title: {
      drawable: "Аксессуар",
      texture: "Цвет аксессуара",
    },
    drawableKey: "accessory_drawable",
    textureKey: "accessory_texture",
    componentId: 7,
  },
  {
    title: {
      drawable: "Нашивка",
      texture: "Цвет нашивки",
    },
    drawableKey: "badge_drawable",
    textureKey: "badge_texture",
    componentId: 10,
  },
];
