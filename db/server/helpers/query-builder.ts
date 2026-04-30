import { Client, CustomTypesConfig, QueryConfigValues, QueryResultRow } from "pg";
import { Action, CriterionData, FieldData, isUnionCriteriaData, JoinData, TableData, UnionType } from "~/types";

export class QueryBuilder {
  static preparedStatements: Record<string, string> = {};

  private readonly client: Client;

  private _queryString: string = "";
  private paramsCounter: number = 0;

  private _action: Action = "select";
  private _table: TableData = { name: "" };
  private _fields: FieldData[] = [];
  private _joins: JoinData[] = [];
  private _criteria: CriterionData[] = [];
  private _params: Record<string, any> = {};
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
      return;
    }

    this._table = value;
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
  }
  get joins(): JoinData[] {
    return this._joins;
  }
  addJoin(join: JoinData) {
    this._joins.push(join);
  }

  set criteria(value: CriterionData[]) {
    this._criteria = value;
  }
  get criteria(): CriterionData[] {
    return this._criteria;
  }
  addCriterion(criterion: CriterionData) {
    this._criteria.push(criterion);
  }

  set params(value: Record<string, any>) {
    this._params = value;
  }
  get params(): Record<string, any> {
    return this._params;
  }
  addParam(key: string, value: any) {
    this._params[key] = value;
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

  private buildQueryString<I = any[]>(values?: QueryConfigValues<I>) {
    if (!this.table) {
      return;
    }

    switch (this.action) {
      case "insert":
        this.buildInsertQueryString(values);
        break;
      case "update":
        break;
      case "delete":
        break;
      default:
        this.buildSelectQueryString(values);
        break;
    }
  }

  private buildFields() {
    if (!this.fields.length) {
      this._queryString += ` *`;
      return;
    }

    this.fields.forEach(({ name, alias }) => {
      this._queryString += ` ${name}`;

      if (alias) {
        this._queryString += ` as ${alias}`;
      }
    });
  }

  private buildSelectQueryString<I = any[]>(values?: QueryConfigValues<I>) {
    this._queryString += "select";
    this.buildFields();
    this._queryString += " from";
    this.buildTableName(this.table);
    this.buildJoins();
  }

  private buildInsertQueryString<I = any[]>(values?: QueryConfigValues<I>) {
    if (!Object.keys(this.params).length) {
      this._queryString += "insert into";
      this.buildTableName(this.table);
      this._queryString += " default values";
      this.buildReturning();
      return;
    }

    this._queryString = `insert into`;
    this.buildTableName(this.table);

    const keys = Object.keys(this.params);
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
      case "in":
      case "not in":
        this._queryString += ` (${rightParameter})`;
        break;
      default:
        this._queryString += ` ${rightParameter}`;
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
    if (!this.criteria.length) {
      return;
    }
  }

  prepare(name: string) {
    if (!this._queryString) {
      this.buildQueryString();
    }

    if (!this._queryString) {
      throw new Error("Query string not formed");
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
    return this.client.query("deallocate all");
  }

  send<R extends QueryResultRow = any, I = any[]>(values?: QueryConfigValues<I>) {
    this.buildQueryString(values);

    if (!this._queryString) {
      throw new Error("Query string not formed");
    }

    if (values) {
      return this.client.query<R, I>(this._queryString, values, () => {});
    }

    return this.client.query<R>(this._queryString);
  }

  sendNamed<R extends QueryResultRow = any, I = any[]>(
    name: string,
    values?: QueryConfigValues<I>,
    types?: CustomTypesConfig,
  ) {
    if (!(name in QueryBuilder.preparedStatements)) {
      this.prepare(name);
    }

    const text = QueryBuilder.preparedStatements[name];

    return this.client.query<R, I>({ name, text, values, types }, (error, result) => {});
  }

  connect() {
    return this.client.connect();
  }

  end() {
    return this.client.end();
  }
}
