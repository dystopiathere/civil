import { ConnectionEntity } from "types/civil";
import { BaseEntity } from "../base-entity";

export class ConnectionModel extends BaseEntity<ConnectionEntity> {
  constructor() {
    super("connections");
  }
}
