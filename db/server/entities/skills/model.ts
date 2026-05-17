import { SkillsEntity } from "types/civil";
import { BaseEntity, CharacterModel, Relations } from "~/entities";

export class SkillsModel extends BaseEntity<SkillsEntity> {
  protected readonly tableName: string = "skills";
  protected readonly relations: Relations = {
    hasMany: [new CharacterModel()],
  };
}
