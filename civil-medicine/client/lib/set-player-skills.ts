import { FullCharacterEntity } from 'civil'

const LocalPlayer = global.LocalPlayer as {
  state: StateBagInterface & {
    character: FullCharacterEntity;
  };
}

export function setPlayerSkills (data: Partial<FullCharacterEntity> = {}) {
  const { character } = LocalPlayer.state

  Object.assign(character, data)
  LocalPlayer.state.set('character', character, true)

  const {
    stamina,
    strength,
    lung_capacity,
    wheelie_ability,
    flying_ability,
    shooting_ability,
    stealth_ability
  } = character.skills

  StatSetInt('MP0_STAMINA', stamina, true)
  StatSetInt('MP0_STRENGTH', strength, true)
  StatSetInt('MP0_LUNG_CAPACITY', lung_capacity, true)
  StatSetInt('MP0_WHEELIE_ABILITY', wheelie_ability, true)
  StatSetInt('MP0_FLYING_ABILITY', flying_ability, true)
  StatSetInt('MP0_SHOOTING_ABILITY', shooting_ability, true)
  StatSetInt('MP0_STEALTH_ABILITY', stealth_ability, true)
}