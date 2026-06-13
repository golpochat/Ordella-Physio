
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
 * Model AITraceSpan
 * 
 */
export type AITraceSpan = $Result.DefaultSelection<Prisma.$AITraceSpanPayload>
/**
 * Model AILogEvent
 * 
 */
export type AILogEvent = $Result.DefaultSelection<Prisma.$AILogEventPayload>
/**
 * Model AIMetricPoint
 * 
 */
export type AIMetricPoint = $Result.DefaultSelection<Prisma.$AIMetricPointPayload>
/**
 * Model AIBottleneckAlert
 * 
 */
export type AIBottleneckAlert = $Result.DefaultSelection<Prisma.$AIBottleneckAlertPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AITraceSpans
 * const aITraceSpans = await prisma.aITraceSpan.findMany()
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
   * // Fetch zero or more AITraceSpans
   * const aITraceSpans = await prisma.aITraceSpan.findMany()
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
   * `prisma.aITraceSpan`: Exposes CRUD operations for the **AITraceSpan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AITraceSpans
    * const aITraceSpans = await prisma.aITraceSpan.findMany()
    * ```
    */
  get aITraceSpan(): Prisma.AITraceSpanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aILogEvent`: Exposes CRUD operations for the **AILogEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AILogEvents
    * const aILogEvents = await prisma.aILogEvent.findMany()
    * ```
    */
  get aILogEvent(): Prisma.AILogEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIMetricPoint`: Exposes CRUD operations for the **AIMetricPoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIMetricPoints
    * const aIMetricPoints = await prisma.aIMetricPoint.findMany()
    * ```
    */
  get aIMetricPoint(): Prisma.AIMetricPointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIBottleneckAlert`: Exposes CRUD operations for the **AIBottleneckAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIBottleneckAlerts
    * const aIBottleneckAlerts = await prisma.aIBottleneckAlert.findMany()
    * ```
    */
  get aIBottleneckAlert(): Prisma.AIBottleneckAlertDelegate<ExtArgs, ClientOptions>;
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
    AITraceSpan: 'AITraceSpan',
    AILogEvent: 'AILogEvent',
    AIMetricPoint: 'AIMetricPoint',
    AIBottleneckAlert: 'AIBottleneckAlert'
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
      modelProps: "aITraceSpan" | "aILogEvent" | "aIMetricPoint" | "aIBottleneckAlert"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AITraceSpan: {
        payload: Prisma.$AITraceSpanPayload<ExtArgs>
        fields: Prisma.AITraceSpanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AITraceSpanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AITraceSpanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>
          }
          findFirst: {
            args: Prisma.AITraceSpanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AITraceSpanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>
          }
          findMany: {
            args: Prisma.AITraceSpanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>[]
          }
          create: {
            args: Prisma.AITraceSpanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>
          }
          createMany: {
            args: Prisma.AITraceSpanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AITraceSpanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>[]
          }
          delete: {
            args: Prisma.AITraceSpanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>
          }
          update: {
            args: Prisma.AITraceSpanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>
          }
          deleteMany: {
            args: Prisma.AITraceSpanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AITraceSpanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AITraceSpanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>[]
          }
          upsert: {
            args: Prisma.AITraceSpanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AITraceSpanPayload>
          }
          aggregate: {
            args: Prisma.AITraceSpanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAITraceSpan>
          }
          groupBy: {
            args: Prisma.AITraceSpanGroupByArgs<ExtArgs>
            result: $Utils.Optional<AITraceSpanGroupByOutputType>[]
          }
          count: {
            args: Prisma.AITraceSpanCountArgs<ExtArgs>
            result: $Utils.Optional<AITraceSpanCountAggregateOutputType> | number
          }
        }
      }
      AILogEvent: {
        payload: Prisma.$AILogEventPayload<ExtArgs>
        fields: Prisma.AILogEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AILogEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AILogEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>
          }
          findFirst: {
            args: Prisma.AILogEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AILogEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>
          }
          findMany: {
            args: Prisma.AILogEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>[]
          }
          create: {
            args: Prisma.AILogEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>
          }
          createMany: {
            args: Prisma.AILogEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AILogEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>[]
          }
          delete: {
            args: Prisma.AILogEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>
          }
          update: {
            args: Prisma.AILogEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>
          }
          deleteMany: {
            args: Prisma.AILogEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AILogEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AILogEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>[]
          }
          upsert: {
            args: Prisma.AILogEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AILogEventPayload>
          }
          aggregate: {
            args: Prisma.AILogEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAILogEvent>
          }
          groupBy: {
            args: Prisma.AILogEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AILogEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AILogEventCountArgs<ExtArgs>
            result: $Utils.Optional<AILogEventCountAggregateOutputType> | number
          }
        }
      }
      AIMetricPoint: {
        payload: Prisma.$AIMetricPointPayload<ExtArgs>
        fields: Prisma.AIMetricPointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIMetricPointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIMetricPointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>
          }
          findFirst: {
            args: Prisma.AIMetricPointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIMetricPointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>
          }
          findMany: {
            args: Prisma.AIMetricPointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>[]
          }
          create: {
            args: Prisma.AIMetricPointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>
          }
          createMany: {
            args: Prisma.AIMetricPointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIMetricPointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>[]
          }
          delete: {
            args: Prisma.AIMetricPointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>
          }
          update: {
            args: Prisma.AIMetricPointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>
          }
          deleteMany: {
            args: Prisma.AIMetricPointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIMetricPointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIMetricPointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>[]
          }
          upsert: {
            args: Prisma.AIMetricPointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMetricPointPayload>
          }
          aggregate: {
            args: Prisma.AIMetricPointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIMetricPoint>
          }
          groupBy: {
            args: Prisma.AIMetricPointGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIMetricPointGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIMetricPointCountArgs<ExtArgs>
            result: $Utils.Optional<AIMetricPointCountAggregateOutputType> | number
          }
        }
      }
      AIBottleneckAlert: {
        payload: Prisma.$AIBottleneckAlertPayload<ExtArgs>
        fields: Prisma.AIBottleneckAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIBottleneckAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIBottleneckAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>
          }
          findFirst: {
            args: Prisma.AIBottleneckAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIBottleneckAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>
          }
          findMany: {
            args: Prisma.AIBottleneckAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>[]
          }
          create: {
            args: Prisma.AIBottleneckAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>
          }
          createMany: {
            args: Prisma.AIBottleneckAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIBottleneckAlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>[]
          }
          delete: {
            args: Prisma.AIBottleneckAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>
          }
          update: {
            args: Prisma.AIBottleneckAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>
          }
          deleteMany: {
            args: Prisma.AIBottleneckAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIBottleneckAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIBottleneckAlertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>[]
          }
          upsert: {
            args: Prisma.AIBottleneckAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIBottleneckAlertPayload>
          }
          aggregate: {
            args: Prisma.AIBottleneckAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIBottleneckAlert>
          }
          groupBy: {
            args: Prisma.AIBottleneckAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIBottleneckAlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIBottleneckAlertCountArgs<ExtArgs>
            result: $Utils.Optional<AIBottleneckAlertCountAggregateOutputType> | number
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
    aITraceSpan?: AITraceSpanOmit
    aILogEvent?: AILogEventOmit
    aIMetricPoint?: AIMetricPointOmit
    aIBottleneckAlert?: AIBottleneckAlertOmit
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
   * Model AITraceSpan
   */

  export type AggregateAITraceSpan = {
    _count: AITraceSpanCountAggregateOutputType | null
    _avg: AITraceSpanAvgAggregateOutputType | null
    _sum: AITraceSpanSumAggregateOutputType | null
    _min: AITraceSpanMinAggregateOutputType | null
    _max: AITraceSpanMaxAggregateOutputType | null
  }

  export type AITraceSpanAvgAggregateOutputType = {
    durationMs: number | null
  }

  export type AITraceSpanSumAggregateOutputType = {
    durationMs: number | null
  }

  export type AITraceSpanMinAggregateOutputType = {
    id: string | null
    traceId: string | null
    spanId: string | null
    parentSpanId: string | null
    tenantId: string | null
    service: string | null
    operation: string | null
    startTime: Date | null
    endTime: Date | null
    durationMs: number | null
    status: string | null
  }

  export type AITraceSpanMaxAggregateOutputType = {
    id: string | null
    traceId: string | null
    spanId: string | null
    parentSpanId: string | null
    tenantId: string | null
    service: string | null
    operation: string | null
    startTime: Date | null
    endTime: Date | null
    durationMs: number | null
    status: string | null
  }

  export type AITraceSpanCountAggregateOutputType = {
    id: number
    traceId: number
    spanId: number
    parentSpanId: number
    tenantId: number
    service: number
    operation: number
    startTime: number
    endTime: number
    durationMs: number
    metadata: number
    status: number
    _all: number
  }


  export type AITraceSpanAvgAggregateInputType = {
    durationMs?: true
  }

  export type AITraceSpanSumAggregateInputType = {
    durationMs?: true
  }

  export type AITraceSpanMinAggregateInputType = {
    id?: true
    traceId?: true
    spanId?: true
    parentSpanId?: true
    tenantId?: true
    service?: true
    operation?: true
    startTime?: true
    endTime?: true
    durationMs?: true
    status?: true
  }

  export type AITraceSpanMaxAggregateInputType = {
    id?: true
    traceId?: true
    spanId?: true
    parentSpanId?: true
    tenantId?: true
    service?: true
    operation?: true
    startTime?: true
    endTime?: true
    durationMs?: true
    status?: true
  }

  export type AITraceSpanCountAggregateInputType = {
    id?: true
    traceId?: true
    spanId?: true
    parentSpanId?: true
    tenantId?: true
    service?: true
    operation?: true
    startTime?: true
    endTime?: true
    durationMs?: true
    metadata?: true
    status?: true
    _all?: true
  }

  export type AITraceSpanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITraceSpan to aggregate.
     */
    where?: AITraceSpanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITraceSpans to fetch.
     */
    orderBy?: AITraceSpanOrderByWithRelationInput | AITraceSpanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AITraceSpanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITraceSpans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITraceSpans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AITraceSpans
    **/
    _count?: true | AITraceSpanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AITraceSpanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AITraceSpanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AITraceSpanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AITraceSpanMaxAggregateInputType
  }

  export type GetAITraceSpanAggregateType<T extends AITraceSpanAggregateArgs> = {
        [P in keyof T & keyof AggregateAITraceSpan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAITraceSpan[P]>
      : GetScalarType<T[P], AggregateAITraceSpan[P]>
  }




  export type AITraceSpanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AITraceSpanWhereInput
    orderBy?: AITraceSpanOrderByWithAggregationInput | AITraceSpanOrderByWithAggregationInput[]
    by: AITraceSpanScalarFieldEnum[] | AITraceSpanScalarFieldEnum
    having?: AITraceSpanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AITraceSpanCountAggregateInputType | true
    _avg?: AITraceSpanAvgAggregateInputType
    _sum?: AITraceSpanSumAggregateInputType
    _min?: AITraceSpanMinAggregateInputType
    _max?: AITraceSpanMaxAggregateInputType
  }

  export type AITraceSpanGroupByOutputType = {
    id: string
    traceId: string
    spanId: string
    parentSpanId: string | null
    tenantId: string
    service: string
    operation: string
    startTime: Date
    endTime: Date | null
    durationMs: number | null
    metadata: JsonValue
    status: string
    _count: AITraceSpanCountAggregateOutputType | null
    _avg: AITraceSpanAvgAggregateOutputType | null
    _sum: AITraceSpanSumAggregateOutputType | null
    _min: AITraceSpanMinAggregateOutputType | null
    _max: AITraceSpanMaxAggregateOutputType | null
  }

  type GetAITraceSpanGroupByPayload<T extends AITraceSpanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AITraceSpanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AITraceSpanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AITraceSpanGroupByOutputType[P]>
            : GetScalarType<T[P], AITraceSpanGroupByOutputType[P]>
        }
      >
    >


  export type AITraceSpanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    traceId?: boolean
    spanId?: boolean
    parentSpanId?: boolean
    tenantId?: boolean
    service?: boolean
    operation?: boolean
    startTime?: boolean
    endTime?: boolean
    durationMs?: boolean
    metadata?: boolean
    status?: boolean
  }, ExtArgs["result"]["aITraceSpan"]>

  export type AITraceSpanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    traceId?: boolean
    spanId?: boolean
    parentSpanId?: boolean
    tenantId?: boolean
    service?: boolean
    operation?: boolean
    startTime?: boolean
    endTime?: boolean
    durationMs?: boolean
    metadata?: boolean
    status?: boolean
  }, ExtArgs["result"]["aITraceSpan"]>

  export type AITraceSpanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    traceId?: boolean
    spanId?: boolean
    parentSpanId?: boolean
    tenantId?: boolean
    service?: boolean
    operation?: boolean
    startTime?: boolean
    endTime?: boolean
    durationMs?: boolean
    metadata?: boolean
    status?: boolean
  }, ExtArgs["result"]["aITraceSpan"]>

  export type AITraceSpanSelectScalar = {
    id?: boolean
    traceId?: boolean
    spanId?: boolean
    parentSpanId?: boolean
    tenantId?: boolean
    service?: boolean
    operation?: boolean
    startTime?: boolean
    endTime?: boolean
    durationMs?: boolean
    metadata?: boolean
    status?: boolean
  }

  export type AITraceSpanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "traceId" | "spanId" | "parentSpanId" | "tenantId" | "service" | "operation" | "startTime" | "endTime" | "durationMs" | "metadata" | "status", ExtArgs["result"]["aITraceSpan"]>

  export type $AITraceSpanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AITraceSpan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      traceId: string
      spanId: string
      parentSpanId: string | null
      tenantId: string
      service: string
      operation: string
      startTime: Date
      endTime: Date | null
      durationMs: number | null
      metadata: Prisma.JsonValue
      status: string
    }, ExtArgs["result"]["aITraceSpan"]>
    composites: {}
  }

  type AITraceSpanGetPayload<S extends boolean | null | undefined | AITraceSpanDefaultArgs> = $Result.GetResult<Prisma.$AITraceSpanPayload, S>

  type AITraceSpanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AITraceSpanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AITraceSpanCountAggregateInputType | true
    }

  export interface AITraceSpanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AITraceSpan'], meta: { name: 'AITraceSpan' } }
    /**
     * Find zero or one AITraceSpan that matches the filter.
     * @param {AITraceSpanFindUniqueArgs} args - Arguments to find a AITraceSpan
     * @example
     * // Get one AITraceSpan
     * const aITraceSpan = await prisma.aITraceSpan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AITraceSpanFindUniqueArgs>(args: SelectSubset<T, AITraceSpanFindUniqueArgs<ExtArgs>>): Prisma__AITraceSpanClient<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AITraceSpan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AITraceSpanFindUniqueOrThrowArgs} args - Arguments to find a AITraceSpan
     * @example
     * // Get one AITraceSpan
     * const aITraceSpan = await prisma.aITraceSpan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AITraceSpanFindUniqueOrThrowArgs>(args: SelectSubset<T, AITraceSpanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AITraceSpanClient<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITraceSpan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITraceSpanFindFirstArgs} args - Arguments to find a AITraceSpan
     * @example
     * // Get one AITraceSpan
     * const aITraceSpan = await prisma.aITraceSpan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AITraceSpanFindFirstArgs>(args?: SelectSubset<T, AITraceSpanFindFirstArgs<ExtArgs>>): Prisma__AITraceSpanClient<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITraceSpan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITraceSpanFindFirstOrThrowArgs} args - Arguments to find a AITraceSpan
     * @example
     * // Get one AITraceSpan
     * const aITraceSpan = await prisma.aITraceSpan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AITraceSpanFindFirstOrThrowArgs>(args?: SelectSubset<T, AITraceSpanFindFirstOrThrowArgs<ExtArgs>>): Prisma__AITraceSpanClient<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AITraceSpans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITraceSpanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AITraceSpans
     * const aITraceSpans = await prisma.aITraceSpan.findMany()
     * 
     * // Get first 10 AITraceSpans
     * const aITraceSpans = await prisma.aITraceSpan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aITraceSpanWithIdOnly = await prisma.aITraceSpan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AITraceSpanFindManyArgs>(args?: SelectSubset<T, AITraceSpanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AITraceSpan.
     * @param {AITraceSpanCreateArgs} args - Arguments to create a AITraceSpan.
     * @example
     * // Create one AITraceSpan
     * const AITraceSpan = await prisma.aITraceSpan.create({
     *   data: {
     *     // ... data to create a AITraceSpan
     *   }
     * })
     * 
     */
    create<T extends AITraceSpanCreateArgs>(args: SelectSubset<T, AITraceSpanCreateArgs<ExtArgs>>): Prisma__AITraceSpanClient<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AITraceSpans.
     * @param {AITraceSpanCreateManyArgs} args - Arguments to create many AITraceSpans.
     * @example
     * // Create many AITraceSpans
     * const aITraceSpan = await prisma.aITraceSpan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AITraceSpanCreateManyArgs>(args?: SelectSubset<T, AITraceSpanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AITraceSpans and returns the data saved in the database.
     * @param {AITraceSpanCreateManyAndReturnArgs} args - Arguments to create many AITraceSpans.
     * @example
     * // Create many AITraceSpans
     * const aITraceSpan = await prisma.aITraceSpan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AITraceSpans and only return the `id`
     * const aITraceSpanWithIdOnly = await prisma.aITraceSpan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AITraceSpanCreateManyAndReturnArgs>(args?: SelectSubset<T, AITraceSpanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AITraceSpan.
     * @param {AITraceSpanDeleteArgs} args - Arguments to delete one AITraceSpan.
     * @example
     * // Delete one AITraceSpan
     * const AITraceSpan = await prisma.aITraceSpan.delete({
     *   where: {
     *     // ... filter to delete one AITraceSpan
     *   }
     * })
     * 
     */
    delete<T extends AITraceSpanDeleteArgs>(args: SelectSubset<T, AITraceSpanDeleteArgs<ExtArgs>>): Prisma__AITraceSpanClient<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AITraceSpan.
     * @param {AITraceSpanUpdateArgs} args - Arguments to update one AITraceSpan.
     * @example
     * // Update one AITraceSpan
     * const aITraceSpan = await prisma.aITraceSpan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AITraceSpanUpdateArgs>(args: SelectSubset<T, AITraceSpanUpdateArgs<ExtArgs>>): Prisma__AITraceSpanClient<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AITraceSpans.
     * @param {AITraceSpanDeleteManyArgs} args - Arguments to filter AITraceSpans to delete.
     * @example
     * // Delete a few AITraceSpans
     * const { count } = await prisma.aITraceSpan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AITraceSpanDeleteManyArgs>(args?: SelectSubset<T, AITraceSpanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITraceSpans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITraceSpanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AITraceSpans
     * const aITraceSpan = await prisma.aITraceSpan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AITraceSpanUpdateManyArgs>(args: SelectSubset<T, AITraceSpanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITraceSpans and returns the data updated in the database.
     * @param {AITraceSpanUpdateManyAndReturnArgs} args - Arguments to update many AITraceSpans.
     * @example
     * // Update many AITraceSpans
     * const aITraceSpan = await prisma.aITraceSpan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AITraceSpans and only return the `id`
     * const aITraceSpanWithIdOnly = await prisma.aITraceSpan.updateManyAndReturn({
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
    updateManyAndReturn<T extends AITraceSpanUpdateManyAndReturnArgs>(args: SelectSubset<T, AITraceSpanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AITraceSpan.
     * @param {AITraceSpanUpsertArgs} args - Arguments to update or create a AITraceSpan.
     * @example
     * // Update or create a AITraceSpan
     * const aITraceSpan = await prisma.aITraceSpan.upsert({
     *   create: {
     *     // ... data to create a AITraceSpan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AITraceSpan we want to update
     *   }
     * })
     */
    upsert<T extends AITraceSpanUpsertArgs>(args: SelectSubset<T, AITraceSpanUpsertArgs<ExtArgs>>): Prisma__AITraceSpanClient<$Result.GetResult<Prisma.$AITraceSpanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AITraceSpans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITraceSpanCountArgs} args - Arguments to filter AITraceSpans to count.
     * @example
     * // Count the number of AITraceSpans
     * const count = await prisma.aITraceSpan.count({
     *   where: {
     *     // ... the filter for the AITraceSpans we want to count
     *   }
     * })
    **/
    count<T extends AITraceSpanCountArgs>(
      args?: Subset<T, AITraceSpanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AITraceSpanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AITraceSpan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITraceSpanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AITraceSpanAggregateArgs>(args: Subset<T, AITraceSpanAggregateArgs>): Prisma.PrismaPromise<GetAITraceSpanAggregateType<T>>

    /**
     * Group by AITraceSpan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AITraceSpanGroupByArgs} args - Group by arguments.
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
      T extends AITraceSpanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AITraceSpanGroupByArgs['orderBy'] }
        : { orderBy?: AITraceSpanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AITraceSpanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAITraceSpanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AITraceSpan model
   */
  readonly fields: AITraceSpanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AITraceSpan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AITraceSpanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AITraceSpan model
   */
  interface AITraceSpanFieldRefs {
    readonly id: FieldRef<"AITraceSpan", 'String'>
    readonly traceId: FieldRef<"AITraceSpan", 'String'>
    readonly spanId: FieldRef<"AITraceSpan", 'String'>
    readonly parentSpanId: FieldRef<"AITraceSpan", 'String'>
    readonly tenantId: FieldRef<"AITraceSpan", 'String'>
    readonly service: FieldRef<"AITraceSpan", 'String'>
    readonly operation: FieldRef<"AITraceSpan", 'String'>
    readonly startTime: FieldRef<"AITraceSpan", 'DateTime'>
    readonly endTime: FieldRef<"AITraceSpan", 'DateTime'>
    readonly durationMs: FieldRef<"AITraceSpan", 'Int'>
    readonly metadata: FieldRef<"AITraceSpan", 'Json'>
    readonly status: FieldRef<"AITraceSpan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AITraceSpan findUnique
   */
  export type AITraceSpanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * Filter, which AITraceSpan to fetch.
     */
    where: AITraceSpanWhereUniqueInput
  }

  /**
   * AITraceSpan findUniqueOrThrow
   */
  export type AITraceSpanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * Filter, which AITraceSpan to fetch.
     */
    where: AITraceSpanWhereUniqueInput
  }

  /**
   * AITraceSpan findFirst
   */
  export type AITraceSpanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * Filter, which AITraceSpan to fetch.
     */
    where?: AITraceSpanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITraceSpans to fetch.
     */
    orderBy?: AITraceSpanOrderByWithRelationInput | AITraceSpanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITraceSpans.
     */
    cursor?: AITraceSpanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITraceSpans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITraceSpans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITraceSpans.
     */
    distinct?: AITraceSpanScalarFieldEnum | AITraceSpanScalarFieldEnum[]
  }

  /**
   * AITraceSpan findFirstOrThrow
   */
  export type AITraceSpanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * Filter, which AITraceSpan to fetch.
     */
    where?: AITraceSpanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITraceSpans to fetch.
     */
    orderBy?: AITraceSpanOrderByWithRelationInput | AITraceSpanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITraceSpans.
     */
    cursor?: AITraceSpanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITraceSpans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITraceSpans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITraceSpans.
     */
    distinct?: AITraceSpanScalarFieldEnum | AITraceSpanScalarFieldEnum[]
  }

  /**
   * AITraceSpan findMany
   */
  export type AITraceSpanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * Filter, which AITraceSpans to fetch.
     */
    where?: AITraceSpanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITraceSpans to fetch.
     */
    orderBy?: AITraceSpanOrderByWithRelationInput | AITraceSpanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AITraceSpans.
     */
    cursor?: AITraceSpanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITraceSpans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITraceSpans.
     */
    skip?: number
    distinct?: AITraceSpanScalarFieldEnum | AITraceSpanScalarFieldEnum[]
  }

  /**
   * AITraceSpan create
   */
  export type AITraceSpanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * The data needed to create a AITraceSpan.
     */
    data: XOR<AITraceSpanCreateInput, AITraceSpanUncheckedCreateInput>
  }

  /**
   * AITraceSpan createMany
   */
  export type AITraceSpanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AITraceSpans.
     */
    data: AITraceSpanCreateManyInput | AITraceSpanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AITraceSpan createManyAndReturn
   */
  export type AITraceSpanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * The data used to create many AITraceSpans.
     */
    data: AITraceSpanCreateManyInput | AITraceSpanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AITraceSpan update
   */
  export type AITraceSpanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * The data needed to update a AITraceSpan.
     */
    data: XOR<AITraceSpanUpdateInput, AITraceSpanUncheckedUpdateInput>
    /**
     * Choose, which AITraceSpan to update.
     */
    where: AITraceSpanWhereUniqueInput
  }

  /**
   * AITraceSpan updateMany
   */
  export type AITraceSpanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AITraceSpans.
     */
    data: XOR<AITraceSpanUpdateManyMutationInput, AITraceSpanUncheckedUpdateManyInput>
    /**
     * Filter which AITraceSpans to update
     */
    where?: AITraceSpanWhereInput
    /**
     * Limit how many AITraceSpans to update.
     */
    limit?: number
  }

  /**
   * AITraceSpan updateManyAndReturn
   */
  export type AITraceSpanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * The data used to update AITraceSpans.
     */
    data: XOR<AITraceSpanUpdateManyMutationInput, AITraceSpanUncheckedUpdateManyInput>
    /**
     * Filter which AITraceSpans to update
     */
    where?: AITraceSpanWhereInput
    /**
     * Limit how many AITraceSpans to update.
     */
    limit?: number
  }

  /**
   * AITraceSpan upsert
   */
  export type AITraceSpanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * The filter to search for the AITraceSpan to update in case it exists.
     */
    where: AITraceSpanWhereUniqueInput
    /**
     * In case the AITraceSpan found by the `where` argument doesn't exist, create a new AITraceSpan with this data.
     */
    create: XOR<AITraceSpanCreateInput, AITraceSpanUncheckedCreateInput>
    /**
     * In case the AITraceSpan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AITraceSpanUpdateInput, AITraceSpanUncheckedUpdateInput>
  }

  /**
   * AITraceSpan delete
   */
  export type AITraceSpanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
    /**
     * Filter which AITraceSpan to delete.
     */
    where: AITraceSpanWhereUniqueInput
  }

  /**
   * AITraceSpan deleteMany
   */
  export type AITraceSpanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITraceSpans to delete
     */
    where?: AITraceSpanWhereInput
    /**
     * Limit how many AITraceSpans to delete.
     */
    limit?: number
  }

  /**
   * AITraceSpan without action
   */
  export type AITraceSpanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITraceSpan
     */
    select?: AITraceSpanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITraceSpan
     */
    omit?: AITraceSpanOmit<ExtArgs> | null
  }


  /**
   * Model AILogEvent
   */

  export type AggregateAILogEvent = {
    _count: AILogEventCountAggregateOutputType | null
    _min: AILogEventMinAggregateOutputType | null
    _max: AILogEventMaxAggregateOutputType | null
  }

  export type AILogEventMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    service: string | null
    level: string | null
    message: string | null
    timestamp: Date | null
  }

  export type AILogEventMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    service: string | null
    level: string | null
    message: string | null
    timestamp: Date | null
  }

  export type AILogEventCountAggregateOutputType = {
    id: number
    tenantId: number
    service: number
    level: number
    message: number
    metadata: number
    timestamp: number
    _all: number
  }


  export type AILogEventMinAggregateInputType = {
    id?: true
    tenantId?: true
    service?: true
    level?: true
    message?: true
    timestamp?: true
  }

  export type AILogEventMaxAggregateInputType = {
    id?: true
    tenantId?: true
    service?: true
    level?: true
    message?: true
    timestamp?: true
  }

  export type AILogEventCountAggregateInputType = {
    id?: true
    tenantId?: true
    service?: true
    level?: true
    message?: true
    metadata?: true
    timestamp?: true
    _all?: true
  }

  export type AILogEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AILogEvent to aggregate.
     */
    where?: AILogEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AILogEvents to fetch.
     */
    orderBy?: AILogEventOrderByWithRelationInput | AILogEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AILogEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AILogEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AILogEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AILogEvents
    **/
    _count?: true | AILogEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AILogEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AILogEventMaxAggregateInputType
  }

  export type GetAILogEventAggregateType<T extends AILogEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAILogEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAILogEvent[P]>
      : GetScalarType<T[P], AggregateAILogEvent[P]>
  }




  export type AILogEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AILogEventWhereInput
    orderBy?: AILogEventOrderByWithAggregationInput | AILogEventOrderByWithAggregationInput[]
    by: AILogEventScalarFieldEnum[] | AILogEventScalarFieldEnum
    having?: AILogEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AILogEventCountAggregateInputType | true
    _min?: AILogEventMinAggregateInputType
    _max?: AILogEventMaxAggregateInputType
  }

  export type AILogEventGroupByOutputType = {
    id: string
    tenantId: string
    service: string
    level: string
    message: string
    metadata: JsonValue
    timestamp: Date
    _count: AILogEventCountAggregateOutputType | null
    _min: AILogEventMinAggregateOutputType | null
    _max: AILogEventMaxAggregateOutputType | null
  }

  type GetAILogEventGroupByPayload<T extends AILogEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AILogEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AILogEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AILogEventGroupByOutputType[P]>
            : GetScalarType<T[P], AILogEventGroupByOutputType[P]>
        }
      >
    >


  export type AILogEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    service?: boolean
    level?: boolean
    message?: boolean
    metadata?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["aILogEvent"]>

  export type AILogEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    service?: boolean
    level?: boolean
    message?: boolean
    metadata?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["aILogEvent"]>

  export type AILogEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    service?: boolean
    level?: boolean
    message?: boolean
    metadata?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["aILogEvent"]>

  export type AILogEventSelectScalar = {
    id?: boolean
    tenantId?: boolean
    service?: boolean
    level?: boolean
    message?: boolean
    metadata?: boolean
    timestamp?: boolean
  }

  export type AILogEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "service" | "level" | "message" | "metadata" | "timestamp", ExtArgs["result"]["aILogEvent"]>

  export type $AILogEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AILogEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      service: string
      level: string
      message: string
      metadata: Prisma.JsonValue
      timestamp: Date
    }, ExtArgs["result"]["aILogEvent"]>
    composites: {}
  }

  type AILogEventGetPayload<S extends boolean | null | undefined | AILogEventDefaultArgs> = $Result.GetResult<Prisma.$AILogEventPayload, S>

  type AILogEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AILogEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AILogEventCountAggregateInputType | true
    }

  export interface AILogEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AILogEvent'], meta: { name: 'AILogEvent' } }
    /**
     * Find zero or one AILogEvent that matches the filter.
     * @param {AILogEventFindUniqueArgs} args - Arguments to find a AILogEvent
     * @example
     * // Get one AILogEvent
     * const aILogEvent = await prisma.aILogEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AILogEventFindUniqueArgs>(args: SelectSubset<T, AILogEventFindUniqueArgs<ExtArgs>>): Prisma__AILogEventClient<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AILogEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AILogEventFindUniqueOrThrowArgs} args - Arguments to find a AILogEvent
     * @example
     * // Get one AILogEvent
     * const aILogEvent = await prisma.aILogEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AILogEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AILogEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AILogEventClient<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AILogEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AILogEventFindFirstArgs} args - Arguments to find a AILogEvent
     * @example
     * // Get one AILogEvent
     * const aILogEvent = await prisma.aILogEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AILogEventFindFirstArgs>(args?: SelectSubset<T, AILogEventFindFirstArgs<ExtArgs>>): Prisma__AILogEventClient<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AILogEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AILogEventFindFirstOrThrowArgs} args - Arguments to find a AILogEvent
     * @example
     * // Get one AILogEvent
     * const aILogEvent = await prisma.aILogEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AILogEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AILogEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AILogEventClient<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AILogEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AILogEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AILogEvents
     * const aILogEvents = await prisma.aILogEvent.findMany()
     * 
     * // Get first 10 AILogEvents
     * const aILogEvents = await prisma.aILogEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aILogEventWithIdOnly = await prisma.aILogEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AILogEventFindManyArgs>(args?: SelectSubset<T, AILogEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AILogEvent.
     * @param {AILogEventCreateArgs} args - Arguments to create a AILogEvent.
     * @example
     * // Create one AILogEvent
     * const AILogEvent = await prisma.aILogEvent.create({
     *   data: {
     *     // ... data to create a AILogEvent
     *   }
     * })
     * 
     */
    create<T extends AILogEventCreateArgs>(args: SelectSubset<T, AILogEventCreateArgs<ExtArgs>>): Prisma__AILogEventClient<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AILogEvents.
     * @param {AILogEventCreateManyArgs} args - Arguments to create many AILogEvents.
     * @example
     * // Create many AILogEvents
     * const aILogEvent = await prisma.aILogEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AILogEventCreateManyArgs>(args?: SelectSubset<T, AILogEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AILogEvents and returns the data saved in the database.
     * @param {AILogEventCreateManyAndReturnArgs} args - Arguments to create many AILogEvents.
     * @example
     * // Create many AILogEvents
     * const aILogEvent = await prisma.aILogEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AILogEvents and only return the `id`
     * const aILogEventWithIdOnly = await prisma.aILogEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AILogEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AILogEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AILogEvent.
     * @param {AILogEventDeleteArgs} args - Arguments to delete one AILogEvent.
     * @example
     * // Delete one AILogEvent
     * const AILogEvent = await prisma.aILogEvent.delete({
     *   where: {
     *     // ... filter to delete one AILogEvent
     *   }
     * })
     * 
     */
    delete<T extends AILogEventDeleteArgs>(args: SelectSubset<T, AILogEventDeleteArgs<ExtArgs>>): Prisma__AILogEventClient<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AILogEvent.
     * @param {AILogEventUpdateArgs} args - Arguments to update one AILogEvent.
     * @example
     * // Update one AILogEvent
     * const aILogEvent = await prisma.aILogEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AILogEventUpdateArgs>(args: SelectSubset<T, AILogEventUpdateArgs<ExtArgs>>): Prisma__AILogEventClient<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AILogEvents.
     * @param {AILogEventDeleteManyArgs} args - Arguments to filter AILogEvents to delete.
     * @example
     * // Delete a few AILogEvents
     * const { count } = await prisma.aILogEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AILogEventDeleteManyArgs>(args?: SelectSubset<T, AILogEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AILogEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AILogEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AILogEvents
     * const aILogEvent = await prisma.aILogEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AILogEventUpdateManyArgs>(args: SelectSubset<T, AILogEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AILogEvents and returns the data updated in the database.
     * @param {AILogEventUpdateManyAndReturnArgs} args - Arguments to update many AILogEvents.
     * @example
     * // Update many AILogEvents
     * const aILogEvent = await prisma.aILogEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AILogEvents and only return the `id`
     * const aILogEventWithIdOnly = await prisma.aILogEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends AILogEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AILogEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AILogEvent.
     * @param {AILogEventUpsertArgs} args - Arguments to update or create a AILogEvent.
     * @example
     * // Update or create a AILogEvent
     * const aILogEvent = await prisma.aILogEvent.upsert({
     *   create: {
     *     // ... data to create a AILogEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AILogEvent we want to update
     *   }
     * })
     */
    upsert<T extends AILogEventUpsertArgs>(args: SelectSubset<T, AILogEventUpsertArgs<ExtArgs>>): Prisma__AILogEventClient<$Result.GetResult<Prisma.$AILogEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AILogEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AILogEventCountArgs} args - Arguments to filter AILogEvents to count.
     * @example
     * // Count the number of AILogEvents
     * const count = await prisma.aILogEvent.count({
     *   where: {
     *     // ... the filter for the AILogEvents we want to count
     *   }
     * })
    **/
    count<T extends AILogEventCountArgs>(
      args?: Subset<T, AILogEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AILogEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AILogEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AILogEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AILogEventAggregateArgs>(args: Subset<T, AILogEventAggregateArgs>): Prisma.PrismaPromise<GetAILogEventAggregateType<T>>

    /**
     * Group by AILogEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AILogEventGroupByArgs} args - Group by arguments.
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
      T extends AILogEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AILogEventGroupByArgs['orderBy'] }
        : { orderBy?: AILogEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AILogEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAILogEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AILogEvent model
   */
  readonly fields: AILogEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AILogEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AILogEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AILogEvent model
   */
  interface AILogEventFieldRefs {
    readonly id: FieldRef<"AILogEvent", 'String'>
    readonly tenantId: FieldRef<"AILogEvent", 'String'>
    readonly service: FieldRef<"AILogEvent", 'String'>
    readonly level: FieldRef<"AILogEvent", 'String'>
    readonly message: FieldRef<"AILogEvent", 'String'>
    readonly metadata: FieldRef<"AILogEvent", 'Json'>
    readonly timestamp: FieldRef<"AILogEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AILogEvent findUnique
   */
  export type AILogEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * Filter, which AILogEvent to fetch.
     */
    where: AILogEventWhereUniqueInput
  }

  /**
   * AILogEvent findUniqueOrThrow
   */
  export type AILogEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * Filter, which AILogEvent to fetch.
     */
    where: AILogEventWhereUniqueInput
  }

  /**
   * AILogEvent findFirst
   */
  export type AILogEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * Filter, which AILogEvent to fetch.
     */
    where?: AILogEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AILogEvents to fetch.
     */
    orderBy?: AILogEventOrderByWithRelationInput | AILogEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AILogEvents.
     */
    cursor?: AILogEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AILogEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AILogEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AILogEvents.
     */
    distinct?: AILogEventScalarFieldEnum | AILogEventScalarFieldEnum[]
  }

  /**
   * AILogEvent findFirstOrThrow
   */
  export type AILogEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * Filter, which AILogEvent to fetch.
     */
    where?: AILogEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AILogEvents to fetch.
     */
    orderBy?: AILogEventOrderByWithRelationInput | AILogEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AILogEvents.
     */
    cursor?: AILogEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AILogEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AILogEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AILogEvents.
     */
    distinct?: AILogEventScalarFieldEnum | AILogEventScalarFieldEnum[]
  }

  /**
   * AILogEvent findMany
   */
  export type AILogEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * Filter, which AILogEvents to fetch.
     */
    where?: AILogEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AILogEvents to fetch.
     */
    orderBy?: AILogEventOrderByWithRelationInput | AILogEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AILogEvents.
     */
    cursor?: AILogEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AILogEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AILogEvents.
     */
    skip?: number
    distinct?: AILogEventScalarFieldEnum | AILogEventScalarFieldEnum[]
  }

  /**
   * AILogEvent create
   */
  export type AILogEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * The data needed to create a AILogEvent.
     */
    data: XOR<AILogEventCreateInput, AILogEventUncheckedCreateInput>
  }

  /**
   * AILogEvent createMany
   */
  export type AILogEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AILogEvents.
     */
    data: AILogEventCreateManyInput | AILogEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AILogEvent createManyAndReturn
   */
  export type AILogEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * The data used to create many AILogEvents.
     */
    data: AILogEventCreateManyInput | AILogEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AILogEvent update
   */
  export type AILogEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * The data needed to update a AILogEvent.
     */
    data: XOR<AILogEventUpdateInput, AILogEventUncheckedUpdateInput>
    /**
     * Choose, which AILogEvent to update.
     */
    where: AILogEventWhereUniqueInput
  }

  /**
   * AILogEvent updateMany
   */
  export type AILogEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AILogEvents.
     */
    data: XOR<AILogEventUpdateManyMutationInput, AILogEventUncheckedUpdateManyInput>
    /**
     * Filter which AILogEvents to update
     */
    where?: AILogEventWhereInput
    /**
     * Limit how many AILogEvents to update.
     */
    limit?: number
  }

  /**
   * AILogEvent updateManyAndReturn
   */
  export type AILogEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * The data used to update AILogEvents.
     */
    data: XOR<AILogEventUpdateManyMutationInput, AILogEventUncheckedUpdateManyInput>
    /**
     * Filter which AILogEvents to update
     */
    where?: AILogEventWhereInput
    /**
     * Limit how many AILogEvents to update.
     */
    limit?: number
  }

  /**
   * AILogEvent upsert
   */
  export type AILogEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * The filter to search for the AILogEvent to update in case it exists.
     */
    where: AILogEventWhereUniqueInput
    /**
     * In case the AILogEvent found by the `where` argument doesn't exist, create a new AILogEvent with this data.
     */
    create: XOR<AILogEventCreateInput, AILogEventUncheckedCreateInput>
    /**
     * In case the AILogEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AILogEventUpdateInput, AILogEventUncheckedUpdateInput>
  }

  /**
   * AILogEvent delete
   */
  export type AILogEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
    /**
     * Filter which AILogEvent to delete.
     */
    where: AILogEventWhereUniqueInput
  }

  /**
   * AILogEvent deleteMany
   */
  export type AILogEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AILogEvents to delete
     */
    where?: AILogEventWhereInput
    /**
     * Limit how many AILogEvents to delete.
     */
    limit?: number
  }

  /**
   * AILogEvent without action
   */
  export type AILogEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AILogEvent
     */
    select?: AILogEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AILogEvent
     */
    omit?: AILogEventOmit<ExtArgs> | null
  }


  /**
   * Model AIMetricPoint
   */

  export type AggregateAIMetricPoint = {
    _count: AIMetricPointCountAggregateOutputType | null
    _avg: AIMetricPointAvgAggregateOutputType | null
    _sum: AIMetricPointSumAggregateOutputType | null
    _min: AIMetricPointMinAggregateOutputType | null
    _max: AIMetricPointMaxAggregateOutputType | null
  }

  export type AIMetricPointAvgAggregateOutputType = {
    value: number | null
  }

  export type AIMetricPointSumAggregateOutputType = {
    value: number | null
  }

  export type AIMetricPointMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    region: string | null
    metricType: string | null
    value: number | null
    timestamp: Date | null
  }

  export type AIMetricPointMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    region: string | null
    metricType: string | null
    value: number | null
    timestamp: Date | null
  }

  export type AIMetricPointCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    region: number
    metricType: number
    value: number
    timestamp: number
    _all: number
  }


  export type AIMetricPointAvgAggregateInputType = {
    value?: true
  }

  export type AIMetricPointSumAggregateInputType = {
    value?: true
  }

  export type AIMetricPointMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    region?: true
    metricType?: true
    value?: true
    timestamp?: true
  }

  export type AIMetricPointMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    region?: true
    metricType?: true
    value?: true
    timestamp?: true
  }

  export type AIMetricPointCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    region?: true
    metricType?: true
    value?: true
    timestamp?: true
    _all?: true
  }

  export type AIMetricPointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIMetricPoint to aggregate.
     */
    where?: AIMetricPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMetricPoints to fetch.
     */
    orderBy?: AIMetricPointOrderByWithRelationInput | AIMetricPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIMetricPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMetricPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMetricPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIMetricPoints
    **/
    _count?: true | AIMetricPointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIMetricPointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIMetricPointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIMetricPointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIMetricPointMaxAggregateInputType
  }

  export type GetAIMetricPointAggregateType<T extends AIMetricPointAggregateArgs> = {
        [P in keyof T & keyof AggregateAIMetricPoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIMetricPoint[P]>
      : GetScalarType<T[P], AggregateAIMetricPoint[P]>
  }




  export type AIMetricPointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIMetricPointWhereInput
    orderBy?: AIMetricPointOrderByWithAggregationInput | AIMetricPointOrderByWithAggregationInput[]
    by: AIMetricPointScalarFieldEnum[] | AIMetricPointScalarFieldEnum
    having?: AIMetricPointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIMetricPointCountAggregateInputType | true
    _avg?: AIMetricPointAvgAggregateInputType
    _sum?: AIMetricPointSumAggregateInputType
    _min?: AIMetricPointMinAggregateInputType
    _max?: AIMetricPointMaxAggregateInputType
  }

  export type AIMetricPointGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string | null
    region: string | null
    metricType: string
    value: number
    timestamp: Date
    _count: AIMetricPointCountAggregateOutputType | null
    _avg: AIMetricPointAvgAggregateOutputType | null
    _sum: AIMetricPointSumAggregateOutputType | null
    _min: AIMetricPointMinAggregateOutputType | null
    _max: AIMetricPointMaxAggregateOutputType | null
  }

  type GetAIMetricPointGroupByPayload<T extends AIMetricPointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIMetricPointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIMetricPointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIMetricPointGroupByOutputType[P]>
            : GetScalarType<T[P], AIMetricPointGroupByOutputType[P]>
        }
      >
    >


  export type AIMetricPointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    region?: boolean
    metricType?: boolean
    value?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["aIMetricPoint"]>

  export type AIMetricPointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    region?: boolean
    metricType?: boolean
    value?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["aIMetricPoint"]>

  export type AIMetricPointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    region?: boolean
    metricType?: boolean
    value?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["aIMetricPoint"]>

  export type AIMetricPointSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    region?: boolean
    metricType?: boolean
    value?: boolean
    timestamp?: boolean
  }

  export type AIMetricPointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "region" | "metricType" | "value" | "timestamp", ExtArgs["result"]["aIMetricPoint"]>

  export type $AIMetricPointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIMetricPoint"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string | null
      region: string | null
      metricType: string
      value: number
      timestamp: Date
    }, ExtArgs["result"]["aIMetricPoint"]>
    composites: {}
  }

  type AIMetricPointGetPayload<S extends boolean | null | undefined | AIMetricPointDefaultArgs> = $Result.GetResult<Prisma.$AIMetricPointPayload, S>

  type AIMetricPointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIMetricPointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIMetricPointCountAggregateInputType | true
    }

  export interface AIMetricPointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIMetricPoint'], meta: { name: 'AIMetricPoint' } }
    /**
     * Find zero or one AIMetricPoint that matches the filter.
     * @param {AIMetricPointFindUniqueArgs} args - Arguments to find a AIMetricPoint
     * @example
     * // Get one AIMetricPoint
     * const aIMetricPoint = await prisma.aIMetricPoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIMetricPointFindUniqueArgs>(args: SelectSubset<T, AIMetricPointFindUniqueArgs<ExtArgs>>): Prisma__AIMetricPointClient<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIMetricPoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIMetricPointFindUniqueOrThrowArgs} args - Arguments to find a AIMetricPoint
     * @example
     * // Get one AIMetricPoint
     * const aIMetricPoint = await prisma.aIMetricPoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIMetricPointFindUniqueOrThrowArgs>(args: SelectSubset<T, AIMetricPointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIMetricPointClient<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIMetricPoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMetricPointFindFirstArgs} args - Arguments to find a AIMetricPoint
     * @example
     * // Get one AIMetricPoint
     * const aIMetricPoint = await prisma.aIMetricPoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIMetricPointFindFirstArgs>(args?: SelectSubset<T, AIMetricPointFindFirstArgs<ExtArgs>>): Prisma__AIMetricPointClient<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIMetricPoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMetricPointFindFirstOrThrowArgs} args - Arguments to find a AIMetricPoint
     * @example
     * // Get one AIMetricPoint
     * const aIMetricPoint = await prisma.aIMetricPoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIMetricPointFindFirstOrThrowArgs>(args?: SelectSubset<T, AIMetricPointFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIMetricPointClient<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIMetricPoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMetricPointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIMetricPoints
     * const aIMetricPoints = await prisma.aIMetricPoint.findMany()
     * 
     * // Get first 10 AIMetricPoints
     * const aIMetricPoints = await prisma.aIMetricPoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIMetricPointWithIdOnly = await prisma.aIMetricPoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIMetricPointFindManyArgs>(args?: SelectSubset<T, AIMetricPointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIMetricPoint.
     * @param {AIMetricPointCreateArgs} args - Arguments to create a AIMetricPoint.
     * @example
     * // Create one AIMetricPoint
     * const AIMetricPoint = await prisma.aIMetricPoint.create({
     *   data: {
     *     // ... data to create a AIMetricPoint
     *   }
     * })
     * 
     */
    create<T extends AIMetricPointCreateArgs>(args: SelectSubset<T, AIMetricPointCreateArgs<ExtArgs>>): Prisma__AIMetricPointClient<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIMetricPoints.
     * @param {AIMetricPointCreateManyArgs} args - Arguments to create many AIMetricPoints.
     * @example
     * // Create many AIMetricPoints
     * const aIMetricPoint = await prisma.aIMetricPoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIMetricPointCreateManyArgs>(args?: SelectSubset<T, AIMetricPointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIMetricPoints and returns the data saved in the database.
     * @param {AIMetricPointCreateManyAndReturnArgs} args - Arguments to create many AIMetricPoints.
     * @example
     * // Create many AIMetricPoints
     * const aIMetricPoint = await prisma.aIMetricPoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIMetricPoints and only return the `id`
     * const aIMetricPointWithIdOnly = await prisma.aIMetricPoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIMetricPointCreateManyAndReturnArgs>(args?: SelectSubset<T, AIMetricPointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIMetricPoint.
     * @param {AIMetricPointDeleteArgs} args - Arguments to delete one AIMetricPoint.
     * @example
     * // Delete one AIMetricPoint
     * const AIMetricPoint = await prisma.aIMetricPoint.delete({
     *   where: {
     *     // ... filter to delete one AIMetricPoint
     *   }
     * })
     * 
     */
    delete<T extends AIMetricPointDeleteArgs>(args: SelectSubset<T, AIMetricPointDeleteArgs<ExtArgs>>): Prisma__AIMetricPointClient<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIMetricPoint.
     * @param {AIMetricPointUpdateArgs} args - Arguments to update one AIMetricPoint.
     * @example
     * // Update one AIMetricPoint
     * const aIMetricPoint = await prisma.aIMetricPoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIMetricPointUpdateArgs>(args: SelectSubset<T, AIMetricPointUpdateArgs<ExtArgs>>): Prisma__AIMetricPointClient<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIMetricPoints.
     * @param {AIMetricPointDeleteManyArgs} args - Arguments to filter AIMetricPoints to delete.
     * @example
     * // Delete a few AIMetricPoints
     * const { count } = await prisma.aIMetricPoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIMetricPointDeleteManyArgs>(args?: SelectSubset<T, AIMetricPointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIMetricPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMetricPointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIMetricPoints
     * const aIMetricPoint = await prisma.aIMetricPoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIMetricPointUpdateManyArgs>(args: SelectSubset<T, AIMetricPointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIMetricPoints and returns the data updated in the database.
     * @param {AIMetricPointUpdateManyAndReturnArgs} args - Arguments to update many AIMetricPoints.
     * @example
     * // Update many AIMetricPoints
     * const aIMetricPoint = await prisma.aIMetricPoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIMetricPoints and only return the `id`
     * const aIMetricPointWithIdOnly = await prisma.aIMetricPoint.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIMetricPointUpdateManyAndReturnArgs>(args: SelectSubset<T, AIMetricPointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIMetricPoint.
     * @param {AIMetricPointUpsertArgs} args - Arguments to update or create a AIMetricPoint.
     * @example
     * // Update or create a AIMetricPoint
     * const aIMetricPoint = await prisma.aIMetricPoint.upsert({
     *   create: {
     *     // ... data to create a AIMetricPoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIMetricPoint we want to update
     *   }
     * })
     */
    upsert<T extends AIMetricPointUpsertArgs>(args: SelectSubset<T, AIMetricPointUpsertArgs<ExtArgs>>): Prisma__AIMetricPointClient<$Result.GetResult<Prisma.$AIMetricPointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIMetricPoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMetricPointCountArgs} args - Arguments to filter AIMetricPoints to count.
     * @example
     * // Count the number of AIMetricPoints
     * const count = await prisma.aIMetricPoint.count({
     *   where: {
     *     // ... the filter for the AIMetricPoints we want to count
     *   }
     * })
    **/
    count<T extends AIMetricPointCountArgs>(
      args?: Subset<T, AIMetricPointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIMetricPointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIMetricPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMetricPointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIMetricPointAggregateArgs>(args: Subset<T, AIMetricPointAggregateArgs>): Prisma.PrismaPromise<GetAIMetricPointAggregateType<T>>

    /**
     * Group by AIMetricPoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMetricPointGroupByArgs} args - Group by arguments.
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
      T extends AIMetricPointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIMetricPointGroupByArgs['orderBy'] }
        : { orderBy?: AIMetricPointGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIMetricPointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIMetricPointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIMetricPoint model
   */
  readonly fields: AIMetricPointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIMetricPoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIMetricPointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIMetricPoint model
   */
  interface AIMetricPointFieldRefs {
    readonly id: FieldRef<"AIMetricPoint", 'String'>
    readonly tenantId: FieldRef<"AIMetricPoint", 'String'>
    readonly modelId: FieldRef<"AIMetricPoint", 'String'>
    readonly region: FieldRef<"AIMetricPoint", 'String'>
    readonly metricType: FieldRef<"AIMetricPoint", 'String'>
    readonly value: FieldRef<"AIMetricPoint", 'Float'>
    readonly timestamp: FieldRef<"AIMetricPoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIMetricPoint findUnique
   */
  export type AIMetricPointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * Filter, which AIMetricPoint to fetch.
     */
    where: AIMetricPointWhereUniqueInput
  }

  /**
   * AIMetricPoint findUniqueOrThrow
   */
  export type AIMetricPointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * Filter, which AIMetricPoint to fetch.
     */
    where: AIMetricPointWhereUniqueInput
  }

  /**
   * AIMetricPoint findFirst
   */
  export type AIMetricPointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * Filter, which AIMetricPoint to fetch.
     */
    where?: AIMetricPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMetricPoints to fetch.
     */
    orderBy?: AIMetricPointOrderByWithRelationInput | AIMetricPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIMetricPoints.
     */
    cursor?: AIMetricPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMetricPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMetricPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMetricPoints.
     */
    distinct?: AIMetricPointScalarFieldEnum | AIMetricPointScalarFieldEnum[]
  }

  /**
   * AIMetricPoint findFirstOrThrow
   */
  export type AIMetricPointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * Filter, which AIMetricPoint to fetch.
     */
    where?: AIMetricPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMetricPoints to fetch.
     */
    orderBy?: AIMetricPointOrderByWithRelationInput | AIMetricPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIMetricPoints.
     */
    cursor?: AIMetricPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMetricPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMetricPoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMetricPoints.
     */
    distinct?: AIMetricPointScalarFieldEnum | AIMetricPointScalarFieldEnum[]
  }

  /**
   * AIMetricPoint findMany
   */
  export type AIMetricPointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * Filter, which AIMetricPoints to fetch.
     */
    where?: AIMetricPointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMetricPoints to fetch.
     */
    orderBy?: AIMetricPointOrderByWithRelationInput | AIMetricPointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIMetricPoints.
     */
    cursor?: AIMetricPointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMetricPoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMetricPoints.
     */
    skip?: number
    distinct?: AIMetricPointScalarFieldEnum | AIMetricPointScalarFieldEnum[]
  }

  /**
   * AIMetricPoint create
   */
  export type AIMetricPointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * The data needed to create a AIMetricPoint.
     */
    data: XOR<AIMetricPointCreateInput, AIMetricPointUncheckedCreateInput>
  }

  /**
   * AIMetricPoint createMany
   */
  export type AIMetricPointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIMetricPoints.
     */
    data: AIMetricPointCreateManyInput | AIMetricPointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIMetricPoint createManyAndReturn
   */
  export type AIMetricPointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * The data used to create many AIMetricPoints.
     */
    data: AIMetricPointCreateManyInput | AIMetricPointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIMetricPoint update
   */
  export type AIMetricPointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * The data needed to update a AIMetricPoint.
     */
    data: XOR<AIMetricPointUpdateInput, AIMetricPointUncheckedUpdateInput>
    /**
     * Choose, which AIMetricPoint to update.
     */
    where: AIMetricPointWhereUniqueInput
  }

  /**
   * AIMetricPoint updateMany
   */
  export type AIMetricPointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIMetricPoints.
     */
    data: XOR<AIMetricPointUpdateManyMutationInput, AIMetricPointUncheckedUpdateManyInput>
    /**
     * Filter which AIMetricPoints to update
     */
    where?: AIMetricPointWhereInput
    /**
     * Limit how many AIMetricPoints to update.
     */
    limit?: number
  }

  /**
   * AIMetricPoint updateManyAndReturn
   */
  export type AIMetricPointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * The data used to update AIMetricPoints.
     */
    data: XOR<AIMetricPointUpdateManyMutationInput, AIMetricPointUncheckedUpdateManyInput>
    /**
     * Filter which AIMetricPoints to update
     */
    where?: AIMetricPointWhereInput
    /**
     * Limit how many AIMetricPoints to update.
     */
    limit?: number
  }

  /**
   * AIMetricPoint upsert
   */
  export type AIMetricPointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * The filter to search for the AIMetricPoint to update in case it exists.
     */
    where: AIMetricPointWhereUniqueInput
    /**
     * In case the AIMetricPoint found by the `where` argument doesn't exist, create a new AIMetricPoint with this data.
     */
    create: XOR<AIMetricPointCreateInput, AIMetricPointUncheckedCreateInput>
    /**
     * In case the AIMetricPoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIMetricPointUpdateInput, AIMetricPointUncheckedUpdateInput>
  }

  /**
   * AIMetricPoint delete
   */
  export type AIMetricPointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
    /**
     * Filter which AIMetricPoint to delete.
     */
    where: AIMetricPointWhereUniqueInput
  }

  /**
   * AIMetricPoint deleteMany
   */
  export type AIMetricPointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIMetricPoints to delete
     */
    where?: AIMetricPointWhereInput
    /**
     * Limit how many AIMetricPoints to delete.
     */
    limit?: number
  }

  /**
   * AIMetricPoint without action
   */
  export type AIMetricPointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMetricPoint
     */
    select?: AIMetricPointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIMetricPoint
     */
    omit?: AIMetricPointOmit<ExtArgs> | null
  }


  /**
   * Model AIBottleneckAlert
   */

  export type AggregateAIBottleneckAlert = {
    _count: AIBottleneckAlertCountAggregateOutputType | null
    _min: AIBottleneckAlertMinAggregateOutputType | null
    _max: AIBottleneckAlertMaxAggregateOutputType | null
  }

  export type AIBottleneckAlertMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    alertType: string | null
    entity: string | null
    severity: string | null
    message: string | null
    detectedAt: Date | null
    resolvedAt: Date | null
  }

  export type AIBottleneckAlertMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    alertType: string | null
    entity: string | null
    severity: string | null
    message: string | null
    detectedAt: Date | null
    resolvedAt: Date | null
  }

  export type AIBottleneckAlertCountAggregateOutputType = {
    id: number
    tenantId: number
    alertType: number
    entity: number
    severity: number
    message: number
    metadata: number
    detectedAt: number
    resolvedAt: number
    _all: number
  }


  export type AIBottleneckAlertMinAggregateInputType = {
    id?: true
    tenantId?: true
    alertType?: true
    entity?: true
    severity?: true
    message?: true
    detectedAt?: true
    resolvedAt?: true
  }

  export type AIBottleneckAlertMaxAggregateInputType = {
    id?: true
    tenantId?: true
    alertType?: true
    entity?: true
    severity?: true
    message?: true
    detectedAt?: true
    resolvedAt?: true
  }

  export type AIBottleneckAlertCountAggregateInputType = {
    id?: true
    tenantId?: true
    alertType?: true
    entity?: true
    severity?: true
    message?: true
    metadata?: true
    detectedAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type AIBottleneckAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIBottleneckAlert to aggregate.
     */
    where?: AIBottleneckAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIBottleneckAlerts to fetch.
     */
    orderBy?: AIBottleneckAlertOrderByWithRelationInput | AIBottleneckAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIBottleneckAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIBottleneckAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIBottleneckAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIBottleneckAlerts
    **/
    _count?: true | AIBottleneckAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIBottleneckAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIBottleneckAlertMaxAggregateInputType
  }

  export type GetAIBottleneckAlertAggregateType<T extends AIBottleneckAlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAIBottleneckAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIBottleneckAlert[P]>
      : GetScalarType<T[P], AggregateAIBottleneckAlert[P]>
  }




  export type AIBottleneckAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIBottleneckAlertWhereInput
    orderBy?: AIBottleneckAlertOrderByWithAggregationInput | AIBottleneckAlertOrderByWithAggregationInput[]
    by: AIBottleneckAlertScalarFieldEnum[] | AIBottleneckAlertScalarFieldEnum
    having?: AIBottleneckAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIBottleneckAlertCountAggregateInputType | true
    _min?: AIBottleneckAlertMinAggregateInputType
    _max?: AIBottleneckAlertMaxAggregateInputType
  }

  export type AIBottleneckAlertGroupByOutputType = {
    id: string
    tenantId: string
    alertType: string
    entity: string
    severity: string
    message: string
    metadata: JsonValue
    detectedAt: Date
    resolvedAt: Date | null
    _count: AIBottleneckAlertCountAggregateOutputType | null
    _min: AIBottleneckAlertMinAggregateOutputType | null
    _max: AIBottleneckAlertMaxAggregateOutputType | null
  }

  type GetAIBottleneckAlertGroupByPayload<T extends AIBottleneckAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIBottleneckAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIBottleneckAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIBottleneckAlertGroupByOutputType[P]>
            : GetScalarType<T[P], AIBottleneckAlertGroupByOutputType[P]>
        }
      >
    >


  export type AIBottleneckAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    alertType?: boolean
    entity?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aIBottleneckAlert"]>

  export type AIBottleneckAlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    alertType?: boolean
    entity?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aIBottleneckAlert"]>

  export type AIBottleneckAlertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    alertType?: boolean
    entity?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aIBottleneckAlert"]>

  export type AIBottleneckAlertSelectScalar = {
    id?: boolean
    tenantId?: boolean
    alertType?: boolean
    entity?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }

  export type AIBottleneckAlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "alertType" | "entity" | "severity" | "message" | "metadata" | "detectedAt" | "resolvedAt", ExtArgs["result"]["aIBottleneckAlert"]>

  export type $AIBottleneckAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIBottleneckAlert"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      alertType: string
      entity: string
      severity: string
      message: string
      metadata: Prisma.JsonValue
      detectedAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["aIBottleneckAlert"]>
    composites: {}
  }

  type AIBottleneckAlertGetPayload<S extends boolean | null | undefined | AIBottleneckAlertDefaultArgs> = $Result.GetResult<Prisma.$AIBottleneckAlertPayload, S>

  type AIBottleneckAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIBottleneckAlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIBottleneckAlertCountAggregateInputType | true
    }

  export interface AIBottleneckAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIBottleneckAlert'], meta: { name: 'AIBottleneckAlert' } }
    /**
     * Find zero or one AIBottleneckAlert that matches the filter.
     * @param {AIBottleneckAlertFindUniqueArgs} args - Arguments to find a AIBottleneckAlert
     * @example
     * // Get one AIBottleneckAlert
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIBottleneckAlertFindUniqueArgs>(args: SelectSubset<T, AIBottleneckAlertFindUniqueArgs<ExtArgs>>): Prisma__AIBottleneckAlertClient<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIBottleneckAlert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIBottleneckAlertFindUniqueOrThrowArgs} args - Arguments to find a AIBottleneckAlert
     * @example
     * // Get one AIBottleneckAlert
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIBottleneckAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AIBottleneckAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIBottleneckAlertClient<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIBottleneckAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBottleneckAlertFindFirstArgs} args - Arguments to find a AIBottleneckAlert
     * @example
     * // Get one AIBottleneckAlert
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIBottleneckAlertFindFirstArgs>(args?: SelectSubset<T, AIBottleneckAlertFindFirstArgs<ExtArgs>>): Prisma__AIBottleneckAlertClient<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIBottleneckAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBottleneckAlertFindFirstOrThrowArgs} args - Arguments to find a AIBottleneckAlert
     * @example
     * // Get one AIBottleneckAlert
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIBottleneckAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AIBottleneckAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIBottleneckAlertClient<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIBottleneckAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBottleneckAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIBottleneckAlerts
     * const aIBottleneckAlerts = await prisma.aIBottleneckAlert.findMany()
     * 
     * // Get first 10 AIBottleneckAlerts
     * const aIBottleneckAlerts = await prisma.aIBottleneckAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIBottleneckAlertWithIdOnly = await prisma.aIBottleneckAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIBottleneckAlertFindManyArgs>(args?: SelectSubset<T, AIBottleneckAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIBottleneckAlert.
     * @param {AIBottleneckAlertCreateArgs} args - Arguments to create a AIBottleneckAlert.
     * @example
     * // Create one AIBottleneckAlert
     * const AIBottleneckAlert = await prisma.aIBottleneckAlert.create({
     *   data: {
     *     // ... data to create a AIBottleneckAlert
     *   }
     * })
     * 
     */
    create<T extends AIBottleneckAlertCreateArgs>(args: SelectSubset<T, AIBottleneckAlertCreateArgs<ExtArgs>>): Prisma__AIBottleneckAlertClient<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIBottleneckAlerts.
     * @param {AIBottleneckAlertCreateManyArgs} args - Arguments to create many AIBottleneckAlerts.
     * @example
     * // Create many AIBottleneckAlerts
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIBottleneckAlertCreateManyArgs>(args?: SelectSubset<T, AIBottleneckAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIBottleneckAlerts and returns the data saved in the database.
     * @param {AIBottleneckAlertCreateManyAndReturnArgs} args - Arguments to create many AIBottleneckAlerts.
     * @example
     * // Create many AIBottleneckAlerts
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIBottleneckAlerts and only return the `id`
     * const aIBottleneckAlertWithIdOnly = await prisma.aIBottleneckAlert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIBottleneckAlertCreateManyAndReturnArgs>(args?: SelectSubset<T, AIBottleneckAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIBottleneckAlert.
     * @param {AIBottleneckAlertDeleteArgs} args - Arguments to delete one AIBottleneckAlert.
     * @example
     * // Delete one AIBottleneckAlert
     * const AIBottleneckAlert = await prisma.aIBottleneckAlert.delete({
     *   where: {
     *     // ... filter to delete one AIBottleneckAlert
     *   }
     * })
     * 
     */
    delete<T extends AIBottleneckAlertDeleteArgs>(args: SelectSubset<T, AIBottleneckAlertDeleteArgs<ExtArgs>>): Prisma__AIBottleneckAlertClient<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIBottleneckAlert.
     * @param {AIBottleneckAlertUpdateArgs} args - Arguments to update one AIBottleneckAlert.
     * @example
     * // Update one AIBottleneckAlert
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIBottleneckAlertUpdateArgs>(args: SelectSubset<T, AIBottleneckAlertUpdateArgs<ExtArgs>>): Prisma__AIBottleneckAlertClient<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIBottleneckAlerts.
     * @param {AIBottleneckAlertDeleteManyArgs} args - Arguments to filter AIBottleneckAlerts to delete.
     * @example
     * // Delete a few AIBottleneckAlerts
     * const { count } = await prisma.aIBottleneckAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIBottleneckAlertDeleteManyArgs>(args?: SelectSubset<T, AIBottleneckAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIBottleneckAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBottleneckAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIBottleneckAlerts
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIBottleneckAlertUpdateManyArgs>(args: SelectSubset<T, AIBottleneckAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIBottleneckAlerts and returns the data updated in the database.
     * @param {AIBottleneckAlertUpdateManyAndReturnArgs} args - Arguments to update many AIBottleneckAlerts.
     * @example
     * // Update many AIBottleneckAlerts
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIBottleneckAlerts and only return the `id`
     * const aIBottleneckAlertWithIdOnly = await prisma.aIBottleneckAlert.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIBottleneckAlertUpdateManyAndReturnArgs>(args: SelectSubset<T, AIBottleneckAlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIBottleneckAlert.
     * @param {AIBottleneckAlertUpsertArgs} args - Arguments to update or create a AIBottleneckAlert.
     * @example
     * // Update or create a AIBottleneckAlert
     * const aIBottleneckAlert = await prisma.aIBottleneckAlert.upsert({
     *   create: {
     *     // ... data to create a AIBottleneckAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIBottleneckAlert we want to update
     *   }
     * })
     */
    upsert<T extends AIBottleneckAlertUpsertArgs>(args: SelectSubset<T, AIBottleneckAlertUpsertArgs<ExtArgs>>): Prisma__AIBottleneckAlertClient<$Result.GetResult<Prisma.$AIBottleneckAlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIBottleneckAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBottleneckAlertCountArgs} args - Arguments to filter AIBottleneckAlerts to count.
     * @example
     * // Count the number of AIBottleneckAlerts
     * const count = await prisma.aIBottleneckAlert.count({
     *   where: {
     *     // ... the filter for the AIBottleneckAlerts we want to count
     *   }
     * })
    **/
    count<T extends AIBottleneckAlertCountArgs>(
      args?: Subset<T, AIBottleneckAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIBottleneckAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIBottleneckAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBottleneckAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIBottleneckAlertAggregateArgs>(args: Subset<T, AIBottleneckAlertAggregateArgs>): Prisma.PrismaPromise<GetAIBottleneckAlertAggregateType<T>>

    /**
     * Group by AIBottleneckAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIBottleneckAlertGroupByArgs} args - Group by arguments.
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
      T extends AIBottleneckAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIBottleneckAlertGroupByArgs['orderBy'] }
        : { orderBy?: AIBottleneckAlertGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIBottleneckAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIBottleneckAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIBottleneckAlert model
   */
  readonly fields: AIBottleneckAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIBottleneckAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIBottleneckAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AIBottleneckAlert model
   */
  interface AIBottleneckAlertFieldRefs {
    readonly id: FieldRef<"AIBottleneckAlert", 'String'>
    readonly tenantId: FieldRef<"AIBottleneckAlert", 'String'>
    readonly alertType: FieldRef<"AIBottleneckAlert", 'String'>
    readonly entity: FieldRef<"AIBottleneckAlert", 'String'>
    readonly severity: FieldRef<"AIBottleneckAlert", 'String'>
    readonly message: FieldRef<"AIBottleneckAlert", 'String'>
    readonly metadata: FieldRef<"AIBottleneckAlert", 'Json'>
    readonly detectedAt: FieldRef<"AIBottleneckAlert", 'DateTime'>
    readonly resolvedAt: FieldRef<"AIBottleneckAlert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIBottleneckAlert findUnique
   */
  export type AIBottleneckAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * Filter, which AIBottleneckAlert to fetch.
     */
    where: AIBottleneckAlertWhereUniqueInput
  }

  /**
   * AIBottleneckAlert findUniqueOrThrow
   */
  export type AIBottleneckAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * Filter, which AIBottleneckAlert to fetch.
     */
    where: AIBottleneckAlertWhereUniqueInput
  }

  /**
   * AIBottleneckAlert findFirst
   */
  export type AIBottleneckAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * Filter, which AIBottleneckAlert to fetch.
     */
    where?: AIBottleneckAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIBottleneckAlerts to fetch.
     */
    orderBy?: AIBottleneckAlertOrderByWithRelationInput | AIBottleneckAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIBottleneckAlerts.
     */
    cursor?: AIBottleneckAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIBottleneckAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIBottleneckAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIBottleneckAlerts.
     */
    distinct?: AIBottleneckAlertScalarFieldEnum | AIBottleneckAlertScalarFieldEnum[]
  }

  /**
   * AIBottleneckAlert findFirstOrThrow
   */
  export type AIBottleneckAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * Filter, which AIBottleneckAlert to fetch.
     */
    where?: AIBottleneckAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIBottleneckAlerts to fetch.
     */
    orderBy?: AIBottleneckAlertOrderByWithRelationInput | AIBottleneckAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIBottleneckAlerts.
     */
    cursor?: AIBottleneckAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIBottleneckAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIBottleneckAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIBottleneckAlerts.
     */
    distinct?: AIBottleneckAlertScalarFieldEnum | AIBottleneckAlertScalarFieldEnum[]
  }

  /**
   * AIBottleneckAlert findMany
   */
  export type AIBottleneckAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * Filter, which AIBottleneckAlerts to fetch.
     */
    where?: AIBottleneckAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIBottleneckAlerts to fetch.
     */
    orderBy?: AIBottleneckAlertOrderByWithRelationInput | AIBottleneckAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIBottleneckAlerts.
     */
    cursor?: AIBottleneckAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIBottleneckAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIBottleneckAlerts.
     */
    skip?: number
    distinct?: AIBottleneckAlertScalarFieldEnum | AIBottleneckAlertScalarFieldEnum[]
  }

  /**
   * AIBottleneckAlert create
   */
  export type AIBottleneckAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * The data needed to create a AIBottleneckAlert.
     */
    data: XOR<AIBottleneckAlertCreateInput, AIBottleneckAlertUncheckedCreateInput>
  }

  /**
   * AIBottleneckAlert createMany
   */
  export type AIBottleneckAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIBottleneckAlerts.
     */
    data: AIBottleneckAlertCreateManyInput | AIBottleneckAlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIBottleneckAlert createManyAndReturn
   */
  export type AIBottleneckAlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * The data used to create many AIBottleneckAlerts.
     */
    data: AIBottleneckAlertCreateManyInput | AIBottleneckAlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIBottleneckAlert update
   */
  export type AIBottleneckAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * The data needed to update a AIBottleneckAlert.
     */
    data: XOR<AIBottleneckAlertUpdateInput, AIBottleneckAlertUncheckedUpdateInput>
    /**
     * Choose, which AIBottleneckAlert to update.
     */
    where: AIBottleneckAlertWhereUniqueInput
  }

  /**
   * AIBottleneckAlert updateMany
   */
  export type AIBottleneckAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIBottleneckAlerts.
     */
    data: XOR<AIBottleneckAlertUpdateManyMutationInput, AIBottleneckAlertUncheckedUpdateManyInput>
    /**
     * Filter which AIBottleneckAlerts to update
     */
    where?: AIBottleneckAlertWhereInput
    /**
     * Limit how many AIBottleneckAlerts to update.
     */
    limit?: number
  }

  /**
   * AIBottleneckAlert updateManyAndReturn
   */
  export type AIBottleneckAlertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * The data used to update AIBottleneckAlerts.
     */
    data: XOR<AIBottleneckAlertUpdateManyMutationInput, AIBottleneckAlertUncheckedUpdateManyInput>
    /**
     * Filter which AIBottleneckAlerts to update
     */
    where?: AIBottleneckAlertWhereInput
    /**
     * Limit how many AIBottleneckAlerts to update.
     */
    limit?: number
  }

  /**
   * AIBottleneckAlert upsert
   */
  export type AIBottleneckAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * The filter to search for the AIBottleneckAlert to update in case it exists.
     */
    where: AIBottleneckAlertWhereUniqueInput
    /**
     * In case the AIBottleneckAlert found by the `where` argument doesn't exist, create a new AIBottleneckAlert with this data.
     */
    create: XOR<AIBottleneckAlertCreateInput, AIBottleneckAlertUncheckedCreateInput>
    /**
     * In case the AIBottleneckAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIBottleneckAlertUpdateInput, AIBottleneckAlertUncheckedUpdateInput>
  }

  /**
   * AIBottleneckAlert delete
   */
  export type AIBottleneckAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
    /**
     * Filter which AIBottleneckAlert to delete.
     */
    where: AIBottleneckAlertWhereUniqueInput
  }

  /**
   * AIBottleneckAlert deleteMany
   */
  export type AIBottleneckAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIBottleneckAlerts to delete
     */
    where?: AIBottleneckAlertWhereInput
    /**
     * Limit how many AIBottleneckAlerts to delete.
     */
    limit?: number
  }

  /**
   * AIBottleneckAlert without action
   */
  export type AIBottleneckAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIBottleneckAlert
     */
    select?: AIBottleneckAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIBottleneckAlert
     */
    omit?: AIBottleneckAlertOmit<ExtArgs> | null
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


  export const AITraceSpanScalarFieldEnum: {
    id: 'id',
    traceId: 'traceId',
    spanId: 'spanId',
    parentSpanId: 'parentSpanId',
    tenantId: 'tenantId',
    service: 'service',
    operation: 'operation',
    startTime: 'startTime',
    endTime: 'endTime',
    durationMs: 'durationMs',
    metadata: 'metadata',
    status: 'status'
  };

  export type AITraceSpanScalarFieldEnum = (typeof AITraceSpanScalarFieldEnum)[keyof typeof AITraceSpanScalarFieldEnum]


  export const AILogEventScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    service: 'service',
    level: 'level',
    message: 'message',
    metadata: 'metadata',
    timestamp: 'timestamp'
  };

  export type AILogEventScalarFieldEnum = (typeof AILogEventScalarFieldEnum)[keyof typeof AILogEventScalarFieldEnum]


  export const AIMetricPointScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    region: 'region',
    metricType: 'metricType',
    value: 'value',
    timestamp: 'timestamp'
  };

  export type AIMetricPointScalarFieldEnum = (typeof AIMetricPointScalarFieldEnum)[keyof typeof AIMetricPointScalarFieldEnum]


  export const AIBottleneckAlertScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    alertType: 'alertType',
    entity: 'entity',
    severity: 'severity',
    message: 'message',
    metadata: 'metadata',
    detectedAt: 'detectedAt',
    resolvedAt: 'resolvedAt'
  };

  export type AIBottleneckAlertScalarFieldEnum = (typeof AIBottleneckAlertScalarFieldEnum)[keyof typeof AIBottleneckAlertScalarFieldEnum]


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


  export type AITraceSpanWhereInput = {
    AND?: AITraceSpanWhereInput | AITraceSpanWhereInput[]
    OR?: AITraceSpanWhereInput[]
    NOT?: AITraceSpanWhereInput | AITraceSpanWhereInput[]
    id?: StringFilter<"AITraceSpan"> | string
    traceId?: StringFilter<"AITraceSpan"> | string
    spanId?: StringFilter<"AITraceSpan"> | string
    parentSpanId?: StringNullableFilter<"AITraceSpan"> | string | null
    tenantId?: StringFilter<"AITraceSpan"> | string
    service?: StringFilter<"AITraceSpan"> | string
    operation?: StringFilter<"AITraceSpan"> | string
    startTime?: DateTimeFilter<"AITraceSpan"> | Date | string
    endTime?: DateTimeNullableFilter<"AITraceSpan"> | Date | string | null
    durationMs?: IntNullableFilter<"AITraceSpan"> | number | null
    metadata?: JsonFilter<"AITraceSpan">
    status?: StringFilter<"AITraceSpan"> | string
  }

  export type AITraceSpanOrderByWithRelationInput = {
    id?: SortOrder
    traceId?: SortOrder
    spanId?: SortOrder
    parentSpanId?: SortOrderInput | SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    operation?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    metadata?: SortOrder
    status?: SortOrder
  }

  export type AITraceSpanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AITraceSpanWhereInput | AITraceSpanWhereInput[]
    OR?: AITraceSpanWhereInput[]
    NOT?: AITraceSpanWhereInput | AITraceSpanWhereInput[]
    traceId?: StringFilter<"AITraceSpan"> | string
    spanId?: StringFilter<"AITraceSpan"> | string
    parentSpanId?: StringNullableFilter<"AITraceSpan"> | string | null
    tenantId?: StringFilter<"AITraceSpan"> | string
    service?: StringFilter<"AITraceSpan"> | string
    operation?: StringFilter<"AITraceSpan"> | string
    startTime?: DateTimeFilter<"AITraceSpan"> | Date | string
    endTime?: DateTimeNullableFilter<"AITraceSpan"> | Date | string | null
    durationMs?: IntNullableFilter<"AITraceSpan"> | number | null
    metadata?: JsonFilter<"AITraceSpan">
    status?: StringFilter<"AITraceSpan"> | string
  }, "id">

  export type AITraceSpanOrderByWithAggregationInput = {
    id?: SortOrder
    traceId?: SortOrder
    spanId?: SortOrder
    parentSpanId?: SortOrderInput | SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    operation?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    metadata?: SortOrder
    status?: SortOrder
    _count?: AITraceSpanCountOrderByAggregateInput
    _avg?: AITraceSpanAvgOrderByAggregateInput
    _max?: AITraceSpanMaxOrderByAggregateInput
    _min?: AITraceSpanMinOrderByAggregateInput
    _sum?: AITraceSpanSumOrderByAggregateInput
  }

  export type AITraceSpanScalarWhereWithAggregatesInput = {
    AND?: AITraceSpanScalarWhereWithAggregatesInput | AITraceSpanScalarWhereWithAggregatesInput[]
    OR?: AITraceSpanScalarWhereWithAggregatesInput[]
    NOT?: AITraceSpanScalarWhereWithAggregatesInput | AITraceSpanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AITraceSpan"> | string
    traceId?: StringWithAggregatesFilter<"AITraceSpan"> | string
    spanId?: StringWithAggregatesFilter<"AITraceSpan"> | string
    parentSpanId?: StringNullableWithAggregatesFilter<"AITraceSpan"> | string | null
    tenantId?: StringWithAggregatesFilter<"AITraceSpan"> | string
    service?: StringWithAggregatesFilter<"AITraceSpan"> | string
    operation?: StringWithAggregatesFilter<"AITraceSpan"> | string
    startTime?: DateTimeWithAggregatesFilter<"AITraceSpan"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"AITraceSpan"> | Date | string | null
    durationMs?: IntNullableWithAggregatesFilter<"AITraceSpan"> | number | null
    metadata?: JsonWithAggregatesFilter<"AITraceSpan">
    status?: StringWithAggregatesFilter<"AITraceSpan"> | string
  }

  export type AILogEventWhereInput = {
    AND?: AILogEventWhereInput | AILogEventWhereInput[]
    OR?: AILogEventWhereInput[]
    NOT?: AILogEventWhereInput | AILogEventWhereInput[]
    id?: StringFilter<"AILogEvent"> | string
    tenantId?: StringFilter<"AILogEvent"> | string
    service?: StringFilter<"AILogEvent"> | string
    level?: StringFilter<"AILogEvent"> | string
    message?: StringFilter<"AILogEvent"> | string
    metadata?: JsonFilter<"AILogEvent">
    timestamp?: DateTimeFilter<"AILogEvent"> | Date | string
  }

  export type AILogEventOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    level?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    timestamp?: SortOrder
  }

  export type AILogEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AILogEventWhereInput | AILogEventWhereInput[]
    OR?: AILogEventWhereInput[]
    NOT?: AILogEventWhereInput | AILogEventWhereInput[]
    tenantId?: StringFilter<"AILogEvent"> | string
    service?: StringFilter<"AILogEvent"> | string
    level?: StringFilter<"AILogEvent"> | string
    message?: StringFilter<"AILogEvent"> | string
    metadata?: JsonFilter<"AILogEvent">
    timestamp?: DateTimeFilter<"AILogEvent"> | Date | string
  }, "id">

  export type AILogEventOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    level?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    timestamp?: SortOrder
    _count?: AILogEventCountOrderByAggregateInput
    _max?: AILogEventMaxOrderByAggregateInput
    _min?: AILogEventMinOrderByAggregateInput
  }

  export type AILogEventScalarWhereWithAggregatesInput = {
    AND?: AILogEventScalarWhereWithAggregatesInput | AILogEventScalarWhereWithAggregatesInput[]
    OR?: AILogEventScalarWhereWithAggregatesInput[]
    NOT?: AILogEventScalarWhereWithAggregatesInput | AILogEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AILogEvent"> | string
    tenantId?: StringWithAggregatesFilter<"AILogEvent"> | string
    service?: StringWithAggregatesFilter<"AILogEvent"> | string
    level?: StringWithAggregatesFilter<"AILogEvent"> | string
    message?: StringWithAggregatesFilter<"AILogEvent"> | string
    metadata?: JsonWithAggregatesFilter<"AILogEvent">
    timestamp?: DateTimeWithAggregatesFilter<"AILogEvent"> | Date | string
  }

  export type AIMetricPointWhereInput = {
    AND?: AIMetricPointWhereInput | AIMetricPointWhereInput[]
    OR?: AIMetricPointWhereInput[]
    NOT?: AIMetricPointWhereInput | AIMetricPointWhereInput[]
    id?: StringFilter<"AIMetricPoint"> | string
    tenantId?: StringFilter<"AIMetricPoint"> | string
    modelId?: StringNullableFilter<"AIMetricPoint"> | string | null
    region?: StringNullableFilter<"AIMetricPoint"> | string | null
    metricType?: StringFilter<"AIMetricPoint"> | string
    value?: FloatFilter<"AIMetricPoint"> | number
    timestamp?: DateTimeFilter<"AIMetricPoint"> | Date | string
  }

  export type AIMetricPointOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    metricType?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
  }

  export type AIMetricPointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIMetricPointWhereInput | AIMetricPointWhereInput[]
    OR?: AIMetricPointWhereInput[]
    NOT?: AIMetricPointWhereInput | AIMetricPointWhereInput[]
    tenantId?: StringFilter<"AIMetricPoint"> | string
    modelId?: StringNullableFilter<"AIMetricPoint"> | string | null
    region?: StringNullableFilter<"AIMetricPoint"> | string | null
    metricType?: StringFilter<"AIMetricPoint"> | string
    value?: FloatFilter<"AIMetricPoint"> | number
    timestamp?: DateTimeFilter<"AIMetricPoint"> | Date | string
  }, "id">

  export type AIMetricPointOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    metricType?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
    _count?: AIMetricPointCountOrderByAggregateInput
    _avg?: AIMetricPointAvgOrderByAggregateInput
    _max?: AIMetricPointMaxOrderByAggregateInput
    _min?: AIMetricPointMinOrderByAggregateInput
    _sum?: AIMetricPointSumOrderByAggregateInput
  }

  export type AIMetricPointScalarWhereWithAggregatesInput = {
    AND?: AIMetricPointScalarWhereWithAggregatesInput | AIMetricPointScalarWhereWithAggregatesInput[]
    OR?: AIMetricPointScalarWhereWithAggregatesInput[]
    NOT?: AIMetricPointScalarWhereWithAggregatesInput | AIMetricPointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIMetricPoint"> | string
    tenantId?: StringWithAggregatesFilter<"AIMetricPoint"> | string
    modelId?: StringNullableWithAggregatesFilter<"AIMetricPoint"> | string | null
    region?: StringNullableWithAggregatesFilter<"AIMetricPoint"> | string | null
    metricType?: StringWithAggregatesFilter<"AIMetricPoint"> | string
    value?: FloatWithAggregatesFilter<"AIMetricPoint"> | number
    timestamp?: DateTimeWithAggregatesFilter<"AIMetricPoint"> | Date | string
  }

  export type AIBottleneckAlertWhereInput = {
    AND?: AIBottleneckAlertWhereInput | AIBottleneckAlertWhereInput[]
    OR?: AIBottleneckAlertWhereInput[]
    NOT?: AIBottleneckAlertWhereInput | AIBottleneckAlertWhereInput[]
    id?: StringFilter<"AIBottleneckAlert"> | string
    tenantId?: StringFilter<"AIBottleneckAlert"> | string
    alertType?: StringFilter<"AIBottleneckAlert"> | string
    entity?: StringFilter<"AIBottleneckAlert"> | string
    severity?: StringFilter<"AIBottleneckAlert"> | string
    message?: StringFilter<"AIBottleneckAlert"> | string
    metadata?: JsonFilter<"AIBottleneckAlert">
    detectedAt?: DateTimeFilter<"AIBottleneckAlert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"AIBottleneckAlert"> | Date | string | null
  }

  export type AIBottleneckAlertOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    alertType?: SortOrder
    entity?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
  }

  export type AIBottleneckAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIBottleneckAlertWhereInput | AIBottleneckAlertWhereInput[]
    OR?: AIBottleneckAlertWhereInput[]
    NOT?: AIBottleneckAlertWhereInput | AIBottleneckAlertWhereInput[]
    tenantId?: StringFilter<"AIBottleneckAlert"> | string
    alertType?: StringFilter<"AIBottleneckAlert"> | string
    entity?: StringFilter<"AIBottleneckAlert"> | string
    severity?: StringFilter<"AIBottleneckAlert"> | string
    message?: StringFilter<"AIBottleneckAlert"> | string
    metadata?: JsonFilter<"AIBottleneckAlert">
    detectedAt?: DateTimeFilter<"AIBottleneckAlert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"AIBottleneckAlert"> | Date | string | null
  }, "id">

  export type AIBottleneckAlertOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    alertType?: SortOrder
    entity?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: AIBottleneckAlertCountOrderByAggregateInput
    _max?: AIBottleneckAlertMaxOrderByAggregateInput
    _min?: AIBottleneckAlertMinOrderByAggregateInput
  }

  export type AIBottleneckAlertScalarWhereWithAggregatesInput = {
    AND?: AIBottleneckAlertScalarWhereWithAggregatesInput | AIBottleneckAlertScalarWhereWithAggregatesInput[]
    OR?: AIBottleneckAlertScalarWhereWithAggregatesInput[]
    NOT?: AIBottleneckAlertScalarWhereWithAggregatesInput | AIBottleneckAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIBottleneckAlert"> | string
    tenantId?: StringWithAggregatesFilter<"AIBottleneckAlert"> | string
    alertType?: StringWithAggregatesFilter<"AIBottleneckAlert"> | string
    entity?: StringWithAggregatesFilter<"AIBottleneckAlert"> | string
    severity?: StringWithAggregatesFilter<"AIBottleneckAlert"> | string
    message?: StringWithAggregatesFilter<"AIBottleneckAlert"> | string
    metadata?: JsonWithAggregatesFilter<"AIBottleneckAlert">
    detectedAt?: DateTimeWithAggregatesFilter<"AIBottleneckAlert"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"AIBottleneckAlert"> | Date | string | null
  }

  export type AITraceSpanCreateInput = {
    id?: string
    traceId: string
    spanId: string
    parentSpanId?: string | null
    tenantId: string
    service: string
    operation: string
    startTime?: Date | string
    endTime?: Date | string | null
    durationMs?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
    status?: string
  }

  export type AITraceSpanUncheckedCreateInput = {
    id?: string
    traceId: string
    spanId: string
    parentSpanId?: string | null
    tenantId: string
    service: string
    operation: string
    startTime?: Date | string
    endTime?: Date | string | null
    durationMs?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
    status?: string
  }

  export type AITraceSpanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    traceId?: StringFieldUpdateOperationsInput | string
    spanId?: StringFieldUpdateOperationsInput | string
    parentSpanId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AITraceSpanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    traceId?: StringFieldUpdateOperationsInput | string
    spanId?: StringFieldUpdateOperationsInput | string
    parentSpanId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AITraceSpanCreateManyInput = {
    id?: string
    traceId: string
    spanId: string
    parentSpanId?: string | null
    tenantId: string
    service: string
    operation: string
    startTime?: Date | string
    endTime?: Date | string | null
    durationMs?: number | null
    metadata?: JsonNullValueInput | InputJsonValue
    status?: string
  }

  export type AITraceSpanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    traceId?: StringFieldUpdateOperationsInput | string
    spanId?: StringFieldUpdateOperationsInput | string
    parentSpanId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AITraceSpanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    traceId?: StringFieldUpdateOperationsInput | string
    spanId?: StringFieldUpdateOperationsInput | string
    parentSpanId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AILogEventCreateInput = {
    id?: string
    tenantId: string
    service: string
    level: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AILogEventUncheckedCreateInput = {
    id?: string
    tenantId: string
    service: string
    level: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AILogEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AILogEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AILogEventCreateManyInput = {
    id?: string
    tenantId: string
    service: string
    level: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AILogEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AILogEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMetricPointCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    region?: string | null
    metricType: string
    value: number
    timestamp?: Date | string
  }

  export type AIMetricPointUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    region?: string | null
    metricType: string
    value: number
    timestamp?: Date | string
  }

  export type AIMetricPointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    metricType?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMetricPointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    metricType?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMetricPointCreateManyInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    region?: string | null
    metricType: string
    value: number
    timestamp?: Date | string
  }

  export type AIMetricPointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    metricType?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMetricPointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    metricType?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIBottleneckAlertCreateInput = {
    id?: string
    tenantId: string
    alertType: string
    entity: string
    severity: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AIBottleneckAlertUncheckedCreateInput = {
    id?: string
    tenantId: string
    alertType: string
    entity: string
    severity: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AIBottleneckAlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIBottleneckAlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIBottleneckAlertCreateManyInput = {
    id?: string
    tenantId: string
    alertType: string
    entity: string
    severity: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AIBottleneckAlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIBottleneckAlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AITraceSpanCountOrderByAggregateInput = {
    id?: SortOrder
    traceId?: SortOrder
    spanId?: SortOrder
    parentSpanId?: SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    operation?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationMs?: SortOrder
    metadata?: SortOrder
    status?: SortOrder
  }

  export type AITraceSpanAvgOrderByAggregateInput = {
    durationMs?: SortOrder
  }

  export type AITraceSpanMaxOrderByAggregateInput = {
    id?: SortOrder
    traceId?: SortOrder
    spanId?: SortOrder
    parentSpanId?: SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    operation?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationMs?: SortOrder
    status?: SortOrder
  }

  export type AITraceSpanMinOrderByAggregateInput = {
    id?: SortOrder
    traceId?: SortOrder
    spanId?: SortOrder
    parentSpanId?: SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    operation?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    durationMs?: SortOrder
    status?: SortOrder
  }

  export type AITraceSpanSumOrderByAggregateInput = {
    durationMs?: SortOrder
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

  export type AILogEventCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    level?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    timestamp?: SortOrder
  }

  export type AILogEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    level?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
  }

  export type AILogEventMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    service?: SortOrder
    level?: SortOrder
    message?: SortOrder
    timestamp?: SortOrder
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

  export type AIMetricPointCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    region?: SortOrder
    metricType?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
  }

  export type AIMetricPointAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type AIMetricPointMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    region?: SortOrder
    metricType?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
  }

  export type AIMetricPointMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    region?: SortOrder
    metricType?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
  }

  export type AIMetricPointSumOrderByAggregateInput = {
    value?: SortOrder
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

  export type AIBottleneckAlertCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    alertType?: SortOrder
    entity?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AIBottleneckAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    alertType?: SortOrder
    entity?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AIBottleneckAlertMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    alertType?: SortOrder
    entity?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
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