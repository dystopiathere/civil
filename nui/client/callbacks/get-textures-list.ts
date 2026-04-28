const cache: Record<number, number[]> = {};

export function getTexturesList(data: { componentId: number; drawableId: number }, cb: CallableFunction) {
  const idx = Number(data.componentId.toString().concat(data.drawableId.toString()));

  if (cache[idx]) {
    cb([{ list: cache[idx] }, false]);
    return;
  }

  const length = GetNumberOfPedTextureVariations(GetPlayerPed(-1), data.componentId, data.drawableId);

  const list: number[] = [];

  Array.from({ length }).forEach((_, key) => {
    if (!IsPedComponentVariationValid(GetPlayerPed(-1), data.componentId, data.drawableId, key)) {
      return;
    }

    list.push(key);
  });

  cache[idx] = list;

  cb([{ list }, false]);
}
