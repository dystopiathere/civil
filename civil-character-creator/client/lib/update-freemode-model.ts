import { FullCharacterEntity } from 'civil'

const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

export function updateFreemodeModel (data: Partial<FullCharacterEntity> = {}) {
  const playerPed = GetPlayerPed(-1)

  const { character } = LocalPlayer.state

  Object.assign(character, data)
  LocalPlayer.state.set('character', character, true)

  const {
    eye_color,
    head_blends,
    head_overlays,
    face_features,
    component_variations,
  } = character

  SetPedEyeColor(playerPed, eye_color)

  SetPedHeadBlendData(
    playerPed,
    head_blends.shape_first_id,
    head_blends.shape_second_id,
    head_blends.shape_third_id,
    head_blends.skin_first_id,
    head_blends.skin_second_id,
    head_blends.skin_third_id,
    head_blends.shape_mix,
    head_blends.skin_mix,
    head_blends.third_mix,
    false
  )

  const faceFeatures = [
    face_features.nose_width,
    face_features.nose_peak,
    face_features.nose_length,
    face_features.nose_bone_curveness,
    face_features.nose_tip,
    face_features.nose_bone_twist,
    face_features.eyebrow_up_down,
    face_features.eyebrow_in_out,
    face_features.cheek_bones,
    face_features.cheek_sideways_bone_size,
    face_features.cheek_bones_width,
    face_features.eye_opening,
    face_features.lip_thickness,
    face_features.jaw_bone_width,
    face_features.jaw_bone_shape,
    face_features.chin_bone,
    face_features.chin_bone_length,
    face_features.chin_bone_shape,
    face_features.chin_hole,
    face_features.neck_thickness,
  ]

  faceFeatures.forEach((value, key) => {
    SetPedFaceFeature(playerPed, key, value)
  })

  const headOverlay: { value: number, opacity: number, colorType?: number, color1?: number, color2?: number }[] = [
    {
      value: head_overlays.blemishes,
      opacity: head_overlays.blemishes_opacity,
    },
    {
      value: head_overlays.facial_hair,
      opacity: head_overlays.facial_hair_opacity,
      colorType: 1,
      color1: head_overlays.facial_hair_color,
      color2: head_overlays.facial_hair_second_color,
    },
    {
      value: head_overlays.eyebrows,
      opacity: head_overlays.eyebrows_opacity,
      colorType: 1,
      color1: head_overlays.eyebrows_color,
      color2: head_overlays.eyebrows_second_color,
    },
    {
      value: head_overlays.ageing,
      opacity: head_overlays.ageing_opacity,
    },
    {
      value: head_overlays.makeup,
      opacity: head_overlays.makeup_opacity,
      colorType: 1,
      color1: head_overlays.makeup_color,
      color2: head_overlays.makeup_second_color,
    },
    {
      value: head_overlays.blush,
      opacity: head_overlays.blush_opacity,
      colorType: 2,
      color1: head_overlays.blush_color,
      color2: head_overlays.blush_second_color,
    },
    {
      value: head_overlays.complexion,
      opacity: head_overlays.complexion_opacity,
    },
    {
      value: head_overlays.sun_damage,
      opacity: head_overlays.sun_damage_opacity,
    },
    {
      value: head_overlays.lipstick,
      opacity: head_overlays.lipstick_opacity,
      colorType: 2,
      color1: head_overlays.lipstick_color,
      color2: head_overlays.lipstick_second_color,
    },
    {
      value: head_overlays.moles_freckles,
      opacity: head_overlays.moles_freckles_opacity,
      colorType: 0,
      color1: head_overlays.moles_freckles_color,
      color2: head_overlays.moles_freckles_second_color,
    },
    {
      value: head_overlays.chest_hair,
      opacity: head_overlays.chest_hair_opacity,
      colorType: 1,
      color1: head_overlays.chest_hair_color,
      color2: head_overlays.chest_hair_second_color,
    },
    {
      value: head_overlays.body_blemishes,
      opacity: head_overlays.body_blemishes_opacity,
    },
    {
      value: head_overlays.add_body_blemishes,
      opacity: head_overlays.add_body_blemishes_opacity,
    },
  ]

  headOverlay.forEach(({ value, opacity, colorType, color1, color2 }, key) => {
    SetPedHeadOverlay(playerPed, key, value, opacity)

    if (colorType) {
      SetPedHeadOverlayColor(playerPed, key, colorType, color1 ?? 0, color2 ?? 0)
    }
  })

  const componentVariations: { drawable: number, texture: number, palette: number }[] = [
    {
      drawable: component_variations.face_drawable,
      texture: component_variations.face_texture,
      palette: component_variations.face_palette
    },
    {
      drawable: component_variations.mask_drawable,
      texture: component_variations.mask_texture,
      palette: component_variations.mask_palette
    },
    {
      drawable: component_variations.hair_drawable,
      texture: component_variations.hair_texture,
      palette: component_variations.hair_palette
    },
    {
      drawable: component_variations.torso_drawable,
      texture: component_variations.torso_texture,
      palette: component_variations.torso_palette
    },
    {
      drawable: component_variations.leg_drawable,
      texture: component_variations.leg_texture,
      palette: component_variations.leg_palette
    },
    {
      drawable: component_variations.bag_drawable,
      texture: component_variations.bag_texture,
      palette: component_variations.bag_palette
    },
    {
      drawable: component_variations.shoes_drawable,
      texture: component_variations.shoes_texture,
      palette: component_variations.shoes_palette
    },
    {
      drawable: component_variations.accessory_drawable,
      texture: component_variations.accessory_texture,
      palette: component_variations.accessory_palette
    },
    {
      drawable: component_variations.undershirt_drawable,
      texture: component_variations.undershirt_texture,
      palette: component_variations.undershirt_palette
    },
    {
      drawable: component_variations.kevlar_drawable,
      texture: component_variations.kevlar_texture,
      palette: component_variations.kevlar_palette
    },
    {
      drawable: component_variations.badge_drawable,
      texture: component_variations.badge_texture,
      palette: component_variations.badge_palette
    },
    {
      drawable: component_variations.torso_second_drawable,
      texture: component_variations.torso_second_texture,
      palette: component_variations.torso_second_palette
    },
  ]

  componentVariations.forEach(({ drawable, texture, palette }, key) => {
    SetPedComponentVariation(playerPed, key, drawable, texture, palette)
  })
}