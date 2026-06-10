import { SetMetadata } from "@nestjs/common";
import {
  TRANSACTIONAL_METADATA,
  type TransactionalMetadata,
} from "./transactional.decorator";
import {
  getDefaultTransactionManager,
  type TransactionContext,
} from "../transactions/transaction-manager";

export function Transactional(options: TransactionalMetadata = {}): MethodDecorator {
  return (_target, _propertyKey, descriptor: PropertyDescriptor) => {
    SetMetadata(TRANSACTIONAL_METADATA, options)(_target, _propertyKey, descriptor);

    const original = descriptor.value as (...args: unknown[]) => Promise<unknown>;

    descriptor.value = async function transactionalWrapper(...args: unknown[]) {
      const manager = getDefaultTransactionManager();
      const tenantId = options.tenantAware
        ? (args[options.tenantArgIndex ?? 0] as string | undefined)
        : undefined;

      return manager.runInTransaction(async (context: TransactionContext) => {
        return original.apply(this, [...args, context]);
      }, tenantId);
    };
  };
}

export {
  TRANSACTIONAL_METADATA,
  type TransactionalMetadata,
} from "./transactional.decorator";

export function getTransactionalMetadata(
  target: object,
  methodName: string | symbol,
): TransactionalMetadata | undefined {
  return Reflect.getMetadata(TRANSACTIONAL_METADATA, target, methodName) as
    | TransactionalMetadata
    | undefined;
}
