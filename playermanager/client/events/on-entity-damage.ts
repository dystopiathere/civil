import { FullCharacterEntity } from 'civil'


const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

export default (args: any[]) => {
  const [pedId] = args

  const playerPed = GetPlayerPed(-1)

  if (pedId === playerPed) {
    const { character } = LocalPlayer.state

    Object.assign(character, { health: GetEntityHealth(playerPed), armour: GetPedArmour(playerPed) })

    LocalPlayer.state.set('character', character, true)
  }
}