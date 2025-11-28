import { CharacterRole, ICharacterRole } from './types'
import { BaseEntity } from '../base-entity'

export class CharacterRoleModel extends BaseEntity<CharacterRole> implements ICharacterRole {
  constructor () {
    super('character_roles')
  }
}