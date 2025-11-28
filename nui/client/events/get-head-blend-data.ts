RegisterNuiCallback('getHeadBlendData', (data: {}, cb: CallableFunction) => {
  const headBlendData = GetPedHeadBlendData(GetPlayerPed(-1))

  cb([{ headBlendData }, false])
})