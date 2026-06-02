import { useCallback, useEffect } from "react";
import type { HeadBlendsEntity } from "@civil/types";
import { useCharacterStore } from "~/entities/character";
import { getHeadBlendData, setHeadBlend as eventSetHeadBlends, renavigate } from "~/shared/lib";
import { InputRange, InputAxis } from "~/widgets";
import { ancestors, fathers, mothers } from "./config";

export function CharacterCreatorGenetics() {
  const { headBlends, setHeadBlends: stateSetHeadBlends } = useCharacterStore();

  useEffect(() => {
    renavigate({ page: "characterCreatorGenetics" });

    getHeadBlendData().then((data) => {
      if (!data) {
        return;
      }

      const [result, error] = data;

      if (error) {
        console.error(error);
        return;
      }

      if (result) {
        stateSetHeadBlends(result);
      }
    });
  }, [stateSetHeadBlends]);

  const setHeadBlends = useCallback(
    (data: Partial<HeadBlendsEntity>) => {
      stateSetHeadBlends(data);
      eventSetHeadBlends(data);
    },
    [stateSetHeadBlends],
  );

  return (
    headBlends && (
      <div className="character-creator-page">
        <InputRange
          tabIndex={1}
          label="Мать"
          min={0}
          max={mothers}
          step={1}
          value={headBlends.shapeFirstId}
          onChange={(shapeFirstId) => setHeadBlends({ shapeFirstId })}
        />

        <InputRange
          tabIndex={2}
          label="Кожа матери"
          min={0}
          max={mothers}
          step={1}
          value={headBlends.skinFirstId}
          onChange={(skinFirstId) => setHeadBlends({ skinFirstId })}
        />

        <InputRange
          tabIndex={3}
          label="Отец"
          min={0}
          max={fathers}
          step={1}
          value={headBlends.shapeSecondId}
          onChange={(shapeSecondId) => setHeadBlends({ shapeSecondId })}
        />

        <InputRange
          tabIndex={4}
          label="Кожа отца"
          min={0}
          max={fathers}
          step={1}
          value={headBlends.skinSecondId}
          onChange={(skinSecondId) => setHeadBlends({ skinSecondId })}
        />

        <InputAxis
          label="Микс родителей"
          x={{
            label: "Кожа",
            value: headBlends.skinMix,
            min: { label: "Мать", value: 0 },
            max: { label: "Отец", value: 1 },
          }}
          y={{
            label: "Внешность",
            value: headBlends.shapeMix,
            min: { label: "Мать", value: 0 },
            max: { label: "Отец", value: 1 },
          }}
          onChange={(skinMix: number, shapeMix: number) => setHeadBlends({ skinMix, shapeMix })}
        />

        <InputRange
          tabIndex={5}
          label="Предок"
          min={0}
          max={ancestors}
          step={1}
          value={headBlends.shapeThirdId}
          onChange={(shapeThirdId) => setHeadBlends({ shapeThirdId })}
        />

        <InputRange
          tabIndex={6}
          label="Кожа предка"
          min={0}
          max={ancestors}
          step={1}
          value={headBlends.skinThirdId}
          onChange={(skinThirdId) => setHeadBlends({ skinThirdId })}
        />

        <InputRange
          tabIndex={7}
          label="Микс предка"
          value={headBlends.thirdMix}
          min={0}
          max={1}
          step={0.01}
          onChange={(thirdMix) => setHeadBlends({ thirdMix })}
        />
      </div>
    )
  );
}
