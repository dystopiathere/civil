import { PlayerRoleEntity } from "civil";
import { IPlayerRole } from "./types";
import { BaseEntity } from "../base-entity";

export class PlayerRoleModel extends BaseEntity<PlayerRoleEntity> implements IPlayerRole {
  constructor() {
    super("player_roles");
  }
}
