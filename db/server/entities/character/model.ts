import { CharacterEntity } from "types/civil";
import {
  BaseEntity,
  ComponentVariationsModel,
  FaceFeaturesModel,
  HeadBlendsModel,
  HeadOverlaysModel,
  SkillsModel,
} from "~/entities";

export class CharacterModel extends BaseEntity<CharacterEntity> {
  readonly tableName: string = "characters";
  readonly relations = {
    belongsTo: [
      new HeadBlendsModel(),
      new FaceFeaturesModel(),
      new SkillsModel(),
      new ComponentVariationsModel(),
      new HeadOverlaysModel(),
    ],
    belongsToMany: [],
    hasOne: [],
    hasMany: [],
  };

  readonly fillableFields: (keyof CharacterEntity)[] = [
    "firstname",
    "lastname",
    "age",
    "sex",
    "health",
    "max_health",
    "armour",
    "max_armour",
    "eye_color",
    "hair_first_color",
    "last_position",
    "model",
    "knockdown",
    "active",
  ];

  readonly outputFields: (keyof CharacterEntity)[] = [
    "id",
    "firstname",
    "lastname",
    "age",
    "sex",
    "health",
    "max_health",
    "armour",
    "max_armour",
    "eye_color",
    "hair_first_color",
    "last_position",
    "model",
    "knockdown",
    "active",
    "created_at",
    "updated_at",
  ];
}
