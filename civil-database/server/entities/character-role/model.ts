import { CharacterRoleEntity } from "civil";
import { ICharacterRole } from "./types";
import { BaseEntity } from "../base-entity";

export class CharacterRoleModel extends BaseEntity<CharacterRoleEntity> implements ICharacterRole {
  constructor() {
    super("character_roles");
  }
}
