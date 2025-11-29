import { delay } from './utils'
import './cmd'
import { FullCharacterEntity } from 'civil'

const exports = global.exports as CitizenExports

const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

async function spawnPlayer () {
  const { character } = LocalPlayer.state

  if (!IsModelInCdimage(character.model) || !IsModelAPed(character.model)) {
    console.log(`Bad model: ${character.model}`)
  }

  RequestModel(character.model)
  while (!HasModelLoaded(character.model)) {
    await delay(500)
  }

  exports.spawnmanager.spawnPlayer({
    x: character.last_position?.x ?? 410.213,
    y: character.last_position?.y ?? -963.708,
    z: character.last_position?.z ?? 28.651,
    heading: character.last_position?.heading ?? undefined,
    model: character.model,
    skipFade: true,
  })

  SetModelAsNoLongerNeeded(character.model)
}

on('onClientGameTypeStart', async () => {
  await spawnPlayer()

  const ped = GetPlayerPed(-1)

  exports.nui.navigate('characterCreator')
})

on('playerSpawned', async () => {
  const { character } = LocalPlayer.state

  exports.playermanager.setPlayerState(character)
  exports.playermanager.updateFreemodeModel(character)
  exports.playermanager.setPlayerSkills(character)
  exports.nui.sendPlayerStats()

  const playerPed = GetPlayerPed(-1)

  const guns = ['WEAPON_MINIGUN', 'WEAPON_HEAVYSHOTGUN', 'WEAPON_PRECISIONRIFLE', 'WEAPON_REVOLVER_MK2', 'WEAPON_ASSAULTSMG', 'WEAPON_BAT', 'WEAPON_ASSAULTRIFLE_MK2']

  guns.forEach((gun) => {
    GiveWeaponToPed(playerPed, gun, 99999, false, false)
  })
})