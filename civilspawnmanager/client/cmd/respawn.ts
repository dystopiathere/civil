import { FullCharacterEntity } from 'civil'


const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

RegisterCommand('respawn', async (source: number, args: string[], raw: string) => {
  const playerPed = GetPlayerPed(-1)

  const { character } = LocalPlayer.state

  const [x, y, z] = GetEntityCoords(playerPed, true)

  NetworkResurrectLocalPlayer(x, y, z, GetEntityHeading(playerPed), 0, true)
  ClearPedBloodDamage(playerPed)

  Object.assign(character, { health: 300 })
  LocalPlayer.state.set('character', character, true)
}, false)