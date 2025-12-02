import type { Player } from '~/entities/player'
import { create, type StoreApi, type UseBoundStore } from 'zustand'

type Actions = {
  setPlayerHealth: (health: number) => void,
  setPlayerMaxHealth: (maxHealth: number) => void,
  setPlayerArmour: (armour: number) => void,
  setPlayerMaxArmour: (maxArmour: number) => void,
  setPlayerBreath: (breath: number) => void,
  setPlayerInWater: (isInWater: boolean) => void,
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

    setPlayerHealth: (health) => set((state) => ({ ...state, health })),
    setPlayerMaxHealth: (maxHealth) => set((state) => ({ ...state, maxHealth })),
    setPlayerArmour: (armour) => set((state) => ({ ...state, armour })),
    setPlayerMaxArmour: (maxArmour) => set((state) => ({ ...state, maxArmour })),
    setPlayerBreath: (breath) => set((state) => ({ ...state, breath })),
    setPlayerInWater: (isInWater) => set((state) => ({ ...state, isInWater })),
  })
)