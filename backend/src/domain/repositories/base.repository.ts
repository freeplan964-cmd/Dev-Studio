export interface IRepository<TSelect, TInsert> {
  findById(id: string): Promise<TSelect | null>;
  findAll(filter?: any): Promise<TSelect[]>;
  findByUserId(userId: string): Promise<TSelect[]>;
  findByUserAndId(userId: string, id: string): Promise<TSelect[]>;
  findByField(field: string, value: unknown): Promise<TSelect[]>;
  create(data: TInsert): Promise<TSelect>;
  createMany(data: TInsert[]): Promise<TSelect[]>;
  update(id: string, data: Partial<TInsert>): Promise<TSelect>;
  updateMany(filter: any, data: Partial<TInsert>): Promise<TSelect[]>;
  delete(id: string): Promise<boolean>;
  deleteMany(filter: any): Promise<boolean>;
  /** Delete by primary key with ownership check in a single query. */
  deleteByUserAndId(userId: string, id: string): Promise<boolean>;
}

