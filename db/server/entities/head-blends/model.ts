import { HeadBlendsEntity } from "types/civil";
import { BaseEntity, CharacterModel, Relations } from "~/entities";

export class HeadBlendsModel extends BaseEntity<HeadBlendsEntity> {
  protected readonly tableName: string = "head_blends";
  protected readonly relations: Relations = {
    hasMany: [new CharacterModel()],
  };
}
