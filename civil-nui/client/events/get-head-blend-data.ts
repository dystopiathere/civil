RegisterNuiCallback('getHeadBlendData', (data: {}, cb: CallableFunction) => {
  cb([LocalPlayer.state.head_blends, false])
})