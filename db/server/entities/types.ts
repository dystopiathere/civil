export interface IBaseEntity<T extends object> {
  create<D extends object = T>(data?: Partial<D>): Promise<T | false>;

  update<D extends object = T>(id: number, data: Partial<D>): Promise<T | false>;

  getById(id: number, relations?: string[]): Promise<T | null>;

  getAll(): Promise<T[]>;

  delete(id: number): Promise<T | false>;
}
