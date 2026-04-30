import { HeadBlendsEntity } from "types/civil";
import { BaseEntity } from "~/entities";

export class HeadBlendsModel extends BaseEntity<HeadBlendsEntity> {
  constructor() {
    super("head_blends");
  }
}
