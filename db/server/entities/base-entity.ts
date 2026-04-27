import { Pool } from "pg";
import { IBaseEntity } from "./types";

export class BaseEntity<T extends object> implements IBaseEntity<T> {
  protected readonly pool: Pool;

  constructor(private readonly tableName: string) {
    this.pool = new Pool({
      host: GetConvar("db_host", "127.0.0.1"),
      port: GetConvarInt("db_port", 5432),
      user: GetConvar("db_user", ""),
      password: GetConvar("db_password", ""),
      database: GetConvar("db_name", ""),
    });
  }

  async create<D extends object = T>(data?: Partial<D>): Promise<T | false> {
    let sql: string;

    if (data) {
      const keys = Object.keys(data).join(",");
      const valuesPlaceholders = Array.from({ length: Object.values(data).length }, (_, key) => `$${key + 1}`);
      sql = `INSERT INTO ${this.tableName} (${keys})
             VALUES (${valuesPlaceholders})
             RETURNING *`;
    } else {
      sql = `INSERT INTO ${this.tableName} DEFAULT
             VALUES
             RETURNING *`;
    }

    const client = await this.pool.connect();

    const result = await client.query<T>(sql, data ? Object.values(data) : []);

    client.release();

    return result.rows[0] ?? false;
  }

  async update<D extends object = T>(id: number, data: Partial<D>): Promise<T | false> {
    const dataset = Object.keys(data)
      .map((field, key) => {
        return `${field} = $${key + 2}`;
      })
      .join(",");

    const sql = `UPDATE ${this.tableName}
                 SET ${dataset}
                 WHERE id = $1
                 RETURNING *`;

    const client = await this.pool.connect();

    const result = await client.query<T & { updated_at?: string }>(sql, [id, ...Object.values(data)]);

    if (result.rows?.length && result.rows[0].updated_at) {
      const updSql = `UPDATE ${this.tableName}
                      SET updated_at = NOW()`;

      await client.query<T>(updSql);
    }

    client.release();

    return result.rows[0] ?? false;
  }

  async getById(id: number, relations?: string[]): Promise<T | null> {
    const sql = `SELECT *
                 FROM ${this.tableName}
                 WHERE id = $1`;

    const client = await this.pool.connect();

    const result = await client.query<T>(sql, [id]);

    client.release();

    return result.rows[0] ?? null;
  }

  async getAll(): Promise<T[]> {
    const sql = `SELECT *
                 FROM ${this.tableName}`;

    const client = await this.pool.connect();

    const result = await client.query<T>(sql);

    client.release();

    return result.rows;
  }

  async delete(id: number): Promise<T | false> {
    const sql = `DELETE
                 FROM ${this.tableName}
                 WHERE id = $1
                 RETURNING *`;

    const client = await this.pool.connect();

    const result = await client.query<T>(sql, [id]);

    client.release();

    return result.rows[0] ?? false;
  }
}
