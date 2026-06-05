import { useCallback, useEffect, useState } from "react";
import type { CollectionData, ComponentVariationsEntity } from "@civil/types";
import { useCharacterStore } from "~/entities";
import {
  setComponentVariation as eventSetComponentVariation,
  getDrawableData as eventGetDrawableData,
} from "~/shared/lib/event-manager";
import type { ClothesData } from "~/pages/character-creator/pages/clothes/config";
import { InputRange, InputClothesRange } from "~/widgets";

type ClothesInputGroupProps = {
  id: number;
  data: ClothesData;
};

export function ClothesInputGroup({ id, data }: ClothesInputGroupProps) {
  const { componentVariations, setComponentVariations: stateSetComponentVariations } = useCharacterStore();

  const [drawableData, setDrawableData] = useState<CollectionData>({});

  const { componentId, collectionKey, drawableKey, textureKey, title } = data;
  const collection = componentVariations![collectionKey] as string;
  const drawableId = componentVariations![drawableKey] as number;
  const textureId = componentVariations![textureKey] as number;

  const drawables = drawableData[collection] ?? [];

  const getDrawableData = useCallback(async () => {
    const data = await eventGetDrawableData({ componentId });

    if (!data) {
      return [];
    }

    const [result, error] = data;

    if (error) {
      console.error(error);
      return [];
    }

    if (!result) {
      return [];
    }

    setDrawableData(result.data);
  }, [componentId]);

  const setComponentVariation = useCallback(
    (data: Partial<ComponentVariationsEntity>) => {
      stateSetComponentVariations(data);
      eventSetComponentVariation(data);
    },
    [stateSetComponentVariations],
  );

  useEffect(() => {
    getDrawableData();
  }, [getDrawableData]);

  const tabIndex = (id + 1) * 2;

  return (
    <>
      <InputClothesRange
        tabIndex={tabIndex - 1}
        label={title.drawable}
        min={0}
        data={drawableData}
        collection={collection}
        drawable={drawableId}
        onChange={(collection, drawable) => {
          setComponentVariation({ [collectionKey]: collection, [drawableKey]: drawable, [textureKey]: 0 });
        }}
      />
      <InputRange
        tabIndex={tabIndex}
        label={title.texture}
        min={0}
        max={drawables[drawableId] ?? []}
        step={1}
        value={textureId}
        disabledOnMaxValue={1}
        onChange={(value) => setComponentVariation({ [textureKey]: value })}
      />
    </>
  );
}
