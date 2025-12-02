import { type EventSend, invoke } from '~/shared/lib/event-manager'
import type { HeadOverlays } from '~/entities/character'

type EventRequestData = {
  nodata: null
}

type EventResponseData = Omit<HeadOverlays, 'id' | 'created_at' | 'updated_at'>

const mockResponseData: EventResponseData = {
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
}

export const getHeadOverlay: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false])
    })
  }

  return invoke<EventRequestData, EventResponseData>('getHeadOverlay', data)
}