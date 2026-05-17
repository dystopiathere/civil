import { PlayerRoleEntity } from "types/civil";
import { BaseEntity } from "~/entities";

export class PlayerRoleModel extends BaseEntity<PlayerRoleEntity> {
  protected tableName: string = "player_roles";
}
