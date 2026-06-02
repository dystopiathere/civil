import { useCallback, useEffect, useState } from "react";
import { useCharacterStore } from "~/entities";
import {
  setComponentVariation as eventSetComponentVariation,
  getDrawablesList as eventGetDrawablesList,
  getTexturesList as eventGetTexturesList,
} from "~/shared/lib/event-manager";
import type { ClothesData } from "~/pages/character-creator/pages/clothes/config";
import type { ComponentVariationsEntity } from "@civil/types";
import { InputRange } from "../input-range";

type ClothesInputGroupProps = {
  id: number;
  data: ClothesData;
};

export function ClothesInputGroup({ id, data }: ClothesInputGroupProps) {
  const { componentVariations, setComponentVariations: stateSetComponentVariations } = useCharacterStore();

  const [drawablesList, setDrawablesList] = useState<number[]>([]);
  const [texturesList, setTexturesList] = useState<number[]>([]);

  const { componentId, drawableKey, textureKey, title } = data;
  const drawableId = componentVariations![drawableKey] as number;
  const textureId = componentVariations![textureKey] as number;

  const getDrawablesList = useCallback(async () => {
    const data = await eventGetDrawablesList({ componentId });

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

    setDrawablesList(result.list);
  }, [data.componentId]);

  const getTexturesList = useCallback(async () => {
    const data = await eventGetTexturesList({ componentId, drawableId });

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

    setTexturesList(result.list);
  }, [componentId, drawableId]);

  const setComponentVariation = useCallback(
    (data: Partial<ComponentVariationsEntity>) => {
      stateSetComponentVariations(data);
      eventSetComponentVariation(data);
    },
    [stateSetComponentVariations],
  );

  useEffect(() => {
    getDrawablesList();
    getTexturesList();
  }, [getDrawablesList, getTexturesList]);

  const tabIndex = (id + 1) * 2;

  return (
    <>
      <InputRange
        tabIndex={tabIndex - 1}
        label={title.drawable}
        min={0}
        max={drawablesList}
        step={1}
        value={drawableId}
        disabledOnMaxValue={1}
        onChange={(value) => setComponentVariation({ [drawableKey]: value, [textureKey]: 0 })}
      />
      <InputRange
        tabIndex={tabIndex}
        label={title.texture}
        min={0}
        max={texturesList}
        step={1}
        value={textureId}
        disabledOnMaxValue={1}
        onChange={(value) => setComponentVariation({ [textureKey]: value })}
      />
    </>
  );
}
