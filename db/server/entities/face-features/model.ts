import { FaceFeaturesEntity } from "types/civil";
import { BaseEntity } from "../base-entity";

export class FaceFeaturesModel extends BaseEntity<FaceFeaturesEntity> {
  constructor() {
    super("face_features");
  }
}
