RegisterNuiCallback('getHeadOverlay', (data: {}, cb: CallableFunction) => {
  cb([LocalPlayer.state.head_overlays, false])
})