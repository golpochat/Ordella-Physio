
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
 * Model AITrainingJob
 * 
 */
export type AITrainingJob = $Result.DefaultSelection<Prisma.$AITrainingJobPayload>
/**
 * Model AIModelEvaluation
 * 
 */
export type AIModelEvaluation = $Result.DefaultSelection<Prisma.$AIModelEvaluationPayload>
/**
 * Model AIModelPromotion
 * 
 */
export type AIModelPromotion = $Result.DefaultSelection<Prisma.$AIModelPromotionPayload>
/**
 * Model AITrainingExperiment
 * 
 */
export type AITrainingExperiment = $Result.DefaultSelection<Prisma.$AITrainingExperimentPayload>
/**
 * Model AITrainingCheckpoint
 * 
 */
export type AITrainingCheckpoint = $Result.DefaultSelection<Prisma.$AITrainingCheckpointPayload>
/**
 * Model AIModelRegistry
 * 
 */
export type AIModelRegistry = $Result.DefaultSelection<Prisma.$AIModelRegistryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AITrainingModelType: {
  LLM: 'LLM',
  EMBEDDING: 'EMBEDDING'
};

export type AITrainingModelType = (typeof AITrainingModelType)[keyof typeof AITrainingModelType]


export const AITrainingProvider: {
  OPENAI: 'OPENAI',
  AZURE: 'AZURE',
  LOCAL: 'LOCAL'
};

export type AITrainingProvider = (typeof AITrainingProvider)[keyof typeof AITrainingProvider]


export const AITrainingJobStatus: {
  QUEUED: 'QUEUED',
  RUNNING: 'RUNNING',
  FAILED: 'FAILED',
  COMPLETED: 'COMPLETED'
};

export type AITrainingJobStatus = (typeof AITrainingJobStatus)[keyof typeof AITrainingJobStatus]


export const AIModelRegistryStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  DEPRECATED: 'DEPRECATED'
};

export type AIModelRegistryStatus = (typeof AIModelRegistryStatus)[keyof typeof AIModelRegistryStatus]


export const AITrainingExperimentStatus: {
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type AITrainingExperimentStatus = (typeof AITrainingExperimentStatus)[keyof typeof AITrainingExperimentStatus]


export const AIModelPromotionStage: {
  STAGING: 'STAGING',
  PRODUCTION: 'PRODUCTION',
  DEPRECATED: 'DEPRECATED'
};

export type AIModelPromotionStage = (typeof AIModelPromotionStage)[keyof typeof AIModelPromotionStage]

}

export type AITrainingModelType = $Enums.AITrainingModelType

export const AITrainingModelType: typeof $Enums.AITrainingModelType

export type AITrainingProvider = $Enums.AITrainingProvider

export const AITrainingProvider: typeof $Enums.AITrainingProvider

export type AITrainingJobStatus = $Enums.AITrainingJobStatus

export const AITrainingJobStatus: typeof $Enums.AITrainingJobStatus

export type AIModelRegistryStatus = $Enums.AIModelRegistryStatus

export const AIModelRegistryStatus: typeof $Enums.AIModelRegistryStatus

export type AITrainingExperimentStatus = $Enums.AITrainingExperimentStatus

export const AITrainingExperimentStatus: typeof $Enums.AITrainingExperimentStatus

export type AIModelPromotionStage = $Enums.AIModelPromotionStage

