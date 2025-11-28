import { ArrowIcon } from '~/shared/ui/arrow-icon'
import { useCharacterStore } from '~/entities/character'
import { useEffect } from 'react'
import { getHeadBlendData, sendCharacterUpdates } from '~/shared/lib/event-manager'
import { ancestors, fathers, mothers } from './config'

export function CharacterCreatorGenetics () {
  const { head_blends, head_overlays, face_features, component_variations, setHeadBlends } = useCharacterStore()

  useEffect(() => {
    console.log(head_blends)

    getHeadBlendData().then((data) => {
      console.log(JSON.stringify(data))
    })

    sendCharacterUpdates({
      head_blends,
      head_overlays,
      face_features,
      component_variations
    })
  }, [head_blends, head_overlays, face_features, component_variations])

  return <div className="character-creator-page">
    <div className="character-creator-page-group">
      <div className="character-creator-page-group__title">Отец</div>

      <div className="character-creator-page-group-input">
        <div
          className="character-creator-page-group-input__control character-creator-page-group-input__control_prev"
          onClick={() => {
            const fatherId = fathers.findIndex((value) => value === head_blends.shape_first_id)
            let index = fatherId - 1

            if (index < 0) {
              index = fathers.length - 1
            }

            const shape_first_id = fathers[index]

            setHeadBlends({ ...head_blends, shape_first_id })
          }}
        >
          <ArrowIcon width={32} height={32} color={'white'}/>
        </div>

        <div className="character-creator-page-group-input__value">{head_blends.shape_first_id}</div>

        <div
          className="character-creator-page-group-input__control character-creator-page-group-input__control_prev"
          onClick={() => {
            const fatherId = fathers.findIndex((value) => value === head_blends.shape_first_id)
            let index = fatherId + 1

            if (index === fathers.length) {
              index = 0
            }

            const shape_first_id = fathers[index]

            setHeadBlends({ ...head_blends, shape_first_id })
          }}
        >
          <ArrowIcon width={32} height={32} color={'white'} rightDirection/>
        </div>
      </div>
    </div>

    <div className="character-creator-page-group">
      <div className="character-creator-page-group__title">Мать</div>

      <div className="character-creator-page-group-input">
        <div
          className="character-creator-page-group-input__control character-creator-page-group-input__control_prev"
          onClick={() => {
            const motherId = mothers.findIndex((value) => value === head_blends.shape_second_id)
            let index = motherId - 1

            if (index < 0) {
              index = mothers.length - 1
            }

            const shape_second_id = mothers[index]

            setHeadBlends({ ...head_blends, shape_second_id })
          }}
        >
          <ArrowIcon width={32} height={32} color={'white'}/>
        </div>

        <div className="character-creator-page-group-input__value">{head_blends.shape_second_id}</div>

        <div
          className="character-creator-page-group-input__control character-creator-page-group-input__control_prev"
          onClick={() => {
            const motherId = mothers.findIndex((value) => value === head_blends.shape_second_id)
            let index = motherId + 1

            if (index === mothers.length) {
              index = 0
            }

            const shape_second_id = mothers[index]

            setHeadBlends({ ...head_blends, shape_second_id })
          }}
        >
          <ArrowIcon width={32} height={32} color={'white'} rightDirection/>
        </div>
      </div>
    </div>

    <div className="character-creator-page-group">
      <div className="character-creator-page-group__title">Предок</div>

      <div className="character-creator-page-group-input">
        <div
          className="character-creator-page-group-input__control character-creator-page-group-input__control_prev"
          onClick={() => {
            const ancestorId = ancestors.findIndex((value) => value === head_blends.shape_third_id)
            let index = ancestorId - 1

            if (index < 0) {
              index = ancestors.length - 1
            }

            const shape_third_id = ancestors[index]

            setHeadBlends({ ...head_blends, shape_third_id })
          }}
        >
          <ArrowIcon width={32} height={32} color={'white'}/>
        </div>

        <div className="character-creator-page-group-input__value">{head_blends.shape_third_id}</div>

        <div
          className="character-creator-page-group-input__control character-creator-page-group-input__control_prev"
          onClick={() => {
            const ancestorId = ancestors.findIndex((value) => value === head_blends.shape_third_id)
            let index = ancestorId + 1

            if (index === ancestors.length) {
              index = 0
            }

            const shape_third_id = ancestors[index]

            setHeadBlends({ ...head_blends, shape_third_id })
          }}
        >
          <ArrowIcon width={32} height={32} color={'white'} rightDirection/>
        </div>
      </div>
    </div>
  </div>
}