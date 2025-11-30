RegisterNuiCallback('getTexturesCount', (data: { componentId: number, drawableId: number }, cb: CallableFunction) => {
  const count = GetNumberOfPedTextureVariations(GetPlayerPed(-1), data.componentId, data.drawableId)

  cb([{ count }, false])
})