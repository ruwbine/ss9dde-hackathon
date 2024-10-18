export interface IRepository<T> {
  findAll(): Promise<T[] | null>;
  findOne(id: string): Promise<T | null>;
  create(data: T): Promise<T>;
  remove(id: string): Promise<void>;
  update(id: string, data: Partial<T>): Promise<T>;
  findByParams(params: Partial<T>): Promise<T[] | null>
  findOneByParams(params: Partial<T>): Promise<T | null>;
}
