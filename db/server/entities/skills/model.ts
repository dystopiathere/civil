import { SkillsEntity } from "types/civil";
import { BaseEntity } from "../base-entity";

export class SkillsModel extends BaseEntity<SkillsEntity> {
  constructor() {
    super("skills");
  }
}
