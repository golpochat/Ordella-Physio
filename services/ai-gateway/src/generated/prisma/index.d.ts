
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
 * Model AIGatewayKey
 * 
 */
export type AIGatewayKey = $Result.DefaultSelection<Prisma.$AIGatewayKeyPayload>
/**
 * Model AIRateLimit
 * 
 */
export type AIRateLimit = $Result.DefaultSelection<Prisma.$AIRateLimitPayload>
/**
 * Model AIBudget
 * 
 */
export type AIBudget = $Result.DefaultSelection<Prisma.$AIBudgetPayload>
/**
 * Model AIUsageEvent
 * 
 */
export type AIUsageEvent = $Result.DefaultSelection<Prisma.$AIUsageEventPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AIGatewayKeys
 * const aIGatewayKeys = await prisma.aIGatewayKey.findMany()
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
   * // Fetch zero or more AIGatewayKeys
   * const aIGatewayKeys = await prisma.aIGatewayKey.findMany()
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
   * `prisma.aIGatewayKey`: Exposes CRUD operations for the **AIGatewayKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIGatewayKeys
    * const aIGatewayKeys = await prisma.aIGatewayKey.findMany()
    * ```
    */
  get aIGatewayKey(): Prisma.AIGatewayKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIRateLimit`: Exposes CRUD operations for the **AIRateLimit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIRateLimits
    * const aIRateLimits = await prisma.aIRateLimit.findMany()
    * ```
    */
  get aIRateLimit(): Prisma.AIRateLimitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIBudget`: Exposes CRUD operations for the **AIBudget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIBudgets
    * const aIBudgets = await prisma.aIBudget.findMany()
    * ```
    */
  get aIBudget(): Prisma.AIBudgetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIUsageEvent`: Exposes CRUD operations for the **AIUsageEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIUsageEvents
    * const aIUsageEvents = await prisma.aIUsageEvent.findMany()
    * ```
    */
  get aIUsageEvent(): Prisma.AIUsageEventDelegate<ExtArgs, ClientOptions>;
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
    AIGatewayKey: 'AIGatewayKey',
    AIRateLimit: 'AIRateLimit',
    AIBudget: 'AIBudget',
    AIUsageEvent: 'AIUsageEvent'
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
      modelProps: "aIGatewayKey" | "aIRateLimit" | "aIBudget" | "aIUsageEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AIGatewayKey: {
        payload: Prisma.$AIGatewayKeyPayload<ExtArgs>
        fields: Prisma.AIGatewayKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIGatewayKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIGatewayKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>
          }
          findFirst: {
            args: Prisma.AIGatewayKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIGatewayKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>
          }
          findMany: {
            args: Prisma.AIGatewayKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>[]
          }
          create: {
            args: Prisma.AIGatewayKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>
          }
          createMany: {
            args: Prisma.AIGatewayKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIGatewayKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>[]
          }
          delete: {
            args: Prisma.AIGatewayKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>
          }
          update: {
            args: Prisma.AIGatewayKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>
          }
          deleteMany: {
            args: Prisma.AIGatewayKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIGatewayKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIGatewayKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>[]
          }
          upsert: {
            args: Prisma.AIGatewayKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIGatewayKeyPayload>
          }
          aggregate: {
            args: Prisma.AIGatewayKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIGatewayKey>
          }
          groupBy: {
            args: Prisma.AIGatewayKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIGatewayKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIGatewayKeyCountArgs<ExtArgs>
            result: $Utils.Optional<AIGatewayKeyCountAggregateOutputType> | number
          }
        }
      }
      AIRateLimit: {
        payload: Prisma.$AIRateLimitPayload<ExtArgs>
        fields: Prisma.AIRateLimitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIRateLimitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIRateLimitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>
          }
          findFirst: {
            args: Prisma.AIRateLimitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIRateLimitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>
          }
          findMany: {
            args: Prisma.AIRateLimitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>[]
          }
          create: {
            args: Prisma.AIRateLimitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>
          }
          createMany: {
            args: Prisma.AIRateLimitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIRateLimitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>[]
          }
          delete: {
            args: Prisma.AIRateLimitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>
          }
          update: {
            args: Prisma.AIRateLimitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>
          }
          deleteMany: {
            args: Prisma.AIRateLimitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIRateLimitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIRateLimitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>[]
          }
          upsert: {
            args: Prisma.AIRateLimitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRateLimitPayload>
          }
          aggregate: {
            args: Prisma.AIRateLimitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIRateLimit>
          }
          groupBy: {
            args: Prisma.AIRateLimitGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIRateLimitGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIRateLimitCountArgs<ExtArgs>
            result: $Utils.Optional<AIRateLimitCountAggregateOutputType> | number
          }
        }
      }
      AIBudget: {
        payload: Prisma.$AIBudgetPayload<ExtArgs>
        fields: Prisma.AIBudgetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIBudgetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIBudgetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>
          }
          findFirst: {
            args: Prisma.AIBudgetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIBudgetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>
          }
          findMany: {
            args: Prisma.AIBudgetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>[]
          }
          create: {
            args: Prisma.AIBudgetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>
          }
          createMany: {
            args: Prisma.AIBudgetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIBudgetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>[]
          }
          delete: {
            args: Prisma.AIBudgetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>
          }
          update: {
            args: Prisma.AIBudgetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>
          }
          deleteMany: {
            args: Prisma.AIBudgetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIBudgetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIBudgetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>[]
          }
          upsert: {
            args: Prisma.AIBudgetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBudgetPayload>
          }
          aggregate: {
            args: Prisma.AIBudgetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIBudget>
          }
          groupBy: {
            args: Prisma.AIBudgetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIBudgetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIBudgetCountArgs<ExtArgs>
            result: $Utils.Optional<AIBudgetCountAggregateOutputType> | number
          }
        }
      }
      AIUsageEvent: {
        payload: Prisma.$AIUsageEventPayload<ExtArgs>
        fields: Prisma.AIUsageEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIUsageEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIUsageEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>
          }
          findFirst: {
            args: Prisma.AIUsageEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIUsageEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>
          }
          findMany: {
            args: Prisma.AIUsageEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>[]
          }
          create: {
            args: Prisma.AIUsageEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>
          }
          createMany: {
            args: Prisma.AIUsageEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIUsageEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>[]
          }
          delete: {
            args: Prisma.AIUsageEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>
          }
          update: {
            args: Prisma.AIUsageEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>
          }
          deleteMany: {
            args: Prisma.AIUsageEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIUsageEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIUsageEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>[]
          }
          upsert: {
            args: Prisma.AIUsageEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIUsageEventPayload>
          }
          aggregate: {
            args: Prisma.AIUsageEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIUsageEvent>
          }
          groupBy: {
            args: Prisma.AIUsageEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIUsageEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIUsageEventCountArgs<ExtArgs>
            result: $Utils.Optional<AIUsageEventCountAggregateOutputType> | number
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
    aIGatewayKey?: AIGatewayKeyOmit
    aIRateLimit?: AIRateLimitOmit
    aIBudget?: AIBudgetOmit
    aIUsageEvent?: AIUsageEventOmit
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
   * Count Type AIGatewayKeyCountOutputType
   */

  export type AIGatewayKeyCountOutputType = {
    usageEvents: number
  }

  export type AIGatewayKeyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usageEvents?: boolean | AIGatewayKeyCountOutputTypeCountUsageEventsArgs
  }

  // Custom InputTypes
  /**
   * AIGatewayKeyCountOutputType without action
   */
  export type AIGatewayKeyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKeyCountOutputType
     */
    select?: AIGatewayKeyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AIGatewayKeyCountOutputType without action
   */
  export type AIGatewayKeyCountOutputTypeCountUsageEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIUsageEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AIGatewayKey
   */

  export type AggregateAIGatewayKey = {
    _count: AIGatewayKeyCountAggregateOutputType | null
    _min: AIGatewayKeyMinAggregateOutputType | null
    _max: AIGatewayKeyMaxAggregateOutputType | null
  }

  export type AIGatewayKeyMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    keyHash: string | null
    keyPrefix: string | null
    rateLimitProfileId: string | null
    budgetProfileId: string | null
    isActive: boolean | null
    isFlagged: boolean | null
    isThrottled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastUsedAt: Date | null
    revokedAt: Date | null
  }

  export type AIGatewayKeyMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    keyHash: string | null
    keyPrefix: string | null
    rateLimitProfileId: string | null
    budgetProfileId: string | null
    isActive: boolean | null
    isFlagged: boolean | null
    isThrottled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastUsedAt: Date | null
    revokedAt: Date | null
  }

  export type AIGatewayKeyCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    keyHash: number
    keyPrefix: number
    scopes: number
    rateLimitProfileId: number
    budgetProfileId: number
    isActive: number
    isFlagged: number
    isThrottled: number
    createdAt: number
    updatedAt: number
    lastUsedAt: number
    revokedAt: number
    _all: number
  }


  export type AIGatewayKeyMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    keyHash?: true
    keyPrefix?: true
    rateLimitProfileId?: true
    budgetProfileId?: true
    isActive?: true
    isFlagged?: true
    isThrottled?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
    revokedAt?: true
  }

  export type AIGatewayKeyMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    keyHash?: true
    keyPrefix?: true
    rateLimitProfileId?: true
    budgetProfileId?: true
    isActive?: true
    isFlagged?: true
    isThrottled?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
    revokedAt?: true
  }

  export type AIGatewayKeyCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    keyHash?: true
    keyPrefix?: true
    scopes?: true
    rateLimitProfileId?: true
    budgetProfileId?: true
    isActive?: true
    isFlagged?: true
    isThrottled?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
    revokedAt?: true
    _all?: true
  }

  export type AIGatewayKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIGatewayKey to aggregate.
     */
    where?: AIGatewayKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGatewayKeys to fetch.
     */
    orderBy?: AIGatewayKeyOrderByWithRelationInput | AIGatewayKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIGatewayKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGatewayKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGatewayKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIGatewayKeys
    **/
    _count?: true | AIGatewayKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIGatewayKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIGatewayKeyMaxAggregateInputType
  }

  export type GetAIGatewayKeyAggregateType<T extends AIGatewayKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateAIGatewayKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIGatewayKey[P]>
      : GetScalarType<T[P], AggregateAIGatewayKey[P]>
  }




  export type AIGatewayKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIGatewayKeyWhereInput
    orderBy?: AIGatewayKeyOrderByWithAggregationInput | AIGatewayKeyOrderByWithAggregationInput[]
    by: AIGatewayKeyScalarFieldEnum[] | AIGatewayKeyScalarFieldEnum
    having?: AIGatewayKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIGatewayKeyCountAggregateInputType | true
    _min?: AIGatewayKeyMinAggregateInputType
    _max?: AIGatewayKeyMaxAggregateInputType
  }

  export type AIGatewayKeyGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    keyHash: string
    keyPrefix: string
    scopes: JsonValue
    rateLimitProfileId: string | null
    budgetProfileId: string | null
    isActive: boolean
    isFlagged: boolean
    isThrottled: boolean
    createdAt: Date
    updatedAt: Date
    lastUsedAt: Date | null
    revokedAt: Date | null
    _count: AIGatewayKeyCountAggregateOutputType | null
    _min: AIGatewayKeyMinAggregateOutputType | null
    _max: AIGatewayKeyMaxAggregateOutputType | null
  }

  type GetAIGatewayKeyGroupByPayload<T extends AIGatewayKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIGatewayKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIGatewayKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIGatewayKeyGroupByOutputType[P]>
            : GetScalarType<T[P], AIGatewayKeyGroupByOutputType[P]>
        }
      >
    >


  export type AIGatewayKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    keyHash?: boolean
    keyPrefix?: boolean
    scopes?: boolean
    rateLimitProfileId?: boolean
    budgetProfileId?: boolean
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    revokedAt?: boolean
    usageEvents?: boolean | AIGatewayKey$usageEventsArgs<ExtArgs>
    _count?: boolean | AIGatewayKeyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIGatewayKey"]>

  export type AIGatewayKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    keyHash?: boolean
    keyPrefix?: boolean
    scopes?: boolean
    rateLimitProfileId?: boolean
    budgetProfileId?: boolean
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    revokedAt?: boolean
  }, ExtArgs["result"]["aIGatewayKey"]>

  export type AIGatewayKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    keyHash?: boolean
    keyPrefix?: boolean
    scopes?: boolean
    rateLimitProfileId?: boolean
    budgetProfileId?: boolean
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    revokedAt?: boolean
  }, ExtArgs["result"]["aIGatewayKey"]>

  export type AIGatewayKeySelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    keyHash?: boolean
    keyPrefix?: boolean
    scopes?: boolean
    rateLimitProfileId?: boolean
    budgetProfileId?: boolean
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    revokedAt?: boolean
  }

  export type AIGatewayKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "keyHash" | "keyPrefix" | "scopes" | "rateLimitProfileId" | "budgetProfileId" | "isActive" | "isFlagged" | "isThrottled" | "createdAt" | "updatedAt" | "lastUsedAt" | "revokedAt", ExtArgs["result"]["aIGatewayKey"]>
  export type AIGatewayKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usageEvents?: boolean | AIGatewayKey$usageEventsArgs<ExtArgs>
    _count?: boolean | AIGatewayKeyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AIGatewayKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AIGatewayKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AIGatewayKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIGatewayKey"
    objects: {
      usageEvents: Prisma.$AIUsageEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      keyHash: string
      keyPrefix: string
      scopes: Prisma.JsonValue
      rateLimitProfileId: string | null
      budgetProfileId: string | null
      isActive: boolean
      isFlagged: boolean
      isThrottled: boolean
      createdAt: Date
      updatedAt: Date
      lastUsedAt: Date | null
      revokedAt: Date | null
    }, ExtArgs["result"]["aIGatewayKey"]>
    composites: {}
  }

  type AIGatewayKeyGetPayload<S extends boolean | null | undefined | AIGatewayKeyDefaultArgs> = $Result.GetResult<Prisma.$AIGatewayKeyPayload, S>

  type AIGatewayKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIGatewayKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIGatewayKeyCountAggregateInputType | true
    }

  export interface AIGatewayKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIGatewayKey'], meta: { name: 'AIGatewayKey' } }
    /**
     * Find zero or one AIGatewayKey that matches the filter.
     * @param {AIGatewayKeyFindUniqueArgs} args - Arguments to find a AIGatewayKey
     * @example
     * // Get one AIGatewayKey
     * const aIGatewayKey = await prisma.aIGatewayKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIGatewayKeyFindUniqueArgs>(args: SelectSubset<T, AIGatewayKeyFindUniqueArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIGatewayKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIGatewayKeyFindUniqueOrThrowArgs} args - Arguments to find a AIGatewayKey
     * @example
     * // Get one AIGatewayKey
     * const aIGatewayKey = await prisma.aIGatewayKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIGatewayKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, AIGatewayKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIGatewayKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGatewayKeyFindFirstArgs} args - Arguments to find a AIGatewayKey
     * @example
     * // Get one AIGatewayKey
     * const aIGatewayKey = await prisma.aIGatewayKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIGatewayKeyFindFirstArgs>(args?: SelectSubset<T, AIGatewayKeyFindFirstArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIGatewayKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGatewayKeyFindFirstOrThrowArgs} args - Arguments to find a AIGatewayKey
     * @example
     * // Get one AIGatewayKey
     * const aIGatewayKey = await prisma.aIGatewayKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIGatewayKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, AIGatewayKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIGatewayKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGatewayKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIGatewayKeys
     * const aIGatewayKeys = await prisma.aIGatewayKey.findMany()
     * 
     * // Get first 10 AIGatewayKeys
     * const aIGatewayKeys = await prisma.aIGatewayKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIGatewayKeyWithIdOnly = await prisma.aIGatewayKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIGatewayKeyFindManyArgs>(args?: SelectSubset<T, AIGatewayKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIGatewayKey.
     * @param {AIGatewayKeyCreateArgs} args - Arguments to create a AIGatewayKey.
     * @example
     * // Create one AIGatewayKey
     * const AIGatewayKey = await prisma.aIGatewayKey.create({
     *   data: {
     *     // ... data to create a AIGatewayKey
     *   }
     * })
     * 
     */
    create<T extends AIGatewayKeyCreateArgs>(args: SelectSubset<T, AIGatewayKeyCreateArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIGatewayKeys.
     * @param {AIGatewayKeyCreateManyArgs} args - Arguments to create many AIGatewayKeys.
     * @example
     * // Create many AIGatewayKeys
     * const aIGatewayKey = await prisma.aIGatewayKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIGatewayKeyCreateManyArgs>(args?: SelectSubset<T, AIGatewayKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIGatewayKeys and returns the data saved in the database.
     * @param {AIGatewayKeyCreateManyAndReturnArgs} args - Arguments to create many AIGatewayKeys.
     * @example
     * // Create many AIGatewayKeys
     * const aIGatewayKey = await prisma.aIGatewayKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIGatewayKeys and only return the `id`
     * const aIGatewayKeyWithIdOnly = await prisma.aIGatewayKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIGatewayKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, AIGatewayKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIGatewayKey.
     * @param {AIGatewayKeyDeleteArgs} args - Arguments to delete one AIGatewayKey.
     * @example
     * // Delete one AIGatewayKey
     * const AIGatewayKey = await prisma.aIGatewayKey.delete({
     *   where: {
     *     // ... filter to delete one AIGatewayKey
     *   }
     * })
     * 
     */
    delete<T extends AIGatewayKeyDeleteArgs>(args: SelectSubset<T, AIGatewayKeyDeleteArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIGatewayKey.
     * @param {AIGatewayKeyUpdateArgs} args - Arguments to update one AIGatewayKey.
     * @example
     * // Update one AIGatewayKey
     * const aIGatewayKey = await prisma.aIGatewayKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIGatewayKeyUpdateArgs>(args: SelectSubset<T, AIGatewayKeyUpdateArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIGatewayKeys.
     * @param {AIGatewayKeyDeleteManyArgs} args - Arguments to filter AIGatewayKeys to delete.
     * @example
     * // Delete a few AIGatewayKeys
     * const { count } = await prisma.aIGatewayKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIGatewayKeyDeleteManyArgs>(args?: SelectSubset<T, AIGatewayKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIGatewayKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGatewayKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIGatewayKeys
     * const aIGatewayKey = await prisma.aIGatewayKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIGatewayKeyUpdateManyArgs>(args: SelectSubset<T, AIGatewayKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIGatewayKeys and returns the data updated in the database.
     * @param {AIGatewayKeyUpdateManyAndReturnArgs} args - Arguments to update many AIGatewayKeys.
     * @example
     * // Update many AIGatewayKeys
     * const aIGatewayKey = await prisma.aIGatewayKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIGatewayKeys and only return the `id`
     * const aIGatewayKeyWithIdOnly = await prisma.aIGatewayKey.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIGatewayKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, AIGatewayKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIGatewayKey.
     * @param {AIGatewayKeyUpsertArgs} args - Arguments to update or create a AIGatewayKey.
     * @example
     * // Update or create a AIGatewayKey
     * const aIGatewayKey = await prisma.aIGatewayKey.upsert({
     *   create: {
     *     // ... data to create a AIGatewayKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIGatewayKey we want to update
     *   }
     * })
     */
    upsert<T extends AIGatewayKeyUpsertArgs>(args: SelectSubset<T, AIGatewayKeyUpsertArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIGatewayKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGatewayKeyCountArgs} args - Arguments to filter AIGatewayKeys to count.
     * @example
     * // Count the number of AIGatewayKeys
     * const count = await prisma.aIGatewayKey.count({
     *   where: {
     *     // ... the filter for the AIGatewayKeys we want to count
     *   }
     * })
    **/
    count<T extends AIGatewayKeyCountArgs>(
      args?: Subset<T, AIGatewayKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIGatewayKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIGatewayKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGatewayKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIGatewayKeyAggregateArgs>(args: Subset<T, AIGatewayKeyAggregateArgs>): Prisma.PrismaPromise<GetAIGatewayKeyAggregateType<T>>

    /**
     * Group by AIGatewayKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIGatewayKeyGroupByArgs} args - Group by arguments.
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
      T extends AIGatewayKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIGatewayKeyGroupByArgs['orderBy'] }
        : { orderBy?: AIGatewayKeyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIGatewayKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIGatewayKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIGatewayKey model
   */
  readonly fields: AIGatewayKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIGatewayKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIGatewayKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usageEvents<T extends AIGatewayKey$usageEventsArgs<ExtArgs> = {}>(args?: Subset<T, AIGatewayKey$usageEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the AIGatewayKey model
   */
  interface AIGatewayKeyFieldRefs {
    readonly id: FieldRef<"AIGatewayKey", 'String'>
    readonly tenantId: FieldRef<"AIGatewayKey", 'String'>
    readonly name: FieldRef<"AIGatewayKey", 'String'>
    readonly keyHash: FieldRef<"AIGatewayKey", 'String'>
    readonly keyPrefix: FieldRef<"AIGatewayKey", 'String'>
    readonly scopes: FieldRef<"AIGatewayKey", 'Json'>
    readonly rateLimitProfileId: FieldRef<"AIGatewayKey", 'String'>
    readonly budgetProfileId: FieldRef<"AIGatewayKey", 'String'>
    readonly isActive: FieldRef<"AIGatewayKey", 'Boolean'>
    readonly isFlagged: FieldRef<"AIGatewayKey", 'Boolean'>
    readonly isThrottled: FieldRef<"AIGatewayKey", 'Boolean'>
    readonly createdAt: FieldRef<"AIGatewayKey", 'DateTime'>
    readonly updatedAt: FieldRef<"AIGatewayKey", 'DateTime'>
    readonly lastUsedAt: FieldRef<"AIGatewayKey", 'DateTime'>
    readonly revokedAt: FieldRef<"AIGatewayKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIGatewayKey findUnique
   */
  export type AIGatewayKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * Filter, which AIGatewayKey to fetch.
     */
    where: AIGatewayKeyWhereUniqueInput
  }

  /**
   * AIGatewayKey findUniqueOrThrow
   */
  export type AIGatewayKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * Filter, which AIGatewayKey to fetch.
     */
    where: AIGatewayKeyWhereUniqueInput
  }

  /**
   * AIGatewayKey findFirst
   */
  export type AIGatewayKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * Filter, which AIGatewayKey to fetch.
     */
    where?: AIGatewayKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGatewayKeys to fetch.
     */
    orderBy?: AIGatewayKeyOrderByWithRelationInput | AIGatewayKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIGatewayKeys.
     */
    cursor?: AIGatewayKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGatewayKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGatewayKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIGatewayKeys.
     */
    distinct?: AIGatewayKeyScalarFieldEnum | AIGatewayKeyScalarFieldEnum[]
  }

  /**
   * AIGatewayKey findFirstOrThrow
   */
  export type AIGatewayKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * Filter, which AIGatewayKey to fetch.
     */
    where?: AIGatewayKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGatewayKeys to fetch.
     */
    orderBy?: AIGatewayKeyOrderByWithRelationInput | AIGatewayKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIGatewayKeys.
     */
    cursor?: AIGatewayKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGatewayKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGatewayKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIGatewayKeys.
     */
    distinct?: AIGatewayKeyScalarFieldEnum | AIGatewayKeyScalarFieldEnum[]
  }

  /**
   * AIGatewayKey findMany
   */
  export type AIGatewayKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * Filter, which AIGatewayKeys to fetch.
     */
    where?: AIGatewayKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIGatewayKeys to fetch.
     */
    orderBy?: AIGatewayKeyOrderByWithRelationInput | AIGatewayKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIGatewayKeys.
     */
    cursor?: AIGatewayKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIGatewayKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIGatewayKeys.
     */
    skip?: number
    distinct?: AIGatewayKeyScalarFieldEnum | AIGatewayKeyScalarFieldEnum[]
  }

  /**
   * AIGatewayKey create
   */
  export type AIGatewayKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a AIGatewayKey.
     */
    data: XOR<AIGatewayKeyCreateInput, AIGatewayKeyUncheckedCreateInput>
  }

  /**
   * AIGatewayKey createMany
   */
  export type AIGatewayKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIGatewayKeys.
     */
    data: AIGatewayKeyCreateManyInput | AIGatewayKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIGatewayKey createManyAndReturn
   */
  export type AIGatewayKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * The data used to create many AIGatewayKeys.
     */
    data: AIGatewayKeyCreateManyInput | AIGatewayKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIGatewayKey update
   */
  export type AIGatewayKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a AIGatewayKey.
     */
    data: XOR<AIGatewayKeyUpdateInput, AIGatewayKeyUncheckedUpdateInput>
    /**
     * Choose, which AIGatewayKey to update.
     */
    where: AIGatewayKeyWhereUniqueInput
  }

  /**
   * AIGatewayKey updateMany
   */
  export type AIGatewayKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIGatewayKeys.
     */
    data: XOR<AIGatewayKeyUpdateManyMutationInput, AIGatewayKeyUncheckedUpdateManyInput>
    /**
     * Filter which AIGatewayKeys to update
     */
    where?: AIGatewayKeyWhereInput
    /**
     * Limit how many AIGatewayKeys to update.
     */
    limit?: number
  }

  /**
   * AIGatewayKey updateManyAndReturn
   */
  export type AIGatewayKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * The data used to update AIGatewayKeys.
     */
    data: XOR<AIGatewayKeyUpdateManyMutationInput, AIGatewayKeyUncheckedUpdateManyInput>
    /**
     * Filter which AIGatewayKeys to update
     */
    where?: AIGatewayKeyWhereInput
    /**
     * Limit how many AIGatewayKeys to update.
     */
    limit?: number
  }

  /**
   * AIGatewayKey upsert
   */
  export type AIGatewayKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the AIGatewayKey to update in case it exists.
     */
    where: AIGatewayKeyWhereUniqueInput
    /**
     * In case the AIGatewayKey found by the `where` argument doesn't exist, create a new AIGatewayKey with this data.
     */
    create: XOR<AIGatewayKeyCreateInput, AIGatewayKeyUncheckedCreateInput>
    /**
     * In case the AIGatewayKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIGatewayKeyUpdateInput, AIGatewayKeyUncheckedUpdateInput>
  }

  /**
   * AIGatewayKey delete
   */
  export type AIGatewayKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    /**
     * Filter which AIGatewayKey to delete.
     */
    where: AIGatewayKeyWhereUniqueInput
  }

  /**
   * AIGatewayKey deleteMany
   */
  export type AIGatewayKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIGatewayKeys to delete
     */
    where?: AIGatewayKeyWhereInput
    /**
     * Limit how many AIGatewayKeys to delete.
     */
    limit?: number
  }

  /**
   * AIGatewayKey.usageEvents
   */
  export type AIGatewayKey$usageEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    where?: AIUsageEventWhereInput
    orderBy?: AIUsageEventOrderByWithRelationInput | AIUsageEventOrderByWithRelationInput[]
    cursor?: AIUsageEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIUsageEventScalarFieldEnum | AIUsageEventScalarFieldEnum[]
  }

  /**
   * AIGatewayKey without action
   */
  export type AIGatewayKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
  }


  /**
   * Model AIRateLimit
   */

  export type AggregateAIRateLimit = {
    _count: AIRateLimitCountAggregateOutputType | null
    _avg: AIRateLimitAvgAggregateOutputType | null
    _sum: AIRateLimitSumAggregateOutputType | null
    _min: AIRateLimitMinAggregateOutputType | null
    _max: AIRateLimitMaxAggregateOutputType | null
  }

  export type AIRateLimitAvgAggregateOutputType = {
    requestsPerMinute: number | null
    requestsPerHour: number | null
    requestsPerDay: number | null
    tokensPerMinute: number | null
    tokensPerDay: number | null
    burstLimit: number | null
  }

  export type AIRateLimitSumAggregateOutputType = {
    requestsPerMinute: number | null
    requestsPerHour: number | null
    requestsPerDay: number | null
    tokensPerMinute: number | null
    tokensPerDay: number | null
    burstLimit: number | null
  }

  export type AIRateLimitMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    requestsPerMinute: number | null
    requestsPerHour: number | null
    requestsPerDay: number | null
    tokensPerMinute: number | null
    tokensPerDay: number | null
    burstLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIRateLimitMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    requestsPerMinute: number | null
    requestsPerHour: number | null
    requestsPerDay: number | null
    tokensPerMinute: number | null
    tokensPerDay: number | null
    burstLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIRateLimitCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    requestsPerMinute: number
    requestsPerHour: number
    requestsPerDay: number
    tokensPerMinute: number
    tokensPerDay: number
    burstLimit: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIRateLimitAvgAggregateInputType = {
    requestsPerMinute?: true
    requestsPerHour?: true
    requestsPerDay?: true
    tokensPerMinute?: true
    tokensPerDay?: true
    burstLimit?: true
  }

  export type AIRateLimitSumAggregateInputType = {
    requestsPerMinute?: true
    requestsPerHour?: true
    requestsPerDay?: true
    tokensPerMinute?: true
    tokensPerDay?: true
    burstLimit?: true
  }

  export type AIRateLimitMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    requestsPerMinute?: true
    requestsPerHour?: true
    requestsPerDay?: true
    tokensPerMinute?: true
    tokensPerDay?: true
    burstLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIRateLimitMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    requestsPerMinute?: true
    requestsPerHour?: true
    requestsPerDay?: true
    tokensPerMinute?: true
    tokensPerDay?: true
    burstLimit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIRateLimitCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    requestsPerMinute?: true
    requestsPerHour?: true
    requestsPerDay?: true
    tokensPerMinute?: true
    tokensPerDay?: true
    burstLimit?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIRateLimitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIRateLimit to aggregate.
     */
    where?: AIRateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIRateLimits to fetch.
     */
    orderBy?: AIRateLimitOrderByWithRelationInput | AIRateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIRateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIRateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIRateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIRateLimits
    **/
    _count?: true | AIRateLimitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIRateLimitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIRateLimitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIRateLimitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIRateLimitMaxAggregateInputType
  }

  export type GetAIRateLimitAggregateType<T extends AIRateLimitAggregateArgs> = {
        [P in keyof T & keyof AggregateAIRateLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIRateLimit[P]>
      : GetScalarType<T[P], AggregateAIRateLimit[P]>
  }




  export type AIRateLimitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIRateLimitWhereInput
    orderBy?: AIRateLimitOrderByWithAggregationInput | AIRateLimitOrderByWithAggregationInput[]
    by: AIRateLimitScalarFieldEnum[] | AIRateLimitScalarFieldEnum
    having?: AIRateLimitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIRateLimitCountAggregateInputType | true
    _avg?: AIRateLimitAvgAggregateInputType
    _sum?: AIRateLimitSumAggregateInputType
    _min?: AIRateLimitMinAggregateInputType
    _max?: AIRateLimitMaxAggregateInputType
  }

  export type AIRateLimitGroupByOutputType = {
    id: string
    tenantId: string | null
    name: string
    requestsPerMinute: number
    requestsPerHour: number
    requestsPerDay: number
    tokensPerMinute: number
    tokensPerDay: number
    burstLimit: number
    createdAt: Date
    updatedAt: Date
    _count: AIRateLimitCountAggregateOutputType | null
    _avg: AIRateLimitAvgAggregateOutputType | null
    _sum: AIRateLimitSumAggregateOutputType | null
    _min: AIRateLimitMinAggregateOutputType | null
    _max: AIRateLimitMaxAggregateOutputType | null
  }

  type GetAIRateLimitGroupByPayload<T extends AIRateLimitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIRateLimitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIRateLimitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIRateLimitGroupByOutputType[P]>
            : GetScalarType<T[P], AIRateLimitGroupByOutputType[P]>
        }
      >
    >


  export type AIRateLimitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    requestsPerMinute?: boolean
    requestsPerHour?: boolean
    requestsPerDay?: boolean
    tokensPerMinute?: boolean
    tokensPerDay?: boolean
    burstLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIRateLimit"]>

  export type AIRateLimitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    requestsPerMinute?: boolean
    requestsPerHour?: boolean
    requestsPerDay?: boolean
    tokensPerMinute?: boolean
    tokensPerDay?: boolean
    burstLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIRateLimit"]>

  export type AIRateLimitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    requestsPerMinute?: boolean
    requestsPerHour?: boolean
    requestsPerDay?: boolean
    tokensPerMinute?: boolean
    tokensPerDay?: boolean
    burstLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIRateLimit"]>

  export type AIRateLimitSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    requestsPerMinute?: boolean
    requestsPerHour?: boolean
    requestsPerDay?: boolean
    tokensPerMinute?: boolean
    tokensPerDay?: boolean
    burstLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIRateLimitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "requestsPerMinute" | "requestsPerHour" | "requestsPerDay" | "tokensPerMinute" | "tokensPerDay" | "burstLimit" | "createdAt" | "updatedAt", ExtArgs["result"]["aIRateLimit"]>

  export type $AIRateLimitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIRateLimit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string | null
      name: string
      requestsPerMinute: number
      requestsPerHour: number
      requestsPerDay: number
      tokensPerMinute: number
      tokensPerDay: number
      burstLimit: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIRateLimit"]>
    composites: {}
  }

  type AIRateLimitGetPayload<S extends boolean | null | undefined | AIRateLimitDefaultArgs> = $Result.GetResult<Prisma.$AIRateLimitPayload, S>

  type AIRateLimitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIRateLimitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIRateLimitCountAggregateInputType | true
    }

  export interface AIRateLimitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIRateLimit'], meta: { name: 'AIRateLimit' } }
    /**
     * Find zero or one AIRateLimit that matches the filter.
     * @param {AIRateLimitFindUniqueArgs} args - Arguments to find a AIRateLimit
     * @example
     * // Get one AIRateLimit
     * const aIRateLimit = await prisma.aIRateLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIRateLimitFindUniqueArgs>(args: SelectSubset<T, AIRateLimitFindUniqueArgs<ExtArgs>>): Prisma__AIRateLimitClient<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIRateLimit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIRateLimitFindUniqueOrThrowArgs} args - Arguments to find a AIRateLimit
     * @example
     * // Get one AIRateLimit
     * const aIRateLimit = await prisma.aIRateLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIRateLimitFindUniqueOrThrowArgs>(args: SelectSubset<T, AIRateLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIRateLimitClient<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIRateLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRateLimitFindFirstArgs} args - Arguments to find a AIRateLimit
     * @example
     * // Get one AIRateLimit
     * const aIRateLimit = await prisma.aIRateLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIRateLimitFindFirstArgs>(args?: SelectSubset<T, AIRateLimitFindFirstArgs<ExtArgs>>): Prisma__AIRateLimitClient<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIRateLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRateLimitFindFirstOrThrowArgs} args - Arguments to find a AIRateLimit
     * @example
     * // Get one AIRateLimit
     * const aIRateLimit = await prisma.aIRateLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIRateLimitFindFirstOrThrowArgs>(args?: SelectSubset<T, AIRateLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIRateLimitClient<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIRateLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRateLimitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIRateLimits
     * const aIRateLimits = await prisma.aIRateLimit.findMany()
     * 
     * // Get first 10 AIRateLimits
     * const aIRateLimits = await prisma.aIRateLimit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIRateLimitWithIdOnly = await prisma.aIRateLimit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIRateLimitFindManyArgs>(args?: SelectSubset<T, AIRateLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIRateLimit.
     * @param {AIRateLimitCreateArgs} args - Arguments to create a AIRateLimit.
     * @example
     * // Create one AIRateLimit
     * const AIRateLimit = await prisma.aIRateLimit.create({
     *   data: {
     *     // ... data to create a AIRateLimit
     *   }
     * })
     * 
     */
    create<T extends AIRateLimitCreateArgs>(args: SelectSubset<T, AIRateLimitCreateArgs<ExtArgs>>): Prisma__AIRateLimitClient<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIRateLimits.
     * @param {AIRateLimitCreateManyArgs} args - Arguments to create many AIRateLimits.
     * @example
     * // Create many AIRateLimits
     * const aIRateLimit = await prisma.aIRateLimit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIRateLimitCreateManyArgs>(args?: SelectSubset<T, AIRateLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIRateLimits and returns the data saved in the database.
     * @param {AIRateLimitCreateManyAndReturnArgs} args - Arguments to create many AIRateLimits.
     * @example
     * // Create many AIRateLimits
     * const aIRateLimit = await prisma.aIRateLimit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIRateLimits and only return the `id`
     * const aIRateLimitWithIdOnly = await prisma.aIRateLimit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIRateLimitCreateManyAndReturnArgs>(args?: SelectSubset<T, AIRateLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIRateLimit.
     * @param {AIRateLimitDeleteArgs} args - Arguments to delete one AIRateLimit.
     * @example
     * // Delete one AIRateLimit
     * const AIRateLimit = await prisma.aIRateLimit.delete({
     *   where: {
     *     // ... filter to delete one AIRateLimit
     *   }
     * })
     * 
     */
    delete<T extends AIRateLimitDeleteArgs>(args: SelectSubset<T, AIRateLimitDeleteArgs<ExtArgs>>): Prisma__AIRateLimitClient<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIRateLimit.
     * @param {AIRateLimitUpdateArgs} args - Arguments to update one AIRateLimit.
     * @example
     * // Update one AIRateLimit
     * const aIRateLimit = await prisma.aIRateLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIRateLimitUpdateArgs>(args: SelectSubset<T, AIRateLimitUpdateArgs<ExtArgs>>): Prisma__AIRateLimitClient<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIRateLimits.
     * @param {AIRateLimitDeleteManyArgs} args - Arguments to filter AIRateLimits to delete.
     * @example
     * // Delete a few AIRateLimits
     * const { count } = await prisma.aIRateLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIRateLimitDeleteManyArgs>(args?: SelectSubset<T, AIRateLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIRateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRateLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIRateLimits
     * const aIRateLimit = await prisma.aIRateLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIRateLimitUpdateManyArgs>(args: SelectSubset<T, AIRateLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIRateLimits and returns the data updated in the database.
     * @param {AIRateLimitUpdateManyAndReturnArgs} args - Arguments to update many AIRateLimits.
     * @example
     * // Update many AIRateLimits
     * const aIRateLimit = await prisma.aIRateLimit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIRateLimits and only return the `id`
     * const aIRateLimitWithIdOnly = await prisma.aIRateLimit.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIRateLimitUpdateManyAndReturnArgs>(args: SelectSubset<T, AIRateLimitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIRateLimit.
     * @param {AIRateLimitUpsertArgs} args - Arguments to update or create a AIRateLimit.
     * @example
     * // Update or create a AIRateLimit
     * const aIRateLimit = await prisma.aIRateLimit.upsert({
     *   create: {
     *     // ... data to create a AIRateLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIRateLimit we want to update
     *   }
     * })
     */
    upsert<T extends AIRateLimitUpsertArgs>(args: SelectSubset<T, AIRateLimitUpsertArgs<ExtArgs>>): Prisma__AIRateLimitClient<$Result.GetResult<Prisma.$AIRateLimitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIRateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRateLimitCountArgs} args - Arguments to filter AIRateLimits to count.
     * @example
     * // Count the number of AIRateLimits
     * const count = await prisma.aIRateLimit.count({
     *   where: {
     *     // ... the filter for the AIRateLimits we want to count
     *   }
     * })
    **/
    count<T extends AIRateLimitCountArgs>(
      args?: Subset<T, AIRateLimitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIRateLimitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIRateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRateLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIRateLimitAggregateArgs>(args: Subset<T, AIRateLimitAggregateArgs>): Prisma.PrismaPromise<GetAIRateLimitAggregateType<T>>

    /**
     * Group by AIRateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRateLimitGroupByArgs} args - Group by arguments.
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
      T extends AIRateLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIRateLimitGroupByArgs['orderBy'] }
        : { orderBy?: AIRateLimitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIRateLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIRateLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIRateLimit model
   */
  readonly fields: AIRateLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIRateLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIRateLimitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIRateLimit model
   */
  interface AIRateLimitFieldRefs {
    readonly id: FieldRef<"AIRateLimit", 'String'>
    readonly tenantId: FieldRef<"AIRateLimit", 'String'>
    readonly name: FieldRef<"AIRateLimit", 'String'>
    readonly requestsPerMinute: FieldRef<"AIRateLimit", 'Int'>
    readonly requestsPerHour: FieldRef<"AIRateLimit", 'Int'>
    readonly requestsPerDay: FieldRef<"AIRateLimit", 'Int'>
    readonly tokensPerMinute: FieldRef<"AIRateLimit", 'Int'>
    readonly tokensPerDay: FieldRef<"AIRateLimit", 'Int'>
    readonly burstLimit: FieldRef<"AIRateLimit", 'Int'>
    readonly createdAt: FieldRef<"AIRateLimit", 'DateTime'>
    readonly updatedAt: FieldRef<"AIRateLimit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIRateLimit findUnique
   */
  export type AIRateLimitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which AIRateLimit to fetch.
     */
    where: AIRateLimitWhereUniqueInput
  }

  /**
   * AIRateLimit findUniqueOrThrow
   */
  export type AIRateLimitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which AIRateLimit to fetch.
     */
    where: AIRateLimitWhereUniqueInput
  }

  /**
   * AIRateLimit findFirst
   */
  export type AIRateLimitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which AIRateLimit to fetch.
     */
    where?: AIRateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIRateLimits to fetch.
     */
    orderBy?: AIRateLimitOrderByWithRelationInput | AIRateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIRateLimits.
     */
    cursor?: AIRateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIRateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIRateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIRateLimits.
     */
    distinct?: AIRateLimitScalarFieldEnum | AIRateLimitScalarFieldEnum[]
  }

  /**
   * AIRateLimit findFirstOrThrow
   */
  export type AIRateLimitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which AIRateLimit to fetch.
     */
    where?: AIRateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIRateLimits to fetch.
     */
    orderBy?: AIRateLimitOrderByWithRelationInput | AIRateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIRateLimits.
     */
    cursor?: AIRateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIRateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIRateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIRateLimits.
     */
    distinct?: AIRateLimitScalarFieldEnum | AIRateLimitScalarFieldEnum[]
  }

  /**
   * AIRateLimit findMany
   */
  export type AIRateLimitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which AIRateLimits to fetch.
     */
    where?: AIRateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIRateLimits to fetch.
     */
    orderBy?: AIRateLimitOrderByWithRelationInput | AIRateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIRateLimits.
     */
    cursor?: AIRateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIRateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIRateLimits.
     */
    skip?: number
    distinct?: AIRateLimitScalarFieldEnum | AIRateLimitScalarFieldEnum[]
  }

  /**
   * AIRateLimit create
   */
  export type AIRateLimitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * The data needed to create a AIRateLimit.
     */
    data: XOR<AIRateLimitCreateInput, AIRateLimitUncheckedCreateInput>
  }

  /**
   * AIRateLimit createMany
   */
  export type AIRateLimitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIRateLimits.
     */
    data: AIRateLimitCreateManyInput | AIRateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIRateLimit createManyAndReturn
   */
  export type AIRateLimitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * The data used to create many AIRateLimits.
     */
    data: AIRateLimitCreateManyInput | AIRateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIRateLimit update
   */
  export type AIRateLimitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * The data needed to update a AIRateLimit.
     */
    data: XOR<AIRateLimitUpdateInput, AIRateLimitUncheckedUpdateInput>
    /**
     * Choose, which AIRateLimit to update.
     */
    where: AIRateLimitWhereUniqueInput
  }

  /**
   * AIRateLimit updateMany
   */
  export type AIRateLimitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIRateLimits.
     */
    data: XOR<AIRateLimitUpdateManyMutationInput, AIRateLimitUncheckedUpdateManyInput>
    /**
     * Filter which AIRateLimits to update
     */
    where?: AIRateLimitWhereInput
    /**
     * Limit how many AIRateLimits to update.
     */
    limit?: number
  }

  /**
   * AIRateLimit updateManyAndReturn
   */
  export type AIRateLimitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * The data used to update AIRateLimits.
     */
    data: XOR<AIRateLimitUpdateManyMutationInput, AIRateLimitUncheckedUpdateManyInput>
    /**
     * Filter which AIRateLimits to update
     */
    where?: AIRateLimitWhereInput
    /**
     * Limit how many AIRateLimits to update.
     */
    limit?: number
  }

  /**
   * AIRateLimit upsert
   */
  export type AIRateLimitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * The filter to search for the AIRateLimit to update in case it exists.
     */
    where: AIRateLimitWhereUniqueInput
    /**
     * In case the AIRateLimit found by the `where` argument doesn't exist, create a new AIRateLimit with this data.
     */
    create: XOR<AIRateLimitCreateInput, AIRateLimitUncheckedCreateInput>
    /**
     * In case the AIRateLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIRateLimitUpdateInput, AIRateLimitUncheckedUpdateInput>
  }

  /**
   * AIRateLimit delete
   */
  export type AIRateLimitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
    /**
     * Filter which AIRateLimit to delete.
     */
    where: AIRateLimitWhereUniqueInput
  }

  /**
   * AIRateLimit deleteMany
   */
  export type AIRateLimitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIRateLimits to delete
     */
    where?: AIRateLimitWhereInput
    /**
     * Limit how many AIRateLimits to delete.
     */
    limit?: number
  }

  /**
   * AIRateLimit without action
   */
  export type AIRateLimitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRateLimit
     */
    select?: AIRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRateLimit
     */
    omit?: AIRateLimitOmit<ExtArgs> | null
  }


  /**
   * Model AIBudget
   */

  export type AggregateAIBudget = {
    _count: AIBudgetCountAggregateOutputType | null
    _avg: AIBudgetAvgAggregateOutputType | null
    _sum: AIBudgetSumAggregateOutputType | null
    _min: AIBudgetMinAggregateOutputType | null
    _max: AIBudgetMaxAggregateOutputType | null
  }

  export type AIBudgetAvgAggregateOutputType = {
    monthlyTokenBudget: number | null
    monthlyCostBudget: number | null
    softLimitPercentage: number | null
    hardLimitPercentage: number | null
    currentTokensUsed: number | null
    currentCostUsed: number | null
  }

  export type AIBudgetSumAggregateOutputType = {
    monthlyTokenBudget: number | null
    monthlyCostBudget: number | null
    softLimitPercentage: number | null
    hardLimitPercentage: number | null
    currentTokensUsed: number | null
    currentCostUsed: number | null
  }

  export type AIBudgetMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    monthlyTokenBudget: number | null
    monthlyCostBudget: number | null
    softLimitPercentage: number | null
    hardLimitPercentage: number | null
    currentTokensUsed: number | null
    currentCostUsed: number | null
    periodStart: Date | null
    periodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIBudgetMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    monthlyTokenBudget: number | null
    monthlyCostBudget: number | null
    softLimitPercentage: number | null
    hardLimitPercentage: number | null
    currentTokensUsed: number | null
    currentCostUsed: number | null
    periodStart: Date | null
    periodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIBudgetCountAggregateOutputType = {
    id: number
    tenantId: number
    monthlyTokenBudget: number
    monthlyCostBudget: number
    softLimitPercentage: number
    hardLimitPercentage: number
    currentTokensUsed: number
    currentCostUsed: number
    periodStart: number
    periodEnd: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIBudgetAvgAggregateInputType = {
    monthlyTokenBudget?: true
    monthlyCostBudget?: true
    softLimitPercentage?: true
    hardLimitPercentage?: true
    currentTokensUsed?: true
    currentCostUsed?: true
  }

  export type AIBudgetSumAggregateInputType = {
    monthlyTokenBudget?: true
    monthlyCostBudget?: true
    softLimitPercentage?: true
    hardLimitPercentage?: true
    currentTokensUsed?: true
    currentCostUsed?: true
  }

  export type AIBudgetMinAggregateInputType = {
    id?: true
    tenantId?: true
    monthlyTokenBudget?: true
    monthlyCostBudget?: true
    softLimitPercentage?: true
    hardLimitPercentage?: true
    currentTokensUsed?: true
    currentCostUsed?: true
    periodStart?: true
    periodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIBudgetMaxAggregateInputType = {
    id?: true
    tenantId?: true
    monthlyTokenBudget?: true
    monthlyCostBudget?: true
    softLimitPercentage?: true
    hardLimitPercentage?: true
    currentTokensUsed?: true
    currentCostUsed?: true
    periodStart?: true
    periodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIBudgetCountAggregateInputType = {
    id?: true
    tenantId?: true
    monthlyTokenBudget?: true
    monthlyCostBudget?: true
    softLimitPercentage?: true
    hardLimitPercentage?: true
    currentTokensUsed?: true
    currentCostUsed?: true
    periodStart?: true
    periodEnd?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIBudgetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIBudget to aggregate.
     */
    where?: AIBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIBudgets to fetch.
     */
    orderBy?: AIBudgetOrderByWithRelationInput | AIBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIBudgets
    **/
    _count?: true | AIBudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIBudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIBudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIBudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIBudgetMaxAggregateInputType
  }

  export type GetAIBudgetAggregateType<T extends AIBudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateAIBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIBudget[P]>
      : GetScalarType<T[P], AggregateAIBudget[P]>
  }




  export type AIBudgetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIBudgetWhereInput
    orderBy?: AIBudgetOrderByWithAggregationInput | AIBudgetOrderByWithAggregationInput[]
    by: AIBudgetScalarFieldEnum[] | AIBudgetScalarFieldEnum
    having?: AIBudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIBudgetCountAggregateInputType | true
    _avg?: AIBudgetAvgAggregateInputType
    _sum?: AIBudgetSumAggregateInputType
    _min?: AIBudgetMinAggregateInputType
    _max?: AIBudgetMaxAggregateInputType
  }

  export type AIBudgetGroupByOutputType = {
    id: string
    tenantId: string
    monthlyTokenBudget: number
    monthlyCostBudget: number
    softLimitPercentage: number
    hardLimitPercentage: number
    currentTokensUsed: number
    currentCostUsed: number
    periodStart: Date
    periodEnd: Date
    createdAt: Date
    updatedAt: Date
    _count: AIBudgetCountAggregateOutputType | null
    _avg: AIBudgetAvgAggregateOutputType | null
    _sum: AIBudgetSumAggregateOutputType | null
    _min: AIBudgetMinAggregateOutputType | null
    _max: AIBudgetMaxAggregateOutputType | null
  }

  type GetAIBudgetGroupByPayload<T extends AIBudgetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIBudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIBudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIBudgetGroupByOutputType[P]>
            : GetScalarType<T[P], AIBudgetGroupByOutputType[P]>
        }
      >
    >


  export type AIBudgetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    monthlyTokenBudget?: boolean
    monthlyCostBudget?: boolean
    softLimitPercentage?: boolean
    hardLimitPercentage?: boolean
    currentTokensUsed?: boolean
    currentCostUsed?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIBudget"]>

  export type AIBudgetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    monthlyTokenBudget?: boolean
    monthlyCostBudget?: boolean
    softLimitPercentage?: boolean
    hardLimitPercentage?: boolean
    currentTokensUsed?: boolean
    currentCostUsed?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIBudget"]>

  export type AIBudgetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    monthlyTokenBudget?: boolean
    monthlyCostBudget?: boolean
    softLimitPercentage?: boolean
    hardLimitPercentage?: boolean
    currentTokensUsed?: boolean
    currentCostUsed?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIBudget"]>

  export type AIBudgetSelectScalar = {
    id?: boolean
    tenantId?: boolean
    monthlyTokenBudget?: boolean
    monthlyCostBudget?: boolean
    softLimitPercentage?: boolean
    hardLimitPercentage?: boolean
    currentTokensUsed?: boolean
    currentCostUsed?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIBudgetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "monthlyTokenBudget" | "monthlyCostBudget" | "softLimitPercentage" | "hardLimitPercentage" | "currentTokensUsed" | "currentCostUsed" | "periodStart" | "periodEnd" | "createdAt" | "updatedAt", ExtArgs["result"]["aIBudget"]>

  export type $AIBudgetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIBudget"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      monthlyTokenBudget: number
      monthlyCostBudget: number
      softLimitPercentage: number
      hardLimitPercentage: number
      currentTokensUsed: number
      currentCostUsed: number
      periodStart: Date
      periodEnd: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIBudget"]>
    composites: {}
  }

  type AIBudgetGetPayload<S extends boolean | null | undefined | AIBudgetDefaultArgs> = $Result.GetResult<Prisma.$AIBudgetPayload, S>

  type AIBudgetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIBudgetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIBudgetCountAggregateInputType | true
    }

  export interface AIBudgetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIBudget'], meta: { name: 'AIBudget' } }
    /**
     * Find zero or one AIBudget that matches the filter.
     * @param {AIBudgetFindUniqueArgs} args - Arguments to find a AIBudget
     * @example
     * // Get one AIBudget
     * const aIBudget = await prisma.aIBudget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIBudgetFindUniqueArgs>(args: SelectSubset<T, AIBudgetFindUniqueArgs<ExtArgs>>): Prisma__AIBudgetClient<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIBudget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIBudgetFindUniqueOrThrowArgs} args - Arguments to find a AIBudget
     * @example
     * // Get one AIBudget
     * const aIBudget = await prisma.aIBudget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIBudgetFindUniqueOrThrowArgs>(args: SelectSubset<T, AIBudgetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIBudgetClient<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIBudget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBudgetFindFirstArgs} args - Arguments to find a AIBudget
     * @example
     * // Get one AIBudget
     * const aIBudget = await prisma.aIBudget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIBudgetFindFirstArgs>(args?: SelectSubset<T, AIBudgetFindFirstArgs<ExtArgs>>): Prisma__AIBudgetClient<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIBudget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBudgetFindFirstOrThrowArgs} args - Arguments to find a AIBudget
     * @example
     * // Get one AIBudget
     * const aIBudget = await prisma.aIBudget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIBudgetFindFirstOrThrowArgs>(args?: SelectSubset<T, AIBudgetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIBudgetClient<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIBudgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIBudgets
     * const aIBudgets = await prisma.aIBudget.findMany()
     * 
     * // Get first 10 AIBudgets
     * const aIBudgets = await prisma.aIBudget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIBudgetWithIdOnly = await prisma.aIBudget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIBudgetFindManyArgs>(args?: SelectSubset<T, AIBudgetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIBudget.
     * @param {AIBudgetCreateArgs} args - Arguments to create a AIBudget.
     * @example
     * // Create one AIBudget
     * const AIBudget = await prisma.aIBudget.create({
     *   data: {
     *     // ... data to create a AIBudget
     *   }
     * })
     * 
     */
    create<T extends AIBudgetCreateArgs>(args: SelectSubset<T, AIBudgetCreateArgs<ExtArgs>>): Prisma__AIBudgetClient<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIBudgets.
     * @param {AIBudgetCreateManyArgs} args - Arguments to create many AIBudgets.
     * @example
     * // Create many AIBudgets
     * const aIBudget = await prisma.aIBudget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIBudgetCreateManyArgs>(args?: SelectSubset<T, AIBudgetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIBudgets and returns the data saved in the database.
     * @param {AIBudgetCreateManyAndReturnArgs} args - Arguments to create many AIBudgets.
     * @example
     * // Create many AIBudgets
     * const aIBudget = await prisma.aIBudget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIBudgets and only return the `id`
     * const aIBudgetWithIdOnly = await prisma.aIBudget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIBudgetCreateManyAndReturnArgs>(args?: SelectSubset<T, AIBudgetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIBudget.
     * @param {AIBudgetDeleteArgs} args - Arguments to delete one AIBudget.
     * @example
     * // Delete one AIBudget
     * const AIBudget = await prisma.aIBudget.delete({
     *   where: {
     *     // ... filter to delete one AIBudget
     *   }
     * })
     * 
     */
    delete<T extends AIBudgetDeleteArgs>(args: SelectSubset<T, AIBudgetDeleteArgs<ExtArgs>>): Prisma__AIBudgetClient<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIBudget.
     * @param {AIBudgetUpdateArgs} args - Arguments to update one AIBudget.
     * @example
     * // Update one AIBudget
     * const aIBudget = await prisma.aIBudget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIBudgetUpdateArgs>(args: SelectSubset<T, AIBudgetUpdateArgs<ExtArgs>>): Prisma__AIBudgetClient<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIBudgets.
     * @param {AIBudgetDeleteManyArgs} args - Arguments to filter AIBudgets to delete.
     * @example
     * // Delete a few AIBudgets
     * const { count } = await prisma.aIBudget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIBudgetDeleteManyArgs>(args?: SelectSubset<T, AIBudgetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIBudgets
     * const aIBudget = await prisma.aIBudget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIBudgetUpdateManyArgs>(args: SelectSubset<T, AIBudgetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIBudgets and returns the data updated in the database.
     * @param {AIBudgetUpdateManyAndReturnArgs} args - Arguments to update many AIBudgets.
     * @example
     * // Update many AIBudgets
     * const aIBudget = await prisma.aIBudget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIBudgets and only return the `id`
     * const aIBudgetWithIdOnly = await prisma.aIBudget.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIBudgetUpdateManyAndReturnArgs>(args: SelectSubset<T, AIBudgetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIBudget.
     * @param {AIBudgetUpsertArgs} args - Arguments to update or create a AIBudget.
     * @example
     * // Update or create a AIBudget
     * const aIBudget = await prisma.aIBudget.upsert({
     *   create: {
     *     // ... data to create a AIBudget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIBudget we want to update
     *   }
     * })
     */
    upsert<T extends AIBudgetUpsertArgs>(args: SelectSubset<T, AIBudgetUpsertArgs<ExtArgs>>): Prisma__AIBudgetClient<$Result.GetResult<Prisma.$AIBudgetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBudgetCountArgs} args - Arguments to filter AIBudgets to count.
     * @example
     * // Count the number of AIBudgets
     * const count = await prisma.aIBudget.count({
     *   where: {
     *     // ... the filter for the AIBudgets we want to count
     *   }
     * })
    **/
    count<T extends AIBudgetCountArgs>(
      args?: Subset<T, AIBudgetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIBudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIBudget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIBudgetAggregateArgs>(args: Subset<T, AIBudgetAggregateArgs>): Prisma.PrismaPromise<GetAIBudgetAggregateType<T>>

    /**
     * Group by AIBudget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBudgetGroupByArgs} args - Group by arguments.
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
      T extends AIBudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIBudgetGroupByArgs['orderBy'] }
        : { orderBy?: AIBudgetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIBudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIBudgetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIBudget model
   */
  readonly fields: AIBudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIBudget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIBudgetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIBudget model
   */
  interface AIBudgetFieldRefs {
    readonly id: FieldRef<"AIBudget", 'String'>
    readonly tenantId: FieldRef<"AIBudget", 'String'>
    readonly monthlyTokenBudget: FieldRef<"AIBudget", 'Int'>
    readonly monthlyCostBudget: FieldRef<"AIBudget", 'Float'>
    readonly softLimitPercentage: FieldRef<"AIBudget", 'Int'>
    readonly hardLimitPercentage: FieldRef<"AIBudget", 'Int'>
    readonly currentTokensUsed: FieldRef<"AIBudget", 'Int'>
    readonly currentCostUsed: FieldRef<"AIBudget", 'Float'>
    readonly periodStart: FieldRef<"AIBudget", 'DateTime'>
    readonly periodEnd: FieldRef<"AIBudget", 'DateTime'>
    readonly createdAt: FieldRef<"AIBudget", 'DateTime'>
    readonly updatedAt: FieldRef<"AIBudget", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIBudget findUnique
   */
  export type AIBudgetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AIBudget to fetch.
     */
    where: AIBudgetWhereUniqueInput
  }

  /**
   * AIBudget findUniqueOrThrow
   */
  export type AIBudgetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AIBudget to fetch.
     */
    where: AIBudgetWhereUniqueInput
  }

  /**
   * AIBudget findFirst
   */
  export type AIBudgetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AIBudget to fetch.
     */
    where?: AIBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIBudgets to fetch.
     */
    orderBy?: AIBudgetOrderByWithRelationInput | AIBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIBudgets.
     */
    cursor?: AIBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIBudgets.
     */
    distinct?: AIBudgetScalarFieldEnum | AIBudgetScalarFieldEnum[]
  }

  /**
   * AIBudget findFirstOrThrow
   */
  export type AIBudgetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AIBudget to fetch.
     */
    where?: AIBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIBudgets to fetch.
     */
    orderBy?: AIBudgetOrderByWithRelationInput | AIBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIBudgets.
     */
    cursor?: AIBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIBudgets.
     */
    distinct?: AIBudgetScalarFieldEnum | AIBudgetScalarFieldEnum[]
  }

  /**
   * AIBudget findMany
   */
  export type AIBudgetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AIBudgets to fetch.
     */
    where?: AIBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIBudgets to fetch.
     */
    orderBy?: AIBudgetOrderByWithRelationInput | AIBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIBudgets.
     */
    cursor?: AIBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIBudgets.
     */
    skip?: number
    distinct?: AIBudgetScalarFieldEnum | AIBudgetScalarFieldEnum[]
  }

  /**
   * AIBudget create
   */
  export type AIBudgetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * The data needed to create a AIBudget.
     */
    data: XOR<AIBudgetCreateInput, AIBudgetUncheckedCreateInput>
  }

  /**
   * AIBudget createMany
   */
  export type AIBudgetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIBudgets.
     */
    data: AIBudgetCreateManyInput | AIBudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIBudget createManyAndReturn
   */
  export type AIBudgetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * The data used to create many AIBudgets.
     */
    data: AIBudgetCreateManyInput | AIBudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIBudget update
   */
  export type AIBudgetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * The data needed to update a AIBudget.
     */
    data: XOR<AIBudgetUpdateInput, AIBudgetUncheckedUpdateInput>
    /**
     * Choose, which AIBudget to update.
     */
    where: AIBudgetWhereUniqueInput
  }

  /**
   * AIBudget updateMany
   */
  export type AIBudgetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIBudgets.
     */
    data: XOR<AIBudgetUpdateManyMutationInput, AIBudgetUncheckedUpdateManyInput>
    /**
     * Filter which AIBudgets to update
     */
    where?: AIBudgetWhereInput
    /**
     * Limit how many AIBudgets to update.
     */
    limit?: number
  }

  /**
   * AIBudget updateManyAndReturn
   */
  export type AIBudgetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * The data used to update AIBudgets.
     */
    data: XOR<AIBudgetUpdateManyMutationInput, AIBudgetUncheckedUpdateManyInput>
    /**
     * Filter which AIBudgets to update
     */
    where?: AIBudgetWhereInput
    /**
     * Limit how many AIBudgets to update.
     */
    limit?: number
  }

  /**
   * AIBudget upsert
   */
  export type AIBudgetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * The filter to search for the AIBudget to update in case it exists.
     */
    where: AIBudgetWhereUniqueInput
    /**
     * In case the AIBudget found by the `where` argument doesn't exist, create a new AIBudget with this data.
     */
    create: XOR<AIBudgetCreateInput, AIBudgetUncheckedCreateInput>
    /**
     * In case the AIBudget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIBudgetUpdateInput, AIBudgetUncheckedUpdateInput>
  }

  /**
   * AIBudget delete
   */
  export type AIBudgetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
    /**
     * Filter which AIBudget to delete.
     */
    where: AIBudgetWhereUniqueInput
  }

  /**
   * AIBudget deleteMany
   */
  export type AIBudgetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIBudgets to delete
     */
    where?: AIBudgetWhereInput
    /**
     * Limit how many AIBudgets to delete.
     */
    limit?: number
  }

  /**
   * AIBudget without action
   */
  export type AIBudgetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBudget
     */
    select?: AIBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBudget
     */
    omit?: AIBudgetOmit<ExtArgs> | null
  }


  /**
   * Model AIUsageEvent
   */

  export type AggregateAIUsageEvent = {
    _count: AIUsageEventCountAggregateOutputType | null
    _avg: AIUsageEventAvgAggregateOutputType | null
    _sum: AIUsageEventSumAggregateOutputType | null
    _min: AIUsageEventMinAggregateOutputType | null
    _max: AIUsageEventMaxAggregateOutputType | null
  }

  export type AIUsageEventAvgAggregateOutputType = {
    tokensPrompt: number | null
    tokensCompletion: number | null
    cost: number | null
    latencyMs: number | null
  }

  export type AIUsageEventSumAggregateOutputType = {
    tokensPrompt: number | null
    tokensCompletion: number | null
    cost: number | null
    latencyMs: number | null
  }

  export type AIUsageEventMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    gatewayKeyId: string | null
    modelId: string | null
    tokensPrompt: number | null
    tokensCompletion: number | null
    cost: number | null
    latencyMs: number | null
    success: boolean | null
    timestamp: Date | null
  }

  export type AIUsageEventMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    gatewayKeyId: string | null
    modelId: string | null
    tokensPrompt: number | null
    tokensCompletion: number | null
    cost: number | null
    latencyMs: number | null
    success: boolean | null
    timestamp: Date | null
  }

  export type AIUsageEventCountAggregateOutputType = {
    id: number
    tenantId: number
    gatewayKeyId: number
    modelId: number
    tokensPrompt: number
    tokensCompletion: number
    cost: number
    latencyMs: number
    success: number
    timestamp: number
    metadata: number
    _all: number
  }


  export type AIUsageEventAvgAggregateInputType = {
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
    latencyMs?: true
  }

  export type AIUsageEventSumAggregateInputType = {
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
    latencyMs?: true
  }

  export type AIUsageEventMinAggregateInputType = {
    id?: true
    tenantId?: true
    gatewayKeyId?: true
    modelId?: true
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
    latencyMs?: true
    success?: true
    timestamp?: true
  }

  export type AIUsageEventMaxAggregateInputType = {
    id?: true
    tenantId?: true
    gatewayKeyId?: true
    modelId?: true
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
    latencyMs?: true
    success?: true
    timestamp?: true
  }

  export type AIUsageEventCountAggregateInputType = {
    id?: true
    tenantId?: true
    gatewayKeyId?: true
    modelId?: true
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
    latencyMs?: true
    success?: true
    timestamp?: true
    metadata?: true
    _all?: true
  }

  export type AIUsageEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIUsageEvent to aggregate.
     */
    where?: AIUsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIUsageEvents to fetch.
     */
    orderBy?: AIUsageEventOrderByWithRelationInput | AIUsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIUsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIUsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIUsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIUsageEvents
    **/
    _count?: true | AIUsageEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIUsageEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIUsageEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIUsageEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIUsageEventMaxAggregateInputType
  }

  export type GetAIUsageEventAggregateType<T extends AIUsageEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAIUsageEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIUsageEvent[P]>
      : GetScalarType<T[P], AggregateAIUsageEvent[P]>
  }




  export type AIUsageEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIUsageEventWhereInput
    orderBy?: AIUsageEventOrderByWithAggregationInput | AIUsageEventOrderByWithAggregationInput[]
    by: AIUsageEventScalarFieldEnum[] | AIUsageEventScalarFieldEnum
    having?: AIUsageEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIUsageEventCountAggregateInputType | true
    _avg?: AIUsageEventAvgAggregateInputType
    _sum?: AIUsageEventSumAggregateInputType
    _min?: AIUsageEventMinAggregateInputType
    _max?: AIUsageEventMaxAggregateInputType
  }

  export type AIUsageEventGroupByOutputType = {
    id: string
    tenantId: string
    gatewayKeyId: string | null
    modelId: string | null
    tokensPrompt: number
    tokensCompletion: number
    cost: number
    latencyMs: number
    success: boolean
    timestamp: Date
    metadata: JsonValue
    _count: AIUsageEventCountAggregateOutputType | null
    _avg: AIUsageEventAvgAggregateOutputType | null
    _sum: AIUsageEventSumAggregateOutputType | null
    _min: AIUsageEventMinAggregateOutputType | null
    _max: AIUsageEventMaxAggregateOutputType | null
  }

  type GetAIUsageEventGroupByPayload<T extends AIUsageEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIUsageEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIUsageEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIUsageEventGroupByOutputType[P]>
            : GetScalarType<T[P], AIUsageEventGroupByOutputType[P]>
        }
      >
    >


  export type AIUsageEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    gatewayKeyId?: boolean
    modelId?: boolean
    tokensPrompt?: boolean
    tokensCompletion?: boolean
    cost?: boolean
    latencyMs?: boolean
    success?: boolean
    timestamp?: boolean
    metadata?: boolean
    gatewayKey?: boolean | AIUsageEvent$gatewayKeyArgs<ExtArgs>
  }, ExtArgs["result"]["aIUsageEvent"]>

  export type AIUsageEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    gatewayKeyId?: boolean
    modelId?: boolean
    tokensPrompt?: boolean
    tokensCompletion?: boolean
    cost?: boolean
    latencyMs?: boolean
    success?: boolean
    timestamp?: boolean
    metadata?: boolean
    gatewayKey?: boolean | AIUsageEvent$gatewayKeyArgs<ExtArgs>
  }, ExtArgs["result"]["aIUsageEvent"]>

  export type AIUsageEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    gatewayKeyId?: boolean
    modelId?: boolean
    tokensPrompt?: boolean
    tokensCompletion?: boolean
    cost?: boolean
    latencyMs?: boolean
    success?: boolean
    timestamp?: boolean
    metadata?: boolean
    gatewayKey?: boolean | AIUsageEvent$gatewayKeyArgs<ExtArgs>
  }, ExtArgs["result"]["aIUsageEvent"]>

  export type AIUsageEventSelectScalar = {
    id?: boolean
    tenantId?: boolean
    gatewayKeyId?: boolean
    modelId?: boolean
    tokensPrompt?: boolean
    tokensCompletion?: boolean
    cost?: boolean
    latencyMs?: boolean
    success?: boolean
    timestamp?: boolean
    metadata?: boolean
  }

  export type AIUsageEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "gatewayKeyId" | "modelId" | "tokensPrompt" | "tokensCompletion" | "cost" | "latencyMs" | "success" | "timestamp" | "metadata", ExtArgs["result"]["aIUsageEvent"]>
  export type AIUsageEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gatewayKey?: boolean | AIUsageEvent$gatewayKeyArgs<ExtArgs>
  }
  export type AIUsageEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gatewayKey?: boolean | AIUsageEvent$gatewayKeyArgs<ExtArgs>
  }
  export type AIUsageEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gatewayKey?: boolean | AIUsageEvent$gatewayKeyArgs<ExtArgs>
  }

  export type $AIUsageEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIUsageEvent"
    objects: {
      gatewayKey: Prisma.$AIGatewayKeyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      gatewayKeyId: string | null
      modelId: string | null
      tokensPrompt: number
      tokensCompletion: number
      cost: number
      latencyMs: number
      success: boolean
      timestamp: Date
      metadata: Prisma.JsonValue
    }, ExtArgs["result"]["aIUsageEvent"]>
    composites: {}
  }

  type AIUsageEventGetPayload<S extends boolean | null | undefined | AIUsageEventDefaultArgs> = $Result.GetResult<Prisma.$AIUsageEventPayload, S>

  type AIUsageEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIUsageEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIUsageEventCountAggregateInputType | true
    }

  export interface AIUsageEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIUsageEvent'], meta: { name: 'AIUsageEvent' } }
    /**
     * Find zero or one AIUsageEvent that matches the filter.
     * @param {AIUsageEventFindUniqueArgs} args - Arguments to find a AIUsageEvent
     * @example
     * // Get one AIUsageEvent
     * const aIUsageEvent = await prisma.aIUsageEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIUsageEventFindUniqueArgs>(args: SelectSubset<T, AIUsageEventFindUniqueArgs<ExtArgs>>): Prisma__AIUsageEventClient<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIUsageEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIUsageEventFindUniqueOrThrowArgs} args - Arguments to find a AIUsageEvent
     * @example
     * // Get one AIUsageEvent
     * const aIUsageEvent = await prisma.aIUsageEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIUsageEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AIUsageEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIUsageEventClient<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIUsageEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIUsageEventFindFirstArgs} args - Arguments to find a AIUsageEvent
     * @example
     * // Get one AIUsageEvent
     * const aIUsageEvent = await prisma.aIUsageEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIUsageEventFindFirstArgs>(args?: SelectSubset<T, AIUsageEventFindFirstArgs<ExtArgs>>): Prisma__AIUsageEventClient<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIUsageEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIUsageEventFindFirstOrThrowArgs} args - Arguments to find a AIUsageEvent
     * @example
     * // Get one AIUsageEvent
     * const aIUsageEvent = await prisma.aIUsageEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIUsageEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AIUsageEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIUsageEventClient<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIUsageEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIUsageEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIUsageEvents
     * const aIUsageEvents = await prisma.aIUsageEvent.findMany()
     * 
     * // Get first 10 AIUsageEvents
     * const aIUsageEvents = await prisma.aIUsageEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIUsageEventWithIdOnly = await prisma.aIUsageEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIUsageEventFindManyArgs>(args?: SelectSubset<T, AIUsageEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIUsageEvent.
     * @param {AIUsageEventCreateArgs} args - Arguments to create a AIUsageEvent.
     * @example
     * // Create one AIUsageEvent
     * const AIUsageEvent = await prisma.aIUsageEvent.create({
     *   data: {
     *     // ... data to create a AIUsageEvent
     *   }
     * })
     * 
     */
    create<T extends AIUsageEventCreateArgs>(args: SelectSubset<T, AIUsageEventCreateArgs<ExtArgs>>): Prisma__AIUsageEventClient<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIUsageEvents.
     * @param {AIUsageEventCreateManyArgs} args - Arguments to create many AIUsageEvents.
     * @example
     * // Create many AIUsageEvents
     * const aIUsageEvent = await prisma.aIUsageEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIUsageEventCreateManyArgs>(args?: SelectSubset<T, AIUsageEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIUsageEvents and returns the data saved in the database.
     * @param {AIUsageEventCreateManyAndReturnArgs} args - Arguments to create many AIUsageEvents.
     * @example
     * // Create many AIUsageEvents
     * const aIUsageEvent = await prisma.aIUsageEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIUsageEvents and only return the `id`
     * const aIUsageEventWithIdOnly = await prisma.aIUsageEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIUsageEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AIUsageEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIUsageEvent.
     * @param {AIUsageEventDeleteArgs} args - Arguments to delete one AIUsageEvent.
     * @example
     * // Delete one AIUsageEvent
     * const AIUsageEvent = await prisma.aIUsageEvent.delete({
     *   where: {
     *     // ... filter to delete one AIUsageEvent
     *   }
     * })
     * 
     */
    delete<T extends AIUsageEventDeleteArgs>(args: SelectSubset<T, AIUsageEventDeleteArgs<ExtArgs>>): Prisma__AIUsageEventClient<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIUsageEvent.
     * @param {AIUsageEventUpdateArgs} args - Arguments to update one AIUsageEvent.
     * @example
     * // Update one AIUsageEvent
     * const aIUsageEvent = await prisma.aIUsageEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIUsageEventUpdateArgs>(args: SelectSubset<T, AIUsageEventUpdateArgs<ExtArgs>>): Prisma__AIUsageEventClient<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIUsageEvents.
     * @param {AIUsageEventDeleteManyArgs} args - Arguments to filter AIUsageEvents to delete.
     * @example
     * // Delete a few AIUsageEvents
     * const { count } = await prisma.aIUsageEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIUsageEventDeleteManyArgs>(args?: SelectSubset<T, AIUsageEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIUsageEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIUsageEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIUsageEvents
     * const aIUsageEvent = await prisma.aIUsageEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIUsageEventUpdateManyArgs>(args: SelectSubset<T, AIUsageEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIUsageEvents and returns the data updated in the database.
     * @param {AIUsageEventUpdateManyAndReturnArgs} args - Arguments to update many AIUsageEvents.
     * @example
     * // Update many AIUsageEvents
     * const aIUsageEvent = await prisma.aIUsageEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIUsageEvents and only return the `id`
     * const aIUsageEventWithIdOnly = await prisma.aIUsageEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIUsageEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AIUsageEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIUsageEvent.
     * @param {AIUsageEventUpsertArgs} args - Arguments to update or create a AIUsageEvent.
     * @example
     * // Update or create a AIUsageEvent
     * const aIUsageEvent = await prisma.aIUsageEvent.upsert({
     *   create: {
     *     // ... data to create a AIUsageEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIUsageEvent we want to update
     *   }
     * })
     */
    upsert<T extends AIUsageEventUpsertArgs>(args: SelectSubset<T, AIUsageEventUpsertArgs<ExtArgs>>): Prisma__AIUsageEventClient<$Result.GetResult<Prisma.$AIUsageEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIUsageEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIUsageEventCountArgs} args - Arguments to filter AIUsageEvents to count.
     * @example
     * // Count the number of AIUsageEvents
     * const count = await prisma.aIUsageEvent.count({
     *   where: {
     *     // ... the filter for the AIUsageEvents we want to count
     *   }
     * })
    **/
    count<T extends AIUsageEventCountArgs>(
      args?: Subset<T, AIUsageEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIUsageEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIUsageEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIUsageEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIUsageEventAggregateArgs>(args: Subset<T, AIUsageEventAggregateArgs>): Prisma.PrismaPromise<GetAIUsageEventAggregateType<T>>

    /**
     * Group by AIUsageEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIUsageEventGroupByArgs} args - Group by arguments.
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
      T extends AIUsageEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIUsageEventGroupByArgs['orderBy'] }
        : { orderBy?: AIUsageEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIUsageEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIUsageEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIUsageEvent model
   */
  readonly fields: AIUsageEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIUsageEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIUsageEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gatewayKey<T extends AIUsageEvent$gatewayKeyArgs<ExtArgs> = {}>(args?: Subset<T, AIUsageEvent$gatewayKeyArgs<ExtArgs>>): Prisma__AIGatewayKeyClient<$Result.GetResult<Prisma.$AIGatewayKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AIUsageEvent model
   */
  interface AIUsageEventFieldRefs {
    readonly id: FieldRef<"AIUsageEvent", 'String'>
    readonly tenantId: FieldRef<"AIUsageEvent", 'String'>
    readonly gatewayKeyId: FieldRef<"AIUsageEvent", 'String'>
    readonly modelId: FieldRef<"AIUsageEvent", 'String'>
    readonly tokensPrompt: FieldRef<"AIUsageEvent", 'Int'>
    readonly tokensCompletion: FieldRef<"AIUsageEvent", 'Int'>
    readonly cost: FieldRef<"AIUsageEvent", 'Float'>
    readonly latencyMs: FieldRef<"AIUsageEvent", 'Int'>
    readonly success: FieldRef<"AIUsageEvent", 'Boolean'>
    readonly timestamp: FieldRef<"AIUsageEvent", 'DateTime'>
    readonly metadata: FieldRef<"AIUsageEvent", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * AIUsageEvent findUnique
   */
  export type AIUsageEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * Filter, which AIUsageEvent to fetch.
     */
    where: AIUsageEventWhereUniqueInput
  }

  /**
   * AIUsageEvent findUniqueOrThrow
   */
  export type AIUsageEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * Filter, which AIUsageEvent to fetch.
     */
    where: AIUsageEventWhereUniqueInput
  }

  /**
   * AIUsageEvent findFirst
   */
  export type AIUsageEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * Filter, which AIUsageEvent to fetch.
     */
    where?: AIUsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIUsageEvents to fetch.
     */
    orderBy?: AIUsageEventOrderByWithRelationInput | AIUsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIUsageEvents.
     */
    cursor?: AIUsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIUsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIUsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIUsageEvents.
     */
    distinct?: AIUsageEventScalarFieldEnum | AIUsageEventScalarFieldEnum[]
  }

  /**
   * AIUsageEvent findFirstOrThrow
   */
  export type AIUsageEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * Filter, which AIUsageEvent to fetch.
     */
    where?: AIUsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIUsageEvents to fetch.
     */
    orderBy?: AIUsageEventOrderByWithRelationInput | AIUsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIUsageEvents.
     */
    cursor?: AIUsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIUsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIUsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIUsageEvents.
     */
    distinct?: AIUsageEventScalarFieldEnum | AIUsageEventScalarFieldEnum[]
  }

  /**
   * AIUsageEvent findMany
   */
  export type AIUsageEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * Filter, which AIUsageEvents to fetch.
     */
    where?: AIUsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIUsageEvents to fetch.
     */
    orderBy?: AIUsageEventOrderByWithRelationInput | AIUsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIUsageEvents.
     */
    cursor?: AIUsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIUsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIUsageEvents.
     */
    skip?: number
    distinct?: AIUsageEventScalarFieldEnum | AIUsageEventScalarFieldEnum[]
  }

  /**
   * AIUsageEvent create
   */
  export type AIUsageEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AIUsageEvent.
     */
    data: XOR<AIUsageEventCreateInput, AIUsageEventUncheckedCreateInput>
  }

  /**
   * AIUsageEvent createMany
   */
  export type AIUsageEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIUsageEvents.
     */
    data: AIUsageEventCreateManyInput | AIUsageEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIUsageEvent createManyAndReturn
   */
  export type AIUsageEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * The data used to create many AIUsageEvents.
     */
    data: AIUsageEventCreateManyInput | AIUsageEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIUsageEvent update
   */
  export type AIUsageEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AIUsageEvent.
     */
    data: XOR<AIUsageEventUpdateInput, AIUsageEventUncheckedUpdateInput>
    /**
     * Choose, which AIUsageEvent to update.
     */
    where: AIUsageEventWhereUniqueInput
  }

  /**
   * AIUsageEvent updateMany
   */
  export type AIUsageEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIUsageEvents.
     */
    data: XOR<AIUsageEventUpdateManyMutationInput, AIUsageEventUncheckedUpdateManyInput>
    /**
     * Filter which AIUsageEvents to update
     */
    where?: AIUsageEventWhereInput
    /**
     * Limit how many AIUsageEvents to update.
     */
    limit?: number
  }

  /**
   * AIUsageEvent updateManyAndReturn
   */
  export type AIUsageEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * The data used to update AIUsageEvents.
     */
    data: XOR<AIUsageEventUpdateManyMutationInput, AIUsageEventUncheckedUpdateManyInput>
    /**
     * Filter which AIUsageEvents to update
     */
    where?: AIUsageEventWhereInput
    /**
     * Limit how many AIUsageEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIUsageEvent upsert
   */
  export type AIUsageEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AIUsageEvent to update in case it exists.
     */
    where: AIUsageEventWhereUniqueInput
    /**
     * In case the AIUsageEvent found by the `where` argument doesn't exist, create a new AIUsageEvent with this data.
     */
    create: XOR<AIUsageEventCreateInput, AIUsageEventUncheckedCreateInput>
    /**
     * In case the AIUsageEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIUsageEventUpdateInput, AIUsageEventUncheckedUpdateInput>
  }

  /**
   * AIUsageEvent delete
   */
  export type AIUsageEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
    /**
     * Filter which AIUsageEvent to delete.
     */
    where: AIUsageEventWhereUniqueInput
  }

  /**
   * AIUsageEvent deleteMany
   */
  export type AIUsageEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIUsageEvents to delete
     */
    where?: AIUsageEventWhereInput
    /**
     * Limit how many AIUsageEvents to delete.
     */
    limit?: number
  }

  /**
   * AIUsageEvent.gatewayKey
   */
  export type AIUsageEvent$gatewayKeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIGatewayKey
     */
    select?: AIGatewayKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIGatewayKey
     */
    omit?: AIGatewayKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIGatewayKeyInclude<ExtArgs> | null
    where?: AIGatewayKeyWhereInput
  }

  /**
   * AIUsageEvent without action
   */
  export type AIUsageEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIUsageEvent
     */
    select?: AIUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIUsageEvent
     */
    omit?: AIUsageEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIUsageEventInclude<ExtArgs> | null
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


  export const AIGatewayKeyScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    keyHash: 'keyHash',
    keyPrefix: 'keyPrefix',
    scopes: 'scopes',
    rateLimitProfileId: 'rateLimitProfileId',
    budgetProfileId: 'budgetProfileId',
    isActive: 'isActive',
    isFlagged: 'isFlagged',
    isThrottled: 'isThrottled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastUsedAt: 'lastUsedAt',
    revokedAt: 'revokedAt'
  };

  export type AIGatewayKeyScalarFieldEnum = (typeof AIGatewayKeyScalarFieldEnum)[keyof typeof AIGatewayKeyScalarFieldEnum]


  export const AIRateLimitScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    requestsPerMinute: 'requestsPerMinute',
    requestsPerHour: 'requestsPerHour',
    requestsPerDay: 'requestsPerDay',
    tokensPerMinute: 'tokensPerMinute',
    tokensPerDay: 'tokensPerDay',
    burstLimit: 'burstLimit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIRateLimitScalarFieldEnum = (typeof AIRateLimitScalarFieldEnum)[keyof typeof AIRateLimitScalarFieldEnum]


  export const AIBudgetScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    monthlyTokenBudget: 'monthlyTokenBudget',
    monthlyCostBudget: 'monthlyCostBudget',
    softLimitPercentage: 'softLimitPercentage',
    hardLimitPercentage: 'hardLimitPercentage',
    currentTokensUsed: 'currentTokensUsed',
    currentCostUsed: 'currentCostUsed',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIBudgetScalarFieldEnum = (typeof AIBudgetScalarFieldEnum)[keyof typeof AIBudgetScalarFieldEnum]


  export const AIUsageEventScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    gatewayKeyId: 'gatewayKeyId',
    modelId: 'modelId',
    tokensPrompt: 'tokensPrompt',
    tokensCompletion: 'tokensCompletion',
    cost: 'cost',
    latencyMs: 'latencyMs',
    success: 'success',
    timestamp: 'timestamp',
    metadata: 'metadata'
  };

  export type AIUsageEventScalarFieldEnum = (typeof AIUsageEventScalarFieldEnum)[keyof typeof AIUsageEventScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type AIGatewayKeyWhereInput = {
    AND?: AIGatewayKeyWhereInput | AIGatewayKeyWhereInput[]
    OR?: AIGatewayKeyWhereInput[]
    NOT?: AIGatewayKeyWhereInput | AIGatewayKeyWhereInput[]
    id?: StringFilter<"AIGatewayKey"> | string
    tenantId?: StringFilter<"AIGatewayKey"> | string
    name?: StringFilter<"AIGatewayKey"> | string
    keyHash?: StringFilter<"AIGatewayKey"> | string
    keyPrefix?: StringFilter<"AIGatewayKey"> | string
    scopes?: JsonFilter<"AIGatewayKey">
    rateLimitProfileId?: StringNullableFilter<"AIGatewayKey"> | string | null
    budgetProfileId?: StringNullableFilter<"AIGatewayKey"> | string | null
    isActive?: BoolFilter<"AIGatewayKey"> | boolean
    isFlagged?: BoolFilter<"AIGatewayKey"> | boolean
    isThrottled?: BoolFilter<"AIGatewayKey"> | boolean
    createdAt?: DateTimeFilter<"AIGatewayKey"> | Date | string
    updatedAt?: DateTimeFilter<"AIGatewayKey"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"AIGatewayKey"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"AIGatewayKey"> | Date | string | null
    usageEvents?: AIUsageEventListRelationFilter
  }

  export type AIGatewayKeyOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    scopes?: SortOrder
    rateLimitProfileId?: SortOrderInput | SortOrder
    budgetProfileId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isFlagged?: SortOrder
    isThrottled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    usageEvents?: AIUsageEventOrderByRelationAggregateInput
  }

  export type AIGatewayKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    keyHash?: string
    AND?: AIGatewayKeyWhereInput | AIGatewayKeyWhereInput[]
    OR?: AIGatewayKeyWhereInput[]
    NOT?: AIGatewayKeyWhereInput | AIGatewayKeyWhereInput[]
    tenantId?: StringFilter<"AIGatewayKey"> | string
    name?: StringFilter<"AIGatewayKey"> | string
    keyPrefix?: StringFilter<"AIGatewayKey"> | string
    scopes?: JsonFilter<"AIGatewayKey">
    rateLimitProfileId?: StringNullableFilter<"AIGatewayKey"> | string | null
    budgetProfileId?: StringNullableFilter<"AIGatewayKey"> | string | null
    isActive?: BoolFilter<"AIGatewayKey"> | boolean
    isFlagged?: BoolFilter<"AIGatewayKey"> | boolean
    isThrottled?: BoolFilter<"AIGatewayKey"> | boolean
    createdAt?: DateTimeFilter<"AIGatewayKey"> | Date | string
    updatedAt?: DateTimeFilter<"AIGatewayKey"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"AIGatewayKey"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"AIGatewayKey"> | Date | string | null
    usageEvents?: AIUsageEventListRelationFilter
  }, "id" | "keyHash">

  export type AIGatewayKeyOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    scopes?: SortOrder
    rateLimitProfileId?: SortOrderInput | SortOrder
    budgetProfileId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isFlagged?: SortOrder
    isThrottled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: AIGatewayKeyCountOrderByAggregateInput
    _max?: AIGatewayKeyMaxOrderByAggregateInput
    _min?: AIGatewayKeyMinOrderByAggregateInput
  }

  export type AIGatewayKeyScalarWhereWithAggregatesInput = {
    AND?: AIGatewayKeyScalarWhereWithAggregatesInput | AIGatewayKeyScalarWhereWithAggregatesInput[]
    OR?: AIGatewayKeyScalarWhereWithAggregatesInput[]
    NOT?: AIGatewayKeyScalarWhereWithAggregatesInput | AIGatewayKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIGatewayKey"> | string
    tenantId?: StringWithAggregatesFilter<"AIGatewayKey"> | string
    name?: StringWithAggregatesFilter<"AIGatewayKey"> | string
    keyHash?: StringWithAggregatesFilter<"AIGatewayKey"> | string
    keyPrefix?: StringWithAggregatesFilter<"AIGatewayKey"> | string
    scopes?: JsonWithAggregatesFilter<"AIGatewayKey">
    rateLimitProfileId?: StringNullableWithAggregatesFilter<"AIGatewayKey"> | string | null
    budgetProfileId?: StringNullableWithAggregatesFilter<"AIGatewayKey"> | string | null
    isActive?: BoolWithAggregatesFilter<"AIGatewayKey"> | boolean
    isFlagged?: BoolWithAggregatesFilter<"AIGatewayKey"> | boolean
    isThrottled?: BoolWithAggregatesFilter<"AIGatewayKey"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AIGatewayKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIGatewayKey"> | Date | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"AIGatewayKey"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"AIGatewayKey"> | Date | string | null
  }

  export type AIRateLimitWhereInput = {
    AND?: AIRateLimitWhereInput | AIRateLimitWhereInput[]
    OR?: AIRateLimitWhereInput[]
    NOT?: AIRateLimitWhereInput | AIRateLimitWhereInput[]
    id?: StringFilter<"AIRateLimit"> | string
    tenantId?: StringNullableFilter<"AIRateLimit"> | string | null
    name?: StringFilter<"AIRateLimit"> | string
    requestsPerMinute?: IntFilter<"AIRateLimit"> | number
    requestsPerHour?: IntFilter<"AIRateLimit"> | number
    requestsPerDay?: IntFilter<"AIRateLimit"> | number
    tokensPerMinute?: IntFilter<"AIRateLimit"> | number
    tokensPerDay?: IntFilter<"AIRateLimit"> | number
    burstLimit?: IntFilter<"AIRateLimit"> | number
    createdAt?: DateTimeFilter<"AIRateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"AIRateLimit"> | Date | string
  }

  export type AIRateLimitOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    name?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerHour?: SortOrder
    requestsPerDay?: SortOrder
    tokensPerMinute?: SortOrder
    tokensPerDay?: SortOrder
    burstLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIRateLimitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIRateLimitWhereInput | AIRateLimitWhereInput[]
    OR?: AIRateLimitWhereInput[]
    NOT?: AIRateLimitWhereInput | AIRateLimitWhereInput[]
    tenantId?: StringNullableFilter<"AIRateLimit"> | string | null
    name?: StringFilter<"AIRateLimit"> | string
    requestsPerMinute?: IntFilter<"AIRateLimit"> | number
    requestsPerHour?: IntFilter<"AIRateLimit"> | number
    requestsPerDay?: IntFilter<"AIRateLimit"> | number
    tokensPerMinute?: IntFilter<"AIRateLimit"> | number
    tokensPerDay?: IntFilter<"AIRateLimit"> | number
    burstLimit?: IntFilter<"AIRateLimit"> | number
    createdAt?: DateTimeFilter<"AIRateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"AIRateLimit"> | Date | string
  }, "id">

  export type AIRateLimitOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrderInput | SortOrder
    name?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerHour?: SortOrder
    requestsPerDay?: SortOrder
    tokensPerMinute?: SortOrder
    tokensPerDay?: SortOrder
    burstLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIRateLimitCountOrderByAggregateInput
    _avg?: AIRateLimitAvgOrderByAggregateInput
    _max?: AIRateLimitMaxOrderByAggregateInput
    _min?: AIRateLimitMinOrderByAggregateInput
    _sum?: AIRateLimitSumOrderByAggregateInput
  }

  export type AIRateLimitScalarWhereWithAggregatesInput = {
    AND?: AIRateLimitScalarWhereWithAggregatesInput | AIRateLimitScalarWhereWithAggregatesInput[]
    OR?: AIRateLimitScalarWhereWithAggregatesInput[]
    NOT?: AIRateLimitScalarWhereWithAggregatesInput | AIRateLimitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIRateLimit"> | string
    tenantId?: StringNullableWithAggregatesFilter<"AIRateLimit"> | string | null
    name?: StringWithAggregatesFilter<"AIRateLimit"> | string
    requestsPerMinute?: IntWithAggregatesFilter<"AIRateLimit"> | number
    requestsPerHour?: IntWithAggregatesFilter<"AIRateLimit"> | number
    requestsPerDay?: IntWithAggregatesFilter<"AIRateLimit"> | number
    tokensPerMinute?: IntWithAggregatesFilter<"AIRateLimit"> | number
    tokensPerDay?: IntWithAggregatesFilter<"AIRateLimit"> | number
    burstLimit?: IntWithAggregatesFilter<"AIRateLimit"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AIRateLimit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIRateLimit"> | Date | string
  }

  export type AIBudgetWhereInput = {
    AND?: AIBudgetWhereInput | AIBudgetWhereInput[]
    OR?: AIBudgetWhereInput[]
    NOT?: AIBudgetWhereInput | AIBudgetWhereInput[]
    id?: StringFilter<"AIBudget"> | string
    tenantId?: StringFilter<"AIBudget"> | string
    monthlyTokenBudget?: IntFilter<"AIBudget"> | number
    monthlyCostBudget?: FloatFilter<"AIBudget"> | number
    softLimitPercentage?: IntFilter<"AIBudget"> | number
    hardLimitPercentage?: IntFilter<"AIBudget"> | number
    currentTokensUsed?: IntFilter<"AIBudget"> | number
    currentCostUsed?: FloatFilter<"AIBudget"> | number
    periodStart?: DateTimeFilter<"AIBudget"> | Date | string
    periodEnd?: DateTimeFilter<"AIBudget"> | Date | string
    createdAt?: DateTimeFilter<"AIBudget"> | Date | string
    updatedAt?: DateTimeFilter<"AIBudget"> | Date | string
  }

  export type AIBudgetOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIBudgetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId?: string
    AND?: AIBudgetWhereInput | AIBudgetWhereInput[]
    OR?: AIBudgetWhereInput[]
    NOT?: AIBudgetWhereInput | AIBudgetWhereInput[]
    monthlyTokenBudget?: IntFilter<"AIBudget"> | number
    monthlyCostBudget?: FloatFilter<"AIBudget"> | number
    softLimitPercentage?: IntFilter<"AIBudget"> | number
    hardLimitPercentage?: IntFilter<"AIBudget"> | number
    currentTokensUsed?: IntFilter<"AIBudget"> | number
    currentCostUsed?: FloatFilter<"AIBudget"> | number
    periodStart?: DateTimeFilter<"AIBudget"> | Date | string
    periodEnd?: DateTimeFilter<"AIBudget"> | Date | string
    createdAt?: DateTimeFilter<"AIBudget"> | Date | string
    updatedAt?: DateTimeFilter<"AIBudget"> | Date | string
  }, "id" | "tenantId">

  export type AIBudgetOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIBudgetCountOrderByAggregateInput
    _avg?: AIBudgetAvgOrderByAggregateInput
    _max?: AIBudgetMaxOrderByAggregateInput
    _min?: AIBudgetMinOrderByAggregateInput
    _sum?: AIBudgetSumOrderByAggregateInput
  }

  export type AIBudgetScalarWhereWithAggregatesInput = {
    AND?: AIBudgetScalarWhereWithAggregatesInput | AIBudgetScalarWhereWithAggregatesInput[]
    OR?: AIBudgetScalarWhereWithAggregatesInput[]
    NOT?: AIBudgetScalarWhereWithAggregatesInput | AIBudgetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIBudget"> | string
    tenantId?: StringWithAggregatesFilter<"AIBudget"> | string
    monthlyTokenBudget?: IntWithAggregatesFilter<"AIBudget"> | number
    monthlyCostBudget?: FloatWithAggregatesFilter<"AIBudget"> | number
    softLimitPercentage?: IntWithAggregatesFilter<"AIBudget"> | number
    hardLimitPercentage?: IntWithAggregatesFilter<"AIBudget"> | number
    currentTokensUsed?: IntWithAggregatesFilter<"AIBudget"> | number
    currentCostUsed?: FloatWithAggregatesFilter<"AIBudget"> | number
    periodStart?: DateTimeWithAggregatesFilter<"AIBudget"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"AIBudget"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AIBudget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIBudget"> | Date | string
  }

  export type AIUsageEventWhereInput = {
    AND?: AIUsageEventWhereInput | AIUsageEventWhereInput[]
    OR?: AIUsageEventWhereInput[]
    NOT?: AIUsageEventWhereInput | AIUsageEventWhereInput[]
    id?: StringFilter<"AIUsageEvent"> | string
    tenantId?: StringFilter<"AIUsageEvent"> | string
    gatewayKeyId?: StringNullableFilter<"AIUsageEvent"> | string | null
    modelId?: StringNullableFilter<"AIUsageEvent"> | string | null
    tokensPrompt?: IntFilter<"AIUsageEvent"> | number
    tokensCompletion?: IntFilter<"AIUsageEvent"> | number
    cost?: FloatFilter<"AIUsageEvent"> | number
    latencyMs?: IntFilter<"AIUsageEvent"> | number
    success?: BoolFilter<"AIUsageEvent"> | boolean
    timestamp?: DateTimeFilter<"AIUsageEvent"> | Date | string
    metadata?: JsonFilter<"AIUsageEvent">
    gatewayKey?: XOR<AIGatewayKeyNullableScalarRelationFilter, AIGatewayKeyWhereInput> | null
  }

  export type AIUsageEventOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    gatewayKeyId?: SortOrderInput | SortOrder
    modelId?: SortOrderInput | SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    latencyMs?: SortOrder
    success?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrder
    gatewayKey?: AIGatewayKeyOrderByWithRelationInput
  }

  export type AIUsageEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIUsageEventWhereInput | AIUsageEventWhereInput[]
    OR?: AIUsageEventWhereInput[]
    NOT?: AIUsageEventWhereInput | AIUsageEventWhereInput[]
    tenantId?: StringFilter<"AIUsageEvent"> | string
    gatewayKeyId?: StringNullableFilter<"AIUsageEvent"> | string | null
    modelId?: StringNullableFilter<"AIUsageEvent"> | string | null
    tokensPrompt?: IntFilter<"AIUsageEvent"> | number
    tokensCompletion?: IntFilter<"AIUsageEvent"> | number
    cost?: FloatFilter<"AIUsageEvent"> | number
    latencyMs?: IntFilter<"AIUsageEvent"> | number
    success?: BoolFilter<"AIUsageEvent"> | boolean
    timestamp?: DateTimeFilter<"AIUsageEvent"> | Date | string
    metadata?: JsonFilter<"AIUsageEvent">
    gatewayKey?: XOR<AIGatewayKeyNullableScalarRelationFilter, AIGatewayKeyWhereInput> | null
  }, "id">

  export type AIUsageEventOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    gatewayKeyId?: SortOrderInput | SortOrder
    modelId?: SortOrderInput | SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    latencyMs?: SortOrder
    success?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrder
    _count?: AIUsageEventCountOrderByAggregateInput
    _avg?: AIUsageEventAvgOrderByAggregateInput
    _max?: AIUsageEventMaxOrderByAggregateInput
    _min?: AIUsageEventMinOrderByAggregateInput
    _sum?: AIUsageEventSumOrderByAggregateInput
  }

  export type AIUsageEventScalarWhereWithAggregatesInput = {
    AND?: AIUsageEventScalarWhereWithAggregatesInput | AIUsageEventScalarWhereWithAggregatesInput[]
    OR?: AIUsageEventScalarWhereWithAggregatesInput[]
    NOT?: AIUsageEventScalarWhereWithAggregatesInput | AIUsageEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIUsageEvent"> | string
    tenantId?: StringWithAggregatesFilter<"AIUsageEvent"> | string
    gatewayKeyId?: StringNullableWithAggregatesFilter<"AIUsageEvent"> | string | null
    modelId?: StringNullableWithAggregatesFilter<"AIUsageEvent"> | string | null
    tokensPrompt?: IntWithAggregatesFilter<"AIUsageEvent"> | number
    tokensCompletion?: IntWithAggregatesFilter<"AIUsageEvent"> | number
    cost?: FloatWithAggregatesFilter<"AIUsageEvent"> | number
    latencyMs?: IntWithAggregatesFilter<"AIUsageEvent"> | number
    success?: BoolWithAggregatesFilter<"AIUsageEvent"> | boolean
    timestamp?: DateTimeWithAggregatesFilter<"AIUsageEvent"> | Date | string
    metadata?: JsonWithAggregatesFilter<"AIUsageEvent">
  }

  export type AIGatewayKeyCreateInput = {
    id?: string
    tenantId: string
    name: string
    keyHash: string
    keyPrefix?: string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: string | null
    budgetProfileId?: string | null
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
    usageEvents?: AIUsageEventCreateNestedManyWithoutGatewayKeyInput
  }

  export type AIGatewayKeyUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    keyHash: string
    keyPrefix?: string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: string | null
    budgetProfileId?: string | null
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
    usageEvents?: AIUsageEventUncheckedCreateNestedManyWithoutGatewayKeyInput
  }

  export type AIGatewayKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    isThrottled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageEvents?: AIUsageEventUpdateManyWithoutGatewayKeyNestedInput
  }

  export type AIGatewayKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    isThrottled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usageEvents?: AIUsageEventUncheckedUpdateManyWithoutGatewayKeyNestedInput
  }

  export type AIGatewayKeyCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    keyHash: string
    keyPrefix?: string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: string | null
    budgetProfileId?: string | null
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
  }

  export type AIGatewayKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    isThrottled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIGatewayKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    isThrottled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIRateLimitCreateInput = {
    id?: string
    tenantId?: string | null
    name: string
    requestsPerMinute?: number
    requestsPerHour?: number
    requestsPerDay?: number
    tokensPerMinute?: number
    tokensPerDay?: number
    burstLimit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIRateLimitUncheckedCreateInput = {
    id?: string
    tenantId?: string | null
    name: string
    requestsPerMinute?: number
    requestsPerHour?: number
    requestsPerDay?: number
    tokensPerMinute?: number
    tokensPerDay?: number
    burstLimit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIRateLimitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    requestsPerMinute?: IntFieldUpdateOperationsInput | number
    requestsPerHour?: IntFieldUpdateOperationsInput | number
    requestsPerDay?: IntFieldUpdateOperationsInput | number
    tokensPerMinute?: IntFieldUpdateOperationsInput | number
    tokensPerDay?: IntFieldUpdateOperationsInput | number
    burstLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIRateLimitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    requestsPerMinute?: IntFieldUpdateOperationsInput | number
    requestsPerHour?: IntFieldUpdateOperationsInput | number
    requestsPerDay?: IntFieldUpdateOperationsInput | number
    tokensPerMinute?: IntFieldUpdateOperationsInput | number
    tokensPerDay?: IntFieldUpdateOperationsInput | number
    burstLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIRateLimitCreateManyInput = {
    id?: string
    tenantId?: string | null
    name: string
    requestsPerMinute?: number
    requestsPerHour?: number
    requestsPerDay?: number
    tokensPerMinute?: number
    tokensPerDay?: number
    burstLimit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIRateLimitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    requestsPerMinute?: IntFieldUpdateOperationsInput | number
    requestsPerHour?: IntFieldUpdateOperationsInput | number
    requestsPerDay?: IntFieldUpdateOperationsInput | number
    tokensPerMinute?: IntFieldUpdateOperationsInput | number
    tokensPerDay?: IntFieldUpdateOperationsInput | number
    burstLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIRateLimitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    requestsPerMinute?: IntFieldUpdateOperationsInput | number
    requestsPerHour?: IntFieldUpdateOperationsInput | number
    requestsPerDay?: IntFieldUpdateOperationsInput | number
    tokensPerMinute?: IntFieldUpdateOperationsInput | number
    tokensPerDay?: IntFieldUpdateOperationsInput | number
    burstLimit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIBudgetCreateInput = {
    id?: string
    tenantId: string
    monthlyTokenBudget?: number
    monthlyCostBudget?: number
    softLimitPercentage?: number
    hardLimitPercentage?: number
    currentTokensUsed?: number
    currentCostUsed?: number
    periodStart?: Date | string
    periodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIBudgetUncheckedCreateInput = {
    id?: string
    tenantId: string
    monthlyTokenBudget?: number
    monthlyCostBudget?: number
    softLimitPercentage?: number
    hardLimitPercentage?: number
    currentTokensUsed?: number
    currentCostUsed?: number
    periodStart?: Date | string
    periodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIBudgetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    monthlyTokenBudget?: IntFieldUpdateOperationsInput | number
    monthlyCostBudget?: FloatFieldUpdateOperationsInput | number
    softLimitPercentage?: IntFieldUpdateOperationsInput | number
    hardLimitPercentage?: IntFieldUpdateOperationsInput | number
    currentTokensUsed?: IntFieldUpdateOperationsInput | number
    currentCostUsed?: FloatFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIBudgetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    monthlyTokenBudget?: IntFieldUpdateOperationsInput | number
    monthlyCostBudget?: FloatFieldUpdateOperationsInput | number
    softLimitPercentage?: IntFieldUpdateOperationsInput | number
    hardLimitPercentage?: IntFieldUpdateOperationsInput | number
    currentTokensUsed?: IntFieldUpdateOperationsInput | number
    currentCostUsed?: FloatFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIBudgetCreateManyInput = {
    id?: string
    tenantId: string
    monthlyTokenBudget?: number
    monthlyCostBudget?: number
    softLimitPercentage?: number
    hardLimitPercentage?: number
    currentTokensUsed?: number
    currentCostUsed?: number
    periodStart?: Date | string
    periodEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIBudgetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    monthlyTokenBudget?: IntFieldUpdateOperationsInput | number
    monthlyCostBudget?: FloatFieldUpdateOperationsInput | number
    softLimitPercentage?: IntFieldUpdateOperationsInput | number
    hardLimitPercentage?: IntFieldUpdateOperationsInput | number
    currentTokensUsed?: IntFieldUpdateOperationsInput | number
    currentCostUsed?: FloatFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIBudgetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    monthlyTokenBudget?: IntFieldUpdateOperationsInput | number
    monthlyCostBudget?: FloatFieldUpdateOperationsInput | number
    softLimitPercentage?: IntFieldUpdateOperationsInput | number
    hardLimitPercentage?: IntFieldUpdateOperationsInput | number
    currentTokensUsed?: IntFieldUpdateOperationsInput | number
    currentCostUsed?: FloatFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIUsageEventCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    latencyMs?: number
    success?: boolean
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    gatewayKey?: AIGatewayKeyCreateNestedOneWithoutUsageEventsInput
  }

  export type AIUsageEventUncheckedCreateInput = {
    id?: string
    tenantId: string
    gatewayKeyId?: string | null
    modelId?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    latencyMs?: number
    success?: boolean
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
    gatewayKey?: AIGatewayKeyUpdateOneWithoutUsageEventsNestedInput
  }

  export type AIUsageEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    gatewayKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventCreateManyInput = {
    id?: string
    tenantId: string
    gatewayKeyId?: string | null
    modelId?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    latencyMs?: number
    success?: boolean
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    gatewayKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
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

  export type AIUsageEventListRelationFilter = {
    every?: AIUsageEventWhereInput
    some?: AIUsageEventWhereInput
    none?: AIUsageEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AIUsageEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIGatewayKeyCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    scopes?: SortOrder
    rateLimitProfileId?: SortOrder
    budgetProfileId?: SortOrder
    isActive?: SortOrder
    isFlagged?: SortOrder
    isThrottled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type AIGatewayKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    rateLimitProfileId?: SortOrder
    budgetProfileId?: SortOrder
    isActive?: SortOrder
    isFlagged?: SortOrder
    isThrottled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type AIGatewayKeyMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    rateLimitProfileId?: SortOrder
    budgetProfileId?: SortOrder
    isActive?: SortOrder
    isFlagged?: SortOrder
    isThrottled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
    revokedAt?: SortOrder
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

  export type AIRateLimitCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerHour?: SortOrder
    requestsPerDay?: SortOrder
    tokensPerMinute?: SortOrder
    tokensPerDay?: SortOrder
    burstLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIRateLimitAvgOrderByAggregateInput = {
    requestsPerMinute?: SortOrder
    requestsPerHour?: SortOrder
    requestsPerDay?: SortOrder
    tokensPerMinute?: SortOrder
    tokensPerDay?: SortOrder
    burstLimit?: SortOrder
  }

  export type AIRateLimitMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerHour?: SortOrder
    requestsPerDay?: SortOrder
    tokensPerMinute?: SortOrder
    tokensPerDay?: SortOrder
    burstLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIRateLimitMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerHour?: SortOrder
    requestsPerDay?: SortOrder
    tokensPerMinute?: SortOrder
    tokensPerDay?: SortOrder
    burstLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIRateLimitSumOrderByAggregateInput = {
    requestsPerMinute?: SortOrder
    requestsPerHour?: SortOrder
    requestsPerDay?: SortOrder
    tokensPerMinute?: SortOrder
    tokensPerDay?: SortOrder
    burstLimit?: SortOrder
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AIBudgetCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIBudgetAvgOrderByAggregateInput = {
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
  }

  export type AIBudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIBudgetMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIBudgetSumOrderByAggregateInput = {
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AIGatewayKeyNullableScalarRelationFilter = {
    is?: AIGatewayKeyWhereInput | null
    isNot?: AIGatewayKeyWhereInput | null
  }

  export type AIUsageEventCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    gatewayKeyId?: SortOrder
    modelId?: SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    latencyMs?: SortOrder
    success?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrder
  }

  export type AIUsageEventAvgOrderByAggregateInput = {
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    latencyMs?: SortOrder
  }

  export type AIUsageEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    gatewayKeyId?: SortOrder
    modelId?: SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    latencyMs?: SortOrder
    success?: SortOrder
    timestamp?: SortOrder
  }

  export type AIUsageEventMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    gatewayKeyId?: SortOrder
    modelId?: SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    latencyMs?: SortOrder
    success?: SortOrder
    timestamp?: SortOrder
  }

  export type AIUsageEventSumOrderByAggregateInput = {
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    latencyMs?: SortOrder
  }

  export type AIUsageEventCreateNestedManyWithoutGatewayKeyInput = {
    create?: XOR<AIUsageEventCreateWithoutGatewayKeyInput, AIUsageEventUncheckedCreateWithoutGatewayKeyInput> | AIUsageEventCreateWithoutGatewayKeyInput[] | AIUsageEventUncheckedCreateWithoutGatewayKeyInput[]
    connectOrCreate?: AIUsageEventCreateOrConnectWithoutGatewayKeyInput | AIUsageEventCreateOrConnectWithoutGatewayKeyInput[]
    createMany?: AIUsageEventCreateManyGatewayKeyInputEnvelope
    connect?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
  }

  export type AIUsageEventUncheckedCreateNestedManyWithoutGatewayKeyInput = {
    create?: XOR<AIUsageEventCreateWithoutGatewayKeyInput, AIUsageEventUncheckedCreateWithoutGatewayKeyInput> | AIUsageEventCreateWithoutGatewayKeyInput[] | AIUsageEventUncheckedCreateWithoutGatewayKeyInput[]
    connectOrCreate?: AIUsageEventCreateOrConnectWithoutGatewayKeyInput | AIUsageEventCreateOrConnectWithoutGatewayKeyInput[]
    createMany?: AIUsageEventCreateManyGatewayKeyInputEnvelope
    connect?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AIUsageEventUpdateManyWithoutGatewayKeyNestedInput = {
    create?: XOR<AIUsageEventCreateWithoutGatewayKeyInput, AIUsageEventUncheckedCreateWithoutGatewayKeyInput> | AIUsageEventCreateWithoutGatewayKeyInput[] | AIUsageEventUncheckedCreateWithoutGatewayKeyInput[]
    connectOrCreate?: AIUsageEventCreateOrConnectWithoutGatewayKeyInput | AIUsageEventCreateOrConnectWithoutGatewayKeyInput[]
    upsert?: AIUsageEventUpsertWithWhereUniqueWithoutGatewayKeyInput | AIUsageEventUpsertWithWhereUniqueWithoutGatewayKeyInput[]
    createMany?: AIUsageEventCreateManyGatewayKeyInputEnvelope
    set?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
    disconnect?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
    delete?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
    connect?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
    update?: AIUsageEventUpdateWithWhereUniqueWithoutGatewayKeyInput | AIUsageEventUpdateWithWhereUniqueWithoutGatewayKeyInput[]
    updateMany?: AIUsageEventUpdateManyWithWhereWithoutGatewayKeyInput | AIUsageEventUpdateManyWithWhereWithoutGatewayKeyInput[]
    deleteMany?: AIUsageEventScalarWhereInput | AIUsageEventScalarWhereInput[]
  }

  export type AIUsageEventUncheckedUpdateManyWithoutGatewayKeyNestedInput = {
    create?: XOR<AIUsageEventCreateWithoutGatewayKeyInput, AIUsageEventUncheckedCreateWithoutGatewayKeyInput> | AIUsageEventCreateWithoutGatewayKeyInput[] | AIUsageEventUncheckedCreateWithoutGatewayKeyInput[]
    connectOrCreate?: AIUsageEventCreateOrConnectWithoutGatewayKeyInput | AIUsageEventCreateOrConnectWithoutGatewayKeyInput[]
    upsert?: AIUsageEventUpsertWithWhereUniqueWithoutGatewayKeyInput | AIUsageEventUpsertWithWhereUniqueWithoutGatewayKeyInput[]
    createMany?: AIUsageEventCreateManyGatewayKeyInputEnvelope
    set?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
    disconnect?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
    delete?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
    connect?: AIUsageEventWhereUniqueInput | AIUsageEventWhereUniqueInput[]
    update?: AIUsageEventUpdateWithWhereUniqueWithoutGatewayKeyInput | AIUsageEventUpdateWithWhereUniqueWithoutGatewayKeyInput[]
    updateMany?: AIUsageEventUpdateManyWithWhereWithoutGatewayKeyInput | AIUsageEventUpdateManyWithWhereWithoutGatewayKeyInput[]
    deleteMany?: AIUsageEventScalarWhereInput | AIUsageEventScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AIGatewayKeyCreateNestedOneWithoutUsageEventsInput = {
    create?: XOR<AIGatewayKeyCreateWithoutUsageEventsInput, AIGatewayKeyUncheckedCreateWithoutUsageEventsInput>
    connectOrCreate?: AIGatewayKeyCreateOrConnectWithoutUsageEventsInput
    connect?: AIGatewayKeyWhereUniqueInput
  }

  export type AIGatewayKeyUpdateOneWithoutUsageEventsNestedInput = {
    create?: XOR<AIGatewayKeyCreateWithoutUsageEventsInput, AIGatewayKeyUncheckedCreateWithoutUsageEventsInput>
    connectOrCreate?: AIGatewayKeyCreateOrConnectWithoutUsageEventsInput
    upsert?: AIGatewayKeyUpsertWithoutUsageEventsInput
    disconnect?: AIGatewayKeyWhereInput | boolean
    delete?: AIGatewayKeyWhereInput | boolean
    connect?: AIGatewayKeyWhereUniqueInput
    update?: XOR<XOR<AIGatewayKeyUpdateToOneWithWhereWithoutUsageEventsInput, AIGatewayKeyUpdateWithoutUsageEventsInput>, AIGatewayKeyUncheckedUpdateWithoutUsageEventsInput>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AIUsageEventCreateWithoutGatewayKeyInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    latencyMs?: number
    success?: boolean
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventUncheckedCreateWithoutGatewayKeyInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    latencyMs?: number
    success?: boolean
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventCreateOrConnectWithoutGatewayKeyInput = {
    where: AIUsageEventWhereUniqueInput
    create: XOR<AIUsageEventCreateWithoutGatewayKeyInput, AIUsageEventUncheckedCreateWithoutGatewayKeyInput>
  }

  export type AIUsageEventCreateManyGatewayKeyInputEnvelope = {
    data: AIUsageEventCreateManyGatewayKeyInput | AIUsageEventCreateManyGatewayKeyInput[]
    skipDuplicates?: boolean
  }

  export type AIUsageEventUpsertWithWhereUniqueWithoutGatewayKeyInput = {
    where: AIUsageEventWhereUniqueInput
    update: XOR<AIUsageEventUpdateWithoutGatewayKeyInput, AIUsageEventUncheckedUpdateWithoutGatewayKeyInput>
    create: XOR<AIUsageEventCreateWithoutGatewayKeyInput, AIUsageEventUncheckedCreateWithoutGatewayKeyInput>
  }

  export type AIUsageEventUpdateWithWhereUniqueWithoutGatewayKeyInput = {
    where: AIUsageEventWhereUniqueInput
    data: XOR<AIUsageEventUpdateWithoutGatewayKeyInput, AIUsageEventUncheckedUpdateWithoutGatewayKeyInput>
  }

  export type AIUsageEventUpdateManyWithWhereWithoutGatewayKeyInput = {
    where: AIUsageEventScalarWhereInput
    data: XOR<AIUsageEventUpdateManyMutationInput, AIUsageEventUncheckedUpdateManyWithoutGatewayKeyInput>
  }

  export type AIUsageEventScalarWhereInput = {
    AND?: AIUsageEventScalarWhereInput | AIUsageEventScalarWhereInput[]
    OR?: AIUsageEventScalarWhereInput[]
    NOT?: AIUsageEventScalarWhereInput | AIUsageEventScalarWhereInput[]
    id?: StringFilter<"AIUsageEvent"> | string
    tenantId?: StringFilter<"AIUsageEvent"> | string
    gatewayKeyId?: StringNullableFilter<"AIUsageEvent"> | string | null
    modelId?: StringNullableFilter<"AIUsageEvent"> | string | null
    tokensPrompt?: IntFilter<"AIUsageEvent"> | number
    tokensCompletion?: IntFilter<"AIUsageEvent"> | number
    cost?: FloatFilter<"AIUsageEvent"> | number
    latencyMs?: IntFilter<"AIUsageEvent"> | number
    success?: BoolFilter<"AIUsageEvent"> | boolean
    timestamp?: DateTimeFilter<"AIUsageEvent"> | Date | string
    metadata?: JsonFilter<"AIUsageEvent">
  }

  export type AIGatewayKeyCreateWithoutUsageEventsInput = {
    id?: string
    tenantId: string
    name: string
    keyHash: string
    keyPrefix?: string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: string | null
    budgetProfileId?: string | null
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
  }

  export type AIGatewayKeyUncheckedCreateWithoutUsageEventsInput = {
    id?: string
    tenantId: string
    name: string
    keyHash: string
    keyPrefix?: string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: string | null
    budgetProfileId?: string | null
    isActive?: boolean
    isFlagged?: boolean
    isThrottled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string | null
    revokedAt?: Date | string | null
  }

  export type AIGatewayKeyCreateOrConnectWithoutUsageEventsInput = {
    where: AIGatewayKeyWhereUniqueInput
    create: XOR<AIGatewayKeyCreateWithoutUsageEventsInput, AIGatewayKeyUncheckedCreateWithoutUsageEventsInput>
  }

  export type AIGatewayKeyUpsertWithoutUsageEventsInput = {
    update: XOR<AIGatewayKeyUpdateWithoutUsageEventsInput, AIGatewayKeyUncheckedUpdateWithoutUsageEventsInput>
    create: XOR<AIGatewayKeyCreateWithoutUsageEventsInput, AIGatewayKeyUncheckedCreateWithoutUsageEventsInput>
    where?: AIGatewayKeyWhereInput
  }

  export type AIGatewayKeyUpdateToOneWithWhereWithoutUsageEventsInput = {
    where?: AIGatewayKeyWhereInput
    data: XOR<AIGatewayKeyUpdateWithoutUsageEventsInput, AIGatewayKeyUncheckedUpdateWithoutUsageEventsInput>
  }

  export type AIGatewayKeyUpdateWithoutUsageEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    isThrottled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIGatewayKeyUncheckedUpdateWithoutUsageEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    rateLimitProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isFlagged?: BoolFieldUpdateOperationsInput | boolean
    isThrottled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIUsageEventCreateManyGatewayKeyInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    latencyMs?: number
    success?: boolean
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventUpdateWithoutGatewayKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventUncheckedUpdateWithoutGatewayKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AIUsageEventUncheckedUpdateManyWithoutGatewayKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
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