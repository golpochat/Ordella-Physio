
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
 * Model FeatureFlag
 * 
 */
export type FeatureFlag = $Result.DefaultSelection<Prisma.$FeatureFlagPayload>
/**
 * Model Experiment
 * 
 */
export type Experiment = $Result.DefaultSelection<Prisma.$ExperimentPayload>
/**
 * Model ExperimentAssignment
 * 
 */
export type ExperimentAssignment = $Result.DefaultSelection<Prisma.$ExperimentAssignmentPayload>
/**
 * Model ExperimentEvent
 * 
 */
export type ExperimentEvent = $Result.DefaultSelection<Prisma.$ExperimentEventPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FeatureFlagType: {
  BOOLEAN: 'BOOLEAN',
  PERCENTAGE: 'PERCENTAGE',
  VARIANT: 'VARIANT'
};

export type FeatureFlagType = (typeof FeatureFlagType)[keyof typeof FeatureFlagType]


export const ExperimentStatus: {
  DRAFT: 'DRAFT',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

export type ExperimentStatus = (typeof ExperimentStatus)[keyof typeof ExperimentStatus]

}

export type FeatureFlagType = $Enums.FeatureFlagType

export const FeatureFlagType: typeof $Enums.FeatureFlagType

export type ExperimentStatus = $Enums.ExperimentStatus

