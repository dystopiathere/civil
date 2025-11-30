import { setPlayerState } from './set-player-state'

let lastInterval: CitizenTimer = null

export function setPlayerRegeneration (limit: number, regenRate: number, enabled: boolean) {
  if (lastInterval) {
    clearInterval(lastInterval)
  }

  emit('playermanager:regeneration', enabled)

  if (!enabled) {
    return
  }

  const playerPed = GetPlayerPed(-1)

  lastInterval = setInterval(() => {
    const playerHealth = GetEntityHealth(playerPed)

    if (playerHealth >= limit) {
      setPlayerState({ health: limit })

      emit('playermanager:regeneration', false)

      clearInterval(lastInterval)
    } else {
      setPlayerState({ health: playerHealth + regenRate })
    }
  }, 1000)
}