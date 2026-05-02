import { Client, QueryResult, QueryResultRow } from "pg";
import {
  Action,
  CriterionData,
  FieldData,
  isUnionCriteriaData,
  JoinData,
  Primitive,
  TableData,
  UnionType,
} from "~/types";

function GetConvar(name: string, defaultValue: string) {
  return defaultValue;
}

function GetConvarInt(name: string, defaultValue: number) {
  return defaultValue;
}

export class QueryBuilder<R extends QueryResultRow = any> {
  static preparedStatements: Record<string, string> = {};

  private readonly client: Client;

  private _queryString: string = "";
  private paramsMapping: Record<string, number> = {};
  private tables: string[] = [];
  private aliases: string[] = [];

  private _action: Action = "select";
  private _table: TableData = { name: "" };
  private _fields: FieldData[] = [];
  private _joins: JoinData[] = [];
  private _criteria: CriterionData | undefined;
  private _params: Record<string, Primitive> = {};
  private _values: Partial<Record<keyof R, Primitive>> = {};
  private _returning: string | string[] = "*";

  constructor() {
    this.client = new Client({
      host: GetConvar("db_host", "127.0.0.1"),
      port: GetConvarInt("db_port", 5432),
      user: GetConvar("db_user", ""),
      password: GetConvar("db_password", ""),
      database: GetConvar("db_name", ""),
    });
  }

  get queryString() {
    return this._queryString;
  }

  set action(value: Action) {
    this._action = value;
  }
  get action(): Action {
    return this._action;
  }

  set table(value: string | TableData) {
    if (typeof value === "string") {
      this._table = { name: value };

      this.tables.push(value);
      return;
    }

    this._table = value;

    this.tables.push(value.name);

    if (value.alias) {
      this.aliases.push(value.alias);
    }
  }
  get table(): TableData {
    return this._table;
  }

  set fields(value: FieldData[]) {
    this._fields = value;
  }
  get fields(): FieldData[] {
    return this._fields;
  }
  addField(field: FieldData) {
    this._fields.push(field);
  }

  set joins(value: JoinData[]) {
    this._joins = value;

    value.forEach(({ table }) => {
      this.tables.push(table.name);

      if (table.alias) {
        this.aliases.push(table.alias);
      }
    });
  }
  get joins(): JoinData[] {
    return this._joins;
  }
  addJoin(join: JoinData) {
    this._joins.push(join);

    this.tables.push(join.table.name);
    if (join.table.alias) {
      this.aliases.push(join.table.alias);
    }
  }

  set criteria(value: CriterionData) {
    this._criteria = value;
  }
  get criteria(): CriterionData | undefined {
    return this._criteria;
  }

  set params(value: Record<string, Primitive>) {
    this._params = value;
  }
  get params(): Record<string, Primitive> {
    return this._params;
  }
  setParam(key: string, value: Primitive) {
    this._params[key] = value;
  }

  set values(value: Partial<Record<keyof R, Primitive>>) {
    this._values = value;
  }
  get values(): Partial<Record<keyof R, Primitive>> {
    return this._values;
  }
  setValue(key: keyof R, value: Primitive) {
    this._values[key] = value;
  }

  set returning(value: string | string[]) {
    this._returning = value;
  }
  get returning(): string | string[] {
    return this._returning;
  }

  beginTransaction() {
    return this.client.query("begin");
  }

  commit() {
    return this.client.query("commit");
  }

  rollback() {
    return this.client.query("rollback");
  }

  savePoint() {
    return this.client.query("savepoint");
  }

  private buildFields() {
    if (!this.fields.length) {
      this._queryString += ` *`;
      return;
    }

    const mappedFields = this.fields.map(({ name, alias }) => {
      let field = `${name}`;

      if (alias) {
        field += ` as ${alias}`;
      }

      return field;
    });

    this._queryString += ` ${mappedFields.join(", ")}`;
  }

  private buildQueryString() {
    if (!this.table) {
      return;
    }

    switch (this.action) {
      case "insert":
        this.buildInsertQueryString();
        break;
      case "update":
        break;
      case "delete":
        break;
      default:
        this.buildSelectQueryString();
        break;
    }
  }

  private buildSelectQueryString() {
    this._queryString += "select";
    this.buildFields();
    this._queryString += " from";
    this.buildTableName(this.table);
    this.buildJoins();
    this.buildWhere();
  }

  private buildInsertQueryString() {
    if (!Object.keys(this.values).length) {
      this._queryString += "insert into";
      this.buildTableName(this.table);
      this._queryString += " default values";
      this.buildReturning();
      return;
    }

    this._queryString = `insert into`;
    this.buildTableName(this.table);
    this.buildValues();
  }

  private buildValues() {
    const keys = Object.keys(this.values);
    const values = Object.values(this.values).map(this.prepareValue);

    console.log(keys, values);

    const placeholders = keys.map((_, key) => `$${key + 1}`);
  }

  private buildTableName({ name, alias }: TableData) {
    if (!name) {
      throw new Error("Table name is required");
    }

    this._queryString += ` ${name}`;

    if (alias) {
      this._queryString += ` as ${alias}`;
    }
  }

  private buildReturning() {
    if (Array.isArray(this.returning)) {
      this._queryString += ` returning ${this.returning.join(", ")}`;
      return;
    }

    this._queryString += ` returning ${this.returning}`;
  }

