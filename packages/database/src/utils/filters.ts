export type FilterOperator = "eq" | "contains" | "gte" | "lte" | "in";

export type FilterDefinition = {
  field: string;
  operator?: FilterOperator;
  value: unknown;
};

export function applyFilters<TWhere extends Record<string, unknown>>(
  baseWhere: TWhere,
  filters: FilterDefinition[] = [],
): TWhere {
  const where = { ...baseWhere } as Record<string, unknown>;

  for (const filter of filters) {
    const operator = filter.operator ?? "eq";

    switch (operator) {
      case "contains":
        where[filter.field] = { contains: filter.value, mode: "insensitive" };
        break;
      case "gte":
        where[filter.field] = { gte: filter.value };
        break;
      case "lte":
        where[filter.field] = { lte: filter.value };
        break;
      case "in":
        where[filter.field] = { in: filter.value };
        break;
      default:
        where[filter.field] = filter.value;
    }
  }

  return where as TWhere;
}

export function mergeWhere<TWhere extends Record<string, unknown>>(
  ...clauses: Array<TWhere | undefined>
): TWhere {
  return Object.assign({}, ...clauses.filter(Boolean)) as TWhere;
}
