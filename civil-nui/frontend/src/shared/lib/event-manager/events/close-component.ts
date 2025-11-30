import { type EventSend, invoke } from '~/shared/lib/event-manager'

type EventRequestData = {
  nodata: null
}

type EventResponseData = {
  status: boolean;
}

const mockResponseData: EventResponseData = {
  status: true,
}

export const closeComponent: EventSend<EventRequestData, EventResponseData> = (data) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false])
    })
  }

  return invoke<EventRequestData, EventResponseData>('closeComponent', data)
}