import { HeadBlendsEntity } from "types/civil";
import { IHeadBlends } from "./types";
import { BaseEntity } from "../base-entity";

export class HeadBlendsModel extends BaseEntity<HeadBlendsEntity> implements IHeadBlends {
  constructor() {
    super("head_blends");
  }
}
