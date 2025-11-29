import { FullCharacterEntity } from 'civil'

const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

RegisterNuiCallback('getHeadBlendData', (data: {}, cb: CallableFunction) => {
  cb([LocalPlayer.state.character.head_blends, false])
})