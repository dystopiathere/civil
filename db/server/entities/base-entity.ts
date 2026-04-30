import { QueryBuilder } from "~/helpers";
import { IBaseEntity, Relations } from "./types";

export class BaseEntity<T extends Record<string, any> = Record<string, any>, D extends Partial<T> = Partial<T>> {
  readonly tableName: string = "";
  readonly fillableFields: (keyof T)[] = [];
  readonly outputFields: (keyof T)[] = [];
  readonly relations: Relations = {
    hasOne: [],
    hasMany: [],
    belongsTo: [],
    belongsToMany: [],
  };
  prepareFields(data?: D): { keys: (keyof D)[]; values: D[keyof D][] } {
    if (!data) {
      return { keys: [], values: [] };
    }
    const keys: (keyof D)[] = [];
    const values: D[keyof D][] = [];
    for (const field of this.fillableFields) {
      if (field in data) {
        keys.push(field);
        values.push(data[field]);
      }
    }
    return { keys, values };
  }
  prepareOutput(data: T): Partial<T> {
    const preparedData: Partial<T> = {};
    for (const field of this.outputFields) {
      if (field in data) {
        preparedData[field] = data[field];
      }
    }
    return preparedData;
  }
  async create(data?: D): Promise<Partial<T>[] | false> {
    const query = new QueryBuilder();
    query.action = "insert";
    query.table = this.tableName;
    if (data) {
      const sql = (keys: (keyof D)[]) => {
        const valuesPlaceholders = Array.from({ length: keys.length }, (_, key) => `$${key + 1}`);
        return `INSERT INTO ${this.tableName} (${keys?.join(",")})
            VALUES (${valuesPlaceholders.join(",")})
            RETURNING *`;
      };
      return this.query(sql, data);
    }
    const sql = (_: (keyof D)[]) => {
      return `INSERT INTO ${this.tableName} DEFAULT VALUES
            RETURNING *`;
    };
    return this.query(sql);
  }
  async update(id: number, data: D): Promise<Partial<T>[] | false> {
    const sql = (keys: (keyof D)[]) => {
      const dataset = keys
        .map((field, key) => {
          return `${String(field)} = $${key + 2}`;
        })
        .join(",");
      return `UPDATE ${this.tableName} SET ${dataset}
            WHERE id = $1
            RETURNING *`;
    };
    return this.query(sql, data, id);
  }
  async getById(id: number): Promise<Partial<T>[] | false> {
    const sql = (_: (keyof D)[]) => {
      return `SELECT * FROM ${this.tableName}
            WHERE id = $1`;
    };
    return this.query(sql, undefined, id);
  }
  async getAll(): Promise<Partial<T>[] | false> {
    const sql = (_: (keyof D)[]) => {
      return `SELECT * FROM ${this.tableName}`;
    };
    return this.query(sql);
  }
  async delete(id: number): Promise<Partial<T>[] | false> {
    const sql = (_: (keyof D)[]) => {
      return `DELETE FROM ${this.tableName}
            WHERE id = $1
            RETURNING *`;
    };
    return this.query(sql, undefined, id);
  }
  async hasRelation(relation: IBaseEntity, localId: number, relatedKey: string): ReturnType<IBaseEntity["query"]> {
    const sql = (_: (keyof D)[]) => {
      return `SELECT * FROM ${relation.tableName} WHERE ${relatedKey} = $1`;
    };
    return relation.query(sql, undefined, localId);
  }
  async belongsTo<R extends IBaseEntity = IBaseEntity>(relation: R, relatedId: number): ReturnType<R["query"]> {
    const sql = (_: (keyof D)[]) => {
      return `SELECT * FROM ${relation.tableName} WHERE id = $1`;
    };
    return relation.query(sql, undefined, relatedId);
  }
  async belongsToMany(
    relation: IBaseEntity,
    junctionTable: string,
    relatedKey: string,
    localKey: string,
    localId: number,
  ): ReturnType<IBaseEntity["query"]> {
    const sql = (_: (keyof D)[]) => {
      return `SELECT rt.* as relation, jt.* as pivot FROM ${junctionTable} jt
              JOIN ${relation.tableName} rt ON rt.id = jt.${relatedKey}
              WHERE jt.${localKey} = $1`;
    };
    return relation.query(sql, undefined, localId!);
  }
  async assignManyToMany(
    entity: IBaseEntity,
    junctionTable: string,
    localKey: string,
    localId: number,
    relatedKey: string,
    relatedId: number,
    pivot?: Record<string, any>,
  ): Promise<boolean> {
    if (!this.getById(localId) || !entity.getById(relatedId)) {
      return false;
    }
    const data = {
      [localKey]: localId,
      [relatedKey]: relatedId,
      ...pivot,
    };
    const valuesPlaceholders = Array.from({ length: Object.values(data).length }, (_, key) => `$${key + 1}`);
    const sql = `INSERT INTO ${junctionTable} (${Object.keys(data).join(",")})
                 VALUES (${valuesPlaceholders.join(",")})
                 RETURNING *`;
    const client = await this.pool.connect();
    const result = await client.query(sql);
    client.release();
    return !!result.rows.length;
  }
}
