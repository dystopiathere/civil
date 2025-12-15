import { Fragment, useCallback, useEffect } from "react";
import { useCharacterStore, type ComponentVariations } from "~/entities/character";
import {
  getComponentVariation,
  setComponentVariation as eventSetComponentVariation,
  getDrawablesList as eventGetDrawablesList,
  getTexturesList as eventGetTexturesList,
  renavigate,
} from "~/shared/lib/event-manager";
import { clothes } from "./config";
import { InputRange } from "~/widgets/input-range";

export function CharacterCreatorClothes() {
  const { component_variations, setComponentVariations: stateSetComponentVariations } = useCharacterStore();

  useEffect(() => {
    renavigate({ page: "characterCreatorClothes" });

    getComponentVariation().then((data) => {
      if (!data) {
        return;
      }

      const [componentVariations, error] = data;

      if (error) {
        console.error(error);
        return;
      }

      if (componentVariations) {
        stateSetComponentVariations(componentVariations);
      }
    });
  }, [stateSetComponentVariations]);

  const setComponentVariation = useCallback(
    (data: Partial<ComponentVariations>) => {
      stateSetComponentVariations(data);
      eventSetComponentVariation(data);
    },
    [stateSetComponentVariations]
  );

  const getDrawablesList = useCallback(async (componentId: number) => {
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

    return result.list;
  }, []);

  const getTexturesList = useCallback(async (componentId: number, drawableId: number) => {
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

    return result.list;
  }, []);

  return (
    <div className="character-creator-page">
      {clothes.map(({ componentId, title, drawableKey, textureKey }) => {
        const drawableValue = component_variations[drawableKey] as number;
        const textureValue = component_variations[textureKey] as number;

        return (
          <Fragment key={componentId}>
            <InputRange
              label={title.drawable}
              min={0}
              max={getDrawablesList(componentId)}
              step={1}
              value={drawableValue}
              onChange={(value) => setComponentVariation({ [drawableKey]: value, [textureKey]: 0 })}
            />
            <InputRange
              label={title.texture}
              min={0}
              max={getTexturesList(componentId, drawableValue)}
              step={1}
              value={textureValue}
              onChange={(value) => setComponentVariation({ [textureKey]: value })}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
