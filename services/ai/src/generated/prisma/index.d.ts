
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
 * Model AIWorkflowRun
 * 
 */
export type AIWorkflowRun = $Result.DefaultSelection<Prisma.$AIWorkflowRunPayload>
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

}

export type AIProviderType = $Enums.AIProviderType

export const AIProviderType: typeof $Enums.AIProviderType

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
   * `prisma.aIWorkflowRun`: Exposes CRUD operations for the **AIWorkflowRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIWorkflowRuns
    * const aIWorkflowRuns = await prisma.aIWorkflowRun.findMany()
    * ```
    */
  get aIWorkflowRun(): Prisma.AIWorkflowRunDelegate<ExtArgs, ClientOptions>;

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
    AIWorkflowRun: 'AIWorkflowRun',
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
      modelProps: "aIProviderConfig" | "aIRequestLog" | "aIMemory" | "aIWorkflowRun" | "aIStreamSession"
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
    aIWorkflowRun?: AIWorkflowRunOmit
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
    createdAt?: boolean
  }

  export type AIRequestLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "provider" | "modelName" | "prompt" | "response" | "tokensInput" | "tokensOutput" | "latencyMs" | "createdAt", ExtArgs["result"]["aIRequestLog"]>

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
    trigger: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIWorkflowRunMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    trigger: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIWorkflowRunCountAggregateOutputType = {
    id: number
    tenantId: number
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
    trigger?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIWorkflowRunMaxAggregateInputType = {
    id?: true
    tenantId?: true
    trigger?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIWorkflowRunCountAggregateInputType = {
    id?: true
    tenantId?: true
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
    trigger?: boolean
    status?: boolean
    steps?: boolean
    result?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIWorkflowRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "trigger" | "status" | "steps" | "result" | "createdAt" | "updatedAt", ExtArgs["result"]["aIWorkflowRun"]>

  export type $AIWorkflowRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIWorkflowRun"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
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


  export const AIWorkflowRunScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    trigger: 'trigger',
    status: 'status',
    steps: 'steps',
    result: 'result',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIWorkflowRunScalarFieldEnum = (typeof AIWorkflowRunScalarFieldEnum)[keyof typeof AIWorkflowRunScalarFieldEnum]


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

  export type AIWorkflowRunWhereInput = {
    AND?: AIWorkflowRunWhereInput | AIWorkflowRunWhereInput[]
    OR?: AIWorkflowRunWhereInput[]
    NOT?: AIWorkflowRunWhereInput | AIWorkflowRunWhereInput[]
    id?: StringFilter<"AIWorkflowRun"> | string
    tenantId?: StringFilter<"AIWorkflowRun"> | string
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
    trigger?: StringWithAggregatesFilter<"AIWorkflowRun"> | string
    status?: StringWithAggregatesFilter<"AIWorkflowRun"> | string
    steps?: JsonWithAggregatesFilter<"AIWorkflowRun">
    result?: JsonNullableWithAggregatesFilter<"AIWorkflowRun">
    createdAt?: DateTimeWithAggregatesFilter<"AIWorkflowRun"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIWorkflowRun"> | Date | string
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

  export type AIWorkflowRunCreateInput = {
    id?: string
    tenantId: string
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
    trigger?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    trigger?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIWorkflowRunMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
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