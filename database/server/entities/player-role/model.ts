import { IPlayerRole, PlayerRole } from './types'
import { BaseEntity } from '../base-entity'

export class PlayerRoleModel extends BaseEntity<PlayerRole> implements IPlayerRole {
  constructor () {
    super('player_roles')
  }
}