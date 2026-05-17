import { ComponentVariationsEntity } from "types/civil";
import { BaseEntity, CharacterModel, Relations } from "~/entities";

export class ComponentVariationsModel extends BaseEntity<ComponentVariationsEntity> {
  protected readonly tableName: string = "component_variations";
  protected readonly relations: Relations = {
    hasMany: [new CharacterModel()],
  };
}
