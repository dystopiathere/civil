import type { ComponentVariationsEntity } from "@civil/types";

export type ClothesData = {
  title: {
    drawable: string;
    texture: string;
  };
  collectionKey: keyof ComponentVariationsEntity;
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
    collectionKey: "torsoCollection",
    drawableKey: "torsoDrawable",
    textureKey: "torsoTexture",
    componentId: 3,
  },
  {
    title: {
      drawable: "Маска",
      texture: "Цвет маски",
    },
    collectionKey: "maskCollection",
    drawableKey: "maskDrawable",
    textureKey: "maskTexture",
    componentId: 1,
  },
  {
    title: {
      drawable: "Куртка",
      texture: "Цвет куртки",
    },
    collectionKey: "torsoSecondCollection",
    drawableKey: "torsoSecondDrawable",
    textureKey: "torsoSecondTexture",
    componentId: 11,
  },
  {
    title: {
      drawable: "Футболка",
      texture: "Цвет футболки",
    },
    collectionKey: "undershirtCollection",
    drawableKey: "undershirtDrawable",
    textureKey: "undershirtTexture",
    componentId: 8,
  },
  {
    title: {
      drawable: "Штаны",
      texture: "Цвет штанов",
    },
    collectionKey: "legCollection",
    drawableKey: "legDrawable",
    textureKey: "legTexture",
    componentId: 4,
  },
  {
    title: {
      drawable: "Обувь",
      texture: "Цвет обуви",
    },
    collectionKey: "shoesCollection",
    drawableKey: "shoesDrawable",
    textureKey: "shoesTexture",
    componentId: 6,
  },
  {
    title: {
      drawable: "Жилет",
      texture: "Цвет жилета",
    },
    collectionKey: "kevlarCollection",
    drawableKey: "kevlarDrawable",
    textureKey: "kevlarTexture",
    componentId: 9,
  },
  {
    title: {
      drawable: "Рюкзак",
      texture: "Цвет рюкзака",
    },
    collectionKey: "bagCollection",
    drawableKey: "bagDrawable",
    textureKey: "bagTexture",
    componentId: 5,
  },
  {
    title: {
      drawable: "Аксессуар",
      texture: "Цвет аксессуара",
    },
    collectionKey: "accessoryCollection",
    drawableKey: "accessoryDrawable",
    textureKey: "accessoryTexture",
    componentId: 7,
  },
  {
    title: {
      drawable: "Нашивка",
      texture: "Цвет нашивки",
    },
    collectionKey: "badgeCollection",
    drawableKey: "badgeDrawable",
    textureKey: "badgeTexture",
    componentId: 10,
  },
];
