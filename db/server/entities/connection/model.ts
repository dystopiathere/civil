import { ConnectionEntity } from "types/civil";
import { BaseEntity, PlayerModel, Relations } from "~/entities";

export class ConnectionModel extends BaseEntity<ConnectionEntity> {
  protected readonly tableName: string = "connections";
  protected readonly relations: Relations = {
    belongsTo: [new PlayerModel()],
  };
}
