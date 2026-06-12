
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model TenantSubscription
 * 
 */
export type TenantSubscription = $Result.DefaultSelection<Prisma.$TenantSubscriptionPayload>
/**
 * Model UsageRecord
 * 
 */
export type UsageRecord = $Result.DefaultSelection<Prisma.$UsageRecordPayload>
/**
 * Model FeatureFlag
 * 
 */
export type FeatureFlag = $Result.DefaultSelection<Prisma.$FeatureFlagPayload>
/**
 * Model SubscriptionInvoice
 * 
 */
export type SubscriptionInvoice = $Result.DefaultSelection<Prisma.$SubscriptionInvoicePayload>
/**
 * Model DunningRecord
 * 
 */
export type DunningRecord = $Result.DefaultSelection<Prisma.$DunningRecordPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  TRIALING: 'TRIALING',
  PAST_DUE: 'PAST_DUE',
  CANCELED: 'CANCELED',
  INCOMPLETE: 'INCOMPLETE'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const UsageMetric: {
  PATIENT_COUNT: 'PATIENT_COUNT',
  APPOINTMENT_COUNT: 'APPOINTMENT_COUNT',
  STORAGE_MB: 'STORAGE_MB',
  SMS_SENT: 'SMS_SENT'
};

export type UsageMetric = (typeof UsageMetric)[keyof typeof UsageMetric]


export const InvoiceStatus: {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  PAID: 'PAID',
  UNCOLLECTIBLE: 'UNCOLLECTIBLE',
  VOID: 'VOID'
};

export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus]


export const DunningStatus: {
  ACTIVE: 'ACTIVE',
  RESOLVED: 'RESOLVED',
  CANCELED: 'CANCELED'
};

export type DunningStatus = (typeof DunningStatus)[keyof typeof DunningStatus]

}

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type UsageMetric = $Enums.UsageMetric

export const UsageMetric: typeof $Enums.UsageMetric

export type InvoiceStatus = $Enums.InvoiceStatus

export const InvoiceStatus: typeof $Enums.InvoiceStatus

export type DunningStatus = $Enums.DunningStatus

