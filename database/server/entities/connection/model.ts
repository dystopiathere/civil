import { Connection, IConnection } from './types'
import { BaseEntity } from '../base-entity'

export class ConnectionModel extends BaseEntity<Connection> implements IConnection {
  constructor () {
    super('connections')
  }
}