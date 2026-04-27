import { useCallback, useEffect } from "react";
import { useCharacterStore, type HeadBlends } from "~/entities/character";
import { getHeadBlendData, setHeadBlend as eventSetHeadBlends, renavigate } from "~/shared/lib/event-manager";
import { InputRange } from "~/widgets/input-range";
import { ancestors, fathers, mothers } from "./config";
import { InputAxis } from "~/widgets/input-axis";

export function CharacterCreatorGenetics() {
  const { head_blends, setHeadBlends: stateSetHeadBlends } = useCharacterStore();

  useEffect(() => {
    renavigate({ page: "characterCreatorGenetics" });

    getHeadBlendData().then((data) => {
      if (!data) {
        return;
      }

      const [headBlends, error] = data;

      if (error) {
        console.error(error);
        return;
      }

      if (headBlends) {
        stateSetHeadBlends(headBlends);
      }
    });
  }, [stateSetHeadBlends]);

  const setHeadBlends = useCallback(
    (data: Partial<HeadBlends>) => {
      stateSetHeadBlends(data);
      eventSetHeadBlends(data);
    },
    [stateSetHeadBlends],
  );

  return (
    <div className="character-creator-page">
      <InputRange
        tabIndex={1}
        label="Мать"
        min={0}
        max={mothers}
        step={1}
        value={head_blends.shape_first_id}
        onChange={(shape_first_id) => setHeadBlends({ shape_first_id })}
      />

      <InputRange
        tabIndex={2}
        label="Кожа матери"
        min={0}
        max={mothers}
        step={1}
        value={head_blends.skin_first_id}
        onChange={(skin_first_id) => setHeadBlends({ skin_first_id })}
      />

      <InputRange
        tabIndex={3}
        label="Отец"
        min={0}
        max={fathers}
        step={1}
        value={head_blends.shape_second_id}
        onChange={(shape_second_id) => setHeadBlends({ shape_second_id })}
      />

      <InputRange
        tabIndex={4}
        label="Кожа отца"
        min={0}
        max={fathers}
        step={1}
        value={head_blends.skin_second_id}
        onChange={(skin_second_id) => setHeadBlends({ skin_second_id })}
      />

      <InputAxis
        label="Микс родителей"
        x={{
          label: "Кожа",
          value: head_blends.skin_mix,
          min: { label: "Мать", value: 0 },
          max: { label: "Отец", value: 1 },
        }}
        y={{
          label: "Внешность",
          value: head_blends.shape_mix,
          min: { label: "Мать", value: 0 },
          max: { label: "Отец", value: 1 },
        }}
        onChange={(skin_mix: number, shape_mix: number) => setHeadBlends({ skin_mix, shape_mix })}
      />

      <InputRange
        tabIndex={5}
        label="Предок"
        min={0}
        max={ancestors}
        step={1}
        value={head_blends.shape_third_id}
        onChange={(shape_third_id) => setHeadBlends({ shape_third_id })}
      />

      <InputRange
        tabIndex={6}
        label="Кожа предка"
        min={0}
        max={ancestors}
        step={1}
        value={head_blends.skin_third_id}
        onChange={(skin_third_id) => setHeadBlends({ skin_third_id })}
      />

      <InputRange
        tabIndex={7}
        label="Микс предка"
        value={head_blends.third_mix}
        min={0}
        max={1}
        step={0.01}
        onChange={(third_mix) => setHeadBlends({ third_mix })}
      />
    </div>
  );
}
