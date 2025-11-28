import { ISkills, Skills } from './types'
import { BaseEntity } from '../base-entity'

export class SkillsModel extends BaseEntity<Skills> implements ISkills {
  constructor () {
    super('skills')
  }
}