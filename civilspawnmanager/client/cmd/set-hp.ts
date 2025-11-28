import { FullCharacterEntity } from 'civil'


const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

RegisterCommand('hp', async (source: number, args: string[], raw: string) => {
  const { character } = LocalPlayer.state

  Object.assign(character, { health: Number(args[0]) })

  LocalPlayer.state.set('character', character, true)
}, false)