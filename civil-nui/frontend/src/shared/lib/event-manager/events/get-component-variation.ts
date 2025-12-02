import { type EventSend, invoke } from '~/shared/lib/event-manager'
import type { ComponentVariations } from '~/entities/character'

type EventRequestData = {
  nodata: null
}

type EventResponseData = Omit<ComponentVariations, 'id' | 'created_at' | 'updated_at'>

const mockResponseData: EventResponseData = {
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
}

export const getComponentVariation: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false])
    })
  }

  return invoke<EventRequestData, EventResponseData>('getComponentVariation', data)
}