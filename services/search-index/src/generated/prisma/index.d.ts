
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
 * Model SearchIndexConfig
 * 
 */
export type SearchIndexConfig = $Result.DefaultSelection<Prisma.$SearchIndexConfigPayload>
/**
 * Model VectorIndexConfig
 * 
 */
export type VectorIndexConfig = $Result.DefaultSelection<Prisma.$VectorIndexConfigPayload>
/**
 * Model SearchQueryLog
 * 
 */
export type SearchQueryLog = $Result.DefaultSelection<Prisma.$SearchQueryLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SearchProviderName: {
  MEILISEARCH: 'MEILISEARCH',
  ELASTICSEARCH: 'ELASTICSEARCH',
  LOCAL: 'LOCAL'
};

export type SearchProviderName = (typeof SearchProviderName)[keyof typeof SearchProviderName]


export const VectorIndexProvider: {
  LOCAL: 'LOCAL',
  PINECONE: 'PINECONE',
  ELASTICSEARCH_VECTOR: 'ELASTICSEARCH_VECTOR',
  QDRANT: 'QDRANT'
};

export type VectorIndexProvider = (typeof VectorIndexProvider)[keyof typeof VectorIndexProvider]


export const EmbeddingModel: {
  OPENAI_TEXT_EMBEDDING: 'OPENAI_TEXT_EMBEDDING',
  LOCAL_MINILM: 'LOCAL_MINILM'
};

export type EmbeddingModel = (typeof EmbeddingModel)[keyof typeof EmbeddingModel]

}

export type SearchProviderName = $Enums.SearchProviderName

export const SearchProviderName: typeof $Enums.SearchProviderName

export type VectorIndexProvider = $Enums.VectorIndexProvider

export const VectorIndexProvider: typeof $Enums.VectorIndexProvider

export type EmbeddingModel = $Enums.EmbeddingModel

