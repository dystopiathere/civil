import { ComponentVariationsEntity } from "civil";
import { IComponentVariations } from "./types";
import { BaseEntity } from "../base-entity";

export class ComponentVariationsModel extends BaseEntity<ComponentVariationsEntity> implements IComponentVariations {
  constructor() {
    super("component_variations");
  }
}
