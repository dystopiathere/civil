import { PlayerEntity } from "types/civil";
import { BaseEntity, CharacterModel, ConnectionModel, Relations } from "~/entities";
import { QueryBuilder } from "~/helpers";
import { Identifiers } from "~/types";

export class PlayerModel extends BaseEntity<PlayerEntity> {
  protected readonly tableName: string = "players";
  protected readonly relations: Relations = {
    hasMany: [new ConnectionModel()],
    belongsToMany: [new CharacterModel()],
  };

  async getByIdentifiers(identifiers: Identifiers): Promise<PlayerEntity[] | false> {
    const query = new QueryBuilder<PlayerEntity>();
    query.action = "select";
    query.table = this.tableName;
    query.criteria = {
      unionType: "or",
      criteria: Object.entries(identifiers).map(([identifier, value]) => ({
        leftParameter: identifier,
        operator: "=",
        rightParameter: value,
      })),
    };
    return query.send();
  }
}
