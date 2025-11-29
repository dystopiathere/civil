import { useCharacterStore } from '~/entities/character'
import { useLayoutEffect } from 'react'
import { getHeadBlendData, sendCharacterUpdates } from '~/shared/lib/event-manager'
import { ancestors, fathers, mothers } from './config'
import { InputArrows } from '~/widgets/input-arrows'

export function CharacterCreatorGenetics () {
  const { head_blends, setHeadBlends } = useCharacterStore()

  useLayoutEffect(() => {
    getHeadBlendData()
      .then((data) => {
        if (!data) {
          return
        }

        const [headBlend, _] = data

        if (headBlend) {
          setHeadBlends(headBlend)
        }
      })
  }, [])

  return <div className="character-creator-page">
    <InputArrows
      label={'Отец'}
      value={head_blends.shape_first_id}
      range={fathers}
      onChange={(newValue) => {
        setHeadBlends({ shape_first_id: newValue })
        sendCharacterUpdates({ head_blends })
      }}
    />

    <InputArrows
      label={'Мать'}
      value={head_blends.shape_second_id}
      range={mothers}
      onChange={(newValue) => {
        setHeadBlends({ shape_second_id: newValue })
        sendCharacterUpdates({ head_blends })
      }}
    />

    <InputArrows
      label={'Предок'}
      value={head_blends.shape_third_id}
      range={ancestors}
      onChange={(newValue) => {
        setHeadBlends({ shape_third_id: newValue })
        sendCharacterUpdates({ head_blends })
      }}
    />
  </div>
}