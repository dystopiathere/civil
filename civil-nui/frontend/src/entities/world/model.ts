import { create, type StoreApi, type UseBoundStore } from 'zustand'
import type { World } from './types'

type Actions = {
  setZoneName: (name: string) => void,
  setStreetName: (name: string) => void,
  setTime: (time: string) => void,
}

type WorldState = World & Actions;

export const useWorldStore: UseBoundStore<StoreApi<WorldState>> = create(
  (set) => ({
    streetName: 'Street',
    zoneName: 'Zone',
    time: '16:00',

    setZoneName: (zoneName) => set((state) => ({ ...state, zoneName })),
    setStreetName: (streetName) => set((state) => ({ ...state, streetName })),
    setTime: (time) => set((state) => ({ ...state, time })),
  })
)