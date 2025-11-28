import { type EventSend, invoke } from '~/shared/lib/event-manager'

type EventRequestData = {
  nodata: null
}

type EventResponseData = {
  test: boolean;
}

const mockResponseData: EventResponseData = {
  test: true,
}

export const getHeadBlendData: EventSend<EventRequestData, EventResponseData> = () => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => {
      resolve([mockResponseData, false])
    })
  }

  return invoke<EventRequestData, EventResponseData>('getHeadBlendData')
}