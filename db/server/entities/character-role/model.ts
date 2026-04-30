import { CharacterRoleEntity } from "types/civil";
import { BaseEntity } from "~/entities";

export class CharacterRoleModel extends BaseEntity<CharacterRoleEntity> {
  readonly tableName: string = "character_roles";

  readonly fillableFields: (keyof CharacterRoleEntity)[] = ["name"];

  readonly outputFields: (keyof CharacterRoleEntity)[] = ["id", "name"];
}
