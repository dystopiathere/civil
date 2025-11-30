import type { Player } from '~/entities/player'
import { create, type StoreApi, type UseBoundStore } from 'zustand'

type Actions = {
  setPlayerHealth: (data: { health: number, maxHealth: number }) => void,
  setPlayerArmour: (data: { armour: number, maxArmour: number }) => void,
  setPlayerBreath: (data: { breath: number }) => void,
  setPlayerInWater: (data: { isInWater: boolean }) => void,
}

type PlayerState = Player & Actions;

export const usePlayerStore: UseBoundStore<StoreApi<PlayerState>> = create(
  (set) => ({
    health: 200,
    maxHealth: 200,
    armour: 25,
    maxArmour: 100,
    breath: 40,
    isInWater: true,

    setPlayerHealth: ({ health, maxHealth }) => set((state) => ({ ...state, health, maxHealth })),
    setPlayerArmour: ({ armour, maxArmour }) => set((state) => ({ ...state, armour, maxArmour })),
    setPlayerBreath: ({ breath }) => set((state) => ({ ...state, breath })),
    setPlayerInWater: ({ isInWater }) => set((state) => ({ ...state, isInWater })),
  })
)