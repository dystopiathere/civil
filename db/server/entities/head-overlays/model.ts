import { HeadOverlaysEntity } from "types/civil";
import { IHeadOverlays } from "./types";
import { BaseEntity } from "../base-entity";

export class HeadOverlaysModel extends BaseEntity<HeadOverlaysEntity> implements IHeadOverlays {
  constructor() {
    super("head_overlays");
  }
}
