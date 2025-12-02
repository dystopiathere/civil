RegisterNuiCallback('getModel', (data: {}, cb: CallableFunction) => {
  cb([LocalPlayer.state.model, false])
})