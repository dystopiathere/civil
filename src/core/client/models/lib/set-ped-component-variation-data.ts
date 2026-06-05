import { ComponentVariationsEntity } from "@civil/types";
import { TypedLocalPlayer } from "@civil/typed-helpers/client";

type ComponentVariationsElement = {
  collection: string;
  drawable: number;
  texture: number;
};

export function setPedComponentVariationData(ped: number, data: Partial<ComponentVariationsEntity> = {}) {
  const localData = { ...TypedLocalPlayer().state.componentVariations };

  Object.assign(localData, data);

  const componentVariations: ComponentVariationsElement[] = [
    {
      collection: localData.faceCollection,
      drawable: localData.faceDrawable,
      texture: localData.faceTexture,
    },
    {
      collection: localData.maskCollection,
      drawable: localData.maskDrawable,
      texture: localData.maskTexture,
    },
    {
      collection: localData.hairCollection,
      drawable: localData.hairDrawable,
      texture: localData.hairTexture,
    },
    {
      collection: localData.torsoCollection,
      drawable: localData.torsoDrawable,
      texture: localData.torsoTexture,
    },
    {
      collection: localData.legCollection,
      drawable: localData.legDrawable,
      texture: localData.legTexture,
    },
    {
      collection: localData.bagCollection,
      drawable: localData.bagDrawable,
      texture: localData.bagTexture,
    },
    {
      collection: localData.shoesCollection,
      drawable: localData.shoesDrawable,
      texture: localData.shoesTexture,
    },
    {
      collection: localData.accessoryCollection,
      drawable: localData.accessoryDrawable,
      texture: localData.accessoryTexture,
    },
    {
      collection: localData.undershirtCollection,
      drawable: localData.undershirtDrawable,
      texture: localData.undershirtTexture,
    },
    {
      collection: localData.kevlarCollection,
      drawable: localData.kevlarDrawable,
      texture: localData.kevlarTexture,
    },
    {
      collection: localData.badgeCollection,
      drawable: localData.badgeDrawable,
      texture: localData.badgeTexture,
    },
    {
      collection: localData.torsoSecondCollection,
      drawable: localData.torsoSecondDrawable,
      texture: localData.torsoSecondTexture,
    },
  ];

  componentVariations.forEach(({ collection, drawable, texture }, key) => {
    SetPedCollectionComponentVariation(ped, key, collection, drawable, texture, GetPedPaletteVariation(ped, key));
  });
}
