
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
 * Model AIModelDeployment
 * 
 */
export type AIModelDeployment = $Result.DefaultSelection<Prisma.$AIModelDeploymentPayload>
/**
 * Model AIDeploymentMetric
 * 
 */
export type AIDeploymentMetric = $Result.DefaultSelection<Prisma.$AIDeploymentMetricPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AIDeploymentStatus: {
  DEPLOYING: 'DEPLOYING',
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  ROLLED_BACK: 'ROLLED_BACK'
};

export type AIDeploymentStatus = (typeof AIDeploymentStatus)[keyof typeof AIDeploymentStatus]


export const AIRegionHealth: {
  HEALTHY: 'HEALTHY',
  DEGRADED: 'DEGRADED',
  UNHEALTHY: 'UNHEALTHY'
};

export type AIRegionHealth = (typeof AIRegionHealth)[keyof typeof AIRegionHealth]

}

export type AIDeploymentStatus = $Enums.AIDeploymentStatus

export const AIDeploymentStatus: typeof $Enums.AIDeploymentStatus

export type AIRegionHealth = $Enums.AIRegionHealth

export const AIRegionHealth: typeof $Enums.AIRegionHealth

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AIModelDeployments
 * const aIModelDeployments = await prisma.aIModelDeployment.findMany()
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
   * // Fetch zero or more AIModelDeployments
   * const aIModelDeployments = await prisma.aIModelDeployment.findMany()
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
   * `prisma.aIModelDeployment`: Exposes CRUD operations for the **AIModelDeployment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIModelDeployments
    * const aIModelDeployments = await prisma.aIModelDeployment.findMany()
    * ```
    */
  get aIModelDeployment(): Prisma.AIModelDeploymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIDeploymentMetric`: Exposes CRUD operations for the **AIDeploymentMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIDeploymentMetrics
    * const aIDeploymentMetrics = await prisma.aIDeploymentMetric.findMany()
    * ```
    */
  get aIDeploymentMetric(): Prisma.AIDeploymentMetricDelegate<ExtArgs, ClientOptions>;
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
    AIModelDeployment: 'AIModelDeployment',
    AIDeploymentMetric: 'AIDeploymentMetric'
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
      modelProps: "aIModelDeployment" | "aIDeploymentMetric"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AIModelDeployment: {
        payload: Prisma.$AIModelDeploymentPayload<ExtArgs>
        fields: Prisma.AIModelDeploymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIModelDeploymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIModelDeploymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>
          }
          findFirst: {
            args: Prisma.AIModelDeploymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIModelDeploymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>
          }
          findMany: {
            args: Prisma.AIModelDeploymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>[]
          }
          create: {
            args: Prisma.AIModelDeploymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>
          }
          createMany: {
            args: Prisma.AIModelDeploymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIModelDeploymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>[]
          }
          delete: {
            args: Prisma.AIModelDeploymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>
          }
          update: {
            args: Prisma.AIModelDeploymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>
          }
          deleteMany: {
            args: Prisma.AIModelDeploymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIModelDeploymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIModelDeploymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>[]
          }
          upsert: {
            args: Prisma.AIModelDeploymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIModelDeploymentPayload>
          }
          aggregate: {
            args: Prisma.AIModelDeploymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIModelDeployment>
          }
          groupBy: {
            args: Prisma.AIModelDeploymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIModelDeploymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIModelDeploymentCountArgs<ExtArgs>
            result: $Utils.Optional<AIModelDeploymentCountAggregateOutputType> | number
          }
        }
      }
      AIDeploymentMetric: {
        payload: Prisma.$AIDeploymentMetricPayload<ExtArgs>
        fields: Prisma.AIDeploymentMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIDeploymentMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIDeploymentMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>
          }
          findFirst: {
            args: Prisma.AIDeploymentMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIDeploymentMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>
          }
          findMany: {
            args: Prisma.AIDeploymentMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>[]
          }
          create: {
            args: Prisma.AIDeploymentMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>
          }
          createMany: {
            args: Prisma.AIDeploymentMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIDeploymentMetricCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>[]
          }
          delete: {
            args: Prisma.AIDeploymentMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>
          }
          update: {
            args: Prisma.AIDeploymentMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>
          }
          deleteMany: {
            args: Prisma.AIDeploymentMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIDeploymentMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIDeploymentMetricUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>[]
          }
          upsert: {
            args: Prisma.AIDeploymentMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDeploymentMetricPayload>
          }
          aggregate: {
            args: Prisma.AIDeploymentMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIDeploymentMetric>
          }
          groupBy: {
            args: Prisma.AIDeploymentMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIDeploymentMetricGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIDeploymentMetricCountArgs<ExtArgs>
            result: $Utils.Optional<AIDeploymentMetricCountAggregateOutputType> | number
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
    aIModelDeployment?: AIModelDeploymentOmit
    aIDeploymentMetric?: AIDeploymentMetricOmit
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
   * Model AIModelDeployment
   */

  export type AggregateAIModelDeployment = {
    _count: AIModelDeploymentCountAggregateOutputType | null
    _min: AIModelDeploymentMinAggregateOutputType | null
    _max: AIModelDeploymentMaxAggregateOutputType | null
  }

  export type AIModelDeploymentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    version: string | null
    status: $Enums.AIDeploymentStatus | null
    artifactLocation: string | null
    previousDeploymentId: string | null
    failoverRegion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIModelDeploymentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    version: string | null
    status: $Enums.AIDeploymentStatus | null
    artifactLocation: string | null
    previousDeploymentId: string | null
    failoverRegion: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AIModelDeploymentCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    version: number
    regions: number
    rollout: number
    health: number
    status: number
    artifactLocation: number
    previousDeploymentId: number
    pipeline: number
    failoverRegion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AIModelDeploymentMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    version?: true
    status?: true
    artifactLocation?: true
    previousDeploymentId?: true
    failoverRegion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIModelDeploymentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    version?: true
    status?: true
    artifactLocation?: true
    previousDeploymentId?: true
    failoverRegion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AIModelDeploymentCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    version?: true
    regions?: true
    rollout?: true
    health?: true
    status?: true
    artifactLocation?: true
    previousDeploymentId?: true
    pipeline?: true
    failoverRegion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AIModelDeploymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIModelDeployment to aggregate.
     */
    where?: AIModelDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelDeployments to fetch.
     */
    orderBy?: AIModelDeploymentOrderByWithRelationInput | AIModelDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIModelDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIModelDeployments
    **/
    _count?: true | AIModelDeploymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIModelDeploymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIModelDeploymentMaxAggregateInputType
  }

  export type GetAIModelDeploymentAggregateType<T extends AIModelDeploymentAggregateArgs> = {
        [P in keyof T & keyof AggregateAIModelDeployment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIModelDeployment[P]>
      : GetScalarType<T[P], AggregateAIModelDeployment[P]>
  }




  export type AIModelDeploymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIModelDeploymentWhereInput
    orderBy?: AIModelDeploymentOrderByWithAggregationInput | AIModelDeploymentOrderByWithAggregationInput[]
    by: AIModelDeploymentScalarFieldEnum[] | AIModelDeploymentScalarFieldEnum
    having?: AIModelDeploymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIModelDeploymentCountAggregateInputType | true
    _min?: AIModelDeploymentMinAggregateInputType
    _max?: AIModelDeploymentMaxAggregateInputType
  }

  export type AIModelDeploymentGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string
    version: string
    regions: JsonValue
    rollout: JsonValue
    health: JsonValue
    status: $Enums.AIDeploymentStatus
    artifactLocation: string
    previousDeploymentId: string | null
    pipeline: JsonValue
    failoverRegion: string | null
    createdAt: Date
    updatedAt: Date
    _count: AIModelDeploymentCountAggregateOutputType | null
    _min: AIModelDeploymentMinAggregateOutputType | null
    _max: AIModelDeploymentMaxAggregateOutputType | null
  }

  type GetAIModelDeploymentGroupByPayload<T extends AIModelDeploymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIModelDeploymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIModelDeploymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIModelDeploymentGroupByOutputType[P]>
            : GetScalarType<T[P], AIModelDeploymentGroupByOutputType[P]>
        }
      >
    >


  export type AIModelDeploymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    version?: boolean
    regions?: boolean
    rollout?: boolean
    health?: boolean
    status?: boolean
    artifactLocation?: boolean
    previousDeploymentId?: boolean
    pipeline?: boolean
    failoverRegion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIModelDeployment"]>

  export type AIModelDeploymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    version?: boolean
    regions?: boolean
    rollout?: boolean
    health?: boolean
    status?: boolean
    artifactLocation?: boolean
    previousDeploymentId?: boolean
    pipeline?: boolean
    failoverRegion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIModelDeployment"]>

  export type AIModelDeploymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    version?: boolean
    regions?: boolean
    rollout?: boolean
    health?: boolean
    status?: boolean
    artifactLocation?: boolean
    previousDeploymentId?: boolean
    pipeline?: boolean
    failoverRegion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aIModelDeployment"]>

  export type AIModelDeploymentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    version?: boolean
    regions?: boolean
    rollout?: boolean
    health?: boolean
    status?: boolean
    artifactLocation?: boolean
    previousDeploymentId?: boolean
    pipeline?: boolean
    failoverRegion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AIModelDeploymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "version" | "regions" | "rollout" | "health" | "status" | "artifactLocation" | "previousDeploymentId" | "pipeline" | "failoverRegion" | "createdAt" | "updatedAt", ExtArgs["result"]["aIModelDeployment"]>

  export type $AIModelDeploymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIModelDeployment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string
      version: string
      regions: Prisma.JsonValue
      rollout: Prisma.JsonValue
      health: Prisma.JsonValue
      status: $Enums.AIDeploymentStatus
      artifactLocation: string
      previousDeploymentId: string | null
      pipeline: Prisma.JsonValue
      failoverRegion: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aIModelDeployment"]>
    composites: {}
  }

  type AIModelDeploymentGetPayload<S extends boolean | null | undefined | AIModelDeploymentDefaultArgs> = $Result.GetResult<Prisma.$AIModelDeploymentPayload, S>

  type AIModelDeploymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIModelDeploymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIModelDeploymentCountAggregateInputType | true
    }

  export interface AIModelDeploymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIModelDeployment'], meta: { name: 'AIModelDeployment' } }
    /**
     * Find zero or one AIModelDeployment that matches the filter.
     * @param {AIModelDeploymentFindUniqueArgs} args - Arguments to find a AIModelDeployment
     * @example
     * // Get one AIModelDeployment
     * const aIModelDeployment = await prisma.aIModelDeployment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIModelDeploymentFindUniqueArgs>(args: SelectSubset<T, AIModelDeploymentFindUniqueArgs<ExtArgs>>): Prisma__AIModelDeploymentClient<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIModelDeployment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIModelDeploymentFindUniqueOrThrowArgs} args - Arguments to find a AIModelDeployment
     * @example
     * // Get one AIModelDeployment
     * const aIModelDeployment = await prisma.aIModelDeployment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIModelDeploymentFindUniqueOrThrowArgs>(args: SelectSubset<T, AIModelDeploymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIModelDeploymentClient<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIModelDeployment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelDeploymentFindFirstArgs} args - Arguments to find a AIModelDeployment
     * @example
     * // Get one AIModelDeployment
     * const aIModelDeployment = await prisma.aIModelDeployment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIModelDeploymentFindFirstArgs>(args?: SelectSubset<T, AIModelDeploymentFindFirstArgs<ExtArgs>>): Prisma__AIModelDeploymentClient<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIModelDeployment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelDeploymentFindFirstOrThrowArgs} args - Arguments to find a AIModelDeployment
     * @example
     * // Get one AIModelDeployment
     * const aIModelDeployment = await prisma.aIModelDeployment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIModelDeploymentFindFirstOrThrowArgs>(args?: SelectSubset<T, AIModelDeploymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIModelDeploymentClient<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIModelDeployments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelDeploymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIModelDeployments
     * const aIModelDeployments = await prisma.aIModelDeployment.findMany()
     * 
     * // Get first 10 AIModelDeployments
     * const aIModelDeployments = await prisma.aIModelDeployment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIModelDeploymentWithIdOnly = await prisma.aIModelDeployment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIModelDeploymentFindManyArgs>(args?: SelectSubset<T, AIModelDeploymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIModelDeployment.
     * @param {AIModelDeploymentCreateArgs} args - Arguments to create a AIModelDeployment.
     * @example
     * // Create one AIModelDeployment
     * const AIModelDeployment = await prisma.aIModelDeployment.create({
     *   data: {
     *     // ... data to create a AIModelDeployment
     *   }
     * })
     * 
     */
    create<T extends AIModelDeploymentCreateArgs>(args: SelectSubset<T, AIModelDeploymentCreateArgs<ExtArgs>>): Prisma__AIModelDeploymentClient<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIModelDeployments.
     * @param {AIModelDeploymentCreateManyArgs} args - Arguments to create many AIModelDeployments.
     * @example
     * // Create many AIModelDeployments
     * const aIModelDeployment = await prisma.aIModelDeployment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIModelDeploymentCreateManyArgs>(args?: SelectSubset<T, AIModelDeploymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIModelDeployments and returns the data saved in the database.
     * @param {AIModelDeploymentCreateManyAndReturnArgs} args - Arguments to create many AIModelDeployments.
     * @example
     * // Create many AIModelDeployments
     * const aIModelDeployment = await prisma.aIModelDeployment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIModelDeployments and only return the `id`
     * const aIModelDeploymentWithIdOnly = await prisma.aIModelDeployment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIModelDeploymentCreateManyAndReturnArgs>(args?: SelectSubset<T, AIModelDeploymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIModelDeployment.
     * @param {AIModelDeploymentDeleteArgs} args - Arguments to delete one AIModelDeployment.
     * @example
     * // Delete one AIModelDeployment
     * const AIModelDeployment = await prisma.aIModelDeployment.delete({
     *   where: {
     *     // ... filter to delete one AIModelDeployment
     *   }
     * })
     * 
     */
    delete<T extends AIModelDeploymentDeleteArgs>(args: SelectSubset<T, AIModelDeploymentDeleteArgs<ExtArgs>>): Prisma__AIModelDeploymentClient<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIModelDeployment.
     * @param {AIModelDeploymentUpdateArgs} args - Arguments to update one AIModelDeployment.
     * @example
     * // Update one AIModelDeployment
     * const aIModelDeployment = await prisma.aIModelDeployment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIModelDeploymentUpdateArgs>(args: SelectSubset<T, AIModelDeploymentUpdateArgs<ExtArgs>>): Prisma__AIModelDeploymentClient<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIModelDeployments.
     * @param {AIModelDeploymentDeleteManyArgs} args - Arguments to filter AIModelDeployments to delete.
     * @example
     * // Delete a few AIModelDeployments
     * const { count } = await prisma.aIModelDeployment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIModelDeploymentDeleteManyArgs>(args?: SelectSubset<T, AIModelDeploymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIModelDeployments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelDeploymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIModelDeployments
     * const aIModelDeployment = await prisma.aIModelDeployment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIModelDeploymentUpdateManyArgs>(args: SelectSubset<T, AIModelDeploymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIModelDeployments and returns the data updated in the database.
     * @param {AIModelDeploymentUpdateManyAndReturnArgs} args - Arguments to update many AIModelDeployments.
     * @example
     * // Update many AIModelDeployments
     * const aIModelDeployment = await prisma.aIModelDeployment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIModelDeployments and only return the `id`
     * const aIModelDeploymentWithIdOnly = await prisma.aIModelDeployment.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIModelDeploymentUpdateManyAndReturnArgs>(args: SelectSubset<T, AIModelDeploymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIModelDeployment.
     * @param {AIModelDeploymentUpsertArgs} args - Arguments to update or create a AIModelDeployment.
     * @example
     * // Update or create a AIModelDeployment
     * const aIModelDeployment = await prisma.aIModelDeployment.upsert({
     *   create: {
     *     // ... data to create a AIModelDeployment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIModelDeployment we want to update
     *   }
     * })
     */
    upsert<T extends AIModelDeploymentUpsertArgs>(args: SelectSubset<T, AIModelDeploymentUpsertArgs<ExtArgs>>): Prisma__AIModelDeploymentClient<$Result.GetResult<Prisma.$AIModelDeploymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIModelDeployments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelDeploymentCountArgs} args - Arguments to filter AIModelDeployments to count.
     * @example
     * // Count the number of AIModelDeployments
     * const count = await prisma.aIModelDeployment.count({
     *   where: {
     *     // ... the filter for the AIModelDeployments we want to count
     *   }
     * })
    **/
    count<T extends AIModelDeploymentCountArgs>(
      args?: Subset<T, AIModelDeploymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIModelDeploymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIModelDeployment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelDeploymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIModelDeploymentAggregateArgs>(args: Subset<T, AIModelDeploymentAggregateArgs>): Prisma.PrismaPromise<GetAIModelDeploymentAggregateType<T>>

    /**
     * Group by AIModelDeployment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIModelDeploymentGroupByArgs} args - Group by arguments.
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
      T extends AIModelDeploymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIModelDeploymentGroupByArgs['orderBy'] }
        : { orderBy?: AIModelDeploymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIModelDeploymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIModelDeploymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIModelDeployment model
   */
  readonly fields: AIModelDeploymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIModelDeployment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIModelDeploymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIModelDeployment model
   */
  interface AIModelDeploymentFieldRefs {
    readonly id: FieldRef<"AIModelDeployment", 'String'>
    readonly tenantId: FieldRef<"AIModelDeployment", 'String'>
    readonly modelId: FieldRef<"AIModelDeployment", 'String'>
    readonly version: FieldRef<"AIModelDeployment", 'String'>
    readonly regions: FieldRef<"AIModelDeployment", 'Json'>
    readonly rollout: FieldRef<"AIModelDeployment", 'Json'>
    readonly health: FieldRef<"AIModelDeployment", 'Json'>
    readonly status: FieldRef<"AIModelDeployment", 'AIDeploymentStatus'>
    readonly artifactLocation: FieldRef<"AIModelDeployment", 'String'>
    readonly previousDeploymentId: FieldRef<"AIModelDeployment", 'String'>
    readonly pipeline: FieldRef<"AIModelDeployment", 'Json'>
    readonly failoverRegion: FieldRef<"AIModelDeployment", 'String'>
    readonly createdAt: FieldRef<"AIModelDeployment", 'DateTime'>
    readonly updatedAt: FieldRef<"AIModelDeployment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIModelDeployment findUnique
   */
  export type AIModelDeploymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * Filter, which AIModelDeployment to fetch.
     */
    where: AIModelDeploymentWhereUniqueInput
  }

  /**
   * AIModelDeployment findUniqueOrThrow
   */
  export type AIModelDeploymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * Filter, which AIModelDeployment to fetch.
     */
    where: AIModelDeploymentWhereUniqueInput
  }

  /**
   * AIModelDeployment findFirst
   */
  export type AIModelDeploymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * Filter, which AIModelDeployment to fetch.
     */
    where?: AIModelDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelDeployments to fetch.
     */
    orderBy?: AIModelDeploymentOrderByWithRelationInput | AIModelDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIModelDeployments.
     */
    cursor?: AIModelDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIModelDeployments.
     */
    distinct?: AIModelDeploymentScalarFieldEnum | AIModelDeploymentScalarFieldEnum[]
  }

  /**
   * AIModelDeployment findFirstOrThrow
   */
  export type AIModelDeploymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * Filter, which AIModelDeployment to fetch.
     */
    where?: AIModelDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelDeployments to fetch.
     */
    orderBy?: AIModelDeploymentOrderByWithRelationInput | AIModelDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIModelDeployments.
     */
    cursor?: AIModelDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIModelDeployments.
     */
    distinct?: AIModelDeploymentScalarFieldEnum | AIModelDeploymentScalarFieldEnum[]
  }

  /**
   * AIModelDeployment findMany
   */
  export type AIModelDeploymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * Filter, which AIModelDeployments to fetch.
     */
    where?: AIModelDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIModelDeployments to fetch.
     */
    orderBy?: AIModelDeploymentOrderByWithRelationInput | AIModelDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIModelDeployments.
     */
    cursor?: AIModelDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIModelDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIModelDeployments.
     */
    skip?: number
    distinct?: AIModelDeploymentScalarFieldEnum | AIModelDeploymentScalarFieldEnum[]
  }

  /**
   * AIModelDeployment create
   */
  export type AIModelDeploymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * The data needed to create a AIModelDeployment.
     */
    data: XOR<AIModelDeploymentCreateInput, AIModelDeploymentUncheckedCreateInput>
  }

  /**
   * AIModelDeployment createMany
   */
  export type AIModelDeploymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIModelDeployments.
     */
    data: AIModelDeploymentCreateManyInput | AIModelDeploymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIModelDeployment createManyAndReturn
   */
  export type AIModelDeploymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * The data used to create many AIModelDeployments.
     */
    data: AIModelDeploymentCreateManyInput | AIModelDeploymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIModelDeployment update
   */
  export type AIModelDeploymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * The data needed to update a AIModelDeployment.
     */
    data: XOR<AIModelDeploymentUpdateInput, AIModelDeploymentUncheckedUpdateInput>
    /**
     * Choose, which AIModelDeployment to update.
     */
    where: AIModelDeploymentWhereUniqueInput
  }

  /**
   * AIModelDeployment updateMany
   */
  export type AIModelDeploymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIModelDeployments.
     */
    data: XOR<AIModelDeploymentUpdateManyMutationInput, AIModelDeploymentUncheckedUpdateManyInput>
    /**
     * Filter which AIModelDeployments to update
     */
    where?: AIModelDeploymentWhereInput
    /**
     * Limit how many AIModelDeployments to update.
     */
    limit?: number
  }

  /**
   * AIModelDeployment updateManyAndReturn
   */
  export type AIModelDeploymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * The data used to update AIModelDeployments.
     */
    data: XOR<AIModelDeploymentUpdateManyMutationInput, AIModelDeploymentUncheckedUpdateManyInput>
    /**
     * Filter which AIModelDeployments to update
     */
    where?: AIModelDeploymentWhereInput
    /**
     * Limit how many AIModelDeployments to update.
     */
    limit?: number
  }

  /**
   * AIModelDeployment upsert
   */
  export type AIModelDeploymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * The filter to search for the AIModelDeployment to update in case it exists.
     */
    where: AIModelDeploymentWhereUniqueInput
    /**
     * In case the AIModelDeployment found by the `where` argument doesn't exist, create a new AIModelDeployment with this data.
     */
    create: XOR<AIModelDeploymentCreateInput, AIModelDeploymentUncheckedCreateInput>
    /**
     * In case the AIModelDeployment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIModelDeploymentUpdateInput, AIModelDeploymentUncheckedUpdateInput>
  }

  /**
   * AIModelDeployment delete
   */
  export type AIModelDeploymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
    /**
     * Filter which AIModelDeployment to delete.
     */
    where: AIModelDeploymentWhereUniqueInput
  }

  /**
   * AIModelDeployment deleteMany
   */
  export type AIModelDeploymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIModelDeployments to delete
     */
    where?: AIModelDeploymentWhereInput
    /**
     * Limit how many AIModelDeployments to delete.
     */
    limit?: number
  }

  /**
   * AIModelDeployment without action
   */
  export type AIModelDeploymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIModelDeployment
     */
    select?: AIModelDeploymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIModelDeployment
     */
    omit?: AIModelDeploymentOmit<ExtArgs> | null
  }


  /**
   * Model AIDeploymentMetric
   */

  export type AggregateAIDeploymentMetric = {
    _count: AIDeploymentMetricCountAggregateOutputType | null
    _avg: AIDeploymentMetricAvgAggregateOutputType | null
    _sum: AIDeploymentMetricSumAggregateOutputType | null
    _min: AIDeploymentMetricMinAggregateOutputType | null
    _max: AIDeploymentMetricMaxAggregateOutputType | null
  }

  export type AIDeploymentMetricAvgAggregateOutputType = {
    requests: number | null
    latencyMs: number | null
    errorRate: number | null
    tokenThroughput: number | null
    memoryUsageMb: number | null
    cpuLoad: number | null
    rolloutPercent: number | null
  }

  export type AIDeploymentMetricSumAggregateOutputType = {
    requests: number | null
    latencyMs: number | null
    errorRate: number | null
    tokenThroughput: number | null
    memoryUsageMb: number | null
    cpuLoad: number | null
    rolloutPercent: number | null
  }

  export type AIDeploymentMetricMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    version: string | null
    region: string | null
    timestamp: Date | null
    requests: number | null
    latencyMs: number | null
    errorRate: number | null
    tokenThroughput: number | null
    memoryUsageMb: number | null
    cpuLoad: number | null
    rolloutPercent: number | null
    canaryStable: boolean | null
  }

  export type AIDeploymentMetricMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    version: string | null
    region: string | null
    timestamp: Date | null
    requests: number | null
    latencyMs: number | null
    errorRate: number | null
    tokenThroughput: number | null
    memoryUsageMb: number | null
    cpuLoad: number | null
    rolloutPercent: number | null
    canaryStable: boolean | null
  }

  export type AIDeploymentMetricCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    version: number
    region: number
    timestamp: number
    requests: number
    latencyMs: number
    errorRate: number
    tokenThroughput: number
    memoryUsageMb: number
    cpuLoad: number
    rolloutPercent: number
    canaryStable: number
    _all: number
  }


  export type AIDeploymentMetricAvgAggregateInputType = {
    requests?: true
    latencyMs?: true
    errorRate?: true
    tokenThroughput?: true
    memoryUsageMb?: true
    cpuLoad?: true
    rolloutPercent?: true
  }

  export type AIDeploymentMetricSumAggregateInputType = {
    requests?: true
    latencyMs?: true
    errorRate?: true
    tokenThroughput?: true
    memoryUsageMb?: true
    cpuLoad?: true
    rolloutPercent?: true
  }

  export type AIDeploymentMetricMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    version?: true
    region?: true
    timestamp?: true
    requests?: true
    latencyMs?: true
    errorRate?: true
    tokenThroughput?: true
    memoryUsageMb?: true
    cpuLoad?: true
    rolloutPercent?: true
    canaryStable?: true
  }

  export type AIDeploymentMetricMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    version?: true
    region?: true
    timestamp?: true
    requests?: true
    latencyMs?: true
    errorRate?: true
    tokenThroughput?: true
    memoryUsageMb?: true
    cpuLoad?: true
    rolloutPercent?: true
    canaryStable?: true
  }

  export type AIDeploymentMetricCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    version?: true
    region?: true
    timestamp?: true
    requests?: true
    latencyMs?: true
    errorRate?: true
    tokenThroughput?: true
    memoryUsageMb?: true
    cpuLoad?: true
    rolloutPercent?: true
    canaryStable?: true
    _all?: true
  }

  export type AIDeploymentMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDeploymentMetric to aggregate.
     */
    where?: AIDeploymentMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDeploymentMetrics to fetch.
     */
    orderBy?: AIDeploymentMetricOrderByWithRelationInput | AIDeploymentMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIDeploymentMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDeploymentMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDeploymentMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIDeploymentMetrics
    **/
    _count?: true | AIDeploymentMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIDeploymentMetricAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIDeploymentMetricSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIDeploymentMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIDeploymentMetricMaxAggregateInputType
  }

  export type GetAIDeploymentMetricAggregateType<T extends AIDeploymentMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateAIDeploymentMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIDeploymentMetric[P]>
      : GetScalarType<T[P], AggregateAIDeploymentMetric[P]>
  }




  export type AIDeploymentMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDeploymentMetricWhereInput
    orderBy?: AIDeploymentMetricOrderByWithAggregationInput | AIDeploymentMetricOrderByWithAggregationInput[]
    by: AIDeploymentMetricScalarFieldEnum[] | AIDeploymentMetricScalarFieldEnum
    having?: AIDeploymentMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIDeploymentMetricCountAggregateInputType | true
    _avg?: AIDeploymentMetricAvgAggregateInputType
    _sum?: AIDeploymentMetricSumAggregateInputType
    _min?: AIDeploymentMetricMinAggregateInputType
    _max?: AIDeploymentMetricMaxAggregateInputType
  }

  export type AIDeploymentMetricGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string
    version: string
    region: string
    timestamp: Date
    requests: number
    latencyMs: number
    errorRate: number
    tokenThroughput: number
    memoryUsageMb: number
    cpuLoad: number
    rolloutPercent: number
    canaryStable: boolean
    _count: AIDeploymentMetricCountAggregateOutputType | null
    _avg: AIDeploymentMetricAvgAggregateOutputType | null
    _sum: AIDeploymentMetricSumAggregateOutputType | null
    _min: AIDeploymentMetricMinAggregateOutputType | null
    _max: AIDeploymentMetricMaxAggregateOutputType | null
  }

  type GetAIDeploymentMetricGroupByPayload<T extends AIDeploymentMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIDeploymentMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIDeploymentMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIDeploymentMetricGroupByOutputType[P]>
            : GetScalarType<T[P], AIDeploymentMetricGroupByOutputType[P]>
        }
      >
    >


  export type AIDeploymentMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    version?: boolean
    region?: boolean
    timestamp?: boolean
    requests?: boolean
    latencyMs?: boolean
    errorRate?: boolean
    tokenThroughput?: boolean
    memoryUsageMb?: boolean
    cpuLoad?: boolean
    rolloutPercent?: boolean
    canaryStable?: boolean
  }, ExtArgs["result"]["aIDeploymentMetric"]>

  export type AIDeploymentMetricSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    version?: boolean
    region?: boolean
    timestamp?: boolean
    requests?: boolean
    latencyMs?: boolean
    errorRate?: boolean
    tokenThroughput?: boolean
    memoryUsageMb?: boolean
    cpuLoad?: boolean
    rolloutPercent?: boolean
    canaryStable?: boolean
  }, ExtArgs["result"]["aIDeploymentMetric"]>

  export type AIDeploymentMetricSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    version?: boolean
    region?: boolean
    timestamp?: boolean
    requests?: boolean
    latencyMs?: boolean
    errorRate?: boolean
    tokenThroughput?: boolean
    memoryUsageMb?: boolean
    cpuLoad?: boolean
    rolloutPercent?: boolean
    canaryStable?: boolean
  }, ExtArgs["result"]["aIDeploymentMetric"]>

  export type AIDeploymentMetricSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    version?: boolean
    region?: boolean
    timestamp?: boolean
    requests?: boolean
    latencyMs?: boolean
    errorRate?: boolean
    tokenThroughput?: boolean
    memoryUsageMb?: boolean
    cpuLoad?: boolean
    rolloutPercent?: boolean
    canaryStable?: boolean
  }

  export type AIDeploymentMetricOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "version" | "region" | "timestamp" | "requests" | "latencyMs" | "errorRate" | "tokenThroughput" | "memoryUsageMb" | "cpuLoad" | "rolloutPercent" | "canaryStable", ExtArgs["result"]["aIDeploymentMetric"]>

  export type $AIDeploymentMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIDeploymentMetric"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string
      version: string
      region: string
      timestamp: Date
      requests: number
      latencyMs: number
      errorRate: number
      tokenThroughput: number
      memoryUsageMb: number
      cpuLoad: number
      rolloutPercent: number
      canaryStable: boolean
    }, ExtArgs["result"]["aIDeploymentMetric"]>
    composites: {}
  }

  type AIDeploymentMetricGetPayload<S extends boolean | null | undefined | AIDeploymentMetricDefaultArgs> = $Result.GetResult<Prisma.$AIDeploymentMetricPayload, S>

  type AIDeploymentMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIDeploymentMetricFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIDeploymentMetricCountAggregateInputType | true
    }

  export interface AIDeploymentMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIDeploymentMetric'], meta: { name: 'AIDeploymentMetric' } }
    /**
     * Find zero or one AIDeploymentMetric that matches the filter.
     * @param {AIDeploymentMetricFindUniqueArgs} args - Arguments to find a AIDeploymentMetric
     * @example
     * // Get one AIDeploymentMetric
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIDeploymentMetricFindUniqueArgs>(args: SelectSubset<T, AIDeploymentMetricFindUniqueArgs<ExtArgs>>): Prisma__AIDeploymentMetricClient<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIDeploymentMetric that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIDeploymentMetricFindUniqueOrThrowArgs} args - Arguments to find a AIDeploymentMetric
     * @example
     * // Get one AIDeploymentMetric
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIDeploymentMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, AIDeploymentMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIDeploymentMetricClient<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDeploymentMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDeploymentMetricFindFirstArgs} args - Arguments to find a AIDeploymentMetric
     * @example
     * // Get one AIDeploymentMetric
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIDeploymentMetricFindFirstArgs>(args?: SelectSubset<T, AIDeploymentMetricFindFirstArgs<ExtArgs>>): Prisma__AIDeploymentMetricClient<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDeploymentMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDeploymentMetricFindFirstOrThrowArgs} args - Arguments to find a AIDeploymentMetric
     * @example
     * // Get one AIDeploymentMetric
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIDeploymentMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, AIDeploymentMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIDeploymentMetricClient<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIDeploymentMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDeploymentMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIDeploymentMetrics
     * const aIDeploymentMetrics = await prisma.aIDeploymentMetric.findMany()
     * 
     * // Get first 10 AIDeploymentMetrics
     * const aIDeploymentMetrics = await prisma.aIDeploymentMetric.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIDeploymentMetricWithIdOnly = await prisma.aIDeploymentMetric.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIDeploymentMetricFindManyArgs>(args?: SelectSubset<T, AIDeploymentMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIDeploymentMetric.
     * @param {AIDeploymentMetricCreateArgs} args - Arguments to create a AIDeploymentMetric.
     * @example
     * // Create one AIDeploymentMetric
     * const AIDeploymentMetric = await prisma.aIDeploymentMetric.create({
     *   data: {
     *     // ... data to create a AIDeploymentMetric
     *   }
     * })
     * 
     */
    create<T extends AIDeploymentMetricCreateArgs>(args: SelectSubset<T, AIDeploymentMetricCreateArgs<ExtArgs>>): Prisma__AIDeploymentMetricClient<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIDeploymentMetrics.
     * @param {AIDeploymentMetricCreateManyArgs} args - Arguments to create many AIDeploymentMetrics.
     * @example
     * // Create many AIDeploymentMetrics
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIDeploymentMetricCreateManyArgs>(args?: SelectSubset<T, AIDeploymentMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIDeploymentMetrics and returns the data saved in the database.
     * @param {AIDeploymentMetricCreateManyAndReturnArgs} args - Arguments to create many AIDeploymentMetrics.
     * @example
     * // Create many AIDeploymentMetrics
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIDeploymentMetrics and only return the `id`
     * const aIDeploymentMetricWithIdOnly = await prisma.aIDeploymentMetric.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIDeploymentMetricCreateManyAndReturnArgs>(args?: SelectSubset<T, AIDeploymentMetricCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIDeploymentMetric.
     * @param {AIDeploymentMetricDeleteArgs} args - Arguments to delete one AIDeploymentMetric.
     * @example
     * // Delete one AIDeploymentMetric
     * const AIDeploymentMetric = await prisma.aIDeploymentMetric.delete({
     *   where: {
     *     // ... filter to delete one AIDeploymentMetric
     *   }
     * })
     * 
     */
    delete<T extends AIDeploymentMetricDeleteArgs>(args: SelectSubset<T, AIDeploymentMetricDeleteArgs<ExtArgs>>): Prisma__AIDeploymentMetricClient<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIDeploymentMetric.
     * @param {AIDeploymentMetricUpdateArgs} args - Arguments to update one AIDeploymentMetric.
     * @example
     * // Update one AIDeploymentMetric
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIDeploymentMetricUpdateArgs>(args: SelectSubset<T, AIDeploymentMetricUpdateArgs<ExtArgs>>): Prisma__AIDeploymentMetricClient<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIDeploymentMetrics.
     * @param {AIDeploymentMetricDeleteManyArgs} args - Arguments to filter AIDeploymentMetrics to delete.
     * @example
     * // Delete a few AIDeploymentMetrics
     * const { count } = await prisma.aIDeploymentMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIDeploymentMetricDeleteManyArgs>(args?: SelectSubset<T, AIDeploymentMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDeploymentMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDeploymentMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIDeploymentMetrics
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIDeploymentMetricUpdateManyArgs>(args: SelectSubset<T, AIDeploymentMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDeploymentMetrics and returns the data updated in the database.
     * @param {AIDeploymentMetricUpdateManyAndReturnArgs} args - Arguments to update many AIDeploymentMetrics.
     * @example
     * // Update many AIDeploymentMetrics
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIDeploymentMetrics and only return the `id`
     * const aIDeploymentMetricWithIdOnly = await prisma.aIDeploymentMetric.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIDeploymentMetricUpdateManyAndReturnArgs>(args: SelectSubset<T, AIDeploymentMetricUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIDeploymentMetric.
     * @param {AIDeploymentMetricUpsertArgs} args - Arguments to update or create a AIDeploymentMetric.
     * @example
     * // Update or create a AIDeploymentMetric
     * const aIDeploymentMetric = await prisma.aIDeploymentMetric.upsert({
     *   create: {
     *     // ... data to create a AIDeploymentMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIDeploymentMetric we want to update
     *   }
     * })
     */
    upsert<T extends AIDeploymentMetricUpsertArgs>(args: SelectSubset<T, AIDeploymentMetricUpsertArgs<ExtArgs>>): Prisma__AIDeploymentMetricClient<$Result.GetResult<Prisma.$AIDeploymentMetricPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIDeploymentMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDeploymentMetricCountArgs} args - Arguments to filter AIDeploymentMetrics to count.
     * @example
     * // Count the number of AIDeploymentMetrics
     * const count = await prisma.aIDeploymentMetric.count({
     *   where: {
     *     // ... the filter for the AIDeploymentMetrics we want to count
     *   }
     * })
    **/
    count<T extends AIDeploymentMetricCountArgs>(
      args?: Subset<T, AIDeploymentMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIDeploymentMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIDeploymentMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDeploymentMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIDeploymentMetricAggregateArgs>(args: Subset<T, AIDeploymentMetricAggregateArgs>): Prisma.PrismaPromise<GetAIDeploymentMetricAggregateType<T>>

    /**
     * Group by AIDeploymentMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDeploymentMetricGroupByArgs} args - Group by arguments.
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
      T extends AIDeploymentMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIDeploymentMetricGroupByArgs['orderBy'] }
        : { orderBy?: AIDeploymentMetricGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIDeploymentMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIDeploymentMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIDeploymentMetric model
   */
  readonly fields: AIDeploymentMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIDeploymentMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIDeploymentMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIDeploymentMetric model
   */
  interface AIDeploymentMetricFieldRefs {
    readonly id: FieldRef<"AIDeploymentMetric", 'String'>
    readonly tenantId: FieldRef<"AIDeploymentMetric", 'String'>
    readonly modelId: FieldRef<"AIDeploymentMetric", 'String'>
    readonly version: FieldRef<"AIDeploymentMetric", 'String'>
    readonly region: FieldRef<"AIDeploymentMetric", 'String'>
    readonly timestamp: FieldRef<"AIDeploymentMetric", 'DateTime'>
    readonly requests: FieldRef<"AIDeploymentMetric", 'Int'>
    readonly latencyMs: FieldRef<"AIDeploymentMetric", 'Float'>
    readonly errorRate: FieldRef<"AIDeploymentMetric", 'Float'>
    readonly tokenThroughput: FieldRef<"AIDeploymentMetric", 'Float'>
    readonly memoryUsageMb: FieldRef<"AIDeploymentMetric", 'Float'>
    readonly cpuLoad: FieldRef<"AIDeploymentMetric", 'Float'>
    readonly rolloutPercent: FieldRef<"AIDeploymentMetric", 'Int'>
    readonly canaryStable: FieldRef<"AIDeploymentMetric", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AIDeploymentMetric findUnique
   */
  export type AIDeploymentMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDeploymentMetric to fetch.
     */
    where: AIDeploymentMetricWhereUniqueInput
  }

  /**
   * AIDeploymentMetric findUniqueOrThrow
   */
  export type AIDeploymentMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDeploymentMetric to fetch.
     */
    where: AIDeploymentMetricWhereUniqueInput
  }

  /**
   * AIDeploymentMetric findFirst
   */
  export type AIDeploymentMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDeploymentMetric to fetch.
     */
    where?: AIDeploymentMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDeploymentMetrics to fetch.
     */
    orderBy?: AIDeploymentMetricOrderByWithRelationInput | AIDeploymentMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDeploymentMetrics.
     */
    cursor?: AIDeploymentMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDeploymentMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDeploymentMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDeploymentMetrics.
     */
    distinct?: AIDeploymentMetricScalarFieldEnum | AIDeploymentMetricScalarFieldEnum[]
  }

  /**
   * AIDeploymentMetric findFirstOrThrow
   */
  export type AIDeploymentMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDeploymentMetric to fetch.
     */
    where?: AIDeploymentMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDeploymentMetrics to fetch.
     */
    orderBy?: AIDeploymentMetricOrderByWithRelationInput | AIDeploymentMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDeploymentMetrics.
     */
    cursor?: AIDeploymentMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDeploymentMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDeploymentMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDeploymentMetrics.
     */
    distinct?: AIDeploymentMetricScalarFieldEnum | AIDeploymentMetricScalarFieldEnum[]
  }

  /**
   * AIDeploymentMetric findMany
   */
  export type AIDeploymentMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDeploymentMetrics to fetch.
     */
    where?: AIDeploymentMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDeploymentMetrics to fetch.
     */
    orderBy?: AIDeploymentMetricOrderByWithRelationInput | AIDeploymentMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIDeploymentMetrics.
     */
    cursor?: AIDeploymentMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDeploymentMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDeploymentMetrics.
     */
    skip?: number
    distinct?: AIDeploymentMetricScalarFieldEnum | AIDeploymentMetricScalarFieldEnum[]
  }

  /**
   * AIDeploymentMetric create
   */
  export type AIDeploymentMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * The data needed to create a AIDeploymentMetric.
     */
    data: XOR<AIDeploymentMetricCreateInput, AIDeploymentMetricUncheckedCreateInput>
  }

  /**
   * AIDeploymentMetric createMany
   */
  export type AIDeploymentMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIDeploymentMetrics.
     */
    data: AIDeploymentMetricCreateManyInput | AIDeploymentMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDeploymentMetric createManyAndReturn
   */
  export type AIDeploymentMetricCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * The data used to create many AIDeploymentMetrics.
     */
    data: AIDeploymentMetricCreateManyInput | AIDeploymentMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDeploymentMetric update
   */
  export type AIDeploymentMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * The data needed to update a AIDeploymentMetric.
     */
    data: XOR<AIDeploymentMetricUpdateInput, AIDeploymentMetricUncheckedUpdateInput>
    /**
     * Choose, which AIDeploymentMetric to update.
     */
    where: AIDeploymentMetricWhereUniqueInput
  }

  /**
   * AIDeploymentMetric updateMany
   */
  export type AIDeploymentMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIDeploymentMetrics.
     */
    data: XOR<AIDeploymentMetricUpdateManyMutationInput, AIDeploymentMetricUncheckedUpdateManyInput>
    /**
     * Filter which AIDeploymentMetrics to update
     */
    where?: AIDeploymentMetricWhereInput
    /**
     * Limit how many AIDeploymentMetrics to update.
     */
    limit?: number
  }

  /**
   * AIDeploymentMetric updateManyAndReturn
   */
  export type AIDeploymentMetricUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * The data used to update AIDeploymentMetrics.
     */
    data: XOR<AIDeploymentMetricUpdateManyMutationInput, AIDeploymentMetricUncheckedUpdateManyInput>
    /**
     * Filter which AIDeploymentMetrics to update
     */
    where?: AIDeploymentMetricWhereInput
    /**
     * Limit how many AIDeploymentMetrics to update.
     */
    limit?: number
  }

  /**
   * AIDeploymentMetric upsert
   */
  export type AIDeploymentMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * The filter to search for the AIDeploymentMetric to update in case it exists.
     */
    where: AIDeploymentMetricWhereUniqueInput
    /**
     * In case the AIDeploymentMetric found by the `where` argument doesn't exist, create a new AIDeploymentMetric with this data.
     */
    create: XOR<AIDeploymentMetricCreateInput, AIDeploymentMetricUncheckedCreateInput>
    /**
     * In case the AIDeploymentMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIDeploymentMetricUpdateInput, AIDeploymentMetricUncheckedUpdateInput>
  }

  /**
   * AIDeploymentMetric delete
   */
  export type AIDeploymentMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
    /**
     * Filter which AIDeploymentMetric to delete.
     */
    where: AIDeploymentMetricWhereUniqueInput
  }

  /**
   * AIDeploymentMetric deleteMany
   */
  export type AIDeploymentMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDeploymentMetrics to delete
     */
    where?: AIDeploymentMetricWhereInput
    /**
     * Limit how many AIDeploymentMetrics to delete.
     */
    limit?: number
  }

  /**
   * AIDeploymentMetric without action
   */
  export type AIDeploymentMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDeploymentMetric
     */
    select?: AIDeploymentMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDeploymentMetric
     */
    omit?: AIDeploymentMetricOmit<ExtArgs> | null
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


  export const AIModelDeploymentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    version: 'version',
    regions: 'regions',
    rollout: 'rollout',
    health: 'health',
    status: 'status',
    artifactLocation: 'artifactLocation',
    previousDeploymentId: 'previousDeploymentId',
    pipeline: 'pipeline',
    failoverRegion: 'failoverRegion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AIModelDeploymentScalarFieldEnum = (typeof AIModelDeploymentScalarFieldEnum)[keyof typeof AIModelDeploymentScalarFieldEnum]


  export const AIDeploymentMetricScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    version: 'version',
    region: 'region',
    timestamp: 'timestamp',
    requests: 'requests',
    latencyMs: 'latencyMs',
    errorRate: 'errorRate',
    tokenThroughput: 'tokenThroughput',
    memoryUsageMb: 'memoryUsageMb',
    cpuLoad: 'cpuLoad',
    rolloutPercent: 'rolloutPercent',
    canaryStable: 'canaryStable'
  };

  export type AIDeploymentMetricScalarFieldEnum = (typeof AIDeploymentMetricScalarFieldEnum)[keyof typeof AIDeploymentMetricScalarFieldEnum]


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
   * Reference to a field of type 'AIDeploymentStatus'
   */
  export type EnumAIDeploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDeploymentStatus'>
    


  /**
   * Reference to a field of type 'AIDeploymentStatus[]'
   */
  export type ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDeploymentStatus[]'>
    


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type AIModelDeploymentWhereInput = {
    AND?: AIModelDeploymentWhereInput | AIModelDeploymentWhereInput[]
    OR?: AIModelDeploymentWhereInput[]
    NOT?: AIModelDeploymentWhereInput | AIModelDeploymentWhereInput[]
    id?: StringFilter<"AIModelDeployment"> | string
    tenantId?: StringFilter<"AIModelDeployment"> | string
    modelId?: StringFilter<"AIModelDeployment"> | string
    version?: StringFilter<"AIModelDeployment"> | string
    regions?: JsonFilter<"AIModelDeployment">
    rollout?: JsonFilter<"AIModelDeployment">
    health?: JsonFilter<"AIModelDeployment">
    status?: EnumAIDeploymentStatusFilter<"AIModelDeployment"> | $Enums.AIDeploymentStatus
    artifactLocation?: StringFilter<"AIModelDeployment"> | string
    previousDeploymentId?: StringNullableFilter<"AIModelDeployment"> | string | null
    pipeline?: JsonFilter<"AIModelDeployment">
    failoverRegion?: StringNullableFilter<"AIModelDeployment"> | string | null
    createdAt?: DateTimeFilter<"AIModelDeployment"> | Date | string
    updatedAt?: DateTimeFilter<"AIModelDeployment"> | Date | string
  }

  export type AIModelDeploymentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    regions?: SortOrder
    rollout?: SortOrder
    health?: SortOrder
    status?: SortOrder
    artifactLocation?: SortOrder
    previousDeploymentId?: SortOrderInput | SortOrder
    pipeline?: SortOrder
    failoverRegion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIModelDeploymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_modelId_version?: AIModelDeploymentTenantIdModelIdVersionCompoundUniqueInput
    AND?: AIModelDeploymentWhereInput | AIModelDeploymentWhereInput[]
    OR?: AIModelDeploymentWhereInput[]
    NOT?: AIModelDeploymentWhereInput | AIModelDeploymentWhereInput[]
    tenantId?: StringFilter<"AIModelDeployment"> | string
    modelId?: StringFilter<"AIModelDeployment"> | string
    version?: StringFilter<"AIModelDeployment"> | string
    regions?: JsonFilter<"AIModelDeployment">
    rollout?: JsonFilter<"AIModelDeployment">
    health?: JsonFilter<"AIModelDeployment">
    status?: EnumAIDeploymentStatusFilter<"AIModelDeployment"> | $Enums.AIDeploymentStatus
    artifactLocation?: StringFilter<"AIModelDeployment"> | string
    previousDeploymentId?: StringNullableFilter<"AIModelDeployment"> | string | null
    pipeline?: JsonFilter<"AIModelDeployment">
    failoverRegion?: StringNullableFilter<"AIModelDeployment"> | string | null
    createdAt?: DateTimeFilter<"AIModelDeployment"> | Date | string
    updatedAt?: DateTimeFilter<"AIModelDeployment"> | Date | string
  }, "id" | "tenantId_modelId_version">

  export type AIModelDeploymentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    regions?: SortOrder
    rollout?: SortOrder
    health?: SortOrder
    status?: SortOrder
    artifactLocation?: SortOrder
    previousDeploymentId?: SortOrderInput | SortOrder
    pipeline?: SortOrder
    failoverRegion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AIModelDeploymentCountOrderByAggregateInput
    _max?: AIModelDeploymentMaxOrderByAggregateInput
    _min?: AIModelDeploymentMinOrderByAggregateInput
  }

  export type AIModelDeploymentScalarWhereWithAggregatesInput = {
    AND?: AIModelDeploymentScalarWhereWithAggregatesInput | AIModelDeploymentScalarWhereWithAggregatesInput[]
    OR?: AIModelDeploymentScalarWhereWithAggregatesInput[]
    NOT?: AIModelDeploymentScalarWhereWithAggregatesInput | AIModelDeploymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIModelDeployment"> | string
    tenantId?: StringWithAggregatesFilter<"AIModelDeployment"> | string
    modelId?: StringWithAggregatesFilter<"AIModelDeployment"> | string
    version?: StringWithAggregatesFilter<"AIModelDeployment"> | string
    regions?: JsonWithAggregatesFilter<"AIModelDeployment">
    rollout?: JsonWithAggregatesFilter<"AIModelDeployment">
    health?: JsonWithAggregatesFilter<"AIModelDeployment">
    status?: EnumAIDeploymentStatusWithAggregatesFilter<"AIModelDeployment"> | $Enums.AIDeploymentStatus
    artifactLocation?: StringWithAggregatesFilter<"AIModelDeployment"> | string
    previousDeploymentId?: StringNullableWithAggregatesFilter<"AIModelDeployment"> | string | null
    pipeline?: JsonWithAggregatesFilter<"AIModelDeployment">
    failoverRegion?: StringNullableWithAggregatesFilter<"AIModelDeployment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AIModelDeployment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AIModelDeployment"> | Date | string
  }

  export type AIDeploymentMetricWhereInput = {
    AND?: AIDeploymentMetricWhereInput | AIDeploymentMetricWhereInput[]
    OR?: AIDeploymentMetricWhereInput[]
    NOT?: AIDeploymentMetricWhereInput | AIDeploymentMetricWhereInput[]
    id?: StringFilter<"AIDeploymentMetric"> | string
    tenantId?: StringFilter<"AIDeploymentMetric"> | string
    modelId?: StringFilter<"AIDeploymentMetric"> | string
    version?: StringFilter<"AIDeploymentMetric"> | string
    region?: StringFilter<"AIDeploymentMetric"> | string
    timestamp?: DateTimeFilter<"AIDeploymentMetric"> | Date | string
    requests?: IntFilter<"AIDeploymentMetric"> | number
    latencyMs?: FloatFilter<"AIDeploymentMetric"> | number
    errorRate?: FloatFilter<"AIDeploymentMetric"> | number
    tokenThroughput?: FloatFilter<"AIDeploymentMetric"> | number
    memoryUsageMb?: FloatFilter<"AIDeploymentMetric"> | number
    cpuLoad?: FloatFilter<"AIDeploymentMetric"> | number
    rolloutPercent?: IntFilter<"AIDeploymentMetric"> | number
    canaryStable?: BoolFilter<"AIDeploymentMetric"> | boolean
  }

  export type AIDeploymentMetricOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    region?: SortOrder
    timestamp?: SortOrder
    requests?: SortOrder
    latencyMs?: SortOrder
    errorRate?: SortOrder
    tokenThroughput?: SortOrder
    memoryUsageMb?: SortOrder
    cpuLoad?: SortOrder
    rolloutPercent?: SortOrder
    canaryStable?: SortOrder
  }

  export type AIDeploymentMetricWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIDeploymentMetricWhereInput | AIDeploymentMetricWhereInput[]
    OR?: AIDeploymentMetricWhereInput[]
    NOT?: AIDeploymentMetricWhereInput | AIDeploymentMetricWhereInput[]
    tenantId?: StringFilter<"AIDeploymentMetric"> | string
    modelId?: StringFilter<"AIDeploymentMetric"> | string
    version?: StringFilter<"AIDeploymentMetric"> | string
    region?: StringFilter<"AIDeploymentMetric"> | string
    timestamp?: DateTimeFilter<"AIDeploymentMetric"> | Date | string
    requests?: IntFilter<"AIDeploymentMetric"> | number
    latencyMs?: FloatFilter<"AIDeploymentMetric"> | number
    errorRate?: FloatFilter<"AIDeploymentMetric"> | number
    tokenThroughput?: FloatFilter<"AIDeploymentMetric"> | number
    memoryUsageMb?: FloatFilter<"AIDeploymentMetric"> | number
    cpuLoad?: FloatFilter<"AIDeploymentMetric"> | number
    rolloutPercent?: IntFilter<"AIDeploymentMetric"> | number
    canaryStable?: BoolFilter<"AIDeploymentMetric"> | boolean
  }, "id">

  export type AIDeploymentMetricOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    region?: SortOrder
    timestamp?: SortOrder
    requests?: SortOrder
    latencyMs?: SortOrder
    errorRate?: SortOrder
    tokenThroughput?: SortOrder
    memoryUsageMb?: SortOrder
    cpuLoad?: SortOrder
    rolloutPercent?: SortOrder
    canaryStable?: SortOrder
    _count?: AIDeploymentMetricCountOrderByAggregateInput
    _avg?: AIDeploymentMetricAvgOrderByAggregateInput
    _max?: AIDeploymentMetricMaxOrderByAggregateInput
    _min?: AIDeploymentMetricMinOrderByAggregateInput
    _sum?: AIDeploymentMetricSumOrderByAggregateInput
  }

  export type AIDeploymentMetricScalarWhereWithAggregatesInput = {
    AND?: AIDeploymentMetricScalarWhereWithAggregatesInput | AIDeploymentMetricScalarWhereWithAggregatesInput[]
    OR?: AIDeploymentMetricScalarWhereWithAggregatesInput[]
    NOT?: AIDeploymentMetricScalarWhereWithAggregatesInput | AIDeploymentMetricScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIDeploymentMetric"> | string
    tenantId?: StringWithAggregatesFilter<"AIDeploymentMetric"> | string
    modelId?: StringWithAggregatesFilter<"AIDeploymentMetric"> | string
    version?: StringWithAggregatesFilter<"AIDeploymentMetric"> | string
    region?: StringWithAggregatesFilter<"AIDeploymentMetric"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AIDeploymentMetric"> | Date | string
    requests?: IntWithAggregatesFilter<"AIDeploymentMetric"> | number
    latencyMs?: FloatWithAggregatesFilter<"AIDeploymentMetric"> | number
    errorRate?: FloatWithAggregatesFilter<"AIDeploymentMetric"> | number
    tokenThroughput?: FloatWithAggregatesFilter<"AIDeploymentMetric"> | number
    memoryUsageMb?: FloatWithAggregatesFilter<"AIDeploymentMetric"> | number
    cpuLoad?: FloatWithAggregatesFilter<"AIDeploymentMetric"> | number
    rolloutPercent?: IntWithAggregatesFilter<"AIDeploymentMetric"> | number
    canaryStable?: BoolWithAggregatesFilter<"AIDeploymentMetric"> | boolean
  }

  export type AIModelDeploymentCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    version: string
    regions?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    health?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIDeploymentStatus
    artifactLocation?: string
    previousDeploymentId?: string | null
    pipeline?: JsonNullValueInput | InputJsonValue
    failoverRegion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIModelDeploymentUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    version: string
    regions?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    health?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIDeploymentStatus
    artifactLocation?: string
    previousDeploymentId?: string | null
    pipeline?: JsonNullValueInput | InputJsonValue
    failoverRegion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIModelDeploymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    regions?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    health?: JsonNullValueInput | InputJsonValue
    status?: EnumAIDeploymentStatusFieldUpdateOperationsInput | $Enums.AIDeploymentStatus
    artifactLocation?: StringFieldUpdateOperationsInput | string
    previousDeploymentId?: NullableStringFieldUpdateOperationsInput | string | null
    pipeline?: JsonNullValueInput | InputJsonValue
    failoverRegion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelDeploymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    regions?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    health?: JsonNullValueInput | InputJsonValue
    status?: EnumAIDeploymentStatusFieldUpdateOperationsInput | $Enums.AIDeploymentStatus
    artifactLocation?: StringFieldUpdateOperationsInput | string
    previousDeploymentId?: NullableStringFieldUpdateOperationsInput | string | null
    pipeline?: JsonNullValueInput | InputJsonValue
    failoverRegion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelDeploymentCreateManyInput = {
    id?: string
    tenantId: string
    modelId: string
    version: string
    regions?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    health?: JsonNullValueInput | InputJsonValue
    status?: $Enums.AIDeploymentStatus
    artifactLocation?: string
    previousDeploymentId?: string | null
    pipeline?: JsonNullValueInput | InputJsonValue
    failoverRegion?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIModelDeploymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    regions?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    health?: JsonNullValueInput | InputJsonValue
    status?: EnumAIDeploymentStatusFieldUpdateOperationsInput | $Enums.AIDeploymentStatus
    artifactLocation?: StringFieldUpdateOperationsInput | string
    previousDeploymentId?: NullableStringFieldUpdateOperationsInput | string | null
    pipeline?: JsonNullValueInput | InputJsonValue
    failoverRegion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIModelDeploymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    regions?: JsonNullValueInput | InputJsonValue
    rollout?: JsonNullValueInput | InputJsonValue
    health?: JsonNullValueInput | InputJsonValue
    status?: EnumAIDeploymentStatusFieldUpdateOperationsInput | $Enums.AIDeploymentStatus
    artifactLocation?: StringFieldUpdateOperationsInput | string
    previousDeploymentId?: NullableStringFieldUpdateOperationsInput | string | null
    pipeline?: JsonNullValueInput | InputJsonValue
    failoverRegion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIDeploymentMetricCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    version: string
    region: string
    timestamp?: Date | string
    requests?: number
    latencyMs?: number
    errorRate?: number
    tokenThroughput?: number
    memoryUsageMb?: number
    cpuLoad?: number
    rolloutPercent?: number
    canaryStable?: boolean
  }

  export type AIDeploymentMetricUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    version: string
    region: string
    timestamp?: Date | string
    requests?: number
    latencyMs?: number
    errorRate?: number
    tokenThroughput?: number
    memoryUsageMb?: number
    cpuLoad?: number
    rolloutPercent?: number
    canaryStable?: boolean
  }

  export type AIDeploymentMetricUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: IntFieldUpdateOperationsInput | number
    latencyMs?: FloatFieldUpdateOperationsInput | number
    errorRate?: FloatFieldUpdateOperationsInput | number
    tokenThroughput?: FloatFieldUpdateOperationsInput | number
    memoryUsageMb?: FloatFieldUpdateOperationsInput | number
    cpuLoad?: FloatFieldUpdateOperationsInput | number
    rolloutPercent?: IntFieldUpdateOperationsInput | number
    canaryStable?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AIDeploymentMetricUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: IntFieldUpdateOperationsInput | number
    latencyMs?: FloatFieldUpdateOperationsInput | number
    errorRate?: FloatFieldUpdateOperationsInput | number
    tokenThroughput?: FloatFieldUpdateOperationsInput | number
    memoryUsageMb?: FloatFieldUpdateOperationsInput | number
    cpuLoad?: FloatFieldUpdateOperationsInput | number
    rolloutPercent?: IntFieldUpdateOperationsInput | number
    canaryStable?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AIDeploymentMetricCreateManyInput = {
    id?: string
    tenantId: string
    modelId: string
    version: string
    region: string
    timestamp?: Date | string
    requests?: number
    latencyMs?: number
    errorRate?: number
    tokenThroughput?: number
    memoryUsageMb?: number
    cpuLoad?: number
    rolloutPercent?: number
    canaryStable?: boolean
  }

  export type AIDeploymentMetricUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: IntFieldUpdateOperationsInput | number
    latencyMs?: FloatFieldUpdateOperationsInput | number
    errorRate?: FloatFieldUpdateOperationsInput | number
    tokenThroughput?: FloatFieldUpdateOperationsInput | number
    memoryUsageMb?: FloatFieldUpdateOperationsInput | number
    cpuLoad?: FloatFieldUpdateOperationsInput | number
    rolloutPercent?: IntFieldUpdateOperationsInput | number
    canaryStable?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AIDeploymentMetricUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: IntFieldUpdateOperationsInput | number
    latencyMs?: FloatFieldUpdateOperationsInput | number
    errorRate?: FloatFieldUpdateOperationsInput | number
    tokenThroughput?: FloatFieldUpdateOperationsInput | number
    memoryUsageMb?: FloatFieldUpdateOperationsInput | number
    cpuLoad?: FloatFieldUpdateOperationsInput | number
    rolloutPercent?: IntFieldUpdateOperationsInput | number
    canaryStable?: BoolFieldUpdateOperationsInput | boolean
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

  export type EnumAIDeploymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDeploymentStatus | EnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIDeploymentStatus[] | ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDeploymentStatus[] | ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDeploymentStatusFilter<$PrismaModel> | $Enums.AIDeploymentStatus
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AIModelDeploymentTenantIdModelIdVersionCompoundUniqueInput = {
    tenantId: string
    modelId: string
    version: string
  }

  export type AIModelDeploymentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    regions?: SortOrder
    rollout?: SortOrder
    health?: SortOrder
    status?: SortOrder
    artifactLocation?: SortOrder
    previousDeploymentId?: SortOrder
    pipeline?: SortOrder
    failoverRegion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIModelDeploymentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    status?: SortOrder
    artifactLocation?: SortOrder
    previousDeploymentId?: SortOrder
    failoverRegion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AIModelDeploymentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    status?: SortOrder
    artifactLocation?: SortOrder
    previousDeploymentId?: SortOrder
    failoverRegion?: SortOrder
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

  export type EnumAIDeploymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDeploymentStatus | EnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIDeploymentStatus[] | ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDeploymentStatus[] | ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDeploymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AIDeploymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDeploymentStatusFilter<$PrismaModel>
    _max?: NestedEnumAIDeploymentStatusFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AIDeploymentMetricCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    region?: SortOrder
    timestamp?: SortOrder
    requests?: SortOrder
    latencyMs?: SortOrder
    errorRate?: SortOrder
    tokenThroughput?: SortOrder
    memoryUsageMb?: SortOrder
    cpuLoad?: SortOrder
    rolloutPercent?: SortOrder
    canaryStable?: SortOrder
  }

  export type AIDeploymentMetricAvgOrderByAggregateInput = {
    requests?: SortOrder
    latencyMs?: SortOrder
    errorRate?: SortOrder
    tokenThroughput?: SortOrder
    memoryUsageMb?: SortOrder
    cpuLoad?: SortOrder
    rolloutPercent?: SortOrder
  }

  export type AIDeploymentMetricMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    region?: SortOrder
    timestamp?: SortOrder
    requests?: SortOrder
    latencyMs?: SortOrder
    errorRate?: SortOrder
    tokenThroughput?: SortOrder
    memoryUsageMb?: SortOrder
    cpuLoad?: SortOrder
    rolloutPercent?: SortOrder
    canaryStable?: SortOrder
  }

  export type AIDeploymentMetricMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    version?: SortOrder
    region?: SortOrder
    timestamp?: SortOrder
    requests?: SortOrder
    latencyMs?: SortOrder
    errorRate?: SortOrder
    tokenThroughput?: SortOrder
    memoryUsageMb?: SortOrder
    cpuLoad?: SortOrder
    rolloutPercent?: SortOrder
    canaryStable?: SortOrder
  }

  export type AIDeploymentMetricSumOrderByAggregateInput = {
    requests?: SortOrder
    latencyMs?: SortOrder
    errorRate?: SortOrder
    tokenThroughput?: SortOrder
    memoryUsageMb?: SortOrder
    cpuLoad?: SortOrder
    rolloutPercent?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAIDeploymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AIDeploymentStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NestedEnumAIDeploymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDeploymentStatus | EnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIDeploymentStatus[] | ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDeploymentStatus[] | ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDeploymentStatusFilter<$PrismaModel> | $Enums.AIDeploymentStatus
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

  export type NestedEnumAIDeploymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDeploymentStatus | EnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AIDeploymentStatus[] | ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDeploymentStatus[] | ListEnumAIDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDeploymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AIDeploymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDeploymentStatusFilter<$PrismaModel>
    _max?: NestedEnumAIDeploymentStatusFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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