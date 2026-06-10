import { randomHex, nextSequence } from "../mocks/random";

export function randomEmail(prefix = "user"): string {
  return `${prefix}${nextSequence()}@example.com`;
}

export function randomPhone(): string {
  return `+447700900${String(nextSequence()).padStart(3, "0").slice(-3)}`;
}

export function randomId(prefix = "id"): string {
  return `${prefix}-${randomHex(8)}`;
}

export type HttpResponseLike = {
  status: number;
  body?: unknown;
};

export function expectValidResponse(response: HttpResponseLike, expectedStatus = 200): void {
  if (response.status !== expectedStatus) {
    throw new Error(`Expected status ${expectedStatus}, received ${response.status}`);
  }
}

export function expectUnauthorized(response: HttpResponseLike): void {
  expectValidResponse(response, 401);
}

export function expectForbidden(response: HttpResponseLike): void {
  expectValidResponse(response, 403);
}

export function expectNotFound(response: HttpResponseLike): void {
  expectValidResponse(response, 404);
}

export function expectBadRequest(response: HttpResponseLike): void {
  expectValidResponse(response, 400);
}
