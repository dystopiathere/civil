export interface IBaseEntity<T extends Record<string, any> = Record<string, any>, D extends Partial<T> = Partial<T>> {
  readonly tableName: string;
  readonly fillableFields: (keyof T)[];
  readonly outputFields: (keyof T)[];
  readonly relations: Relations;

  prepareFields(data?: D): { keys: (keyof D)[]; values: D[keyof D][] };

  prepareOutput(data: T): Partial<T>;

  query(sql: (keys: (keyof D)[]) => string, data?: D, id?: number): Promise<Partial<T>[] | false>;

  create(data?: D): Promise<Partial<T>[] | false>;

  update(id: number, data: D): Promise<Partial<T>[] | false>;

  getById(id: number): Promise<Partial<T>[] | false>;

  getAll(): Promise<Partial<T>[] | false>;

  delete(id: number): Promise<Partial<T>[] | false>;

  hasRelation(relation: IBaseEntity, localId: number, relatedKey: string): ReturnType<IBaseEntity["query"]>;

  belongsToRelation(
    relation: IBaseEntity,
    relatedId: number,
    junctionTable?: string,
    relatedKey?: string,
    localKey?: string,
    localId?: number,
  ): ReturnType<IBaseEntity["query"]>;

  assignManyToMany(
    entity: IBaseEntity,
    junctionTable: string,
    localKey: string,
    localId: number,
    relatedKey: string,
    relatedId: number,
    pivot?: Record<string, any>,
  ): Promise<boolean>;
}

export type Relations = {
  belongsTo?: IBaseEntity[];
  belongsToMany?: IBaseEntity[];
  hasOne?: IBaseEntity[];
  hasMany?: IBaseEntity[];
};
