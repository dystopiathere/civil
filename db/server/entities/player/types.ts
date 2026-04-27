import { CharacterEntity, ConnectionEntity, PlayerEntity } from "civil";
import { Identifiers } from "../../types";

export interface IPlayer {
  getByIdentifiers(identifiers: Identifiers): Promise<PlayerEntity | null>;

  getCharacters(id: number): Promise<CharacterEntity[]>;

  getActiveCharacter(id: number): Promise<CharacterEntity | null>;

  getConnections(id: number): Promise<ConnectionEntity[]>;
}
