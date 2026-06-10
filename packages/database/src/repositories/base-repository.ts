import { DELETED_AT_FIELD, TENANT_ID_FIELD } from "../constants/db-errors";
import {
  applyFilters,
  buildSoftDeleteFilter,
  paginate,
  softDeleteData,
  type FilterDefinition,
  type PaginatedResult,
  type PaginationOptions,
} from "../utils";

export type RepositoryDelegate<TEntity, TCreateInput, TUpdateInput, TWhereInput> = {
  findUnique: (args: { where: Record<string, unknown> }) => Promise<TEntity | null>;
  findMany: (args: {
    where?: TWhereInput;
    skip?: number;
    take?: number;
    orderBy?: unknown;
  }) => Promise<TEntity[]>;
  count: (args: { where?: TWhereInput }) => Promise<number>;
  create: (args: { data: TCreateInput }) => Promise<TEntity>;
  update: (args: { where: Record<string, unknown>; data: TUpdateInput }) => Promise<TEntity>;
  delete: (args: { where: Record<string, unknown> }) => Promise<TEntity>;
};

export type BaseRepositoryOptions = {
  idField?: string;
  includeDeleted?: boolean;
};

export abstract class BaseRepository<
  TEntity,
  TCreateInput extends Record<string, unknown>,
  TUpdateInput extends Record<string, unknown>,
  TWhereInput extends Record<string, unknown> = Record<string, unknown>,
> {
  protected readonly idField: string;
  protected readonly includeDeleted: boolean;

  constructor(
    protected readonly delegate: RepositoryDelegate<
      TEntity,
      TCreateInput,
      TUpdateInput,
      TWhereInput
    >,
    options: BaseRepositoryOptions = {},
  ) {
    this.idField = options.idField ?? "id";
    this.includeDeleted = options.includeDeleted ?? false;
  }

  findById(id: string): Promise<TEntity | null> {
    return this.delegate.findUnique({
      where: this.withSoftDelete({ [this.idField]: id } as TWhereInput),
    });
  }

  findMany(filters: FilterDefinition[] = [], where: TWhereInput = {} as TWhereInput): Promise<TEntity[]> {
    return this.delegate.findMany({
      where: this.withSoftDelete(applyFilters(where, filters)),
    });
  }

  create(data: TCreateInput): Promise<TEntity> {
    return this.delegate.create({ data });
  }

  update(id: string, data: TUpdateInput): Promise<TEntity> {
    return this.delegate.update({
      where: this.withSoftDelete({ [this.idField]: id } as TWhereInput),
      data,
    });
  }

  delete(id: string): Promise<TEntity> {
    return this.delegate.delete({
      where: this.withSoftDelete({ [this.idField]: id } as TWhereInput),
    });
  }

  softDelete(id: string): Promise<TEntity> {
    return this.delegate.update({
      where: this.withSoftDelete({ [this.idField]: id } as TWhereInput),
      data: softDeleteData() as TUpdateInput,
    });
  }

  paginate(
    where: TWhereInput,
    options: PaginationOptions = {},
    filters: FilterDefinition[] = [],
  ): Promise<PaginatedResult<TEntity>> {
    const mergedWhere = this.withSoftDelete(applyFilters(where, filters));

    return paginate(
      (query) =>
        this.delegate.findMany({
          where: mergedWhere,
          skip: query.skip,
          take: query.take,
        }),
      () => this.delegate.count({ where: mergedWhere }),
      options,
    );
  }

  protected withSoftDelete(where: TWhereInput): TWhereInput {
    const softDeleteFilter = buildSoftDeleteFilter(this.includeDeleted);

    if (!softDeleteFilter) {
      return where;
    }

    return {
      ...where,
      ...softDeleteFilter,
    } as TWhereInput;
  }
}

export { TENANT_ID_FIELD, DELETED_AT_FIELD };
