import { useCallback, useEffect } from "react";
import { useCharacterStore, type HeadBlends } from "~/entities/character";
import { getHeadBlendData, setHeadBlend as eventSetHeadBlends } from "~/shared/lib/event-manager";
import { InputArrows } from "~/widgets/input-arrows";
import { InputRange } from "~/widgets/input-range";
import { ancestors, fathers, mothers } from "./config";

export function CharacterCreatorGenetics() {
  const { head_blends, setHeadBlends: stateSetHeadBlends } = useCharacterStore();

  useEffect(() => {
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
    [stateSetHeadBlends]
  );

  return (
    <div className="character-creator-page">
      <InputArrows
        label="Мать"
        value={head_blends.shape_first_id}
        range={mothers}
        onChange={(shape_first_id) => setHeadBlends({ shape_first_id })}
      />

      <InputArrows
        label="Отец"
        value={head_blends.shape_second_id}
        range={fathers}
        onChange={(shape_second_id) => setHeadBlends({ shape_second_id })}
      />

      <InputRange
        label="Микс родителей"
        value={head_blends.shape_mix}
        min={0}
        max={1}
        step={0.01}
        onChange={(shape_mix) => setHeadBlends({ shape_mix })}
      />

      <InputArrows
        label="Кожа матери"
        value={head_blends.skin_first_id}
        range={mothers}
        onChange={(skin_first_id) => setHeadBlends({ skin_first_id })}
      />

      <InputArrows
        label="Кожа отца"
        value={head_blends.skin_second_id}
        range={fathers}
        onChange={(skin_second_id) => setHeadBlends({ skin_second_id })}
      />

      <InputRange
        label="Микс кожи родителей"
        value={head_blends.skin_mix}
        min={0}
        max={1}
        step={0.01}
        onChange={(skin_mix) => setHeadBlends({ skin_mix })}
      />

      <InputArrows
        label="Предок"
        value={head_blends.shape_third_id}
        range={ancestors}
        onChange={(shape_third_id) => setHeadBlends({ shape_third_id })}
      />

      <InputArrows
        label="Кожа предка"
        value={head_blends.skin_third_id}
        range={ancestors}
        onChange={(skin_third_id) => setHeadBlends({ skin_third_id })}
      />

      <InputRange
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
