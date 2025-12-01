import { FullCharacterEntity } from 'civil'

const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

export function setState (data: Partial<FullCharacterEntity> = {}) {
  const playerPed = GetPlayerPed(-1)

  const { character } = LocalPlayer.state

  Object.assign(character, data)
  LocalPlayer.state.set('character', character, true)

  const { health, max_health, armour, max_armour } = character

  if (max_health && GetPedMaxHealth(playerPed) !== max_health) {
    SetPedMaxHealth(playerPed, max_health)
  }

  if (health && GetEntityHealth(playerPed) !== health) {
    SetEntityHealth(playerPed, health)
  }

  if (max_armour && GetPlayerMaxArmour(PlayerId()) !== max_armour) {
    SetPlayerMaxArmour(PlayerId(), max_armour)
  }

  if (armour && GetPedArmour(playerPed) !== armour) {
    SetPedArmour(playerPed, armour)
  }
}