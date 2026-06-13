
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
 * Model AIProviderConfig
 * 
 */
export type AIProviderConfig = $Result.DefaultSelection<Prisma.$AIProviderConfigPayload>
/**
 * Model AIRequestLog
 * 
 */
export type AIRequestLog = $Result.DefaultSelection<Prisma.$AIRequestLogPayload>
/**
 * Model AIMemory
 * 
 */
export type AIMemory = $Result.DefaultSelection<Prisma.$AIMemoryPayload>
/**
 * Model AIWorkflow
 * 
 */
export type AIWorkflow = $Result.DefaultSelection<Prisma.$AIWorkflowPayload>
/**
 * Model AIWorkflowRun
 * 
 */
export type AIWorkflowRun = $Result.DefaultSelection<Prisma.$AIWorkflowRunPayload>
/**
 * Model AIWorkflowVersion
 * 
 */
export type AIWorkflowVersion = $Result.DefaultSelection<Prisma.$AIWorkflowVersionPayload>
/**
 * Model AIWorkflowLiveEvent
 * 
 */
export type AIWorkflowLiveEvent = $Result.DefaultSelection<Prisma.$AIWorkflowLiveEventPayload>
/**
 * Model AIDataset
 * 
 */
export type AIDataset = $Result.DefaultSelection<Prisma.$AIDatasetPayload>
/**
 * Model AIDatasetVersion
 * 
 */
export type AIDatasetVersion = $Result.DefaultSelection<Prisma.$AIDatasetVersionPayload>
/**
 * Model AIDatasetRecord
 * 
 */
export type AIDatasetRecord = $Result.DefaultSelection<Prisma.$AIDatasetRecordPayload>
/**
 * Model AIDatasetLabel
 * 
 */
export type AIDatasetLabel = $Result.DefaultSelection<Prisma.$AIDatasetLabelPayload>
/**
 * Model AIDatasetAuditLog
 * 
 */
export type AIDatasetAuditLog = $Result.DefaultSelection<Prisma.$AIDatasetAuditLogPayload>
/**
 * Model AIStreamSession
 * 
 */
export type AIStreamSession = $Result.DefaultSelection<Prisma.$AIStreamSessionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AIProviderType: {
  OPENAI: 'OPENAI',
  AZURE_OPENAI: 'AZURE_OPENAI',
  ANTHROPIC: 'ANTHROPIC',
  LOCAL: 'LOCAL'
};

export type AIProviderType = (typeof AIProviderType)[keyof typeof AIProviderType]


export const AIDatasetType: {
  TEXT: 'TEXT',
  JSON: 'JSON',
  CONVERSATION: 'CONVERSATION',
  EMBEDDING: 'EMBEDDING'
};

export type AIDatasetType = (typeof AIDatasetType)[keyof typeof AIDatasetType]


export const AIDatasetLabelType: {
  CLASSIFICATION: 'CLASSIFICATION',
  EXTRACTION: 'EXTRACTION',
  CORRECTION: 'CORRECTION'
};

export type AIDatasetLabelType = (typeof AIDatasetLabelType)[keyof typeof AIDatasetLabelType]

}

export type AIProviderType = $Enums.AIProviderType

export const AIProviderType: typeof $Enums.AIProviderType

export type AIDatasetType = $Enums.AIDatasetType

export const AIDatasetType: typeof $Enums.AIDatasetType

export type AIDatasetLabelType = $Enums.AIDatasetLabelType

export const AIDatasetLabelType: typeof $Enums.AIDatasetLabelType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AIProviderConfigs
 * const aIProviderConfigs = await prisma.aIProviderConfig.findMany()
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
   * // Fetch zero or more AIProviderConfigs
   * const aIProviderConfigs = await prisma.aIProviderConfig.findMany()
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
   * `prisma.aIProviderConfig`: Exposes CRUD operations for the **AIProviderConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIProviderConfigs
    * const aIProviderConfigs = await prisma.aIProviderConfig.findMany()
    * ```
    */
  get aIProviderConfig(): Prisma.AIProviderConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIRequestLog`: Exposes CRUD operations for the **AIRequestLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIRequestLogs
    * const aIRequestLogs = await prisma.aIRequestLog.findMany()
    * ```
    */
  get aIRequestLog(): Prisma.AIRequestLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIMemory`: Exposes CRUD operations for the **AIMemory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIMemories
    * const aIMemories = await prisma.aIMemory.findMany()
    * ```
    */
  get aIMemory(): Prisma.AIMemoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIWorkflow`: Exposes CRUD operations for the **AIWorkflow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIWorkflows
    * const aIWorkflows = await prisma.aIWorkflow.findMany()
    * ```
    */
  get aIWorkflow(): Prisma.AIWorkflowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIWorkflowRun`: Exposes CRUD operations for the **AIWorkflowRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIWorkflowRuns
    * const aIWorkflowRuns = await prisma.aIWorkflowRun.findMany()
    * ```
    */
  get aIWorkflowRun(): Prisma.AIWorkflowRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIWorkflowVersion`: Exposes CRUD operations for the **AIWorkflowVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIWorkflowVersions
    * const aIWorkflowVersions = await prisma.aIWorkflowVersion.findMany()
    * ```
    */
  get aIWorkflowVersion(): Prisma.AIWorkflowVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIWorkflowLiveEvent`: Exposes CRUD operations for the **AIWorkflowLiveEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIWorkflowLiveEvents
    * const aIWorkflowLiveEvents = await prisma.aIWorkflowLiveEvent.findMany()
    * ```
    */
  get aIWorkflowLiveEvent(): Prisma.AIWorkflowLiveEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIDataset`: Exposes CRUD operations for the **AIDataset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIDatasets
    * const aIDatasets = await prisma.aIDataset.findMany()
    * ```
    */
  get aIDataset(): Prisma.AIDatasetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIDatasetVersion`: Exposes CRUD operations for the **AIDatasetVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIDatasetVersions
    * const aIDatasetVersions = await prisma.aIDatasetVersion.findMany()
    * ```
    */
  get aIDatasetVersion(): Prisma.AIDatasetVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIDatasetRecord`: Exposes CRUD operations for the **AIDatasetRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIDatasetRecords
    * const aIDatasetRecords = await prisma.aIDatasetRecord.findMany()
    * ```
    */
  get aIDatasetRecord(): Prisma.AIDatasetRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIDatasetLabel`: Exposes CRUD operations for the **AIDatasetLabel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIDatasetLabels
    * const aIDatasetLabels = await prisma.aIDatasetLabel.findMany()
    * ```
    */
  get aIDatasetLabel(): Prisma.AIDatasetLabelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIDatasetAuditLog`: Exposes CRUD operations for the **AIDatasetAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIDatasetAuditLogs
    * const aIDatasetAuditLogs = await prisma.aIDatasetAuditLog.findMany()
    * ```
    */
  get aIDatasetAuditLog(): Prisma.AIDatasetAuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIStreamSession`: Exposes CRUD operations for the **AIStreamSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIStreamSessions
    * const aIStreamSessions = await prisma.aIStreamSession.findMany()
    * ```
    */
  get aIStreamSession(): Prisma.AIStreamSessionDelegate<ExtArgs, ClientOptions>;
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
    AIProviderConfig: 'AIProviderConfig',
    AIRequestLog: 'AIRequestLog',
    AIMemory: 'AIMemory',
    AIWorkflow: 'AIWorkflow',
    AIWorkflowRun: 'AIWorkflowRun',
    AIWorkflowVersion: 'AIWorkflowVersion',
    AIWorkflowLiveEvent: 'AIWorkflowLiveEvent',
    AIDataset: 'AIDataset',
    AIDatasetVersion: 'AIDatasetVersion',
    AIDatasetRecord: 'AIDatasetRecord',
    AIDatasetLabel: 'AIDatasetLabel',
    AIDatasetAuditLog: 'AIDatasetAuditLog',
    AIStreamSession: 'AIStreamSession'
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
      modelProps: "aIProviderConfig" | "aIRequestLog" | "aIMemory" | "aIWorkflow" | "aIWorkflowRun" | "aIWorkflowVersion" | "aIWorkflowLiveEvent" | "aIDataset" | "aIDatasetVersion" | "aIDatasetRecord" | "aIDatasetLabel" | "aIDatasetAuditLog" | "aIStreamSession"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AIProviderConfig: {
        payload: Prisma.$AIProviderConfigPayload<ExtArgs>
        fields: Prisma.AIProviderConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIProviderConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIProviderConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>
          }
          findFirst: {
            args: Prisma.AIProviderConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIProviderConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>
          }
          findMany: {
            args: Prisma.AIProviderConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>[]
          }
          create: {
            args: Prisma.AIProviderConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>
          }
          createMany: {
            args: Prisma.AIProviderConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIProviderConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>[]
          }
          delete: {
            args: Prisma.AIProviderConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>
          }
          update: {
            args: Prisma.AIProviderConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>
          }
          deleteMany: {
            args: Prisma.AIProviderConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIProviderConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIProviderConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>[]
          }
          upsert: {
            args: Prisma.AIProviderConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderConfigPayload>
          }
          aggregate: {
            args: Prisma.AIProviderConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIProviderConfig>
          }
          groupBy: {
            args: Prisma.AIProviderConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIProviderConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIProviderConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AIProviderConfigCountAggregateOutputType> | number
          }
        }
      }
      AIRequestLog: {
        payload: Prisma.$AIRequestLogPayload<ExtArgs>
        fields: Prisma.AIRequestLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIRequestLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIRequestLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>
          }
          findFirst: {
            args: Prisma.AIRequestLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIRequestLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>
          }
          findMany: {
            args: Prisma.AIRequestLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>[]
          }
          create: {
            args: Prisma.AIRequestLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>
          }
          createMany: {
            args: Prisma.AIRequestLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIRequestLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>[]
          }
          delete: {
            args: Prisma.AIRequestLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>
          }
          update: {
            args: Prisma.AIRequestLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>
          }
          deleteMany: {
            args: Prisma.AIRequestLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIRequestLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIRequestLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>[]
          }
          upsert: {
            args: Prisma.AIRequestLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIRequestLogPayload>
          }
          aggregate: {
            args: Prisma.AIRequestLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIRequestLog>
          }
          groupBy: {
            args: Prisma.AIRequestLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIRequestLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIRequestLogCountArgs<ExtArgs>
            result: $Utils.Optional<AIRequestLogCountAggregateOutputType> | number
          }
        }
      }
      AIMemory: {
        payload: Prisma.$AIMemoryPayload<ExtArgs>
        fields: Prisma.AIMemoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIMemoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIMemoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>
          }
          findFirst: {
            args: Prisma.AIMemoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIMemoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>
          }
          findMany: {
            args: Prisma.AIMemoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>[]
          }
          create: {
            args: Prisma.AIMemoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>
          }
          createMany: {
            args: Prisma.AIMemoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIMemoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>[]
          }
          delete: {
            args: Prisma.AIMemoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>
          }
          update: {
            args: Prisma.AIMemoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>
          }
          deleteMany: {
            args: Prisma.AIMemoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIMemoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIMemoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>[]
          }
          upsert: {
            args: Prisma.AIMemoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMemoryPayload>
          }
          aggregate: {
            args: Prisma.AIMemoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIMemory>
          }
          groupBy: {
            args: Prisma.AIMemoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIMemoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIMemoryCountArgs<ExtArgs>
            result: $Utils.Optional<AIMemoryCountAggregateOutputType> | number
          }
        }
      }
      AIWorkflow: {
        payload: Prisma.$AIWorkflowPayload<ExtArgs>
        fields: Prisma.AIWorkflowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIWorkflowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIWorkflowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>
          }
          findFirst: {
            args: Prisma.AIWorkflowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIWorkflowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>
          }
          findMany: {
            args: Prisma.AIWorkflowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>[]
          }
          create: {
            args: Prisma.AIWorkflowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>
          }
          createMany: {
            args: Prisma.AIWorkflowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIWorkflowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>[]
          }
          delete: {
            args: Prisma.AIWorkflowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>
          }
          update: {
            args: Prisma.AIWorkflowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>
          }
          deleteMany: {
            args: Prisma.AIWorkflowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIWorkflowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIWorkflowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>[]
          }
          upsert: {
            args: Prisma.AIWorkflowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowPayload>
          }
          aggregate: {
            args: Prisma.AIWorkflowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIWorkflow>
          }
          groupBy: {
            args: Prisma.AIWorkflowGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIWorkflowGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIWorkflowCountArgs<ExtArgs>
            result: $Utils.Optional<AIWorkflowCountAggregateOutputType> | number
          }
        }
      }
      AIWorkflowRun: {
        payload: Prisma.$AIWorkflowRunPayload<ExtArgs>
        fields: Prisma.AIWorkflowRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIWorkflowRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIWorkflowRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>
          }
          findFirst: {
            args: Prisma.AIWorkflowRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIWorkflowRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>
          }
          findMany: {
            args: Prisma.AIWorkflowRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>[]
          }
          create: {
            args: Prisma.AIWorkflowRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>
          }
          createMany: {
            args: Prisma.AIWorkflowRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIWorkflowRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>[]
          }
          delete: {
            args: Prisma.AIWorkflowRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>
          }
          update: {
            args: Prisma.AIWorkflowRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>
          }
          deleteMany: {
            args: Prisma.AIWorkflowRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIWorkflowRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIWorkflowRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>[]
          }
          upsert: {
            args: Prisma.AIWorkflowRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowRunPayload>
          }
          aggregate: {
            args: Prisma.AIWorkflowRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIWorkflowRun>
          }
          groupBy: {
            args: Prisma.AIWorkflowRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIWorkflowRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIWorkflowRunCountArgs<ExtArgs>
            result: $Utils.Optional<AIWorkflowRunCountAggregateOutputType> | number
          }
        }
      }
      AIWorkflowVersion: {
        payload: Prisma.$AIWorkflowVersionPayload<ExtArgs>
        fields: Prisma.AIWorkflowVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIWorkflowVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIWorkflowVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>
          }
          findFirst: {
            args: Prisma.AIWorkflowVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIWorkflowVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>
          }
          findMany: {
            args: Prisma.AIWorkflowVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>[]
          }
          create: {
            args: Prisma.AIWorkflowVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>
          }
          createMany: {
            args: Prisma.AIWorkflowVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIWorkflowVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>[]
          }
          delete: {
            args: Prisma.AIWorkflowVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>
          }
          update: {
            args: Prisma.AIWorkflowVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>
          }
          deleteMany: {
            args: Prisma.AIWorkflowVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIWorkflowVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIWorkflowVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>[]
          }
          upsert: {
            args: Prisma.AIWorkflowVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowVersionPayload>
          }
          aggregate: {
            args: Prisma.AIWorkflowVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIWorkflowVersion>
          }
          groupBy: {
            args: Prisma.AIWorkflowVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIWorkflowVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIWorkflowVersionCountArgs<ExtArgs>
            result: $Utils.Optional<AIWorkflowVersionCountAggregateOutputType> | number
          }
        }
      }
      AIWorkflowLiveEvent: {
        payload: Prisma.$AIWorkflowLiveEventPayload<ExtArgs>
        fields: Prisma.AIWorkflowLiveEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIWorkflowLiveEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIWorkflowLiveEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>
          }
          findFirst: {
            args: Prisma.AIWorkflowLiveEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIWorkflowLiveEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>
          }
          findMany: {
            args: Prisma.AIWorkflowLiveEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>[]
          }
          create: {
            args: Prisma.AIWorkflowLiveEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>
          }
          createMany: {
            args: Prisma.AIWorkflowLiveEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIWorkflowLiveEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>[]
          }
          delete: {
            args: Prisma.AIWorkflowLiveEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>
          }
          update: {
            args: Prisma.AIWorkflowLiveEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>
          }
          deleteMany: {
            args: Prisma.AIWorkflowLiveEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIWorkflowLiveEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIWorkflowLiveEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>[]
          }
          upsert: {
            args: Prisma.AIWorkflowLiveEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIWorkflowLiveEventPayload>
          }
          aggregate: {
            args: Prisma.AIWorkflowLiveEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIWorkflowLiveEvent>
          }
          groupBy: {
            args: Prisma.AIWorkflowLiveEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIWorkflowLiveEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIWorkflowLiveEventCountArgs<ExtArgs>
            result: $Utils.Optional<AIWorkflowLiveEventCountAggregateOutputType> | number
          }
        }
      }
      AIDataset: {
        payload: Prisma.$AIDatasetPayload<ExtArgs>
        fields: Prisma.AIDatasetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIDatasetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIDatasetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>
          }
          findFirst: {
            args: Prisma.AIDatasetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIDatasetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>
          }
          findMany: {
            args: Prisma.AIDatasetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>[]
          }
          create: {
            args: Prisma.AIDatasetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>
          }
          createMany: {
            args: Prisma.AIDatasetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIDatasetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>[]
          }
          delete: {
            args: Prisma.AIDatasetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>
          }
          update: {
            args: Prisma.AIDatasetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>
          }
          deleteMany: {
            args: Prisma.AIDatasetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIDatasetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIDatasetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>[]
          }
          upsert: {
            args: Prisma.AIDatasetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetPayload>
          }
          aggregate: {
            args: Prisma.AIDatasetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIDataset>
          }
          groupBy: {
            args: Prisma.AIDatasetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIDatasetCountArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetCountAggregateOutputType> | number
          }
        }
      }
      AIDatasetVersion: {
        payload: Prisma.$AIDatasetVersionPayload<ExtArgs>
        fields: Prisma.AIDatasetVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIDatasetVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIDatasetVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>
          }
          findFirst: {
            args: Prisma.AIDatasetVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIDatasetVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>
          }
          findMany: {
            args: Prisma.AIDatasetVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>[]
          }
          create: {
            args: Prisma.AIDatasetVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>
          }
          createMany: {
            args: Prisma.AIDatasetVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIDatasetVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>[]
          }
          delete: {
            args: Prisma.AIDatasetVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>
          }
          update: {
            args: Prisma.AIDatasetVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>
          }
          deleteMany: {
            args: Prisma.AIDatasetVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIDatasetVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIDatasetVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>[]
          }
          upsert: {
            args: Prisma.AIDatasetVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetVersionPayload>
          }
          aggregate: {
            args: Prisma.AIDatasetVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIDatasetVersion>
          }
          groupBy: {
            args: Prisma.AIDatasetVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIDatasetVersionCountArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetVersionCountAggregateOutputType> | number
          }
        }
      }
      AIDatasetRecord: {
        payload: Prisma.$AIDatasetRecordPayload<ExtArgs>
        fields: Prisma.AIDatasetRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIDatasetRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIDatasetRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>
          }
          findFirst: {
            args: Prisma.AIDatasetRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIDatasetRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>
          }
          findMany: {
            args: Prisma.AIDatasetRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>[]
          }
          create: {
            args: Prisma.AIDatasetRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>
          }
          createMany: {
            args: Prisma.AIDatasetRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIDatasetRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>[]
          }
          delete: {
            args: Prisma.AIDatasetRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>
          }
          update: {
            args: Prisma.AIDatasetRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>
          }
          deleteMany: {
            args: Prisma.AIDatasetRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIDatasetRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIDatasetRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>[]
          }
          upsert: {
            args: Prisma.AIDatasetRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetRecordPayload>
          }
          aggregate: {
            args: Prisma.AIDatasetRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIDatasetRecord>
          }
          groupBy: {
            args: Prisma.AIDatasetRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIDatasetRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetRecordCountAggregateOutputType> | number
          }
        }
      }
      AIDatasetLabel: {
        payload: Prisma.$AIDatasetLabelPayload<ExtArgs>
        fields: Prisma.AIDatasetLabelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIDatasetLabelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIDatasetLabelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>
          }
          findFirst: {
            args: Prisma.AIDatasetLabelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIDatasetLabelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>
          }
          findMany: {
            args: Prisma.AIDatasetLabelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>[]
          }
          create: {
            args: Prisma.AIDatasetLabelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>
          }
          createMany: {
            args: Prisma.AIDatasetLabelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIDatasetLabelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>[]
          }
          delete: {
            args: Prisma.AIDatasetLabelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>
          }
          update: {
            args: Prisma.AIDatasetLabelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>
          }
          deleteMany: {
            args: Prisma.AIDatasetLabelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIDatasetLabelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIDatasetLabelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>[]
          }
          upsert: {
            args: Prisma.AIDatasetLabelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetLabelPayload>
          }
          aggregate: {
            args: Prisma.AIDatasetLabelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIDatasetLabel>
          }
          groupBy: {
            args: Prisma.AIDatasetLabelGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetLabelGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIDatasetLabelCountArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetLabelCountAggregateOutputType> | number
          }
        }
      }
      AIDatasetAuditLog: {
        payload: Prisma.$AIDatasetAuditLogPayload<ExtArgs>
        fields: Prisma.AIDatasetAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIDatasetAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIDatasetAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>
          }
          findFirst: {
            args: Prisma.AIDatasetAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIDatasetAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>
          }
          findMany: {
            args: Prisma.AIDatasetAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>[]
          }
          create: {
            args: Prisma.AIDatasetAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>
          }
          createMany: {
            args: Prisma.AIDatasetAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIDatasetAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>[]
          }
          delete: {
            args: Prisma.AIDatasetAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>
          }
          update: {
            args: Prisma.AIDatasetAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AIDatasetAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIDatasetAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIDatasetAuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AIDatasetAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDatasetAuditLogPayload>
          }
          aggregate: {
            args: Prisma.AIDatasetAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIDatasetAuditLog>
          }
          groupBy: {
            args: Prisma.AIDatasetAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIDatasetAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AIDatasetAuditLogCountAggregateOutputType> | number
          }
        }
      }
      AIStreamSession: {
        payload: Prisma.$AIStreamSessionPayload<ExtArgs>
        fields: Prisma.AIStreamSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIStreamSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIStreamSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>
          }
          findFirst: {
            args: Prisma.AIStreamSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIStreamSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>
          }
          findMany: {
            args: Prisma.AIStreamSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>[]
          }
          create: {
            args: Prisma.AIStreamSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>
          }
          createMany: {
            args: Prisma.AIStreamSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIStreamSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>[]
          }
          delete: {
            args: Prisma.AIStreamSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>
          }
          update: {
            args: Prisma.AIStreamSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>
          }
          deleteMany: {
            args: Prisma.AIStreamSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIStreamSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIStreamSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>[]
          }
          upsert: {
            args: Prisma.AIStreamSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIStreamSessionPayload>
          }
          aggregate: {
            args: Prisma.AIStreamSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIStreamSession>
          }
          groupBy: {
            args: Prisma.AIStreamSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIStreamSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIStreamSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AIStreamSessionCountAggregateOutputType> | number
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
    aIProviderConfig?: AIProviderConfigOmit
    aIRequestLog?: AIRequestLogOmit
    aIMemory?: AIMemoryOmit
    aIWorkflow?: AIWorkflowOmit
    aIWorkflowRun?: AIWorkflowRunOmit
    aIWorkflowVersion?: AIWorkflowVersionOmit
    aIWorkflowLiveEvent?: AIWorkflowLiveEventOmit
    aIDataset?: AIDatasetOmit
    aIDatasetVersion?: AIDatasetVersionOmit
    aIDatasetRecord?: AIDatasetRecordOmit
    aIDatasetLabel?: AIDatasetLabelOmit
    aIDatasetAuditLog?: AIDatasetAuditLogOmit
    aIStreamSession?: AIStreamSessionOmit
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
   * Count Type AIDatasetCountOutputType
   */

  export type AIDatasetCountOutputType = {
    versions: number
    records: number
    auditLogs: number
  }

  export type AIDatasetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | AIDatasetCountOutputTypeCountVersionsArgs
    records?: boolean | AIDatasetCountOutputTypeCountRecordsArgs
    auditLogs?: boolean | AIDatasetCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * AIDatasetCountOutputType without action
   */
  export type AIDatasetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetCountOutputType
     */
    select?: AIDatasetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AIDatasetCountOutputType without action
   */
  export type AIDatasetCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetVersionWhereInput
  }

  /**
   * AIDatasetCountOutputType without action
   */
  export type AIDatasetCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetRecordWhereInput
  }

  /**
   * AIDatasetCountOutputType without action
   */
  export type AIDatasetCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetAuditLogWhereInput
  }


  /**
   * Count Type AIDatasetVersionCountOutputType
   */

  export type AIDatasetVersionCountOutputType = {
    records: number
  }

  export type AIDatasetVersionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    records?: boolean | AIDatasetVersionCountOutputTypeCountRecordsArgs
  }

  // Custom InputTypes
  /**
   * AIDatasetVersionCountOutputType without action
   */
  export type AIDatasetVersionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersionCountOutputType
     */
    select?: AIDatasetVersionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AIDatasetVersionCountOutputType without action
   */
  export type AIDatasetVersionCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetRecordWhereInput
  }


  /**
   * Count Type AIDatasetRecordCountOutputType
   */

  export type AIDatasetRecordCountOutputType = {
    labels: number
  }

  export type AIDatasetRecordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    labels?: boolean | AIDatasetRecordCountOutputTypeCountLabelsArgs
  }

  // Custom InputTypes
  /**
   * AIDatasetRecordCountOutputType without action
   */
  export type AIDatasetRecordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecordCountOutputType
     */
    select?: AIDatasetRecordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AIDatasetRecordCountOutputType without action
   */
  export type AIDatasetRecordCountOutputTypeCountLabelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetLabelWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AIProviderConfig
   */

  export type AggregateAIProviderConfig = {
    _count: AIProviderConfigCountAggregateOutputType | null
    _avg: AIProviderConfigAvgAggregateOutputType | null
    _sum: AIProviderConfigSumAggregateOutputType | null
    _min: AIProviderConfigMinAggregateOutputType | null
    _max: AIProviderConfigMaxAggregateOutputType | null
  }

  export type AIProviderConfigAvgAggregateOutputType = {
    priority: number | null
  }

  export type AIProviderConfigSumAggregateOutputType = {
    priority: number | null
  }

  export type AIProviderConfigMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: $Enums.AIProviderType | null
    modelName: string | null
    apiKey: string | null
    baseUrl: string | null
    isActive: boolean | null
    priority: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIProviderConfigMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: $Enums.AIProviderType | null
    modelName: string | null
    apiKey: string | null
    baseUrl: string | null
    isActive: boolean | null
    priority: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIProviderConfigCountAggregateOutputType = {
    id: number
    tenantId: number
    provider: number
    modelName: number
    apiKey: number
    baseUrl: number
    isActive: number
    priority: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIProviderConfigAvgAggregateInputType = {
    priority?: true
  }

  export type AIProviderConfigSumAggregateInputType = {
    priority?: true
  }

  export type AIProviderConfigMinAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    modelName?: true
    apiKey?: true
    baseUrl?: true
    isActive?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIProviderConfigMaxAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    modelName?: true
    apiKey?: true
    baseUrl?: true
    isActive?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIProviderConfigCountAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    modelName?: true
    apiKey?: true
    baseUrl?: true
    isActive?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIProviderConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIProviderConfig to aggregate.
     */
    where?: AIProviderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIProviderConfigs to fetch.
     */
    orderBy?: AIProviderConfigOrderByWithRelationInput | AIProviderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIProviderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIProviderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIProviderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIProviderConfigs
    **/
    _count?: true | AIProviderConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIProviderConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIProviderConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIProviderConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIProviderConfigMaxAggregateInputType
  }

  export type GetAIProviderConfigAggregateType<T extends AIProviderConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAIProviderConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIProviderConfig[P]>
      : GetScalarType<T[P], AggregateAIProviderConfig[P]>
  }




  export type AIProviderConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIProviderConfigWhereInput
    orderBy?: AIProviderConfigOrderByWithAggregationInput | AIProviderConfigOrderByWithAggregationInput[]
    by: AIProviderConfigScalarFieldEnum[] | AIProviderConfigScalarFieldEnum
    having?: AIProviderConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIProviderConfigCountAggregateInputType | true
    _avg?: AIProviderConfigAvgAggregateInputType
    _sum?: AIProviderConfigSumAggregateInputType
    _min?: AIProviderConfigMinAggregateInputType
    _max?: AIProviderConfigMaxAggregateInputType
  }

  export type AIProviderConfigGroupByOutputType = {
    id: string
    tenantId: string
    provider: $Enums.AIProviderType
    modelName: string
    apiKey: string
    baseUrl: string | null
    isActive: boolean
    priority: number
    createdAt: Date
    updatedAt: Date
    _count: AIProviderConfigCountAggregateOutputType | null
    _avg: AIProviderConfigAvgAggregateOutputType | null
    _sum: AIProviderConfigSumAggregateOutputType | null
    _min: AIProviderConfigMinAggregateOutputType | null
    _max: AIProviderConfigMaxAggregateOutputType | null
  }

  type GetAIProviderConfigGroupByPayload<T extends AIProviderConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIProviderConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIProviderConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIProviderConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AIProviderConfigGroupByOutputType[P]>
        }
      >
    >


  export type AIProviderConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    modelName?: boolean
    apiKey?: boolean
    baseUrl?: boolean
    isActive?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIProviderConfig"]>

  export type AIProviderConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    modelName?: boolean
    apiKey?: boolean
    baseUrl?: boolean
    isActive?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIProviderConfig"]>

  export type AIProviderConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    modelName?: boolean
    apiKey?: boolean
    baseUrl?: boolean
    isActive?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIProviderConfig"]>

  export type AIProviderConfigSelectScalar = {
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    modelName?: boolean
    apiKey?: boolean
    baseUrl?: boolean
    isActive?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIProviderConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "provider" | "modelName" | "apiKey" | "baseUrl" | "isActive" | "priority" | "createdAt" | "updatedAt", ExtArgs["result"]["aIProviderConfig"]>

  export type $AIProviderConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIProviderConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      provider: $Enums.AIProviderType
      modelName: string
      apiKey: string
      baseUrl: string | null
      isActive: boolean
      priority: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIProviderConfig"]>
    composites: {}
  }

  type AIProviderConfigGetPayload<S extends boolean | null | undefined | AIProviderConfigDefaultArgs> = $Result.GetResult<Prisma.$AIProviderConfigPayload, S>

  type AIProviderConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIProviderConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIProviderConfigCountAggregateInputType | true
    }

  export interface AIProviderConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIProviderConfig'], meta: { name: 'AIProviderConfig' } }
    /**
     * Find zero or one AIProviderConfig that matches the filter.
     * @param {AIProviderConfigFindUniqueArgs} args - Arguments to find a AIProviderConfig
     * @example
     * // Get one AIProviderConfig
     * const aIProviderConfig = await prisma.aIProviderConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIProviderConfigFindUniqueArgs>(args: SelectSubset<T, AIProviderConfigFindUniqueArgs<ExtArgs>>): Prisma__AIProviderConfigClient<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIProviderConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIProviderConfigFindUniqueOrThrowArgs} args - Arguments to find a AIProviderConfig
     * @example
     * // Get one AIProviderConfig
     * const aIProviderConfig = await prisma.aIProviderConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIProviderConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AIProviderConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIProviderConfigClient<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIProviderConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderConfigFindFirstArgs} args - Arguments to find a AIProviderConfig
     * @example
     * // Get one AIProviderConfig
     * const aIProviderConfig = await prisma.aIProviderConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIProviderConfigFindFirstArgs>(args?: SelectSubset<T, AIProviderConfigFindFirstArgs<ExtArgs>>): Prisma__AIProviderConfigClient<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIProviderConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderConfigFindFirstOrThrowArgs} args - Arguments to find a AIProviderConfig
     * @example
     * // Get one AIProviderConfig
     * const aIProviderConfig = await prisma.aIProviderConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIProviderConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AIProviderConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIProviderConfigClient<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIProviderConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIProviderConfigs
     * const aIProviderConfigs = await prisma.aIProviderConfig.findMany()
     * 
     * // Get first 10 AIProviderConfigs
     * const aIProviderConfigs = await prisma.aIProviderConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIProviderConfigWithIdOnly = await prisma.aIProviderConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIProviderConfigFindManyArgs>(args?: SelectSubset<T, AIProviderConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIProviderConfig.
     * @param {AIProviderConfigCreateArgs} args - Arguments to create a AIProviderConfig.
     * @example
     * // Create one AIProviderConfig
     * const AIProviderConfig = await prisma.aIProviderConfig.create({
     *   data: {
     *     // ... data to create a AIProviderConfig
     *   }
     * })
     * 
     */
    create<T extends AIProviderConfigCreateArgs>(args: SelectSubset<T, AIProviderConfigCreateArgs<ExtArgs>>): Prisma__AIProviderConfigClient<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIProviderConfigs.
     * @param {AIProviderConfigCreateManyArgs} args - Arguments to create many AIProviderConfigs.
     * @example
     * // Create many AIProviderConfigs
     * const aIProviderConfig = await prisma.aIProviderConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIProviderConfigCreateManyArgs>(args?: SelectSubset<T, AIProviderConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIProviderConfigs and returns the data saved in the database.
     * @param {AIProviderConfigCreateManyAndReturnArgs} args - Arguments to create many AIProviderConfigs.
     * @example
     * // Create many AIProviderConfigs
     * const aIProviderConfig = await prisma.aIProviderConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIProviderConfigs and only return the `id`
     * const aIProviderConfigWithIdOnly = await prisma.aIProviderConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIProviderConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, AIProviderConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIProviderConfig.
     * @param {AIProviderConfigDeleteArgs} args - Arguments to delete one AIProviderConfig.
     * @example
     * // Delete one AIProviderConfig
     * const AIProviderConfig = await prisma.aIProviderConfig.delete({
     *   where: {
     *     // ... filter to delete one AIProviderConfig
     *   }
     * })
     * 
     */
    delete<T extends AIProviderConfigDeleteArgs>(args: SelectSubset<T, AIProviderConfigDeleteArgs<ExtArgs>>): Prisma__AIProviderConfigClient<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIProviderConfig.
     * @param {AIProviderConfigUpdateArgs} args - Arguments to update one AIProviderConfig.
     * @example
     * // Update one AIProviderConfig
     * const aIProviderConfig = await prisma.aIProviderConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIProviderConfigUpdateArgs>(args: SelectSubset<T, AIProviderConfigUpdateArgs<ExtArgs>>): Prisma__AIProviderConfigClient<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIProviderConfigs.
     * @param {AIProviderConfigDeleteManyArgs} args - Arguments to filter AIProviderConfigs to delete.
     * @example
     * // Delete a few AIProviderConfigs
     * const { count } = await prisma.aIProviderConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIProviderConfigDeleteManyArgs>(args?: SelectSubset<T, AIProviderConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIProviderConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIProviderConfigs
     * const aIProviderConfig = await prisma.aIProviderConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIProviderConfigUpdateManyArgs>(args: SelectSubset<T, AIProviderConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIProviderConfigs and returns the data updated in the database.
     * @param {AIProviderConfigUpdateManyAndReturnArgs} args - Arguments to update many AIProviderConfigs.
     * @example
     * // Update many AIProviderConfigs
     * const aIProviderConfig = await prisma.aIProviderConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIProviderConfigs and only return the `id`
     * const aIProviderConfigWithIdOnly = await prisma.aIProviderConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIProviderConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, AIProviderConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIProviderConfig.
     * @param {AIProviderConfigUpsertArgs} args - Arguments to update or create a AIProviderConfig.
     * @example
     * // Update or create a AIProviderConfig
     * const aIProviderConfig = await prisma.aIProviderConfig.upsert({
     *   create: {
     *     // ... data to create a AIProviderConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIProviderConfig we want to update
     *   }
     * })
     */
    upsert<T extends AIProviderConfigUpsertArgs>(args: SelectSubset<T, AIProviderConfigUpsertArgs<ExtArgs>>): Prisma__AIProviderConfigClient<$Result.GetResult<Prisma.$AIProviderConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIProviderConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderConfigCountArgs} args - Arguments to filter AIProviderConfigs to count.
     * @example
     * // Count the number of AIProviderConfigs
     * const count = await prisma.aIProviderConfig.count({
     *   where: {
     *     // ... the filter for the AIProviderConfigs we want to count
     *   }
     * })
    **/
    count<T extends AIProviderConfigCountArgs>(
      args?: Subset<T, AIProviderConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIProviderConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIProviderConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIProviderConfigAggregateArgs>(args: Subset<T, AIProviderConfigAggregateArgs>): Prisma.PrismaPromise<GetAIProviderConfigAggregateType<T>>

    /**
     * Group by AIProviderConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderConfigGroupByArgs} args - Group by arguments.
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
      T extends AIProviderConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIProviderConfigGroupByArgs['orderBy'] }
        : { orderBy?: AIProviderConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIProviderConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIProviderConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIProviderConfig model
   */
  readonly fields: AIProviderConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIProviderConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIProviderConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIProviderConfig model
   */
  interface AIProviderConfigFieldRefs {
    readonly id: FieldRef<"AIProviderConfig", 'String'>
    readonly tenantId: FieldRef<"AIProviderConfig", 'String'>
    readonly provider: FieldRef<"AIProviderConfig", 'AIProviderType'>
    readonly modelName: FieldRef<"AIProviderConfig", 'String'>
    readonly apiKey: FieldRef<"AIProviderConfig", 'String'>
    readonly baseUrl: FieldRef<"AIProviderConfig", 'String'>
    readonly isActive: FieldRef<"AIProviderConfig", 'Boolean'>
    readonly priority: FieldRef<"AIProviderConfig", 'Int'>
    readonly createdAt: FieldRef<"AIProviderConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"AIProviderConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIProviderConfig findUnique
   */
  export type AIProviderConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderConfig to fetch.
     */
    where: AIProviderConfigWhereUniqueInput
  }

  /**
   * AIProviderConfig findUniqueOrThrow
   */
  export type AIProviderConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderConfig to fetch.
     */
    where: AIProviderConfigWhereUniqueInput
  }

  /**
   * AIProviderConfig findFirst
   */
  export type AIProviderConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderConfig to fetch.
     */
    where?: AIProviderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIProviderConfigs to fetch.
     */
    orderBy?: AIProviderConfigOrderByWithRelationInput | AIProviderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIProviderConfigs.
     */
    cursor?: AIProviderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIProviderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIProviderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIProviderConfigs.
     */
    distinct?: AIProviderConfigScalarFieldEnum | AIProviderConfigScalarFieldEnum[]
  }

  /**
   * AIProviderConfig findFirstOrThrow
   */
  export type AIProviderConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderConfig to fetch.
     */
    where?: AIProviderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIProviderConfigs to fetch.
     */
    orderBy?: AIProviderConfigOrderByWithRelationInput | AIProviderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIProviderConfigs.
     */
    cursor?: AIProviderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIProviderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIProviderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIProviderConfigs.
     */
    distinct?: AIProviderConfigScalarFieldEnum | AIProviderConfigScalarFieldEnum[]
  }

  /**
   * AIProviderConfig findMany
   */
  export type AIProviderConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderConfigs to fetch.
     */
    where?: AIProviderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIProviderConfigs to fetch.
     */
    orderBy?: AIProviderConfigOrderByWithRelationInput | AIProviderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIProviderConfigs.
     */
    cursor?: AIProviderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIProviderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIProviderConfigs.
     */
    skip?: number
    distinct?: AIProviderConfigScalarFieldEnum | AIProviderConfigScalarFieldEnum[]
  }

  /**
   * AIProviderConfig create
   */
  export type AIProviderConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a AIProviderConfig.
     */
    data: XOR<AIProviderConfigCreateInput, AIProviderConfigUncheckedCreateInput>
  }

  /**
   * AIProviderConfig createMany
   */
  export type AIProviderConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIProviderConfigs.
     */
    data: AIProviderConfigCreateManyInput | AIProviderConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIProviderConfig createManyAndReturn
   */
  export type AIProviderConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * The data used to create many AIProviderConfigs.
     */
    data: AIProviderConfigCreateManyInput | AIProviderConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIProviderConfig update
   */
  export type AIProviderConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a AIProviderConfig.
     */
    data: XOR<AIProviderConfigUpdateInput, AIProviderConfigUncheckedUpdateInput>
    /**
     * Choose, which AIProviderConfig to update.
     */
    where: AIProviderConfigWhereUniqueInput
  }

  /**
   * AIProviderConfig updateMany
   */
  export type AIProviderConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIProviderConfigs.
     */
    data: XOR<AIProviderConfigUpdateManyMutationInput, AIProviderConfigUncheckedUpdateManyInput>
    /**
     * Filter which AIProviderConfigs to update
     */
    where?: AIProviderConfigWhereInput
    /**
     * Limit how many AIProviderConfigs to update.
     */
    limit?: number
  }

  /**
   * AIProviderConfig updateManyAndReturn
   */
  export type AIProviderConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * The data used to update AIProviderConfigs.
     */
    data: XOR<AIProviderConfigUpdateManyMutationInput, AIProviderConfigUncheckedUpdateManyInput>
    /**
     * Filter which AIProviderConfigs to update
     */
    where?: AIProviderConfigWhereInput
    /**
     * Limit how many AIProviderConfigs to update.
     */
    limit?: number
  }

  /**
   * AIProviderConfig upsert
   */
  export type AIProviderConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the AIProviderConfig to update in case it exists.
     */
    where: AIProviderConfigWhereUniqueInput
    /**
     * In case the AIProviderConfig found by the `where` argument doesn't exist, create a new AIProviderConfig with this data.
     */
    create: XOR<AIProviderConfigCreateInput, AIProviderConfigUncheckedCreateInput>
    /**
     * In case the AIProviderConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIProviderConfigUpdateInput, AIProviderConfigUncheckedUpdateInput>
  }

  /**
   * AIProviderConfig delete
   */
  export type AIProviderConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
    /**
     * Filter which AIProviderConfig to delete.
     */
    where: AIProviderConfigWhereUniqueInput
  }

  /**
   * AIProviderConfig deleteMany
   */
  export type AIProviderConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIProviderConfigs to delete
     */
    where?: AIProviderConfigWhereInput
    /**
     * Limit how many AIProviderConfigs to delete.
     */
    limit?: number
  }

  /**
   * AIProviderConfig without action
   */
  export type AIProviderConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderConfig
     */
    select?: AIProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderConfig
     */
    omit?: AIProviderConfigOmit<ExtArgs> | null
  }


  /**
   * Model AIRequestLog
   */

  export type AggregateAIRequestLog = {
    _count: AIRequestLogCountAggregateOutputType | null
    _avg: AIRequestLogAvgAggregateOutputType | null
    _sum: AIRequestLogSumAggregateOutputType | null
    _min: AIRequestLogMinAggregateOutputType | null
    _max: AIRequestLogMaxAggregateOutputType | null
  }

  export type AIRequestLogAvgAggregateOutputType = {
    tokensInput: number | null
    tokensOutput: number | null
    latencyMs: number | null
  }

  export type AIRequestLogSumAggregateOutputType = {
    tokensInput: number | null
    tokensOutput: number | null
    latencyMs: number | null
  }

  export type AIRequestLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    modelName: string | null
    prompt: string | null
    response: string | null
    tokensInput: number | null
    tokensOutput: number | null
    latencyMs: number | null
    createdAt: Date | null
  }

  export type AIRequestLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    modelName: string | null
    prompt: string | null
    response: string | null
    tokensInput: number | null
    tokensOutput: number | null
    latencyMs: number | null
    createdAt: Date | null
  }

  export type AIRequestLogCountAggregateOutputType = {
    id: number
    tenantId: number
    provider: number
    modelName: number
    prompt: number
    response: number
    tokensInput: number
    tokensOutput: number
    latencyMs: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AIRequestLogAvgAggregateInputType = {
    tokensInput?: true
    tokensOutput?: true
    latencyMs?: true
  }

  export type AIRequestLogSumAggregateInputType = {
    tokensInput?: true
    tokensOutput?: true
    latencyMs?: true
  }

  export type AIRequestLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    modelName?: true
    prompt?: true
    response?: true
    tokensInput?: true
    tokensOutput?: true
    latencyMs?: true
    createdAt?: true
  }

  export type AIRequestLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    modelName?: true
    prompt?: true
    response?: true
    tokensInput?: true
    tokensOutput?: true
    latencyMs?: true
    createdAt?: true
  }

  export type AIRequestLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    modelName?: true
    prompt?: true
    response?: true
    tokensInput?: true
    tokensOutput?: true
    latencyMs?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AIRequestLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIRequestLog to aggregate.
     */
    where?: AIRequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIRequestLogs to fetch.
     */
    orderBy?: AIRequestLogOrderByWithRelationInput | AIRequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIRequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIRequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIRequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIRequestLogs
    **/
    _count?: true | AIRequestLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIRequestLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIRequestLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIRequestLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIRequestLogMaxAggregateInputType
  }

  export type GetAIRequestLogAggregateType<T extends AIRequestLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAIRequestLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIRequestLog[P]>
      : GetScalarType<T[P], AggregateAIRequestLog[P]>
  }




  export type AIRequestLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIRequestLogWhereInput
    orderBy?: AIRequestLogOrderByWithAggregationInput | AIRequestLogOrderByWithAggregationInput[]
    by: AIRequestLogScalarFieldEnum[] | AIRequestLogScalarFieldEnum
    having?: AIRequestLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIRequestLogCountAggregateInputType | true
    _avg?: AIRequestLogAvgAggregateInputType
    _sum?: AIRequestLogSumAggregateInputType
    _min?: AIRequestLogMinAggregateInputType
    _max?: AIRequestLogMaxAggregateInputType
  }

  export type AIRequestLogGroupByOutputType = {
    id: string
    tenantId: string
    provider: string
    modelName: string
    prompt: string
    response: string
    tokensInput: number
    tokensOutput: number
    latencyMs: number
    metadata: JsonValue
    createdAt: Date
    _count: AIRequestLogCountAggregateOutputType | null
    _avg: AIRequestLogAvgAggregateOutputType | null
    _sum: AIRequestLogSumAggregateOutputType | null
    _min: AIRequestLogMinAggregateOutputType | null
    _max: AIRequestLogMaxAggregateOutputType | null
  }

  type GetAIRequestLogGroupByPayload<T extends AIRequestLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIRequestLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIRequestLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIRequestLogGroupByOutputType[P]>
            : GetScalarType<T[P], AIRequestLogGroupByOutputType[P]>
        }
      >
    >


  export type AIRequestLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    modelName?: boolean
    prompt?: boolean
    response?: boolean
    tokensInput?: boolean
    tokensOutput?: boolean
    latencyMs?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIRequestLog"]>

  export type AIRequestLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    modelName?: boolean
    prompt?: boolean
    response?: boolean
    tokensInput?: boolean
    tokensOutput?: boolean
    latencyMs?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIRequestLog"]>

  export type AIRequestLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    modelName?: boolean
    prompt?: boolean
    response?: boolean
    tokensInput?: boolean
    tokensOutput?: boolean
    latencyMs?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIRequestLog"]>

  export type AIRequestLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    modelName?: boolean
    prompt?: boolean
    response?: boolean
    tokensInput?: boolean
    tokensOutput?: boolean
    latencyMs?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AIRequestLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "provider" | "modelName" | "prompt" | "response" | "tokensInput" | "tokensOutput" | "latencyMs" | "metadata" | "createdAt", ExtArgs["result"]["aIRequestLog"]>

  export type $AIRequestLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIRequestLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      provider: string
      modelName: string
      prompt: string
      response: string
      tokensInput: number
      tokensOutput: number
      latencyMs: number
      metadata: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["aIRequestLog"]>
    composites: {}
  }

  type AIRequestLogGetPayload<S extends boolean | null | undefined | AIRequestLogDefaultArgs> = $Result.GetResult<Prisma.$AIRequestLogPayload, S>

  type AIRequestLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIRequestLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIRequestLogCountAggregateInputType | true
    }

  export interface AIRequestLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIRequestLog'], meta: { name: 'AIRequestLog' } }
    /**
     * Find zero or one AIRequestLog that matches the filter.
     * @param {AIRequestLogFindUniqueArgs} args - Arguments to find a AIRequestLog
     * @example
     * // Get one AIRequestLog
     * const aIRequestLog = await prisma.aIRequestLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIRequestLogFindUniqueArgs>(args: SelectSubset<T, AIRequestLogFindUniqueArgs<ExtArgs>>): Prisma__AIRequestLogClient<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIRequestLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIRequestLogFindUniqueOrThrowArgs} args - Arguments to find a AIRequestLog
     * @example
     * // Get one AIRequestLog
     * const aIRequestLog = await prisma.aIRequestLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIRequestLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AIRequestLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIRequestLogClient<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIRequestLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRequestLogFindFirstArgs} args - Arguments to find a AIRequestLog
     * @example
     * // Get one AIRequestLog
     * const aIRequestLog = await prisma.aIRequestLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIRequestLogFindFirstArgs>(args?: SelectSubset<T, AIRequestLogFindFirstArgs<ExtArgs>>): Prisma__AIRequestLogClient<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIRequestLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRequestLogFindFirstOrThrowArgs} args - Arguments to find a AIRequestLog
     * @example
     * // Get one AIRequestLog
     * const aIRequestLog = await prisma.aIRequestLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIRequestLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AIRequestLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIRequestLogClient<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIRequestLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRequestLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIRequestLogs
     * const aIRequestLogs = await prisma.aIRequestLog.findMany()
     * 
     * // Get first 10 AIRequestLogs
     * const aIRequestLogs = await prisma.aIRequestLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIRequestLogWithIdOnly = await prisma.aIRequestLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIRequestLogFindManyArgs>(args?: SelectSubset<T, AIRequestLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIRequestLog.
     * @param {AIRequestLogCreateArgs} args - Arguments to create a AIRequestLog.
     * @example
     * // Create one AIRequestLog
     * const AIRequestLog = await prisma.aIRequestLog.create({
     *   data: {
     *     // ... data to create a AIRequestLog
     *   }
     * })
     * 
     */
    create<T extends AIRequestLogCreateArgs>(args: SelectSubset<T, AIRequestLogCreateArgs<ExtArgs>>): Prisma__AIRequestLogClient<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIRequestLogs.
     * @param {AIRequestLogCreateManyArgs} args - Arguments to create many AIRequestLogs.
     * @example
     * // Create many AIRequestLogs
     * const aIRequestLog = await prisma.aIRequestLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIRequestLogCreateManyArgs>(args?: SelectSubset<T, AIRequestLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIRequestLogs and returns the data saved in the database.
     * @param {AIRequestLogCreateManyAndReturnArgs} args - Arguments to create many AIRequestLogs.
     * @example
     * // Create many AIRequestLogs
     * const aIRequestLog = await prisma.aIRequestLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIRequestLogs and only return the `id`
     * const aIRequestLogWithIdOnly = await prisma.aIRequestLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIRequestLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AIRequestLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIRequestLog.
     * @param {AIRequestLogDeleteArgs} args - Arguments to delete one AIRequestLog.
     * @example
     * // Delete one AIRequestLog
     * const AIRequestLog = await prisma.aIRequestLog.delete({
     *   where: {
     *     // ... filter to delete one AIRequestLog
     *   }
     * })
     * 
     */
    delete<T extends AIRequestLogDeleteArgs>(args: SelectSubset<T, AIRequestLogDeleteArgs<ExtArgs>>): Prisma__AIRequestLogClient<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIRequestLog.
     * @param {AIRequestLogUpdateArgs} args - Arguments to update one AIRequestLog.
     * @example
     * // Update one AIRequestLog
     * const aIRequestLog = await prisma.aIRequestLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIRequestLogUpdateArgs>(args: SelectSubset<T, AIRequestLogUpdateArgs<ExtArgs>>): Prisma__AIRequestLogClient<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIRequestLogs.
     * @param {AIRequestLogDeleteManyArgs} args - Arguments to filter AIRequestLogs to delete.
     * @example
     * // Delete a few AIRequestLogs
     * const { count } = await prisma.aIRequestLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIRequestLogDeleteManyArgs>(args?: SelectSubset<T, AIRequestLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIRequestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRequestLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIRequestLogs
     * const aIRequestLog = await prisma.aIRequestLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIRequestLogUpdateManyArgs>(args: SelectSubset<T, AIRequestLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIRequestLogs and returns the data updated in the database.
     * @param {AIRequestLogUpdateManyAndReturnArgs} args - Arguments to update many AIRequestLogs.
     * @example
     * // Update many AIRequestLogs
     * const aIRequestLog = await prisma.aIRequestLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIRequestLogs and only return the `id`
     * const aIRequestLogWithIdOnly = await prisma.aIRequestLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIRequestLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AIRequestLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIRequestLog.
     * @param {AIRequestLogUpsertArgs} args - Arguments to update or create a AIRequestLog.
     * @example
     * // Update or create a AIRequestLog
     * const aIRequestLog = await prisma.aIRequestLog.upsert({
     *   create: {
     *     // ... data to create a AIRequestLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIRequestLog we want to update
     *   }
     * })
     */
    upsert<T extends AIRequestLogUpsertArgs>(args: SelectSubset<T, AIRequestLogUpsertArgs<ExtArgs>>): Prisma__AIRequestLogClient<$Result.GetResult<Prisma.$AIRequestLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIRequestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRequestLogCountArgs} args - Arguments to filter AIRequestLogs to count.
     * @example
     * // Count the number of AIRequestLogs
     * const count = await prisma.aIRequestLog.count({
     *   where: {
     *     // ... the filter for the AIRequestLogs we want to count
     *   }
     * })
    **/
    count<T extends AIRequestLogCountArgs>(
      args?: Subset<T, AIRequestLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIRequestLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIRequestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRequestLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIRequestLogAggregateArgs>(args: Subset<T, AIRequestLogAggregateArgs>): Prisma.PrismaPromise<GetAIRequestLogAggregateType<T>>

    /**
     * Group by AIRequestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIRequestLogGroupByArgs} args - Group by arguments.
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
      T extends AIRequestLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIRequestLogGroupByArgs['orderBy'] }
        : { orderBy?: AIRequestLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIRequestLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIRequestLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIRequestLog model
   */
  readonly fields: AIRequestLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIRequestLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIRequestLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIRequestLog model
   */
  interface AIRequestLogFieldRefs {
    readonly id: FieldRef<"AIRequestLog", 'String'>
    readonly tenantId: FieldRef<"AIRequestLog", 'String'>
    readonly provider: FieldRef<"AIRequestLog", 'String'>
    readonly modelName: FieldRef<"AIRequestLog", 'String'>
    readonly prompt: FieldRef<"AIRequestLog", 'String'>
    readonly response: FieldRef<"AIRequestLog", 'String'>
    readonly tokensInput: FieldRef<"AIRequestLog", 'Int'>
    readonly tokensOutput: FieldRef<"AIRequestLog", 'Int'>
    readonly latencyMs: FieldRef<"AIRequestLog", 'Int'>
    readonly metadata: FieldRef<"AIRequestLog", 'Json'>
    readonly createdAt: FieldRef<"AIRequestLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIRequestLog findUnique
   */
  export type AIRequestLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * Filter, which AIRequestLog to fetch.
     */
    where: AIRequestLogWhereUniqueInput
  }

  /**
   * AIRequestLog findUniqueOrThrow
   */
  export type AIRequestLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * Filter, which AIRequestLog to fetch.
     */
    where: AIRequestLogWhereUniqueInput
  }

  /**
   * AIRequestLog findFirst
   */
  export type AIRequestLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * Filter, which AIRequestLog to fetch.
     */
    where?: AIRequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIRequestLogs to fetch.
     */
    orderBy?: AIRequestLogOrderByWithRelationInput | AIRequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIRequestLogs.
     */
    cursor?: AIRequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIRequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIRequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIRequestLogs.
     */
    distinct?: AIRequestLogScalarFieldEnum | AIRequestLogScalarFieldEnum[]
  }

  /**
   * AIRequestLog findFirstOrThrow
   */
  export type AIRequestLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * Filter, which AIRequestLog to fetch.
     */
    where?: AIRequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIRequestLogs to fetch.
     */
    orderBy?: AIRequestLogOrderByWithRelationInput | AIRequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIRequestLogs.
     */
    cursor?: AIRequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIRequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIRequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIRequestLogs.
     */
    distinct?: AIRequestLogScalarFieldEnum | AIRequestLogScalarFieldEnum[]
  }

  /**
   * AIRequestLog findMany
   */
  export type AIRequestLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * Filter, which AIRequestLogs to fetch.
     */
    where?: AIRequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIRequestLogs to fetch.
     */
    orderBy?: AIRequestLogOrderByWithRelationInput | AIRequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIRequestLogs.
     */
    cursor?: AIRequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIRequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIRequestLogs.
     */
    skip?: number
    distinct?: AIRequestLogScalarFieldEnum | AIRequestLogScalarFieldEnum[]
  }

  /**
   * AIRequestLog create
   */
  export type AIRequestLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AIRequestLog.
     */
    data: XOR<AIRequestLogCreateInput, AIRequestLogUncheckedCreateInput>
  }

  /**
   * AIRequestLog createMany
   */
  export type AIRequestLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIRequestLogs.
     */
    data: AIRequestLogCreateManyInput | AIRequestLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIRequestLog createManyAndReturn
   */
  export type AIRequestLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * The data used to create many AIRequestLogs.
     */
    data: AIRequestLogCreateManyInput | AIRequestLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIRequestLog update
   */
  export type AIRequestLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AIRequestLog.
     */
    data: XOR<AIRequestLogUpdateInput, AIRequestLogUncheckedUpdateInput>
    /**
     * Choose, which AIRequestLog to update.
     */
    where: AIRequestLogWhereUniqueInput
  }

  /**
   * AIRequestLog updateMany
   */
  export type AIRequestLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIRequestLogs.
     */
    data: XOR<AIRequestLogUpdateManyMutationInput, AIRequestLogUncheckedUpdateManyInput>
    /**
     * Filter which AIRequestLogs to update
     */
    where?: AIRequestLogWhereInput
    /**
     * Limit how many AIRequestLogs to update.
     */
    limit?: number
  }

  /**
   * AIRequestLog updateManyAndReturn
   */
  export type AIRequestLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * The data used to update AIRequestLogs.
     */
    data: XOR<AIRequestLogUpdateManyMutationInput, AIRequestLogUncheckedUpdateManyInput>
    /**
     * Filter which AIRequestLogs to update
     */
    where?: AIRequestLogWhereInput
    /**
     * Limit how many AIRequestLogs to update.
     */
    limit?: number
  }

  /**
   * AIRequestLog upsert
   */
  export type AIRequestLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AIRequestLog to update in case it exists.
     */
    where: AIRequestLogWhereUniqueInput
    /**
     * In case the AIRequestLog found by the `where` argument doesn't exist, create a new AIRequestLog with this data.
     */
    create: XOR<AIRequestLogCreateInput, AIRequestLogUncheckedCreateInput>
    /**
     * In case the AIRequestLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIRequestLogUpdateInput, AIRequestLogUncheckedUpdateInput>
  }

  /**
   * AIRequestLog delete
   */
  export type AIRequestLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
    /**
     * Filter which AIRequestLog to delete.
     */
    where: AIRequestLogWhereUniqueInput
  }

  /**
   * AIRequestLog deleteMany
   */
  export type AIRequestLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIRequestLogs to delete
     */
    where?: AIRequestLogWhereInput
    /**
     * Limit how many AIRequestLogs to delete.
     */
    limit?: number
  }

  /**
   * AIRequestLog without action
   */
  export type AIRequestLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIRequestLog
     */
    select?: AIRequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIRequestLog
     */
    omit?: AIRequestLogOmit<ExtArgs> | null
  }


  /**
   * Model AIMemory
   */

  export type AggregateAIMemory = {
    _count: AIMemoryCountAggregateOutputType | null
    _min: AIMemoryMinAggregateOutputType | null
    _max: AIMemoryMaxAggregateOutputType | null
  }

  export type AIMemoryMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    memoryKey: string | null
    entityType: string | null
    entityId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIMemoryMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    memoryKey: string | null
    entityType: string | null
    entityId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIMemoryCountAggregateOutputType = {
    id: number
    tenantId: number
    memoryKey: number
    value: number
    entityType: number
    entityId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIMemoryMinAggregateInputType = {
    id?: true
    tenantId?: true
    memoryKey?: true
    entityType?: true
    entityId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIMemoryMaxAggregateInputType = {
    id?: true
    tenantId?: true
    memoryKey?: true
    entityType?: true
    entityId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIMemoryCountAggregateInputType = {
    id?: true
    tenantId?: true
    memoryKey?: true
    value?: true
    entityType?: true
    entityId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIMemoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIMemory to aggregate.
     */
    where?: AIMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMemories to fetch.
     */
    orderBy?: AIMemoryOrderByWithRelationInput | AIMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIMemories
    **/
    _count?: true | AIMemoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIMemoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIMemoryMaxAggregateInputType
  }

  export type GetAIMemoryAggregateType<T extends AIMemoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAIMemory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIMemory[P]>
      : GetScalarType<T[P], AggregateAIMemory[P]>
  }




  export type AIMemoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIMemoryWhereInput
    orderBy?: AIMemoryOrderByWithAggregationInput | AIMemoryOrderByWithAggregationInput[]
    by: AIMemoryScalarFieldEnum[] | AIMemoryScalarFieldEnum
    having?: AIMemoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIMemoryCountAggregateInputType | true
    _min?: AIMemoryMinAggregateInputType
    _max?: AIMemoryMaxAggregateInputType
  }

  export type AIMemoryGroupByOutputType = {
    id: string
    tenantId: string
    memoryKey: string
    value: JsonValue
    entityType: string | null
    entityId: string | null
    createdAt: Date
    updatedAt: Date
    _count: AIMemoryCountAggregateOutputType | null
    _min: AIMemoryMinAggregateOutputType | null
    _max: AIMemoryMaxAggregateOutputType | null
  }

  type GetAIMemoryGroupByPayload<T extends AIMemoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIMemoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIMemoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIMemoryGroupByOutputType[P]>
            : GetScalarType<T[P], AIMemoryGroupByOutputType[P]>
        }
      >
    >


  export type AIMemorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    memoryKey?: boolean
    value?: boolean
    entityType?: boolean
    entityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIMemory"]>

  export type AIMemorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    memoryKey?: boolean
    value?: boolean
    entityType?: boolean
    entityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIMemory"]>

  export type AIMemorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    memoryKey?: boolean
    value?: boolean
    entityType?: boolean
    entityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIMemory"]>

  export type AIMemorySelectScalar = {
    id?: boolean
    tenantId?: boolean
    memoryKey?: boolean
    value?: boolean
    entityType?: boolean
    entityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIMemoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "memoryKey" | "value" | "entityType" | "entityId" | "createdAt" | "updatedAt", ExtArgs["result"]["aIMemory"]>

  export type $AIMemoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIMemory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      memoryKey: string
      value: Prisma.JsonValue
      entityType: string | null
      entityId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIMemory"]>
    composites: {}
  }

  type AIMemoryGetPayload<S extends boolean | null | undefined | AIMemoryDefaultArgs> = $Result.GetResult<Prisma.$AIMemoryPayload, S>

  type AIMemoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIMemoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIMemoryCountAggregateInputType | true
    }

  export interface AIMemoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIMemory'], meta: { name: 'AIMemory' } }
    /**
     * Find zero or one AIMemory that matches the filter.
     * @param {AIMemoryFindUniqueArgs} args - Arguments to find a AIMemory
     * @example
     * // Get one AIMemory
     * const aIMemory = await prisma.aIMemory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIMemoryFindUniqueArgs>(args: SelectSubset<T, AIMemoryFindUniqueArgs<ExtArgs>>): Prisma__AIMemoryClient<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIMemory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIMemoryFindUniqueOrThrowArgs} args - Arguments to find a AIMemory
     * @example
     * // Get one AIMemory
     * const aIMemory = await prisma.aIMemory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIMemoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AIMemoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIMemoryClient<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIMemory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMemoryFindFirstArgs} args - Arguments to find a AIMemory
     * @example
     * // Get one AIMemory
     * const aIMemory = await prisma.aIMemory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIMemoryFindFirstArgs>(args?: SelectSubset<T, AIMemoryFindFirstArgs<ExtArgs>>): Prisma__AIMemoryClient<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIMemory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMemoryFindFirstOrThrowArgs} args - Arguments to find a AIMemory
     * @example
     * // Get one AIMemory
     * const aIMemory = await prisma.aIMemory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIMemoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AIMemoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIMemoryClient<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIMemories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMemoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIMemories
     * const aIMemories = await prisma.aIMemory.findMany()
     * 
     * // Get first 10 AIMemories
     * const aIMemories = await prisma.aIMemory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIMemoryWithIdOnly = await prisma.aIMemory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIMemoryFindManyArgs>(args?: SelectSubset<T, AIMemoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIMemory.
     * @param {AIMemoryCreateArgs} args - Arguments to create a AIMemory.
     * @example
     * // Create one AIMemory
     * const AIMemory = await prisma.aIMemory.create({
     *   data: {
     *     // ... data to create a AIMemory
     *   }
     * })
     * 
     */
    create<T extends AIMemoryCreateArgs>(args: SelectSubset<T, AIMemoryCreateArgs<ExtArgs>>): Prisma__AIMemoryClient<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIMemories.
     * @param {AIMemoryCreateManyArgs} args - Arguments to create many AIMemories.
     * @example
     * // Create many AIMemories
     * const aIMemory = await prisma.aIMemory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIMemoryCreateManyArgs>(args?: SelectSubset<T, AIMemoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIMemories and returns the data saved in the database.
     * @param {AIMemoryCreateManyAndReturnArgs} args - Arguments to create many AIMemories.
     * @example
     * // Create many AIMemories
     * const aIMemory = await prisma.aIMemory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIMemories and only return the `id`
     * const aIMemoryWithIdOnly = await prisma.aIMemory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIMemoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AIMemoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIMemory.
     * @param {AIMemoryDeleteArgs} args - Arguments to delete one AIMemory.
     * @example
     * // Delete one AIMemory
     * const AIMemory = await prisma.aIMemory.delete({
     *   where: {
     *     // ... filter to delete one AIMemory
     *   }
     * })
     * 
     */
    delete<T extends AIMemoryDeleteArgs>(args: SelectSubset<T, AIMemoryDeleteArgs<ExtArgs>>): Prisma__AIMemoryClient<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIMemory.
     * @param {AIMemoryUpdateArgs} args - Arguments to update one AIMemory.
     * @example
     * // Update one AIMemory
     * const aIMemory = await prisma.aIMemory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIMemoryUpdateArgs>(args: SelectSubset<T, AIMemoryUpdateArgs<ExtArgs>>): Prisma__AIMemoryClient<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIMemories.
     * @param {AIMemoryDeleteManyArgs} args - Arguments to filter AIMemories to delete.
     * @example
     * // Delete a few AIMemories
     * const { count } = await prisma.aIMemory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIMemoryDeleteManyArgs>(args?: SelectSubset<T, AIMemoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIMemories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMemoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIMemories
     * const aIMemory = await prisma.aIMemory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIMemoryUpdateManyArgs>(args: SelectSubset<T, AIMemoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIMemories and returns the data updated in the database.
     * @param {AIMemoryUpdateManyAndReturnArgs} args - Arguments to update many AIMemories.
     * @example
     * // Update many AIMemories
     * const aIMemory = await prisma.aIMemory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIMemories and only return the `id`
     * const aIMemoryWithIdOnly = await prisma.aIMemory.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIMemoryUpdateManyAndReturnArgs>(args: SelectSubset<T, AIMemoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIMemory.
     * @param {AIMemoryUpsertArgs} args - Arguments to update or create a AIMemory.
     * @example
     * // Update or create a AIMemory
     * const aIMemory = await prisma.aIMemory.upsert({
     *   create: {
     *     // ... data to create a AIMemory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIMemory we want to update
     *   }
     * })
     */
    upsert<T extends AIMemoryUpsertArgs>(args: SelectSubset<T, AIMemoryUpsertArgs<ExtArgs>>): Prisma__AIMemoryClient<$Result.GetResult<Prisma.$AIMemoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIMemories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMemoryCountArgs} args - Arguments to filter AIMemories to count.
     * @example
     * // Count the number of AIMemories
     * const count = await prisma.aIMemory.count({
     *   where: {
     *     // ... the filter for the AIMemories we want to count
     *   }
     * })
    **/
    count<T extends AIMemoryCountArgs>(
      args?: Subset<T, AIMemoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIMemoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIMemory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMemoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIMemoryAggregateArgs>(args: Subset<T, AIMemoryAggregateArgs>): Prisma.PrismaPromise<GetAIMemoryAggregateType<T>>

    /**
     * Group by AIMemory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMemoryGroupByArgs} args - Group by arguments.
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
      T extends AIMemoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIMemoryGroupByArgs['orderBy'] }
        : { orderBy?: AIMemoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIMemoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIMemoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIMemory model
   */
  readonly fields: AIMemoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIMemory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIMemoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIMemory model
   */
  interface AIMemoryFieldRefs {
    readonly id: FieldRef<"AIMemory", 'String'>
    readonly tenantId: FieldRef<"AIMemory", 'String'>
    readonly memoryKey: FieldRef<"AIMemory", 'String'>
    readonly value: FieldRef<"AIMemory", 'Json'>
    readonly entityType: FieldRef<"AIMemory", 'String'>
    readonly entityId: FieldRef<"AIMemory", 'String'>
    readonly createdAt: FieldRef<"AIMemory", 'DateTime'>
    readonly updatedAt: FieldRef<"AIMemory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIMemory findUnique
   */
  export type AIMemoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * Filter, which AIMemory to fetch.
     */
    where: AIMemoryWhereUniqueInput
  }

  /**
   * AIMemory findUniqueOrThrow
   */
  export type AIMemoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * Filter, which AIMemory to fetch.
     */
    where: AIMemoryWhereUniqueInput
  }

  /**
   * AIMemory findFirst
   */
  export type AIMemoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * Filter, which AIMemory to fetch.
     */
    where?: AIMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMemories to fetch.
     */
    orderBy?: AIMemoryOrderByWithRelationInput | AIMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIMemories.
     */
    cursor?: AIMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMemories.
     */
    distinct?: AIMemoryScalarFieldEnum | AIMemoryScalarFieldEnum[]
  }

  /**
   * AIMemory findFirstOrThrow
   */
  export type AIMemoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * Filter, which AIMemory to fetch.
     */
    where?: AIMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMemories to fetch.
     */
    orderBy?: AIMemoryOrderByWithRelationInput | AIMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIMemories.
     */
    cursor?: AIMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMemories.
     */
    distinct?: AIMemoryScalarFieldEnum | AIMemoryScalarFieldEnum[]
  }

  /**
   * AIMemory findMany
   */
  export type AIMemoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * Filter, which AIMemories to fetch.
     */
    where?: AIMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMemories to fetch.
     */
    orderBy?: AIMemoryOrderByWithRelationInput | AIMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIMemories.
     */
    cursor?: AIMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMemories.
     */
    skip?: number
    distinct?: AIMemoryScalarFieldEnum | AIMemoryScalarFieldEnum[]
  }

  /**
   * AIMemory create
   */
  export type AIMemoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * The data needed to create a AIMemory.
     */
    data: XOR<AIMemoryCreateInput, AIMemoryUncheckedCreateInput>
  }

  /**
   * AIMemory createMany
   */
  export type AIMemoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIMemories.
     */
    data: AIMemoryCreateManyInput | AIMemoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIMemory createManyAndReturn
   */
  export type AIMemoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * The data used to create many AIMemories.
     */
    data: AIMemoryCreateManyInput | AIMemoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIMemory update
   */
  export type AIMemoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * The data needed to update a AIMemory.
     */
    data: XOR<AIMemoryUpdateInput, AIMemoryUncheckedUpdateInput>
    /**
     * Choose, which AIMemory to update.
     */
    where: AIMemoryWhereUniqueInput
  }

  /**
   * AIMemory updateMany
   */
  export type AIMemoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIMemories.
     */
    data: XOR<AIMemoryUpdateManyMutationInput, AIMemoryUncheckedUpdateManyInput>
    /**
     * Filter which AIMemories to update
     */
    where?: AIMemoryWhereInput
    /**
     * Limit how many AIMemories to update.
     */
    limit?: number
  }

  /**
   * AIMemory updateManyAndReturn
   */
  export type AIMemoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * The data used to update AIMemories.
     */
    data: XOR<AIMemoryUpdateManyMutationInput, AIMemoryUncheckedUpdateManyInput>
    /**
     * Filter which AIMemories to update
     */
    where?: AIMemoryWhereInput
    /**
     * Limit how many AIMemories to update.
     */
    limit?: number
  }

  /**
   * AIMemory upsert
   */
  export type AIMemoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * The filter to search for the AIMemory to update in case it exists.
     */
    where: AIMemoryWhereUniqueInput
    /**
     * In case the AIMemory found by the `where` argument doesn't exist, create a new AIMemory with this data.
     */
    create: XOR<AIMemoryCreateInput, AIMemoryUncheckedCreateInput>
    /**
     * In case the AIMemory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIMemoryUpdateInput, AIMemoryUncheckedUpdateInput>
  }

  /**
   * AIMemory delete
   */
  export type AIMemoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
    /**
     * Filter which AIMemory to delete.
     */
    where: AIMemoryWhereUniqueInput
  }

  /**
   * AIMemory deleteMany
   */
  export type AIMemoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIMemories to delete
     */
    where?: AIMemoryWhereInput
    /**
     * Limit how many AIMemories to delete.
     */
    limit?: number
  }

  /**
   * AIMemory without action
   */
  export type AIMemoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMemory
     */
    select?: AIMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMemory
     */
    omit?: AIMemoryOmit<ExtArgs> | null
  }


  /**
   * Model AIWorkflow
   */

  export type AggregateAIWorkflow = {
    _count: AIWorkflowCountAggregateOutputType | null
    _min: AIWorkflowMinAggregateOutputType | null
    _max: AIWorkflowMaxAggregateOutputType | null
  }

  export type AIWorkflowMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    dryRun: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIWorkflowMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    dryRun: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIWorkflowCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    isActive: number
    dryRun: number
    trigger: number
    conditions: number
    actions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIWorkflowMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    isActive?: true
    dryRun?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIWorkflowMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    isActive?: true
    dryRun?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIWorkflowCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    isActive?: true
    dryRun?: true
    trigger?: true
    conditions?: true
    actions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIWorkflowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIWorkflow to aggregate.
     */
    where?: AIWorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflows to fetch.
     */
    orderBy?: AIWorkflowOrderByWithRelationInput | AIWorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIWorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIWorkflows
    **/
    _count?: true | AIWorkflowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIWorkflowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIWorkflowMaxAggregateInputType
  }

  export type GetAIWorkflowAggregateType<T extends AIWorkflowAggregateArgs> = {
        [P in keyof T & keyof AggregateAIWorkflow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIWorkflow[P]>
      : GetScalarType<T[P], AggregateAIWorkflow[P]>
  }




  export type AIWorkflowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIWorkflowWhereInput
    orderBy?: AIWorkflowOrderByWithAggregationInput | AIWorkflowOrderByWithAggregationInput[]
    by: AIWorkflowScalarFieldEnum[] | AIWorkflowScalarFieldEnum
    having?: AIWorkflowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIWorkflowCountAggregateInputType | true
    _min?: AIWorkflowMinAggregateInputType
    _max?: AIWorkflowMaxAggregateInputType
  }

  export type AIWorkflowGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string
    isActive: boolean
    dryRun: boolean
    trigger: JsonValue
    conditions: JsonValue
    actions: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: AIWorkflowCountAggregateOutputType | null
    _min: AIWorkflowMinAggregateOutputType | null
    _max: AIWorkflowMaxAggregateOutputType | null
  }

  type GetAIWorkflowGroupByPayload<T extends AIWorkflowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIWorkflowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIWorkflowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIWorkflowGroupByOutputType[P]>
            : GetScalarType<T[P], AIWorkflowGroupByOutputType[P]>
        }
      >
    >


  export type AIWorkflowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    dryRun?: boolean
    trigger?: boolean
    conditions?: boolean
    actions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIWorkflow"]>

  export type AIWorkflowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    dryRun?: boolean
    trigger?: boolean
    conditions?: boolean
    actions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIWorkflow"]>

  export type AIWorkflowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    dryRun?: boolean
    trigger?: boolean
    conditions?: boolean
    actions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIWorkflow"]>

  export type AIWorkflowSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    dryRun?: boolean
    trigger?: boolean
    conditions?: boolean
    actions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIWorkflowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "isActive" | "dryRun" | "trigger" | "conditions" | "actions" | "createdAt" | "updatedAt", ExtArgs["result"]["aIWorkflow"]>

  export type $AIWorkflowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIWorkflow"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string
      isActive: boolean
      dryRun: boolean
      trigger: Prisma.JsonValue
      conditions: Prisma.JsonValue
      actions: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIWorkflow"]>
    composites: {}
  }

  type AIWorkflowGetPayload<S extends boolean | null | undefined | AIWorkflowDefaultArgs> = $Result.GetResult<Prisma.$AIWorkflowPayload, S>

  type AIWorkflowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIWorkflowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIWorkflowCountAggregateInputType | true
    }

  export interface AIWorkflowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIWorkflow'], meta: { name: 'AIWorkflow' } }
    /**
     * Find zero or one AIWorkflow that matches the filter.
     * @param {AIWorkflowFindUniqueArgs} args - Arguments to find a AIWorkflow
     * @example
     * // Get one AIWorkflow
     * const aIWorkflow = await prisma.aIWorkflow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIWorkflowFindUniqueArgs>(args: SelectSubset<T, AIWorkflowFindUniqueArgs<ExtArgs>>): Prisma__AIWorkflowClient<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIWorkflow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIWorkflowFindUniqueOrThrowArgs} args - Arguments to find a AIWorkflow
     * @example
     * // Get one AIWorkflow
     * const aIWorkflow = await prisma.aIWorkflow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIWorkflowFindUniqueOrThrowArgs>(args: SelectSubset<T, AIWorkflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIWorkflowClient<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIWorkflow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowFindFirstArgs} args - Arguments to find a AIWorkflow
     * @example
     * // Get one AIWorkflow
     * const aIWorkflow = await prisma.aIWorkflow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIWorkflowFindFirstArgs>(args?: SelectSubset<T, AIWorkflowFindFirstArgs<ExtArgs>>): Prisma__AIWorkflowClient<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIWorkflow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowFindFirstOrThrowArgs} args - Arguments to find a AIWorkflow
     * @example
     * // Get one AIWorkflow
     * const aIWorkflow = await prisma.aIWorkflow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIWorkflowFindFirstOrThrowArgs>(args?: SelectSubset<T, AIWorkflowFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIWorkflowClient<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIWorkflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIWorkflows
     * const aIWorkflows = await prisma.aIWorkflow.findMany()
     * 
     * // Get first 10 AIWorkflows
     * const aIWorkflows = await prisma.aIWorkflow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIWorkflowWithIdOnly = await prisma.aIWorkflow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIWorkflowFindManyArgs>(args?: SelectSubset<T, AIWorkflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIWorkflow.
     * @param {AIWorkflowCreateArgs} args - Arguments to create a AIWorkflow.
     * @example
     * // Create one AIWorkflow
     * const AIWorkflow = await prisma.aIWorkflow.create({
     *   data: {
     *     // ... data to create a AIWorkflow
     *   }
     * })
     * 
     */
    create<T extends AIWorkflowCreateArgs>(args: SelectSubset<T, AIWorkflowCreateArgs<ExtArgs>>): Prisma__AIWorkflowClient<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIWorkflows.
     * @param {AIWorkflowCreateManyArgs} args - Arguments to create many AIWorkflows.
     * @example
     * // Create many AIWorkflows
     * const aIWorkflow = await prisma.aIWorkflow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIWorkflowCreateManyArgs>(args?: SelectSubset<T, AIWorkflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIWorkflows and returns the data saved in the database.
     * @param {AIWorkflowCreateManyAndReturnArgs} args - Arguments to create many AIWorkflows.
     * @example
     * // Create many AIWorkflows
     * const aIWorkflow = await prisma.aIWorkflow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIWorkflows and only return the `id`
     * const aIWorkflowWithIdOnly = await prisma.aIWorkflow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIWorkflowCreateManyAndReturnArgs>(args?: SelectSubset<T, AIWorkflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIWorkflow.
     * @param {AIWorkflowDeleteArgs} args - Arguments to delete one AIWorkflow.
     * @example
     * // Delete one AIWorkflow
     * const AIWorkflow = await prisma.aIWorkflow.delete({
     *   where: {
     *     // ... filter to delete one AIWorkflow
     *   }
     * })
     * 
     */
    delete<T extends AIWorkflowDeleteArgs>(args: SelectSubset<T, AIWorkflowDeleteArgs<ExtArgs>>): Prisma__AIWorkflowClient<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIWorkflow.
     * @param {AIWorkflowUpdateArgs} args - Arguments to update one AIWorkflow.
     * @example
     * // Update one AIWorkflow
     * const aIWorkflow = await prisma.aIWorkflow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIWorkflowUpdateArgs>(args: SelectSubset<T, AIWorkflowUpdateArgs<ExtArgs>>): Prisma__AIWorkflowClient<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIWorkflows.
     * @param {AIWorkflowDeleteManyArgs} args - Arguments to filter AIWorkflows to delete.
     * @example
     * // Delete a few AIWorkflows
     * const { count } = await prisma.aIWorkflow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIWorkflowDeleteManyArgs>(args?: SelectSubset<T, AIWorkflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIWorkflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIWorkflows
     * const aIWorkflow = await prisma.aIWorkflow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIWorkflowUpdateManyArgs>(args: SelectSubset<T, AIWorkflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIWorkflows and returns the data updated in the database.
     * @param {AIWorkflowUpdateManyAndReturnArgs} args - Arguments to update many AIWorkflows.
     * @example
     * // Update many AIWorkflows
     * const aIWorkflow = await prisma.aIWorkflow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIWorkflows and only return the `id`
     * const aIWorkflowWithIdOnly = await prisma.aIWorkflow.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIWorkflowUpdateManyAndReturnArgs>(args: SelectSubset<T, AIWorkflowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIWorkflow.
     * @param {AIWorkflowUpsertArgs} args - Arguments to update or create a AIWorkflow.
     * @example
     * // Update or create a AIWorkflow
     * const aIWorkflow = await prisma.aIWorkflow.upsert({
     *   create: {
     *     // ... data to create a AIWorkflow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIWorkflow we want to update
     *   }
     * })
     */
    upsert<T extends AIWorkflowUpsertArgs>(args: SelectSubset<T, AIWorkflowUpsertArgs<ExtArgs>>): Prisma__AIWorkflowClient<$Result.GetResult<Prisma.$AIWorkflowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIWorkflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowCountArgs} args - Arguments to filter AIWorkflows to count.
     * @example
     * // Count the number of AIWorkflows
     * const count = await prisma.aIWorkflow.count({
     *   where: {
     *     // ... the filter for the AIWorkflows we want to count
     *   }
     * })
    **/
    count<T extends AIWorkflowCountArgs>(
      args?: Subset<T, AIWorkflowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIWorkflowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIWorkflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIWorkflowAggregateArgs>(args: Subset<T, AIWorkflowAggregateArgs>): Prisma.PrismaPromise<GetAIWorkflowAggregateType<T>>

    /**
     * Group by AIWorkflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowGroupByArgs} args - Group by arguments.
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
      T extends AIWorkflowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIWorkflowGroupByArgs['orderBy'] }
        : { orderBy?: AIWorkflowGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIWorkflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIWorkflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIWorkflow model
   */
  readonly fields: AIWorkflowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIWorkflow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIWorkflowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIWorkflow model
   */
  interface AIWorkflowFieldRefs {
    readonly id: FieldRef<"AIWorkflow", 'String'>
    readonly tenantId: FieldRef<"AIWorkflow", 'String'>
    readonly name: FieldRef<"AIWorkflow", 'String'>
    readonly description: FieldRef<"AIWorkflow", 'String'>
    readonly isActive: FieldRef<"AIWorkflow", 'Boolean'>
    readonly dryRun: FieldRef<"AIWorkflow", 'Boolean'>
    readonly trigger: FieldRef<"AIWorkflow", 'Json'>
    readonly conditions: FieldRef<"AIWorkflow", 'Json'>
    readonly actions: FieldRef<"AIWorkflow", 'Json'>
    readonly createdAt: FieldRef<"AIWorkflow", 'DateTime'>
    readonly updatedAt: FieldRef<"AIWorkflow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIWorkflow findUnique
   */
  export type AIWorkflowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflow to fetch.
     */
    where: AIWorkflowWhereUniqueInput
  }

  /**
   * AIWorkflow findUniqueOrThrow
   */
  export type AIWorkflowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflow to fetch.
     */
    where: AIWorkflowWhereUniqueInput
  }

  /**
   * AIWorkflow findFirst
   */
  export type AIWorkflowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflow to fetch.
     */
    where?: AIWorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflows to fetch.
     */
    orderBy?: AIWorkflowOrderByWithRelationInput | AIWorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIWorkflows.
     */
    cursor?: AIWorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIWorkflows.
     */
    distinct?: AIWorkflowScalarFieldEnum | AIWorkflowScalarFieldEnum[]
  }

  /**
   * AIWorkflow findFirstOrThrow
   */
  export type AIWorkflowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflow to fetch.
     */
    where?: AIWorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflows to fetch.
     */
    orderBy?: AIWorkflowOrderByWithRelationInput | AIWorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIWorkflows.
     */
    cursor?: AIWorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIWorkflows.
     */
    distinct?: AIWorkflowScalarFieldEnum | AIWorkflowScalarFieldEnum[]
  }

  /**
   * AIWorkflow findMany
   */
  export type AIWorkflowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflows to fetch.
     */
    where?: AIWorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflows to fetch.
     */
    orderBy?: AIWorkflowOrderByWithRelationInput | AIWorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIWorkflows.
     */
    cursor?: AIWorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflows.
     */
    skip?: number
    distinct?: AIWorkflowScalarFieldEnum | AIWorkflowScalarFieldEnum[]
  }

  /**
   * AIWorkflow create
   */
  export type AIWorkflowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * The data needed to create a AIWorkflow.
     */
    data: XOR<AIWorkflowCreateInput, AIWorkflowUncheckedCreateInput>
  }

  /**
   * AIWorkflow createMany
   */
  export type AIWorkflowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIWorkflows.
     */
    data: AIWorkflowCreateManyInput | AIWorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIWorkflow createManyAndReturn
   */
  export type AIWorkflowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * The data used to create many AIWorkflows.
     */
    data: AIWorkflowCreateManyInput | AIWorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIWorkflow update
   */
  export type AIWorkflowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * The data needed to update a AIWorkflow.
     */
    data: XOR<AIWorkflowUpdateInput, AIWorkflowUncheckedUpdateInput>
    /**
     * Choose, which AIWorkflow to update.
     */
    where: AIWorkflowWhereUniqueInput
  }

  /**
   * AIWorkflow updateMany
   */
  export type AIWorkflowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIWorkflows.
     */
    data: XOR<AIWorkflowUpdateManyMutationInput, AIWorkflowUncheckedUpdateManyInput>
    /**
     * Filter which AIWorkflows to update
     */
    where?: AIWorkflowWhereInput
    /**
     * Limit how many AIWorkflows to update.
     */
    limit?: number
  }

  /**
   * AIWorkflow updateManyAndReturn
   */
  export type AIWorkflowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * The data used to update AIWorkflows.
     */
    data: XOR<AIWorkflowUpdateManyMutationInput, AIWorkflowUncheckedUpdateManyInput>
    /**
     * Filter which AIWorkflows to update
     */
    where?: AIWorkflowWhereInput
    /**
     * Limit how many AIWorkflows to update.
     */
    limit?: number
  }

  /**
   * AIWorkflow upsert
   */
  export type AIWorkflowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * The filter to search for the AIWorkflow to update in case it exists.
     */
    where: AIWorkflowWhereUniqueInput
    /**
     * In case the AIWorkflow found by the `where` argument doesn't exist, create a new AIWorkflow with this data.
     */
    create: XOR<AIWorkflowCreateInput, AIWorkflowUncheckedCreateInput>
    /**
     * In case the AIWorkflow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIWorkflowUpdateInput, AIWorkflowUncheckedUpdateInput>
  }

  /**
   * AIWorkflow delete
   */
  export type AIWorkflowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
    /**
     * Filter which AIWorkflow to delete.
     */
    where: AIWorkflowWhereUniqueInput
  }

  /**
   * AIWorkflow deleteMany
   */
  export type AIWorkflowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIWorkflows to delete
     */
    where?: AIWorkflowWhereInput
    /**
     * Limit how many AIWorkflows to delete.
     */
    limit?: number
  }

  /**
   * AIWorkflow without action
   */
  export type AIWorkflowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflow
     */
    select?: AIWorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflow
     */
    omit?: AIWorkflowOmit<ExtArgs> | null
  }


  /**
   * Model AIWorkflowRun
   */

  export type AggregateAIWorkflowRun = {
    _count: AIWorkflowRunCountAggregateOutputType | null
    _min: AIWorkflowRunMinAggregateOutputType | null
    _max: AIWorkflowRunMaxAggregateOutputType | null
  }

  export type AIWorkflowRunMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    workflowId: string | null
    trigger: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIWorkflowRunMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    workflowId: string | null
    trigger: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIWorkflowRunCountAggregateOutputType = {
    id: number
    tenantId: number
    workflowId: number
    trigger: number
    status: number
    steps: number
    result: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIWorkflowRunMinAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    trigger?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIWorkflowRunMaxAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    trigger?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIWorkflowRunCountAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    trigger?: true
    status?: true
    steps?: true
    result?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIWorkflowRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIWorkflowRun to aggregate.
     */
    where?: AIWorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowRuns to fetch.
     */
    orderBy?: AIWorkflowRunOrderByWithRelationInput | AIWorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIWorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIWorkflowRuns
    **/
    _count?: true | AIWorkflowRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIWorkflowRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIWorkflowRunMaxAggregateInputType
  }

  export type GetAIWorkflowRunAggregateType<T extends AIWorkflowRunAggregateArgs> = {
        [P in keyof T & keyof AggregateAIWorkflowRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIWorkflowRun[P]>
      : GetScalarType<T[P], AggregateAIWorkflowRun[P]>
  }




  export type AIWorkflowRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIWorkflowRunWhereInput
    orderBy?: AIWorkflowRunOrderByWithAggregationInput | AIWorkflowRunOrderByWithAggregationInput[]
    by: AIWorkflowRunScalarFieldEnum[] | AIWorkflowRunScalarFieldEnum
    having?: AIWorkflowRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIWorkflowRunCountAggregateInputType | true
    _min?: AIWorkflowRunMinAggregateInputType
    _max?: AIWorkflowRunMaxAggregateInputType
  }

  export type AIWorkflowRunGroupByOutputType = {
    id: string
    tenantId: string
    workflowId: string | null
    trigger: string
    status: string
    steps: JsonValue
    result: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AIWorkflowRunCountAggregateOutputType | null
    _min: AIWorkflowRunMinAggregateOutputType | null
    _max: AIWorkflowRunMaxAggregateOutputType | null
  }

  type GetAIWorkflowRunGroupByPayload<T extends AIWorkflowRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIWorkflowRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIWorkflowRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIWorkflowRunGroupByOutputType[P]>
            : GetScalarType<T[P], AIWorkflowRunGroupByOutputType[P]>
        }
      >
    >


  export type AIWorkflowRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    trigger?: boolean
    status?: boolean
    steps?: boolean
    result?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIWorkflowRun"]>

  export type AIWorkflowRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    trigger?: boolean
    status?: boolean
    steps?: boolean
    result?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIWorkflowRun"]>

  export type AIWorkflowRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    trigger?: boolean
    status?: boolean
    steps?: boolean
    result?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIWorkflowRun"]>

  export type AIWorkflowRunSelectScalar = {
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    trigger?: boolean
    status?: boolean
    steps?: boolean
    result?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIWorkflowRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "workflowId" | "trigger" | "status" | "steps" | "result" | "createdAt" | "updatedAt", ExtArgs["result"]["aIWorkflowRun"]>

  export type $AIWorkflowRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIWorkflowRun"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      workflowId: string | null
      trigger: string
      status: string
      steps: Prisma.JsonValue
      result: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIWorkflowRun"]>
    composites: {}
  }

  type AIWorkflowRunGetPayload<S extends boolean | null | undefined | AIWorkflowRunDefaultArgs> = $Result.GetResult<Prisma.$AIWorkflowRunPayload, S>

  type AIWorkflowRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIWorkflowRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIWorkflowRunCountAggregateInputType | true
    }

  export interface AIWorkflowRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIWorkflowRun'], meta: { name: 'AIWorkflowRun' } }
    /**
     * Find zero or one AIWorkflowRun that matches the filter.
     * @param {AIWorkflowRunFindUniqueArgs} args - Arguments to find a AIWorkflowRun
     * @example
     * // Get one AIWorkflowRun
     * const aIWorkflowRun = await prisma.aIWorkflowRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIWorkflowRunFindUniqueArgs>(args: SelectSubset<T, AIWorkflowRunFindUniqueArgs<ExtArgs>>): Prisma__AIWorkflowRunClient<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIWorkflowRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIWorkflowRunFindUniqueOrThrowArgs} args - Arguments to find a AIWorkflowRun
     * @example
     * // Get one AIWorkflowRun
     * const aIWorkflowRun = await prisma.aIWorkflowRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIWorkflowRunFindUniqueOrThrowArgs>(args: SelectSubset<T, AIWorkflowRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIWorkflowRunClient<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIWorkflowRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowRunFindFirstArgs} args - Arguments to find a AIWorkflowRun
     * @example
     * // Get one AIWorkflowRun
     * const aIWorkflowRun = await prisma.aIWorkflowRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIWorkflowRunFindFirstArgs>(args?: SelectSubset<T, AIWorkflowRunFindFirstArgs<ExtArgs>>): Prisma__AIWorkflowRunClient<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIWorkflowRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowRunFindFirstOrThrowArgs} args - Arguments to find a AIWorkflowRun
     * @example
     * // Get one AIWorkflowRun
     * const aIWorkflowRun = await prisma.aIWorkflowRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIWorkflowRunFindFirstOrThrowArgs>(args?: SelectSubset<T, AIWorkflowRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIWorkflowRunClient<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIWorkflowRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIWorkflowRuns
     * const aIWorkflowRuns = await prisma.aIWorkflowRun.findMany()
     * 
     * // Get first 10 AIWorkflowRuns
     * const aIWorkflowRuns = await prisma.aIWorkflowRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIWorkflowRunWithIdOnly = await prisma.aIWorkflowRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIWorkflowRunFindManyArgs>(args?: SelectSubset<T, AIWorkflowRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIWorkflowRun.
     * @param {AIWorkflowRunCreateArgs} args - Arguments to create a AIWorkflowRun.
     * @example
     * // Create one AIWorkflowRun
     * const AIWorkflowRun = await prisma.aIWorkflowRun.create({
     *   data: {
     *     // ... data to create a AIWorkflowRun
     *   }
     * })
     * 
     */
    create<T extends AIWorkflowRunCreateArgs>(args: SelectSubset<T, AIWorkflowRunCreateArgs<ExtArgs>>): Prisma__AIWorkflowRunClient<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIWorkflowRuns.
     * @param {AIWorkflowRunCreateManyArgs} args - Arguments to create many AIWorkflowRuns.
     * @example
     * // Create many AIWorkflowRuns
     * const aIWorkflowRun = await prisma.aIWorkflowRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIWorkflowRunCreateManyArgs>(args?: SelectSubset<T, AIWorkflowRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIWorkflowRuns and returns the data saved in the database.
     * @param {AIWorkflowRunCreateManyAndReturnArgs} args - Arguments to create many AIWorkflowRuns.
     * @example
     * // Create many AIWorkflowRuns
     * const aIWorkflowRun = await prisma.aIWorkflowRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIWorkflowRuns and only return the `id`
     * const aIWorkflowRunWithIdOnly = await prisma.aIWorkflowRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIWorkflowRunCreateManyAndReturnArgs>(args?: SelectSubset<T, AIWorkflowRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIWorkflowRun.
     * @param {AIWorkflowRunDeleteArgs} args - Arguments to delete one AIWorkflowRun.
     * @example
     * // Delete one AIWorkflowRun
     * const AIWorkflowRun = await prisma.aIWorkflowRun.delete({
     *   where: {
     *     // ... filter to delete one AIWorkflowRun
     *   }
     * })
     * 
     */
    delete<T extends AIWorkflowRunDeleteArgs>(args: SelectSubset<T, AIWorkflowRunDeleteArgs<ExtArgs>>): Prisma__AIWorkflowRunClient<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIWorkflowRun.
     * @param {AIWorkflowRunUpdateArgs} args - Arguments to update one AIWorkflowRun.
     * @example
     * // Update one AIWorkflowRun
     * const aIWorkflowRun = await prisma.aIWorkflowRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIWorkflowRunUpdateArgs>(args: SelectSubset<T, AIWorkflowRunUpdateArgs<ExtArgs>>): Prisma__AIWorkflowRunClient<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIWorkflowRuns.
     * @param {AIWorkflowRunDeleteManyArgs} args - Arguments to filter AIWorkflowRuns to delete.
     * @example
     * // Delete a few AIWorkflowRuns
     * const { count } = await prisma.aIWorkflowRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIWorkflowRunDeleteManyArgs>(args?: SelectSubset<T, AIWorkflowRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIWorkflowRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIWorkflowRuns
     * const aIWorkflowRun = await prisma.aIWorkflowRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIWorkflowRunUpdateManyArgs>(args: SelectSubset<T, AIWorkflowRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIWorkflowRuns and returns the data updated in the database.
     * @param {AIWorkflowRunUpdateManyAndReturnArgs} args - Arguments to update many AIWorkflowRuns.
     * @example
     * // Update many AIWorkflowRuns
     * const aIWorkflowRun = await prisma.aIWorkflowRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIWorkflowRuns and only return the `id`
     * const aIWorkflowRunWithIdOnly = await prisma.aIWorkflowRun.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIWorkflowRunUpdateManyAndReturnArgs>(args: SelectSubset<T, AIWorkflowRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIWorkflowRun.
     * @param {AIWorkflowRunUpsertArgs} args - Arguments to update or create a AIWorkflowRun.
     * @example
     * // Update or create a AIWorkflowRun
     * const aIWorkflowRun = await prisma.aIWorkflowRun.upsert({
     *   create: {
     *     // ... data to create a AIWorkflowRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIWorkflowRun we want to update
     *   }
     * })
     */
    upsert<T extends AIWorkflowRunUpsertArgs>(args: SelectSubset<T, AIWorkflowRunUpsertArgs<ExtArgs>>): Prisma__AIWorkflowRunClient<$Result.GetResult<Prisma.$AIWorkflowRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIWorkflowRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowRunCountArgs} args - Arguments to filter AIWorkflowRuns to count.
     * @example
     * // Count the number of AIWorkflowRuns
     * const count = await prisma.aIWorkflowRun.count({
     *   where: {
     *     // ... the filter for the AIWorkflowRuns we want to count
     *   }
     * })
    **/
    count<T extends AIWorkflowRunCountArgs>(
      args?: Subset<T, AIWorkflowRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIWorkflowRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIWorkflowRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIWorkflowRunAggregateArgs>(args: Subset<T, AIWorkflowRunAggregateArgs>): Prisma.PrismaPromise<GetAIWorkflowRunAggregateType<T>>

    /**
     * Group by AIWorkflowRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowRunGroupByArgs} args - Group by arguments.
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
      T extends AIWorkflowRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIWorkflowRunGroupByArgs['orderBy'] }
        : { orderBy?: AIWorkflowRunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIWorkflowRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIWorkflowRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIWorkflowRun model
   */
  readonly fields: AIWorkflowRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIWorkflowRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIWorkflowRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIWorkflowRun model
   */
  interface AIWorkflowRunFieldRefs {
    readonly id: FieldRef<"AIWorkflowRun", 'String'>
    readonly tenantId: FieldRef<"AIWorkflowRun", 'String'>
    readonly workflowId: FieldRef<"AIWorkflowRun", 'String'>
    readonly trigger: FieldRef<"AIWorkflowRun", 'String'>
    readonly status: FieldRef<"AIWorkflowRun", 'String'>
    readonly steps: FieldRef<"AIWorkflowRun", 'Json'>
    readonly result: FieldRef<"AIWorkflowRun", 'Json'>
    readonly createdAt: FieldRef<"AIWorkflowRun", 'DateTime'>
    readonly updatedAt: FieldRef<"AIWorkflowRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIWorkflowRun findUnique
   */
  export type AIWorkflowRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowRun to fetch.
     */
    where: AIWorkflowRunWhereUniqueInput
  }

  /**
   * AIWorkflowRun findUniqueOrThrow
   */
  export type AIWorkflowRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowRun to fetch.
     */
    where: AIWorkflowRunWhereUniqueInput
  }

  /**
   * AIWorkflowRun findFirst
   */
  export type AIWorkflowRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowRun to fetch.
     */
    where?: AIWorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowRuns to fetch.
     */
    orderBy?: AIWorkflowRunOrderByWithRelationInput | AIWorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIWorkflowRuns.
     */
    cursor?: AIWorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIWorkflowRuns.
     */
    distinct?: AIWorkflowRunScalarFieldEnum | AIWorkflowRunScalarFieldEnum[]
  }

  /**
   * AIWorkflowRun findFirstOrThrow
   */
  export type AIWorkflowRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowRun to fetch.
     */
    where?: AIWorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowRuns to fetch.
     */
    orderBy?: AIWorkflowRunOrderByWithRelationInput | AIWorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIWorkflowRuns.
     */
    cursor?: AIWorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIWorkflowRuns.
     */
    distinct?: AIWorkflowRunScalarFieldEnum | AIWorkflowRunScalarFieldEnum[]
  }

  /**
   * AIWorkflowRun findMany
   */
  export type AIWorkflowRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowRuns to fetch.
     */
    where?: AIWorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowRuns to fetch.
     */
    orderBy?: AIWorkflowRunOrderByWithRelationInput | AIWorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIWorkflowRuns.
     */
    cursor?: AIWorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowRuns.
     */
    skip?: number
    distinct?: AIWorkflowRunScalarFieldEnum | AIWorkflowRunScalarFieldEnum[]
  }

  /**
   * AIWorkflowRun create
   */
  export type AIWorkflowRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * The data needed to create a AIWorkflowRun.
     */
    data: XOR<AIWorkflowRunCreateInput, AIWorkflowRunUncheckedCreateInput>
  }

  /**
   * AIWorkflowRun createMany
   */
  export type AIWorkflowRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIWorkflowRuns.
     */
    data: AIWorkflowRunCreateManyInput | AIWorkflowRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIWorkflowRun createManyAndReturn
   */
  export type AIWorkflowRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * The data used to create many AIWorkflowRuns.
     */
    data: AIWorkflowRunCreateManyInput | AIWorkflowRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIWorkflowRun update
   */
  export type AIWorkflowRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * The data needed to update a AIWorkflowRun.
     */
    data: XOR<AIWorkflowRunUpdateInput, AIWorkflowRunUncheckedUpdateInput>
    /**
     * Choose, which AIWorkflowRun to update.
     */
    where: AIWorkflowRunWhereUniqueInput
  }

  /**
   * AIWorkflowRun updateMany
   */
  export type AIWorkflowRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIWorkflowRuns.
     */
    data: XOR<AIWorkflowRunUpdateManyMutationInput, AIWorkflowRunUncheckedUpdateManyInput>
    /**
     * Filter which AIWorkflowRuns to update
     */
    where?: AIWorkflowRunWhereInput
    /**
     * Limit how many AIWorkflowRuns to update.
     */
    limit?: number
  }

  /**
   * AIWorkflowRun updateManyAndReturn
   */
  export type AIWorkflowRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * The data used to update AIWorkflowRuns.
     */
    data: XOR<AIWorkflowRunUpdateManyMutationInput, AIWorkflowRunUncheckedUpdateManyInput>
    /**
     * Filter which AIWorkflowRuns to update
     */
    where?: AIWorkflowRunWhereInput
    /**
     * Limit how many AIWorkflowRuns to update.
     */
    limit?: number
  }

  /**
   * AIWorkflowRun upsert
   */
  export type AIWorkflowRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * The filter to search for the AIWorkflowRun to update in case it exists.
     */
    where: AIWorkflowRunWhereUniqueInput
    /**
     * In case the AIWorkflowRun found by the `where` argument doesn't exist, create a new AIWorkflowRun with this data.
     */
    create: XOR<AIWorkflowRunCreateInput, AIWorkflowRunUncheckedCreateInput>
    /**
     * In case the AIWorkflowRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIWorkflowRunUpdateInput, AIWorkflowRunUncheckedUpdateInput>
  }

  /**
   * AIWorkflowRun delete
   */
  export type AIWorkflowRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
    /**
     * Filter which AIWorkflowRun to delete.
     */
    where: AIWorkflowRunWhereUniqueInput
  }

  /**
   * AIWorkflowRun deleteMany
   */
  export type AIWorkflowRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIWorkflowRuns to delete
     */
    where?: AIWorkflowRunWhereInput
    /**
     * Limit how many AIWorkflowRuns to delete.
     */
    limit?: number
  }

  /**
   * AIWorkflowRun without action
   */
  export type AIWorkflowRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowRun
     */
    select?: AIWorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowRun
     */
    omit?: AIWorkflowRunOmit<ExtArgs> | null
  }


  /**
   * Model AIWorkflowVersion
   */

  export type AggregateAIWorkflowVersion = {
    _count: AIWorkflowVersionCountAggregateOutputType | null
    _avg: AIWorkflowVersionAvgAggregateOutputType | null
    _sum: AIWorkflowVersionSumAggregateOutputType | null
    _min: AIWorkflowVersionMinAggregateOutputType | null
    _max: AIWorkflowVersionMaxAggregateOutputType | null
  }

  export type AIWorkflowVersionAvgAggregateOutputType = {
    versionNumber: number | null
  }

  export type AIWorkflowVersionSumAggregateOutputType = {
    versionNumber: number | null
  }

  export type AIWorkflowVersionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    workflowId: string | null
    versionNumber: number | null
    label: string | null
    createdByUserId: string | null
    createdAt: Date | null
  }

  export type AIWorkflowVersionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    workflowId: string | null
    versionNumber: number | null
    label: string | null
    createdByUserId: string | null
    createdAt: Date | null
  }

  export type AIWorkflowVersionCountAggregateOutputType = {
    id: number
    tenantId: number
    workflowId: number
    versionNumber: number
    label: number
    definition: number
    createdByUserId: number
    createdAt: number
    _all: number
  }


  export type AIWorkflowVersionAvgAggregateInputType = {
    versionNumber?: true
  }

  export type AIWorkflowVersionSumAggregateInputType = {
    versionNumber?: true
  }

  export type AIWorkflowVersionMinAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    versionNumber?: true
    label?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type AIWorkflowVersionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    versionNumber?: true
    label?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type AIWorkflowVersionCountAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    versionNumber?: true
    label?: true
    definition?: true
    createdByUserId?: true
    createdAt?: true
    _all?: true
  }

  export type AIWorkflowVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIWorkflowVersion to aggregate.
     */
    where?: AIWorkflowVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowVersions to fetch.
     */
    orderBy?: AIWorkflowVersionOrderByWithRelationInput | AIWorkflowVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIWorkflowVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIWorkflowVersions
    **/
    _count?: true | AIWorkflowVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIWorkflowVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIWorkflowVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIWorkflowVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIWorkflowVersionMaxAggregateInputType
  }

  export type GetAIWorkflowVersionAggregateType<T extends AIWorkflowVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateAIWorkflowVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIWorkflowVersion[P]>
      : GetScalarType<T[P], AggregateAIWorkflowVersion[P]>
  }




  export type AIWorkflowVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIWorkflowVersionWhereInput
    orderBy?: AIWorkflowVersionOrderByWithAggregationInput | AIWorkflowVersionOrderByWithAggregationInput[]
    by: AIWorkflowVersionScalarFieldEnum[] | AIWorkflowVersionScalarFieldEnum
    having?: AIWorkflowVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIWorkflowVersionCountAggregateInputType | true
    _avg?: AIWorkflowVersionAvgAggregateInputType
    _sum?: AIWorkflowVersionSumAggregateInputType
    _min?: AIWorkflowVersionMinAggregateInputType
    _max?: AIWorkflowVersionMaxAggregateInputType
  }

  export type AIWorkflowVersionGroupByOutputType = {
    id: string
    tenantId: string
    workflowId: string
    versionNumber: number
    label: string | null
    definition: JsonValue
    createdByUserId: string
    createdAt: Date
    _count: AIWorkflowVersionCountAggregateOutputType | null
    _avg: AIWorkflowVersionAvgAggregateOutputType | null
    _sum: AIWorkflowVersionSumAggregateOutputType | null
    _min: AIWorkflowVersionMinAggregateOutputType | null
    _max: AIWorkflowVersionMaxAggregateOutputType | null
  }

  type GetAIWorkflowVersionGroupByPayload<T extends AIWorkflowVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIWorkflowVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIWorkflowVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIWorkflowVersionGroupByOutputType[P]>
            : GetScalarType<T[P], AIWorkflowVersionGroupByOutputType[P]>
        }
      >
    >


  export type AIWorkflowVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    versionNumber?: boolean
    label?: boolean
    definition?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIWorkflowVersion"]>

  export type AIWorkflowVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    versionNumber?: boolean
    label?: boolean
    definition?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIWorkflowVersion"]>

  export type AIWorkflowVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    versionNumber?: boolean
    label?: boolean
    definition?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIWorkflowVersion"]>

  export type AIWorkflowVersionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    versionNumber?: boolean
    label?: boolean
    definition?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
  }

  export type AIWorkflowVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "workflowId" | "versionNumber" | "label" | "definition" | "createdByUserId" | "createdAt", ExtArgs["result"]["aIWorkflowVersion"]>

  export type $AIWorkflowVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIWorkflowVersion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      workflowId: string
      versionNumber: number
      label: string | null
      definition: Prisma.JsonValue
      createdByUserId: string
      createdAt: Date
    }, ExtArgs["result"]["aIWorkflowVersion"]>
    composites: {}
  }

  type AIWorkflowVersionGetPayload<S extends boolean | null | undefined | AIWorkflowVersionDefaultArgs> = $Result.GetResult<Prisma.$AIWorkflowVersionPayload, S>

  type AIWorkflowVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIWorkflowVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIWorkflowVersionCountAggregateInputType | true
    }

  export interface AIWorkflowVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIWorkflowVersion'], meta: { name: 'AIWorkflowVersion' } }
    /**
     * Find zero or one AIWorkflowVersion that matches the filter.
     * @param {AIWorkflowVersionFindUniqueArgs} args - Arguments to find a AIWorkflowVersion
     * @example
     * // Get one AIWorkflowVersion
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIWorkflowVersionFindUniqueArgs>(args: SelectSubset<T, AIWorkflowVersionFindUniqueArgs<ExtArgs>>): Prisma__AIWorkflowVersionClient<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIWorkflowVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIWorkflowVersionFindUniqueOrThrowArgs} args - Arguments to find a AIWorkflowVersion
     * @example
     * // Get one AIWorkflowVersion
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIWorkflowVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, AIWorkflowVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIWorkflowVersionClient<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIWorkflowVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowVersionFindFirstArgs} args - Arguments to find a AIWorkflowVersion
     * @example
     * // Get one AIWorkflowVersion
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIWorkflowVersionFindFirstArgs>(args?: SelectSubset<T, AIWorkflowVersionFindFirstArgs<ExtArgs>>): Prisma__AIWorkflowVersionClient<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIWorkflowVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowVersionFindFirstOrThrowArgs} args - Arguments to find a AIWorkflowVersion
     * @example
     * // Get one AIWorkflowVersion
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIWorkflowVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, AIWorkflowVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIWorkflowVersionClient<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIWorkflowVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIWorkflowVersions
     * const aIWorkflowVersions = await prisma.aIWorkflowVersion.findMany()
     * 
     * // Get first 10 AIWorkflowVersions
     * const aIWorkflowVersions = await prisma.aIWorkflowVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIWorkflowVersionWithIdOnly = await prisma.aIWorkflowVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIWorkflowVersionFindManyArgs>(args?: SelectSubset<T, AIWorkflowVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIWorkflowVersion.
     * @param {AIWorkflowVersionCreateArgs} args - Arguments to create a AIWorkflowVersion.
     * @example
     * // Create one AIWorkflowVersion
     * const AIWorkflowVersion = await prisma.aIWorkflowVersion.create({
     *   data: {
     *     // ... data to create a AIWorkflowVersion
     *   }
     * })
     * 
     */
    create<T extends AIWorkflowVersionCreateArgs>(args: SelectSubset<T, AIWorkflowVersionCreateArgs<ExtArgs>>): Prisma__AIWorkflowVersionClient<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIWorkflowVersions.
     * @param {AIWorkflowVersionCreateManyArgs} args - Arguments to create many AIWorkflowVersions.
     * @example
     * // Create many AIWorkflowVersions
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIWorkflowVersionCreateManyArgs>(args?: SelectSubset<T, AIWorkflowVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIWorkflowVersions and returns the data saved in the database.
     * @param {AIWorkflowVersionCreateManyAndReturnArgs} args - Arguments to create many AIWorkflowVersions.
     * @example
     * // Create many AIWorkflowVersions
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIWorkflowVersions and only return the `id`
     * const aIWorkflowVersionWithIdOnly = await prisma.aIWorkflowVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIWorkflowVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, AIWorkflowVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIWorkflowVersion.
     * @param {AIWorkflowVersionDeleteArgs} args - Arguments to delete one AIWorkflowVersion.
     * @example
     * // Delete one AIWorkflowVersion
     * const AIWorkflowVersion = await prisma.aIWorkflowVersion.delete({
     *   where: {
     *     // ... filter to delete one AIWorkflowVersion
     *   }
     * })
     * 
     */
    delete<T extends AIWorkflowVersionDeleteArgs>(args: SelectSubset<T, AIWorkflowVersionDeleteArgs<ExtArgs>>): Prisma__AIWorkflowVersionClient<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIWorkflowVersion.
     * @param {AIWorkflowVersionUpdateArgs} args - Arguments to update one AIWorkflowVersion.
     * @example
     * // Update one AIWorkflowVersion
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIWorkflowVersionUpdateArgs>(args: SelectSubset<T, AIWorkflowVersionUpdateArgs<ExtArgs>>): Prisma__AIWorkflowVersionClient<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIWorkflowVersions.
     * @param {AIWorkflowVersionDeleteManyArgs} args - Arguments to filter AIWorkflowVersions to delete.
     * @example
     * // Delete a few AIWorkflowVersions
     * const { count } = await prisma.aIWorkflowVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIWorkflowVersionDeleteManyArgs>(args?: SelectSubset<T, AIWorkflowVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIWorkflowVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIWorkflowVersions
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIWorkflowVersionUpdateManyArgs>(args: SelectSubset<T, AIWorkflowVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIWorkflowVersions and returns the data updated in the database.
     * @param {AIWorkflowVersionUpdateManyAndReturnArgs} args - Arguments to update many AIWorkflowVersions.
     * @example
     * // Update many AIWorkflowVersions
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIWorkflowVersions and only return the `id`
     * const aIWorkflowVersionWithIdOnly = await prisma.aIWorkflowVersion.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIWorkflowVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, AIWorkflowVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIWorkflowVersion.
     * @param {AIWorkflowVersionUpsertArgs} args - Arguments to update or create a AIWorkflowVersion.
     * @example
     * // Update or create a AIWorkflowVersion
     * const aIWorkflowVersion = await prisma.aIWorkflowVersion.upsert({
     *   create: {
     *     // ... data to create a AIWorkflowVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIWorkflowVersion we want to update
     *   }
     * })
     */
    upsert<T extends AIWorkflowVersionUpsertArgs>(args: SelectSubset<T, AIWorkflowVersionUpsertArgs<ExtArgs>>): Prisma__AIWorkflowVersionClient<$Result.GetResult<Prisma.$AIWorkflowVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIWorkflowVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowVersionCountArgs} args - Arguments to filter AIWorkflowVersions to count.
     * @example
     * // Count the number of AIWorkflowVersions
     * const count = await prisma.aIWorkflowVersion.count({
     *   where: {
     *     // ... the filter for the AIWorkflowVersions we want to count
     *   }
     * })
    **/
    count<T extends AIWorkflowVersionCountArgs>(
      args?: Subset<T, AIWorkflowVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIWorkflowVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIWorkflowVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIWorkflowVersionAggregateArgs>(args: Subset<T, AIWorkflowVersionAggregateArgs>): Prisma.PrismaPromise<GetAIWorkflowVersionAggregateType<T>>

    /**
     * Group by AIWorkflowVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowVersionGroupByArgs} args - Group by arguments.
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
      T extends AIWorkflowVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIWorkflowVersionGroupByArgs['orderBy'] }
        : { orderBy?: AIWorkflowVersionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIWorkflowVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIWorkflowVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIWorkflowVersion model
   */
  readonly fields: AIWorkflowVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIWorkflowVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIWorkflowVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIWorkflowVersion model
   */
  interface AIWorkflowVersionFieldRefs {
    readonly id: FieldRef<"AIWorkflowVersion", 'String'>
    readonly tenantId: FieldRef<"AIWorkflowVersion", 'String'>
    readonly workflowId: FieldRef<"AIWorkflowVersion", 'String'>
    readonly versionNumber: FieldRef<"AIWorkflowVersion", 'Int'>
    readonly label: FieldRef<"AIWorkflowVersion", 'String'>
    readonly definition: FieldRef<"AIWorkflowVersion", 'Json'>
    readonly createdByUserId: FieldRef<"AIWorkflowVersion", 'String'>
    readonly createdAt: FieldRef<"AIWorkflowVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIWorkflowVersion findUnique
   */
  export type AIWorkflowVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowVersion to fetch.
     */
    where: AIWorkflowVersionWhereUniqueInput
  }

  /**
   * AIWorkflowVersion findUniqueOrThrow
   */
  export type AIWorkflowVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowVersion to fetch.
     */
    where: AIWorkflowVersionWhereUniqueInput
  }

  /**
   * AIWorkflowVersion findFirst
   */
  export type AIWorkflowVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowVersion to fetch.
     */
    where?: AIWorkflowVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowVersions to fetch.
     */
    orderBy?: AIWorkflowVersionOrderByWithRelationInput | AIWorkflowVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIWorkflowVersions.
     */
    cursor?: AIWorkflowVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIWorkflowVersions.
     */
    distinct?: AIWorkflowVersionScalarFieldEnum | AIWorkflowVersionScalarFieldEnum[]
  }

  /**
   * AIWorkflowVersion findFirstOrThrow
   */
  export type AIWorkflowVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowVersion to fetch.
     */
    where?: AIWorkflowVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowVersions to fetch.
     */
    orderBy?: AIWorkflowVersionOrderByWithRelationInput | AIWorkflowVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIWorkflowVersions.
     */
    cursor?: AIWorkflowVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIWorkflowVersions.
     */
    distinct?: AIWorkflowVersionScalarFieldEnum | AIWorkflowVersionScalarFieldEnum[]
  }

  /**
   * AIWorkflowVersion findMany
   */
  export type AIWorkflowVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowVersions to fetch.
     */
    where?: AIWorkflowVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowVersions to fetch.
     */
    orderBy?: AIWorkflowVersionOrderByWithRelationInput | AIWorkflowVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIWorkflowVersions.
     */
    cursor?: AIWorkflowVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowVersions.
     */
    skip?: number
    distinct?: AIWorkflowVersionScalarFieldEnum | AIWorkflowVersionScalarFieldEnum[]
  }

  /**
   * AIWorkflowVersion create
   */
  export type AIWorkflowVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * The data needed to create a AIWorkflowVersion.
     */
    data: XOR<AIWorkflowVersionCreateInput, AIWorkflowVersionUncheckedCreateInput>
  }

  /**
   * AIWorkflowVersion createMany
   */
  export type AIWorkflowVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIWorkflowVersions.
     */
    data: AIWorkflowVersionCreateManyInput | AIWorkflowVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIWorkflowVersion createManyAndReturn
   */
  export type AIWorkflowVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * The data used to create many AIWorkflowVersions.
     */
    data: AIWorkflowVersionCreateManyInput | AIWorkflowVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIWorkflowVersion update
   */
  export type AIWorkflowVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * The data needed to update a AIWorkflowVersion.
     */
    data: XOR<AIWorkflowVersionUpdateInput, AIWorkflowVersionUncheckedUpdateInput>
    /**
     * Choose, which AIWorkflowVersion to update.
     */
    where: AIWorkflowVersionWhereUniqueInput
  }

  /**
   * AIWorkflowVersion updateMany
   */
  export type AIWorkflowVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIWorkflowVersions.
     */
    data: XOR<AIWorkflowVersionUpdateManyMutationInput, AIWorkflowVersionUncheckedUpdateManyInput>
    /**
     * Filter which AIWorkflowVersions to update
     */
    where?: AIWorkflowVersionWhereInput
    /**
     * Limit how many AIWorkflowVersions to update.
     */
    limit?: number
  }

  /**
   * AIWorkflowVersion updateManyAndReturn
   */
  export type AIWorkflowVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * The data used to update AIWorkflowVersions.
     */
    data: XOR<AIWorkflowVersionUpdateManyMutationInput, AIWorkflowVersionUncheckedUpdateManyInput>
    /**
     * Filter which AIWorkflowVersions to update
     */
    where?: AIWorkflowVersionWhereInput
    /**
     * Limit how many AIWorkflowVersions to update.
     */
    limit?: number
  }

  /**
   * AIWorkflowVersion upsert
   */
  export type AIWorkflowVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * The filter to search for the AIWorkflowVersion to update in case it exists.
     */
    where: AIWorkflowVersionWhereUniqueInput
    /**
     * In case the AIWorkflowVersion found by the `where` argument doesn't exist, create a new AIWorkflowVersion with this data.
     */
    create: XOR<AIWorkflowVersionCreateInput, AIWorkflowVersionUncheckedCreateInput>
    /**
     * In case the AIWorkflowVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIWorkflowVersionUpdateInput, AIWorkflowVersionUncheckedUpdateInput>
  }

  /**
   * AIWorkflowVersion delete
   */
  export type AIWorkflowVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
    /**
     * Filter which AIWorkflowVersion to delete.
     */
    where: AIWorkflowVersionWhereUniqueInput
  }

  /**
   * AIWorkflowVersion deleteMany
   */
  export type AIWorkflowVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIWorkflowVersions to delete
     */
    where?: AIWorkflowVersionWhereInput
    /**
     * Limit how many AIWorkflowVersions to delete.
     */
    limit?: number
  }

  /**
   * AIWorkflowVersion without action
   */
  export type AIWorkflowVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowVersion
     */
    select?: AIWorkflowVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowVersion
     */
    omit?: AIWorkflowVersionOmit<ExtArgs> | null
  }


  /**
   * Model AIWorkflowLiveEvent
   */

  export type AggregateAIWorkflowLiveEvent = {
    _count: AIWorkflowLiveEventCountAggregateOutputType | null
    _avg: AIWorkflowLiveEventAvgAggregateOutputType | null
    _sum: AIWorkflowLiveEventSumAggregateOutputType | null
    _min: AIWorkflowLiveEventMinAggregateOutputType | null
    _max: AIWorkflowLiveEventMaxAggregateOutputType | null
  }

  export type AIWorkflowLiveEventAvgAggregateOutputType = {
    durationMs: number | null
  }

  export type AIWorkflowLiveEventSumAggregateOutputType = {
    durationMs: number | null
  }

  export type AIWorkflowLiveEventMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    workflowId: string | null
    workflowName: string | null
    runId: string | null
    eventType: string | null
    timestamp: Date | null
    durationMs: number | null
    status: string | null
  }

  export type AIWorkflowLiveEventMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    workflowId: string | null
    workflowName: string | null
    runId: string | null
    eventType: string | null
    timestamp: Date | null
    durationMs: number | null
    status: string | null
  }

  export type AIWorkflowLiveEventCountAggregateOutputType = {
    id: number
    tenantId: number
    workflowId: number
    workflowName: number
    runId: number
    eventType: number
    timestamp: number
    payload: number
    durationMs: number
    status: number
    _all: number
  }


  export type AIWorkflowLiveEventAvgAggregateInputType = {
    durationMs?: true
  }

  export type AIWorkflowLiveEventSumAggregateInputType = {
    durationMs?: true
  }

  export type AIWorkflowLiveEventMinAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    workflowName?: true
    runId?: true
    eventType?: true
    timestamp?: true
    durationMs?: true
    status?: true
  }

  export type AIWorkflowLiveEventMaxAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    workflowName?: true
    runId?: true
    eventType?: true
    timestamp?: true
    durationMs?: true
    status?: true
  }

  export type AIWorkflowLiveEventCountAggregateInputType = {
    id?: true
    tenantId?: true
    workflowId?: true
    workflowName?: true
    runId?: true
    eventType?: true
    timestamp?: true
    payload?: true
    durationMs?: true
    status?: true
    _all?: true
  }

  export type AIWorkflowLiveEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIWorkflowLiveEvent to aggregate.
     */
    where?: AIWorkflowLiveEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowLiveEvents to fetch.
     */
    orderBy?: AIWorkflowLiveEventOrderByWithRelationInput | AIWorkflowLiveEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIWorkflowLiveEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowLiveEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowLiveEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIWorkflowLiveEvents
    **/
    _count?: true | AIWorkflowLiveEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIWorkflowLiveEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIWorkflowLiveEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIWorkflowLiveEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIWorkflowLiveEventMaxAggregateInputType
  }

  export type GetAIWorkflowLiveEventAggregateType<T extends AIWorkflowLiveEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAIWorkflowLiveEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIWorkflowLiveEvent[P]>
      : GetScalarType<T[P], AggregateAIWorkflowLiveEvent[P]>
  }




  export type AIWorkflowLiveEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIWorkflowLiveEventWhereInput
    orderBy?: AIWorkflowLiveEventOrderByWithAggregationInput | AIWorkflowLiveEventOrderByWithAggregationInput[]
    by: AIWorkflowLiveEventScalarFieldEnum[] | AIWorkflowLiveEventScalarFieldEnum
    having?: AIWorkflowLiveEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIWorkflowLiveEventCountAggregateInputType | true
    _avg?: AIWorkflowLiveEventAvgAggregateInputType
    _sum?: AIWorkflowLiveEventSumAggregateInputType
    _min?: AIWorkflowLiveEventMinAggregateInputType
    _max?: AIWorkflowLiveEventMaxAggregateInputType
  }

  export type AIWorkflowLiveEventGroupByOutputType = {
    id: string
    tenantId: string
    workflowId: string | null
    workflowName: string | null
    runId: string | null
    eventType: string
    timestamp: Date
    payload: JsonValue
    durationMs: number | null
    status: string | null
    _count: AIWorkflowLiveEventCountAggregateOutputType | null
    _avg: AIWorkflowLiveEventAvgAggregateOutputType | null
    _sum: AIWorkflowLiveEventSumAggregateOutputType | null
    _min: AIWorkflowLiveEventMinAggregateOutputType | null
    _max: AIWorkflowLiveEventMaxAggregateOutputType | null
  }

  type GetAIWorkflowLiveEventGroupByPayload<T extends AIWorkflowLiveEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIWorkflowLiveEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIWorkflowLiveEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIWorkflowLiveEventGroupByOutputType[P]>
            : GetScalarType<T[P], AIWorkflowLiveEventGroupByOutputType[P]>
        }
      >
    >


  export type AIWorkflowLiveEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    workflowName?: boolean
    runId?: boolean
    eventType?: boolean
    timestamp?: boolean
    payload?: boolean
    durationMs?: boolean
    status?: boolean
  }, ExtArgs["result"]["aIWorkflowLiveEvent"]>

  export type AIWorkflowLiveEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    workflowName?: boolean
    runId?: boolean
    eventType?: boolean
    timestamp?: boolean
    payload?: boolean
    durationMs?: boolean
    status?: boolean
  }, ExtArgs["result"]["aIWorkflowLiveEvent"]>

  export type AIWorkflowLiveEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    workflowName?: boolean
    runId?: boolean
    eventType?: boolean
    timestamp?: boolean
    payload?: boolean
    durationMs?: boolean
    status?: boolean
  }, ExtArgs["result"]["aIWorkflowLiveEvent"]>

  export type AIWorkflowLiveEventSelectScalar = {
    id?: boolean
    tenantId?: boolean
    workflowId?: boolean
    workflowName?: boolean
    runId?: boolean
    eventType?: boolean
    timestamp?: boolean
    payload?: boolean
    durationMs?: boolean
    status?: boolean
  }

  export type AIWorkflowLiveEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "workflowId" | "workflowName" | "runId" | "eventType" | "timestamp" | "payload" | "durationMs" | "status", ExtArgs["result"]["aIWorkflowLiveEvent"]>

  export type $AIWorkflowLiveEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIWorkflowLiveEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      workflowId: string | null
      workflowName: string | null
      runId: string | null
      eventType: string
      timestamp: Date
      payload: Prisma.JsonValue
      durationMs: number | null
      status: string | null
    }, ExtArgs["result"]["aIWorkflowLiveEvent"]>
    composites: {}
  }

  type AIWorkflowLiveEventGetPayload<S extends boolean | null | undefined | AIWorkflowLiveEventDefaultArgs> = $Result.GetResult<Prisma.$AIWorkflowLiveEventPayload, S>

  type AIWorkflowLiveEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIWorkflowLiveEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIWorkflowLiveEventCountAggregateInputType | true
    }

  export interface AIWorkflowLiveEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIWorkflowLiveEvent'], meta: { name: 'AIWorkflowLiveEvent' } }
    /**
     * Find zero or one AIWorkflowLiveEvent that matches the filter.
     * @param {AIWorkflowLiveEventFindUniqueArgs} args - Arguments to find a AIWorkflowLiveEvent
     * @example
     * // Get one AIWorkflowLiveEvent
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIWorkflowLiveEventFindUniqueArgs>(args: SelectSubset<T, AIWorkflowLiveEventFindUniqueArgs<ExtArgs>>): Prisma__AIWorkflowLiveEventClient<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIWorkflowLiveEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIWorkflowLiveEventFindUniqueOrThrowArgs} args - Arguments to find a AIWorkflowLiveEvent
     * @example
     * // Get one AIWorkflowLiveEvent
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIWorkflowLiveEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AIWorkflowLiveEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIWorkflowLiveEventClient<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIWorkflowLiveEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowLiveEventFindFirstArgs} args - Arguments to find a AIWorkflowLiveEvent
     * @example
     * // Get one AIWorkflowLiveEvent
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIWorkflowLiveEventFindFirstArgs>(args?: SelectSubset<T, AIWorkflowLiveEventFindFirstArgs<ExtArgs>>): Prisma__AIWorkflowLiveEventClient<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIWorkflowLiveEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowLiveEventFindFirstOrThrowArgs} args - Arguments to find a AIWorkflowLiveEvent
     * @example
     * // Get one AIWorkflowLiveEvent
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIWorkflowLiveEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AIWorkflowLiveEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIWorkflowLiveEventClient<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIWorkflowLiveEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowLiveEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIWorkflowLiveEvents
     * const aIWorkflowLiveEvents = await prisma.aIWorkflowLiveEvent.findMany()
     * 
     * // Get first 10 AIWorkflowLiveEvents
     * const aIWorkflowLiveEvents = await prisma.aIWorkflowLiveEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIWorkflowLiveEventWithIdOnly = await prisma.aIWorkflowLiveEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIWorkflowLiveEventFindManyArgs>(args?: SelectSubset<T, AIWorkflowLiveEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIWorkflowLiveEvent.
     * @param {AIWorkflowLiveEventCreateArgs} args - Arguments to create a AIWorkflowLiveEvent.
     * @example
     * // Create one AIWorkflowLiveEvent
     * const AIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.create({
     *   data: {
     *     // ... data to create a AIWorkflowLiveEvent
     *   }
     * })
     * 
     */
    create<T extends AIWorkflowLiveEventCreateArgs>(args: SelectSubset<T, AIWorkflowLiveEventCreateArgs<ExtArgs>>): Prisma__AIWorkflowLiveEventClient<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIWorkflowLiveEvents.
     * @param {AIWorkflowLiveEventCreateManyArgs} args - Arguments to create many AIWorkflowLiveEvents.
     * @example
     * // Create many AIWorkflowLiveEvents
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIWorkflowLiveEventCreateManyArgs>(args?: SelectSubset<T, AIWorkflowLiveEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIWorkflowLiveEvents and returns the data saved in the database.
     * @param {AIWorkflowLiveEventCreateManyAndReturnArgs} args - Arguments to create many AIWorkflowLiveEvents.
     * @example
     * // Create many AIWorkflowLiveEvents
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIWorkflowLiveEvents and only return the `id`
     * const aIWorkflowLiveEventWithIdOnly = await prisma.aIWorkflowLiveEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIWorkflowLiveEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AIWorkflowLiveEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIWorkflowLiveEvent.
     * @param {AIWorkflowLiveEventDeleteArgs} args - Arguments to delete one AIWorkflowLiveEvent.
     * @example
     * // Delete one AIWorkflowLiveEvent
     * const AIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.delete({
     *   where: {
     *     // ... filter to delete one AIWorkflowLiveEvent
     *   }
     * })
     * 
     */
    delete<T extends AIWorkflowLiveEventDeleteArgs>(args: SelectSubset<T, AIWorkflowLiveEventDeleteArgs<ExtArgs>>): Prisma__AIWorkflowLiveEventClient<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIWorkflowLiveEvent.
     * @param {AIWorkflowLiveEventUpdateArgs} args - Arguments to update one AIWorkflowLiveEvent.
     * @example
     * // Update one AIWorkflowLiveEvent
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIWorkflowLiveEventUpdateArgs>(args: SelectSubset<T, AIWorkflowLiveEventUpdateArgs<ExtArgs>>): Prisma__AIWorkflowLiveEventClient<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIWorkflowLiveEvents.
     * @param {AIWorkflowLiveEventDeleteManyArgs} args - Arguments to filter AIWorkflowLiveEvents to delete.
     * @example
     * // Delete a few AIWorkflowLiveEvents
     * const { count } = await prisma.aIWorkflowLiveEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIWorkflowLiveEventDeleteManyArgs>(args?: SelectSubset<T, AIWorkflowLiveEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIWorkflowLiveEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowLiveEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIWorkflowLiveEvents
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIWorkflowLiveEventUpdateManyArgs>(args: SelectSubset<T, AIWorkflowLiveEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIWorkflowLiveEvents and returns the data updated in the database.
     * @param {AIWorkflowLiveEventUpdateManyAndReturnArgs} args - Arguments to update many AIWorkflowLiveEvents.
     * @example
     * // Update many AIWorkflowLiveEvents
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIWorkflowLiveEvents and only return the `id`
     * const aIWorkflowLiveEventWithIdOnly = await prisma.aIWorkflowLiveEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIWorkflowLiveEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AIWorkflowLiveEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIWorkflowLiveEvent.
     * @param {AIWorkflowLiveEventUpsertArgs} args - Arguments to update or create a AIWorkflowLiveEvent.
     * @example
     * // Update or create a AIWorkflowLiveEvent
     * const aIWorkflowLiveEvent = await prisma.aIWorkflowLiveEvent.upsert({
     *   create: {
     *     // ... data to create a AIWorkflowLiveEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIWorkflowLiveEvent we want to update
     *   }
     * })
     */
    upsert<T extends AIWorkflowLiveEventUpsertArgs>(args: SelectSubset<T, AIWorkflowLiveEventUpsertArgs<ExtArgs>>): Prisma__AIWorkflowLiveEventClient<$Result.GetResult<Prisma.$AIWorkflowLiveEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIWorkflowLiveEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowLiveEventCountArgs} args - Arguments to filter AIWorkflowLiveEvents to count.
     * @example
     * // Count the number of AIWorkflowLiveEvents
     * const count = await prisma.aIWorkflowLiveEvent.count({
     *   where: {
     *     // ... the filter for the AIWorkflowLiveEvents we want to count
     *   }
     * })
    **/
    count<T extends AIWorkflowLiveEventCountArgs>(
      args?: Subset<T, AIWorkflowLiveEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIWorkflowLiveEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIWorkflowLiveEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowLiveEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIWorkflowLiveEventAggregateArgs>(args: Subset<T, AIWorkflowLiveEventAggregateArgs>): Prisma.PrismaPromise<GetAIWorkflowLiveEventAggregateType<T>>

    /**
     * Group by AIWorkflowLiveEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIWorkflowLiveEventGroupByArgs} args - Group by arguments.
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
      T extends AIWorkflowLiveEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIWorkflowLiveEventGroupByArgs['orderBy'] }
        : { orderBy?: AIWorkflowLiveEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIWorkflowLiveEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIWorkflowLiveEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIWorkflowLiveEvent model
   */
  readonly fields: AIWorkflowLiveEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIWorkflowLiveEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIWorkflowLiveEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIWorkflowLiveEvent model
   */
  interface AIWorkflowLiveEventFieldRefs {
    readonly id: FieldRef<"AIWorkflowLiveEvent", 'String'>
    readonly tenantId: FieldRef<"AIWorkflowLiveEvent", 'String'>
    readonly workflowId: FieldRef<"AIWorkflowLiveEvent", 'String'>
    readonly workflowName: FieldRef<"AIWorkflowLiveEvent", 'String'>
    readonly runId: FieldRef<"AIWorkflowLiveEvent", 'String'>
    readonly eventType: FieldRef<"AIWorkflowLiveEvent", 'String'>
    readonly timestamp: FieldRef<"AIWorkflowLiveEvent", 'DateTime'>
    readonly payload: FieldRef<"AIWorkflowLiveEvent", 'Json'>
    readonly durationMs: FieldRef<"AIWorkflowLiveEvent", 'Int'>
    readonly status: FieldRef<"AIWorkflowLiveEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AIWorkflowLiveEvent findUnique
   */
  export type AIWorkflowLiveEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowLiveEvent to fetch.
     */
    where: AIWorkflowLiveEventWhereUniqueInput
  }

  /**
   * AIWorkflowLiveEvent findUniqueOrThrow
   */
  export type AIWorkflowLiveEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowLiveEvent to fetch.
     */
    where: AIWorkflowLiveEventWhereUniqueInput
  }

  /**
   * AIWorkflowLiveEvent findFirst
   */
  export type AIWorkflowLiveEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowLiveEvent to fetch.
     */
    where?: AIWorkflowLiveEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowLiveEvents to fetch.
     */
    orderBy?: AIWorkflowLiveEventOrderByWithRelationInput | AIWorkflowLiveEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIWorkflowLiveEvents.
     */
    cursor?: AIWorkflowLiveEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowLiveEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowLiveEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIWorkflowLiveEvents.
     */
    distinct?: AIWorkflowLiveEventScalarFieldEnum | AIWorkflowLiveEventScalarFieldEnum[]
  }

  /**
   * AIWorkflowLiveEvent findFirstOrThrow
   */
  export type AIWorkflowLiveEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowLiveEvent to fetch.
     */
    where?: AIWorkflowLiveEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowLiveEvents to fetch.
     */
    orderBy?: AIWorkflowLiveEventOrderByWithRelationInput | AIWorkflowLiveEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIWorkflowLiveEvents.
     */
    cursor?: AIWorkflowLiveEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowLiveEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowLiveEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIWorkflowLiveEvents.
     */
    distinct?: AIWorkflowLiveEventScalarFieldEnum | AIWorkflowLiveEventScalarFieldEnum[]
  }

  /**
   * AIWorkflowLiveEvent findMany
   */
  export type AIWorkflowLiveEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * Filter, which AIWorkflowLiveEvents to fetch.
     */
    where?: AIWorkflowLiveEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIWorkflowLiveEvents to fetch.
     */
    orderBy?: AIWorkflowLiveEventOrderByWithRelationInput | AIWorkflowLiveEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIWorkflowLiveEvents.
     */
    cursor?: AIWorkflowLiveEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIWorkflowLiveEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIWorkflowLiveEvents.
     */
    skip?: number
    distinct?: AIWorkflowLiveEventScalarFieldEnum | AIWorkflowLiveEventScalarFieldEnum[]
  }

  /**
   * AIWorkflowLiveEvent create
   */
  export type AIWorkflowLiveEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * The data needed to create a AIWorkflowLiveEvent.
     */
    data: XOR<AIWorkflowLiveEventCreateInput, AIWorkflowLiveEventUncheckedCreateInput>
  }

  /**
   * AIWorkflowLiveEvent createMany
   */
  export type AIWorkflowLiveEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIWorkflowLiveEvents.
     */
    data: AIWorkflowLiveEventCreateManyInput | AIWorkflowLiveEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIWorkflowLiveEvent createManyAndReturn
   */
  export type AIWorkflowLiveEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * The data used to create many AIWorkflowLiveEvents.
     */
    data: AIWorkflowLiveEventCreateManyInput | AIWorkflowLiveEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIWorkflowLiveEvent update
   */
  export type AIWorkflowLiveEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * The data needed to update a AIWorkflowLiveEvent.
     */
    data: XOR<AIWorkflowLiveEventUpdateInput, AIWorkflowLiveEventUncheckedUpdateInput>
    /**
     * Choose, which AIWorkflowLiveEvent to update.
     */
    where: AIWorkflowLiveEventWhereUniqueInput
  }

  /**
   * AIWorkflowLiveEvent updateMany
   */
  export type AIWorkflowLiveEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIWorkflowLiveEvents.
     */
    data: XOR<AIWorkflowLiveEventUpdateManyMutationInput, AIWorkflowLiveEventUncheckedUpdateManyInput>
    /**
     * Filter which AIWorkflowLiveEvents to update
     */
    where?: AIWorkflowLiveEventWhereInput
    /**
     * Limit how many AIWorkflowLiveEvents to update.
     */
    limit?: number
  }

  /**
   * AIWorkflowLiveEvent updateManyAndReturn
   */
  export type AIWorkflowLiveEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * The data used to update AIWorkflowLiveEvents.
     */
    data: XOR<AIWorkflowLiveEventUpdateManyMutationInput, AIWorkflowLiveEventUncheckedUpdateManyInput>
    /**
     * Filter which AIWorkflowLiveEvents to update
     */
    where?: AIWorkflowLiveEventWhereInput
    /**
     * Limit how many AIWorkflowLiveEvents to update.
     */
    limit?: number
  }

  /**
   * AIWorkflowLiveEvent upsert
   */
  export type AIWorkflowLiveEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * The filter to search for the AIWorkflowLiveEvent to update in case it exists.
     */
    where: AIWorkflowLiveEventWhereUniqueInput
    /**
     * In case the AIWorkflowLiveEvent found by the `where` argument doesn't exist, create a new AIWorkflowLiveEvent with this data.
     */
    create: XOR<AIWorkflowLiveEventCreateInput, AIWorkflowLiveEventUncheckedCreateInput>
    /**
     * In case the AIWorkflowLiveEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIWorkflowLiveEventUpdateInput, AIWorkflowLiveEventUncheckedUpdateInput>
  }

  /**
   * AIWorkflowLiveEvent delete
   */
  export type AIWorkflowLiveEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
    /**
     * Filter which AIWorkflowLiveEvent to delete.
     */
    where: AIWorkflowLiveEventWhereUniqueInput
  }

  /**
   * AIWorkflowLiveEvent deleteMany
   */
  export type AIWorkflowLiveEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIWorkflowLiveEvents to delete
     */
    where?: AIWorkflowLiveEventWhereInput
    /**
     * Limit how many AIWorkflowLiveEvents to delete.
     */
    limit?: number
  }

  /**
   * AIWorkflowLiveEvent without action
   */
  export type AIWorkflowLiveEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIWorkflowLiveEvent
     */
    select?: AIWorkflowLiveEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIWorkflowLiveEvent
     */
    omit?: AIWorkflowLiveEventOmit<ExtArgs> | null
  }


  /**
   * Model AIDataset
   */

  export type AggregateAIDataset = {
    _count: AIDatasetCountAggregateOutputType | null
    _min: AIDatasetMinAggregateOutputType | null
    _max: AIDatasetMaxAggregateOutputType | null
  }

  export type AIDatasetMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    type: $Enums.AIDatasetType | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIDatasetMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    type: $Enums.AIDatasetType | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIDatasetCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    type: number
    tags: number
    createdByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIDatasetMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    type?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIDatasetMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    type?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIDatasetCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    type?: true
    tags?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIDatasetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDataset to aggregate.
     */
    where?: AIDatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasets to fetch.
     */
    orderBy?: AIDatasetOrderByWithRelationInput | AIDatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIDatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIDatasets
    **/
    _count?: true | AIDatasetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIDatasetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIDatasetMaxAggregateInputType
  }

  export type GetAIDatasetAggregateType<T extends AIDatasetAggregateArgs> = {
        [P in keyof T & keyof AggregateAIDataset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIDataset[P]>
      : GetScalarType<T[P], AggregateAIDataset[P]>
  }




  export type AIDatasetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetWhereInput
    orderBy?: AIDatasetOrderByWithAggregationInput | AIDatasetOrderByWithAggregationInput[]
    by: AIDatasetScalarFieldEnum[] | AIDatasetScalarFieldEnum
    having?: AIDatasetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIDatasetCountAggregateInputType | true
    _min?: AIDatasetMinAggregateInputType
    _max?: AIDatasetMaxAggregateInputType
  }

  export type AIDatasetGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string
    type: $Enums.AIDatasetType
    tags: string[]
    createdByUserId: string
    createdAt: Date
    updatedAt: Date
    _count: AIDatasetCountAggregateOutputType | null
    _min: AIDatasetMinAggregateOutputType | null
    _max: AIDatasetMaxAggregateOutputType | null
  }

  type GetAIDatasetGroupByPayload<T extends AIDatasetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIDatasetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIDatasetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIDatasetGroupByOutputType[P]>
            : GetScalarType<T[P], AIDatasetGroupByOutputType[P]>
        }
      >
    >


  export type AIDatasetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    tags?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    versions?: boolean | AIDataset$versionsArgs<ExtArgs>
    records?: boolean | AIDataset$recordsArgs<ExtArgs>
    auditLogs?: boolean | AIDataset$auditLogsArgs<ExtArgs>
    _count?: boolean | AIDatasetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDataset"]>

  export type AIDatasetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    tags?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIDataset"]>

  export type AIDatasetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    tags?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIDataset"]>

  export type AIDatasetSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    tags?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIDatasetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "type" | "tags" | "createdByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["aIDataset"]>
  export type AIDatasetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | AIDataset$versionsArgs<ExtArgs>
    records?: boolean | AIDataset$recordsArgs<ExtArgs>
    auditLogs?: boolean | AIDataset$auditLogsArgs<ExtArgs>
    _count?: boolean | AIDatasetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AIDatasetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AIDatasetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AIDatasetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIDataset"
    objects: {
      versions: Prisma.$AIDatasetVersionPayload<ExtArgs>[]
      records: Prisma.$AIDatasetRecordPayload<ExtArgs>[]
      auditLogs: Prisma.$AIDatasetAuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string
      type: $Enums.AIDatasetType
      tags: string[]
      createdByUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIDataset"]>
    composites: {}
  }

  type AIDatasetGetPayload<S extends boolean | null | undefined | AIDatasetDefaultArgs> = $Result.GetResult<Prisma.$AIDatasetPayload, S>

  type AIDatasetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIDatasetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIDatasetCountAggregateInputType | true
    }

  export interface AIDatasetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIDataset'], meta: { name: 'AIDataset' } }
    /**
     * Find zero or one AIDataset that matches the filter.
     * @param {AIDatasetFindUniqueArgs} args - Arguments to find a AIDataset
     * @example
     * // Get one AIDataset
     * const aIDataset = await prisma.aIDataset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIDatasetFindUniqueArgs>(args: SelectSubset<T, AIDatasetFindUniqueArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIDataset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIDatasetFindUniqueOrThrowArgs} args - Arguments to find a AIDataset
     * @example
     * // Get one AIDataset
     * const aIDataset = await prisma.aIDataset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIDatasetFindUniqueOrThrowArgs>(args: SelectSubset<T, AIDatasetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDataset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetFindFirstArgs} args - Arguments to find a AIDataset
     * @example
     * // Get one AIDataset
     * const aIDataset = await prisma.aIDataset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIDatasetFindFirstArgs>(args?: SelectSubset<T, AIDatasetFindFirstArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDataset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetFindFirstOrThrowArgs} args - Arguments to find a AIDataset
     * @example
     * // Get one AIDataset
     * const aIDataset = await prisma.aIDataset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIDatasetFindFirstOrThrowArgs>(args?: SelectSubset<T, AIDatasetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIDatasets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIDatasets
     * const aIDatasets = await prisma.aIDataset.findMany()
     * 
     * // Get first 10 AIDatasets
     * const aIDatasets = await prisma.aIDataset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIDatasetWithIdOnly = await prisma.aIDataset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIDatasetFindManyArgs>(args?: SelectSubset<T, AIDatasetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIDataset.
     * @param {AIDatasetCreateArgs} args - Arguments to create a AIDataset.
     * @example
     * // Create one AIDataset
     * const AIDataset = await prisma.aIDataset.create({
     *   data: {
     *     // ... data to create a AIDataset
     *   }
     * })
     * 
     */
    create<T extends AIDatasetCreateArgs>(args: SelectSubset<T, AIDatasetCreateArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIDatasets.
     * @param {AIDatasetCreateManyArgs} args - Arguments to create many AIDatasets.
     * @example
     * // Create many AIDatasets
     * const aIDataset = await prisma.aIDataset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIDatasetCreateManyArgs>(args?: SelectSubset<T, AIDatasetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIDatasets and returns the data saved in the database.
     * @param {AIDatasetCreateManyAndReturnArgs} args - Arguments to create many AIDatasets.
     * @example
     * // Create many AIDatasets
     * const aIDataset = await prisma.aIDataset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIDatasets and only return the `id`
     * const aIDatasetWithIdOnly = await prisma.aIDataset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIDatasetCreateManyAndReturnArgs>(args?: SelectSubset<T, AIDatasetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIDataset.
     * @param {AIDatasetDeleteArgs} args - Arguments to delete one AIDataset.
     * @example
     * // Delete one AIDataset
     * const AIDataset = await prisma.aIDataset.delete({
     *   where: {
     *     // ... filter to delete one AIDataset
     *   }
     * })
     * 
     */
    delete<T extends AIDatasetDeleteArgs>(args: SelectSubset<T, AIDatasetDeleteArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIDataset.
     * @param {AIDatasetUpdateArgs} args - Arguments to update one AIDataset.
     * @example
     * // Update one AIDataset
     * const aIDataset = await prisma.aIDataset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIDatasetUpdateArgs>(args: SelectSubset<T, AIDatasetUpdateArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIDatasets.
     * @param {AIDatasetDeleteManyArgs} args - Arguments to filter AIDatasets to delete.
     * @example
     * // Delete a few AIDatasets
     * const { count } = await prisma.aIDataset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIDatasetDeleteManyArgs>(args?: SelectSubset<T, AIDatasetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIDatasets
     * const aIDataset = await prisma.aIDataset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIDatasetUpdateManyArgs>(args: SelectSubset<T, AIDatasetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasets and returns the data updated in the database.
     * @param {AIDatasetUpdateManyAndReturnArgs} args - Arguments to update many AIDatasets.
     * @example
     * // Update many AIDatasets
     * const aIDataset = await prisma.aIDataset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIDatasets and only return the `id`
     * const aIDatasetWithIdOnly = await prisma.aIDataset.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIDatasetUpdateManyAndReturnArgs>(args: SelectSubset<T, AIDatasetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIDataset.
     * @param {AIDatasetUpsertArgs} args - Arguments to update or create a AIDataset.
     * @example
     * // Update or create a AIDataset
     * const aIDataset = await prisma.aIDataset.upsert({
     *   create: {
     *     // ... data to create a AIDataset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIDataset we want to update
     *   }
     * })
     */
    upsert<T extends AIDatasetUpsertArgs>(args: SelectSubset<T, AIDatasetUpsertArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIDatasets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetCountArgs} args - Arguments to filter AIDatasets to count.
     * @example
     * // Count the number of AIDatasets
     * const count = await prisma.aIDataset.count({
     *   where: {
     *     // ... the filter for the AIDatasets we want to count
     *   }
     * })
    **/
    count<T extends AIDatasetCountArgs>(
      args?: Subset<T, AIDatasetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIDatasetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIDataset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIDatasetAggregateArgs>(args: Subset<T, AIDatasetAggregateArgs>): Prisma.PrismaPromise<GetAIDatasetAggregateType<T>>

    /**
     * Group by AIDataset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetGroupByArgs} args - Group by arguments.
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
      T extends AIDatasetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIDatasetGroupByArgs['orderBy'] }
        : { orderBy?: AIDatasetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIDatasetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIDatasetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIDataset model
   */
  readonly fields: AIDatasetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIDataset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIDatasetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    versions<T extends AIDataset$versionsArgs<ExtArgs> = {}>(args?: Subset<T, AIDataset$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    records<T extends AIDataset$recordsArgs<ExtArgs> = {}>(args?: Subset<T, AIDataset$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends AIDataset$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, AIDataset$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the AIDataset model
   */
  interface AIDatasetFieldRefs {
    readonly id: FieldRef<"AIDataset", 'String'>
    readonly tenantId: FieldRef<"AIDataset", 'String'>
    readonly name: FieldRef<"AIDataset", 'String'>
    readonly description: FieldRef<"AIDataset", 'String'>
    readonly type: FieldRef<"AIDataset", 'AIDatasetType'>
    readonly tags: FieldRef<"AIDataset", 'String[]'>
    readonly createdByUserId: FieldRef<"AIDataset", 'String'>
    readonly createdAt: FieldRef<"AIDataset", 'DateTime'>
    readonly updatedAt: FieldRef<"AIDataset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIDataset findUnique
   */
  export type AIDatasetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * Filter, which AIDataset to fetch.
     */
    where: AIDatasetWhereUniqueInput
  }

  /**
   * AIDataset findUniqueOrThrow
   */
  export type AIDatasetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * Filter, which AIDataset to fetch.
     */
    where: AIDatasetWhereUniqueInput
  }

  /**
   * AIDataset findFirst
   */
  export type AIDatasetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * Filter, which AIDataset to fetch.
     */
    where?: AIDatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasets to fetch.
     */
    orderBy?: AIDatasetOrderByWithRelationInput | AIDatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasets.
     */
    cursor?: AIDatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasets.
     */
    distinct?: AIDatasetScalarFieldEnum | AIDatasetScalarFieldEnum[]
  }

  /**
   * AIDataset findFirstOrThrow
   */
  export type AIDatasetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * Filter, which AIDataset to fetch.
     */
    where?: AIDatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasets to fetch.
     */
    orderBy?: AIDatasetOrderByWithRelationInput | AIDatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasets.
     */
    cursor?: AIDatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasets.
     */
    distinct?: AIDatasetScalarFieldEnum | AIDatasetScalarFieldEnum[]
  }

  /**
   * AIDataset findMany
   */
  export type AIDatasetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasets to fetch.
     */
    where?: AIDatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasets to fetch.
     */
    orderBy?: AIDatasetOrderByWithRelationInput | AIDatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIDatasets.
     */
    cursor?: AIDatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasets.
     */
    skip?: number
    distinct?: AIDatasetScalarFieldEnum | AIDatasetScalarFieldEnum[]
  }

  /**
   * AIDataset create
   */
  export type AIDatasetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * The data needed to create a AIDataset.
     */
    data: XOR<AIDatasetCreateInput, AIDatasetUncheckedCreateInput>
  }

  /**
   * AIDataset createMany
   */
  export type AIDatasetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIDatasets.
     */
    data: AIDatasetCreateManyInput | AIDatasetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDataset createManyAndReturn
   */
  export type AIDatasetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * The data used to create many AIDatasets.
     */
    data: AIDatasetCreateManyInput | AIDatasetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDataset update
   */
  export type AIDatasetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * The data needed to update a AIDataset.
     */
    data: XOR<AIDatasetUpdateInput, AIDatasetUncheckedUpdateInput>
    /**
     * Choose, which AIDataset to update.
     */
    where: AIDatasetWhereUniqueInput
  }

  /**
   * AIDataset updateMany
   */
  export type AIDatasetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIDatasets.
     */
    data: XOR<AIDatasetUpdateManyMutationInput, AIDatasetUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasets to update
     */
    where?: AIDatasetWhereInput
    /**
     * Limit how many AIDatasets to update.
     */
    limit?: number
  }

  /**
   * AIDataset updateManyAndReturn
   */
  export type AIDatasetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * The data used to update AIDatasets.
     */
    data: XOR<AIDatasetUpdateManyMutationInput, AIDatasetUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasets to update
     */
    where?: AIDatasetWhereInput
    /**
     * Limit how many AIDatasets to update.
     */
    limit?: number
  }

  /**
   * AIDataset upsert
   */
  export type AIDatasetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * The filter to search for the AIDataset to update in case it exists.
     */
    where: AIDatasetWhereUniqueInput
    /**
     * In case the AIDataset found by the `where` argument doesn't exist, create a new AIDataset with this data.
     */
    create: XOR<AIDatasetCreateInput, AIDatasetUncheckedCreateInput>
    /**
     * In case the AIDataset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIDatasetUpdateInput, AIDatasetUncheckedUpdateInput>
  }

  /**
   * AIDataset delete
   */
  export type AIDatasetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
    /**
     * Filter which AIDataset to delete.
     */
    where: AIDatasetWhereUniqueInput
  }

  /**
   * AIDataset deleteMany
   */
  export type AIDatasetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasets to delete
     */
    where?: AIDatasetWhereInput
    /**
     * Limit how many AIDatasets to delete.
     */
    limit?: number
  }

  /**
   * AIDataset.versions
   */
  export type AIDataset$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    where?: AIDatasetVersionWhereInput
    orderBy?: AIDatasetVersionOrderByWithRelationInput | AIDatasetVersionOrderByWithRelationInput[]
    cursor?: AIDatasetVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIDatasetVersionScalarFieldEnum | AIDatasetVersionScalarFieldEnum[]
  }

  /**
   * AIDataset.records
   */
  export type AIDataset$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    where?: AIDatasetRecordWhereInput
    orderBy?: AIDatasetRecordOrderByWithRelationInput | AIDatasetRecordOrderByWithRelationInput[]
    cursor?: AIDatasetRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIDatasetRecordScalarFieldEnum | AIDatasetRecordScalarFieldEnum[]
  }

  /**
   * AIDataset.auditLogs
   */
  export type AIDataset$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    where?: AIDatasetAuditLogWhereInput
    orderBy?: AIDatasetAuditLogOrderByWithRelationInput | AIDatasetAuditLogOrderByWithRelationInput[]
    cursor?: AIDatasetAuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIDatasetAuditLogScalarFieldEnum | AIDatasetAuditLogScalarFieldEnum[]
  }

  /**
   * AIDataset without action
   */
  export type AIDatasetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDataset
     */
    select?: AIDatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDataset
     */
    omit?: AIDatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetInclude<ExtArgs> | null
  }


  /**
   * Model AIDatasetVersion
   */

  export type AggregateAIDatasetVersion = {
    _count: AIDatasetVersionCountAggregateOutputType | null
    _avg: AIDatasetVersionAvgAggregateOutputType | null
    _sum: AIDatasetVersionSumAggregateOutputType | null
    _min: AIDatasetVersionMinAggregateOutputType | null
    _max: AIDatasetVersionMaxAggregateOutputType | null
  }

  export type AIDatasetVersionAvgAggregateOutputType = {
    versionNumber: number | null
    recordCount: number | null
  }

  export type AIDatasetVersionSumAggregateOutputType = {
    versionNumber: number | null
    recordCount: number | null
  }

  export type AIDatasetVersionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    datasetId: string | null
    versionNumber: number | null
    recordCount: number | null
    embeddingModel: string | null
    createdByUserId: string | null
    createdAt: Date | null
  }

  export type AIDatasetVersionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    datasetId: string | null
    versionNumber: number | null
    recordCount: number | null
    embeddingModel: string | null
    createdByUserId: string | null
    createdAt: Date | null
  }

  export type AIDatasetVersionCountAggregateOutputType = {
    id: number
    tenantId: number
    datasetId: number
    versionNumber: number
    recordCount: number
    embeddingModel: number
    createdByUserId: number
    createdAt: number
    _all: number
  }


  export type AIDatasetVersionAvgAggregateInputType = {
    versionNumber?: true
    recordCount?: true
  }

  export type AIDatasetVersionSumAggregateInputType = {
    versionNumber?: true
    recordCount?: true
  }

  export type AIDatasetVersionMinAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    versionNumber?: true
    recordCount?: true
    embeddingModel?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type AIDatasetVersionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    versionNumber?: true
    recordCount?: true
    embeddingModel?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type AIDatasetVersionCountAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    versionNumber?: true
    recordCount?: true
    embeddingModel?: true
    createdByUserId?: true
    createdAt?: true
    _all?: true
  }

  export type AIDatasetVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasetVersion to aggregate.
     */
    where?: AIDatasetVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetVersions to fetch.
     */
    orderBy?: AIDatasetVersionOrderByWithRelationInput | AIDatasetVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIDatasetVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIDatasetVersions
    **/
    _count?: true | AIDatasetVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIDatasetVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIDatasetVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIDatasetVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIDatasetVersionMaxAggregateInputType
  }

  export type GetAIDatasetVersionAggregateType<T extends AIDatasetVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateAIDatasetVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIDatasetVersion[P]>
      : GetScalarType<T[P], AggregateAIDatasetVersion[P]>
  }




  export type AIDatasetVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetVersionWhereInput
    orderBy?: AIDatasetVersionOrderByWithAggregationInput | AIDatasetVersionOrderByWithAggregationInput[]
    by: AIDatasetVersionScalarFieldEnum[] | AIDatasetVersionScalarFieldEnum
    having?: AIDatasetVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIDatasetVersionCountAggregateInputType | true
    _avg?: AIDatasetVersionAvgAggregateInputType
    _sum?: AIDatasetVersionSumAggregateInputType
    _min?: AIDatasetVersionMinAggregateInputType
    _max?: AIDatasetVersionMaxAggregateInputType
  }

  export type AIDatasetVersionGroupByOutputType = {
    id: string
    tenantId: string
    datasetId: string
    versionNumber: number
    recordCount: number
    embeddingModel: string | null
    createdByUserId: string
    createdAt: Date
    _count: AIDatasetVersionCountAggregateOutputType | null
    _avg: AIDatasetVersionAvgAggregateOutputType | null
    _sum: AIDatasetVersionSumAggregateOutputType | null
    _min: AIDatasetVersionMinAggregateOutputType | null
    _max: AIDatasetVersionMaxAggregateOutputType | null
  }

  type GetAIDatasetVersionGroupByPayload<T extends AIDatasetVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIDatasetVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIDatasetVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIDatasetVersionGroupByOutputType[P]>
            : GetScalarType<T[P], AIDatasetVersionGroupByOutputType[P]>
        }
      >
    >


  export type AIDatasetVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    versionNumber?: boolean
    recordCount?: boolean
    embeddingModel?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
    records?: boolean | AIDatasetVersion$recordsArgs<ExtArgs>
    _count?: boolean | AIDatasetVersionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetVersion"]>

  export type AIDatasetVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    versionNumber?: boolean
    recordCount?: boolean
    embeddingModel?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetVersion"]>

  export type AIDatasetVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    versionNumber?: boolean
    recordCount?: boolean
    embeddingModel?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetVersion"]>

  export type AIDatasetVersionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    versionNumber?: boolean
    recordCount?: boolean
    embeddingModel?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
  }

  export type AIDatasetVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "datasetId" | "versionNumber" | "recordCount" | "embeddingModel" | "createdByUserId" | "createdAt", ExtArgs["result"]["aIDatasetVersion"]>
  export type AIDatasetVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
    records?: boolean | AIDatasetVersion$recordsArgs<ExtArgs>
    _count?: boolean | AIDatasetVersionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AIDatasetVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }
  export type AIDatasetVersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }

  export type $AIDatasetVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIDatasetVersion"
    objects: {
      dataset: Prisma.$AIDatasetPayload<ExtArgs>
      records: Prisma.$AIDatasetRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      datasetId: string
      versionNumber: number
      recordCount: number
      embeddingModel: string | null
      createdByUserId: string
      createdAt: Date
    }, ExtArgs["result"]["aIDatasetVersion"]>
    composites: {}
  }

  type AIDatasetVersionGetPayload<S extends boolean | null | undefined | AIDatasetVersionDefaultArgs> = $Result.GetResult<Prisma.$AIDatasetVersionPayload, S>

  type AIDatasetVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIDatasetVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIDatasetVersionCountAggregateInputType | true
    }

  export interface AIDatasetVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIDatasetVersion'], meta: { name: 'AIDatasetVersion' } }
    /**
     * Find zero or one AIDatasetVersion that matches the filter.
     * @param {AIDatasetVersionFindUniqueArgs} args - Arguments to find a AIDatasetVersion
     * @example
     * // Get one AIDatasetVersion
     * const aIDatasetVersion = await prisma.aIDatasetVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIDatasetVersionFindUniqueArgs>(args: SelectSubset<T, AIDatasetVersionFindUniqueArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIDatasetVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIDatasetVersionFindUniqueOrThrowArgs} args - Arguments to find a AIDatasetVersion
     * @example
     * // Get one AIDatasetVersion
     * const aIDatasetVersion = await prisma.aIDatasetVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIDatasetVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, AIDatasetVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDatasetVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetVersionFindFirstArgs} args - Arguments to find a AIDatasetVersion
     * @example
     * // Get one AIDatasetVersion
     * const aIDatasetVersion = await prisma.aIDatasetVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIDatasetVersionFindFirstArgs>(args?: SelectSubset<T, AIDatasetVersionFindFirstArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDatasetVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetVersionFindFirstOrThrowArgs} args - Arguments to find a AIDatasetVersion
     * @example
     * // Get one AIDatasetVersion
     * const aIDatasetVersion = await prisma.aIDatasetVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIDatasetVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, AIDatasetVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIDatasetVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIDatasetVersions
     * const aIDatasetVersions = await prisma.aIDatasetVersion.findMany()
     * 
     * // Get first 10 AIDatasetVersions
     * const aIDatasetVersions = await prisma.aIDatasetVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIDatasetVersionWithIdOnly = await prisma.aIDatasetVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIDatasetVersionFindManyArgs>(args?: SelectSubset<T, AIDatasetVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIDatasetVersion.
     * @param {AIDatasetVersionCreateArgs} args - Arguments to create a AIDatasetVersion.
     * @example
     * // Create one AIDatasetVersion
     * const AIDatasetVersion = await prisma.aIDatasetVersion.create({
     *   data: {
     *     // ... data to create a AIDatasetVersion
     *   }
     * })
     * 
     */
    create<T extends AIDatasetVersionCreateArgs>(args: SelectSubset<T, AIDatasetVersionCreateArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIDatasetVersions.
     * @param {AIDatasetVersionCreateManyArgs} args - Arguments to create many AIDatasetVersions.
     * @example
     * // Create many AIDatasetVersions
     * const aIDatasetVersion = await prisma.aIDatasetVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIDatasetVersionCreateManyArgs>(args?: SelectSubset<T, AIDatasetVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIDatasetVersions and returns the data saved in the database.
     * @param {AIDatasetVersionCreateManyAndReturnArgs} args - Arguments to create many AIDatasetVersions.
     * @example
     * // Create many AIDatasetVersions
     * const aIDatasetVersion = await prisma.aIDatasetVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIDatasetVersions and only return the `id`
     * const aIDatasetVersionWithIdOnly = await prisma.aIDatasetVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIDatasetVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, AIDatasetVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIDatasetVersion.
     * @param {AIDatasetVersionDeleteArgs} args - Arguments to delete one AIDatasetVersion.
     * @example
     * // Delete one AIDatasetVersion
     * const AIDatasetVersion = await prisma.aIDatasetVersion.delete({
     *   where: {
     *     // ... filter to delete one AIDatasetVersion
     *   }
     * })
     * 
     */
    delete<T extends AIDatasetVersionDeleteArgs>(args: SelectSubset<T, AIDatasetVersionDeleteArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIDatasetVersion.
     * @param {AIDatasetVersionUpdateArgs} args - Arguments to update one AIDatasetVersion.
     * @example
     * // Update one AIDatasetVersion
     * const aIDatasetVersion = await prisma.aIDatasetVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIDatasetVersionUpdateArgs>(args: SelectSubset<T, AIDatasetVersionUpdateArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIDatasetVersions.
     * @param {AIDatasetVersionDeleteManyArgs} args - Arguments to filter AIDatasetVersions to delete.
     * @example
     * // Delete a few AIDatasetVersions
     * const { count } = await prisma.aIDatasetVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIDatasetVersionDeleteManyArgs>(args?: SelectSubset<T, AIDatasetVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasetVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIDatasetVersions
     * const aIDatasetVersion = await prisma.aIDatasetVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIDatasetVersionUpdateManyArgs>(args: SelectSubset<T, AIDatasetVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasetVersions and returns the data updated in the database.
     * @param {AIDatasetVersionUpdateManyAndReturnArgs} args - Arguments to update many AIDatasetVersions.
     * @example
     * // Update many AIDatasetVersions
     * const aIDatasetVersion = await prisma.aIDatasetVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIDatasetVersions and only return the `id`
     * const aIDatasetVersionWithIdOnly = await prisma.aIDatasetVersion.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIDatasetVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, AIDatasetVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIDatasetVersion.
     * @param {AIDatasetVersionUpsertArgs} args - Arguments to update or create a AIDatasetVersion.
     * @example
     * // Update or create a AIDatasetVersion
     * const aIDatasetVersion = await prisma.aIDatasetVersion.upsert({
     *   create: {
     *     // ... data to create a AIDatasetVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIDatasetVersion we want to update
     *   }
     * })
     */
    upsert<T extends AIDatasetVersionUpsertArgs>(args: SelectSubset<T, AIDatasetVersionUpsertArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIDatasetVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetVersionCountArgs} args - Arguments to filter AIDatasetVersions to count.
     * @example
     * // Count the number of AIDatasetVersions
     * const count = await prisma.aIDatasetVersion.count({
     *   where: {
     *     // ... the filter for the AIDatasetVersions we want to count
     *   }
     * })
    **/
    count<T extends AIDatasetVersionCountArgs>(
      args?: Subset<T, AIDatasetVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIDatasetVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIDatasetVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIDatasetVersionAggregateArgs>(args: Subset<T, AIDatasetVersionAggregateArgs>): Prisma.PrismaPromise<GetAIDatasetVersionAggregateType<T>>

    /**
     * Group by AIDatasetVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetVersionGroupByArgs} args - Group by arguments.
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
      T extends AIDatasetVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIDatasetVersionGroupByArgs['orderBy'] }
        : { orderBy?: AIDatasetVersionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIDatasetVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIDatasetVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIDatasetVersion model
   */
  readonly fields: AIDatasetVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIDatasetVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIDatasetVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dataset<T extends AIDatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AIDatasetDefaultArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    records<T extends AIDatasetVersion$recordsArgs<ExtArgs> = {}>(args?: Subset<T, AIDatasetVersion$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the AIDatasetVersion model
   */
  interface AIDatasetVersionFieldRefs {
    readonly id: FieldRef<"AIDatasetVersion", 'String'>
    readonly tenantId: FieldRef<"AIDatasetVersion", 'String'>
    readonly datasetId: FieldRef<"AIDatasetVersion", 'String'>
    readonly versionNumber: FieldRef<"AIDatasetVersion", 'Int'>
    readonly recordCount: FieldRef<"AIDatasetVersion", 'Int'>
    readonly embeddingModel: FieldRef<"AIDatasetVersion", 'String'>
    readonly createdByUserId: FieldRef<"AIDatasetVersion", 'String'>
    readonly createdAt: FieldRef<"AIDatasetVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIDatasetVersion findUnique
   */
  export type AIDatasetVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetVersion to fetch.
     */
    where: AIDatasetVersionWhereUniqueInput
  }

  /**
   * AIDatasetVersion findUniqueOrThrow
   */
  export type AIDatasetVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetVersion to fetch.
     */
    where: AIDatasetVersionWhereUniqueInput
  }

  /**
   * AIDatasetVersion findFirst
   */
  export type AIDatasetVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetVersion to fetch.
     */
    where?: AIDatasetVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetVersions to fetch.
     */
    orderBy?: AIDatasetVersionOrderByWithRelationInput | AIDatasetVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasetVersions.
     */
    cursor?: AIDatasetVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasetVersions.
     */
    distinct?: AIDatasetVersionScalarFieldEnum | AIDatasetVersionScalarFieldEnum[]
  }

  /**
   * AIDatasetVersion findFirstOrThrow
   */
  export type AIDatasetVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetVersion to fetch.
     */
    where?: AIDatasetVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetVersions to fetch.
     */
    orderBy?: AIDatasetVersionOrderByWithRelationInput | AIDatasetVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasetVersions.
     */
    cursor?: AIDatasetVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasetVersions.
     */
    distinct?: AIDatasetVersionScalarFieldEnum | AIDatasetVersionScalarFieldEnum[]
  }

  /**
   * AIDatasetVersion findMany
   */
  export type AIDatasetVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetVersions to fetch.
     */
    where?: AIDatasetVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetVersions to fetch.
     */
    orderBy?: AIDatasetVersionOrderByWithRelationInput | AIDatasetVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIDatasetVersions.
     */
    cursor?: AIDatasetVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetVersions.
     */
    skip?: number
    distinct?: AIDatasetVersionScalarFieldEnum | AIDatasetVersionScalarFieldEnum[]
  }

  /**
   * AIDatasetVersion create
   */
  export type AIDatasetVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a AIDatasetVersion.
     */
    data: XOR<AIDatasetVersionCreateInput, AIDatasetVersionUncheckedCreateInput>
  }

  /**
   * AIDatasetVersion createMany
   */
  export type AIDatasetVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIDatasetVersions.
     */
    data: AIDatasetVersionCreateManyInput | AIDatasetVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDatasetVersion createManyAndReturn
   */
  export type AIDatasetVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * The data used to create many AIDatasetVersions.
     */
    data: AIDatasetVersionCreateManyInput | AIDatasetVersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIDatasetVersion update
   */
  export type AIDatasetVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a AIDatasetVersion.
     */
    data: XOR<AIDatasetVersionUpdateInput, AIDatasetVersionUncheckedUpdateInput>
    /**
     * Choose, which AIDatasetVersion to update.
     */
    where: AIDatasetVersionWhereUniqueInput
  }

  /**
   * AIDatasetVersion updateMany
   */
  export type AIDatasetVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIDatasetVersions.
     */
    data: XOR<AIDatasetVersionUpdateManyMutationInput, AIDatasetVersionUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasetVersions to update
     */
    where?: AIDatasetVersionWhereInput
    /**
     * Limit how many AIDatasetVersions to update.
     */
    limit?: number
  }

  /**
   * AIDatasetVersion updateManyAndReturn
   */
  export type AIDatasetVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * The data used to update AIDatasetVersions.
     */
    data: XOR<AIDatasetVersionUpdateManyMutationInput, AIDatasetVersionUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasetVersions to update
     */
    where?: AIDatasetVersionWhereInput
    /**
     * Limit how many AIDatasetVersions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIDatasetVersion upsert
   */
  export type AIDatasetVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the AIDatasetVersion to update in case it exists.
     */
    where: AIDatasetVersionWhereUniqueInput
    /**
     * In case the AIDatasetVersion found by the `where` argument doesn't exist, create a new AIDatasetVersion with this data.
     */
    create: XOR<AIDatasetVersionCreateInput, AIDatasetVersionUncheckedCreateInput>
    /**
     * In case the AIDatasetVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIDatasetVersionUpdateInput, AIDatasetVersionUncheckedUpdateInput>
  }

  /**
   * AIDatasetVersion delete
   */
  export type AIDatasetVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
    /**
     * Filter which AIDatasetVersion to delete.
     */
    where: AIDatasetVersionWhereUniqueInput
  }

  /**
   * AIDatasetVersion deleteMany
   */
  export type AIDatasetVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasetVersions to delete
     */
    where?: AIDatasetVersionWhereInput
    /**
     * Limit how many AIDatasetVersions to delete.
     */
    limit?: number
  }

  /**
   * AIDatasetVersion.records
   */
  export type AIDatasetVersion$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    where?: AIDatasetRecordWhereInput
    orderBy?: AIDatasetRecordOrderByWithRelationInput | AIDatasetRecordOrderByWithRelationInput[]
    cursor?: AIDatasetRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIDatasetRecordScalarFieldEnum | AIDatasetRecordScalarFieldEnum[]
  }

  /**
   * AIDatasetVersion without action
   */
  export type AIDatasetVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetVersion
     */
    select?: AIDatasetVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetVersion
     */
    omit?: AIDatasetVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetVersionInclude<ExtArgs> | null
  }


  /**
   * Model AIDatasetRecord
   */

  export type AggregateAIDatasetRecord = {
    _count: AIDatasetRecordCountAggregateOutputType | null
    _min: AIDatasetRecordMinAggregateOutputType | null
    _max: AIDatasetRecordMaxAggregateOutputType | null
  }

  export type AIDatasetRecordMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    datasetId: string | null
    versionId: string | null
    createdAt: Date | null
  }

  export type AIDatasetRecordMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    datasetId: string | null
    versionId: string | null
    createdAt: Date | null
  }

  export type AIDatasetRecordCountAggregateOutputType = {
    id: number
    tenantId: number
    datasetId: number
    versionId: number
    input: number
    output: number
    metadata: number
    embedding: number
    createdAt: number
    _all: number
  }


  export type AIDatasetRecordMinAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    versionId?: true
    createdAt?: true
  }

  export type AIDatasetRecordMaxAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    versionId?: true
    createdAt?: true
  }

  export type AIDatasetRecordCountAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    versionId?: true
    input?: true
    output?: true
    metadata?: true
    embedding?: true
    createdAt?: true
    _all?: true
  }

  export type AIDatasetRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasetRecord to aggregate.
     */
    where?: AIDatasetRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetRecords to fetch.
     */
    orderBy?: AIDatasetRecordOrderByWithRelationInput | AIDatasetRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIDatasetRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIDatasetRecords
    **/
    _count?: true | AIDatasetRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIDatasetRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIDatasetRecordMaxAggregateInputType
  }

  export type GetAIDatasetRecordAggregateType<T extends AIDatasetRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAIDatasetRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIDatasetRecord[P]>
      : GetScalarType<T[P], AggregateAIDatasetRecord[P]>
  }




  export type AIDatasetRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetRecordWhereInput
    orderBy?: AIDatasetRecordOrderByWithAggregationInput | AIDatasetRecordOrderByWithAggregationInput[]
    by: AIDatasetRecordScalarFieldEnum[] | AIDatasetRecordScalarFieldEnum
    having?: AIDatasetRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIDatasetRecordCountAggregateInputType | true
    _min?: AIDatasetRecordMinAggregateInputType
    _max?: AIDatasetRecordMaxAggregateInputType
  }

  export type AIDatasetRecordGroupByOutputType = {
    id: string
    tenantId: string
    datasetId: string
    versionId: string
    input: JsonValue
    output: JsonValue | null
    metadata: JsonValue
    embedding: JsonValue | null
    createdAt: Date
    _count: AIDatasetRecordCountAggregateOutputType | null
    _min: AIDatasetRecordMinAggregateOutputType | null
    _max: AIDatasetRecordMaxAggregateOutputType | null
  }

  type GetAIDatasetRecordGroupByPayload<T extends AIDatasetRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIDatasetRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIDatasetRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIDatasetRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AIDatasetRecordGroupByOutputType[P]>
        }
      >
    >


  export type AIDatasetRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    versionId?: boolean
    input?: boolean
    output?: boolean
    metadata?: boolean
    embedding?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
    version?: boolean | AIDatasetVersionDefaultArgs<ExtArgs>
    labels?: boolean | AIDatasetRecord$labelsArgs<ExtArgs>
    _count?: boolean | AIDatasetRecordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetRecord"]>

  export type AIDatasetRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    versionId?: boolean
    input?: boolean
    output?: boolean
    metadata?: boolean
    embedding?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
    version?: boolean | AIDatasetVersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetRecord"]>

  export type AIDatasetRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    versionId?: boolean
    input?: boolean
    output?: boolean
    metadata?: boolean
    embedding?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
    version?: boolean | AIDatasetVersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetRecord"]>

  export type AIDatasetRecordSelectScalar = {
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    versionId?: boolean
    input?: boolean
    output?: boolean
    metadata?: boolean
    embedding?: boolean
    createdAt?: boolean
  }

  export type AIDatasetRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "datasetId" | "versionId" | "input" | "output" | "metadata" | "embedding" | "createdAt", ExtArgs["result"]["aIDatasetRecord"]>
  export type AIDatasetRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
    version?: boolean | AIDatasetVersionDefaultArgs<ExtArgs>
    labels?: boolean | AIDatasetRecord$labelsArgs<ExtArgs>
    _count?: boolean | AIDatasetRecordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AIDatasetRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
    version?: boolean | AIDatasetVersionDefaultArgs<ExtArgs>
  }
  export type AIDatasetRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
    version?: boolean | AIDatasetVersionDefaultArgs<ExtArgs>
  }

  export type $AIDatasetRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIDatasetRecord"
    objects: {
      dataset: Prisma.$AIDatasetPayload<ExtArgs>
      version: Prisma.$AIDatasetVersionPayload<ExtArgs>
      labels: Prisma.$AIDatasetLabelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      datasetId: string
      versionId: string
      input: Prisma.JsonValue
      output: Prisma.JsonValue | null
      metadata: Prisma.JsonValue
      embedding: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["aIDatasetRecord"]>
    composites: {}
  }

  type AIDatasetRecordGetPayload<S extends boolean | null | undefined | AIDatasetRecordDefaultArgs> = $Result.GetResult<Prisma.$AIDatasetRecordPayload, S>

  type AIDatasetRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIDatasetRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIDatasetRecordCountAggregateInputType | true
    }

  export interface AIDatasetRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIDatasetRecord'], meta: { name: 'AIDatasetRecord' } }
    /**
     * Find zero or one AIDatasetRecord that matches the filter.
     * @param {AIDatasetRecordFindUniqueArgs} args - Arguments to find a AIDatasetRecord
     * @example
     * // Get one AIDatasetRecord
     * const aIDatasetRecord = await prisma.aIDatasetRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIDatasetRecordFindUniqueArgs>(args: SelectSubset<T, AIDatasetRecordFindUniqueArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIDatasetRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIDatasetRecordFindUniqueOrThrowArgs} args - Arguments to find a AIDatasetRecord
     * @example
     * // Get one AIDatasetRecord
     * const aIDatasetRecord = await prisma.aIDatasetRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIDatasetRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AIDatasetRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDatasetRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetRecordFindFirstArgs} args - Arguments to find a AIDatasetRecord
     * @example
     * // Get one AIDatasetRecord
     * const aIDatasetRecord = await prisma.aIDatasetRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIDatasetRecordFindFirstArgs>(args?: SelectSubset<T, AIDatasetRecordFindFirstArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDatasetRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetRecordFindFirstOrThrowArgs} args - Arguments to find a AIDatasetRecord
     * @example
     * // Get one AIDatasetRecord
     * const aIDatasetRecord = await prisma.aIDatasetRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIDatasetRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AIDatasetRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIDatasetRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIDatasetRecords
     * const aIDatasetRecords = await prisma.aIDatasetRecord.findMany()
     * 
     * // Get first 10 AIDatasetRecords
     * const aIDatasetRecords = await prisma.aIDatasetRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIDatasetRecordWithIdOnly = await prisma.aIDatasetRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIDatasetRecordFindManyArgs>(args?: SelectSubset<T, AIDatasetRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIDatasetRecord.
     * @param {AIDatasetRecordCreateArgs} args - Arguments to create a AIDatasetRecord.
     * @example
     * // Create one AIDatasetRecord
     * const AIDatasetRecord = await prisma.aIDatasetRecord.create({
     *   data: {
     *     // ... data to create a AIDatasetRecord
     *   }
     * })
     * 
     */
    create<T extends AIDatasetRecordCreateArgs>(args: SelectSubset<T, AIDatasetRecordCreateArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIDatasetRecords.
     * @param {AIDatasetRecordCreateManyArgs} args - Arguments to create many AIDatasetRecords.
     * @example
     * // Create many AIDatasetRecords
     * const aIDatasetRecord = await prisma.aIDatasetRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIDatasetRecordCreateManyArgs>(args?: SelectSubset<T, AIDatasetRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIDatasetRecords and returns the data saved in the database.
     * @param {AIDatasetRecordCreateManyAndReturnArgs} args - Arguments to create many AIDatasetRecords.
     * @example
     * // Create many AIDatasetRecords
     * const aIDatasetRecord = await prisma.aIDatasetRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIDatasetRecords and only return the `id`
     * const aIDatasetRecordWithIdOnly = await prisma.aIDatasetRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIDatasetRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, AIDatasetRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIDatasetRecord.
     * @param {AIDatasetRecordDeleteArgs} args - Arguments to delete one AIDatasetRecord.
     * @example
     * // Delete one AIDatasetRecord
     * const AIDatasetRecord = await prisma.aIDatasetRecord.delete({
     *   where: {
     *     // ... filter to delete one AIDatasetRecord
     *   }
     * })
     * 
     */
    delete<T extends AIDatasetRecordDeleteArgs>(args: SelectSubset<T, AIDatasetRecordDeleteArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIDatasetRecord.
     * @param {AIDatasetRecordUpdateArgs} args - Arguments to update one AIDatasetRecord.
     * @example
     * // Update one AIDatasetRecord
     * const aIDatasetRecord = await prisma.aIDatasetRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIDatasetRecordUpdateArgs>(args: SelectSubset<T, AIDatasetRecordUpdateArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIDatasetRecords.
     * @param {AIDatasetRecordDeleteManyArgs} args - Arguments to filter AIDatasetRecords to delete.
     * @example
     * // Delete a few AIDatasetRecords
     * const { count } = await prisma.aIDatasetRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIDatasetRecordDeleteManyArgs>(args?: SelectSubset<T, AIDatasetRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasetRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIDatasetRecords
     * const aIDatasetRecord = await prisma.aIDatasetRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIDatasetRecordUpdateManyArgs>(args: SelectSubset<T, AIDatasetRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasetRecords and returns the data updated in the database.
     * @param {AIDatasetRecordUpdateManyAndReturnArgs} args - Arguments to update many AIDatasetRecords.
     * @example
     * // Update many AIDatasetRecords
     * const aIDatasetRecord = await prisma.aIDatasetRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIDatasetRecords and only return the `id`
     * const aIDatasetRecordWithIdOnly = await prisma.aIDatasetRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIDatasetRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, AIDatasetRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIDatasetRecord.
     * @param {AIDatasetRecordUpsertArgs} args - Arguments to update or create a AIDatasetRecord.
     * @example
     * // Update or create a AIDatasetRecord
     * const aIDatasetRecord = await prisma.aIDatasetRecord.upsert({
     *   create: {
     *     // ... data to create a AIDatasetRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIDatasetRecord we want to update
     *   }
     * })
     */
    upsert<T extends AIDatasetRecordUpsertArgs>(args: SelectSubset<T, AIDatasetRecordUpsertArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIDatasetRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetRecordCountArgs} args - Arguments to filter AIDatasetRecords to count.
     * @example
     * // Count the number of AIDatasetRecords
     * const count = await prisma.aIDatasetRecord.count({
     *   where: {
     *     // ... the filter for the AIDatasetRecords we want to count
     *   }
     * })
    **/
    count<T extends AIDatasetRecordCountArgs>(
      args?: Subset<T, AIDatasetRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIDatasetRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIDatasetRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIDatasetRecordAggregateArgs>(args: Subset<T, AIDatasetRecordAggregateArgs>): Prisma.PrismaPromise<GetAIDatasetRecordAggregateType<T>>

    /**
     * Group by AIDatasetRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetRecordGroupByArgs} args - Group by arguments.
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
      T extends AIDatasetRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIDatasetRecordGroupByArgs['orderBy'] }
        : { orderBy?: AIDatasetRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIDatasetRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIDatasetRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIDatasetRecord model
   */
  readonly fields: AIDatasetRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIDatasetRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIDatasetRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dataset<T extends AIDatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AIDatasetDefaultArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    version<T extends AIDatasetVersionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AIDatasetVersionDefaultArgs<ExtArgs>>): Prisma__AIDatasetVersionClient<$Result.GetResult<Prisma.$AIDatasetVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    labels<T extends AIDatasetRecord$labelsArgs<ExtArgs> = {}>(args?: Subset<T, AIDatasetRecord$labelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the AIDatasetRecord model
   */
  interface AIDatasetRecordFieldRefs {
    readonly id: FieldRef<"AIDatasetRecord", 'String'>
    readonly tenantId: FieldRef<"AIDatasetRecord", 'String'>
    readonly datasetId: FieldRef<"AIDatasetRecord", 'String'>
    readonly versionId: FieldRef<"AIDatasetRecord", 'String'>
    readonly input: FieldRef<"AIDatasetRecord", 'Json'>
    readonly output: FieldRef<"AIDatasetRecord", 'Json'>
    readonly metadata: FieldRef<"AIDatasetRecord", 'Json'>
    readonly embedding: FieldRef<"AIDatasetRecord", 'Json'>
    readonly createdAt: FieldRef<"AIDatasetRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIDatasetRecord findUnique
   */
  export type AIDatasetRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetRecord to fetch.
     */
    where: AIDatasetRecordWhereUniqueInput
  }

  /**
   * AIDatasetRecord findUniqueOrThrow
   */
  export type AIDatasetRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetRecord to fetch.
     */
    where: AIDatasetRecordWhereUniqueInput
  }

  /**
   * AIDatasetRecord findFirst
   */
  export type AIDatasetRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetRecord to fetch.
     */
    where?: AIDatasetRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetRecords to fetch.
     */
    orderBy?: AIDatasetRecordOrderByWithRelationInput | AIDatasetRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasetRecords.
     */
    cursor?: AIDatasetRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasetRecords.
     */
    distinct?: AIDatasetRecordScalarFieldEnum | AIDatasetRecordScalarFieldEnum[]
  }

  /**
   * AIDatasetRecord findFirstOrThrow
   */
  export type AIDatasetRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetRecord to fetch.
     */
    where?: AIDatasetRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetRecords to fetch.
     */
    orderBy?: AIDatasetRecordOrderByWithRelationInput | AIDatasetRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasetRecords.
     */
    cursor?: AIDatasetRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasetRecords.
     */
    distinct?: AIDatasetRecordScalarFieldEnum | AIDatasetRecordScalarFieldEnum[]
  }

  /**
   * AIDatasetRecord findMany
   */
  export type AIDatasetRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetRecords to fetch.
     */
    where?: AIDatasetRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetRecords to fetch.
     */
    orderBy?: AIDatasetRecordOrderByWithRelationInput | AIDatasetRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIDatasetRecords.
     */
    cursor?: AIDatasetRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetRecords.
     */
    skip?: number
    distinct?: AIDatasetRecordScalarFieldEnum | AIDatasetRecordScalarFieldEnum[]
  }

  /**
   * AIDatasetRecord create
   */
  export type AIDatasetRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a AIDatasetRecord.
     */
    data: XOR<AIDatasetRecordCreateInput, AIDatasetRecordUncheckedCreateInput>
  }

  /**
   * AIDatasetRecord createMany
   */
  export type AIDatasetRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIDatasetRecords.
     */
    data: AIDatasetRecordCreateManyInput | AIDatasetRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDatasetRecord createManyAndReturn
   */
  export type AIDatasetRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * The data used to create many AIDatasetRecords.
     */
    data: AIDatasetRecordCreateManyInput | AIDatasetRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIDatasetRecord update
   */
  export type AIDatasetRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a AIDatasetRecord.
     */
    data: XOR<AIDatasetRecordUpdateInput, AIDatasetRecordUncheckedUpdateInput>
    /**
     * Choose, which AIDatasetRecord to update.
     */
    where: AIDatasetRecordWhereUniqueInput
  }

  /**
   * AIDatasetRecord updateMany
   */
  export type AIDatasetRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIDatasetRecords.
     */
    data: XOR<AIDatasetRecordUpdateManyMutationInput, AIDatasetRecordUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasetRecords to update
     */
    where?: AIDatasetRecordWhereInput
    /**
     * Limit how many AIDatasetRecords to update.
     */
    limit?: number
  }

  /**
   * AIDatasetRecord updateManyAndReturn
   */
  export type AIDatasetRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * The data used to update AIDatasetRecords.
     */
    data: XOR<AIDatasetRecordUpdateManyMutationInput, AIDatasetRecordUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasetRecords to update
     */
    where?: AIDatasetRecordWhereInput
    /**
     * Limit how many AIDatasetRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIDatasetRecord upsert
   */
  export type AIDatasetRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the AIDatasetRecord to update in case it exists.
     */
    where: AIDatasetRecordWhereUniqueInput
    /**
     * In case the AIDatasetRecord found by the `where` argument doesn't exist, create a new AIDatasetRecord with this data.
     */
    create: XOR<AIDatasetRecordCreateInput, AIDatasetRecordUncheckedCreateInput>
    /**
     * In case the AIDatasetRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIDatasetRecordUpdateInput, AIDatasetRecordUncheckedUpdateInput>
  }

  /**
   * AIDatasetRecord delete
   */
  export type AIDatasetRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
    /**
     * Filter which AIDatasetRecord to delete.
     */
    where: AIDatasetRecordWhereUniqueInput
  }

  /**
   * AIDatasetRecord deleteMany
   */
  export type AIDatasetRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasetRecords to delete
     */
    where?: AIDatasetRecordWhereInput
    /**
     * Limit how many AIDatasetRecords to delete.
     */
    limit?: number
  }

  /**
   * AIDatasetRecord.labels
   */
  export type AIDatasetRecord$labelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    where?: AIDatasetLabelWhereInput
    orderBy?: AIDatasetLabelOrderByWithRelationInput | AIDatasetLabelOrderByWithRelationInput[]
    cursor?: AIDatasetLabelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIDatasetLabelScalarFieldEnum | AIDatasetLabelScalarFieldEnum[]
  }

  /**
   * AIDatasetRecord without action
   */
  export type AIDatasetRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetRecord
     */
    select?: AIDatasetRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetRecord
     */
    omit?: AIDatasetRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetRecordInclude<ExtArgs> | null
  }


  /**
   * Model AIDatasetLabel
   */

  export type AggregateAIDatasetLabel = {
    _count: AIDatasetLabelCountAggregateOutputType | null
    _min: AIDatasetLabelMinAggregateOutputType | null
    _max: AIDatasetLabelMaxAggregateOutputType | null
  }

  export type AIDatasetLabelMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    recordId: string | null
    labelType: $Enums.AIDatasetLabelType | null
    createdByUserId: string | null
    createdAt: Date | null
  }

  export type AIDatasetLabelMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    recordId: string | null
    labelType: $Enums.AIDatasetLabelType | null
    createdByUserId: string | null
    createdAt: Date | null
  }

  export type AIDatasetLabelCountAggregateOutputType = {
    id: number
    tenantId: number
    recordId: number
    labelType: number
    labelValue: number
    createdByUserId: number
    createdAt: number
    _all: number
  }


  export type AIDatasetLabelMinAggregateInputType = {
    id?: true
    tenantId?: true
    recordId?: true
    labelType?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type AIDatasetLabelMaxAggregateInputType = {
    id?: true
    tenantId?: true
    recordId?: true
    labelType?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type AIDatasetLabelCountAggregateInputType = {
    id?: true
    tenantId?: true
    recordId?: true
    labelType?: true
    labelValue?: true
    createdByUserId?: true
    createdAt?: true
    _all?: true
  }

  export type AIDatasetLabelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasetLabel to aggregate.
     */
    where?: AIDatasetLabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetLabels to fetch.
     */
    orderBy?: AIDatasetLabelOrderByWithRelationInput | AIDatasetLabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIDatasetLabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetLabels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetLabels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIDatasetLabels
    **/
    _count?: true | AIDatasetLabelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIDatasetLabelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIDatasetLabelMaxAggregateInputType
  }

  export type GetAIDatasetLabelAggregateType<T extends AIDatasetLabelAggregateArgs> = {
        [P in keyof T & keyof AggregateAIDatasetLabel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIDatasetLabel[P]>
      : GetScalarType<T[P], AggregateAIDatasetLabel[P]>
  }




  export type AIDatasetLabelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetLabelWhereInput
    orderBy?: AIDatasetLabelOrderByWithAggregationInput | AIDatasetLabelOrderByWithAggregationInput[]
    by: AIDatasetLabelScalarFieldEnum[] | AIDatasetLabelScalarFieldEnum
    having?: AIDatasetLabelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIDatasetLabelCountAggregateInputType | true
    _min?: AIDatasetLabelMinAggregateInputType
    _max?: AIDatasetLabelMaxAggregateInputType
  }

  export type AIDatasetLabelGroupByOutputType = {
    id: string
    tenantId: string
    recordId: string
    labelType: $Enums.AIDatasetLabelType
    labelValue: JsonValue
    createdByUserId: string
    createdAt: Date
    _count: AIDatasetLabelCountAggregateOutputType | null
    _min: AIDatasetLabelMinAggregateOutputType | null
    _max: AIDatasetLabelMaxAggregateOutputType | null
  }

  type GetAIDatasetLabelGroupByPayload<T extends AIDatasetLabelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIDatasetLabelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIDatasetLabelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIDatasetLabelGroupByOutputType[P]>
            : GetScalarType<T[P], AIDatasetLabelGroupByOutputType[P]>
        }
      >
    >


  export type AIDatasetLabelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    recordId?: boolean
    labelType?: boolean
    labelValue?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    record?: boolean | AIDatasetRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetLabel"]>

  export type AIDatasetLabelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    recordId?: boolean
    labelType?: boolean
    labelValue?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    record?: boolean | AIDatasetRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetLabel"]>

  export type AIDatasetLabelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    recordId?: boolean
    labelType?: boolean
    labelValue?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    record?: boolean | AIDatasetRecordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetLabel"]>

  export type AIDatasetLabelSelectScalar = {
    id?: boolean
    tenantId?: boolean
    recordId?: boolean
    labelType?: boolean
    labelValue?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
  }

  export type AIDatasetLabelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "recordId" | "labelType" | "labelValue" | "createdByUserId" | "createdAt", ExtArgs["result"]["aIDatasetLabel"]>
  export type AIDatasetLabelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    record?: boolean | AIDatasetRecordDefaultArgs<ExtArgs>
  }
  export type AIDatasetLabelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    record?: boolean | AIDatasetRecordDefaultArgs<ExtArgs>
  }
  export type AIDatasetLabelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    record?: boolean | AIDatasetRecordDefaultArgs<ExtArgs>
  }

  export type $AIDatasetLabelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIDatasetLabel"
    objects: {
      record: Prisma.$AIDatasetRecordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      recordId: string
      labelType: $Enums.AIDatasetLabelType
      labelValue: Prisma.JsonValue
      createdByUserId: string
      createdAt: Date
    }, ExtArgs["result"]["aIDatasetLabel"]>
    composites: {}
  }

  type AIDatasetLabelGetPayload<S extends boolean | null | undefined | AIDatasetLabelDefaultArgs> = $Result.GetResult<Prisma.$AIDatasetLabelPayload, S>

  type AIDatasetLabelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIDatasetLabelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIDatasetLabelCountAggregateInputType | true
    }

  export interface AIDatasetLabelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIDatasetLabel'], meta: { name: 'AIDatasetLabel' } }
    /**
     * Find zero or one AIDatasetLabel that matches the filter.
     * @param {AIDatasetLabelFindUniqueArgs} args - Arguments to find a AIDatasetLabel
     * @example
     * // Get one AIDatasetLabel
     * const aIDatasetLabel = await prisma.aIDatasetLabel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIDatasetLabelFindUniqueArgs>(args: SelectSubset<T, AIDatasetLabelFindUniqueArgs<ExtArgs>>): Prisma__AIDatasetLabelClient<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIDatasetLabel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIDatasetLabelFindUniqueOrThrowArgs} args - Arguments to find a AIDatasetLabel
     * @example
     * // Get one AIDatasetLabel
     * const aIDatasetLabel = await prisma.aIDatasetLabel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIDatasetLabelFindUniqueOrThrowArgs>(args: SelectSubset<T, AIDatasetLabelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIDatasetLabelClient<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDatasetLabel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetLabelFindFirstArgs} args - Arguments to find a AIDatasetLabel
     * @example
     * // Get one AIDatasetLabel
     * const aIDatasetLabel = await prisma.aIDatasetLabel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIDatasetLabelFindFirstArgs>(args?: SelectSubset<T, AIDatasetLabelFindFirstArgs<ExtArgs>>): Prisma__AIDatasetLabelClient<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDatasetLabel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetLabelFindFirstOrThrowArgs} args - Arguments to find a AIDatasetLabel
     * @example
     * // Get one AIDatasetLabel
     * const aIDatasetLabel = await prisma.aIDatasetLabel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIDatasetLabelFindFirstOrThrowArgs>(args?: SelectSubset<T, AIDatasetLabelFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIDatasetLabelClient<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIDatasetLabels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetLabelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIDatasetLabels
     * const aIDatasetLabels = await prisma.aIDatasetLabel.findMany()
     * 
     * // Get first 10 AIDatasetLabels
     * const aIDatasetLabels = await prisma.aIDatasetLabel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIDatasetLabelWithIdOnly = await prisma.aIDatasetLabel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIDatasetLabelFindManyArgs>(args?: SelectSubset<T, AIDatasetLabelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIDatasetLabel.
     * @param {AIDatasetLabelCreateArgs} args - Arguments to create a AIDatasetLabel.
     * @example
     * // Create one AIDatasetLabel
     * const AIDatasetLabel = await prisma.aIDatasetLabel.create({
     *   data: {
     *     // ... data to create a AIDatasetLabel
     *   }
     * })
     * 
     */
    create<T extends AIDatasetLabelCreateArgs>(args: SelectSubset<T, AIDatasetLabelCreateArgs<ExtArgs>>): Prisma__AIDatasetLabelClient<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIDatasetLabels.
     * @param {AIDatasetLabelCreateManyArgs} args - Arguments to create many AIDatasetLabels.
     * @example
     * // Create many AIDatasetLabels
     * const aIDatasetLabel = await prisma.aIDatasetLabel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIDatasetLabelCreateManyArgs>(args?: SelectSubset<T, AIDatasetLabelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIDatasetLabels and returns the data saved in the database.
     * @param {AIDatasetLabelCreateManyAndReturnArgs} args - Arguments to create many AIDatasetLabels.
     * @example
     * // Create many AIDatasetLabels
     * const aIDatasetLabel = await prisma.aIDatasetLabel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIDatasetLabels and only return the `id`
     * const aIDatasetLabelWithIdOnly = await prisma.aIDatasetLabel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIDatasetLabelCreateManyAndReturnArgs>(args?: SelectSubset<T, AIDatasetLabelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIDatasetLabel.
     * @param {AIDatasetLabelDeleteArgs} args - Arguments to delete one AIDatasetLabel.
     * @example
     * // Delete one AIDatasetLabel
     * const AIDatasetLabel = await prisma.aIDatasetLabel.delete({
     *   where: {
     *     // ... filter to delete one AIDatasetLabel
     *   }
     * })
     * 
     */
    delete<T extends AIDatasetLabelDeleteArgs>(args: SelectSubset<T, AIDatasetLabelDeleteArgs<ExtArgs>>): Prisma__AIDatasetLabelClient<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIDatasetLabel.
     * @param {AIDatasetLabelUpdateArgs} args - Arguments to update one AIDatasetLabel.
     * @example
     * // Update one AIDatasetLabel
     * const aIDatasetLabel = await prisma.aIDatasetLabel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIDatasetLabelUpdateArgs>(args: SelectSubset<T, AIDatasetLabelUpdateArgs<ExtArgs>>): Prisma__AIDatasetLabelClient<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIDatasetLabels.
     * @param {AIDatasetLabelDeleteManyArgs} args - Arguments to filter AIDatasetLabels to delete.
     * @example
     * // Delete a few AIDatasetLabels
     * const { count } = await prisma.aIDatasetLabel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIDatasetLabelDeleteManyArgs>(args?: SelectSubset<T, AIDatasetLabelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasetLabels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetLabelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIDatasetLabels
     * const aIDatasetLabel = await prisma.aIDatasetLabel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIDatasetLabelUpdateManyArgs>(args: SelectSubset<T, AIDatasetLabelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasetLabels and returns the data updated in the database.
     * @param {AIDatasetLabelUpdateManyAndReturnArgs} args - Arguments to update many AIDatasetLabels.
     * @example
     * // Update many AIDatasetLabels
     * const aIDatasetLabel = await prisma.aIDatasetLabel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIDatasetLabels and only return the `id`
     * const aIDatasetLabelWithIdOnly = await prisma.aIDatasetLabel.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIDatasetLabelUpdateManyAndReturnArgs>(args: SelectSubset<T, AIDatasetLabelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIDatasetLabel.
     * @param {AIDatasetLabelUpsertArgs} args - Arguments to update or create a AIDatasetLabel.
     * @example
     * // Update or create a AIDatasetLabel
     * const aIDatasetLabel = await prisma.aIDatasetLabel.upsert({
     *   create: {
     *     // ... data to create a AIDatasetLabel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIDatasetLabel we want to update
     *   }
     * })
     */
    upsert<T extends AIDatasetLabelUpsertArgs>(args: SelectSubset<T, AIDatasetLabelUpsertArgs<ExtArgs>>): Prisma__AIDatasetLabelClient<$Result.GetResult<Prisma.$AIDatasetLabelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIDatasetLabels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetLabelCountArgs} args - Arguments to filter AIDatasetLabels to count.
     * @example
     * // Count the number of AIDatasetLabels
     * const count = await prisma.aIDatasetLabel.count({
     *   where: {
     *     // ... the filter for the AIDatasetLabels we want to count
     *   }
     * })
    **/
    count<T extends AIDatasetLabelCountArgs>(
      args?: Subset<T, AIDatasetLabelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIDatasetLabelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIDatasetLabel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetLabelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIDatasetLabelAggregateArgs>(args: Subset<T, AIDatasetLabelAggregateArgs>): Prisma.PrismaPromise<GetAIDatasetLabelAggregateType<T>>

    /**
     * Group by AIDatasetLabel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetLabelGroupByArgs} args - Group by arguments.
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
      T extends AIDatasetLabelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIDatasetLabelGroupByArgs['orderBy'] }
        : { orderBy?: AIDatasetLabelGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIDatasetLabelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIDatasetLabelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIDatasetLabel model
   */
  readonly fields: AIDatasetLabelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIDatasetLabel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIDatasetLabelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    record<T extends AIDatasetRecordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AIDatasetRecordDefaultArgs<ExtArgs>>): Prisma__AIDatasetRecordClient<$Result.GetResult<Prisma.$AIDatasetRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AIDatasetLabel model
   */
  interface AIDatasetLabelFieldRefs {
    readonly id: FieldRef<"AIDatasetLabel", 'String'>
    readonly tenantId: FieldRef<"AIDatasetLabel", 'String'>
    readonly recordId: FieldRef<"AIDatasetLabel", 'String'>
    readonly labelType: FieldRef<"AIDatasetLabel", 'AIDatasetLabelType'>
    readonly labelValue: FieldRef<"AIDatasetLabel", 'Json'>
    readonly createdByUserId: FieldRef<"AIDatasetLabel", 'String'>
    readonly createdAt: FieldRef<"AIDatasetLabel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIDatasetLabel findUnique
   */
  export type AIDatasetLabelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetLabel to fetch.
     */
    where: AIDatasetLabelWhereUniqueInput
  }

  /**
   * AIDatasetLabel findUniqueOrThrow
   */
  export type AIDatasetLabelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetLabel to fetch.
     */
    where: AIDatasetLabelWhereUniqueInput
  }

  /**
   * AIDatasetLabel findFirst
   */
  export type AIDatasetLabelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetLabel to fetch.
     */
    where?: AIDatasetLabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetLabels to fetch.
     */
    orderBy?: AIDatasetLabelOrderByWithRelationInput | AIDatasetLabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasetLabels.
     */
    cursor?: AIDatasetLabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetLabels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetLabels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasetLabels.
     */
    distinct?: AIDatasetLabelScalarFieldEnum | AIDatasetLabelScalarFieldEnum[]
  }

  /**
   * AIDatasetLabel findFirstOrThrow
   */
  export type AIDatasetLabelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetLabel to fetch.
     */
    where?: AIDatasetLabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetLabels to fetch.
     */
    orderBy?: AIDatasetLabelOrderByWithRelationInput | AIDatasetLabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasetLabels.
     */
    cursor?: AIDatasetLabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetLabels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetLabels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasetLabels.
     */
    distinct?: AIDatasetLabelScalarFieldEnum | AIDatasetLabelScalarFieldEnum[]
  }

  /**
   * AIDatasetLabel findMany
   */
  export type AIDatasetLabelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetLabels to fetch.
     */
    where?: AIDatasetLabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetLabels to fetch.
     */
    orderBy?: AIDatasetLabelOrderByWithRelationInput | AIDatasetLabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIDatasetLabels.
     */
    cursor?: AIDatasetLabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetLabels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetLabels.
     */
    skip?: number
    distinct?: AIDatasetLabelScalarFieldEnum | AIDatasetLabelScalarFieldEnum[]
  }

  /**
   * AIDatasetLabel create
   */
  export type AIDatasetLabelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * The data needed to create a AIDatasetLabel.
     */
    data: XOR<AIDatasetLabelCreateInput, AIDatasetLabelUncheckedCreateInput>
  }

  /**
   * AIDatasetLabel createMany
   */
  export type AIDatasetLabelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIDatasetLabels.
     */
    data: AIDatasetLabelCreateManyInput | AIDatasetLabelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDatasetLabel createManyAndReturn
   */
  export type AIDatasetLabelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * The data used to create many AIDatasetLabels.
     */
    data: AIDatasetLabelCreateManyInput | AIDatasetLabelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIDatasetLabel update
   */
  export type AIDatasetLabelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * The data needed to update a AIDatasetLabel.
     */
    data: XOR<AIDatasetLabelUpdateInput, AIDatasetLabelUncheckedUpdateInput>
    /**
     * Choose, which AIDatasetLabel to update.
     */
    where: AIDatasetLabelWhereUniqueInput
  }

  /**
   * AIDatasetLabel updateMany
   */
  export type AIDatasetLabelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIDatasetLabels.
     */
    data: XOR<AIDatasetLabelUpdateManyMutationInput, AIDatasetLabelUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasetLabels to update
     */
    where?: AIDatasetLabelWhereInput
    /**
     * Limit how many AIDatasetLabels to update.
     */
    limit?: number
  }

  /**
   * AIDatasetLabel updateManyAndReturn
   */
  export type AIDatasetLabelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * The data used to update AIDatasetLabels.
     */
    data: XOR<AIDatasetLabelUpdateManyMutationInput, AIDatasetLabelUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasetLabels to update
     */
    where?: AIDatasetLabelWhereInput
    /**
     * Limit how many AIDatasetLabels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIDatasetLabel upsert
   */
  export type AIDatasetLabelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * The filter to search for the AIDatasetLabel to update in case it exists.
     */
    where: AIDatasetLabelWhereUniqueInput
    /**
     * In case the AIDatasetLabel found by the `where` argument doesn't exist, create a new AIDatasetLabel with this data.
     */
    create: XOR<AIDatasetLabelCreateInput, AIDatasetLabelUncheckedCreateInput>
    /**
     * In case the AIDatasetLabel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIDatasetLabelUpdateInput, AIDatasetLabelUncheckedUpdateInput>
  }

  /**
   * AIDatasetLabel delete
   */
  export type AIDatasetLabelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
    /**
     * Filter which AIDatasetLabel to delete.
     */
    where: AIDatasetLabelWhereUniqueInput
  }

  /**
   * AIDatasetLabel deleteMany
   */
  export type AIDatasetLabelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasetLabels to delete
     */
    where?: AIDatasetLabelWhereInput
    /**
     * Limit how many AIDatasetLabels to delete.
     */
    limit?: number
  }

  /**
   * AIDatasetLabel without action
   */
  export type AIDatasetLabelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetLabel
     */
    select?: AIDatasetLabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetLabel
     */
    omit?: AIDatasetLabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetLabelInclude<ExtArgs> | null
  }


  /**
   * Model AIDatasetAuditLog
   */

  export type AggregateAIDatasetAuditLog = {
    _count: AIDatasetAuditLogCountAggregateOutputType | null
    _min: AIDatasetAuditLogMinAggregateOutputType | null
    _max: AIDatasetAuditLogMaxAggregateOutputType | null
  }

  export type AIDatasetAuditLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    datasetId: string | null
    action: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type AIDatasetAuditLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    datasetId: string | null
    action: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type AIDatasetAuditLogCountAggregateOutputType = {
    id: number
    tenantId: number
    datasetId: number
    action: number
    userId: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AIDatasetAuditLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    action?: true
    userId?: true
    createdAt?: true
  }

  export type AIDatasetAuditLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    action?: true
    userId?: true
    createdAt?: true
  }

  export type AIDatasetAuditLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    action?: true
    userId?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AIDatasetAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasetAuditLog to aggregate.
     */
    where?: AIDatasetAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetAuditLogs to fetch.
     */
    orderBy?: AIDatasetAuditLogOrderByWithRelationInput | AIDatasetAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIDatasetAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIDatasetAuditLogs
    **/
    _count?: true | AIDatasetAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIDatasetAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIDatasetAuditLogMaxAggregateInputType
  }

  export type GetAIDatasetAuditLogAggregateType<T extends AIDatasetAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAIDatasetAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIDatasetAuditLog[P]>
      : GetScalarType<T[P], AggregateAIDatasetAuditLog[P]>
  }




  export type AIDatasetAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDatasetAuditLogWhereInput
    orderBy?: AIDatasetAuditLogOrderByWithAggregationInput | AIDatasetAuditLogOrderByWithAggregationInput[]
    by: AIDatasetAuditLogScalarFieldEnum[] | AIDatasetAuditLogScalarFieldEnum
    having?: AIDatasetAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIDatasetAuditLogCountAggregateInputType | true
    _min?: AIDatasetAuditLogMinAggregateInputType
    _max?: AIDatasetAuditLogMaxAggregateInputType
  }

  export type AIDatasetAuditLogGroupByOutputType = {
    id: string
    tenantId: string
    datasetId: string
    action: string
    userId: string
    metadata: JsonValue
    createdAt: Date
    _count: AIDatasetAuditLogCountAggregateOutputType | null
    _min: AIDatasetAuditLogMinAggregateOutputType | null
    _max: AIDatasetAuditLogMaxAggregateOutputType | null
  }

  type GetAIDatasetAuditLogGroupByPayload<T extends AIDatasetAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIDatasetAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIDatasetAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIDatasetAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AIDatasetAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AIDatasetAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    action?: boolean
    userId?: boolean
    metadata?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetAuditLog"]>

  export type AIDatasetAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    action?: boolean
    userId?: boolean
    metadata?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetAuditLog"]>

  export type AIDatasetAuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    action?: boolean
    userId?: boolean
    metadata?: boolean
    createdAt?: boolean
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIDatasetAuditLog"]>

  export type AIDatasetAuditLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    action?: boolean
    userId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AIDatasetAuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "datasetId" | "action" | "userId" | "metadata" | "createdAt", ExtArgs["result"]["aIDatasetAuditLog"]>
  export type AIDatasetAuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }
  export type AIDatasetAuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }
  export type AIDatasetAuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | AIDatasetDefaultArgs<ExtArgs>
  }

  export type $AIDatasetAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIDatasetAuditLog"
    objects: {
      dataset: Prisma.$AIDatasetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      datasetId: string
      action: string
      userId: string
      metadata: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["aIDatasetAuditLog"]>
    composites: {}
  }

  type AIDatasetAuditLogGetPayload<S extends boolean | null | undefined | AIDatasetAuditLogDefaultArgs> = $Result.GetResult<Prisma.$AIDatasetAuditLogPayload, S>

  type AIDatasetAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIDatasetAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIDatasetAuditLogCountAggregateInputType | true
    }

  export interface AIDatasetAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIDatasetAuditLog'], meta: { name: 'AIDatasetAuditLog' } }
    /**
     * Find zero or one AIDatasetAuditLog that matches the filter.
     * @param {AIDatasetAuditLogFindUniqueArgs} args - Arguments to find a AIDatasetAuditLog
     * @example
     * // Get one AIDatasetAuditLog
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIDatasetAuditLogFindUniqueArgs>(args: SelectSubset<T, AIDatasetAuditLogFindUniqueArgs<ExtArgs>>): Prisma__AIDatasetAuditLogClient<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIDatasetAuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIDatasetAuditLogFindUniqueOrThrowArgs} args - Arguments to find a AIDatasetAuditLog
     * @example
     * // Get one AIDatasetAuditLog
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIDatasetAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AIDatasetAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIDatasetAuditLogClient<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDatasetAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetAuditLogFindFirstArgs} args - Arguments to find a AIDatasetAuditLog
     * @example
     * // Get one AIDatasetAuditLog
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIDatasetAuditLogFindFirstArgs>(args?: SelectSubset<T, AIDatasetAuditLogFindFirstArgs<ExtArgs>>): Prisma__AIDatasetAuditLogClient<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDatasetAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetAuditLogFindFirstOrThrowArgs} args - Arguments to find a AIDatasetAuditLog
     * @example
     * // Get one AIDatasetAuditLog
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIDatasetAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AIDatasetAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIDatasetAuditLogClient<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIDatasetAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIDatasetAuditLogs
     * const aIDatasetAuditLogs = await prisma.aIDatasetAuditLog.findMany()
     * 
     * // Get first 10 AIDatasetAuditLogs
     * const aIDatasetAuditLogs = await prisma.aIDatasetAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIDatasetAuditLogWithIdOnly = await prisma.aIDatasetAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIDatasetAuditLogFindManyArgs>(args?: SelectSubset<T, AIDatasetAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIDatasetAuditLog.
     * @param {AIDatasetAuditLogCreateArgs} args - Arguments to create a AIDatasetAuditLog.
     * @example
     * // Create one AIDatasetAuditLog
     * const AIDatasetAuditLog = await prisma.aIDatasetAuditLog.create({
     *   data: {
     *     // ... data to create a AIDatasetAuditLog
     *   }
     * })
     * 
     */
    create<T extends AIDatasetAuditLogCreateArgs>(args: SelectSubset<T, AIDatasetAuditLogCreateArgs<ExtArgs>>): Prisma__AIDatasetAuditLogClient<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIDatasetAuditLogs.
     * @param {AIDatasetAuditLogCreateManyArgs} args - Arguments to create many AIDatasetAuditLogs.
     * @example
     * // Create many AIDatasetAuditLogs
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIDatasetAuditLogCreateManyArgs>(args?: SelectSubset<T, AIDatasetAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIDatasetAuditLogs and returns the data saved in the database.
     * @param {AIDatasetAuditLogCreateManyAndReturnArgs} args - Arguments to create many AIDatasetAuditLogs.
     * @example
     * // Create many AIDatasetAuditLogs
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIDatasetAuditLogs and only return the `id`
     * const aIDatasetAuditLogWithIdOnly = await prisma.aIDatasetAuditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIDatasetAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AIDatasetAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIDatasetAuditLog.
     * @param {AIDatasetAuditLogDeleteArgs} args - Arguments to delete one AIDatasetAuditLog.
     * @example
     * // Delete one AIDatasetAuditLog
     * const AIDatasetAuditLog = await prisma.aIDatasetAuditLog.delete({
     *   where: {
     *     // ... filter to delete one AIDatasetAuditLog
     *   }
     * })
     * 
     */
    delete<T extends AIDatasetAuditLogDeleteArgs>(args: SelectSubset<T, AIDatasetAuditLogDeleteArgs<ExtArgs>>): Prisma__AIDatasetAuditLogClient<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIDatasetAuditLog.
     * @param {AIDatasetAuditLogUpdateArgs} args - Arguments to update one AIDatasetAuditLog.
     * @example
     * // Update one AIDatasetAuditLog
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIDatasetAuditLogUpdateArgs>(args: SelectSubset<T, AIDatasetAuditLogUpdateArgs<ExtArgs>>): Prisma__AIDatasetAuditLogClient<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIDatasetAuditLogs.
     * @param {AIDatasetAuditLogDeleteManyArgs} args - Arguments to filter AIDatasetAuditLogs to delete.
     * @example
     * // Delete a few AIDatasetAuditLogs
     * const { count } = await prisma.aIDatasetAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIDatasetAuditLogDeleteManyArgs>(args?: SelectSubset<T, AIDatasetAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasetAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIDatasetAuditLogs
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIDatasetAuditLogUpdateManyArgs>(args: SelectSubset<T, AIDatasetAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDatasetAuditLogs and returns the data updated in the database.
     * @param {AIDatasetAuditLogUpdateManyAndReturnArgs} args - Arguments to update many AIDatasetAuditLogs.
     * @example
     * // Update many AIDatasetAuditLogs
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIDatasetAuditLogs and only return the `id`
     * const aIDatasetAuditLogWithIdOnly = await prisma.aIDatasetAuditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIDatasetAuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AIDatasetAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIDatasetAuditLog.
     * @param {AIDatasetAuditLogUpsertArgs} args - Arguments to update or create a AIDatasetAuditLog.
     * @example
     * // Update or create a AIDatasetAuditLog
     * const aIDatasetAuditLog = await prisma.aIDatasetAuditLog.upsert({
     *   create: {
     *     // ... data to create a AIDatasetAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIDatasetAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AIDatasetAuditLogUpsertArgs>(args: SelectSubset<T, AIDatasetAuditLogUpsertArgs<ExtArgs>>): Prisma__AIDatasetAuditLogClient<$Result.GetResult<Prisma.$AIDatasetAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIDatasetAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetAuditLogCountArgs} args - Arguments to filter AIDatasetAuditLogs to count.
     * @example
     * // Count the number of AIDatasetAuditLogs
     * const count = await prisma.aIDatasetAuditLog.count({
     *   where: {
     *     // ... the filter for the AIDatasetAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AIDatasetAuditLogCountArgs>(
      args?: Subset<T, AIDatasetAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIDatasetAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIDatasetAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIDatasetAuditLogAggregateArgs>(args: Subset<T, AIDatasetAuditLogAggregateArgs>): Prisma.PrismaPromise<GetAIDatasetAuditLogAggregateType<T>>

    /**
     * Group by AIDatasetAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDatasetAuditLogGroupByArgs} args - Group by arguments.
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
      T extends AIDatasetAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIDatasetAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AIDatasetAuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIDatasetAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIDatasetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIDatasetAuditLog model
   */
  readonly fields: AIDatasetAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIDatasetAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIDatasetAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dataset<T extends AIDatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AIDatasetDefaultArgs<ExtArgs>>): Prisma__AIDatasetClient<$Result.GetResult<Prisma.$AIDatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AIDatasetAuditLog model
   */
  interface AIDatasetAuditLogFieldRefs {
    readonly id: FieldRef<"AIDatasetAuditLog", 'String'>
    readonly tenantId: FieldRef<"AIDatasetAuditLog", 'String'>
    readonly datasetId: FieldRef<"AIDatasetAuditLog", 'String'>
    readonly action: FieldRef<"AIDatasetAuditLog", 'String'>
    readonly userId: FieldRef<"AIDatasetAuditLog", 'String'>
    readonly metadata: FieldRef<"AIDatasetAuditLog", 'Json'>
    readonly createdAt: FieldRef<"AIDatasetAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIDatasetAuditLog findUnique
   */
  export type AIDatasetAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetAuditLog to fetch.
     */
    where: AIDatasetAuditLogWhereUniqueInput
  }

  /**
   * AIDatasetAuditLog findUniqueOrThrow
   */
  export type AIDatasetAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetAuditLog to fetch.
     */
    where: AIDatasetAuditLogWhereUniqueInput
  }

  /**
   * AIDatasetAuditLog findFirst
   */
  export type AIDatasetAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetAuditLog to fetch.
     */
    where?: AIDatasetAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetAuditLogs to fetch.
     */
    orderBy?: AIDatasetAuditLogOrderByWithRelationInput | AIDatasetAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasetAuditLogs.
     */
    cursor?: AIDatasetAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasetAuditLogs.
     */
    distinct?: AIDatasetAuditLogScalarFieldEnum | AIDatasetAuditLogScalarFieldEnum[]
  }

  /**
   * AIDatasetAuditLog findFirstOrThrow
   */
  export type AIDatasetAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetAuditLog to fetch.
     */
    where?: AIDatasetAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetAuditLogs to fetch.
     */
    orderBy?: AIDatasetAuditLogOrderByWithRelationInput | AIDatasetAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDatasetAuditLogs.
     */
    cursor?: AIDatasetAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDatasetAuditLogs.
     */
    distinct?: AIDatasetAuditLogScalarFieldEnum | AIDatasetAuditLogScalarFieldEnum[]
  }

  /**
   * AIDatasetAuditLog findMany
   */
  export type AIDatasetAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AIDatasetAuditLogs to fetch.
     */
    where?: AIDatasetAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDatasetAuditLogs to fetch.
     */
    orderBy?: AIDatasetAuditLogOrderByWithRelationInput | AIDatasetAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIDatasetAuditLogs.
     */
    cursor?: AIDatasetAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDatasetAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDatasetAuditLogs.
     */
    skip?: number
    distinct?: AIDatasetAuditLogScalarFieldEnum | AIDatasetAuditLogScalarFieldEnum[]
  }

  /**
   * AIDatasetAuditLog create
   */
  export type AIDatasetAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AIDatasetAuditLog.
     */
    data: XOR<AIDatasetAuditLogCreateInput, AIDatasetAuditLogUncheckedCreateInput>
  }

  /**
   * AIDatasetAuditLog createMany
   */
  export type AIDatasetAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIDatasetAuditLogs.
     */
    data: AIDatasetAuditLogCreateManyInput | AIDatasetAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDatasetAuditLog createManyAndReturn
   */
  export type AIDatasetAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AIDatasetAuditLogs.
     */
    data: AIDatasetAuditLogCreateManyInput | AIDatasetAuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIDatasetAuditLog update
   */
  export type AIDatasetAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AIDatasetAuditLog.
     */
    data: XOR<AIDatasetAuditLogUpdateInput, AIDatasetAuditLogUncheckedUpdateInput>
    /**
     * Choose, which AIDatasetAuditLog to update.
     */
    where: AIDatasetAuditLogWhereUniqueInput
  }

  /**
   * AIDatasetAuditLog updateMany
   */
  export type AIDatasetAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIDatasetAuditLogs.
     */
    data: XOR<AIDatasetAuditLogUpdateManyMutationInput, AIDatasetAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasetAuditLogs to update
     */
    where?: AIDatasetAuditLogWhereInput
    /**
     * Limit how many AIDatasetAuditLogs to update.
     */
    limit?: number
  }

  /**
   * AIDatasetAuditLog updateManyAndReturn
   */
  export type AIDatasetAuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AIDatasetAuditLogs.
     */
    data: XOR<AIDatasetAuditLogUpdateManyMutationInput, AIDatasetAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AIDatasetAuditLogs to update
     */
    where?: AIDatasetAuditLogWhereInput
    /**
     * Limit how many AIDatasetAuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIDatasetAuditLog upsert
   */
  export type AIDatasetAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AIDatasetAuditLog to update in case it exists.
     */
    where: AIDatasetAuditLogWhereUniqueInput
    /**
     * In case the AIDatasetAuditLog found by the `where` argument doesn't exist, create a new AIDatasetAuditLog with this data.
     */
    create: XOR<AIDatasetAuditLogCreateInput, AIDatasetAuditLogUncheckedCreateInput>
    /**
     * In case the AIDatasetAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIDatasetAuditLogUpdateInput, AIDatasetAuditLogUncheckedUpdateInput>
  }

  /**
   * AIDatasetAuditLog delete
   */
  export type AIDatasetAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
    /**
     * Filter which AIDatasetAuditLog to delete.
     */
    where: AIDatasetAuditLogWhereUniqueInput
  }

  /**
   * AIDatasetAuditLog deleteMany
   */
  export type AIDatasetAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDatasetAuditLogs to delete
     */
    where?: AIDatasetAuditLogWhereInput
    /**
     * Limit how many AIDatasetAuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AIDatasetAuditLog without action
   */
  export type AIDatasetAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDatasetAuditLog
     */
    select?: AIDatasetAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDatasetAuditLog
     */
    omit?: AIDatasetAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIDatasetAuditLogInclude<ExtArgs> | null
  }


  /**
   * Model AIStreamSession
   */

  export type AggregateAIStreamSession = {
    _count: AIStreamSessionCountAggregateOutputType | null
    _min: AIStreamSessionMinAggregateOutputType | null
    _max: AIStreamSessionMaxAggregateOutputType | null
  }

  export type AIStreamSessionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    sessionId: string | null
    task: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIStreamSessionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    sessionId: string | null
    task: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIStreamSessionCountAggregateOutputType = {
    id: number
    tenantId: number
    sessionId: number
    task: number
    context: number
    status: number
    chunks: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIStreamSessionMinAggregateInputType = {
    id?: true
    tenantId?: true
    sessionId?: true
    task?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIStreamSessionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    sessionId?: true
    task?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIStreamSessionCountAggregateInputType = {
    id?: true
    tenantId?: true
    sessionId?: true
    task?: true
    context?: true
    status?: true
    chunks?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIStreamSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIStreamSession to aggregate.
     */
    where?: AIStreamSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIStreamSessions to fetch.
     */
    orderBy?: AIStreamSessionOrderByWithRelationInput | AIStreamSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIStreamSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIStreamSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIStreamSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIStreamSessions
    **/
    _count?: true | AIStreamSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIStreamSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIStreamSessionMaxAggregateInputType
  }

  export type GetAIStreamSessionAggregateType<T extends AIStreamSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAIStreamSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIStreamSession[P]>
      : GetScalarType<T[P], AggregateAIStreamSession[P]>
  }




  export type AIStreamSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIStreamSessionWhereInput
    orderBy?: AIStreamSessionOrderByWithAggregationInput | AIStreamSessionOrderByWithAggregationInput[]
    by: AIStreamSessionScalarFieldEnum[] | AIStreamSessionScalarFieldEnum
    having?: AIStreamSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIStreamSessionCountAggregateInputType | true
    _min?: AIStreamSessionMinAggregateInputType
    _max?: AIStreamSessionMaxAggregateInputType
  }

  export type AIStreamSessionGroupByOutputType = {
    id: string
    tenantId: string
    sessionId: string
    task: string
    context: JsonValue
    status: string
    chunks: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: AIStreamSessionCountAggregateOutputType | null
    _min: AIStreamSessionMinAggregateOutputType | null
    _max: AIStreamSessionMaxAggregateOutputType | null
  }

  type GetAIStreamSessionGroupByPayload<T extends AIStreamSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIStreamSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIStreamSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIStreamSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AIStreamSessionGroupByOutputType[P]>
        }
      >
    >


  export type AIStreamSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    sessionId?: boolean
    task?: boolean
    context?: boolean
    status?: boolean
    chunks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIStreamSession"]>

  export type AIStreamSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    sessionId?: boolean
    task?: boolean
    context?: boolean
    status?: boolean
    chunks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIStreamSession"]>

  export type AIStreamSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    sessionId?: boolean
    task?: boolean
    context?: boolean
    status?: boolean
    chunks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIStreamSession"]>

  export type AIStreamSessionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    sessionId?: boolean
    task?: boolean
    context?: boolean
    status?: boolean
    chunks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIStreamSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "sessionId" | "task" | "context" | "status" | "chunks" | "createdAt" | "updatedAt", ExtArgs["result"]["aIStreamSession"]>

  export type $AIStreamSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIStreamSession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      sessionId: string
      task: string
      context: Prisma.JsonValue
      status: string
      chunks: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIStreamSession"]>
    composites: {}
  }

  type AIStreamSessionGetPayload<S extends boolean | null | undefined | AIStreamSessionDefaultArgs> = $Result.GetResult<Prisma.$AIStreamSessionPayload, S>

  type AIStreamSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIStreamSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIStreamSessionCountAggregateInputType | true
    }

  export interface AIStreamSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIStreamSession'], meta: { name: 'AIStreamSession' } }
    /**
     * Find zero or one AIStreamSession that matches the filter.
     * @param {AIStreamSessionFindUniqueArgs} args - Arguments to find a AIStreamSession
     * @example
     * // Get one AIStreamSession
     * const aIStreamSession = await prisma.aIStreamSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIStreamSessionFindUniqueArgs>(args: SelectSubset<T, AIStreamSessionFindUniqueArgs<ExtArgs>>): Prisma__AIStreamSessionClient<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIStreamSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIStreamSessionFindUniqueOrThrowArgs} args - Arguments to find a AIStreamSession
     * @example
     * // Get one AIStreamSession
     * const aIStreamSession = await prisma.aIStreamSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIStreamSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AIStreamSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIStreamSessionClient<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIStreamSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIStreamSessionFindFirstArgs} args - Arguments to find a AIStreamSession
     * @example
     * // Get one AIStreamSession
     * const aIStreamSession = await prisma.aIStreamSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIStreamSessionFindFirstArgs>(args?: SelectSubset<T, AIStreamSessionFindFirstArgs<ExtArgs>>): Prisma__AIStreamSessionClient<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIStreamSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIStreamSessionFindFirstOrThrowArgs} args - Arguments to find a AIStreamSession
     * @example
     * // Get one AIStreamSession
     * const aIStreamSession = await prisma.aIStreamSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIStreamSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AIStreamSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIStreamSessionClient<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIStreamSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIStreamSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIStreamSessions
     * const aIStreamSessions = await prisma.aIStreamSession.findMany()
     * 
     * // Get first 10 AIStreamSessions
     * const aIStreamSessions = await prisma.aIStreamSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIStreamSessionWithIdOnly = await prisma.aIStreamSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIStreamSessionFindManyArgs>(args?: SelectSubset<T, AIStreamSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIStreamSession.
     * @param {AIStreamSessionCreateArgs} args - Arguments to create a AIStreamSession.
     * @example
     * // Create one AIStreamSession
     * const AIStreamSession = await prisma.aIStreamSession.create({
     *   data: {
     *     // ... data to create a AIStreamSession
     *   }
     * })
     * 
     */
    create<T extends AIStreamSessionCreateArgs>(args: SelectSubset<T, AIStreamSessionCreateArgs<ExtArgs>>): Prisma__AIStreamSessionClient<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIStreamSessions.
     * @param {AIStreamSessionCreateManyArgs} args - Arguments to create many AIStreamSessions.
     * @example
     * // Create many AIStreamSessions
     * const aIStreamSession = await prisma.aIStreamSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIStreamSessionCreateManyArgs>(args?: SelectSubset<T, AIStreamSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIStreamSessions and returns the data saved in the database.
     * @param {AIStreamSessionCreateManyAndReturnArgs} args - Arguments to create many AIStreamSessions.
     * @example
     * // Create many AIStreamSessions
     * const aIStreamSession = await prisma.aIStreamSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIStreamSessions and only return the `id`
     * const aIStreamSessionWithIdOnly = await prisma.aIStreamSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIStreamSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AIStreamSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIStreamSession.
     * @param {AIStreamSessionDeleteArgs} args - Arguments to delete one AIStreamSession.
     * @example
     * // Delete one AIStreamSession
     * const AIStreamSession = await prisma.aIStreamSession.delete({
     *   where: {
     *     // ... filter to delete one AIStreamSession
     *   }
     * })
     * 
     */
    delete<T extends AIStreamSessionDeleteArgs>(args: SelectSubset<T, AIStreamSessionDeleteArgs<ExtArgs>>): Prisma__AIStreamSessionClient<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIStreamSession.
     * @param {AIStreamSessionUpdateArgs} args - Arguments to update one AIStreamSession.
     * @example
     * // Update one AIStreamSession
     * const aIStreamSession = await prisma.aIStreamSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIStreamSessionUpdateArgs>(args: SelectSubset<T, AIStreamSessionUpdateArgs<ExtArgs>>): Prisma__AIStreamSessionClient<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIStreamSessions.
     * @param {AIStreamSessionDeleteManyArgs} args - Arguments to filter AIStreamSessions to delete.
     * @example
     * // Delete a few AIStreamSessions
     * const { count } = await prisma.aIStreamSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIStreamSessionDeleteManyArgs>(args?: SelectSubset<T, AIStreamSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIStreamSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIStreamSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIStreamSessions
     * const aIStreamSession = await prisma.aIStreamSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIStreamSessionUpdateManyArgs>(args: SelectSubset<T, AIStreamSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIStreamSessions and returns the data updated in the database.
     * @param {AIStreamSessionUpdateManyAndReturnArgs} args - Arguments to update many AIStreamSessions.
     * @example
     * // Update many AIStreamSessions
     * const aIStreamSession = await prisma.aIStreamSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIStreamSessions and only return the `id`
     * const aIStreamSessionWithIdOnly = await prisma.aIStreamSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIStreamSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, AIStreamSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIStreamSession.
     * @param {AIStreamSessionUpsertArgs} args - Arguments to update or create a AIStreamSession.
     * @example
     * // Update or create a AIStreamSession
     * const aIStreamSession = await prisma.aIStreamSession.upsert({
     *   create: {
     *     // ... data to create a AIStreamSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIStreamSession we want to update
     *   }
     * })
     */
    upsert<T extends AIStreamSessionUpsertArgs>(args: SelectSubset<T, AIStreamSessionUpsertArgs<ExtArgs>>): Prisma__AIStreamSessionClient<$Result.GetResult<Prisma.$AIStreamSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIStreamSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIStreamSessionCountArgs} args - Arguments to filter AIStreamSessions to count.
     * @example
     * // Count the number of AIStreamSessions
     * const count = await prisma.aIStreamSession.count({
     *   where: {
     *     // ... the filter for the AIStreamSessions we want to count
     *   }
     * })
    **/
    count<T extends AIStreamSessionCountArgs>(
      args?: Subset<T, AIStreamSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIStreamSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIStreamSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIStreamSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIStreamSessionAggregateArgs>(args: Subset<T, AIStreamSessionAggregateArgs>): Prisma.PrismaPromise<GetAIStreamSessionAggregateType<T>>

    /**
     * Group by AIStreamSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIStreamSessionGroupByArgs} args - Group by arguments.
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
      T extends AIStreamSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIStreamSessionGroupByArgs['orderBy'] }
        : { orderBy?: AIStreamSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIStreamSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIStreamSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIStreamSession model
   */
  readonly fields: AIStreamSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIStreamSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIStreamSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIStreamSession model
   */
  interface AIStreamSessionFieldRefs {
    readonly id: FieldRef<"AIStreamSession", 'String'>
    readonly tenantId: FieldRef<"AIStreamSession", 'String'>
    readonly sessionId: FieldRef<"AIStreamSession", 'String'>
    readonly task: FieldRef<"AIStreamSession", 'String'>
    readonly context: FieldRef<"AIStreamSession", 'Json'>
    readonly status: FieldRef<"AIStreamSession", 'String'>
    readonly chunks: FieldRef<"AIStreamSession", 'Json'>
    readonly createdAt: FieldRef<"AIStreamSession", 'DateTime'>
    readonly updatedAt: FieldRef<"AIStreamSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIStreamSession findUnique
   */
  export type AIStreamSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * Filter, which AIStreamSession to fetch.
     */
    where: AIStreamSessionWhereUniqueInput
  }

  /**
   * AIStreamSession findUniqueOrThrow
   */
  export type AIStreamSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * Filter, which AIStreamSession to fetch.
     */
    where: AIStreamSessionWhereUniqueInput
  }

  /**
   * AIStreamSession findFirst
   */
  export type AIStreamSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * Filter, which AIStreamSession to fetch.
     */
    where?: AIStreamSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIStreamSessions to fetch.
     */
    orderBy?: AIStreamSessionOrderByWithRelationInput | AIStreamSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIStreamSessions.
     */
    cursor?: AIStreamSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIStreamSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIStreamSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIStreamSessions.
     */
    distinct?: AIStreamSessionScalarFieldEnum | AIStreamSessionScalarFieldEnum[]
  }

  /**
   * AIStreamSession findFirstOrThrow
   */
  export type AIStreamSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * Filter, which AIStreamSession to fetch.
     */
    where?: AIStreamSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIStreamSessions to fetch.
     */
    orderBy?: AIStreamSessionOrderByWithRelationInput | AIStreamSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIStreamSessions.
     */
    cursor?: AIStreamSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIStreamSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIStreamSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIStreamSessions.
     */
    distinct?: AIStreamSessionScalarFieldEnum | AIStreamSessionScalarFieldEnum[]
  }

  /**
   * AIStreamSession findMany
   */
  export type AIStreamSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * Filter, which AIStreamSessions to fetch.
     */
    where?: AIStreamSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIStreamSessions to fetch.
     */
    orderBy?: AIStreamSessionOrderByWithRelationInput | AIStreamSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIStreamSessions.
     */
    cursor?: AIStreamSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIStreamSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIStreamSessions.
     */
    skip?: number
    distinct?: AIStreamSessionScalarFieldEnum | AIStreamSessionScalarFieldEnum[]
  }

  /**
   * AIStreamSession create
   */
  export type AIStreamSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * The data needed to create a AIStreamSession.
     */
    data: XOR<AIStreamSessionCreateInput, AIStreamSessionUncheckedCreateInput>
  }

  /**
   * AIStreamSession createMany
   */
  export type AIStreamSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIStreamSessions.
     */
    data: AIStreamSessionCreateManyInput | AIStreamSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIStreamSession createManyAndReturn
   */
  export type AIStreamSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * The data used to create many AIStreamSessions.
     */
    data: AIStreamSessionCreateManyInput | AIStreamSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIStreamSession update
   */
  export type AIStreamSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * The data needed to update a AIStreamSession.
     */
    data: XOR<AIStreamSessionUpdateInput, AIStreamSessionUncheckedUpdateInput>
    /**
     * Choose, which AIStreamSession to update.
     */
    where: AIStreamSessionWhereUniqueInput
  }

  /**
   * AIStreamSession updateMany
   */
  export type AIStreamSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIStreamSessions.
     */
    data: XOR<AIStreamSessionUpdateManyMutationInput, AIStreamSessionUncheckedUpdateManyInput>
    /**
     * Filter which AIStreamSessions to update
     */
    where?: AIStreamSessionWhereInput
    /**
     * Limit how many AIStreamSessions to update.
     */
    limit?: number
  }

  /**
   * AIStreamSession updateManyAndReturn
   */
  export type AIStreamSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * The data used to update AIStreamSessions.
     */
    data: XOR<AIStreamSessionUpdateManyMutationInput, AIStreamSessionUncheckedUpdateManyInput>
    /**
     * Filter which AIStreamSessions to update
     */
    where?: AIStreamSessionWhereInput
    /**
     * Limit how many AIStreamSessions to update.
     */
    limit?: number
  }

  /**
   * AIStreamSession upsert
   */
  export type AIStreamSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * The filter to search for the AIStreamSession to update in case it exists.
     */
    where: AIStreamSessionWhereUniqueInput
    /**
     * In case the AIStreamSession found by the `where` argument doesn't exist, create a new AIStreamSession with this data.
     */
    create: XOR<AIStreamSessionCreateInput, AIStreamSessionUncheckedCreateInput>
    /**
     * In case the AIStreamSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIStreamSessionUpdateInput, AIStreamSessionUncheckedUpdateInput>
  }

  /**
   * AIStreamSession delete
   */
  export type AIStreamSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
    /**
     * Filter which AIStreamSession to delete.
     */
    where: AIStreamSessionWhereUniqueInput
  }

  /**
   * AIStreamSession deleteMany
   */
  export type AIStreamSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIStreamSessions to delete
     */
    where?: AIStreamSessionWhereInput
    /**
     * Limit how many AIStreamSessions to delete.
     */
    limit?: number
  }

  /**
   * AIStreamSession without action
   */
  export type AIStreamSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIStreamSession
     */
    select?: AIStreamSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIStreamSession
     */
    omit?: AIStreamSessionOmit<ExtArgs> | null
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


  export const AIProviderConfigScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    provider: 'provider',
    modelName: 'modelName',
    apiKey: 'apiKey',
    baseUrl: 'baseUrl',
    isActive: 'isActive',
    priority: 'priority',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIProviderConfigScalarFieldEnum = (typeof AIProviderConfigScalarFieldEnum)[keyof typeof AIProviderConfigScalarFieldEnum]


  export const AIRequestLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    provider: 'provider',
    modelName: 'modelName',
    prompt: 'prompt',
    response: 'response',
    tokensInput: 'tokensInput',
    tokensOutput: 'tokensOutput',
    latencyMs: 'latencyMs',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AIRequestLogScalarFieldEnum = (typeof AIRequestLogScalarFieldEnum)[keyof typeof AIRequestLogScalarFieldEnum]


  export const AIMemoryScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    memoryKey: 'memoryKey',
    value: 'value',
    entityType: 'entityType',
    entityId: 'entityId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIMemoryScalarFieldEnum = (typeof AIMemoryScalarFieldEnum)[keyof typeof AIMemoryScalarFieldEnum]


  export const AIWorkflowScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    dryRun: 'dryRun',
    trigger: 'trigger',
    conditions: 'conditions',
    actions: 'actions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIWorkflowScalarFieldEnum = (typeof AIWorkflowScalarFieldEnum)[keyof typeof AIWorkflowScalarFieldEnum]


  export const AIWorkflowRunScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    workflowId: 'workflowId',
    trigger: 'trigger',
    status: 'status',
    steps: 'steps',
    result: 'result',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIWorkflowRunScalarFieldEnum = (typeof AIWorkflowRunScalarFieldEnum)[keyof typeof AIWorkflowRunScalarFieldEnum]


  export const AIWorkflowVersionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    workflowId: 'workflowId',
    versionNumber: 'versionNumber',
    label: 'label',
    definition: 'definition',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt'
  };

  export type AIWorkflowVersionScalarFieldEnum = (typeof AIWorkflowVersionScalarFieldEnum)[keyof typeof AIWorkflowVersionScalarFieldEnum]


  export const AIWorkflowLiveEventScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    workflowId: 'workflowId',
    workflowName: 'workflowName',
    runId: 'runId',
    eventType: 'eventType',
    timestamp: 'timestamp',
    payload: 'payload',
    durationMs: 'durationMs',
    status: 'status'
  };

  export type AIWorkflowLiveEventScalarFieldEnum = (typeof AIWorkflowLiveEventScalarFieldEnum)[keyof typeof AIWorkflowLiveEventScalarFieldEnum]


  export const AIDatasetScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    type: 'type',
    tags: 'tags',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIDatasetScalarFieldEnum = (typeof AIDatasetScalarFieldEnum)[keyof typeof AIDatasetScalarFieldEnum]


  export const AIDatasetVersionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    datasetId: 'datasetId',
    versionNumber: 'versionNumber',
    recordCount: 'recordCount',
    embeddingModel: 'embeddingModel',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt'
  };

  export type AIDatasetVersionScalarFieldEnum = (typeof AIDatasetVersionScalarFieldEnum)[keyof typeof AIDatasetVersionScalarFieldEnum]


  export const AIDatasetRecordScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    datasetId: 'datasetId',
    versionId: 'versionId',
    input: 'input',
    output: 'output',
    metadata: 'metadata',
    embedding: 'embedding',
    createdAt: 'createdAt'
  };

  export type AIDatasetRecordScalarFieldEnum = (typeof AIDatasetRecordScalarFieldEnum)[keyof typeof AIDatasetRecordScalarFieldEnum]


  export const AIDatasetLabelScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    recordId: 'recordId',
    labelType: 'labelType',
    labelValue: 'labelValue',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt'
  };

  export type AIDatasetLabelScalarFieldEnum = (typeof AIDatasetLabelScalarFieldEnum)[keyof typeof AIDatasetLabelScalarFieldEnum]


  export const AIDatasetAuditLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    datasetId: 'datasetId',
    action: 'action',
    userId: 'userId',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AIDatasetAuditLogScalarFieldEnum = (typeof AIDatasetAuditLogScalarFieldEnum)[keyof typeof AIDatasetAuditLogScalarFieldEnum]


  export const AIStreamSessionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    sessionId: 'sessionId',
    task: 'task',
    context: 'context',
    status: 'status',
    chunks: 'chunks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIStreamSessionScalarFieldEnum = (typeof AIStreamSessionScalarFieldEnum)[keyof typeof AIStreamSessionScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'AIProviderType'
   */
  export type EnumAIProviderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIProviderType'>
    


  /**
   * Reference to a field of type 'AIProviderType[]'
   */
  export type ListEnumAIProviderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIProviderType[]'>
    


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AIDatasetType'
   */
  export type EnumAIDatasetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDatasetType'>
    


  /**
   * Reference to a field of type 'AIDatasetType[]'
   */
  export type ListEnumAIDatasetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDatasetType[]'>
    


  /**
   * Reference to a field of type 'AIDatasetLabelType'
   */
  export type EnumAIDatasetLabelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDatasetLabelType'>
    


  /**
   * Reference to a field of type 'AIDatasetLabelType[]'
   */
  export type ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDatasetLabelType[]'>
    


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


  export type AIProviderConfigWhereInput = {
    AND?: AIProviderConfigWhereInput | AIProviderConfigWhereInput[]
    OR?: AIProviderConfigWhereInput[]
    NOT?: AIProviderConfigWhereInput | AIProviderConfigWhereInput[]
    id?: StringFilter<"AIProviderConfig"> | string
    tenantId?: StringFilter<"AIProviderConfig"> | string
    provider?: EnumAIProviderTypeFilter<"AIProviderConfig"> | $Enums.AIProviderType
    modelName?: StringFilter<"AIProviderConfig"> | string
    apiKey?: StringFilter<"AIProviderConfig"> | string
    baseUrl?: StringNullableFilter<"AIProviderConfig"> | string | null
    isActive?: BoolFilter<"AIProviderConfig"> | boolean
    priority?: IntFilter<"AIProviderConfig"> | number
    createdAt?: DateTimeFilter<"AIProviderConfig"> | Date | string
    updatedAt?: DateTimeFilter<"AIProviderConfig"> | Date | string
  }

  export type AIProviderConfigOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIProviderConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIProviderConfigWhereInput | AIProviderConfigWhereInput[]
    OR?: AIProviderConfigWhereInput[]
    NOT?: AIProviderConfigWhereInput | AIProviderConfigWhereInput[]
    tenantId?: StringFilter<"AIProviderConfig"> | string
    provider?: EnumAIProviderTypeFilter<"AIProviderConfig"> | $Enums.AIProviderType
    modelName?: StringFilter<"AIProviderConfig"> | string
    apiKey?: StringFilter<"AIProviderConfig"> | string
    baseUrl?: StringNullableFilter<"AIProviderConfig"> | string | null
    isActive?: BoolFilter<"AIProviderConfig"> | boolean
    priority?: IntFilter<"AIProviderConfig"> | number
    createdAt?: DateTimeFilter<"AIProviderConfig"> | Date | string
    updatedAt?: DateTimeFilter<"AIProviderConfig"> | Date | string
  }, "id">

  export type AIProviderConfigOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIProviderConfigCountOrderByAggregateInput
    _avg?: AIProviderConfigAvgOrderByAggregateInput
    _max?: AIProviderConfigMaxOrderByAggregateInput
    _min?: AIProviderConfigMinOrderByAggregateInput
    _sum?: AIProviderConfigSumOrderByAggregateInput
  }

  export type AIProviderConfigScalarWhereWithAggregatesInput = {
    AND?: AIProviderConfigScalarWhereWithAggregatesInput | AIProviderConfigScalarWhereWithAggregatesInput[]
    OR?: AIProviderConfigScalarWhereWithAggregatesInput[]
    NOT?: AIProviderConfigScalarWhereWithAggregatesInput | AIProviderConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIProviderConfig"> | string
    tenantId?: StringWithAggregatesFilter<"AIProviderConfig"> | string
    provider?: EnumAIProviderTypeWithAggregatesFilter<"AIProviderConfig"> | $Enums.AIProviderType
    modelName?: StringWithAggregatesFilter<"AIProviderConfig"> | string
    apiKey?: StringWithAggregatesFilter<"AIProviderConfig"> | string
    baseUrl?: StringNullableWithAggregatesFilter<"AIProviderConfig"> | string | null
    isActive?: BoolWithAggregatesFilter<"AIProviderConfig"> | boolean
    priority?: IntWithAggregatesFilter<"AIProviderConfig"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AIProviderConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIProviderConfig"> | Date | string
  }

  export type AIRequestLogWhereInput = {
    AND?: AIRequestLogWhereInput | AIRequestLogWhereInput[]
    OR?: AIRequestLogWhereInput[]
    NOT?: AIRequestLogWhereInput | AIRequestLogWhereInput[]
    id?: StringFilter<"AIRequestLog"> | string
    tenantId?: StringFilter<"AIRequestLog"> | string
    provider?: StringFilter<"AIRequestLog"> | string
    modelName?: StringFilter<"AIRequestLog"> | string
    prompt?: StringFilter<"AIRequestLog"> | string
    response?: StringFilter<"AIRequestLog"> | string
    tokensInput?: IntFilter<"AIRequestLog"> | number
    tokensOutput?: IntFilter<"AIRequestLog"> | number
    latencyMs?: IntFilter<"AIRequestLog"> | number
    metadata?: JsonFilter<"AIRequestLog">
    createdAt?: DateTimeFilter<"AIRequestLog"> | Date | string
  }

  export type AIRequestLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    prompt?: SortOrder
    response?: SortOrder
    tokensInput?: SortOrder
    tokensOutput?: SortOrder
    latencyMs?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AIRequestLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIRequestLogWhereInput | AIRequestLogWhereInput[]
    OR?: AIRequestLogWhereInput[]
    NOT?: AIRequestLogWhereInput | AIRequestLogWhereInput[]
    tenantId?: StringFilter<"AIRequestLog"> | string
    provider?: StringFilter<"AIRequestLog"> | string
    modelName?: StringFilter<"AIRequestLog"> | string
    prompt?: StringFilter<"AIRequestLog"> | string
    response?: StringFilter<"AIRequestLog"> | string
    tokensInput?: IntFilter<"AIRequestLog"> | number
    tokensOutput?: IntFilter<"AIRequestLog"> | number
    latencyMs?: IntFilter<"AIRequestLog"> | number
    metadata?: JsonFilter<"AIRequestLog">
    createdAt?: DateTimeFilter<"AIRequestLog"> | Date | string
  }, "id">

  export type AIRequestLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    prompt?: SortOrder
    response?: SortOrder
    tokensInput?: SortOrder
    tokensOutput?: SortOrder
    latencyMs?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    _count?: AIRequestLogCountOrderByAggregateInput
    _avg?: AIRequestLogAvgOrderByAggregateInput
    _max?: AIRequestLogMaxOrderByAggregateInput
    _min?: AIRequestLogMinOrderByAggregateInput
    _sum?: AIRequestLogSumOrderByAggregateInput
  }

  export type AIRequestLogScalarWhereWithAggregatesInput = {
    AND?: AIRequestLogScalarWhereWithAggregatesInput | AIRequestLogScalarWhereWithAggregatesInput[]
    OR?: AIRequestLogScalarWhereWithAggregatesInput[]
    NOT?: AIRequestLogScalarWhereWithAggregatesInput | AIRequestLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIRequestLog"> | string
    tenantId?: StringWithAggregatesFilter<"AIRequestLog"> | string
    provider?: StringWithAggregatesFilter<"AIRequestLog"> | string
    modelName?: StringWithAggregatesFilter<"AIRequestLog"> | string
    prompt?: StringWithAggregatesFilter<"AIRequestLog"> | string
    response?: StringWithAggregatesFilter<"AIRequestLog"> | string
    tokensInput?: IntWithAggregatesFilter<"AIRequestLog"> | number
    tokensOutput?: IntWithAggregatesFilter<"AIRequestLog"> | number
    latencyMs?: IntWithAggregatesFilter<"AIRequestLog"> | number
    metadata?: JsonWithAggregatesFilter<"AIRequestLog">
    createdAt?: DateTimeWithAggregatesFilter<"AIRequestLog"> | Date | string
  }

  export type AIMemoryWhereInput = {
    AND?: AIMemoryWhereInput | AIMemoryWhereInput[]
    OR?: AIMemoryWhereInput[]
    NOT?: AIMemoryWhereInput | AIMemoryWhereInput[]
    id?: StringFilter<"AIMemory"> | string
    tenantId?: StringFilter<"AIMemory"> | string
    memoryKey?: StringFilter<"AIMemory"> | string
    value?: JsonFilter<"AIMemory">
    entityType?: StringNullableFilter<"AIMemory"> | string | null
    entityId?: StringNullableFilter<"AIMemory"> | string | null
    createdAt?: DateTimeFilter<"AIMemory"> | Date | string
    updatedAt?: DateTimeFilter<"AIMemory"> | Date | string
  }

  export type AIMemoryOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memoryKey?: SortOrder
    value?: SortOrder
    entityType?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIMemoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_memoryKey?: AIMemoryTenantIdMemoryKeyCompoundUniqueInput
    AND?: AIMemoryWhereInput | AIMemoryWhereInput[]
    OR?: AIMemoryWhereInput[]
    NOT?: AIMemoryWhereInput | AIMemoryWhereInput[]
    tenantId?: StringFilter<"AIMemory"> | string
    memoryKey?: StringFilter<"AIMemory"> | string
    value?: JsonFilter<"AIMemory">
    entityType?: StringNullableFilter<"AIMemory"> | string | null
    entityId?: StringNullableFilter<"AIMemory"> | string | null
    createdAt?: DateTimeFilter<"AIMemory"> | Date | string
    updatedAt?: DateTimeFilter<"AIMemory"> | Date | string
  }, "id" | "tenantId_memoryKey">

  export type AIMemoryOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memoryKey?: SortOrder
    value?: SortOrder
    entityType?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIMemoryCountOrderByAggregateInput
    _max?: AIMemoryMaxOrderByAggregateInput
    _min?: AIMemoryMinOrderByAggregateInput
  }

  export type AIMemoryScalarWhereWithAggregatesInput = {
    AND?: AIMemoryScalarWhereWithAggregatesInput | AIMemoryScalarWhereWithAggregatesInput[]
    OR?: AIMemoryScalarWhereWithAggregatesInput[]
    NOT?: AIMemoryScalarWhereWithAggregatesInput | AIMemoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIMemory"> | string
    tenantId?: StringWithAggregatesFilter<"AIMemory"> | string
    memoryKey?: StringWithAggregatesFilter<"AIMemory"> | string
    value?: JsonWithAggregatesFilter<"AIMemory">
    entityType?: StringNullableWithAggregatesFilter<"AIMemory"> | string | null
    entityId?: StringNullableWithAggregatesFilter<"AIMemory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AIMemory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIMemory"> | Date | string
  }

  export type AIWorkflowWhereInput = {
    AND?: AIWorkflowWhereInput | AIWorkflowWhereInput[]
    OR?: AIWorkflowWhereInput[]
    NOT?: AIWorkflowWhereInput | AIWorkflowWhereInput[]
    id?: StringFilter<"AIWorkflow"> | string
    tenantId?: StringFilter<"AIWorkflow"> | string
    name?: StringFilter<"AIWorkflow"> | string
    description?: StringFilter<"AIWorkflow"> | string
    isActive?: BoolFilter<"AIWorkflow"> | boolean
    dryRun?: BoolFilter<"AIWorkflow"> | boolean
    trigger?: JsonFilter<"AIWorkflow">
    conditions?: JsonFilter<"AIWorkflow">
    actions?: JsonFilter<"AIWorkflow">
    createdAt?: DateTimeFilter<"AIWorkflow"> | Date | string
    updatedAt?: DateTimeFilter<"AIWorkflow"> | Date | string
  }

  export type AIWorkflowOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    dryRun?: SortOrder
    trigger?: SortOrder
    conditions?: SortOrder
    actions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIWorkflowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIWorkflowWhereInput | AIWorkflowWhereInput[]
    OR?: AIWorkflowWhereInput[]
    NOT?: AIWorkflowWhereInput | AIWorkflowWhereInput[]
    tenantId?: StringFilter<"AIWorkflow"> | string
    name?: StringFilter<"AIWorkflow"> | string
    description?: StringFilter<"AIWorkflow"> | string
    isActive?: BoolFilter<"AIWorkflow"> | boolean
    dryRun?: BoolFilter<"AIWorkflow"> | boolean
    trigger?: JsonFilter<"AIWorkflow">
    conditions?: JsonFilter<"AIWorkflow">
    actions?: JsonFilter<"AIWorkflow">
    createdAt?: DateTimeFilter<"AIWorkflow"> | Date | string
    updatedAt?: DateTimeFilter<"AIWorkflow"> | Date | string
  }, "id">

  export type AIWorkflowOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    dryRun?: SortOrder
    trigger?: SortOrder
    conditions?: SortOrder
    actions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIWorkflowCountOrderByAggregateInput
    _max?: AIWorkflowMaxOrderByAggregateInput
    _min?: AIWorkflowMinOrderByAggregateInput
  }

  export type AIWorkflowScalarWhereWithAggregatesInput = {
    AND?: AIWorkflowScalarWhereWithAggregatesInput | AIWorkflowScalarWhereWithAggregatesInput[]
    OR?: AIWorkflowScalarWhereWithAggregatesInput[]
    NOT?: AIWorkflowScalarWhereWithAggregatesInput | AIWorkflowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIWorkflow"> | string
    tenantId?: StringWithAggregatesFilter<"AIWorkflow"> | string
    name?: StringWithAggregatesFilter<"AIWorkflow"> | string
    description?: StringWithAggregatesFilter<"AIWorkflow"> | string
    isActive?: BoolWithAggregatesFilter<"AIWorkflow"> | boolean
    dryRun?: BoolWithAggregatesFilter<"AIWorkflow"> | boolean
    trigger?: JsonWithAggregatesFilter<"AIWorkflow">
    conditions?: JsonWithAggregatesFilter<"AIWorkflow">
    actions?: JsonWithAggregatesFilter<"AIWorkflow">
    createdAt?: DateTimeWithAggregatesFilter<"AIWorkflow"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIWorkflow"> | Date | string
  }

  export type AIWorkflowRunWhereInput = {
    AND?: AIWorkflowRunWhereInput | AIWorkflowRunWhereInput[]
    OR?: AIWorkflowRunWhereInput[]
    NOT?: AIWorkflowRunWhereInput | AIWorkflowRunWhereInput[]
    id?: StringFilter<"AIWorkflowRun"> | string
    tenantId?: StringFilter<"AIWorkflowRun"> | string
    workflowId?: StringNullableFilter<"AIWorkflowRun"> | string | null
    trigger?: StringFilter<"AIWorkflowRun"> | string
    status?: StringFilter<"AIWorkflowRun"> | string
    steps?: JsonFilter<"AIWorkflowRun">
    result?: JsonNullableFilter<"AIWorkflowRun">
    createdAt?: DateTimeFilter<"AIWorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"AIWorkflowRun"> | Date | string
  }

  export type AIWorkflowRunOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrderInput | SortOrder
    trigger?: SortOrder
    status?: SortOrder
    steps?: SortOrder
    result?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIWorkflowRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIWorkflowRunWhereInput | AIWorkflowRunWhereInput[]
    OR?: AIWorkflowRunWhereInput[]
    NOT?: AIWorkflowRunWhereInput | AIWorkflowRunWhereInput[]
    tenantId?: StringFilter<"AIWorkflowRun"> | string
    workflowId?: StringNullableFilter<"AIWorkflowRun"> | string | null
    trigger?: StringFilter<"AIWorkflowRun"> | string
    status?: StringFilter<"AIWorkflowRun"> | string
    steps?: JsonFilter<"AIWorkflowRun">
    result?: JsonNullableFilter<"AIWorkflowRun">
    createdAt?: DateTimeFilter<"AIWorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"AIWorkflowRun"> | Date | string
  }, "id">

  export type AIWorkflowRunOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrderInput | SortOrder
    trigger?: SortOrder
    status?: SortOrder
    steps?: SortOrder
    result?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIWorkflowRunCountOrderByAggregateInput
    _max?: AIWorkflowRunMaxOrderByAggregateInput
    _min?: AIWorkflowRunMinOrderByAggregateInput
  }

  export type AIWorkflowRunScalarWhereWithAggregatesInput = {
    AND?: AIWorkflowRunScalarWhereWithAggregatesInput | AIWorkflowRunScalarWhereWithAggregatesInput[]
    OR?: AIWorkflowRunScalarWhereWithAggregatesInput[]
    NOT?: AIWorkflowRunScalarWhereWithAggregatesInput | AIWorkflowRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIWorkflowRun"> | string
    tenantId?: StringWithAggregatesFilter<"AIWorkflowRun"> | string
    workflowId?: StringNullableWithAggregatesFilter<"AIWorkflowRun"> | string | null
    trigger?: StringWithAggregatesFilter<"AIWorkflowRun"> | string
    status?: StringWithAggregatesFilter<"AIWorkflowRun"> | string
    steps?: JsonWithAggregatesFilter<"AIWorkflowRun">
    result?: JsonNullableWithAggregatesFilter<"AIWorkflowRun">
    createdAt?: DateTimeWithAggregatesFilter<"AIWorkflowRun"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIWorkflowRun"> | Date | string
  }

  export type AIWorkflowVersionWhereInput = {
    AND?: AIWorkflowVersionWhereInput | AIWorkflowVersionWhereInput[]
    OR?: AIWorkflowVersionWhereInput[]
    NOT?: AIWorkflowVersionWhereInput | AIWorkflowVersionWhereInput[]
    id?: StringFilter<"AIWorkflowVersion"> | string
    tenantId?: StringFilter<"AIWorkflowVersion"> | string
    workflowId?: StringFilter<"AIWorkflowVersion"> | string
    versionNumber?: IntFilter<"AIWorkflowVersion"> | number
    label?: StringNullableFilter<"AIWorkflowVersion"> | string | null
    definition?: JsonFilter<"AIWorkflowVersion">
    createdByUserId?: StringFilter<"AIWorkflowVersion"> | string
    createdAt?: DateTimeFilter<"AIWorkflowVersion"> | Date | string
  }

  export type AIWorkflowVersionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    versionNumber?: SortOrder
    label?: SortOrderInput | SortOrder
    definition?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIWorkflowVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    workflowId_versionNumber?: AIWorkflowVersionWorkflowIdVersionNumberCompoundUniqueInput
    AND?: AIWorkflowVersionWhereInput | AIWorkflowVersionWhereInput[]
    OR?: AIWorkflowVersionWhereInput[]
    NOT?: AIWorkflowVersionWhereInput | AIWorkflowVersionWhereInput[]
    tenantId?: StringFilter<"AIWorkflowVersion"> | string
    workflowId?: StringFilter<"AIWorkflowVersion"> | string
    versionNumber?: IntFilter<"AIWorkflowVersion"> | number
    label?: StringNullableFilter<"AIWorkflowVersion"> | string | null
    definition?: JsonFilter<"AIWorkflowVersion">
    createdByUserId?: StringFilter<"AIWorkflowVersion"> | string
    createdAt?: DateTimeFilter<"AIWorkflowVersion"> | Date | string
  }, "id" | "workflowId_versionNumber">

  export type AIWorkflowVersionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    versionNumber?: SortOrder
    label?: SortOrderInput | SortOrder
    definition?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    _count?: AIWorkflowVersionCountOrderByAggregateInput
    _avg?: AIWorkflowVersionAvgOrderByAggregateInput
    _max?: AIWorkflowVersionMaxOrderByAggregateInput
    _min?: AIWorkflowVersionMinOrderByAggregateInput
    _sum?: AIWorkflowVersionSumOrderByAggregateInput
  }

  export type AIWorkflowVersionScalarWhereWithAggregatesInput = {
    AND?: AIWorkflowVersionScalarWhereWithAggregatesInput | AIWorkflowVersionScalarWhereWithAggregatesInput[]
    OR?: AIWorkflowVersionScalarWhereWithAggregatesInput[]
    NOT?: AIWorkflowVersionScalarWhereWithAggregatesInput | AIWorkflowVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIWorkflowVersion"> | string
    tenantId?: StringWithAggregatesFilter<"AIWorkflowVersion"> | string
    workflowId?: StringWithAggregatesFilter<"AIWorkflowVersion"> | string
    versionNumber?: IntWithAggregatesFilter<"AIWorkflowVersion"> | number
    label?: StringNullableWithAggregatesFilter<"AIWorkflowVersion"> | string | null
    definition?: JsonWithAggregatesFilter<"AIWorkflowVersion">
    createdByUserId?: StringWithAggregatesFilter<"AIWorkflowVersion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AIWorkflowVersion"> | Date | string
  }

  export type AIWorkflowLiveEventWhereInput = {
    AND?: AIWorkflowLiveEventWhereInput | AIWorkflowLiveEventWhereInput[]
    OR?: AIWorkflowLiveEventWhereInput[]
    NOT?: AIWorkflowLiveEventWhereInput | AIWorkflowLiveEventWhereInput[]
    id?: StringFilter<"AIWorkflowLiveEvent"> | string
    tenantId?: StringFilter<"AIWorkflowLiveEvent"> | string
    workflowId?: StringNullableFilter<"AIWorkflowLiveEvent"> | string | null
    workflowName?: StringNullableFilter<"AIWorkflowLiveEvent"> | string | null
    runId?: StringNullableFilter<"AIWorkflowLiveEvent"> | string | null
    eventType?: StringFilter<"AIWorkflowLiveEvent"> | string
    timestamp?: DateTimeFilter<"AIWorkflowLiveEvent"> | Date | string
    payload?: JsonFilter<"AIWorkflowLiveEvent">
    durationMs?: IntNullableFilter<"AIWorkflowLiveEvent"> | number | null
    status?: StringNullableFilter<"AIWorkflowLiveEvent"> | string | null
  }

  export type AIWorkflowLiveEventOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrderInput | SortOrder
    workflowName?: SortOrderInput | SortOrder
    runId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
    payload?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
  }

  export type AIWorkflowLiveEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIWorkflowLiveEventWhereInput | AIWorkflowLiveEventWhereInput[]
    OR?: AIWorkflowLiveEventWhereInput[]
    NOT?: AIWorkflowLiveEventWhereInput | AIWorkflowLiveEventWhereInput[]
    tenantId?: StringFilter<"AIWorkflowLiveEvent"> | string
    workflowId?: StringNullableFilter<"AIWorkflowLiveEvent"> | string | null
    workflowName?: StringNullableFilter<"AIWorkflowLiveEvent"> | string | null
    runId?: StringNullableFilter<"AIWorkflowLiveEvent"> | string | null
    eventType?: StringFilter<"AIWorkflowLiveEvent"> | string
    timestamp?: DateTimeFilter<"AIWorkflowLiveEvent"> | Date | string
    payload?: JsonFilter<"AIWorkflowLiveEvent">
    durationMs?: IntNullableFilter<"AIWorkflowLiveEvent"> | number | null
    status?: StringNullableFilter<"AIWorkflowLiveEvent"> | string | null
  }, "id">

  export type AIWorkflowLiveEventOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrderInput | SortOrder
    workflowName?: SortOrderInput | SortOrder
    runId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
    payload?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: AIWorkflowLiveEventCountOrderByAggregateInput
    _avg?: AIWorkflowLiveEventAvgOrderByAggregateInput
    _max?: AIWorkflowLiveEventMaxOrderByAggregateInput
    _min?: AIWorkflowLiveEventMinOrderByAggregateInput
    _sum?: AIWorkflowLiveEventSumOrderByAggregateInput
  }

  export type AIWorkflowLiveEventScalarWhereWithAggregatesInput = {
    AND?: AIWorkflowLiveEventScalarWhereWithAggregatesInput | AIWorkflowLiveEventScalarWhereWithAggregatesInput[]
    OR?: AIWorkflowLiveEventScalarWhereWithAggregatesInput[]
    NOT?: AIWorkflowLiveEventScalarWhereWithAggregatesInput | AIWorkflowLiveEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIWorkflowLiveEvent"> | string
    tenantId?: StringWithAggregatesFilter<"AIWorkflowLiveEvent"> | string
    workflowId?: StringNullableWithAggregatesFilter<"AIWorkflowLiveEvent"> | string | null
    workflowName?: StringNullableWithAggregatesFilter<"AIWorkflowLiveEvent"> | string | null
    runId?: StringNullableWithAggregatesFilter<"AIWorkflowLiveEvent"> | string | null
    eventType?: StringWithAggregatesFilter<"AIWorkflowLiveEvent"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AIWorkflowLiveEvent"> | Date | string
    payload?: JsonWithAggregatesFilter<"AIWorkflowLiveEvent">
    durationMs?: IntNullableWithAggregatesFilter<"AIWorkflowLiveEvent"> | number | null
    status?: StringNullableWithAggregatesFilter<"AIWorkflowLiveEvent"> | string | null
  }

  export type AIDatasetWhereInput = {
    AND?: AIDatasetWhereInput | AIDatasetWhereInput[]
    OR?: AIDatasetWhereInput[]
    NOT?: AIDatasetWhereInput | AIDatasetWhereInput[]
    id?: StringFilter<"AIDataset"> | string
    tenantId?: StringFilter<"AIDataset"> | string
    name?: StringFilter<"AIDataset"> | string
    description?: StringFilter<"AIDataset"> | string
    type?: EnumAIDatasetTypeFilter<"AIDataset"> | $Enums.AIDatasetType
    tags?: StringNullableListFilter<"AIDataset">
    createdByUserId?: StringFilter<"AIDataset"> | string
    createdAt?: DateTimeFilter<"AIDataset"> | Date | string
    updatedAt?: DateTimeFilter<"AIDataset"> | Date | string
    versions?: AIDatasetVersionListRelationFilter
    records?: AIDatasetRecordListRelationFilter
    auditLogs?: AIDatasetAuditLogListRelationFilter
  }

  export type AIDatasetOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    versions?: AIDatasetVersionOrderByRelationAggregateInput
    records?: AIDatasetRecordOrderByRelationAggregateInput
    auditLogs?: AIDatasetAuditLogOrderByRelationAggregateInput
  }

  export type AIDatasetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIDatasetWhereInput | AIDatasetWhereInput[]
    OR?: AIDatasetWhereInput[]
    NOT?: AIDatasetWhereInput | AIDatasetWhereInput[]
    tenantId?: StringFilter<"AIDataset"> | string
    name?: StringFilter<"AIDataset"> | string
    description?: StringFilter<"AIDataset"> | string
    type?: EnumAIDatasetTypeFilter<"AIDataset"> | $Enums.AIDatasetType
    tags?: StringNullableListFilter<"AIDataset">
    createdByUserId?: StringFilter<"AIDataset"> | string
    createdAt?: DateTimeFilter<"AIDataset"> | Date | string
    updatedAt?: DateTimeFilter<"AIDataset"> | Date | string
    versions?: AIDatasetVersionListRelationFilter
    records?: AIDatasetRecordListRelationFilter
    auditLogs?: AIDatasetAuditLogListRelationFilter
  }, "id">

  export type AIDatasetOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIDatasetCountOrderByAggregateInput
    _max?: AIDatasetMaxOrderByAggregateInput
    _min?: AIDatasetMinOrderByAggregateInput
  }

  export type AIDatasetScalarWhereWithAggregatesInput = {
    AND?: AIDatasetScalarWhereWithAggregatesInput | AIDatasetScalarWhereWithAggregatesInput[]
    OR?: AIDatasetScalarWhereWithAggregatesInput[]
    NOT?: AIDatasetScalarWhereWithAggregatesInput | AIDatasetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIDataset"> | string
    tenantId?: StringWithAggregatesFilter<"AIDataset"> | string
    name?: StringWithAggregatesFilter<"AIDataset"> | string
    description?: StringWithAggregatesFilter<"AIDataset"> | string
    type?: EnumAIDatasetTypeWithAggregatesFilter<"AIDataset"> | $Enums.AIDatasetType
    tags?: StringNullableListFilter<"AIDataset">
    createdByUserId?: StringWithAggregatesFilter<"AIDataset"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AIDataset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIDataset"> | Date | string
  }

  export type AIDatasetVersionWhereInput = {
    AND?: AIDatasetVersionWhereInput | AIDatasetVersionWhereInput[]
    OR?: AIDatasetVersionWhereInput[]
    NOT?: AIDatasetVersionWhereInput | AIDatasetVersionWhereInput[]
    id?: StringFilter<"AIDatasetVersion"> | string
    tenantId?: StringFilter<"AIDatasetVersion"> | string
    datasetId?: StringFilter<"AIDatasetVersion"> | string
    versionNumber?: IntFilter<"AIDatasetVersion"> | number
    recordCount?: IntFilter<"AIDatasetVersion"> | number
    embeddingModel?: StringNullableFilter<"AIDatasetVersion"> | string | null
    createdByUserId?: StringFilter<"AIDatasetVersion"> | string
    createdAt?: DateTimeFilter<"AIDatasetVersion"> | Date | string
    dataset?: XOR<AIDatasetScalarRelationFilter, AIDatasetWhereInput>
    records?: AIDatasetRecordListRelationFilter
  }

  export type AIDatasetVersionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionNumber?: SortOrder
    recordCount?: SortOrder
    embeddingModel?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    dataset?: AIDatasetOrderByWithRelationInput
    records?: AIDatasetRecordOrderByRelationAggregateInput
  }

  export type AIDatasetVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    datasetId_versionNumber?: AIDatasetVersionDatasetIdVersionNumberCompoundUniqueInput
    AND?: AIDatasetVersionWhereInput | AIDatasetVersionWhereInput[]
    OR?: AIDatasetVersionWhereInput[]
    NOT?: AIDatasetVersionWhereInput | AIDatasetVersionWhereInput[]
    tenantId?: StringFilter<"AIDatasetVersion"> | string
    datasetId?: StringFilter<"AIDatasetVersion"> | string
    versionNumber?: IntFilter<"AIDatasetVersion"> | number
    recordCount?: IntFilter<"AIDatasetVersion"> | number
    embeddingModel?: StringNullableFilter<"AIDatasetVersion"> | string | null
    createdByUserId?: StringFilter<"AIDatasetVersion"> | string
    createdAt?: DateTimeFilter<"AIDatasetVersion"> | Date | string
    dataset?: XOR<AIDatasetScalarRelationFilter, AIDatasetWhereInput>
    records?: AIDatasetRecordListRelationFilter
  }, "id" | "datasetId_versionNumber">

  export type AIDatasetVersionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionNumber?: SortOrder
    recordCount?: SortOrder
    embeddingModel?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    _count?: AIDatasetVersionCountOrderByAggregateInput
    _avg?: AIDatasetVersionAvgOrderByAggregateInput
    _max?: AIDatasetVersionMaxOrderByAggregateInput
    _min?: AIDatasetVersionMinOrderByAggregateInput
    _sum?: AIDatasetVersionSumOrderByAggregateInput
  }

  export type AIDatasetVersionScalarWhereWithAggregatesInput = {
    AND?: AIDatasetVersionScalarWhereWithAggregatesInput | AIDatasetVersionScalarWhereWithAggregatesInput[]
    OR?: AIDatasetVersionScalarWhereWithAggregatesInput[]
    NOT?: AIDatasetVersionScalarWhereWithAggregatesInput | AIDatasetVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIDatasetVersion"> | string
    tenantId?: StringWithAggregatesFilter<"AIDatasetVersion"> | string
    datasetId?: StringWithAggregatesFilter<"AIDatasetVersion"> | string
    versionNumber?: IntWithAggregatesFilter<"AIDatasetVersion"> | number
    recordCount?: IntWithAggregatesFilter<"AIDatasetVersion"> | number
    embeddingModel?: StringNullableWithAggregatesFilter<"AIDatasetVersion"> | string | null
    createdByUserId?: StringWithAggregatesFilter<"AIDatasetVersion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AIDatasetVersion"> | Date | string
  }

  export type AIDatasetRecordWhereInput = {
    AND?: AIDatasetRecordWhereInput | AIDatasetRecordWhereInput[]
    OR?: AIDatasetRecordWhereInput[]
    NOT?: AIDatasetRecordWhereInput | AIDatasetRecordWhereInput[]
    id?: StringFilter<"AIDatasetRecord"> | string
    tenantId?: StringFilter<"AIDatasetRecord"> | string
    datasetId?: StringFilter<"AIDatasetRecord"> | string
    versionId?: StringFilter<"AIDatasetRecord"> | string
    input?: JsonFilter<"AIDatasetRecord">
    output?: JsonNullableFilter<"AIDatasetRecord">
    metadata?: JsonFilter<"AIDatasetRecord">
    embedding?: JsonNullableFilter<"AIDatasetRecord">
    createdAt?: DateTimeFilter<"AIDatasetRecord"> | Date | string
    dataset?: XOR<AIDatasetScalarRelationFilter, AIDatasetWhereInput>
    version?: XOR<AIDatasetVersionScalarRelationFilter, AIDatasetVersionWhereInput>
    labels?: AIDatasetLabelListRelationFilter
  }

  export type AIDatasetRecordOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionId?: SortOrder
    input?: SortOrder
    output?: SortOrderInput | SortOrder
    metadata?: SortOrder
    embedding?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    dataset?: AIDatasetOrderByWithRelationInput
    version?: AIDatasetVersionOrderByWithRelationInput
    labels?: AIDatasetLabelOrderByRelationAggregateInput
  }

  export type AIDatasetRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIDatasetRecordWhereInput | AIDatasetRecordWhereInput[]
    OR?: AIDatasetRecordWhereInput[]
    NOT?: AIDatasetRecordWhereInput | AIDatasetRecordWhereInput[]
    tenantId?: StringFilter<"AIDatasetRecord"> | string
    datasetId?: StringFilter<"AIDatasetRecord"> | string
    versionId?: StringFilter<"AIDatasetRecord"> | string
    input?: JsonFilter<"AIDatasetRecord">
    output?: JsonNullableFilter<"AIDatasetRecord">
    metadata?: JsonFilter<"AIDatasetRecord">
    embedding?: JsonNullableFilter<"AIDatasetRecord">
    createdAt?: DateTimeFilter<"AIDatasetRecord"> | Date | string
    dataset?: XOR<AIDatasetScalarRelationFilter, AIDatasetWhereInput>
    version?: XOR<AIDatasetVersionScalarRelationFilter, AIDatasetVersionWhereInput>
    labels?: AIDatasetLabelListRelationFilter
  }, "id">

  export type AIDatasetRecordOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionId?: SortOrder
    input?: SortOrder
    output?: SortOrderInput | SortOrder
    metadata?: SortOrder
    embedding?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AIDatasetRecordCountOrderByAggregateInput
    _max?: AIDatasetRecordMaxOrderByAggregateInput
    _min?: AIDatasetRecordMinOrderByAggregateInput
  }

  export type AIDatasetRecordScalarWhereWithAggregatesInput = {
    AND?: AIDatasetRecordScalarWhereWithAggregatesInput | AIDatasetRecordScalarWhereWithAggregatesInput[]
    OR?: AIDatasetRecordScalarWhereWithAggregatesInput[]
    NOT?: AIDatasetRecordScalarWhereWithAggregatesInput | AIDatasetRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIDatasetRecord"> | string
    tenantId?: StringWithAggregatesFilter<"AIDatasetRecord"> | string
    datasetId?: StringWithAggregatesFilter<"AIDatasetRecord"> | string
    versionId?: StringWithAggregatesFilter<"AIDatasetRecord"> | string
    input?: JsonWithAggregatesFilter<"AIDatasetRecord">
    output?: JsonNullableWithAggregatesFilter<"AIDatasetRecord">
    metadata?: JsonWithAggregatesFilter<"AIDatasetRecord">
    embedding?: JsonNullableWithAggregatesFilter<"AIDatasetRecord">
    createdAt?: DateTimeWithAggregatesFilter<"AIDatasetRecord"> | Date | string
  }

  export type AIDatasetLabelWhereInput = {
    AND?: AIDatasetLabelWhereInput | AIDatasetLabelWhereInput[]
    OR?: AIDatasetLabelWhereInput[]
    NOT?: AIDatasetLabelWhereInput | AIDatasetLabelWhereInput[]
    id?: StringFilter<"AIDatasetLabel"> | string
    tenantId?: StringFilter<"AIDatasetLabel"> | string
    recordId?: StringFilter<"AIDatasetLabel"> | string
    labelType?: EnumAIDatasetLabelTypeFilter<"AIDatasetLabel"> | $Enums.AIDatasetLabelType
    labelValue?: JsonFilter<"AIDatasetLabel">
    createdByUserId?: StringFilter<"AIDatasetLabel"> | string
    createdAt?: DateTimeFilter<"AIDatasetLabel"> | Date | string
    record?: XOR<AIDatasetRecordScalarRelationFilter, AIDatasetRecordWhereInput>
  }

  export type AIDatasetLabelOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    recordId?: SortOrder
    labelType?: SortOrder
    labelValue?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    record?: AIDatasetRecordOrderByWithRelationInput
  }

  export type AIDatasetLabelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIDatasetLabelWhereInput | AIDatasetLabelWhereInput[]
    OR?: AIDatasetLabelWhereInput[]
    NOT?: AIDatasetLabelWhereInput | AIDatasetLabelWhereInput[]
    tenantId?: StringFilter<"AIDatasetLabel"> | string
    recordId?: StringFilter<"AIDatasetLabel"> | string
    labelType?: EnumAIDatasetLabelTypeFilter<"AIDatasetLabel"> | $Enums.AIDatasetLabelType
    labelValue?: JsonFilter<"AIDatasetLabel">
    createdByUserId?: StringFilter<"AIDatasetLabel"> | string
    createdAt?: DateTimeFilter<"AIDatasetLabel"> | Date | string
    record?: XOR<AIDatasetRecordScalarRelationFilter, AIDatasetRecordWhereInput>
  }, "id">

  export type AIDatasetLabelOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    recordId?: SortOrder
    labelType?: SortOrder
    labelValue?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    _count?: AIDatasetLabelCountOrderByAggregateInput
    _max?: AIDatasetLabelMaxOrderByAggregateInput
    _min?: AIDatasetLabelMinOrderByAggregateInput
  }

  export type AIDatasetLabelScalarWhereWithAggregatesInput = {
    AND?: AIDatasetLabelScalarWhereWithAggregatesInput | AIDatasetLabelScalarWhereWithAggregatesInput[]
    OR?: AIDatasetLabelScalarWhereWithAggregatesInput[]
    NOT?: AIDatasetLabelScalarWhereWithAggregatesInput | AIDatasetLabelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIDatasetLabel"> | string
    tenantId?: StringWithAggregatesFilter<"AIDatasetLabel"> | string
    recordId?: StringWithAggregatesFilter<"AIDatasetLabel"> | string
    labelType?: EnumAIDatasetLabelTypeWithAggregatesFilter<"AIDatasetLabel"> | $Enums.AIDatasetLabelType
    labelValue?: JsonWithAggregatesFilter<"AIDatasetLabel">
    createdByUserId?: StringWithAggregatesFilter<"AIDatasetLabel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AIDatasetLabel"> | Date | string
  }

  export type AIDatasetAuditLogWhereInput = {
    AND?: AIDatasetAuditLogWhereInput | AIDatasetAuditLogWhereInput[]
    OR?: AIDatasetAuditLogWhereInput[]
    NOT?: AIDatasetAuditLogWhereInput | AIDatasetAuditLogWhereInput[]
    id?: StringFilter<"AIDatasetAuditLog"> | string
    tenantId?: StringFilter<"AIDatasetAuditLog"> | string
    datasetId?: StringFilter<"AIDatasetAuditLog"> | string
    action?: StringFilter<"AIDatasetAuditLog"> | string
    userId?: StringFilter<"AIDatasetAuditLog"> | string
    metadata?: JsonFilter<"AIDatasetAuditLog">
    createdAt?: DateTimeFilter<"AIDatasetAuditLog"> | Date | string
    dataset?: XOR<AIDatasetScalarRelationFilter, AIDatasetWhereInput>
  }

  export type AIDatasetAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    action?: SortOrder
    userId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    dataset?: AIDatasetOrderByWithRelationInput
  }

  export type AIDatasetAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIDatasetAuditLogWhereInput | AIDatasetAuditLogWhereInput[]
    OR?: AIDatasetAuditLogWhereInput[]
    NOT?: AIDatasetAuditLogWhereInput | AIDatasetAuditLogWhereInput[]
    tenantId?: StringFilter<"AIDatasetAuditLog"> | string
    datasetId?: StringFilter<"AIDatasetAuditLog"> | string
    action?: StringFilter<"AIDatasetAuditLog"> | string
    userId?: StringFilter<"AIDatasetAuditLog"> | string
    metadata?: JsonFilter<"AIDatasetAuditLog">
    createdAt?: DateTimeFilter<"AIDatasetAuditLog"> | Date | string
    dataset?: XOR<AIDatasetScalarRelationFilter, AIDatasetWhereInput>
  }, "id">

  export type AIDatasetAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    action?: SortOrder
    userId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    _count?: AIDatasetAuditLogCountOrderByAggregateInput
    _max?: AIDatasetAuditLogMaxOrderByAggregateInput
    _min?: AIDatasetAuditLogMinOrderByAggregateInput
  }

  export type AIDatasetAuditLogScalarWhereWithAggregatesInput = {
    AND?: AIDatasetAuditLogScalarWhereWithAggregatesInput | AIDatasetAuditLogScalarWhereWithAggregatesInput[]
    OR?: AIDatasetAuditLogScalarWhereWithAggregatesInput[]
    NOT?: AIDatasetAuditLogScalarWhereWithAggregatesInput | AIDatasetAuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIDatasetAuditLog"> | string
    tenantId?: StringWithAggregatesFilter<"AIDatasetAuditLog"> | string
    datasetId?: StringWithAggregatesFilter<"AIDatasetAuditLog"> | string
    action?: StringWithAggregatesFilter<"AIDatasetAuditLog"> | string
    userId?: StringWithAggregatesFilter<"AIDatasetAuditLog"> | string
    metadata?: JsonWithAggregatesFilter<"AIDatasetAuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AIDatasetAuditLog"> | Date | string
  }

  export type AIStreamSessionWhereInput = {
    AND?: AIStreamSessionWhereInput | AIStreamSessionWhereInput[]
    OR?: AIStreamSessionWhereInput[]
    NOT?: AIStreamSessionWhereInput | AIStreamSessionWhereInput[]
    id?: StringFilter<"AIStreamSession"> | string
    tenantId?: StringFilter<"AIStreamSession"> | string
    sessionId?: StringFilter<"AIStreamSession"> | string
    task?: StringFilter<"AIStreamSession"> | string
    context?: JsonFilter<"AIStreamSession">
    status?: StringFilter<"AIStreamSession"> | string
    chunks?: JsonFilter<"AIStreamSession">
    createdAt?: DateTimeFilter<"AIStreamSession"> | Date | string
    updatedAt?: DateTimeFilter<"AIStreamSession"> | Date | string
  }

  export type AIStreamSessionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    sessionId?: SortOrder
    task?: SortOrder
    context?: SortOrder
    status?: SortOrder
    chunks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIStreamSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: AIStreamSessionWhereInput | AIStreamSessionWhereInput[]
    OR?: AIStreamSessionWhereInput[]
    NOT?: AIStreamSessionWhereInput | AIStreamSessionWhereInput[]
    tenantId?: StringFilter<"AIStreamSession"> | string
    task?: StringFilter<"AIStreamSession"> | string
    context?: JsonFilter<"AIStreamSession">
    status?: StringFilter<"AIStreamSession"> | string
    chunks?: JsonFilter<"AIStreamSession">
    createdAt?: DateTimeFilter<"AIStreamSession"> | Date | string
    updatedAt?: DateTimeFilter<"AIStreamSession"> | Date | string
  }, "id" | "sessionId">

  export type AIStreamSessionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    sessionId?: SortOrder
    task?: SortOrder
    context?: SortOrder
    status?: SortOrder
    chunks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIStreamSessionCountOrderByAggregateInput
    _max?: AIStreamSessionMaxOrderByAggregateInput
    _min?: AIStreamSessionMinOrderByAggregateInput
  }

  export type AIStreamSessionScalarWhereWithAggregatesInput = {
    AND?: AIStreamSessionScalarWhereWithAggregatesInput | AIStreamSessionScalarWhereWithAggregatesInput[]
    OR?: AIStreamSessionScalarWhereWithAggregatesInput[]
    NOT?: AIStreamSessionScalarWhereWithAggregatesInput | AIStreamSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIStreamSession"> | string
    tenantId?: StringWithAggregatesFilter<"AIStreamSession"> | string
    sessionId?: StringWithAggregatesFilter<"AIStreamSession"> | string
    task?: StringWithAggregatesFilter<"AIStreamSession"> | string
    context?: JsonWithAggregatesFilter<"AIStreamSession">
    status?: StringWithAggregatesFilter<"AIStreamSession"> | string
    chunks?: JsonWithAggregatesFilter<"AIStreamSession">
    createdAt?: DateTimeWithAggregatesFilter<"AIStreamSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIStreamSession"> | Date | string
  }

  export type AIProviderConfigCreateInput = {
    id?: string
    tenantId: string
    provider: $Enums.AIProviderType
    modelName: string
    apiKey: string
    baseUrl?: string | null
    isActive?: boolean
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIProviderConfigUncheckedCreateInput = {
    id?: string
    tenantId: string
    provider: $Enums.AIProviderType
    modelName: string
    apiKey: string
    baseUrl?: string | null
    isActive?: boolean
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIProviderConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: EnumAIProviderTypeFieldUpdateOperationsInput | $Enums.AIProviderType
    modelName?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    baseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIProviderConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: EnumAIProviderTypeFieldUpdateOperationsInput | $Enums.AIProviderType
    modelName?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    baseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIProviderConfigCreateManyInput = {
    id?: string
    tenantId: string
    provider: $Enums.AIProviderType
    modelName: string
    apiKey: string
    baseUrl?: string | null
    isActive?: boolean
    priority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIProviderConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: EnumAIProviderTypeFieldUpdateOperationsInput | $Enums.AIProviderType
    modelName?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    baseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIProviderConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: EnumAIProviderTypeFieldUpdateOperationsInput | $Enums.AIProviderType
    modelName?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    baseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIRequestLogCreateInput = {
    id?: string
    tenantId: string
    provider: string
    modelName: string
    prompt: string
    response: string
    tokensInput?: number
    tokensOutput?: number
    latencyMs?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIRequestLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    provider: string
    modelName: string
    prompt: string
    response: string
    tokensInput?: number
    tokensOutput?: number
    latencyMs?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIRequestLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    tokensInput?: IntFieldUpdateOperationsInput | number
    tokensOutput?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIRequestLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    tokensInput?: IntFieldUpdateOperationsInput | number
    tokensOutput?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIRequestLogCreateManyInput = {
    id?: string
    tenantId: string
    provider: string
    modelName: string
    prompt: string
    response: string
    tokensInput?: number
    tokensOutput?: number
    latencyMs?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIRequestLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    tokensInput?: IntFieldUpdateOperationsInput | number
    tokensOutput?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIRequestLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    tokensInput?: IntFieldUpdateOperationsInput | number
    tokensOutput?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMemoryCreateInput = {
    id?: string
    tenantId: string
    memoryKey: string
    value: JsonNullValueInput | InputJsonValue
    entityType?: string | null
    entityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIMemoryUncheckedCreateInput = {
    id?: string
    tenantId: string
    memoryKey: string
    value: JsonNullValueInput | InputJsonValue
    entityType?: string | null
    entityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIMemoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    memoryKey?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMemoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    memoryKey?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMemoryCreateManyInput = {
    id?: string
    tenantId: string
    memoryKey: string
    value: JsonNullValueInput | InputJsonValue
    entityType?: string | null
    entityId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIMemoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    memoryKey?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMemoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    memoryKey?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    isActive?: boolean
    dryRun?: boolean
    trigger: JsonNullValueInput | InputJsonValue
    conditions?: JsonNullValueInput | InputJsonValue
    actions?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIWorkflowUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    isActive?: boolean
    dryRun?: boolean
    trigger: JsonNullValueInput | InputJsonValue
    conditions?: JsonNullValueInput | InputJsonValue
    actions?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIWorkflowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dryRun?: BoolFieldUpdateOperationsInput | boolean
    trigger?: JsonNullValueInput | InputJsonValue
    conditions?: JsonNullValueInput | InputJsonValue
    actions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dryRun?: BoolFieldUpdateOperationsInput | boolean
    trigger?: JsonNullValueInput | InputJsonValue
    conditions?: JsonNullValueInput | InputJsonValue
    actions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    isActive?: boolean
    dryRun?: boolean
    trigger: JsonNullValueInput | InputJsonValue
    conditions?: JsonNullValueInput | InputJsonValue
    actions?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIWorkflowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dryRun?: BoolFieldUpdateOperationsInput | boolean
    trigger?: JsonNullValueInput | InputJsonValue
    conditions?: JsonNullValueInput | InputJsonValue
    actions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dryRun?: BoolFieldUpdateOperationsInput | boolean
    trigger?: JsonNullValueInput | InputJsonValue
    conditions?: JsonNullValueInput | InputJsonValue
    actions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowRunCreateInput = {
    id?: string
    tenantId: string
    workflowId?: string | null
    trigger: string
    status: string
    steps: JsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIWorkflowRunUncheckedCreateInput = {
    id?: string
    tenantId: string
    workflowId?: string | null
    trigger: string
    status: string
    steps: JsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIWorkflowRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowRunCreateManyInput = {
    id?: string
    tenantId: string
    workflowId?: string | null
    trigger: string
    status: string
    steps: JsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIWorkflowRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: NullableStringFieldUpdateOperationsInput | string | null
    trigger?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowVersionCreateInput = {
    id?: string
    tenantId: string
    workflowId: string
    versionNumber: number
    label?: string | null
    definition: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIWorkflowVersionUncheckedCreateInput = {
    id?: string
    tenantId: string
    workflowId: string
    versionNumber: number
    label?: string | null
    definition: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIWorkflowVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    definition?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    definition?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowVersionCreateManyInput = {
    id?: string
    tenantId: string
    workflowId: string
    versionNumber: number
    label?: string | null
    definition: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIWorkflowVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    definition?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    definition?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIWorkflowLiveEventCreateInput = {
    id?: string
    tenantId: string
    workflowId?: string | null
    workflowName?: string | null
    runId?: string | null
    eventType: string
    timestamp?: Date | string
    payload?: JsonNullValueInput | InputJsonValue
    durationMs?: number | null
    status?: string | null
  }

  export type AIWorkflowLiveEventUncheckedCreateInput = {
    id?: string
    tenantId: string
    workflowId?: string | null
    workflowName?: string | null
    runId?: string | null
    eventType: string
    timestamp?: Date | string
    payload?: JsonNullValueInput | InputJsonValue
    durationMs?: number | null
    status?: string | null
  }

  export type AIWorkflowLiveEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: NullableStringFieldUpdateOperationsInput | string | null
    workflowName?: NullableStringFieldUpdateOperationsInput | string | null
    runId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    payload?: JsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIWorkflowLiveEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: NullableStringFieldUpdateOperationsInput | string | null
    workflowName?: NullableStringFieldUpdateOperationsInput | string | null
    runId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    payload?: JsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIWorkflowLiveEventCreateManyInput = {
    id?: string
    tenantId: string
    workflowId?: string | null
    workflowName?: string | null
    runId?: string | null
    eventType: string
    timestamp?: Date | string
    payload?: JsonNullValueInput | InputJsonValue
    durationMs?: number | null
    status?: string | null
  }

  export type AIWorkflowLiveEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: NullableStringFieldUpdateOperationsInput | string | null
    workflowName?: NullableStringFieldUpdateOperationsInput | string | null
    runId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    payload?: JsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIWorkflowLiveEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    workflowId?: NullableStringFieldUpdateOperationsInput | string | null
    workflowName?: NullableStringFieldUpdateOperationsInput | string | null
    runId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    payload?: JsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIDatasetCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: AIDatasetVersionCreateNestedManyWithoutDatasetInput
    records?: AIDatasetRecordCreateNestedManyWithoutDatasetInput
    auditLogs?: AIDatasetAuditLogCreateNestedManyWithoutDatasetInput
  }

  export type AIDatasetUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: AIDatasetVersionUncheckedCreateNestedManyWithoutDatasetInput
    records?: AIDatasetRecordUncheckedCreateNestedManyWithoutDatasetInput
    auditLogs?: AIDatasetAuditLogUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type AIDatasetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: AIDatasetVersionUpdateManyWithoutDatasetNestedInput
    records?: AIDatasetRecordUpdateManyWithoutDatasetNestedInput
    auditLogs?: AIDatasetAuditLogUpdateManyWithoutDatasetNestedInput
  }

  export type AIDatasetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: AIDatasetVersionUncheckedUpdateManyWithoutDatasetNestedInput
    records?: AIDatasetRecordUncheckedUpdateManyWithoutDatasetNestedInput
    auditLogs?: AIDatasetAuditLogUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type AIDatasetCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIDatasetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetVersionCreateInput = {
    id?: string
    tenantId: string
    versionNumber: number
    recordCount?: number
    embeddingModel?: string | null
    createdByUserId: string
    createdAt?: Date | string
    dataset: AIDatasetCreateNestedOneWithoutVersionsInput
    records?: AIDatasetRecordCreateNestedManyWithoutVersionInput
  }

  export type AIDatasetVersionUncheckedCreateInput = {
    id?: string
    tenantId: string
    datasetId: string
    versionNumber: number
    recordCount?: number
    embeddingModel?: string | null
    createdByUserId: string
    createdAt?: Date | string
    records?: AIDatasetRecordUncheckedCreateNestedManyWithoutVersionInput
  }

  export type AIDatasetVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: AIDatasetUpdateOneRequiredWithoutVersionsNestedInput
    records?: AIDatasetRecordUpdateManyWithoutVersionNestedInput
  }

  export type AIDatasetVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AIDatasetRecordUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type AIDatasetVersionCreateManyInput = {
    id?: string
    tenantId: string
    datasetId: string
    versionNumber: number
    recordCount?: number
    embeddingModel?: string | null
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIDatasetVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetRecordCreateInput = {
    id?: string
    tenantId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    dataset: AIDatasetCreateNestedOneWithoutRecordsInput
    version: AIDatasetVersionCreateNestedOneWithoutRecordsInput
    labels?: AIDatasetLabelCreateNestedManyWithoutRecordInput
  }

  export type AIDatasetRecordUncheckedCreateInput = {
    id?: string
    tenantId: string
    datasetId: string
    versionId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    labels?: AIDatasetLabelUncheckedCreateNestedManyWithoutRecordInput
  }

  export type AIDatasetRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: AIDatasetUpdateOneRequiredWithoutRecordsNestedInput
    version?: AIDatasetVersionUpdateOneRequiredWithoutRecordsNestedInput
    labels?: AIDatasetLabelUpdateManyWithoutRecordNestedInput
  }

  export type AIDatasetRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    versionId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: AIDatasetLabelUncheckedUpdateManyWithoutRecordNestedInput
  }

  export type AIDatasetRecordCreateManyInput = {
    id?: string
    tenantId: string
    datasetId: string
    versionId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    versionId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetLabelCreateInput = {
    id?: string
    tenantId: string
    labelType: $Enums.AIDatasetLabelType
    labelValue: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
    record: AIDatasetRecordCreateNestedOneWithoutLabelsInput
  }

  export type AIDatasetLabelUncheckedCreateInput = {
    id?: string
    tenantId: string
    recordId: string
    labelType: $Enums.AIDatasetLabelType
    labelValue: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIDatasetLabelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    labelType?: EnumAIDatasetLabelTypeFieldUpdateOperationsInput | $Enums.AIDatasetLabelType
    labelValue?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    record?: AIDatasetRecordUpdateOneRequiredWithoutLabelsNestedInput
  }

  export type AIDatasetLabelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    labelType?: EnumAIDatasetLabelTypeFieldUpdateOperationsInput | $Enums.AIDatasetLabelType
    labelValue?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetLabelCreateManyInput = {
    id?: string
    tenantId: string
    recordId: string
    labelType: $Enums.AIDatasetLabelType
    labelValue: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIDatasetLabelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    labelType?: EnumAIDatasetLabelTypeFieldUpdateOperationsInput | $Enums.AIDatasetLabelType
    labelValue?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetLabelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    recordId?: StringFieldUpdateOperationsInput | string
    labelType?: EnumAIDatasetLabelTypeFieldUpdateOperationsInput | $Enums.AIDatasetLabelType
    labelValue?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetAuditLogCreateInput = {
    id?: string
    tenantId: string
    action: string
    userId: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    dataset: AIDatasetCreateNestedOneWithoutAuditLogsInput
  }

  export type AIDatasetAuditLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    datasetId: string
    action: string
    userId: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetAuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: AIDatasetUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AIDatasetAuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetAuditLogCreateManyInput = {
    id?: string
    tenantId: string
    datasetId: string
    action: string
    userId: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetAuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetAuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIStreamSessionCreateInput = {
    id?: string
    tenantId: string
    sessionId: string
    task: string
    context: JsonNullValueInput | InputJsonValue
    status: string
    chunks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIStreamSessionUncheckedCreateInput = {
    id?: string
    tenantId: string
    sessionId: string
    task: string
    context: JsonNullValueInput | InputJsonValue
    status: string
    chunks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIStreamSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    context?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    chunks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIStreamSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    context?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    chunks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIStreamSessionCreateManyInput = {
    id?: string
    tenantId: string
    sessionId: string
    task: string
    context: JsonNullValueInput | InputJsonValue
    status: string
    chunks?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIStreamSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    context?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    chunks?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIStreamSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    task?: StringFieldUpdateOperationsInput | string
    context?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    chunks?: JsonNullValueInput | InputJsonValue
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

  export type EnumAIProviderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProviderType | EnumAIProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIProviderType[] | ListEnumAIProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProviderType[] | ListEnumAIProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderTypeFilter<$PrismaModel> | $Enums.AIProviderType
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AIProviderConfigCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIProviderConfigAvgOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type AIProviderConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIProviderConfigMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIProviderConfigSumOrderByAggregateInput = {
    priority?: SortOrder
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

  export type EnumAIProviderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProviderType | EnumAIProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIProviderType[] | ListEnumAIProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProviderType[] | ListEnumAIProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderTypeWithAggregatesFilter<$PrismaModel> | $Enums.AIProviderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIProviderTypeFilter<$PrismaModel>
    _max?: NestedEnumAIProviderTypeFilter<$PrismaModel>
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

  export type AIRequestLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    prompt?: SortOrder
    response?: SortOrder
    tokensInput?: SortOrder
    tokensOutput?: SortOrder
    latencyMs?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AIRequestLogAvgOrderByAggregateInput = {
    tokensInput?: SortOrder
    tokensOutput?: SortOrder
    latencyMs?: SortOrder
  }

  export type AIRequestLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    prompt?: SortOrder
    response?: SortOrder
    tokensInput?: SortOrder
    tokensOutput?: SortOrder
    latencyMs?: SortOrder
    createdAt?: SortOrder
  }

  export type AIRequestLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    modelName?: SortOrder
    prompt?: SortOrder
    response?: SortOrder
    tokensInput?: SortOrder
    tokensOutput?: SortOrder
    latencyMs?: SortOrder
    createdAt?: SortOrder
  }

  export type AIRequestLogSumOrderByAggregateInput = {
    tokensInput?: SortOrder
    tokensOutput?: SortOrder
    latencyMs?: SortOrder
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

  export type AIMemoryTenantIdMemoryKeyCompoundUniqueInput = {
    tenantId: string
    memoryKey: string
  }

  export type AIMemoryCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memoryKey?: SortOrder
    value?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIMemoryMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memoryKey?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIMemoryMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memoryKey?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIWorkflowCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    dryRun?: SortOrder
    trigger?: SortOrder
    conditions?: SortOrder
    actions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIWorkflowMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    dryRun?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIWorkflowMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    dryRun?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type AIWorkflowRunCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    trigger?: SortOrder
    status?: SortOrder
    steps?: SortOrder
    result?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIWorkflowRunMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    trigger?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIWorkflowRunMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    trigger?: SortOrder
    status?: SortOrder
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

  export type AIWorkflowVersionWorkflowIdVersionNumberCompoundUniqueInput = {
    workflowId: string
    versionNumber: number
  }

  export type AIWorkflowVersionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    versionNumber?: SortOrder
    label?: SortOrder
    definition?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIWorkflowVersionAvgOrderByAggregateInput = {
    versionNumber?: SortOrder
  }

  export type AIWorkflowVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    versionNumber?: SortOrder
    label?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIWorkflowVersionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    versionNumber?: SortOrder
    label?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIWorkflowVersionSumOrderByAggregateInput = {
    versionNumber?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AIWorkflowLiveEventCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    workflowName?: SortOrder
    runId?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
    payload?: SortOrder
    durationMs?: SortOrder
    status?: SortOrder
  }

  export type AIWorkflowLiveEventAvgOrderByAggregateInput = {
    durationMs?: SortOrder
  }

  export type AIWorkflowLiveEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    workflowName?: SortOrder
    runId?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
    durationMs?: SortOrder
    status?: SortOrder
  }

  export type AIWorkflowLiveEventMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    workflowId?: SortOrder
    workflowName?: SortOrder
    runId?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
    durationMs?: SortOrder
    status?: SortOrder
  }

  export type AIWorkflowLiveEventSumOrderByAggregateInput = {
    durationMs?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumAIDatasetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDatasetType | EnumAIDatasetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDatasetType[] | ListEnumAIDatasetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDatasetType[] | ListEnumAIDatasetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDatasetTypeFilter<$PrismaModel> | $Enums.AIDatasetType
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type AIDatasetVersionListRelationFilter = {
    every?: AIDatasetVersionWhereInput
    some?: AIDatasetVersionWhereInput
    none?: AIDatasetVersionWhereInput
  }

  export type AIDatasetRecordListRelationFilter = {
    every?: AIDatasetRecordWhereInput
    some?: AIDatasetRecordWhereInput
    none?: AIDatasetRecordWhereInput
  }

  export type AIDatasetAuditLogListRelationFilter = {
    every?: AIDatasetAuditLogWhereInput
    some?: AIDatasetAuditLogWhereInput
    none?: AIDatasetAuditLogWhereInput
  }

  export type AIDatasetVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIDatasetRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIDatasetAuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIDatasetCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    tags?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIDatasetMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIDatasetMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAIDatasetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDatasetType | EnumAIDatasetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDatasetType[] | ListEnumAIDatasetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDatasetType[] | ListEnumAIDatasetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDatasetTypeWithAggregatesFilter<$PrismaModel> | $Enums.AIDatasetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDatasetTypeFilter<$PrismaModel>
    _max?: NestedEnumAIDatasetTypeFilter<$PrismaModel>
  }

  export type AIDatasetScalarRelationFilter = {
    is?: AIDatasetWhereInput
    isNot?: AIDatasetWhereInput
  }

  export type AIDatasetVersionDatasetIdVersionNumberCompoundUniqueInput = {
    datasetId: string
    versionNumber: number
  }

  export type AIDatasetVersionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionNumber?: SortOrder
    recordCount?: SortOrder
    embeddingModel?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetVersionAvgOrderByAggregateInput = {
    versionNumber?: SortOrder
    recordCount?: SortOrder
  }

  export type AIDatasetVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionNumber?: SortOrder
    recordCount?: SortOrder
    embeddingModel?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetVersionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionNumber?: SortOrder
    recordCount?: SortOrder
    embeddingModel?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetVersionSumOrderByAggregateInput = {
    versionNumber?: SortOrder
    recordCount?: SortOrder
  }

  export type AIDatasetVersionScalarRelationFilter = {
    is?: AIDatasetVersionWhereInput
    isNot?: AIDatasetVersionWhereInput
  }

  export type AIDatasetLabelListRelationFilter = {
    every?: AIDatasetLabelWhereInput
    some?: AIDatasetLabelWhereInput
    none?: AIDatasetLabelWhereInput
  }

  export type AIDatasetLabelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIDatasetRecordCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionId?: SortOrder
    input?: SortOrder
    output?: SortOrder
    metadata?: SortOrder
    embedding?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetRecordMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    versionId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAIDatasetLabelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDatasetLabelType | EnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDatasetLabelType[] | ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDatasetLabelType[] | ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDatasetLabelTypeFilter<$PrismaModel> | $Enums.AIDatasetLabelType
  }

  export type AIDatasetRecordScalarRelationFilter = {
    is?: AIDatasetRecordWhereInput
    isNot?: AIDatasetRecordWhereInput
  }

  export type AIDatasetLabelCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    recordId?: SortOrder
    labelType?: SortOrder
    labelValue?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetLabelMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    recordId?: SortOrder
    labelType?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetLabelMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    recordId?: SortOrder
    labelType?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAIDatasetLabelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDatasetLabelType | EnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDatasetLabelType[] | ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDatasetLabelType[] | ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDatasetLabelTypeWithAggregatesFilter<$PrismaModel> | $Enums.AIDatasetLabelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDatasetLabelTypeFilter<$PrismaModel>
    _max?: NestedEnumAIDatasetLabelTypeFilter<$PrismaModel>
  }

  export type AIDatasetAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    action?: SortOrder
    userId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    action?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIDatasetAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    action?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIStreamSessionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    sessionId?: SortOrder
    task?: SortOrder
    context?: SortOrder
    status?: SortOrder
    chunks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIStreamSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    sessionId?: SortOrder
    task?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIStreamSessionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    sessionId?: SortOrder
    task?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAIProviderTypeFieldUpdateOperationsInput = {
    set?: $Enums.AIProviderType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AIDatasetCreatetagsInput = {
    set: string[]
  }

  export type AIDatasetVersionCreateNestedManyWithoutDatasetInput = {
    create?: XOR<AIDatasetVersionCreateWithoutDatasetInput, AIDatasetVersionUncheckedCreateWithoutDatasetInput> | AIDatasetVersionCreateWithoutDatasetInput[] | AIDatasetVersionUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetVersionCreateOrConnectWithoutDatasetInput | AIDatasetVersionCreateOrConnectWithoutDatasetInput[]
    createMany?: AIDatasetVersionCreateManyDatasetInputEnvelope
    connect?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
  }

  export type AIDatasetRecordCreateNestedManyWithoutDatasetInput = {
    create?: XOR<AIDatasetRecordCreateWithoutDatasetInput, AIDatasetRecordUncheckedCreateWithoutDatasetInput> | AIDatasetRecordCreateWithoutDatasetInput[] | AIDatasetRecordUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutDatasetInput | AIDatasetRecordCreateOrConnectWithoutDatasetInput[]
    createMany?: AIDatasetRecordCreateManyDatasetInputEnvelope
    connect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
  }

  export type AIDatasetAuditLogCreateNestedManyWithoutDatasetInput = {
    create?: XOR<AIDatasetAuditLogCreateWithoutDatasetInput, AIDatasetAuditLogUncheckedCreateWithoutDatasetInput> | AIDatasetAuditLogCreateWithoutDatasetInput[] | AIDatasetAuditLogUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetAuditLogCreateOrConnectWithoutDatasetInput | AIDatasetAuditLogCreateOrConnectWithoutDatasetInput[]
    createMany?: AIDatasetAuditLogCreateManyDatasetInputEnvelope
    connect?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
  }

  export type AIDatasetVersionUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<AIDatasetVersionCreateWithoutDatasetInput, AIDatasetVersionUncheckedCreateWithoutDatasetInput> | AIDatasetVersionCreateWithoutDatasetInput[] | AIDatasetVersionUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetVersionCreateOrConnectWithoutDatasetInput | AIDatasetVersionCreateOrConnectWithoutDatasetInput[]
    createMany?: AIDatasetVersionCreateManyDatasetInputEnvelope
    connect?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
  }

  export type AIDatasetRecordUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<AIDatasetRecordCreateWithoutDatasetInput, AIDatasetRecordUncheckedCreateWithoutDatasetInput> | AIDatasetRecordCreateWithoutDatasetInput[] | AIDatasetRecordUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutDatasetInput | AIDatasetRecordCreateOrConnectWithoutDatasetInput[]
    createMany?: AIDatasetRecordCreateManyDatasetInputEnvelope
    connect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
  }

  export type AIDatasetAuditLogUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<AIDatasetAuditLogCreateWithoutDatasetInput, AIDatasetAuditLogUncheckedCreateWithoutDatasetInput> | AIDatasetAuditLogCreateWithoutDatasetInput[] | AIDatasetAuditLogUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetAuditLogCreateOrConnectWithoutDatasetInput | AIDatasetAuditLogCreateOrConnectWithoutDatasetInput[]
    createMany?: AIDatasetAuditLogCreateManyDatasetInputEnvelope
    connect?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
  }

  export type EnumAIDatasetTypeFieldUpdateOperationsInput = {
    set?: $Enums.AIDatasetType
  }

  export type AIDatasetUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AIDatasetVersionUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<AIDatasetVersionCreateWithoutDatasetInput, AIDatasetVersionUncheckedCreateWithoutDatasetInput> | AIDatasetVersionCreateWithoutDatasetInput[] | AIDatasetVersionUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetVersionCreateOrConnectWithoutDatasetInput | AIDatasetVersionCreateOrConnectWithoutDatasetInput[]
    upsert?: AIDatasetVersionUpsertWithWhereUniqueWithoutDatasetInput | AIDatasetVersionUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: AIDatasetVersionCreateManyDatasetInputEnvelope
    set?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
    disconnect?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
    delete?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
    connect?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
    update?: AIDatasetVersionUpdateWithWhereUniqueWithoutDatasetInput | AIDatasetVersionUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: AIDatasetVersionUpdateManyWithWhereWithoutDatasetInput | AIDatasetVersionUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: AIDatasetVersionScalarWhereInput | AIDatasetVersionScalarWhereInput[]
  }

  export type AIDatasetRecordUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<AIDatasetRecordCreateWithoutDatasetInput, AIDatasetRecordUncheckedCreateWithoutDatasetInput> | AIDatasetRecordCreateWithoutDatasetInput[] | AIDatasetRecordUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutDatasetInput | AIDatasetRecordCreateOrConnectWithoutDatasetInput[]
    upsert?: AIDatasetRecordUpsertWithWhereUniqueWithoutDatasetInput | AIDatasetRecordUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: AIDatasetRecordCreateManyDatasetInputEnvelope
    set?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    disconnect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    delete?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    connect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    update?: AIDatasetRecordUpdateWithWhereUniqueWithoutDatasetInput | AIDatasetRecordUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: AIDatasetRecordUpdateManyWithWhereWithoutDatasetInput | AIDatasetRecordUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: AIDatasetRecordScalarWhereInput | AIDatasetRecordScalarWhereInput[]
  }

  export type AIDatasetAuditLogUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<AIDatasetAuditLogCreateWithoutDatasetInput, AIDatasetAuditLogUncheckedCreateWithoutDatasetInput> | AIDatasetAuditLogCreateWithoutDatasetInput[] | AIDatasetAuditLogUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetAuditLogCreateOrConnectWithoutDatasetInput | AIDatasetAuditLogCreateOrConnectWithoutDatasetInput[]
    upsert?: AIDatasetAuditLogUpsertWithWhereUniqueWithoutDatasetInput | AIDatasetAuditLogUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: AIDatasetAuditLogCreateManyDatasetInputEnvelope
    set?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
    disconnect?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
    delete?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
    connect?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
    update?: AIDatasetAuditLogUpdateWithWhereUniqueWithoutDatasetInput | AIDatasetAuditLogUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: AIDatasetAuditLogUpdateManyWithWhereWithoutDatasetInput | AIDatasetAuditLogUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: AIDatasetAuditLogScalarWhereInput | AIDatasetAuditLogScalarWhereInput[]
  }

  export type AIDatasetVersionUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<AIDatasetVersionCreateWithoutDatasetInput, AIDatasetVersionUncheckedCreateWithoutDatasetInput> | AIDatasetVersionCreateWithoutDatasetInput[] | AIDatasetVersionUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetVersionCreateOrConnectWithoutDatasetInput | AIDatasetVersionCreateOrConnectWithoutDatasetInput[]
    upsert?: AIDatasetVersionUpsertWithWhereUniqueWithoutDatasetInput | AIDatasetVersionUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: AIDatasetVersionCreateManyDatasetInputEnvelope
    set?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
    disconnect?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
    delete?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
    connect?: AIDatasetVersionWhereUniqueInput | AIDatasetVersionWhereUniqueInput[]
    update?: AIDatasetVersionUpdateWithWhereUniqueWithoutDatasetInput | AIDatasetVersionUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: AIDatasetVersionUpdateManyWithWhereWithoutDatasetInput | AIDatasetVersionUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: AIDatasetVersionScalarWhereInput | AIDatasetVersionScalarWhereInput[]
  }

  export type AIDatasetRecordUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<AIDatasetRecordCreateWithoutDatasetInput, AIDatasetRecordUncheckedCreateWithoutDatasetInput> | AIDatasetRecordCreateWithoutDatasetInput[] | AIDatasetRecordUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutDatasetInput | AIDatasetRecordCreateOrConnectWithoutDatasetInput[]
    upsert?: AIDatasetRecordUpsertWithWhereUniqueWithoutDatasetInput | AIDatasetRecordUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: AIDatasetRecordCreateManyDatasetInputEnvelope
    set?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    disconnect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    delete?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    connect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    update?: AIDatasetRecordUpdateWithWhereUniqueWithoutDatasetInput | AIDatasetRecordUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: AIDatasetRecordUpdateManyWithWhereWithoutDatasetInput | AIDatasetRecordUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: AIDatasetRecordScalarWhereInput | AIDatasetRecordScalarWhereInput[]
  }

  export type AIDatasetAuditLogUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<AIDatasetAuditLogCreateWithoutDatasetInput, AIDatasetAuditLogUncheckedCreateWithoutDatasetInput> | AIDatasetAuditLogCreateWithoutDatasetInput[] | AIDatasetAuditLogUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: AIDatasetAuditLogCreateOrConnectWithoutDatasetInput | AIDatasetAuditLogCreateOrConnectWithoutDatasetInput[]
    upsert?: AIDatasetAuditLogUpsertWithWhereUniqueWithoutDatasetInput | AIDatasetAuditLogUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: AIDatasetAuditLogCreateManyDatasetInputEnvelope
    set?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
    disconnect?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
    delete?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
    connect?: AIDatasetAuditLogWhereUniqueInput | AIDatasetAuditLogWhereUniqueInput[]
    update?: AIDatasetAuditLogUpdateWithWhereUniqueWithoutDatasetInput | AIDatasetAuditLogUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: AIDatasetAuditLogUpdateManyWithWhereWithoutDatasetInput | AIDatasetAuditLogUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: AIDatasetAuditLogScalarWhereInput | AIDatasetAuditLogScalarWhereInput[]
  }

  export type AIDatasetCreateNestedOneWithoutVersionsInput = {
    create?: XOR<AIDatasetCreateWithoutVersionsInput, AIDatasetUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: AIDatasetCreateOrConnectWithoutVersionsInput
    connect?: AIDatasetWhereUniqueInput
  }

  export type AIDatasetRecordCreateNestedManyWithoutVersionInput = {
    create?: XOR<AIDatasetRecordCreateWithoutVersionInput, AIDatasetRecordUncheckedCreateWithoutVersionInput> | AIDatasetRecordCreateWithoutVersionInput[] | AIDatasetRecordUncheckedCreateWithoutVersionInput[]
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutVersionInput | AIDatasetRecordCreateOrConnectWithoutVersionInput[]
    createMany?: AIDatasetRecordCreateManyVersionInputEnvelope
    connect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
  }

  export type AIDatasetRecordUncheckedCreateNestedManyWithoutVersionInput = {
    create?: XOR<AIDatasetRecordCreateWithoutVersionInput, AIDatasetRecordUncheckedCreateWithoutVersionInput> | AIDatasetRecordCreateWithoutVersionInput[] | AIDatasetRecordUncheckedCreateWithoutVersionInput[]
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutVersionInput | AIDatasetRecordCreateOrConnectWithoutVersionInput[]
    createMany?: AIDatasetRecordCreateManyVersionInputEnvelope
    connect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
  }

  export type AIDatasetUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<AIDatasetCreateWithoutVersionsInput, AIDatasetUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: AIDatasetCreateOrConnectWithoutVersionsInput
    upsert?: AIDatasetUpsertWithoutVersionsInput
    connect?: AIDatasetWhereUniqueInput
    update?: XOR<XOR<AIDatasetUpdateToOneWithWhereWithoutVersionsInput, AIDatasetUpdateWithoutVersionsInput>, AIDatasetUncheckedUpdateWithoutVersionsInput>
  }

  export type AIDatasetRecordUpdateManyWithoutVersionNestedInput = {
    create?: XOR<AIDatasetRecordCreateWithoutVersionInput, AIDatasetRecordUncheckedCreateWithoutVersionInput> | AIDatasetRecordCreateWithoutVersionInput[] | AIDatasetRecordUncheckedCreateWithoutVersionInput[]
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutVersionInput | AIDatasetRecordCreateOrConnectWithoutVersionInput[]
    upsert?: AIDatasetRecordUpsertWithWhereUniqueWithoutVersionInput | AIDatasetRecordUpsertWithWhereUniqueWithoutVersionInput[]
    createMany?: AIDatasetRecordCreateManyVersionInputEnvelope
    set?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    disconnect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    delete?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    connect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    update?: AIDatasetRecordUpdateWithWhereUniqueWithoutVersionInput | AIDatasetRecordUpdateWithWhereUniqueWithoutVersionInput[]
    updateMany?: AIDatasetRecordUpdateManyWithWhereWithoutVersionInput | AIDatasetRecordUpdateManyWithWhereWithoutVersionInput[]
    deleteMany?: AIDatasetRecordScalarWhereInput | AIDatasetRecordScalarWhereInput[]
  }

  export type AIDatasetRecordUncheckedUpdateManyWithoutVersionNestedInput = {
    create?: XOR<AIDatasetRecordCreateWithoutVersionInput, AIDatasetRecordUncheckedCreateWithoutVersionInput> | AIDatasetRecordCreateWithoutVersionInput[] | AIDatasetRecordUncheckedCreateWithoutVersionInput[]
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutVersionInput | AIDatasetRecordCreateOrConnectWithoutVersionInput[]
    upsert?: AIDatasetRecordUpsertWithWhereUniqueWithoutVersionInput | AIDatasetRecordUpsertWithWhereUniqueWithoutVersionInput[]
    createMany?: AIDatasetRecordCreateManyVersionInputEnvelope
    set?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    disconnect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    delete?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    connect?: AIDatasetRecordWhereUniqueInput | AIDatasetRecordWhereUniqueInput[]
    update?: AIDatasetRecordUpdateWithWhereUniqueWithoutVersionInput | AIDatasetRecordUpdateWithWhereUniqueWithoutVersionInput[]
    updateMany?: AIDatasetRecordUpdateManyWithWhereWithoutVersionInput | AIDatasetRecordUpdateManyWithWhereWithoutVersionInput[]
    deleteMany?: AIDatasetRecordScalarWhereInput | AIDatasetRecordScalarWhereInput[]
  }

  export type AIDatasetCreateNestedOneWithoutRecordsInput = {
    create?: XOR<AIDatasetCreateWithoutRecordsInput, AIDatasetUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: AIDatasetCreateOrConnectWithoutRecordsInput
    connect?: AIDatasetWhereUniqueInput
  }

  export type AIDatasetVersionCreateNestedOneWithoutRecordsInput = {
    create?: XOR<AIDatasetVersionCreateWithoutRecordsInput, AIDatasetVersionUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: AIDatasetVersionCreateOrConnectWithoutRecordsInput
    connect?: AIDatasetVersionWhereUniqueInput
  }

  export type AIDatasetLabelCreateNestedManyWithoutRecordInput = {
    create?: XOR<AIDatasetLabelCreateWithoutRecordInput, AIDatasetLabelUncheckedCreateWithoutRecordInput> | AIDatasetLabelCreateWithoutRecordInput[] | AIDatasetLabelUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: AIDatasetLabelCreateOrConnectWithoutRecordInput | AIDatasetLabelCreateOrConnectWithoutRecordInput[]
    createMany?: AIDatasetLabelCreateManyRecordInputEnvelope
    connect?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
  }

  export type AIDatasetLabelUncheckedCreateNestedManyWithoutRecordInput = {
    create?: XOR<AIDatasetLabelCreateWithoutRecordInput, AIDatasetLabelUncheckedCreateWithoutRecordInput> | AIDatasetLabelCreateWithoutRecordInput[] | AIDatasetLabelUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: AIDatasetLabelCreateOrConnectWithoutRecordInput | AIDatasetLabelCreateOrConnectWithoutRecordInput[]
    createMany?: AIDatasetLabelCreateManyRecordInputEnvelope
    connect?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
  }

  export type AIDatasetUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<AIDatasetCreateWithoutRecordsInput, AIDatasetUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: AIDatasetCreateOrConnectWithoutRecordsInput
    upsert?: AIDatasetUpsertWithoutRecordsInput
    connect?: AIDatasetWhereUniqueInput
    update?: XOR<XOR<AIDatasetUpdateToOneWithWhereWithoutRecordsInput, AIDatasetUpdateWithoutRecordsInput>, AIDatasetUncheckedUpdateWithoutRecordsInput>
  }

  export type AIDatasetVersionUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<AIDatasetVersionCreateWithoutRecordsInput, AIDatasetVersionUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: AIDatasetVersionCreateOrConnectWithoutRecordsInput
    upsert?: AIDatasetVersionUpsertWithoutRecordsInput
    connect?: AIDatasetVersionWhereUniqueInput
    update?: XOR<XOR<AIDatasetVersionUpdateToOneWithWhereWithoutRecordsInput, AIDatasetVersionUpdateWithoutRecordsInput>, AIDatasetVersionUncheckedUpdateWithoutRecordsInput>
  }

  export type AIDatasetLabelUpdateManyWithoutRecordNestedInput = {
    create?: XOR<AIDatasetLabelCreateWithoutRecordInput, AIDatasetLabelUncheckedCreateWithoutRecordInput> | AIDatasetLabelCreateWithoutRecordInput[] | AIDatasetLabelUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: AIDatasetLabelCreateOrConnectWithoutRecordInput | AIDatasetLabelCreateOrConnectWithoutRecordInput[]
    upsert?: AIDatasetLabelUpsertWithWhereUniqueWithoutRecordInput | AIDatasetLabelUpsertWithWhereUniqueWithoutRecordInput[]
    createMany?: AIDatasetLabelCreateManyRecordInputEnvelope
    set?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
    disconnect?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
    delete?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
    connect?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
    update?: AIDatasetLabelUpdateWithWhereUniqueWithoutRecordInput | AIDatasetLabelUpdateWithWhereUniqueWithoutRecordInput[]
    updateMany?: AIDatasetLabelUpdateManyWithWhereWithoutRecordInput | AIDatasetLabelUpdateManyWithWhereWithoutRecordInput[]
    deleteMany?: AIDatasetLabelScalarWhereInput | AIDatasetLabelScalarWhereInput[]
  }

  export type AIDatasetLabelUncheckedUpdateManyWithoutRecordNestedInput = {
    create?: XOR<AIDatasetLabelCreateWithoutRecordInput, AIDatasetLabelUncheckedCreateWithoutRecordInput> | AIDatasetLabelCreateWithoutRecordInput[] | AIDatasetLabelUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: AIDatasetLabelCreateOrConnectWithoutRecordInput | AIDatasetLabelCreateOrConnectWithoutRecordInput[]
    upsert?: AIDatasetLabelUpsertWithWhereUniqueWithoutRecordInput | AIDatasetLabelUpsertWithWhereUniqueWithoutRecordInput[]
    createMany?: AIDatasetLabelCreateManyRecordInputEnvelope
    set?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
    disconnect?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
    delete?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
    connect?: AIDatasetLabelWhereUniqueInput | AIDatasetLabelWhereUniqueInput[]
    update?: AIDatasetLabelUpdateWithWhereUniqueWithoutRecordInput | AIDatasetLabelUpdateWithWhereUniqueWithoutRecordInput[]
    updateMany?: AIDatasetLabelUpdateManyWithWhereWithoutRecordInput | AIDatasetLabelUpdateManyWithWhereWithoutRecordInput[]
    deleteMany?: AIDatasetLabelScalarWhereInput | AIDatasetLabelScalarWhereInput[]
  }

  export type AIDatasetRecordCreateNestedOneWithoutLabelsInput = {
    create?: XOR<AIDatasetRecordCreateWithoutLabelsInput, AIDatasetRecordUncheckedCreateWithoutLabelsInput>
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutLabelsInput
    connect?: AIDatasetRecordWhereUniqueInput
  }

  export type EnumAIDatasetLabelTypeFieldUpdateOperationsInput = {
    set?: $Enums.AIDatasetLabelType
  }

  export type AIDatasetRecordUpdateOneRequiredWithoutLabelsNestedInput = {
    create?: XOR<AIDatasetRecordCreateWithoutLabelsInput, AIDatasetRecordUncheckedCreateWithoutLabelsInput>
    connectOrCreate?: AIDatasetRecordCreateOrConnectWithoutLabelsInput
    upsert?: AIDatasetRecordUpsertWithoutLabelsInput
    connect?: AIDatasetRecordWhereUniqueInput
    update?: XOR<XOR<AIDatasetRecordUpdateToOneWithWhereWithoutLabelsInput, AIDatasetRecordUpdateWithoutLabelsInput>, AIDatasetRecordUncheckedUpdateWithoutLabelsInput>
  }

  export type AIDatasetCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<AIDatasetCreateWithoutAuditLogsInput, AIDatasetUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: AIDatasetCreateOrConnectWithoutAuditLogsInput
    connect?: AIDatasetWhereUniqueInput
  }

  export type AIDatasetUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<AIDatasetCreateWithoutAuditLogsInput, AIDatasetUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: AIDatasetCreateOrConnectWithoutAuditLogsInput
    upsert?: AIDatasetUpsertWithoutAuditLogsInput
    connect?: AIDatasetWhereUniqueInput
    update?: XOR<XOR<AIDatasetUpdateToOneWithWhereWithoutAuditLogsInput, AIDatasetUpdateWithoutAuditLogsInput>, AIDatasetUncheckedUpdateWithoutAuditLogsInput>
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

  export type NestedEnumAIProviderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProviderType | EnumAIProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIProviderType[] | ListEnumAIProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProviderType[] | ListEnumAIProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderTypeFilter<$PrismaModel> | $Enums.AIProviderType
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

  export type NestedEnumAIProviderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProviderType | EnumAIProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIProviderType[] | ListEnumAIProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProviderType[] | ListEnumAIProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderTypeWithAggregatesFilter<$PrismaModel> | $Enums.AIProviderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIProviderTypeFilter<$PrismaModel>
    _max?: NestedEnumAIProviderTypeFilter<$PrismaModel>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAIDatasetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDatasetType | EnumAIDatasetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDatasetType[] | ListEnumAIDatasetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDatasetType[] | ListEnumAIDatasetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDatasetTypeFilter<$PrismaModel> | $Enums.AIDatasetType
  }

  export type NestedEnumAIDatasetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDatasetType | EnumAIDatasetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDatasetType[] | ListEnumAIDatasetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDatasetType[] | ListEnumAIDatasetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDatasetTypeWithAggregatesFilter<$PrismaModel> | $Enums.AIDatasetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDatasetTypeFilter<$PrismaModel>
    _max?: NestedEnumAIDatasetTypeFilter<$PrismaModel>
  }

  export type NestedEnumAIDatasetLabelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDatasetLabelType | EnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDatasetLabelType[] | ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDatasetLabelType[] | ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDatasetLabelTypeFilter<$PrismaModel> | $Enums.AIDatasetLabelType
  }

  export type NestedEnumAIDatasetLabelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDatasetLabelType | EnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDatasetLabelType[] | ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDatasetLabelType[] | ListEnumAIDatasetLabelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDatasetLabelTypeWithAggregatesFilter<$PrismaModel> | $Enums.AIDatasetLabelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDatasetLabelTypeFilter<$PrismaModel>
    _max?: NestedEnumAIDatasetLabelTypeFilter<$PrismaModel>
  }

  export type AIDatasetVersionCreateWithoutDatasetInput = {
    id?: string
    tenantId: string
    versionNumber: number
    recordCount?: number
    embeddingModel?: string | null
    createdByUserId: string
    createdAt?: Date | string
    records?: AIDatasetRecordCreateNestedManyWithoutVersionInput
  }

  export type AIDatasetVersionUncheckedCreateWithoutDatasetInput = {
    id?: string
    tenantId: string
    versionNumber: number
    recordCount?: number
    embeddingModel?: string | null
    createdByUserId: string
    createdAt?: Date | string
    records?: AIDatasetRecordUncheckedCreateNestedManyWithoutVersionInput
  }

  export type AIDatasetVersionCreateOrConnectWithoutDatasetInput = {
    where: AIDatasetVersionWhereUniqueInput
    create: XOR<AIDatasetVersionCreateWithoutDatasetInput, AIDatasetVersionUncheckedCreateWithoutDatasetInput>
  }

  export type AIDatasetVersionCreateManyDatasetInputEnvelope = {
    data: AIDatasetVersionCreateManyDatasetInput | AIDatasetVersionCreateManyDatasetInput[]
    skipDuplicates?: boolean
  }

  export type AIDatasetRecordCreateWithoutDatasetInput = {
    id?: string
    tenantId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    version: AIDatasetVersionCreateNestedOneWithoutRecordsInput
    labels?: AIDatasetLabelCreateNestedManyWithoutRecordInput
  }

  export type AIDatasetRecordUncheckedCreateWithoutDatasetInput = {
    id?: string
    tenantId: string
    versionId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    labels?: AIDatasetLabelUncheckedCreateNestedManyWithoutRecordInput
  }

  export type AIDatasetRecordCreateOrConnectWithoutDatasetInput = {
    where: AIDatasetRecordWhereUniqueInput
    create: XOR<AIDatasetRecordCreateWithoutDatasetInput, AIDatasetRecordUncheckedCreateWithoutDatasetInput>
  }

  export type AIDatasetRecordCreateManyDatasetInputEnvelope = {
    data: AIDatasetRecordCreateManyDatasetInput | AIDatasetRecordCreateManyDatasetInput[]
    skipDuplicates?: boolean
  }

  export type AIDatasetAuditLogCreateWithoutDatasetInput = {
    id?: string
    tenantId: string
    action: string
    userId: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetAuditLogUncheckedCreateWithoutDatasetInput = {
    id?: string
    tenantId: string
    action: string
    userId: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetAuditLogCreateOrConnectWithoutDatasetInput = {
    where: AIDatasetAuditLogWhereUniqueInput
    create: XOR<AIDatasetAuditLogCreateWithoutDatasetInput, AIDatasetAuditLogUncheckedCreateWithoutDatasetInput>
  }

  export type AIDatasetAuditLogCreateManyDatasetInputEnvelope = {
    data: AIDatasetAuditLogCreateManyDatasetInput | AIDatasetAuditLogCreateManyDatasetInput[]
    skipDuplicates?: boolean
  }

  export type AIDatasetVersionUpsertWithWhereUniqueWithoutDatasetInput = {
    where: AIDatasetVersionWhereUniqueInput
    update: XOR<AIDatasetVersionUpdateWithoutDatasetInput, AIDatasetVersionUncheckedUpdateWithoutDatasetInput>
    create: XOR<AIDatasetVersionCreateWithoutDatasetInput, AIDatasetVersionUncheckedCreateWithoutDatasetInput>
  }

  export type AIDatasetVersionUpdateWithWhereUniqueWithoutDatasetInput = {
    where: AIDatasetVersionWhereUniqueInput
    data: XOR<AIDatasetVersionUpdateWithoutDatasetInput, AIDatasetVersionUncheckedUpdateWithoutDatasetInput>
  }

  export type AIDatasetVersionUpdateManyWithWhereWithoutDatasetInput = {
    where: AIDatasetVersionScalarWhereInput
    data: XOR<AIDatasetVersionUpdateManyMutationInput, AIDatasetVersionUncheckedUpdateManyWithoutDatasetInput>
  }

  export type AIDatasetVersionScalarWhereInput = {
    AND?: AIDatasetVersionScalarWhereInput | AIDatasetVersionScalarWhereInput[]
    OR?: AIDatasetVersionScalarWhereInput[]
    NOT?: AIDatasetVersionScalarWhereInput | AIDatasetVersionScalarWhereInput[]
    id?: StringFilter<"AIDatasetVersion"> | string
    tenantId?: StringFilter<"AIDatasetVersion"> | string
    datasetId?: StringFilter<"AIDatasetVersion"> | string
    versionNumber?: IntFilter<"AIDatasetVersion"> | number
    recordCount?: IntFilter<"AIDatasetVersion"> | number
    embeddingModel?: StringNullableFilter<"AIDatasetVersion"> | string | null
    createdByUserId?: StringFilter<"AIDatasetVersion"> | string
    createdAt?: DateTimeFilter<"AIDatasetVersion"> | Date | string
  }

  export type AIDatasetRecordUpsertWithWhereUniqueWithoutDatasetInput = {
    where: AIDatasetRecordWhereUniqueInput
    update: XOR<AIDatasetRecordUpdateWithoutDatasetInput, AIDatasetRecordUncheckedUpdateWithoutDatasetInput>
    create: XOR<AIDatasetRecordCreateWithoutDatasetInput, AIDatasetRecordUncheckedCreateWithoutDatasetInput>
  }

  export type AIDatasetRecordUpdateWithWhereUniqueWithoutDatasetInput = {
    where: AIDatasetRecordWhereUniqueInput
    data: XOR<AIDatasetRecordUpdateWithoutDatasetInput, AIDatasetRecordUncheckedUpdateWithoutDatasetInput>
  }

  export type AIDatasetRecordUpdateManyWithWhereWithoutDatasetInput = {
    where: AIDatasetRecordScalarWhereInput
    data: XOR<AIDatasetRecordUpdateManyMutationInput, AIDatasetRecordUncheckedUpdateManyWithoutDatasetInput>
  }

  export type AIDatasetRecordScalarWhereInput = {
    AND?: AIDatasetRecordScalarWhereInput | AIDatasetRecordScalarWhereInput[]
    OR?: AIDatasetRecordScalarWhereInput[]
    NOT?: AIDatasetRecordScalarWhereInput | AIDatasetRecordScalarWhereInput[]
    id?: StringFilter<"AIDatasetRecord"> | string
    tenantId?: StringFilter<"AIDatasetRecord"> | string
    datasetId?: StringFilter<"AIDatasetRecord"> | string
    versionId?: StringFilter<"AIDatasetRecord"> | string
    input?: JsonFilter<"AIDatasetRecord">
    output?: JsonNullableFilter<"AIDatasetRecord">
    metadata?: JsonFilter<"AIDatasetRecord">
    embedding?: JsonNullableFilter<"AIDatasetRecord">
    createdAt?: DateTimeFilter<"AIDatasetRecord"> | Date | string
  }

  export type AIDatasetAuditLogUpsertWithWhereUniqueWithoutDatasetInput = {
    where: AIDatasetAuditLogWhereUniqueInput
    update: XOR<AIDatasetAuditLogUpdateWithoutDatasetInput, AIDatasetAuditLogUncheckedUpdateWithoutDatasetInput>
    create: XOR<AIDatasetAuditLogCreateWithoutDatasetInput, AIDatasetAuditLogUncheckedCreateWithoutDatasetInput>
  }

  export type AIDatasetAuditLogUpdateWithWhereUniqueWithoutDatasetInput = {
    where: AIDatasetAuditLogWhereUniqueInput
    data: XOR<AIDatasetAuditLogUpdateWithoutDatasetInput, AIDatasetAuditLogUncheckedUpdateWithoutDatasetInput>
  }

  export type AIDatasetAuditLogUpdateManyWithWhereWithoutDatasetInput = {
    where: AIDatasetAuditLogScalarWhereInput
    data: XOR<AIDatasetAuditLogUpdateManyMutationInput, AIDatasetAuditLogUncheckedUpdateManyWithoutDatasetInput>
  }

  export type AIDatasetAuditLogScalarWhereInput = {
    AND?: AIDatasetAuditLogScalarWhereInput | AIDatasetAuditLogScalarWhereInput[]
    OR?: AIDatasetAuditLogScalarWhereInput[]
    NOT?: AIDatasetAuditLogScalarWhereInput | AIDatasetAuditLogScalarWhereInput[]
    id?: StringFilter<"AIDatasetAuditLog"> | string
    tenantId?: StringFilter<"AIDatasetAuditLog"> | string
    datasetId?: StringFilter<"AIDatasetAuditLog"> | string
    action?: StringFilter<"AIDatasetAuditLog"> | string
    userId?: StringFilter<"AIDatasetAuditLog"> | string
    metadata?: JsonFilter<"AIDatasetAuditLog">
    createdAt?: DateTimeFilter<"AIDatasetAuditLog"> | Date | string
  }

  export type AIDatasetCreateWithoutVersionsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: AIDatasetRecordCreateNestedManyWithoutDatasetInput
    auditLogs?: AIDatasetAuditLogCreateNestedManyWithoutDatasetInput
  }

  export type AIDatasetUncheckedCreateWithoutVersionsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: AIDatasetRecordUncheckedCreateNestedManyWithoutDatasetInput
    auditLogs?: AIDatasetAuditLogUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type AIDatasetCreateOrConnectWithoutVersionsInput = {
    where: AIDatasetWhereUniqueInput
    create: XOR<AIDatasetCreateWithoutVersionsInput, AIDatasetUncheckedCreateWithoutVersionsInput>
  }

  export type AIDatasetRecordCreateWithoutVersionInput = {
    id?: string
    tenantId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    dataset: AIDatasetCreateNestedOneWithoutRecordsInput
    labels?: AIDatasetLabelCreateNestedManyWithoutRecordInput
  }

  export type AIDatasetRecordUncheckedCreateWithoutVersionInput = {
    id?: string
    tenantId: string
    datasetId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    labels?: AIDatasetLabelUncheckedCreateNestedManyWithoutRecordInput
  }

  export type AIDatasetRecordCreateOrConnectWithoutVersionInput = {
    where: AIDatasetRecordWhereUniqueInput
    create: XOR<AIDatasetRecordCreateWithoutVersionInput, AIDatasetRecordUncheckedCreateWithoutVersionInput>
  }

  export type AIDatasetRecordCreateManyVersionInputEnvelope = {
    data: AIDatasetRecordCreateManyVersionInput | AIDatasetRecordCreateManyVersionInput[]
    skipDuplicates?: boolean
  }

  export type AIDatasetUpsertWithoutVersionsInput = {
    update: XOR<AIDatasetUpdateWithoutVersionsInput, AIDatasetUncheckedUpdateWithoutVersionsInput>
    create: XOR<AIDatasetCreateWithoutVersionsInput, AIDatasetUncheckedCreateWithoutVersionsInput>
    where?: AIDatasetWhereInput
  }

  export type AIDatasetUpdateToOneWithWhereWithoutVersionsInput = {
    where?: AIDatasetWhereInput
    data: XOR<AIDatasetUpdateWithoutVersionsInput, AIDatasetUncheckedUpdateWithoutVersionsInput>
  }

  export type AIDatasetUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AIDatasetRecordUpdateManyWithoutDatasetNestedInput
    auditLogs?: AIDatasetAuditLogUpdateManyWithoutDatasetNestedInput
  }

  export type AIDatasetUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AIDatasetRecordUncheckedUpdateManyWithoutDatasetNestedInput
    auditLogs?: AIDatasetAuditLogUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type AIDatasetRecordUpsertWithWhereUniqueWithoutVersionInput = {
    where: AIDatasetRecordWhereUniqueInput
    update: XOR<AIDatasetRecordUpdateWithoutVersionInput, AIDatasetRecordUncheckedUpdateWithoutVersionInput>
    create: XOR<AIDatasetRecordCreateWithoutVersionInput, AIDatasetRecordUncheckedCreateWithoutVersionInput>
  }

  export type AIDatasetRecordUpdateWithWhereUniqueWithoutVersionInput = {
    where: AIDatasetRecordWhereUniqueInput
    data: XOR<AIDatasetRecordUpdateWithoutVersionInput, AIDatasetRecordUncheckedUpdateWithoutVersionInput>
  }

  export type AIDatasetRecordUpdateManyWithWhereWithoutVersionInput = {
    where: AIDatasetRecordScalarWhereInput
    data: XOR<AIDatasetRecordUpdateManyMutationInput, AIDatasetRecordUncheckedUpdateManyWithoutVersionInput>
  }

  export type AIDatasetCreateWithoutRecordsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: AIDatasetVersionCreateNestedManyWithoutDatasetInput
    auditLogs?: AIDatasetAuditLogCreateNestedManyWithoutDatasetInput
  }

  export type AIDatasetUncheckedCreateWithoutRecordsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: AIDatasetVersionUncheckedCreateNestedManyWithoutDatasetInput
    auditLogs?: AIDatasetAuditLogUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type AIDatasetCreateOrConnectWithoutRecordsInput = {
    where: AIDatasetWhereUniqueInput
    create: XOR<AIDatasetCreateWithoutRecordsInput, AIDatasetUncheckedCreateWithoutRecordsInput>
  }

  export type AIDatasetVersionCreateWithoutRecordsInput = {
    id?: string
    tenantId: string
    versionNumber: number
    recordCount?: number
    embeddingModel?: string | null
    createdByUserId: string
    createdAt?: Date | string
    dataset: AIDatasetCreateNestedOneWithoutVersionsInput
  }

  export type AIDatasetVersionUncheckedCreateWithoutRecordsInput = {
    id?: string
    tenantId: string
    datasetId: string
    versionNumber: number
    recordCount?: number
    embeddingModel?: string | null
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIDatasetVersionCreateOrConnectWithoutRecordsInput = {
    where: AIDatasetVersionWhereUniqueInput
    create: XOR<AIDatasetVersionCreateWithoutRecordsInput, AIDatasetVersionUncheckedCreateWithoutRecordsInput>
  }

  export type AIDatasetLabelCreateWithoutRecordInput = {
    id?: string
    tenantId: string
    labelType: $Enums.AIDatasetLabelType
    labelValue: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIDatasetLabelUncheckedCreateWithoutRecordInput = {
    id?: string
    tenantId: string
    labelType: $Enums.AIDatasetLabelType
    labelValue: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIDatasetLabelCreateOrConnectWithoutRecordInput = {
    where: AIDatasetLabelWhereUniqueInput
    create: XOR<AIDatasetLabelCreateWithoutRecordInput, AIDatasetLabelUncheckedCreateWithoutRecordInput>
  }

  export type AIDatasetLabelCreateManyRecordInputEnvelope = {
    data: AIDatasetLabelCreateManyRecordInput | AIDatasetLabelCreateManyRecordInput[]
    skipDuplicates?: boolean
  }

  export type AIDatasetUpsertWithoutRecordsInput = {
    update: XOR<AIDatasetUpdateWithoutRecordsInput, AIDatasetUncheckedUpdateWithoutRecordsInput>
    create: XOR<AIDatasetCreateWithoutRecordsInput, AIDatasetUncheckedCreateWithoutRecordsInput>
    where?: AIDatasetWhereInput
  }

  export type AIDatasetUpdateToOneWithWhereWithoutRecordsInput = {
    where?: AIDatasetWhereInput
    data: XOR<AIDatasetUpdateWithoutRecordsInput, AIDatasetUncheckedUpdateWithoutRecordsInput>
  }

  export type AIDatasetUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: AIDatasetVersionUpdateManyWithoutDatasetNestedInput
    auditLogs?: AIDatasetAuditLogUpdateManyWithoutDatasetNestedInput
  }

  export type AIDatasetUncheckedUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: AIDatasetVersionUncheckedUpdateManyWithoutDatasetNestedInput
    auditLogs?: AIDatasetAuditLogUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type AIDatasetVersionUpsertWithoutRecordsInput = {
    update: XOR<AIDatasetVersionUpdateWithoutRecordsInput, AIDatasetVersionUncheckedUpdateWithoutRecordsInput>
    create: XOR<AIDatasetVersionCreateWithoutRecordsInput, AIDatasetVersionUncheckedCreateWithoutRecordsInput>
    where?: AIDatasetVersionWhereInput
  }

  export type AIDatasetVersionUpdateToOneWithWhereWithoutRecordsInput = {
    where?: AIDatasetVersionWhereInput
    data: XOR<AIDatasetVersionUpdateWithoutRecordsInput, AIDatasetVersionUncheckedUpdateWithoutRecordsInput>
  }

  export type AIDatasetVersionUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: AIDatasetUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type AIDatasetVersionUncheckedUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetLabelUpsertWithWhereUniqueWithoutRecordInput = {
    where: AIDatasetLabelWhereUniqueInput
    update: XOR<AIDatasetLabelUpdateWithoutRecordInput, AIDatasetLabelUncheckedUpdateWithoutRecordInput>
    create: XOR<AIDatasetLabelCreateWithoutRecordInput, AIDatasetLabelUncheckedCreateWithoutRecordInput>
  }

  export type AIDatasetLabelUpdateWithWhereUniqueWithoutRecordInput = {
    where: AIDatasetLabelWhereUniqueInput
    data: XOR<AIDatasetLabelUpdateWithoutRecordInput, AIDatasetLabelUncheckedUpdateWithoutRecordInput>
  }

  export type AIDatasetLabelUpdateManyWithWhereWithoutRecordInput = {
    where: AIDatasetLabelScalarWhereInput
    data: XOR<AIDatasetLabelUpdateManyMutationInput, AIDatasetLabelUncheckedUpdateManyWithoutRecordInput>
  }

  export type AIDatasetLabelScalarWhereInput = {
    AND?: AIDatasetLabelScalarWhereInput | AIDatasetLabelScalarWhereInput[]
    OR?: AIDatasetLabelScalarWhereInput[]
    NOT?: AIDatasetLabelScalarWhereInput | AIDatasetLabelScalarWhereInput[]
    id?: StringFilter<"AIDatasetLabel"> | string
    tenantId?: StringFilter<"AIDatasetLabel"> | string
    recordId?: StringFilter<"AIDatasetLabel"> | string
    labelType?: EnumAIDatasetLabelTypeFilter<"AIDatasetLabel"> | $Enums.AIDatasetLabelType
    labelValue?: JsonFilter<"AIDatasetLabel">
    createdByUserId?: StringFilter<"AIDatasetLabel"> | string
    createdAt?: DateTimeFilter<"AIDatasetLabel"> | Date | string
  }

  export type AIDatasetRecordCreateWithoutLabelsInput = {
    id?: string
    tenantId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    dataset: AIDatasetCreateNestedOneWithoutRecordsInput
    version: AIDatasetVersionCreateNestedOneWithoutRecordsInput
  }

  export type AIDatasetRecordUncheckedCreateWithoutLabelsInput = {
    id?: string
    tenantId: string
    datasetId: string
    versionId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetRecordCreateOrConnectWithoutLabelsInput = {
    where: AIDatasetRecordWhereUniqueInput
    create: XOR<AIDatasetRecordCreateWithoutLabelsInput, AIDatasetRecordUncheckedCreateWithoutLabelsInput>
  }

  export type AIDatasetRecordUpsertWithoutLabelsInput = {
    update: XOR<AIDatasetRecordUpdateWithoutLabelsInput, AIDatasetRecordUncheckedUpdateWithoutLabelsInput>
    create: XOR<AIDatasetRecordCreateWithoutLabelsInput, AIDatasetRecordUncheckedCreateWithoutLabelsInput>
    where?: AIDatasetRecordWhereInput
  }

  export type AIDatasetRecordUpdateToOneWithWhereWithoutLabelsInput = {
    where?: AIDatasetRecordWhereInput
    data: XOR<AIDatasetRecordUpdateWithoutLabelsInput, AIDatasetRecordUncheckedUpdateWithoutLabelsInput>
  }

  export type AIDatasetRecordUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: AIDatasetUpdateOneRequiredWithoutRecordsNestedInput
    version?: AIDatasetVersionUpdateOneRequiredWithoutRecordsNestedInput
  }

  export type AIDatasetRecordUncheckedUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    versionId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetCreateWithoutAuditLogsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: AIDatasetVersionCreateNestedManyWithoutDatasetInput
    records?: AIDatasetRecordCreateNestedManyWithoutDatasetInput
  }

  export type AIDatasetUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    type?: $Enums.AIDatasetType
    tags?: AIDatasetCreatetagsInput | string[]
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: AIDatasetVersionUncheckedCreateNestedManyWithoutDatasetInput
    records?: AIDatasetRecordUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type AIDatasetCreateOrConnectWithoutAuditLogsInput = {
    where: AIDatasetWhereUniqueInput
    create: XOR<AIDatasetCreateWithoutAuditLogsInput, AIDatasetUncheckedCreateWithoutAuditLogsInput>
  }

  export type AIDatasetUpsertWithoutAuditLogsInput = {
    update: XOR<AIDatasetUpdateWithoutAuditLogsInput, AIDatasetUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<AIDatasetCreateWithoutAuditLogsInput, AIDatasetUncheckedCreateWithoutAuditLogsInput>
    where?: AIDatasetWhereInput
  }

  export type AIDatasetUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: AIDatasetWhereInput
    data: XOR<AIDatasetUpdateWithoutAuditLogsInput, AIDatasetUncheckedUpdateWithoutAuditLogsInput>
  }

  export type AIDatasetUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: AIDatasetVersionUpdateManyWithoutDatasetNestedInput
    records?: AIDatasetRecordUpdateManyWithoutDatasetNestedInput
  }

  export type AIDatasetUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    type?: EnumAIDatasetTypeFieldUpdateOperationsInput | $Enums.AIDatasetType
    tags?: AIDatasetUpdatetagsInput | string[]
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: AIDatasetVersionUncheckedUpdateManyWithoutDatasetNestedInput
    records?: AIDatasetRecordUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type AIDatasetVersionCreateManyDatasetInput = {
    id?: string
    tenantId: string
    versionNumber: number
    recordCount?: number
    embeddingModel?: string | null
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIDatasetRecordCreateManyDatasetInput = {
    id?: string
    tenantId: string
    versionId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetAuditLogCreateManyDatasetInput = {
    id?: string
    tenantId: string
    action: string
    userId: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetVersionUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AIDatasetRecordUpdateManyWithoutVersionNestedInput
  }

  export type AIDatasetVersionUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AIDatasetRecordUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type AIDatasetVersionUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    recordCount?: IntFieldUpdateOperationsInput | number
    embeddingModel?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetRecordUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: AIDatasetVersionUpdateOneRequiredWithoutRecordsNestedInput
    labels?: AIDatasetLabelUpdateManyWithoutRecordNestedInput
  }

  export type AIDatasetRecordUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    versionId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: AIDatasetLabelUncheckedUpdateManyWithoutRecordNestedInput
  }

  export type AIDatasetRecordUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    versionId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetAuditLogUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetAuditLogUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetAuditLogUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetRecordCreateManyVersionInput = {
    id?: string
    tenantId: string
    datasetId: string
    input: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIDatasetRecordUpdateWithoutVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: AIDatasetUpdateOneRequiredWithoutRecordsNestedInput
    labels?: AIDatasetLabelUpdateManyWithoutRecordNestedInput
  }

  export type AIDatasetRecordUncheckedUpdateWithoutVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    labels?: AIDatasetLabelUncheckedUpdateManyWithoutRecordNestedInput
  }

  export type AIDatasetRecordUncheckedUpdateManyWithoutVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    input?: JsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
    embedding?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetLabelCreateManyRecordInput = {
    id?: string
    tenantId: string
    labelType: $Enums.AIDatasetLabelType
    labelValue: JsonNullValueInput | InputJsonValue
    createdByUserId: string
    createdAt?: Date | string
  }

  export type AIDatasetLabelUpdateWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    labelType?: EnumAIDatasetLabelTypeFieldUpdateOperationsInput | $Enums.AIDatasetLabelType
    labelValue?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetLabelUncheckedUpdateWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    labelType?: EnumAIDatasetLabelTypeFieldUpdateOperationsInput | $Enums.AIDatasetLabelType
    labelValue?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDatasetLabelUncheckedUpdateManyWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    labelType?: EnumAIDatasetLabelTypeFieldUpdateOperationsInput | $Enums.AIDatasetLabelType
    labelValue?: JsonNullValueInput | InputJsonValue
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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