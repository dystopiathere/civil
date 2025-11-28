import { FullCharacterEntity } from 'civil'

const exports = global.exports as CitizenExports

const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

let timeoutId

RegisterCommand('revive', async (source: number, args: string[], raw: string) => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  const playerPed = GetPlayerPed(-1)

  const { character } = LocalPlayer.state

  const [x, y, z] = GetEntityCoords(playerPed, true)

  NetworkResurrectLocalPlayer(x, y, z, GetEntityHeading(playerPed), 0, true)

  const delay = await exports.animationsmanager.playAnimationChain(playerPed, 'reviveVictim')

  console.log(delay)

  timeoutId = setTimeout(() => {
    Object.assign(character, { health: 180 })
    LocalPlayer.state.set('character', character, true)
  }, delay)
})