export const AIModelPromotionStage: typeof $Enums.AIModelPromotionStage

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AITrainingJobs
 * const aITrainingJobs = await prisma.aITrainingJob.findMany()
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
   * // Fetch zero or more AITrainingJobs
   * const aITrainingJobs = await prisma.aITrainingJob.findMany()
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
   * `prisma.aITrainingJob`: Exposes CRUD operations for the **AITrainingJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AITrainingJobs
    * const aITrainingJobs = await prisma.aITrainingJob.findMany()
    * ```
    */
  get aITrainingJob(): Prisma.AITrainingJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIModelEvaluation`: Exposes CRUD operations for the **AIModelEvaluation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIModelEvaluations
    * const aIModelEvaluations = await prisma.aIModelEvaluation.findMany()
    * ```
    */
  get aIModelEvaluation(): Prisma.AIModelEvaluationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIModelPromotion`: Exposes CRUD operations for the **AIModelPromotion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIModelPromotions
    * const aIModelPromotions = await prisma.aIModelPromotion.findMany()
    * ```
    */
  get aIModelPromotion(): Prisma.AIModelPromotionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aITrainingExperiment`: Exposes CRUD operations for the **AITrainingExperiment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AITrainingExperiments
    * const aITrainingExperiments = await prisma.aITrainingExperiment.findMany()
    * ```
    */
  get aITrainingExperiment(): Prisma.AITrainingExperimentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aITrainingCheckpoint`: Exposes CRUD operations for the **AITrainingCheckpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AITrainingCheckpoints
    * const aITrainingCheckpoints = await prisma.aITrainingCheckpoint.findMany()
    * ```
    */
  get aITrainingCheckpoint(): Prisma.AITrainingCheckpointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIModelRegistry`: Exposes CRUD operations for the **AIModelRegistry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIModelRegistries
    * const aIModelRegistries = await prisma.aIModelRegistry.findMany()
    * ```
    */
  get aIModelRegistry(): Prisma.AIModelRegistryDelegate<ExtArgs, ClientOptions>;
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
    AITrainingJob: 'AITrainingJob',
    AIModelEvaluation: 'AIModelEvaluation',
    AIModelPromotion: 'AIModelPromotion',
    AITrainingExperiment: 'AITrainingExperiment',
    AITrainingCheckpoint: 'AITrainingCheckpoint',
    AIModelRegistry: 'AIModelRegistry'
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
      modelProps: "aITrainingJob" | "aIModelEvaluation" | "aIModelPromotion" | "aITrainingExperiment" | "aITrainingCheckpoint" | "aIModelRegistry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AITrainingJob: {
        payload: Prisma.$AITrainingJobPayload<ExtArgs>
        fields: Prisma.AITrainingJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AITrainingJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AITrainingJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>
          }
          findFirst: {
            args: Prisma.AITrainingJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AITrainingJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>
          }
          findMany: {
            args: Prisma.AITrainingJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>[]
          }
          create: {
            args: Prisma.AITrainingJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>
          }
          createMany: {
            args: Prisma.AITrainingJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AITrainingJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>[]
          }
          delete: {
            args: Prisma.AITrainingJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>
          }
          update: {
            args: Prisma.AITrainingJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>
          }
          deleteMany: {
            args: Prisma.AITrainingJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AITrainingJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AITrainingJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>[]
          }
          upsert: {
            args: Prisma.AITrainingJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingJobPayload>
          }
          aggregate: {
            args: Prisma.AITrainingJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAITrainingJob>
          }
          groupBy: {
            args: Prisma.AITrainingJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<AITrainingJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.AITrainingJobCountArgs<ExtArgs>
            result: $Utils.Optional<AITrainingJobCountAggregateOutputType> | number
          }
        }
      }
      AIModelEvaluation: {
        payload: Prisma.$AIModelEvaluationPayload<ExtArgs>
        fields: Prisma.AIModelEvaluationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIModelEvaluationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIModelEvaluationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>
          }
          findFirst: {
            args: Prisma.AIModelEvaluationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIModelEvaluationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>
          }
          findMany: {
            args: Prisma.AIModelEvaluationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>[]
          }
          create: {
            args: Prisma.AIModelEvaluationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>
          }
          createMany: {
            args: Prisma.AIModelEvaluationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIModelEvaluationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>[]
          }
          delete: {
            args: Prisma.AIModelEvaluationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>
          }
          update: {
            args: Prisma.AIModelEvaluationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>
          }
          deleteMany: {
            args: Prisma.AIModelEvaluationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIModelEvaluationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIModelEvaluationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>[]
          }
          upsert: {
            args: Prisma.AIModelEvaluationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelEvaluationPayload>
          }
          aggregate: {
            args: Prisma.AIModelEvaluationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIModelEvaluation>
          }
          groupBy: {
            args: Prisma.AIModelEvaluationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIModelEvaluationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIModelEvaluationCountArgs<ExtArgs>
            result: $Utils.Optional<AIModelEvaluationCountAggregateOutputType> | number
          }
        }
      }
      AIModelPromotion: {
        payload: Prisma.$AIModelPromotionPayload<ExtArgs>
        fields: Prisma.AIModelPromotionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIModelPromotionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIModelPromotionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>
          }
          findFirst: {
            args: Prisma.AIModelPromotionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIModelPromotionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>
          }
          findMany: {
            args: Prisma.AIModelPromotionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>[]
          }
          create: {
            args: Prisma.AIModelPromotionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>
          }
          createMany: {
            args: Prisma.AIModelPromotionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIModelPromotionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>[]
          }
          delete: {
            args: Prisma.AIModelPromotionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>
          }
          update: {
            args: Prisma.AIModelPromotionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>
          }
          deleteMany: {
            args: Prisma.AIModelPromotionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIModelPromotionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIModelPromotionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>[]
          }
          upsert: {
            args: Prisma.AIModelPromotionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelPromotionPayload>
          }
          aggregate: {
            args: Prisma.AIModelPromotionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIModelPromotion>
          }
          groupBy: {
            args: Prisma.AIModelPromotionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIModelPromotionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIModelPromotionCountArgs<ExtArgs>
            result: $Utils.Optional<AIModelPromotionCountAggregateOutputType> | number
          }
        }
      }
      AITrainingExperiment: {
        payload: Prisma.$AITrainingExperimentPayload<ExtArgs>
        fields: Prisma.AITrainingExperimentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AITrainingExperimentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AITrainingExperimentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>
          }
          findFirst: {
            args: Prisma.AITrainingExperimentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AITrainingExperimentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>
          }
          findMany: {
            args: Prisma.AITrainingExperimentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>[]
          }
          create: {
            args: Prisma.AITrainingExperimentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>
          }
          createMany: {
            args: Prisma.AITrainingExperimentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AITrainingExperimentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>[]
          }
          delete: {
            args: Prisma.AITrainingExperimentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>
          }
          update: {
            args: Prisma.AITrainingExperimentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>
          }
          deleteMany: {
            args: Prisma.AITrainingExperimentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AITrainingExperimentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AITrainingExperimentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>[]
          }
          upsert: {
            args: Prisma.AITrainingExperimentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingExperimentPayload>
          }
          aggregate: {
            args: Prisma.AITrainingExperimentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAITrainingExperiment>
          }
          groupBy: {
            args: Prisma.AITrainingExperimentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AITrainingExperimentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AITrainingExperimentCountArgs<ExtArgs>
            result: $Utils.Optional<AITrainingExperimentCountAggregateOutputType> | number
          }
        }
      }
      AITrainingCheckpoint: {
        payload: Prisma.$AITrainingCheckpointPayload<ExtArgs>
        fields: Prisma.AITrainingCheckpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AITrainingCheckpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AITrainingCheckpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>
          }
          findFirst: {
            args: Prisma.AITrainingCheckpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AITrainingCheckpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>
          }
          findMany: {
            args: Prisma.AITrainingCheckpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>[]
          }
          create: {
            args: Prisma.AITrainingCheckpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>
          }
          createMany: {
            args: Prisma.AITrainingCheckpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AITrainingCheckpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>[]
          }
          delete: {
            args: Prisma.AITrainingCheckpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>
          }
          update: {
            args: Prisma.AITrainingCheckpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>
          }
          deleteMany: {
            args: Prisma.AITrainingCheckpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AITrainingCheckpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AITrainingCheckpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>[]
          }
          upsert: {
            args: Prisma.AITrainingCheckpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITrainingCheckpointPayload>
          }
          aggregate: {
            args: Prisma.AITrainingCheckpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAITrainingCheckpoint>
          }
          groupBy: {
            args: Prisma.AITrainingCheckpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<AITrainingCheckpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.AITrainingCheckpointCountArgs<ExtArgs>
            result: $Utils.Optional<AITrainingCheckpointCountAggregateOutputType> | number
          }
        }
      }
      AIModelRegistry: {
        payload: Prisma.$AIModelRegistryPayload<ExtArgs>
        fields: Prisma.AIModelRegistryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIModelRegistryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIModelRegistryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>
          }
          findFirst: {
            args: Prisma.AIModelRegistryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIModelRegistryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>
          }
          findMany: {
            args: Prisma.AIModelRegistryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>[]
          }
          create: {
            args: Prisma.AIModelRegistryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>
          }
          createMany: {
            args: Prisma.AIModelRegistryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIModelRegistryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>[]
          }
          delete: {
            args: Prisma.AIModelRegistryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>
          }
          update: {
            args: Prisma.AIModelRegistryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>
          }
          deleteMany: {
            args: Prisma.AIModelRegistryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIModelRegistryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIModelRegistryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>[]
          }
          upsert: {
            args: Prisma.AIModelRegistryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelRegistryPayload>
          }
          aggregate: {
            args: Prisma.AIModelRegistryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIModelRegistry>
          }
          groupBy: {
            args: Prisma.AIModelRegistryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIModelRegistryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIModelRegistryCountArgs<ExtArgs>
            result: $Utils.Optional<AIModelRegistryCountAggregateOutputType> | number
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
    aITrainingJob?: AITrainingJobOmit
    aIModelEvaluation?: AIModelEvaluationOmit
    aIModelPromotion?: AIModelPromotionOmit
    aITrainingExperiment?: AITrainingExperimentOmit
    aITrainingCheckpoint?: AITrainingCheckpointOmit
    aIModelRegistry?: AIModelRegistryOmit
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
   * Count Type AITrainingJobCountOutputType
   */

  export type AITrainingJobCountOutputType = {
    registryModels: number
    experiments: number
    checkpoints: number
  }

  export type AITrainingJobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registryModels?: boolean | AITrainingJobCountOutputTypeCountRegistryModelsArgs
    experiments?: boolean | AITrainingJobCountOutputTypeCountExperimentsArgs
    checkpoints?: boolean | AITrainingJobCountOutputTypeCountCheckpointsArgs
  }

  // Custom InputTypes
  /**
   * AITrainingJobCountOutputType without action
   */
  export type AITrainingJobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJobCountOutputType
     */
    select?: AITrainingJobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AITrainingJobCountOutputType without action
   */
  export type AITrainingJobCountOutputTypeCountRegistryModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIModelRegistryWhereInput
  }

  /**
   * AITrainingJobCountOutputType without action
   */
  export type AITrainingJobCountOutputTypeCountExperimentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITrainingExperimentWhereInput
  }

  /**
   * AITrainingJobCountOutputType without action
   */
  export type AITrainingJobCountOutputTypeCountCheckpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITrainingCheckpointWhereInput
  }


  /**
   * Count Type AITrainingExperimentCountOutputType
   */

  export type AITrainingExperimentCountOutputType = {
    checkpoints: number
  }

  export type AITrainingExperimentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checkpoints?: boolean | AITrainingExperimentCountOutputTypeCountCheckpointsArgs
  }

  // Custom InputTypes
  /**
   * AITrainingExperimentCountOutputType without action
   */
  export type AITrainingExperimentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperimentCountOutputType
     */
    select?: AITrainingExperimentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AITrainingExperimentCountOutputType without action
   */
  export type AITrainingExperimentCountOutputTypeCountCheckpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITrainingCheckpointWhereInput
  }


  /**
   * Count Type AIModelRegistryCountOutputType
   */

  export type AIModelRegistryCountOutputType = {
    evaluations: number
  }

  export type AIModelRegistryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluations?: boolean | AIModelRegistryCountOutputTypeCountEvaluationsArgs
  }

  // Custom InputTypes
  /**
   * AIModelRegistryCountOutputType without action
   */
  export type AIModelRegistryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistryCountOutputType
     */
    select?: AIModelRegistryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AIModelRegistryCountOutputType without action
   */
  export type AIModelRegistryCountOutputTypeCountEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIModelEvaluationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AITrainingJob
   */

  export type AggregateAITrainingJob = {
    _count: AITrainingJobCountAggregateOutputType | null
    _min: AITrainingJobMinAggregateOutputType | null
    _max: AITrainingJobMaxAggregateOutputType | null
  }

  export type AITrainingJobMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    datasetId: string | null
    datasetVersionId: string | null
    modelType: $Enums.AITrainingModelType | null
    baseModel: string | null
    trainingProvider: $Enums.AITrainingProvider | null
    status: $Enums.AITrainingJobStatus | null
    providerJobId: string | null
    trainingFileLocation: string | null
    outputModelId: string | null
    resumeCheckpointId: string | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AITrainingJobMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    datasetId: string | null
    datasetVersionId: string | null
    modelType: $Enums.AITrainingModelType | null
    baseModel: string | null
    trainingProvider: $Enums.AITrainingProvider | null
    status: $Enums.AITrainingJobStatus | null
    providerJobId: string | null
    trainingFileLocation: string | null
    outputModelId: string | null
    resumeCheckpointId: string | null
    createdByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AITrainingJobCountAggregateOutputType = {
    id: number
    tenantId: number
    datasetId: number
    datasetVersionId: number
    modelType: number
    baseModel: number
    trainingProvider: number
    status: number
    hyperparameters: number
    trainingConfig: number
    logs: number
    metrics: number
    providerJobId: number
    trainingFileLocation: number
    outputModelId: number
    resumeCheckpointId: number
    createdByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AITrainingJobMinAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    datasetVersionId?: true
    modelType?: true
    baseModel?: true
    trainingProvider?: true
    status?: true
    providerJobId?: true
    trainingFileLocation?: true
    outputModelId?: true
    resumeCheckpointId?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AITrainingJobMaxAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    datasetVersionId?: true
    modelType?: true
    baseModel?: true
    trainingProvider?: true
    status?: true
    providerJobId?: true
    trainingFileLocation?: true
    outputModelId?: true
    resumeCheckpointId?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AITrainingJobCountAggregateInputType = {
    id?: true
    tenantId?: true
    datasetId?: true
    datasetVersionId?: true
    modelType?: true
    baseModel?: true
    trainingProvider?: true
    status?: true
    hyperparameters?: true
    trainingConfig?: true
    logs?: true
    metrics?: true
    providerJobId?: true
    trainingFileLocation?: true
    outputModelId?: true
    resumeCheckpointId?: true
    createdByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AITrainingJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITrainingJob to aggregate.
     */
    where?: AITrainingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingJobs to fetch.
     */
    orderBy?: AITrainingJobOrderByWithRelationInput | AITrainingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AITrainingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AITrainingJobs
    **/
    _count?: true | AITrainingJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AITrainingJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AITrainingJobMaxAggregateInputType
  }

  export type GetAITrainingJobAggregateType<T extends AITrainingJobAggregateArgs> = {
        [P in keyof T & keyof AggregateAITrainingJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAITrainingJob[P]>
      : GetScalarType<T[P], AggregateAITrainingJob[P]>
  }




  export type AITrainingJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITrainingJobWhereInput
    orderBy?: AITrainingJobOrderByWithAggregationInput | AITrainingJobOrderByWithAggregationInput[]
    by: AITrainingJobScalarFieldEnum[] | AITrainingJobScalarFieldEnum
    having?: AITrainingJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AITrainingJobCountAggregateInputType | true
    _min?: AITrainingJobMinAggregateInputType
    _max?: AITrainingJobMaxAggregateInputType
  }

  export type AITrainingJobGroupByOutputType = {
    id: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status: $Enums.AITrainingJobStatus
    hyperparameters: JsonValue
    trainingConfig: JsonValue
    logs: JsonValue
    metrics: JsonValue
    providerJobId: string | null
    trainingFileLocation: string | null
    outputModelId: string | null
    resumeCheckpointId: string | null
    createdByUserId: string
    createdAt: Date
    updatedAt: Date
    _count: AITrainingJobCountAggregateOutputType | null
    _min: AITrainingJobMinAggregateOutputType | null
    _max: AITrainingJobMaxAggregateOutputType | null
  }

  type GetAITrainingJobGroupByPayload<T extends AITrainingJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AITrainingJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AITrainingJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AITrainingJobGroupByOutputType[P]>
            : GetScalarType<T[P], AITrainingJobGroupByOutputType[P]>
        }
      >
    >


  export type AITrainingJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    datasetVersionId?: boolean
    modelType?: boolean
    baseModel?: boolean
    trainingProvider?: boolean
    status?: boolean
    hyperparameters?: boolean
    trainingConfig?: boolean
    logs?: boolean
    metrics?: boolean
    providerJobId?: boolean
    trainingFileLocation?: boolean
    outputModelId?: boolean
    resumeCheckpointId?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registryModels?: boolean | AITrainingJob$registryModelsArgs<ExtArgs>
    experiments?: boolean | AITrainingJob$experimentsArgs<ExtArgs>
    checkpoints?: boolean | AITrainingJob$checkpointsArgs<ExtArgs>
    _count?: boolean | AITrainingJobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITrainingJob"]>

  export type AITrainingJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    datasetVersionId?: boolean
    modelType?: boolean
    baseModel?: boolean
    trainingProvider?: boolean
    status?: boolean
    hyperparameters?: boolean
    trainingConfig?: boolean
    logs?: boolean
    metrics?: boolean
    providerJobId?: boolean
    trainingFileLocation?: boolean
    outputModelId?: boolean
    resumeCheckpointId?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aITrainingJob"]>

  export type AITrainingJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    datasetVersionId?: boolean
    modelType?: boolean
    baseModel?: boolean
    trainingProvider?: boolean
    status?: boolean
    hyperparameters?: boolean
    trainingConfig?: boolean
    logs?: boolean
    metrics?: boolean
    providerJobId?: boolean
    trainingFileLocation?: boolean
    outputModelId?: boolean
    resumeCheckpointId?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aITrainingJob"]>

  export type AITrainingJobSelectScalar = {
    id?: boolean
    tenantId?: boolean
    datasetId?: boolean
    datasetVersionId?: boolean
    modelType?: boolean
    baseModel?: boolean
    trainingProvider?: boolean
    status?: boolean
    hyperparameters?: boolean
    trainingConfig?: boolean
    logs?: boolean
    metrics?: boolean
    providerJobId?: boolean
    trainingFileLocation?: boolean
    outputModelId?: boolean
    resumeCheckpointId?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AITrainingJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "datasetId" | "datasetVersionId" | "modelType" | "baseModel" | "trainingProvider" | "status" | "hyperparameters" | "trainingConfig" | "logs" | "metrics" | "providerJobId" | "trainingFileLocation" | "outputModelId" | "resumeCheckpointId" | "createdByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["aITrainingJob"]>
  export type AITrainingJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registryModels?: boolean | AITrainingJob$registryModelsArgs<ExtArgs>
    experiments?: boolean | AITrainingJob$experimentsArgs<ExtArgs>
    checkpoints?: boolean | AITrainingJob$checkpointsArgs<ExtArgs>
    _count?: boolean | AITrainingJobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AITrainingJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AITrainingJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AITrainingJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AITrainingJob"
    objects: {
      registryModels: Prisma.$AIModelRegistryPayload<ExtArgs>[]
      experiments: Prisma.$AITrainingExperimentPayload<ExtArgs>[]
      checkpoints: Prisma.$AITrainingCheckpointPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      datasetId: string
      datasetVersionId: string
      modelType: $Enums.AITrainingModelType
      baseModel: string
      trainingProvider: $Enums.AITrainingProvider
      status: $Enums.AITrainingJobStatus
      hyperparameters: Prisma.JsonValue
      trainingConfig: Prisma.JsonValue
      logs: Prisma.JsonValue
      metrics: Prisma.JsonValue
      providerJobId: string | null
      trainingFileLocation: string | null
      outputModelId: string | null
      resumeCheckpointId: string | null
      createdByUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aITrainingJob"]>
    composites: {}
  }

  type AITrainingJobGetPayload<S extends boolean | null | undefined | AITrainingJobDefaultArgs> = $Result.GetResult<Prisma.$AITrainingJobPayload, S>

  type AITrainingJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AITrainingJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AITrainingJobCountAggregateInputType | true
    }

  export interface AITrainingJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AITrainingJob'], meta: { name: 'AITrainingJob' } }
    /**
     * Find zero or one AITrainingJob that matches the filter.
     * @param {AITrainingJobFindUniqueArgs} args - Arguments to find a AITrainingJob
     * @example
     * // Get one AITrainingJob
     * const aITrainingJob = await prisma.aITrainingJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AITrainingJobFindUniqueArgs>(args: SelectSubset<T, AITrainingJobFindUniqueArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AITrainingJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AITrainingJobFindUniqueOrThrowArgs} args - Arguments to find a AITrainingJob
     * @example
     * // Get one AITrainingJob
     * const aITrainingJob = await prisma.aITrainingJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AITrainingJobFindUniqueOrThrowArgs>(args: SelectSubset<T, AITrainingJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITrainingJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingJobFindFirstArgs} args - Arguments to find a AITrainingJob
     * @example
     * // Get one AITrainingJob
     * const aITrainingJob = await prisma.aITrainingJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AITrainingJobFindFirstArgs>(args?: SelectSubset<T, AITrainingJobFindFirstArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITrainingJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingJobFindFirstOrThrowArgs} args - Arguments to find a AITrainingJob
     * @example
     * // Get one AITrainingJob
     * const aITrainingJob = await prisma.aITrainingJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AITrainingJobFindFirstOrThrowArgs>(args?: SelectSubset<T, AITrainingJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AITrainingJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AITrainingJobs
     * const aITrainingJobs = await prisma.aITrainingJob.findMany()
     * 
     * // Get first 10 AITrainingJobs
     * const aITrainingJobs = await prisma.aITrainingJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aITrainingJobWithIdOnly = await prisma.aITrainingJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AITrainingJobFindManyArgs>(args?: SelectSubset<T, AITrainingJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AITrainingJob.
     * @param {AITrainingJobCreateArgs} args - Arguments to create a AITrainingJob.
     * @example
     * // Create one AITrainingJob
     * const AITrainingJob = await prisma.aITrainingJob.create({
     *   data: {
     *     // ... data to create a AITrainingJob
     *   }
     * })
     * 
     */
    create<T extends AITrainingJobCreateArgs>(args: SelectSubset<T, AITrainingJobCreateArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AITrainingJobs.
     * @param {AITrainingJobCreateManyArgs} args - Arguments to create many AITrainingJobs.
     * @example
     * // Create many AITrainingJobs
     * const aITrainingJob = await prisma.aITrainingJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AITrainingJobCreateManyArgs>(args?: SelectSubset<T, AITrainingJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AITrainingJobs and returns the data saved in the database.
     * @param {AITrainingJobCreateManyAndReturnArgs} args - Arguments to create many AITrainingJobs.
     * @example
     * // Create many AITrainingJobs
     * const aITrainingJob = await prisma.aITrainingJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AITrainingJobs and only return the `id`
     * const aITrainingJobWithIdOnly = await prisma.aITrainingJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AITrainingJobCreateManyAndReturnArgs>(args?: SelectSubset<T, AITrainingJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AITrainingJob.
     * @param {AITrainingJobDeleteArgs} args - Arguments to delete one AITrainingJob.
     * @example
     * // Delete one AITrainingJob
     * const AITrainingJob = await prisma.aITrainingJob.delete({
     *   where: {
     *     // ... filter to delete one AITrainingJob
     *   }
     * })
     * 
     */
    delete<T extends AITrainingJobDeleteArgs>(args: SelectSubset<T, AITrainingJobDeleteArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AITrainingJob.
     * @param {AITrainingJobUpdateArgs} args - Arguments to update one AITrainingJob.
     * @example
     * // Update one AITrainingJob
     * const aITrainingJob = await prisma.aITrainingJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AITrainingJobUpdateArgs>(args: SelectSubset<T, AITrainingJobUpdateArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AITrainingJobs.
     * @param {AITrainingJobDeleteManyArgs} args - Arguments to filter AITrainingJobs to delete.
     * @example
     * // Delete a few AITrainingJobs
     * const { count } = await prisma.aITrainingJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AITrainingJobDeleteManyArgs>(args?: SelectSubset<T, AITrainingJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITrainingJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AITrainingJobs
     * const aITrainingJob = await prisma.aITrainingJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AITrainingJobUpdateManyArgs>(args: SelectSubset<T, AITrainingJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITrainingJobs and returns the data updated in the database.
     * @param {AITrainingJobUpdateManyAndReturnArgs} args - Arguments to update many AITrainingJobs.
     * @example
     * // Update many AITrainingJobs
     * const aITrainingJob = await prisma.aITrainingJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AITrainingJobs and only return the `id`
     * const aITrainingJobWithIdOnly = await prisma.aITrainingJob.updateManyAndReturn({
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
    updateManyAndReturn<T extends AITrainingJobUpdateManyAndReturnArgs>(args: SelectSubset<T, AITrainingJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AITrainingJob.
     * @param {AITrainingJobUpsertArgs} args - Arguments to update or create a AITrainingJob.
     * @example
     * // Update or create a AITrainingJob
     * const aITrainingJob = await prisma.aITrainingJob.upsert({
     *   create: {
     *     // ... data to create a AITrainingJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AITrainingJob we want to update
     *   }
     * })
     */
    upsert<T extends AITrainingJobUpsertArgs>(args: SelectSubset<T, AITrainingJobUpsertArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AITrainingJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingJobCountArgs} args - Arguments to filter AITrainingJobs to count.
     * @example
     * // Count the number of AITrainingJobs
     * const count = await prisma.aITrainingJob.count({
     *   where: {
     *     // ... the filter for the AITrainingJobs we want to count
     *   }
     * })
    **/
    count<T extends AITrainingJobCountArgs>(
      args?: Subset<T, AITrainingJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AITrainingJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AITrainingJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AITrainingJobAggregateArgs>(args: Subset<T, AITrainingJobAggregateArgs>): Prisma.PrismaPromise<GetAITrainingJobAggregateType<T>>

    /**
     * Group by AITrainingJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingJobGroupByArgs} args - Group by arguments.
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
      T extends AITrainingJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AITrainingJobGroupByArgs['orderBy'] }
        : { orderBy?: AITrainingJobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AITrainingJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAITrainingJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AITrainingJob model
   */
  readonly fields: AITrainingJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AITrainingJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AITrainingJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registryModels<T extends AITrainingJob$registryModelsArgs<ExtArgs> = {}>(args?: Subset<T, AITrainingJob$registryModelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    experiments<T extends AITrainingJob$experimentsArgs<ExtArgs> = {}>(args?: Subset<T, AITrainingJob$experimentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    checkpoints<T extends AITrainingJob$checkpointsArgs<ExtArgs> = {}>(args?: Subset<T, AITrainingJob$checkpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the AITrainingJob model
   */
  interface AITrainingJobFieldRefs {
    readonly id: FieldRef<"AITrainingJob", 'String'>
    readonly tenantId: FieldRef<"AITrainingJob", 'String'>
    readonly datasetId: FieldRef<"AITrainingJob", 'String'>
    readonly datasetVersionId: FieldRef<"AITrainingJob", 'String'>
    readonly modelType: FieldRef<"AITrainingJob", 'AITrainingModelType'>
    readonly baseModel: FieldRef<"AITrainingJob", 'String'>
    readonly trainingProvider: FieldRef<"AITrainingJob", 'AITrainingProvider'>
    readonly status: FieldRef<"AITrainingJob", 'AITrainingJobStatus'>
    readonly hyperparameters: FieldRef<"AITrainingJob", 'Json'>
    readonly trainingConfig: FieldRef<"AITrainingJob", 'Json'>
    readonly logs: FieldRef<"AITrainingJob", 'Json'>
    readonly metrics: FieldRef<"AITrainingJob", 'Json'>
    readonly providerJobId: FieldRef<"AITrainingJob", 'String'>
    readonly trainingFileLocation: FieldRef<"AITrainingJob", 'String'>
    readonly outputModelId: FieldRef<"AITrainingJob", 'String'>
    readonly resumeCheckpointId: FieldRef<"AITrainingJob", 'String'>
    readonly createdByUserId: FieldRef<"AITrainingJob", 'String'>
    readonly createdAt: FieldRef<"AITrainingJob", 'DateTime'>
    readonly updatedAt: FieldRef<"AITrainingJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AITrainingJob findUnique
   */
  export type AITrainingJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingJob to fetch.
     */
    where: AITrainingJobWhereUniqueInput
  }

  /**
   * AITrainingJob findUniqueOrThrow
   */
  export type AITrainingJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingJob to fetch.
     */
    where: AITrainingJobWhereUniqueInput
  }

  /**
   * AITrainingJob findFirst
   */
  export type AITrainingJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingJob to fetch.
     */
    where?: AITrainingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingJobs to fetch.
     */
    orderBy?: AITrainingJobOrderByWithRelationInput | AITrainingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITrainingJobs.
     */
    cursor?: AITrainingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITrainingJobs.
     */
    distinct?: AITrainingJobScalarFieldEnum | AITrainingJobScalarFieldEnum[]
  }

  /**
   * AITrainingJob findFirstOrThrow
   */
  export type AITrainingJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingJob to fetch.
     */
    where?: AITrainingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingJobs to fetch.
     */
    orderBy?: AITrainingJobOrderByWithRelationInput | AITrainingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITrainingJobs.
     */
    cursor?: AITrainingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITrainingJobs.
     */
    distinct?: AITrainingJobScalarFieldEnum | AITrainingJobScalarFieldEnum[]
  }

  /**
   * AITrainingJob findMany
   */
  export type AITrainingJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingJobs to fetch.
     */
    where?: AITrainingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingJobs to fetch.
     */
    orderBy?: AITrainingJobOrderByWithRelationInput | AITrainingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AITrainingJobs.
     */
    cursor?: AITrainingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingJobs.
     */
    skip?: number
    distinct?: AITrainingJobScalarFieldEnum | AITrainingJobScalarFieldEnum[]
  }

  /**
   * AITrainingJob create
   */
  export type AITrainingJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * The data needed to create a AITrainingJob.
     */
    data: XOR<AITrainingJobCreateInput, AITrainingJobUncheckedCreateInput>
  }

  /**
   * AITrainingJob createMany
   */
  export type AITrainingJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AITrainingJobs.
     */
    data: AITrainingJobCreateManyInput | AITrainingJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AITrainingJob createManyAndReturn
   */
  export type AITrainingJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * The data used to create many AITrainingJobs.
     */
    data: AITrainingJobCreateManyInput | AITrainingJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AITrainingJob update
   */
  export type AITrainingJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * The data needed to update a AITrainingJob.
     */
    data: XOR<AITrainingJobUpdateInput, AITrainingJobUncheckedUpdateInput>
    /**
     * Choose, which AITrainingJob to update.
     */
    where: AITrainingJobWhereUniqueInput
  }

  /**
   * AITrainingJob updateMany
   */
  export type AITrainingJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AITrainingJobs.
     */
    data: XOR<AITrainingJobUpdateManyMutationInput, AITrainingJobUncheckedUpdateManyInput>
    /**
     * Filter which AITrainingJobs to update
     */
    where?: AITrainingJobWhereInput
    /**
     * Limit how many AITrainingJobs to update.
     */
    limit?: number
  }

  /**
   * AITrainingJob updateManyAndReturn
   */
  export type AITrainingJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * The data used to update AITrainingJobs.
     */
    data: XOR<AITrainingJobUpdateManyMutationInput, AITrainingJobUncheckedUpdateManyInput>
    /**
     * Filter which AITrainingJobs to update
     */
    where?: AITrainingJobWhereInput
    /**
     * Limit how many AITrainingJobs to update.
     */
    limit?: number
  }

  /**
   * AITrainingJob upsert
   */
  export type AITrainingJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * The filter to search for the AITrainingJob to update in case it exists.
     */
    where: AITrainingJobWhereUniqueInput
    /**
     * In case the AITrainingJob found by the `where` argument doesn't exist, create a new AITrainingJob with this data.
     */
    create: XOR<AITrainingJobCreateInput, AITrainingJobUncheckedCreateInput>
    /**
     * In case the AITrainingJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AITrainingJobUpdateInput, AITrainingJobUncheckedUpdateInput>
  }

  /**
   * AITrainingJob delete
   */
  export type AITrainingJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
    /**
     * Filter which AITrainingJob to delete.
     */
    where: AITrainingJobWhereUniqueInput
  }

  /**
   * AITrainingJob deleteMany
   */
  export type AITrainingJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITrainingJobs to delete
     */
    where?: AITrainingJobWhereInput
    /**
     * Limit how many AITrainingJobs to delete.
     */
    limit?: number
  }

  /**
   * AITrainingJob.registryModels
   */
  export type AITrainingJob$registryModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    where?: AIModelRegistryWhereInput
    orderBy?: AIModelRegistryOrderByWithRelationInput | AIModelRegistryOrderByWithRelationInput[]
    cursor?: AIModelRegistryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIModelRegistryScalarFieldEnum | AIModelRegistryScalarFieldEnum[]
  }

  /**
   * AITrainingJob.experiments
   */
  export type AITrainingJob$experimentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    where?: AITrainingExperimentWhereInput
    orderBy?: AITrainingExperimentOrderByWithRelationInput | AITrainingExperimentOrderByWithRelationInput[]
    cursor?: AITrainingExperimentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AITrainingExperimentScalarFieldEnum | AITrainingExperimentScalarFieldEnum[]
  }

  /**
   * AITrainingJob.checkpoints
   */
  export type AITrainingJob$checkpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    where?: AITrainingCheckpointWhereInput
    orderBy?: AITrainingCheckpointOrderByWithRelationInput | AITrainingCheckpointOrderByWithRelationInput[]
    cursor?: AITrainingCheckpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AITrainingCheckpointScalarFieldEnum | AITrainingCheckpointScalarFieldEnum[]
  }

  /**
   * AITrainingJob without action
   */
  export type AITrainingJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingJob
     */
    select?: AITrainingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingJob
     */
    omit?: AITrainingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingJobInclude<ExtArgs> | null
  }


  /**
   * Model AIModelEvaluation
   */

  export type AggregateAIModelEvaluation = {
    _count: AIModelEvaluationCountAggregateOutputType | null
    _min: AIModelEvaluationMinAggregateOutputType | null
    _max: AIModelEvaluationMaxAggregateOutputType | null
  }

  export type AIModelEvaluationMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    datasetId: string | null
    createdAt: Date | null
  }

  export type AIModelEvaluationMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    datasetId: string | null
    createdAt: Date | null
  }

  export type AIModelEvaluationCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    datasetId: number
    metrics: number
    evaluationReport: number
    createdAt: number
    _all: number
  }


  export type AIModelEvaluationMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    datasetId?: true
    createdAt?: true
  }

  export type AIModelEvaluationMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    datasetId?: true
    createdAt?: true
  }

  export type AIModelEvaluationCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    datasetId?: true
    metrics?: true
    evaluationReport?: true
    createdAt?: true
    _all?: true
  }

  export type AIModelEvaluationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIModelEvaluation to aggregate.
     */
    where?: AIModelEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelEvaluations to fetch.
     */
    orderBy?: AIModelEvaluationOrderByWithRelationInput | AIModelEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIModelEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIModelEvaluations
    **/
    _count?: true | AIModelEvaluationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIModelEvaluationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIModelEvaluationMaxAggregateInputType
  }

  export type GetAIModelEvaluationAggregateType<T extends AIModelEvaluationAggregateArgs> = {
        [P in keyof T & keyof AggregateAIModelEvaluation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIModelEvaluation[P]>
      : GetScalarType<T[P], AggregateAIModelEvaluation[P]>
  }




  export type AIModelEvaluationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIModelEvaluationWhereInput
    orderBy?: AIModelEvaluationOrderByWithAggregationInput | AIModelEvaluationOrderByWithAggregationInput[]
    by: AIModelEvaluationScalarFieldEnum[] | AIModelEvaluationScalarFieldEnum
    having?: AIModelEvaluationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIModelEvaluationCountAggregateInputType | true
    _min?: AIModelEvaluationMinAggregateInputType
    _max?: AIModelEvaluationMaxAggregateInputType
  }

  export type AIModelEvaluationGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string
    datasetId: string
    metrics: JsonValue
    evaluationReport: JsonValue
    createdAt: Date
    _count: AIModelEvaluationCountAggregateOutputType | null
    _min: AIModelEvaluationMinAggregateOutputType | null
    _max: AIModelEvaluationMaxAggregateOutputType | null
  }

  type GetAIModelEvaluationGroupByPayload<T extends AIModelEvaluationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIModelEvaluationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIModelEvaluationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIModelEvaluationGroupByOutputType[P]>
            : GetScalarType<T[P], AIModelEvaluationGroupByOutputType[P]>
        }
      >
    >


  export type AIModelEvaluationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    datasetId?: boolean
    metrics?: boolean
    evaluationReport?: boolean
    createdAt?: boolean
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelEvaluation"]>

  export type AIModelEvaluationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    datasetId?: boolean
    metrics?: boolean
    evaluationReport?: boolean
    createdAt?: boolean
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelEvaluation"]>

  export type AIModelEvaluationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    datasetId?: boolean
    metrics?: boolean
    evaluationReport?: boolean
    createdAt?: boolean
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelEvaluation"]>

  export type AIModelEvaluationSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    datasetId?: boolean
    metrics?: boolean
    evaluationReport?: boolean
    createdAt?: boolean
  }

  export type AIModelEvaluationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "datasetId" | "metrics" | "evaluationReport" | "createdAt", ExtArgs["result"]["aIModelEvaluation"]>
  export type AIModelEvaluationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }
  export type AIModelEvaluationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }
  export type AIModelEvaluationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }

  export type $AIModelEvaluationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIModelEvaluation"
    objects: {
      model: Prisma.$AIModelRegistryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string
      datasetId: string
      metrics: Prisma.JsonValue
      evaluationReport: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["aIModelEvaluation"]>
    composites: {}
  }

  type AIModelEvaluationGetPayload<S extends boolean | null | undefined | AIModelEvaluationDefaultArgs> = $Result.GetResult<Prisma.$AIModelEvaluationPayload, S>

  type AIModelEvaluationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIModelEvaluationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIModelEvaluationCountAggregateInputType | true
    }

  export interface AIModelEvaluationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIModelEvaluation'], meta: { name: 'AIModelEvaluation' } }
    /**
     * Find zero or one AIModelEvaluation that matches the filter.
     * @param {AIModelEvaluationFindUniqueArgs} args - Arguments to find a AIModelEvaluation
     * @example
     * // Get one AIModelEvaluation
     * const aIModelEvaluation = await prisma.aIModelEvaluation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIModelEvaluationFindUniqueArgs>(args: SelectSubset<T, AIModelEvaluationFindUniqueArgs<ExtArgs>>): Prisma__AIModelEvaluationClient<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIModelEvaluation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIModelEvaluationFindUniqueOrThrowArgs} args - Arguments to find a AIModelEvaluation
     * @example
     * // Get one AIModelEvaluation
     * const aIModelEvaluation = await prisma.aIModelEvaluation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIModelEvaluationFindUniqueOrThrowArgs>(args: SelectSubset<T, AIModelEvaluationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIModelEvaluationClient<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIModelEvaluation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelEvaluationFindFirstArgs} args - Arguments to find a AIModelEvaluation
     * @example
     * // Get one AIModelEvaluation
     * const aIModelEvaluation = await prisma.aIModelEvaluation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIModelEvaluationFindFirstArgs>(args?: SelectSubset<T, AIModelEvaluationFindFirstArgs<ExtArgs>>): Prisma__AIModelEvaluationClient<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIModelEvaluation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelEvaluationFindFirstOrThrowArgs} args - Arguments to find a AIModelEvaluation
     * @example
     * // Get one AIModelEvaluation
     * const aIModelEvaluation = await prisma.aIModelEvaluation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIModelEvaluationFindFirstOrThrowArgs>(args?: SelectSubset<T, AIModelEvaluationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIModelEvaluationClient<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIModelEvaluations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelEvaluationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIModelEvaluations
     * const aIModelEvaluations = await prisma.aIModelEvaluation.findMany()
     * 
     * // Get first 10 AIModelEvaluations
     * const aIModelEvaluations = await prisma.aIModelEvaluation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIModelEvaluationWithIdOnly = await prisma.aIModelEvaluation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIModelEvaluationFindManyArgs>(args?: SelectSubset<T, AIModelEvaluationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIModelEvaluation.
     * @param {AIModelEvaluationCreateArgs} args - Arguments to create a AIModelEvaluation.
     * @example
     * // Create one AIModelEvaluation
     * const AIModelEvaluation = await prisma.aIModelEvaluation.create({
     *   data: {
     *     // ... data to create a AIModelEvaluation
     *   }
     * })
     * 
     */
    create<T extends AIModelEvaluationCreateArgs>(args: SelectSubset<T, AIModelEvaluationCreateArgs<ExtArgs>>): Prisma__AIModelEvaluationClient<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIModelEvaluations.
     * @param {AIModelEvaluationCreateManyArgs} args - Arguments to create many AIModelEvaluations.
     * @example
     * // Create many AIModelEvaluations
     * const aIModelEvaluation = await prisma.aIModelEvaluation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIModelEvaluationCreateManyArgs>(args?: SelectSubset<T, AIModelEvaluationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIModelEvaluations and returns the data saved in the database.
     * @param {AIModelEvaluationCreateManyAndReturnArgs} args - Arguments to create many AIModelEvaluations.
     * @example
     * // Create many AIModelEvaluations
     * const aIModelEvaluation = await prisma.aIModelEvaluation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIModelEvaluations and only return the `id`
     * const aIModelEvaluationWithIdOnly = await prisma.aIModelEvaluation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIModelEvaluationCreateManyAndReturnArgs>(args?: SelectSubset<T, AIModelEvaluationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIModelEvaluation.
     * @param {AIModelEvaluationDeleteArgs} args - Arguments to delete one AIModelEvaluation.
     * @example
     * // Delete one AIModelEvaluation
     * const AIModelEvaluation = await prisma.aIModelEvaluation.delete({
     *   where: {
     *     // ... filter to delete one AIModelEvaluation
     *   }
     * })
     * 
     */
    delete<T extends AIModelEvaluationDeleteArgs>(args: SelectSubset<T, AIModelEvaluationDeleteArgs<ExtArgs>>): Prisma__AIModelEvaluationClient<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIModelEvaluation.
     * @param {AIModelEvaluationUpdateArgs} args - Arguments to update one AIModelEvaluation.
     * @example
     * // Update one AIModelEvaluation
     * const aIModelEvaluation = await prisma.aIModelEvaluation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIModelEvaluationUpdateArgs>(args: SelectSubset<T, AIModelEvaluationUpdateArgs<ExtArgs>>): Prisma__AIModelEvaluationClient<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIModelEvaluations.
     * @param {AIModelEvaluationDeleteManyArgs} args - Arguments to filter AIModelEvaluations to delete.
     * @example
     * // Delete a few AIModelEvaluations
     * const { count } = await prisma.aIModelEvaluation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIModelEvaluationDeleteManyArgs>(args?: SelectSubset<T, AIModelEvaluationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIModelEvaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelEvaluationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIModelEvaluations
     * const aIModelEvaluation = await prisma.aIModelEvaluation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIModelEvaluationUpdateManyArgs>(args: SelectSubset<T, AIModelEvaluationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIModelEvaluations and returns the data updated in the database.
     * @param {AIModelEvaluationUpdateManyAndReturnArgs} args - Arguments to update many AIModelEvaluations.
     * @example
     * // Update many AIModelEvaluations
     * const aIModelEvaluation = await prisma.aIModelEvaluation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIModelEvaluations and only return the `id`
     * const aIModelEvaluationWithIdOnly = await prisma.aIModelEvaluation.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIModelEvaluationUpdateManyAndReturnArgs>(args: SelectSubset<T, AIModelEvaluationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIModelEvaluation.
     * @param {AIModelEvaluationUpsertArgs} args - Arguments to update or create a AIModelEvaluation.
     * @example
     * // Update or create a AIModelEvaluation
     * const aIModelEvaluation = await prisma.aIModelEvaluation.upsert({
     *   create: {
     *     // ... data to create a AIModelEvaluation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIModelEvaluation we want to update
     *   }
     * })
     */
    upsert<T extends AIModelEvaluationUpsertArgs>(args: SelectSubset<T, AIModelEvaluationUpsertArgs<ExtArgs>>): Prisma__AIModelEvaluationClient<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIModelEvaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelEvaluationCountArgs} args - Arguments to filter AIModelEvaluations to count.
     * @example
     * // Count the number of AIModelEvaluations
     * const count = await prisma.aIModelEvaluation.count({
     *   where: {
     *     // ... the filter for the AIModelEvaluations we want to count
     *   }
     * })
    **/
    count<T extends AIModelEvaluationCountArgs>(
      args?: Subset<T, AIModelEvaluationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIModelEvaluationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIModelEvaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelEvaluationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIModelEvaluationAggregateArgs>(args: Subset<T, AIModelEvaluationAggregateArgs>): Prisma.PrismaPromise<GetAIModelEvaluationAggregateType<T>>

    /**
     * Group by AIModelEvaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelEvaluationGroupByArgs} args - Group by arguments.
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
      T extends AIModelEvaluationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIModelEvaluationGroupByArgs['orderBy'] }
        : { orderBy?: AIModelEvaluationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIModelEvaluationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIModelEvaluationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIModelEvaluation model
   */
  readonly fields: AIModelEvaluationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIModelEvaluation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIModelEvaluationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    model<T extends AIModelRegistryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AIModelRegistryDefaultArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AIModelEvaluation model
   */
  interface AIModelEvaluationFieldRefs {
    readonly id: FieldRef<"AIModelEvaluation", 'String'>
    readonly tenantId: FieldRef<"AIModelEvaluation", 'String'>
    readonly modelId: FieldRef<"AIModelEvaluation", 'String'>
    readonly datasetId: FieldRef<"AIModelEvaluation", 'String'>
    readonly metrics: FieldRef<"AIModelEvaluation", 'Json'>
    readonly evaluationReport: FieldRef<"AIModelEvaluation", 'Json'>
    readonly createdAt: FieldRef<"AIModelEvaluation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIModelEvaluation findUnique
   */
  export type AIModelEvaluationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AIModelEvaluation to fetch.
     */
    where: AIModelEvaluationWhereUniqueInput
  }

  /**
   * AIModelEvaluation findUniqueOrThrow
   */
  export type AIModelEvaluationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AIModelEvaluation to fetch.
     */
    where: AIModelEvaluationWhereUniqueInput
  }

  /**
   * AIModelEvaluation findFirst
   */
  export type AIModelEvaluationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AIModelEvaluation to fetch.
     */
    where?: AIModelEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelEvaluations to fetch.
     */
    orderBy?: AIModelEvaluationOrderByWithRelationInput | AIModelEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIModelEvaluations.
     */
    cursor?: AIModelEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIModelEvaluations.
     */
    distinct?: AIModelEvaluationScalarFieldEnum | AIModelEvaluationScalarFieldEnum[]
  }

  /**
   * AIModelEvaluation findFirstOrThrow
   */
  export type AIModelEvaluationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AIModelEvaluation to fetch.
     */
    where?: AIModelEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelEvaluations to fetch.
     */
    orderBy?: AIModelEvaluationOrderByWithRelationInput | AIModelEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIModelEvaluations.
     */
    cursor?: AIModelEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIModelEvaluations.
     */
    distinct?: AIModelEvaluationScalarFieldEnum | AIModelEvaluationScalarFieldEnum[]
  }

  /**
   * AIModelEvaluation findMany
   */
  export type AIModelEvaluationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AIModelEvaluations to fetch.
     */
    where?: AIModelEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelEvaluations to fetch.
     */
    orderBy?: AIModelEvaluationOrderByWithRelationInput | AIModelEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIModelEvaluations.
     */
    cursor?: AIModelEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelEvaluations.
     */
    skip?: number
    distinct?: AIModelEvaluationScalarFieldEnum | AIModelEvaluationScalarFieldEnum[]
  }

  /**
   * AIModelEvaluation create
   */
  export type AIModelEvaluationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * The data needed to create a AIModelEvaluation.
     */
    data: XOR<AIModelEvaluationCreateInput, AIModelEvaluationUncheckedCreateInput>
  }

  /**
   * AIModelEvaluation createMany
   */
  export type AIModelEvaluationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIModelEvaluations.
     */
    data: AIModelEvaluationCreateManyInput | AIModelEvaluationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIModelEvaluation createManyAndReturn
   */
  export type AIModelEvaluationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * The data used to create many AIModelEvaluations.
     */
    data: AIModelEvaluationCreateManyInput | AIModelEvaluationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIModelEvaluation update
   */
  export type AIModelEvaluationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * The data needed to update a AIModelEvaluation.
     */
    data: XOR<AIModelEvaluationUpdateInput, AIModelEvaluationUncheckedUpdateInput>
    /**
     * Choose, which AIModelEvaluation to update.
     */
    where: AIModelEvaluationWhereUniqueInput
  }

  /**
   * AIModelEvaluation updateMany
   */
  export type AIModelEvaluationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIModelEvaluations.
     */
    data: XOR<AIModelEvaluationUpdateManyMutationInput, AIModelEvaluationUncheckedUpdateManyInput>
    /**
     * Filter which AIModelEvaluations to update
     */
    where?: AIModelEvaluationWhereInput
    /**
     * Limit how many AIModelEvaluations to update.
     */
    limit?: number
  }

  /**
   * AIModelEvaluation updateManyAndReturn
   */
  export type AIModelEvaluationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * The data used to update AIModelEvaluations.
     */
    data: XOR<AIModelEvaluationUpdateManyMutationInput, AIModelEvaluationUncheckedUpdateManyInput>
    /**
     * Filter which AIModelEvaluations to update
     */
    where?: AIModelEvaluationWhereInput
    /**
     * Limit how many AIModelEvaluations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIModelEvaluation upsert
   */
  export type AIModelEvaluationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * The filter to search for the AIModelEvaluation to update in case it exists.
     */
    where: AIModelEvaluationWhereUniqueInput
    /**
     * In case the AIModelEvaluation found by the `where` argument doesn't exist, create a new AIModelEvaluation with this data.
     */
    create: XOR<AIModelEvaluationCreateInput, AIModelEvaluationUncheckedCreateInput>
    /**
     * In case the AIModelEvaluation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIModelEvaluationUpdateInput, AIModelEvaluationUncheckedUpdateInput>
  }

  /**
   * AIModelEvaluation delete
   */
  export type AIModelEvaluationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    /**
     * Filter which AIModelEvaluation to delete.
     */
    where: AIModelEvaluationWhereUniqueInput
  }

  /**
   * AIModelEvaluation deleteMany
   */
  export type AIModelEvaluationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIModelEvaluations to delete
     */
    where?: AIModelEvaluationWhereInput
    /**
     * Limit how many AIModelEvaluations to delete.
     */
    limit?: number
  }

  /**
   * AIModelEvaluation without action
   */
  export type AIModelEvaluationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
  }


  /**
   * Model AIModelPromotion
   */

  export type AggregateAIModelPromotion = {
    _count: AIModelPromotionCountAggregateOutputType | null
    _avg: AIModelPromotionAvgAggregateOutputType | null
    _sum: AIModelPromotionSumAggregateOutputType | null
    _min: AIModelPromotionMinAggregateOutputType | null
    _max: AIModelPromotionMaxAggregateOutputType | null
  }

  export type AIModelPromotionAvgAggregateOutputType = {
    rolloutPercentage: number | null
  }

  export type AIModelPromotionSumAggregateOutputType = {
    rolloutPercentage: number | null
  }

  export type AIModelPromotionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    stage: $Enums.AIModelPromotionStage | null
    rolloutPercentage: number | null
    promotedByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIModelPromotionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    stage: $Enums.AIModelPromotionStage | null
    rolloutPercentage: number | null
    promotedByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIModelPromotionCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    stage: number
    rolloutPercentage: number
    canaryHistory: number
    promotedByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIModelPromotionAvgAggregateInputType = {
    rolloutPercentage?: true
  }

  export type AIModelPromotionSumAggregateInputType = {
    rolloutPercentage?: true
  }

  export type AIModelPromotionMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    stage?: true
    rolloutPercentage?: true
    promotedByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIModelPromotionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    stage?: true
    rolloutPercentage?: true
    promotedByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIModelPromotionCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    stage?: true
    rolloutPercentage?: true
    canaryHistory?: true
    promotedByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIModelPromotionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIModelPromotion to aggregate.
     */
    where?: AIModelPromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelPromotions to fetch.
     */
    orderBy?: AIModelPromotionOrderByWithRelationInput | AIModelPromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIModelPromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelPromotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelPromotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIModelPromotions
    **/
    _count?: true | AIModelPromotionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIModelPromotionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIModelPromotionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIModelPromotionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIModelPromotionMaxAggregateInputType
  }

  export type GetAIModelPromotionAggregateType<T extends AIModelPromotionAggregateArgs> = {
        [P in keyof T & keyof AggregateAIModelPromotion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIModelPromotion[P]>
      : GetScalarType<T[P], AggregateAIModelPromotion[P]>
  }




  export type AIModelPromotionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIModelPromotionWhereInput
    orderBy?: AIModelPromotionOrderByWithAggregationInput | AIModelPromotionOrderByWithAggregationInput[]
    by: AIModelPromotionScalarFieldEnum[] | AIModelPromotionScalarFieldEnum
    having?: AIModelPromotionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIModelPromotionCountAggregateInputType | true
    _avg?: AIModelPromotionAvgAggregateInputType
    _sum?: AIModelPromotionSumAggregateInputType
    _min?: AIModelPromotionMinAggregateInputType
    _max?: AIModelPromotionMaxAggregateInputType
  }

  export type AIModelPromotionGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string
    stage: $Enums.AIModelPromotionStage
    rolloutPercentage: number
    canaryHistory: JsonValue
    promotedByUserId: string
    createdAt: Date
    updatedAt: Date
    _count: AIModelPromotionCountAggregateOutputType | null
    _avg: AIModelPromotionAvgAggregateOutputType | null
    _sum: AIModelPromotionSumAggregateOutputType | null
    _min: AIModelPromotionMinAggregateOutputType | null
    _max: AIModelPromotionMaxAggregateOutputType | null
  }

  type GetAIModelPromotionGroupByPayload<T extends AIModelPromotionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIModelPromotionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIModelPromotionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIModelPromotionGroupByOutputType[P]>
            : GetScalarType<T[P], AIModelPromotionGroupByOutputType[P]>
        }
      >
    >


  export type AIModelPromotionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    stage?: boolean
    rolloutPercentage?: boolean
    canaryHistory?: boolean
    promotedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelPromotion"]>

  export type AIModelPromotionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    stage?: boolean
    rolloutPercentage?: boolean
    canaryHistory?: boolean
    promotedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelPromotion"]>

  export type AIModelPromotionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    stage?: boolean
    rolloutPercentage?: boolean
    canaryHistory?: boolean
    promotedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelPromotion"]>

  export type AIModelPromotionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    stage?: boolean
    rolloutPercentage?: boolean
    canaryHistory?: boolean
    promotedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIModelPromotionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "stage" | "rolloutPercentage" | "canaryHistory" | "promotedByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["aIModelPromotion"]>
  export type AIModelPromotionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }
  export type AIModelPromotionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }
  export type AIModelPromotionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | AIModelRegistryDefaultArgs<ExtArgs>
  }

  export type $AIModelPromotionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIModelPromotion"
    objects: {
      model: Prisma.$AIModelRegistryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string
      stage: $Enums.AIModelPromotionStage
      rolloutPercentage: number
      canaryHistory: Prisma.JsonValue
      promotedByUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIModelPromotion"]>
    composites: {}
  }

  type AIModelPromotionGetPayload<S extends boolean | null | undefined | AIModelPromotionDefaultArgs> = $Result.GetResult<Prisma.$AIModelPromotionPayload, S>

  type AIModelPromotionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIModelPromotionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIModelPromotionCountAggregateInputType | true
    }

  export interface AIModelPromotionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIModelPromotion'], meta: { name: 'AIModelPromotion' } }
    /**
     * Find zero or one AIModelPromotion that matches the filter.
     * @param {AIModelPromotionFindUniqueArgs} args - Arguments to find a AIModelPromotion
     * @example
     * // Get one AIModelPromotion
     * const aIModelPromotion = await prisma.aIModelPromotion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIModelPromotionFindUniqueArgs>(args: SelectSubset<T, AIModelPromotionFindUniqueArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIModelPromotion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIModelPromotionFindUniqueOrThrowArgs} args - Arguments to find a AIModelPromotion
     * @example
     * // Get one AIModelPromotion
     * const aIModelPromotion = await prisma.aIModelPromotion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIModelPromotionFindUniqueOrThrowArgs>(args: SelectSubset<T, AIModelPromotionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIModelPromotion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelPromotionFindFirstArgs} args - Arguments to find a AIModelPromotion
     * @example
     * // Get one AIModelPromotion
     * const aIModelPromotion = await prisma.aIModelPromotion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIModelPromotionFindFirstArgs>(args?: SelectSubset<T, AIModelPromotionFindFirstArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIModelPromotion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelPromotionFindFirstOrThrowArgs} args - Arguments to find a AIModelPromotion
     * @example
     * // Get one AIModelPromotion
     * const aIModelPromotion = await prisma.aIModelPromotion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIModelPromotionFindFirstOrThrowArgs>(args?: SelectSubset<T, AIModelPromotionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIModelPromotions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelPromotionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIModelPromotions
     * const aIModelPromotions = await prisma.aIModelPromotion.findMany()
     * 
     * // Get first 10 AIModelPromotions
     * const aIModelPromotions = await prisma.aIModelPromotion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIModelPromotionWithIdOnly = await prisma.aIModelPromotion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIModelPromotionFindManyArgs>(args?: SelectSubset<T, AIModelPromotionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIModelPromotion.
     * @param {AIModelPromotionCreateArgs} args - Arguments to create a AIModelPromotion.
     * @example
     * // Create one AIModelPromotion
     * const AIModelPromotion = await prisma.aIModelPromotion.create({
     *   data: {
     *     // ... data to create a AIModelPromotion
     *   }
     * })
     * 
     */
    create<T extends AIModelPromotionCreateArgs>(args: SelectSubset<T, AIModelPromotionCreateArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIModelPromotions.
     * @param {AIModelPromotionCreateManyArgs} args - Arguments to create many AIModelPromotions.
     * @example
     * // Create many AIModelPromotions
     * const aIModelPromotion = await prisma.aIModelPromotion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIModelPromotionCreateManyArgs>(args?: SelectSubset<T, AIModelPromotionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIModelPromotions and returns the data saved in the database.
     * @param {AIModelPromotionCreateManyAndReturnArgs} args - Arguments to create many AIModelPromotions.
     * @example
     * // Create many AIModelPromotions
     * const aIModelPromotion = await prisma.aIModelPromotion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIModelPromotions and only return the `id`
     * const aIModelPromotionWithIdOnly = await prisma.aIModelPromotion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIModelPromotionCreateManyAndReturnArgs>(args?: SelectSubset<T, AIModelPromotionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIModelPromotion.
     * @param {AIModelPromotionDeleteArgs} args - Arguments to delete one AIModelPromotion.
     * @example
     * // Delete one AIModelPromotion
     * const AIModelPromotion = await prisma.aIModelPromotion.delete({
     *   where: {
     *     // ... filter to delete one AIModelPromotion
     *   }
     * })
     * 
     */
    delete<T extends AIModelPromotionDeleteArgs>(args: SelectSubset<T, AIModelPromotionDeleteArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIModelPromotion.
     * @param {AIModelPromotionUpdateArgs} args - Arguments to update one AIModelPromotion.
     * @example
     * // Update one AIModelPromotion
     * const aIModelPromotion = await prisma.aIModelPromotion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIModelPromotionUpdateArgs>(args: SelectSubset<T, AIModelPromotionUpdateArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIModelPromotions.
     * @param {AIModelPromotionDeleteManyArgs} args - Arguments to filter AIModelPromotions to delete.
     * @example
     * // Delete a few AIModelPromotions
     * const { count } = await prisma.aIModelPromotion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIModelPromotionDeleteManyArgs>(args?: SelectSubset<T, AIModelPromotionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIModelPromotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelPromotionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIModelPromotions
     * const aIModelPromotion = await prisma.aIModelPromotion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIModelPromotionUpdateManyArgs>(args: SelectSubset<T, AIModelPromotionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIModelPromotions and returns the data updated in the database.
     * @param {AIModelPromotionUpdateManyAndReturnArgs} args - Arguments to update many AIModelPromotions.
     * @example
     * // Update many AIModelPromotions
     * const aIModelPromotion = await prisma.aIModelPromotion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIModelPromotions and only return the `id`
     * const aIModelPromotionWithIdOnly = await prisma.aIModelPromotion.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIModelPromotionUpdateManyAndReturnArgs>(args: SelectSubset<T, AIModelPromotionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIModelPromotion.
     * @param {AIModelPromotionUpsertArgs} args - Arguments to update or create a AIModelPromotion.
     * @example
     * // Update or create a AIModelPromotion
     * const aIModelPromotion = await prisma.aIModelPromotion.upsert({
     *   create: {
     *     // ... data to create a AIModelPromotion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIModelPromotion we want to update
     *   }
     * })
     */
    upsert<T extends AIModelPromotionUpsertArgs>(args: SelectSubset<T, AIModelPromotionUpsertArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIModelPromotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelPromotionCountArgs} args - Arguments to filter AIModelPromotions to count.
     * @example
     * // Count the number of AIModelPromotions
     * const count = await prisma.aIModelPromotion.count({
     *   where: {
     *     // ... the filter for the AIModelPromotions we want to count
     *   }
     * })
    **/
    count<T extends AIModelPromotionCountArgs>(
      args?: Subset<T, AIModelPromotionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIModelPromotionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIModelPromotion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelPromotionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIModelPromotionAggregateArgs>(args: Subset<T, AIModelPromotionAggregateArgs>): Prisma.PrismaPromise<GetAIModelPromotionAggregateType<T>>

    /**
     * Group by AIModelPromotion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelPromotionGroupByArgs} args - Group by arguments.
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
      T extends AIModelPromotionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIModelPromotionGroupByArgs['orderBy'] }
        : { orderBy?: AIModelPromotionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIModelPromotionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIModelPromotionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIModelPromotion model
   */
  readonly fields: AIModelPromotionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIModelPromotion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIModelPromotionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    model<T extends AIModelRegistryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AIModelRegistryDefaultArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AIModelPromotion model
   */
  interface AIModelPromotionFieldRefs {
    readonly id: FieldRef<"AIModelPromotion", 'String'>
    readonly tenantId: FieldRef<"AIModelPromotion", 'String'>
    readonly modelId: FieldRef<"AIModelPromotion", 'String'>
    readonly stage: FieldRef<"AIModelPromotion", 'AIModelPromotionStage'>
    readonly rolloutPercentage: FieldRef<"AIModelPromotion", 'Int'>
    readonly canaryHistory: FieldRef<"AIModelPromotion", 'Json'>
    readonly promotedByUserId: FieldRef<"AIModelPromotion", 'String'>
    readonly createdAt: FieldRef<"AIModelPromotion", 'DateTime'>
    readonly updatedAt: FieldRef<"AIModelPromotion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIModelPromotion findUnique
   */
  export type AIModelPromotionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * Filter, which AIModelPromotion to fetch.
     */
    where: AIModelPromotionWhereUniqueInput
  }

  /**
   * AIModelPromotion findUniqueOrThrow
   */
  export type AIModelPromotionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * Filter, which AIModelPromotion to fetch.
     */
    where: AIModelPromotionWhereUniqueInput
  }

  /**
   * AIModelPromotion findFirst
   */
  export type AIModelPromotionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * Filter, which AIModelPromotion to fetch.
     */
    where?: AIModelPromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelPromotions to fetch.
     */
    orderBy?: AIModelPromotionOrderByWithRelationInput | AIModelPromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIModelPromotions.
     */
    cursor?: AIModelPromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelPromotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelPromotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIModelPromotions.
     */
    distinct?: AIModelPromotionScalarFieldEnum | AIModelPromotionScalarFieldEnum[]
  }

  /**
   * AIModelPromotion findFirstOrThrow
   */
  export type AIModelPromotionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * Filter, which AIModelPromotion to fetch.
     */
    where?: AIModelPromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelPromotions to fetch.
     */
    orderBy?: AIModelPromotionOrderByWithRelationInput | AIModelPromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIModelPromotions.
     */
    cursor?: AIModelPromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelPromotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelPromotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIModelPromotions.
     */
    distinct?: AIModelPromotionScalarFieldEnum | AIModelPromotionScalarFieldEnum[]
  }

  /**
   * AIModelPromotion findMany
   */
  export type AIModelPromotionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * Filter, which AIModelPromotions to fetch.
     */
    where?: AIModelPromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelPromotions to fetch.
     */
    orderBy?: AIModelPromotionOrderByWithRelationInput | AIModelPromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIModelPromotions.
     */
    cursor?: AIModelPromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelPromotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelPromotions.
     */
    skip?: number
    distinct?: AIModelPromotionScalarFieldEnum | AIModelPromotionScalarFieldEnum[]
  }

  /**
   * AIModelPromotion create
   */
  export type AIModelPromotionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * The data needed to create a AIModelPromotion.
     */
    data: XOR<AIModelPromotionCreateInput, AIModelPromotionUncheckedCreateInput>
  }

  /**
   * AIModelPromotion createMany
   */
  export type AIModelPromotionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIModelPromotions.
     */
    data: AIModelPromotionCreateManyInput | AIModelPromotionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIModelPromotion createManyAndReturn
   */
  export type AIModelPromotionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * The data used to create many AIModelPromotions.
     */
    data: AIModelPromotionCreateManyInput | AIModelPromotionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIModelPromotion update
   */
  export type AIModelPromotionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * The data needed to update a AIModelPromotion.
     */
    data: XOR<AIModelPromotionUpdateInput, AIModelPromotionUncheckedUpdateInput>
    /**
     * Choose, which AIModelPromotion to update.
     */
    where: AIModelPromotionWhereUniqueInput
  }

  /**
   * AIModelPromotion updateMany
   */
  export type AIModelPromotionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIModelPromotions.
     */
    data: XOR<AIModelPromotionUpdateManyMutationInput, AIModelPromotionUncheckedUpdateManyInput>
    /**
     * Filter which AIModelPromotions to update
     */
    where?: AIModelPromotionWhereInput
    /**
     * Limit how many AIModelPromotions to update.
     */
    limit?: number
  }

  /**
   * AIModelPromotion updateManyAndReturn
   */
  export type AIModelPromotionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * The data used to update AIModelPromotions.
     */
    data: XOR<AIModelPromotionUpdateManyMutationInput, AIModelPromotionUncheckedUpdateManyInput>
    /**
     * Filter which AIModelPromotions to update
     */
    where?: AIModelPromotionWhereInput
    /**
     * Limit how many AIModelPromotions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIModelPromotion upsert
   */
  export type AIModelPromotionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * The filter to search for the AIModelPromotion to update in case it exists.
     */
    where: AIModelPromotionWhereUniqueInput
    /**
     * In case the AIModelPromotion found by the `where` argument doesn't exist, create a new AIModelPromotion with this data.
     */
    create: XOR<AIModelPromotionCreateInput, AIModelPromotionUncheckedCreateInput>
    /**
     * In case the AIModelPromotion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIModelPromotionUpdateInput, AIModelPromotionUncheckedUpdateInput>
  }

  /**
   * AIModelPromotion delete
   */
  export type AIModelPromotionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    /**
     * Filter which AIModelPromotion to delete.
     */
    where: AIModelPromotionWhereUniqueInput
  }

  /**
   * AIModelPromotion deleteMany
   */
  export type AIModelPromotionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIModelPromotions to delete
     */
    where?: AIModelPromotionWhereInput
    /**
     * Limit how many AIModelPromotions to delete.
     */
    limit?: number
  }

  /**
   * AIModelPromotion without action
   */
  export type AIModelPromotionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
  }


  /**
   * Model AITrainingExperiment
   */

  export type AggregateAITrainingExperiment = {
    _count: AITrainingExperimentCountAggregateOutputType | null
    _min: AITrainingExperimentMinAggregateOutputType | null
    _max: AITrainingExperimentMaxAggregateOutputType | null
  }

  export type AITrainingExperimentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    trainingJobId: string | null
    experimentName: string | null
    status: $Enums.AITrainingExperimentStatus | null
    label: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdByUserId: string | null
  }

  export type AITrainingExperimentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    trainingJobId: string | null
    experimentName: string | null
    status: $Enums.AITrainingExperimentStatus | null
    label: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdByUserId: string | null
  }

  export type AITrainingExperimentCountAggregateOutputType = {
    id: number
    tenantId: number
    trainingJobId: number
    experimentName: number
    hyperparameters: number
    metrics: number
    trainingCurve: number
    status: number
    label: number
    startedAt: number
    finishedAt: number
    createdByUserId: number
    _all: number
  }


  export type AITrainingExperimentMinAggregateInputType = {
    id?: true
    tenantId?: true
    trainingJobId?: true
    experimentName?: true
    status?: true
    label?: true
    startedAt?: true
    finishedAt?: true
    createdByUserId?: true
  }

  export type AITrainingExperimentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    trainingJobId?: true
    experimentName?: true
    status?: true
    label?: true
    startedAt?: true
    finishedAt?: true
    createdByUserId?: true
  }

  export type AITrainingExperimentCountAggregateInputType = {
    id?: true
    tenantId?: true
    trainingJobId?: true
    experimentName?: true
    hyperparameters?: true
    metrics?: true
    trainingCurve?: true
    status?: true
    label?: true
    startedAt?: true
    finishedAt?: true
    createdByUserId?: true
    _all?: true
  }

  export type AITrainingExperimentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITrainingExperiment to aggregate.
     */
    where?: AITrainingExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingExperiments to fetch.
     */
    orderBy?: AITrainingExperimentOrderByWithRelationInput | AITrainingExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AITrainingExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingExperiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingExperiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AITrainingExperiments
    **/
    _count?: true | AITrainingExperimentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AITrainingExperimentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AITrainingExperimentMaxAggregateInputType
  }

  export type GetAITrainingExperimentAggregateType<T extends AITrainingExperimentAggregateArgs> = {
        [P in keyof T & keyof AggregateAITrainingExperiment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAITrainingExperiment[P]>
      : GetScalarType<T[P], AggregateAITrainingExperiment[P]>
  }




  export type AITrainingExperimentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITrainingExperimentWhereInput
    orderBy?: AITrainingExperimentOrderByWithAggregationInput | AITrainingExperimentOrderByWithAggregationInput[]
    by: AITrainingExperimentScalarFieldEnum[] | AITrainingExperimentScalarFieldEnum
    having?: AITrainingExperimentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AITrainingExperimentCountAggregateInputType | true
    _min?: AITrainingExperimentMinAggregateInputType
    _max?: AITrainingExperimentMaxAggregateInputType
  }

  export type AITrainingExperimentGroupByOutputType = {
    id: string
    tenantId: string
    trainingJobId: string
    experimentName: string
    hyperparameters: JsonValue
    metrics: JsonValue
    trainingCurve: JsonValue
    status: $Enums.AITrainingExperimentStatus
    label: string | null
    startedAt: Date
    finishedAt: Date | null
    createdByUserId: string
    _count: AITrainingExperimentCountAggregateOutputType | null
    _min: AITrainingExperimentMinAggregateOutputType | null
    _max: AITrainingExperimentMaxAggregateOutputType | null
  }

  type GetAITrainingExperimentGroupByPayload<T extends AITrainingExperimentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AITrainingExperimentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AITrainingExperimentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AITrainingExperimentGroupByOutputType[P]>
            : GetScalarType<T[P], AITrainingExperimentGroupByOutputType[P]>
        }
      >
    >


  export type AITrainingExperimentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trainingJobId?: boolean
    experimentName?: boolean
    hyperparameters?: boolean
    metrics?: boolean
    trainingCurve?: boolean
    status?: boolean
    label?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdByUserId?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    checkpoints?: boolean | AITrainingExperiment$checkpointsArgs<ExtArgs>
    _count?: boolean | AITrainingExperimentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITrainingExperiment"]>

  export type AITrainingExperimentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trainingJobId?: boolean
    experimentName?: boolean
    hyperparameters?: boolean
    metrics?: boolean
    trainingCurve?: boolean
    status?: boolean
    label?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdByUserId?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITrainingExperiment"]>

  export type AITrainingExperimentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trainingJobId?: boolean
    experimentName?: boolean
    hyperparameters?: boolean
    metrics?: boolean
    trainingCurve?: boolean
    status?: boolean
    label?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdByUserId?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITrainingExperiment"]>

  export type AITrainingExperimentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    trainingJobId?: boolean
    experimentName?: boolean
    hyperparameters?: boolean
    metrics?: boolean
    trainingCurve?: boolean
    status?: boolean
    label?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdByUserId?: boolean
  }

  export type AITrainingExperimentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "trainingJobId" | "experimentName" | "hyperparameters" | "metrics" | "trainingCurve" | "status" | "label" | "startedAt" | "finishedAt" | "createdByUserId", ExtArgs["result"]["aITrainingExperiment"]>
  export type AITrainingExperimentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    checkpoints?: boolean | AITrainingExperiment$checkpointsArgs<ExtArgs>
    _count?: boolean | AITrainingExperimentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AITrainingExperimentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
  }
  export type AITrainingExperimentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
  }

  export type $AITrainingExperimentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AITrainingExperiment"
    objects: {
      trainingJob: Prisma.$AITrainingJobPayload<ExtArgs>
      checkpoints: Prisma.$AITrainingCheckpointPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      trainingJobId: string
      experimentName: string
      hyperparameters: Prisma.JsonValue
      metrics: Prisma.JsonValue
      trainingCurve: Prisma.JsonValue
      status: $Enums.AITrainingExperimentStatus
      label: string | null
      startedAt: Date
      finishedAt: Date | null
      createdByUserId: string
    }, ExtArgs["result"]["aITrainingExperiment"]>
    composites: {}
  }

  type AITrainingExperimentGetPayload<S extends boolean | null | undefined | AITrainingExperimentDefaultArgs> = $Result.GetResult<Prisma.$AITrainingExperimentPayload, S>

  type AITrainingExperimentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AITrainingExperimentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AITrainingExperimentCountAggregateInputType | true
    }

  export interface AITrainingExperimentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AITrainingExperiment'], meta: { name: 'AITrainingExperiment' } }
    /**
     * Find zero or one AITrainingExperiment that matches the filter.
     * @param {AITrainingExperimentFindUniqueArgs} args - Arguments to find a AITrainingExperiment
     * @example
     * // Get one AITrainingExperiment
     * const aITrainingExperiment = await prisma.aITrainingExperiment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AITrainingExperimentFindUniqueArgs>(args: SelectSubset<T, AITrainingExperimentFindUniqueArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AITrainingExperiment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AITrainingExperimentFindUniqueOrThrowArgs} args - Arguments to find a AITrainingExperiment
     * @example
     * // Get one AITrainingExperiment
     * const aITrainingExperiment = await prisma.aITrainingExperiment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AITrainingExperimentFindUniqueOrThrowArgs>(args: SelectSubset<T, AITrainingExperimentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITrainingExperiment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingExperimentFindFirstArgs} args - Arguments to find a AITrainingExperiment
     * @example
     * // Get one AITrainingExperiment
     * const aITrainingExperiment = await prisma.aITrainingExperiment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AITrainingExperimentFindFirstArgs>(args?: SelectSubset<T, AITrainingExperimentFindFirstArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITrainingExperiment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingExperimentFindFirstOrThrowArgs} args - Arguments to find a AITrainingExperiment
     * @example
     * // Get one AITrainingExperiment
     * const aITrainingExperiment = await prisma.aITrainingExperiment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AITrainingExperimentFindFirstOrThrowArgs>(args?: SelectSubset<T, AITrainingExperimentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AITrainingExperiments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingExperimentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AITrainingExperiments
     * const aITrainingExperiments = await prisma.aITrainingExperiment.findMany()
     * 
     * // Get first 10 AITrainingExperiments
     * const aITrainingExperiments = await prisma.aITrainingExperiment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aITrainingExperimentWithIdOnly = await prisma.aITrainingExperiment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AITrainingExperimentFindManyArgs>(args?: SelectSubset<T, AITrainingExperimentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AITrainingExperiment.
     * @param {AITrainingExperimentCreateArgs} args - Arguments to create a AITrainingExperiment.
     * @example
     * // Create one AITrainingExperiment
     * const AITrainingExperiment = await prisma.aITrainingExperiment.create({
     *   data: {
     *     // ... data to create a AITrainingExperiment
     *   }
     * })
     * 
     */
    create<T extends AITrainingExperimentCreateArgs>(args: SelectSubset<T, AITrainingExperimentCreateArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AITrainingExperiments.
     * @param {AITrainingExperimentCreateManyArgs} args - Arguments to create many AITrainingExperiments.
     * @example
     * // Create many AITrainingExperiments
     * const aITrainingExperiment = await prisma.aITrainingExperiment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AITrainingExperimentCreateManyArgs>(args?: SelectSubset<T, AITrainingExperimentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AITrainingExperiments and returns the data saved in the database.
     * @param {AITrainingExperimentCreateManyAndReturnArgs} args - Arguments to create many AITrainingExperiments.
     * @example
     * // Create many AITrainingExperiments
     * const aITrainingExperiment = await prisma.aITrainingExperiment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AITrainingExperiments and only return the `id`
     * const aITrainingExperimentWithIdOnly = await prisma.aITrainingExperiment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AITrainingExperimentCreateManyAndReturnArgs>(args?: SelectSubset<T, AITrainingExperimentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AITrainingExperiment.
     * @param {AITrainingExperimentDeleteArgs} args - Arguments to delete one AITrainingExperiment.
     * @example
     * // Delete one AITrainingExperiment
     * const AITrainingExperiment = await prisma.aITrainingExperiment.delete({
     *   where: {
     *     // ... filter to delete one AITrainingExperiment
     *   }
     * })
     * 
     */
    delete<T extends AITrainingExperimentDeleteArgs>(args: SelectSubset<T, AITrainingExperimentDeleteArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AITrainingExperiment.
     * @param {AITrainingExperimentUpdateArgs} args - Arguments to update one AITrainingExperiment.
     * @example
     * // Update one AITrainingExperiment
     * const aITrainingExperiment = await prisma.aITrainingExperiment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AITrainingExperimentUpdateArgs>(args: SelectSubset<T, AITrainingExperimentUpdateArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AITrainingExperiments.
     * @param {AITrainingExperimentDeleteManyArgs} args - Arguments to filter AITrainingExperiments to delete.
     * @example
     * // Delete a few AITrainingExperiments
     * const { count } = await prisma.aITrainingExperiment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AITrainingExperimentDeleteManyArgs>(args?: SelectSubset<T, AITrainingExperimentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITrainingExperiments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingExperimentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AITrainingExperiments
     * const aITrainingExperiment = await prisma.aITrainingExperiment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AITrainingExperimentUpdateManyArgs>(args: SelectSubset<T, AITrainingExperimentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITrainingExperiments and returns the data updated in the database.
     * @param {AITrainingExperimentUpdateManyAndReturnArgs} args - Arguments to update many AITrainingExperiments.
     * @example
     * // Update many AITrainingExperiments
     * const aITrainingExperiment = await prisma.aITrainingExperiment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AITrainingExperiments and only return the `id`
     * const aITrainingExperimentWithIdOnly = await prisma.aITrainingExperiment.updateManyAndReturn({
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
    updateManyAndReturn<T extends AITrainingExperimentUpdateManyAndReturnArgs>(args: SelectSubset<T, AITrainingExperimentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AITrainingExperiment.
     * @param {AITrainingExperimentUpsertArgs} args - Arguments to update or create a AITrainingExperiment.
     * @example
     * // Update or create a AITrainingExperiment
     * const aITrainingExperiment = await prisma.aITrainingExperiment.upsert({
     *   create: {
     *     // ... data to create a AITrainingExperiment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AITrainingExperiment we want to update
     *   }
     * })
     */
    upsert<T extends AITrainingExperimentUpsertArgs>(args: SelectSubset<T, AITrainingExperimentUpsertArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AITrainingExperiments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingExperimentCountArgs} args - Arguments to filter AITrainingExperiments to count.
     * @example
     * // Count the number of AITrainingExperiments
     * const count = await prisma.aITrainingExperiment.count({
     *   where: {
     *     // ... the filter for the AITrainingExperiments we want to count
     *   }
     * })
    **/
    count<T extends AITrainingExperimentCountArgs>(
      args?: Subset<T, AITrainingExperimentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AITrainingExperimentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AITrainingExperiment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingExperimentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AITrainingExperimentAggregateArgs>(args: Subset<T, AITrainingExperimentAggregateArgs>): Prisma.PrismaPromise<GetAITrainingExperimentAggregateType<T>>

    /**
     * Group by AITrainingExperiment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingExperimentGroupByArgs} args - Group by arguments.
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
      T extends AITrainingExperimentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AITrainingExperimentGroupByArgs['orderBy'] }
        : { orderBy?: AITrainingExperimentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AITrainingExperimentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAITrainingExperimentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AITrainingExperiment model
   */
  readonly fields: AITrainingExperimentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AITrainingExperiment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AITrainingExperimentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingJob<T extends AITrainingJobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AITrainingJobDefaultArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    checkpoints<T extends AITrainingExperiment$checkpointsArgs<ExtArgs> = {}>(args?: Subset<T, AITrainingExperiment$checkpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the AITrainingExperiment model
   */
  interface AITrainingExperimentFieldRefs {
    readonly id: FieldRef<"AITrainingExperiment", 'String'>
    readonly tenantId: FieldRef<"AITrainingExperiment", 'String'>
    readonly trainingJobId: FieldRef<"AITrainingExperiment", 'String'>
    readonly experimentName: FieldRef<"AITrainingExperiment", 'String'>
    readonly hyperparameters: FieldRef<"AITrainingExperiment", 'Json'>
    readonly metrics: FieldRef<"AITrainingExperiment", 'Json'>
    readonly trainingCurve: FieldRef<"AITrainingExperiment", 'Json'>
    readonly status: FieldRef<"AITrainingExperiment", 'AITrainingExperimentStatus'>
    readonly label: FieldRef<"AITrainingExperiment", 'String'>
    readonly startedAt: FieldRef<"AITrainingExperiment", 'DateTime'>
    readonly finishedAt: FieldRef<"AITrainingExperiment", 'DateTime'>
    readonly createdByUserId: FieldRef<"AITrainingExperiment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AITrainingExperiment findUnique
   */
  export type AITrainingExperimentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingExperiment to fetch.
     */
    where: AITrainingExperimentWhereUniqueInput
  }

  /**
   * AITrainingExperiment findUniqueOrThrow
   */
  export type AITrainingExperimentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingExperiment to fetch.
     */
    where: AITrainingExperimentWhereUniqueInput
  }

  /**
   * AITrainingExperiment findFirst
   */
  export type AITrainingExperimentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingExperiment to fetch.
     */
    where?: AITrainingExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingExperiments to fetch.
     */
    orderBy?: AITrainingExperimentOrderByWithRelationInput | AITrainingExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITrainingExperiments.
     */
    cursor?: AITrainingExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingExperiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingExperiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITrainingExperiments.
     */
    distinct?: AITrainingExperimentScalarFieldEnum | AITrainingExperimentScalarFieldEnum[]
  }

  /**
   * AITrainingExperiment findFirstOrThrow
   */
  export type AITrainingExperimentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingExperiment to fetch.
     */
    where?: AITrainingExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingExperiments to fetch.
     */
    orderBy?: AITrainingExperimentOrderByWithRelationInput | AITrainingExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITrainingExperiments.
     */
    cursor?: AITrainingExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingExperiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingExperiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITrainingExperiments.
     */
    distinct?: AITrainingExperimentScalarFieldEnum | AITrainingExperimentScalarFieldEnum[]
  }

  /**
   * AITrainingExperiment findMany
   */
  export type AITrainingExperimentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingExperiments to fetch.
     */
    where?: AITrainingExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingExperiments to fetch.
     */
    orderBy?: AITrainingExperimentOrderByWithRelationInput | AITrainingExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AITrainingExperiments.
     */
    cursor?: AITrainingExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingExperiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingExperiments.
     */
    skip?: number
    distinct?: AITrainingExperimentScalarFieldEnum | AITrainingExperimentScalarFieldEnum[]
  }

  /**
   * AITrainingExperiment create
   */
  export type AITrainingExperimentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * The data needed to create a AITrainingExperiment.
     */
    data: XOR<AITrainingExperimentCreateInput, AITrainingExperimentUncheckedCreateInput>
  }

  /**
   * AITrainingExperiment createMany
   */
  export type AITrainingExperimentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AITrainingExperiments.
     */
    data: AITrainingExperimentCreateManyInput | AITrainingExperimentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AITrainingExperiment createManyAndReturn
   */
  export type AITrainingExperimentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * The data used to create many AITrainingExperiments.
     */
    data: AITrainingExperimentCreateManyInput | AITrainingExperimentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AITrainingExperiment update
   */
  export type AITrainingExperimentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * The data needed to update a AITrainingExperiment.
     */
    data: XOR<AITrainingExperimentUpdateInput, AITrainingExperimentUncheckedUpdateInput>
    /**
     * Choose, which AITrainingExperiment to update.
     */
    where: AITrainingExperimentWhereUniqueInput
  }

  /**
   * AITrainingExperiment updateMany
   */
  export type AITrainingExperimentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AITrainingExperiments.
     */
    data: XOR<AITrainingExperimentUpdateManyMutationInput, AITrainingExperimentUncheckedUpdateManyInput>
    /**
     * Filter which AITrainingExperiments to update
     */
    where?: AITrainingExperimentWhereInput
    /**
     * Limit how many AITrainingExperiments to update.
     */
    limit?: number
  }

  /**
   * AITrainingExperiment updateManyAndReturn
   */
  export type AITrainingExperimentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * The data used to update AITrainingExperiments.
     */
    data: XOR<AITrainingExperimentUpdateManyMutationInput, AITrainingExperimentUncheckedUpdateManyInput>
    /**
     * Filter which AITrainingExperiments to update
     */
    where?: AITrainingExperimentWhereInput
    /**
     * Limit how many AITrainingExperiments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AITrainingExperiment upsert
   */
  export type AITrainingExperimentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * The filter to search for the AITrainingExperiment to update in case it exists.
     */
    where: AITrainingExperimentWhereUniqueInput
    /**
     * In case the AITrainingExperiment found by the `where` argument doesn't exist, create a new AITrainingExperiment with this data.
     */
    create: XOR<AITrainingExperimentCreateInput, AITrainingExperimentUncheckedCreateInput>
    /**
     * In case the AITrainingExperiment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AITrainingExperimentUpdateInput, AITrainingExperimentUncheckedUpdateInput>
  }

  /**
   * AITrainingExperiment delete
   */
  export type AITrainingExperimentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    /**
     * Filter which AITrainingExperiment to delete.
     */
    where: AITrainingExperimentWhereUniqueInput
  }

  /**
   * AITrainingExperiment deleteMany
   */
  export type AITrainingExperimentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITrainingExperiments to delete
     */
    where?: AITrainingExperimentWhereInput
    /**
     * Limit how many AITrainingExperiments to delete.
     */
    limit?: number
  }

  /**
   * AITrainingExperiment.checkpoints
   */
  export type AITrainingExperiment$checkpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    where?: AITrainingCheckpointWhereInput
    orderBy?: AITrainingCheckpointOrderByWithRelationInput | AITrainingCheckpointOrderByWithRelationInput[]
    cursor?: AITrainingCheckpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AITrainingCheckpointScalarFieldEnum | AITrainingCheckpointScalarFieldEnum[]
  }

  /**
   * AITrainingExperiment without action
   */
  export type AITrainingExperimentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
  }


  /**
   * Model AITrainingCheckpoint
   */

  export type AggregateAITrainingCheckpoint = {
    _count: AITrainingCheckpointCountAggregateOutputType | null
    _avg: AITrainingCheckpointAvgAggregateOutputType | null
    _sum: AITrainingCheckpointSumAggregateOutputType | null
    _min: AITrainingCheckpointMinAggregateOutputType | null
    _max: AITrainingCheckpointMaxAggregateOutputType | null
  }

  export type AITrainingCheckpointAvgAggregateOutputType = {
    checkpointNumber: number | null
  }

  export type AITrainingCheckpointSumAggregateOutputType = {
    checkpointNumber: number | null
  }

  export type AITrainingCheckpointMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    trainingJobId: string | null
    experimentId: string | null
    checkpointNumber: number | null
    fileLocation: string | null
    createdAt: Date | null
  }

  export type AITrainingCheckpointMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    trainingJobId: string | null
    experimentId: string | null
    checkpointNumber: number | null
    fileLocation: string | null
    createdAt: Date | null
  }

  export type AITrainingCheckpointCountAggregateOutputType = {
    id: number
    tenantId: number
    trainingJobId: number
    experimentId: number
    checkpointNumber: number
    fileLocation: number
    metricsSnapshot: number
    createdAt: number
    _all: number
  }


  export type AITrainingCheckpointAvgAggregateInputType = {
    checkpointNumber?: true
  }

  export type AITrainingCheckpointSumAggregateInputType = {
    checkpointNumber?: true
  }

  export type AITrainingCheckpointMinAggregateInputType = {
    id?: true
    tenantId?: true
    trainingJobId?: true
    experimentId?: true
    checkpointNumber?: true
    fileLocation?: true
    createdAt?: true
  }

  export type AITrainingCheckpointMaxAggregateInputType = {
    id?: true
    tenantId?: true
    trainingJobId?: true
    experimentId?: true
    checkpointNumber?: true
    fileLocation?: true
    createdAt?: true
  }

  export type AITrainingCheckpointCountAggregateInputType = {
    id?: true
    tenantId?: true
    trainingJobId?: true
    experimentId?: true
    checkpointNumber?: true
    fileLocation?: true
    metricsSnapshot?: true
    createdAt?: true
    _all?: true
  }

  export type AITrainingCheckpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITrainingCheckpoint to aggregate.
     */
    where?: AITrainingCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingCheckpoints to fetch.
     */
    orderBy?: AITrainingCheckpointOrderByWithRelationInput | AITrainingCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AITrainingCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AITrainingCheckpoints
    **/
    _count?: true | AITrainingCheckpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AITrainingCheckpointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AITrainingCheckpointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AITrainingCheckpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AITrainingCheckpointMaxAggregateInputType
  }

  export type GetAITrainingCheckpointAggregateType<T extends AITrainingCheckpointAggregateArgs> = {
        [P in keyof T & keyof AggregateAITrainingCheckpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAITrainingCheckpoint[P]>
      : GetScalarType<T[P], AggregateAITrainingCheckpoint[P]>
  }




  export type AITrainingCheckpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITrainingCheckpointWhereInput
    orderBy?: AITrainingCheckpointOrderByWithAggregationInput | AITrainingCheckpointOrderByWithAggregationInput[]
    by: AITrainingCheckpointScalarFieldEnum[] | AITrainingCheckpointScalarFieldEnum
    having?: AITrainingCheckpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AITrainingCheckpointCountAggregateInputType | true
    _avg?: AITrainingCheckpointAvgAggregateInputType
    _sum?: AITrainingCheckpointSumAggregateInputType
    _min?: AITrainingCheckpointMinAggregateInputType
    _max?: AITrainingCheckpointMaxAggregateInputType
  }

  export type AITrainingCheckpointGroupByOutputType = {
    id: string
    tenantId: string
    trainingJobId: string
    experimentId: string | null
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot: JsonValue
    createdAt: Date
    _count: AITrainingCheckpointCountAggregateOutputType | null
    _avg: AITrainingCheckpointAvgAggregateOutputType | null
    _sum: AITrainingCheckpointSumAggregateOutputType | null
    _min: AITrainingCheckpointMinAggregateOutputType | null
    _max: AITrainingCheckpointMaxAggregateOutputType | null
  }

  type GetAITrainingCheckpointGroupByPayload<T extends AITrainingCheckpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AITrainingCheckpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AITrainingCheckpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AITrainingCheckpointGroupByOutputType[P]>
            : GetScalarType<T[P], AITrainingCheckpointGroupByOutputType[P]>
        }
      >
    >


  export type AITrainingCheckpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trainingJobId?: boolean
    experimentId?: boolean
    checkpointNumber?: boolean
    fileLocation?: boolean
    metricsSnapshot?: boolean
    createdAt?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    experiment?: boolean | AITrainingCheckpoint$experimentArgs<ExtArgs>
  }, ExtArgs["result"]["aITrainingCheckpoint"]>

  export type AITrainingCheckpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trainingJobId?: boolean
    experimentId?: boolean
    checkpointNumber?: boolean
    fileLocation?: boolean
    metricsSnapshot?: boolean
    createdAt?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    experiment?: boolean | AITrainingCheckpoint$experimentArgs<ExtArgs>
  }, ExtArgs["result"]["aITrainingCheckpoint"]>

  export type AITrainingCheckpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    trainingJobId?: boolean
    experimentId?: boolean
    checkpointNumber?: boolean
    fileLocation?: boolean
    metricsSnapshot?: boolean
    createdAt?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    experiment?: boolean | AITrainingCheckpoint$experimentArgs<ExtArgs>
  }, ExtArgs["result"]["aITrainingCheckpoint"]>

  export type AITrainingCheckpointSelectScalar = {
    id?: boolean
    tenantId?: boolean
    trainingJobId?: boolean
    experimentId?: boolean
    checkpointNumber?: boolean
    fileLocation?: boolean
    metricsSnapshot?: boolean
    createdAt?: boolean
  }

  export type AITrainingCheckpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "trainingJobId" | "experimentId" | "checkpointNumber" | "fileLocation" | "metricsSnapshot" | "createdAt", ExtArgs["result"]["aITrainingCheckpoint"]>
  export type AITrainingCheckpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    experiment?: boolean | AITrainingCheckpoint$experimentArgs<ExtArgs>
  }
  export type AITrainingCheckpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    experiment?: boolean | AITrainingCheckpoint$experimentArgs<ExtArgs>
  }
  export type AITrainingCheckpointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    experiment?: boolean | AITrainingCheckpoint$experimentArgs<ExtArgs>
  }

  export type $AITrainingCheckpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AITrainingCheckpoint"
    objects: {
      trainingJob: Prisma.$AITrainingJobPayload<ExtArgs>
      experiment: Prisma.$AITrainingExperimentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      trainingJobId: string
      experimentId: string | null
      checkpointNumber: number
      fileLocation: string
      metricsSnapshot: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["aITrainingCheckpoint"]>
    composites: {}
  }

  type AITrainingCheckpointGetPayload<S extends boolean | null | undefined | AITrainingCheckpointDefaultArgs> = $Result.GetResult<Prisma.$AITrainingCheckpointPayload, S>

  type AITrainingCheckpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AITrainingCheckpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AITrainingCheckpointCountAggregateInputType | true
    }

  export interface AITrainingCheckpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AITrainingCheckpoint'], meta: { name: 'AITrainingCheckpoint' } }
    /**
     * Find zero or one AITrainingCheckpoint that matches the filter.
     * @param {AITrainingCheckpointFindUniqueArgs} args - Arguments to find a AITrainingCheckpoint
     * @example
     * // Get one AITrainingCheckpoint
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AITrainingCheckpointFindUniqueArgs>(args: SelectSubset<T, AITrainingCheckpointFindUniqueArgs<ExtArgs>>): Prisma__AITrainingCheckpointClient<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AITrainingCheckpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AITrainingCheckpointFindUniqueOrThrowArgs} args - Arguments to find a AITrainingCheckpoint
     * @example
     * // Get one AITrainingCheckpoint
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AITrainingCheckpointFindUniqueOrThrowArgs>(args: SelectSubset<T, AITrainingCheckpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AITrainingCheckpointClient<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITrainingCheckpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingCheckpointFindFirstArgs} args - Arguments to find a AITrainingCheckpoint
     * @example
     * // Get one AITrainingCheckpoint
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AITrainingCheckpointFindFirstArgs>(args?: SelectSubset<T, AITrainingCheckpointFindFirstArgs<ExtArgs>>): Prisma__AITrainingCheckpointClient<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITrainingCheckpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingCheckpointFindFirstOrThrowArgs} args - Arguments to find a AITrainingCheckpoint
     * @example
     * // Get one AITrainingCheckpoint
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AITrainingCheckpointFindFirstOrThrowArgs>(args?: SelectSubset<T, AITrainingCheckpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__AITrainingCheckpointClient<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AITrainingCheckpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingCheckpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AITrainingCheckpoints
     * const aITrainingCheckpoints = await prisma.aITrainingCheckpoint.findMany()
     * 
     * // Get first 10 AITrainingCheckpoints
     * const aITrainingCheckpoints = await prisma.aITrainingCheckpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aITrainingCheckpointWithIdOnly = await prisma.aITrainingCheckpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AITrainingCheckpointFindManyArgs>(args?: SelectSubset<T, AITrainingCheckpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AITrainingCheckpoint.
     * @param {AITrainingCheckpointCreateArgs} args - Arguments to create a AITrainingCheckpoint.
     * @example
     * // Create one AITrainingCheckpoint
     * const AITrainingCheckpoint = await prisma.aITrainingCheckpoint.create({
     *   data: {
     *     // ... data to create a AITrainingCheckpoint
     *   }
     * })
     * 
     */
    create<T extends AITrainingCheckpointCreateArgs>(args: SelectSubset<T, AITrainingCheckpointCreateArgs<ExtArgs>>): Prisma__AITrainingCheckpointClient<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AITrainingCheckpoints.
     * @param {AITrainingCheckpointCreateManyArgs} args - Arguments to create many AITrainingCheckpoints.
     * @example
     * // Create many AITrainingCheckpoints
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AITrainingCheckpointCreateManyArgs>(args?: SelectSubset<T, AITrainingCheckpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AITrainingCheckpoints and returns the data saved in the database.
     * @param {AITrainingCheckpointCreateManyAndReturnArgs} args - Arguments to create many AITrainingCheckpoints.
     * @example
     * // Create many AITrainingCheckpoints
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AITrainingCheckpoints and only return the `id`
     * const aITrainingCheckpointWithIdOnly = await prisma.aITrainingCheckpoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AITrainingCheckpointCreateManyAndReturnArgs>(args?: SelectSubset<T, AITrainingCheckpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AITrainingCheckpoint.
     * @param {AITrainingCheckpointDeleteArgs} args - Arguments to delete one AITrainingCheckpoint.
     * @example
     * // Delete one AITrainingCheckpoint
     * const AITrainingCheckpoint = await prisma.aITrainingCheckpoint.delete({
     *   where: {
     *     // ... filter to delete one AITrainingCheckpoint
     *   }
     * })
     * 
     */
    delete<T extends AITrainingCheckpointDeleteArgs>(args: SelectSubset<T, AITrainingCheckpointDeleteArgs<ExtArgs>>): Prisma__AITrainingCheckpointClient<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AITrainingCheckpoint.
     * @param {AITrainingCheckpointUpdateArgs} args - Arguments to update one AITrainingCheckpoint.
     * @example
     * // Update one AITrainingCheckpoint
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AITrainingCheckpointUpdateArgs>(args: SelectSubset<T, AITrainingCheckpointUpdateArgs<ExtArgs>>): Prisma__AITrainingCheckpointClient<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AITrainingCheckpoints.
     * @param {AITrainingCheckpointDeleteManyArgs} args - Arguments to filter AITrainingCheckpoints to delete.
     * @example
     * // Delete a few AITrainingCheckpoints
     * const { count } = await prisma.aITrainingCheckpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AITrainingCheckpointDeleteManyArgs>(args?: SelectSubset<T, AITrainingCheckpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITrainingCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingCheckpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AITrainingCheckpoints
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AITrainingCheckpointUpdateManyArgs>(args: SelectSubset<T, AITrainingCheckpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITrainingCheckpoints and returns the data updated in the database.
     * @param {AITrainingCheckpointUpdateManyAndReturnArgs} args - Arguments to update many AITrainingCheckpoints.
     * @example
     * // Update many AITrainingCheckpoints
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AITrainingCheckpoints and only return the `id`
     * const aITrainingCheckpointWithIdOnly = await prisma.aITrainingCheckpoint.updateManyAndReturn({
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
    updateManyAndReturn<T extends AITrainingCheckpointUpdateManyAndReturnArgs>(args: SelectSubset<T, AITrainingCheckpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AITrainingCheckpoint.
     * @param {AITrainingCheckpointUpsertArgs} args - Arguments to update or create a AITrainingCheckpoint.
     * @example
     * // Update or create a AITrainingCheckpoint
     * const aITrainingCheckpoint = await prisma.aITrainingCheckpoint.upsert({
     *   create: {
     *     // ... data to create a AITrainingCheckpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AITrainingCheckpoint we want to update
     *   }
     * })
     */
    upsert<T extends AITrainingCheckpointUpsertArgs>(args: SelectSubset<T, AITrainingCheckpointUpsertArgs<ExtArgs>>): Prisma__AITrainingCheckpointClient<$Result.GetResult<Prisma.$AITrainingCheckpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AITrainingCheckpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingCheckpointCountArgs} args - Arguments to filter AITrainingCheckpoints to count.
     * @example
     * // Count the number of AITrainingCheckpoints
     * const count = await prisma.aITrainingCheckpoint.count({
     *   where: {
     *     // ... the filter for the AITrainingCheckpoints we want to count
     *   }
     * })
    **/
    count<T extends AITrainingCheckpointCountArgs>(
      args?: Subset<T, AITrainingCheckpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AITrainingCheckpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AITrainingCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingCheckpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AITrainingCheckpointAggregateArgs>(args: Subset<T, AITrainingCheckpointAggregateArgs>): Prisma.PrismaPromise<GetAITrainingCheckpointAggregateType<T>>

    /**
     * Group by AITrainingCheckpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITrainingCheckpointGroupByArgs} args - Group by arguments.
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
      T extends AITrainingCheckpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AITrainingCheckpointGroupByArgs['orderBy'] }
        : { orderBy?: AITrainingCheckpointGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AITrainingCheckpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAITrainingCheckpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AITrainingCheckpoint model
   */
  readonly fields: AITrainingCheckpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AITrainingCheckpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AITrainingCheckpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingJob<T extends AITrainingJobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AITrainingJobDefaultArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    experiment<T extends AITrainingCheckpoint$experimentArgs<ExtArgs> = {}>(args?: Subset<T, AITrainingCheckpoint$experimentArgs<ExtArgs>>): Prisma__AITrainingExperimentClient<$Result.GetResult<Prisma.$AITrainingExperimentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AITrainingCheckpoint model
   */
  interface AITrainingCheckpointFieldRefs {
    readonly id: FieldRef<"AITrainingCheckpoint", 'String'>
    readonly tenantId: FieldRef<"AITrainingCheckpoint", 'String'>
    readonly trainingJobId: FieldRef<"AITrainingCheckpoint", 'String'>
    readonly experimentId: FieldRef<"AITrainingCheckpoint", 'String'>
    readonly checkpointNumber: FieldRef<"AITrainingCheckpoint", 'Int'>
    readonly fileLocation: FieldRef<"AITrainingCheckpoint", 'String'>
    readonly metricsSnapshot: FieldRef<"AITrainingCheckpoint", 'Json'>
    readonly createdAt: FieldRef<"AITrainingCheckpoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AITrainingCheckpoint findUnique
   */
  export type AITrainingCheckpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingCheckpoint to fetch.
     */
    where: AITrainingCheckpointWhereUniqueInput
  }

  /**
   * AITrainingCheckpoint findUniqueOrThrow
   */
  export type AITrainingCheckpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingCheckpoint to fetch.
     */
    where: AITrainingCheckpointWhereUniqueInput
  }

  /**
   * AITrainingCheckpoint findFirst
   */
  export type AITrainingCheckpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingCheckpoint to fetch.
     */
    where?: AITrainingCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingCheckpoints to fetch.
     */
    orderBy?: AITrainingCheckpointOrderByWithRelationInput | AITrainingCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITrainingCheckpoints.
     */
    cursor?: AITrainingCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITrainingCheckpoints.
     */
    distinct?: AITrainingCheckpointScalarFieldEnum | AITrainingCheckpointScalarFieldEnum[]
  }

  /**
   * AITrainingCheckpoint findFirstOrThrow
   */
  export type AITrainingCheckpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingCheckpoint to fetch.
     */
    where?: AITrainingCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingCheckpoints to fetch.
     */
    orderBy?: AITrainingCheckpointOrderByWithRelationInput | AITrainingCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITrainingCheckpoints.
     */
    cursor?: AITrainingCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingCheckpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITrainingCheckpoints.
     */
    distinct?: AITrainingCheckpointScalarFieldEnum | AITrainingCheckpointScalarFieldEnum[]
  }

  /**
   * AITrainingCheckpoint findMany
   */
  export type AITrainingCheckpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * Filter, which AITrainingCheckpoints to fetch.
     */
    where?: AITrainingCheckpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITrainingCheckpoints to fetch.
     */
    orderBy?: AITrainingCheckpointOrderByWithRelationInput | AITrainingCheckpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AITrainingCheckpoints.
     */
    cursor?: AITrainingCheckpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITrainingCheckpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITrainingCheckpoints.
     */
    skip?: number
    distinct?: AITrainingCheckpointScalarFieldEnum | AITrainingCheckpointScalarFieldEnum[]
  }

  /**
   * AITrainingCheckpoint create
   */
  export type AITrainingCheckpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * The data needed to create a AITrainingCheckpoint.
     */
    data: XOR<AITrainingCheckpointCreateInput, AITrainingCheckpointUncheckedCreateInput>
  }

  /**
   * AITrainingCheckpoint createMany
   */
  export type AITrainingCheckpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AITrainingCheckpoints.
     */
    data: AITrainingCheckpointCreateManyInput | AITrainingCheckpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AITrainingCheckpoint createManyAndReturn
   */
  export type AITrainingCheckpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * The data used to create many AITrainingCheckpoints.
     */
    data: AITrainingCheckpointCreateManyInput | AITrainingCheckpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AITrainingCheckpoint update
   */
  export type AITrainingCheckpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * The data needed to update a AITrainingCheckpoint.
     */
    data: XOR<AITrainingCheckpointUpdateInput, AITrainingCheckpointUncheckedUpdateInput>
    /**
     * Choose, which AITrainingCheckpoint to update.
     */
    where: AITrainingCheckpointWhereUniqueInput
  }

  /**
   * AITrainingCheckpoint updateMany
   */
  export type AITrainingCheckpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AITrainingCheckpoints.
     */
    data: XOR<AITrainingCheckpointUpdateManyMutationInput, AITrainingCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which AITrainingCheckpoints to update
     */
    where?: AITrainingCheckpointWhereInput
    /**
     * Limit how many AITrainingCheckpoints to update.
     */
    limit?: number
  }

  /**
   * AITrainingCheckpoint updateManyAndReturn
   */
  export type AITrainingCheckpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * The data used to update AITrainingCheckpoints.
     */
    data: XOR<AITrainingCheckpointUpdateManyMutationInput, AITrainingCheckpointUncheckedUpdateManyInput>
    /**
     * Filter which AITrainingCheckpoints to update
     */
    where?: AITrainingCheckpointWhereInput
    /**
     * Limit how many AITrainingCheckpoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AITrainingCheckpoint upsert
   */
  export type AITrainingCheckpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * The filter to search for the AITrainingCheckpoint to update in case it exists.
     */
    where: AITrainingCheckpointWhereUniqueInput
    /**
     * In case the AITrainingCheckpoint found by the `where` argument doesn't exist, create a new AITrainingCheckpoint with this data.
     */
    create: XOR<AITrainingCheckpointCreateInput, AITrainingCheckpointUncheckedCreateInput>
    /**
     * In case the AITrainingCheckpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AITrainingCheckpointUpdateInput, AITrainingCheckpointUncheckedUpdateInput>
  }

  /**
   * AITrainingCheckpoint delete
   */
  export type AITrainingCheckpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
    /**
     * Filter which AITrainingCheckpoint to delete.
     */
    where: AITrainingCheckpointWhereUniqueInput
  }

  /**
   * AITrainingCheckpoint deleteMany
   */
  export type AITrainingCheckpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITrainingCheckpoints to delete
     */
    where?: AITrainingCheckpointWhereInput
    /**
     * Limit how many AITrainingCheckpoints to delete.
     */
    limit?: number
  }

  /**
   * AITrainingCheckpoint.experiment
   */
  export type AITrainingCheckpoint$experimentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingExperiment
     */
    select?: AITrainingExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingExperiment
     */
    omit?: AITrainingExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingExperimentInclude<ExtArgs> | null
    where?: AITrainingExperimentWhereInput
  }

  /**
   * AITrainingCheckpoint without action
   */
  export type AITrainingCheckpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITrainingCheckpoint
     */
    select?: AITrainingCheckpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITrainingCheckpoint
     */
    omit?: AITrainingCheckpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AITrainingCheckpointInclude<ExtArgs> | null
  }


  /**
   * Model AIModelRegistry
   */

  export type AggregateAIModelRegistry = {
    _count: AIModelRegistryCountAggregateOutputType | null
    _min: AIModelRegistryMinAggregateOutputType | null
    _max: AIModelRegistryMaxAggregateOutputType | null
  }

  export type AIModelRegistryMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelName: string | null
    version: string | null
    baseModel: string | null
    trainingJobId: string | null
    trainingProvider: $Enums.AITrainingProvider | null
    fileLocation: string | null
    status: $Enums.AIModelRegistryStatus | null
    createdAt: Date | null
  }

  export type AIModelRegistryMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelName: string | null
    version: string | null
    baseModel: string | null
    trainingJobId: string | null
    trainingProvider: $Enums.AITrainingProvider | null
    fileLocation: string | null
    status: $Enums.AIModelRegistryStatus | null
    createdAt: Date | null
  }

  export type AIModelRegistryCountAggregateOutputType = {
    id: number
    tenantId: number
    modelName: number
    version: number
    baseModel: number
    trainingJobId: number
    trainingProvider: number
    fileLocation: number
    metadata: number
    status: number
    createdAt: number
    _all: number
  }


  export type AIModelRegistryMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelName?: true
    version?: true
    baseModel?: true
    trainingJobId?: true
    trainingProvider?: true
    fileLocation?: true
    status?: true
    createdAt?: true
  }

  export type AIModelRegistryMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelName?: true
    version?: true
    baseModel?: true
    trainingJobId?: true
    trainingProvider?: true
    fileLocation?: true
    status?: true
    createdAt?: true
  }

  export type AIModelRegistryCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelName?: true
    version?: true
    baseModel?: true
    trainingJobId?: true
    trainingProvider?: true
    fileLocation?: true
    metadata?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type AIModelRegistryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIModelRegistry to aggregate.
     */
    where?: AIModelRegistryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelRegistries to fetch.
     */
    orderBy?: AIModelRegistryOrderByWithRelationInput | AIModelRegistryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIModelRegistryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelRegistries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelRegistries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIModelRegistries
    **/
    _count?: true | AIModelRegistryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIModelRegistryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIModelRegistryMaxAggregateInputType
  }

  export type GetAIModelRegistryAggregateType<T extends AIModelRegistryAggregateArgs> = {
        [P in keyof T & keyof AggregateAIModelRegistry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIModelRegistry[P]>
      : GetScalarType<T[P], AggregateAIModelRegistry[P]>
  }




  export type AIModelRegistryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIModelRegistryWhereInput
    orderBy?: AIModelRegistryOrderByWithAggregationInput | AIModelRegistryOrderByWithAggregationInput[]
    by: AIModelRegistryScalarFieldEnum[] | AIModelRegistryScalarFieldEnum
    having?: AIModelRegistryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIModelRegistryCountAggregateInputType | true
    _min?: AIModelRegistryMinAggregateInputType
    _max?: AIModelRegistryMaxAggregateInputType
  }

  export type AIModelRegistryGroupByOutputType = {
    id: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingJobId: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata: JsonValue
    status: $Enums.AIModelRegistryStatus
    createdAt: Date
    _count: AIModelRegistryCountAggregateOutputType | null
    _min: AIModelRegistryMinAggregateOutputType | null
    _max: AIModelRegistryMaxAggregateOutputType | null
  }

  type GetAIModelRegistryGroupByPayload<T extends AIModelRegistryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIModelRegistryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIModelRegistryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIModelRegistryGroupByOutputType[P]>
            : GetScalarType<T[P], AIModelRegistryGroupByOutputType[P]>
        }
      >
    >


  export type AIModelRegistrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelName?: boolean
    version?: boolean
    baseModel?: boolean
    trainingJobId?: boolean
    trainingProvider?: boolean
    fileLocation?: boolean
    metadata?: boolean
    status?: boolean
    createdAt?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    evaluations?: boolean | AIModelRegistry$evaluationsArgs<ExtArgs>
    promotion?: boolean | AIModelRegistry$promotionArgs<ExtArgs>
    _count?: boolean | AIModelRegistryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelRegistry"]>

  export type AIModelRegistrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelName?: boolean
    version?: boolean
    baseModel?: boolean
    trainingJobId?: boolean
    trainingProvider?: boolean
    fileLocation?: boolean
    metadata?: boolean
    status?: boolean
    createdAt?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelRegistry"]>

  export type AIModelRegistrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelName?: boolean
    version?: boolean
    baseModel?: boolean
    trainingJobId?: boolean
    trainingProvider?: boolean
    fileLocation?: boolean
    metadata?: boolean
    status?: boolean
    createdAt?: boolean
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIModelRegistry"]>

  export type AIModelRegistrySelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelName?: boolean
    version?: boolean
    baseModel?: boolean
    trainingJobId?: boolean
    trainingProvider?: boolean
    fileLocation?: boolean
    metadata?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type AIModelRegistryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelName" | "version" | "baseModel" | "trainingJobId" | "trainingProvider" | "fileLocation" | "metadata" | "status" | "createdAt", ExtArgs["result"]["aIModelRegistry"]>
  export type AIModelRegistryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
    evaluations?: boolean | AIModelRegistry$evaluationsArgs<ExtArgs>
    promotion?: boolean | AIModelRegistry$promotionArgs<ExtArgs>
    _count?: boolean | AIModelRegistryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AIModelRegistryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
  }
  export type AIModelRegistryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingJob?: boolean | AITrainingJobDefaultArgs<ExtArgs>
  }

  export type $AIModelRegistryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIModelRegistry"
    objects: {
      trainingJob: Prisma.$AITrainingJobPayload<ExtArgs>
      evaluations: Prisma.$AIModelEvaluationPayload<ExtArgs>[]
      promotion: Prisma.$AIModelPromotionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelName: string
      version: string
      baseModel: string
      trainingJobId: string
      trainingProvider: $Enums.AITrainingProvider
      fileLocation: string
      metadata: Prisma.JsonValue
      status: $Enums.AIModelRegistryStatus
      createdAt: Date
    }, ExtArgs["result"]["aIModelRegistry"]>
    composites: {}
  }

  type AIModelRegistryGetPayload<S extends boolean | null | undefined | AIModelRegistryDefaultArgs> = $Result.GetResult<Prisma.$AIModelRegistryPayload, S>

  type AIModelRegistryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIModelRegistryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIModelRegistryCountAggregateInputType | true
    }

  export interface AIModelRegistryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIModelRegistry'], meta: { name: 'AIModelRegistry' } }
    /**
     * Find zero or one AIModelRegistry that matches the filter.
     * @param {AIModelRegistryFindUniqueArgs} args - Arguments to find a AIModelRegistry
     * @example
     * // Get one AIModelRegistry
     * const aIModelRegistry = await prisma.aIModelRegistry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIModelRegistryFindUniqueArgs>(args: SelectSubset<T, AIModelRegistryFindUniqueArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIModelRegistry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIModelRegistryFindUniqueOrThrowArgs} args - Arguments to find a AIModelRegistry
     * @example
     * // Get one AIModelRegistry
     * const aIModelRegistry = await prisma.aIModelRegistry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIModelRegistryFindUniqueOrThrowArgs>(args: SelectSubset<T, AIModelRegistryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIModelRegistry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelRegistryFindFirstArgs} args - Arguments to find a AIModelRegistry
     * @example
     * // Get one AIModelRegistry
     * const aIModelRegistry = await prisma.aIModelRegistry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIModelRegistryFindFirstArgs>(args?: SelectSubset<T, AIModelRegistryFindFirstArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIModelRegistry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelRegistryFindFirstOrThrowArgs} args - Arguments to find a AIModelRegistry
     * @example
     * // Get one AIModelRegistry
     * const aIModelRegistry = await prisma.aIModelRegistry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIModelRegistryFindFirstOrThrowArgs>(args?: SelectSubset<T, AIModelRegistryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIModelRegistries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelRegistryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIModelRegistries
     * const aIModelRegistries = await prisma.aIModelRegistry.findMany()
     * 
     * // Get first 10 AIModelRegistries
     * const aIModelRegistries = await prisma.aIModelRegistry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIModelRegistryWithIdOnly = await prisma.aIModelRegistry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIModelRegistryFindManyArgs>(args?: SelectSubset<T, AIModelRegistryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIModelRegistry.
     * @param {AIModelRegistryCreateArgs} args - Arguments to create a AIModelRegistry.
     * @example
     * // Create one AIModelRegistry
     * const AIModelRegistry = await prisma.aIModelRegistry.create({
     *   data: {
     *     // ... data to create a AIModelRegistry
     *   }
     * })
     * 
     */
    create<T extends AIModelRegistryCreateArgs>(args: SelectSubset<T, AIModelRegistryCreateArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIModelRegistries.
     * @param {AIModelRegistryCreateManyArgs} args - Arguments to create many AIModelRegistries.
     * @example
     * // Create many AIModelRegistries
     * const aIModelRegistry = await prisma.aIModelRegistry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIModelRegistryCreateManyArgs>(args?: SelectSubset<T, AIModelRegistryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIModelRegistries and returns the data saved in the database.
     * @param {AIModelRegistryCreateManyAndReturnArgs} args - Arguments to create many AIModelRegistries.
     * @example
     * // Create many AIModelRegistries
     * const aIModelRegistry = await prisma.aIModelRegistry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIModelRegistries and only return the `id`
     * const aIModelRegistryWithIdOnly = await prisma.aIModelRegistry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIModelRegistryCreateManyAndReturnArgs>(args?: SelectSubset<T, AIModelRegistryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIModelRegistry.
     * @param {AIModelRegistryDeleteArgs} args - Arguments to delete one AIModelRegistry.
     * @example
     * // Delete one AIModelRegistry
     * const AIModelRegistry = await prisma.aIModelRegistry.delete({
     *   where: {
     *     // ... filter to delete one AIModelRegistry
     *   }
     * })
     * 
     */
    delete<T extends AIModelRegistryDeleteArgs>(args: SelectSubset<T, AIModelRegistryDeleteArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIModelRegistry.
     * @param {AIModelRegistryUpdateArgs} args - Arguments to update one AIModelRegistry.
     * @example
     * // Update one AIModelRegistry
     * const aIModelRegistry = await prisma.aIModelRegistry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIModelRegistryUpdateArgs>(args: SelectSubset<T, AIModelRegistryUpdateArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIModelRegistries.
     * @param {AIModelRegistryDeleteManyArgs} args - Arguments to filter AIModelRegistries to delete.
     * @example
     * // Delete a few AIModelRegistries
     * const { count } = await prisma.aIModelRegistry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIModelRegistryDeleteManyArgs>(args?: SelectSubset<T, AIModelRegistryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIModelRegistries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelRegistryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIModelRegistries
     * const aIModelRegistry = await prisma.aIModelRegistry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIModelRegistryUpdateManyArgs>(args: SelectSubset<T, AIModelRegistryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIModelRegistries and returns the data updated in the database.
     * @param {AIModelRegistryUpdateManyAndReturnArgs} args - Arguments to update many AIModelRegistries.
     * @example
     * // Update many AIModelRegistries
     * const aIModelRegistry = await prisma.aIModelRegistry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIModelRegistries and only return the `id`
     * const aIModelRegistryWithIdOnly = await prisma.aIModelRegistry.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIModelRegistryUpdateManyAndReturnArgs>(args: SelectSubset<T, AIModelRegistryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIModelRegistry.
     * @param {AIModelRegistryUpsertArgs} args - Arguments to update or create a AIModelRegistry.
     * @example
     * // Update or create a AIModelRegistry
     * const aIModelRegistry = await prisma.aIModelRegistry.upsert({
     *   create: {
     *     // ... data to create a AIModelRegistry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIModelRegistry we want to update
     *   }
     * })
     */
    upsert<T extends AIModelRegistryUpsertArgs>(args: SelectSubset<T, AIModelRegistryUpsertArgs<ExtArgs>>): Prisma__AIModelRegistryClient<$Result.GetResult<Prisma.$AIModelRegistryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIModelRegistries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelRegistryCountArgs} args - Arguments to filter AIModelRegistries to count.
     * @example
     * // Count the number of AIModelRegistries
     * const count = await prisma.aIModelRegistry.count({
     *   where: {
     *     // ... the filter for the AIModelRegistries we want to count
     *   }
     * })
    **/
    count<T extends AIModelRegistryCountArgs>(
      args?: Subset<T, AIModelRegistryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIModelRegistryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIModelRegistry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelRegistryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIModelRegistryAggregateArgs>(args: Subset<T, AIModelRegistryAggregateArgs>): Prisma.PrismaPromise<GetAIModelRegistryAggregateType<T>>

    /**
     * Group by AIModelRegistry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelRegistryGroupByArgs} args - Group by arguments.
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
      T extends AIModelRegistryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIModelRegistryGroupByArgs['orderBy'] }
        : { orderBy?: AIModelRegistryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIModelRegistryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIModelRegistryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIModelRegistry model
   */
  readonly fields: AIModelRegistryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIModelRegistry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIModelRegistryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingJob<T extends AITrainingJobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AITrainingJobDefaultArgs<ExtArgs>>): Prisma__AITrainingJobClient<$Result.GetResult<Prisma.$AITrainingJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    evaluations<T extends AIModelRegistry$evaluationsArgs<ExtArgs> = {}>(args?: Subset<T, AIModelRegistry$evaluationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelEvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    promotion<T extends AIModelRegistry$promotionArgs<ExtArgs> = {}>(args?: Subset<T, AIModelRegistry$promotionArgs<ExtArgs>>): Prisma__AIModelPromotionClient<$Result.GetResult<Prisma.$AIModelPromotionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AIModelRegistry model
   */
  interface AIModelRegistryFieldRefs {
    readonly id: FieldRef<"AIModelRegistry", 'String'>
    readonly tenantId: FieldRef<"AIModelRegistry", 'String'>
    readonly modelName: FieldRef<"AIModelRegistry", 'String'>
    readonly version: FieldRef<"AIModelRegistry", 'String'>
    readonly baseModel: FieldRef<"AIModelRegistry", 'String'>
    readonly trainingJobId: FieldRef<"AIModelRegistry", 'String'>
    readonly trainingProvider: FieldRef<"AIModelRegistry", 'AITrainingProvider'>
    readonly fileLocation: FieldRef<"AIModelRegistry", 'String'>
    readonly metadata: FieldRef<"AIModelRegistry", 'Json'>
    readonly status: FieldRef<"AIModelRegistry", 'AIModelRegistryStatus'>
    readonly createdAt: FieldRef<"AIModelRegistry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIModelRegistry findUnique
   */
  export type AIModelRegistryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * Filter, which AIModelRegistry to fetch.
     */
    where: AIModelRegistryWhereUniqueInput
  }

  /**
   * AIModelRegistry findUniqueOrThrow
   */
  export type AIModelRegistryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * Filter, which AIModelRegistry to fetch.
     */
    where: AIModelRegistryWhereUniqueInput
  }

  /**
   * AIModelRegistry findFirst
   */
  export type AIModelRegistryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * Filter, which AIModelRegistry to fetch.
     */
    where?: AIModelRegistryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelRegistries to fetch.
     */
    orderBy?: AIModelRegistryOrderByWithRelationInput | AIModelRegistryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIModelRegistries.
     */
    cursor?: AIModelRegistryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelRegistries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelRegistries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIModelRegistries.
     */
    distinct?: AIModelRegistryScalarFieldEnum | AIModelRegistryScalarFieldEnum[]
  }

  /**
   * AIModelRegistry findFirstOrThrow
   */
  export type AIModelRegistryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * Filter, which AIModelRegistry to fetch.
     */
    where?: AIModelRegistryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelRegistries to fetch.
     */
    orderBy?: AIModelRegistryOrderByWithRelationInput | AIModelRegistryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIModelRegistries.
     */
    cursor?: AIModelRegistryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelRegistries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelRegistries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIModelRegistries.
     */
    distinct?: AIModelRegistryScalarFieldEnum | AIModelRegistryScalarFieldEnum[]
  }

  /**
   * AIModelRegistry findMany
   */
  export type AIModelRegistryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * Filter, which AIModelRegistries to fetch.
     */
    where?: AIModelRegistryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelRegistries to fetch.
     */
    orderBy?: AIModelRegistryOrderByWithRelationInput | AIModelRegistryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIModelRegistries.
     */
    cursor?: AIModelRegistryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelRegistries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelRegistries.
     */
    skip?: number
    distinct?: AIModelRegistryScalarFieldEnum | AIModelRegistryScalarFieldEnum[]
  }

  /**
   * AIModelRegistry create
   */
  export type AIModelRegistryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * The data needed to create a AIModelRegistry.
     */
    data: XOR<AIModelRegistryCreateInput, AIModelRegistryUncheckedCreateInput>
  }

  /**
   * AIModelRegistry createMany
   */
  export type AIModelRegistryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIModelRegistries.
     */
    data: AIModelRegistryCreateManyInput | AIModelRegistryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIModelRegistry createManyAndReturn
   */
  export type AIModelRegistryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * The data used to create many AIModelRegistries.
     */
    data: AIModelRegistryCreateManyInput | AIModelRegistryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIModelRegistry update
   */
  export type AIModelRegistryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * The data needed to update a AIModelRegistry.
     */
    data: XOR<AIModelRegistryUpdateInput, AIModelRegistryUncheckedUpdateInput>
    /**
     * Choose, which AIModelRegistry to update.
     */
    where: AIModelRegistryWhereUniqueInput
  }

  /**
   * AIModelRegistry updateMany
   */
  export type AIModelRegistryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIModelRegistries.
     */
    data: XOR<AIModelRegistryUpdateManyMutationInput, AIModelRegistryUncheckedUpdateManyInput>
    /**
     * Filter which AIModelRegistries to update
     */
    where?: AIModelRegistryWhereInput
    /**
     * Limit how many AIModelRegistries to update.
     */
    limit?: number
  }

  /**
   * AIModelRegistry updateManyAndReturn
   */
  export type AIModelRegistryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * The data used to update AIModelRegistries.
     */
    data: XOR<AIModelRegistryUpdateManyMutationInput, AIModelRegistryUncheckedUpdateManyInput>
    /**
     * Filter which AIModelRegistries to update
     */
    where?: AIModelRegistryWhereInput
    /**
     * Limit how many AIModelRegistries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIModelRegistry upsert
   */
  export type AIModelRegistryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * The filter to search for the AIModelRegistry to update in case it exists.
     */
    where: AIModelRegistryWhereUniqueInput
    /**
     * In case the AIModelRegistry found by the `where` argument doesn't exist, create a new AIModelRegistry with this data.
     */
    create: XOR<AIModelRegistryCreateInput, AIModelRegistryUncheckedCreateInput>
    /**
     * In case the AIModelRegistry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIModelRegistryUpdateInput, AIModelRegistryUncheckedUpdateInput>
  }

  /**
   * AIModelRegistry delete
   */
  export type AIModelRegistryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
    /**
     * Filter which AIModelRegistry to delete.
     */
    where: AIModelRegistryWhereUniqueInput
  }

  /**
   * AIModelRegistry deleteMany
   */
  export type AIModelRegistryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIModelRegistries to delete
     */
    where?: AIModelRegistryWhereInput
    /**
     * Limit how many AIModelRegistries to delete.
     */
    limit?: number
  }

  /**
   * AIModelRegistry.evaluations
   */
  export type AIModelRegistry$evaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelEvaluation
     */
    select?: AIModelEvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelEvaluation
     */
    omit?: AIModelEvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelEvaluationInclude<ExtArgs> | null
    where?: AIModelEvaluationWhereInput
    orderBy?: AIModelEvaluationOrderByWithRelationInput | AIModelEvaluationOrderByWithRelationInput[]
    cursor?: AIModelEvaluationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIModelEvaluationScalarFieldEnum | AIModelEvaluationScalarFieldEnum[]
  }

  /**
   * AIModelRegistry.promotion
   */
  export type AIModelRegistry$promotionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelPromotion
     */
    select?: AIModelPromotionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelPromotion
     */
    omit?: AIModelPromotionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelPromotionInclude<ExtArgs> | null
    where?: AIModelPromotionWhereInput
  }

  /**
   * AIModelRegistry without action
   */
  export type AIModelRegistryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelRegistry
     */
    select?: AIModelRegistrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelRegistry
     */
    omit?: AIModelRegistryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIModelRegistryInclude<ExtArgs> | null
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


  export const AITrainingJobScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    datasetId: 'datasetId',
    datasetVersionId: 'datasetVersionId',
    modelType: 'modelType',
    baseModel: 'baseModel',
    trainingProvider: 'trainingProvider',
    status: 'status',
    hyperparameters: 'hyperparameters',
    trainingConfig: 'trainingConfig',
    logs: 'logs',
    metrics: 'metrics',
    providerJobId: 'providerJobId',
    trainingFileLocation: 'trainingFileLocation',
    outputModelId: 'outputModelId',
    resumeCheckpointId: 'resumeCheckpointId',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AITrainingJobScalarFieldEnum = (typeof AITrainingJobScalarFieldEnum)[keyof typeof AITrainingJobScalarFieldEnum]


  export const AIModelEvaluationScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    datasetId: 'datasetId',
    metrics: 'metrics',
    evaluationReport: 'evaluationReport',
    createdAt: 'createdAt'
  };

  export type AIModelEvaluationScalarFieldEnum = (typeof AIModelEvaluationScalarFieldEnum)[keyof typeof AIModelEvaluationScalarFieldEnum]


  export const AIModelPromotionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    stage: 'stage',
    rolloutPercentage: 'rolloutPercentage',
    canaryHistory: 'canaryHistory',
    promotedByUserId: 'promotedByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIModelPromotionScalarFieldEnum = (typeof AIModelPromotionScalarFieldEnum)[keyof typeof AIModelPromotionScalarFieldEnum]


  export const AITrainingExperimentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    trainingJobId: 'trainingJobId',
    experimentName: 'experimentName',
    hyperparameters: 'hyperparameters',
    metrics: 'metrics',
    trainingCurve: 'trainingCurve',
    status: 'status',
    label: 'label',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    createdByUserId: 'createdByUserId'
  };

  export type AITrainingExperimentScalarFieldEnum = (typeof AITrainingExperimentScalarFieldEnum)[keyof typeof AITrainingExperimentScalarFieldEnum]


  export const AITrainingCheckpointScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    trainingJobId: 'trainingJobId',
    experimentId: 'experimentId',
    checkpointNumber: 'checkpointNumber',
    fileLocation: 'fileLocation',
    metricsSnapshot: 'metricsSnapshot',
    createdAt: 'createdAt'
  };

  export type AITrainingCheckpointScalarFieldEnum = (typeof AITrainingCheckpointScalarFieldEnum)[keyof typeof AITrainingCheckpointScalarFieldEnum]


  export const AIModelRegistryScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelName: 'modelName',
    version: 'version',
    baseModel: 'baseModel',
    trainingJobId: 'trainingJobId',
    trainingProvider: 'trainingProvider',
    fileLocation: 'fileLocation',
    metadata: 'metadata',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type AIModelRegistryScalarFieldEnum = (typeof AIModelRegistryScalarFieldEnum)[keyof typeof AIModelRegistryScalarFieldEnum]


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
   * Reference to a field of type 'AITrainingModelType'
   */
  export type EnumAITrainingModelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AITrainingModelType'>
    


  /**
   * Reference to a field of type 'AITrainingModelType[]'
   */
  export type ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AITrainingModelType[]'>
    


  /**
   * Reference to a field of type 'AITrainingProvider'
   */
  export type EnumAITrainingProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AITrainingProvider'>
    


  /**
   * Reference to a field of type 'AITrainingProvider[]'
   */
  export type ListEnumAITrainingProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AITrainingProvider[]'>
    


  /**
   * Reference to a field of type 'AITrainingJobStatus'
   */
  export type EnumAITrainingJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AITrainingJobStatus'>
    


  /**
   * Reference to a field of type 'AITrainingJobStatus[]'
   */
  export type ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AITrainingJobStatus[]'>
    


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
   * Reference to a field of type 'AIModelPromotionStage'
   */
  export type EnumAIModelPromotionStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIModelPromotionStage'>
    


  /**
   * Reference to a field of type 'AIModelPromotionStage[]'
   */
  export type ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIModelPromotionStage[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AITrainingExperimentStatus'
   */
  export type EnumAITrainingExperimentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AITrainingExperimentStatus'>
    


  /**
   * Reference to a field of type 'AITrainingExperimentStatus[]'
   */
  export type ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AITrainingExperimentStatus[]'>
    


  /**
   * Reference to a field of type 'AIModelRegistryStatus'
   */
  export type EnumAIModelRegistryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIModelRegistryStatus'>
    


  /**
   * Reference to a field of type 'AIModelRegistryStatus[]'
   */
  export type ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIModelRegistryStatus[]'>
    


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


  export type AITrainingJobWhereInput = {
    AND?: AITrainingJobWhereInput | AITrainingJobWhereInput[]
    OR?: AITrainingJobWhereInput[]
    NOT?: AITrainingJobWhereInput | AITrainingJobWhereInput[]
    id?: StringFilter<"AITrainingJob"> | string
    tenantId?: StringFilter<"AITrainingJob"> | string
    datasetId?: StringFilter<"AITrainingJob"> | string
    datasetVersionId?: StringFilter<"AITrainingJob"> | string
    modelType?: EnumAITrainingModelTypeFilter<"AITrainingJob"> | $Enums.AITrainingModelType
    baseModel?: StringFilter<"AITrainingJob"> | string
    trainingProvider?: EnumAITrainingProviderFilter<"AITrainingJob"> | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFilter<"AITrainingJob"> | $Enums.AITrainingJobStatus
    hyperparameters?: JsonFilter<"AITrainingJob">
    trainingConfig?: JsonFilter<"AITrainingJob">
    logs?: JsonFilter<"AITrainingJob">
    metrics?: JsonFilter<"AITrainingJob">
    providerJobId?: StringNullableFilter<"AITrainingJob"> | string | null
    trainingFileLocation?: StringNullableFilter<"AITrainingJob"> | string | null
    outputModelId?: StringNullableFilter<"AITrainingJob"> | string | null
    resumeCheckpointId?: StringNullableFilter<"AITrainingJob"> | string | null
    createdByUserId?: StringFilter<"AITrainingJob"> | string
    createdAt?: DateTimeFilter<"AITrainingJob"> | Date | string
    updatedAt?: DateTimeFilter<"AITrainingJob"> | Date | string
    registryModels?: AIModelRegistryListRelationFilter
    experiments?: AITrainingExperimentListRelationFilter
    checkpoints?: AITrainingCheckpointListRelationFilter
  }

  export type AITrainingJobOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    datasetVersionId?: SortOrder
    modelType?: SortOrder
    baseModel?: SortOrder
    trainingProvider?: SortOrder
    status?: SortOrder
    hyperparameters?: SortOrder
    trainingConfig?: SortOrder
    logs?: SortOrder
    metrics?: SortOrder
    providerJobId?: SortOrderInput | SortOrder
    trainingFileLocation?: SortOrderInput | SortOrder
    outputModelId?: SortOrderInput | SortOrder
    resumeCheckpointId?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    registryModels?: AIModelRegistryOrderByRelationAggregateInput
    experiments?: AITrainingExperimentOrderByRelationAggregateInput
    checkpoints?: AITrainingCheckpointOrderByRelationAggregateInput
  }

  export type AITrainingJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AITrainingJobWhereInput | AITrainingJobWhereInput[]
    OR?: AITrainingJobWhereInput[]
    NOT?: AITrainingJobWhereInput | AITrainingJobWhereInput[]
    tenantId?: StringFilter<"AITrainingJob"> | string
    datasetId?: StringFilter<"AITrainingJob"> | string
    datasetVersionId?: StringFilter<"AITrainingJob"> | string
    modelType?: EnumAITrainingModelTypeFilter<"AITrainingJob"> | $Enums.AITrainingModelType
    baseModel?: StringFilter<"AITrainingJob"> | string
    trainingProvider?: EnumAITrainingProviderFilter<"AITrainingJob"> | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFilter<"AITrainingJob"> | $Enums.AITrainingJobStatus
    hyperparameters?: JsonFilter<"AITrainingJob">
    trainingConfig?: JsonFilter<"AITrainingJob">
    logs?: JsonFilter<"AITrainingJob">
    metrics?: JsonFilter<"AITrainingJob">
    providerJobId?: StringNullableFilter<"AITrainingJob"> | string | null
    trainingFileLocation?: StringNullableFilter<"AITrainingJob"> | string | null
    outputModelId?: StringNullableFilter<"AITrainingJob"> | string | null
    resumeCheckpointId?: StringNullableFilter<"AITrainingJob"> | string | null
    createdByUserId?: StringFilter<"AITrainingJob"> | string
    createdAt?: DateTimeFilter<"AITrainingJob"> | Date | string
    updatedAt?: DateTimeFilter<"AITrainingJob"> | Date | string
    registryModels?: AIModelRegistryListRelationFilter
    experiments?: AITrainingExperimentListRelationFilter
    checkpoints?: AITrainingCheckpointListRelationFilter
  }, "id">

  export type AITrainingJobOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    datasetVersionId?: SortOrder
    modelType?: SortOrder
    baseModel?: SortOrder
    trainingProvider?: SortOrder
    status?: SortOrder
    hyperparameters?: SortOrder
    trainingConfig?: SortOrder
    logs?: SortOrder
    metrics?: SortOrder
    providerJobId?: SortOrderInput | SortOrder
    trainingFileLocation?: SortOrderInput | SortOrder
    outputModelId?: SortOrderInput | SortOrder
    resumeCheckpointId?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AITrainingJobCountOrderByAggregateInput
    _max?: AITrainingJobMaxOrderByAggregateInput
    _min?: AITrainingJobMinOrderByAggregateInput
  }

  export type AITrainingJobScalarWhereWithAggregatesInput = {
    AND?: AITrainingJobScalarWhereWithAggregatesInput | AITrainingJobScalarWhereWithAggregatesInput[]
    OR?: AITrainingJobScalarWhereWithAggregatesInput[]
    NOT?: AITrainingJobScalarWhereWithAggregatesInput | AITrainingJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AITrainingJob"> | string
    tenantId?: StringWithAggregatesFilter<"AITrainingJob"> | string
    datasetId?: StringWithAggregatesFilter<"AITrainingJob"> | string
    datasetVersionId?: StringWithAggregatesFilter<"AITrainingJob"> | string
    modelType?: EnumAITrainingModelTypeWithAggregatesFilter<"AITrainingJob"> | $Enums.AITrainingModelType
    baseModel?: StringWithAggregatesFilter<"AITrainingJob"> | string
    trainingProvider?: EnumAITrainingProviderWithAggregatesFilter<"AITrainingJob"> | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusWithAggregatesFilter<"AITrainingJob"> | $Enums.AITrainingJobStatus
    hyperparameters?: JsonWithAggregatesFilter<"AITrainingJob">
    trainingConfig?: JsonWithAggregatesFilter<"AITrainingJob">
    logs?: JsonWithAggregatesFilter<"AITrainingJob">
    metrics?: JsonWithAggregatesFilter<"AITrainingJob">
    providerJobId?: StringNullableWithAggregatesFilter<"AITrainingJob"> | string | null
    trainingFileLocation?: StringNullableWithAggregatesFilter<"AITrainingJob"> | string | null
    outputModelId?: StringNullableWithAggregatesFilter<"AITrainingJob"> | string | null
    resumeCheckpointId?: StringNullableWithAggregatesFilter<"AITrainingJob"> | string | null
    createdByUserId?: StringWithAggregatesFilter<"AITrainingJob"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AITrainingJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AITrainingJob"> | Date | string
  }

  export type AIModelEvaluationWhereInput = {
    AND?: AIModelEvaluationWhereInput | AIModelEvaluationWhereInput[]
    OR?: AIModelEvaluationWhereInput[]
    NOT?: AIModelEvaluationWhereInput | AIModelEvaluationWhereInput[]
    id?: StringFilter<"AIModelEvaluation"> | string
    tenantId?: StringFilter<"AIModelEvaluation"> | string
    modelId?: StringFilter<"AIModelEvaluation"> | string
    datasetId?: StringFilter<"AIModelEvaluation"> | string
    metrics?: JsonFilter<"AIModelEvaluation">
    evaluationReport?: JsonFilter<"AIModelEvaluation">
    createdAt?: DateTimeFilter<"AIModelEvaluation"> | Date | string
    model?: XOR<AIModelRegistryScalarRelationFilter, AIModelRegistryWhereInput>
  }

  export type AIModelEvaluationOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    datasetId?: SortOrder
    metrics?: SortOrder
    evaluationReport?: SortOrder
    createdAt?: SortOrder
    model?: AIModelRegistryOrderByWithRelationInput
  }

  export type AIModelEvaluationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIModelEvaluationWhereInput | AIModelEvaluationWhereInput[]
    OR?: AIModelEvaluationWhereInput[]
    NOT?: AIModelEvaluationWhereInput | AIModelEvaluationWhereInput[]
    tenantId?: StringFilter<"AIModelEvaluation"> | string
    modelId?: StringFilter<"AIModelEvaluation"> | string
    datasetId?: StringFilter<"AIModelEvaluation"> | string
    metrics?: JsonFilter<"AIModelEvaluation">
    evaluationReport?: JsonFilter<"AIModelEvaluation">
    createdAt?: DateTimeFilter<"AIModelEvaluation"> | Date | string
    model?: XOR<AIModelRegistryScalarRelationFilter, AIModelRegistryWhereInput>
  }, "id">

  export type AIModelEvaluationOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    datasetId?: SortOrder
    metrics?: SortOrder
    evaluationReport?: SortOrder
    createdAt?: SortOrder
    _count?: AIModelEvaluationCountOrderByAggregateInput
    _max?: AIModelEvaluationMaxOrderByAggregateInput
    _min?: AIModelEvaluationMinOrderByAggregateInput
  }

  export type AIModelEvaluationScalarWhereWithAggregatesInput = {
    AND?: AIModelEvaluationScalarWhereWithAggregatesInput | AIModelEvaluationScalarWhereWithAggregatesInput[]
    OR?: AIModelEvaluationScalarWhereWithAggregatesInput[]
    NOT?: AIModelEvaluationScalarWhereWithAggregatesInput | AIModelEvaluationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIModelEvaluation"> | string
    tenantId?: StringWithAggregatesFilter<"AIModelEvaluation"> | string
    modelId?: StringWithAggregatesFilter<"AIModelEvaluation"> | string
    datasetId?: StringWithAggregatesFilter<"AIModelEvaluation"> | string
    metrics?: JsonWithAggregatesFilter<"AIModelEvaluation">
    evaluationReport?: JsonWithAggregatesFilter<"AIModelEvaluation">
    createdAt?: DateTimeWithAggregatesFilter<"AIModelEvaluation"> | Date | string
  }

  export type AIModelPromotionWhereInput = {
    AND?: AIModelPromotionWhereInput | AIModelPromotionWhereInput[]
    OR?: AIModelPromotionWhereInput[]
    NOT?: AIModelPromotionWhereInput | AIModelPromotionWhereInput[]
    id?: StringFilter<"AIModelPromotion"> | string
    tenantId?: StringFilter<"AIModelPromotion"> | string
    modelId?: StringFilter<"AIModelPromotion"> | string
    stage?: EnumAIModelPromotionStageFilter<"AIModelPromotion"> | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntFilter<"AIModelPromotion"> | number
    canaryHistory?: JsonFilter<"AIModelPromotion">
    promotedByUserId?: StringFilter<"AIModelPromotion"> | string
    createdAt?: DateTimeFilter<"AIModelPromotion"> | Date | string
    updatedAt?: DateTimeFilter<"AIModelPromotion"> | Date | string
    model?: XOR<AIModelRegistryScalarRelationFilter, AIModelRegistryWhereInput>
  }

  export type AIModelPromotionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    stage?: SortOrder
    rolloutPercentage?: SortOrder
    canaryHistory?: SortOrder
    promotedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: AIModelRegistryOrderByWithRelationInput
  }

  export type AIModelPromotionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    modelId?: string
    AND?: AIModelPromotionWhereInput | AIModelPromotionWhereInput[]
    OR?: AIModelPromotionWhereInput[]
    NOT?: AIModelPromotionWhereInput | AIModelPromotionWhereInput[]
    tenantId?: StringFilter<"AIModelPromotion"> | string
    stage?: EnumAIModelPromotionStageFilter<"AIModelPromotion"> | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntFilter<"AIModelPromotion"> | number
    canaryHistory?: JsonFilter<"AIModelPromotion">
    promotedByUserId?: StringFilter<"AIModelPromotion"> | string
    createdAt?: DateTimeFilter<"AIModelPromotion"> | Date | string
    updatedAt?: DateTimeFilter<"AIModelPromotion"> | Date | string
    model?: XOR<AIModelRegistryScalarRelationFilter, AIModelRegistryWhereInput>
  }, "id" | "modelId">

  export type AIModelPromotionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    stage?: SortOrder
    rolloutPercentage?: SortOrder
    canaryHistory?: SortOrder
    promotedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIModelPromotionCountOrderByAggregateInput
    _avg?: AIModelPromotionAvgOrderByAggregateInput
    _max?: AIModelPromotionMaxOrderByAggregateInput
    _min?: AIModelPromotionMinOrderByAggregateInput
    _sum?: AIModelPromotionSumOrderByAggregateInput
  }

  export type AIModelPromotionScalarWhereWithAggregatesInput = {
    AND?: AIModelPromotionScalarWhereWithAggregatesInput | AIModelPromotionScalarWhereWithAggregatesInput[]
    OR?: AIModelPromotionScalarWhereWithAggregatesInput[]
    NOT?: AIModelPromotionScalarWhereWithAggregatesInput | AIModelPromotionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIModelPromotion"> | string
    tenantId?: StringWithAggregatesFilter<"AIModelPromotion"> | string
    modelId?: StringWithAggregatesFilter<"AIModelPromotion"> | string
    stage?: EnumAIModelPromotionStageWithAggregatesFilter<"AIModelPromotion"> | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntWithAggregatesFilter<"AIModelPromotion"> | number
    canaryHistory?: JsonWithAggregatesFilter<"AIModelPromotion">
    promotedByUserId?: StringWithAggregatesFilter<"AIModelPromotion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AIModelPromotion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIModelPromotion"> | Date | string
  }

  export type AITrainingExperimentWhereInput = {
    AND?: AITrainingExperimentWhereInput | AITrainingExperimentWhereInput[]
    OR?: AITrainingExperimentWhereInput[]
    NOT?: AITrainingExperimentWhereInput | AITrainingExperimentWhereInput[]
    id?: StringFilter<"AITrainingExperiment"> | string
    tenantId?: StringFilter<"AITrainingExperiment"> | string
    trainingJobId?: StringFilter<"AITrainingExperiment"> | string
    experimentName?: StringFilter<"AITrainingExperiment"> | string
    hyperparameters?: JsonFilter<"AITrainingExperiment">
    metrics?: JsonFilter<"AITrainingExperiment">
    trainingCurve?: JsonFilter<"AITrainingExperiment">
    status?: EnumAITrainingExperimentStatusFilter<"AITrainingExperiment"> | $Enums.AITrainingExperimentStatus
    label?: StringNullableFilter<"AITrainingExperiment"> | string | null
    startedAt?: DateTimeFilter<"AITrainingExperiment"> | Date | string
    finishedAt?: DateTimeNullableFilter<"AITrainingExperiment"> | Date | string | null
    createdByUserId?: StringFilter<"AITrainingExperiment"> | string
    trainingJob?: XOR<AITrainingJobScalarRelationFilter, AITrainingJobWhereInput>
    checkpoints?: AITrainingCheckpointListRelationFilter
  }

  export type AITrainingExperimentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentName?: SortOrder
    hyperparameters?: SortOrder
    metrics?: SortOrder
    trainingCurve?: SortOrder
    status?: SortOrder
    label?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    trainingJob?: AITrainingJobOrderByWithRelationInput
    checkpoints?: AITrainingCheckpointOrderByRelationAggregateInput
  }

  export type AITrainingExperimentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AITrainingExperimentWhereInput | AITrainingExperimentWhereInput[]
    OR?: AITrainingExperimentWhereInput[]
    NOT?: AITrainingExperimentWhereInput | AITrainingExperimentWhereInput[]
    tenantId?: StringFilter<"AITrainingExperiment"> | string
    trainingJobId?: StringFilter<"AITrainingExperiment"> | string
    experimentName?: StringFilter<"AITrainingExperiment"> | string
    hyperparameters?: JsonFilter<"AITrainingExperiment">
    metrics?: JsonFilter<"AITrainingExperiment">
    trainingCurve?: JsonFilter<"AITrainingExperiment">
    status?: EnumAITrainingExperimentStatusFilter<"AITrainingExperiment"> | $Enums.AITrainingExperimentStatus
    label?: StringNullableFilter<"AITrainingExperiment"> | string | null
    startedAt?: DateTimeFilter<"AITrainingExperiment"> | Date | string
    finishedAt?: DateTimeNullableFilter<"AITrainingExperiment"> | Date | string | null
    createdByUserId?: StringFilter<"AITrainingExperiment"> | string
    trainingJob?: XOR<AITrainingJobScalarRelationFilter, AITrainingJobWhereInput>
    checkpoints?: AITrainingCheckpointListRelationFilter
  }, "id">

  export type AITrainingExperimentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentName?: SortOrder
    hyperparameters?: SortOrder
    metrics?: SortOrder
    trainingCurve?: SortOrder
    status?: SortOrder
    label?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdByUserId?: SortOrder
    _count?: AITrainingExperimentCountOrderByAggregateInput
    _max?: AITrainingExperimentMaxOrderByAggregateInput
    _min?: AITrainingExperimentMinOrderByAggregateInput
  }

  export type AITrainingExperimentScalarWhereWithAggregatesInput = {
    AND?: AITrainingExperimentScalarWhereWithAggregatesInput | AITrainingExperimentScalarWhereWithAggregatesInput[]
    OR?: AITrainingExperimentScalarWhereWithAggregatesInput[]
    NOT?: AITrainingExperimentScalarWhereWithAggregatesInput | AITrainingExperimentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AITrainingExperiment"> | string
    tenantId?: StringWithAggregatesFilter<"AITrainingExperiment"> | string
    trainingJobId?: StringWithAggregatesFilter<"AITrainingExperiment"> | string
    experimentName?: StringWithAggregatesFilter<"AITrainingExperiment"> | string
    hyperparameters?: JsonWithAggregatesFilter<"AITrainingExperiment">
    metrics?: JsonWithAggregatesFilter<"AITrainingExperiment">
    trainingCurve?: JsonWithAggregatesFilter<"AITrainingExperiment">
    status?: EnumAITrainingExperimentStatusWithAggregatesFilter<"AITrainingExperiment"> | $Enums.AITrainingExperimentStatus
    label?: StringNullableWithAggregatesFilter<"AITrainingExperiment"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"AITrainingExperiment"> | Date | string
    finishedAt?: DateTimeNullableWithAggregatesFilter<"AITrainingExperiment"> | Date | string | null
    createdByUserId?: StringWithAggregatesFilter<"AITrainingExperiment"> | string
  }

  export type AITrainingCheckpointWhereInput = {
    AND?: AITrainingCheckpointWhereInput | AITrainingCheckpointWhereInput[]
    OR?: AITrainingCheckpointWhereInput[]
    NOT?: AITrainingCheckpointWhereInput | AITrainingCheckpointWhereInput[]
    id?: StringFilter<"AITrainingCheckpoint"> | string
    tenantId?: StringFilter<"AITrainingCheckpoint"> | string
    trainingJobId?: StringFilter<"AITrainingCheckpoint"> | string
    experimentId?: StringNullableFilter<"AITrainingCheckpoint"> | string | null
    checkpointNumber?: IntFilter<"AITrainingCheckpoint"> | number
    fileLocation?: StringFilter<"AITrainingCheckpoint"> | string
    metricsSnapshot?: JsonFilter<"AITrainingCheckpoint">
    createdAt?: DateTimeFilter<"AITrainingCheckpoint"> | Date | string
    trainingJob?: XOR<AITrainingJobScalarRelationFilter, AITrainingJobWhereInput>
    experiment?: XOR<AITrainingExperimentNullableScalarRelationFilter, AITrainingExperimentWhereInput> | null
  }

  export type AITrainingCheckpointOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentId?: SortOrderInput | SortOrder
    checkpointNumber?: SortOrder
    fileLocation?: SortOrder
    metricsSnapshot?: SortOrder
    createdAt?: SortOrder
    trainingJob?: AITrainingJobOrderByWithRelationInput
    experiment?: AITrainingExperimentOrderByWithRelationInput
  }

  export type AITrainingCheckpointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    trainingJobId_checkpointNumber?: AITrainingCheckpointTrainingJobIdCheckpointNumberCompoundUniqueInput
    AND?: AITrainingCheckpointWhereInput | AITrainingCheckpointWhereInput[]
    OR?: AITrainingCheckpointWhereInput[]
    NOT?: AITrainingCheckpointWhereInput | AITrainingCheckpointWhereInput[]
    tenantId?: StringFilter<"AITrainingCheckpoint"> | string
    trainingJobId?: StringFilter<"AITrainingCheckpoint"> | string
    experimentId?: StringNullableFilter<"AITrainingCheckpoint"> | string | null
    checkpointNumber?: IntFilter<"AITrainingCheckpoint"> | number
    fileLocation?: StringFilter<"AITrainingCheckpoint"> | string
    metricsSnapshot?: JsonFilter<"AITrainingCheckpoint">
    createdAt?: DateTimeFilter<"AITrainingCheckpoint"> | Date | string
    trainingJob?: XOR<AITrainingJobScalarRelationFilter, AITrainingJobWhereInput>
    experiment?: XOR<AITrainingExperimentNullableScalarRelationFilter, AITrainingExperimentWhereInput> | null
  }, "id" | "trainingJobId_checkpointNumber">

  export type AITrainingCheckpointOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentId?: SortOrderInput | SortOrder
    checkpointNumber?: SortOrder
    fileLocation?: SortOrder
    metricsSnapshot?: SortOrder
    createdAt?: SortOrder
    _count?: AITrainingCheckpointCountOrderByAggregateInput
    _avg?: AITrainingCheckpointAvgOrderByAggregateInput
    _max?: AITrainingCheckpointMaxOrderByAggregateInput
    _min?: AITrainingCheckpointMinOrderByAggregateInput
    _sum?: AITrainingCheckpointSumOrderByAggregateInput
  }

  export type AITrainingCheckpointScalarWhereWithAggregatesInput = {
    AND?: AITrainingCheckpointScalarWhereWithAggregatesInput | AITrainingCheckpointScalarWhereWithAggregatesInput[]
    OR?: AITrainingCheckpointScalarWhereWithAggregatesInput[]
    NOT?: AITrainingCheckpointScalarWhereWithAggregatesInput | AITrainingCheckpointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AITrainingCheckpoint"> | string
    tenantId?: StringWithAggregatesFilter<"AITrainingCheckpoint"> | string
    trainingJobId?: StringWithAggregatesFilter<"AITrainingCheckpoint"> | string
    experimentId?: StringNullableWithAggregatesFilter<"AITrainingCheckpoint"> | string | null
    checkpointNumber?: IntWithAggregatesFilter<"AITrainingCheckpoint"> | number
    fileLocation?: StringWithAggregatesFilter<"AITrainingCheckpoint"> | string
    metricsSnapshot?: JsonWithAggregatesFilter<"AITrainingCheckpoint">
    createdAt?: DateTimeWithAggregatesFilter<"AITrainingCheckpoint"> | Date | string
  }

  export type AIModelRegistryWhereInput = {
    AND?: AIModelRegistryWhereInput | AIModelRegistryWhereInput[]
    OR?: AIModelRegistryWhereInput[]
    NOT?: AIModelRegistryWhereInput | AIModelRegistryWhereInput[]
    id?: StringFilter<"AIModelRegistry"> | string
    tenantId?: StringFilter<"AIModelRegistry"> | string
    modelName?: StringFilter<"AIModelRegistry"> | string
    version?: StringFilter<"AIModelRegistry"> | string
    baseModel?: StringFilter<"AIModelRegistry"> | string
    trainingJobId?: StringFilter<"AIModelRegistry"> | string
    trainingProvider?: EnumAITrainingProviderFilter<"AIModelRegistry"> | $Enums.AITrainingProvider
    fileLocation?: StringFilter<"AIModelRegistry"> | string
    metadata?: JsonFilter<"AIModelRegistry">
    status?: EnumAIModelRegistryStatusFilter<"AIModelRegistry"> | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFilter<"AIModelRegistry"> | Date | string
    trainingJob?: XOR<AITrainingJobScalarRelationFilter, AITrainingJobWhereInput>
    evaluations?: AIModelEvaluationListRelationFilter
    promotion?: XOR<AIModelPromotionNullableScalarRelationFilter, AIModelPromotionWhereInput> | null
  }

  export type AIModelRegistryOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelName?: SortOrder
    version?: SortOrder
    baseModel?: SortOrder
    trainingJobId?: SortOrder
    trainingProvider?: SortOrder
    fileLocation?: SortOrder
    metadata?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    trainingJob?: AITrainingJobOrderByWithRelationInput
    evaluations?: AIModelEvaluationOrderByRelationAggregateInput
    promotion?: AIModelPromotionOrderByWithRelationInput
  }

  export type AIModelRegistryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_modelName_version?: AIModelRegistryTenantIdModelNameVersionCompoundUniqueInput
    AND?: AIModelRegistryWhereInput | AIModelRegistryWhereInput[]
    OR?: AIModelRegistryWhereInput[]
    NOT?: AIModelRegistryWhereInput | AIModelRegistryWhereInput[]
    tenantId?: StringFilter<"AIModelRegistry"> | string
    modelName?: StringFilter<"AIModelRegistry"> | string
    version?: StringFilter<"AIModelRegistry"> | string
    baseModel?: StringFilter<"AIModelRegistry"> | string
    trainingJobId?: StringFilter<"AIModelRegistry"> | string
    trainingProvider?: EnumAITrainingProviderFilter<"AIModelRegistry"> | $Enums.AITrainingProvider
    fileLocation?: StringFilter<"AIModelRegistry"> | string
    metadata?: JsonFilter<"AIModelRegistry">
    status?: EnumAIModelRegistryStatusFilter<"AIModelRegistry"> | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFilter<"AIModelRegistry"> | Date | string
    trainingJob?: XOR<AITrainingJobScalarRelationFilter, AITrainingJobWhereInput>
    evaluations?: AIModelEvaluationListRelationFilter
    promotion?: XOR<AIModelPromotionNullableScalarRelationFilter, AIModelPromotionWhereInput> | null
  }, "id" | "tenantId_modelName_version">

  export type AIModelRegistryOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelName?: SortOrder
    version?: SortOrder
    baseModel?: SortOrder
    trainingJobId?: SortOrder
    trainingProvider?: SortOrder
    fileLocation?: SortOrder
    metadata?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: AIModelRegistryCountOrderByAggregateInput
    _max?: AIModelRegistryMaxOrderByAggregateInput
    _min?: AIModelRegistryMinOrderByAggregateInput
  }

  export type AIModelRegistryScalarWhereWithAggregatesInput = {
    AND?: AIModelRegistryScalarWhereWithAggregatesInput | AIModelRegistryScalarWhereWithAggregatesInput[]
    OR?: AIModelRegistryScalarWhereWithAggregatesInput[]
    NOT?: AIModelRegistryScalarWhereWithAggregatesInput | AIModelRegistryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIModelRegistry"> | string
    tenantId?: StringWithAggregatesFilter<"AIModelRegistry"> | string
    modelName?: StringWithAggregatesFilter<"AIModelRegistry"> | string
    version?: StringWithAggregatesFilter<"AIModelRegistry"> | string
    baseModel?: StringWithAggregatesFilter<"AIModelRegistry"> | string
    trainingJobId?: StringWithAggregatesFilter<"AIModelRegistry"> | string
    trainingProvider?: EnumAITrainingProviderWithAggregatesFilter<"AIModelRegistry"> | $Enums.AITrainingProvider
    fileLocation?: StringWithAggregatesFilter<"AIModelRegistry"> | string
    metadata?: JsonWithAggregatesFilter<"AIModelRegistry">
    status?: EnumAIModelRegistryStatusWithAggregatesFilter<"AIModelRegistry"> | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeWithAggregatesFilter<"AIModelRegistry"> | Date | string
  }

  export type AITrainingJobCreateInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    registryModels?: AIModelRegistryCreateNestedManyWithoutTrainingJobInput
    experiments?: AITrainingExperimentCreateNestedManyWithoutTrainingJobInput
    checkpoints?: AITrainingCheckpointCreateNestedManyWithoutTrainingJobInput
  }

  export type AITrainingJobUncheckedCreateInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    registryModels?: AIModelRegistryUncheckedCreateNestedManyWithoutTrainingJobInput
    experiments?: AITrainingExperimentUncheckedCreateNestedManyWithoutTrainingJobInput
    checkpoints?: AITrainingCheckpointUncheckedCreateNestedManyWithoutTrainingJobInput
  }

  export type AITrainingJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registryModels?: AIModelRegistryUpdateManyWithoutTrainingJobNestedInput
    experiments?: AITrainingExperimentUpdateManyWithoutTrainingJobNestedInput
    checkpoints?: AITrainingCheckpointUpdateManyWithoutTrainingJobNestedInput
  }

  export type AITrainingJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registryModels?: AIModelRegistryUncheckedUpdateManyWithoutTrainingJobNestedInput
    experiments?: AITrainingExperimentUncheckedUpdateManyWithoutTrainingJobNestedInput
    checkpoints?: AITrainingCheckpointUncheckedUpdateManyWithoutTrainingJobNestedInput
  }

  export type AITrainingJobCreateManyInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AITrainingJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITrainingJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelEvaluationCreateInput = {
    id?: string
    tenantId: string
    datasetId: string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    model: AIModelRegistryCreateNestedOneWithoutEvaluationsInput
  }

  export type AIModelEvaluationUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    datasetId: string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIModelEvaluationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: AIModelRegistryUpdateOneRequiredWithoutEvaluationsNestedInput
  }

  export type AIModelEvaluationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelEvaluationCreateManyInput = {
    id?: string
    tenantId: string
    modelId: string
    datasetId: string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIModelEvaluationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelEvaluationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelPromotionCreateInput = {
    id?: string
    tenantId: string
    stage?: $Enums.AIModelPromotionStage
    rolloutPercentage?: number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    model: AIModelRegistryCreateNestedOneWithoutPromotionInput
  }

  export type AIModelPromotionUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    stage?: $Enums.AIModelPromotionStage
    rolloutPercentage?: number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIModelPromotionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stage?: EnumAIModelPromotionStageFieldUpdateOperationsInput | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntFieldUpdateOperationsInput | number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: AIModelRegistryUpdateOneRequiredWithoutPromotionNestedInput
  }

  export type AIModelPromotionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    stage?: EnumAIModelPromotionStageFieldUpdateOperationsInput | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntFieldUpdateOperationsInput | number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelPromotionCreateManyInput = {
    id?: string
    tenantId: string
    modelId: string
    stage?: $Enums.AIModelPromotionStage
    rolloutPercentage?: number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIModelPromotionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stage?: EnumAIModelPromotionStageFieldUpdateOperationsInput | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntFieldUpdateOperationsInput | number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelPromotionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    stage?: EnumAIModelPromotionStageFieldUpdateOperationsInput | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntFieldUpdateOperationsInput | number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITrainingExperimentCreateInput = {
    id?: string
    tenantId: string
    experimentName: string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AITrainingExperimentStatus
    label?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    createdByUserId: string
    trainingJob: AITrainingJobCreateNestedOneWithoutExperimentsInput
    checkpoints?: AITrainingCheckpointCreateNestedManyWithoutExperimentInput
  }

  export type AITrainingExperimentUncheckedCreateInput = {
    id?: string
    tenantId: string
    trainingJobId: string
    experimentName: string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AITrainingExperimentStatus
    label?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    createdByUserId: string
    checkpoints?: AITrainingCheckpointUncheckedCreateNestedManyWithoutExperimentInput
  }

  export type AITrainingExperimentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    trainingJob?: AITrainingJobUpdateOneRequiredWithoutExperimentsNestedInput
    checkpoints?: AITrainingCheckpointUpdateManyWithoutExperimentNestedInput
  }

  export type AITrainingExperimentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    checkpoints?: AITrainingCheckpointUncheckedUpdateManyWithoutExperimentNestedInput
  }

  export type AITrainingExperimentCreateManyInput = {
    id?: string
    tenantId: string
    trainingJobId: string
    experimentName: string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AITrainingExperimentStatus
    label?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    createdByUserId: string
  }

  export type AITrainingExperimentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type AITrainingExperimentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type AITrainingCheckpointCreateInput = {
    id?: string
    tenantId: string
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    trainingJob: AITrainingJobCreateNestedOneWithoutCheckpointsInput
    experiment?: AITrainingExperimentCreateNestedOneWithoutCheckpointsInput
  }

  export type AITrainingCheckpointUncheckedCreateInput = {
    id?: string
    tenantId: string
    trainingJobId: string
    experimentId?: string | null
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AITrainingCheckpointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingJob?: AITrainingJobUpdateOneRequiredWithoutCheckpointsNestedInput
    experiment?: AITrainingExperimentUpdateOneWithoutCheckpointsNestedInput
  }

  export type AITrainingCheckpointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    experimentId?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITrainingCheckpointCreateManyInput = {
    id?: string
    tenantId: string
    trainingJobId: string
    experimentId?: string | null
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AITrainingCheckpointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITrainingCheckpointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    experimentId?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelRegistryCreateInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
    trainingJob: AITrainingJobCreateNestedOneWithoutRegistryModelsInput
    evaluations?: AIModelEvaluationCreateNestedManyWithoutModelInput
    promotion?: AIModelPromotionCreateNestedOneWithoutModelInput
  }

  export type AIModelRegistryUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingJobId: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
    evaluations?: AIModelEvaluationUncheckedCreateNestedManyWithoutModelInput
    promotion?: AIModelPromotionUncheckedCreateNestedOneWithoutModelInput
  }

  export type AIModelRegistryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingJob?: AITrainingJobUpdateOneRequiredWithoutRegistryModelsNestedInput
    evaluations?: AIModelEvaluationUpdateManyWithoutModelNestedInput
    promotion?: AIModelPromotionUpdateOneWithoutModelNestedInput
  }

  export type AIModelRegistryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: AIModelEvaluationUncheckedUpdateManyWithoutModelNestedInput
    promotion?: AIModelPromotionUncheckedUpdateOneWithoutModelNestedInput
  }

  export type AIModelRegistryCreateManyInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingJobId: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
  }

  export type AIModelRegistryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelRegistryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
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

  export type EnumAITrainingModelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingModelType | EnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingModelType[] | ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingModelType[] | ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingModelTypeFilter<$PrismaModel> | $Enums.AITrainingModelType
  }

  export type EnumAITrainingProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingProvider | EnumAITrainingProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingProvider[] | ListEnumAITrainingProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingProvider[] | ListEnumAITrainingProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingProviderFilter<$PrismaModel> | $Enums.AITrainingProvider
  }

  export type EnumAITrainingJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingJobStatus | EnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingJobStatus[] | ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingJobStatus[] | ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingJobStatusFilter<$PrismaModel> | $Enums.AITrainingJobStatus
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

  export type AIModelRegistryListRelationFilter = {
    every?: AIModelRegistryWhereInput
    some?: AIModelRegistryWhereInput
    none?: AIModelRegistryWhereInput
  }

  export type AITrainingExperimentListRelationFilter = {
    every?: AITrainingExperimentWhereInput
    some?: AITrainingExperimentWhereInput
    none?: AITrainingExperimentWhereInput
  }

  export type AITrainingCheckpointListRelationFilter = {
    every?: AITrainingCheckpointWhereInput
    some?: AITrainingCheckpointWhereInput
    none?: AITrainingCheckpointWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AIModelRegistryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AITrainingExperimentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AITrainingCheckpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AITrainingJobCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    datasetVersionId?: SortOrder
    modelType?: SortOrder
    baseModel?: SortOrder
    trainingProvider?: SortOrder
    status?: SortOrder
    hyperparameters?: SortOrder
    trainingConfig?: SortOrder
    logs?: SortOrder
    metrics?: SortOrder
    providerJobId?: SortOrder
    trainingFileLocation?: SortOrder
    outputModelId?: SortOrder
    resumeCheckpointId?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AITrainingJobMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    datasetVersionId?: SortOrder
    modelType?: SortOrder
    baseModel?: SortOrder
    trainingProvider?: SortOrder
    status?: SortOrder
    providerJobId?: SortOrder
    trainingFileLocation?: SortOrder
    outputModelId?: SortOrder
    resumeCheckpointId?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AITrainingJobMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    datasetId?: SortOrder
    datasetVersionId?: SortOrder
    modelType?: SortOrder
    baseModel?: SortOrder
    trainingProvider?: SortOrder
    status?: SortOrder
    providerJobId?: SortOrder
    trainingFileLocation?: SortOrder
    outputModelId?: SortOrder
    resumeCheckpointId?: SortOrder
    createdByUserId?: SortOrder
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

  export type EnumAITrainingModelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingModelType | EnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingModelType[] | ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingModelType[] | ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingModelTypeWithAggregatesFilter<$PrismaModel> | $Enums.AITrainingModelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAITrainingModelTypeFilter<$PrismaModel>
    _max?: NestedEnumAITrainingModelTypeFilter<$PrismaModel>
  }

  export type EnumAITrainingProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingProvider | EnumAITrainingProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingProvider[] | ListEnumAITrainingProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingProvider[] | ListEnumAITrainingProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingProviderWithAggregatesFilter<$PrismaModel> | $Enums.AITrainingProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAITrainingProviderFilter<$PrismaModel>
    _max?: NestedEnumAITrainingProviderFilter<$PrismaModel>
  }

  export type EnumAITrainingJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingJobStatus | EnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingJobStatus[] | ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingJobStatus[] | ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.AITrainingJobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAITrainingJobStatusFilter<$PrismaModel>
    _max?: NestedEnumAITrainingJobStatusFilter<$PrismaModel>
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

  export type AIModelRegistryScalarRelationFilter = {
    is?: AIModelRegistryWhereInput
    isNot?: AIModelRegistryWhereInput
  }

  export type AIModelEvaluationCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    datasetId?: SortOrder
    metrics?: SortOrder
    evaluationReport?: SortOrder
    createdAt?: SortOrder
  }

  export type AIModelEvaluationMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    datasetId?: SortOrder
    createdAt?: SortOrder
  }

  export type AIModelEvaluationMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    datasetId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAIModelPromotionStageFilter<$PrismaModel = never> = {
    equals?: $Enums.AIModelPromotionStage | EnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    in?: $Enums.AIModelPromotionStage[] | ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIModelPromotionStage[] | ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    not?: NestedEnumAIModelPromotionStageFilter<$PrismaModel> | $Enums.AIModelPromotionStage
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

  export type AIModelPromotionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    stage?: SortOrder
    rolloutPercentage?: SortOrder
    canaryHistory?: SortOrder
    promotedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIModelPromotionAvgOrderByAggregateInput = {
    rolloutPercentage?: SortOrder
  }

  export type AIModelPromotionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    stage?: SortOrder
    rolloutPercentage?: SortOrder
    promotedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIModelPromotionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    stage?: SortOrder
    rolloutPercentage?: SortOrder
    promotedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIModelPromotionSumOrderByAggregateInput = {
    rolloutPercentage?: SortOrder
  }

  export type EnumAIModelPromotionStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIModelPromotionStage | EnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    in?: $Enums.AIModelPromotionStage[] | ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIModelPromotionStage[] | ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    not?: NestedEnumAIModelPromotionStageWithAggregatesFilter<$PrismaModel> | $Enums.AIModelPromotionStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIModelPromotionStageFilter<$PrismaModel>
    _max?: NestedEnumAIModelPromotionStageFilter<$PrismaModel>
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

  export type EnumAITrainingExperimentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingExperimentStatus | EnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingExperimentStatus[] | ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingExperimentStatus[] | ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingExperimentStatusFilter<$PrismaModel> | $Enums.AITrainingExperimentStatus
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

  export type AITrainingJobScalarRelationFilter = {
    is?: AITrainingJobWhereInput
    isNot?: AITrainingJobWhereInput
  }

  export type AITrainingExperimentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentName?: SortOrder
    hyperparameters?: SortOrder
    metrics?: SortOrder
    trainingCurve?: SortOrder
    status?: SortOrder
    label?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type AITrainingExperimentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentName?: SortOrder
    status?: SortOrder
    label?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type AITrainingExperimentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentName?: SortOrder
    status?: SortOrder
    label?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type EnumAITrainingExperimentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingExperimentStatus | EnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingExperimentStatus[] | ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingExperimentStatus[] | ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingExperimentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AITrainingExperimentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAITrainingExperimentStatusFilter<$PrismaModel>
    _max?: NestedEnumAITrainingExperimentStatusFilter<$PrismaModel>
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

  export type AITrainingExperimentNullableScalarRelationFilter = {
    is?: AITrainingExperimentWhereInput | null
    isNot?: AITrainingExperimentWhereInput | null
  }

  export type AITrainingCheckpointTrainingJobIdCheckpointNumberCompoundUniqueInput = {
    trainingJobId: string
    checkpointNumber: number
  }

  export type AITrainingCheckpointCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentId?: SortOrder
    checkpointNumber?: SortOrder
    fileLocation?: SortOrder
    metricsSnapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type AITrainingCheckpointAvgOrderByAggregateInput = {
    checkpointNumber?: SortOrder
  }

  export type AITrainingCheckpointMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentId?: SortOrder
    checkpointNumber?: SortOrder
    fileLocation?: SortOrder
    createdAt?: SortOrder
  }

  export type AITrainingCheckpointMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    trainingJobId?: SortOrder
    experimentId?: SortOrder
    checkpointNumber?: SortOrder
    fileLocation?: SortOrder
    createdAt?: SortOrder
  }

  export type AITrainingCheckpointSumOrderByAggregateInput = {
    checkpointNumber?: SortOrder
  }

  export type EnumAIModelRegistryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AIModelRegistryStatus | EnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIModelRegistryStatus[] | ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIModelRegistryStatus[] | ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIModelRegistryStatusFilter<$PrismaModel> | $Enums.AIModelRegistryStatus
  }

  export type AIModelEvaluationListRelationFilter = {
    every?: AIModelEvaluationWhereInput
    some?: AIModelEvaluationWhereInput
    none?: AIModelEvaluationWhereInput
  }

  export type AIModelPromotionNullableScalarRelationFilter = {
    is?: AIModelPromotionWhereInput | null
    isNot?: AIModelPromotionWhereInput | null
  }

  export type AIModelEvaluationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIModelRegistryTenantIdModelNameVersionCompoundUniqueInput = {
    tenantId: string
    modelName: string
    version: string
  }

  export type AIModelRegistryCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelName?: SortOrder
    version?: SortOrder
    baseModel?: SortOrder
    trainingJobId?: SortOrder
    trainingProvider?: SortOrder
    fileLocation?: SortOrder
    metadata?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type AIModelRegistryMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelName?: SortOrder
    version?: SortOrder
    baseModel?: SortOrder
    trainingJobId?: SortOrder
    trainingProvider?: SortOrder
    fileLocation?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type AIModelRegistryMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelName?: SortOrder
    version?: SortOrder
    baseModel?: SortOrder
    trainingJobId?: SortOrder
    trainingProvider?: SortOrder
    fileLocation?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAIModelRegistryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIModelRegistryStatus | EnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIModelRegistryStatus[] | ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIModelRegistryStatus[] | ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIModelRegistryStatusWithAggregatesFilter<$PrismaModel> | $Enums.AIModelRegistryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIModelRegistryStatusFilter<$PrismaModel>
    _max?: NestedEnumAIModelRegistryStatusFilter<$PrismaModel>
  }

  export type AIModelRegistryCreateNestedManyWithoutTrainingJobInput = {
    create?: XOR<AIModelRegistryCreateWithoutTrainingJobInput, AIModelRegistryUncheckedCreateWithoutTrainingJobInput> | AIModelRegistryCreateWithoutTrainingJobInput[] | AIModelRegistryUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AIModelRegistryCreateOrConnectWithoutTrainingJobInput | AIModelRegistryCreateOrConnectWithoutTrainingJobInput[]
    createMany?: AIModelRegistryCreateManyTrainingJobInputEnvelope
    connect?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
  }

  export type AITrainingExperimentCreateNestedManyWithoutTrainingJobInput = {
    create?: XOR<AITrainingExperimentCreateWithoutTrainingJobInput, AITrainingExperimentUncheckedCreateWithoutTrainingJobInput> | AITrainingExperimentCreateWithoutTrainingJobInput[] | AITrainingExperimentUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AITrainingExperimentCreateOrConnectWithoutTrainingJobInput | AITrainingExperimentCreateOrConnectWithoutTrainingJobInput[]
    createMany?: AITrainingExperimentCreateManyTrainingJobInputEnvelope
    connect?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
  }

  export type AITrainingCheckpointCreateNestedManyWithoutTrainingJobInput = {
    create?: XOR<AITrainingCheckpointCreateWithoutTrainingJobInput, AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput> | AITrainingCheckpointCreateWithoutTrainingJobInput[] | AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput | AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput[]
    createMany?: AITrainingCheckpointCreateManyTrainingJobInputEnvelope
    connect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
  }

  export type AIModelRegistryUncheckedCreateNestedManyWithoutTrainingJobInput = {
    create?: XOR<AIModelRegistryCreateWithoutTrainingJobInput, AIModelRegistryUncheckedCreateWithoutTrainingJobInput> | AIModelRegistryCreateWithoutTrainingJobInput[] | AIModelRegistryUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AIModelRegistryCreateOrConnectWithoutTrainingJobInput | AIModelRegistryCreateOrConnectWithoutTrainingJobInput[]
    createMany?: AIModelRegistryCreateManyTrainingJobInputEnvelope
    connect?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
  }

  export type AITrainingExperimentUncheckedCreateNestedManyWithoutTrainingJobInput = {
    create?: XOR<AITrainingExperimentCreateWithoutTrainingJobInput, AITrainingExperimentUncheckedCreateWithoutTrainingJobInput> | AITrainingExperimentCreateWithoutTrainingJobInput[] | AITrainingExperimentUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AITrainingExperimentCreateOrConnectWithoutTrainingJobInput | AITrainingExperimentCreateOrConnectWithoutTrainingJobInput[]
    createMany?: AITrainingExperimentCreateManyTrainingJobInputEnvelope
    connect?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
  }

  export type AITrainingCheckpointUncheckedCreateNestedManyWithoutTrainingJobInput = {
    create?: XOR<AITrainingCheckpointCreateWithoutTrainingJobInput, AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput> | AITrainingCheckpointCreateWithoutTrainingJobInput[] | AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput | AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput[]
    createMany?: AITrainingCheckpointCreateManyTrainingJobInputEnvelope
    connect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAITrainingModelTypeFieldUpdateOperationsInput = {
    set?: $Enums.AITrainingModelType
  }

  export type EnumAITrainingProviderFieldUpdateOperationsInput = {
    set?: $Enums.AITrainingProvider
  }

  export type EnumAITrainingJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.AITrainingJobStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AIModelRegistryUpdateManyWithoutTrainingJobNestedInput = {
    create?: XOR<AIModelRegistryCreateWithoutTrainingJobInput, AIModelRegistryUncheckedCreateWithoutTrainingJobInput> | AIModelRegistryCreateWithoutTrainingJobInput[] | AIModelRegistryUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AIModelRegistryCreateOrConnectWithoutTrainingJobInput | AIModelRegistryCreateOrConnectWithoutTrainingJobInput[]
    upsert?: AIModelRegistryUpsertWithWhereUniqueWithoutTrainingJobInput | AIModelRegistryUpsertWithWhereUniqueWithoutTrainingJobInput[]
    createMany?: AIModelRegistryCreateManyTrainingJobInputEnvelope
    set?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
    disconnect?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
    delete?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
    connect?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
    update?: AIModelRegistryUpdateWithWhereUniqueWithoutTrainingJobInput | AIModelRegistryUpdateWithWhereUniqueWithoutTrainingJobInput[]
    updateMany?: AIModelRegistryUpdateManyWithWhereWithoutTrainingJobInput | AIModelRegistryUpdateManyWithWhereWithoutTrainingJobInput[]
    deleteMany?: AIModelRegistryScalarWhereInput | AIModelRegistryScalarWhereInput[]
  }

  export type AITrainingExperimentUpdateManyWithoutTrainingJobNestedInput = {
    create?: XOR<AITrainingExperimentCreateWithoutTrainingJobInput, AITrainingExperimentUncheckedCreateWithoutTrainingJobInput> | AITrainingExperimentCreateWithoutTrainingJobInput[] | AITrainingExperimentUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AITrainingExperimentCreateOrConnectWithoutTrainingJobInput | AITrainingExperimentCreateOrConnectWithoutTrainingJobInput[]
    upsert?: AITrainingExperimentUpsertWithWhereUniqueWithoutTrainingJobInput | AITrainingExperimentUpsertWithWhereUniqueWithoutTrainingJobInput[]
    createMany?: AITrainingExperimentCreateManyTrainingJobInputEnvelope
    set?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
    disconnect?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
    delete?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
    connect?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
    update?: AITrainingExperimentUpdateWithWhereUniqueWithoutTrainingJobInput | AITrainingExperimentUpdateWithWhereUniqueWithoutTrainingJobInput[]
    updateMany?: AITrainingExperimentUpdateManyWithWhereWithoutTrainingJobInput | AITrainingExperimentUpdateManyWithWhereWithoutTrainingJobInput[]
    deleteMany?: AITrainingExperimentScalarWhereInput | AITrainingExperimentScalarWhereInput[]
  }

  export type AITrainingCheckpointUpdateManyWithoutTrainingJobNestedInput = {
    create?: XOR<AITrainingCheckpointCreateWithoutTrainingJobInput, AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput> | AITrainingCheckpointCreateWithoutTrainingJobInput[] | AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput | AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput[]
    upsert?: AITrainingCheckpointUpsertWithWhereUniqueWithoutTrainingJobInput | AITrainingCheckpointUpsertWithWhereUniqueWithoutTrainingJobInput[]
    createMany?: AITrainingCheckpointCreateManyTrainingJobInputEnvelope
    set?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    disconnect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    delete?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    connect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    update?: AITrainingCheckpointUpdateWithWhereUniqueWithoutTrainingJobInput | AITrainingCheckpointUpdateWithWhereUniqueWithoutTrainingJobInput[]
    updateMany?: AITrainingCheckpointUpdateManyWithWhereWithoutTrainingJobInput | AITrainingCheckpointUpdateManyWithWhereWithoutTrainingJobInput[]
    deleteMany?: AITrainingCheckpointScalarWhereInput | AITrainingCheckpointScalarWhereInput[]
  }

  export type AIModelRegistryUncheckedUpdateManyWithoutTrainingJobNestedInput = {
    create?: XOR<AIModelRegistryCreateWithoutTrainingJobInput, AIModelRegistryUncheckedCreateWithoutTrainingJobInput> | AIModelRegistryCreateWithoutTrainingJobInput[] | AIModelRegistryUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AIModelRegistryCreateOrConnectWithoutTrainingJobInput | AIModelRegistryCreateOrConnectWithoutTrainingJobInput[]
    upsert?: AIModelRegistryUpsertWithWhereUniqueWithoutTrainingJobInput | AIModelRegistryUpsertWithWhereUniqueWithoutTrainingJobInput[]
    createMany?: AIModelRegistryCreateManyTrainingJobInputEnvelope
    set?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
    disconnect?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
    delete?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
    connect?: AIModelRegistryWhereUniqueInput | AIModelRegistryWhereUniqueInput[]
    update?: AIModelRegistryUpdateWithWhereUniqueWithoutTrainingJobInput | AIModelRegistryUpdateWithWhereUniqueWithoutTrainingJobInput[]
    updateMany?: AIModelRegistryUpdateManyWithWhereWithoutTrainingJobInput | AIModelRegistryUpdateManyWithWhereWithoutTrainingJobInput[]
    deleteMany?: AIModelRegistryScalarWhereInput | AIModelRegistryScalarWhereInput[]
  }

  export type AITrainingExperimentUncheckedUpdateManyWithoutTrainingJobNestedInput = {
    create?: XOR<AITrainingExperimentCreateWithoutTrainingJobInput, AITrainingExperimentUncheckedCreateWithoutTrainingJobInput> | AITrainingExperimentCreateWithoutTrainingJobInput[] | AITrainingExperimentUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AITrainingExperimentCreateOrConnectWithoutTrainingJobInput | AITrainingExperimentCreateOrConnectWithoutTrainingJobInput[]
    upsert?: AITrainingExperimentUpsertWithWhereUniqueWithoutTrainingJobInput | AITrainingExperimentUpsertWithWhereUniqueWithoutTrainingJobInput[]
    createMany?: AITrainingExperimentCreateManyTrainingJobInputEnvelope
    set?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
    disconnect?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
    delete?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
    connect?: AITrainingExperimentWhereUniqueInput | AITrainingExperimentWhereUniqueInput[]
    update?: AITrainingExperimentUpdateWithWhereUniqueWithoutTrainingJobInput | AITrainingExperimentUpdateWithWhereUniqueWithoutTrainingJobInput[]
    updateMany?: AITrainingExperimentUpdateManyWithWhereWithoutTrainingJobInput | AITrainingExperimentUpdateManyWithWhereWithoutTrainingJobInput[]
    deleteMany?: AITrainingExperimentScalarWhereInput | AITrainingExperimentScalarWhereInput[]
  }

  export type AITrainingCheckpointUncheckedUpdateManyWithoutTrainingJobNestedInput = {
    create?: XOR<AITrainingCheckpointCreateWithoutTrainingJobInput, AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput> | AITrainingCheckpointCreateWithoutTrainingJobInput[] | AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput[]
    connectOrCreate?: AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput | AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput[]
    upsert?: AITrainingCheckpointUpsertWithWhereUniqueWithoutTrainingJobInput | AITrainingCheckpointUpsertWithWhereUniqueWithoutTrainingJobInput[]
    createMany?: AITrainingCheckpointCreateManyTrainingJobInputEnvelope
    set?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    disconnect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    delete?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    connect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    update?: AITrainingCheckpointUpdateWithWhereUniqueWithoutTrainingJobInput | AITrainingCheckpointUpdateWithWhereUniqueWithoutTrainingJobInput[]
    updateMany?: AITrainingCheckpointUpdateManyWithWhereWithoutTrainingJobInput | AITrainingCheckpointUpdateManyWithWhereWithoutTrainingJobInput[]
    deleteMany?: AITrainingCheckpointScalarWhereInput | AITrainingCheckpointScalarWhereInput[]
  }

  export type AIModelRegistryCreateNestedOneWithoutEvaluationsInput = {
    create?: XOR<AIModelRegistryCreateWithoutEvaluationsInput, AIModelRegistryUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: AIModelRegistryCreateOrConnectWithoutEvaluationsInput
    connect?: AIModelRegistryWhereUniqueInput
  }

  export type AIModelRegistryUpdateOneRequiredWithoutEvaluationsNestedInput = {
    create?: XOR<AIModelRegistryCreateWithoutEvaluationsInput, AIModelRegistryUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: AIModelRegistryCreateOrConnectWithoutEvaluationsInput
    upsert?: AIModelRegistryUpsertWithoutEvaluationsInput
    connect?: AIModelRegistryWhereUniqueInput
    update?: XOR<XOR<AIModelRegistryUpdateToOneWithWhereWithoutEvaluationsInput, AIModelRegistryUpdateWithoutEvaluationsInput>, AIModelRegistryUncheckedUpdateWithoutEvaluationsInput>
  }

  export type AIModelRegistryCreateNestedOneWithoutPromotionInput = {
    create?: XOR<AIModelRegistryCreateWithoutPromotionInput, AIModelRegistryUncheckedCreateWithoutPromotionInput>
    connectOrCreate?: AIModelRegistryCreateOrConnectWithoutPromotionInput
    connect?: AIModelRegistryWhereUniqueInput
  }

  export type EnumAIModelPromotionStageFieldUpdateOperationsInput = {
    set?: $Enums.AIModelPromotionStage
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AIModelRegistryUpdateOneRequiredWithoutPromotionNestedInput = {
    create?: XOR<AIModelRegistryCreateWithoutPromotionInput, AIModelRegistryUncheckedCreateWithoutPromotionInput>
    connectOrCreate?: AIModelRegistryCreateOrConnectWithoutPromotionInput
    upsert?: AIModelRegistryUpsertWithoutPromotionInput
    connect?: AIModelRegistryWhereUniqueInput
    update?: XOR<XOR<AIModelRegistryUpdateToOneWithWhereWithoutPromotionInput, AIModelRegistryUpdateWithoutPromotionInput>, AIModelRegistryUncheckedUpdateWithoutPromotionInput>
  }

  export type AITrainingJobCreateNestedOneWithoutExperimentsInput = {
    create?: XOR<AITrainingJobCreateWithoutExperimentsInput, AITrainingJobUncheckedCreateWithoutExperimentsInput>
    connectOrCreate?: AITrainingJobCreateOrConnectWithoutExperimentsInput
    connect?: AITrainingJobWhereUniqueInput
  }

  export type AITrainingCheckpointCreateNestedManyWithoutExperimentInput = {
    create?: XOR<AITrainingCheckpointCreateWithoutExperimentInput, AITrainingCheckpointUncheckedCreateWithoutExperimentInput> | AITrainingCheckpointCreateWithoutExperimentInput[] | AITrainingCheckpointUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: AITrainingCheckpointCreateOrConnectWithoutExperimentInput | AITrainingCheckpointCreateOrConnectWithoutExperimentInput[]
    createMany?: AITrainingCheckpointCreateManyExperimentInputEnvelope
    connect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
  }

  export type AITrainingCheckpointUncheckedCreateNestedManyWithoutExperimentInput = {
    create?: XOR<AITrainingCheckpointCreateWithoutExperimentInput, AITrainingCheckpointUncheckedCreateWithoutExperimentInput> | AITrainingCheckpointCreateWithoutExperimentInput[] | AITrainingCheckpointUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: AITrainingCheckpointCreateOrConnectWithoutExperimentInput | AITrainingCheckpointCreateOrConnectWithoutExperimentInput[]
    createMany?: AITrainingCheckpointCreateManyExperimentInputEnvelope
    connect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
  }

  export type EnumAITrainingExperimentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AITrainingExperimentStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AITrainingJobUpdateOneRequiredWithoutExperimentsNestedInput = {
    create?: XOR<AITrainingJobCreateWithoutExperimentsInput, AITrainingJobUncheckedCreateWithoutExperimentsInput>
    connectOrCreate?: AITrainingJobCreateOrConnectWithoutExperimentsInput
    upsert?: AITrainingJobUpsertWithoutExperimentsInput
    connect?: AITrainingJobWhereUniqueInput
    update?: XOR<XOR<AITrainingJobUpdateToOneWithWhereWithoutExperimentsInput, AITrainingJobUpdateWithoutExperimentsInput>, AITrainingJobUncheckedUpdateWithoutExperimentsInput>
  }

  export type AITrainingCheckpointUpdateManyWithoutExperimentNestedInput = {
    create?: XOR<AITrainingCheckpointCreateWithoutExperimentInput, AITrainingCheckpointUncheckedCreateWithoutExperimentInput> | AITrainingCheckpointCreateWithoutExperimentInput[] | AITrainingCheckpointUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: AITrainingCheckpointCreateOrConnectWithoutExperimentInput | AITrainingCheckpointCreateOrConnectWithoutExperimentInput[]
    upsert?: AITrainingCheckpointUpsertWithWhereUniqueWithoutExperimentInput | AITrainingCheckpointUpsertWithWhereUniqueWithoutExperimentInput[]
    createMany?: AITrainingCheckpointCreateManyExperimentInputEnvelope
    set?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    disconnect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    delete?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    connect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    update?: AITrainingCheckpointUpdateWithWhereUniqueWithoutExperimentInput | AITrainingCheckpointUpdateWithWhereUniqueWithoutExperimentInput[]
    updateMany?: AITrainingCheckpointUpdateManyWithWhereWithoutExperimentInput | AITrainingCheckpointUpdateManyWithWhereWithoutExperimentInput[]
    deleteMany?: AITrainingCheckpointScalarWhereInput | AITrainingCheckpointScalarWhereInput[]
  }

  export type AITrainingCheckpointUncheckedUpdateManyWithoutExperimentNestedInput = {
    create?: XOR<AITrainingCheckpointCreateWithoutExperimentInput, AITrainingCheckpointUncheckedCreateWithoutExperimentInput> | AITrainingCheckpointCreateWithoutExperimentInput[] | AITrainingCheckpointUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: AITrainingCheckpointCreateOrConnectWithoutExperimentInput | AITrainingCheckpointCreateOrConnectWithoutExperimentInput[]
    upsert?: AITrainingCheckpointUpsertWithWhereUniqueWithoutExperimentInput | AITrainingCheckpointUpsertWithWhereUniqueWithoutExperimentInput[]
    createMany?: AITrainingCheckpointCreateManyExperimentInputEnvelope
    set?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    disconnect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    delete?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    connect?: AITrainingCheckpointWhereUniqueInput | AITrainingCheckpointWhereUniqueInput[]
    update?: AITrainingCheckpointUpdateWithWhereUniqueWithoutExperimentInput | AITrainingCheckpointUpdateWithWhereUniqueWithoutExperimentInput[]
    updateMany?: AITrainingCheckpointUpdateManyWithWhereWithoutExperimentInput | AITrainingCheckpointUpdateManyWithWhereWithoutExperimentInput[]
    deleteMany?: AITrainingCheckpointScalarWhereInput | AITrainingCheckpointScalarWhereInput[]
  }

  export type AITrainingJobCreateNestedOneWithoutCheckpointsInput = {
    create?: XOR<AITrainingJobCreateWithoutCheckpointsInput, AITrainingJobUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: AITrainingJobCreateOrConnectWithoutCheckpointsInput
    connect?: AITrainingJobWhereUniqueInput
  }

  export type AITrainingExperimentCreateNestedOneWithoutCheckpointsInput = {
    create?: XOR<AITrainingExperimentCreateWithoutCheckpointsInput, AITrainingExperimentUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: AITrainingExperimentCreateOrConnectWithoutCheckpointsInput
    connect?: AITrainingExperimentWhereUniqueInput
  }

  export type AITrainingJobUpdateOneRequiredWithoutCheckpointsNestedInput = {
    create?: XOR<AITrainingJobCreateWithoutCheckpointsInput, AITrainingJobUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: AITrainingJobCreateOrConnectWithoutCheckpointsInput
    upsert?: AITrainingJobUpsertWithoutCheckpointsInput
    connect?: AITrainingJobWhereUniqueInput
    update?: XOR<XOR<AITrainingJobUpdateToOneWithWhereWithoutCheckpointsInput, AITrainingJobUpdateWithoutCheckpointsInput>, AITrainingJobUncheckedUpdateWithoutCheckpointsInput>
  }

  export type AITrainingExperimentUpdateOneWithoutCheckpointsNestedInput = {
    create?: XOR<AITrainingExperimentCreateWithoutCheckpointsInput, AITrainingExperimentUncheckedCreateWithoutCheckpointsInput>
    connectOrCreate?: AITrainingExperimentCreateOrConnectWithoutCheckpointsInput
    upsert?: AITrainingExperimentUpsertWithoutCheckpointsInput
    disconnect?: AITrainingExperimentWhereInput | boolean
    delete?: AITrainingExperimentWhereInput | boolean
    connect?: AITrainingExperimentWhereUniqueInput
    update?: XOR<XOR<AITrainingExperimentUpdateToOneWithWhereWithoutCheckpointsInput, AITrainingExperimentUpdateWithoutCheckpointsInput>, AITrainingExperimentUncheckedUpdateWithoutCheckpointsInput>
  }

  export type AITrainingJobCreateNestedOneWithoutRegistryModelsInput = {
    create?: XOR<AITrainingJobCreateWithoutRegistryModelsInput, AITrainingJobUncheckedCreateWithoutRegistryModelsInput>
    connectOrCreate?: AITrainingJobCreateOrConnectWithoutRegistryModelsInput
    connect?: AITrainingJobWhereUniqueInput
  }

  export type AIModelEvaluationCreateNestedManyWithoutModelInput = {
    create?: XOR<AIModelEvaluationCreateWithoutModelInput, AIModelEvaluationUncheckedCreateWithoutModelInput> | AIModelEvaluationCreateWithoutModelInput[] | AIModelEvaluationUncheckedCreateWithoutModelInput[]
    connectOrCreate?: AIModelEvaluationCreateOrConnectWithoutModelInput | AIModelEvaluationCreateOrConnectWithoutModelInput[]
    createMany?: AIModelEvaluationCreateManyModelInputEnvelope
    connect?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
  }

  export type AIModelPromotionCreateNestedOneWithoutModelInput = {
    create?: XOR<AIModelPromotionCreateWithoutModelInput, AIModelPromotionUncheckedCreateWithoutModelInput>
    connectOrCreate?: AIModelPromotionCreateOrConnectWithoutModelInput
    connect?: AIModelPromotionWhereUniqueInput
  }

  export type AIModelEvaluationUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<AIModelEvaluationCreateWithoutModelInput, AIModelEvaluationUncheckedCreateWithoutModelInput> | AIModelEvaluationCreateWithoutModelInput[] | AIModelEvaluationUncheckedCreateWithoutModelInput[]
    connectOrCreate?: AIModelEvaluationCreateOrConnectWithoutModelInput | AIModelEvaluationCreateOrConnectWithoutModelInput[]
    createMany?: AIModelEvaluationCreateManyModelInputEnvelope
    connect?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
  }

  export type AIModelPromotionUncheckedCreateNestedOneWithoutModelInput = {
    create?: XOR<AIModelPromotionCreateWithoutModelInput, AIModelPromotionUncheckedCreateWithoutModelInput>
    connectOrCreate?: AIModelPromotionCreateOrConnectWithoutModelInput
    connect?: AIModelPromotionWhereUniqueInput
  }

  export type EnumAIModelRegistryStatusFieldUpdateOperationsInput = {
    set?: $Enums.AIModelRegistryStatus
  }

  export type AITrainingJobUpdateOneRequiredWithoutRegistryModelsNestedInput = {
    create?: XOR<AITrainingJobCreateWithoutRegistryModelsInput, AITrainingJobUncheckedCreateWithoutRegistryModelsInput>
    connectOrCreate?: AITrainingJobCreateOrConnectWithoutRegistryModelsInput
    upsert?: AITrainingJobUpsertWithoutRegistryModelsInput
    connect?: AITrainingJobWhereUniqueInput
    update?: XOR<XOR<AITrainingJobUpdateToOneWithWhereWithoutRegistryModelsInput, AITrainingJobUpdateWithoutRegistryModelsInput>, AITrainingJobUncheckedUpdateWithoutRegistryModelsInput>
  }

  export type AIModelEvaluationUpdateManyWithoutModelNestedInput = {
    create?: XOR<AIModelEvaluationCreateWithoutModelInput, AIModelEvaluationUncheckedCreateWithoutModelInput> | AIModelEvaluationCreateWithoutModelInput[] | AIModelEvaluationUncheckedCreateWithoutModelInput[]
    connectOrCreate?: AIModelEvaluationCreateOrConnectWithoutModelInput | AIModelEvaluationCreateOrConnectWithoutModelInput[]
    upsert?: AIModelEvaluationUpsertWithWhereUniqueWithoutModelInput | AIModelEvaluationUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: AIModelEvaluationCreateManyModelInputEnvelope
    set?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
    disconnect?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
    delete?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
    connect?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
    update?: AIModelEvaluationUpdateWithWhereUniqueWithoutModelInput | AIModelEvaluationUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: AIModelEvaluationUpdateManyWithWhereWithoutModelInput | AIModelEvaluationUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: AIModelEvaluationScalarWhereInput | AIModelEvaluationScalarWhereInput[]
  }

  export type AIModelPromotionUpdateOneWithoutModelNestedInput = {
    create?: XOR<AIModelPromotionCreateWithoutModelInput, AIModelPromotionUncheckedCreateWithoutModelInput>
    connectOrCreate?: AIModelPromotionCreateOrConnectWithoutModelInput
    upsert?: AIModelPromotionUpsertWithoutModelInput
    disconnect?: AIModelPromotionWhereInput | boolean
    delete?: AIModelPromotionWhereInput | boolean
    connect?: AIModelPromotionWhereUniqueInput
    update?: XOR<XOR<AIModelPromotionUpdateToOneWithWhereWithoutModelInput, AIModelPromotionUpdateWithoutModelInput>, AIModelPromotionUncheckedUpdateWithoutModelInput>
  }

  export type AIModelEvaluationUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<AIModelEvaluationCreateWithoutModelInput, AIModelEvaluationUncheckedCreateWithoutModelInput> | AIModelEvaluationCreateWithoutModelInput[] | AIModelEvaluationUncheckedCreateWithoutModelInput[]
    connectOrCreate?: AIModelEvaluationCreateOrConnectWithoutModelInput | AIModelEvaluationCreateOrConnectWithoutModelInput[]
    upsert?: AIModelEvaluationUpsertWithWhereUniqueWithoutModelInput | AIModelEvaluationUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: AIModelEvaluationCreateManyModelInputEnvelope
    set?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
    disconnect?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
    delete?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
    connect?: AIModelEvaluationWhereUniqueInput | AIModelEvaluationWhereUniqueInput[]
    update?: AIModelEvaluationUpdateWithWhereUniqueWithoutModelInput | AIModelEvaluationUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: AIModelEvaluationUpdateManyWithWhereWithoutModelInput | AIModelEvaluationUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: AIModelEvaluationScalarWhereInput | AIModelEvaluationScalarWhereInput[]
  }

  export type AIModelPromotionUncheckedUpdateOneWithoutModelNestedInput = {
    create?: XOR<AIModelPromotionCreateWithoutModelInput, AIModelPromotionUncheckedCreateWithoutModelInput>
    connectOrCreate?: AIModelPromotionCreateOrConnectWithoutModelInput
    upsert?: AIModelPromotionUpsertWithoutModelInput
    disconnect?: AIModelPromotionWhereInput | boolean
    delete?: AIModelPromotionWhereInput | boolean
    connect?: AIModelPromotionWhereUniqueInput
    update?: XOR<XOR<AIModelPromotionUpdateToOneWithWhereWithoutModelInput, AIModelPromotionUpdateWithoutModelInput>, AIModelPromotionUncheckedUpdateWithoutModelInput>
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

  export type NestedEnumAITrainingModelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingModelType | EnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingModelType[] | ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingModelType[] | ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingModelTypeFilter<$PrismaModel> | $Enums.AITrainingModelType
  }

  export type NestedEnumAITrainingProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingProvider | EnumAITrainingProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingProvider[] | ListEnumAITrainingProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingProvider[] | ListEnumAITrainingProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingProviderFilter<$PrismaModel> | $Enums.AITrainingProvider
  }

  export type NestedEnumAITrainingJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingJobStatus | EnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingJobStatus[] | ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingJobStatus[] | ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingJobStatusFilter<$PrismaModel> | $Enums.AITrainingJobStatus
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

  export type NestedEnumAITrainingModelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingModelType | EnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingModelType[] | ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingModelType[] | ListEnumAITrainingModelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingModelTypeWithAggregatesFilter<$PrismaModel> | $Enums.AITrainingModelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAITrainingModelTypeFilter<$PrismaModel>
    _max?: NestedEnumAITrainingModelTypeFilter<$PrismaModel>
  }

  export type NestedEnumAITrainingProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingProvider | EnumAITrainingProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingProvider[] | ListEnumAITrainingProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingProvider[] | ListEnumAITrainingProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingProviderWithAggregatesFilter<$PrismaModel> | $Enums.AITrainingProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAITrainingProviderFilter<$PrismaModel>
    _max?: NestedEnumAITrainingProviderFilter<$PrismaModel>
  }

  export type NestedEnumAITrainingJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingJobStatus | EnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingJobStatus[] | ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingJobStatus[] | ListEnumAITrainingJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.AITrainingJobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAITrainingJobStatusFilter<$PrismaModel>
    _max?: NestedEnumAITrainingJobStatusFilter<$PrismaModel>
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

  export type NestedEnumAIModelPromotionStageFilter<$PrismaModel = never> = {
    equals?: $Enums.AIModelPromotionStage | EnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    in?: $Enums.AIModelPromotionStage[] | ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIModelPromotionStage[] | ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    not?: NestedEnumAIModelPromotionStageFilter<$PrismaModel> | $Enums.AIModelPromotionStage
  }

  export type NestedEnumAIModelPromotionStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIModelPromotionStage | EnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    in?: $Enums.AIModelPromotionStage[] | ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIModelPromotionStage[] | ListEnumAIModelPromotionStageFieldRefInput<$PrismaModel>
    not?: NestedEnumAIModelPromotionStageWithAggregatesFilter<$PrismaModel> | $Enums.AIModelPromotionStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIModelPromotionStageFilter<$PrismaModel>
    _max?: NestedEnumAIModelPromotionStageFilter<$PrismaModel>
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

  export type NestedEnumAITrainingExperimentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingExperimentStatus | EnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingExperimentStatus[] | ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingExperimentStatus[] | ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingExperimentStatusFilter<$PrismaModel> | $Enums.AITrainingExperimentStatus
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

  export type NestedEnumAITrainingExperimentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AITrainingExperimentStatus | EnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AITrainingExperimentStatus[] | ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AITrainingExperimentStatus[] | ListEnumAITrainingExperimentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAITrainingExperimentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AITrainingExperimentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAITrainingExperimentStatusFilter<$PrismaModel>
    _max?: NestedEnumAITrainingExperimentStatusFilter<$PrismaModel>
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

  export type NestedEnumAIModelRegistryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AIModelRegistryStatus | EnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIModelRegistryStatus[] | ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIModelRegistryStatus[] | ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIModelRegistryStatusFilter<$PrismaModel> | $Enums.AIModelRegistryStatus
  }

  export type NestedEnumAIModelRegistryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIModelRegistryStatus | EnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIModelRegistryStatus[] | ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIModelRegistryStatus[] | ListEnumAIModelRegistryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIModelRegistryStatusWithAggregatesFilter<$PrismaModel> | $Enums.AIModelRegistryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIModelRegistryStatusFilter<$PrismaModel>
    _max?: NestedEnumAIModelRegistryStatusFilter<$PrismaModel>
  }

  export type AIModelRegistryCreateWithoutTrainingJobInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
    evaluations?: AIModelEvaluationCreateNestedManyWithoutModelInput
    promotion?: AIModelPromotionCreateNestedOneWithoutModelInput
  }

  export type AIModelRegistryUncheckedCreateWithoutTrainingJobInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
    evaluations?: AIModelEvaluationUncheckedCreateNestedManyWithoutModelInput
    promotion?: AIModelPromotionUncheckedCreateNestedOneWithoutModelInput
  }

  export type AIModelRegistryCreateOrConnectWithoutTrainingJobInput = {
    where: AIModelRegistryWhereUniqueInput
    create: XOR<AIModelRegistryCreateWithoutTrainingJobInput, AIModelRegistryUncheckedCreateWithoutTrainingJobInput>
  }

  export type AIModelRegistryCreateManyTrainingJobInputEnvelope = {
    data: AIModelRegistryCreateManyTrainingJobInput | AIModelRegistryCreateManyTrainingJobInput[]
    skipDuplicates?: boolean
  }

  export type AITrainingExperimentCreateWithoutTrainingJobInput = {
    id?: string
    tenantId: string
    experimentName: string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AITrainingExperimentStatus
    label?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    createdByUserId: string
    checkpoints?: AITrainingCheckpointCreateNestedManyWithoutExperimentInput
  }

  export type AITrainingExperimentUncheckedCreateWithoutTrainingJobInput = {
    id?: string
    tenantId: string
    experimentName: string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AITrainingExperimentStatus
    label?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    createdByUserId: string
    checkpoints?: AITrainingCheckpointUncheckedCreateNestedManyWithoutExperimentInput
  }

  export type AITrainingExperimentCreateOrConnectWithoutTrainingJobInput = {
    where: AITrainingExperimentWhereUniqueInput
    create: XOR<AITrainingExperimentCreateWithoutTrainingJobInput, AITrainingExperimentUncheckedCreateWithoutTrainingJobInput>
  }

  export type AITrainingExperimentCreateManyTrainingJobInputEnvelope = {
    data: AITrainingExperimentCreateManyTrainingJobInput | AITrainingExperimentCreateManyTrainingJobInput[]
    skipDuplicates?: boolean
  }

  export type AITrainingCheckpointCreateWithoutTrainingJobInput = {
    id?: string
    tenantId: string
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    experiment?: AITrainingExperimentCreateNestedOneWithoutCheckpointsInput
  }

  export type AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput = {
    id?: string
    tenantId: string
    experimentId?: string | null
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AITrainingCheckpointCreateOrConnectWithoutTrainingJobInput = {
    where: AITrainingCheckpointWhereUniqueInput
    create: XOR<AITrainingCheckpointCreateWithoutTrainingJobInput, AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput>
  }

  export type AITrainingCheckpointCreateManyTrainingJobInputEnvelope = {
    data: AITrainingCheckpointCreateManyTrainingJobInput | AITrainingCheckpointCreateManyTrainingJobInput[]
    skipDuplicates?: boolean
  }

  export type AIModelRegistryUpsertWithWhereUniqueWithoutTrainingJobInput = {
    where: AIModelRegistryWhereUniqueInput
    update: XOR<AIModelRegistryUpdateWithoutTrainingJobInput, AIModelRegistryUncheckedUpdateWithoutTrainingJobInput>
    create: XOR<AIModelRegistryCreateWithoutTrainingJobInput, AIModelRegistryUncheckedCreateWithoutTrainingJobInput>
  }

  export type AIModelRegistryUpdateWithWhereUniqueWithoutTrainingJobInput = {
    where: AIModelRegistryWhereUniqueInput
    data: XOR<AIModelRegistryUpdateWithoutTrainingJobInput, AIModelRegistryUncheckedUpdateWithoutTrainingJobInput>
  }

  export type AIModelRegistryUpdateManyWithWhereWithoutTrainingJobInput = {
    where: AIModelRegistryScalarWhereInput
    data: XOR<AIModelRegistryUpdateManyMutationInput, AIModelRegistryUncheckedUpdateManyWithoutTrainingJobInput>
  }

  export type AIModelRegistryScalarWhereInput = {
    AND?: AIModelRegistryScalarWhereInput | AIModelRegistryScalarWhereInput[]
    OR?: AIModelRegistryScalarWhereInput[]
    NOT?: AIModelRegistryScalarWhereInput | AIModelRegistryScalarWhereInput[]
    id?: StringFilter<"AIModelRegistry"> | string
    tenantId?: StringFilter<"AIModelRegistry"> | string
    modelName?: StringFilter<"AIModelRegistry"> | string
    version?: StringFilter<"AIModelRegistry"> | string
    baseModel?: StringFilter<"AIModelRegistry"> | string
    trainingJobId?: StringFilter<"AIModelRegistry"> | string
    trainingProvider?: EnumAITrainingProviderFilter<"AIModelRegistry"> | $Enums.AITrainingProvider
    fileLocation?: StringFilter<"AIModelRegistry"> | string
    metadata?: JsonFilter<"AIModelRegistry">
    status?: EnumAIModelRegistryStatusFilter<"AIModelRegistry"> | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFilter<"AIModelRegistry"> | Date | string
  }

  export type AITrainingExperimentUpsertWithWhereUniqueWithoutTrainingJobInput = {
    where: AITrainingExperimentWhereUniqueInput
    update: XOR<AITrainingExperimentUpdateWithoutTrainingJobInput, AITrainingExperimentUncheckedUpdateWithoutTrainingJobInput>
    create: XOR<AITrainingExperimentCreateWithoutTrainingJobInput, AITrainingExperimentUncheckedCreateWithoutTrainingJobInput>
  }

  export type AITrainingExperimentUpdateWithWhereUniqueWithoutTrainingJobInput = {
    where: AITrainingExperimentWhereUniqueInput
    data: XOR<AITrainingExperimentUpdateWithoutTrainingJobInput, AITrainingExperimentUncheckedUpdateWithoutTrainingJobInput>
  }

  export type AITrainingExperimentUpdateManyWithWhereWithoutTrainingJobInput = {
    where: AITrainingExperimentScalarWhereInput
    data: XOR<AITrainingExperimentUpdateManyMutationInput, AITrainingExperimentUncheckedUpdateManyWithoutTrainingJobInput>
  }

  export type AITrainingExperimentScalarWhereInput = {
    AND?: AITrainingExperimentScalarWhereInput | AITrainingExperimentScalarWhereInput[]
    OR?: AITrainingExperimentScalarWhereInput[]
    NOT?: AITrainingExperimentScalarWhereInput | AITrainingExperimentScalarWhereInput[]
    id?: StringFilter<"AITrainingExperiment"> | string
    tenantId?: StringFilter<"AITrainingExperiment"> | string
    trainingJobId?: StringFilter<"AITrainingExperiment"> | string
    experimentName?: StringFilter<"AITrainingExperiment"> | string
    hyperparameters?: JsonFilter<"AITrainingExperiment">
    metrics?: JsonFilter<"AITrainingExperiment">
    trainingCurve?: JsonFilter<"AITrainingExperiment">
    status?: EnumAITrainingExperimentStatusFilter<"AITrainingExperiment"> | $Enums.AITrainingExperimentStatus
    label?: StringNullableFilter<"AITrainingExperiment"> | string | null
    startedAt?: DateTimeFilter<"AITrainingExperiment"> | Date | string
    finishedAt?: DateTimeNullableFilter<"AITrainingExperiment"> | Date | string | null
    createdByUserId?: StringFilter<"AITrainingExperiment"> | string
  }

  export type AITrainingCheckpointUpsertWithWhereUniqueWithoutTrainingJobInput = {
    where: AITrainingCheckpointWhereUniqueInput
    update: XOR<AITrainingCheckpointUpdateWithoutTrainingJobInput, AITrainingCheckpointUncheckedUpdateWithoutTrainingJobInput>
    create: XOR<AITrainingCheckpointCreateWithoutTrainingJobInput, AITrainingCheckpointUncheckedCreateWithoutTrainingJobInput>
  }

  export type AITrainingCheckpointUpdateWithWhereUniqueWithoutTrainingJobInput = {
    where: AITrainingCheckpointWhereUniqueInput
    data: XOR<AITrainingCheckpointUpdateWithoutTrainingJobInput, AITrainingCheckpointUncheckedUpdateWithoutTrainingJobInput>
  }

  export type AITrainingCheckpointUpdateManyWithWhereWithoutTrainingJobInput = {
    where: AITrainingCheckpointScalarWhereInput
    data: XOR<AITrainingCheckpointUpdateManyMutationInput, AITrainingCheckpointUncheckedUpdateManyWithoutTrainingJobInput>
  }

  export type AITrainingCheckpointScalarWhereInput = {
    AND?: AITrainingCheckpointScalarWhereInput | AITrainingCheckpointScalarWhereInput[]
    OR?: AITrainingCheckpointScalarWhereInput[]
    NOT?: AITrainingCheckpointScalarWhereInput | AITrainingCheckpointScalarWhereInput[]
    id?: StringFilter<"AITrainingCheckpoint"> | string
    tenantId?: StringFilter<"AITrainingCheckpoint"> | string
    trainingJobId?: StringFilter<"AITrainingCheckpoint"> | string
    experimentId?: StringNullableFilter<"AITrainingCheckpoint"> | string | null
    checkpointNumber?: IntFilter<"AITrainingCheckpoint"> | number
    fileLocation?: StringFilter<"AITrainingCheckpoint"> | string
    metricsSnapshot?: JsonFilter<"AITrainingCheckpoint">
    createdAt?: DateTimeFilter<"AITrainingCheckpoint"> | Date | string
  }

  export type AIModelRegistryCreateWithoutEvaluationsInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
    trainingJob: AITrainingJobCreateNestedOneWithoutRegistryModelsInput
    promotion?: AIModelPromotionCreateNestedOneWithoutModelInput
  }

  export type AIModelRegistryUncheckedCreateWithoutEvaluationsInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingJobId: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
    promotion?: AIModelPromotionUncheckedCreateNestedOneWithoutModelInput
  }

  export type AIModelRegistryCreateOrConnectWithoutEvaluationsInput = {
    where: AIModelRegistryWhereUniqueInput
    create: XOR<AIModelRegistryCreateWithoutEvaluationsInput, AIModelRegistryUncheckedCreateWithoutEvaluationsInput>
  }

  export type AIModelRegistryUpsertWithoutEvaluationsInput = {
    update: XOR<AIModelRegistryUpdateWithoutEvaluationsInput, AIModelRegistryUncheckedUpdateWithoutEvaluationsInput>
    create: XOR<AIModelRegistryCreateWithoutEvaluationsInput, AIModelRegistryUncheckedCreateWithoutEvaluationsInput>
    where?: AIModelRegistryWhereInput
  }

  export type AIModelRegistryUpdateToOneWithWhereWithoutEvaluationsInput = {
    where?: AIModelRegistryWhereInput
    data: XOR<AIModelRegistryUpdateWithoutEvaluationsInput, AIModelRegistryUncheckedUpdateWithoutEvaluationsInput>
  }

  export type AIModelRegistryUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingJob?: AITrainingJobUpdateOneRequiredWithoutRegistryModelsNestedInput
    promotion?: AIModelPromotionUpdateOneWithoutModelNestedInput
  }

  export type AIModelRegistryUncheckedUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    promotion?: AIModelPromotionUncheckedUpdateOneWithoutModelNestedInput
  }

  export type AIModelRegistryCreateWithoutPromotionInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
    trainingJob: AITrainingJobCreateNestedOneWithoutRegistryModelsInput
    evaluations?: AIModelEvaluationCreateNestedManyWithoutModelInput
  }

  export type AIModelRegistryUncheckedCreateWithoutPromotionInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingJobId: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
    evaluations?: AIModelEvaluationUncheckedCreateNestedManyWithoutModelInput
  }

  export type AIModelRegistryCreateOrConnectWithoutPromotionInput = {
    where: AIModelRegistryWhereUniqueInput
    create: XOR<AIModelRegistryCreateWithoutPromotionInput, AIModelRegistryUncheckedCreateWithoutPromotionInput>
  }

  export type AIModelRegistryUpsertWithoutPromotionInput = {
    update: XOR<AIModelRegistryUpdateWithoutPromotionInput, AIModelRegistryUncheckedUpdateWithoutPromotionInput>
    create: XOR<AIModelRegistryCreateWithoutPromotionInput, AIModelRegistryUncheckedCreateWithoutPromotionInput>
    where?: AIModelRegistryWhereInput
  }

  export type AIModelRegistryUpdateToOneWithWhereWithoutPromotionInput = {
    where?: AIModelRegistryWhereInput
    data: XOR<AIModelRegistryUpdateWithoutPromotionInput, AIModelRegistryUncheckedUpdateWithoutPromotionInput>
  }

  export type AIModelRegistryUpdateWithoutPromotionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingJob?: AITrainingJobUpdateOneRequiredWithoutRegistryModelsNestedInput
    evaluations?: AIModelEvaluationUpdateManyWithoutModelNestedInput
  }

  export type AIModelRegistryUncheckedUpdateWithoutPromotionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: AIModelEvaluationUncheckedUpdateManyWithoutModelNestedInput
  }

  export type AITrainingJobCreateWithoutExperimentsInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    registryModels?: AIModelRegistryCreateNestedManyWithoutTrainingJobInput
    checkpoints?: AITrainingCheckpointCreateNestedManyWithoutTrainingJobInput
  }

  export type AITrainingJobUncheckedCreateWithoutExperimentsInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    registryModels?: AIModelRegistryUncheckedCreateNestedManyWithoutTrainingJobInput
    checkpoints?: AITrainingCheckpointUncheckedCreateNestedManyWithoutTrainingJobInput
  }

  export type AITrainingJobCreateOrConnectWithoutExperimentsInput = {
    where: AITrainingJobWhereUniqueInput
    create: XOR<AITrainingJobCreateWithoutExperimentsInput, AITrainingJobUncheckedCreateWithoutExperimentsInput>
  }

  export type AITrainingCheckpointCreateWithoutExperimentInput = {
    id?: string
    tenantId: string
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    trainingJob: AITrainingJobCreateNestedOneWithoutCheckpointsInput
  }

  export type AITrainingCheckpointUncheckedCreateWithoutExperimentInput = {
    id?: string
    tenantId: string
    trainingJobId: string
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AITrainingCheckpointCreateOrConnectWithoutExperimentInput = {
    where: AITrainingCheckpointWhereUniqueInput
    create: XOR<AITrainingCheckpointCreateWithoutExperimentInput, AITrainingCheckpointUncheckedCreateWithoutExperimentInput>
  }

  export type AITrainingCheckpointCreateManyExperimentInputEnvelope = {
    data: AITrainingCheckpointCreateManyExperimentInput | AITrainingCheckpointCreateManyExperimentInput[]
    skipDuplicates?: boolean
  }

  export type AITrainingJobUpsertWithoutExperimentsInput = {
    update: XOR<AITrainingJobUpdateWithoutExperimentsInput, AITrainingJobUncheckedUpdateWithoutExperimentsInput>
    create: XOR<AITrainingJobCreateWithoutExperimentsInput, AITrainingJobUncheckedCreateWithoutExperimentsInput>
    where?: AITrainingJobWhereInput
  }

  export type AITrainingJobUpdateToOneWithWhereWithoutExperimentsInput = {
    where?: AITrainingJobWhereInput
    data: XOR<AITrainingJobUpdateWithoutExperimentsInput, AITrainingJobUncheckedUpdateWithoutExperimentsInput>
  }

  export type AITrainingJobUpdateWithoutExperimentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registryModels?: AIModelRegistryUpdateManyWithoutTrainingJobNestedInput
    checkpoints?: AITrainingCheckpointUpdateManyWithoutTrainingJobNestedInput
  }

  export type AITrainingJobUncheckedUpdateWithoutExperimentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registryModels?: AIModelRegistryUncheckedUpdateManyWithoutTrainingJobNestedInput
    checkpoints?: AITrainingCheckpointUncheckedUpdateManyWithoutTrainingJobNestedInput
  }

  export type AITrainingCheckpointUpsertWithWhereUniqueWithoutExperimentInput = {
    where: AITrainingCheckpointWhereUniqueInput
    update: XOR<AITrainingCheckpointUpdateWithoutExperimentInput, AITrainingCheckpointUncheckedUpdateWithoutExperimentInput>
    create: XOR<AITrainingCheckpointCreateWithoutExperimentInput, AITrainingCheckpointUncheckedCreateWithoutExperimentInput>
  }

  export type AITrainingCheckpointUpdateWithWhereUniqueWithoutExperimentInput = {
    where: AITrainingCheckpointWhereUniqueInput
    data: XOR<AITrainingCheckpointUpdateWithoutExperimentInput, AITrainingCheckpointUncheckedUpdateWithoutExperimentInput>
  }

  export type AITrainingCheckpointUpdateManyWithWhereWithoutExperimentInput = {
    where: AITrainingCheckpointScalarWhereInput
    data: XOR<AITrainingCheckpointUpdateManyMutationInput, AITrainingCheckpointUncheckedUpdateManyWithoutExperimentInput>
  }

  export type AITrainingJobCreateWithoutCheckpointsInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    registryModels?: AIModelRegistryCreateNestedManyWithoutTrainingJobInput
    experiments?: AITrainingExperimentCreateNestedManyWithoutTrainingJobInput
  }

  export type AITrainingJobUncheckedCreateWithoutCheckpointsInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    registryModels?: AIModelRegistryUncheckedCreateNestedManyWithoutTrainingJobInput
    experiments?: AITrainingExperimentUncheckedCreateNestedManyWithoutTrainingJobInput
  }

  export type AITrainingJobCreateOrConnectWithoutCheckpointsInput = {
    where: AITrainingJobWhereUniqueInput
    create: XOR<AITrainingJobCreateWithoutCheckpointsInput, AITrainingJobUncheckedCreateWithoutCheckpointsInput>
  }

  export type AITrainingExperimentCreateWithoutCheckpointsInput = {
    id?: string
    tenantId: string
    experimentName: string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AITrainingExperimentStatus
    label?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    createdByUserId: string
    trainingJob: AITrainingJobCreateNestedOneWithoutExperimentsInput
  }

  export type AITrainingExperimentUncheckedCreateWithoutCheckpointsInput = {
    id?: string
    tenantId: string
    trainingJobId: string
    experimentName: string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AITrainingExperimentStatus
    label?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    createdByUserId: string
  }

  export type AITrainingExperimentCreateOrConnectWithoutCheckpointsInput = {
    where: AITrainingExperimentWhereUniqueInput
    create: XOR<AITrainingExperimentCreateWithoutCheckpointsInput, AITrainingExperimentUncheckedCreateWithoutCheckpointsInput>
  }

  export type AITrainingJobUpsertWithoutCheckpointsInput = {
    update: XOR<AITrainingJobUpdateWithoutCheckpointsInput, AITrainingJobUncheckedUpdateWithoutCheckpointsInput>
    create: XOR<AITrainingJobCreateWithoutCheckpointsInput, AITrainingJobUncheckedCreateWithoutCheckpointsInput>
    where?: AITrainingJobWhereInput
  }

  export type AITrainingJobUpdateToOneWithWhereWithoutCheckpointsInput = {
    where?: AITrainingJobWhereInput
    data: XOR<AITrainingJobUpdateWithoutCheckpointsInput, AITrainingJobUncheckedUpdateWithoutCheckpointsInput>
  }

  export type AITrainingJobUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registryModels?: AIModelRegistryUpdateManyWithoutTrainingJobNestedInput
    experiments?: AITrainingExperimentUpdateManyWithoutTrainingJobNestedInput
  }

  export type AITrainingJobUncheckedUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registryModels?: AIModelRegistryUncheckedUpdateManyWithoutTrainingJobNestedInput
    experiments?: AITrainingExperimentUncheckedUpdateManyWithoutTrainingJobNestedInput
  }

  export type AITrainingExperimentUpsertWithoutCheckpointsInput = {
    update: XOR<AITrainingExperimentUpdateWithoutCheckpointsInput, AITrainingExperimentUncheckedUpdateWithoutCheckpointsInput>
    create: XOR<AITrainingExperimentCreateWithoutCheckpointsInput, AITrainingExperimentUncheckedCreateWithoutCheckpointsInput>
    where?: AITrainingExperimentWhereInput
  }

  export type AITrainingExperimentUpdateToOneWithWhereWithoutCheckpointsInput = {
    where?: AITrainingExperimentWhereInput
    data: XOR<AITrainingExperimentUpdateWithoutCheckpointsInput, AITrainingExperimentUncheckedUpdateWithoutCheckpointsInput>
  }

  export type AITrainingExperimentUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    trainingJob?: AITrainingJobUpdateOneRequiredWithoutExperimentsNestedInput
  }

  export type AITrainingExperimentUncheckedUpdateWithoutCheckpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type AITrainingJobCreateWithoutRegistryModelsInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    experiments?: AITrainingExperimentCreateNestedManyWithoutTrainingJobInput
    checkpoints?: AITrainingCheckpointCreateNestedManyWithoutTrainingJobInput
  }

  export type AITrainingJobUncheckedCreateWithoutRegistryModelsInput = {
    id?: string
    tenantId: string
    datasetId: string
    datasetVersionId: string
    modelType: $Enums.AITrainingModelType
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    status?: $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: string | null
    trainingFileLocation?: string | null
    outputModelId?: string | null
    resumeCheckpointId?: string | null
    createdByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    experiments?: AITrainingExperimentUncheckedCreateNestedManyWithoutTrainingJobInput
    checkpoints?: AITrainingCheckpointUncheckedCreateNestedManyWithoutTrainingJobInput
  }

  export type AITrainingJobCreateOrConnectWithoutRegistryModelsInput = {
    where: AITrainingJobWhereUniqueInput
    create: XOR<AITrainingJobCreateWithoutRegistryModelsInput, AITrainingJobUncheckedCreateWithoutRegistryModelsInput>
  }

  export type AIModelEvaluationCreateWithoutModelInput = {
    id?: string
    tenantId: string
    datasetId: string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIModelEvaluationUncheckedCreateWithoutModelInput = {
    id?: string
    tenantId: string
    datasetId: string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIModelEvaluationCreateOrConnectWithoutModelInput = {
    where: AIModelEvaluationWhereUniqueInput
    create: XOR<AIModelEvaluationCreateWithoutModelInput, AIModelEvaluationUncheckedCreateWithoutModelInput>
  }

  export type AIModelEvaluationCreateManyModelInputEnvelope = {
    data: AIModelEvaluationCreateManyModelInput | AIModelEvaluationCreateManyModelInput[]
    skipDuplicates?: boolean
  }

  export type AIModelPromotionCreateWithoutModelInput = {
    id?: string
    tenantId: string
    stage?: $Enums.AIModelPromotionStage
    rolloutPercentage?: number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIModelPromotionUncheckedCreateWithoutModelInput = {
    id?: string
    tenantId: string
    stage?: $Enums.AIModelPromotionStage
    rolloutPercentage?: number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIModelPromotionCreateOrConnectWithoutModelInput = {
    where: AIModelPromotionWhereUniqueInput
    create: XOR<AIModelPromotionCreateWithoutModelInput, AIModelPromotionUncheckedCreateWithoutModelInput>
  }

  export type AITrainingJobUpsertWithoutRegistryModelsInput = {
    update: XOR<AITrainingJobUpdateWithoutRegistryModelsInput, AITrainingJobUncheckedUpdateWithoutRegistryModelsInput>
    create: XOR<AITrainingJobCreateWithoutRegistryModelsInput, AITrainingJobUncheckedCreateWithoutRegistryModelsInput>
    where?: AITrainingJobWhereInput
  }

  export type AITrainingJobUpdateToOneWithWhereWithoutRegistryModelsInput = {
    where?: AITrainingJobWhereInput
    data: XOR<AITrainingJobUpdateWithoutRegistryModelsInput, AITrainingJobUncheckedUpdateWithoutRegistryModelsInput>
  }

  export type AITrainingJobUpdateWithoutRegistryModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiments?: AITrainingExperimentUpdateManyWithoutTrainingJobNestedInput
    checkpoints?: AITrainingCheckpointUpdateManyWithoutTrainingJobNestedInput
  }

  export type AITrainingJobUncheckedUpdateWithoutRegistryModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    datasetVersionId?: StringFieldUpdateOperationsInput | string
    modelType?: EnumAITrainingModelTypeFieldUpdateOperationsInput | $Enums.AITrainingModelType
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    status?: EnumAITrainingJobStatusFieldUpdateOperationsInput | $Enums.AITrainingJobStatus
    hyperparameters?: JsonNullValueInput | InputJsonValue
    trainingConfig?: JsonNullValueInput | InputJsonValue
    logs?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    providerJobId?: NullableStringFieldUpdateOperationsInput | string | null
    trainingFileLocation?: NullableStringFieldUpdateOperationsInput | string | null
    outputModelId?: NullableStringFieldUpdateOperationsInput | string | null
    resumeCheckpointId?: NullableStringFieldUpdateOperationsInput | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiments?: AITrainingExperimentUncheckedUpdateManyWithoutTrainingJobNestedInput
    checkpoints?: AITrainingCheckpointUncheckedUpdateManyWithoutTrainingJobNestedInput
  }

  export type AIModelEvaluationUpsertWithWhereUniqueWithoutModelInput = {
    where: AIModelEvaluationWhereUniqueInput
    update: XOR<AIModelEvaluationUpdateWithoutModelInput, AIModelEvaluationUncheckedUpdateWithoutModelInput>
    create: XOR<AIModelEvaluationCreateWithoutModelInput, AIModelEvaluationUncheckedCreateWithoutModelInput>
  }

  export type AIModelEvaluationUpdateWithWhereUniqueWithoutModelInput = {
    where: AIModelEvaluationWhereUniqueInput
    data: XOR<AIModelEvaluationUpdateWithoutModelInput, AIModelEvaluationUncheckedUpdateWithoutModelInput>
  }

  export type AIModelEvaluationUpdateManyWithWhereWithoutModelInput = {
    where: AIModelEvaluationScalarWhereInput
    data: XOR<AIModelEvaluationUpdateManyMutationInput, AIModelEvaluationUncheckedUpdateManyWithoutModelInput>
  }

  export type AIModelEvaluationScalarWhereInput = {
    AND?: AIModelEvaluationScalarWhereInput | AIModelEvaluationScalarWhereInput[]
    OR?: AIModelEvaluationScalarWhereInput[]
    NOT?: AIModelEvaluationScalarWhereInput | AIModelEvaluationScalarWhereInput[]
    id?: StringFilter<"AIModelEvaluation"> | string
    tenantId?: StringFilter<"AIModelEvaluation"> | string
    modelId?: StringFilter<"AIModelEvaluation"> | string
    datasetId?: StringFilter<"AIModelEvaluation"> | string
    metrics?: JsonFilter<"AIModelEvaluation">
    evaluationReport?: JsonFilter<"AIModelEvaluation">
    createdAt?: DateTimeFilter<"AIModelEvaluation"> | Date | string
  }

  export type AIModelPromotionUpsertWithoutModelInput = {
    update: XOR<AIModelPromotionUpdateWithoutModelInput, AIModelPromotionUncheckedUpdateWithoutModelInput>
    create: XOR<AIModelPromotionCreateWithoutModelInput, AIModelPromotionUncheckedCreateWithoutModelInput>
    where?: AIModelPromotionWhereInput
  }

  export type AIModelPromotionUpdateToOneWithWhereWithoutModelInput = {
    where?: AIModelPromotionWhereInput
    data: XOR<AIModelPromotionUpdateWithoutModelInput, AIModelPromotionUncheckedUpdateWithoutModelInput>
  }

  export type AIModelPromotionUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stage?: EnumAIModelPromotionStageFieldUpdateOperationsInput | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntFieldUpdateOperationsInput | number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelPromotionUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    stage?: EnumAIModelPromotionStageFieldUpdateOperationsInput | $Enums.AIModelPromotionStage
    rolloutPercentage?: IntFieldUpdateOperationsInput | number
    canaryHistory?: JsonNullValueInput | InputJsonValue
    promotedByUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelRegistryCreateManyTrainingJobInput = {
    id?: string
    tenantId: string
    modelName: string
    version: string
    baseModel: string
    trainingProvider: $Enums.AITrainingProvider
    fileLocation: string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIModelRegistryStatus
    createdAt?: Date | string
  }

  export type AITrainingExperimentCreateManyTrainingJobInput = {
    id?: string
    tenantId: string
    experimentName: string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AITrainingExperimentStatus
    label?: string | null
    startedAt?: Date | string
    finishedAt?: Date | string | null
    createdByUserId: string
  }

  export type AITrainingCheckpointCreateManyTrainingJobInput = {
    id?: string
    tenantId: string
    experimentId?: string | null
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIModelRegistryUpdateWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: AIModelEvaluationUpdateManyWithoutModelNestedInput
    promotion?: AIModelPromotionUpdateOneWithoutModelNestedInput
  }

  export type AIModelRegistryUncheckedUpdateWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: AIModelEvaluationUncheckedUpdateManyWithoutModelNestedInput
    promotion?: AIModelPromotionUncheckedUpdateOneWithoutModelNestedInput
  }

  export type AIModelRegistryUncheckedUpdateManyWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    baseModel?: StringFieldUpdateOperationsInput | string
    trainingProvider?: EnumAITrainingProviderFieldUpdateOperationsInput | $Enums.AITrainingProvider
    fileLocation?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    status?: EnumAIModelRegistryStatusFieldUpdateOperationsInput | $Enums.AIModelRegistryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITrainingExperimentUpdateWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    checkpoints?: AITrainingCheckpointUpdateManyWithoutExperimentNestedInput
  }

  export type AITrainingExperimentUncheckedUpdateWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
    checkpoints?: AITrainingCheckpointUncheckedUpdateManyWithoutExperimentNestedInput
  }

  export type AITrainingExperimentUncheckedUpdateManyWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    experimentName?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    trainingCurve?: JsonNullValueInput | InputJsonValue
    status?: EnumAITrainingExperimentStatusFieldUpdateOperationsInput | $Enums.AITrainingExperimentStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type AITrainingCheckpointUpdateWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiment?: AITrainingExperimentUpdateOneWithoutCheckpointsNestedInput
  }

  export type AITrainingCheckpointUncheckedUpdateWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    experimentId?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITrainingCheckpointUncheckedUpdateManyWithoutTrainingJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    experimentId?: NullableStringFieldUpdateOperationsInput | string | null
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITrainingCheckpointCreateManyExperimentInput = {
    id?: string
    tenantId: string
    trainingJobId: string
    checkpointNumber: number
    fileLocation: string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AITrainingCheckpointUpdateWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingJob?: AITrainingJobUpdateOneRequiredWithoutCheckpointsNestedInput
  }

  export type AITrainingCheckpointUncheckedUpdateWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AITrainingCheckpointUncheckedUpdateManyWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    trainingJobId?: StringFieldUpdateOperationsInput | string
    checkpointNumber?: IntFieldUpdateOperationsInput | number
    fileLocation?: StringFieldUpdateOperationsInput | string
    metricsSnapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelEvaluationCreateManyModelInput = {
    id?: string
    tenantId: string
    datasetId: string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIModelEvaluationUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelEvaluationUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelEvaluationUncheckedUpdateManyWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    metrics?: JsonNullValueInput | InputJsonValue
    evaluationReport?: JsonNullValueInput | InputJsonValue
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