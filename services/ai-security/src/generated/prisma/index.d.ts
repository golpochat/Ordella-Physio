
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
 * Model AIAuditLog
 * 
 */
export type AIAuditLog = $Result.DefaultSelection<Prisma.$AIAuditLogPayload>
/**
 * Model AIAccessPolicy
 * 
 */
export type AIAccessPolicy = $Result.DefaultSelection<Prisma.$AIAccessPolicyPayload>
/**
 * Model AIPIIIncident
 * 
 */
export type AIPIIIncident = $Result.DefaultSelection<Prisma.$AIPIIIncidentPayload>
/**
 * Model AISecurePromptStore
 * 
 */
export type AISecurePromptStore = $Result.DefaultSelection<Prisma.$AISecurePromptStorePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AIAuditLogs
 * const aIAuditLogs = await prisma.aIAuditLog.findMany()
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
   * // Fetch zero or more AIAuditLogs
   * const aIAuditLogs = await prisma.aIAuditLog.findMany()
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
   * `prisma.aIAuditLog`: Exposes CRUD operations for the **AIAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIAuditLogs
    * const aIAuditLogs = await prisma.aIAuditLog.findMany()
    * ```
    */
  get aIAuditLog(): Prisma.AIAuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIAccessPolicy`: Exposes CRUD operations for the **AIAccessPolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIAccessPolicies
    * const aIAccessPolicies = await prisma.aIAccessPolicy.findMany()
    * ```
    */
  get aIAccessPolicy(): Prisma.AIAccessPolicyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIPIIIncident`: Exposes CRUD operations for the **AIPIIIncident** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIPIIIncidents
    * const aIPIIIncidents = await prisma.aIPIIIncident.findMany()
    * ```
    */
  get aIPIIIncident(): Prisma.AIPIIIncidentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aISecurePromptStore`: Exposes CRUD operations for the **AISecurePromptStore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AISecurePromptStores
    * const aISecurePromptStores = await prisma.aISecurePromptStore.findMany()
    * ```
    */
  get aISecurePromptStore(): Prisma.AISecurePromptStoreDelegate<ExtArgs, ClientOptions>;
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
    AIAuditLog: 'AIAuditLog',
    AIAccessPolicy: 'AIAccessPolicy',
    AIPIIIncident: 'AIPIIIncident',
    AISecurePromptStore: 'AISecurePromptStore'
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
      modelProps: "aIAuditLog" | "aIAccessPolicy" | "aIPIIIncident" | "aISecurePromptStore"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AIAuditLog: {
        payload: Prisma.$AIAuditLogPayload<ExtArgs>
        fields: Prisma.AIAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>
          }
          findFirst: {
            args: Prisma.AIAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>
          }
          findMany: {
            args: Prisma.AIAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>[]
          }
          create: {
            args: Prisma.AIAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>
          }
          createMany: {
            args: Prisma.AIAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>[]
          }
          delete: {
            args: Prisma.AIAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>
          }
          update: {
            args: Prisma.AIAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AIAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIAuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AIAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAuditLogPayload>
          }
          aggregate: {
            args: Prisma.AIAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIAuditLog>
          }
          groupBy: {
            args: Prisma.AIAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AIAuditLogCountAggregateOutputType> | number
          }
        }
      }
      AIAccessPolicy: {
        payload: Prisma.$AIAccessPolicyPayload<ExtArgs>
        fields: Prisma.AIAccessPolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIAccessPolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIAccessPolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>
          }
          findFirst: {
            args: Prisma.AIAccessPolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIAccessPolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>
          }
          findMany: {
            args: Prisma.AIAccessPolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>[]
          }
          create: {
            args: Prisma.AIAccessPolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>
          }
          createMany: {
            args: Prisma.AIAccessPolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIAccessPolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>[]
          }
          delete: {
            args: Prisma.AIAccessPolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>
          }
          update: {
            args: Prisma.AIAccessPolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>
          }
          deleteMany: {
            args: Prisma.AIAccessPolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIAccessPolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIAccessPolicyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>[]
          }
          upsert: {
            args: Prisma.AIAccessPolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAccessPolicyPayload>
          }
          aggregate: {
            args: Prisma.AIAccessPolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIAccessPolicy>
          }
          groupBy: {
            args: Prisma.AIAccessPolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIAccessPolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIAccessPolicyCountArgs<ExtArgs>
            result: $Utils.Optional<AIAccessPolicyCountAggregateOutputType> | number
          }
        }
      }
      AIPIIIncident: {
        payload: Prisma.$AIPIIIncidentPayload<ExtArgs>
        fields: Prisma.AIPIIIncidentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIPIIIncidentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIPIIIncidentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>
          }
          findFirst: {
            args: Prisma.AIPIIIncidentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIPIIIncidentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>
          }
          findMany: {
            args: Prisma.AIPIIIncidentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>[]
          }
          create: {
            args: Prisma.AIPIIIncidentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>
          }
          createMany: {
            args: Prisma.AIPIIIncidentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIPIIIncidentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>[]
          }
          delete: {
            args: Prisma.AIPIIIncidentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>
          }
          update: {
            args: Prisma.AIPIIIncidentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>
          }
          deleteMany: {
            args: Prisma.AIPIIIncidentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIPIIIncidentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIPIIIncidentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>[]
          }
          upsert: {
            args: Prisma.AIPIIIncidentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIPIIIncidentPayload>
          }
          aggregate: {
            args: Prisma.AIPIIIncidentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIPIIIncident>
          }
          groupBy: {
            args: Prisma.AIPIIIncidentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIPIIIncidentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIPIIIncidentCountArgs<ExtArgs>
            result: $Utils.Optional<AIPIIIncidentCountAggregateOutputType> | number
          }
        }
      }
      AISecurePromptStore: {
        payload: Prisma.$AISecurePromptStorePayload<ExtArgs>
        fields: Prisma.AISecurePromptStoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AISecurePromptStoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AISecurePromptStoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>
          }
          findFirst: {
            args: Prisma.AISecurePromptStoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AISecurePromptStoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>
          }
          findMany: {
            args: Prisma.AISecurePromptStoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>[]
          }
          create: {
            args: Prisma.AISecurePromptStoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>
          }
          createMany: {
            args: Prisma.AISecurePromptStoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AISecurePromptStoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>[]
          }
          delete: {
            args: Prisma.AISecurePromptStoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>
          }
          update: {
            args: Prisma.AISecurePromptStoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>
          }
          deleteMany: {
            args: Prisma.AISecurePromptStoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AISecurePromptStoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AISecurePromptStoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>[]
          }
          upsert: {
            args: Prisma.AISecurePromptStoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISecurePromptStorePayload>
          }
          aggregate: {
            args: Prisma.AISecurePromptStoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAISecurePromptStore>
          }
          groupBy: {
            args: Prisma.AISecurePromptStoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<AISecurePromptStoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.AISecurePromptStoreCountArgs<ExtArgs>
            result: $Utils.Optional<AISecurePromptStoreCountAggregateOutputType> | number
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
    aIAuditLog?: AIAuditLogOmit
    aIAccessPolicy?: AIAccessPolicyOmit
    aIPIIIncident?: AIPIIIncidentOmit
    aISecurePromptStore?: AISecurePromptStoreOmit
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
   * Models
   */

  /**
   * Model AIAuditLog
   */

  export type AggregateAIAuditLog = {
    _count: AIAuditLogCountAggregateOutputType | null
    _min: AIAuditLogMinAggregateOutputType | null
    _max: AIAuditLogMaxAggregateOutputType | null
  }

  export type AIAuditLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    apiKeyId: string | null
    action: string | null
    modelId: string | null
    timestamp: Date | null
    piiDetected: boolean | null
    redacted: boolean | null
  }

  export type AIAuditLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    apiKeyId: string | null
    action: string | null
    modelId: string | null
    timestamp: Date | null
    piiDetected: boolean | null
    redacted: boolean | null
  }

  export type AIAuditLogCountAggregateOutputType = {
    id: number
    tenantId: number
    userId: number
    apiKeyId: number
    action: number
    modelId: number
    requestMetadata: number
    responseMetadata: number
    timestamp: number
    piiDetected: number
    redacted: number
    _all: number
  }


  export type AIAuditLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    apiKeyId?: true
    action?: true
    modelId?: true
    timestamp?: true
    piiDetected?: true
    redacted?: true
  }

  export type AIAuditLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    apiKeyId?: true
    action?: true
    modelId?: true
    timestamp?: true
    piiDetected?: true
    redacted?: true
  }

  export type AIAuditLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    apiKeyId?: true
    action?: true
    modelId?: true
    requestMetadata?: true
    responseMetadata?: true
    timestamp?: true
    piiDetected?: true
    redacted?: true
    _all?: true
  }

  export type AIAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAuditLog to aggregate.
     */
    where?: AIAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAuditLogs to fetch.
     */
    orderBy?: AIAuditLogOrderByWithRelationInput | AIAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIAuditLogs
    **/
    _count?: true | AIAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIAuditLogMaxAggregateInputType
  }

  export type GetAIAuditLogAggregateType<T extends AIAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAIAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIAuditLog[P]>
      : GetScalarType<T[P], AggregateAIAuditLog[P]>
  }




  export type AIAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAuditLogWhereInput
    orderBy?: AIAuditLogOrderByWithAggregationInput | AIAuditLogOrderByWithAggregationInput[]
    by: AIAuditLogScalarFieldEnum[] | AIAuditLogScalarFieldEnum
    having?: AIAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIAuditLogCountAggregateInputType | true
    _min?: AIAuditLogMinAggregateInputType
    _max?: AIAuditLogMaxAggregateInputType
  }

  export type AIAuditLogGroupByOutputType = {
    id: string
    tenantId: string
    userId: string | null
    apiKeyId: string | null
    action: string
    modelId: string | null
    requestMetadata: JsonValue
    responseMetadata: JsonValue
    timestamp: Date
    piiDetected: boolean
    redacted: boolean
    _count: AIAuditLogCountAggregateOutputType | null
    _min: AIAuditLogMinAggregateOutputType | null
    _max: AIAuditLogMaxAggregateOutputType | null
  }

  type GetAIAuditLogGroupByPayload<T extends AIAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AIAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AIAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    apiKeyId?: boolean
    action?: boolean
    modelId?: boolean
    requestMetadata?: boolean
    responseMetadata?: boolean
    timestamp?: boolean
    piiDetected?: boolean
    redacted?: boolean
  }, ExtArgs["result"]["aIAuditLog"]>

  export type AIAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    apiKeyId?: boolean
    action?: boolean
    modelId?: boolean
    requestMetadata?: boolean
    responseMetadata?: boolean
    timestamp?: boolean
    piiDetected?: boolean
    redacted?: boolean
  }, ExtArgs["result"]["aIAuditLog"]>

  export type AIAuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    apiKeyId?: boolean
    action?: boolean
    modelId?: boolean
    requestMetadata?: boolean
    responseMetadata?: boolean
    timestamp?: boolean
    piiDetected?: boolean
    redacted?: boolean
  }, ExtArgs["result"]["aIAuditLog"]>

  export type AIAuditLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    apiKeyId?: boolean
    action?: boolean
    modelId?: boolean
    requestMetadata?: boolean
    responseMetadata?: boolean
    timestamp?: boolean
    piiDetected?: boolean
    redacted?: boolean
  }

  export type AIAuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "userId" | "apiKeyId" | "action" | "modelId" | "requestMetadata" | "responseMetadata" | "timestamp" | "piiDetected" | "redacted", ExtArgs["result"]["aIAuditLog"]>

  export type $AIAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIAuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      userId: string | null
      apiKeyId: string | null
      action: string
      modelId: string | null
      requestMetadata: Prisma.JsonValue
      responseMetadata: Prisma.JsonValue
      timestamp: Date
      piiDetected: boolean
      redacted: boolean
    }, ExtArgs["result"]["aIAuditLog"]>
    composites: {}
  }

  type AIAuditLogGetPayload<S extends boolean | null | undefined | AIAuditLogDefaultArgs> = $Result.GetResult<Prisma.$AIAuditLogPayload, S>

  type AIAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIAuditLogCountAggregateInputType | true
    }

  export interface AIAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIAuditLog'], meta: { name: 'AIAuditLog' } }
    /**
     * Find zero or one AIAuditLog that matches the filter.
     * @param {AIAuditLogFindUniqueArgs} args - Arguments to find a AIAuditLog
     * @example
     * // Get one AIAuditLog
     * const aIAuditLog = await prisma.aIAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIAuditLogFindUniqueArgs>(args: SelectSubset<T, AIAuditLogFindUniqueArgs<ExtArgs>>): Prisma__AIAuditLogClient<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIAuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIAuditLogFindUniqueOrThrowArgs} args - Arguments to find a AIAuditLog
     * @example
     * // Get one AIAuditLog
     * const aIAuditLog = await prisma.aIAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AIAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIAuditLogClient<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAuditLogFindFirstArgs} args - Arguments to find a AIAuditLog
     * @example
     * // Get one AIAuditLog
     * const aIAuditLog = await prisma.aIAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIAuditLogFindFirstArgs>(args?: SelectSubset<T, AIAuditLogFindFirstArgs<ExtArgs>>): Prisma__AIAuditLogClient<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAuditLogFindFirstOrThrowArgs} args - Arguments to find a AIAuditLog
     * @example
     * // Get one AIAuditLog
     * const aIAuditLog = await prisma.aIAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AIAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIAuditLogClient<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIAuditLogs
     * const aIAuditLogs = await prisma.aIAuditLog.findMany()
     * 
     * // Get first 10 AIAuditLogs
     * const aIAuditLogs = await prisma.aIAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIAuditLogWithIdOnly = await prisma.aIAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIAuditLogFindManyArgs>(args?: SelectSubset<T, AIAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIAuditLog.
     * @param {AIAuditLogCreateArgs} args - Arguments to create a AIAuditLog.
     * @example
     * // Create one AIAuditLog
     * const AIAuditLog = await prisma.aIAuditLog.create({
     *   data: {
     *     // ... data to create a AIAuditLog
     *   }
     * })
     * 
     */
    create<T extends AIAuditLogCreateArgs>(args: SelectSubset<T, AIAuditLogCreateArgs<ExtArgs>>): Prisma__AIAuditLogClient<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIAuditLogs.
     * @param {AIAuditLogCreateManyArgs} args - Arguments to create many AIAuditLogs.
     * @example
     * // Create many AIAuditLogs
     * const aIAuditLog = await prisma.aIAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIAuditLogCreateManyArgs>(args?: SelectSubset<T, AIAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIAuditLogs and returns the data saved in the database.
     * @param {AIAuditLogCreateManyAndReturnArgs} args - Arguments to create many AIAuditLogs.
     * @example
     * // Create many AIAuditLogs
     * const aIAuditLog = await prisma.aIAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIAuditLogs and only return the `id`
     * const aIAuditLogWithIdOnly = await prisma.aIAuditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AIAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIAuditLog.
     * @param {AIAuditLogDeleteArgs} args - Arguments to delete one AIAuditLog.
     * @example
     * // Delete one AIAuditLog
     * const AIAuditLog = await prisma.aIAuditLog.delete({
     *   where: {
     *     // ... filter to delete one AIAuditLog
     *   }
     * })
     * 
     */
    delete<T extends AIAuditLogDeleteArgs>(args: SelectSubset<T, AIAuditLogDeleteArgs<ExtArgs>>): Prisma__AIAuditLogClient<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIAuditLog.
     * @param {AIAuditLogUpdateArgs} args - Arguments to update one AIAuditLog.
     * @example
     * // Update one AIAuditLog
     * const aIAuditLog = await prisma.aIAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIAuditLogUpdateArgs>(args: SelectSubset<T, AIAuditLogUpdateArgs<ExtArgs>>): Prisma__AIAuditLogClient<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIAuditLogs.
     * @param {AIAuditLogDeleteManyArgs} args - Arguments to filter AIAuditLogs to delete.
     * @example
     * // Delete a few AIAuditLogs
     * const { count } = await prisma.aIAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIAuditLogDeleteManyArgs>(args?: SelectSubset<T, AIAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIAuditLogs
     * const aIAuditLog = await prisma.aIAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIAuditLogUpdateManyArgs>(args: SelectSubset<T, AIAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAuditLogs and returns the data updated in the database.
     * @param {AIAuditLogUpdateManyAndReturnArgs} args - Arguments to update many AIAuditLogs.
     * @example
     * // Update many AIAuditLogs
     * const aIAuditLog = await prisma.aIAuditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIAuditLogs and only return the `id`
     * const aIAuditLogWithIdOnly = await prisma.aIAuditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIAuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AIAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIAuditLog.
     * @param {AIAuditLogUpsertArgs} args - Arguments to update or create a AIAuditLog.
     * @example
     * // Update or create a AIAuditLog
     * const aIAuditLog = await prisma.aIAuditLog.upsert({
     *   create: {
     *     // ... data to create a AIAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AIAuditLogUpsertArgs>(args: SelectSubset<T, AIAuditLogUpsertArgs<ExtArgs>>): Prisma__AIAuditLogClient<$Result.GetResult<Prisma.$AIAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAuditLogCountArgs} args - Arguments to filter AIAuditLogs to count.
     * @example
     * // Count the number of AIAuditLogs
     * const count = await prisma.aIAuditLog.count({
     *   where: {
     *     // ... the filter for the AIAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AIAuditLogCountArgs>(
      args?: Subset<T, AIAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIAuditLogAggregateArgs>(args: Subset<T, AIAuditLogAggregateArgs>): Prisma.PrismaPromise<GetAIAuditLogAggregateType<T>>

    /**
     * Group by AIAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAuditLogGroupByArgs} args - Group by arguments.
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
      T extends AIAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AIAuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIAuditLog model
   */
  readonly fields: AIAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIAuditLog model
   */
  interface AIAuditLogFieldRefs {
    readonly id: FieldRef<"AIAuditLog", 'String'>
    readonly tenantId: FieldRef<"AIAuditLog", 'String'>
    readonly userId: FieldRef<"AIAuditLog", 'String'>
    readonly apiKeyId: FieldRef<"AIAuditLog", 'String'>
    readonly action: FieldRef<"AIAuditLog", 'String'>
    readonly modelId: FieldRef<"AIAuditLog", 'String'>
    readonly requestMetadata: FieldRef<"AIAuditLog", 'Json'>
    readonly responseMetadata: FieldRef<"AIAuditLog", 'Json'>
    readonly timestamp: FieldRef<"AIAuditLog", 'DateTime'>
    readonly piiDetected: FieldRef<"AIAuditLog", 'Boolean'>
    readonly redacted: FieldRef<"AIAuditLog", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AIAuditLog findUnique
   */
  export type AIAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AIAuditLog to fetch.
     */
    where: AIAuditLogWhereUniqueInput
  }

  /**
   * AIAuditLog findUniqueOrThrow
   */
  export type AIAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AIAuditLog to fetch.
     */
    where: AIAuditLogWhereUniqueInput
  }

  /**
   * AIAuditLog findFirst
   */
  export type AIAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AIAuditLog to fetch.
     */
    where?: AIAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAuditLogs to fetch.
     */
    orderBy?: AIAuditLogOrderByWithRelationInput | AIAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAuditLogs.
     */
    cursor?: AIAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAuditLogs.
     */
    distinct?: AIAuditLogScalarFieldEnum | AIAuditLogScalarFieldEnum[]
  }

  /**
   * AIAuditLog findFirstOrThrow
   */
  export type AIAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AIAuditLog to fetch.
     */
    where?: AIAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAuditLogs to fetch.
     */
    orderBy?: AIAuditLogOrderByWithRelationInput | AIAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAuditLogs.
     */
    cursor?: AIAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAuditLogs.
     */
    distinct?: AIAuditLogScalarFieldEnum | AIAuditLogScalarFieldEnum[]
  }

  /**
   * AIAuditLog findMany
   */
  export type AIAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AIAuditLogs to fetch.
     */
    where?: AIAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAuditLogs to fetch.
     */
    orderBy?: AIAuditLogOrderByWithRelationInput | AIAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIAuditLogs.
     */
    cursor?: AIAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAuditLogs.
     */
    skip?: number
    distinct?: AIAuditLogScalarFieldEnum | AIAuditLogScalarFieldEnum[]
  }

  /**
   * AIAuditLog create
   */
  export type AIAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AIAuditLog.
     */
    data: XOR<AIAuditLogCreateInput, AIAuditLogUncheckedCreateInput>
  }

  /**
   * AIAuditLog createMany
   */
  export type AIAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIAuditLogs.
     */
    data: AIAuditLogCreateManyInput | AIAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIAuditLog createManyAndReturn
   */
  export type AIAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AIAuditLogs.
     */
    data: AIAuditLogCreateManyInput | AIAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIAuditLog update
   */
  export type AIAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AIAuditLog.
     */
    data: XOR<AIAuditLogUpdateInput, AIAuditLogUncheckedUpdateInput>
    /**
     * Choose, which AIAuditLog to update.
     */
    where: AIAuditLogWhereUniqueInput
  }

  /**
   * AIAuditLog updateMany
   */
  export type AIAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIAuditLogs.
     */
    data: XOR<AIAuditLogUpdateManyMutationInput, AIAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AIAuditLogs to update
     */
    where?: AIAuditLogWhereInput
    /**
     * Limit how many AIAuditLogs to update.
     */
    limit?: number
  }

  /**
   * AIAuditLog updateManyAndReturn
   */
  export type AIAuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AIAuditLogs.
     */
    data: XOR<AIAuditLogUpdateManyMutationInput, AIAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AIAuditLogs to update
     */
    where?: AIAuditLogWhereInput
    /**
     * Limit how many AIAuditLogs to update.
     */
    limit?: number
  }

  /**
   * AIAuditLog upsert
   */
  export type AIAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AIAuditLog to update in case it exists.
     */
    where: AIAuditLogWhereUniqueInput
    /**
     * In case the AIAuditLog found by the `where` argument doesn't exist, create a new AIAuditLog with this data.
     */
    create: XOR<AIAuditLogCreateInput, AIAuditLogUncheckedCreateInput>
    /**
     * In case the AIAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIAuditLogUpdateInput, AIAuditLogUncheckedUpdateInput>
  }

  /**
   * AIAuditLog delete
   */
  export type AIAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
    /**
     * Filter which AIAuditLog to delete.
     */
    where: AIAuditLogWhereUniqueInput
  }

  /**
   * AIAuditLog deleteMany
   */
  export type AIAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAuditLogs to delete
     */
    where?: AIAuditLogWhereInput
    /**
     * Limit how many AIAuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AIAuditLog without action
   */
  export type AIAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAuditLog
     */
    select?: AIAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAuditLog
     */
    omit?: AIAuditLogOmit<ExtArgs> | null
  }


  /**
   * Model AIAccessPolicy
   */

  export type AggregateAIAccessPolicy = {
    _count: AIAccessPolicyCountAggregateOutputType | null
    _min: AIAccessPolicyMinAggregateOutputType | null
    _max: AIAccessPolicyMaxAggregateOutputType | null
  }

  export type AIAccessPolicyMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIAccessPolicyMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIAccessPolicyCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    allowedRoles: number
    allowedUsers: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIAccessPolicyMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIAccessPolicyMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIAccessPolicyCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    allowedRoles?: true
    allowedUsers?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIAccessPolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAccessPolicy to aggregate.
     */
    where?: AIAccessPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAccessPolicies to fetch.
     */
    orderBy?: AIAccessPolicyOrderByWithRelationInput | AIAccessPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIAccessPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAccessPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAccessPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIAccessPolicies
    **/
    _count?: true | AIAccessPolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIAccessPolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIAccessPolicyMaxAggregateInputType
  }

  export type GetAIAccessPolicyAggregateType<T extends AIAccessPolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateAIAccessPolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIAccessPolicy[P]>
      : GetScalarType<T[P], AggregateAIAccessPolicy[P]>
  }




  export type AIAccessPolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAccessPolicyWhereInput
    orderBy?: AIAccessPolicyOrderByWithAggregationInput | AIAccessPolicyOrderByWithAggregationInput[]
    by: AIAccessPolicyScalarFieldEnum[] | AIAccessPolicyScalarFieldEnum
    having?: AIAccessPolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIAccessPolicyCountAggregateInputType | true
    _min?: AIAccessPolicyMinAggregateInputType
    _max?: AIAccessPolicyMaxAggregateInputType
  }

  export type AIAccessPolicyGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string
    allowedRoles: JsonValue
    allowedUsers: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AIAccessPolicyCountAggregateOutputType | null
    _min: AIAccessPolicyMinAggregateOutputType | null
    _max: AIAccessPolicyMaxAggregateOutputType | null
  }

  type GetAIAccessPolicyGroupByPayload<T extends AIAccessPolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIAccessPolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIAccessPolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIAccessPolicyGroupByOutputType[P]>
            : GetScalarType<T[P], AIAccessPolicyGroupByOutputType[P]>
        }
      >
    >


  export type AIAccessPolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    allowedRoles?: boolean
    allowedUsers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIAccessPolicy"]>

  export type AIAccessPolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    allowedRoles?: boolean
    allowedUsers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIAccessPolicy"]>

  export type AIAccessPolicySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    allowedRoles?: boolean
    allowedUsers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIAccessPolicy"]>

  export type AIAccessPolicySelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    allowedRoles?: boolean
    allowedUsers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIAccessPolicyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "allowedRoles" | "allowedUsers" | "createdAt" | "updatedAt", ExtArgs["result"]["aIAccessPolicy"]>

  export type $AIAccessPolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIAccessPolicy"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string
      allowedRoles: Prisma.JsonValue
      allowedUsers: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIAccessPolicy"]>
    composites: {}
  }

  type AIAccessPolicyGetPayload<S extends boolean | null | undefined | AIAccessPolicyDefaultArgs> = $Result.GetResult<Prisma.$AIAccessPolicyPayload, S>

  type AIAccessPolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIAccessPolicyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIAccessPolicyCountAggregateInputType | true
    }

  export interface AIAccessPolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIAccessPolicy'], meta: { name: 'AIAccessPolicy' } }
    /**
     * Find zero or one AIAccessPolicy that matches the filter.
     * @param {AIAccessPolicyFindUniqueArgs} args - Arguments to find a AIAccessPolicy
     * @example
     * // Get one AIAccessPolicy
     * const aIAccessPolicy = await prisma.aIAccessPolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIAccessPolicyFindUniqueArgs>(args: SelectSubset<T, AIAccessPolicyFindUniqueArgs<ExtArgs>>): Prisma__AIAccessPolicyClient<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIAccessPolicy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIAccessPolicyFindUniqueOrThrowArgs} args - Arguments to find a AIAccessPolicy
     * @example
     * // Get one AIAccessPolicy
     * const aIAccessPolicy = await prisma.aIAccessPolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIAccessPolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, AIAccessPolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIAccessPolicyClient<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIAccessPolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAccessPolicyFindFirstArgs} args - Arguments to find a AIAccessPolicy
     * @example
     * // Get one AIAccessPolicy
     * const aIAccessPolicy = await prisma.aIAccessPolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIAccessPolicyFindFirstArgs>(args?: SelectSubset<T, AIAccessPolicyFindFirstArgs<ExtArgs>>): Prisma__AIAccessPolicyClient<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIAccessPolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAccessPolicyFindFirstOrThrowArgs} args - Arguments to find a AIAccessPolicy
     * @example
     * // Get one AIAccessPolicy
     * const aIAccessPolicy = await prisma.aIAccessPolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIAccessPolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, AIAccessPolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIAccessPolicyClient<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIAccessPolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAccessPolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIAccessPolicies
     * const aIAccessPolicies = await prisma.aIAccessPolicy.findMany()
     * 
     * // Get first 10 AIAccessPolicies
     * const aIAccessPolicies = await prisma.aIAccessPolicy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIAccessPolicyWithIdOnly = await prisma.aIAccessPolicy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIAccessPolicyFindManyArgs>(args?: SelectSubset<T, AIAccessPolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIAccessPolicy.
     * @param {AIAccessPolicyCreateArgs} args - Arguments to create a AIAccessPolicy.
     * @example
     * // Create one AIAccessPolicy
     * const AIAccessPolicy = await prisma.aIAccessPolicy.create({
     *   data: {
     *     // ... data to create a AIAccessPolicy
     *   }
     * })
     * 
     */
    create<T extends AIAccessPolicyCreateArgs>(args: SelectSubset<T, AIAccessPolicyCreateArgs<ExtArgs>>): Prisma__AIAccessPolicyClient<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIAccessPolicies.
     * @param {AIAccessPolicyCreateManyArgs} args - Arguments to create many AIAccessPolicies.
     * @example
     * // Create many AIAccessPolicies
     * const aIAccessPolicy = await prisma.aIAccessPolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIAccessPolicyCreateManyArgs>(args?: SelectSubset<T, AIAccessPolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIAccessPolicies and returns the data saved in the database.
     * @param {AIAccessPolicyCreateManyAndReturnArgs} args - Arguments to create many AIAccessPolicies.
     * @example
     * // Create many AIAccessPolicies
     * const aIAccessPolicy = await prisma.aIAccessPolicy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIAccessPolicies and only return the `id`
     * const aIAccessPolicyWithIdOnly = await prisma.aIAccessPolicy.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIAccessPolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, AIAccessPolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIAccessPolicy.
     * @param {AIAccessPolicyDeleteArgs} args - Arguments to delete one AIAccessPolicy.
     * @example
     * // Delete one AIAccessPolicy
     * const AIAccessPolicy = await prisma.aIAccessPolicy.delete({
     *   where: {
     *     // ... filter to delete one AIAccessPolicy
     *   }
     * })
     * 
     */
    delete<T extends AIAccessPolicyDeleteArgs>(args: SelectSubset<T, AIAccessPolicyDeleteArgs<ExtArgs>>): Prisma__AIAccessPolicyClient<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIAccessPolicy.
     * @param {AIAccessPolicyUpdateArgs} args - Arguments to update one AIAccessPolicy.
     * @example
     * // Update one AIAccessPolicy
     * const aIAccessPolicy = await prisma.aIAccessPolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIAccessPolicyUpdateArgs>(args: SelectSubset<T, AIAccessPolicyUpdateArgs<ExtArgs>>): Prisma__AIAccessPolicyClient<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIAccessPolicies.
     * @param {AIAccessPolicyDeleteManyArgs} args - Arguments to filter AIAccessPolicies to delete.
     * @example
     * // Delete a few AIAccessPolicies
     * const { count } = await prisma.aIAccessPolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIAccessPolicyDeleteManyArgs>(args?: SelectSubset<T, AIAccessPolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAccessPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAccessPolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIAccessPolicies
     * const aIAccessPolicy = await prisma.aIAccessPolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIAccessPolicyUpdateManyArgs>(args: SelectSubset<T, AIAccessPolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAccessPolicies and returns the data updated in the database.
     * @param {AIAccessPolicyUpdateManyAndReturnArgs} args - Arguments to update many AIAccessPolicies.
     * @example
     * // Update many AIAccessPolicies
     * const aIAccessPolicy = await prisma.aIAccessPolicy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIAccessPolicies and only return the `id`
     * const aIAccessPolicyWithIdOnly = await prisma.aIAccessPolicy.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIAccessPolicyUpdateManyAndReturnArgs>(args: SelectSubset<T, AIAccessPolicyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIAccessPolicy.
     * @param {AIAccessPolicyUpsertArgs} args - Arguments to update or create a AIAccessPolicy.
     * @example
     * // Update or create a AIAccessPolicy
     * const aIAccessPolicy = await prisma.aIAccessPolicy.upsert({
     *   create: {
     *     // ... data to create a AIAccessPolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIAccessPolicy we want to update
     *   }
     * })
     */
    upsert<T extends AIAccessPolicyUpsertArgs>(args: SelectSubset<T, AIAccessPolicyUpsertArgs<ExtArgs>>): Prisma__AIAccessPolicyClient<$Result.GetResult<Prisma.$AIAccessPolicyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIAccessPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAccessPolicyCountArgs} args - Arguments to filter AIAccessPolicies to count.
     * @example
     * // Count the number of AIAccessPolicies
     * const count = await prisma.aIAccessPolicy.count({
     *   where: {
     *     // ... the filter for the AIAccessPolicies we want to count
     *   }
     * })
    **/
    count<T extends AIAccessPolicyCountArgs>(
      args?: Subset<T, AIAccessPolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIAccessPolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIAccessPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAccessPolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIAccessPolicyAggregateArgs>(args: Subset<T, AIAccessPolicyAggregateArgs>): Prisma.PrismaPromise<GetAIAccessPolicyAggregateType<T>>

    /**
     * Group by AIAccessPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAccessPolicyGroupByArgs} args - Group by arguments.
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
      T extends AIAccessPolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIAccessPolicyGroupByArgs['orderBy'] }
        : { orderBy?: AIAccessPolicyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIAccessPolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIAccessPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIAccessPolicy model
   */
  readonly fields: AIAccessPolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIAccessPolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIAccessPolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIAccessPolicy model
   */
  interface AIAccessPolicyFieldRefs {
    readonly id: FieldRef<"AIAccessPolicy", 'String'>
    readonly tenantId: FieldRef<"AIAccessPolicy", 'String'>
    readonly modelId: FieldRef<"AIAccessPolicy", 'String'>
    readonly allowedRoles: FieldRef<"AIAccessPolicy", 'Json'>
    readonly allowedUsers: FieldRef<"AIAccessPolicy", 'Json'>
    readonly createdAt: FieldRef<"AIAccessPolicy", 'DateTime'>
    readonly updatedAt: FieldRef<"AIAccessPolicy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIAccessPolicy findUnique
   */
  export type AIAccessPolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * Filter, which AIAccessPolicy to fetch.
     */
    where: AIAccessPolicyWhereUniqueInput
  }

  /**
   * AIAccessPolicy findUniqueOrThrow
   */
  export type AIAccessPolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * Filter, which AIAccessPolicy to fetch.
     */
    where: AIAccessPolicyWhereUniqueInput
  }

  /**
   * AIAccessPolicy findFirst
   */
  export type AIAccessPolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * Filter, which AIAccessPolicy to fetch.
     */
    where?: AIAccessPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAccessPolicies to fetch.
     */
    orderBy?: AIAccessPolicyOrderByWithRelationInput | AIAccessPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAccessPolicies.
     */
    cursor?: AIAccessPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAccessPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAccessPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAccessPolicies.
     */
    distinct?: AIAccessPolicyScalarFieldEnum | AIAccessPolicyScalarFieldEnum[]
  }

  /**
   * AIAccessPolicy findFirstOrThrow
   */
  export type AIAccessPolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * Filter, which AIAccessPolicy to fetch.
     */
    where?: AIAccessPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAccessPolicies to fetch.
     */
    orderBy?: AIAccessPolicyOrderByWithRelationInput | AIAccessPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAccessPolicies.
     */
    cursor?: AIAccessPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAccessPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAccessPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAccessPolicies.
     */
    distinct?: AIAccessPolicyScalarFieldEnum | AIAccessPolicyScalarFieldEnum[]
  }

  /**
   * AIAccessPolicy findMany
   */
  export type AIAccessPolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * Filter, which AIAccessPolicies to fetch.
     */
    where?: AIAccessPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAccessPolicies to fetch.
     */
    orderBy?: AIAccessPolicyOrderByWithRelationInput | AIAccessPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIAccessPolicies.
     */
    cursor?: AIAccessPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAccessPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAccessPolicies.
     */
    skip?: number
    distinct?: AIAccessPolicyScalarFieldEnum | AIAccessPolicyScalarFieldEnum[]
  }

  /**
   * AIAccessPolicy create
   */
  export type AIAccessPolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * The data needed to create a AIAccessPolicy.
     */
    data: XOR<AIAccessPolicyCreateInput, AIAccessPolicyUncheckedCreateInput>
  }

  /**
   * AIAccessPolicy createMany
   */
  export type AIAccessPolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIAccessPolicies.
     */
    data: AIAccessPolicyCreateManyInput | AIAccessPolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIAccessPolicy createManyAndReturn
   */
  export type AIAccessPolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * The data used to create many AIAccessPolicies.
     */
    data: AIAccessPolicyCreateManyInput | AIAccessPolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIAccessPolicy update
   */
  export type AIAccessPolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * The data needed to update a AIAccessPolicy.
     */
    data: XOR<AIAccessPolicyUpdateInput, AIAccessPolicyUncheckedUpdateInput>
    /**
     * Choose, which AIAccessPolicy to update.
     */
    where: AIAccessPolicyWhereUniqueInput
  }

  /**
   * AIAccessPolicy updateMany
   */
  export type AIAccessPolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIAccessPolicies.
     */
    data: XOR<AIAccessPolicyUpdateManyMutationInput, AIAccessPolicyUncheckedUpdateManyInput>
    /**
     * Filter which AIAccessPolicies to update
     */
    where?: AIAccessPolicyWhereInput
    /**
     * Limit how many AIAccessPolicies to update.
     */
    limit?: number
  }

  /**
   * AIAccessPolicy updateManyAndReturn
   */
  export type AIAccessPolicyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * The data used to update AIAccessPolicies.
     */
    data: XOR<AIAccessPolicyUpdateManyMutationInput, AIAccessPolicyUncheckedUpdateManyInput>
    /**
     * Filter which AIAccessPolicies to update
     */
    where?: AIAccessPolicyWhereInput
    /**
     * Limit how many AIAccessPolicies to update.
     */
    limit?: number
  }

  /**
   * AIAccessPolicy upsert
   */
  export type AIAccessPolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * The filter to search for the AIAccessPolicy to update in case it exists.
     */
    where: AIAccessPolicyWhereUniqueInput
    /**
     * In case the AIAccessPolicy found by the `where` argument doesn't exist, create a new AIAccessPolicy with this data.
     */
    create: XOR<AIAccessPolicyCreateInput, AIAccessPolicyUncheckedCreateInput>
    /**
     * In case the AIAccessPolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIAccessPolicyUpdateInput, AIAccessPolicyUncheckedUpdateInput>
  }

  /**
   * AIAccessPolicy delete
   */
  export type AIAccessPolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
    /**
     * Filter which AIAccessPolicy to delete.
     */
    where: AIAccessPolicyWhereUniqueInput
  }

  /**
   * AIAccessPolicy deleteMany
   */
  export type AIAccessPolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAccessPolicies to delete
     */
    where?: AIAccessPolicyWhereInput
    /**
     * Limit how many AIAccessPolicies to delete.
     */
    limit?: number
  }

  /**
   * AIAccessPolicy without action
   */
  export type AIAccessPolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAccessPolicy
     */
    select?: AIAccessPolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAccessPolicy
     */
    omit?: AIAccessPolicyOmit<ExtArgs> | null
  }


  /**
   * Model AIPIIIncident
   */

  export type AggregateAIPIIIncident = {
    _count: AIPIIIncidentCountAggregateOutputType | null
    _min: AIPIIIncidentMinAggregateOutputType | null
    _max: AIPIIIncidentMaxAggregateOutputType | null
  }

  export type AIPIIIncidentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    piiType: string | null
    originalText: string | null
    redactedText: string | null
    detectedAt: Date | null
    resolvedAt: Date | null
  }

  export type AIPIIIncidentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    piiType: string | null
    originalText: string | null
    redactedText: string | null
    detectedAt: Date | null
    resolvedAt: Date | null
  }

  export type AIPIIIncidentCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    piiType: number
    originalText: number
    redactedText: number
    detectedAt: number
    resolvedAt: number
    _all: number
  }


  export type AIPIIIncidentMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    piiType?: true
    originalText?: true
    redactedText?: true
    detectedAt?: true
    resolvedAt?: true
  }

  export type AIPIIIncidentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    piiType?: true
    originalText?: true
    redactedText?: true
    detectedAt?: true
    resolvedAt?: true
  }

  export type AIPIIIncidentCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    piiType?: true
    originalText?: true
    redactedText?: true
    detectedAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type AIPIIIncidentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIPIIIncident to aggregate.
     */
    where?: AIPIIIncidentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIPIIIncidents to fetch.
     */
    orderBy?: AIPIIIncidentOrderByWithRelationInput | AIPIIIncidentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIPIIIncidentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIPIIIncidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIPIIIncidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIPIIIncidents
    **/
    _count?: true | AIPIIIncidentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIPIIIncidentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIPIIIncidentMaxAggregateInputType
  }

  export type GetAIPIIIncidentAggregateType<T extends AIPIIIncidentAggregateArgs> = {
        [P in keyof T & keyof AggregateAIPIIIncident]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIPIIIncident[P]>
      : GetScalarType<T[P], AggregateAIPIIIncident[P]>
  }




  export type AIPIIIncidentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIPIIIncidentWhereInput
    orderBy?: AIPIIIncidentOrderByWithAggregationInput | AIPIIIncidentOrderByWithAggregationInput[]
    by: AIPIIIncidentScalarFieldEnum[] | AIPIIIncidentScalarFieldEnum
    having?: AIPIIIncidentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIPIIIncidentCountAggregateInputType | true
    _min?: AIPIIIncidentMinAggregateInputType
    _max?: AIPIIIncidentMaxAggregateInputType
  }

  export type AIPIIIncidentGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string | null
    piiType: string
    originalText: string
    redactedText: string
    detectedAt: Date
    resolvedAt: Date | null
    _count: AIPIIIncidentCountAggregateOutputType | null
    _min: AIPIIIncidentMinAggregateOutputType | null
    _max: AIPIIIncidentMaxAggregateOutputType | null
  }

  type GetAIPIIIncidentGroupByPayload<T extends AIPIIIncidentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIPIIIncidentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIPIIIncidentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIPIIIncidentGroupByOutputType[P]>
            : GetScalarType<T[P], AIPIIIncidentGroupByOutputType[P]>
        }
      >
    >


  export type AIPIIIncidentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    piiType?: boolean
    originalText?: boolean
    redactedText?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aIPIIIncident"]>

  export type AIPIIIncidentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    piiType?: boolean
    originalText?: boolean
    redactedText?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aIPIIIncident"]>

  export type AIPIIIncidentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    piiType?: boolean
    originalText?: boolean
    redactedText?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aIPIIIncident"]>

  export type AIPIIIncidentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    piiType?: boolean
    originalText?: boolean
    redactedText?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }

  export type AIPIIIncidentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "piiType" | "originalText" | "redactedText" | "detectedAt" | "resolvedAt", ExtArgs["result"]["aIPIIIncident"]>

  export type $AIPIIIncidentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIPIIIncident"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string | null
      piiType: string
      originalText: string
      redactedText: string
      detectedAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["aIPIIIncident"]>
    composites: {}
  }

  type AIPIIIncidentGetPayload<S extends boolean | null | undefined | AIPIIIncidentDefaultArgs> = $Result.GetResult<Prisma.$AIPIIIncidentPayload, S>

  type AIPIIIncidentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIPIIIncidentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIPIIIncidentCountAggregateInputType | true
    }

  export interface AIPIIIncidentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIPIIIncident'], meta: { name: 'AIPIIIncident' } }
    /**
     * Find zero or one AIPIIIncident that matches the filter.
     * @param {AIPIIIncidentFindUniqueArgs} args - Arguments to find a AIPIIIncident
     * @example
     * // Get one AIPIIIncident
     * const aIPIIIncident = await prisma.aIPIIIncident.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIPIIIncidentFindUniqueArgs>(args: SelectSubset<T, AIPIIIncidentFindUniqueArgs<ExtArgs>>): Prisma__AIPIIIncidentClient<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIPIIIncident that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIPIIIncidentFindUniqueOrThrowArgs} args - Arguments to find a AIPIIIncident
     * @example
     * // Get one AIPIIIncident
     * const aIPIIIncident = await prisma.aIPIIIncident.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIPIIIncidentFindUniqueOrThrowArgs>(args: SelectSubset<T, AIPIIIncidentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIPIIIncidentClient<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIPIIIncident that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIPIIIncidentFindFirstArgs} args - Arguments to find a AIPIIIncident
     * @example
     * // Get one AIPIIIncident
     * const aIPIIIncident = await prisma.aIPIIIncident.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIPIIIncidentFindFirstArgs>(args?: SelectSubset<T, AIPIIIncidentFindFirstArgs<ExtArgs>>): Prisma__AIPIIIncidentClient<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIPIIIncident that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIPIIIncidentFindFirstOrThrowArgs} args - Arguments to find a AIPIIIncident
     * @example
     * // Get one AIPIIIncident
     * const aIPIIIncident = await prisma.aIPIIIncident.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIPIIIncidentFindFirstOrThrowArgs>(args?: SelectSubset<T, AIPIIIncidentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIPIIIncidentClient<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIPIIIncidents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIPIIIncidentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIPIIIncidents
     * const aIPIIIncidents = await prisma.aIPIIIncident.findMany()
     * 
     * // Get first 10 AIPIIIncidents
     * const aIPIIIncidents = await prisma.aIPIIIncident.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIPIIIncidentWithIdOnly = await prisma.aIPIIIncident.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIPIIIncidentFindManyArgs>(args?: SelectSubset<T, AIPIIIncidentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIPIIIncident.
     * @param {AIPIIIncidentCreateArgs} args - Arguments to create a AIPIIIncident.
     * @example
     * // Create one AIPIIIncident
     * const AIPIIIncident = await prisma.aIPIIIncident.create({
     *   data: {
     *     // ... data to create a AIPIIIncident
     *   }
     * })
     * 
     */
    create<T extends AIPIIIncidentCreateArgs>(args: SelectSubset<T, AIPIIIncidentCreateArgs<ExtArgs>>): Prisma__AIPIIIncidentClient<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIPIIIncidents.
     * @param {AIPIIIncidentCreateManyArgs} args - Arguments to create many AIPIIIncidents.
     * @example
     * // Create many AIPIIIncidents
     * const aIPIIIncident = await prisma.aIPIIIncident.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIPIIIncidentCreateManyArgs>(args?: SelectSubset<T, AIPIIIncidentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIPIIIncidents and returns the data saved in the database.
     * @param {AIPIIIncidentCreateManyAndReturnArgs} args - Arguments to create many AIPIIIncidents.
     * @example
     * // Create many AIPIIIncidents
     * const aIPIIIncident = await prisma.aIPIIIncident.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIPIIIncidents and only return the `id`
     * const aIPIIIncidentWithIdOnly = await prisma.aIPIIIncident.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIPIIIncidentCreateManyAndReturnArgs>(args?: SelectSubset<T, AIPIIIncidentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIPIIIncident.
     * @param {AIPIIIncidentDeleteArgs} args - Arguments to delete one AIPIIIncident.
     * @example
     * // Delete one AIPIIIncident
     * const AIPIIIncident = await prisma.aIPIIIncident.delete({
     *   where: {
     *     // ... filter to delete one AIPIIIncident
     *   }
     * })
     * 
     */
    delete<T extends AIPIIIncidentDeleteArgs>(args: SelectSubset<T, AIPIIIncidentDeleteArgs<ExtArgs>>): Prisma__AIPIIIncidentClient<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIPIIIncident.
     * @param {AIPIIIncidentUpdateArgs} args - Arguments to update one AIPIIIncident.
     * @example
     * // Update one AIPIIIncident
     * const aIPIIIncident = await prisma.aIPIIIncident.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIPIIIncidentUpdateArgs>(args: SelectSubset<T, AIPIIIncidentUpdateArgs<ExtArgs>>): Prisma__AIPIIIncidentClient<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIPIIIncidents.
     * @param {AIPIIIncidentDeleteManyArgs} args - Arguments to filter AIPIIIncidents to delete.
     * @example
     * // Delete a few AIPIIIncidents
     * const { count } = await prisma.aIPIIIncident.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIPIIIncidentDeleteManyArgs>(args?: SelectSubset<T, AIPIIIncidentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIPIIIncidents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIPIIIncidentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIPIIIncidents
     * const aIPIIIncident = await prisma.aIPIIIncident.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIPIIIncidentUpdateManyArgs>(args: SelectSubset<T, AIPIIIncidentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIPIIIncidents and returns the data updated in the database.
     * @param {AIPIIIncidentUpdateManyAndReturnArgs} args - Arguments to update many AIPIIIncidents.
     * @example
     * // Update many AIPIIIncidents
     * const aIPIIIncident = await prisma.aIPIIIncident.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIPIIIncidents and only return the `id`
     * const aIPIIIncidentWithIdOnly = await prisma.aIPIIIncident.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIPIIIncidentUpdateManyAndReturnArgs>(args: SelectSubset<T, AIPIIIncidentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIPIIIncident.
     * @param {AIPIIIncidentUpsertArgs} args - Arguments to update or create a AIPIIIncident.
     * @example
     * // Update or create a AIPIIIncident
     * const aIPIIIncident = await prisma.aIPIIIncident.upsert({
     *   create: {
     *     // ... data to create a AIPIIIncident
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIPIIIncident we want to update
     *   }
     * })
     */
    upsert<T extends AIPIIIncidentUpsertArgs>(args: SelectSubset<T, AIPIIIncidentUpsertArgs<ExtArgs>>): Prisma__AIPIIIncidentClient<$Result.GetResult<Prisma.$AIPIIIncidentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIPIIIncidents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIPIIIncidentCountArgs} args - Arguments to filter AIPIIIncidents to count.
     * @example
     * // Count the number of AIPIIIncidents
     * const count = await prisma.aIPIIIncident.count({
     *   where: {
     *     // ... the filter for the AIPIIIncidents we want to count
     *   }
     * })
    **/
    count<T extends AIPIIIncidentCountArgs>(
      args?: Subset<T, AIPIIIncidentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIPIIIncidentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIPIIIncident.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIPIIIncidentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIPIIIncidentAggregateArgs>(args: Subset<T, AIPIIIncidentAggregateArgs>): Prisma.PrismaPromise<GetAIPIIIncidentAggregateType<T>>

    /**
     * Group by AIPIIIncident.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIPIIIncidentGroupByArgs} args - Group by arguments.
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
      T extends AIPIIIncidentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIPIIIncidentGroupByArgs['orderBy'] }
        : { orderBy?: AIPIIIncidentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIPIIIncidentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIPIIIncidentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIPIIIncident model
   */
  readonly fields: AIPIIIncidentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIPIIIncident.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIPIIIncidentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIPIIIncident model
   */
  interface AIPIIIncidentFieldRefs {
    readonly id: FieldRef<"AIPIIIncident", 'String'>
    readonly tenantId: FieldRef<"AIPIIIncident", 'String'>
    readonly modelId: FieldRef<"AIPIIIncident", 'String'>
    readonly piiType: FieldRef<"AIPIIIncident", 'String'>
    readonly originalText: FieldRef<"AIPIIIncident", 'String'>
    readonly redactedText: FieldRef<"AIPIIIncident", 'String'>
    readonly detectedAt: FieldRef<"AIPIIIncident", 'DateTime'>
    readonly resolvedAt: FieldRef<"AIPIIIncident", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIPIIIncident findUnique
   */
  export type AIPIIIncidentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * Filter, which AIPIIIncident to fetch.
     */
    where: AIPIIIncidentWhereUniqueInput
  }

  /**
   * AIPIIIncident findUniqueOrThrow
   */
  export type AIPIIIncidentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * Filter, which AIPIIIncident to fetch.
     */
    where: AIPIIIncidentWhereUniqueInput
  }

  /**
   * AIPIIIncident findFirst
   */
  export type AIPIIIncidentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * Filter, which AIPIIIncident to fetch.
     */
    where?: AIPIIIncidentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIPIIIncidents to fetch.
     */
    orderBy?: AIPIIIncidentOrderByWithRelationInput | AIPIIIncidentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIPIIIncidents.
     */
    cursor?: AIPIIIncidentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIPIIIncidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIPIIIncidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIPIIIncidents.
     */
    distinct?: AIPIIIncidentScalarFieldEnum | AIPIIIncidentScalarFieldEnum[]
  }

  /**
   * AIPIIIncident findFirstOrThrow
   */
  export type AIPIIIncidentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * Filter, which AIPIIIncident to fetch.
     */
    where?: AIPIIIncidentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIPIIIncidents to fetch.
     */
    orderBy?: AIPIIIncidentOrderByWithRelationInput | AIPIIIncidentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIPIIIncidents.
     */
    cursor?: AIPIIIncidentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIPIIIncidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIPIIIncidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIPIIIncidents.
     */
    distinct?: AIPIIIncidentScalarFieldEnum | AIPIIIncidentScalarFieldEnum[]
  }

  /**
   * AIPIIIncident findMany
   */
  export type AIPIIIncidentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * Filter, which AIPIIIncidents to fetch.
     */
    where?: AIPIIIncidentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIPIIIncidents to fetch.
     */
    orderBy?: AIPIIIncidentOrderByWithRelationInput | AIPIIIncidentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIPIIIncidents.
     */
    cursor?: AIPIIIncidentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIPIIIncidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIPIIIncidents.
     */
    skip?: number
    distinct?: AIPIIIncidentScalarFieldEnum | AIPIIIncidentScalarFieldEnum[]
  }

  /**
   * AIPIIIncident create
   */
  export type AIPIIIncidentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * The data needed to create a AIPIIIncident.
     */
    data: XOR<AIPIIIncidentCreateInput, AIPIIIncidentUncheckedCreateInput>
  }

  /**
   * AIPIIIncident createMany
   */
  export type AIPIIIncidentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIPIIIncidents.
     */
    data: AIPIIIncidentCreateManyInput | AIPIIIncidentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIPIIIncident createManyAndReturn
   */
  export type AIPIIIncidentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * The data used to create many AIPIIIncidents.
     */
    data: AIPIIIncidentCreateManyInput | AIPIIIncidentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIPIIIncident update
   */
  export type AIPIIIncidentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * The data needed to update a AIPIIIncident.
     */
    data: XOR<AIPIIIncidentUpdateInput, AIPIIIncidentUncheckedUpdateInput>
    /**
     * Choose, which AIPIIIncident to update.
     */
    where: AIPIIIncidentWhereUniqueInput
  }

  /**
   * AIPIIIncident updateMany
   */
  export type AIPIIIncidentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIPIIIncidents.
     */
    data: XOR<AIPIIIncidentUpdateManyMutationInput, AIPIIIncidentUncheckedUpdateManyInput>
    /**
     * Filter which AIPIIIncidents to update
     */
    where?: AIPIIIncidentWhereInput
    /**
     * Limit how many AIPIIIncidents to update.
     */
    limit?: number
  }

  /**
   * AIPIIIncident updateManyAndReturn
   */
  export type AIPIIIncidentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * The data used to update AIPIIIncidents.
     */
    data: XOR<AIPIIIncidentUpdateManyMutationInput, AIPIIIncidentUncheckedUpdateManyInput>
    /**
     * Filter which AIPIIIncidents to update
     */
    where?: AIPIIIncidentWhereInput
    /**
     * Limit how many AIPIIIncidents to update.
     */
    limit?: number
  }

  /**
   * AIPIIIncident upsert
   */
  export type AIPIIIncidentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * The filter to search for the AIPIIIncident to update in case it exists.
     */
    where: AIPIIIncidentWhereUniqueInput
    /**
     * In case the AIPIIIncident found by the `where` argument doesn't exist, create a new AIPIIIncident with this data.
     */
    create: XOR<AIPIIIncidentCreateInput, AIPIIIncidentUncheckedCreateInput>
    /**
     * In case the AIPIIIncident was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIPIIIncidentUpdateInput, AIPIIIncidentUncheckedUpdateInput>
  }

  /**
   * AIPIIIncident delete
   */
  export type AIPIIIncidentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
    /**
     * Filter which AIPIIIncident to delete.
     */
    where: AIPIIIncidentWhereUniqueInput
  }

  /**
   * AIPIIIncident deleteMany
   */
  export type AIPIIIncidentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIPIIIncidents to delete
     */
    where?: AIPIIIncidentWhereInput
    /**
     * Limit how many AIPIIIncidents to delete.
     */
    limit?: number
  }

  /**
   * AIPIIIncident without action
   */
  export type AIPIIIncidentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIPIIIncident
     */
    select?: AIPIIIncidentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIPIIIncident
     */
    omit?: AIPIIIncidentOmit<ExtArgs> | null
  }


  /**
   * Model AISecurePromptStore
   */

  export type AggregateAISecurePromptStore = {
    _count: AISecurePromptStoreCountAggregateOutputType | null
    _min: AISecurePromptStoreMinAggregateOutputType | null
    _max: AISecurePromptStoreMaxAggregateOutputType | null
  }

  export type AISecurePromptStoreMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    promptHash: string | null
    responseHash: string | null
    redactedPrompt: string | null
    redactedResponse: string | null
    createdAt: Date | null
  }

  export type AISecurePromptStoreMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    promptHash: string | null
    responseHash: string | null
    redactedPrompt: string | null
    redactedResponse: string | null
    createdAt: Date | null
  }

  export type AISecurePromptStoreCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    promptHash: number
    responseHash: number
    redactedPrompt: number
    redactedResponse: number
    createdAt: number
    _all: number
  }


  export type AISecurePromptStoreMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    promptHash?: true
    responseHash?: true
    redactedPrompt?: true
    redactedResponse?: true
    createdAt?: true
  }

  export type AISecurePromptStoreMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    promptHash?: true
    responseHash?: true
    redactedPrompt?: true
    redactedResponse?: true
    createdAt?: true
  }

  export type AISecurePromptStoreCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    promptHash?: true
    responseHash?: true
    redactedPrompt?: true
    redactedResponse?: true
    createdAt?: true
    _all?: true
  }

  export type AISecurePromptStoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AISecurePromptStore to aggregate.
     */
    where?: AISecurePromptStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AISecurePromptStores to fetch.
     */
    orderBy?: AISecurePromptStoreOrderByWithRelationInput | AISecurePromptStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AISecurePromptStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AISecurePromptStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AISecurePromptStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AISecurePromptStores
    **/
    _count?: true | AISecurePromptStoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AISecurePromptStoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AISecurePromptStoreMaxAggregateInputType
  }

  export type GetAISecurePromptStoreAggregateType<T extends AISecurePromptStoreAggregateArgs> = {
        [P in keyof T & keyof AggregateAISecurePromptStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAISecurePromptStore[P]>
      : GetScalarType<T[P], AggregateAISecurePromptStore[P]>
  }




  export type AISecurePromptStoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AISecurePromptStoreWhereInput
    orderBy?: AISecurePromptStoreOrderByWithAggregationInput | AISecurePromptStoreOrderByWithAggregationInput[]
    by: AISecurePromptStoreScalarFieldEnum[] | AISecurePromptStoreScalarFieldEnum
    having?: AISecurePromptStoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AISecurePromptStoreCountAggregateInputType | true
    _min?: AISecurePromptStoreMinAggregateInputType
    _max?: AISecurePromptStoreMaxAggregateInputType
  }

  export type AISecurePromptStoreGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string | null
    promptHash: string
    responseHash: string | null
    redactedPrompt: string
    redactedResponse: string | null
    createdAt: Date
    _count: AISecurePromptStoreCountAggregateOutputType | null
    _min: AISecurePromptStoreMinAggregateOutputType | null
    _max: AISecurePromptStoreMaxAggregateOutputType | null
  }

  type GetAISecurePromptStoreGroupByPayload<T extends AISecurePromptStoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AISecurePromptStoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AISecurePromptStoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AISecurePromptStoreGroupByOutputType[P]>
            : GetScalarType<T[P], AISecurePromptStoreGroupByOutputType[P]>
        }
      >
    >


  export type AISecurePromptStoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    promptHash?: boolean
    responseHash?: boolean
    redactedPrompt?: boolean
    redactedResponse?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aISecurePromptStore"]>

  export type AISecurePromptStoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    promptHash?: boolean
    responseHash?: boolean
    redactedPrompt?: boolean
    redactedResponse?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aISecurePromptStore"]>

  export type AISecurePromptStoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    promptHash?: boolean
    responseHash?: boolean
    redactedPrompt?: boolean
    redactedResponse?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aISecurePromptStore"]>

  export type AISecurePromptStoreSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    promptHash?: boolean
    responseHash?: boolean
    redactedPrompt?: boolean
    redactedResponse?: boolean
    createdAt?: boolean
  }

  export type AISecurePromptStoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "promptHash" | "responseHash" | "redactedPrompt" | "redactedResponse" | "createdAt", ExtArgs["result"]["aISecurePromptStore"]>

  export type $AISecurePromptStorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AISecurePromptStore"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string | null
      promptHash: string
      responseHash: string | null
      redactedPrompt: string
      redactedResponse: string | null
      createdAt: Date
    }, ExtArgs["result"]["aISecurePromptStore"]>
    composites: {}
  }

  type AISecurePromptStoreGetPayload<S extends boolean | null | undefined | AISecurePromptStoreDefaultArgs> = $Result.GetResult<Prisma.$AISecurePromptStorePayload, S>

  type AISecurePromptStoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AISecurePromptStoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AISecurePromptStoreCountAggregateInputType | true
    }

  export interface AISecurePromptStoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AISecurePromptStore'], meta: { name: 'AISecurePromptStore' } }
    /**
     * Find zero or one AISecurePromptStore that matches the filter.
     * @param {AISecurePromptStoreFindUniqueArgs} args - Arguments to find a AISecurePromptStore
     * @example
     * // Get one AISecurePromptStore
     * const aISecurePromptStore = await prisma.aISecurePromptStore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AISecurePromptStoreFindUniqueArgs>(args: SelectSubset<T, AISecurePromptStoreFindUniqueArgs<ExtArgs>>): Prisma__AISecurePromptStoreClient<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AISecurePromptStore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AISecurePromptStoreFindUniqueOrThrowArgs} args - Arguments to find a AISecurePromptStore
     * @example
     * // Get one AISecurePromptStore
     * const aISecurePromptStore = await prisma.aISecurePromptStore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AISecurePromptStoreFindUniqueOrThrowArgs>(args: SelectSubset<T, AISecurePromptStoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AISecurePromptStoreClient<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AISecurePromptStore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISecurePromptStoreFindFirstArgs} args - Arguments to find a AISecurePromptStore
     * @example
     * // Get one AISecurePromptStore
     * const aISecurePromptStore = await prisma.aISecurePromptStore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AISecurePromptStoreFindFirstArgs>(args?: SelectSubset<T, AISecurePromptStoreFindFirstArgs<ExtArgs>>): Prisma__AISecurePromptStoreClient<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AISecurePromptStore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISecurePromptStoreFindFirstOrThrowArgs} args - Arguments to find a AISecurePromptStore
     * @example
     * // Get one AISecurePromptStore
     * const aISecurePromptStore = await prisma.aISecurePromptStore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AISecurePromptStoreFindFirstOrThrowArgs>(args?: SelectSubset<T, AISecurePromptStoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__AISecurePromptStoreClient<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AISecurePromptStores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISecurePromptStoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AISecurePromptStores
     * const aISecurePromptStores = await prisma.aISecurePromptStore.findMany()
     * 
     * // Get first 10 AISecurePromptStores
     * const aISecurePromptStores = await prisma.aISecurePromptStore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aISecurePromptStoreWithIdOnly = await prisma.aISecurePromptStore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AISecurePromptStoreFindManyArgs>(args?: SelectSubset<T, AISecurePromptStoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AISecurePromptStore.
     * @param {AISecurePromptStoreCreateArgs} args - Arguments to create a AISecurePromptStore.
     * @example
     * // Create one AISecurePromptStore
     * const AISecurePromptStore = await prisma.aISecurePromptStore.create({
     *   data: {
     *     // ... data to create a AISecurePromptStore
     *   }
     * })
     * 
     */
    create<T extends AISecurePromptStoreCreateArgs>(args: SelectSubset<T, AISecurePromptStoreCreateArgs<ExtArgs>>): Prisma__AISecurePromptStoreClient<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AISecurePromptStores.
     * @param {AISecurePromptStoreCreateManyArgs} args - Arguments to create many AISecurePromptStores.
     * @example
     * // Create many AISecurePromptStores
     * const aISecurePromptStore = await prisma.aISecurePromptStore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AISecurePromptStoreCreateManyArgs>(args?: SelectSubset<T, AISecurePromptStoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AISecurePromptStores and returns the data saved in the database.
     * @param {AISecurePromptStoreCreateManyAndReturnArgs} args - Arguments to create many AISecurePromptStores.
     * @example
     * // Create many AISecurePromptStores
     * const aISecurePromptStore = await prisma.aISecurePromptStore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AISecurePromptStores and only return the `id`
     * const aISecurePromptStoreWithIdOnly = await prisma.aISecurePromptStore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AISecurePromptStoreCreateManyAndReturnArgs>(args?: SelectSubset<T, AISecurePromptStoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AISecurePromptStore.
     * @param {AISecurePromptStoreDeleteArgs} args - Arguments to delete one AISecurePromptStore.
     * @example
     * // Delete one AISecurePromptStore
     * const AISecurePromptStore = await prisma.aISecurePromptStore.delete({
     *   where: {
     *     // ... filter to delete one AISecurePromptStore
     *   }
     * })
     * 
     */
    delete<T extends AISecurePromptStoreDeleteArgs>(args: SelectSubset<T, AISecurePromptStoreDeleteArgs<ExtArgs>>): Prisma__AISecurePromptStoreClient<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AISecurePromptStore.
     * @param {AISecurePromptStoreUpdateArgs} args - Arguments to update one AISecurePromptStore.
     * @example
     * // Update one AISecurePromptStore
     * const aISecurePromptStore = await prisma.aISecurePromptStore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AISecurePromptStoreUpdateArgs>(args: SelectSubset<T, AISecurePromptStoreUpdateArgs<ExtArgs>>): Prisma__AISecurePromptStoreClient<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AISecurePromptStores.
     * @param {AISecurePromptStoreDeleteManyArgs} args - Arguments to filter AISecurePromptStores to delete.
     * @example
     * // Delete a few AISecurePromptStores
     * const { count } = await prisma.aISecurePromptStore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AISecurePromptStoreDeleteManyArgs>(args?: SelectSubset<T, AISecurePromptStoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AISecurePromptStores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISecurePromptStoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AISecurePromptStores
     * const aISecurePromptStore = await prisma.aISecurePromptStore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AISecurePromptStoreUpdateManyArgs>(args: SelectSubset<T, AISecurePromptStoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AISecurePromptStores and returns the data updated in the database.
     * @param {AISecurePromptStoreUpdateManyAndReturnArgs} args - Arguments to update many AISecurePromptStores.
     * @example
     * // Update many AISecurePromptStores
     * const aISecurePromptStore = await prisma.aISecurePromptStore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AISecurePromptStores and only return the `id`
     * const aISecurePromptStoreWithIdOnly = await prisma.aISecurePromptStore.updateManyAndReturn({
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
    updateManyAndReturn<T extends AISecurePromptStoreUpdateManyAndReturnArgs>(args: SelectSubset<T, AISecurePromptStoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AISecurePromptStore.
     * @param {AISecurePromptStoreUpsertArgs} args - Arguments to update or create a AISecurePromptStore.
     * @example
     * // Update or create a AISecurePromptStore
     * const aISecurePromptStore = await prisma.aISecurePromptStore.upsert({
     *   create: {
     *     // ... data to create a AISecurePromptStore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AISecurePromptStore we want to update
     *   }
     * })
     */
    upsert<T extends AISecurePromptStoreUpsertArgs>(args: SelectSubset<T, AISecurePromptStoreUpsertArgs<ExtArgs>>): Prisma__AISecurePromptStoreClient<$Result.GetResult<Prisma.$AISecurePromptStorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AISecurePromptStores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISecurePromptStoreCountArgs} args - Arguments to filter AISecurePromptStores to count.
     * @example
     * // Count the number of AISecurePromptStores
     * const count = await prisma.aISecurePromptStore.count({
     *   where: {
     *     // ... the filter for the AISecurePromptStores we want to count
     *   }
     * })
    **/
    count<T extends AISecurePromptStoreCountArgs>(
      args?: Subset<T, AISecurePromptStoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AISecurePromptStoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AISecurePromptStore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISecurePromptStoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AISecurePromptStoreAggregateArgs>(args: Subset<T, AISecurePromptStoreAggregateArgs>): Prisma.PrismaPromise<GetAISecurePromptStoreAggregateType<T>>

    /**
     * Group by AISecurePromptStore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISecurePromptStoreGroupByArgs} args - Group by arguments.
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
      T extends AISecurePromptStoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AISecurePromptStoreGroupByArgs['orderBy'] }
        : { orderBy?: AISecurePromptStoreGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AISecurePromptStoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAISecurePromptStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AISecurePromptStore model
   */
  readonly fields: AISecurePromptStoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AISecurePromptStore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AISecurePromptStoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AISecurePromptStore model
   */
  interface AISecurePromptStoreFieldRefs {
    readonly id: FieldRef<"AISecurePromptStore", 'String'>
    readonly tenantId: FieldRef<"AISecurePromptStore", 'String'>
    readonly modelId: FieldRef<"AISecurePromptStore", 'String'>
    readonly promptHash: FieldRef<"AISecurePromptStore", 'String'>
    readonly responseHash: FieldRef<"AISecurePromptStore", 'String'>
    readonly redactedPrompt: FieldRef<"AISecurePromptStore", 'String'>
    readonly redactedResponse: FieldRef<"AISecurePromptStore", 'String'>
    readonly createdAt: FieldRef<"AISecurePromptStore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AISecurePromptStore findUnique
   */
  export type AISecurePromptStoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * Filter, which AISecurePromptStore to fetch.
     */
    where: AISecurePromptStoreWhereUniqueInput
  }

  /**
   * AISecurePromptStore findUniqueOrThrow
   */
  export type AISecurePromptStoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * Filter, which AISecurePromptStore to fetch.
     */
    where: AISecurePromptStoreWhereUniqueInput
  }

  /**
   * AISecurePromptStore findFirst
   */
  export type AISecurePromptStoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * Filter, which AISecurePromptStore to fetch.
     */
    where?: AISecurePromptStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AISecurePromptStores to fetch.
     */
    orderBy?: AISecurePromptStoreOrderByWithRelationInput | AISecurePromptStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AISecurePromptStores.
     */
    cursor?: AISecurePromptStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AISecurePromptStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AISecurePromptStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AISecurePromptStores.
     */
    distinct?: AISecurePromptStoreScalarFieldEnum | AISecurePromptStoreScalarFieldEnum[]
  }

  /**
   * AISecurePromptStore findFirstOrThrow
   */
  export type AISecurePromptStoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * Filter, which AISecurePromptStore to fetch.
     */
    where?: AISecurePromptStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AISecurePromptStores to fetch.
     */
    orderBy?: AISecurePromptStoreOrderByWithRelationInput | AISecurePromptStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AISecurePromptStores.
     */
    cursor?: AISecurePromptStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AISecurePromptStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AISecurePromptStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AISecurePromptStores.
     */
    distinct?: AISecurePromptStoreScalarFieldEnum | AISecurePromptStoreScalarFieldEnum[]
  }

  /**
   * AISecurePromptStore findMany
   */
  export type AISecurePromptStoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * Filter, which AISecurePromptStores to fetch.
     */
    where?: AISecurePromptStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AISecurePromptStores to fetch.
     */
    orderBy?: AISecurePromptStoreOrderByWithRelationInput | AISecurePromptStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AISecurePromptStores.
     */
    cursor?: AISecurePromptStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AISecurePromptStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AISecurePromptStores.
     */
    skip?: number
    distinct?: AISecurePromptStoreScalarFieldEnum | AISecurePromptStoreScalarFieldEnum[]
  }

  /**
   * AISecurePromptStore create
   */
  export type AISecurePromptStoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * The data needed to create a AISecurePromptStore.
     */
    data: XOR<AISecurePromptStoreCreateInput, AISecurePromptStoreUncheckedCreateInput>
  }

  /**
   * AISecurePromptStore createMany
   */
  export type AISecurePromptStoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AISecurePromptStores.
     */
    data: AISecurePromptStoreCreateManyInput | AISecurePromptStoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AISecurePromptStore createManyAndReturn
   */
  export type AISecurePromptStoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * The data used to create many AISecurePromptStores.
     */
    data: AISecurePromptStoreCreateManyInput | AISecurePromptStoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AISecurePromptStore update
   */
  export type AISecurePromptStoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * The data needed to update a AISecurePromptStore.
     */
    data: XOR<AISecurePromptStoreUpdateInput, AISecurePromptStoreUncheckedUpdateInput>
    /**
     * Choose, which AISecurePromptStore to update.
     */
    where: AISecurePromptStoreWhereUniqueInput
  }

  /**
   * AISecurePromptStore updateMany
   */
  export type AISecurePromptStoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AISecurePromptStores.
     */
    data: XOR<AISecurePromptStoreUpdateManyMutationInput, AISecurePromptStoreUncheckedUpdateManyInput>
    /**
     * Filter which AISecurePromptStores to update
     */
    where?: AISecurePromptStoreWhereInput
    /**
     * Limit how many AISecurePromptStores to update.
     */
    limit?: number
  }

  /**
   * AISecurePromptStore updateManyAndReturn
   */
  export type AISecurePromptStoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * The data used to update AISecurePromptStores.
     */
    data: XOR<AISecurePromptStoreUpdateManyMutationInput, AISecurePromptStoreUncheckedUpdateManyInput>
    /**
     * Filter which AISecurePromptStores to update
     */
    where?: AISecurePromptStoreWhereInput
    /**
     * Limit how many AISecurePromptStores to update.
     */
    limit?: number
  }

  /**
   * AISecurePromptStore upsert
   */
  export type AISecurePromptStoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * The filter to search for the AISecurePromptStore to update in case it exists.
     */
    where: AISecurePromptStoreWhereUniqueInput
    /**
     * In case the AISecurePromptStore found by the `where` argument doesn't exist, create a new AISecurePromptStore with this data.
     */
    create: XOR<AISecurePromptStoreCreateInput, AISecurePromptStoreUncheckedCreateInput>
    /**
     * In case the AISecurePromptStore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AISecurePromptStoreUpdateInput, AISecurePromptStoreUncheckedUpdateInput>
  }

  /**
   * AISecurePromptStore delete
   */
  export type AISecurePromptStoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
    /**
     * Filter which AISecurePromptStore to delete.
     */
    where: AISecurePromptStoreWhereUniqueInput
  }

  /**
   * AISecurePromptStore deleteMany
   */
  export type AISecurePromptStoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AISecurePromptStores to delete
     */
    where?: AISecurePromptStoreWhereInput
    /**
     * Limit how many AISecurePromptStores to delete.
     */
    limit?: number
  }

  /**
   * AISecurePromptStore without action
   */
  export type AISecurePromptStoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISecurePromptStore
     */
    select?: AISecurePromptStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISecurePromptStore
     */
    omit?: AISecurePromptStoreOmit<ExtArgs> | null
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


  export const AIAuditLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    apiKeyId: 'apiKeyId',
    action: 'action',
    modelId: 'modelId',
    requestMetadata: 'requestMetadata',
    responseMetadata: 'responseMetadata',
    timestamp: 'timestamp',
    piiDetected: 'piiDetected',
    redacted: 'redacted'
  };

  export type AIAuditLogScalarFieldEnum = (typeof AIAuditLogScalarFieldEnum)[keyof typeof AIAuditLogScalarFieldEnum]


  export const AIAccessPolicyScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    allowedRoles: 'allowedRoles',
    allowedUsers: 'allowedUsers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIAccessPolicyScalarFieldEnum = (typeof AIAccessPolicyScalarFieldEnum)[keyof typeof AIAccessPolicyScalarFieldEnum]


  export const AIPIIIncidentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    piiType: 'piiType',
    originalText: 'originalText',
    redactedText: 'redactedText',
    detectedAt: 'detectedAt',
    resolvedAt: 'resolvedAt'
  };

  export type AIPIIIncidentScalarFieldEnum = (typeof AIPIIIncidentScalarFieldEnum)[keyof typeof AIPIIIncidentScalarFieldEnum]


  export const AISecurePromptStoreScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    promptHash: 'promptHash',
    responseHash: 'responseHash',
    redactedPrompt: 'redactedPrompt',
    redactedResponse: 'redactedResponse',
    createdAt: 'createdAt'
  };

  export type AISecurePromptStoreScalarFieldEnum = (typeof AISecurePromptStoreScalarFieldEnum)[keyof typeof AISecurePromptStoreScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type AIAuditLogWhereInput = {
    AND?: AIAuditLogWhereInput | AIAuditLogWhereInput[]
    OR?: AIAuditLogWhereInput[]
    NOT?: AIAuditLogWhereInput | AIAuditLogWhereInput[]
    id?: StringFilter<"AIAuditLog"> | string
    tenantId?: StringFilter<"AIAuditLog"> | string
    userId?: StringNullableFilter<"AIAuditLog"> | string | null
    apiKeyId?: StringNullableFilter<"AIAuditLog"> | string | null
    action?: StringFilter<"AIAuditLog"> | string
    modelId?: StringNullableFilter<"AIAuditLog"> | string | null
    requestMetadata?: JsonFilter<"AIAuditLog">
    responseMetadata?: JsonFilter<"AIAuditLog">
    timestamp?: DateTimeFilter<"AIAuditLog"> | Date | string
    piiDetected?: BoolFilter<"AIAuditLog"> | boolean
    redacted?: BoolFilter<"AIAuditLog"> | boolean
  }

  export type AIAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    apiKeyId?: SortOrderInput | SortOrder
    action?: SortOrder
    modelId?: SortOrderInput | SortOrder
    requestMetadata?: SortOrder
    responseMetadata?: SortOrder
    timestamp?: SortOrder
    piiDetected?: SortOrder
    redacted?: SortOrder
  }

  export type AIAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIAuditLogWhereInput | AIAuditLogWhereInput[]
    OR?: AIAuditLogWhereInput[]
    NOT?: AIAuditLogWhereInput | AIAuditLogWhereInput[]
    tenantId?: StringFilter<"AIAuditLog"> | string
    userId?: StringNullableFilter<"AIAuditLog"> | string | null
    apiKeyId?: StringNullableFilter<"AIAuditLog"> | string | null
    action?: StringFilter<"AIAuditLog"> | string
    modelId?: StringNullableFilter<"AIAuditLog"> | string | null
    requestMetadata?: JsonFilter<"AIAuditLog">
    responseMetadata?: JsonFilter<"AIAuditLog">
    timestamp?: DateTimeFilter<"AIAuditLog"> | Date | string
    piiDetected?: BoolFilter<"AIAuditLog"> | boolean
    redacted?: BoolFilter<"AIAuditLog"> | boolean
  }, "id">

  export type AIAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    apiKeyId?: SortOrderInput | SortOrder
    action?: SortOrder
    modelId?: SortOrderInput | SortOrder
    requestMetadata?: SortOrder
    responseMetadata?: SortOrder
    timestamp?: SortOrder
    piiDetected?: SortOrder
    redacted?: SortOrder
    _count?: AIAuditLogCountOrderByAggregateInput
    _max?: AIAuditLogMaxOrderByAggregateInput
    _min?: AIAuditLogMinOrderByAggregateInput
  }

  export type AIAuditLogScalarWhereWithAggregatesInput = {
    AND?: AIAuditLogScalarWhereWithAggregatesInput | AIAuditLogScalarWhereWithAggregatesInput[]
    OR?: AIAuditLogScalarWhereWithAggregatesInput[]
    NOT?: AIAuditLogScalarWhereWithAggregatesInput | AIAuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIAuditLog"> | string
    tenantId?: StringWithAggregatesFilter<"AIAuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AIAuditLog"> | string | null
    apiKeyId?: StringNullableWithAggregatesFilter<"AIAuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AIAuditLog"> | string
    modelId?: StringNullableWithAggregatesFilter<"AIAuditLog"> | string | null
    requestMetadata?: JsonWithAggregatesFilter<"AIAuditLog">
    responseMetadata?: JsonWithAggregatesFilter<"AIAuditLog">
    timestamp?: DateTimeWithAggregatesFilter<"AIAuditLog"> | Date | string
    piiDetected?: BoolWithAggregatesFilter<"AIAuditLog"> | boolean
    redacted?: BoolWithAggregatesFilter<"AIAuditLog"> | boolean
  }

  export type AIAccessPolicyWhereInput = {
    AND?: AIAccessPolicyWhereInput | AIAccessPolicyWhereInput[]
    OR?: AIAccessPolicyWhereInput[]
    NOT?: AIAccessPolicyWhereInput | AIAccessPolicyWhereInput[]
    id?: StringFilter<"AIAccessPolicy"> | string
    tenantId?: StringFilter<"AIAccessPolicy"> | string
    modelId?: StringFilter<"AIAccessPolicy"> | string
    allowedRoles?: JsonFilter<"AIAccessPolicy">
    allowedUsers?: JsonNullableFilter<"AIAccessPolicy">
    createdAt?: DateTimeFilter<"AIAccessPolicy"> | Date | string
    updatedAt?: DateTimeFilter<"AIAccessPolicy"> | Date | string
  }

  export type AIAccessPolicyOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    allowedRoles?: SortOrder
    allowedUsers?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIAccessPolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_modelId?: AIAccessPolicyTenantIdModelIdCompoundUniqueInput
    AND?: AIAccessPolicyWhereInput | AIAccessPolicyWhereInput[]
    OR?: AIAccessPolicyWhereInput[]
    NOT?: AIAccessPolicyWhereInput | AIAccessPolicyWhereInput[]
    tenantId?: StringFilter<"AIAccessPolicy"> | string
    modelId?: StringFilter<"AIAccessPolicy"> | string
    allowedRoles?: JsonFilter<"AIAccessPolicy">
    allowedUsers?: JsonNullableFilter<"AIAccessPolicy">
    createdAt?: DateTimeFilter<"AIAccessPolicy"> | Date | string
    updatedAt?: DateTimeFilter<"AIAccessPolicy"> | Date | string
  }, "id" | "tenantId_modelId">

  export type AIAccessPolicyOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    allowedRoles?: SortOrder
    allowedUsers?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIAccessPolicyCountOrderByAggregateInput
    _max?: AIAccessPolicyMaxOrderByAggregateInput
    _min?: AIAccessPolicyMinOrderByAggregateInput
  }

  export type AIAccessPolicyScalarWhereWithAggregatesInput = {
    AND?: AIAccessPolicyScalarWhereWithAggregatesInput | AIAccessPolicyScalarWhereWithAggregatesInput[]
    OR?: AIAccessPolicyScalarWhereWithAggregatesInput[]
    NOT?: AIAccessPolicyScalarWhereWithAggregatesInput | AIAccessPolicyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIAccessPolicy"> | string
    tenantId?: StringWithAggregatesFilter<"AIAccessPolicy"> | string
    modelId?: StringWithAggregatesFilter<"AIAccessPolicy"> | string
    allowedRoles?: JsonWithAggregatesFilter<"AIAccessPolicy">
    allowedUsers?: JsonNullableWithAggregatesFilter<"AIAccessPolicy">
    createdAt?: DateTimeWithAggregatesFilter<"AIAccessPolicy"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIAccessPolicy"> | Date | string
  }

  export type AIPIIIncidentWhereInput = {
    AND?: AIPIIIncidentWhereInput | AIPIIIncidentWhereInput[]
    OR?: AIPIIIncidentWhereInput[]
    NOT?: AIPIIIncidentWhereInput | AIPIIIncidentWhereInput[]
    id?: StringFilter<"AIPIIIncident"> | string
    tenantId?: StringFilter<"AIPIIIncident"> | string
    modelId?: StringNullableFilter<"AIPIIIncident"> | string | null
    piiType?: StringFilter<"AIPIIIncident"> | string
    originalText?: StringFilter<"AIPIIIncident"> | string
    redactedText?: StringFilter<"AIPIIIncident"> | string
    detectedAt?: DateTimeFilter<"AIPIIIncident"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"AIPIIIncident"> | Date | string | null
  }

  export type AIPIIIncidentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrderInput | SortOrder
    piiType?: SortOrder
    originalText?: SortOrder
    redactedText?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
  }

  export type AIPIIIncidentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIPIIIncidentWhereInput | AIPIIIncidentWhereInput[]
    OR?: AIPIIIncidentWhereInput[]
    NOT?: AIPIIIncidentWhereInput | AIPIIIncidentWhereInput[]
    tenantId?: StringFilter<"AIPIIIncident"> | string
    modelId?: StringNullableFilter<"AIPIIIncident"> | string | null
    piiType?: StringFilter<"AIPIIIncident"> | string
    originalText?: StringFilter<"AIPIIIncident"> | string
    redactedText?: StringFilter<"AIPIIIncident"> | string
    detectedAt?: DateTimeFilter<"AIPIIIncident"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"AIPIIIncident"> | Date | string | null
  }, "id">

  export type AIPIIIncidentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrderInput | SortOrder
    piiType?: SortOrder
    originalText?: SortOrder
    redactedText?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: AIPIIIncidentCountOrderByAggregateInput
    _max?: AIPIIIncidentMaxOrderByAggregateInput
    _min?: AIPIIIncidentMinOrderByAggregateInput
  }

  export type AIPIIIncidentScalarWhereWithAggregatesInput = {
    AND?: AIPIIIncidentScalarWhereWithAggregatesInput | AIPIIIncidentScalarWhereWithAggregatesInput[]
    OR?: AIPIIIncidentScalarWhereWithAggregatesInput[]
    NOT?: AIPIIIncidentScalarWhereWithAggregatesInput | AIPIIIncidentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIPIIIncident"> | string
    tenantId?: StringWithAggregatesFilter<"AIPIIIncident"> | string
    modelId?: StringNullableWithAggregatesFilter<"AIPIIIncident"> | string | null
    piiType?: StringWithAggregatesFilter<"AIPIIIncident"> | string
    originalText?: StringWithAggregatesFilter<"AIPIIIncident"> | string
    redactedText?: StringWithAggregatesFilter<"AIPIIIncident"> | string
    detectedAt?: DateTimeWithAggregatesFilter<"AIPIIIncident"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"AIPIIIncident"> | Date | string | null
  }

  export type AISecurePromptStoreWhereInput = {
    AND?: AISecurePromptStoreWhereInput | AISecurePromptStoreWhereInput[]
    OR?: AISecurePromptStoreWhereInput[]
    NOT?: AISecurePromptStoreWhereInput | AISecurePromptStoreWhereInput[]
    id?: StringFilter<"AISecurePromptStore"> | string
    tenantId?: StringFilter<"AISecurePromptStore"> | string
    modelId?: StringNullableFilter<"AISecurePromptStore"> | string | null
    promptHash?: StringFilter<"AISecurePromptStore"> | string
    responseHash?: StringNullableFilter<"AISecurePromptStore"> | string | null
    redactedPrompt?: StringFilter<"AISecurePromptStore"> | string
    redactedResponse?: StringNullableFilter<"AISecurePromptStore"> | string | null
    createdAt?: DateTimeFilter<"AISecurePromptStore"> | Date | string
  }

  export type AISecurePromptStoreOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrderInput | SortOrder
    promptHash?: SortOrder
    responseHash?: SortOrderInput | SortOrder
    redactedPrompt?: SortOrder
    redactedResponse?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AISecurePromptStoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AISecurePromptStoreWhereInput | AISecurePromptStoreWhereInput[]
    OR?: AISecurePromptStoreWhereInput[]
    NOT?: AISecurePromptStoreWhereInput | AISecurePromptStoreWhereInput[]
    tenantId?: StringFilter<"AISecurePromptStore"> | string
    modelId?: StringNullableFilter<"AISecurePromptStore"> | string | null
    promptHash?: StringFilter<"AISecurePromptStore"> | string
    responseHash?: StringNullableFilter<"AISecurePromptStore"> | string | null
    redactedPrompt?: StringFilter<"AISecurePromptStore"> | string
    redactedResponse?: StringNullableFilter<"AISecurePromptStore"> | string | null
    createdAt?: DateTimeFilter<"AISecurePromptStore"> | Date | string
  }, "id">

  export type AISecurePromptStoreOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrderInput | SortOrder
    promptHash?: SortOrder
    responseHash?: SortOrderInput | SortOrder
    redactedPrompt?: SortOrder
    redactedResponse?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AISecurePromptStoreCountOrderByAggregateInput
    _max?: AISecurePromptStoreMaxOrderByAggregateInput
    _min?: AISecurePromptStoreMinOrderByAggregateInput
  }

  export type AISecurePromptStoreScalarWhereWithAggregatesInput = {
    AND?: AISecurePromptStoreScalarWhereWithAggregatesInput | AISecurePromptStoreScalarWhereWithAggregatesInput[]
    OR?: AISecurePromptStoreScalarWhereWithAggregatesInput[]
    NOT?: AISecurePromptStoreScalarWhereWithAggregatesInput | AISecurePromptStoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AISecurePromptStore"> | string
    tenantId?: StringWithAggregatesFilter<"AISecurePromptStore"> | string
    modelId?: StringNullableWithAggregatesFilter<"AISecurePromptStore"> | string | null
    promptHash?: StringWithAggregatesFilter<"AISecurePromptStore"> | string
    responseHash?: StringNullableWithAggregatesFilter<"AISecurePromptStore"> | string | null
    redactedPrompt?: StringWithAggregatesFilter<"AISecurePromptStore"> | string
    redactedResponse?: StringNullableWithAggregatesFilter<"AISecurePromptStore"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AISecurePromptStore"> | Date | string
  }

  export type AIAuditLogCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    apiKeyId?: string | null
    action: string
    modelId?: string | null
    requestMetadata?: JsonNullValueInput | InputJsonValue
    responseMetadata?: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    piiDetected?: boolean
    redacted?: boolean
  }

  export type AIAuditLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    apiKeyId?: string | null
    action: string
    modelId?: string | null
    requestMetadata?: JsonNullValueInput | InputJsonValue
    responseMetadata?: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    piiDetected?: boolean
    redacted?: boolean
  }

  export type AIAuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    requestMetadata?: JsonNullValueInput | InputJsonValue
    responseMetadata?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    piiDetected?: BoolFieldUpdateOperationsInput | boolean
    redacted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AIAuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    requestMetadata?: JsonNullValueInput | InputJsonValue
    responseMetadata?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    piiDetected?: BoolFieldUpdateOperationsInput | boolean
    redacted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AIAuditLogCreateManyInput = {
    id?: string
    tenantId: string
    userId?: string | null
    apiKeyId?: string | null
    action: string
    modelId?: string | null
    requestMetadata?: JsonNullValueInput | InputJsonValue
    responseMetadata?: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    piiDetected?: boolean
    redacted?: boolean
  }

  export type AIAuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    requestMetadata?: JsonNullValueInput | InputJsonValue
    responseMetadata?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    piiDetected?: BoolFieldUpdateOperationsInput | boolean
    redacted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AIAuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    requestMetadata?: JsonNullValueInput | InputJsonValue
    responseMetadata?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    piiDetected?: BoolFieldUpdateOperationsInput | boolean
    redacted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AIAccessPolicyCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    allowedRoles?: JsonNullValueInput | InputJsonValue
    allowedUsers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAccessPolicyUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    allowedRoles?: JsonNullValueInput | InputJsonValue
    allowedUsers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAccessPolicyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    allowedRoles?: JsonNullValueInput | InputJsonValue
    allowedUsers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAccessPolicyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    allowedRoles?: JsonNullValueInput | InputJsonValue
    allowedUsers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAccessPolicyCreateManyInput = {
    id?: string
    tenantId: string
    modelId: string
    allowedRoles?: JsonNullValueInput | InputJsonValue
    allowedUsers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIAccessPolicyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    allowedRoles?: JsonNullValueInput | InputJsonValue
    allowedUsers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAccessPolicyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    allowedRoles?: JsonNullValueInput | InputJsonValue
    allowedUsers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIPIIIncidentCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    piiType: string
    originalText: string
    redactedText: string
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AIPIIIncidentUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    piiType: string
    originalText: string
    redactedText: string
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AIPIIIncidentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    piiType?: StringFieldUpdateOperationsInput | string
    originalText?: StringFieldUpdateOperationsInput | string
    redactedText?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIPIIIncidentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    piiType?: StringFieldUpdateOperationsInput | string
    originalText?: StringFieldUpdateOperationsInput | string
    redactedText?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIPIIIncidentCreateManyInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    piiType: string
    originalText: string
    redactedText: string
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AIPIIIncidentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    piiType?: StringFieldUpdateOperationsInput | string
    originalText?: StringFieldUpdateOperationsInput | string
    redactedText?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIPIIIncidentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    piiType?: StringFieldUpdateOperationsInput | string
    originalText?: StringFieldUpdateOperationsInput | string
    redactedText?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AISecurePromptStoreCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    promptHash: string
    responseHash?: string | null
    redactedPrompt: string
    redactedResponse?: string | null
    createdAt?: Date | string
  }

  export type AISecurePromptStoreUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    promptHash: string
    responseHash?: string | null
    redactedPrompt: string
    redactedResponse?: string | null
    createdAt?: Date | string
  }

  export type AISecurePromptStoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    promptHash?: StringFieldUpdateOperationsInput | string
    responseHash?: NullableStringFieldUpdateOperationsInput | string | null
    redactedPrompt?: StringFieldUpdateOperationsInput | string
    redactedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AISecurePromptStoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    promptHash?: StringFieldUpdateOperationsInput | string
    responseHash?: NullableStringFieldUpdateOperationsInput | string | null
    redactedPrompt?: StringFieldUpdateOperationsInput | string
    redactedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AISecurePromptStoreCreateManyInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    promptHash: string
    responseHash?: string | null
    redactedPrompt: string
    redactedResponse?: string | null
    createdAt?: Date | string
  }

  export type AISecurePromptStoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    promptHash?: StringFieldUpdateOperationsInput | string
    responseHash?: NullableStringFieldUpdateOperationsInput | string | null
    redactedPrompt?: StringFieldUpdateOperationsInput | string
    redactedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AISecurePromptStoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    promptHash?: StringFieldUpdateOperationsInput | string
    responseHash?: NullableStringFieldUpdateOperationsInput | string | null
    redactedPrompt?: StringFieldUpdateOperationsInput | string
    redactedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AIAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    apiKeyId?: SortOrder
    action?: SortOrder
    modelId?: SortOrder
    requestMetadata?: SortOrder
    responseMetadata?: SortOrder
    timestamp?: SortOrder
    piiDetected?: SortOrder
    redacted?: SortOrder
  }

  export type AIAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    apiKeyId?: SortOrder
    action?: SortOrder
    modelId?: SortOrder
    timestamp?: SortOrder
    piiDetected?: SortOrder
    redacted?: SortOrder
  }

  export type AIAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    apiKeyId?: SortOrder
    action?: SortOrder
    modelId?: SortOrder
    timestamp?: SortOrder
    piiDetected?: SortOrder
    redacted?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
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

  export type AIAccessPolicyTenantIdModelIdCompoundUniqueInput = {
    tenantId: string
    modelId: string
  }

  export type AIAccessPolicyCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    allowedRoles?: SortOrder
    allowedUsers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIAccessPolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIAccessPolicyMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
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

  export type AIPIIIncidentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    piiType?: SortOrder
    originalText?: SortOrder
    redactedText?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AIPIIIncidentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    piiType?: SortOrder
    originalText?: SortOrder
    redactedText?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AIPIIIncidentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    piiType?: SortOrder
    originalText?: SortOrder
    redactedText?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
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

  export type AISecurePromptStoreCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    promptHash?: SortOrder
    responseHash?: SortOrder
    redactedPrompt?: SortOrder
    redactedResponse?: SortOrder
    createdAt?: SortOrder
  }

  export type AISecurePromptStoreMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    promptHash?: SortOrder
    responseHash?: SortOrder
    redactedPrompt?: SortOrder
    redactedResponse?: SortOrder
    createdAt?: SortOrder
  }

  export type AISecurePromptStoreMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    promptHash?: SortOrder
    responseHash?: SortOrder
    redactedPrompt?: SortOrder
    redactedResponse?: SortOrder
    createdAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
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