export const DunningStatus: typeof $Enums.DunningStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Plans
 * const plans = await prisma.plan.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Plans
   * const plans = await prisma.plan.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenantSubscription`: Exposes CRUD operations for the **TenantSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantSubscriptions
    * const tenantSubscriptions = await prisma.tenantSubscription.findMany()
    * ```
    */
  get tenantSubscription(): Prisma.TenantSubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageRecord`: Exposes CRUD operations for the **UsageRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageRecords
    * const usageRecords = await prisma.usageRecord.findMany()
    * ```
    */
  get usageRecord(): Prisma.UsageRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.featureFlag`: Exposes CRUD operations for the **FeatureFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeatureFlags
    * const featureFlags = await prisma.featureFlag.findMany()
    * ```
    */
  get featureFlag(): Prisma.FeatureFlagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptionInvoice`: Exposes CRUD operations for the **SubscriptionInvoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriptionInvoices
    * const subscriptionInvoices = await prisma.subscriptionInvoice.findMany()
    * ```
    */
  get subscriptionInvoice(): Prisma.SubscriptionInvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dunningRecord`: Exposes CRUD operations for the **DunningRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DunningRecords
    * const dunningRecords = await prisma.dunningRecord.findMany()
    * ```
    */
  get dunningRecord(): Prisma.DunningRecordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Plan: 'Plan',
    TenantSubscription: 'TenantSubscription',
    UsageRecord: 'UsageRecord',
    FeatureFlag: 'FeatureFlag',
    SubscriptionInvoice: 'SubscriptionInvoice',
    DunningRecord: 'DunningRecord'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "plan" | "tenantSubscription" | "usageRecord" | "featureFlag" | "subscriptionInvoice" | "dunningRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      TenantSubscription: {
        payload: Prisma.$TenantSubscriptionPayload<ExtArgs>
        fields: Prisma.TenantSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.TenantSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>
          }
          findMany: {
            args: Prisma.TenantSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>[]
          }
          create: {
            args: Prisma.TenantSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>
          }
          createMany: {
            args: Prisma.TenantSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.TenantSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>
          }
          update: {
            args: Prisma.TenantSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.TenantSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantSubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.TenantSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.TenantSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantSubscription>
          }
          groupBy: {
            args: Prisma.TenantSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<TenantSubscriptionCountAggregateOutputType> | number
          }
        }
      }
      UsageRecord: {
        payload: Prisma.$UsageRecordPayload<ExtArgs>
        fields: Prisma.UsageRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>
          }
          findFirst: {
            args: Prisma.UsageRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>
          }
          findMany: {
            args: Prisma.UsageRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>[]
          }
          create: {
            args: Prisma.UsageRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>
          }
          createMany: {
            args: Prisma.UsageRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>[]
          }
          delete: {
            args: Prisma.UsageRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>
          }
          update: {
            args: Prisma.UsageRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>
          }
          deleteMany: {
            args: Prisma.UsageRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>[]
          }
          upsert: {
            args: Prisma.UsageRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageRecordPayload>
          }
          aggregate: {
            args: Prisma.UsageRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageRecord>
          }
          groupBy: {
            args: Prisma.UsageRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageRecordCountArgs<ExtArgs>
            result: $Utils.Optional<UsageRecordCountAggregateOutputType> | number
          }
        }
      }
      FeatureFlag: {
        payload: Prisma.$FeatureFlagPayload<ExtArgs>
        fields: Prisma.FeatureFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeatureFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeatureFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          findFirst: {
            args: Prisma.FeatureFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeatureFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          findMany: {
            args: Prisma.FeatureFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>[]
          }
          create: {
            args: Prisma.FeatureFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          createMany: {
            args: Prisma.FeatureFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeatureFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>[]
          }
          delete: {
            args: Prisma.FeatureFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          update: {
            args: Prisma.FeatureFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          deleteMany: {
            args: Prisma.FeatureFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeatureFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeatureFlagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>[]
          }
          upsert: {
            args: Prisma.FeatureFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          aggregate: {
            args: Prisma.FeatureFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeatureFlag>
          }
          groupBy: {
            args: Prisma.FeatureFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeatureFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeatureFlagCountArgs<ExtArgs>
            result: $Utils.Optional<FeatureFlagCountAggregateOutputType> | number
          }
        }
      }
      SubscriptionInvoice: {
        payload: Prisma.$SubscriptionInvoicePayload<ExtArgs>
        fields: Prisma.SubscriptionInvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionInvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionInvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>
          }
          findFirst: {
            args: Prisma.SubscriptionInvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionInvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>
          }
          findMany: {
            args: Prisma.SubscriptionInvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>[]
          }
          create: {
            args: Prisma.SubscriptionInvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>
          }
          createMany: {
            args: Prisma.SubscriptionInvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionInvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>[]
          }
          delete: {
            args: Prisma.SubscriptionInvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>
          }
          update: {
            args: Prisma.SubscriptionInvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionInvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionInvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionInvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionInvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionInvoicePayload>
          }
          aggregate: {
            args: Prisma.SubscriptionInvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptionInvoice>
          }
          groupBy: {
            args: Prisma.SubscriptionInvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionInvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionInvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionInvoiceCountAggregateOutputType> | number
          }
        }
      }
      DunningRecord: {
        payload: Prisma.$DunningRecordPayload<ExtArgs>
        fields: Prisma.DunningRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DunningRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DunningRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>
          }
          findFirst: {
            args: Prisma.DunningRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DunningRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>
          }
          findMany: {
            args: Prisma.DunningRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>[]
          }
          create: {
            args: Prisma.DunningRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>
          }
          createMany: {
            args: Prisma.DunningRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DunningRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>[]
          }
          delete: {
            args: Prisma.DunningRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>
          }
          update: {
            args: Prisma.DunningRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>
          }
          deleteMany: {
            args: Prisma.DunningRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DunningRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DunningRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>[]
          }
          upsert: {
            args: Prisma.DunningRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DunningRecordPayload>
          }
          aggregate: {
            args: Prisma.DunningRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDunningRecord>
          }
          groupBy: {
            args: Prisma.DunningRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<DunningRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.DunningRecordCountArgs<ExtArgs>
            result: $Utils.Optional<DunningRecordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    plan?: PlanOmit
    tenantSubscription?: TenantSubscriptionOmit
    usageRecord?: UsageRecordOmit
    featureFlag?: FeatureFlagOmit
    subscriptionInvoice?: SubscriptionInvoiceOmit
    dunningRecord?: DunningRecordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    subscriptions: number
    featureFlags: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | PlanCountOutputTypeCountSubscriptionsArgs
    featureFlags?: boolean | PlanCountOutputTypeCountFeatureFlagsArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantSubscriptionWhereInput
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountFeatureFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureFlagWhereInput
  }


  /**
   * Count Type TenantSubscriptionCountOutputType
   */

  export type TenantSubscriptionCountOutputType = {
    invoices: number
  }

  export type TenantSubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | TenantSubscriptionCountOutputTypeCountInvoicesArgs
  }

  // Custom InputTypes
  /**
   * TenantSubscriptionCountOutputType without action
   */
  export type TenantSubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscriptionCountOutputType
     */
    select?: TenantSubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantSubscriptionCountOutputType without action
   */
  export type TenantSubscriptionCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionInvoiceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    priceMonthly: number | null
    priceYearly: number | null
    trialDays: number | null
  }

  export type PlanSumAggregateOutputType = {
    priceMonthly: number | null
    priceYearly: number | null
    trialDays: number | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    priceMonthly: number | null
    priceYearly: number | null
    currency: string | null
    stripeProductId: string | null
    stripePriceMonthlyId: string | null
    stripePriceYearlyId: string | null
    trialDays: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    priceMonthly: number | null
    priceYearly: number | null
    currency: string | null
    stripeProductId: string | null
    stripePriceMonthlyId: string | null
    stripePriceYearlyId: string | null
    trialDays: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    name: number
    description: number
    priceMonthly: number
    priceYearly: number
    currency: number
    stripeProductId: number
    stripePriceMonthlyId: number
    stripePriceYearlyId: number
    limits: number
    trialDays: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    priceMonthly?: true
    priceYearly?: true
    trialDays?: true
  }

  export type PlanSumAggregateInputType = {
    priceMonthly?: true
    priceYearly?: true
    trialDays?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    currency?: true
    stripeProductId?: true
    stripePriceMonthlyId?: true
    stripePriceYearlyId?: true
    trialDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    currency?: true
    stripeProductId?: true
    stripePriceMonthlyId?: true
    stripePriceYearlyId?: true
    trialDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    currency?: true
    stripeProductId?: true
    stripePriceMonthlyId?: true
    stripePriceYearlyId?: true
    limits?: true
    trialDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    currency: string
    stripeProductId: string | null
    stripePriceMonthlyId: string | null
    stripePriceYearlyId: string | null
    limits: JsonValue
    trialDays: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    priceMonthly?: boolean
    priceYearly?: boolean
    currency?: boolean
    stripeProductId?: boolean
    stripePriceMonthlyId?: boolean
    stripePriceYearlyId?: boolean
    limits?: boolean
    trialDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscriptions?: boolean | Plan$subscriptionsArgs<ExtArgs>
    featureFlags?: boolean | Plan$featureFlagsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    priceMonthly?: boolean
    priceYearly?: boolean
    currency?: boolean
    stripeProductId?: boolean
    stripePriceMonthlyId?: boolean
    stripePriceYearlyId?: boolean
    limits?: boolean
    trialDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    priceMonthly?: boolean
    priceYearly?: boolean
    currency?: boolean
    stripeProductId?: boolean
    stripePriceMonthlyId?: boolean
    stripePriceYearlyId?: boolean
    limits?: boolean
    trialDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    priceMonthly?: boolean
    priceYearly?: boolean
    currency?: boolean
    stripeProductId?: boolean
    stripePriceMonthlyId?: boolean
    stripePriceYearlyId?: boolean
    limits?: boolean
    trialDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "priceMonthly" | "priceYearly" | "currency" | "stripeProductId" | "stripePriceMonthlyId" | "stripePriceYearlyId" | "limits" | "trialDays" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | Plan$subscriptionsArgs<ExtArgs>
    featureFlags?: boolean | Plan$featureFlagsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      subscriptions: Prisma.$TenantSubscriptionPayload<ExtArgs>[]
      featureFlags: Prisma.$FeatureFlagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      priceMonthly: number
      priceYearly: number
      currency: string
      stripeProductId: string | null
      stripePriceMonthlyId: string | null
      stripePriceYearlyId: string | null
      limits: Prisma.JsonValue
      trialDays: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends Plan$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, Plan$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    featureFlags<T extends Plan$featureFlagsArgs<ExtArgs> = {}>(args?: Subset<T, Plan$featureFlagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly name: FieldRef<"Plan", 'String'>
    readonly description: FieldRef<"Plan", 'String'>
    readonly priceMonthly: FieldRef<"Plan", 'Int'>
    readonly priceYearly: FieldRef<"Plan", 'Int'>
    readonly currency: FieldRef<"Plan", 'String'>
    readonly stripeProductId: FieldRef<"Plan", 'String'>
    readonly stripePriceMonthlyId: FieldRef<"Plan", 'String'>
    readonly stripePriceYearlyId: FieldRef<"Plan", 'String'>
    readonly limits: FieldRef<"Plan", 'Json'>
    readonly trialDays: FieldRef<"Plan", 'Int'>
    readonly isActive: FieldRef<"Plan", 'Boolean'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
    readonly updatedAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.subscriptions
   */
  export type Plan$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    where?: TenantSubscriptionWhereInput
    orderBy?: TenantSubscriptionOrderByWithRelationInput | TenantSubscriptionOrderByWithRelationInput[]
    cursor?: TenantSubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantSubscriptionScalarFieldEnum | TenantSubscriptionScalarFieldEnum[]
  }

  /**
   * Plan.featureFlags
   */
  export type Plan$featureFlagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    where?: FeatureFlagWhereInput
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    cursor?: FeatureFlagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model TenantSubscription
   */

  export type AggregateTenantSubscription = {
    _count: TenantSubscriptionCountAggregateOutputType | null
    _min: TenantSubscriptionMinAggregateOutputType | null
    _max: TenantSubscriptionMaxAggregateOutputType | null
  }

  export type TenantSubscriptionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    planId: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeSubscriptionItemId: string | null
    status: $Enums.SubscriptionStatus | null
    trialEndsAt: Date | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean | null
    scheduledPlanId: string | null
    scheduledChangeAt: Date | null
    billingCycle: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantSubscriptionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    planId: string | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeSubscriptionItemId: string | null
    status: $Enums.SubscriptionStatus | null
    trialEndsAt: Date | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean | null
    scheduledPlanId: string | null
    scheduledChangeAt: Date | null
    billingCycle: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantSubscriptionCountAggregateOutputType = {
    id: number
    tenantId: number
    planId: number
    stripeCustomerId: number
    stripeSubscriptionId: number
    stripeSubscriptionItemId: number
    status: number
    trialEndsAt: number
    currentPeriodStart: number
    currentPeriodEnd: number
    cancelAtPeriodEnd: number
    scheduledPlanId: number
    scheduledChangeAt: number
    billingCycle: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantSubscriptionMinAggregateInputType = {
    id?: true
    tenantId?: true
    planId?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeSubscriptionItemId?: true
    status?: true
    trialEndsAt?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    scheduledPlanId?: true
    scheduledChangeAt?: true
    billingCycle?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantSubscriptionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    planId?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeSubscriptionItemId?: true
    status?: true
    trialEndsAt?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    scheduledPlanId?: true
    scheduledChangeAt?: true
    billingCycle?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantSubscriptionCountAggregateInputType = {
    id?: true
    tenantId?: true
    planId?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    stripeSubscriptionItemId?: true
    status?: true
    trialEndsAt?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    scheduledPlanId?: true
    scheduledChangeAt?: true
    billingCycle?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantSubscription to aggregate.
     */
    where?: TenantSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSubscriptions to fetch.
     */
    orderBy?: TenantSubscriptionOrderByWithRelationInput | TenantSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantSubscriptions
    **/
    _count?: true | TenantSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantSubscriptionMaxAggregateInputType
  }

  export type GetTenantSubscriptionAggregateType<T extends TenantSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantSubscription[P]>
      : GetScalarType<T[P], AggregateTenantSubscription[P]>
  }




  export type TenantSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantSubscriptionWhereInput
    orderBy?: TenantSubscriptionOrderByWithAggregationInput | TenantSubscriptionOrderByWithAggregationInput[]
    by: TenantSubscriptionScalarFieldEnum[] | TenantSubscriptionScalarFieldEnum
    having?: TenantSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantSubscriptionCountAggregateInputType | true
    _min?: TenantSubscriptionMinAggregateInputType
    _max?: TenantSubscriptionMaxAggregateInputType
  }

  export type TenantSubscriptionGroupByOutputType = {
    id: string
    tenantId: string
    planId: string
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    stripeSubscriptionItemId: string | null
    status: $Enums.SubscriptionStatus
    trialEndsAt: Date | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean
    scheduledPlanId: string | null
    scheduledChangeAt: Date | null
    billingCycle: string
    createdAt: Date
    updatedAt: Date
    _count: TenantSubscriptionCountAggregateOutputType | null
    _min: TenantSubscriptionMinAggregateOutputType | null
    _max: TenantSubscriptionMaxAggregateOutputType | null
  }

  type GetTenantSubscriptionGroupByPayload<T extends TenantSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], TenantSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type TenantSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    planId?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeSubscriptionItemId?: boolean
    status?: boolean
    trialEndsAt?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: boolean
    scheduledChangeAt?: boolean
    billingCycle?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    invoices?: boolean | TenantSubscription$invoicesArgs<ExtArgs>
    dunning?: boolean | TenantSubscription$dunningArgs<ExtArgs>
    _count?: boolean | TenantSubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantSubscription"]>

  export type TenantSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    planId?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeSubscriptionItemId?: boolean
    status?: boolean
    trialEndsAt?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: boolean
    scheduledChangeAt?: boolean
    billingCycle?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantSubscription"]>

  export type TenantSubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    planId?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeSubscriptionItemId?: boolean
    status?: boolean
    trialEndsAt?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: boolean
    scheduledChangeAt?: boolean
    billingCycle?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantSubscription"]>

  export type TenantSubscriptionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    planId?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    stripeSubscriptionItemId?: boolean
    status?: boolean
    trialEndsAt?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: boolean
    scheduledChangeAt?: boolean
    billingCycle?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantSubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "planId" | "stripeCustomerId" | "stripeSubscriptionId" | "stripeSubscriptionItemId" | "status" | "trialEndsAt" | "currentPeriodStart" | "currentPeriodEnd" | "cancelAtPeriodEnd" | "scheduledPlanId" | "scheduledChangeAt" | "billingCycle" | "createdAt" | "updatedAt", ExtArgs["result"]["tenantSubscription"]>
  export type TenantSubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
    invoices?: boolean | TenantSubscription$invoicesArgs<ExtArgs>
    dunning?: boolean | TenantSubscription$dunningArgs<ExtArgs>
    _count?: boolean | TenantSubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantSubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type TenantSubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $TenantSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantSubscription"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs>
      invoices: Prisma.$SubscriptionInvoicePayload<ExtArgs>[]
      dunning: Prisma.$DunningRecordPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      planId: string
      stripeCustomerId: string | null
      stripeSubscriptionId: string | null
      stripeSubscriptionItemId: string | null
      status: $Enums.SubscriptionStatus
      trialEndsAt: Date | null
      currentPeriodStart: Date | null
      currentPeriodEnd: Date | null
      cancelAtPeriodEnd: boolean
      scheduledPlanId: string | null
      scheduledChangeAt: Date | null
      billingCycle: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenantSubscription"]>
    composites: {}
  }

  type TenantSubscriptionGetPayload<S extends boolean | null | undefined | TenantSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$TenantSubscriptionPayload, S>

  type TenantSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantSubscriptionCountAggregateInputType | true
    }

  export interface TenantSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantSubscription'], meta: { name: 'TenantSubscription' } }
    /**
     * Find zero or one TenantSubscription that matches the filter.
     * @param {TenantSubscriptionFindUniqueArgs} args - Arguments to find a TenantSubscription
     * @example
     * // Get one TenantSubscription
     * const tenantSubscription = await prisma.tenantSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantSubscriptionFindUniqueArgs>(args: SelectSubset<T, TenantSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TenantSubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a TenantSubscription
     * @example
     * // Get one TenantSubscription
     * const tenantSubscription = await prisma.tenantSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSubscriptionFindFirstArgs} args - Arguments to find a TenantSubscription
     * @example
     * // Get one TenantSubscription
     * const tenantSubscription = await prisma.tenantSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantSubscriptionFindFirstArgs>(args?: SelectSubset<T, TenantSubscriptionFindFirstArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSubscriptionFindFirstOrThrowArgs} args - Arguments to find a TenantSubscription
     * @example
     * // Get one TenantSubscription
     * const tenantSubscription = await prisma.tenantSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TenantSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantSubscriptions
     * const tenantSubscriptions = await prisma.tenantSubscription.findMany()
     * 
     * // Get first 10 TenantSubscriptions
     * const tenantSubscriptions = await prisma.tenantSubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantSubscriptionWithIdOnly = await prisma.tenantSubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantSubscriptionFindManyArgs>(args?: SelectSubset<T, TenantSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TenantSubscription.
     * @param {TenantSubscriptionCreateArgs} args - Arguments to create a TenantSubscription.
     * @example
     * // Create one TenantSubscription
     * const TenantSubscription = await prisma.tenantSubscription.create({
     *   data: {
     *     // ... data to create a TenantSubscription
     *   }
     * })
     * 
     */
    create<T extends TenantSubscriptionCreateArgs>(args: SelectSubset<T, TenantSubscriptionCreateArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TenantSubscriptions.
     * @param {TenantSubscriptionCreateManyArgs} args - Arguments to create many TenantSubscriptions.
     * @example
     * // Create many TenantSubscriptions
     * const tenantSubscription = await prisma.tenantSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantSubscriptionCreateManyArgs>(args?: SelectSubset<T, TenantSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantSubscriptions and returns the data saved in the database.
     * @param {TenantSubscriptionCreateManyAndReturnArgs} args - Arguments to create many TenantSubscriptions.
     * @example
     * // Create many TenantSubscriptions
     * const tenantSubscription = await prisma.tenantSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantSubscriptions and only return the `id`
     * const tenantSubscriptionWithIdOnly = await prisma.tenantSubscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TenantSubscription.
     * @param {TenantSubscriptionDeleteArgs} args - Arguments to delete one TenantSubscription.
     * @example
     * // Delete one TenantSubscription
     * const TenantSubscription = await prisma.tenantSubscription.delete({
     *   where: {
     *     // ... filter to delete one TenantSubscription
     *   }
     * })
     * 
     */
    delete<T extends TenantSubscriptionDeleteArgs>(args: SelectSubset<T, TenantSubscriptionDeleteArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TenantSubscription.
     * @param {TenantSubscriptionUpdateArgs} args - Arguments to update one TenantSubscription.
     * @example
     * // Update one TenantSubscription
     * const tenantSubscription = await prisma.tenantSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantSubscriptionUpdateArgs>(args: SelectSubset<T, TenantSubscriptionUpdateArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TenantSubscriptions.
     * @param {TenantSubscriptionDeleteManyArgs} args - Arguments to filter TenantSubscriptions to delete.
     * @example
     * // Delete a few TenantSubscriptions
     * const { count } = await prisma.tenantSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantSubscriptionDeleteManyArgs>(args?: SelectSubset<T, TenantSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantSubscriptions
     * const tenantSubscription = await prisma.tenantSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantSubscriptionUpdateManyArgs>(args: SelectSubset<T, TenantSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantSubscriptions and returns the data updated in the database.
     * @param {TenantSubscriptionUpdateManyAndReturnArgs} args - Arguments to update many TenantSubscriptions.
     * @example
     * // Update many TenantSubscriptions
     * const tenantSubscription = await prisma.tenantSubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TenantSubscriptions and only return the `id`
     * const tenantSubscriptionWithIdOnly = await prisma.tenantSubscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantSubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TenantSubscription.
     * @param {TenantSubscriptionUpsertArgs} args - Arguments to update or create a TenantSubscription.
     * @example
     * // Update or create a TenantSubscription
     * const tenantSubscription = await prisma.tenantSubscription.upsert({
     *   create: {
     *     // ... data to create a TenantSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantSubscription we want to update
     *   }
     * })
     */
    upsert<T extends TenantSubscriptionUpsertArgs>(args: SelectSubset<T, TenantSubscriptionUpsertArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TenantSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSubscriptionCountArgs} args - Arguments to filter TenantSubscriptions to count.
     * @example
     * // Count the number of TenantSubscriptions
     * const count = await prisma.tenantSubscription.count({
     *   where: {
     *     // ... the filter for the TenantSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends TenantSubscriptionCountArgs>(
      args?: Subset<T, TenantSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantSubscriptionAggregateArgs>(args: Subset<T, TenantSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetTenantSubscriptionAggregateType<T>>

    /**
     * Group by TenantSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: TenantSubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantSubscription model
   */
  readonly fields: TenantSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invoices<T extends TenantSubscription$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, TenantSubscription$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dunning<T extends TenantSubscription$dunningArgs<ExtArgs> = {}>(args?: Subset<T, TenantSubscription$dunningArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TenantSubscription model
   */
  interface TenantSubscriptionFieldRefs {
    readonly id: FieldRef<"TenantSubscription", 'String'>
    readonly tenantId: FieldRef<"TenantSubscription", 'String'>
    readonly planId: FieldRef<"TenantSubscription", 'String'>
    readonly stripeCustomerId: FieldRef<"TenantSubscription", 'String'>
    readonly stripeSubscriptionId: FieldRef<"TenantSubscription", 'String'>
    readonly stripeSubscriptionItemId: FieldRef<"TenantSubscription", 'String'>
    readonly status: FieldRef<"TenantSubscription", 'SubscriptionStatus'>
    readonly trialEndsAt: FieldRef<"TenantSubscription", 'DateTime'>
    readonly currentPeriodStart: FieldRef<"TenantSubscription", 'DateTime'>
    readonly currentPeriodEnd: FieldRef<"TenantSubscription", 'DateTime'>
    readonly cancelAtPeriodEnd: FieldRef<"TenantSubscription", 'Boolean'>
    readonly scheduledPlanId: FieldRef<"TenantSubscription", 'String'>
    readonly scheduledChangeAt: FieldRef<"TenantSubscription", 'DateTime'>
    readonly billingCycle: FieldRef<"TenantSubscription", 'String'>
    readonly createdAt: FieldRef<"TenantSubscription", 'DateTime'>
    readonly updatedAt: FieldRef<"TenantSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TenantSubscription findUnique
   */
  export type TenantSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which TenantSubscription to fetch.
     */
    where: TenantSubscriptionWhereUniqueInput
  }

  /**
   * TenantSubscription findUniqueOrThrow
   */
  export type TenantSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which TenantSubscription to fetch.
     */
    where: TenantSubscriptionWhereUniqueInput
  }

  /**
   * TenantSubscription findFirst
   */
  export type TenantSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which TenantSubscription to fetch.
     */
    where?: TenantSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSubscriptions to fetch.
     */
    orderBy?: TenantSubscriptionOrderByWithRelationInput | TenantSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantSubscriptions.
     */
    cursor?: TenantSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantSubscriptions.
     */
    distinct?: TenantSubscriptionScalarFieldEnum | TenantSubscriptionScalarFieldEnum[]
  }

  /**
   * TenantSubscription findFirstOrThrow
   */
  export type TenantSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which TenantSubscription to fetch.
     */
    where?: TenantSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSubscriptions to fetch.
     */
    orderBy?: TenantSubscriptionOrderByWithRelationInput | TenantSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantSubscriptions.
     */
    cursor?: TenantSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantSubscriptions.
     */
    distinct?: TenantSubscriptionScalarFieldEnum | TenantSubscriptionScalarFieldEnum[]
  }

  /**
   * TenantSubscription findMany
   */
  export type TenantSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which TenantSubscriptions to fetch.
     */
    where?: TenantSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSubscriptions to fetch.
     */
    orderBy?: TenantSubscriptionOrderByWithRelationInput | TenantSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantSubscriptions.
     */
    cursor?: TenantSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSubscriptions.
     */
    skip?: number
    distinct?: TenantSubscriptionScalarFieldEnum | TenantSubscriptionScalarFieldEnum[]
  }

  /**
   * TenantSubscription create
   */
  export type TenantSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a TenantSubscription.
     */
    data: XOR<TenantSubscriptionCreateInput, TenantSubscriptionUncheckedCreateInput>
  }

  /**
   * TenantSubscription createMany
   */
  export type TenantSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantSubscriptions.
     */
    data: TenantSubscriptionCreateManyInput | TenantSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantSubscription createManyAndReturn
   */
  export type TenantSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many TenantSubscriptions.
     */
    data: TenantSubscriptionCreateManyInput | TenantSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantSubscription update
   */
  export type TenantSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a TenantSubscription.
     */
    data: XOR<TenantSubscriptionUpdateInput, TenantSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which TenantSubscription to update.
     */
    where: TenantSubscriptionWhereUniqueInput
  }

  /**
   * TenantSubscription updateMany
   */
  export type TenantSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantSubscriptions.
     */
    data: XOR<TenantSubscriptionUpdateManyMutationInput, TenantSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which TenantSubscriptions to update
     */
    where?: TenantSubscriptionWhereInput
    /**
     * Limit how many TenantSubscriptions to update.
     */
    limit?: number
  }

  /**
   * TenantSubscription updateManyAndReturn
   */
  export type TenantSubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update TenantSubscriptions.
     */
    data: XOR<TenantSubscriptionUpdateManyMutationInput, TenantSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which TenantSubscriptions to update
     */
    where?: TenantSubscriptionWhereInput
    /**
     * Limit how many TenantSubscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantSubscription upsert
   */
  export type TenantSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the TenantSubscription to update in case it exists.
     */
    where: TenantSubscriptionWhereUniqueInput
    /**
     * In case the TenantSubscription found by the `where` argument doesn't exist, create a new TenantSubscription with this data.
     */
    create: XOR<TenantSubscriptionCreateInput, TenantSubscriptionUncheckedCreateInput>
    /**
     * In case the TenantSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantSubscriptionUpdateInput, TenantSubscriptionUncheckedUpdateInput>
  }

  /**
   * TenantSubscription delete
   */
  export type TenantSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
    /**
     * Filter which TenantSubscription to delete.
     */
    where: TenantSubscriptionWhereUniqueInput
  }

  /**
   * TenantSubscription deleteMany
   */
  export type TenantSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantSubscriptions to delete
     */
    where?: TenantSubscriptionWhereInput
    /**
     * Limit how many TenantSubscriptions to delete.
     */
    limit?: number
  }

  /**
   * TenantSubscription.invoices
   */
  export type TenantSubscription$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    where?: SubscriptionInvoiceWhereInput
    orderBy?: SubscriptionInvoiceOrderByWithRelationInput | SubscriptionInvoiceOrderByWithRelationInput[]
    cursor?: SubscriptionInvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionInvoiceScalarFieldEnum | SubscriptionInvoiceScalarFieldEnum[]
  }

  /**
   * TenantSubscription.dunning
   */
  export type TenantSubscription$dunningArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    where?: DunningRecordWhereInput
  }

  /**
   * TenantSubscription without action
   */
  export type TenantSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSubscription
     */
    select?: TenantSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantSubscription
     */
    omit?: TenantSubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model UsageRecord
   */

  export type AggregateUsageRecord = {
    _count: UsageRecordCountAggregateOutputType | null
    _avg: UsageRecordAvgAggregateOutputType | null
    _sum: UsageRecordSumAggregateOutputType | null
    _min: UsageRecordMinAggregateOutputType | null
    _max: UsageRecordMaxAggregateOutputType | null
  }

  export type UsageRecordAvgAggregateOutputType = {
    quantity: number | null
  }

  export type UsageRecordSumAggregateOutputType = {
    quantity: number | null
  }

  export type UsageRecordMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    metric: $Enums.UsageMetric | null
    quantity: number | null
    periodStart: Date | null
    periodEnd: Date | null
    stripeUsageRecordId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsageRecordMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    metric: $Enums.UsageMetric | null
    quantity: number | null
    periodStart: Date | null
    periodEnd: Date | null
    stripeUsageRecordId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsageRecordCountAggregateOutputType = {
    id: number
    tenantId: number
    metric: number
    quantity: number
    periodStart: number
    periodEnd: number
    stripeUsageRecordId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsageRecordAvgAggregateInputType = {
    quantity?: true
  }

  export type UsageRecordSumAggregateInputType = {
    quantity?: true
  }

  export type UsageRecordMinAggregateInputType = {
    id?: true
    tenantId?: true
    metric?: true
    quantity?: true
    periodStart?: true
    periodEnd?: true
    stripeUsageRecordId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsageRecordMaxAggregateInputType = {
    id?: true
    tenantId?: true
    metric?: true
    quantity?: true
    periodStart?: true
    periodEnd?: true
    stripeUsageRecordId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsageRecordCountAggregateInputType = {
    id?: true
    tenantId?: true
    metric?: true
    quantity?: true
    periodStart?: true
    periodEnd?: true
    stripeUsageRecordId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsageRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageRecord to aggregate.
     */
    where?: UsageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageRecords to fetch.
     */
    orderBy?: UsageRecordOrderByWithRelationInput | UsageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageRecords
    **/
    _count?: true | UsageRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageRecordMaxAggregateInputType
  }

  export type GetUsageRecordAggregateType<T extends UsageRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageRecord[P]>
      : GetScalarType<T[P], AggregateUsageRecord[P]>
  }




  export type UsageRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageRecordWhereInput
    orderBy?: UsageRecordOrderByWithAggregationInput | UsageRecordOrderByWithAggregationInput[]
    by: UsageRecordScalarFieldEnum[] | UsageRecordScalarFieldEnum
    having?: UsageRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageRecordCountAggregateInputType | true
    _avg?: UsageRecordAvgAggregateInputType
    _sum?: UsageRecordSumAggregateInputType
    _min?: UsageRecordMinAggregateInputType
    _max?: UsageRecordMaxAggregateInputType
  }

  export type UsageRecordGroupByOutputType = {
    id: string
    tenantId: string
    metric: $Enums.UsageMetric
    quantity: number
    periodStart: Date
    periodEnd: Date
    stripeUsageRecordId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UsageRecordCountAggregateOutputType | null
    _avg: UsageRecordAvgAggregateOutputType | null
    _sum: UsageRecordSumAggregateOutputType | null
    _min: UsageRecordMinAggregateOutputType | null
    _max: UsageRecordMaxAggregateOutputType | null
  }

  type GetUsageRecordGroupByPayload<T extends UsageRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageRecordGroupByOutputType[P]>
            : GetScalarType<T[P], UsageRecordGroupByOutputType[P]>
        }
      >
    >


  export type UsageRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    metric?: boolean
    quantity?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    stripeUsageRecordId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usageRecord"]>

  export type UsageRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    metric?: boolean
    quantity?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    stripeUsageRecordId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usageRecord"]>

  export type UsageRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    metric?: boolean
    quantity?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    stripeUsageRecordId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usageRecord"]>

  export type UsageRecordSelectScalar = {
    id?: boolean
    tenantId?: boolean
    metric?: boolean
    quantity?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    stripeUsageRecordId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsageRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "metric" | "quantity" | "periodStart" | "periodEnd" | "stripeUsageRecordId" | "createdAt" | "updatedAt", ExtArgs["result"]["usageRecord"]>

  export type $UsageRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      metric: $Enums.UsageMetric
      quantity: number
      periodStart: Date
      periodEnd: Date
      stripeUsageRecordId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["usageRecord"]>
    composites: {}
  }

  type UsageRecordGetPayload<S extends boolean | null | undefined | UsageRecordDefaultArgs> = $Result.GetResult<Prisma.$UsageRecordPayload, S>

  type UsageRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageRecordCountAggregateInputType | true
    }

  export interface UsageRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageRecord'], meta: { name: 'UsageRecord' } }
    /**
     * Find zero or one UsageRecord that matches the filter.
     * @param {UsageRecordFindUniqueArgs} args - Arguments to find a UsageRecord
     * @example
     * // Get one UsageRecord
     * const usageRecord = await prisma.usageRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageRecordFindUniqueArgs>(args: SelectSubset<T, UsageRecordFindUniqueArgs<ExtArgs>>): Prisma__UsageRecordClient<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsageRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageRecordFindUniqueOrThrowArgs} args - Arguments to find a UsageRecord
     * @example
     * // Get one UsageRecord
     * const usageRecord = await prisma.usageRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageRecordClient<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRecordFindFirstArgs} args - Arguments to find a UsageRecord
     * @example
     * // Get one UsageRecord
     * const usageRecord = await prisma.usageRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageRecordFindFirstArgs>(args?: SelectSubset<T, UsageRecordFindFirstArgs<ExtArgs>>): Prisma__UsageRecordClient<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRecordFindFirstOrThrowArgs} args - Arguments to find a UsageRecord
     * @example
     * // Get one UsageRecord
     * const usageRecord = await prisma.usageRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageRecordClient<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsageRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageRecords
     * const usageRecords = await prisma.usageRecord.findMany()
     * 
     * // Get first 10 UsageRecords
     * const usageRecords = await prisma.usageRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageRecordWithIdOnly = await prisma.usageRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageRecordFindManyArgs>(args?: SelectSubset<T, UsageRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsageRecord.
     * @param {UsageRecordCreateArgs} args - Arguments to create a UsageRecord.
     * @example
     * // Create one UsageRecord
     * const UsageRecord = await prisma.usageRecord.create({
     *   data: {
     *     // ... data to create a UsageRecord
     *   }
     * })
     * 
     */
    create<T extends UsageRecordCreateArgs>(args: SelectSubset<T, UsageRecordCreateArgs<ExtArgs>>): Prisma__UsageRecordClient<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsageRecords.
     * @param {UsageRecordCreateManyArgs} args - Arguments to create many UsageRecords.
     * @example
     * // Create many UsageRecords
     * const usageRecord = await prisma.usageRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageRecordCreateManyArgs>(args?: SelectSubset<T, UsageRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageRecords and returns the data saved in the database.
     * @param {UsageRecordCreateManyAndReturnArgs} args - Arguments to create many UsageRecords.
     * @example
     * // Create many UsageRecords
     * const usageRecord = await prisma.usageRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageRecords and only return the `id`
     * const usageRecordWithIdOnly = await prisma.usageRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsageRecord.
     * @param {UsageRecordDeleteArgs} args - Arguments to delete one UsageRecord.
     * @example
     * // Delete one UsageRecord
     * const UsageRecord = await prisma.usageRecord.delete({
     *   where: {
     *     // ... filter to delete one UsageRecord
     *   }
     * })
     * 
     */
    delete<T extends UsageRecordDeleteArgs>(args: SelectSubset<T, UsageRecordDeleteArgs<ExtArgs>>): Prisma__UsageRecordClient<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsageRecord.
     * @param {UsageRecordUpdateArgs} args - Arguments to update one UsageRecord.
     * @example
     * // Update one UsageRecord
     * const usageRecord = await prisma.usageRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageRecordUpdateArgs>(args: SelectSubset<T, UsageRecordUpdateArgs<ExtArgs>>): Prisma__UsageRecordClient<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsageRecords.
     * @param {UsageRecordDeleteManyArgs} args - Arguments to filter UsageRecords to delete.
     * @example
     * // Delete a few UsageRecords
     * const { count } = await prisma.usageRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageRecordDeleteManyArgs>(args?: SelectSubset<T, UsageRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageRecords
     * const usageRecord = await prisma.usageRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageRecordUpdateManyArgs>(args: SelectSubset<T, UsageRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageRecords and returns the data updated in the database.
     * @param {UsageRecordUpdateManyAndReturnArgs} args - Arguments to update many UsageRecords.
     * @example
     * // Update many UsageRecords
     * const usageRecord = await prisma.usageRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageRecords and only return the `id`
     * const usageRecordWithIdOnly = await prisma.usageRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsageRecord.
     * @param {UsageRecordUpsertArgs} args - Arguments to update or create a UsageRecord.
     * @example
     * // Update or create a UsageRecord
     * const usageRecord = await prisma.usageRecord.upsert({
     *   create: {
     *     // ... data to create a UsageRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageRecord we want to update
     *   }
     * })
     */
    upsert<T extends UsageRecordUpsertArgs>(args: SelectSubset<T, UsageRecordUpsertArgs<ExtArgs>>): Prisma__UsageRecordClient<$Result.GetResult<Prisma.$UsageRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsageRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRecordCountArgs} args - Arguments to filter UsageRecords to count.
     * @example
     * // Count the number of UsageRecords
     * const count = await prisma.usageRecord.count({
     *   where: {
     *     // ... the filter for the UsageRecords we want to count
     *   }
     * })
    **/
    count<T extends UsageRecordCountArgs>(
      args?: Subset<T, UsageRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageRecordAggregateArgs>(args: Subset<T, UsageRecordAggregateArgs>): Prisma.PrismaPromise<GetUsageRecordAggregateType<T>>

    /**
     * Group by UsageRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageRecordGroupByArgs['orderBy'] }
        : { orderBy?: UsageRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageRecord model
   */
  readonly fields: UsageRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageRecord model
   */
  interface UsageRecordFieldRefs {
    readonly id: FieldRef<"UsageRecord", 'String'>
    readonly tenantId: FieldRef<"UsageRecord", 'String'>
    readonly metric: FieldRef<"UsageRecord", 'UsageMetric'>
    readonly quantity: FieldRef<"UsageRecord", 'Int'>
    readonly periodStart: FieldRef<"UsageRecord", 'DateTime'>
    readonly periodEnd: FieldRef<"UsageRecord", 'DateTime'>
    readonly stripeUsageRecordId: FieldRef<"UsageRecord", 'String'>
    readonly createdAt: FieldRef<"UsageRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"UsageRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageRecord findUnique
   */
  export type UsageRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * Filter, which UsageRecord to fetch.
     */
    where: UsageRecordWhereUniqueInput
  }

  /**
   * UsageRecord findUniqueOrThrow
   */
  export type UsageRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * Filter, which UsageRecord to fetch.
     */
    where: UsageRecordWhereUniqueInput
  }

  /**
   * UsageRecord findFirst
   */
  export type UsageRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * Filter, which UsageRecord to fetch.
     */
    where?: UsageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageRecords to fetch.
     */
    orderBy?: UsageRecordOrderByWithRelationInput | UsageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageRecords.
     */
    cursor?: UsageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageRecords.
     */
    distinct?: UsageRecordScalarFieldEnum | UsageRecordScalarFieldEnum[]
  }

  /**
   * UsageRecord findFirstOrThrow
   */
  export type UsageRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * Filter, which UsageRecord to fetch.
     */
    where?: UsageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageRecords to fetch.
     */
    orderBy?: UsageRecordOrderByWithRelationInput | UsageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageRecords.
     */
    cursor?: UsageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageRecords.
     */
    distinct?: UsageRecordScalarFieldEnum | UsageRecordScalarFieldEnum[]
  }

  /**
   * UsageRecord findMany
   */
  export type UsageRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * Filter, which UsageRecords to fetch.
     */
    where?: UsageRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageRecords to fetch.
     */
    orderBy?: UsageRecordOrderByWithRelationInput | UsageRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageRecords.
     */
    cursor?: UsageRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageRecords.
     */
    skip?: number
    distinct?: UsageRecordScalarFieldEnum | UsageRecordScalarFieldEnum[]
  }

  /**
   * UsageRecord create
   */
  export type UsageRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a UsageRecord.
     */
    data: XOR<UsageRecordCreateInput, UsageRecordUncheckedCreateInput>
  }

  /**
   * UsageRecord createMany
   */
  export type UsageRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageRecords.
     */
    data: UsageRecordCreateManyInput | UsageRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageRecord createManyAndReturn
   */
  export type UsageRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * The data used to create many UsageRecords.
     */
    data: UsageRecordCreateManyInput | UsageRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageRecord update
   */
  export type UsageRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a UsageRecord.
     */
    data: XOR<UsageRecordUpdateInput, UsageRecordUncheckedUpdateInput>
    /**
     * Choose, which UsageRecord to update.
     */
    where: UsageRecordWhereUniqueInput
  }

  /**
   * UsageRecord updateMany
   */
  export type UsageRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageRecords.
     */
    data: XOR<UsageRecordUpdateManyMutationInput, UsageRecordUncheckedUpdateManyInput>
    /**
     * Filter which UsageRecords to update
     */
    where?: UsageRecordWhereInput
    /**
     * Limit how many UsageRecords to update.
     */
    limit?: number
  }

  /**
   * UsageRecord updateManyAndReturn
   */
  export type UsageRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * The data used to update UsageRecords.
     */
    data: XOR<UsageRecordUpdateManyMutationInput, UsageRecordUncheckedUpdateManyInput>
    /**
     * Filter which UsageRecords to update
     */
    where?: UsageRecordWhereInput
    /**
     * Limit how many UsageRecords to update.
     */
    limit?: number
  }

  /**
   * UsageRecord upsert
   */
  export type UsageRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the UsageRecord to update in case it exists.
     */
    where: UsageRecordWhereUniqueInput
    /**
     * In case the UsageRecord found by the `where` argument doesn't exist, create a new UsageRecord with this data.
     */
    create: XOR<UsageRecordCreateInput, UsageRecordUncheckedCreateInput>
    /**
     * In case the UsageRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageRecordUpdateInput, UsageRecordUncheckedUpdateInput>
  }

  /**
   * UsageRecord delete
   */
  export type UsageRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
    /**
     * Filter which UsageRecord to delete.
     */
    where: UsageRecordWhereUniqueInput
  }

  /**
   * UsageRecord deleteMany
   */
  export type UsageRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageRecords to delete
     */
    where?: UsageRecordWhereInput
    /**
     * Limit how many UsageRecords to delete.
     */
    limit?: number
  }

  /**
   * UsageRecord without action
   */
  export type UsageRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageRecord
     */
    select?: UsageRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageRecord
     */
    omit?: UsageRecordOmit<ExtArgs> | null
  }


  /**
   * Model FeatureFlag
   */

  export type AggregateFeatureFlag = {
    _count: FeatureFlagCountAggregateOutputType | null
    _min: FeatureFlagMinAggregateOutputType | null
    _max: FeatureFlagMaxAggregateOutputType | null
  }

  export type FeatureFlagMinAggregateOutputType = {
    id: string | null
    planId: string | null
    featureKey: string | null
    enabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeatureFlagMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    featureKey: string | null
    enabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeatureFlagCountAggregateOutputType = {
    id: number
    planId: number
    featureKey: number
    enabled: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeatureFlagMinAggregateInputType = {
    id?: true
    planId?: true
    featureKey?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeatureFlagMaxAggregateInputType = {
    id?: true
    planId?: true
    featureKey?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeatureFlagCountAggregateInputType = {
    id?: true
    planId?: true
    featureKey?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeatureFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureFlag to aggregate.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeatureFlags
    **/
    _count?: true | FeatureFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeatureFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeatureFlagMaxAggregateInputType
  }

  export type GetFeatureFlagAggregateType<T extends FeatureFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateFeatureFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeatureFlag[P]>
      : GetScalarType<T[P], AggregateFeatureFlag[P]>
  }




  export type FeatureFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureFlagWhereInput
    orderBy?: FeatureFlagOrderByWithAggregationInput | FeatureFlagOrderByWithAggregationInput[]
    by: FeatureFlagScalarFieldEnum[] | FeatureFlagScalarFieldEnum
    having?: FeatureFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeatureFlagCountAggregateInputType | true
    _min?: FeatureFlagMinAggregateInputType
    _max?: FeatureFlagMaxAggregateInputType
  }

  export type FeatureFlagGroupByOutputType = {
    id: string
    planId: string
    featureKey: string
    enabled: boolean
    createdAt: Date
    updatedAt: Date
    _count: FeatureFlagCountAggregateOutputType | null
    _min: FeatureFlagMinAggregateOutputType | null
    _max: FeatureFlagMaxAggregateOutputType | null
  }

  type GetFeatureFlagGroupByPayload<T extends FeatureFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeatureFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeatureFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeatureFlagGroupByOutputType[P]>
            : GetScalarType<T[P], FeatureFlagGroupByOutputType[P]>
        }
      >
    >


  export type FeatureFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    featureKey?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    featureKey?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    featureKey?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectScalar = {
    id?: boolean
    planId?: boolean
    featureKey?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FeatureFlagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "featureKey" | "enabled" | "createdAt" | "updatedAt", ExtArgs["result"]["featureFlag"]>
  export type FeatureFlagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type FeatureFlagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type FeatureFlagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $FeatureFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeatureFlag"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      featureKey: string
      enabled: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["featureFlag"]>
    composites: {}
  }

  type FeatureFlagGetPayload<S extends boolean | null | undefined | FeatureFlagDefaultArgs> = $Result.GetResult<Prisma.$FeatureFlagPayload, S>

  type FeatureFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeatureFlagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeatureFlagCountAggregateInputType | true
    }

  export interface FeatureFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeatureFlag'], meta: { name: 'FeatureFlag' } }
    /**
     * Find zero or one FeatureFlag that matches the filter.
     * @param {FeatureFlagFindUniqueArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeatureFlagFindUniqueArgs>(args: SelectSubset<T, FeatureFlagFindUniqueArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeatureFlag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeatureFlagFindUniqueOrThrowArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeatureFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, FeatureFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeatureFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindFirstArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeatureFlagFindFirstArgs>(args?: SelectSubset<T, FeatureFlagFindFirstArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeatureFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindFirstOrThrowArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeatureFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, FeatureFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeatureFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeatureFlags
     * const featureFlags = await prisma.featureFlag.findMany()
     * 
     * // Get first 10 FeatureFlags
     * const featureFlags = await prisma.featureFlag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const featureFlagWithIdOnly = await prisma.featureFlag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeatureFlagFindManyArgs>(args?: SelectSubset<T, FeatureFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeatureFlag.
     * @param {FeatureFlagCreateArgs} args - Arguments to create a FeatureFlag.
     * @example
     * // Create one FeatureFlag
     * const FeatureFlag = await prisma.featureFlag.create({
     *   data: {
     *     // ... data to create a FeatureFlag
     *   }
     * })
     * 
     */
    create<T extends FeatureFlagCreateArgs>(args: SelectSubset<T, FeatureFlagCreateArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeatureFlags.
     * @param {FeatureFlagCreateManyArgs} args - Arguments to create many FeatureFlags.
     * @example
     * // Create many FeatureFlags
     * const featureFlag = await prisma.featureFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeatureFlagCreateManyArgs>(args?: SelectSubset<T, FeatureFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeatureFlags and returns the data saved in the database.
     * @param {FeatureFlagCreateManyAndReturnArgs} args - Arguments to create many FeatureFlags.
     * @example
     * // Create many FeatureFlags
     * const featureFlag = await prisma.featureFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeatureFlags and only return the `id`
     * const featureFlagWithIdOnly = await prisma.featureFlag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeatureFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, FeatureFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeatureFlag.
     * @param {FeatureFlagDeleteArgs} args - Arguments to delete one FeatureFlag.
     * @example
     * // Delete one FeatureFlag
     * const FeatureFlag = await prisma.featureFlag.delete({
     *   where: {
     *     // ... filter to delete one FeatureFlag
     *   }
     * })
     * 
     */
    delete<T extends FeatureFlagDeleteArgs>(args: SelectSubset<T, FeatureFlagDeleteArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeatureFlag.
     * @param {FeatureFlagUpdateArgs} args - Arguments to update one FeatureFlag.
     * @example
     * // Update one FeatureFlag
     * const featureFlag = await prisma.featureFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeatureFlagUpdateArgs>(args: SelectSubset<T, FeatureFlagUpdateArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeatureFlags.
     * @param {FeatureFlagDeleteManyArgs} args - Arguments to filter FeatureFlags to delete.
     * @example
     * // Delete a few FeatureFlags
     * const { count } = await prisma.featureFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeatureFlagDeleteManyArgs>(args?: SelectSubset<T, FeatureFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeatureFlags
     * const featureFlag = await prisma.featureFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeatureFlagUpdateManyArgs>(args: SelectSubset<T, FeatureFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeatureFlags and returns the data updated in the database.
     * @param {FeatureFlagUpdateManyAndReturnArgs} args - Arguments to update many FeatureFlags.
     * @example
     * // Update many FeatureFlags
     * const featureFlag = await prisma.featureFlag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeatureFlags and only return the `id`
     * const featureFlagWithIdOnly = await prisma.featureFlag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeatureFlagUpdateManyAndReturnArgs>(args: SelectSubset<T, FeatureFlagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeatureFlag.
     * @param {FeatureFlagUpsertArgs} args - Arguments to update or create a FeatureFlag.
     * @example
     * // Update or create a FeatureFlag
     * const featureFlag = await prisma.featureFlag.upsert({
     *   create: {
     *     // ... data to create a FeatureFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeatureFlag we want to update
     *   }
     * })
     */
    upsert<T extends FeatureFlagUpsertArgs>(args: SelectSubset<T, FeatureFlagUpsertArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagCountArgs} args - Arguments to filter FeatureFlags to count.
     * @example
     * // Count the number of FeatureFlags
     * const count = await prisma.featureFlag.count({
     *   where: {
     *     // ... the filter for the FeatureFlags we want to count
     *   }
     * })
    **/
    count<T extends FeatureFlagCountArgs>(
      args?: Subset<T, FeatureFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeatureFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeatureFlagAggregateArgs>(args: Subset<T, FeatureFlagAggregateArgs>): Prisma.PrismaPromise<GetFeatureFlagAggregateType<T>>

    /**
     * Group by FeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeatureFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeatureFlagGroupByArgs['orderBy'] }
        : { orderBy?: FeatureFlagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeatureFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeatureFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeatureFlag model
   */
  readonly fields: FeatureFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeatureFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeatureFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeatureFlag model
   */
  interface FeatureFlagFieldRefs {
    readonly id: FieldRef<"FeatureFlag", 'String'>
    readonly planId: FieldRef<"FeatureFlag", 'String'>
    readonly featureKey: FieldRef<"FeatureFlag", 'String'>
    readonly enabled: FieldRef<"FeatureFlag", 'Boolean'>
    readonly createdAt: FieldRef<"FeatureFlag", 'DateTime'>
    readonly updatedAt: FieldRef<"FeatureFlag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeatureFlag findUnique
   */
  export type FeatureFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag findUniqueOrThrow
   */
  export type FeatureFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag findFirst
   */
  export type FeatureFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureFlags.
     */
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag findFirstOrThrow
   */
  export type FeatureFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureFlags.
     */
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag findMany
   */
  export type FeatureFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * Filter, which FeatureFlags to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag create
   */
  export type FeatureFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * The data needed to create a FeatureFlag.
     */
    data: XOR<FeatureFlagCreateInput, FeatureFlagUncheckedCreateInput>
  }

  /**
   * FeatureFlag createMany
   */
  export type FeatureFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeatureFlags.
     */
    data: FeatureFlagCreateManyInput | FeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeatureFlag createManyAndReturn
   */
  export type FeatureFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * The data used to create many FeatureFlags.
     */
    data: FeatureFlagCreateManyInput | FeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeatureFlag update
   */
  export type FeatureFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * The data needed to update a FeatureFlag.
     */
    data: XOR<FeatureFlagUpdateInput, FeatureFlagUncheckedUpdateInput>
    /**
     * Choose, which FeatureFlag to update.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag updateMany
   */
  export type FeatureFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeatureFlags.
     */
    data: XOR<FeatureFlagUpdateManyMutationInput, FeatureFlagUncheckedUpdateManyInput>
    /**
     * Filter which FeatureFlags to update
     */
    where?: FeatureFlagWhereInput
    /**
     * Limit how many FeatureFlags to update.
     */
    limit?: number
  }

  /**
   * FeatureFlag updateManyAndReturn
   */
  export type FeatureFlagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * The data used to update FeatureFlags.
     */
    data: XOR<FeatureFlagUpdateManyMutationInput, FeatureFlagUncheckedUpdateManyInput>
    /**
     * Filter which FeatureFlags to update
     */
    where?: FeatureFlagWhereInput
    /**
     * Limit how many FeatureFlags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeatureFlag upsert
   */
  export type FeatureFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * The filter to search for the FeatureFlag to update in case it exists.
     */
    where: FeatureFlagWhereUniqueInput
    /**
     * In case the FeatureFlag found by the `where` argument doesn't exist, create a new FeatureFlag with this data.
     */
    create: XOR<FeatureFlagCreateInput, FeatureFlagUncheckedCreateInput>
    /**
     * In case the FeatureFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeatureFlagUpdateInput, FeatureFlagUncheckedUpdateInput>
  }

  /**
   * FeatureFlag delete
   */
  export type FeatureFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
    /**
     * Filter which FeatureFlag to delete.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag deleteMany
   */
  export type FeatureFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureFlags to delete
     */
    where?: FeatureFlagWhereInput
    /**
     * Limit how many FeatureFlags to delete.
     */
    limit?: number
  }

  /**
   * FeatureFlag without action
   */
  export type FeatureFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureFlag
     */
    omit?: FeatureFlagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureFlagInclude<ExtArgs> | null
  }


  /**
   * Model SubscriptionInvoice
   */

  export type AggregateSubscriptionInvoice = {
    _count: SubscriptionInvoiceCountAggregateOutputType | null
    _avg: SubscriptionInvoiceAvgAggregateOutputType | null
    _sum: SubscriptionInvoiceSumAggregateOutputType | null
    _min: SubscriptionInvoiceMinAggregateOutputType | null
    _max: SubscriptionInvoiceMaxAggregateOutputType | null
  }

  export type SubscriptionInvoiceAvgAggregateOutputType = {
    amountDue: number | null
    amountPaid: number | null
  }

  export type SubscriptionInvoiceSumAggregateOutputType = {
    amountDue: number | null
    amountPaid: number | null
  }

  export type SubscriptionInvoiceMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    stripeInvoiceId: string | null
    amountDue: number | null
    amountPaid: number | null
    currency: string | null
    status: $Enums.InvoiceStatus | null
    periodStart: Date | null
    periodEnd: Date | null
    hostedInvoiceUrl: string | null
    invoicePdf: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionInvoiceMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    stripeInvoiceId: string | null
    amountDue: number | null
    amountPaid: number | null
    currency: string | null
    status: $Enums.InvoiceStatus | null
    periodStart: Date | null
    periodEnd: Date | null
    hostedInvoiceUrl: string | null
    invoicePdf: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionInvoiceCountAggregateOutputType = {
    id: number
    tenantId: number
    stripeInvoiceId: number
    amountDue: number
    amountPaid: number
    currency: number
    status: number
    periodStart: number
    periodEnd: number
    hostedInvoiceUrl: number
    invoicePdf: number
    paidAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionInvoiceAvgAggregateInputType = {
    amountDue?: true
    amountPaid?: true
  }

  export type SubscriptionInvoiceSumAggregateInputType = {
    amountDue?: true
    amountPaid?: true
  }

  export type SubscriptionInvoiceMinAggregateInputType = {
    id?: true
    tenantId?: true
    stripeInvoiceId?: true
    amountDue?: true
    amountPaid?: true
    currency?: true
    status?: true
    periodStart?: true
    periodEnd?: true
    hostedInvoiceUrl?: true
    invoicePdf?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionInvoiceMaxAggregateInputType = {
    id?: true
    tenantId?: true
    stripeInvoiceId?: true
    amountDue?: true
    amountPaid?: true
    currency?: true
    status?: true
    periodStart?: true
    periodEnd?: true
    hostedInvoiceUrl?: true
    invoicePdf?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionInvoiceCountAggregateInputType = {
    id?: true
    tenantId?: true
    stripeInvoiceId?: true
    amountDue?: true
    amountPaid?: true
    currency?: true
    status?: true
    periodStart?: true
    periodEnd?: true
    hostedInvoiceUrl?: true
    invoicePdf?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionInvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionInvoice to aggregate.
     */
    where?: SubscriptionInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionInvoices to fetch.
     */
    orderBy?: SubscriptionInvoiceOrderByWithRelationInput | SubscriptionInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriptionInvoices
    **/
    _count?: true | SubscriptionInvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionInvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionInvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionInvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionInvoiceMaxAggregateInputType
  }

  export type GetSubscriptionInvoiceAggregateType<T extends SubscriptionInvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptionInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptionInvoice[P]>
      : GetScalarType<T[P], AggregateSubscriptionInvoice[P]>
  }




  export type SubscriptionInvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionInvoiceWhereInput
    orderBy?: SubscriptionInvoiceOrderByWithAggregationInput | SubscriptionInvoiceOrderByWithAggregationInput[]
    by: SubscriptionInvoiceScalarFieldEnum[] | SubscriptionInvoiceScalarFieldEnum
    having?: SubscriptionInvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionInvoiceCountAggregateInputType | true
    _avg?: SubscriptionInvoiceAvgAggregateInputType
    _sum?: SubscriptionInvoiceSumAggregateInputType
    _min?: SubscriptionInvoiceMinAggregateInputType
    _max?: SubscriptionInvoiceMaxAggregateInputType
  }

  export type SubscriptionInvoiceGroupByOutputType = {
    id: string
    tenantId: string
    stripeInvoiceId: string
    amountDue: number
    amountPaid: number
    currency: string
    status: $Enums.InvoiceStatus
    periodStart: Date | null
    periodEnd: Date | null
    hostedInvoiceUrl: string | null
    invoicePdf: string | null
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionInvoiceCountAggregateOutputType | null
    _avg: SubscriptionInvoiceAvgAggregateOutputType | null
    _sum: SubscriptionInvoiceSumAggregateOutputType | null
    _min: SubscriptionInvoiceMinAggregateOutputType | null
    _max: SubscriptionInvoiceMaxAggregateOutputType | null
  }

  type GetSubscriptionInvoiceGroupByPayload<T extends SubscriptionInvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionInvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionInvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionInvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionInvoiceGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionInvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    stripeInvoiceId?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    currency?: boolean
    status?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    hostedInvoiceUrl?: boolean
    invoicePdf?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionInvoice"]>

  export type SubscriptionInvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    stripeInvoiceId?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    currency?: boolean
    status?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    hostedInvoiceUrl?: boolean
    invoicePdf?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionInvoice"]>

  export type SubscriptionInvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    stripeInvoiceId?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    currency?: boolean
    status?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    hostedInvoiceUrl?: boolean
    invoicePdf?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptionInvoice"]>

  export type SubscriptionInvoiceSelectScalar = {
    id?: boolean
    tenantId?: boolean
    stripeInvoiceId?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    currency?: boolean
    status?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    hostedInvoiceUrl?: boolean
    invoicePdf?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionInvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "stripeInvoiceId" | "amountDue" | "amountPaid" | "currency" | "status" | "periodStart" | "periodEnd" | "hostedInvoiceUrl" | "invoicePdf" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["subscriptionInvoice"]>
  export type SubscriptionInvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }
  export type SubscriptionInvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }
  export type SubscriptionInvoiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }

  export type $SubscriptionInvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubscriptionInvoice"
    objects: {
      subscription: Prisma.$TenantSubscriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      stripeInvoiceId: string
      amountDue: number
      amountPaid: number
      currency: string
      status: $Enums.InvoiceStatus
      periodStart: Date | null
      periodEnd: Date | null
      hostedInvoiceUrl: string | null
      invoicePdf: string | null
      paidAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscriptionInvoice"]>
    composites: {}
  }

  type SubscriptionInvoiceGetPayload<S extends boolean | null | undefined | SubscriptionInvoiceDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionInvoicePayload, S>

  type SubscriptionInvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionInvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionInvoiceCountAggregateInputType | true
    }

  export interface SubscriptionInvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriptionInvoice'], meta: { name: 'SubscriptionInvoice' } }
    /**
     * Find zero or one SubscriptionInvoice that matches the filter.
     * @param {SubscriptionInvoiceFindUniqueArgs} args - Arguments to find a SubscriptionInvoice
     * @example
     * // Get one SubscriptionInvoice
     * const subscriptionInvoice = await prisma.subscriptionInvoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionInvoiceFindUniqueArgs>(args: SelectSubset<T, SubscriptionInvoiceFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionInvoiceClient<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubscriptionInvoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionInvoiceFindUniqueOrThrowArgs} args - Arguments to find a SubscriptionInvoice
     * @example
     * // Get one SubscriptionInvoice
     * const subscriptionInvoice = await prisma.subscriptionInvoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionInvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionInvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionInvoiceClient<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionInvoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionInvoiceFindFirstArgs} args - Arguments to find a SubscriptionInvoice
     * @example
     * // Get one SubscriptionInvoice
     * const subscriptionInvoice = await prisma.subscriptionInvoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionInvoiceFindFirstArgs>(args?: SelectSubset<T, SubscriptionInvoiceFindFirstArgs<ExtArgs>>): Prisma__SubscriptionInvoiceClient<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubscriptionInvoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionInvoiceFindFirstOrThrowArgs} args - Arguments to find a SubscriptionInvoice
     * @example
     * // Get one SubscriptionInvoice
     * const subscriptionInvoice = await prisma.subscriptionInvoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionInvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionInvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionInvoiceClient<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubscriptionInvoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionInvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriptionInvoices
     * const subscriptionInvoices = await prisma.subscriptionInvoice.findMany()
     * 
     * // Get first 10 SubscriptionInvoices
     * const subscriptionInvoices = await prisma.subscriptionInvoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionInvoiceWithIdOnly = await prisma.subscriptionInvoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionInvoiceFindManyArgs>(args?: SelectSubset<T, SubscriptionInvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubscriptionInvoice.
     * @param {SubscriptionInvoiceCreateArgs} args - Arguments to create a SubscriptionInvoice.
     * @example
     * // Create one SubscriptionInvoice
     * const SubscriptionInvoice = await prisma.subscriptionInvoice.create({
     *   data: {
     *     // ... data to create a SubscriptionInvoice
     *   }
     * })
     * 
     */
    create<T extends SubscriptionInvoiceCreateArgs>(args: SelectSubset<T, SubscriptionInvoiceCreateArgs<ExtArgs>>): Prisma__SubscriptionInvoiceClient<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubscriptionInvoices.
     * @param {SubscriptionInvoiceCreateManyArgs} args - Arguments to create many SubscriptionInvoices.
     * @example
     * // Create many SubscriptionInvoices
     * const subscriptionInvoice = await prisma.subscriptionInvoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionInvoiceCreateManyArgs>(args?: SelectSubset<T, SubscriptionInvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubscriptionInvoices and returns the data saved in the database.
     * @param {SubscriptionInvoiceCreateManyAndReturnArgs} args - Arguments to create many SubscriptionInvoices.
     * @example
     * // Create many SubscriptionInvoices
     * const subscriptionInvoice = await prisma.subscriptionInvoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubscriptionInvoices and only return the `id`
     * const subscriptionInvoiceWithIdOnly = await prisma.subscriptionInvoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionInvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionInvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubscriptionInvoice.
     * @param {SubscriptionInvoiceDeleteArgs} args - Arguments to delete one SubscriptionInvoice.
     * @example
     * // Delete one SubscriptionInvoice
     * const SubscriptionInvoice = await prisma.subscriptionInvoice.delete({
     *   where: {
     *     // ... filter to delete one SubscriptionInvoice
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionInvoiceDeleteArgs>(args: SelectSubset<T, SubscriptionInvoiceDeleteArgs<ExtArgs>>): Prisma__SubscriptionInvoiceClient<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubscriptionInvoice.
     * @param {SubscriptionInvoiceUpdateArgs} args - Arguments to update one SubscriptionInvoice.
     * @example
     * // Update one SubscriptionInvoice
     * const subscriptionInvoice = await prisma.subscriptionInvoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionInvoiceUpdateArgs>(args: SelectSubset<T, SubscriptionInvoiceUpdateArgs<ExtArgs>>): Prisma__SubscriptionInvoiceClient<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubscriptionInvoices.
     * @param {SubscriptionInvoiceDeleteManyArgs} args - Arguments to filter SubscriptionInvoices to delete.
     * @example
     * // Delete a few SubscriptionInvoices
     * const { count } = await prisma.subscriptionInvoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionInvoiceDeleteManyArgs>(args?: SelectSubset<T, SubscriptionInvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionInvoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionInvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriptionInvoices
     * const subscriptionInvoice = await prisma.subscriptionInvoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionInvoiceUpdateManyArgs>(args: SelectSubset<T, SubscriptionInvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriptionInvoices and returns the data updated in the database.
     * @param {SubscriptionInvoiceUpdateManyAndReturnArgs} args - Arguments to update many SubscriptionInvoices.
     * @example
     * // Update many SubscriptionInvoices
     * const subscriptionInvoice = await prisma.subscriptionInvoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubscriptionInvoices and only return the `id`
     * const subscriptionInvoiceWithIdOnly = await prisma.subscriptionInvoice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionInvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionInvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubscriptionInvoice.
     * @param {SubscriptionInvoiceUpsertArgs} args - Arguments to update or create a SubscriptionInvoice.
     * @example
     * // Update or create a SubscriptionInvoice
     * const subscriptionInvoice = await prisma.subscriptionInvoice.upsert({
     *   create: {
     *     // ... data to create a SubscriptionInvoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriptionInvoice we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionInvoiceUpsertArgs>(args: SelectSubset<T, SubscriptionInvoiceUpsertArgs<ExtArgs>>): Prisma__SubscriptionInvoiceClient<$Result.GetResult<Prisma.$SubscriptionInvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubscriptionInvoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionInvoiceCountArgs} args - Arguments to filter SubscriptionInvoices to count.
     * @example
     * // Count the number of SubscriptionInvoices
     * const count = await prisma.subscriptionInvoice.count({
     *   where: {
     *     // ... the filter for the SubscriptionInvoices we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionInvoiceCountArgs>(
      args?: Subset<T, SubscriptionInvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionInvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriptionInvoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionInvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionInvoiceAggregateArgs>(args: Subset<T, SubscriptionInvoiceAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionInvoiceAggregateType<T>>

    /**
     * Group by SubscriptionInvoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionInvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionInvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionInvoiceGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionInvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionInvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriptionInvoice model
   */
  readonly fields: SubscriptionInvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriptionInvoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionInvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends TenantSubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantSubscriptionDefaultArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubscriptionInvoice model
   */
  interface SubscriptionInvoiceFieldRefs {
    readonly id: FieldRef<"SubscriptionInvoice", 'String'>
    readonly tenantId: FieldRef<"SubscriptionInvoice", 'String'>
    readonly stripeInvoiceId: FieldRef<"SubscriptionInvoice", 'String'>
    readonly amountDue: FieldRef<"SubscriptionInvoice", 'Int'>
    readonly amountPaid: FieldRef<"SubscriptionInvoice", 'Int'>
    readonly currency: FieldRef<"SubscriptionInvoice", 'String'>
    readonly status: FieldRef<"SubscriptionInvoice", 'InvoiceStatus'>
    readonly periodStart: FieldRef<"SubscriptionInvoice", 'DateTime'>
    readonly periodEnd: FieldRef<"SubscriptionInvoice", 'DateTime'>
    readonly hostedInvoiceUrl: FieldRef<"SubscriptionInvoice", 'String'>
    readonly invoicePdf: FieldRef<"SubscriptionInvoice", 'String'>
    readonly paidAt: FieldRef<"SubscriptionInvoice", 'DateTime'>
    readonly createdAt: FieldRef<"SubscriptionInvoice", 'DateTime'>
    readonly updatedAt: FieldRef<"SubscriptionInvoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubscriptionInvoice findUnique
   */
  export type SubscriptionInvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionInvoice to fetch.
     */
    where: SubscriptionInvoiceWhereUniqueInput
  }

  /**
   * SubscriptionInvoice findUniqueOrThrow
   */
  export type SubscriptionInvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionInvoice to fetch.
     */
    where: SubscriptionInvoiceWhereUniqueInput
  }

  /**
   * SubscriptionInvoice findFirst
   */
  export type SubscriptionInvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionInvoice to fetch.
     */
    where?: SubscriptionInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionInvoices to fetch.
     */
    orderBy?: SubscriptionInvoiceOrderByWithRelationInput | SubscriptionInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionInvoices.
     */
    cursor?: SubscriptionInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionInvoices.
     */
    distinct?: SubscriptionInvoiceScalarFieldEnum | SubscriptionInvoiceScalarFieldEnum[]
  }

  /**
   * SubscriptionInvoice findFirstOrThrow
   */
  export type SubscriptionInvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionInvoice to fetch.
     */
    where?: SubscriptionInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionInvoices to fetch.
     */
    orderBy?: SubscriptionInvoiceOrderByWithRelationInput | SubscriptionInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriptionInvoices.
     */
    cursor?: SubscriptionInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriptionInvoices.
     */
    distinct?: SubscriptionInvoiceScalarFieldEnum | SubscriptionInvoiceScalarFieldEnum[]
  }

  /**
   * SubscriptionInvoice findMany
   */
  export type SubscriptionInvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which SubscriptionInvoices to fetch.
     */
    where?: SubscriptionInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriptionInvoices to fetch.
     */
    orderBy?: SubscriptionInvoiceOrderByWithRelationInput | SubscriptionInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriptionInvoices.
     */
    cursor?: SubscriptionInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriptionInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriptionInvoices.
     */
    skip?: number
    distinct?: SubscriptionInvoiceScalarFieldEnum | SubscriptionInvoiceScalarFieldEnum[]
  }

  /**
   * SubscriptionInvoice create
   */
  export type SubscriptionInvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscriptionInvoice.
     */
    data: XOR<SubscriptionInvoiceCreateInput, SubscriptionInvoiceUncheckedCreateInput>
  }

  /**
   * SubscriptionInvoice createMany
   */
  export type SubscriptionInvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriptionInvoices.
     */
    data: SubscriptionInvoiceCreateManyInput | SubscriptionInvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubscriptionInvoice createManyAndReturn
   */
  export type SubscriptionInvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many SubscriptionInvoices.
     */
    data: SubscriptionInvoiceCreateManyInput | SubscriptionInvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscriptionInvoice update
   */
  export type SubscriptionInvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscriptionInvoice.
     */
    data: XOR<SubscriptionInvoiceUpdateInput, SubscriptionInvoiceUncheckedUpdateInput>
    /**
     * Choose, which SubscriptionInvoice to update.
     */
    where: SubscriptionInvoiceWhereUniqueInput
  }

  /**
   * SubscriptionInvoice updateMany
   */
  export type SubscriptionInvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriptionInvoices.
     */
    data: XOR<SubscriptionInvoiceUpdateManyMutationInput, SubscriptionInvoiceUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionInvoices to update
     */
    where?: SubscriptionInvoiceWhereInput
    /**
     * Limit how many SubscriptionInvoices to update.
     */
    limit?: number
  }

  /**
   * SubscriptionInvoice updateManyAndReturn
   */
  export type SubscriptionInvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * The data used to update SubscriptionInvoices.
     */
    data: XOR<SubscriptionInvoiceUpdateManyMutationInput, SubscriptionInvoiceUncheckedUpdateManyInput>
    /**
     * Filter which SubscriptionInvoices to update
     */
    where?: SubscriptionInvoiceWhereInput
    /**
     * Limit how many SubscriptionInvoices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubscriptionInvoice upsert
   */
  export type SubscriptionInvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscriptionInvoice to update in case it exists.
     */
    where: SubscriptionInvoiceWhereUniqueInput
    /**
     * In case the SubscriptionInvoice found by the `where` argument doesn't exist, create a new SubscriptionInvoice with this data.
     */
    create: XOR<SubscriptionInvoiceCreateInput, SubscriptionInvoiceUncheckedCreateInput>
    /**
     * In case the SubscriptionInvoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionInvoiceUpdateInput, SubscriptionInvoiceUncheckedUpdateInput>
  }

  /**
   * SubscriptionInvoice delete
   */
  export type SubscriptionInvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
    /**
     * Filter which SubscriptionInvoice to delete.
     */
    where: SubscriptionInvoiceWhereUniqueInput
  }

  /**
   * SubscriptionInvoice deleteMany
   */
  export type SubscriptionInvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriptionInvoices to delete
     */
    where?: SubscriptionInvoiceWhereInput
    /**
     * Limit how many SubscriptionInvoices to delete.
     */
    limit?: number
  }

  /**
   * SubscriptionInvoice without action
   */
  export type SubscriptionInvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionInvoice
     */
    select?: SubscriptionInvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubscriptionInvoice
     */
    omit?: SubscriptionInvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInvoiceInclude<ExtArgs> | null
  }


  /**
   * Model DunningRecord
   */

  export type AggregateDunningRecord = {
    _count: DunningRecordCountAggregateOutputType | null
    _avg: DunningRecordAvgAggregateOutputType | null
    _sum: DunningRecordSumAggregateOutputType | null
    _min: DunningRecordMinAggregateOutputType | null
    _max: DunningRecordMaxAggregateOutputType | null
  }

  export type DunningRecordAvgAggregateOutputType = {
    attemptCount: number | null
  }

  export type DunningRecordSumAggregateOutputType = {
    attemptCount: number | null
  }

  export type DunningRecordMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    attemptCount: number | null
    nextRetryAt: Date | null
    lastFailedAt: Date | null
    status: $Enums.DunningStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DunningRecordMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    attemptCount: number | null
    nextRetryAt: Date | null
    lastFailedAt: Date | null
    status: $Enums.DunningStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DunningRecordCountAggregateOutputType = {
    id: number
    tenantId: number
    attemptCount: number
    nextRetryAt: number
    lastFailedAt: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DunningRecordAvgAggregateInputType = {
    attemptCount?: true
  }

  export type DunningRecordSumAggregateInputType = {
    attemptCount?: true
  }

  export type DunningRecordMinAggregateInputType = {
    id?: true
    tenantId?: true
    attemptCount?: true
    nextRetryAt?: true
    lastFailedAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DunningRecordMaxAggregateInputType = {
    id?: true
    tenantId?: true
    attemptCount?: true
    nextRetryAt?: true
    lastFailedAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DunningRecordCountAggregateInputType = {
    id?: true
    tenantId?: true
    attemptCount?: true
    nextRetryAt?: true
    lastFailedAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DunningRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DunningRecord to aggregate.
     */
    where?: DunningRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DunningRecords to fetch.
     */
    orderBy?: DunningRecordOrderByWithRelationInput | DunningRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DunningRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DunningRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DunningRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DunningRecords
    **/
    _count?: true | DunningRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DunningRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DunningRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DunningRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DunningRecordMaxAggregateInputType
  }

  export type GetDunningRecordAggregateType<T extends DunningRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateDunningRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDunningRecord[P]>
      : GetScalarType<T[P], AggregateDunningRecord[P]>
  }




  export type DunningRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DunningRecordWhereInput
    orderBy?: DunningRecordOrderByWithAggregationInput | DunningRecordOrderByWithAggregationInput[]
    by: DunningRecordScalarFieldEnum[] | DunningRecordScalarFieldEnum
    having?: DunningRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DunningRecordCountAggregateInputType | true
    _avg?: DunningRecordAvgAggregateInputType
    _sum?: DunningRecordSumAggregateInputType
    _min?: DunningRecordMinAggregateInputType
    _max?: DunningRecordMaxAggregateInputType
  }

  export type DunningRecordGroupByOutputType = {
    id: string
    tenantId: string
    attemptCount: number
    nextRetryAt: Date | null
    lastFailedAt: Date | null
    status: $Enums.DunningStatus
    createdAt: Date
    updatedAt: Date
    _count: DunningRecordCountAggregateOutputType | null
    _avg: DunningRecordAvgAggregateOutputType | null
    _sum: DunningRecordSumAggregateOutputType | null
    _min: DunningRecordMinAggregateOutputType | null
    _max: DunningRecordMaxAggregateOutputType | null
  }

  type GetDunningRecordGroupByPayload<T extends DunningRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DunningRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DunningRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DunningRecordGroupByOutputType[P]>
            : GetScalarType<T[P], DunningRecordGroupByOutputType[P]>
        }
      >
    >


  export type DunningRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    attemptCount?: boolean
    nextRetryAt?: boolean
    lastFailedAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dunningRecord"]>

  export type DunningRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    attemptCount?: boolean
    nextRetryAt?: boolean
    lastFailedAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dunningRecord"]>

  export type DunningRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    attemptCount?: boolean
    nextRetryAt?: boolean
    lastFailedAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dunningRecord"]>

  export type DunningRecordSelectScalar = {
    id?: boolean
    tenantId?: boolean
    attemptCount?: boolean
    nextRetryAt?: boolean
    lastFailedAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DunningRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "attemptCount" | "nextRetryAt" | "lastFailedAt" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["dunningRecord"]>
  export type DunningRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }
  export type DunningRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }
  export type DunningRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | TenantSubscriptionDefaultArgs<ExtArgs>
  }

  export type $DunningRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DunningRecord"
    objects: {
      subscription: Prisma.$TenantSubscriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      attemptCount: number
      nextRetryAt: Date | null
      lastFailedAt: Date | null
      status: $Enums.DunningStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dunningRecord"]>
    composites: {}
  }

  type DunningRecordGetPayload<S extends boolean | null | undefined | DunningRecordDefaultArgs> = $Result.GetResult<Prisma.$DunningRecordPayload, S>

  type DunningRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DunningRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DunningRecordCountAggregateInputType | true
    }

  export interface DunningRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DunningRecord'], meta: { name: 'DunningRecord' } }
    /**
     * Find zero or one DunningRecord that matches the filter.
     * @param {DunningRecordFindUniqueArgs} args - Arguments to find a DunningRecord
     * @example
     * // Get one DunningRecord
     * const dunningRecord = await prisma.dunningRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DunningRecordFindUniqueArgs>(args: SelectSubset<T, DunningRecordFindUniqueArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DunningRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DunningRecordFindUniqueOrThrowArgs} args - Arguments to find a DunningRecord
     * @example
     * // Get one DunningRecord
     * const dunningRecord = await prisma.dunningRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DunningRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, DunningRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DunningRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DunningRecordFindFirstArgs} args - Arguments to find a DunningRecord
     * @example
     * // Get one DunningRecord
     * const dunningRecord = await prisma.dunningRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DunningRecordFindFirstArgs>(args?: SelectSubset<T, DunningRecordFindFirstArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DunningRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DunningRecordFindFirstOrThrowArgs} args - Arguments to find a DunningRecord
     * @example
     * // Get one DunningRecord
     * const dunningRecord = await prisma.dunningRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DunningRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, DunningRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DunningRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DunningRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DunningRecords
     * const dunningRecords = await prisma.dunningRecord.findMany()
     * 
     * // Get first 10 DunningRecords
     * const dunningRecords = await prisma.dunningRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dunningRecordWithIdOnly = await prisma.dunningRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DunningRecordFindManyArgs>(args?: SelectSubset<T, DunningRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DunningRecord.
     * @param {DunningRecordCreateArgs} args - Arguments to create a DunningRecord.
     * @example
     * // Create one DunningRecord
     * const DunningRecord = await prisma.dunningRecord.create({
     *   data: {
     *     // ... data to create a DunningRecord
     *   }
     * })
     * 
     */
    create<T extends DunningRecordCreateArgs>(args: SelectSubset<T, DunningRecordCreateArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DunningRecords.
     * @param {DunningRecordCreateManyArgs} args - Arguments to create many DunningRecords.
     * @example
     * // Create many DunningRecords
     * const dunningRecord = await prisma.dunningRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DunningRecordCreateManyArgs>(args?: SelectSubset<T, DunningRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DunningRecords and returns the data saved in the database.
     * @param {DunningRecordCreateManyAndReturnArgs} args - Arguments to create many DunningRecords.
     * @example
     * // Create many DunningRecords
     * const dunningRecord = await prisma.dunningRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DunningRecords and only return the `id`
     * const dunningRecordWithIdOnly = await prisma.dunningRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DunningRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, DunningRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DunningRecord.
     * @param {DunningRecordDeleteArgs} args - Arguments to delete one DunningRecord.
     * @example
     * // Delete one DunningRecord
     * const DunningRecord = await prisma.dunningRecord.delete({
     *   where: {
     *     // ... filter to delete one DunningRecord
     *   }
     * })
     * 
     */
    delete<T extends DunningRecordDeleteArgs>(args: SelectSubset<T, DunningRecordDeleteArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DunningRecord.
     * @param {DunningRecordUpdateArgs} args - Arguments to update one DunningRecord.
     * @example
     * // Update one DunningRecord
     * const dunningRecord = await prisma.dunningRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DunningRecordUpdateArgs>(args: SelectSubset<T, DunningRecordUpdateArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DunningRecords.
     * @param {DunningRecordDeleteManyArgs} args - Arguments to filter DunningRecords to delete.
     * @example
     * // Delete a few DunningRecords
     * const { count } = await prisma.dunningRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DunningRecordDeleteManyArgs>(args?: SelectSubset<T, DunningRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DunningRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DunningRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DunningRecords
     * const dunningRecord = await prisma.dunningRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DunningRecordUpdateManyArgs>(args: SelectSubset<T, DunningRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DunningRecords and returns the data updated in the database.
     * @param {DunningRecordUpdateManyAndReturnArgs} args - Arguments to update many DunningRecords.
     * @example
     * // Update many DunningRecords
     * const dunningRecord = await prisma.dunningRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DunningRecords and only return the `id`
     * const dunningRecordWithIdOnly = await prisma.dunningRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DunningRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, DunningRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DunningRecord.
     * @param {DunningRecordUpsertArgs} args - Arguments to update or create a DunningRecord.
     * @example
     * // Update or create a DunningRecord
     * const dunningRecord = await prisma.dunningRecord.upsert({
     *   create: {
     *     // ... data to create a DunningRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DunningRecord we want to update
     *   }
     * })
     */
    upsert<T extends DunningRecordUpsertArgs>(args: SelectSubset<T, DunningRecordUpsertArgs<ExtArgs>>): Prisma__DunningRecordClient<$Result.GetResult<Prisma.$DunningRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DunningRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DunningRecordCountArgs} args - Arguments to filter DunningRecords to count.
     * @example
     * // Count the number of DunningRecords
     * const count = await prisma.dunningRecord.count({
     *   where: {
     *     // ... the filter for the DunningRecords we want to count
     *   }
     * })
    **/
    count<T extends DunningRecordCountArgs>(
      args?: Subset<T, DunningRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DunningRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DunningRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DunningRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DunningRecordAggregateArgs>(args: Subset<T, DunningRecordAggregateArgs>): Prisma.PrismaPromise<GetDunningRecordAggregateType<T>>

    /**
     * Group by DunningRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DunningRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DunningRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DunningRecordGroupByArgs['orderBy'] }
        : { orderBy?: DunningRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DunningRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDunningRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DunningRecord model
   */
  readonly fields: DunningRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DunningRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DunningRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends TenantSubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantSubscriptionDefaultArgs<ExtArgs>>): Prisma__TenantSubscriptionClient<$Result.GetResult<Prisma.$TenantSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DunningRecord model
   */
  interface DunningRecordFieldRefs {
    readonly id: FieldRef<"DunningRecord", 'String'>
    readonly tenantId: FieldRef<"DunningRecord", 'String'>
    readonly attemptCount: FieldRef<"DunningRecord", 'Int'>
    readonly nextRetryAt: FieldRef<"DunningRecord", 'DateTime'>
    readonly lastFailedAt: FieldRef<"DunningRecord", 'DateTime'>
    readonly status: FieldRef<"DunningRecord", 'DunningStatus'>
    readonly createdAt: FieldRef<"DunningRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"DunningRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DunningRecord findUnique
   */
  export type DunningRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which DunningRecord to fetch.
     */
    where: DunningRecordWhereUniqueInput
  }

  /**
   * DunningRecord findUniqueOrThrow
   */
  export type DunningRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which DunningRecord to fetch.
     */
    where: DunningRecordWhereUniqueInput
  }

  /**
   * DunningRecord findFirst
   */
  export type DunningRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which DunningRecord to fetch.
     */
    where?: DunningRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DunningRecords to fetch.
     */
    orderBy?: DunningRecordOrderByWithRelationInput | DunningRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DunningRecords.
     */
    cursor?: DunningRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DunningRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DunningRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DunningRecords.
     */
    distinct?: DunningRecordScalarFieldEnum | DunningRecordScalarFieldEnum[]
  }

  /**
   * DunningRecord findFirstOrThrow
   */
  export type DunningRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which DunningRecord to fetch.
     */
    where?: DunningRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DunningRecords to fetch.
     */
    orderBy?: DunningRecordOrderByWithRelationInput | DunningRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DunningRecords.
     */
    cursor?: DunningRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DunningRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DunningRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DunningRecords.
     */
    distinct?: DunningRecordScalarFieldEnum | DunningRecordScalarFieldEnum[]
  }

  /**
   * DunningRecord findMany
   */
  export type DunningRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which DunningRecords to fetch.
     */
    where?: DunningRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DunningRecords to fetch.
     */
    orderBy?: DunningRecordOrderByWithRelationInput | DunningRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DunningRecords.
     */
    cursor?: DunningRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DunningRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DunningRecords.
     */
    skip?: number
    distinct?: DunningRecordScalarFieldEnum | DunningRecordScalarFieldEnum[]
  }

  /**
   * DunningRecord create
   */
  export type DunningRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a DunningRecord.
     */
    data: XOR<DunningRecordCreateInput, DunningRecordUncheckedCreateInput>
  }

  /**
   * DunningRecord createMany
   */
  export type DunningRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DunningRecords.
     */
    data: DunningRecordCreateManyInput | DunningRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DunningRecord createManyAndReturn
   */
  export type DunningRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * The data used to create many DunningRecords.
     */
    data: DunningRecordCreateManyInput | DunningRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DunningRecord update
   */
  export type DunningRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a DunningRecord.
     */
    data: XOR<DunningRecordUpdateInput, DunningRecordUncheckedUpdateInput>
    /**
     * Choose, which DunningRecord to update.
     */
    where: DunningRecordWhereUniqueInput
  }

  /**
   * DunningRecord updateMany
   */
  export type DunningRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DunningRecords.
     */
    data: XOR<DunningRecordUpdateManyMutationInput, DunningRecordUncheckedUpdateManyInput>
    /**
     * Filter which DunningRecords to update
     */
    where?: DunningRecordWhereInput
    /**
     * Limit how many DunningRecords to update.
     */
    limit?: number
  }

  /**
   * DunningRecord updateManyAndReturn
   */
  export type DunningRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * The data used to update DunningRecords.
     */
    data: XOR<DunningRecordUpdateManyMutationInput, DunningRecordUncheckedUpdateManyInput>
    /**
     * Filter which DunningRecords to update
     */
    where?: DunningRecordWhereInput
    /**
     * Limit how many DunningRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DunningRecord upsert
   */
  export type DunningRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the DunningRecord to update in case it exists.
     */
    where: DunningRecordWhereUniqueInput
    /**
     * In case the DunningRecord found by the `where` argument doesn't exist, create a new DunningRecord with this data.
     */
    create: XOR<DunningRecordCreateInput, DunningRecordUncheckedCreateInput>
    /**
     * In case the DunningRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DunningRecordUpdateInput, DunningRecordUncheckedUpdateInput>
  }

  /**
   * DunningRecord delete
   */
  export type DunningRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
    /**
     * Filter which DunningRecord to delete.
     */
    where: DunningRecordWhereUniqueInput
  }

  /**
   * DunningRecord deleteMany
   */
  export type DunningRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DunningRecords to delete
     */
    where?: DunningRecordWhereInput
    /**
     * Limit how many DunningRecords to delete.
     */
    limit?: number
  }

  /**
   * DunningRecord without action
   */
  export type DunningRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DunningRecord
     */
    select?: DunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DunningRecord
     */
    omit?: DunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DunningRecordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlanScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    priceMonthly: 'priceMonthly',
    priceYearly: 'priceYearly',
    currency: 'currency',
    stripeProductId: 'stripeProductId',
    stripePriceMonthlyId: 'stripePriceMonthlyId',
    stripePriceYearlyId: 'stripePriceYearlyId',
    limits: 'limits',
    trialDays: 'trialDays',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const TenantSubscriptionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    planId: 'planId',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripeSubscriptionItemId: 'stripeSubscriptionItemId',
    status: 'status',
    trialEndsAt: 'trialEndsAt',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    scheduledPlanId: 'scheduledPlanId',
    scheduledChangeAt: 'scheduledChangeAt',
    billingCycle: 'billingCycle',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantSubscriptionScalarFieldEnum = (typeof TenantSubscriptionScalarFieldEnum)[keyof typeof TenantSubscriptionScalarFieldEnum]


  export const UsageRecordScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    metric: 'metric',
    quantity: 'quantity',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    stripeUsageRecordId: 'stripeUsageRecordId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsageRecordScalarFieldEnum = (typeof UsageRecordScalarFieldEnum)[keyof typeof UsageRecordScalarFieldEnum]


  export const FeatureFlagScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    featureKey: 'featureKey',
    enabled: 'enabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeatureFlagScalarFieldEnum = (typeof FeatureFlagScalarFieldEnum)[keyof typeof FeatureFlagScalarFieldEnum]


  export const SubscriptionInvoiceScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    stripeInvoiceId: 'stripeInvoiceId',
    amountDue: 'amountDue',
    amountPaid: 'amountPaid',
    currency: 'currency',
    status: 'status',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    hostedInvoiceUrl: 'hostedInvoiceUrl',
    invoicePdf: 'invoicePdf',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionInvoiceScalarFieldEnum = (typeof SubscriptionInvoiceScalarFieldEnum)[keyof typeof SubscriptionInvoiceScalarFieldEnum]


  export const DunningRecordScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    attemptCount: 'attemptCount',
    nextRetryAt: 'nextRetryAt',
    lastFailedAt: 'lastFailedAt',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DunningRecordScalarFieldEnum = (typeof DunningRecordScalarFieldEnum)[keyof typeof DunningRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'UsageMetric'
   */
  export type EnumUsageMetricFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UsageMetric'>
    


  /**
   * Reference to a field of type 'UsageMetric[]'
   */
  export type ListEnumUsageMetricFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UsageMetric[]'>
    


  /**
   * Reference to a field of type 'InvoiceStatus'
   */
  export type EnumInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceStatus'>
    


  /**
   * Reference to a field of type 'InvoiceStatus[]'
   */
  export type ListEnumInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceStatus[]'>
    


  /**
   * Reference to a field of type 'DunningStatus'
   */
  export type EnumDunningStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DunningStatus'>
    


  /**
   * Reference to a field of type 'DunningStatus[]'
   */
  export type ListEnumDunningStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DunningStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: StringFilter<"Plan"> | string
    name?: StringFilter<"Plan"> | string
    description?: StringFilter<"Plan"> | string
    priceMonthly?: IntFilter<"Plan"> | number
    priceYearly?: IntFilter<"Plan"> | number
    currency?: StringFilter<"Plan"> | string
    stripeProductId?: StringNullableFilter<"Plan"> | string | null
    stripePriceMonthlyId?: StringNullableFilter<"Plan"> | string | null
    stripePriceYearlyId?: StringNullableFilter<"Plan"> | string | null
    limits?: JsonFilter<"Plan">
    trialDays?: IntFilter<"Plan"> | number
    isActive?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    subscriptions?: TenantSubscriptionListRelationFilter
    featureFlags?: FeatureFlagListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    currency?: SortOrder
    stripeProductId?: SortOrderInput | SortOrder
    stripePriceMonthlyId?: SortOrderInput | SortOrder
    stripePriceYearlyId?: SortOrderInput | SortOrder
    limits?: SortOrder
    trialDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscriptions?: TenantSubscriptionOrderByRelationAggregateInput
    featureFlags?: FeatureFlagOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    name?: StringFilter<"Plan"> | string
    description?: StringFilter<"Plan"> | string
    priceMonthly?: IntFilter<"Plan"> | number
    priceYearly?: IntFilter<"Plan"> | number
    currency?: StringFilter<"Plan"> | string
    stripeProductId?: StringNullableFilter<"Plan"> | string | null
    stripePriceMonthlyId?: StringNullableFilter<"Plan"> | string | null
    stripePriceYearlyId?: StringNullableFilter<"Plan"> | string | null
    limits?: JsonFilter<"Plan">
    trialDays?: IntFilter<"Plan"> | number
    isActive?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    subscriptions?: TenantSubscriptionListRelationFilter
    featureFlags?: FeatureFlagListRelationFilter
  }, "id">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    currency?: SortOrder
    stripeProductId?: SortOrderInput | SortOrder
    stripePriceMonthlyId?: SortOrderInput | SortOrder
    stripePriceYearlyId?: SortOrderInput | SortOrder
    limits?: SortOrder
    trialDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plan"> | string
    name?: StringWithAggregatesFilter<"Plan"> | string
    description?: StringWithAggregatesFilter<"Plan"> | string
    priceMonthly?: IntWithAggregatesFilter<"Plan"> | number
    priceYearly?: IntWithAggregatesFilter<"Plan"> | number
    currency?: StringWithAggregatesFilter<"Plan"> | string
    stripeProductId?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    stripePriceMonthlyId?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    stripePriceYearlyId?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    limits?: JsonWithAggregatesFilter<"Plan">
    trialDays?: IntWithAggregatesFilter<"Plan"> | number
    isActive?: BoolWithAggregatesFilter<"Plan"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type TenantSubscriptionWhereInput = {
    AND?: TenantSubscriptionWhereInput | TenantSubscriptionWhereInput[]
    OR?: TenantSubscriptionWhereInput[]
    NOT?: TenantSubscriptionWhereInput | TenantSubscriptionWhereInput[]
    id?: StringFilter<"TenantSubscription"> | string
    tenantId?: StringFilter<"TenantSubscription"> | string
    planId?: StringFilter<"TenantSubscription"> | string
    stripeCustomerId?: StringNullableFilter<"TenantSubscription"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"TenantSubscription"> | string | null
    stripeSubscriptionItemId?: StringNullableFilter<"TenantSubscription"> | string | null
    status?: EnumSubscriptionStatusFilter<"TenantSubscription"> | $Enums.SubscriptionStatus
    trialEndsAt?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    currentPeriodStart?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"TenantSubscription"> | boolean
    scheduledPlanId?: StringNullableFilter<"TenantSubscription"> | string | null
    scheduledChangeAt?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    billingCycle?: StringFilter<"TenantSubscription"> | string
    createdAt?: DateTimeFilter<"TenantSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"TenantSubscription"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    invoices?: SubscriptionInvoiceListRelationFilter
    dunning?: XOR<DunningRecordNullableScalarRelationFilter, DunningRecordWhereInput> | null
  }

  export type TenantSubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    planId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripeSubscriptionItemId?: SortOrderInput | SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    currentPeriodStart?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    cancelAtPeriodEnd?: SortOrder
    scheduledPlanId?: SortOrderInput | SortOrder
    scheduledChangeAt?: SortOrderInput | SortOrder
    billingCycle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    plan?: PlanOrderByWithRelationInput
    invoices?: SubscriptionInvoiceOrderByRelationAggregateInput
    dunning?: DunningRecordOrderByWithRelationInput
  }

  export type TenantSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId?: string
    AND?: TenantSubscriptionWhereInput | TenantSubscriptionWhereInput[]
    OR?: TenantSubscriptionWhereInput[]
    NOT?: TenantSubscriptionWhereInput | TenantSubscriptionWhereInput[]
    planId?: StringFilter<"TenantSubscription"> | string
    stripeCustomerId?: StringNullableFilter<"TenantSubscription"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"TenantSubscription"> | string | null
    stripeSubscriptionItemId?: StringNullableFilter<"TenantSubscription"> | string | null
    status?: EnumSubscriptionStatusFilter<"TenantSubscription"> | $Enums.SubscriptionStatus
    trialEndsAt?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    currentPeriodStart?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"TenantSubscription"> | boolean
    scheduledPlanId?: StringNullableFilter<"TenantSubscription"> | string | null
    scheduledChangeAt?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    billingCycle?: StringFilter<"TenantSubscription"> | string
    createdAt?: DateTimeFilter<"TenantSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"TenantSubscription"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    invoices?: SubscriptionInvoiceListRelationFilter
    dunning?: XOR<DunningRecordNullableScalarRelationFilter, DunningRecordWhereInput> | null
  }, "id" | "tenantId">

  export type TenantSubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    planId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripeSubscriptionItemId?: SortOrderInput | SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    currentPeriodStart?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    cancelAtPeriodEnd?: SortOrder
    scheduledPlanId?: SortOrderInput | SortOrder
    scheduledChangeAt?: SortOrderInput | SortOrder
    billingCycle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantSubscriptionCountOrderByAggregateInput
    _max?: TenantSubscriptionMaxOrderByAggregateInput
    _min?: TenantSubscriptionMinOrderByAggregateInput
  }

  export type TenantSubscriptionScalarWhereWithAggregatesInput = {
    AND?: TenantSubscriptionScalarWhereWithAggregatesInput | TenantSubscriptionScalarWhereWithAggregatesInput[]
    OR?: TenantSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: TenantSubscriptionScalarWhereWithAggregatesInput | TenantSubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantSubscription"> | string
    tenantId?: StringWithAggregatesFilter<"TenantSubscription"> | string
    planId?: StringWithAggregatesFilter<"TenantSubscription"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"TenantSubscription"> | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"TenantSubscription"> | string | null
    stripeSubscriptionItemId?: StringNullableWithAggregatesFilter<"TenantSubscription"> | string | null
    status?: EnumSubscriptionStatusWithAggregatesFilter<"TenantSubscription"> | $Enums.SubscriptionStatus
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"TenantSubscription"> | Date | string | null
    currentPeriodStart?: DateTimeNullableWithAggregatesFilter<"TenantSubscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableWithAggregatesFilter<"TenantSubscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolWithAggregatesFilter<"TenantSubscription"> | boolean
    scheduledPlanId?: StringNullableWithAggregatesFilter<"TenantSubscription"> | string | null
    scheduledChangeAt?: DateTimeNullableWithAggregatesFilter<"TenantSubscription"> | Date | string | null
    billingCycle?: StringWithAggregatesFilter<"TenantSubscription"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TenantSubscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TenantSubscription"> | Date | string
  }

  export type UsageRecordWhereInput = {
    AND?: UsageRecordWhereInput | UsageRecordWhereInput[]
    OR?: UsageRecordWhereInput[]
    NOT?: UsageRecordWhereInput | UsageRecordWhereInput[]
    id?: StringFilter<"UsageRecord"> | string
    tenantId?: StringFilter<"UsageRecord"> | string
    metric?: EnumUsageMetricFilter<"UsageRecord"> | $Enums.UsageMetric
    quantity?: IntFilter<"UsageRecord"> | number
    periodStart?: DateTimeFilter<"UsageRecord"> | Date | string
    periodEnd?: DateTimeFilter<"UsageRecord"> | Date | string
    stripeUsageRecordId?: StringNullableFilter<"UsageRecord"> | string | null
    createdAt?: DateTimeFilter<"UsageRecord"> | Date | string
    updatedAt?: DateTimeFilter<"UsageRecord"> | Date | string
  }

  export type UsageRecordOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metric?: SortOrder
    quantity?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    stripeUsageRecordId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_metric_periodStart?: UsageRecordTenantIdMetricPeriodStartCompoundUniqueInput
    AND?: UsageRecordWhereInput | UsageRecordWhereInput[]
    OR?: UsageRecordWhereInput[]
    NOT?: UsageRecordWhereInput | UsageRecordWhereInput[]
    tenantId?: StringFilter<"UsageRecord"> | string
    metric?: EnumUsageMetricFilter<"UsageRecord"> | $Enums.UsageMetric
    quantity?: IntFilter<"UsageRecord"> | number
    periodStart?: DateTimeFilter<"UsageRecord"> | Date | string
    periodEnd?: DateTimeFilter<"UsageRecord"> | Date | string
    stripeUsageRecordId?: StringNullableFilter<"UsageRecord"> | string | null
    createdAt?: DateTimeFilter<"UsageRecord"> | Date | string
    updatedAt?: DateTimeFilter<"UsageRecord"> | Date | string
  }, "id" | "tenantId_metric_periodStart">

  export type UsageRecordOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metric?: SortOrder
    quantity?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    stripeUsageRecordId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsageRecordCountOrderByAggregateInput
    _avg?: UsageRecordAvgOrderByAggregateInput
    _max?: UsageRecordMaxOrderByAggregateInput
    _min?: UsageRecordMinOrderByAggregateInput
    _sum?: UsageRecordSumOrderByAggregateInput
  }

  export type UsageRecordScalarWhereWithAggregatesInput = {
    AND?: UsageRecordScalarWhereWithAggregatesInput | UsageRecordScalarWhereWithAggregatesInput[]
    OR?: UsageRecordScalarWhereWithAggregatesInput[]
    NOT?: UsageRecordScalarWhereWithAggregatesInput | UsageRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageRecord"> | string
    tenantId?: StringWithAggregatesFilter<"UsageRecord"> | string
    metric?: EnumUsageMetricWithAggregatesFilter<"UsageRecord"> | $Enums.UsageMetric
    quantity?: IntWithAggregatesFilter<"UsageRecord"> | number
    periodStart?: DateTimeWithAggregatesFilter<"UsageRecord"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"UsageRecord"> | Date | string
    stripeUsageRecordId?: StringNullableWithAggregatesFilter<"UsageRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UsageRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UsageRecord"> | Date | string
  }

  export type FeatureFlagWhereInput = {
    AND?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    OR?: FeatureFlagWhereInput[]
    NOT?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    id?: StringFilter<"FeatureFlag"> | string
    planId?: StringFilter<"FeatureFlag"> | string
    featureKey?: StringFilter<"FeatureFlag"> | string
    enabled?: BoolFilter<"FeatureFlag"> | boolean
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }

  export type FeatureFlagOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    featureKey?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    plan?: PlanOrderByWithRelationInput
  }

  export type FeatureFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    planId_featureKey?: FeatureFlagPlanIdFeatureKeyCompoundUniqueInput
    AND?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    OR?: FeatureFlagWhereInput[]
    NOT?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    planId?: StringFilter<"FeatureFlag"> | string
    featureKey?: StringFilter<"FeatureFlag"> | string
    enabled?: BoolFilter<"FeatureFlag"> | boolean
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }, "id" | "planId_featureKey">

  export type FeatureFlagOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    featureKey?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeatureFlagCountOrderByAggregateInput
    _max?: FeatureFlagMaxOrderByAggregateInput
    _min?: FeatureFlagMinOrderByAggregateInput
  }

  export type FeatureFlagScalarWhereWithAggregatesInput = {
    AND?: FeatureFlagScalarWhereWithAggregatesInput | FeatureFlagScalarWhereWithAggregatesInput[]
    OR?: FeatureFlagScalarWhereWithAggregatesInput[]
    NOT?: FeatureFlagScalarWhereWithAggregatesInput | FeatureFlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeatureFlag"> | string
    planId?: StringWithAggregatesFilter<"FeatureFlag"> | string
    featureKey?: StringWithAggregatesFilter<"FeatureFlag"> | string
    enabled?: BoolWithAggregatesFilter<"FeatureFlag"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
  }

  export type SubscriptionInvoiceWhereInput = {
    AND?: SubscriptionInvoiceWhereInput | SubscriptionInvoiceWhereInput[]
    OR?: SubscriptionInvoiceWhereInput[]
    NOT?: SubscriptionInvoiceWhereInput | SubscriptionInvoiceWhereInput[]
    id?: StringFilter<"SubscriptionInvoice"> | string
    tenantId?: StringFilter<"SubscriptionInvoice"> | string
    stripeInvoiceId?: StringFilter<"SubscriptionInvoice"> | string
    amountDue?: IntFilter<"SubscriptionInvoice"> | number
    amountPaid?: IntFilter<"SubscriptionInvoice"> | number
    currency?: StringFilter<"SubscriptionInvoice"> | string
    status?: EnumInvoiceStatusFilter<"SubscriptionInvoice"> | $Enums.InvoiceStatus
    periodStart?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    periodEnd?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    hostedInvoiceUrl?: StringNullableFilter<"SubscriptionInvoice"> | string | null
    invoicePdf?: StringNullableFilter<"SubscriptionInvoice"> | string | null
    paidAt?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionInvoice"> | Date | string
    updatedAt?: DateTimeFilter<"SubscriptionInvoice"> | Date | string
    subscription?: XOR<TenantSubscriptionScalarRelationFilter, TenantSubscriptionWhereInput>
  }

  export type SubscriptionInvoiceOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    stripeInvoiceId?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    periodStart?: SortOrderInput | SortOrder
    periodEnd?: SortOrderInput | SortOrder
    hostedInvoiceUrl?: SortOrderInput | SortOrder
    invoicePdf?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscription?: TenantSubscriptionOrderByWithRelationInput
  }

  export type SubscriptionInvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stripeInvoiceId?: string
    AND?: SubscriptionInvoiceWhereInput | SubscriptionInvoiceWhereInput[]
    OR?: SubscriptionInvoiceWhereInput[]
    NOT?: SubscriptionInvoiceWhereInput | SubscriptionInvoiceWhereInput[]
    tenantId?: StringFilter<"SubscriptionInvoice"> | string
    amountDue?: IntFilter<"SubscriptionInvoice"> | number
    amountPaid?: IntFilter<"SubscriptionInvoice"> | number
    currency?: StringFilter<"SubscriptionInvoice"> | string
    status?: EnumInvoiceStatusFilter<"SubscriptionInvoice"> | $Enums.InvoiceStatus
    periodStart?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    periodEnd?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    hostedInvoiceUrl?: StringNullableFilter<"SubscriptionInvoice"> | string | null
    invoicePdf?: StringNullableFilter<"SubscriptionInvoice"> | string | null
    paidAt?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionInvoice"> | Date | string
    updatedAt?: DateTimeFilter<"SubscriptionInvoice"> | Date | string
    subscription?: XOR<TenantSubscriptionScalarRelationFilter, TenantSubscriptionWhereInput>
  }, "id" | "stripeInvoiceId">

  export type SubscriptionInvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    stripeInvoiceId?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    periodStart?: SortOrderInput | SortOrder
    periodEnd?: SortOrderInput | SortOrder
    hostedInvoiceUrl?: SortOrderInput | SortOrder
    invoicePdf?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionInvoiceCountOrderByAggregateInput
    _avg?: SubscriptionInvoiceAvgOrderByAggregateInput
    _max?: SubscriptionInvoiceMaxOrderByAggregateInput
    _min?: SubscriptionInvoiceMinOrderByAggregateInput
    _sum?: SubscriptionInvoiceSumOrderByAggregateInput
  }

  export type SubscriptionInvoiceScalarWhereWithAggregatesInput = {
    AND?: SubscriptionInvoiceScalarWhereWithAggregatesInput | SubscriptionInvoiceScalarWhereWithAggregatesInput[]
    OR?: SubscriptionInvoiceScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionInvoiceScalarWhereWithAggregatesInput | SubscriptionInvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubscriptionInvoice"> | string
    tenantId?: StringWithAggregatesFilter<"SubscriptionInvoice"> | string
    stripeInvoiceId?: StringWithAggregatesFilter<"SubscriptionInvoice"> | string
    amountDue?: IntWithAggregatesFilter<"SubscriptionInvoice"> | number
    amountPaid?: IntWithAggregatesFilter<"SubscriptionInvoice"> | number
    currency?: StringWithAggregatesFilter<"SubscriptionInvoice"> | string
    status?: EnumInvoiceStatusWithAggregatesFilter<"SubscriptionInvoice"> | $Enums.InvoiceStatus
    periodStart?: DateTimeNullableWithAggregatesFilter<"SubscriptionInvoice"> | Date | string | null
    periodEnd?: DateTimeNullableWithAggregatesFilter<"SubscriptionInvoice"> | Date | string | null
    hostedInvoiceUrl?: StringNullableWithAggregatesFilter<"SubscriptionInvoice"> | string | null
    invoicePdf?: StringNullableWithAggregatesFilter<"SubscriptionInvoice"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"SubscriptionInvoice"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SubscriptionInvoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SubscriptionInvoice"> | Date | string
  }

  export type DunningRecordWhereInput = {
    AND?: DunningRecordWhereInput | DunningRecordWhereInput[]
    OR?: DunningRecordWhereInput[]
    NOT?: DunningRecordWhereInput | DunningRecordWhereInput[]
    id?: StringFilter<"DunningRecord"> | string
    tenantId?: StringFilter<"DunningRecord"> | string
    attemptCount?: IntFilter<"DunningRecord"> | number
    nextRetryAt?: DateTimeNullableFilter<"DunningRecord"> | Date | string | null
    lastFailedAt?: DateTimeNullableFilter<"DunningRecord"> | Date | string | null
    status?: EnumDunningStatusFilter<"DunningRecord"> | $Enums.DunningStatus
    createdAt?: DateTimeFilter<"DunningRecord"> | Date | string
    updatedAt?: DateTimeFilter<"DunningRecord"> | Date | string
    subscription?: XOR<TenantSubscriptionScalarRelationFilter, TenantSubscriptionWhereInput>
  }

  export type DunningRecordOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrderInput | SortOrder
    lastFailedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscription?: TenantSubscriptionOrderByWithRelationInput
  }

  export type DunningRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId?: string
    AND?: DunningRecordWhereInput | DunningRecordWhereInput[]
    OR?: DunningRecordWhereInput[]
    NOT?: DunningRecordWhereInput | DunningRecordWhereInput[]
    attemptCount?: IntFilter<"DunningRecord"> | number
    nextRetryAt?: DateTimeNullableFilter<"DunningRecord"> | Date | string | null
    lastFailedAt?: DateTimeNullableFilter<"DunningRecord"> | Date | string | null
    status?: EnumDunningStatusFilter<"DunningRecord"> | $Enums.DunningStatus
    createdAt?: DateTimeFilter<"DunningRecord"> | Date | string
    updatedAt?: DateTimeFilter<"DunningRecord"> | Date | string
    subscription?: XOR<TenantSubscriptionScalarRelationFilter, TenantSubscriptionWhereInput>
  }, "id" | "tenantId">

  export type DunningRecordOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrderInput | SortOrder
    lastFailedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DunningRecordCountOrderByAggregateInput
    _avg?: DunningRecordAvgOrderByAggregateInput
    _max?: DunningRecordMaxOrderByAggregateInput
    _min?: DunningRecordMinOrderByAggregateInput
    _sum?: DunningRecordSumOrderByAggregateInput
  }

  export type DunningRecordScalarWhereWithAggregatesInput = {
    AND?: DunningRecordScalarWhereWithAggregatesInput | DunningRecordScalarWhereWithAggregatesInput[]
    OR?: DunningRecordScalarWhereWithAggregatesInput[]
    NOT?: DunningRecordScalarWhereWithAggregatesInput | DunningRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DunningRecord"> | string
    tenantId?: StringWithAggregatesFilter<"DunningRecord"> | string
    attemptCount?: IntWithAggregatesFilter<"DunningRecord"> | number
    nextRetryAt?: DateTimeNullableWithAggregatesFilter<"DunningRecord"> | Date | string | null
    lastFailedAt?: DateTimeNullableWithAggregatesFilter<"DunningRecord"> | Date | string | null
    status?: EnumDunningStatusWithAggregatesFilter<"DunningRecord"> | $Enums.DunningStatus
    createdAt?: DateTimeWithAggregatesFilter<"DunningRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DunningRecord"> | Date | string
  }

  export type PlanCreateInput = {
    id?: string
    name: string
    description?: string
    priceMonthly?: number
    priceYearly?: number
    currency?: string
    stripeProductId?: string | null
    stripePriceMonthlyId?: string | null
    stripePriceYearlyId?: string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: TenantSubscriptionCreateNestedManyWithoutPlanInput
    featureFlags?: FeatureFlagCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    name: string
    description?: string
    priceMonthly?: number
    priceYearly?: number
    currency?: string
    stripeProductId?: string | null
    stripePriceMonthlyId?: string | null
    stripePriceYearlyId?: string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: TenantSubscriptionUncheckedCreateNestedManyWithoutPlanInput
    featureFlags?: FeatureFlagUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceMonthlyId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceYearlyId?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: TenantSubscriptionUpdateManyWithoutPlanNestedInput
    featureFlags?: FeatureFlagUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceMonthlyId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceYearlyId?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: TenantSubscriptionUncheckedUpdateManyWithoutPlanNestedInput
    featureFlags?: FeatureFlagUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    name: string
    description?: string
    priceMonthly?: number
    priceYearly?: number
    currency?: string
    stripeProductId?: string | null
    stripePriceMonthlyId?: string | null
    stripePriceYearlyId?: string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceMonthlyId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceYearlyId?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceMonthlyId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceYearlyId?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSubscriptionCreateInput = {
    id?: string
    tenantId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutSubscriptionsInput
    invoices?: SubscriptionInvoiceCreateNestedManyWithoutSubscriptionInput
    dunning?: DunningRecordCreateNestedOneWithoutSubscriptionInput
  }

  export type TenantSubscriptionUncheckedCreateInput = {
    id?: string
    tenantId: string
    planId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: SubscriptionInvoiceUncheckedCreateNestedManyWithoutSubscriptionInput
    dunning?: DunningRecordUncheckedCreateNestedOneWithoutSubscriptionInput
  }

  export type TenantSubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutSubscriptionsNestedInput
    invoices?: SubscriptionInvoiceUpdateManyWithoutSubscriptionNestedInput
    dunning?: DunningRecordUpdateOneWithoutSubscriptionNestedInput
  }

  export type TenantSubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: SubscriptionInvoiceUncheckedUpdateManyWithoutSubscriptionNestedInput
    dunning?: DunningRecordUncheckedUpdateOneWithoutSubscriptionNestedInput
  }

  export type TenantSubscriptionCreateManyInput = {
    id?: string
    tenantId: string
    planId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantSubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageRecordCreateInput = {
    id?: string
    tenantId: string
    metric: $Enums.UsageMetric
    quantity?: number
    periodStart: Date | string
    periodEnd: Date | string
    stripeUsageRecordId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageRecordUncheckedCreateInput = {
    id?: string
    tenantId: string
    metric: $Enums.UsageMetric
    quantity?: number
    periodStart: Date | string
    periodEnd: Date | string
    stripeUsageRecordId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    metric?: EnumUsageMetricFieldUpdateOperationsInput | $Enums.UsageMetric
    quantity?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeUsageRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    metric?: EnumUsageMetricFieldUpdateOperationsInput | $Enums.UsageMetric
    quantity?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeUsageRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageRecordCreateManyInput = {
    id?: string
    tenantId: string
    metric: $Enums.UsageMetric
    quantity?: number
    periodStart: Date | string
    periodEnd: Date | string
    stripeUsageRecordId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    metric?: EnumUsageMetricFieldUpdateOperationsInput | $Enums.UsageMetric
    quantity?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeUsageRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    metric?: EnumUsageMetricFieldUpdateOperationsInput | $Enums.UsageMetric
    quantity?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeUsageRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagCreateInput = {
    id?: string
    featureKey: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutFeatureFlagsInput
  }

  export type FeatureFlagUncheckedCreateInput = {
    id?: string
    planId: string
    featureKey: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutFeatureFlagsNestedInput
  }

  export type FeatureFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagCreateManyInput = {
    id?: string
    planId: string
    featureKey: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionInvoiceCreateInput = {
    id?: string
    stripeInvoiceId: string
    amountDue?: number
    amountPaid?: number
    currency?: string
    status?: $Enums.InvoiceStatus
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    hostedInvoiceUrl?: string | null
    invoicePdf?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription: TenantSubscriptionCreateNestedOneWithoutInvoicesInput
  }

  export type SubscriptionInvoiceUncheckedCreateInput = {
    id?: string
    tenantId: string
    stripeInvoiceId: string
    amountDue?: number
    amountPaid?: number
    currency?: string
    status?: $Enums.InvoiceStatus
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    hostedInvoiceUrl?: string | null
    invoicePdf?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionInvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeInvoiceId?: StringFieldUpdateOperationsInput | string
    amountDue?: IntFieldUpdateOperationsInput | number
    amountPaid?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostedInvoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePdf?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: TenantSubscriptionUpdateOneRequiredWithoutInvoicesNestedInput
  }

  export type SubscriptionInvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeInvoiceId?: StringFieldUpdateOperationsInput | string
    amountDue?: IntFieldUpdateOperationsInput | number
    amountPaid?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostedInvoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePdf?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionInvoiceCreateManyInput = {
    id?: string
    tenantId: string
    stripeInvoiceId: string
    amountDue?: number
    amountPaid?: number
    currency?: string
    status?: $Enums.InvoiceStatus
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    hostedInvoiceUrl?: string | null
    invoicePdf?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionInvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeInvoiceId?: StringFieldUpdateOperationsInput | string
    amountDue?: IntFieldUpdateOperationsInput | number
    amountPaid?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostedInvoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePdf?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionInvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeInvoiceId?: StringFieldUpdateOperationsInput | string
    amountDue?: IntFieldUpdateOperationsInput | number
    amountPaid?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostedInvoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePdf?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DunningRecordCreateInput = {
    id?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastFailedAt?: Date | string | null
    status?: $Enums.DunningStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription: TenantSubscriptionCreateNestedOneWithoutDunningInput
  }

  export type DunningRecordUncheckedCreateInput = {
    id?: string
    tenantId: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastFailedAt?: Date | string | null
    status?: $Enums.DunningStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DunningRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumDunningStatusFieldUpdateOperationsInput | $Enums.DunningStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: TenantSubscriptionUpdateOneRequiredWithoutDunningNestedInput
  }

  export type DunningRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumDunningStatusFieldUpdateOperationsInput | $Enums.DunningStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DunningRecordCreateManyInput = {
    id?: string
    tenantId: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastFailedAt?: Date | string | null
    status?: $Enums.DunningStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DunningRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumDunningStatusFieldUpdateOperationsInput | $Enums.DunningStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DunningRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumDunningStatusFieldUpdateOperationsInput | $Enums.DunningStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TenantSubscriptionListRelationFilter = {
    every?: TenantSubscriptionWhereInput
    some?: TenantSubscriptionWhereInput
    none?: TenantSubscriptionWhereInput
  }

  export type FeatureFlagListRelationFilter = {
    every?: FeatureFlagWhereInput
    some?: FeatureFlagWhereInput
    none?: FeatureFlagWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TenantSubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeatureFlagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    currency?: SortOrder
    stripeProductId?: SortOrder
    stripePriceMonthlyId?: SortOrder
    stripePriceYearlyId?: SortOrder
    limits?: SortOrder
    trialDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    trialDays?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    currency?: SortOrder
    stripeProductId?: SortOrder
    stripePriceMonthlyId?: SortOrder
    stripePriceYearlyId?: SortOrder
    trialDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    currency?: SortOrder
    stripeProductId?: SortOrder
    stripePriceMonthlyId?: SortOrder
    stripePriceYearlyId?: SortOrder
    trialDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    trialDays?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type SubscriptionInvoiceListRelationFilter = {
    every?: SubscriptionInvoiceWhereInput
    some?: SubscriptionInvoiceWhereInput
    none?: SubscriptionInvoiceWhereInput
  }

  export type DunningRecordNullableScalarRelationFilter = {
    is?: DunningRecordWhereInput | null
    isNot?: DunningRecordWhereInput | null
  }

  export type SubscriptionInvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantSubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    planId?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeSubscriptionItemId?: SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    scheduledPlanId?: SortOrder
    scheduledChangeAt?: SortOrder
    billingCycle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantSubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    planId?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeSubscriptionItemId?: SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    scheduledPlanId?: SortOrder
    scheduledChangeAt?: SortOrder
    billingCycle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantSubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    planId?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripeSubscriptionItemId?: SortOrder
    status?: SortOrder
    trialEndsAt?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    scheduledPlanId?: SortOrder
    scheduledChangeAt?: SortOrder
    billingCycle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumUsageMetricFilter<$PrismaModel = never> = {
    equals?: $Enums.UsageMetric | EnumUsageMetricFieldRefInput<$PrismaModel>
    in?: $Enums.UsageMetric[] | ListEnumUsageMetricFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsageMetric[] | ListEnumUsageMetricFieldRefInput<$PrismaModel>
    not?: NestedEnumUsageMetricFilter<$PrismaModel> | $Enums.UsageMetric
  }

  export type UsageRecordTenantIdMetricPeriodStartCompoundUniqueInput = {
    tenantId: string
    metric: $Enums.UsageMetric
    periodStart: Date | string
  }

  export type UsageRecordCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metric?: SortOrder
    quantity?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    stripeUsageRecordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageRecordAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type UsageRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metric?: SortOrder
    quantity?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    stripeUsageRecordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageRecordMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    metric?: SortOrder
    quantity?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    stripeUsageRecordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageRecordSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type EnumUsageMetricWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UsageMetric | EnumUsageMetricFieldRefInput<$PrismaModel>
    in?: $Enums.UsageMetric[] | ListEnumUsageMetricFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsageMetric[] | ListEnumUsageMetricFieldRefInput<$PrismaModel>
    not?: NestedEnumUsageMetricWithAggregatesFilter<$PrismaModel> | $Enums.UsageMetric
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUsageMetricFilter<$PrismaModel>
    _max?: NestedEnumUsageMetricFilter<$PrismaModel>
  }

  export type FeatureFlagPlanIdFeatureKeyCompoundUniqueInput = {
    planId: string
    featureKey: string
  }

  export type FeatureFlagCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    featureKey?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    featureKey?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    featureKey?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusFilter<$PrismaModel> | $Enums.InvoiceStatus
  }

  export type TenantSubscriptionScalarRelationFilter = {
    is?: TenantSubscriptionWhereInput
    isNot?: TenantSubscriptionWhereInput
  }

  export type SubscriptionInvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    stripeInvoiceId?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    hostedInvoiceUrl?: SortOrder
    invoicePdf?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionInvoiceAvgOrderByAggregateInput = {
    amountDue?: SortOrder
    amountPaid?: SortOrder
  }

  export type SubscriptionInvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    stripeInvoiceId?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    hostedInvoiceUrl?: SortOrder
    invoicePdf?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionInvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    stripeInvoiceId?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    hostedInvoiceUrl?: SortOrder
    invoicePdf?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionInvoiceSumOrderByAggregateInput = {
    amountDue?: SortOrder
    amountPaid?: SortOrder
  }

  export type EnumInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumInvoiceStatusFilter<$PrismaModel>
  }

  export type EnumDunningStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DunningStatus | EnumDunningStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DunningStatus[] | ListEnumDunningStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DunningStatus[] | ListEnumDunningStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDunningStatusFilter<$PrismaModel> | $Enums.DunningStatus
  }

  export type DunningRecordCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrder
    lastFailedAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DunningRecordAvgOrderByAggregateInput = {
    attemptCount?: SortOrder
  }

  export type DunningRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrder
    lastFailedAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DunningRecordMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrder
    lastFailedAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DunningRecordSumOrderByAggregateInput = {
    attemptCount?: SortOrder
  }

  export type EnumDunningStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DunningStatus | EnumDunningStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DunningStatus[] | ListEnumDunningStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DunningStatus[] | ListEnumDunningStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDunningStatusWithAggregatesFilter<$PrismaModel> | $Enums.DunningStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDunningStatusFilter<$PrismaModel>
    _max?: NestedEnumDunningStatusFilter<$PrismaModel>
  }

  export type TenantSubscriptionCreateNestedManyWithoutPlanInput = {
    create?: XOR<TenantSubscriptionCreateWithoutPlanInput, TenantSubscriptionUncheckedCreateWithoutPlanInput> | TenantSubscriptionCreateWithoutPlanInput[] | TenantSubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TenantSubscriptionCreateOrConnectWithoutPlanInput | TenantSubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: TenantSubscriptionCreateManyPlanInputEnvelope
    connect?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
  }

  export type FeatureFlagCreateNestedManyWithoutPlanInput = {
    create?: XOR<FeatureFlagCreateWithoutPlanInput, FeatureFlagUncheckedCreateWithoutPlanInput> | FeatureFlagCreateWithoutPlanInput[] | FeatureFlagUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: FeatureFlagCreateOrConnectWithoutPlanInput | FeatureFlagCreateOrConnectWithoutPlanInput[]
    createMany?: FeatureFlagCreateManyPlanInputEnvelope
    connect?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
  }

  export type TenantSubscriptionUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<TenantSubscriptionCreateWithoutPlanInput, TenantSubscriptionUncheckedCreateWithoutPlanInput> | TenantSubscriptionCreateWithoutPlanInput[] | TenantSubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TenantSubscriptionCreateOrConnectWithoutPlanInput | TenantSubscriptionCreateOrConnectWithoutPlanInput[]
    createMany?: TenantSubscriptionCreateManyPlanInputEnvelope
    connect?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
  }

  export type FeatureFlagUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<FeatureFlagCreateWithoutPlanInput, FeatureFlagUncheckedCreateWithoutPlanInput> | FeatureFlagCreateWithoutPlanInput[] | FeatureFlagUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: FeatureFlagCreateOrConnectWithoutPlanInput | FeatureFlagCreateOrConnectWithoutPlanInput[]
    createMany?: FeatureFlagCreateManyPlanInputEnvelope
    connect?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TenantSubscriptionUpdateManyWithoutPlanNestedInput = {
    create?: XOR<TenantSubscriptionCreateWithoutPlanInput, TenantSubscriptionUncheckedCreateWithoutPlanInput> | TenantSubscriptionCreateWithoutPlanInput[] | TenantSubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TenantSubscriptionCreateOrConnectWithoutPlanInput | TenantSubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: TenantSubscriptionUpsertWithWhereUniqueWithoutPlanInput | TenantSubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: TenantSubscriptionCreateManyPlanInputEnvelope
    set?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
    disconnect?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
    delete?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
    connect?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
    update?: TenantSubscriptionUpdateWithWhereUniqueWithoutPlanInput | TenantSubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: TenantSubscriptionUpdateManyWithWhereWithoutPlanInput | TenantSubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: TenantSubscriptionScalarWhereInput | TenantSubscriptionScalarWhereInput[]
  }

  export type FeatureFlagUpdateManyWithoutPlanNestedInput = {
    create?: XOR<FeatureFlagCreateWithoutPlanInput, FeatureFlagUncheckedCreateWithoutPlanInput> | FeatureFlagCreateWithoutPlanInput[] | FeatureFlagUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: FeatureFlagCreateOrConnectWithoutPlanInput | FeatureFlagCreateOrConnectWithoutPlanInput[]
    upsert?: FeatureFlagUpsertWithWhereUniqueWithoutPlanInput | FeatureFlagUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: FeatureFlagCreateManyPlanInputEnvelope
    set?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
    disconnect?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
    delete?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
    connect?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
    update?: FeatureFlagUpdateWithWhereUniqueWithoutPlanInput | FeatureFlagUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: FeatureFlagUpdateManyWithWhereWithoutPlanInput | FeatureFlagUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: FeatureFlagScalarWhereInput | FeatureFlagScalarWhereInput[]
  }

  export type TenantSubscriptionUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<TenantSubscriptionCreateWithoutPlanInput, TenantSubscriptionUncheckedCreateWithoutPlanInput> | TenantSubscriptionCreateWithoutPlanInput[] | TenantSubscriptionUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: TenantSubscriptionCreateOrConnectWithoutPlanInput | TenantSubscriptionCreateOrConnectWithoutPlanInput[]
    upsert?: TenantSubscriptionUpsertWithWhereUniqueWithoutPlanInput | TenantSubscriptionUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: TenantSubscriptionCreateManyPlanInputEnvelope
    set?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
    disconnect?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
    delete?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
    connect?: TenantSubscriptionWhereUniqueInput | TenantSubscriptionWhereUniqueInput[]
    update?: TenantSubscriptionUpdateWithWhereUniqueWithoutPlanInput | TenantSubscriptionUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: TenantSubscriptionUpdateManyWithWhereWithoutPlanInput | TenantSubscriptionUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: TenantSubscriptionScalarWhereInput | TenantSubscriptionScalarWhereInput[]
  }

  export type FeatureFlagUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<FeatureFlagCreateWithoutPlanInput, FeatureFlagUncheckedCreateWithoutPlanInput> | FeatureFlagCreateWithoutPlanInput[] | FeatureFlagUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: FeatureFlagCreateOrConnectWithoutPlanInput | FeatureFlagCreateOrConnectWithoutPlanInput[]
    upsert?: FeatureFlagUpsertWithWhereUniqueWithoutPlanInput | FeatureFlagUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: FeatureFlagCreateManyPlanInputEnvelope
    set?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
    disconnect?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
    delete?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
    connect?: FeatureFlagWhereUniqueInput | FeatureFlagWhereUniqueInput[]
    update?: FeatureFlagUpdateWithWhereUniqueWithoutPlanInput | FeatureFlagUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: FeatureFlagUpdateManyWithWhereWithoutPlanInput | FeatureFlagUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: FeatureFlagScalarWhereInput | FeatureFlagScalarWhereInput[]
  }

  export type PlanCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutSubscriptionsInput
    connect?: PlanWhereUniqueInput
  }

  export type SubscriptionInvoiceCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<SubscriptionInvoiceCreateWithoutSubscriptionInput, SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput> | SubscriptionInvoiceCreateWithoutSubscriptionInput[] | SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput | SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput[]
    createMany?: SubscriptionInvoiceCreateManySubscriptionInputEnvelope
    connect?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
  }

  export type DunningRecordCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<DunningRecordCreateWithoutSubscriptionInput, DunningRecordUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: DunningRecordCreateOrConnectWithoutSubscriptionInput
    connect?: DunningRecordWhereUniqueInput
  }

  export type SubscriptionInvoiceUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<SubscriptionInvoiceCreateWithoutSubscriptionInput, SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput> | SubscriptionInvoiceCreateWithoutSubscriptionInput[] | SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput | SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput[]
    createMany?: SubscriptionInvoiceCreateManySubscriptionInputEnvelope
    connect?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
  }

  export type DunningRecordUncheckedCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<DunningRecordCreateWithoutSubscriptionInput, DunningRecordUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: DunningRecordCreateOrConnectWithoutSubscriptionInput
    connect?: DunningRecordWhereUniqueInput
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PlanUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutSubscriptionsInput
    upsert?: PlanUpsertWithoutSubscriptionsInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutSubscriptionsInput, PlanUpdateWithoutSubscriptionsInput>, PlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type SubscriptionInvoiceUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<SubscriptionInvoiceCreateWithoutSubscriptionInput, SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput> | SubscriptionInvoiceCreateWithoutSubscriptionInput[] | SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput | SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput[]
    upsert?: SubscriptionInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput | SubscriptionInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: SubscriptionInvoiceCreateManySubscriptionInputEnvelope
    set?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
    disconnect?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
    delete?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
    connect?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
    update?: SubscriptionInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput | SubscriptionInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: SubscriptionInvoiceUpdateManyWithWhereWithoutSubscriptionInput | SubscriptionInvoiceUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: SubscriptionInvoiceScalarWhereInput | SubscriptionInvoiceScalarWhereInput[]
  }

  export type DunningRecordUpdateOneWithoutSubscriptionNestedInput = {
    create?: XOR<DunningRecordCreateWithoutSubscriptionInput, DunningRecordUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: DunningRecordCreateOrConnectWithoutSubscriptionInput
    upsert?: DunningRecordUpsertWithoutSubscriptionInput
    disconnect?: DunningRecordWhereInput | boolean
    delete?: DunningRecordWhereInput | boolean
    connect?: DunningRecordWhereUniqueInput
    update?: XOR<XOR<DunningRecordUpdateToOneWithWhereWithoutSubscriptionInput, DunningRecordUpdateWithoutSubscriptionInput>, DunningRecordUncheckedUpdateWithoutSubscriptionInput>
  }

  export type SubscriptionInvoiceUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<SubscriptionInvoiceCreateWithoutSubscriptionInput, SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput> | SubscriptionInvoiceCreateWithoutSubscriptionInput[] | SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput | SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput[]
    upsert?: SubscriptionInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput | SubscriptionInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: SubscriptionInvoiceCreateManySubscriptionInputEnvelope
    set?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
    disconnect?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
    delete?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
    connect?: SubscriptionInvoiceWhereUniqueInput | SubscriptionInvoiceWhereUniqueInput[]
    update?: SubscriptionInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput | SubscriptionInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: SubscriptionInvoiceUpdateManyWithWhereWithoutSubscriptionInput | SubscriptionInvoiceUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: SubscriptionInvoiceScalarWhereInput | SubscriptionInvoiceScalarWhereInput[]
  }

  export type DunningRecordUncheckedUpdateOneWithoutSubscriptionNestedInput = {
    create?: XOR<DunningRecordCreateWithoutSubscriptionInput, DunningRecordUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: DunningRecordCreateOrConnectWithoutSubscriptionInput
    upsert?: DunningRecordUpsertWithoutSubscriptionInput
    disconnect?: DunningRecordWhereInput | boolean
    delete?: DunningRecordWhereInput | boolean
    connect?: DunningRecordWhereUniqueInput
    update?: XOR<XOR<DunningRecordUpdateToOneWithWhereWithoutSubscriptionInput, DunningRecordUpdateWithoutSubscriptionInput>, DunningRecordUncheckedUpdateWithoutSubscriptionInput>
  }

  export type EnumUsageMetricFieldUpdateOperationsInput = {
    set?: $Enums.UsageMetric
  }

  export type PlanCreateNestedOneWithoutFeatureFlagsInput = {
    create?: XOR<PlanCreateWithoutFeatureFlagsInput, PlanUncheckedCreateWithoutFeatureFlagsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutFeatureFlagsInput
    connect?: PlanWhereUniqueInput
  }

  export type PlanUpdateOneRequiredWithoutFeatureFlagsNestedInput = {
    create?: XOR<PlanCreateWithoutFeatureFlagsInput, PlanUncheckedCreateWithoutFeatureFlagsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutFeatureFlagsInput
    upsert?: PlanUpsertWithoutFeatureFlagsInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutFeatureFlagsInput, PlanUpdateWithoutFeatureFlagsInput>, PlanUncheckedUpdateWithoutFeatureFlagsInput>
  }

  export type TenantSubscriptionCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<TenantSubscriptionCreateWithoutInvoicesInput, TenantSubscriptionUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: TenantSubscriptionCreateOrConnectWithoutInvoicesInput
    connect?: TenantSubscriptionWhereUniqueInput
  }

  export type EnumInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceStatus
  }

  export type TenantSubscriptionUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: XOR<TenantSubscriptionCreateWithoutInvoicesInput, TenantSubscriptionUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: TenantSubscriptionCreateOrConnectWithoutInvoicesInput
    upsert?: TenantSubscriptionUpsertWithoutInvoicesInput
    connect?: TenantSubscriptionWhereUniqueInput
    update?: XOR<XOR<TenantSubscriptionUpdateToOneWithWhereWithoutInvoicesInput, TenantSubscriptionUpdateWithoutInvoicesInput>, TenantSubscriptionUncheckedUpdateWithoutInvoicesInput>
  }

  export type TenantSubscriptionCreateNestedOneWithoutDunningInput = {
    create?: XOR<TenantSubscriptionCreateWithoutDunningInput, TenantSubscriptionUncheckedCreateWithoutDunningInput>
    connectOrCreate?: TenantSubscriptionCreateOrConnectWithoutDunningInput
    connect?: TenantSubscriptionWhereUniqueInput
  }

  export type EnumDunningStatusFieldUpdateOperationsInput = {
    set?: $Enums.DunningStatus
  }

  export type TenantSubscriptionUpdateOneRequiredWithoutDunningNestedInput = {
    create?: XOR<TenantSubscriptionCreateWithoutDunningInput, TenantSubscriptionUncheckedCreateWithoutDunningInput>
    connectOrCreate?: TenantSubscriptionCreateOrConnectWithoutDunningInput
    upsert?: TenantSubscriptionUpsertWithoutDunningInput
    connect?: TenantSubscriptionWhereUniqueInput
    update?: XOR<XOR<TenantSubscriptionUpdateToOneWithWhereWithoutDunningInput, TenantSubscriptionUpdateWithoutDunningInput>, TenantSubscriptionUncheckedUpdateWithoutDunningInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumUsageMetricFilter<$PrismaModel = never> = {
    equals?: $Enums.UsageMetric | EnumUsageMetricFieldRefInput<$PrismaModel>
    in?: $Enums.UsageMetric[] | ListEnumUsageMetricFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsageMetric[] | ListEnumUsageMetricFieldRefInput<$PrismaModel>
    not?: NestedEnumUsageMetricFilter<$PrismaModel> | $Enums.UsageMetric
  }

  export type NestedEnumUsageMetricWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UsageMetric | EnumUsageMetricFieldRefInput<$PrismaModel>
    in?: $Enums.UsageMetric[] | ListEnumUsageMetricFieldRefInput<$PrismaModel>
    notIn?: $Enums.UsageMetric[] | ListEnumUsageMetricFieldRefInput<$PrismaModel>
    not?: NestedEnumUsageMetricWithAggregatesFilter<$PrismaModel> | $Enums.UsageMetric
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUsageMetricFilter<$PrismaModel>
    _max?: NestedEnumUsageMetricFilter<$PrismaModel>
  }

  export type NestedEnumInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusFilter<$PrismaModel> | $Enums.InvoiceStatus
  }

  export type NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumInvoiceStatusFilter<$PrismaModel>
  }

  export type NestedEnumDunningStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DunningStatus | EnumDunningStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DunningStatus[] | ListEnumDunningStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DunningStatus[] | ListEnumDunningStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDunningStatusFilter<$PrismaModel> | $Enums.DunningStatus
  }

  export type NestedEnumDunningStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DunningStatus | EnumDunningStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DunningStatus[] | ListEnumDunningStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DunningStatus[] | ListEnumDunningStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDunningStatusWithAggregatesFilter<$PrismaModel> | $Enums.DunningStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDunningStatusFilter<$PrismaModel>
    _max?: NestedEnumDunningStatusFilter<$PrismaModel>
  }

  export type TenantSubscriptionCreateWithoutPlanInput = {
    id?: string
    tenantId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: SubscriptionInvoiceCreateNestedManyWithoutSubscriptionInput
    dunning?: DunningRecordCreateNestedOneWithoutSubscriptionInput
  }

  export type TenantSubscriptionUncheckedCreateWithoutPlanInput = {
    id?: string
    tenantId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: SubscriptionInvoiceUncheckedCreateNestedManyWithoutSubscriptionInput
    dunning?: DunningRecordUncheckedCreateNestedOneWithoutSubscriptionInput
  }

  export type TenantSubscriptionCreateOrConnectWithoutPlanInput = {
    where: TenantSubscriptionWhereUniqueInput
    create: XOR<TenantSubscriptionCreateWithoutPlanInput, TenantSubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type TenantSubscriptionCreateManyPlanInputEnvelope = {
    data: TenantSubscriptionCreateManyPlanInput | TenantSubscriptionCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type FeatureFlagCreateWithoutPlanInput = {
    id?: string
    featureKey: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUncheckedCreateWithoutPlanInput = {
    id?: string
    featureKey: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagCreateOrConnectWithoutPlanInput = {
    where: FeatureFlagWhereUniqueInput
    create: XOR<FeatureFlagCreateWithoutPlanInput, FeatureFlagUncheckedCreateWithoutPlanInput>
  }

  export type FeatureFlagCreateManyPlanInputEnvelope = {
    data: FeatureFlagCreateManyPlanInput | FeatureFlagCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type TenantSubscriptionUpsertWithWhereUniqueWithoutPlanInput = {
    where: TenantSubscriptionWhereUniqueInput
    update: XOR<TenantSubscriptionUpdateWithoutPlanInput, TenantSubscriptionUncheckedUpdateWithoutPlanInput>
    create: XOR<TenantSubscriptionCreateWithoutPlanInput, TenantSubscriptionUncheckedCreateWithoutPlanInput>
  }

  export type TenantSubscriptionUpdateWithWhereUniqueWithoutPlanInput = {
    where: TenantSubscriptionWhereUniqueInput
    data: XOR<TenantSubscriptionUpdateWithoutPlanInput, TenantSubscriptionUncheckedUpdateWithoutPlanInput>
  }

  export type TenantSubscriptionUpdateManyWithWhereWithoutPlanInput = {
    where: TenantSubscriptionScalarWhereInput
    data: XOR<TenantSubscriptionUpdateManyMutationInput, TenantSubscriptionUncheckedUpdateManyWithoutPlanInput>
  }

  export type TenantSubscriptionScalarWhereInput = {
    AND?: TenantSubscriptionScalarWhereInput | TenantSubscriptionScalarWhereInput[]
    OR?: TenantSubscriptionScalarWhereInput[]
    NOT?: TenantSubscriptionScalarWhereInput | TenantSubscriptionScalarWhereInput[]
    id?: StringFilter<"TenantSubscription"> | string
    tenantId?: StringFilter<"TenantSubscription"> | string
    planId?: StringFilter<"TenantSubscription"> | string
    stripeCustomerId?: StringNullableFilter<"TenantSubscription"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"TenantSubscription"> | string | null
    stripeSubscriptionItemId?: StringNullableFilter<"TenantSubscription"> | string | null
    status?: EnumSubscriptionStatusFilter<"TenantSubscription"> | $Enums.SubscriptionStatus
    trialEndsAt?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    currentPeriodStart?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"TenantSubscription"> | boolean
    scheduledPlanId?: StringNullableFilter<"TenantSubscription"> | string | null
    scheduledChangeAt?: DateTimeNullableFilter<"TenantSubscription"> | Date | string | null
    billingCycle?: StringFilter<"TenantSubscription"> | string
    createdAt?: DateTimeFilter<"TenantSubscription"> | Date | string
    updatedAt?: DateTimeFilter<"TenantSubscription"> | Date | string
  }

  export type FeatureFlagUpsertWithWhereUniqueWithoutPlanInput = {
    where: FeatureFlagWhereUniqueInput
    update: XOR<FeatureFlagUpdateWithoutPlanInput, FeatureFlagUncheckedUpdateWithoutPlanInput>
    create: XOR<FeatureFlagCreateWithoutPlanInput, FeatureFlagUncheckedCreateWithoutPlanInput>
  }

  export type FeatureFlagUpdateWithWhereUniqueWithoutPlanInput = {
    where: FeatureFlagWhereUniqueInput
    data: XOR<FeatureFlagUpdateWithoutPlanInput, FeatureFlagUncheckedUpdateWithoutPlanInput>
  }

  export type FeatureFlagUpdateManyWithWhereWithoutPlanInput = {
    where: FeatureFlagScalarWhereInput
    data: XOR<FeatureFlagUpdateManyMutationInput, FeatureFlagUncheckedUpdateManyWithoutPlanInput>
  }

  export type FeatureFlagScalarWhereInput = {
    AND?: FeatureFlagScalarWhereInput | FeatureFlagScalarWhereInput[]
    OR?: FeatureFlagScalarWhereInput[]
    NOT?: FeatureFlagScalarWhereInput | FeatureFlagScalarWhereInput[]
    id?: StringFilter<"FeatureFlag"> | string
    planId?: StringFilter<"FeatureFlag"> | string
    featureKey?: StringFilter<"FeatureFlag"> | string
    enabled?: BoolFilter<"FeatureFlag"> | boolean
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
  }

  export type PlanCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    description?: string
    priceMonthly?: number
    priceYearly?: number
    currency?: string
    stripeProductId?: string | null
    stripePriceMonthlyId?: string | null
    stripePriceYearlyId?: string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    featureFlags?: FeatureFlagCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    name: string
    description?: string
    priceMonthly?: number
    priceYearly?: number
    currency?: string
    stripeProductId?: string | null
    stripePriceMonthlyId?: string | null
    stripePriceYearlyId?: string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    featureFlags?: FeatureFlagUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutSubscriptionsInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
  }

  export type SubscriptionInvoiceCreateWithoutSubscriptionInput = {
    id?: string
    stripeInvoiceId: string
    amountDue?: number
    amountPaid?: number
    currency?: string
    status?: $Enums.InvoiceStatus
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    hostedInvoiceUrl?: string | null
    invoicePdf?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    stripeInvoiceId: string
    amountDue?: number
    amountPaid?: number
    currency?: string
    status?: $Enums.InvoiceStatus
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    hostedInvoiceUrl?: string | null
    invoicePdf?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionInvoiceCreateOrConnectWithoutSubscriptionInput = {
    where: SubscriptionInvoiceWhereUniqueInput
    create: XOR<SubscriptionInvoiceCreateWithoutSubscriptionInput, SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput>
  }

  export type SubscriptionInvoiceCreateManySubscriptionInputEnvelope = {
    data: SubscriptionInvoiceCreateManySubscriptionInput | SubscriptionInvoiceCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type DunningRecordCreateWithoutSubscriptionInput = {
    id?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastFailedAt?: Date | string | null
    status?: $Enums.DunningStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DunningRecordUncheckedCreateWithoutSubscriptionInput = {
    id?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastFailedAt?: Date | string | null
    status?: $Enums.DunningStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DunningRecordCreateOrConnectWithoutSubscriptionInput = {
    where: DunningRecordWhereUniqueInput
    create: XOR<DunningRecordCreateWithoutSubscriptionInput, DunningRecordUncheckedCreateWithoutSubscriptionInput>
  }

  export type PlanUpsertWithoutSubscriptionsInput = {
    update: XOR<PlanUpdateWithoutSubscriptionsInput, PlanUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<PlanCreateWithoutSubscriptionsInput, PlanUncheckedCreateWithoutSubscriptionsInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutSubscriptionsInput, PlanUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type PlanUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceMonthlyId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceYearlyId?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featureFlags?: FeatureFlagUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceMonthlyId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceYearlyId?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    featureFlags?: FeatureFlagUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type SubscriptionInvoiceUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: SubscriptionInvoiceWhereUniqueInput
    update: XOR<SubscriptionInvoiceUpdateWithoutSubscriptionInput, SubscriptionInvoiceUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<SubscriptionInvoiceCreateWithoutSubscriptionInput, SubscriptionInvoiceUncheckedCreateWithoutSubscriptionInput>
  }

  export type SubscriptionInvoiceUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: SubscriptionInvoiceWhereUniqueInput
    data: XOR<SubscriptionInvoiceUpdateWithoutSubscriptionInput, SubscriptionInvoiceUncheckedUpdateWithoutSubscriptionInput>
  }

  export type SubscriptionInvoiceUpdateManyWithWhereWithoutSubscriptionInput = {
    where: SubscriptionInvoiceScalarWhereInput
    data: XOR<SubscriptionInvoiceUpdateManyMutationInput, SubscriptionInvoiceUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type SubscriptionInvoiceScalarWhereInput = {
    AND?: SubscriptionInvoiceScalarWhereInput | SubscriptionInvoiceScalarWhereInput[]
    OR?: SubscriptionInvoiceScalarWhereInput[]
    NOT?: SubscriptionInvoiceScalarWhereInput | SubscriptionInvoiceScalarWhereInput[]
    id?: StringFilter<"SubscriptionInvoice"> | string
    tenantId?: StringFilter<"SubscriptionInvoice"> | string
    stripeInvoiceId?: StringFilter<"SubscriptionInvoice"> | string
    amountDue?: IntFilter<"SubscriptionInvoice"> | number
    amountPaid?: IntFilter<"SubscriptionInvoice"> | number
    currency?: StringFilter<"SubscriptionInvoice"> | string
    status?: EnumInvoiceStatusFilter<"SubscriptionInvoice"> | $Enums.InvoiceStatus
    periodStart?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    periodEnd?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    hostedInvoiceUrl?: StringNullableFilter<"SubscriptionInvoice"> | string | null
    invoicePdf?: StringNullableFilter<"SubscriptionInvoice"> | string | null
    paidAt?: DateTimeNullableFilter<"SubscriptionInvoice"> | Date | string | null
    createdAt?: DateTimeFilter<"SubscriptionInvoice"> | Date | string
    updatedAt?: DateTimeFilter<"SubscriptionInvoice"> | Date | string
  }

  export type DunningRecordUpsertWithoutSubscriptionInput = {
    update: XOR<DunningRecordUpdateWithoutSubscriptionInput, DunningRecordUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<DunningRecordCreateWithoutSubscriptionInput, DunningRecordUncheckedCreateWithoutSubscriptionInput>
    where?: DunningRecordWhereInput
  }

  export type DunningRecordUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: DunningRecordWhereInput
    data: XOR<DunningRecordUpdateWithoutSubscriptionInput, DunningRecordUncheckedUpdateWithoutSubscriptionInput>
  }

  export type DunningRecordUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumDunningStatusFieldUpdateOperationsInput | $Enums.DunningStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DunningRecordUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumDunningStatusFieldUpdateOperationsInput | $Enums.DunningStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateWithoutFeatureFlagsInput = {
    id?: string
    name: string
    description?: string
    priceMonthly?: number
    priceYearly?: number
    currency?: string
    stripeProductId?: string | null
    stripePriceMonthlyId?: string | null
    stripePriceYearlyId?: string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: TenantSubscriptionCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateWithoutFeatureFlagsInput = {
    id?: string
    name: string
    description?: string
    priceMonthly?: number
    priceYearly?: number
    currency?: string
    stripeProductId?: string | null
    stripePriceMonthlyId?: string | null
    stripePriceYearlyId?: string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subscriptions?: TenantSubscriptionUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanCreateOrConnectWithoutFeatureFlagsInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutFeatureFlagsInput, PlanUncheckedCreateWithoutFeatureFlagsInput>
  }

  export type PlanUpsertWithoutFeatureFlagsInput = {
    update: XOR<PlanUpdateWithoutFeatureFlagsInput, PlanUncheckedUpdateWithoutFeatureFlagsInput>
    create: XOR<PlanCreateWithoutFeatureFlagsInput, PlanUncheckedCreateWithoutFeatureFlagsInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutFeatureFlagsInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutFeatureFlagsInput, PlanUncheckedUpdateWithoutFeatureFlagsInput>
  }

  export type PlanUpdateWithoutFeatureFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceMonthlyId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceYearlyId?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: TenantSubscriptionUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateWithoutFeatureFlagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceMonthlyId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceYearlyId?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: JsonNullValueInput | InputJsonValue
    trialDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: TenantSubscriptionUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type TenantSubscriptionCreateWithoutInvoicesInput = {
    id?: string
    tenantId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutSubscriptionsInput
    dunning?: DunningRecordCreateNestedOneWithoutSubscriptionInput
  }

  export type TenantSubscriptionUncheckedCreateWithoutInvoicesInput = {
    id?: string
    tenantId: string
    planId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dunning?: DunningRecordUncheckedCreateNestedOneWithoutSubscriptionInput
  }

  export type TenantSubscriptionCreateOrConnectWithoutInvoicesInput = {
    where: TenantSubscriptionWhereUniqueInput
    create: XOR<TenantSubscriptionCreateWithoutInvoicesInput, TenantSubscriptionUncheckedCreateWithoutInvoicesInput>
  }

  export type TenantSubscriptionUpsertWithoutInvoicesInput = {
    update: XOR<TenantSubscriptionUpdateWithoutInvoicesInput, TenantSubscriptionUncheckedUpdateWithoutInvoicesInput>
    create: XOR<TenantSubscriptionCreateWithoutInvoicesInput, TenantSubscriptionUncheckedCreateWithoutInvoicesInput>
    where?: TenantSubscriptionWhereInput
  }

  export type TenantSubscriptionUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: TenantSubscriptionWhereInput
    data: XOR<TenantSubscriptionUpdateWithoutInvoicesInput, TenantSubscriptionUncheckedUpdateWithoutInvoicesInput>
  }

  export type TenantSubscriptionUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutSubscriptionsNestedInput
    dunning?: DunningRecordUpdateOneWithoutSubscriptionNestedInput
  }

  export type TenantSubscriptionUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dunning?: DunningRecordUncheckedUpdateOneWithoutSubscriptionNestedInput
  }

  export type TenantSubscriptionCreateWithoutDunningInput = {
    id?: string
    tenantId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    plan: PlanCreateNestedOneWithoutSubscriptionsInput
    invoices?: SubscriptionInvoiceCreateNestedManyWithoutSubscriptionInput
  }

  export type TenantSubscriptionUncheckedCreateWithoutDunningInput = {
    id?: string
    tenantId: string
    planId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: SubscriptionInvoiceUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type TenantSubscriptionCreateOrConnectWithoutDunningInput = {
    where: TenantSubscriptionWhereUniqueInput
    create: XOR<TenantSubscriptionCreateWithoutDunningInput, TenantSubscriptionUncheckedCreateWithoutDunningInput>
  }

  export type TenantSubscriptionUpsertWithoutDunningInput = {
    update: XOR<TenantSubscriptionUpdateWithoutDunningInput, TenantSubscriptionUncheckedUpdateWithoutDunningInput>
    create: XOR<TenantSubscriptionCreateWithoutDunningInput, TenantSubscriptionUncheckedCreateWithoutDunningInput>
    where?: TenantSubscriptionWhereInput
  }

  export type TenantSubscriptionUpdateToOneWithWhereWithoutDunningInput = {
    where?: TenantSubscriptionWhereInput
    data: XOR<TenantSubscriptionUpdateWithoutDunningInput, TenantSubscriptionUncheckedUpdateWithoutDunningInput>
  }

  export type TenantSubscriptionUpdateWithoutDunningInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneRequiredWithoutSubscriptionsNestedInput
    invoices?: SubscriptionInvoiceUpdateManyWithoutSubscriptionNestedInput
  }

  export type TenantSubscriptionUncheckedUpdateWithoutDunningInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: SubscriptionInvoiceUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type TenantSubscriptionCreateManyPlanInput = {
    id?: string
    tenantId: string
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    stripeSubscriptionItemId?: string | null
    status?: $Enums.SubscriptionStatus
    trialEndsAt?: Date | string | null
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    scheduledPlanId?: string | null
    scheduledChangeAt?: Date | string | null
    billingCycle?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagCreateManyPlanInput = {
    id?: string
    featureKey: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantSubscriptionUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: SubscriptionInvoiceUpdateManyWithoutSubscriptionNestedInput
    dunning?: DunningRecordUpdateOneWithoutSubscriptionNestedInput
  }

  export type TenantSubscriptionUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: SubscriptionInvoiceUncheckedUpdateManyWithoutSubscriptionNestedInput
    dunning?: DunningRecordUncheckedUpdateOneWithoutSubscriptionNestedInput
  }

  export type TenantSubscriptionUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionItemId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    scheduledPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledChangeAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    billingCycle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureKey?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionInvoiceCreateManySubscriptionInput = {
    id?: string
    stripeInvoiceId: string
    amountDue?: number
    amountPaid?: number
    currency?: string
    status?: $Enums.InvoiceStatus
    periodStart?: Date | string | null
    periodEnd?: Date | string | null
    hostedInvoiceUrl?: string | null
    invoicePdf?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionInvoiceUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeInvoiceId?: StringFieldUpdateOperationsInput | string
    amountDue?: IntFieldUpdateOperationsInput | number
    amountPaid?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostedInvoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePdf?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionInvoiceUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeInvoiceId?: StringFieldUpdateOperationsInput | string
    amountDue?: IntFieldUpdateOperationsInput | number
    amountPaid?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostedInvoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePdf?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionInvoiceUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeInvoiceId?: StringFieldUpdateOperationsInput | string
    amountDue?: IntFieldUpdateOperationsInput | number
    amountPaid?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    periodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    periodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hostedInvoiceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePdf?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}