export const ExperimentStatus: typeof $Enums.ExperimentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FeatureFlags
 * const featureFlags = await prisma.featureFlag.findMany()
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
   * // Fetch zero or more FeatureFlags
   * const featureFlags = await prisma.featureFlag.findMany()
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
   * `prisma.featureFlag`: Exposes CRUD operations for the **FeatureFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeatureFlags
    * const featureFlags = await prisma.featureFlag.findMany()
    * ```
    */
  get featureFlag(): Prisma.FeatureFlagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experiment`: Exposes CRUD operations for the **Experiment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Experiments
    * const experiments = await prisma.experiment.findMany()
    * ```
    */
  get experiment(): Prisma.ExperimentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experimentAssignment`: Exposes CRUD operations for the **ExperimentAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExperimentAssignments
    * const experimentAssignments = await prisma.experimentAssignment.findMany()
    * ```
    */
  get experimentAssignment(): Prisma.ExperimentAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experimentEvent`: Exposes CRUD operations for the **ExperimentEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExperimentEvents
    * const experimentEvents = await prisma.experimentEvent.findMany()
    * ```
    */
  get experimentEvent(): Prisma.ExperimentEventDelegate<ExtArgs, ClientOptions>;
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
    FeatureFlag: 'FeatureFlag',
    Experiment: 'Experiment',
    ExperimentAssignment: 'ExperimentAssignment',
    ExperimentEvent: 'ExperimentEvent'
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
      modelProps: "featureFlag" | "experiment" | "experimentAssignment" | "experimentEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Experiment: {
        payload: Prisma.$ExperimentPayload<ExtArgs>
        fields: Prisma.ExperimentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExperimentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExperimentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          findFirst: {
            args: Prisma.ExperimentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExperimentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          findMany: {
            args: Prisma.ExperimentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>[]
          }
          create: {
            args: Prisma.ExperimentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          createMany: {
            args: Prisma.ExperimentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExperimentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>[]
          }
          delete: {
            args: Prisma.ExperimentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          update: {
            args: Prisma.ExperimentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          deleteMany: {
            args: Prisma.ExperimentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExperimentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExperimentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>[]
          }
          upsert: {
            args: Prisma.ExperimentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentPayload>
          }
          aggregate: {
            args: Prisma.ExperimentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExperiment>
          }
          groupBy: {
            args: Prisma.ExperimentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExperimentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExperimentCountArgs<ExtArgs>
            result: $Utils.Optional<ExperimentCountAggregateOutputType> | number
          }
        }
      }
      ExperimentAssignment: {
        payload: Prisma.$ExperimentAssignmentPayload<ExtArgs>
        fields: Prisma.ExperimentAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExperimentAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExperimentAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>
          }
          findFirst: {
            args: Prisma.ExperimentAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExperimentAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>
          }
          findMany: {
            args: Prisma.ExperimentAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>[]
          }
          create: {
            args: Prisma.ExperimentAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>
          }
          createMany: {
            args: Prisma.ExperimentAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExperimentAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>[]
          }
          delete: {
            args: Prisma.ExperimentAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>
          }
          update: {
            args: Prisma.ExperimentAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.ExperimentAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExperimentAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExperimentAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.ExperimentAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentAssignmentPayload>
          }
          aggregate: {
            args: Prisma.ExperimentAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExperimentAssignment>
          }
          groupBy: {
            args: Prisma.ExperimentAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExperimentAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExperimentAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<ExperimentAssignmentCountAggregateOutputType> | number
          }
        }
      }
      ExperimentEvent: {
        payload: Prisma.$ExperimentEventPayload<ExtArgs>
        fields: Prisma.ExperimentEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExperimentEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExperimentEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>
          }
          findFirst: {
            args: Prisma.ExperimentEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExperimentEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>
          }
          findMany: {
            args: Prisma.ExperimentEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>[]
          }
          create: {
            args: Prisma.ExperimentEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>
          }
          createMany: {
            args: Prisma.ExperimentEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExperimentEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>[]
          }
          delete: {
            args: Prisma.ExperimentEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>
          }
          update: {
            args: Prisma.ExperimentEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>
          }
          deleteMany: {
            args: Prisma.ExperimentEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExperimentEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExperimentEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>[]
          }
          upsert: {
            args: Prisma.ExperimentEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExperimentEventPayload>
          }
          aggregate: {
            args: Prisma.ExperimentEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExperimentEvent>
          }
          groupBy: {
            args: Prisma.ExperimentEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExperimentEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExperimentEventCountArgs<ExtArgs>
            result: $Utils.Optional<ExperimentEventCountAggregateOutputType> | number
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
    featureFlag?: FeatureFlagOmit
    experiment?: ExperimentOmit
    experimentAssignment?: ExperimentAssignmentOmit
    experimentEvent?: ExperimentEventOmit
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
   * Count Type ExperimentCountOutputType
   */

  export type ExperimentCountOutputType = {
    assignments: number
    events: number
  }

  export type ExperimentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | ExperimentCountOutputTypeCountAssignmentsArgs
    events?: boolean | ExperimentCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * ExperimentCountOutputType without action
   */
  export type ExperimentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentCountOutputType
     */
    select?: ExperimentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExperimentCountOutputType without action
   */
  export type ExperimentCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperimentAssignmentWhereInput
  }

  /**
   * ExperimentCountOutputType without action
   */
  export type ExperimentCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperimentEventWhereInput
  }


  /**
   * Models
   */

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
    tenantId: string | null
    key: string | null
    type: $Enums.FeatureFlagType | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeatureFlagMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    key: string | null
    type: $Enums.FeatureFlagType | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeatureFlagCountAggregateOutputType = {
    id: number
    tenantId: number
    key: number
    type: number
    variants: number
    rollout: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeatureFlagMinAggregateInputType = {
    id?: true
    tenantId?: true
    key?: true
    type?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeatureFlagMaxAggregateInputType = {
    id?: true
    tenantId?: true
    key?: true
    type?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeatureFlagCountAggregateInputType = {
    id?: true
    tenantId?: true
    key?: true
    type?: true
    variants?: true
    rollout?: true
    isActive?: true
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
    tenantId: string
    key: string
    type: $Enums.FeatureFlagType
    variants: JsonValue
    rollout: JsonValue
    isActive: boolean
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
    tenantId?: boolean
    key?: boolean
    type?: boolean
    variants?: boolean
    rollout?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    key?: boolean
    type?: boolean
    variants?: boolean
    rollout?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    key?: boolean
    type?: boolean
    variants?: boolean
    rollout?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectScalar = {
    id?: boolean
    tenantId?: boolean
    key?: boolean
    type?: boolean
    variants?: boolean
    rollout?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FeatureFlagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "key" | "type" | "variants" | "rollout" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["featureFlag"]>

  export type $FeatureFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeatureFlag"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      key: string
      type: $Enums.FeatureFlagType
      variants: Prisma.JsonValue
      rollout: Prisma.JsonValue
      isActive: boolean
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
    readonly tenantId: FieldRef<"FeatureFlag", 'String'>
    readonly key: FieldRef<"FeatureFlag", 'String'>
    readonly type: FieldRef<"FeatureFlag", 'FeatureFlagType'>
    readonly variants: FieldRef<"FeatureFlag", 'Json'>
    readonly rollout: FieldRef<"FeatureFlag", 'Json'>
    readonly isActive: FieldRef<"FeatureFlag", 'Boolean'>
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
  }


  /**
   * Model Experiment
   */

  export type AggregateExperiment = {
    _count: ExperimentCountAggregateOutputType | null
    _min: ExperimentMinAggregateOutputType | null
    _max: ExperimentMaxAggregateOutputType | null
  }

  export type ExperimentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    status: $Enums.ExperimentStatus | null
    experimentType: string | null
    modelKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExperimentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    status: $Enums.ExperimentStatus | null
    experimentType: string | null
    modelKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExperimentCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    variants: number
    targetAudience: number
    status: number
    metricsTracked: number
    experimentType: number
    modelKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExperimentMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    status?: true
    experimentType?: true
    modelKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExperimentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    status?: true
    experimentType?: true
    modelKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExperimentCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    variants?: true
    targetAudience?: true
    status?: true
    metricsTracked?: true
    experimentType?: true
    modelKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExperimentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experiment to aggregate.
     */
    where?: ExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiments to fetch.
     */
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Experiments
    **/
    _count?: true | ExperimentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExperimentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExperimentMaxAggregateInputType
  }

  export type GetExperimentAggregateType<T extends ExperimentAggregateArgs> = {
        [P in keyof T & keyof AggregateExperiment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperiment[P]>
      : GetScalarType<T[P], AggregateExperiment[P]>
  }




  export type ExperimentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperimentWhereInput
    orderBy?: ExperimentOrderByWithAggregationInput | ExperimentOrderByWithAggregationInput[]
    by: ExperimentScalarFieldEnum[] | ExperimentScalarFieldEnum
    having?: ExperimentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExperimentCountAggregateInputType | true
    _min?: ExperimentMinAggregateInputType
    _max?: ExperimentMaxAggregateInputType
  }

  export type ExperimentGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string
    variants: JsonValue
    targetAudience: JsonValue
    status: $Enums.ExperimentStatus
    metricsTracked: JsonValue
    experimentType: string
    modelKey: string | null
    createdAt: Date
    updatedAt: Date
    _count: ExperimentCountAggregateOutputType | null
    _min: ExperimentMinAggregateOutputType | null
    _max: ExperimentMaxAggregateOutputType | null
  }

  type GetExperimentGroupByPayload<T extends ExperimentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExperimentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExperimentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperimentGroupByOutputType[P]>
            : GetScalarType<T[P], ExperimentGroupByOutputType[P]>
        }
      >
    >


  export type ExperimentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    variants?: boolean
    targetAudience?: boolean
    status?: boolean
    metricsTracked?: boolean
    experimentType?: boolean
    modelKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignments?: boolean | Experiment$assignmentsArgs<ExtArgs>
    events?: boolean | Experiment$eventsArgs<ExtArgs>
    _count?: boolean | ExperimentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experiment"]>

  export type ExperimentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    variants?: boolean
    targetAudience?: boolean
    status?: boolean
    metricsTracked?: boolean
    experimentType?: boolean
    modelKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["experiment"]>

  export type ExperimentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    variants?: boolean
    targetAudience?: boolean
    status?: boolean
    metricsTracked?: boolean
    experimentType?: boolean
    modelKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["experiment"]>

  export type ExperimentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    variants?: boolean
    targetAudience?: boolean
    status?: boolean
    metricsTracked?: boolean
    experimentType?: boolean
    modelKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExperimentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "variants" | "targetAudience" | "status" | "metricsTracked" | "experimentType" | "modelKey" | "createdAt" | "updatedAt", ExtArgs["result"]["experiment"]>
  export type ExperimentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | Experiment$assignmentsArgs<ExtArgs>
    events?: boolean | Experiment$eventsArgs<ExtArgs>
    _count?: boolean | ExperimentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExperimentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ExperimentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ExperimentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Experiment"
    objects: {
      assignments: Prisma.$ExperimentAssignmentPayload<ExtArgs>[]
      events: Prisma.$ExperimentEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string
      variants: Prisma.JsonValue
      targetAudience: Prisma.JsonValue
      status: $Enums.ExperimentStatus
      metricsTracked: Prisma.JsonValue
      experimentType: string
      modelKey: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["experiment"]>
    composites: {}
  }

  type ExperimentGetPayload<S extends boolean | null | undefined | ExperimentDefaultArgs> = $Result.GetResult<Prisma.$ExperimentPayload, S>

  type ExperimentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExperimentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExperimentCountAggregateInputType | true
    }

  export interface ExperimentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Experiment'], meta: { name: 'Experiment' } }
    /**
     * Find zero or one Experiment that matches the filter.
     * @param {ExperimentFindUniqueArgs} args - Arguments to find a Experiment
     * @example
     * // Get one Experiment
     * const experiment = await prisma.experiment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperimentFindUniqueArgs>(args: SelectSubset<T, ExperimentFindUniqueArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Experiment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperimentFindUniqueOrThrowArgs} args - Arguments to find a Experiment
     * @example
     * // Get one Experiment
     * const experiment = await prisma.experiment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperimentFindUniqueOrThrowArgs>(args: SelectSubset<T, ExperimentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experiment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentFindFirstArgs} args - Arguments to find a Experiment
     * @example
     * // Get one Experiment
     * const experiment = await prisma.experiment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperimentFindFirstArgs>(args?: SelectSubset<T, ExperimentFindFirstArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Experiment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentFindFirstOrThrowArgs} args - Arguments to find a Experiment
     * @example
     * // Get one Experiment
     * const experiment = await prisma.experiment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperimentFindFirstOrThrowArgs>(args?: SelectSubset<T, ExperimentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Experiments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Experiments
     * const experiments = await prisma.experiment.findMany()
     * 
     * // Get first 10 Experiments
     * const experiments = await prisma.experiment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const experimentWithIdOnly = await prisma.experiment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExperimentFindManyArgs>(args?: SelectSubset<T, ExperimentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Experiment.
     * @param {ExperimentCreateArgs} args - Arguments to create a Experiment.
     * @example
     * // Create one Experiment
     * const Experiment = await prisma.experiment.create({
     *   data: {
     *     // ... data to create a Experiment
     *   }
     * })
     * 
     */
    create<T extends ExperimentCreateArgs>(args: SelectSubset<T, ExperimentCreateArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Experiments.
     * @param {ExperimentCreateManyArgs} args - Arguments to create many Experiments.
     * @example
     * // Create many Experiments
     * const experiment = await prisma.experiment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExperimentCreateManyArgs>(args?: SelectSubset<T, ExperimentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Experiments and returns the data saved in the database.
     * @param {ExperimentCreateManyAndReturnArgs} args - Arguments to create many Experiments.
     * @example
     * // Create many Experiments
     * const experiment = await prisma.experiment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Experiments and only return the `id`
     * const experimentWithIdOnly = await prisma.experiment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExperimentCreateManyAndReturnArgs>(args?: SelectSubset<T, ExperimentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Experiment.
     * @param {ExperimentDeleteArgs} args - Arguments to delete one Experiment.
     * @example
     * // Delete one Experiment
     * const Experiment = await prisma.experiment.delete({
     *   where: {
     *     // ... filter to delete one Experiment
     *   }
     * })
     * 
     */
    delete<T extends ExperimentDeleteArgs>(args: SelectSubset<T, ExperimentDeleteArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Experiment.
     * @param {ExperimentUpdateArgs} args - Arguments to update one Experiment.
     * @example
     * // Update one Experiment
     * const experiment = await prisma.experiment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExperimentUpdateArgs>(args: SelectSubset<T, ExperimentUpdateArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Experiments.
     * @param {ExperimentDeleteManyArgs} args - Arguments to filter Experiments to delete.
     * @example
     * // Delete a few Experiments
     * const { count } = await prisma.experiment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExperimentDeleteManyArgs>(args?: SelectSubset<T, ExperimentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Experiments
     * const experiment = await prisma.experiment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExperimentUpdateManyArgs>(args: SelectSubset<T, ExperimentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Experiments and returns the data updated in the database.
     * @param {ExperimentUpdateManyAndReturnArgs} args - Arguments to update many Experiments.
     * @example
     * // Update many Experiments
     * const experiment = await prisma.experiment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Experiments and only return the `id`
     * const experimentWithIdOnly = await prisma.experiment.updateManyAndReturn({
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
    updateManyAndReturn<T extends ExperimentUpdateManyAndReturnArgs>(args: SelectSubset<T, ExperimentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Experiment.
     * @param {ExperimentUpsertArgs} args - Arguments to update or create a Experiment.
     * @example
     * // Update or create a Experiment
     * const experiment = await prisma.experiment.upsert({
     *   create: {
     *     // ... data to create a Experiment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Experiment we want to update
     *   }
     * })
     */
    upsert<T extends ExperimentUpsertArgs>(args: SelectSubset<T, ExperimentUpsertArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Experiments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentCountArgs} args - Arguments to filter Experiments to count.
     * @example
     * // Count the number of Experiments
     * const count = await prisma.experiment.count({
     *   where: {
     *     // ... the filter for the Experiments we want to count
     *   }
     * })
    **/
    count<T extends ExperimentCountArgs>(
      args?: Subset<T, ExperimentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExperimentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Experiment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExperimentAggregateArgs>(args: Subset<T, ExperimentAggregateArgs>): Prisma.PrismaPromise<GetExperimentAggregateType<T>>

    /**
     * Group by Experiment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentGroupByArgs} args - Group by arguments.
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
      T extends ExperimentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperimentGroupByArgs['orderBy'] }
        : { orderBy?: ExperimentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExperimentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperimentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Experiment model
   */
  readonly fields: ExperimentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Experiment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperimentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends Experiment$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Experiment$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Experiment$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Experiment$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Experiment model
   */
  interface ExperimentFieldRefs {
    readonly id: FieldRef<"Experiment", 'String'>
    readonly tenantId: FieldRef<"Experiment", 'String'>
    readonly name: FieldRef<"Experiment", 'String'>
    readonly description: FieldRef<"Experiment", 'String'>
    readonly variants: FieldRef<"Experiment", 'Json'>
    readonly targetAudience: FieldRef<"Experiment", 'Json'>
    readonly status: FieldRef<"Experiment", 'ExperimentStatus'>
    readonly metricsTracked: FieldRef<"Experiment", 'Json'>
    readonly experimentType: FieldRef<"Experiment", 'String'>
    readonly modelKey: FieldRef<"Experiment", 'String'>
    readonly createdAt: FieldRef<"Experiment", 'DateTime'>
    readonly updatedAt: FieldRef<"Experiment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Experiment findUnique
   */
  export type ExperimentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiment to fetch.
     */
    where: ExperimentWhereUniqueInput
  }

  /**
   * Experiment findUniqueOrThrow
   */
  export type ExperimentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiment to fetch.
     */
    where: ExperimentWhereUniqueInput
  }

  /**
   * Experiment findFirst
   */
  export type ExperimentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiment to fetch.
     */
    where?: ExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiments to fetch.
     */
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiments.
     */
    cursor?: ExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiments.
     */
    distinct?: ExperimentScalarFieldEnum | ExperimentScalarFieldEnum[]
  }

  /**
   * Experiment findFirstOrThrow
   */
  export type ExperimentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiment to fetch.
     */
    where?: ExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiments to fetch.
     */
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Experiments.
     */
    cursor?: ExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Experiments.
     */
    distinct?: ExperimentScalarFieldEnum | ExperimentScalarFieldEnum[]
  }

  /**
   * Experiment findMany
   */
  export type ExperimentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter, which Experiments to fetch.
     */
    where?: ExperimentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Experiments to fetch.
     */
    orderBy?: ExperimentOrderByWithRelationInput | ExperimentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Experiments.
     */
    cursor?: ExperimentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Experiments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Experiments.
     */
    skip?: number
    distinct?: ExperimentScalarFieldEnum | ExperimentScalarFieldEnum[]
  }

  /**
   * Experiment create
   */
  export type ExperimentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * The data needed to create a Experiment.
     */
    data: XOR<ExperimentCreateInput, ExperimentUncheckedCreateInput>
  }

  /**
   * Experiment createMany
   */
  export type ExperimentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Experiments.
     */
    data: ExperimentCreateManyInput | ExperimentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Experiment createManyAndReturn
   */
  export type ExperimentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * The data used to create many Experiments.
     */
    data: ExperimentCreateManyInput | ExperimentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Experiment update
   */
  export type ExperimentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * The data needed to update a Experiment.
     */
    data: XOR<ExperimentUpdateInput, ExperimentUncheckedUpdateInput>
    /**
     * Choose, which Experiment to update.
     */
    where: ExperimentWhereUniqueInput
  }

  /**
   * Experiment updateMany
   */
  export type ExperimentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Experiments.
     */
    data: XOR<ExperimentUpdateManyMutationInput, ExperimentUncheckedUpdateManyInput>
    /**
     * Filter which Experiments to update
     */
    where?: ExperimentWhereInput
    /**
     * Limit how many Experiments to update.
     */
    limit?: number
  }

  /**
   * Experiment updateManyAndReturn
   */
  export type ExperimentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * The data used to update Experiments.
     */
    data: XOR<ExperimentUpdateManyMutationInput, ExperimentUncheckedUpdateManyInput>
    /**
     * Filter which Experiments to update
     */
    where?: ExperimentWhereInput
    /**
     * Limit how many Experiments to update.
     */
    limit?: number
  }

  /**
   * Experiment upsert
   */
  export type ExperimentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * The filter to search for the Experiment to update in case it exists.
     */
    where: ExperimentWhereUniqueInput
    /**
     * In case the Experiment found by the `where` argument doesn't exist, create a new Experiment with this data.
     */
    create: XOR<ExperimentCreateInput, ExperimentUncheckedCreateInput>
    /**
     * In case the Experiment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperimentUpdateInput, ExperimentUncheckedUpdateInput>
  }

  /**
   * Experiment delete
   */
  export type ExperimentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
    /**
     * Filter which Experiment to delete.
     */
    where: ExperimentWhereUniqueInput
  }

  /**
   * Experiment deleteMany
   */
  export type ExperimentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Experiments to delete
     */
    where?: ExperimentWhereInput
    /**
     * Limit how many Experiments to delete.
     */
    limit?: number
  }

  /**
   * Experiment.assignments
   */
  export type Experiment$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    where?: ExperimentAssignmentWhereInput
    orderBy?: ExperimentAssignmentOrderByWithRelationInput | ExperimentAssignmentOrderByWithRelationInput[]
    cursor?: ExperimentAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExperimentAssignmentScalarFieldEnum | ExperimentAssignmentScalarFieldEnum[]
  }

  /**
   * Experiment.events
   */
  export type Experiment$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    where?: ExperimentEventWhereInput
    orderBy?: ExperimentEventOrderByWithRelationInput | ExperimentEventOrderByWithRelationInput[]
    cursor?: ExperimentEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExperimentEventScalarFieldEnum | ExperimentEventScalarFieldEnum[]
  }

  /**
   * Experiment without action
   */
  export type ExperimentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Experiment
     */
    select?: ExperimentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Experiment
     */
    omit?: ExperimentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentInclude<ExtArgs> | null
  }


  /**
   * Model ExperimentAssignment
   */

  export type AggregateExperimentAssignment = {
    _count: ExperimentAssignmentCountAggregateOutputType | null
    _min: ExperimentAssignmentMinAggregateOutputType | null
    _max: ExperimentAssignmentMaxAggregateOutputType | null
  }

  export type ExperimentAssignmentMinAggregateOutputType = {
    id: string | null
    experimentId: string | null
    tenantId: string | null
    userId: string | null
    variant: string | null
    assignedAt: Date | null
  }

  export type ExperimentAssignmentMaxAggregateOutputType = {
    id: string | null
    experimentId: string | null
    tenantId: string | null
    userId: string | null
    variant: string | null
    assignedAt: Date | null
  }

  export type ExperimentAssignmentCountAggregateOutputType = {
    id: number
    experimentId: number
    tenantId: number
    userId: number
    variant: number
    assignedAt: number
    _all: number
  }


  export type ExperimentAssignmentMinAggregateInputType = {
    id?: true
    experimentId?: true
    tenantId?: true
    userId?: true
    variant?: true
    assignedAt?: true
  }

  export type ExperimentAssignmentMaxAggregateInputType = {
    id?: true
    experimentId?: true
    tenantId?: true
    userId?: true
    variant?: true
    assignedAt?: true
  }

  export type ExperimentAssignmentCountAggregateInputType = {
    id?: true
    experimentId?: true
    tenantId?: true
    userId?: true
    variant?: true
    assignedAt?: true
    _all?: true
  }

  export type ExperimentAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExperimentAssignment to aggregate.
     */
    where?: ExperimentAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExperimentAssignments to fetch.
     */
    orderBy?: ExperimentAssignmentOrderByWithRelationInput | ExperimentAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExperimentAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExperimentAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExperimentAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExperimentAssignments
    **/
    _count?: true | ExperimentAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExperimentAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExperimentAssignmentMaxAggregateInputType
  }

  export type GetExperimentAssignmentAggregateType<T extends ExperimentAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateExperimentAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperimentAssignment[P]>
      : GetScalarType<T[P], AggregateExperimentAssignment[P]>
  }




  export type ExperimentAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperimentAssignmentWhereInput
    orderBy?: ExperimentAssignmentOrderByWithAggregationInput | ExperimentAssignmentOrderByWithAggregationInput[]
    by: ExperimentAssignmentScalarFieldEnum[] | ExperimentAssignmentScalarFieldEnum
    having?: ExperimentAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExperimentAssignmentCountAggregateInputType | true
    _min?: ExperimentAssignmentMinAggregateInputType
    _max?: ExperimentAssignmentMaxAggregateInputType
  }

  export type ExperimentAssignmentGroupByOutputType = {
    id: string
    experimentId: string
    tenantId: string
    userId: string | null
    variant: string
    assignedAt: Date
    _count: ExperimentAssignmentCountAggregateOutputType | null
    _min: ExperimentAssignmentMinAggregateOutputType | null
    _max: ExperimentAssignmentMaxAggregateOutputType | null
  }

  type GetExperimentAssignmentGroupByPayload<T extends ExperimentAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExperimentAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExperimentAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperimentAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], ExperimentAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type ExperimentAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    experimentId?: boolean
    tenantId?: boolean
    userId?: boolean
    variant?: boolean
    assignedAt?: boolean
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experimentAssignment"]>

  export type ExperimentAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    experimentId?: boolean
    tenantId?: boolean
    userId?: boolean
    variant?: boolean
    assignedAt?: boolean
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experimentAssignment"]>

  export type ExperimentAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    experimentId?: boolean
    tenantId?: boolean
    userId?: boolean
    variant?: boolean
    assignedAt?: boolean
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experimentAssignment"]>

  export type ExperimentAssignmentSelectScalar = {
    id?: boolean
    experimentId?: boolean
    tenantId?: boolean
    userId?: boolean
    variant?: boolean
    assignedAt?: boolean
  }

  export type ExperimentAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "experimentId" | "tenantId" | "userId" | "variant" | "assignedAt", ExtArgs["result"]["experimentAssignment"]>
  export type ExperimentAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }
  export type ExperimentAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }
  export type ExperimentAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }

  export type $ExperimentAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExperimentAssignment"
    objects: {
      experiment: Prisma.$ExperimentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      experimentId: string
      tenantId: string
      userId: string | null
      variant: string
      assignedAt: Date
    }, ExtArgs["result"]["experimentAssignment"]>
    composites: {}
  }

  type ExperimentAssignmentGetPayload<S extends boolean | null | undefined | ExperimentAssignmentDefaultArgs> = $Result.GetResult<Prisma.$ExperimentAssignmentPayload, S>

  type ExperimentAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExperimentAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExperimentAssignmentCountAggregateInputType | true
    }

  export interface ExperimentAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExperimentAssignment'], meta: { name: 'ExperimentAssignment' } }
    /**
     * Find zero or one ExperimentAssignment that matches the filter.
     * @param {ExperimentAssignmentFindUniqueArgs} args - Arguments to find a ExperimentAssignment
     * @example
     * // Get one ExperimentAssignment
     * const experimentAssignment = await prisma.experimentAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperimentAssignmentFindUniqueArgs>(args: SelectSubset<T, ExperimentAssignmentFindUniqueArgs<ExtArgs>>): Prisma__ExperimentAssignmentClient<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExperimentAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperimentAssignmentFindUniqueOrThrowArgs} args - Arguments to find a ExperimentAssignment
     * @example
     * // Get one ExperimentAssignment
     * const experimentAssignment = await prisma.experimentAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperimentAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ExperimentAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExperimentAssignmentClient<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExperimentAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAssignmentFindFirstArgs} args - Arguments to find a ExperimentAssignment
     * @example
     * // Get one ExperimentAssignment
     * const experimentAssignment = await prisma.experimentAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperimentAssignmentFindFirstArgs>(args?: SelectSubset<T, ExperimentAssignmentFindFirstArgs<ExtArgs>>): Prisma__ExperimentAssignmentClient<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExperimentAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAssignmentFindFirstOrThrowArgs} args - Arguments to find a ExperimentAssignment
     * @example
     * // Get one ExperimentAssignment
     * const experimentAssignment = await prisma.experimentAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperimentAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ExperimentAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExperimentAssignmentClient<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExperimentAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExperimentAssignments
     * const experimentAssignments = await prisma.experimentAssignment.findMany()
     * 
     * // Get first 10 ExperimentAssignments
     * const experimentAssignments = await prisma.experimentAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const experimentAssignmentWithIdOnly = await prisma.experimentAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExperimentAssignmentFindManyArgs>(args?: SelectSubset<T, ExperimentAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExperimentAssignment.
     * @param {ExperimentAssignmentCreateArgs} args - Arguments to create a ExperimentAssignment.
     * @example
     * // Create one ExperimentAssignment
     * const ExperimentAssignment = await prisma.experimentAssignment.create({
     *   data: {
     *     // ... data to create a ExperimentAssignment
     *   }
     * })
     * 
     */
    create<T extends ExperimentAssignmentCreateArgs>(args: SelectSubset<T, ExperimentAssignmentCreateArgs<ExtArgs>>): Prisma__ExperimentAssignmentClient<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExperimentAssignments.
     * @param {ExperimentAssignmentCreateManyArgs} args - Arguments to create many ExperimentAssignments.
     * @example
     * // Create many ExperimentAssignments
     * const experimentAssignment = await prisma.experimentAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExperimentAssignmentCreateManyArgs>(args?: SelectSubset<T, ExperimentAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExperimentAssignments and returns the data saved in the database.
     * @param {ExperimentAssignmentCreateManyAndReturnArgs} args - Arguments to create many ExperimentAssignments.
     * @example
     * // Create many ExperimentAssignments
     * const experimentAssignment = await prisma.experimentAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExperimentAssignments and only return the `id`
     * const experimentAssignmentWithIdOnly = await prisma.experimentAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExperimentAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ExperimentAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExperimentAssignment.
     * @param {ExperimentAssignmentDeleteArgs} args - Arguments to delete one ExperimentAssignment.
     * @example
     * // Delete one ExperimentAssignment
     * const ExperimentAssignment = await prisma.experimentAssignment.delete({
     *   where: {
     *     // ... filter to delete one ExperimentAssignment
     *   }
     * })
     * 
     */
    delete<T extends ExperimentAssignmentDeleteArgs>(args: SelectSubset<T, ExperimentAssignmentDeleteArgs<ExtArgs>>): Prisma__ExperimentAssignmentClient<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExperimentAssignment.
     * @param {ExperimentAssignmentUpdateArgs} args - Arguments to update one ExperimentAssignment.
     * @example
     * // Update one ExperimentAssignment
     * const experimentAssignment = await prisma.experimentAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExperimentAssignmentUpdateArgs>(args: SelectSubset<T, ExperimentAssignmentUpdateArgs<ExtArgs>>): Prisma__ExperimentAssignmentClient<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExperimentAssignments.
     * @param {ExperimentAssignmentDeleteManyArgs} args - Arguments to filter ExperimentAssignments to delete.
     * @example
     * // Delete a few ExperimentAssignments
     * const { count } = await prisma.experimentAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExperimentAssignmentDeleteManyArgs>(args?: SelectSubset<T, ExperimentAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExperimentAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExperimentAssignments
     * const experimentAssignment = await prisma.experimentAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExperimentAssignmentUpdateManyArgs>(args: SelectSubset<T, ExperimentAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExperimentAssignments and returns the data updated in the database.
     * @param {ExperimentAssignmentUpdateManyAndReturnArgs} args - Arguments to update many ExperimentAssignments.
     * @example
     * // Update many ExperimentAssignments
     * const experimentAssignment = await prisma.experimentAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExperimentAssignments and only return the `id`
     * const experimentAssignmentWithIdOnly = await prisma.experimentAssignment.updateManyAndReturn({
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
    updateManyAndReturn<T extends ExperimentAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, ExperimentAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExperimentAssignment.
     * @param {ExperimentAssignmentUpsertArgs} args - Arguments to update or create a ExperimentAssignment.
     * @example
     * // Update or create a ExperimentAssignment
     * const experimentAssignment = await prisma.experimentAssignment.upsert({
     *   create: {
     *     // ... data to create a ExperimentAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExperimentAssignment we want to update
     *   }
     * })
     */
    upsert<T extends ExperimentAssignmentUpsertArgs>(args: SelectSubset<T, ExperimentAssignmentUpsertArgs<ExtArgs>>): Prisma__ExperimentAssignmentClient<$Result.GetResult<Prisma.$ExperimentAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExperimentAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAssignmentCountArgs} args - Arguments to filter ExperimentAssignments to count.
     * @example
     * // Count the number of ExperimentAssignments
     * const count = await prisma.experimentAssignment.count({
     *   where: {
     *     // ... the filter for the ExperimentAssignments we want to count
     *   }
     * })
    **/
    count<T extends ExperimentAssignmentCountArgs>(
      args?: Subset<T, ExperimentAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExperimentAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExperimentAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExperimentAssignmentAggregateArgs>(args: Subset<T, ExperimentAssignmentAggregateArgs>): Prisma.PrismaPromise<GetExperimentAssignmentAggregateType<T>>

    /**
     * Group by ExperimentAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentAssignmentGroupByArgs} args - Group by arguments.
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
      T extends ExperimentAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperimentAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: ExperimentAssignmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExperimentAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperimentAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExperimentAssignment model
   */
  readonly fields: ExperimentAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExperimentAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperimentAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    experiment<T extends ExperimentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExperimentDefaultArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ExperimentAssignment model
   */
  interface ExperimentAssignmentFieldRefs {
    readonly id: FieldRef<"ExperimentAssignment", 'String'>
    readonly experimentId: FieldRef<"ExperimentAssignment", 'String'>
    readonly tenantId: FieldRef<"ExperimentAssignment", 'String'>
    readonly userId: FieldRef<"ExperimentAssignment", 'String'>
    readonly variant: FieldRef<"ExperimentAssignment", 'String'>
    readonly assignedAt: FieldRef<"ExperimentAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExperimentAssignment findUnique
   */
  export type ExperimentAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentAssignment to fetch.
     */
    where: ExperimentAssignmentWhereUniqueInput
  }

  /**
   * ExperimentAssignment findUniqueOrThrow
   */
  export type ExperimentAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentAssignment to fetch.
     */
    where: ExperimentAssignmentWhereUniqueInput
  }

  /**
   * ExperimentAssignment findFirst
   */
  export type ExperimentAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentAssignment to fetch.
     */
    where?: ExperimentAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExperimentAssignments to fetch.
     */
    orderBy?: ExperimentAssignmentOrderByWithRelationInput | ExperimentAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExperimentAssignments.
     */
    cursor?: ExperimentAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExperimentAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExperimentAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExperimentAssignments.
     */
    distinct?: ExperimentAssignmentScalarFieldEnum | ExperimentAssignmentScalarFieldEnum[]
  }

  /**
   * ExperimentAssignment findFirstOrThrow
   */
  export type ExperimentAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentAssignment to fetch.
     */
    where?: ExperimentAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExperimentAssignments to fetch.
     */
    orderBy?: ExperimentAssignmentOrderByWithRelationInput | ExperimentAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExperimentAssignments.
     */
    cursor?: ExperimentAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExperimentAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExperimentAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExperimentAssignments.
     */
    distinct?: ExperimentAssignmentScalarFieldEnum | ExperimentAssignmentScalarFieldEnum[]
  }

  /**
   * ExperimentAssignment findMany
   */
  export type ExperimentAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentAssignments to fetch.
     */
    where?: ExperimentAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExperimentAssignments to fetch.
     */
    orderBy?: ExperimentAssignmentOrderByWithRelationInput | ExperimentAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExperimentAssignments.
     */
    cursor?: ExperimentAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExperimentAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExperimentAssignments.
     */
    skip?: number
    distinct?: ExperimentAssignmentScalarFieldEnum | ExperimentAssignmentScalarFieldEnum[]
  }

  /**
   * ExperimentAssignment create
   */
  export type ExperimentAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a ExperimentAssignment.
     */
    data: XOR<ExperimentAssignmentCreateInput, ExperimentAssignmentUncheckedCreateInput>
  }

  /**
   * ExperimentAssignment createMany
   */
  export type ExperimentAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExperimentAssignments.
     */
    data: ExperimentAssignmentCreateManyInput | ExperimentAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExperimentAssignment createManyAndReturn
   */
  export type ExperimentAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many ExperimentAssignments.
     */
    data: ExperimentAssignmentCreateManyInput | ExperimentAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExperimentAssignment update
   */
  export type ExperimentAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a ExperimentAssignment.
     */
    data: XOR<ExperimentAssignmentUpdateInput, ExperimentAssignmentUncheckedUpdateInput>
    /**
     * Choose, which ExperimentAssignment to update.
     */
    where: ExperimentAssignmentWhereUniqueInput
  }

  /**
   * ExperimentAssignment updateMany
   */
  export type ExperimentAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExperimentAssignments.
     */
    data: XOR<ExperimentAssignmentUpdateManyMutationInput, ExperimentAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which ExperimentAssignments to update
     */
    where?: ExperimentAssignmentWhereInput
    /**
     * Limit how many ExperimentAssignments to update.
     */
    limit?: number
  }

  /**
   * ExperimentAssignment updateManyAndReturn
   */
  export type ExperimentAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update ExperimentAssignments.
     */
    data: XOR<ExperimentAssignmentUpdateManyMutationInput, ExperimentAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which ExperimentAssignments to update
     */
    where?: ExperimentAssignmentWhereInput
    /**
     * Limit how many ExperimentAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExperimentAssignment upsert
   */
  export type ExperimentAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the ExperimentAssignment to update in case it exists.
     */
    where: ExperimentAssignmentWhereUniqueInput
    /**
     * In case the ExperimentAssignment found by the `where` argument doesn't exist, create a new ExperimentAssignment with this data.
     */
    create: XOR<ExperimentAssignmentCreateInput, ExperimentAssignmentUncheckedCreateInput>
    /**
     * In case the ExperimentAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperimentAssignmentUpdateInput, ExperimentAssignmentUncheckedUpdateInput>
  }

  /**
   * ExperimentAssignment delete
   */
  export type ExperimentAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
    /**
     * Filter which ExperimentAssignment to delete.
     */
    where: ExperimentAssignmentWhereUniqueInput
  }

  /**
   * ExperimentAssignment deleteMany
   */
  export type ExperimentAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExperimentAssignments to delete
     */
    where?: ExperimentAssignmentWhereInput
    /**
     * Limit how many ExperimentAssignments to delete.
     */
    limit?: number
  }

  /**
   * ExperimentAssignment without action
   */
  export type ExperimentAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentAssignment
     */
    select?: ExperimentAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentAssignment
     */
    omit?: ExperimentAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model ExperimentEvent
   */

  export type AggregateExperimentEvent = {
    _count: ExperimentEventCountAggregateOutputType | null
    _min: ExperimentEventMinAggregateOutputType | null
    _max: ExperimentEventMaxAggregateOutputType | null
  }

  export type ExperimentEventMinAggregateOutputType = {
    id: string | null
    experimentId: string | null
    tenantId: string | null
    userId: string | null
    variant: string | null
    eventType: string | null
    recordedAt: Date | null
  }

  export type ExperimentEventMaxAggregateOutputType = {
    id: string | null
    experimentId: string | null
    tenantId: string | null
    userId: string | null
    variant: string | null
    eventType: string | null
    recordedAt: Date | null
  }

  export type ExperimentEventCountAggregateOutputType = {
    id: number
    experimentId: number
    tenantId: number
    userId: number
    variant: number
    eventType: number
    payload: number
    recordedAt: number
    _all: number
  }


  export type ExperimentEventMinAggregateInputType = {
    id?: true
    experimentId?: true
    tenantId?: true
    userId?: true
    variant?: true
    eventType?: true
    recordedAt?: true
  }

  export type ExperimentEventMaxAggregateInputType = {
    id?: true
    experimentId?: true
    tenantId?: true
    userId?: true
    variant?: true
    eventType?: true
    recordedAt?: true
  }

  export type ExperimentEventCountAggregateInputType = {
    id?: true
    experimentId?: true
    tenantId?: true
    userId?: true
    variant?: true
    eventType?: true
    payload?: true
    recordedAt?: true
    _all?: true
  }

  export type ExperimentEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExperimentEvent to aggregate.
     */
    where?: ExperimentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExperimentEvents to fetch.
     */
    orderBy?: ExperimentEventOrderByWithRelationInput | ExperimentEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExperimentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExperimentEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExperimentEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExperimentEvents
    **/
    _count?: true | ExperimentEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExperimentEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExperimentEventMaxAggregateInputType
  }

  export type GetExperimentEventAggregateType<T extends ExperimentEventAggregateArgs> = {
        [P in keyof T & keyof AggregateExperimentEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperimentEvent[P]>
      : GetScalarType<T[P], AggregateExperimentEvent[P]>
  }




  export type ExperimentEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExperimentEventWhereInput
    orderBy?: ExperimentEventOrderByWithAggregationInput | ExperimentEventOrderByWithAggregationInput[]
    by: ExperimentEventScalarFieldEnum[] | ExperimentEventScalarFieldEnum
    having?: ExperimentEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExperimentEventCountAggregateInputType | true
    _min?: ExperimentEventMinAggregateInputType
    _max?: ExperimentEventMaxAggregateInputType
  }

  export type ExperimentEventGroupByOutputType = {
    id: string
    experimentId: string
    tenantId: string
    userId: string | null
    variant: string
    eventType: string
    payload: JsonValue
    recordedAt: Date
    _count: ExperimentEventCountAggregateOutputType | null
    _min: ExperimentEventMinAggregateOutputType | null
    _max: ExperimentEventMaxAggregateOutputType | null
  }

  type GetExperimentEventGroupByPayload<T extends ExperimentEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExperimentEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExperimentEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperimentEventGroupByOutputType[P]>
            : GetScalarType<T[P], ExperimentEventGroupByOutputType[P]>
        }
      >
    >


  export type ExperimentEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    experimentId?: boolean
    tenantId?: boolean
    userId?: boolean
    variant?: boolean
    eventType?: boolean
    payload?: boolean
    recordedAt?: boolean
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experimentEvent"]>

  export type ExperimentEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    experimentId?: boolean
    tenantId?: boolean
    userId?: boolean
    variant?: boolean
    eventType?: boolean
    payload?: boolean
    recordedAt?: boolean
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experimentEvent"]>

  export type ExperimentEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    experimentId?: boolean
    tenantId?: boolean
    userId?: boolean
    variant?: boolean
    eventType?: boolean
    payload?: boolean
    recordedAt?: boolean
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["experimentEvent"]>

  export type ExperimentEventSelectScalar = {
    id?: boolean
    experimentId?: boolean
    tenantId?: boolean
    userId?: boolean
    variant?: boolean
    eventType?: boolean
    payload?: boolean
    recordedAt?: boolean
  }

  export type ExperimentEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "experimentId" | "tenantId" | "userId" | "variant" | "eventType" | "payload" | "recordedAt", ExtArgs["result"]["experimentEvent"]>
  export type ExperimentEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }
  export type ExperimentEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }
  export type ExperimentEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    experiment?: boolean | ExperimentDefaultArgs<ExtArgs>
  }

  export type $ExperimentEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExperimentEvent"
    objects: {
      experiment: Prisma.$ExperimentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      experimentId: string
      tenantId: string
      userId: string | null
      variant: string
      eventType: string
      payload: Prisma.JsonValue
      recordedAt: Date
    }, ExtArgs["result"]["experimentEvent"]>
    composites: {}
  }

  type ExperimentEventGetPayload<S extends boolean | null | undefined | ExperimentEventDefaultArgs> = $Result.GetResult<Prisma.$ExperimentEventPayload, S>

  type ExperimentEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExperimentEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExperimentEventCountAggregateInputType | true
    }

  export interface ExperimentEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExperimentEvent'], meta: { name: 'ExperimentEvent' } }
    /**
     * Find zero or one ExperimentEvent that matches the filter.
     * @param {ExperimentEventFindUniqueArgs} args - Arguments to find a ExperimentEvent
     * @example
     * // Get one ExperimentEvent
     * const experimentEvent = await prisma.experimentEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperimentEventFindUniqueArgs>(args: SelectSubset<T, ExperimentEventFindUniqueArgs<ExtArgs>>): Prisma__ExperimentEventClient<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExperimentEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperimentEventFindUniqueOrThrowArgs} args - Arguments to find a ExperimentEvent
     * @example
     * // Get one ExperimentEvent
     * const experimentEvent = await prisma.experimentEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperimentEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ExperimentEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExperimentEventClient<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExperimentEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentEventFindFirstArgs} args - Arguments to find a ExperimentEvent
     * @example
     * // Get one ExperimentEvent
     * const experimentEvent = await prisma.experimentEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperimentEventFindFirstArgs>(args?: SelectSubset<T, ExperimentEventFindFirstArgs<ExtArgs>>): Prisma__ExperimentEventClient<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExperimentEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentEventFindFirstOrThrowArgs} args - Arguments to find a ExperimentEvent
     * @example
     * // Get one ExperimentEvent
     * const experimentEvent = await prisma.experimentEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperimentEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ExperimentEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExperimentEventClient<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExperimentEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExperimentEvents
     * const experimentEvents = await prisma.experimentEvent.findMany()
     * 
     * // Get first 10 ExperimentEvents
     * const experimentEvents = await prisma.experimentEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const experimentEventWithIdOnly = await prisma.experimentEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExperimentEventFindManyArgs>(args?: SelectSubset<T, ExperimentEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExperimentEvent.
     * @param {ExperimentEventCreateArgs} args - Arguments to create a ExperimentEvent.
     * @example
     * // Create one ExperimentEvent
     * const ExperimentEvent = await prisma.experimentEvent.create({
     *   data: {
     *     // ... data to create a ExperimentEvent
     *   }
     * })
     * 
     */
    create<T extends ExperimentEventCreateArgs>(args: SelectSubset<T, ExperimentEventCreateArgs<ExtArgs>>): Prisma__ExperimentEventClient<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExperimentEvents.
     * @param {ExperimentEventCreateManyArgs} args - Arguments to create many ExperimentEvents.
     * @example
     * // Create many ExperimentEvents
     * const experimentEvent = await prisma.experimentEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExperimentEventCreateManyArgs>(args?: SelectSubset<T, ExperimentEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExperimentEvents and returns the data saved in the database.
     * @param {ExperimentEventCreateManyAndReturnArgs} args - Arguments to create many ExperimentEvents.
     * @example
     * // Create many ExperimentEvents
     * const experimentEvent = await prisma.experimentEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExperimentEvents and only return the `id`
     * const experimentEventWithIdOnly = await prisma.experimentEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExperimentEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ExperimentEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExperimentEvent.
     * @param {ExperimentEventDeleteArgs} args - Arguments to delete one ExperimentEvent.
     * @example
     * // Delete one ExperimentEvent
     * const ExperimentEvent = await prisma.experimentEvent.delete({
     *   where: {
     *     // ... filter to delete one ExperimentEvent
     *   }
     * })
     * 
     */
    delete<T extends ExperimentEventDeleteArgs>(args: SelectSubset<T, ExperimentEventDeleteArgs<ExtArgs>>): Prisma__ExperimentEventClient<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExperimentEvent.
     * @param {ExperimentEventUpdateArgs} args - Arguments to update one ExperimentEvent.
     * @example
     * // Update one ExperimentEvent
     * const experimentEvent = await prisma.experimentEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExperimentEventUpdateArgs>(args: SelectSubset<T, ExperimentEventUpdateArgs<ExtArgs>>): Prisma__ExperimentEventClient<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExperimentEvents.
     * @param {ExperimentEventDeleteManyArgs} args - Arguments to filter ExperimentEvents to delete.
     * @example
     * // Delete a few ExperimentEvents
     * const { count } = await prisma.experimentEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExperimentEventDeleteManyArgs>(args?: SelectSubset<T, ExperimentEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExperimentEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExperimentEvents
     * const experimentEvent = await prisma.experimentEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExperimentEventUpdateManyArgs>(args: SelectSubset<T, ExperimentEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExperimentEvents and returns the data updated in the database.
     * @param {ExperimentEventUpdateManyAndReturnArgs} args - Arguments to update many ExperimentEvents.
     * @example
     * // Update many ExperimentEvents
     * const experimentEvent = await prisma.experimentEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExperimentEvents and only return the `id`
     * const experimentEventWithIdOnly = await prisma.experimentEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends ExperimentEventUpdateManyAndReturnArgs>(args: SelectSubset<T, ExperimentEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExperimentEvent.
     * @param {ExperimentEventUpsertArgs} args - Arguments to update or create a ExperimentEvent.
     * @example
     * // Update or create a ExperimentEvent
     * const experimentEvent = await prisma.experimentEvent.upsert({
     *   create: {
     *     // ... data to create a ExperimentEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExperimentEvent we want to update
     *   }
     * })
     */
    upsert<T extends ExperimentEventUpsertArgs>(args: SelectSubset<T, ExperimentEventUpsertArgs<ExtArgs>>): Prisma__ExperimentEventClient<$Result.GetResult<Prisma.$ExperimentEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExperimentEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentEventCountArgs} args - Arguments to filter ExperimentEvents to count.
     * @example
     * // Count the number of ExperimentEvents
     * const count = await prisma.experimentEvent.count({
     *   where: {
     *     // ... the filter for the ExperimentEvents we want to count
     *   }
     * })
    **/
    count<T extends ExperimentEventCountArgs>(
      args?: Subset<T, ExperimentEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExperimentEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExperimentEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExperimentEventAggregateArgs>(args: Subset<T, ExperimentEventAggregateArgs>): Prisma.PrismaPromise<GetExperimentEventAggregateType<T>>

    /**
     * Group by ExperimentEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperimentEventGroupByArgs} args - Group by arguments.
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
      T extends ExperimentEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperimentEventGroupByArgs['orderBy'] }
        : { orderBy?: ExperimentEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExperimentEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperimentEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExperimentEvent model
   */
  readonly fields: ExperimentEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExperimentEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperimentEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    experiment<T extends ExperimentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExperimentDefaultArgs<ExtArgs>>): Prisma__ExperimentClient<$Result.GetResult<Prisma.$ExperimentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ExperimentEvent model
   */
  interface ExperimentEventFieldRefs {
    readonly id: FieldRef<"ExperimentEvent", 'String'>
    readonly experimentId: FieldRef<"ExperimentEvent", 'String'>
    readonly tenantId: FieldRef<"ExperimentEvent", 'String'>
    readonly userId: FieldRef<"ExperimentEvent", 'String'>
    readonly variant: FieldRef<"ExperimentEvent", 'String'>
    readonly eventType: FieldRef<"ExperimentEvent", 'String'>
    readonly payload: FieldRef<"ExperimentEvent", 'Json'>
    readonly recordedAt: FieldRef<"ExperimentEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExperimentEvent findUnique
   */
  export type ExperimentEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentEvent to fetch.
     */
    where: ExperimentEventWhereUniqueInput
  }

  /**
   * ExperimentEvent findUniqueOrThrow
   */
  export type ExperimentEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentEvent to fetch.
     */
    where: ExperimentEventWhereUniqueInput
  }

  /**
   * ExperimentEvent findFirst
   */
  export type ExperimentEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentEvent to fetch.
     */
    where?: ExperimentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExperimentEvents to fetch.
     */
    orderBy?: ExperimentEventOrderByWithRelationInput | ExperimentEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExperimentEvents.
     */
    cursor?: ExperimentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExperimentEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExperimentEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExperimentEvents.
     */
    distinct?: ExperimentEventScalarFieldEnum | ExperimentEventScalarFieldEnum[]
  }

  /**
   * ExperimentEvent findFirstOrThrow
   */
  export type ExperimentEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentEvent to fetch.
     */
    where?: ExperimentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExperimentEvents to fetch.
     */
    orderBy?: ExperimentEventOrderByWithRelationInput | ExperimentEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExperimentEvents.
     */
    cursor?: ExperimentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExperimentEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExperimentEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExperimentEvents.
     */
    distinct?: ExperimentEventScalarFieldEnum | ExperimentEventScalarFieldEnum[]
  }

  /**
   * ExperimentEvent findMany
   */
  export type ExperimentEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * Filter, which ExperimentEvents to fetch.
     */
    where?: ExperimentEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExperimentEvents to fetch.
     */
    orderBy?: ExperimentEventOrderByWithRelationInput | ExperimentEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExperimentEvents.
     */
    cursor?: ExperimentEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExperimentEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExperimentEvents.
     */
    skip?: number
    distinct?: ExperimentEventScalarFieldEnum | ExperimentEventScalarFieldEnum[]
  }

  /**
   * ExperimentEvent create
   */
  export type ExperimentEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * The data needed to create a ExperimentEvent.
     */
    data: XOR<ExperimentEventCreateInput, ExperimentEventUncheckedCreateInput>
  }

  /**
   * ExperimentEvent createMany
   */
  export type ExperimentEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExperimentEvents.
     */
    data: ExperimentEventCreateManyInput | ExperimentEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExperimentEvent createManyAndReturn
   */
  export type ExperimentEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * The data used to create many ExperimentEvents.
     */
    data: ExperimentEventCreateManyInput | ExperimentEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExperimentEvent update
   */
  export type ExperimentEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * The data needed to update a ExperimentEvent.
     */
    data: XOR<ExperimentEventUpdateInput, ExperimentEventUncheckedUpdateInput>
    /**
     * Choose, which ExperimentEvent to update.
     */
    where: ExperimentEventWhereUniqueInput
  }

  /**
   * ExperimentEvent updateMany
   */
  export type ExperimentEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExperimentEvents.
     */
    data: XOR<ExperimentEventUpdateManyMutationInput, ExperimentEventUncheckedUpdateManyInput>
    /**
     * Filter which ExperimentEvents to update
     */
    where?: ExperimentEventWhereInput
    /**
     * Limit how many ExperimentEvents to update.
     */
    limit?: number
  }

  /**
   * ExperimentEvent updateManyAndReturn
   */
  export type ExperimentEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * The data used to update ExperimentEvents.
     */
    data: XOR<ExperimentEventUpdateManyMutationInput, ExperimentEventUncheckedUpdateManyInput>
    /**
     * Filter which ExperimentEvents to update
     */
    where?: ExperimentEventWhereInput
    /**
     * Limit how many ExperimentEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExperimentEvent upsert
   */
  export type ExperimentEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * The filter to search for the ExperimentEvent to update in case it exists.
     */
    where: ExperimentEventWhereUniqueInput
    /**
     * In case the ExperimentEvent found by the `where` argument doesn't exist, create a new ExperimentEvent with this data.
     */
    create: XOR<ExperimentEventCreateInput, ExperimentEventUncheckedCreateInput>
    /**
     * In case the ExperimentEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperimentEventUpdateInput, ExperimentEventUncheckedUpdateInput>
  }

  /**
   * ExperimentEvent delete
   */
  export type ExperimentEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
    /**
     * Filter which ExperimentEvent to delete.
     */
    where: ExperimentEventWhereUniqueInput
  }

  /**
   * ExperimentEvent deleteMany
   */
  export type ExperimentEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExperimentEvents to delete
     */
    where?: ExperimentEventWhereInput
    /**
     * Limit how many ExperimentEvents to delete.
     */
    limit?: number
  }

  /**
   * ExperimentEvent without action
   */
  export type ExperimentEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExperimentEvent
     */
    select?: ExperimentEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExperimentEvent
     */
    omit?: ExperimentEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperimentEventInclude<ExtArgs> | null
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


  export const FeatureFlagScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    key: 'key',
    type: 'type',
    variants: 'variants',
    rollout: 'rollout',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeatureFlagScalarFieldEnum = (typeof FeatureFlagScalarFieldEnum)[keyof typeof FeatureFlagScalarFieldEnum]


  export const ExperimentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    variants: 'variants',
    targetAudience: 'targetAudience',
    status: 'status',
    metricsTracked: 'metricsTracked',
    experimentType: 'experimentType',
    modelKey: 'modelKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExperimentScalarFieldEnum = (typeof ExperimentScalarFieldEnum)[keyof typeof ExperimentScalarFieldEnum]


  export const ExperimentAssignmentScalarFieldEnum: {
    id: 'id',
    experimentId: 'experimentId',
    tenantId: 'tenantId',
    userId: 'userId',
    variant: 'variant',
    assignedAt: 'assignedAt'
  };

  export type ExperimentAssignmentScalarFieldEnum = (typeof ExperimentAssignmentScalarFieldEnum)[keyof typeof ExperimentAssignmentScalarFieldEnum]


  export const ExperimentEventScalarFieldEnum: {
    id: 'id',
    experimentId: 'experimentId',
    tenantId: 'tenantId',
    userId: 'userId',
    variant: 'variant',
    eventType: 'eventType',
    payload: 'payload',
    recordedAt: 'recordedAt'
  };

  export type ExperimentEventScalarFieldEnum = (typeof ExperimentEventScalarFieldEnum)[keyof typeof ExperimentEventScalarFieldEnum]


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
   * Reference to a field of type 'FeatureFlagType'
   */
  export type EnumFeatureFlagTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeatureFlagType'>
    


  /**
   * Reference to a field of type 'FeatureFlagType[]'
   */
  export type ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeatureFlagType[]'>
    


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
   * Reference to a field of type 'ExperimentStatus'
   */
  export type EnumExperimentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperimentStatus'>
    


  /**
   * Reference to a field of type 'ExperimentStatus[]'
   */
  export type ListEnumExperimentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperimentStatus[]'>
    


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


  export type FeatureFlagWhereInput = {
    AND?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    OR?: FeatureFlagWhereInput[]
    NOT?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    id?: StringFilter<"FeatureFlag"> | string
    tenantId?: StringFilter<"FeatureFlag"> | string
    key?: StringFilter<"FeatureFlag"> | string
    type?: EnumFeatureFlagTypeFilter<"FeatureFlag"> | $Enums.FeatureFlagType
    variants?: JsonFilter<"FeatureFlag">
    rollout?: JsonFilter<"FeatureFlag">
    isActive?: BoolFilter<"FeatureFlag"> | boolean
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
  }

  export type FeatureFlagOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    key?: SortOrder
    type?: SortOrder
    variants?: SortOrder
    rollout?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_key?: FeatureFlagTenantIdKeyCompoundUniqueInput
    AND?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    OR?: FeatureFlagWhereInput[]
    NOT?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    tenantId?: StringFilter<"FeatureFlag"> | string
    key?: StringFilter<"FeatureFlag"> | string
    type?: EnumFeatureFlagTypeFilter<"FeatureFlag"> | $Enums.FeatureFlagType
    variants?: JsonFilter<"FeatureFlag">
    rollout?: JsonFilter<"FeatureFlag">
    isActive?: BoolFilter<"FeatureFlag"> | boolean
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
  }, "id" | "tenantId_key">

  export type FeatureFlagOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    key?: SortOrder
    type?: SortOrder
    variants?: SortOrder
    rollout?: SortOrder
    isActive?: SortOrder
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
    tenantId?: StringWithAggregatesFilter<"FeatureFlag"> | string
    key?: StringWithAggregatesFilter<"FeatureFlag"> | string
    type?: EnumFeatureFlagTypeWithAggregatesFilter<"FeatureFlag"> | $Enums.FeatureFlagType
    variants?: JsonWithAggregatesFilter<"FeatureFlag">
    rollout?: JsonWithAggregatesFilter<"FeatureFlag">
    isActive?: BoolWithAggregatesFilter<"FeatureFlag"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
  }

  export type ExperimentWhereInput = {
    AND?: ExperimentWhereInput | ExperimentWhereInput[]
    OR?: ExperimentWhereInput[]
    NOT?: ExperimentWhereInput | ExperimentWhereInput[]
    id?: StringFilter<"Experiment"> | string
    tenantId?: StringFilter<"Experiment"> | string
    name?: StringFilter<"Experiment"> | string
    description?: StringFilter<"Experiment"> | string
    variants?: JsonFilter<"Experiment">
    targetAudience?: JsonFilter<"Experiment">
    status?: EnumExperimentStatusFilter<"Experiment"> | $Enums.ExperimentStatus
    metricsTracked?: JsonFilter<"Experiment">
    experimentType?: StringFilter<"Experiment"> | string
    modelKey?: StringNullableFilter<"Experiment"> | string | null
    createdAt?: DateTimeFilter<"Experiment"> | Date | string
    updatedAt?: DateTimeFilter<"Experiment"> | Date | string
    assignments?: ExperimentAssignmentListRelationFilter
    events?: ExperimentEventListRelationFilter
  }

  export type ExperimentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    variants?: SortOrder
    targetAudience?: SortOrder
    status?: SortOrder
    metricsTracked?: SortOrder
    experimentType?: SortOrder
    modelKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignments?: ExperimentAssignmentOrderByRelationAggregateInput
    events?: ExperimentEventOrderByRelationAggregateInput
  }

  export type ExperimentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExperimentWhereInput | ExperimentWhereInput[]
    OR?: ExperimentWhereInput[]
    NOT?: ExperimentWhereInput | ExperimentWhereInput[]
    tenantId?: StringFilter<"Experiment"> | string
    name?: StringFilter<"Experiment"> | string
    description?: StringFilter<"Experiment"> | string
    variants?: JsonFilter<"Experiment">
    targetAudience?: JsonFilter<"Experiment">
    status?: EnumExperimentStatusFilter<"Experiment"> | $Enums.ExperimentStatus
    metricsTracked?: JsonFilter<"Experiment">
    experimentType?: StringFilter<"Experiment"> | string
    modelKey?: StringNullableFilter<"Experiment"> | string | null
    createdAt?: DateTimeFilter<"Experiment"> | Date | string
    updatedAt?: DateTimeFilter<"Experiment"> | Date | string
    assignments?: ExperimentAssignmentListRelationFilter
    events?: ExperimentEventListRelationFilter
  }, "id">

  export type ExperimentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    variants?: SortOrder
    targetAudience?: SortOrder
    status?: SortOrder
    metricsTracked?: SortOrder
    experimentType?: SortOrder
    modelKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExperimentCountOrderByAggregateInput
    _max?: ExperimentMaxOrderByAggregateInput
    _min?: ExperimentMinOrderByAggregateInput
  }

  export type ExperimentScalarWhereWithAggregatesInput = {
    AND?: ExperimentScalarWhereWithAggregatesInput | ExperimentScalarWhereWithAggregatesInput[]
    OR?: ExperimentScalarWhereWithAggregatesInput[]
    NOT?: ExperimentScalarWhereWithAggregatesInput | ExperimentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Experiment"> | string
    tenantId?: StringWithAggregatesFilter<"Experiment"> | string
    name?: StringWithAggregatesFilter<"Experiment"> | string
    description?: StringWithAggregatesFilter<"Experiment"> | string
    variants?: JsonWithAggregatesFilter<"Experiment">
    targetAudience?: JsonWithAggregatesFilter<"Experiment">
    status?: EnumExperimentStatusWithAggregatesFilter<"Experiment"> | $Enums.ExperimentStatus
    metricsTracked?: JsonWithAggregatesFilter<"Experiment">
    experimentType?: StringWithAggregatesFilter<"Experiment"> | string
    modelKey?: StringNullableWithAggregatesFilter<"Experiment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Experiment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Experiment"> | Date | string
  }

  export type ExperimentAssignmentWhereInput = {
    AND?: ExperimentAssignmentWhereInput | ExperimentAssignmentWhereInput[]
    OR?: ExperimentAssignmentWhereInput[]
    NOT?: ExperimentAssignmentWhereInput | ExperimentAssignmentWhereInput[]
    id?: StringFilter<"ExperimentAssignment"> | string
    experimentId?: StringFilter<"ExperimentAssignment"> | string
    tenantId?: StringFilter<"ExperimentAssignment"> | string
    userId?: StringNullableFilter<"ExperimentAssignment"> | string | null
    variant?: StringFilter<"ExperimentAssignment"> | string
    assignedAt?: DateTimeFilter<"ExperimentAssignment"> | Date | string
    experiment?: XOR<ExperimentScalarRelationFilter, ExperimentWhereInput>
  }

  export type ExperimentAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    variant?: SortOrder
    assignedAt?: SortOrder
    experiment?: ExperimentOrderByWithRelationInput
  }

  export type ExperimentAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    experimentId_userId?: ExperimentAssignmentExperimentIdUserIdCompoundUniqueInput
    AND?: ExperimentAssignmentWhereInput | ExperimentAssignmentWhereInput[]
    OR?: ExperimentAssignmentWhereInput[]
    NOT?: ExperimentAssignmentWhereInput | ExperimentAssignmentWhereInput[]
    experimentId?: StringFilter<"ExperimentAssignment"> | string
    tenantId?: StringFilter<"ExperimentAssignment"> | string
    userId?: StringNullableFilter<"ExperimentAssignment"> | string | null
    variant?: StringFilter<"ExperimentAssignment"> | string
    assignedAt?: DateTimeFilter<"ExperimentAssignment"> | Date | string
    experiment?: XOR<ExperimentScalarRelationFilter, ExperimentWhereInput>
  }, "id" | "experimentId_userId">

  export type ExperimentAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    variant?: SortOrder
    assignedAt?: SortOrder
    _count?: ExperimentAssignmentCountOrderByAggregateInput
    _max?: ExperimentAssignmentMaxOrderByAggregateInput
    _min?: ExperimentAssignmentMinOrderByAggregateInput
  }

  export type ExperimentAssignmentScalarWhereWithAggregatesInput = {
    AND?: ExperimentAssignmentScalarWhereWithAggregatesInput | ExperimentAssignmentScalarWhereWithAggregatesInput[]
    OR?: ExperimentAssignmentScalarWhereWithAggregatesInput[]
    NOT?: ExperimentAssignmentScalarWhereWithAggregatesInput | ExperimentAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExperimentAssignment"> | string
    experimentId?: StringWithAggregatesFilter<"ExperimentAssignment"> | string
    tenantId?: StringWithAggregatesFilter<"ExperimentAssignment"> | string
    userId?: StringNullableWithAggregatesFilter<"ExperimentAssignment"> | string | null
    variant?: StringWithAggregatesFilter<"ExperimentAssignment"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"ExperimentAssignment"> | Date | string
  }

  export type ExperimentEventWhereInput = {
    AND?: ExperimentEventWhereInput | ExperimentEventWhereInput[]
    OR?: ExperimentEventWhereInput[]
    NOT?: ExperimentEventWhereInput | ExperimentEventWhereInput[]
    id?: StringFilter<"ExperimentEvent"> | string
    experimentId?: StringFilter<"ExperimentEvent"> | string
    tenantId?: StringFilter<"ExperimentEvent"> | string
    userId?: StringNullableFilter<"ExperimentEvent"> | string | null
    variant?: StringFilter<"ExperimentEvent"> | string
    eventType?: StringFilter<"ExperimentEvent"> | string
    payload?: JsonFilter<"ExperimentEvent">
    recordedAt?: DateTimeFilter<"ExperimentEvent"> | Date | string
    experiment?: XOR<ExperimentScalarRelationFilter, ExperimentWhereInput>
  }

  export type ExperimentEventOrderByWithRelationInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    variant?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    recordedAt?: SortOrder
    experiment?: ExperimentOrderByWithRelationInput
  }

  export type ExperimentEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExperimentEventWhereInput | ExperimentEventWhereInput[]
    OR?: ExperimentEventWhereInput[]
    NOT?: ExperimentEventWhereInput | ExperimentEventWhereInput[]
    experimentId?: StringFilter<"ExperimentEvent"> | string
    tenantId?: StringFilter<"ExperimentEvent"> | string
    userId?: StringNullableFilter<"ExperimentEvent"> | string | null
    variant?: StringFilter<"ExperimentEvent"> | string
    eventType?: StringFilter<"ExperimentEvent"> | string
    payload?: JsonFilter<"ExperimentEvent">
    recordedAt?: DateTimeFilter<"ExperimentEvent"> | Date | string
    experiment?: XOR<ExperimentScalarRelationFilter, ExperimentWhereInput>
  }, "id">

  export type ExperimentEventOrderByWithAggregationInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    variant?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    recordedAt?: SortOrder
    _count?: ExperimentEventCountOrderByAggregateInput
    _max?: ExperimentEventMaxOrderByAggregateInput
    _min?: ExperimentEventMinOrderByAggregateInput
  }

  export type ExperimentEventScalarWhereWithAggregatesInput = {
    AND?: ExperimentEventScalarWhereWithAggregatesInput | ExperimentEventScalarWhereWithAggregatesInput[]
    OR?: ExperimentEventScalarWhereWithAggregatesInput[]
    NOT?: ExperimentEventScalarWhereWithAggregatesInput | ExperimentEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExperimentEvent"> | string
    experimentId?: StringWithAggregatesFilter<"ExperimentEvent"> | string
    tenantId?: StringWithAggregatesFilter<"ExperimentEvent"> | string
    userId?: StringNullableWithAggregatesFilter<"ExperimentEvent"> | string | null
    variant?: StringWithAggregatesFilter<"ExperimentEvent"> | string
    eventType?: StringWithAggregatesFilter<"ExperimentEvent"> | string
    payload?: JsonWithAggregatesFilter<"ExperimentEvent">
    recordedAt?: DateTimeWithAggregatesFilter<"ExperimentEvent"> | Date | string
  }

  export type FeatureFlagCreateInput = {
    id?: string
    tenantId: string
    key: string
    type?: $Enums.FeatureFlagType
    variants?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUncheckedCreateInput = {
    id?: string
    tenantId: string
    key: string
    type?: $Enums.FeatureFlagType
    variants?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    type?: EnumFeatureFlagTypeFieldUpdateOperationsInput | $Enums.FeatureFlagType
    variants?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    type?: EnumFeatureFlagTypeFieldUpdateOperationsInput | $Enums.FeatureFlagType
    variants?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagCreateManyInput = {
    id?: string
    tenantId: string
    key: string
    type?: $Enums.FeatureFlagType
    variants?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    type?: EnumFeatureFlagTypeFieldUpdateOperationsInput | $Enums.FeatureFlagType
    variants?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    type?: EnumFeatureFlagTypeFieldUpdateOperationsInput | $Enums.FeatureFlagType
    variants?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: string
    modelKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: ExperimentAssignmentCreateNestedManyWithoutExperimentInput
    events?: ExperimentEventCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: string
    modelKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: ExperimentAssignmentUncheckedCreateNestedManyWithoutExperimentInput
    events?: ExperimentEventUncheckedCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: EnumExperimentStatusFieldUpdateOperationsInput | $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: StringFieldUpdateOperationsInput | string
    modelKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ExperimentAssignmentUpdateManyWithoutExperimentNestedInput
    events?: ExperimentEventUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: EnumExperimentStatusFieldUpdateOperationsInput | $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: StringFieldUpdateOperationsInput | string
    modelKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ExperimentAssignmentUncheckedUpdateManyWithoutExperimentNestedInput
    events?: ExperimentEventUncheckedUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: string
    modelKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExperimentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: EnumExperimentStatusFieldUpdateOperationsInput | $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: StringFieldUpdateOperationsInput | string
    modelKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: EnumExperimentStatusFieldUpdateOperationsInput | $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: StringFieldUpdateOperationsInput | string
    modelKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentAssignmentCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    variant: string
    assignedAt?: Date | string
    experiment: ExperimentCreateNestedOneWithoutAssignmentsInput
  }

  export type ExperimentAssignmentUncheckedCreateInput = {
    id?: string
    experimentId: string
    tenantId: string
    userId?: string | null
    variant: string
    assignedAt?: Date | string
  }

  export type ExperimentAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiment?: ExperimentUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type ExperimentAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentAssignmentCreateManyInput = {
    id?: string
    experimentId: string
    tenantId: string
    userId?: string | null
    variant: string
    assignedAt?: Date | string
  }

  export type ExperimentAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentEventCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    variant: string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: Date | string
    experiment: ExperimentCreateNestedOneWithoutEventsInput
  }

  export type ExperimentEventUncheckedCreateInput = {
    id?: string
    experimentId: string
    tenantId: string
    userId?: string | null
    variant: string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: Date | string
  }

  export type ExperimentEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    experiment?: ExperimentUpdateOneRequiredWithoutEventsNestedInput
  }

  export type ExperimentEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentEventCreateManyInput = {
    id?: string
    experimentId: string
    tenantId: string
    userId?: string | null
    variant: string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: Date | string
  }

  export type ExperimentEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    experimentId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumFeatureFlagTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureFlagType | EnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureFlagType[] | ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureFlagType[] | ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureFlagTypeFilter<$PrismaModel> | $Enums.FeatureFlagType
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

  export type FeatureFlagTenantIdKeyCompoundUniqueInput = {
    tenantId: string
    key: string
  }

  export type FeatureFlagCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    key?: SortOrder
    type?: SortOrder
    variants?: SortOrder
    rollout?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    key?: SortOrder
    type?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    key?: SortOrder
    type?: SortOrder
    isActive?: SortOrder
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

  export type EnumFeatureFlagTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureFlagType | EnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureFlagType[] | ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureFlagType[] | ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureFlagTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeatureFlagType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeatureFlagTypeFilter<$PrismaModel>
    _max?: NestedEnumFeatureFlagTypeFilter<$PrismaModel>
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

  export type EnumExperimentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperimentStatus | EnumExperimentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExperimentStatus[] | ListEnumExperimentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperimentStatus[] | ListEnumExperimentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExperimentStatusFilter<$PrismaModel> | $Enums.ExperimentStatus
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

  export type ExperimentAssignmentListRelationFilter = {
    every?: ExperimentAssignmentWhereInput
    some?: ExperimentAssignmentWhereInput
    none?: ExperimentAssignmentWhereInput
  }

  export type ExperimentEventListRelationFilter = {
    every?: ExperimentEventWhereInput
    some?: ExperimentEventWhereInput
    none?: ExperimentEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ExperimentAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExperimentEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExperimentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    variants?: SortOrder
    targetAudience?: SortOrder
    status?: SortOrder
    metricsTracked?: SortOrder
    experimentType?: SortOrder
    modelKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExperimentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    experimentType?: SortOrder
    modelKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExperimentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    experimentType?: SortOrder
    modelKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumExperimentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperimentStatus | EnumExperimentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExperimentStatus[] | ListEnumExperimentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperimentStatus[] | ListEnumExperimentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExperimentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExperimentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExperimentStatusFilter<$PrismaModel>
    _max?: NestedEnumExperimentStatusFilter<$PrismaModel>
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

  export type ExperimentScalarRelationFilter = {
    is?: ExperimentWhereInput
    isNot?: ExperimentWhereInput
  }

  export type ExperimentAssignmentExperimentIdUserIdCompoundUniqueInput = {
    experimentId: string
    userId: string
  }

  export type ExperimentAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    assignedAt?: SortOrder
  }

  export type ExperimentAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    assignedAt?: SortOrder
  }

  export type ExperimentAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    assignedAt?: SortOrder
  }

  export type ExperimentEventCountOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    recordedAt?: SortOrder
  }

  export type ExperimentEventMaxOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    eventType?: SortOrder
    recordedAt?: SortOrder
  }

  export type ExperimentEventMinOrderByAggregateInput = {
    id?: SortOrder
    experimentId?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    variant?: SortOrder
    eventType?: SortOrder
    recordedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumFeatureFlagTypeFieldUpdateOperationsInput = {
    set?: $Enums.FeatureFlagType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ExperimentAssignmentCreateNestedManyWithoutExperimentInput = {
    create?: XOR<ExperimentAssignmentCreateWithoutExperimentInput, ExperimentAssignmentUncheckedCreateWithoutExperimentInput> | ExperimentAssignmentCreateWithoutExperimentInput[] | ExperimentAssignmentUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: ExperimentAssignmentCreateOrConnectWithoutExperimentInput | ExperimentAssignmentCreateOrConnectWithoutExperimentInput[]
    createMany?: ExperimentAssignmentCreateManyExperimentInputEnvelope
    connect?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
  }

  export type ExperimentEventCreateNestedManyWithoutExperimentInput = {
    create?: XOR<ExperimentEventCreateWithoutExperimentInput, ExperimentEventUncheckedCreateWithoutExperimentInput> | ExperimentEventCreateWithoutExperimentInput[] | ExperimentEventUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: ExperimentEventCreateOrConnectWithoutExperimentInput | ExperimentEventCreateOrConnectWithoutExperimentInput[]
    createMany?: ExperimentEventCreateManyExperimentInputEnvelope
    connect?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
  }

  export type ExperimentAssignmentUncheckedCreateNestedManyWithoutExperimentInput = {
    create?: XOR<ExperimentAssignmentCreateWithoutExperimentInput, ExperimentAssignmentUncheckedCreateWithoutExperimentInput> | ExperimentAssignmentCreateWithoutExperimentInput[] | ExperimentAssignmentUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: ExperimentAssignmentCreateOrConnectWithoutExperimentInput | ExperimentAssignmentCreateOrConnectWithoutExperimentInput[]
    createMany?: ExperimentAssignmentCreateManyExperimentInputEnvelope
    connect?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
  }

  export type ExperimentEventUncheckedCreateNestedManyWithoutExperimentInput = {
    create?: XOR<ExperimentEventCreateWithoutExperimentInput, ExperimentEventUncheckedCreateWithoutExperimentInput> | ExperimentEventCreateWithoutExperimentInput[] | ExperimentEventUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: ExperimentEventCreateOrConnectWithoutExperimentInput | ExperimentEventCreateOrConnectWithoutExperimentInput[]
    createMany?: ExperimentEventCreateManyExperimentInputEnvelope
    connect?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
  }

  export type EnumExperimentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExperimentStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ExperimentAssignmentUpdateManyWithoutExperimentNestedInput = {
    create?: XOR<ExperimentAssignmentCreateWithoutExperimentInput, ExperimentAssignmentUncheckedCreateWithoutExperimentInput> | ExperimentAssignmentCreateWithoutExperimentInput[] | ExperimentAssignmentUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: ExperimentAssignmentCreateOrConnectWithoutExperimentInput | ExperimentAssignmentCreateOrConnectWithoutExperimentInput[]
    upsert?: ExperimentAssignmentUpsertWithWhereUniqueWithoutExperimentInput | ExperimentAssignmentUpsertWithWhereUniqueWithoutExperimentInput[]
    createMany?: ExperimentAssignmentCreateManyExperimentInputEnvelope
    set?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
    disconnect?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
    delete?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
    connect?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
    update?: ExperimentAssignmentUpdateWithWhereUniqueWithoutExperimentInput | ExperimentAssignmentUpdateWithWhereUniqueWithoutExperimentInput[]
    updateMany?: ExperimentAssignmentUpdateManyWithWhereWithoutExperimentInput | ExperimentAssignmentUpdateManyWithWhereWithoutExperimentInput[]
    deleteMany?: ExperimentAssignmentScalarWhereInput | ExperimentAssignmentScalarWhereInput[]
  }

  export type ExperimentEventUpdateManyWithoutExperimentNestedInput = {
    create?: XOR<ExperimentEventCreateWithoutExperimentInput, ExperimentEventUncheckedCreateWithoutExperimentInput> | ExperimentEventCreateWithoutExperimentInput[] | ExperimentEventUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: ExperimentEventCreateOrConnectWithoutExperimentInput | ExperimentEventCreateOrConnectWithoutExperimentInput[]
    upsert?: ExperimentEventUpsertWithWhereUniqueWithoutExperimentInput | ExperimentEventUpsertWithWhereUniqueWithoutExperimentInput[]
    createMany?: ExperimentEventCreateManyExperimentInputEnvelope
    set?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
    disconnect?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
    delete?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
    connect?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
    update?: ExperimentEventUpdateWithWhereUniqueWithoutExperimentInput | ExperimentEventUpdateWithWhereUniqueWithoutExperimentInput[]
    updateMany?: ExperimentEventUpdateManyWithWhereWithoutExperimentInput | ExperimentEventUpdateManyWithWhereWithoutExperimentInput[]
    deleteMany?: ExperimentEventScalarWhereInput | ExperimentEventScalarWhereInput[]
  }

  export type ExperimentAssignmentUncheckedUpdateManyWithoutExperimentNestedInput = {
    create?: XOR<ExperimentAssignmentCreateWithoutExperimentInput, ExperimentAssignmentUncheckedCreateWithoutExperimentInput> | ExperimentAssignmentCreateWithoutExperimentInput[] | ExperimentAssignmentUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: ExperimentAssignmentCreateOrConnectWithoutExperimentInput | ExperimentAssignmentCreateOrConnectWithoutExperimentInput[]
    upsert?: ExperimentAssignmentUpsertWithWhereUniqueWithoutExperimentInput | ExperimentAssignmentUpsertWithWhereUniqueWithoutExperimentInput[]
    createMany?: ExperimentAssignmentCreateManyExperimentInputEnvelope
    set?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
    disconnect?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
    delete?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
    connect?: ExperimentAssignmentWhereUniqueInput | ExperimentAssignmentWhereUniqueInput[]
    update?: ExperimentAssignmentUpdateWithWhereUniqueWithoutExperimentInput | ExperimentAssignmentUpdateWithWhereUniqueWithoutExperimentInput[]
    updateMany?: ExperimentAssignmentUpdateManyWithWhereWithoutExperimentInput | ExperimentAssignmentUpdateManyWithWhereWithoutExperimentInput[]
    deleteMany?: ExperimentAssignmentScalarWhereInput | ExperimentAssignmentScalarWhereInput[]
  }

  export type ExperimentEventUncheckedUpdateManyWithoutExperimentNestedInput = {
    create?: XOR<ExperimentEventCreateWithoutExperimentInput, ExperimentEventUncheckedCreateWithoutExperimentInput> | ExperimentEventCreateWithoutExperimentInput[] | ExperimentEventUncheckedCreateWithoutExperimentInput[]
    connectOrCreate?: ExperimentEventCreateOrConnectWithoutExperimentInput | ExperimentEventCreateOrConnectWithoutExperimentInput[]
    upsert?: ExperimentEventUpsertWithWhereUniqueWithoutExperimentInput | ExperimentEventUpsertWithWhereUniqueWithoutExperimentInput[]
    createMany?: ExperimentEventCreateManyExperimentInputEnvelope
    set?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
    disconnect?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
    delete?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
    connect?: ExperimentEventWhereUniqueInput | ExperimentEventWhereUniqueInput[]
    update?: ExperimentEventUpdateWithWhereUniqueWithoutExperimentInput | ExperimentEventUpdateWithWhereUniqueWithoutExperimentInput[]
    updateMany?: ExperimentEventUpdateManyWithWhereWithoutExperimentInput | ExperimentEventUpdateManyWithWhereWithoutExperimentInput[]
    deleteMany?: ExperimentEventScalarWhereInput | ExperimentEventScalarWhereInput[]
  }

  export type ExperimentCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<ExperimentCreateWithoutAssignmentsInput, ExperimentUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ExperimentCreateOrConnectWithoutAssignmentsInput
    connect?: ExperimentWhereUniqueInput
  }

  export type ExperimentUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<ExperimentCreateWithoutAssignmentsInput, ExperimentUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ExperimentCreateOrConnectWithoutAssignmentsInput
    upsert?: ExperimentUpsertWithoutAssignmentsInput
    connect?: ExperimentWhereUniqueInput
    update?: XOR<XOR<ExperimentUpdateToOneWithWhereWithoutAssignmentsInput, ExperimentUpdateWithoutAssignmentsInput>, ExperimentUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ExperimentCreateNestedOneWithoutEventsInput = {
    create?: XOR<ExperimentCreateWithoutEventsInput, ExperimentUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ExperimentCreateOrConnectWithoutEventsInput
    connect?: ExperimentWhereUniqueInput
  }

  export type ExperimentUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<ExperimentCreateWithoutEventsInput, ExperimentUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ExperimentCreateOrConnectWithoutEventsInput
    upsert?: ExperimentUpsertWithoutEventsInput
    connect?: ExperimentWhereUniqueInput
    update?: XOR<XOR<ExperimentUpdateToOneWithWhereWithoutEventsInput, ExperimentUpdateWithoutEventsInput>, ExperimentUncheckedUpdateWithoutEventsInput>
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

  export type NestedEnumFeatureFlagTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureFlagType | EnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureFlagType[] | ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureFlagType[] | ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureFlagTypeFilter<$PrismaModel> | $Enums.FeatureFlagType
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

  export type NestedEnumFeatureFlagTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureFlagType | EnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureFlagType[] | ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureFlagType[] | ListEnumFeatureFlagTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureFlagTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeatureFlagType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeatureFlagTypeFilter<$PrismaModel>
    _max?: NestedEnumFeatureFlagTypeFilter<$PrismaModel>
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

  export type NestedEnumExperimentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperimentStatus | EnumExperimentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExperimentStatus[] | ListEnumExperimentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperimentStatus[] | ListEnumExperimentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExperimentStatusFilter<$PrismaModel> | $Enums.ExperimentStatus
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

  export type NestedEnumExperimentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperimentStatus | EnumExperimentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExperimentStatus[] | ListEnumExperimentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperimentStatus[] | ListEnumExperimentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExperimentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExperimentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExperimentStatusFilter<$PrismaModel>
    _max?: NestedEnumExperimentStatusFilter<$PrismaModel>
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

  export type ExperimentAssignmentCreateWithoutExperimentInput = {
    id?: string
    tenantId: string
    userId?: string | null
    variant: string
    assignedAt?: Date | string
  }

  export type ExperimentAssignmentUncheckedCreateWithoutExperimentInput = {
    id?: string
    tenantId: string
    userId?: string | null
    variant: string
    assignedAt?: Date | string
  }

  export type ExperimentAssignmentCreateOrConnectWithoutExperimentInput = {
    where: ExperimentAssignmentWhereUniqueInput
    create: XOR<ExperimentAssignmentCreateWithoutExperimentInput, ExperimentAssignmentUncheckedCreateWithoutExperimentInput>
  }

  export type ExperimentAssignmentCreateManyExperimentInputEnvelope = {
    data: ExperimentAssignmentCreateManyExperimentInput | ExperimentAssignmentCreateManyExperimentInput[]
    skipDuplicates?: boolean
  }

  export type ExperimentEventCreateWithoutExperimentInput = {
    id?: string
    tenantId: string
    userId?: string | null
    variant: string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: Date | string
  }

  export type ExperimentEventUncheckedCreateWithoutExperimentInput = {
    id?: string
    tenantId: string
    userId?: string | null
    variant: string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: Date | string
  }

  export type ExperimentEventCreateOrConnectWithoutExperimentInput = {
    where: ExperimentEventWhereUniqueInput
    create: XOR<ExperimentEventCreateWithoutExperimentInput, ExperimentEventUncheckedCreateWithoutExperimentInput>
  }

  export type ExperimentEventCreateManyExperimentInputEnvelope = {
    data: ExperimentEventCreateManyExperimentInput | ExperimentEventCreateManyExperimentInput[]
    skipDuplicates?: boolean
  }

  export type ExperimentAssignmentUpsertWithWhereUniqueWithoutExperimentInput = {
    where: ExperimentAssignmentWhereUniqueInput
    update: XOR<ExperimentAssignmentUpdateWithoutExperimentInput, ExperimentAssignmentUncheckedUpdateWithoutExperimentInput>
    create: XOR<ExperimentAssignmentCreateWithoutExperimentInput, ExperimentAssignmentUncheckedCreateWithoutExperimentInput>
  }

  export type ExperimentAssignmentUpdateWithWhereUniqueWithoutExperimentInput = {
    where: ExperimentAssignmentWhereUniqueInput
    data: XOR<ExperimentAssignmentUpdateWithoutExperimentInput, ExperimentAssignmentUncheckedUpdateWithoutExperimentInput>
  }

  export type ExperimentAssignmentUpdateManyWithWhereWithoutExperimentInput = {
    where: ExperimentAssignmentScalarWhereInput
    data: XOR<ExperimentAssignmentUpdateManyMutationInput, ExperimentAssignmentUncheckedUpdateManyWithoutExperimentInput>
  }

  export type ExperimentAssignmentScalarWhereInput = {
    AND?: ExperimentAssignmentScalarWhereInput | ExperimentAssignmentScalarWhereInput[]
    OR?: ExperimentAssignmentScalarWhereInput[]
    NOT?: ExperimentAssignmentScalarWhereInput | ExperimentAssignmentScalarWhereInput[]
    id?: StringFilter<"ExperimentAssignment"> | string
    experimentId?: StringFilter<"ExperimentAssignment"> | string
    tenantId?: StringFilter<"ExperimentAssignment"> | string
    userId?: StringNullableFilter<"ExperimentAssignment"> | string | null
    variant?: StringFilter<"ExperimentAssignment"> | string
    assignedAt?: DateTimeFilter<"ExperimentAssignment"> | Date | string
  }

  export type ExperimentEventUpsertWithWhereUniqueWithoutExperimentInput = {
    where: ExperimentEventWhereUniqueInput
    update: XOR<ExperimentEventUpdateWithoutExperimentInput, ExperimentEventUncheckedUpdateWithoutExperimentInput>
    create: XOR<ExperimentEventCreateWithoutExperimentInput, ExperimentEventUncheckedCreateWithoutExperimentInput>
  }

  export type ExperimentEventUpdateWithWhereUniqueWithoutExperimentInput = {
    where: ExperimentEventWhereUniqueInput
    data: XOR<ExperimentEventUpdateWithoutExperimentInput, ExperimentEventUncheckedUpdateWithoutExperimentInput>
  }

  export type ExperimentEventUpdateManyWithWhereWithoutExperimentInput = {
    where: ExperimentEventScalarWhereInput
    data: XOR<ExperimentEventUpdateManyMutationInput, ExperimentEventUncheckedUpdateManyWithoutExperimentInput>
  }

  export type ExperimentEventScalarWhereInput = {
    AND?: ExperimentEventScalarWhereInput | ExperimentEventScalarWhereInput[]
    OR?: ExperimentEventScalarWhereInput[]
    NOT?: ExperimentEventScalarWhereInput | ExperimentEventScalarWhereInput[]
    id?: StringFilter<"ExperimentEvent"> | string
    experimentId?: StringFilter<"ExperimentEvent"> | string
    tenantId?: StringFilter<"ExperimentEvent"> | string
    userId?: StringNullableFilter<"ExperimentEvent"> | string | null
    variant?: StringFilter<"ExperimentEvent"> | string
    eventType?: StringFilter<"ExperimentEvent"> | string
    payload?: JsonFilter<"ExperimentEvent">
    recordedAt?: DateTimeFilter<"ExperimentEvent"> | Date | string
  }

  export type ExperimentCreateWithoutAssignmentsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: string
    modelKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: ExperimentEventCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: string
    modelKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: ExperimentEventUncheckedCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentCreateOrConnectWithoutAssignmentsInput = {
    where: ExperimentWhereUniqueInput
    create: XOR<ExperimentCreateWithoutAssignmentsInput, ExperimentUncheckedCreateWithoutAssignmentsInput>
  }

  export type ExperimentUpsertWithoutAssignmentsInput = {
    update: XOR<ExperimentUpdateWithoutAssignmentsInput, ExperimentUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<ExperimentCreateWithoutAssignmentsInput, ExperimentUncheckedCreateWithoutAssignmentsInput>
    where?: ExperimentWhereInput
  }

  export type ExperimentUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: ExperimentWhereInput
    data: XOR<ExperimentUpdateWithoutAssignmentsInput, ExperimentUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ExperimentUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: EnumExperimentStatusFieldUpdateOperationsInput | $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: StringFieldUpdateOperationsInput | string
    modelKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: ExperimentEventUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: EnumExperimentStatusFieldUpdateOperationsInput | $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: StringFieldUpdateOperationsInput | string
    modelKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: ExperimentEventUncheckedUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentCreateWithoutEventsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: string
    modelKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: ExperimentAssignmentCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentUncheckedCreateWithoutEventsInput = {
    id?: string
    tenantId: string
    name: string
    description?: string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: string
    modelKey?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: ExperimentAssignmentUncheckedCreateNestedManyWithoutExperimentInput
  }

  export type ExperimentCreateOrConnectWithoutEventsInput = {
    where: ExperimentWhereUniqueInput
    create: XOR<ExperimentCreateWithoutEventsInput, ExperimentUncheckedCreateWithoutEventsInput>
  }

  export type ExperimentUpsertWithoutEventsInput = {
    update: XOR<ExperimentUpdateWithoutEventsInput, ExperimentUncheckedUpdateWithoutEventsInput>
    create: XOR<ExperimentCreateWithoutEventsInput, ExperimentUncheckedCreateWithoutEventsInput>
    where?: ExperimentWhereInput
  }

  export type ExperimentUpdateToOneWithWhereWithoutEventsInput = {
    where?: ExperimentWhereInput
    data: XOR<ExperimentUpdateWithoutEventsInput, ExperimentUncheckedUpdateWithoutEventsInput>
  }

  export type ExperimentUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: EnumExperimentStatusFieldUpdateOperationsInput | $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: StringFieldUpdateOperationsInput | string
    modelKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ExperimentAssignmentUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    variants?: JsonNullValueInput | InputJsonValue
    targetAudience?: JsonNullValueInput | InputJsonValue
    status?: EnumExperimentStatusFieldUpdateOperationsInput | $Enums.ExperimentStatus
    metricsTracked?: JsonNullValueInput | InputJsonValue
    experimentType?: StringFieldUpdateOperationsInput | string
    modelKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ExperimentAssignmentUncheckedUpdateManyWithoutExperimentNestedInput
  }

  export type ExperimentAssignmentCreateManyExperimentInput = {
    id?: string
    tenantId: string
    userId?: string | null
    variant: string
    assignedAt?: Date | string
  }

  export type ExperimentEventCreateManyExperimentInput = {
    id?: string
    tenantId: string
    userId?: string | null
    variant: string
    eventType: string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: Date | string
  }

  export type ExperimentAssignmentUpdateWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentAssignmentUncheckedUpdateWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentAssignmentUncheckedUpdateManyWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentEventUpdateWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentEventUncheckedUpdateWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExperimentEventUncheckedUpdateManyWithoutExperimentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    variant?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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