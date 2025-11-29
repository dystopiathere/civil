import { create, type StoreApi, type UseBoundStore } from 'zustand'
import type {
  Character, ComponentVariations, FaceFeatures, HeadBlends, HeadOverlays, Skills,
} from '~/entities/character'

type Actions = {
  setFaceFeatures: (faceFeatures: Partial<FaceFeatures>) => void,
  setSkills: (faceFeatures: Partial<Skills>) => void,
  setHeadOverlays: (faceFeatures: Partial<HeadOverlays>) => void,
  setComponentVariations: (faceFeatures: Partial<ComponentVariations>) => void,
  setHeadBlends: (headBlends: Partial<HeadBlends>) => void,
}

type CharacterState =
  Pick<Character, 'face_features' | 'skills' | 'head_blends' | 'head_overlays' | 'component_variations'>
  & Actions;

export const useCharacterStore: UseBoundStore<StoreApi<CharacterState>> = create(
  (set) => ({
    face_features: {
      id: 1,
      nose_width: 1,
      nose_peak: 1,
      nose_length: 1,
      nose_bone_curveness: 1,
      nose_tip: 1,
      nose_bone_twist: 1,
      eyebrow_up_down: 1,
      eyebrow_in_out: 1,
      cheek_bones: 1,
      cheek_sideways_bone_size: 1,
      cheek_bones_width: 1,
      eye_opening: 1,
      lip_thickness: 1,
      jaw_bone_width: 1,
      jaw_bone_shape: 1,
      chin_bone: 1,
      chin_bone_length: 1,
      chin_bone_shape: 1,
      chin_hole: 1,
      neck_thickness: 1,
      created_at: 'time',
      updated_at: 'time',
    },
    skills: {
      id: 1,
      stamina: 1,
      strength: 1,
      lung_capacity: 1,
      wheelie_ability: 1,
      flying_ability: 1,
      shooting_ability: 1,
      stealth_ability: 1,
    },
    head_overlays: {
      id: 1,
      blemishes: 1,
      blemishes_opacity: 1,
      facial_hair: 1,
      facial_hair_color: 1,
      facial_hair_second_color: 1,
      facial_hair_opacity: 1,
      eyebrows: 1,
      eyebrows_color: 1,
      eyebrows_second_color: 1,
      eyebrows_opacity: 1,
      ageing: 1,
      ageing_opacity: 1,
      makeup: 1,
      makeup_color: 1,
      makeup_second_color: 1,
      makeup_opacity: 1,
      blush: 1,
      blush_color: 1,
      blush_second_color: 1,
      blush_opacity: 1,
      complexion: 1,
      complexion_opacity: 1,
      sun_damage: 1,
      sun_damage_opacity: 1,
      lipstick: 1,
      lipstick_color: 1,
      lipstick_second_color: 1,
      lipstick_opacity: 1,
      moles_freckles: 1,
      moles_freckles_color: 1,
      moles_freckles_second_color: 1,
      moles_freckles_opacity: 1,
      chest_hair: 1,
      chest_hair_color: 1,
      chest_hair_second_color: 1,
      chest_hair_opacity: 1,
      body_blemishes: 1,
      body_blemishes_opacity: 1,
      add_body_blemishes: 1,
      add_body_blemishes_opacity: 1,
      created_at: 'time',
      updated_at: 'time',
    },
    component_variations: {
      id: 1,
      face_drawable: 1,
      face_texture: 1,
      face_palette: 1,
      mask_drawable: 1,
      mask_texture: 1,
      mask_palette: 1,
      hair_drawable: 1,
      hair_texture: 1,
      hair_palette: 1,
      torso_drawable: 1,
      torso_texture: 1,
      torso_palette: 1,
      leg_drawable: 1,
      leg_texture: 1,
      leg_palette: 1,
      bag_drawable: 1,
      bag_texture: 1,
      bag_palette: 1,
      shoes_drawable: 1,
      shoes_texture: 1,
      shoes_palette: 1,
      accessory_drawable: 1,
      accessory_texture: 1,
      accessory_palette: 1,
      undershirt_drawable: 1,
      undershirt_texture: 1,
      undershirt_palette: 1,
      kevlar_drawable: 1,
      kevlar_texture: 1,
      kevlar_palette: 1,
      badge_drawable: 1,
      badge_texture: 1,
      badge_palette: 1,
      torso_second_drawable: 1,
      torso_second_texture: 1,
      torso_second_palette: 1,
      created_at: 'time',
      updated_at: 'time',
    },
    head_blends: {
      id: 1,
      shape_first_id: 1,
      shape_second_id: 1,
      shape_third_id: 1,
      skin_first_id: 1,
      skin_second_id: 1,
      skin_third_id: 1,
      shape_mix: 1,
      skin_mix: 1,
      third_mix: 1,
      created_at: 'time',
      updated_at: 'time',
    },

    setFaceFeatures: (data: Partial<FaceFeatures>) => set((state) => {
      const face_features = { ...state.face_features }
      Object.assign(face_features, data)

      return ({ ...state, face_features })
    }),
    setSkills: (data: Partial<Skills>) => set((state) => {
      const skills = { ...state.skills }
      Object.assign(skills, data)

      return ({ ...state, skills })
    }),
    setHeadOverlays: (data: Partial<HeadOverlays>) => set((state) => {
      const head_overlays = { ...state.head_overlays }
      Object.assign(head_overlays, data)

      return ({ ...state, head_overlays })
    }),
    setComponentVariations: (data: Partial<ComponentVariations>) => set((state) => {
      const component_variations = { ...state.component_variations }
      Object.assign(component_variations, data)

      return ({ ...state, component_variations })
    }),
    setHeadBlends: (data: Partial<HeadBlends>) => set((state) => {
      const head_blends = { ...state.head_blends }
      Object.assign(head_blends, data)

      return ({ ...state, head_blends })
    }),
  })
)