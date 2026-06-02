import { ComponentVariationsEntity } from "@civil/types";
import { TypedLocalPlayer } from "~/helpers";

type ComponentVariationsElement = {
  drawable: number;
  texture: number;
  palette: number;
};

export function setPedComponentVariationData(ped: number, data: Partial<ComponentVariationsEntity> = {}) {
  const localData = { ...TypedLocalPlayer().state.componentVariations };

  Object.assign(localData, data);

  const componentVariations: ComponentVariationsElement[] = [
    {
      drawable: localData.faceDrawable,
      texture: localData.faceTexture,
      palette: localData.facePalette,
    },
    {
      drawable: localData.maskDrawable,
      texture: localData.maskTexture,
      palette: localData.maskPalette,
    },
    {
      drawable: localData.hairDrawable,
      texture: localData.hairTexture,
      palette: localData.hairPalette,
    },
    {
      drawable: localData.torsoDrawable,
      texture: localData.torsoTexture,
      palette: localData.torsoPalette,
    },
    {
      drawable: localData.legDrawable,
      texture: localData.legTexture,
      palette: localData.legPalette,
    },
    {
      drawable: localData.bagDrawable,
      texture: localData.bagTexture,
      palette: localData.bagPalette,
    },
    {
      drawable: localData.shoesDrawable,
      texture: localData.shoesTexture,
      palette: localData.shoesPalette,
    },
    {
      drawable: localData.accessoryDrawable,
      texture: localData.accessoryTexture,
      palette: localData.accessoryPalette,
    },
    {
      drawable: localData.undershirtDrawable,
      texture: localData.undershirtTexture,
      palette: localData.undershirtPalette,
    },
    {
      drawable: localData.kevlarDrawable,
      texture: localData.kevlarTexture,
      palette: localData.kevlarPalette,
    },
    {
      drawable: localData.badgeDrawable,
      texture: localData.badgeTexture,
      palette: localData.badgePalette,
    },
    {
      drawable: localData.torsoSecondDrawable,
      texture: localData.torsoSecondTexture,
      palette: localData.torsoSecondPalette,
    },
  ];

  componentVariations.forEach(({ drawable, texture, palette }, key) => {
    SetPedComponentVariation(ped, key, drawable, texture, palette);
  });
}
