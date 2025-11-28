import { FullCharacterEntity } from 'civil'


const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

let lastInterval: CitizenTimer = null

export function setPlayerRegeneration (limit: number, regenRate: number, enabled: boolean) {
  if (lastInterval) {
    clearInterval(lastInterval)
  }

  emit('playermanager:regeneration', enabled)

  if (!enabled) {
    return
  }

  const { character } = LocalPlayer.state

  lastInterval = setInterval(() => {
    if (LocalPlayer.state.health >= limit) {
      Object.assign(character, { health: limit })

      emit('playermanager:regeneration', false)

      clearInterval(lastInterval)
    } else {
      Object.assign(character, { health: character.health + regenRate })
    }

    LocalPlayer.state.set('character', character, true)
  }, 1000)
}