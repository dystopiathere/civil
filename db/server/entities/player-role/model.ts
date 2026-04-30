import { PlayerRoleEntity } from "types/civil";
import { BaseEntity } from "../base-entity";

export class PlayerRoleModel extends BaseEntity<PlayerRoleEntity> {
  constructor() {
    super("player_roles");
  }
}
