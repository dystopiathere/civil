import type { ComponentVariationsEntity } from "@civil/types";

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
    drawableKey: "torsoDrawable",
    textureKey: "torsoTexture",
    componentId: 3,
  },
  {
    title: {
      drawable: "Маска",
      texture: "Цвет маски",
    },
    drawableKey: "maskDrawable",
    textureKey: "maskTexture",
    componentId: 1,
  },
  {
    title: {
      drawable: "Куртка",
      texture: "Цвет куртки",
    },
    drawableKey: "torsoSecondDrawable",
    textureKey: "torsoSecondTexture",
    componentId: 11,
  },
  {
    title: {
      drawable: "Футболка",
      texture: "Цвет футболки",
    },
    drawableKey: "undershirtDrawable",
    textureKey: "undershirtTexture",
    componentId: 8,
  },
  {
    title: {
      drawable: "Штаны",
      texture: "Цвет штанов",
    },
    drawableKey: "legDrawable",
    textureKey: "legTexture",
    componentId: 4,
  },
  {
    title: {
      drawable: "Обувь",
      texture: "Цвет обуви",
    },
    drawableKey: "shoesDrawable",
    textureKey: "shoesTexture",
    componentId: 6,
  },
  {
    title: {
      drawable: "Жилет",
      texture: "Цвет жилета",
    },
    drawableKey: "kevlarDrawable",
    textureKey: "kevlarTexture",
    componentId: 9,
  },
  {
    title: {
      drawable: "Рюкзак",
      texture: "Цвет рюкзака",
    },
    drawableKey: "bagDrawable",
    textureKey: "bagTexture",
    componentId: 5,
  },
  {
    title: {
      drawable: "Аксессуар",
      texture: "Цвет аксессуара",
    },
    drawableKey: "accessoryDrawable",
    textureKey: "accessoryTexture",
    componentId: 7,
  },
  {
    title: {
      drawable: "Нашивка",
      texture: "Цвет нашивки",
    },
    drawableKey: "badgeDrawable",
    textureKey: "badgeTexture",
    componentId: 10,
  },
];
