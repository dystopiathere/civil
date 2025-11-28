import { Character } from '../character'
import { Connection } from '../connection'
import { Identifiers } from '../../types'

export interface IPlayer {
  getByIdentifiers (identifiers: Identifiers): Promise<Player | null>;

  getCharacters (id: number): Promise<Character[]>;

  getActiveCharacter (id: number): Promise<Character | null>;

  getConnections (id: number): Promise<Connection[]>;
}

export type Player = {
  id: number;
  steam: string;
  discord: string;
  license: string;
  whitelisted: boolean;
  banned: boolean;
  ban_reason: string;
  last_connection_at: string;
  created_at: string;
  updated_at: string;
}