import { ConnectionEntity } from "civil";
import { IConnection } from "./types";
import { BaseEntity } from "../base-entity";

export class ConnectionModel extends BaseEntity<ConnectionEntity> implements IConnection {
  constructor() {
    super("connections");
  }
}
