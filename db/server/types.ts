export type Primitive = string | symbol | number | bigint | boolean | null | undefined;

export type Deferrals = {
  defer(): void;

  update(message: string): void;

  presentCard(card: object | string, cb?: (data: object, rawData: string) => void): void;

  done(failureReason?: string): void;
};

export type Identifiers = {
  steam: string;
  license: string;
  discord: string;
};

export type Action = "select" | "update" | "insert" | "delete";

export type TableData = {
  name: string;
  alias?: string;
};

export type FieldData = {
  name: string;
  alias?: string;
};

export type Operator = "=" | "!=" | "in" | "not in" | "like" | "not like" | "is null" | "is not null";

export type CriterionData =
  | {
      leftParameter: string;
      operator: Operator;
      rightParameter?: Primitive | Primitive[];
    }
  | UnionCriteriaData;

export type UnionType = "and" | "or";

export type UnionCriteriaData = {
  unionType: UnionType;
  criteria: CriterionData[];
};

export function isUnionCriteriaData(value: any): value is UnionCriteriaData {
  return value && value.unionType;
}

export type JoinType = "left" | "right" | "inner" | "outer";

export type JoinData = {
  type?: JoinType;
  table: TableData;
  criteria: CriterionData;
};
