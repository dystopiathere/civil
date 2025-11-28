import { FullCharacterEntity } from 'civil'

export function setPlayerState ({ health, max_health, armour, max_armour }: Partial<FullCharacterEntity>) {
  const playerPed = GetPlayerPed(-1)

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