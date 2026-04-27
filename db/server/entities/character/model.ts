import {
  CharacterEntity,
  CharacterRoleEntity,
  ComponentVariationsEntity,
  FaceFeaturesEntity,
  HeadBlendsEntity,
  HeadOverlaysEntity,
  SkillsEntity,
} from "types/civil";
import { ICharacter } from "./types";
import { BaseEntity } from "../base-entity";

export class CharacterModel extends BaseEntity<CharacterEntity> implements ICharacter {
  constructor() {
    super("characters");
  }

  async getHeadBlends(id: number): Promise<HeadBlendsEntity | null> {
    const sql = `SELECT hb.*
                 FROM characters c
                          JOIN head_blends hb ON hb.id = c.head_blends_id
                 WHERE c.id = $1`;

    const client = await this.pool.connect();

    const result = await client.query<HeadBlendsEntity>(sql, [id]);

    return result.rows[0] ?? null;
  }

  async getFaceFeatures(id: number): Promise<FaceFeaturesEntity | null> {
    const sql = `SELECT ff.*
                 FROM characters c
                          JOIN face_features ff ON ff.id = c.face_features_id
                 WHERE c.id = $1`;

    const client = await this.pool.connect();

    const result = await client.query<FaceFeaturesEntity>(sql, [id]);

    return result.rows[0] ?? null;
  }

  async getSkills(id: number): Promise<SkillsEntity | null> {
    const sql = `SELECT s.*
                 FROM characters c
                          JOIN skills s ON s.id = c.skills_id
                 WHERE c.id = $1`;

    const client = await this.pool.connect();

    const result = await client.query<SkillsEntity>(sql, [id]);

    return result.rows[0] ?? null;
  }

  async getComponentVariations(id: number): Promise<ComponentVariationsEntity | null> {
    const sql = `SELECT cv.*
                 FROM characters c
                          JOIN component_variations cv ON cv.id = c.component_variations_id
                 WHERE c.id = $1`;

    const client = await this.pool.connect();

    const result = await client.query<ComponentVariationsEntity>(sql, [id]);

    return result.rows[0] ?? null;
  }

  async getHeadOverlays(id: number): Promise<HeadOverlaysEntity | null> {
    const sql = `SELECT ho.*
                 FROM characters c
                          JOIN head_overlays ho ON ho.id = c.head_overlays_id
                 WHERE c.id = $1`;

    const client = await this.pool.connect();

    const result = await client.query<HeadOverlaysEntity>(sql, [id]);

    return result.rows[0] ?? null;
  }

  async getRoles(id: number): Promise<CharacterRoleEntity[]> {
    const sql = `SELECT cr.*
                 FROM characters c
                          JOIN characters_character_roles ccr ON ccr.character_id = c.id
                          JOIN character_roles cr ON cr.id = ccr.character_role_id
                 WHERE c.id = $1`;

    const client = await this.pool.connect();

    const result = await client.query<CharacterRoleEntity>(sql, [id]);

    return result.rows;
  }

  async assignToPlayer(id: number, playerId: number): Promise<boolean> {
    const sql = `INSERT INTO players_characters (player_id, character_id, active)
                 VALUES ($1, $2, true)
                 RETURNING *`;

    const client = await this.pool.connect();

    const result = await client.query(sql, [playerId, id]);

    return !!result.rows.length;
  }
}
