import { FullCharacterEntity } from 'civil'

const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

export function sendCharacterData () {
  const { character } = LocalPlayer.state

  SendNuiMessage(JSON.stringify({
    name: 'setCharacterData',
    data: {
      character
    }
  }))
}