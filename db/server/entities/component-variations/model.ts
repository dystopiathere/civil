import { ComponentVariationsEntity } from "types/civil";
import { BaseEntity } from "../base-entity";

export class ComponentVariationsModel extends BaseEntity<ComponentVariationsEntity> {
  constructor() {
    super("component_variations");
  }
}
