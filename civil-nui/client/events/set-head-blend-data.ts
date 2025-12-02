import { HeadBlends } from 'civil'

RegisterNuiCallback('setHeadBlendData', (data: HeadBlends, cb: CallableFunction) => {
  global.LocalPlayer.state.set('head_blends', data, true)

  cb([{ status: true }, false])
})