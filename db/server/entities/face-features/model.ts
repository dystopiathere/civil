import { FaceFeaturesEntity } from "types/civil";
import { BaseEntity, Relations, CharacterModel } from "~/entities";

export class FaceFeaturesModel extends BaseEntity<FaceFeaturesEntity> {
  protected readonly tableName: string = "face_features";
  protected readonly relations: Relations = {
    hasMany: [new CharacterModel()],
  };
}
