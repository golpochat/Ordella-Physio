import { TENANT_ID_FIELD } from "../constants/db-errors";
import type { FilterDefinition, PaginationOptions } from "../utils";
import {
  BaseRepository,
  type BaseRepositoryOptions,
  type RepositoryDelegate,
} from "./base-repository";

export type TenantRepositoryOptions = BaseRepositoryOptions & {
  tenantId: string;
};

export class TenantRepository<
  TEntity,
  TCreateInput extends Record<string, unknown>,
  TUpdateInput extends Record<string, unknown>,
  TWhereInput extends Record<string, unknown> = Record<string, unknown>,
> extends BaseRepository<TEntity, TCreateInput, TUpdateInput, TWhereInput> {
  protected readonly tenantId: string;

  constructor(
    delegate: RepositoryDelegate<TEntity, TCreateInput, TUpdateInput, TWhereInput>,
    options: TenantRepositoryOptions,
  ) {
    super(delegate, options);
    this.tenantId = options.tenantId;
  }

  override findById(id: string): Promise<TEntity | null> {
    return this.delegate.findUnique({
      where: this.withSoftDelete({
        [this.idField]: id,
        [TENANT_ID_FIELD]: this.tenantId,
      } as unknown as TWhereInput),
    });
  }

  override findMany(
    filters: FilterDefinition[] = [],
    where: TWhereInput = {} as TWhereInput,
  ): Promise<TEntity[]> {
    return super.findMany(filters, this.withTenantScope(where));
  }

  override create(data: TCreateInput): Promise<TEntity> {
    return super.create({
      ...data,
      [TENANT_ID_FIELD]: this.tenantId,
    } as TCreateInput);
  }

  override update(id: string, data: TUpdateInput): Promise<TEntity> {
    return this.ensureTenantScope(id).then(() => super.update(id, data));
  }

  override delete(id: string): Promise<TEntity> {
    return this.ensureTenantScope(id).then(() => super.delete(id));
  }

  override softDelete(id: string): Promise<TEntity> {
    return this.ensureTenantScope(id).then(() => super.softDelete(id));
  }

  override paginate(
    where: TWhereInput,
    options: PaginationOptions = {},
    filters: FilterDefinition[] = [],
  ) {
    return super.paginate(this.withTenantScope(where), options, filters);
  }

  protected withTenantScope(where: TWhereInput): TWhereInput {
    return {
      ...where,
      [TENANT_ID_FIELD]: this.tenantId,
    } as TWhereInput;
  }

  protected async ensureTenantScope(id: string): Promise<void> {
    const record = await super.findById(id);

    if (!record) {
      return;
    }

    const tenantId = (record as Record<string, unknown>)[TENANT_ID_FIELD];

    if (tenantId !== this.tenantId) {
      throw new Error("Cross-tenant access is not allowed");
    }
  }
}
