import { ComponentVariations } from "types/civil";

type ComponentVariationsElement = {
  drawable: number;
  texture: number;
  palette: number;
};

export function setPedComponentVariationData(ped: number, data: Partial<ComponentVariations> = {}) {
  const localData = { ...(global.LocalPlayer as LocalPlayerInterface).state.component_variations };

  Object.assign(localData, data);

  const componentVariations: ComponentVariationsElement[] = [
    {
      drawable: localData.face_drawable,
      texture: localData.face_texture,
      palette: localData.face_palette,
    },
    {
      drawable: localData.mask_drawable,
      texture: localData.mask_texture,
      palette: localData.mask_palette,
    },
    {
      drawable: localData.hair_drawable,
      texture: localData.hair_texture,
      palette: localData.hair_palette,
    },
    {
      drawable: localData.torso_drawable,
      texture: localData.torso_texture,
      palette: localData.torso_palette,
    },
    {
      drawable: localData.leg_drawable,
      texture: localData.leg_texture,
      palette: localData.leg_palette,
    },
    {
      drawable: localData.bag_drawable,
      texture: localData.bag_texture,
      palette: localData.bag_palette,
    },
    {
      drawable: localData.shoes_drawable,
      texture: localData.shoes_texture,
      palette: localData.shoes_palette,
    },
    {
      drawable: localData.accessory_drawable,
      texture: localData.accessory_texture,
      palette: localData.accessory_palette,
    },
    {
      drawable: localData.undershirt_drawable,
      texture: localData.undershirt_texture,
      palette: localData.undershirt_palette,
    },
    {
      drawable: localData.kevlar_drawable,
      texture: localData.kevlar_texture,
      palette: localData.kevlar_palette,
    },
    {
      drawable: localData.badge_drawable,
      texture: localData.badge_texture,
      palette: localData.badge_palette,
    },
    {
      drawable: localData.torso_second_drawable,
      texture: localData.torso_second_texture,
      palette: localData.torso_second_palette,
    },
  ];

  componentVariations.forEach(({ drawable, texture, palette }, key) => {
    SetPedComponentVariation(ped, key, drawable, texture, palette);
  });
}
