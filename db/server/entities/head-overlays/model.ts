import { HeadOverlaysEntity } from "types/civil";
import { BaseEntity } from "../base-entity";

export class HeadOverlaysModel extends BaseEntity<HeadOverlaysEntity> {
  constructor() {
    super("head_overlays");
  }
}
