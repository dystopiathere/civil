import { useCharacterStore } from '~/entities/character'
import { sendCharacterUpdates } from '~/shared/lib/event-manager'
import { ancestors, fathers, mothers } from './config'
import { InputArrows } from '~/widgets/input-arrows'
import { InputRange } from '~/widgets/input-range'

export function CharacterCreatorGenetics () {
  const { head_blends } = useCharacterStore()

  return <div className="character-creator-page">
    <InputArrows
      label="Мать"
      value={head_blends.shape_first_id}
      range={mothers}
      onChange={(shape_first_id) => sendCharacterUpdates({ head_blends: { ...head_blends, shape_first_id } })}
    />

    <InputArrows
      label="Отец"
      value={head_blends.shape_second_id}
      range={fathers}
      onChange={(shape_second_id) => sendCharacterUpdates({ head_blends: { ...head_blends, shape_second_id } })}
    />

    <InputRange
      label="Микс родителей"
      value={head_blends.shape_mix}
      min={0}
      max={1}
      step={0.01}
      onChange={(shape_mix) => sendCharacterUpdates({ head_blends: { ...head_blends, shape_mix } })}
    />

    <InputArrows
      label="Кожа матери"
      value={head_blends.skin_first_id}
      range={mothers}
      onChange={(skin_first_id) => sendCharacterUpdates({ head_blends: { ...head_blends, skin_first_id } })}
    />

    <InputArrows
      label="Кожа отца"
      value={head_blends.skin_second_id}
      range={fathers}
      onChange={(skin_second_id) => sendCharacterUpdates({ head_blends: { ...head_blends, skin_second_id } })}
    />

    <InputRange
      label="Микс кожи родителей"
      value={head_blends.skin_mix}
      min={0}
      max={1}
      step={0.01}
      onChange={(skin_mix) => sendCharacterUpdates({ head_blends: { ...head_blends, skin_mix } })}
    />

    <InputArrows
      label="Предок"
      value={head_blends.shape_third_id}
      range={ancestors}
      onChange={(shape_third_id) => sendCharacterUpdates({ head_blends: { ...head_blends, shape_third_id } })}
    />

    <InputArrows
      label="Кожа предка"
      value={head_blends.skin_third_id}
      range={ancestors}
      onChange={(skin_third_id) => sendCharacterUpdates({ head_blends: { ...head_blends, skin_third_id } })}
    />

    <InputRange
      label="Микс предка"
      value={head_blends.third_mix}
      min={0}
      max={1}
      step={0.01}
      onChange={(third_mix) => sendCharacterUpdates({ head_blends: { ...head_blends, third_mix } })}
    />
  </div>
}