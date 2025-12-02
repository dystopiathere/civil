import { type EventSend, invoke } from '~/shared/lib/event-manager'
import type { HeadBlends } from '~/entities/character'

type EventRequestData = Omit<HeadBlends, 'id' | 'created_at' | 'updated_at'>

type EventResponseData = {
  status: boolean;
}

const mockResponseData: EventResponseData = {
  status: true,
}

export const setHeadBlend: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false])
    })
  }

  return invoke<EventRequestData, EventResponseData>('setHeadBlend', data)
}