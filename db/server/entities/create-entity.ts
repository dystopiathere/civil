import { QueryBuilder } from "~/helpers";
import { Primitive } from "~/types";

export type PreparedFields<T extends Record<string, any>> = {
  keys: Partial<Record<keyof T, string>>;
  values: Record<string, Primitive | Primitive[]>;
};

export type Relations = {
  hasOne?: ReturnType<createEntity>[];
  hasMany?: ReturnType<createEntity>[];
  belongsTo?: ReturnType<createEntity>[];
  belongsToMany?: ReturnType<createEntity>[];
};

export function createEntity<T extends Record<string, any>, D extends Partial<T>, O extends keyof T>(config: {
  tableName: string;
  fillabelFields: (keyof T)[];
  outputFields: O[];
  relations?: Relations;
}) {
  return class {
    protected readonly tableName: string = config.tableName;
    protected readonly fillableFields: (keyof T)[] = config.fillabelFields;
    protected readonly outputFields: O[] = config.outputFields;
    protected readonly relations: Relations = config?.relations ?? {};

    prepareFields(data?: D): PreparedFields<T> {
      if (!data) {
        return { keys: {}, values: {} };
      }

      const keys: PreparedFields<T>["keys"] = {};
      const values: PreparedFields<T>["values"] = {};

      for (const field of this.fillableFields) {
        if (field in data) {
          const key = `:${String(field)}`;
          keys[field] = key;

          const value = data[field];
          if (value !== null && typeof value === "object" && !Array.isArray(value)) {
            values[key] = JSON.stringify(value);
          } else {
            values[key] = value;
          }
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
      const query = new QueryBuilder<T>();
      query.action = "insert";
      query.table = this.tableName;

      if (data) {
        const { keys, values } = this.prepareFields(data);
        query.values = keys;
        query.params = values;
      }

      return query.send();
    }

    async update(id: number, data: D): Promise<Partial<T>[] | false> {
      const query = new QueryBuilder<T>();
      query.action = "update";
      query.table = this.tableName;

      if (data) {
        const { keys, values } = this.prepareFields(data);
        query.values = keys;
        query.params = values;
      }

      query.criteria = {
        leftParameter: "t.id",
        operator: "=",
        rightParameter: ":id",
      };
      query.setParam(":id", id);

      return query.send();
    }

    async getById(id: number): Promise<Partial<T>[] | false> {
      const query = new QueryBuilder<T>();
      query.action = "select";
      query.table = { name: this.tableName, alias: "t" };
      query.criteria = {
        leftParameter: "t.id",
        operator: "=",
        rightParameter: ":id",
      };
      query.setParam(":id", id);
      return query.send();
    }

    async getAll(): Promise<Partial<T>[] | false> {
      const query = new QueryBuilder<T>();
      query.action = "select";
      query.table = this.tableName;
      return query.send();
    }

    async delete(id: number): Promise<Partial<T>[] | false> {
      const query = new QueryBuilder<T>();
      query.action = "delete";
      query.table = { name: this.tableName, alias: "t" };
      query.criteria = {
        leftParameter: "t.id",
        operator: "=",
        rightParameter: ":id",
      };
      query.setParam(":id", id);

      return query.send();
    }

    async hasRelation<R extends this>(relation: R, localId: number, relatedKey: string): Promise<R[] | false> {
      const query = new QueryBuilder<R>();
      query.action = "select";
      query.table = { name: relation.tableName, alias: "t" };
      query.criteria = {
        leftParameter: `t.${relatedKey}`,
        operator: "=",
        rightParameter: ":id",
      };
      query.setParam(":id", localId);
      return query.send();
    }

    async belongsTo<R extends this>(relation: R, relatedId: number): Promise<R[] | false> {
      const query = new QueryBuilder<R>();
      query.action = "select";
      query.table = { name: relation.tableName, alias: "t" };
      query.criteria = {
        leftParameter: `t.id`,
        operator: "=",
        rightParameter: ":id",
      };
      query.setParam(":id", relatedId);
      return query.send();
    }

    async belongsToMany<R extends this>(
      relation: R,
      junctionTable: string,
      relatedKey: string,
      localKey: string,
      localId: number,
    ): Promise<R[] | false> {
      const query = new QueryBuilder<R>();
      query.action = "select";
      query.table = { name: junctionTable, alias: "jt" };
      query.addJoin({
        table: { name: relation.tableName, alias: "rt" },
        criteria: { leftParameter: "rt.id", operator: "=", rightParameter: `jt.${relatedKey}` },
      });
      query.criteria = {
        leftParameter: `jt.${localKey}`,
        operator: "=",
        rightParameter: ":id",
      };
      query.returning = ["rt.*", "jt.*"];
      query.setParam(":id", localId);
      return query.send();
    }

    async assignManyToMany<R extends this>(
      entity: R,
      junctionTable: string,
      localKey: string,
      localId: number,
      relatedKey: string,
      relatedId: number,
      pivot?: Record<string, any>,
    ): Promise<any[] | false> {
      if (!this.getById(localId) || !entity.getById(relatedId)) {
        return false;
      }

      const query = new QueryBuilder();
      query.action = "insert";
      query.table = { name: junctionTable, alias: "jt" };
      query.values = {
        [localKey]: ":local_id",
        [relatedKey]: ":related_id",
        ...pivot,
      };
      query.params = {
        ":local_id": localId,
        ":related_id": relatedId,
      };
      return query.send();
    }
  };
}
