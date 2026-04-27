const cache: Record<number, number[]> = {};

RegisterNuiCallback("getDrawablesList", (data: { componentId: number }, cb: CallableFunction) => {
  if (cache[data.componentId]) {
    cb([{ list: cache[data.componentId] }, false]);
    return;
  }

  const length = GetNumberOfPedDrawableVariations(GetPlayerPed(-1), data.componentId) - 1;

  const list: number[] = [];

  const ped = GetPlayerPed(-1);

  Array.from({ length }).forEach((_, key) => {
    const valid = IsPedComponentVariationValid(ped, data.componentId, key, 0);
    const exclusive = IsPedComponentVariationGen9Exclusive(ped, data.componentId, key);

    if (!valid || exclusive) {
      return;
    }

    list.push(key);
  });

  cache[data.componentId] = list;

  cb([{ list }, false]);
});

export {};
