import type { CanActivate, ExecutionContext } from "@nestjs/common";
import type { TestingModuleBuilder } from "@nestjs/testing";

export const allowAllGuard: CanActivate = {
  canActivate: (_context: ExecutionContext) => true,
};

export const denyAllGuard: CanActivate = {
  canActivate: (_context: ExecutionContext) => false,
};

export function overrideGuards(
  builder: TestingModuleBuilder,
  guards: Array<abstract new (...args: never[]) => unknown>,
): TestingModuleBuilder {
  for (const guard of guards) {
    builder = builder.overrideGuard(guard).useValue(allowAllGuard);
  }
  return builder;
}