export const EmbeddingModel: typeof $Enums.EmbeddingModel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SearchIndexConfigs
 * const searchIndexConfigs = await prisma.searchIndexConfig.findMany()
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
   * // Fetch zero or more SearchIndexConfigs
   * const searchIndexConfigs = await prisma.searchIndexConfig.findMany()
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
   * `prisma.searchIndexConfig`: Exposes CRUD operations for the **SearchIndexConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchIndexConfigs
    * const searchIndexConfigs = await prisma.searchIndexConfig.findMany()
    * ```
    */
  get searchIndexConfig(): Prisma.SearchIndexConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vectorIndexConfig`: Exposes CRUD operations for the **VectorIndexConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VectorIndexConfigs
    * const vectorIndexConfigs = await prisma.vectorIndexConfig.findMany()
    * ```
    */
  get vectorIndexConfig(): Prisma.VectorIndexConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.searchQueryLog`: Exposes CRUD operations for the **SearchQueryLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchQueryLogs
    * const searchQueryLogs = await prisma.searchQueryLog.findMany()
    * ```
    */
  get searchQueryLog(): Prisma.SearchQueryLogDelegate<ExtArgs, ClientOptions>;
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
    SearchIndexConfig: 'SearchIndexConfig',
    VectorIndexConfig: 'VectorIndexConfig',
    SearchQueryLog: 'SearchQueryLog'
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
      modelProps: "searchIndexConfig" | "vectorIndexConfig" | "searchQueryLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SearchIndexConfig: {
        payload: Prisma.$SearchIndexConfigPayload<ExtArgs>
        fields: Prisma.SearchIndexConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchIndexConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchIndexConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>
          }
          findFirst: {
            args: Prisma.SearchIndexConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchIndexConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>
          }
          findMany: {
            args: Prisma.SearchIndexConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>[]
          }
          create: {
            args: Prisma.SearchIndexConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>
          }
          createMany: {
            args: Prisma.SearchIndexConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SearchIndexConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>[]
          }
          delete: {
            args: Prisma.SearchIndexConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>
          }
          update: {
            args: Prisma.SearchIndexConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>
          }
          deleteMany: {
            args: Prisma.SearchIndexConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchIndexConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SearchIndexConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>[]
          }
          upsert: {
            args: Prisma.SearchIndexConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchIndexConfigPayload>
          }
          aggregate: {
            args: Prisma.SearchIndexConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchIndexConfig>
          }
          groupBy: {
            args: Prisma.SearchIndexConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchIndexConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchIndexConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SearchIndexConfigCountAggregateOutputType> | number
          }
        }
      }
      VectorIndexConfig: {
        payload: Prisma.$VectorIndexConfigPayload<ExtArgs>
        fields: Prisma.VectorIndexConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VectorIndexConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VectorIndexConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>
          }
          findFirst: {
            args: Prisma.VectorIndexConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VectorIndexConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>
          }
          findMany: {
            args: Prisma.VectorIndexConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>[]
          }
          create: {
            args: Prisma.VectorIndexConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>
          }
          createMany: {
            args: Prisma.VectorIndexConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VectorIndexConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>[]
          }
          delete: {
            args: Prisma.VectorIndexConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>
          }
          update: {
            args: Prisma.VectorIndexConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>
          }
          deleteMany: {
            args: Prisma.VectorIndexConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VectorIndexConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VectorIndexConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>[]
          }
          upsert: {
            args: Prisma.VectorIndexConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VectorIndexConfigPayload>
          }
          aggregate: {
            args: Prisma.VectorIndexConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVectorIndexConfig>
          }
          groupBy: {
            args: Prisma.VectorIndexConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<VectorIndexConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.VectorIndexConfigCountArgs<ExtArgs>
            result: $Utils.Optional<VectorIndexConfigCountAggregateOutputType> | number
          }
        }
      }
      SearchQueryLog: {
        payload: Prisma.$SearchQueryLogPayload<ExtArgs>
        fields: Prisma.SearchQueryLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchQueryLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchQueryLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>
          }
          findFirst: {
            args: Prisma.SearchQueryLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchQueryLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>
          }
          findMany: {
            args: Prisma.SearchQueryLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>[]
          }
          create: {
            args: Prisma.SearchQueryLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>
          }
          createMany: {
            args: Prisma.SearchQueryLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SearchQueryLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>[]
          }
          delete: {
            args: Prisma.SearchQueryLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>
          }
          update: {
            args: Prisma.SearchQueryLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>
          }
          deleteMany: {
            args: Prisma.SearchQueryLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchQueryLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SearchQueryLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>[]
          }
          upsert: {
            args: Prisma.SearchQueryLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchQueryLogPayload>
          }
          aggregate: {
            args: Prisma.SearchQueryLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchQueryLog>
          }
          groupBy: {
            args: Prisma.SearchQueryLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchQueryLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchQueryLogCountArgs<ExtArgs>
            result: $Utils.Optional<SearchQueryLogCountAggregateOutputType> | number
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
    searchIndexConfig?: SearchIndexConfigOmit
    vectorIndexConfig?: VectorIndexConfigOmit
    searchQueryLog?: SearchQueryLogOmit
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
   * Model SearchIndexConfig
   */

  export type AggregateSearchIndexConfig = {
    _count: SearchIndexConfigCountAggregateOutputType | null
    _min: SearchIndexConfigMinAggregateOutputType | null
    _max: SearchIndexConfigMaxAggregateOutputType | null
  }

  export type SearchIndexConfigMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    indexName: string | null
    provider: $Enums.SearchProviderName | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SearchIndexConfigMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    indexName: string | null
    provider: $Enums.SearchProviderName | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SearchIndexConfigCountAggregateOutputType = {
    id: number
    tenantId: number
    indexName: number
    provider: number
    settings: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SearchIndexConfigMinAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SearchIndexConfigMaxAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    provider?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SearchIndexConfigCountAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    provider?: true
    settings?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SearchIndexConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchIndexConfig to aggregate.
     */
    where?: SearchIndexConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchIndexConfigs to fetch.
     */
    orderBy?: SearchIndexConfigOrderByWithRelationInput | SearchIndexConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchIndexConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchIndexConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchIndexConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchIndexConfigs
    **/
    _count?: true | SearchIndexConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchIndexConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchIndexConfigMaxAggregateInputType
  }

  export type GetSearchIndexConfigAggregateType<T extends SearchIndexConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchIndexConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchIndexConfig[P]>
      : GetScalarType<T[P], AggregateSearchIndexConfig[P]>
  }




  export type SearchIndexConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchIndexConfigWhereInput
    orderBy?: SearchIndexConfigOrderByWithAggregationInput | SearchIndexConfigOrderByWithAggregationInput[]
    by: SearchIndexConfigScalarFieldEnum[] | SearchIndexConfigScalarFieldEnum
    having?: SearchIndexConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchIndexConfigCountAggregateInputType | true
    _min?: SearchIndexConfigMinAggregateInputType
    _max?: SearchIndexConfigMaxAggregateInputType
  }

  export type SearchIndexConfigGroupByOutputType = {
    id: string
    tenantId: string
    indexName: string
    provider: $Enums.SearchProviderName
    settings: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: SearchIndexConfigCountAggregateOutputType | null
    _min: SearchIndexConfigMinAggregateOutputType | null
    _max: SearchIndexConfigMaxAggregateOutputType | null
  }

  type GetSearchIndexConfigGroupByPayload<T extends SearchIndexConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchIndexConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchIndexConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchIndexConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SearchIndexConfigGroupByOutputType[P]>
        }
      >
    >


  export type SearchIndexConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    provider?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchIndexConfig"]>

  export type SearchIndexConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    provider?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchIndexConfig"]>

  export type SearchIndexConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    provider?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchIndexConfig"]>

  export type SearchIndexConfigSelectScalar = {
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    provider?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SearchIndexConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "indexName" | "provider" | "settings" | "createdAt" | "updatedAt", ExtArgs["result"]["searchIndexConfig"]>

  export type $SearchIndexConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchIndexConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      indexName: string
      provider: $Enums.SearchProviderName
      settings: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["searchIndexConfig"]>
    composites: {}
  }

  type SearchIndexConfigGetPayload<S extends boolean | null | undefined | SearchIndexConfigDefaultArgs> = $Result.GetResult<Prisma.$SearchIndexConfigPayload, S>

  type SearchIndexConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchIndexConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchIndexConfigCountAggregateInputType | true
    }

  export interface SearchIndexConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchIndexConfig'], meta: { name: 'SearchIndexConfig' } }
    /**
     * Find zero or one SearchIndexConfig that matches the filter.
     * @param {SearchIndexConfigFindUniqueArgs} args - Arguments to find a SearchIndexConfig
     * @example
     * // Get one SearchIndexConfig
     * const searchIndexConfig = await prisma.searchIndexConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchIndexConfigFindUniqueArgs>(args: SelectSubset<T, SearchIndexConfigFindUniqueArgs<ExtArgs>>): Prisma__SearchIndexConfigClient<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SearchIndexConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchIndexConfigFindUniqueOrThrowArgs} args - Arguments to find a SearchIndexConfig
     * @example
     * // Get one SearchIndexConfig
     * const searchIndexConfig = await prisma.searchIndexConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchIndexConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchIndexConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchIndexConfigClient<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchIndexConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexConfigFindFirstArgs} args - Arguments to find a SearchIndexConfig
     * @example
     * // Get one SearchIndexConfig
     * const searchIndexConfig = await prisma.searchIndexConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchIndexConfigFindFirstArgs>(args?: SelectSubset<T, SearchIndexConfigFindFirstArgs<ExtArgs>>): Prisma__SearchIndexConfigClient<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchIndexConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexConfigFindFirstOrThrowArgs} args - Arguments to find a SearchIndexConfig
     * @example
     * // Get one SearchIndexConfig
     * const searchIndexConfig = await prisma.searchIndexConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchIndexConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchIndexConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchIndexConfigClient<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchIndexConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchIndexConfigs
     * const searchIndexConfigs = await prisma.searchIndexConfig.findMany()
     * 
     * // Get first 10 SearchIndexConfigs
     * const searchIndexConfigs = await prisma.searchIndexConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchIndexConfigWithIdOnly = await prisma.searchIndexConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchIndexConfigFindManyArgs>(args?: SelectSubset<T, SearchIndexConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SearchIndexConfig.
     * @param {SearchIndexConfigCreateArgs} args - Arguments to create a SearchIndexConfig.
     * @example
     * // Create one SearchIndexConfig
     * const SearchIndexConfig = await prisma.searchIndexConfig.create({
     *   data: {
     *     // ... data to create a SearchIndexConfig
     *   }
     * })
     * 
     */
    create<T extends SearchIndexConfigCreateArgs>(args: SelectSubset<T, SearchIndexConfigCreateArgs<ExtArgs>>): Prisma__SearchIndexConfigClient<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SearchIndexConfigs.
     * @param {SearchIndexConfigCreateManyArgs} args - Arguments to create many SearchIndexConfigs.
     * @example
     * // Create many SearchIndexConfigs
     * const searchIndexConfig = await prisma.searchIndexConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchIndexConfigCreateManyArgs>(args?: SelectSubset<T, SearchIndexConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SearchIndexConfigs and returns the data saved in the database.
     * @param {SearchIndexConfigCreateManyAndReturnArgs} args - Arguments to create many SearchIndexConfigs.
     * @example
     * // Create many SearchIndexConfigs
     * const searchIndexConfig = await prisma.searchIndexConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SearchIndexConfigs and only return the `id`
     * const searchIndexConfigWithIdOnly = await prisma.searchIndexConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SearchIndexConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SearchIndexConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SearchIndexConfig.
     * @param {SearchIndexConfigDeleteArgs} args - Arguments to delete one SearchIndexConfig.
     * @example
     * // Delete one SearchIndexConfig
     * const SearchIndexConfig = await prisma.searchIndexConfig.delete({
     *   where: {
     *     // ... filter to delete one SearchIndexConfig
     *   }
     * })
     * 
     */
    delete<T extends SearchIndexConfigDeleteArgs>(args: SelectSubset<T, SearchIndexConfigDeleteArgs<ExtArgs>>): Prisma__SearchIndexConfigClient<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SearchIndexConfig.
     * @param {SearchIndexConfigUpdateArgs} args - Arguments to update one SearchIndexConfig.
     * @example
     * // Update one SearchIndexConfig
     * const searchIndexConfig = await prisma.searchIndexConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchIndexConfigUpdateArgs>(args: SelectSubset<T, SearchIndexConfigUpdateArgs<ExtArgs>>): Prisma__SearchIndexConfigClient<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SearchIndexConfigs.
     * @param {SearchIndexConfigDeleteManyArgs} args - Arguments to filter SearchIndexConfigs to delete.
     * @example
     * // Delete a few SearchIndexConfigs
     * const { count } = await prisma.searchIndexConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchIndexConfigDeleteManyArgs>(args?: SelectSubset<T, SearchIndexConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchIndexConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchIndexConfigs
     * const searchIndexConfig = await prisma.searchIndexConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchIndexConfigUpdateManyArgs>(args: SelectSubset<T, SearchIndexConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchIndexConfigs and returns the data updated in the database.
     * @param {SearchIndexConfigUpdateManyAndReturnArgs} args - Arguments to update many SearchIndexConfigs.
     * @example
     * // Update many SearchIndexConfigs
     * const searchIndexConfig = await prisma.searchIndexConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SearchIndexConfigs and only return the `id`
     * const searchIndexConfigWithIdOnly = await prisma.searchIndexConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends SearchIndexConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SearchIndexConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SearchIndexConfig.
     * @param {SearchIndexConfigUpsertArgs} args - Arguments to update or create a SearchIndexConfig.
     * @example
     * // Update or create a SearchIndexConfig
     * const searchIndexConfig = await prisma.searchIndexConfig.upsert({
     *   create: {
     *     // ... data to create a SearchIndexConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SearchIndexConfig we want to update
     *   }
     * })
     */
    upsert<T extends SearchIndexConfigUpsertArgs>(args: SelectSubset<T, SearchIndexConfigUpsertArgs<ExtArgs>>): Prisma__SearchIndexConfigClient<$Result.GetResult<Prisma.$SearchIndexConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SearchIndexConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexConfigCountArgs} args - Arguments to filter SearchIndexConfigs to count.
     * @example
     * // Count the number of SearchIndexConfigs
     * const count = await prisma.searchIndexConfig.count({
     *   where: {
     *     // ... the filter for the SearchIndexConfigs we want to count
     *   }
     * })
    **/
    count<T extends SearchIndexConfigCountArgs>(
      args?: Subset<T, SearchIndexConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchIndexConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchIndexConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SearchIndexConfigAggregateArgs>(args: Subset<T, SearchIndexConfigAggregateArgs>): Prisma.PrismaPromise<GetSearchIndexConfigAggregateType<T>>

    /**
     * Group by SearchIndexConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchIndexConfigGroupByArgs} args - Group by arguments.
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
      T extends SearchIndexConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchIndexConfigGroupByArgs['orderBy'] }
        : { orderBy?: SearchIndexConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SearchIndexConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchIndexConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchIndexConfig model
   */
  readonly fields: SearchIndexConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchIndexConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchIndexConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SearchIndexConfig model
   */
  interface SearchIndexConfigFieldRefs {
    readonly id: FieldRef<"SearchIndexConfig", 'String'>
    readonly tenantId: FieldRef<"SearchIndexConfig", 'String'>
    readonly indexName: FieldRef<"SearchIndexConfig", 'String'>
    readonly provider: FieldRef<"SearchIndexConfig", 'SearchProviderName'>
    readonly settings: FieldRef<"SearchIndexConfig", 'Json'>
    readonly createdAt: FieldRef<"SearchIndexConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"SearchIndexConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchIndexConfig findUnique
   */
  export type SearchIndexConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndexConfig to fetch.
     */
    where: SearchIndexConfigWhereUniqueInput
  }

  /**
   * SearchIndexConfig findUniqueOrThrow
   */
  export type SearchIndexConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndexConfig to fetch.
     */
    where: SearchIndexConfigWhereUniqueInput
  }

  /**
   * SearchIndexConfig findFirst
   */
  export type SearchIndexConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndexConfig to fetch.
     */
    where?: SearchIndexConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchIndexConfigs to fetch.
     */
    orderBy?: SearchIndexConfigOrderByWithRelationInput | SearchIndexConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchIndexConfigs.
     */
    cursor?: SearchIndexConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchIndexConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchIndexConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchIndexConfigs.
     */
    distinct?: SearchIndexConfigScalarFieldEnum | SearchIndexConfigScalarFieldEnum[]
  }

  /**
   * SearchIndexConfig findFirstOrThrow
   */
  export type SearchIndexConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndexConfig to fetch.
     */
    where?: SearchIndexConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchIndexConfigs to fetch.
     */
    orderBy?: SearchIndexConfigOrderByWithRelationInput | SearchIndexConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchIndexConfigs.
     */
    cursor?: SearchIndexConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchIndexConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchIndexConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchIndexConfigs.
     */
    distinct?: SearchIndexConfigScalarFieldEnum | SearchIndexConfigScalarFieldEnum[]
  }

  /**
   * SearchIndexConfig findMany
   */
  export type SearchIndexConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchIndexConfigs to fetch.
     */
    where?: SearchIndexConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchIndexConfigs to fetch.
     */
    orderBy?: SearchIndexConfigOrderByWithRelationInput | SearchIndexConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchIndexConfigs.
     */
    cursor?: SearchIndexConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchIndexConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchIndexConfigs.
     */
    skip?: number
    distinct?: SearchIndexConfigScalarFieldEnum | SearchIndexConfigScalarFieldEnum[]
  }

  /**
   * SearchIndexConfig create
   */
  export type SearchIndexConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SearchIndexConfig.
     */
    data: XOR<SearchIndexConfigCreateInput, SearchIndexConfigUncheckedCreateInput>
  }

  /**
   * SearchIndexConfig createMany
   */
  export type SearchIndexConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SearchIndexConfigs.
     */
    data: SearchIndexConfigCreateManyInput | SearchIndexConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchIndexConfig createManyAndReturn
   */
  export type SearchIndexConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SearchIndexConfigs.
     */
    data: SearchIndexConfigCreateManyInput | SearchIndexConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchIndexConfig update
   */
  export type SearchIndexConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SearchIndexConfig.
     */
    data: XOR<SearchIndexConfigUpdateInput, SearchIndexConfigUncheckedUpdateInput>
    /**
     * Choose, which SearchIndexConfig to update.
     */
    where: SearchIndexConfigWhereUniqueInput
  }

  /**
   * SearchIndexConfig updateMany
   */
  export type SearchIndexConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchIndexConfigs.
     */
    data: XOR<SearchIndexConfigUpdateManyMutationInput, SearchIndexConfigUncheckedUpdateManyInput>
    /**
     * Filter which SearchIndexConfigs to update
     */
    where?: SearchIndexConfigWhereInput
    /**
     * Limit how many SearchIndexConfigs to update.
     */
    limit?: number
  }

  /**
   * SearchIndexConfig updateManyAndReturn
   */
  export type SearchIndexConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * The data used to update SearchIndexConfigs.
     */
    data: XOR<SearchIndexConfigUpdateManyMutationInput, SearchIndexConfigUncheckedUpdateManyInput>
    /**
     * Filter which SearchIndexConfigs to update
     */
    where?: SearchIndexConfigWhereInput
    /**
     * Limit how many SearchIndexConfigs to update.
     */
    limit?: number
  }

  /**
   * SearchIndexConfig upsert
   */
  export type SearchIndexConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SearchIndexConfig to update in case it exists.
     */
    where: SearchIndexConfigWhereUniqueInput
    /**
     * In case the SearchIndexConfig found by the `where` argument doesn't exist, create a new SearchIndexConfig with this data.
     */
    create: XOR<SearchIndexConfigCreateInput, SearchIndexConfigUncheckedCreateInput>
    /**
     * In case the SearchIndexConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchIndexConfigUpdateInput, SearchIndexConfigUncheckedUpdateInput>
  }

  /**
   * SearchIndexConfig delete
   */
  export type SearchIndexConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
    /**
     * Filter which SearchIndexConfig to delete.
     */
    where: SearchIndexConfigWhereUniqueInput
  }

  /**
   * SearchIndexConfig deleteMany
   */
  export type SearchIndexConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchIndexConfigs to delete
     */
    where?: SearchIndexConfigWhereInput
    /**
     * Limit how many SearchIndexConfigs to delete.
     */
    limit?: number
  }

  /**
   * SearchIndexConfig without action
   */
  export type SearchIndexConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchIndexConfig
     */
    select?: SearchIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchIndexConfig
     */
    omit?: SearchIndexConfigOmit<ExtArgs> | null
  }


  /**
   * Model VectorIndexConfig
   */

  export type AggregateVectorIndexConfig = {
    _count: VectorIndexConfigCountAggregateOutputType | null
    _avg: VectorIndexConfigAvgAggregateOutputType | null
    _sum: VectorIndexConfigSumAggregateOutputType | null
    _min: VectorIndexConfigMinAggregateOutputType | null
    _max: VectorIndexConfigMaxAggregateOutputType | null
  }

  export type VectorIndexConfigAvgAggregateOutputType = {
    dimensions: number | null
  }

  export type VectorIndexConfigSumAggregateOutputType = {
    dimensions: number | null
  }

  export type VectorIndexConfigMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    indexName: string | null
    provider: $Enums.VectorIndexProvider | null
    embeddingModel: $Enums.EmbeddingModel | null
    dimensions: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VectorIndexConfigMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    indexName: string | null
    provider: $Enums.VectorIndexProvider | null
    embeddingModel: $Enums.EmbeddingModel | null
    dimensions: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VectorIndexConfigCountAggregateOutputType = {
    id: number
    tenantId: number
    indexName: number
    provider: number
    embeddingModel: number
    dimensions: number
    settings: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VectorIndexConfigAvgAggregateInputType = {
    dimensions?: true
  }

  export type VectorIndexConfigSumAggregateInputType = {
    dimensions?: true
  }

  export type VectorIndexConfigMinAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    provider?: true
    embeddingModel?: true
    dimensions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VectorIndexConfigMaxAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    provider?: true
    embeddingModel?: true
    dimensions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VectorIndexConfigCountAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    provider?: true
    embeddingModel?: true
    dimensions?: true
    settings?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VectorIndexConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VectorIndexConfig to aggregate.
     */
    where?: VectorIndexConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VectorIndexConfigs to fetch.
     */
    orderBy?: VectorIndexConfigOrderByWithRelationInput | VectorIndexConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VectorIndexConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VectorIndexConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VectorIndexConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VectorIndexConfigs
    **/
    _count?: true | VectorIndexConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VectorIndexConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VectorIndexConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VectorIndexConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VectorIndexConfigMaxAggregateInputType
  }

  export type GetVectorIndexConfigAggregateType<T extends VectorIndexConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateVectorIndexConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVectorIndexConfig[P]>
      : GetScalarType<T[P], AggregateVectorIndexConfig[P]>
  }




  export type VectorIndexConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VectorIndexConfigWhereInput
    orderBy?: VectorIndexConfigOrderByWithAggregationInput | VectorIndexConfigOrderByWithAggregationInput[]
    by: VectorIndexConfigScalarFieldEnum[] | VectorIndexConfigScalarFieldEnum
    having?: VectorIndexConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VectorIndexConfigCountAggregateInputType | true
    _avg?: VectorIndexConfigAvgAggregateInputType
    _sum?: VectorIndexConfigSumAggregateInputType
    _min?: VectorIndexConfigMinAggregateInputType
    _max?: VectorIndexConfigMaxAggregateInputType
  }

  export type VectorIndexConfigGroupByOutputType = {
    id: string
    tenantId: string
    indexName: string
    provider: $Enums.VectorIndexProvider
    embeddingModel: $Enums.EmbeddingModel
    dimensions: number
    settings: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: VectorIndexConfigCountAggregateOutputType | null
    _avg: VectorIndexConfigAvgAggregateOutputType | null
    _sum: VectorIndexConfigSumAggregateOutputType | null
    _min: VectorIndexConfigMinAggregateOutputType | null
    _max: VectorIndexConfigMaxAggregateOutputType | null
  }

  type GetVectorIndexConfigGroupByPayload<T extends VectorIndexConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VectorIndexConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VectorIndexConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VectorIndexConfigGroupByOutputType[P]>
            : GetScalarType<T[P], VectorIndexConfigGroupByOutputType[P]>
        }
      >
    >


  export type VectorIndexConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    provider?: boolean
    embeddingModel?: boolean
    dimensions?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vectorIndexConfig"]>

  export type VectorIndexConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    provider?: boolean
    embeddingModel?: boolean
    dimensions?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vectorIndexConfig"]>

  export type VectorIndexConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    provider?: boolean
    embeddingModel?: boolean
    dimensions?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vectorIndexConfig"]>

  export type VectorIndexConfigSelectScalar = {
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    provider?: boolean
    embeddingModel?: boolean
    dimensions?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VectorIndexConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "indexName" | "provider" | "embeddingModel" | "dimensions" | "settings" | "createdAt" | "updatedAt", ExtArgs["result"]["vectorIndexConfig"]>

  export type $VectorIndexConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VectorIndexConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      indexName: string
      provider: $Enums.VectorIndexProvider
      embeddingModel: $Enums.EmbeddingModel
      dimensions: number
      settings: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vectorIndexConfig"]>
    composites: {}
  }

  type VectorIndexConfigGetPayload<S extends boolean | null | undefined | VectorIndexConfigDefaultArgs> = $Result.GetResult<Prisma.$VectorIndexConfigPayload, S>

  type VectorIndexConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VectorIndexConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VectorIndexConfigCountAggregateInputType | true
    }

  export interface VectorIndexConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VectorIndexConfig'], meta: { name: 'VectorIndexConfig' } }
    /**
     * Find zero or one VectorIndexConfig that matches the filter.
     * @param {VectorIndexConfigFindUniqueArgs} args - Arguments to find a VectorIndexConfig
     * @example
     * // Get one VectorIndexConfig
     * const vectorIndexConfig = await prisma.vectorIndexConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VectorIndexConfigFindUniqueArgs>(args: SelectSubset<T, VectorIndexConfigFindUniqueArgs<ExtArgs>>): Prisma__VectorIndexConfigClient<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VectorIndexConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VectorIndexConfigFindUniqueOrThrowArgs} args - Arguments to find a VectorIndexConfig
     * @example
     * // Get one VectorIndexConfig
     * const vectorIndexConfig = await prisma.vectorIndexConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VectorIndexConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, VectorIndexConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VectorIndexConfigClient<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VectorIndexConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorIndexConfigFindFirstArgs} args - Arguments to find a VectorIndexConfig
     * @example
     * // Get one VectorIndexConfig
     * const vectorIndexConfig = await prisma.vectorIndexConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VectorIndexConfigFindFirstArgs>(args?: SelectSubset<T, VectorIndexConfigFindFirstArgs<ExtArgs>>): Prisma__VectorIndexConfigClient<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VectorIndexConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorIndexConfigFindFirstOrThrowArgs} args - Arguments to find a VectorIndexConfig
     * @example
     * // Get one VectorIndexConfig
     * const vectorIndexConfig = await prisma.vectorIndexConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VectorIndexConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, VectorIndexConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__VectorIndexConfigClient<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VectorIndexConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorIndexConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VectorIndexConfigs
     * const vectorIndexConfigs = await prisma.vectorIndexConfig.findMany()
     * 
     * // Get first 10 VectorIndexConfigs
     * const vectorIndexConfigs = await prisma.vectorIndexConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vectorIndexConfigWithIdOnly = await prisma.vectorIndexConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VectorIndexConfigFindManyArgs>(args?: SelectSubset<T, VectorIndexConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VectorIndexConfig.
     * @param {VectorIndexConfigCreateArgs} args - Arguments to create a VectorIndexConfig.
     * @example
     * // Create one VectorIndexConfig
     * const VectorIndexConfig = await prisma.vectorIndexConfig.create({
     *   data: {
     *     // ... data to create a VectorIndexConfig
     *   }
     * })
     * 
     */
    create<T extends VectorIndexConfigCreateArgs>(args: SelectSubset<T, VectorIndexConfigCreateArgs<ExtArgs>>): Prisma__VectorIndexConfigClient<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VectorIndexConfigs.
     * @param {VectorIndexConfigCreateManyArgs} args - Arguments to create many VectorIndexConfigs.
     * @example
     * // Create many VectorIndexConfigs
     * const vectorIndexConfig = await prisma.vectorIndexConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VectorIndexConfigCreateManyArgs>(args?: SelectSubset<T, VectorIndexConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VectorIndexConfigs and returns the data saved in the database.
     * @param {VectorIndexConfigCreateManyAndReturnArgs} args - Arguments to create many VectorIndexConfigs.
     * @example
     * // Create many VectorIndexConfigs
     * const vectorIndexConfig = await prisma.vectorIndexConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VectorIndexConfigs and only return the `id`
     * const vectorIndexConfigWithIdOnly = await prisma.vectorIndexConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VectorIndexConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, VectorIndexConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VectorIndexConfig.
     * @param {VectorIndexConfigDeleteArgs} args - Arguments to delete one VectorIndexConfig.
     * @example
     * // Delete one VectorIndexConfig
     * const VectorIndexConfig = await prisma.vectorIndexConfig.delete({
     *   where: {
     *     // ... filter to delete one VectorIndexConfig
     *   }
     * })
     * 
     */
    delete<T extends VectorIndexConfigDeleteArgs>(args: SelectSubset<T, VectorIndexConfigDeleteArgs<ExtArgs>>): Prisma__VectorIndexConfigClient<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VectorIndexConfig.
     * @param {VectorIndexConfigUpdateArgs} args - Arguments to update one VectorIndexConfig.
     * @example
     * // Update one VectorIndexConfig
     * const vectorIndexConfig = await prisma.vectorIndexConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VectorIndexConfigUpdateArgs>(args: SelectSubset<T, VectorIndexConfigUpdateArgs<ExtArgs>>): Prisma__VectorIndexConfigClient<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VectorIndexConfigs.
     * @param {VectorIndexConfigDeleteManyArgs} args - Arguments to filter VectorIndexConfigs to delete.
     * @example
     * // Delete a few VectorIndexConfigs
     * const { count } = await prisma.vectorIndexConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VectorIndexConfigDeleteManyArgs>(args?: SelectSubset<T, VectorIndexConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VectorIndexConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorIndexConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VectorIndexConfigs
     * const vectorIndexConfig = await prisma.vectorIndexConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VectorIndexConfigUpdateManyArgs>(args: SelectSubset<T, VectorIndexConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VectorIndexConfigs and returns the data updated in the database.
     * @param {VectorIndexConfigUpdateManyAndReturnArgs} args - Arguments to update many VectorIndexConfigs.
     * @example
     * // Update many VectorIndexConfigs
     * const vectorIndexConfig = await prisma.vectorIndexConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VectorIndexConfigs and only return the `id`
     * const vectorIndexConfigWithIdOnly = await prisma.vectorIndexConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends VectorIndexConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, VectorIndexConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VectorIndexConfig.
     * @param {VectorIndexConfigUpsertArgs} args - Arguments to update or create a VectorIndexConfig.
     * @example
     * // Update or create a VectorIndexConfig
     * const vectorIndexConfig = await prisma.vectorIndexConfig.upsert({
     *   create: {
     *     // ... data to create a VectorIndexConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VectorIndexConfig we want to update
     *   }
     * })
     */
    upsert<T extends VectorIndexConfigUpsertArgs>(args: SelectSubset<T, VectorIndexConfigUpsertArgs<ExtArgs>>): Prisma__VectorIndexConfigClient<$Result.GetResult<Prisma.$VectorIndexConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VectorIndexConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorIndexConfigCountArgs} args - Arguments to filter VectorIndexConfigs to count.
     * @example
     * // Count the number of VectorIndexConfigs
     * const count = await prisma.vectorIndexConfig.count({
     *   where: {
     *     // ... the filter for the VectorIndexConfigs we want to count
     *   }
     * })
    **/
    count<T extends VectorIndexConfigCountArgs>(
      args?: Subset<T, VectorIndexConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VectorIndexConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VectorIndexConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorIndexConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VectorIndexConfigAggregateArgs>(args: Subset<T, VectorIndexConfigAggregateArgs>): Prisma.PrismaPromise<GetVectorIndexConfigAggregateType<T>>

    /**
     * Group by VectorIndexConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VectorIndexConfigGroupByArgs} args - Group by arguments.
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
      T extends VectorIndexConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VectorIndexConfigGroupByArgs['orderBy'] }
        : { orderBy?: VectorIndexConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VectorIndexConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVectorIndexConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VectorIndexConfig model
   */
  readonly fields: VectorIndexConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VectorIndexConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VectorIndexConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the VectorIndexConfig model
   */
  interface VectorIndexConfigFieldRefs {
    readonly id: FieldRef<"VectorIndexConfig", 'String'>
    readonly tenantId: FieldRef<"VectorIndexConfig", 'String'>
    readonly indexName: FieldRef<"VectorIndexConfig", 'String'>
    readonly provider: FieldRef<"VectorIndexConfig", 'VectorIndexProvider'>
    readonly embeddingModel: FieldRef<"VectorIndexConfig", 'EmbeddingModel'>
    readonly dimensions: FieldRef<"VectorIndexConfig", 'Int'>
    readonly settings: FieldRef<"VectorIndexConfig", 'Json'>
    readonly createdAt: FieldRef<"VectorIndexConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"VectorIndexConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VectorIndexConfig findUnique
   */
  export type VectorIndexConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which VectorIndexConfig to fetch.
     */
    where: VectorIndexConfigWhereUniqueInput
  }

  /**
   * VectorIndexConfig findUniqueOrThrow
   */
  export type VectorIndexConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which VectorIndexConfig to fetch.
     */
    where: VectorIndexConfigWhereUniqueInput
  }

  /**
   * VectorIndexConfig findFirst
   */
  export type VectorIndexConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which VectorIndexConfig to fetch.
     */
    where?: VectorIndexConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VectorIndexConfigs to fetch.
     */
    orderBy?: VectorIndexConfigOrderByWithRelationInput | VectorIndexConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VectorIndexConfigs.
     */
    cursor?: VectorIndexConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VectorIndexConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VectorIndexConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VectorIndexConfigs.
     */
    distinct?: VectorIndexConfigScalarFieldEnum | VectorIndexConfigScalarFieldEnum[]
  }

  /**
   * VectorIndexConfig findFirstOrThrow
   */
  export type VectorIndexConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which VectorIndexConfig to fetch.
     */
    where?: VectorIndexConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VectorIndexConfigs to fetch.
     */
    orderBy?: VectorIndexConfigOrderByWithRelationInput | VectorIndexConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VectorIndexConfigs.
     */
    cursor?: VectorIndexConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VectorIndexConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VectorIndexConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VectorIndexConfigs.
     */
    distinct?: VectorIndexConfigScalarFieldEnum | VectorIndexConfigScalarFieldEnum[]
  }

  /**
   * VectorIndexConfig findMany
   */
  export type VectorIndexConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * Filter, which VectorIndexConfigs to fetch.
     */
    where?: VectorIndexConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VectorIndexConfigs to fetch.
     */
    orderBy?: VectorIndexConfigOrderByWithRelationInput | VectorIndexConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VectorIndexConfigs.
     */
    cursor?: VectorIndexConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VectorIndexConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VectorIndexConfigs.
     */
    skip?: number
    distinct?: VectorIndexConfigScalarFieldEnum | VectorIndexConfigScalarFieldEnum[]
  }

  /**
   * VectorIndexConfig create
   */
  export type VectorIndexConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a VectorIndexConfig.
     */
    data: XOR<VectorIndexConfigCreateInput, VectorIndexConfigUncheckedCreateInput>
  }

  /**
   * VectorIndexConfig createMany
   */
  export type VectorIndexConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VectorIndexConfigs.
     */
    data: VectorIndexConfigCreateManyInput | VectorIndexConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VectorIndexConfig createManyAndReturn
   */
  export type VectorIndexConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * The data used to create many VectorIndexConfigs.
     */
    data: VectorIndexConfigCreateManyInput | VectorIndexConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VectorIndexConfig update
   */
  export type VectorIndexConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a VectorIndexConfig.
     */
    data: XOR<VectorIndexConfigUpdateInput, VectorIndexConfigUncheckedUpdateInput>
    /**
     * Choose, which VectorIndexConfig to update.
     */
    where: VectorIndexConfigWhereUniqueInput
  }

  /**
   * VectorIndexConfig updateMany
   */
  export type VectorIndexConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VectorIndexConfigs.
     */
    data: XOR<VectorIndexConfigUpdateManyMutationInput, VectorIndexConfigUncheckedUpdateManyInput>
    /**
     * Filter which VectorIndexConfigs to update
     */
    where?: VectorIndexConfigWhereInput
    /**
     * Limit how many VectorIndexConfigs to update.
     */
    limit?: number
  }

  /**
   * VectorIndexConfig updateManyAndReturn
   */
  export type VectorIndexConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * The data used to update VectorIndexConfigs.
     */
    data: XOR<VectorIndexConfigUpdateManyMutationInput, VectorIndexConfigUncheckedUpdateManyInput>
    /**
     * Filter which VectorIndexConfigs to update
     */
    where?: VectorIndexConfigWhereInput
    /**
     * Limit how many VectorIndexConfigs to update.
     */
    limit?: number
  }

  /**
   * VectorIndexConfig upsert
   */
  export type VectorIndexConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the VectorIndexConfig to update in case it exists.
     */
    where: VectorIndexConfigWhereUniqueInput
    /**
     * In case the VectorIndexConfig found by the `where` argument doesn't exist, create a new VectorIndexConfig with this data.
     */
    create: XOR<VectorIndexConfigCreateInput, VectorIndexConfigUncheckedCreateInput>
    /**
     * In case the VectorIndexConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VectorIndexConfigUpdateInput, VectorIndexConfigUncheckedUpdateInput>
  }

  /**
   * VectorIndexConfig delete
   */
  export type VectorIndexConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
    /**
     * Filter which VectorIndexConfig to delete.
     */
    where: VectorIndexConfigWhereUniqueInput
  }

  /**
   * VectorIndexConfig deleteMany
   */
  export type VectorIndexConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VectorIndexConfigs to delete
     */
    where?: VectorIndexConfigWhereInput
    /**
     * Limit how many VectorIndexConfigs to delete.
     */
    limit?: number
  }

  /**
   * VectorIndexConfig without action
   */
  export type VectorIndexConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VectorIndexConfig
     */
    select?: VectorIndexConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VectorIndexConfig
     */
    omit?: VectorIndexConfigOmit<ExtArgs> | null
  }


  /**
   * Model SearchQueryLog
   */

  export type AggregateSearchQueryLog = {
    _count: SearchQueryLogCountAggregateOutputType | null
    _avg: SearchQueryLogAvgAggregateOutputType | null
    _sum: SearchQueryLogSumAggregateOutputType | null
    _min: SearchQueryLogMinAggregateOutputType | null
    _max: SearchQueryLogMaxAggregateOutputType | null
  }

  export type SearchQueryLogAvgAggregateOutputType = {
    totalHits: number | null
    durationMs: number | null
  }

  export type SearchQueryLogSumAggregateOutputType = {
    totalHits: number | null
    durationMs: number | null
  }

  export type SearchQueryLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    indexName: string | null
    query: string | null
    totalHits: number | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type SearchQueryLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    indexName: string | null
    query: string | null
    totalHits: number | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type SearchQueryLogCountAggregateOutputType = {
    id: number
    tenantId: number
    indexName: number
    query: number
    filters: number
    totalHits: number
    durationMs: number
    createdAt: number
    _all: number
  }


  export type SearchQueryLogAvgAggregateInputType = {
    totalHits?: true
    durationMs?: true
  }

  export type SearchQueryLogSumAggregateInputType = {
    totalHits?: true
    durationMs?: true
  }

  export type SearchQueryLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    query?: true
    totalHits?: true
    durationMs?: true
    createdAt?: true
  }

  export type SearchQueryLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    query?: true
    totalHits?: true
    durationMs?: true
    createdAt?: true
  }

  export type SearchQueryLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    indexName?: true
    query?: true
    filters?: true
    totalHits?: true
    durationMs?: true
    createdAt?: true
    _all?: true
  }

  export type SearchQueryLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchQueryLog to aggregate.
     */
    where?: SearchQueryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchQueryLogs to fetch.
     */
    orderBy?: SearchQueryLogOrderByWithRelationInput | SearchQueryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchQueryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchQueryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchQueryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchQueryLogs
    **/
    _count?: true | SearchQueryLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SearchQueryLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SearchQueryLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchQueryLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchQueryLogMaxAggregateInputType
  }

  export type GetSearchQueryLogAggregateType<T extends SearchQueryLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchQueryLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchQueryLog[P]>
      : GetScalarType<T[P], AggregateSearchQueryLog[P]>
  }




  export type SearchQueryLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchQueryLogWhereInput
    orderBy?: SearchQueryLogOrderByWithAggregationInput | SearchQueryLogOrderByWithAggregationInput[]
    by: SearchQueryLogScalarFieldEnum[] | SearchQueryLogScalarFieldEnum
    having?: SearchQueryLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchQueryLogCountAggregateInputType | true
    _avg?: SearchQueryLogAvgAggregateInputType
    _sum?: SearchQueryLogSumAggregateInputType
    _min?: SearchQueryLogMinAggregateInputType
    _max?: SearchQueryLogMaxAggregateInputType
  }

  export type SearchQueryLogGroupByOutputType = {
    id: string
    tenantId: string
    indexName: string
    query: string
    filters: JsonValue | null
    totalHits: number
    durationMs: number
    createdAt: Date
    _count: SearchQueryLogCountAggregateOutputType | null
    _avg: SearchQueryLogAvgAggregateOutputType | null
    _sum: SearchQueryLogSumAggregateOutputType | null
    _min: SearchQueryLogMinAggregateOutputType | null
    _max: SearchQueryLogMaxAggregateOutputType | null
  }

  type GetSearchQueryLogGroupByPayload<T extends SearchQueryLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchQueryLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchQueryLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchQueryLogGroupByOutputType[P]>
            : GetScalarType<T[P], SearchQueryLogGroupByOutputType[P]>
        }
      >
    >


  export type SearchQueryLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    query?: boolean
    filters?: boolean
    totalHits?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["searchQueryLog"]>

  export type SearchQueryLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    query?: boolean
    filters?: boolean
    totalHits?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["searchQueryLog"]>

  export type SearchQueryLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    query?: boolean
    filters?: boolean
    totalHits?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["searchQueryLog"]>

  export type SearchQueryLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    indexName?: boolean
    query?: boolean
    filters?: boolean
    totalHits?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }

  export type SearchQueryLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "indexName" | "query" | "filters" | "totalHits" | "durationMs" | "createdAt", ExtArgs["result"]["searchQueryLog"]>

  export type $SearchQueryLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchQueryLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      indexName: string
      query: string
      filters: Prisma.JsonValue | null
      totalHits: number
      durationMs: number
      createdAt: Date
    }, ExtArgs["result"]["searchQueryLog"]>
    composites: {}
  }

  type SearchQueryLogGetPayload<S extends boolean | null | undefined | SearchQueryLogDefaultArgs> = $Result.GetResult<Prisma.$SearchQueryLogPayload, S>

  type SearchQueryLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchQueryLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchQueryLogCountAggregateInputType | true
    }

  export interface SearchQueryLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchQueryLog'], meta: { name: 'SearchQueryLog' } }
    /**
     * Find zero or one SearchQueryLog that matches the filter.
     * @param {SearchQueryLogFindUniqueArgs} args - Arguments to find a SearchQueryLog
     * @example
     * // Get one SearchQueryLog
     * const searchQueryLog = await prisma.searchQueryLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchQueryLogFindUniqueArgs>(args: SelectSubset<T, SearchQueryLogFindUniqueArgs<ExtArgs>>): Prisma__SearchQueryLogClient<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SearchQueryLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchQueryLogFindUniqueOrThrowArgs} args - Arguments to find a SearchQueryLog
     * @example
     * // Get one SearchQueryLog
     * const searchQueryLog = await prisma.searchQueryLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchQueryLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchQueryLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchQueryLogClient<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchQueryLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchQueryLogFindFirstArgs} args - Arguments to find a SearchQueryLog
     * @example
     * // Get one SearchQueryLog
     * const searchQueryLog = await prisma.searchQueryLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchQueryLogFindFirstArgs>(args?: SelectSubset<T, SearchQueryLogFindFirstArgs<ExtArgs>>): Prisma__SearchQueryLogClient<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchQueryLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchQueryLogFindFirstOrThrowArgs} args - Arguments to find a SearchQueryLog
     * @example
     * // Get one SearchQueryLog
     * const searchQueryLog = await prisma.searchQueryLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchQueryLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchQueryLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchQueryLogClient<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchQueryLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchQueryLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchQueryLogs
     * const searchQueryLogs = await prisma.searchQueryLog.findMany()
     * 
     * // Get first 10 SearchQueryLogs
     * const searchQueryLogs = await prisma.searchQueryLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchQueryLogWithIdOnly = await prisma.searchQueryLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchQueryLogFindManyArgs>(args?: SelectSubset<T, SearchQueryLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SearchQueryLog.
     * @param {SearchQueryLogCreateArgs} args - Arguments to create a SearchQueryLog.
     * @example
     * // Create one SearchQueryLog
     * const SearchQueryLog = await prisma.searchQueryLog.create({
     *   data: {
     *     // ... data to create a SearchQueryLog
     *   }
     * })
     * 
     */
    create<T extends SearchQueryLogCreateArgs>(args: SelectSubset<T, SearchQueryLogCreateArgs<ExtArgs>>): Prisma__SearchQueryLogClient<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SearchQueryLogs.
     * @param {SearchQueryLogCreateManyArgs} args - Arguments to create many SearchQueryLogs.
     * @example
     * // Create many SearchQueryLogs
     * const searchQueryLog = await prisma.searchQueryLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchQueryLogCreateManyArgs>(args?: SelectSubset<T, SearchQueryLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SearchQueryLogs and returns the data saved in the database.
     * @param {SearchQueryLogCreateManyAndReturnArgs} args - Arguments to create many SearchQueryLogs.
     * @example
     * // Create many SearchQueryLogs
     * const searchQueryLog = await prisma.searchQueryLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SearchQueryLogs and only return the `id`
     * const searchQueryLogWithIdOnly = await prisma.searchQueryLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SearchQueryLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SearchQueryLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SearchQueryLog.
     * @param {SearchQueryLogDeleteArgs} args - Arguments to delete one SearchQueryLog.
     * @example
     * // Delete one SearchQueryLog
     * const SearchQueryLog = await prisma.searchQueryLog.delete({
     *   where: {
     *     // ... filter to delete one SearchQueryLog
     *   }
     * })
     * 
     */
    delete<T extends SearchQueryLogDeleteArgs>(args: SelectSubset<T, SearchQueryLogDeleteArgs<ExtArgs>>): Prisma__SearchQueryLogClient<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SearchQueryLog.
     * @param {SearchQueryLogUpdateArgs} args - Arguments to update one SearchQueryLog.
     * @example
     * // Update one SearchQueryLog
     * const searchQueryLog = await prisma.searchQueryLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchQueryLogUpdateArgs>(args: SelectSubset<T, SearchQueryLogUpdateArgs<ExtArgs>>): Prisma__SearchQueryLogClient<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SearchQueryLogs.
     * @param {SearchQueryLogDeleteManyArgs} args - Arguments to filter SearchQueryLogs to delete.
     * @example
     * // Delete a few SearchQueryLogs
     * const { count } = await prisma.searchQueryLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchQueryLogDeleteManyArgs>(args?: SelectSubset<T, SearchQueryLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchQueryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchQueryLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchQueryLogs
     * const searchQueryLog = await prisma.searchQueryLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchQueryLogUpdateManyArgs>(args: SelectSubset<T, SearchQueryLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchQueryLogs and returns the data updated in the database.
     * @param {SearchQueryLogUpdateManyAndReturnArgs} args - Arguments to update many SearchQueryLogs.
     * @example
     * // Update many SearchQueryLogs
     * const searchQueryLog = await prisma.searchQueryLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SearchQueryLogs and only return the `id`
     * const searchQueryLogWithIdOnly = await prisma.searchQueryLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends SearchQueryLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SearchQueryLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SearchQueryLog.
     * @param {SearchQueryLogUpsertArgs} args - Arguments to update or create a SearchQueryLog.
     * @example
     * // Update or create a SearchQueryLog
     * const searchQueryLog = await prisma.searchQueryLog.upsert({
     *   create: {
     *     // ... data to create a SearchQueryLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SearchQueryLog we want to update
     *   }
     * })
     */
    upsert<T extends SearchQueryLogUpsertArgs>(args: SelectSubset<T, SearchQueryLogUpsertArgs<ExtArgs>>): Prisma__SearchQueryLogClient<$Result.GetResult<Prisma.$SearchQueryLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SearchQueryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchQueryLogCountArgs} args - Arguments to filter SearchQueryLogs to count.
     * @example
     * // Count the number of SearchQueryLogs
     * const count = await prisma.searchQueryLog.count({
     *   where: {
     *     // ... the filter for the SearchQueryLogs we want to count
     *   }
     * })
    **/
    count<T extends SearchQueryLogCountArgs>(
      args?: Subset<T, SearchQueryLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchQueryLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchQueryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchQueryLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SearchQueryLogAggregateArgs>(args: Subset<T, SearchQueryLogAggregateArgs>): Prisma.PrismaPromise<GetSearchQueryLogAggregateType<T>>

    /**
     * Group by SearchQueryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchQueryLogGroupByArgs} args - Group by arguments.
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
      T extends SearchQueryLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchQueryLogGroupByArgs['orderBy'] }
        : { orderBy?: SearchQueryLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SearchQueryLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchQueryLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchQueryLog model
   */
  readonly fields: SearchQueryLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchQueryLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchQueryLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SearchQueryLog model
   */
  interface SearchQueryLogFieldRefs {
    readonly id: FieldRef<"SearchQueryLog", 'String'>
    readonly tenantId: FieldRef<"SearchQueryLog", 'String'>
    readonly indexName: FieldRef<"SearchQueryLog", 'String'>
    readonly query: FieldRef<"SearchQueryLog", 'String'>
    readonly filters: FieldRef<"SearchQueryLog", 'Json'>
    readonly totalHits: FieldRef<"SearchQueryLog", 'Int'>
    readonly durationMs: FieldRef<"SearchQueryLog", 'Int'>
    readonly createdAt: FieldRef<"SearchQueryLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchQueryLog findUnique
   */
  export type SearchQueryLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchQueryLog to fetch.
     */
    where: SearchQueryLogWhereUniqueInput
  }

  /**
   * SearchQueryLog findUniqueOrThrow
   */
  export type SearchQueryLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchQueryLog to fetch.
     */
    where: SearchQueryLogWhereUniqueInput
  }

  /**
   * SearchQueryLog findFirst
   */
  export type SearchQueryLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchQueryLog to fetch.
     */
    where?: SearchQueryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchQueryLogs to fetch.
     */
    orderBy?: SearchQueryLogOrderByWithRelationInput | SearchQueryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchQueryLogs.
     */
    cursor?: SearchQueryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchQueryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchQueryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchQueryLogs.
     */
    distinct?: SearchQueryLogScalarFieldEnum | SearchQueryLogScalarFieldEnum[]
  }

  /**
   * SearchQueryLog findFirstOrThrow
   */
  export type SearchQueryLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchQueryLog to fetch.
     */
    where?: SearchQueryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchQueryLogs to fetch.
     */
    orderBy?: SearchQueryLogOrderByWithRelationInput | SearchQueryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchQueryLogs.
     */
    cursor?: SearchQueryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchQueryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchQueryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchQueryLogs.
     */
    distinct?: SearchQueryLogScalarFieldEnum | SearchQueryLogScalarFieldEnum[]
  }

  /**
   * SearchQueryLog findMany
   */
  export type SearchQueryLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * Filter, which SearchQueryLogs to fetch.
     */
    where?: SearchQueryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchQueryLogs to fetch.
     */
    orderBy?: SearchQueryLogOrderByWithRelationInput | SearchQueryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchQueryLogs.
     */
    cursor?: SearchQueryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchQueryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchQueryLogs.
     */
    skip?: number
    distinct?: SearchQueryLogScalarFieldEnum | SearchQueryLogScalarFieldEnum[]
  }

  /**
   * SearchQueryLog create
   */
  export type SearchQueryLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SearchQueryLog.
     */
    data: XOR<SearchQueryLogCreateInput, SearchQueryLogUncheckedCreateInput>
  }

  /**
   * SearchQueryLog createMany
   */
  export type SearchQueryLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SearchQueryLogs.
     */
    data: SearchQueryLogCreateManyInput | SearchQueryLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchQueryLog createManyAndReturn
   */
  export type SearchQueryLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * The data used to create many SearchQueryLogs.
     */
    data: SearchQueryLogCreateManyInput | SearchQueryLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchQueryLog update
   */
  export type SearchQueryLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SearchQueryLog.
     */
    data: XOR<SearchQueryLogUpdateInput, SearchQueryLogUncheckedUpdateInput>
    /**
     * Choose, which SearchQueryLog to update.
     */
    where: SearchQueryLogWhereUniqueInput
  }

  /**
   * SearchQueryLog updateMany
   */
  export type SearchQueryLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchQueryLogs.
     */
    data: XOR<SearchQueryLogUpdateManyMutationInput, SearchQueryLogUncheckedUpdateManyInput>
    /**
     * Filter which SearchQueryLogs to update
     */
    where?: SearchQueryLogWhereInput
    /**
     * Limit how many SearchQueryLogs to update.
     */
    limit?: number
  }

  /**
   * SearchQueryLog updateManyAndReturn
   */
  export type SearchQueryLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * The data used to update SearchQueryLogs.
     */
    data: XOR<SearchQueryLogUpdateManyMutationInput, SearchQueryLogUncheckedUpdateManyInput>
    /**
     * Filter which SearchQueryLogs to update
     */
    where?: SearchQueryLogWhereInput
    /**
     * Limit how many SearchQueryLogs to update.
     */
    limit?: number
  }

  /**
   * SearchQueryLog upsert
   */
  export type SearchQueryLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SearchQueryLog to update in case it exists.
     */
    where: SearchQueryLogWhereUniqueInput
    /**
     * In case the SearchQueryLog found by the `where` argument doesn't exist, create a new SearchQueryLog with this data.
     */
    create: XOR<SearchQueryLogCreateInput, SearchQueryLogUncheckedCreateInput>
    /**
     * In case the SearchQueryLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchQueryLogUpdateInput, SearchQueryLogUncheckedUpdateInput>
  }

  /**
   * SearchQueryLog delete
   */
  export type SearchQueryLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
    /**
     * Filter which SearchQueryLog to delete.
     */
    where: SearchQueryLogWhereUniqueInput
  }

  /**
   * SearchQueryLog deleteMany
   */
  export type SearchQueryLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchQueryLogs to delete
     */
    where?: SearchQueryLogWhereInput
    /**
     * Limit how many SearchQueryLogs to delete.
     */
    limit?: number
  }

  /**
   * SearchQueryLog without action
   */
  export type SearchQueryLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchQueryLog
     */
    select?: SearchQueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchQueryLog
     */
    omit?: SearchQueryLogOmit<ExtArgs> | null
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


  export const SearchIndexConfigScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    indexName: 'indexName',
    provider: 'provider',
    settings: 'settings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SearchIndexConfigScalarFieldEnum = (typeof SearchIndexConfigScalarFieldEnum)[keyof typeof SearchIndexConfigScalarFieldEnum]


  export const VectorIndexConfigScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    indexName: 'indexName',
    provider: 'provider',
    embeddingModel: 'embeddingModel',
    dimensions: 'dimensions',
    settings: 'settings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VectorIndexConfigScalarFieldEnum = (typeof VectorIndexConfigScalarFieldEnum)[keyof typeof VectorIndexConfigScalarFieldEnum]


  export const SearchQueryLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    indexName: 'indexName',
    query: 'query',
    filters: 'filters',
    totalHits: 'totalHits',
    durationMs: 'durationMs',
    createdAt: 'createdAt'
  };

  export type SearchQueryLogScalarFieldEnum = (typeof SearchQueryLogScalarFieldEnum)[keyof typeof SearchQueryLogScalarFieldEnum]


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
   * Reference to a field of type 'SearchProviderName'
   */
  export type EnumSearchProviderNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SearchProviderName'>
    


  /**
   * Reference to a field of type 'SearchProviderName[]'
   */
  export type ListEnumSearchProviderNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SearchProviderName[]'>
    


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
   * Reference to a field of type 'VectorIndexProvider'
   */
  export type EnumVectorIndexProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VectorIndexProvider'>
    


  /**
   * Reference to a field of type 'VectorIndexProvider[]'
   */
  export type ListEnumVectorIndexProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VectorIndexProvider[]'>
    


  /**
   * Reference to a field of type 'EmbeddingModel'
   */
  export type EnumEmbeddingModelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmbeddingModel'>
    


  /**
   * Reference to a field of type 'EmbeddingModel[]'
   */
  export type ListEnumEmbeddingModelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmbeddingModel[]'>
    


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


  export type SearchIndexConfigWhereInput = {
    AND?: SearchIndexConfigWhereInput | SearchIndexConfigWhereInput[]
    OR?: SearchIndexConfigWhereInput[]
    NOT?: SearchIndexConfigWhereInput | SearchIndexConfigWhereInput[]
    id?: StringFilter<"SearchIndexConfig"> | string
    tenantId?: StringFilter<"SearchIndexConfig"> | string
    indexName?: StringFilter<"SearchIndexConfig"> | string
    provider?: EnumSearchProviderNameFilter<"SearchIndexConfig"> | $Enums.SearchProviderName
    settings?: JsonFilter<"SearchIndexConfig">
    createdAt?: DateTimeFilter<"SearchIndexConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SearchIndexConfig"> | Date | string
  }

  export type SearchIndexConfigOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchIndexConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_indexName?: SearchIndexConfigTenantIdIndexNameCompoundUniqueInput
    AND?: SearchIndexConfigWhereInput | SearchIndexConfigWhereInput[]
    OR?: SearchIndexConfigWhereInput[]
    NOT?: SearchIndexConfigWhereInput | SearchIndexConfigWhereInput[]
    tenantId?: StringFilter<"SearchIndexConfig"> | string
    indexName?: StringFilter<"SearchIndexConfig"> | string
    provider?: EnumSearchProviderNameFilter<"SearchIndexConfig"> | $Enums.SearchProviderName
    settings?: JsonFilter<"SearchIndexConfig">
    createdAt?: DateTimeFilter<"SearchIndexConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SearchIndexConfig"> | Date | string
  }, "id" | "tenantId_indexName">

  export type SearchIndexConfigOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SearchIndexConfigCountOrderByAggregateInput
    _max?: SearchIndexConfigMaxOrderByAggregateInput
    _min?: SearchIndexConfigMinOrderByAggregateInput
  }

  export type SearchIndexConfigScalarWhereWithAggregatesInput = {
    AND?: SearchIndexConfigScalarWhereWithAggregatesInput | SearchIndexConfigScalarWhereWithAggregatesInput[]
    OR?: SearchIndexConfigScalarWhereWithAggregatesInput[]
    NOT?: SearchIndexConfigScalarWhereWithAggregatesInput | SearchIndexConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchIndexConfig"> | string
    tenantId?: StringWithAggregatesFilter<"SearchIndexConfig"> | string
    indexName?: StringWithAggregatesFilter<"SearchIndexConfig"> | string
    provider?: EnumSearchProviderNameWithAggregatesFilter<"SearchIndexConfig"> | $Enums.SearchProviderName
    settings?: JsonWithAggregatesFilter<"SearchIndexConfig">
    createdAt?: DateTimeWithAggregatesFilter<"SearchIndexConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SearchIndexConfig"> | Date | string
  }

  export type VectorIndexConfigWhereInput = {
    AND?: VectorIndexConfigWhereInput | VectorIndexConfigWhereInput[]
    OR?: VectorIndexConfigWhereInput[]
    NOT?: VectorIndexConfigWhereInput | VectorIndexConfigWhereInput[]
    id?: StringFilter<"VectorIndexConfig"> | string
    tenantId?: StringFilter<"VectorIndexConfig"> | string
    indexName?: StringFilter<"VectorIndexConfig"> | string
    provider?: EnumVectorIndexProviderFilter<"VectorIndexConfig"> | $Enums.VectorIndexProvider
    embeddingModel?: EnumEmbeddingModelFilter<"VectorIndexConfig"> | $Enums.EmbeddingModel
    dimensions?: IntFilter<"VectorIndexConfig"> | number
    settings?: JsonFilter<"VectorIndexConfig">
    createdAt?: DateTimeFilter<"VectorIndexConfig"> | Date | string
    updatedAt?: DateTimeFilter<"VectorIndexConfig"> | Date | string
  }

  export type VectorIndexConfigOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    embeddingModel?: SortOrder
    dimensions?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VectorIndexConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_indexName?: VectorIndexConfigTenantIdIndexNameCompoundUniqueInput
    AND?: VectorIndexConfigWhereInput | VectorIndexConfigWhereInput[]
    OR?: VectorIndexConfigWhereInput[]
    NOT?: VectorIndexConfigWhereInput | VectorIndexConfigWhereInput[]
    tenantId?: StringFilter<"VectorIndexConfig"> | string
    indexName?: StringFilter<"VectorIndexConfig"> | string
    provider?: EnumVectorIndexProviderFilter<"VectorIndexConfig"> | $Enums.VectorIndexProvider
    embeddingModel?: EnumEmbeddingModelFilter<"VectorIndexConfig"> | $Enums.EmbeddingModel
    dimensions?: IntFilter<"VectorIndexConfig"> | number
    settings?: JsonFilter<"VectorIndexConfig">
    createdAt?: DateTimeFilter<"VectorIndexConfig"> | Date | string
    updatedAt?: DateTimeFilter<"VectorIndexConfig"> | Date | string
  }, "id" | "tenantId_indexName">

  export type VectorIndexConfigOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    embeddingModel?: SortOrder
    dimensions?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VectorIndexConfigCountOrderByAggregateInput
    _avg?: VectorIndexConfigAvgOrderByAggregateInput
    _max?: VectorIndexConfigMaxOrderByAggregateInput
    _min?: VectorIndexConfigMinOrderByAggregateInput
    _sum?: VectorIndexConfigSumOrderByAggregateInput
  }

  export type VectorIndexConfigScalarWhereWithAggregatesInput = {
    AND?: VectorIndexConfigScalarWhereWithAggregatesInput | VectorIndexConfigScalarWhereWithAggregatesInput[]
    OR?: VectorIndexConfigScalarWhereWithAggregatesInput[]
    NOT?: VectorIndexConfigScalarWhereWithAggregatesInput | VectorIndexConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VectorIndexConfig"> | string
    tenantId?: StringWithAggregatesFilter<"VectorIndexConfig"> | string
    indexName?: StringWithAggregatesFilter<"VectorIndexConfig"> | string
    provider?: EnumVectorIndexProviderWithAggregatesFilter<"VectorIndexConfig"> | $Enums.VectorIndexProvider
    embeddingModel?: EnumEmbeddingModelWithAggregatesFilter<"VectorIndexConfig"> | $Enums.EmbeddingModel
    dimensions?: IntWithAggregatesFilter<"VectorIndexConfig"> | number
    settings?: JsonWithAggregatesFilter<"VectorIndexConfig">
    createdAt?: DateTimeWithAggregatesFilter<"VectorIndexConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VectorIndexConfig"> | Date | string
  }

  export type SearchQueryLogWhereInput = {
    AND?: SearchQueryLogWhereInput | SearchQueryLogWhereInput[]
    OR?: SearchQueryLogWhereInput[]
    NOT?: SearchQueryLogWhereInput | SearchQueryLogWhereInput[]
    id?: StringFilter<"SearchQueryLog"> | string
    tenantId?: StringFilter<"SearchQueryLog"> | string
    indexName?: StringFilter<"SearchQueryLog"> | string
    query?: StringFilter<"SearchQueryLog"> | string
    filters?: JsonNullableFilter<"SearchQueryLog">
    totalHits?: IntFilter<"SearchQueryLog"> | number
    durationMs?: IntFilter<"SearchQueryLog"> | number
    createdAt?: DateTimeFilter<"SearchQueryLog"> | Date | string
  }

  export type SearchQueryLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    query?: SortOrder
    filters?: SortOrderInput | SortOrder
    totalHits?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchQueryLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SearchQueryLogWhereInput | SearchQueryLogWhereInput[]
    OR?: SearchQueryLogWhereInput[]
    NOT?: SearchQueryLogWhereInput | SearchQueryLogWhereInput[]
    tenantId?: StringFilter<"SearchQueryLog"> | string
    indexName?: StringFilter<"SearchQueryLog"> | string
    query?: StringFilter<"SearchQueryLog"> | string
    filters?: JsonNullableFilter<"SearchQueryLog">
    totalHits?: IntFilter<"SearchQueryLog"> | number
    durationMs?: IntFilter<"SearchQueryLog"> | number
    createdAt?: DateTimeFilter<"SearchQueryLog"> | Date | string
  }, "id">

  export type SearchQueryLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    query?: SortOrder
    filters?: SortOrderInput | SortOrder
    totalHits?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
    _count?: SearchQueryLogCountOrderByAggregateInput
    _avg?: SearchQueryLogAvgOrderByAggregateInput
    _max?: SearchQueryLogMaxOrderByAggregateInput
    _min?: SearchQueryLogMinOrderByAggregateInput
    _sum?: SearchQueryLogSumOrderByAggregateInput
  }

  export type SearchQueryLogScalarWhereWithAggregatesInput = {
    AND?: SearchQueryLogScalarWhereWithAggregatesInput | SearchQueryLogScalarWhereWithAggregatesInput[]
    OR?: SearchQueryLogScalarWhereWithAggregatesInput[]
    NOT?: SearchQueryLogScalarWhereWithAggregatesInput | SearchQueryLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchQueryLog"> | string
    tenantId?: StringWithAggregatesFilter<"SearchQueryLog"> | string
    indexName?: StringWithAggregatesFilter<"SearchQueryLog"> | string
    query?: StringWithAggregatesFilter<"SearchQueryLog"> | string
    filters?: JsonNullableWithAggregatesFilter<"SearchQueryLog">
    totalHits?: IntWithAggregatesFilter<"SearchQueryLog"> | number
    durationMs?: IntWithAggregatesFilter<"SearchQueryLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SearchQueryLog"> | Date | string
  }

  export type SearchIndexConfigCreateInput = {
    id?: string
    tenantId: string
    indexName: string
    provider?: $Enums.SearchProviderName
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchIndexConfigUncheckedCreateInput = {
    id?: string
    tenantId: string
    indexName: string
    provider?: $Enums.SearchProviderName
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchIndexConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    provider?: EnumSearchProviderNameFieldUpdateOperationsInput | $Enums.SearchProviderName
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchIndexConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    provider?: EnumSearchProviderNameFieldUpdateOperationsInput | $Enums.SearchProviderName
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchIndexConfigCreateManyInput = {
    id?: string
    tenantId: string
    indexName: string
    provider?: $Enums.SearchProviderName
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchIndexConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    provider?: EnumSearchProviderNameFieldUpdateOperationsInput | $Enums.SearchProviderName
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchIndexConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    provider?: EnumSearchProviderNameFieldUpdateOperationsInput | $Enums.SearchProviderName
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VectorIndexConfigCreateInput = {
    id?: string
    tenantId: string
    indexName: string
    provider?: $Enums.VectorIndexProvider
    embeddingModel?: $Enums.EmbeddingModel
    dimensions?: number
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VectorIndexConfigUncheckedCreateInput = {
    id?: string
    tenantId: string
    indexName: string
    provider?: $Enums.VectorIndexProvider
    embeddingModel?: $Enums.EmbeddingModel
    dimensions?: number
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VectorIndexConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    provider?: EnumVectorIndexProviderFieldUpdateOperationsInput | $Enums.VectorIndexProvider
    embeddingModel?: EnumEmbeddingModelFieldUpdateOperationsInput | $Enums.EmbeddingModel
    dimensions?: IntFieldUpdateOperationsInput | number
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VectorIndexConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    provider?: EnumVectorIndexProviderFieldUpdateOperationsInput | $Enums.VectorIndexProvider
    embeddingModel?: EnumEmbeddingModelFieldUpdateOperationsInput | $Enums.EmbeddingModel
    dimensions?: IntFieldUpdateOperationsInput | number
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VectorIndexConfigCreateManyInput = {
    id?: string
    tenantId: string
    indexName: string
    provider?: $Enums.VectorIndexProvider
    embeddingModel?: $Enums.EmbeddingModel
    dimensions?: number
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VectorIndexConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    provider?: EnumVectorIndexProviderFieldUpdateOperationsInput | $Enums.VectorIndexProvider
    embeddingModel?: EnumEmbeddingModelFieldUpdateOperationsInput | $Enums.EmbeddingModel
    dimensions?: IntFieldUpdateOperationsInput | number
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VectorIndexConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    provider?: EnumVectorIndexProviderFieldUpdateOperationsInput | $Enums.VectorIndexProvider
    embeddingModel?: EnumEmbeddingModelFieldUpdateOperationsInput | $Enums.EmbeddingModel
    dimensions?: IntFieldUpdateOperationsInput | number
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchQueryLogCreateInput = {
    id?: string
    tenantId: string
    indexName: string
    query: string
    filters?: NullableJsonNullValueInput | InputJsonValue
    totalHits?: number
    durationMs?: number
    createdAt?: Date | string
  }

  export type SearchQueryLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    indexName: string
    query: string
    filters?: NullableJsonNullValueInput | InputJsonValue
    totalHits?: number
    durationMs?: number
    createdAt?: Date | string
  }

  export type SearchQueryLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    filters?: NullableJsonNullValueInput | InputJsonValue
    totalHits?: IntFieldUpdateOperationsInput | number
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchQueryLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    filters?: NullableJsonNullValueInput | InputJsonValue
    totalHits?: IntFieldUpdateOperationsInput | number
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchQueryLogCreateManyInput = {
    id?: string
    tenantId: string
    indexName: string
    query: string
    filters?: NullableJsonNullValueInput | InputJsonValue
    totalHits?: number
    durationMs?: number
    createdAt?: Date | string
  }

  export type SearchQueryLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    filters?: NullableJsonNullValueInput | InputJsonValue
    totalHits?: IntFieldUpdateOperationsInput | number
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchQueryLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    indexName?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    filters?: NullableJsonNullValueInput | InputJsonValue
    totalHits?: IntFieldUpdateOperationsInput | number
    durationMs?: IntFieldUpdateOperationsInput | number
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

  export type EnumSearchProviderNameFilter<$PrismaModel = never> = {
    equals?: $Enums.SearchProviderName | EnumSearchProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.SearchProviderName[] | ListEnumSearchProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.SearchProviderName[] | ListEnumSearchProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumSearchProviderNameFilter<$PrismaModel> | $Enums.SearchProviderName
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

  export type SearchIndexConfigTenantIdIndexNameCompoundUniqueInput = {
    tenantId: string
    indexName: string
  }

  export type SearchIndexConfigCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchIndexConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchIndexConfigMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumSearchProviderNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SearchProviderName | EnumSearchProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.SearchProviderName[] | ListEnumSearchProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.SearchProviderName[] | ListEnumSearchProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumSearchProviderNameWithAggregatesFilter<$PrismaModel> | $Enums.SearchProviderName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSearchProviderNameFilter<$PrismaModel>
    _max?: NestedEnumSearchProviderNameFilter<$PrismaModel>
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

  export type EnumVectorIndexProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.VectorIndexProvider | EnumVectorIndexProviderFieldRefInput<$PrismaModel>
    in?: $Enums.VectorIndexProvider[] | ListEnumVectorIndexProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.VectorIndexProvider[] | ListEnumVectorIndexProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumVectorIndexProviderFilter<$PrismaModel> | $Enums.VectorIndexProvider
  }

  export type EnumEmbeddingModelFilter<$PrismaModel = never> = {
    equals?: $Enums.EmbeddingModel | EnumEmbeddingModelFieldRefInput<$PrismaModel>
    in?: $Enums.EmbeddingModel[] | ListEnumEmbeddingModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmbeddingModel[] | ListEnumEmbeddingModelFieldRefInput<$PrismaModel>
    not?: NestedEnumEmbeddingModelFilter<$PrismaModel> | $Enums.EmbeddingModel
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

  export type VectorIndexConfigTenantIdIndexNameCompoundUniqueInput = {
    tenantId: string
    indexName: string
  }

  export type VectorIndexConfigCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    embeddingModel?: SortOrder
    dimensions?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VectorIndexConfigAvgOrderByAggregateInput = {
    dimensions?: SortOrder
  }

  export type VectorIndexConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    embeddingModel?: SortOrder
    dimensions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VectorIndexConfigMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    provider?: SortOrder
    embeddingModel?: SortOrder
    dimensions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VectorIndexConfigSumOrderByAggregateInput = {
    dimensions?: SortOrder
  }

  export type EnumVectorIndexProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VectorIndexProvider | EnumVectorIndexProviderFieldRefInput<$PrismaModel>
    in?: $Enums.VectorIndexProvider[] | ListEnumVectorIndexProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.VectorIndexProvider[] | ListEnumVectorIndexProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumVectorIndexProviderWithAggregatesFilter<$PrismaModel> | $Enums.VectorIndexProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVectorIndexProviderFilter<$PrismaModel>
    _max?: NestedEnumVectorIndexProviderFilter<$PrismaModel>
  }

  export type EnumEmbeddingModelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmbeddingModel | EnumEmbeddingModelFieldRefInput<$PrismaModel>
    in?: $Enums.EmbeddingModel[] | ListEnumEmbeddingModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmbeddingModel[] | ListEnumEmbeddingModelFieldRefInput<$PrismaModel>
    not?: NestedEnumEmbeddingModelWithAggregatesFilter<$PrismaModel> | $Enums.EmbeddingModel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmbeddingModelFilter<$PrismaModel>
    _max?: NestedEnumEmbeddingModelFilter<$PrismaModel>
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SearchQueryLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    query?: SortOrder
    filters?: SortOrder
    totalHits?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchQueryLogAvgOrderByAggregateInput = {
    totalHits?: SortOrder
    durationMs?: SortOrder
  }

  export type SearchQueryLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    query?: SortOrder
    totalHits?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchQueryLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    indexName?: SortOrder
    query?: SortOrder
    totalHits?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type SearchQueryLogSumOrderByAggregateInput = {
    totalHits?: SortOrder
    durationMs?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumSearchProviderNameFieldUpdateOperationsInput = {
    set?: $Enums.SearchProviderName
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumVectorIndexProviderFieldUpdateOperationsInput = {
    set?: $Enums.VectorIndexProvider
  }

  export type EnumEmbeddingModelFieldUpdateOperationsInput = {
    set?: $Enums.EmbeddingModel
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedEnumSearchProviderNameFilter<$PrismaModel = never> = {
    equals?: $Enums.SearchProviderName | EnumSearchProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.SearchProviderName[] | ListEnumSearchProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.SearchProviderName[] | ListEnumSearchProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumSearchProviderNameFilter<$PrismaModel> | $Enums.SearchProviderName
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

  export type NestedEnumSearchProviderNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SearchProviderName | EnumSearchProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.SearchProviderName[] | ListEnumSearchProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.SearchProviderName[] | ListEnumSearchProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumSearchProviderNameWithAggregatesFilter<$PrismaModel> | $Enums.SearchProviderName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSearchProviderNameFilter<$PrismaModel>
    _max?: NestedEnumSearchProviderNameFilter<$PrismaModel>
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

  export type NestedEnumVectorIndexProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.VectorIndexProvider | EnumVectorIndexProviderFieldRefInput<$PrismaModel>
    in?: $Enums.VectorIndexProvider[] | ListEnumVectorIndexProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.VectorIndexProvider[] | ListEnumVectorIndexProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumVectorIndexProviderFilter<$PrismaModel> | $Enums.VectorIndexProvider
  }

  export type NestedEnumEmbeddingModelFilter<$PrismaModel = never> = {
    equals?: $Enums.EmbeddingModel | EnumEmbeddingModelFieldRefInput<$PrismaModel>
    in?: $Enums.EmbeddingModel[] | ListEnumEmbeddingModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmbeddingModel[] | ListEnumEmbeddingModelFieldRefInput<$PrismaModel>
    not?: NestedEnumEmbeddingModelFilter<$PrismaModel> | $Enums.EmbeddingModel
  }

  export type NestedEnumVectorIndexProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VectorIndexProvider | EnumVectorIndexProviderFieldRefInput<$PrismaModel>
    in?: $Enums.VectorIndexProvider[] | ListEnumVectorIndexProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.VectorIndexProvider[] | ListEnumVectorIndexProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumVectorIndexProviderWithAggregatesFilter<$PrismaModel> | $Enums.VectorIndexProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVectorIndexProviderFilter<$PrismaModel>
    _max?: NestedEnumVectorIndexProviderFilter<$PrismaModel>
  }

  export type NestedEnumEmbeddingModelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmbeddingModel | EnumEmbeddingModelFieldRefInput<$PrismaModel>
    in?: $Enums.EmbeddingModel[] | ListEnumEmbeddingModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmbeddingModel[] | ListEnumEmbeddingModelFieldRefInput<$PrismaModel>
    not?: NestedEnumEmbeddingModelWithAggregatesFilter<$PrismaModel> | $Enums.EmbeddingModel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmbeddingModelFilter<$PrismaModel>
    _max?: NestedEnumEmbeddingModelFilter<$PrismaModel>
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