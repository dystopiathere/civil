import { HeadOverlaysEntity } from "types/civil";
import { BaseEntity, CharacterModel, Relations } from "~/entities";

export class HeadOverlaysModel extends BaseEntity<HeadOverlaysEntity> {
  protected readonly tableName: string = "head_overlays";
  protected readonly relations: Relations = {
    hasMany: [new CharacterModel()],
  };
}
