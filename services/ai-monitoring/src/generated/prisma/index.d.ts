
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
 * Model AIDriftEvent
 * 
 */
export type AIDriftEvent = $Result.DefaultSelection<Prisma.$AIDriftEventPayload>
/**
 * Model AIDriftMetric
 * 
 */
export type AIDriftMetric = $Result.DefaultSelection<Prisma.$AIDriftMetricPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AIDriftType: {
  DATA: 'DATA',
  CONCEPT: 'CONCEPT',
  EMBEDDING: 'EMBEDDING',
  PERFORMANCE: 'PERFORMANCE'
};

export type AIDriftType = (typeof AIDriftType)[keyof typeof AIDriftType]


export const AIDriftSeverity: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type AIDriftSeverity = (typeof AIDriftSeverity)[keyof typeof AIDriftSeverity]

}

export type AIDriftType = $Enums.AIDriftType

export const AIDriftType: typeof $Enums.AIDriftType

export type AIDriftSeverity = $Enums.AIDriftSeverity

export const AIDriftSeverity: typeof $Enums.AIDriftSeverity

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AIDriftEvents
 * const aIDriftEvents = await prisma.aIDriftEvent.findMany()
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
   * // Fetch zero or more AIDriftEvents
   * const aIDriftEvents = await prisma.aIDriftEvent.findMany()
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
   * `prisma.aIDriftEvent`: Exposes CRUD operations for the **AIDriftEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIDriftEvents
    * const aIDriftEvents = await prisma.aIDriftEvent.findMany()
    * ```
    */
  get aIDriftEvent(): Prisma.AIDriftEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIDriftMetric`: Exposes CRUD operations for the **AIDriftMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIDriftMetrics
    * const aIDriftMetrics = await prisma.aIDriftMetric.findMany()
    * ```
    */
  get aIDriftMetric(): Prisma.AIDriftMetricDelegate<ExtArgs, ClientOptions>;
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
    AIDriftEvent: 'AIDriftEvent',
    AIDriftMetric: 'AIDriftMetric'
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
      modelProps: "aIDriftEvent" | "aIDriftMetric"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AIDriftEvent: {
        payload: Prisma.$AIDriftEventPayload<ExtArgs>
        fields: Prisma.AIDriftEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIDriftEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIDriftEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>
          }
          findFirst: {
            args: Prisma.AIDriftEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIDriftEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>
          }
          findMany: {
            args: Prisma.AIDriftEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>[]
          }
          create: {
            args: Prisma.AIDriftEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>
          }
          createMany: {
            args: Prisma.AIDriftEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIDriftEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>[]
          }
          delete: {
            args: Prisma.AIDriftEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>
          }
          update: {
            args: Prisma.AIDriftEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>
          }
          deleteMany: {
            args: Prisma.AIDriftEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIDriftEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIDriftEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>[]
          }
          upsert: {
            args: Prisma.AIDriftEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftEventPayload>
          }
          aggregate: {
            args: Prisma.AIDriftEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIDriftEvent>
          }
          groupBy: {
            args: Prisma.AIDriftEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIDriftEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIDriftEventCountArgs<ExtArgs>
            result: $Utils.Optional<AIDriftEventCountAggregateOutputType> | number
          }
        }
      }
      AIDriftMetric: {
        payload: Prisma.$AIDriftMetricPayload<ExtArgs>
        fields: Prisma.AIDriftMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIDriftMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIDriftMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>
          }
          findFirst: {
            args: Prisma.AIDriftMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIDriftMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>
          }
          findMany: {
            args: Prisma.AIDriftMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>[]
          }
          create: {
            args: Prisma.AIDriftMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>
          }
          createMany: {
            args: Prisma.AIDriftMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIDriftMetricCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>[]
          }
          delete: {
            args: Prisma.AIDriftMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>
          }
          update: {
            args: Prisma.AIDriftMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>
          }
          deleteMany: {
            args: Prisma.AIDriftMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIDriftMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIDriftMetricUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>[]
          }
          upsert: {
            args: Prisma.AIDriftMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIDriftMetricPayload>
          }
          aggregate: {
            args: Prisma.AIDriftMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIDriftMetric>
          }
          groupBy: {
            args: Prisma.AIDriftMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIDriftMetricGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIDriftMetricCountArgs<ExtArgs>
            result: $Utils.Optional<AIDriftMetricCountAggregateOutputType> | number
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
    aIDriftEvent?: AIDriftEventOmit
    aIDriftMetric?: AIDriftMetricOmit
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
   * Model AIDriftEvent
   */

  export type AggregateAIDriftEvent = {
    _count: AIDriftEventCountAggregateOutputType | null
    _min: AIDriftEventMinAggregateOutputType | null
    _max: AIDriftEventMaxAggregateOutputType | null
  }

  export type AIDriftEventMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    driftType: $Enums.AIDriftType | null
    severity: $Enums.AIDriftSeverity | null
    summary: string | null
    detectedAt: Date | null
    resolvedAt: Date | null
    mitigationAction: string | null
  }

  export type AIDriftEventMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    driftType: $Enums.AIDriftType | null
    severity: $Enums.AIDriftSeverity | null
    summary: string | null
    detectedAt: Date | null
    resolvedAt: Date | null
    mitigationAction: string | null
  }

  export type AIDriftEventCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    driftType: number
    severity: number
    metrics: number
    summary: number
    recommendedActions: number
    detectedAt: number
    resolvedAt: number
    mitigationAction: number
    _all: number
  }


  export type AIDriftEventMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    driftType?: true
    severity?: true
    summary?: true
    detectedAt?: true
    resolvedAt?: true
    mitigationAction?: true
  }

  export type AIDriftEventMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    driftType?: true
    severity?: true
    summary?: true
    detectedAt?: true
    resolvedAt?: true
    mitigationAction?: true
  }

  export type AIDriftEventCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    driftType?: true
    severity?: true
    metrics?: true
    summary?: true
    recommendedActions?: true
    detectedAt?: true
    resolvedAt?: true
    mitigationAction?: true
    _all?: true
  }

  export type AIDriftEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDriftEvent to aggregate.
     */
    where?: AIDriftEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDriftEvents to fetch.
     */
    orderBy?: AIDriftEventOrderByWithRelationInput | AIDriftEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIDriftEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDriftEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDriftEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIDriftEvents
    **/
    _count?: true | AIDriftEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIDriftEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIDriftEventMaxAggregateInputType
  }

  export type GetAIDriftEventAggregateType<T extends AIDriftEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAIDriftEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIDriftEvent[P]>
      : GetScalarType<T[P], AggregateAIDriftEvent[P]>
  }




  export type AIDriftEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDriftEventWhereInput
    orderBy?: AIDriftEventOrderByWithAggregationInput | AIDriftEventOrderByWithAggregationInput[]
    by: AIDriftEventScalarFieldEnum[] | AIDriftEventScalarFieldEnum
    having?: AIDriftEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIDriftEventCountAggregateInputType | true
    _min?: AIDriftEventMinAggregateInputType
    _max?: AIDriftEventMaxAggregateInputType
  }

  export type AIDriftEventGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string
    driftType: $Enums.AIDriftType
    severity: $Enums.AIDriftSeverity
    metrics: JsonValue
    summary: string
    recommendedActions: JsonValue
    detectedAt: Date
    resolvedAt: Date | null
    mitigationAction: string | null
    _count: AIDriftEventCountAggregateOutputType | null
    _min: AIDriftEventMinAggregateOutputType | null
    _max: AIDriftEventMaxAggregateOutputType | null
  }

  type GetAIDriftEventGroupByPayload<T extends AIDriftEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIDriftEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIDriftEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIDriftEventGroupByOutputType[P]>
            : GetScalarType<T[P], AIDriftEventGroupByOutputType[P]>
        }
      >
    >


  export type AIDriftEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    driftType?: boolean
    severity?: boolean
    metrics?: boolean
    summary?: boolean
    recommendedActions?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    mitigationAction?: boolean
  }, ExtArgs["result"]["aIDriftEvent"]>

  export type AIDriftEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    driftType?: boolean
    severity?: boolean
    metrics?: boolean
    summary?: boolean
    recommendedActions?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    mitigationAction?: boolean
  }, ExtArgs["result"]["aIDriftEvent"]>

  export type AIDriftEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    driftType?: boolean
    severity?: boolean
    metrics?: boolean
    summary?: boolean
    recommendedActions?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    mitigationAction?: boolean
  }, ExtArgs["result"]["aIDriftEvent"]>

  export type AIDriftEventSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    driftType?: boolean
    severity?: boolean
    metrics?: boolean
    summary?: boolean
    recommendedActions?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    mitigationAction?: boolean
  }

  export type AIDriftEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "driftType" | "severity" | "metrics" | "summary" | "recommendedActions" | "detectedAt" | "resolvedAt" | "mitigationAction", ExtArgs["result"]["aIDriftEvent"]>

  export type $AIDriftEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIDriftEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string
      driftType: $Enums.AIDriftType
      severity: $Enums.AIDriftSeverity
      metrics: Prisma.JsonValue
      summary: string
      recommendedActions: Prisma.JsonValue
      detectedAt: Date
      resolvedAt: Date | null
      mitigationAction: string | null
    }, ExtArgs["result"]["aIDriftEvent"]>
    composites: {}
  }

  type AIDriftEventGetPayload<S extends boolean | null | undefined | AIDriftEventDefaultArgs> = $Result.GetResult<Prisma.$AIDriftEventPayload, S>

  type AIDriftEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIDriftEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIDriftEventCountAggregateInputType | true
    }

  export interface AIDriftEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIDriftEvent'], meta: { name: 'AIDriftEvent' } }
    /**
     * Find zero or one AIDriftEvent that matches the filter.
     * @param {AIDriftEventFindUniqueArgs} args - Arguments to find a AIDriftEvent
     * @example
     * // Get one AIDriftEvent
     * const aIDriftEvent = await prisma.aIDriftEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIDriftEventFindUniqueArgs>(args: SelectSubset<T, AIDriftEventFindUniqueArgs<ExtArgs>>): Prisma__AIDriftEventClient<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIDriftEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIDriftEventFindUniqueOrThrowArgs} args - Arguments to find a AIDriftEvent
     * @example
     * // Get one AIDriftEvent
     * const aIDriftEvent = await prisma.aIDriftEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIDriftEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AIDriftEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIDriftEventClient<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDriftEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftEventFindFirstArgs} args - Arguments to find a AIDriftEvent
     * @example
     * // Get one AIDriftEvent
     * const aIDriftEvent = await prisma.aIDriftEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIDriftEventFindFirstArgs>(args?: SelectSubset<T, AIDriftEventFindFirstArgs<ExtArgs>>): Prisma__AIDriftEventClient<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDriftEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftEventFindFirstOrThrowArgs} args - Arguments to find a AIDriftEvent
     * @example
     * // Get one AIDriftEvent
     * const aIDriftEvent = await prisma.aIDriftEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIDriftEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AIDriftEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIDriftEventClient<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIDriftEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIDriftEvents
     * const aIDriftEvents = await prisma.aIDriftEvent.findMany()
     * 
     * // Get first 10 AIDriftEvents
     * const aIDriftEvents = await prisma.aIDriftEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIDriftEventWithIdOnly = await prisma.aIDriftEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIDriftEventFindManyArgs>(args?: SelectSubset<T, AIDriftEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIDriftEvent.
     * @param {AIDriftEventCreateArgs} args - Arguments to create a AIDriftEvent.
     * @example
     * // Create one AIDriftEvent
     * const AIDriftEvent = await prisma.aIDriftEvent.create({
     *   data: {
     *     // ... data to create a AIDriftEvent
     *   }
     * })
     * 
     */
    create<T extends AIDriftEventCreateArgs>(args: SelectSubset<T, AIDriftEventCreateArgs<ExtArgs>>): Prisma__AIDriftEventClient<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIDriftEvents.
     * @param {AIDriftEventCreateManyArgs} args - Arguments to create many AIDriftEvents.
     * @example
     * // Create many AIDriftEvents
     * const aIDriftEvent = await prisma.aIDriftEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIDriftEventCreateManyArgs>(args?: SelectSubset<T, AIDriftEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIDriftEvents and returns the data saved in the database.
     * @param {AIDriftEventCreateManyAndReturnArgs} args - Arguments to create many AIDriftEvents.
     * @example
     * // Create many AIDriftEvents
     * const aIDriftEvent = await prisma.aIDriftEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIDriftEvents and only return the `id`
     * const aIDriftEventWithIdOnly = await prisma.aIDriftEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIDriftEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AIDriftEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIDriftEvent.
     * @param {AIDriftEventDeleteArgs} args - Arguments to delete one AIDriftEvent.
     * @example
     * // Delete one AIDriftEvent
     * const AIDriftEvent = await prisma.aIDriftEvent.delete({
     *   where: {
     *     // ... filter to delete one AIDriftEvent
     *   }
     * })
     * 
     */
    delete<T extends AIDriftEventDeleteArgs>(args: SelectSubset<T, AIDriftEventDeleteArgs<ExtArgs>>): Prisma__AIDriftEventClient<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIDriftEvent.
     * @param {AIDriftEventUpdateArgs} args - Arguments to update one AIDriftEvent.
     * @example
     * // Update one AIDriftEvent
     * const aIDriftEvent = await prisma.aIDriftEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIDriftEventUpdateArgs>(args: SelectSubset<T, AIDriftEventUpdateArgs<ExtArgs>>): Prisma__AIDriftEventClient<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIDriftEvents.
     * @param {AIDriftEventDeleteManyArgs} args - Arguments to filter AIDriftEvents to delete.
     * @example
     * // Delete a few AIDriftEvents
     * const { count } = await prisma.aIDriftEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIDriftEventDeleteManyArgs>(args?: SelectSubset<T, AIDriftEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDriftEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIDriftEvents
     * const aIDriftEvent = await prisma.aIDriftEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIDriftEventUpdateManyArgs>(args: SelectSubset<T, AIDriftEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDriftEvents and returns the data updated in the database.
     * @param {AIDriftEventUpdateManyAndReturnArgs} args - Arguments to update many AIDriftEvents.
     * @example
     * // Update many AIDriftEvents
     * const aIDriftEvent = await prisma.aIDriftEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIDriftEvents and only return the `id`
     * const aIDriftEventWithIdOnly = await prisma.aIDriftEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIDriftEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AIDriftEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIDriftEvent.
     * @param {AIDriftEventUpsertArgs} args - Arguments to update or create a AIDriftEvent.
     * @example
     * // Update or create a AIDriftEvent
     * const aIDriftEvent = await prisma.aIDriftEvent.upsert({
     *   create: {
     *     // ... data to create a AIDriftEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIDriftEvent we want to update
     *   }
     * })
     */
    upsert<T extends AIDriftEventUpsertArgs>(args: SelectSubset<T, AIDriftEventUpsertArgs<ExtArgs>>): Prisma__AIDriftEventClient<$Result.GetResult<Prisma.$AIDriftEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIDriftEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftEventCountArgs} args - Arguments to filter AIDriftEvents to count.
     * @example
     * // Count the number of AIDriftEvents
     * const count = await prisma.aIDriftEvent.count({
     *   where: {
     *     // ... the filter for the AIDriftEvents we want to count
     *   }
     * })
    **/
    count<T extends AIDriftEventCountArgs>(
      args?: Subset<T, AIDriftEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIDriftEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIDriftEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIDriftEventAggregateArgs>(args: Subset<T, AIDriftEventAggregateArgs>): Prisma.PrismaPromise<GetAIDriftEventAggregateType<T>>

    /**
     * Group by AIDriftEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftEventGroupByArgs} args - Group by arguments.
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
      T extends AIDriftEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIDriftEventGroupByArgs['orderBy'] }
        : { orderBy?: AIDriftEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIDriftEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIDriftEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIDriftEvent model
   */
  readonly fields: AIDriftEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIDriftEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIDriftEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIDriftEvent model
   */
  interface AIDriftEventFieldRefs {
    readonly id: FieldRef<"AIDriftEvent", 'String'>
    readonly tenantId: FieldRef<"AIDriftEvent", 'String'>
    readonly modelId: FieldRef<"AIDriftEvent", 'String'>
    readonly driftType: FieldRef<"AIDriftEvent", 'AIDriftType'>
    readonly severity: FieldRef<"AIDriftEvent", 'AIDriftSeverity'>
    readonly metrics: FieldRef<"AIDriftEvent", 'Json'>
    readonly summary: FieldRef<"AIDriftEvent", 'String'>
    readonly recommendedActions: FieldRef<"AIDriftEvent", 'Json'>
    readonly detectedAt: FieldRef<"AIDriftEvent", 'DateTime'>
    readonly resolvedAt: FieldRef<"AIDriftEvent", 'DateTime'>
    readonly mitigationAction: FieldRef<"AIDriftEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AIDriftEvent findUnique
   */
  export type AIDriftEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftEvent to fetch.
     */
    where: AIDriftEventWhereUniqueInput
  }

  /**
   * AIDriftEvent findUniqueOrThrow
   */
  export type AIDriftEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftEvent to fetch.
     */
    where: AIDriftEventWhereUniqueInput
  }

  /**
   * AIDriftEvent findFirst
   */
  export type AIDriftEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftEvent to fetch.
     */
    where?: AIDriftEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDriftEvents to fetch.
     */
    orderBy?: AIDriftEventOrderByWithRelationInput | AIDriftEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDriftEvents.
     */
    cursor?: AIDriftEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDriftEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDriftEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDriftEvents.
     */
    distinct?: AIDriftEventScalarFieldEnum | AIDriftEventScalarFieldEnum[]
  }

  /**
   * AIDriftEvent findFirstOrThrow
   */
  export type AIDriftEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftEvent to fetch.
     */
    where?: AIDriftEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDriftEvents to fetch.
     */
    orderBy?: AIDriftEventOrderByWithRelationInput | AIDriftEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDriftEvents.
     */
    cursor?: AIDriftEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDriftEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDriftEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDriftEvents.
     */
    distinct?: AIDriftEventScalarFieldEnum | AIDriftEventScalarFieldEnum[]
  }

  /**
   * AIDriftEvent findMany
   */
  export type AIDriftEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftEvents to fetch.
     */
    where?: AIDriftEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDriftEvents to fetch.
     */
    orderBy?: AIDriftEventOrderByWithRelationInput | AIDriftEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIDriftEvents.
     */
    cursor?: AIDriftEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDriftEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDriftEvents.
     */
    skip?: number
    distinct?: AIDriftEventScalarFieldEnum | AIDriftEventScalarFieldEnum[]
  }

  /**
   * AIDriftEvent create
   */
  export type AIDriftEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * The data needed to create a AIDriftEvent.
     */
    data: XOR<AIDriftEventCreateInput, AIDriftEventUncheckedCreateInput>
  }

  /**
   * AIDriftEvent createMany
   */
  export type AIDriftEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIDriftEvents.
     */
    data: AIDriftEventCreateManyInput | AIDriftEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDriftEvent createManyAndReturn
   */
  export type AIDriftEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * The data used to create many AIDriftEvents.
     */
    data: AIDriftEventCreateManyInput | AIDriftEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDriftEvent update
   */
  export type AIDriftEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * The data needed to update a AIDriftEvent.
     */
    data: XOR<AIDriftEventUpdateInput, AIDriftEventUncheckedUpdateInput>
    /**
     * Choose, which AIDriftEvent to update.
     */
    where: AIDriftEventWhereUniqueInput
  }

  /**
   * AIDriftEvent updateMany
   */
  export type AIDriftEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIDriftEvents.
     */
    data: XOR<AIDriftEventUpdateManyMutationInput, AIDriftEventUncheckedUpdateManyInput>
    /**
     * Filter which AIDriftEvents to update
     */
    where?: AIDriftEventWhereInput
    /**
     * Limit how many AIDriftEvents to update.
     */
    limit?: number
  }

  /**
   * AIDriftEvent updateManyAndReturn
   */
  export type AIDriftEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * The data used to update AIDriftEvents.
     */
    data: XOR<AIDriftEventUpdateManyMutationInput, AIDriftEventUncheckedUpdateManyInput>
    /**
     * Filter which AIDriftEvents to update
     */
    where?: AIDriftEventWhereInput
    /**
     * Limit how many AIDriftEvents to update.
     */
    limit?: number
  }

  /**
   * AIDriftEvent upsert
   */
  export type AIDriftEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * The filter to search for the AIDriftEvent to update in case it exists.
     */
    where: AIDriftEventWhereUniqueInput
    /**
     * In case the AIDriftEvent found by the `where` argument doesn't exist, create a new AIDriftEvent with this data.
     */
    create: XOR<AIDriftEventCreateInput, AIDriftEventUncheckedCreateInput>
    /**
     * In case the AIDriftEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIDriftEventUpdateInput, AIDriftEventUncheckedUpdateInput>
  }

  /**
   * AIDriftEvent delete
   */
  export type AIDriftEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
    /**
     * Filter which AIDriftEvent to delete.
     */
    where: AIDriftEventWhereUniqueInput
  }

  /**
   * AIDriftEvent deleteMany
   */
  export type AIDriftEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDriftEvents to delete
     */
    where?: AIDriftEventWhereInput
    /**
     * Limit how many AIDriftEvents to delete.
     */
    limit?: number
  }

  /**
   * AIDriftEvent without action
   */
  export type AIDriftEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftEvent
     */
    select?: AIDriftEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftEvent
     */
    omit?: AIDriftEventOmit<ExtArgs> | null
  }


  /**
   * Model AIDriftMetric
   */

  export type AggregateAIDriftMetric = {
    _count: AIDriftMetricCountAggregateOutputType | null
    _min: AIDriftMetricMinAggregateOutputType | null
    _max: AIDriftMetricMaxAggregateOutputType | null
  }

  export type AIDriftMetricMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    timestamp: Date | null
    granularity: string | null
  }

  export type AIDriftMetricMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    timestamp: Date | null
    granularity: string | null
  }

  export type AIDriftMetricCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    timestamp: number
    granularity: number
    inputStats: number
    outputStats: number
    embeddingStats: number
    performanceStats: number
    _all: number
  }


  export type AIDriftMetricMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    timestamp?: true
    granularity?: true
  }

  export type AIDriftMetricMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    timestamp?: true
    granularity?: true
  }

  export type AIDriftMetricCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    timestamp?: true
    granularity?: true
    inputStats?: true
    outputStats?: true
    embeddingStats?: true
    performanceStats?: true
    _all?: true
  }

  export type AIDriftMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDriftMetric to aggregate.
     */
    where?: AIDriftMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDriftMetrics to fetch.
     */
    orderBy?: AIDriftMetricOrderByWithRelationInput | AIDriftMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIDriftMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDriftMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDriftMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIDriftMetrics
    **/
    _count?: true | AIDriftMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIDriftMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIDriftMetricMaxAggregateInputType
  }

  export type GetAIDriftMetricAggregateType<T extends AIDriftMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateAIDriftMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIDriftMetric[P]>
      : GetScalarType<T[P], AggregateAIDriftMetric[P]>
  }




  export type AIDriftMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIDriftMetricWhereInput
    orderBy?: AIDriftMetricOrderByWithAggregationInput | AIDriftMetricOrderByWithAggregationInput[]
    by: AIDriftMetricScalarFieldEnum[] | AIDriftMetricScalarFieldEnum
    having?: AIDriftMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIDriftMetricCountAggregateInputType | true
    _min?: AIDriftMetricMinAggregateInputType
    _max?: AIDriftMetricMaxAggregateInputType
  }

  export type AIDriftMetricGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string
    timestamp: Date
    granularity: string
    inputStats: JsonValue
    outputStats: JsonValue
    embeddingStats: JsonValue
    performanceStats: JsonValue
    _count: AIDriftMetricCountAggregateOutputType | null
    _min: AIDriftMetricMinAggregateOutputType | null
    _max: AIDriftMetricMaxAggregateOutputType | null
  }

  type GetAIDriftMetricGroupByPayload<T extends AIDriftMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIDriftMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIDriftMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIDriftMetricGroupByOutputType[P]>
            : GetScalarType<T[P], AIDriftMetricGroupByOutputType[P]>
        }
      >
    >


  export type AIDriftMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    timestamp?: boolean
    granularity?: boolean
    inputStats?: boolean
    outputStats?: boolean
    embeddingStats?: boolean
    performanceStats?: boolean
  }, ExtArgs["result"]["aIDriftMetric"]>

  export type AIDriftMetricSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    timestamp?: boolean
    granularity?: boolean
    inputStats?: boolean
    outputStats?: boolean
    embeddingStats?: boolean
    performanceStats?: boolean
  }, ExtArgs["result"]["aIDriftMetric"]>

  export type AIDriftMetricSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    timestamp?: boolean
    granularity?: boolean
    inputStats?: boolean
    outputStats?: boolean
    embeddingStats?: boolean
    performanceStats?: boolean
  }, ExtArgs["result"]["aIDriftMetric"]>

  export type AIDriftMetricSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    timestamp?: boolean
    granularity?: boolean
    inputStats?: boolean
    outputStats?: boolean
    embeddingStats?: boolean
    performanceStats?: boolean
  }

  export type AIDriftMetricOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "timestamp" | "granularity" | "inputStats" | "outputStats" | "embeddingStats" | "performanceStats", ExtArgs["result"]["aIDriftMetric"]>

  export type $AIDriftMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIDriftMetric"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string
      timestamp: Date
      granularity: string
      inputStats: Prisma.JsonValue
      outputStats: Prisma.JsonValue
      embeddingStats: Prisma.JsonValue
      performanceStats: Prisma.JsonValue
    }, ExtArgs["result"]["aIDriftMetric"]>
    composites: {}
  }

  type AIDriftMetricGetPayload<S extends boolean | null | undefined | AIDriftMetricDefaultArgs> = $Result.GetResult<Prisma.$AIDriftMetricPayload, S>

  type AIDriftMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIDriftMetricFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIDriftMetricCountAggregateInputType | true
    }

  export interface AIDriftMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIDriftMetric'], meta: { name: 'AIDriftMetric' } }
    /**
     * Find zero or one AIDriftMetric that matches the filter.
     * @param {AIDriftMetricFindUniqueArgs} args - Arguments to find a AIDriftMetric
     * @example
     * // Get one AIDriftMetric
     * const aIDriftMetric = await prisma.aIDriftMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIDriftMetricFindUniqueArgs>(args: SelectSubset<T, AIDriftMetricFindUniqueArgs<ExtArgs>>): Prisma__AIDriftMetricClient<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIDriftMetric that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIDriftMetricFindUniqueOrThrowArgs} args - Arguments to find a AIDriftMetric
     * @example
     * // Get one AIDriftMetric
     * const aIDriftMetric = await prisma.aIDriftMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIDriftMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, AIDriftMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIDriftMetricClient<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDriftMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftMetricFindFirstArgs} args - Arguments to find a AIDriftMetric
     * @example
     * // Get one AIDriftMetric
     * const aIDriftMetric = await prisma.aIDriftMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIDriftMetricFindFirstArgs>(args?: SelectSubset<T, AIDriftMetricFindFirstArgs<ExtArgs>>): Prisma__AIDriftMetricClient<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIDriftMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftMetricFindFirstOrThrowArgs} args - Arguments to find a AIDriftMetric
     * @example
     * // Get one AIDriftMetric
     * const aIDriftMetric = await prisma.aIDriftMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIDriftMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, AIDriftMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIDriftMetricClient<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIDriftMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIDriftMetrics
     * const aIDriftMetrics = await prisma.aIDriftMetric.findMany()
     * 
     * // Get first 10 AIDriftMetrics
     * const aIDriftMetrics = await prisma.aIDriftMetric.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIDriftMetricWithIdOnly = await prisma.aIDriftMetric.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIDriftMetricFindManyArgs>(args?: SelectSubset<T, AIDriftMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIDriftMetric.
     * @param {AIDriftMetricCreateArgs} args - Arguments to create a AIDriftMetric.
     * @example
     * // Create one AIDriftMetric
     * const AIDriftMetric = await prisma.aIDriftMetric.create({
     *   data: {
     *     // ... data to create a AIDriftMetric
     *   }
     * })
     * 
     */
    create<T extends AIDriftMetricCreateArgs>(args: SelectSubset<T, AIDriftMetricCreateArgs<ExtArgs>>): Prisma__AIDriftMetricClient<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIDriftMetrics.
     * @param {AIDriftMetricCreateManyArgs} args - Arguments to create many AIDriftMetrics.
     * @example
     * // Create many AIDriftMetrics
     * const aIDriftMetric = await prisma.aIDriftMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIDriftMetricCreateManyArgs>(args?: SelectSubset<T, AIDriftMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIDriftMetrics and returns the data saved in the database.
     * @param {AIDriftMetricCreateManyAndReturnArgs} args - Arguments to create many AIDriftMetrics.
     * @example
     * // Create many AIDriftMetrics
     * const aIDriftMetric = await prisma.aIDriftMetric.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIDriftMetrics and only return the `id`
     * const aIDriftMetricWithIdOnly = await prisma.aIDriftMetric.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIDriftMetricCreateManyAndReturnArgs>(args?: SelectSubset<T, AIDriftMetricCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIDriftMetric.
     * @param {AIDriftMetricDeleteArgs} args - Arguments to delete one AIDriftMetric.
     * @example
     * // Delete one AIDriftMetric
     * const AIDriftMetric = await prisma.aIDriftMetric.delete({
     *   where: {
     *     // ... filter to delete one AIDriftMetric
     *   }
     * })
     * 
     */
    delete<T extends AIDriftMetricDeleteArgs>(args: SelectSubset<T, AIDriftMetricDeleteArgs<ExtArgs>>): Prisma__AIDriftMetricClient<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIDriftMetric.
     * @param {AIDriftMetricUpdateArgs} args - Arguments to update one AIDriftMetric.
     * @example
     * // Update one AIDriftMetric
     * const aIDriftMetric = await prisma.aIDriftMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIDriftMetricUpdateArgs>(args: SelectSubset<T, AIDriftMetricUpdateArgs<ExtArgs>>): Prisma__AIDriftMetricClient<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIDriftMetrics.
     * @param {AIDriftMetricDeleteManyArgs} args - Arguments to filter AIDriftMetrics to delete.
     * @example
     * // Delete a few AIDriftMetrics
     * const { count } = await prisma.aIDriftMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIDriftMetricDeleteManyArgs>(args?: SelectSubset<T, AIDriftMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDriftMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIDriftMetrics
     * const aIDriftMetric = await prisma.aIDriftMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIDriftMetricUpdateManyArgs>(args: SelectSubset<T, AIDriftMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIDriftMetrics and returns the data updated in the database.
     * @param {AIDriftMetricUpdateManyAndReturnArgs} args - Arguments to update many AIDriftMetrics.
     * @example
     * // Update many AIDriftMetrics
     * const aIDriftMetric = await prisma.aIDriftMetric.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIDriftMetrics and only return the `id`
     * const aIDriftMetricWithIdOnly = await prisma.aIDriftMetric.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIDriftMetricUpdateManyAndReturnArgs>(args: SelectSubset<T, AIDriftMetricUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIDriftMetric.
     * @param {AIDriftMetricUpsertArgs} args - Arguments to update or create a AIDriftMetric.
     * @example
     * // Update or create a AIDriftMetric
     * const aIDriftMetric = await prisma.aIDriftMetric.upsert({
     *   create: {
     *     // ... data to create a AIDriftMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIDriftMetric we want to update
     *   }
     * })
     */
    upsert<T extends AIDriftMetricUpsertArgs>(args: SelectSubset<T, AIDriftMetricUpsertArgs<ExtArgs>>): Prisma__AIDriftMetricClient<$Result.GetResult<Prisma.$AIDriftMetricPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIDriftMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftMetricCountArgs} args - Arguments to filter AIDriftMetrics to count.
     * @example
     * // Count the number of AIDriftMetrics
     * const count = await prisma.aIDriftMetric.count({
     *   where: {
     *     // ... the filter for the AIDriftMetrics we want to count
     *   }
     * })
    **/
    count<T extends AIDriftMetricCountArgs>(
      args?: Subset<T, AIDriftMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIDriftMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIDriftMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIDriftMetricAggregateArgs>(args: Subset<T, AIDriftMetricAggregateArgs>): Prisma.PrismaPromise<GetAIDriftMetricAggregateType<T>>

    /**
     * Group by AIDriftMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIDriftMetricGroupByArgs} args - Group by arguments.
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
      T extends AIDriftMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIDriftMetricGroupByArgs['orderBy'] }
        : { orderBy?: AIDriftMetricGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIDriftMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIDriftMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIDriftMetric model
   */
  readonly fields: AIDriftMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIDriftMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIDriftMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIDriftMetric model
   */
  interface AIDriftMetricFieldRefs {
    readonly id: FieldRef<"AIDriftMetric", 'String'>
    readonly tenantId: FieldRef<"AIDriftMetric", 'String'>
    readonly modelId: FieldRef<"AIDriftMetric", 'String'>
    readonly timestamp: FieldRef<"AIDriftMetric", 'DateTime'>
    readonly granularity: FieldRef<"AIDriftMetric", 'String'>
    readonly inputStats: FieldRef<"AIDriftMetric", 'Json'>
    readonly outputStats: FieldRef<"AIDriftMetric", 'Json'>
    readonly embeddingStats: FieldRef<"AIDriftMetric", 'Json'>
    readonly performanceStats: FieldRef<"AIDriftMetric", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * AIDriftMetric findUnique
   */
  export type AIDriftMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftMetric to fetch.
     */
    where: AIDriftMetricWhereUniqueInput
  }

  /**
   * AIDriftMetric findUniqueOrThrow
   */
  export type AIDriftMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftMetric to fetch.
     */
    where: AIDriftMetricWhereUniqueInput
  }

  /**
   * AIDriftMetric findFirst
   */
  export type AIDriftMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftMetric to fetch.
     */
    where?: AIDriftMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDriftMetrics to fetch.
     */
    orderBy?: AIDriftMetricOrderByWithRelationInput | AIDriftMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDriftMetrics.
     */
    cursor?: AIDriftMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDriftMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDriftMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDriftMetrics.
     */
    distinct?: AIDriftMetricScalarFieldEnum | AIDriftMetricScalarFieldEnum[]
  }

  /**
   * AIDriftMetric findFirstOrThrow
   */
  export type AIDriftMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftMetric to fetch.
     */
    where?: AIDriftMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDriftMetrics to fetch.
     */
    orderBy?: AIDriftMetricOrderByWithRelationInput | AIDriftMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIDriftMetrics.
     */
    cursor?: AIDriftMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDriftMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDriftMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIDriftMetrics.
     */
    distinct?: AIDriftMetricScalarFieldEnum | AIDriftMetricScalarFieldEnum[]
  }

  /**
   * AIDriftMetric findMany
   */
  export type AIDriftMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * Filter, which AIDriftMetrics to fetch.
     */
    where?: AIDriftMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIDriftMetrics to fetch.
     */
    orderBy?: AIDriftMetricOrderByWithRelationInput | AIDriftMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIDriftMetrics.
     */
    cursor?: AIDriftMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIDriftMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIDriftMetrics.
     */
    skip?: number
    distinct?: AIDriftMetricScalarFieldEnum | AIDriftMetricScalarFieldEnum[]
  }

  /**
   * AIDriftMetric create
   */
  export type AIDriftMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * The data needed to create a AIDriftMetric.
     */
    data: XOR<AIDriftMetricCreateInput, AIDriftMetricUncheckedCreateInput>
  }

  /**
   * AIDriftMetric createMany
   */
  export type AIDriftMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIDriftMetrics.
     */
    data: AIDriftMetricCreateManyInput | AIDriftMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDriftMetric createManyAndReturn
   */
  export type AIDriftMetricCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * The data used to create many AIDriftMetrics.
     */
    data: AIDriftMetricCreateManyInput | AIDriftMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIDriftMetric update
   */
  export type AIDriftMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * The data needed to update a AIDriftMetric.
     */
    data: XOR<AIDriftMetricUpdateInput, AIDriftMetricUncheckedUpdateInput>
    /**
     * Choose, which AIDriftMetric to update.
     */
    where: AIDriftMetricWhereUniqueInput
  }

  /**
   * AIDriftMetric updateMany
   */
  export type AIDriftMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIDriftMetrics.
     */
    data: XOR<AIDriftMetricUpdateManyMutationInput, AIDriftMetricUncheckedUpdateManyInput>
    /**
     * Filter which AIDriftMetrics to update
     */
    where?: AIDriftMetricWhereInput
    /**
     * Limit how many AIDriftMetrics to update.
     */
    limit?: number
  }

  /**
   * AIDriftMetric updateManyAndReturn
   */
  export type AIDriftMetricUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * The data used to update AIDriftMetrics.
     */
    data: XOR<AIDriftMetricUpdateManyMutationInput, AIDriftMetricUncheckedUpdateManyInput>
    /**
     * Filter which AIDriftMetrics to update
     */
    where?: AIDriftMetricWhereInput
    /**
     * Limit how many AIDriftMetrics to update.
     */
    limit?: number
  }

  /**
   * AIDriftMetric upsert
   */
  export type AIDriftMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * The filter to search for the AIDriftMetric to update in case it exists.
     */
    where: AIDriftMetricWhereUniqueInput
    /**
     * In case the AIDriftMetric found by the `where` argument doesn't exist, create a new AIDriftMetric with this data.
     */
    create: XOR<AIDriftMetricCreateInput, AIDriftMetricUncheckedCreateInput>
    /**
     * In case the AIDriftMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIDriftMetricUpdateInput, AIDriftMetricUncheckedUpdateInput>
  }

  /**
   * AIDriftMetric delete
   */
  export type AIDriftMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
    /**
     * Filter which AIDriftMetric to delete.
     */
    where: AIDriftMetricWhereUniqueInput
  }

  /**
   * AIDriftMetric deleteMany
   */
  export type AIDriftMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIDriftMetrics to delete
     */
    where?: AIDriftMetricWhereInput
    /**
     * Limit how many AIDriftMetrics to delete.
     */
    limit?: number
  }

  /**
   * AIDriftMetric without action
   */
  export type AIDriftMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIDriftMetric
     */
    select?: AIDriftMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIDriftMetric
     */
    omit?: AIDriftMetricOmit<ExtArgs> | null
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


  export const AIDriftEventScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    driftType: 'driftType',
    severity: 'severity',
    metrics: 'metrics',
    summary: 'summary',
    recommendedActions: 'recommendedActions',
    detectedAt: 'detectedAt',
    resolvedAt: 'resolvedAt',
    mitigationAction: 'mitigationAction'
  };

  export type AIDriftEventScalarFieldEnum = (typeof AIDriftEventScalarFieldEnum)[keyof typeof AIDriftEventScalarFieldEnum]


  export const AIDriftMetricScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    timestamp: 'timestamp',
    granularity: 'granularity',
    inputStats: 'inputStats',
    outputStats: 'outputStats',
    embeddingStats: 'embeddingStats',
    performanceStats: 'performanceStats'
  };

  export type AIDriftMetricScalarFieldEnum = (typeof AIDriftMetricScalarFieldEnum)[keyof typeof AIDriftMetricScalarFieldEnum]


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
   * Reference to a field of type 'AIDriftType'
   */
  export type EnumAIDriftTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDriftType'>
    


  /**
   * Reference to a field of type 'AIDriftType[]'
   */
  export type ListEnumAIDriftTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDriftType[]'>
    


  /**
   * Reference to a field of type 'AIDriftSeverity'
   */
  export type EnumAIDriftSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDriftSeverity'>
    


  /**
   * Reference to a field of type 'AIDriftSeverity[]'
   */
  export type ListEnumAIDriftSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIDriftSeverity[]'>
    


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


  export type AIDriftEventWhereInput = {
    AND?: AIDriftEventWhereInput | AIDriftEventWhereInput[]
    OR?: AIDriftEventWhereInput[]
    NOT?: AIDriftEventWhereInput | AIDriftEventWhereInput[]
    id?: StringFilter<"AIDriftEvent"> | string
    tenantId?: StringFilter<"AIDriftEvent"> | string
    modelId?: StringFilter<"AIDriftEvent"> | string
    driftType?: EnumAIDriftTypeFilter<"AIDriftEvent"> | $Enums.AIDriftType
    severity?: EnumAIDriftSeverityFilter<"AIDriftEvent"> | $Enums.AIDriftSeverity
    metrics?: JsonFilter<"AIDriftEvent">
    summary?: StringFilter<"AIDriftEvent"> | string
    recommendedActions?: JsonFilter<"AIDriftEvent">
    detectedAt?: DateTimeFilter<"AIDriftEvent"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"AIDriftEvent"> | Date | string | null
    mitigationAction?: StringNullableFilter<"AIDriftEvent"> | string | null
  }

  export type AIDriftEventOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    driftType?: SortOrder
    severity?: SortOrder
    metrics?: SortOrder
    summary?: SortOrder
    recommendedActions?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    mitigationAction?: SortOrderInput | SortOrder
  }

  export type AIDriftEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIDriftEventWhereInput | AIDriftEventWhereInput[]
    OR?: AIDriftEventWhereInput[]
    NOT?: AIDriftEventWhereInput | AIDriftEventWhereInput[]
    tenantId?: StringFilter<"AIDriftEvent"> | string
    modelId?: StringFilter<"AIDriftEvent"> | string
    driftType?: EnumAIDriftTypeFilter<"AIDriftEvent"> | $Enums.AIDriftType
    severity?: EnumAIDriftSeverityFilter<"AIDriftEvent"> | $Enums.AIDriftSeverity
    metrics?: JsonFilter<"AIDriftEvent">
    summary?: StringFilter<"AIDriftEvent"> | string
    recommendedActions?: JsonFilter<"AIDriftEvent">
    detectedAt?: DateTimeFilter<"AIDriftEvent"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"AIDriftEvent"> | Date | string | null
    mitigationAction?: StringNullableFilter<"AIDriftEvent"> | string | null
  }, "id">

  export type AIDriftEventOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    driftType?: SortOrder
    severity?: SortOrder
    metrics?: SortOrder
    summary?: SortOrder
    recommendedActions?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    mitigationAction?: SortOrderInput | SortOrder
    _count?: AIDriftEventCountOrderByAggregateInput
    _max?: AIDriftEventMaxOrderByAggregateInput
    _min?: AIDriftEventMinOrderByAggregateInput
  }

  export type AIDriftEventScalarWhereWithAggregatesInput = {
    AND?: AIDriftEventScalarWhereWithAggregatesInput | AIDriftEventScalarWhereWithAggregatesInput[]
    OR?: AIDriftEventScalarWhereWithAggregatesInput[]
    NOT?: AIDriftEventScalarWhereWithAggregatesInput | AIDriftEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIDriftEvent"> | string
    tenantId?: StringWithAggregatesFilter<"AIDriftEvent"> | string
    modelId?: StringWithAggregatesFilter<"AIDriftEvent"> | string
    driftType?: EnumAIDriftTypeWithAggregatesFilter<"AIDriftEvent"> | $Enums.AIDriftType
    severity?: EnumAIDriftSeverityWithAggregatesFilter<"AIDriftEvent"> | $Enums.AIDriftSeverity
    metrics?: JsonWithAggregatesFilter<"AIDriftEvent">
    summary?: StringWithAggregatesFilter<"AIDriftEvent"> | string
    recommendedActions?: JsonWithAggregatesFilter<"AIDriftEvent">
    detectedAt?: DateTimeWithAggregatesFilter<"AIDriftEvent"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"AIDriftEvent"> | Date | string | null
    mitigationAction?: StringNullableWithAggregatesFilter<"AIDriftEvent"> | string | null
  }

  export type AIDriftMetricWhereInput = {
    AND?: AIDriftMetricWhereInput | AIDriftMetricWhereInput[]
    OR?: AIDriftMetricWhereInput[]
    NOT?: AIDriftMetricWhereInput | AIDriftMetricWhereInput[]
    id?: StringFilter<"AIDriftMetric"> | string
    tenantId?: StringFilter<"AIDriftMetric"> | string
    modelId?: StringFilter<"AIDriftMetric"> | string
    timestamp?: DateTimeFilter<"AIDriftMetric"> | Date | string
    granularity?: StringFilter<"AIDriftMetric"> | string
    inputStats?: JsonFilter<"AIDriftMetric">
    outputStats?: JsonFilter<"AIDriftMetric">
    embeddingStats?: JsonFilter<"AIDriftMetric">
    performanceStats?: JsonFilter<"AIDriftMetric">
  }

  export type AIDriftMetricOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    timestamp?: SortOrder
    granularity?: SortOrder
    inputStats?: SortOrder
    outputStats?: SortOrder
    embeddingStats?: SortOrder
    performanceStats?: SortOrder
  }

  export type AIDriftMetricWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIDriftMetricWhereInput | AIDriftMetricWhereInput[]
    OR?: AIDriftMetricWhereInput[]
    NOT?: AIDriftMetricWhereInput | AIDriftMetricWhereInput[]
    tenantId?: StringFilter<"AIDriftMetric"> | string
    modelId?: StringFilter<"AIDriftMetric"> | string
    timestamp?: DateTimeFilter<"AIDriftMetric"> | Date | string
    granularity?: StringFilter<"AIDriftMetric"> | string
    inputStats?: JsonFilter<"AIDriftMetric">
    outputStats?: JsonFilter<"AIDriftMetric">
    embeddingStats?: JsonFilter<"AIDriftMetric">
    performanceStats?: JsonFilter<"AIDriftMetric">
  }, "id">

  export type AIDriftMetricOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    timestamp?: SortOrder
    granularity?: SortOrder
    inputStats?: SortOrder
    outputStats?: SortOrder
    embeddingStats?: SortOrder
    performanceStats?: SortOrder
    _count?: AIDriftMetricCountOrderByAggregateInput
    _max?: AIDriftMetricMaxOrderByAggregateInput
    _min?: AIDriftMetricMinOrderByAggregateInput
  }

  export type AIDriftMetricScalarWhereWithAggregatesInput = {
    AND?: AIDriftMetricScalarWhereWithAggregatesInput | AIDriftMetricScalarWhereWithAggregatesInput[]
    OR?: AIDriftMetricScalarWhereWithAggregatesInput[]
    NOT?: AIDriftMetricScalarWhereWithAggregatesInput | AIDriftMetricScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIDriftMetric"> | string
    tenantId?: StringWithAggregatesFilter<"AIDriftMetric"> | string
    modelId?: StringWithAggregatesFilter<"AIDriftMetric"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AIDriftMetric"> | Date | string
    granularity?: StringWithAggregatesFilter<"AIDriftMetric"> | string
    inputStats?: JsonWithAggregatesFilter<"AIDriftMetric">
    outputStats?: JsonWithAggregatesFilter<"AIDriftMetric">
    embeddingStats?: JsonWithAggregatesFilter<"AIDriftMetric">
    performanceStats?: JsonWithAggregatesFilter<"AIDriftMetric">
  }

  export type AIDriftEventCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    driftType: $Enums.AIDriftType
    severity: $Enums.AIDriftSeverity
    metrics?: JsonNullValueInput | InputJsonValue
    summary?: string
    recommendedActions?: JsonNullValueInput | InputJsonValue
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    mitigationAction?: string | null
  }

  export type AIDriftEventUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    driftType: $Enums.AIDriftType
    severity: $Enums.AIDriftSeverity
    metrics?: JsonNullValueInput | InputJsonValue
    summary?: string
    recommendedActions?: JsonNullValueInput | InputJsonValue
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    mitigationAction?: string | null
  }

  export type AIDriftEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    driftType?: EnumAIDriftTypeFieldUpdateOperationsInput | $Enums.AIDriftType
    severity?: EnumAIDriftSeverityFieldUpdateOperationsInput | $Enums.AIDriftSeverity
    metrics?: JsonNullValueInput | InputJsonValue
    summary?: StringFieldUpdateOperationsInput | string
    recommendedActions?: JsonNullValueInput | InputJsonValue
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mitigationAction?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIDriftEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    driftType?: EnumAIDriftTypeFieldUpdateOperationsInput | $Enums.AIDriftType
    severity?: EnumAIDriftSeverityFieldUpdateOperationsInput | $Enums.AIDriftSeverity
    metrics?: JsonNullValueInput | InputJsonValue
    summary?: StringFieldUpdateOperationsInput | string
    recommendedActions?: JsonNullValueInput | InputJsonValue
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mitigationAction?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIDriftEventCreateManyInput = {
    id?: string
    tenantId: string
    modelId: string
    driftType: $Enums.AIDriftType
    severity: $Enums.AIDriftSeverity
    metrics?: JsonNullValueInput | InputJsonValue
    summary?: string
    recommendedActions?: JsonNullValueInput | InputJsonValue
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    mitigationAction?: string | null
  }

  export type AIDriftEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    driftType?: EnumAIDriftTypeFieldUpdateOperationsInput | $Enums.AIDriftType
    severity?: EnumAIDriftSeverityFieldUpdateOperationsInput | $Enums.AIDriftSeverity
    metrics?: JsonNullValueInput | InputJsonValue
    summary?: StringFieldUpdateOperationsInput | string
    recommendedActions?: JsonNullValueInput | InputJsonValue
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mitigationAction?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIDriftEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    driftType?: EnumAIDriftTypeFieldUpdateOperationsInput | $Enums.AIDriftType
    severity?: EnumAIDriftSeverityFieldUpdateOperationsInput | $Enums.AIDriftSeverity
    metrics?: JsonNullValueInput | InputJsonValue
    summary?: StringFieldUpdateOperationsInput | string
    recommendedActions?: JsonNullValueInput | InputJsonValue
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mitigationAction?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AIDriftMetricCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    timestamp?: Date | string
    granularity?: string
    inputStats?: JsonNullValueInput | InputJsonValue
    outputStats?: JsonNullValueInput | InputJsonValue
    embeddingStats?: JsonNullValueInput | InputJsonValue
    performanceStats?: JsonNullValueInput | InputJsonValue
  }

  export type AIDriftMetricUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId: string
    timestamp?: Date | string
    granularity?: string
    inputStats?: JsonNullValueInput | InputJsonValue
    outputStats?: JsonNullValueInput | InputJsonValue
    embeddingStats?: JsonNullValueInput | InputJsonValue
    performanceStats?: JsonNullValueInput | InputJsonValue
  }

  export type AIDriftMetricUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    granularity?: StringFieldUpdateOperationsInput | string
    inputStats?: JsonNullValueInput | InputJsonValue
    outputStats?: JsonNullValueInput | InputJsonValue
    embeddingStats?: JsonNullValueInput | InputJsonValue
    performanceStats?: JsonNullValueInput | InputJsonValue
  }

  export type AIDriftMetricUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    granularity?: StringFieldUpdateOperationsInput | string
    inputStats?: JsonNullValueInput | InputJsonValue
    outputStats?: JsonNullValueInput | InputJsonValue
    embeddingStats?: JsonNullValueInput | InputJsonValue
    performanceStats?: JsonNullValueInput | InputJsonValue
  }

  export type AIDriftMetricCreateManyInput = {
    id?: string
    tenantId: string
    modelId: string
    timestamp?: Date | string
    granularity?: string
    inputStats?: JsonNullValueInput | InputJsonValue
    outputStats?: JsonNullValueInput | InputJsonValue
    embeddingStats?: JsonNullValueInput | InputJsonValue
    performanceStats?: JsonNullValueInput | InputJsonValue
  }

  export type AIDriftMetricUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    granularity?: StringFieldUpdateOperationsInput | string
    inputStats?: JsonNullValueInput | InputJsonValue
    outputStats?: JsonNullValueInput | InputJsonValue
    embeddingStats?: JsonNullValueInput | InputJsonValue
    performanceStats?: JsonNullValueInput | InputJsonValue
  }

  export type AIDriftMetricUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    granularity?: StringFieldUpdateOperationsInput | string
    inputStats?: JsonNullValueInput | InputJsonValue
    outputStats?: JsonNullValueInput | InputJsonValue
    embeddingStats?: JsonNullValueInput | InputJsonValue
    performanceStats?: JsonNullValueInput | InputJsonValue
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

  export type EnumAIDriftTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDriftType | EnumAIDriftTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDriftType[] | ListEnumAIDriftTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDriftType[] | ListEnumAIDriftTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDriftTypeFilter<$PrismaModel> | $Enums.AIDriftType
  }

  export type EnumAIDriftSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDriftSeverity | EnumAIDriftSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AIDriftSeverity[] | ListEnumAIDriftSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDriftSeverity[] | ListEnumAIDriftSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDriftSeverityFilter<$PrismaModel> | $Enums.AIDriftSeverity
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AIDriftEventCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    driftType?: SortOrder
    severity?: SortOrder
    metrics?: SortOrder
    summary?: SortOrder
    recommendedActions?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
    mitigationAction?: SortOrder
  }

  export type AIDriftEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    driftType?: SortOrder
    severity?: SortOrder
    summary?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
    mitigationAction?: SortOrder
  }

  export type AIDriftEventMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    driftType?: SortOrder
    severity?: SortOrder
    summary?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
    mitigationAction?: SortOrder
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

  export type EnumAIDriftTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDriftType | EnumAIDriftTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDriftType[] | ListEnumAIDriftTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDriftType[] | ListEnumAIDriftTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDriftTypeWithAggregatesFilter<$PrismaModel> | $Enums.AIDriftType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDriftTypeFilter<$PrismaModel>
    _max?: NestedEnumAIDriftTypeFilter<$PrismaModel>
  }

  export type EnumAIDriftSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDriftSeverity | EnumAIDriftSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AIDriftSeverity[] | ListEnumAIDriftSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDriftSeverity[] | ListEnumAIDriftSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDriftSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AIDriftSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDriftSeverityFilter<$PrismaModel>
    _max?: NestedEnumAIDriftSeverityFilter<$PrismaModel>
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

  export type AIDriftMetricCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    timestamp?: SortOrder
    granularity?: SortOrder
    inputStats?: SortOrder
    outputStats?: SortOrder
    embeddingStats?: SortOrder
    performanceStats?: SortOrder
  }

  export type AIDriftMetricMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    timestamp?: SortOrder
    granularity?: SortOrder
  }

  export type AIDriftMetricMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    timestamp?: SortOrder
    granularity?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAIDriftTypeFieldUpdateOperationsInput = {
    set?: $Enums.AIDriftType
  }

  export type EnumAIDriftSeverityFieldUpdateOperationsInput = {
    set?: $Enums.AIDriftSeverity
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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

  export type NestedEnumAIDriftTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDriftType | EnumAIDriftTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDriftType[] | ListEnumAIDriftTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDriftType[] | ListEnumAIDriftTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDriftTypeFilter<$PrismaModel> | $Enums.AIDriftType
  }

  export type NestedEnumAIDriftSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDriftSeverity | EnumAIDriftSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AIDriftSeverity[] | ListEnumAIDriftSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDriftSeverity[] | ListEnumAIDriftSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDriftSeverityFilter<$PrismaModel> | $Enums.AIDriftSeverity
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

  export type NestedEnumAIDriftTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDriftType | EnumAIDriftTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AIDriftType[] | ListEnumAIDriftTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDriftType[] | ListEnumAIDriftTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDriftTypeWithAggregatesFilter<$PrismaModel> | $Enums.AIDriftType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDriftTypeFilter<$PrismaModel>
    _max?: NestedEnumAIDriftTypeFilter<$PrismaModel>
  }

  export type NestedEnumAIDriftSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIDriftSeverity | EnumAIDriftSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AIDriftSeverity[] | ListEnumAIDriftSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIDriftSeverity[] | ListEnumAIDriftSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAIDriftSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AIDriftSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIDriftSeverityFilter<$PrismaModel>
    _max?: NestedEnumAIDriftSeverityFilter<$PrismaModel>
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