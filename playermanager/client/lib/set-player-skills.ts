import { FullCharacterEntity } from 'civil'

export function setPlayerSkills ({ skills }: Partial<FullCharacterEntity>) {
  const {
    stamina,
    strength,
    lung_capacity,
    wheelie_ability,
    flying_ability,
    shooting_ability,
    stealth_ability
  } = skills

  StatSetInt('MP0_STAMINA', stamina, true)
  StatSetInt('MP0_STRENGTH', strength, true)
  StatSetInt('MP0_LUNG_CAPACITY', lung_capacity, true)
  StatSetInt('MP0_WHEELIE_ABILITY', wheelie_ability, true)
  StatSetInt('MP0_FLYING_ABILITY', flying_ability, true)
  StatSetInt('MP0_SHOOTING_ABILITY', shooting_ability, true)
  StatSetInt('MP0_STEALTH_ABILITY', stealth_ability, true)
}