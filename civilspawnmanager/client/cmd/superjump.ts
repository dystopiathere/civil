import { FullCharacterEntity } from 'civil'


const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

RegisterCommand('superjump', async (source: number, args: string[], raw: string) => {
  LocalPlayer.state.set('superjump', args[0] === 'true', true)
}, false)

let superjumpTick: number = null

AddStateBagChangeHandler('superjump', null, (bagName: string, key: string, enabled: boolean) => {
  if (!enabled) {
    clearTick(superjumpTick)
    return
  }

  superjumpTick = setTick(() => {
    SetSuperJumpThisFrame(PlayerId())
  })
})