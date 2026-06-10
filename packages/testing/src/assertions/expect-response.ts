export type ResponseShape = Record<string, unknown>;

export function expectResponseShape(body: unknown, shape: ResponseShape): void {
  if (body === null || typeof body !== "object") {
    throw new Error("Expected response body to be an object");
  }

  for (const key of Object.keys(shape)) {
    if (!(key in (body as Record<string, unknown>))) {
      throw new Error(`Expected response to include key "${key}"`);
    }
  }
}

export type PaginatedResultShape<T = unknown> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export function expectPaginatedResult(body: unknown): asserts body is PaginatedResultShape {
  expectResponseShape(body, { data: [], meta: {} });

  const payload = body as PaginatedResultShape;
  if (!Array.isArray(payload.data)) {
    throw new Error("Expected paginated result data to be an array");
  }

  const meta = payload.meta;
  for (const key of ["page", "limit", "total", "totalPages"] as const) {
    if (typeof meta[key] !== "number") {
      throw new Error(`Expected paginated meta.${key} to be a number`);
    }
  }
}

export function expectStatus(response: { status: number }, expectedStatus: number): void {
  if (response.status !== expectedStatus) {
    throw new Error(`Expected status ${expectedStatus}, received ${response.status}`);
  }
}
