RegisterNuiCallback("getDrawablesCount", (data: { componentId: number }, cb: CallableFunction) => {
  const count = GetNumberOfPedDrawableVariations(GetPlayerPed(-1), data.componentId);

  cb([{ count }, false]);
});
