import { IPlayer } from './types'
import { BaseEntity } from '../base-entity'
import { Identifiers } from '../../types'
import { CharacterEntity, ConnectionEntity, PlayerEntity } from 'civil'

export class PlayerModel extends BaseEntity<PlayerEntity> implements IPlayer {
  constructor () {
    super('players')
  }

  async getByIdentifiers (identifiers: Identifiers): Promise<PlayerEntity | null> {
    const conditions = Object.keys(identifiers).map((field, key) => {
      if (key === 0) {
        return `${field} = $${key + 1}`
      }

      return `OR ${field} = $${key + 1}`
    }).join(' ')

    const sql = `SELECT *
                 FROM players
                 WHERE ${conditions}`

    const client = await this.pool.connect()

    const result = await client.query<PlayerEntity>(sql, Object.values(identifiers))

    return result.rows[0] ?? null
  }

  async getCharacters (id: number): Promise<CharacterEntity[]> {
    const sql = `SELECT c.*
                 FROM players p
                          JOIN players_characters pc ON pc.player_id = p.id
                          JOIN characters c ON c.id = pc.character_id
                 WHERE p.id = $1`

    const client = await this.pool.connect()

    const result = await client.query<CharacterEntity>(sql, [id])

    return result.rows
  }

  async getActiveCharacter (id: number): Promise<CharacterEntity | null> {
    const sql = `SELECT c.*
                 FROM players p
                          JOIN players_characters pc ON pc.player_id = p.id
                          JOIN characters c ON c.id = pc.character_id
                 WHERE p.id = $1
                   AND pc.active = true`

    const client = await this.pool.connect()

    const result = await client.query<CharacterEntity>(sql, [id])

    return result.rows[0] ?? null
  }

  async getConnections (id: number): Promise<ConnectionEntity[]> {
    const sql = `SELECT *
                 FROM connections
                 WHERE player_id = $1`

    const client = await this.pool.connect()

    const result = await client.query<ConnectionEntity>(sql, [id])

    return result.rows
  }
}