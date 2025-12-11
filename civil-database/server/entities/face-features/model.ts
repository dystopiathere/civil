import { FaceFeaturesEntity } from "civil";
import { IFaceFeatures } from "./types";
import { BaseEntity } from "../base-entity";

export class FaceFeaturesModel extends BaseEntity<FaceFeaturesEntity> implements IFaceFeatures {
  constructor() {
    super("face_features");
  }
}
