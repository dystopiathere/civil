import { CollectionData, DrawableData } from "@civil/types";

const cache: Record<number, CollectionData> = {};

export function getDrawableData(data: { componentId: number }, cb: CallableFunction) {
  if (cache[data.componentId]) return cb([{ data: cache[data.componentId] }, false]);

  const ped = PlayerPedId();

  const collectionData: CollectionData = {};

  const collectionsCount = GetPedCollectionsCount(ped);
  for (let collectionId = 0; collectionId < collectionsCount; collectionId++) {
    const collection = GetPedCollectionName(ped, collectionId);
    const drawableData: DrawableData = {};

    const drawablesCount = GetNumberOfPedCollectionDrawableVariations(ped, data.componentId, collection);
    for (let drawableId = 0; drawableId < drawablesCount; drawableId++) {
      const isExclusive = IsPedCollectionComponentVariationGen9Exclusive(ped, data.componentId, collection, drawableId);
      if (isExclusive) continue;

      const textures = [];

      const texturesCount = GetNumberOfPedCollectionTextureVariations(ped, data.componentId, collection, drawableId);
      for (let textureId = 0; textureId < texturesCount; textureId++) {
        const isValid = IsPedCollectionComponentVariationValid(
          ped,
          data.componentId,
          collection,
          drawableId,
          textureId,
        );

        if (isValid) textures.push(textureId);
      }

      if (textures.length) drawableData[drawableId] = textures;
    }

    if (Object.keys(drawableData).length) collectionData[collection] = drawableData;
  }

  cache[data.componentId] = collectionData;

  cb([{ data: collectionData }, false]);
}