  private getValueType(value: Primitive | Primitive[]) {
    if (!value) {
      return;
    }

    switch (typeof value) {
      case "string":
        if (!isNaN(Date.parse(value))) {
          return "timestamp";
        }

        return "text";
      case "number":
        if (Number.isInteger(value)) {
          return "int";
        }

        return "numeric";
      case "symbol":
        return "char";
      default:
        return typeof value;
    }
  }

  private prepareValue(value: Primitive) {
    if (!value) {
      return value;
    }

    let fixedValue = value;
    let result = String(value);
    const valueType = this.getValueType(value);

    if (result.startsWith(":")) {
      if (!(result in this.paramsMapping)) {
        this.paramsMapping[result] = Object.keys(this.paramsMapping).length + 1;
      }

      result = "$" + this.paramsMapping[result];

      return result;
    }

    if (valueType) {
      if (valueType === "char") {
        result = (value as Symbol).description ?? "";
        fixedValue = result;
      }

      if (!result) {
        throw new Error("failed to get criterion value");
      }

      const tableOrAlias = fixedValue.toString().split(".")[0];
      const detectType = tableOrAlias && !this.aliases.includes(tableOrAlias) && !this.tables.includes(tableOrAlias);

      if (detectType) {
        if (["char", "text", "timestamp"].includes(valueType)) {
          result = `'${result}'`;
        }

        result += `::${valueType}`;
      }
    }

    return result;
  }

  private buildCriterion(criterion: CriterionData, unionType?: UnionType, key?: number) {
    if (isUnionCriteriaData(criterion)) {
      return;
    }

    const { leftParameter, operator, rightParameter } = criterion;

    if (unionType && key !== 0) {
      this._queryString += ` ${unionType}`;
    }
    this._queryString += ` ${leftParameter} ${operator}`;

    switch (operator) {
      case "is null":
      case "is not null":
        break;
      case "in":
      case "not in":
        if (!rightParameter || !Array.isArray(rightParameter)) {
          throw new Error("Right parameter is required to be an array");
        }

        const preparedRightParameter = rightParameter.map((parameter) => this.prepareValue(parameter)).join(", ");

        this._queryString += ` (${preparedRightParameter})`;
        break;
      default:
        if (!rightParameter) {
          throw new Error("Right parameter is required");
        }

        if (Array.isArray(rightParameter)) {
          throw new Error("Right parameter must be a primitive");
        }

        this._queryString += ` ${this.prepareValue(rightParameter)}`;
        break;
    }
  }

  private buildCriteria(criterion: CriterionData, topUnionType?: UnionType, topKey?: number) {
    if (!isUnionCriteriaData(criterion)) {
      this.buildCriterion(criterion, topUnionType, topKey);
      return;
    }

    const { criteria, unionType } = criterion;

    if (topKey && topKey !== 0) {
      this._queryString += ` ${topUnionType}`;
    }

    this._queryString += " (";
    criteria.forEach((criterion, key) => {
      this.buildCriteria(criterion, unionType, key);
    });
    this._queryString += " )";
  }

  private buildJoins() {
    if (!this.joins.length) {
      return;
    }

    this.joins.forEach(({ type, table, criteria }) => {
      if (type) {
        this._queryString += ` ${type}`;
      }
      this._queryString += " join";
      this.buildTableName(table);
      this._queryString += " on";
      this.buildCriteria(criteria);
    });
  }

  private buildWhere() {
    if (!this.criteria) {
      return;
    }

    this._queryString += " where";
    this.buildCriteria(this.criteria);
  }

  prepare(name: string) {
    if (!this._queryString) {
      this.buildQueryString();
    }

    QueryBuilder.preparedStatements[name] = this._queryString;
  }

  deallocate(name: string) {
    if (!(name in QueryBuilder.preparedStatements)) {
      return;
    }

    delete QueryBuilder.preparedStatements[name];
    return this.client.query(`deallocate ${name}`);
  }

  deallocateAll() {
    QueryBuilder.preparedStatements = {};
    return this.client.query("deallocate all");
  }

  private queryCallback(error: Error, result: QueryResult<R>) {
    if (error) {
      throw error;
    }

    return result;
  }

  private prepareParams(text: string) {
    const values: string[] = [];

    Object.entries(this.paramsMapping).forEach(([param, id]) => {
      if (!this.params[param]) {
        throw new Error(param + " value not provided");
      }

      const value = this.prepareValue(this.params[param]);
      const paramType = this.getValueType(this.params[param]);

      if (paramType) {
        text = text.replaceAll("$" + id, "$" + `${id}::${paramType})`);
      }

      values[id] = String(value);
    });

    return values.filter((value) => value);
  }

  send(name?: string) {
    return new Promise((resolve, reject) => {
      try {
        let text: string;

        if (name) {
          if (!(name in QueryBuilder.preparedStatements)) {
            reject("Named query must be prepared first");
          }

          text = QueryBuilder.preparedStatements[name];
        } else {
          this.buildQueryString();

          text = this.queryString;
        }

        if (!Object.keys(this.params).length) {
          resolve(text);

          this.client.query<R>(text, (error, result) => {
            resolve(this.queryCallback(error, result));
          });
          return;
        }

        const values = this.prepareParams(text);

        resolve([name, text, values]);

        this.client.query<R, string[]>({ name, text, values }, (error, result) => {
          resolve(this.queryCallback(error, result));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  connect() {
    return this.client.connect();
  }

  end() {
    return this.client.end();
  }
}
