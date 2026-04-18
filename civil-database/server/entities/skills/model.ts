import { SkillsEntity } from "types/civil";
import { ISkills } from "./types";
import { BaseEntity } from "../base-entity";

export class SkillsModel extends BaseEntity<SkillsEntity> implements ISkills {
  constructor() {
    super("skills");
  }
}
