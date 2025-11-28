import { FullCharacterEntity } from 'civil'


const exports = global.exports as CitizenExports


const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

function sendCharacterData () {
  const { character } = LocalPlayer.state

  SendNuiMessage(JSON.stringify({
    name: 'setCharacterData',
    data: {
      character
    }
  }))
}

exports('sendCharacterData', sendCharacterData)