
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
 * Model AICostProfile
 * 
 */
export type AICostProfile = $Result.DefaultSelection<Prisma.$AICostProfilePayload>
/**
 * Model AICostUsageAggregate
 * 
 */
export type AICostUsageAggregate = $Result.DefaultSelection<Prisma.$AICostUsageAggregatePayload>
/**
 * Model AICostAlert
 * 
 */
export type AICostAlert = $Result.DefaultSelection<Prisma.$AICostAlertPayload>
/**
 * Model AICostBudget
 * 
 */
export type AICostBudget = $Result.DefaultSelection<Prisma.$AICostBudgetPayload>
/**
 * Model AICostUsageEvent
 * 
 */
export type AICostUsageEvent = $Result.DefaultSelection<Prisma.$AICostUsageEventPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AICostProfiles
 * const aICostProfiles = await prisma.aICostProfile.findMany()
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
   * // Fetch zero or more AICostProfiles
   * const aICostProfiles = await prisma.aICostProfile.findMany()
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
   * `prisma.aICostProfile`: Exposes CRUD operations for the **AICostProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AICostProfiles
    * const aICostProfiles = await prisma.aICostProfile.findMany()
    * ```
    */
  get aICostProfile(): Prisma.AICostProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aICostUsageAggregate`: Exposes CRUD operations for the **AICostUsageAggregate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AICostUsageAggregates
    * const aICostUsageAggregates = await prisma.aICostUsageAggregate.findMany()
    * ```
    */
  get aICostUsageAggregate(): Prisma.AICostUsageAggregateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aICostAlert`: Exposes CRUD operations for the **AICostAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AICostAlerts
    * const aICostAlerts = await prisma.aICostAlert.findMany()
    * ```
    */
  get aICostAlert(): Prisma.AICostAlertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aICostBudget`: Exposes CRUD operations for the **AICostBudget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AICostBudgets
    * const aICostBudgets = await prisma.aICostBudget.findMany()
    * ```
    */
  get aICostBudget(): Prisma.AICostBudgetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aICostUsageEvent`: Exposes CRUD operations for the **AICostUsageEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AICostUsageEvents
    * const aICostUsageEvents = await prisma.aICostUsageEvent.findMany()
    * ```
    */
  get aICostUsageEvent(): Prisma.AICostUsageEventDelegate<ExtArgs, ClientOptions>;
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
    AICostProfile: 'AICostProfile',
    AICostUsageAggregate: 'AICostUsageAggregate',
    AICostAlert: 'AICostAlert',
    AICostBudget: 'AICostBudget',
    AICostUsageEvent: 'AICostUsageEvent'
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
      modelProps: "aICostProfile" | "aICostUsageAggregate" | "aICostAlert" | "aICostBudget" | "aICostUsageEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AICostProfile: {
        payload: Prisma.$AICostProfilePayload<ExtArgs>
        fields: Prisma.AICostProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AICostProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AICostProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>
          }
          findFirst: {
            args: Prisma.AICostProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AICostProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>
          }
          findMany: {
            args: Prisma.AICostProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>[]
          }
          create: {
            args: Prisma.AICostProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>
          }
          createMany: {
            args: Prisma.AICostProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AICostProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>[]
          }
          delete: {
            args: Prisma.AICostProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>
          }
          update: {
            args: Prisma.AICostProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>
          }
          deleteMany: {
            args: Prisma.AICostProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AICostProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AICostProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>[]
          }
          upsert: {
            args: Prisma.AICostProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostProfilePayload>
          }
          aggregate: {
            args: Prisma.AICostProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAICostProfile>
          }
          groupBy: {
            args: Prisma.AICostProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AICostProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AICostProfileCountArgs<ExtArgs>
            result: $Utils.Optional<AICostProfileCountAggregateOutputType> | number
          }
        }
      }
      AICostUsageAggregate: {
        payload: Prisma.$AICostUsageAggregatePayload<ExtArgs>
        fields: Prisma.AICostUsageAggregateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AICostUsageAggregateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AICostUsageAggregateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>
          }
          findFirst: {
            args: Prisma.AICostUsageAggregateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AICostUsageAggregateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>
          }
          findMany: {
            args: Prisma.AICostUsageAggregateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>[]
          }
          create: {
            args: Prisma.AICostUsageAggregateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>
          }
          createMany: {
            args: Prisma.AICostUsageAggregateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AICostUsageAggregateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>[]
          }
          delete: {
            args: Prisma.AICostUsageAggregateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>
          }
          update: {
            args: Prisma.AICostUsageAggregateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>
          }
          deleteMany: {
            args: Prisma.AICostUsageAggregateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AICostUsageAggregateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AICostUsageAggregateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>[]
          }
          upsert: {
            args: Prisma.AICostUsageAggregateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageAggregatePayload>
          }
          aggregate: {
            args: Prisma.AICostUsageAggregateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAICostUsageAggregate>
          }
          groupBy: {
            args: Prisma.AICostUsageAggregateGroupByArgs<ExtArgs>
            result: $Utils.Optional<AICostUsageAggregateGroupByOutputType>[]
          }
          count: {
            args: Prisma.AICostUsageAggregateCountArgs<ExtArgs>
            result: $Utils.Optional<AICostUsageAggregateCountAggregateOutputType> | number
          }
        }
      }
      AICostAlert: {
        payload: Prisma.$AICostAlertPayload<ExtArgs>
        fields: Prisma.AICostAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AICostAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AICostAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>
          }
          findFirst: {
            args: Prisma.AICostAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AICostAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>
          }
          findMany: {
            args: Prisma.AICostAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>[]
          }
          create: {
            args: Prisma.AICostAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>
          }
          createMany: {
            args: Prisma.AICostAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AICostAlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>[]
          }
          delete: {
            args: Prisma.AICostAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>
          }
          update: {
            args: Prisma.AICostAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>
          }
          deleteMany: {
            args: Prisma.AICostAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AICostAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AICostAlertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>[]
          }
          upsert: {
            args: Prisma.AICostAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostAlertPayload>
          }
          aggregate: {
            args: Prisma.AICostAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAICostAlert>
          }
          groupBy: {
            args: Prisma.AICostAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AICostAlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AICostAlertCountArgs<ExtArgs>
            result: $Utils.Optional<AICostAlertCountAggregateOutputType> | number
          }
        }
      }
      AICostBudget: {
        payload: Prisma.$AICostBudgetPayload<ExtArgs>
        fields: Prisma.AICostBudgetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AICostBudgetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AICostBudgetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>
          }
          findFirst: {
            args: Prisma.AICostBudgetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AICostBudgetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>
          }
          findMany: {
            args: Prisma.AICostBudgetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>[]
          }
          create: {
            args: Prisma.AICostBudgetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>
          }
          createMany: {
            args: Prisma.AICostBudgetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AICostBudgetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>[]
          }
          delete: {
            args: Prisma.AICostBudgetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>
          }
          update: {
            args: Prisma.AICostBudgetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>
          }
          deleteMany: {
            args: Prisma.AICostBudgetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AICostBudgetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AICostBudgetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>[]
          }
          upsert: {
            args: Prisma.AICostBudgetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostBudgetPayload>
          }
          aggregate: {
            args: Prisma.AICostBudgetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAICostBudget>
          }
          groupBy: {
            args: Prisma.AICostBudgetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AICostBudgetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AICostBudgetCountArgs<ExtArgs>
            result: $Utils.Optional<AICostBudgetCountAggregateOutputType> | number
          }
        }
      }
      AICostUsageEvent: {
        payload: Prisma.$AICostUsageEventPayload<ExtArgs>
        fields: Prisma.AICostUsageEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AICostUsageEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AICostUsageEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>
          }
          findFirst: {
            args: Prisma.AICostUsageEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AICostUsageEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>
          }
          findMany: {
            args: Prisma.AICostUsageEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>[]
          }
          create: {
            args: Prisma.AICostUsageEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>
          }
          createMany: {
            args: Prisma.AICostUsageEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AICostUsageEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>[]
          }
          delete: {
            args: Prisma.AICostUsageEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>
          }
          update: {
            args: Prisma.AICostUsageEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>
          }
          deleteMany: {
            args: Prisma.AICostUsageEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AICostUsageEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AICostUsageEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>[]
          }
          upsert: {
            args: Prisma.AICostUsageEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AICostUsageEventPayload>
          }
          aggregate: {
            args: Prisma.AICostUsageEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAICostUsageEvent>
          }
          groupBy: {
            args: Prisma.AICostUsageEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AICostUsageEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AICostUsageEventCountArgs<ExtArgs>
            result: $Utils.Optional<AICostUsageEventCountAggregateOutputType> | number
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
    aICostProfile?: AICostProfileOmit
    aICostUsageAggregate?: AICostUsageAggregateOmit
    aICostAlert?: AICostAlertOmit
    aICostBudget?: AICostBudgetOmit
    aICostUsageEvent?: AICostUsageEventOmit
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
   * Model AICostProfile
   */

  export type AggregateAICostProfile = {
    _count: AICostProfileCountAggregateOutputType | null
    _min: AICostProfileMinAggregateOutputType | null
    _max: AICostProfileMaxAggregateOutputType | null
  }

  export type AICostProfileMinAggregateOutputType = {
    id: string | null
    modelId: string | null
    provider: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AICostProfileMaxAggregateOutputType = {
    id: string | null
    modelId: string | null
    provider: string | null
    effectiveFrom: Date | null
    effectiveTo: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AICostProfileCountAggregateOutputType = {
    id: number
    modelId: number
    provider: number
    pricing: number
    effectiveFrom: number
    effectiveTo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AICostProfileMinAggregateInputType = {
    id?: true
    modelId?: true
    provider?: true
    effectiveFrom?: true
    effectiveTo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AICostProfileMaxAggregateInputType = {
    id?: true
    modelId?: true
    provider?: true
    effectiveFrom?: true
    effectiveTo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AICostProfileCountAggregateInputType = {
    id?: true
    modelId?: true
    provider?: true
    pricing?: true
    effectiveFrom?: true
    effectiveTo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AICostProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostProfile to aggregate.
     */
    where?: AICostProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostProfiles to fetch.
     */
    orderBy?: AICostProfileOrderByWithRelationInput | AICostProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AICostProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AICostProfiles
    **/
    _count?: true | AICostProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AICostProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AICostProfileMaxAggregateInputType
  }

  export type GetAICostProfileAggregateType<T extends AICostProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateAICostProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAICostProfile[P]>
      : GetScalarType<T[P], AggregateAICostProfile[P]>
  }




  export type AICostProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AICostProfileWhereInput
    orderBy?: AICostProfileOrderByWithAggregationInput | AICostProfileOrderByWithAggregationInput[]
    by: AICostProfileScalarFieldEnum[] | AICostProfileScalarFieldEnum
    having?: AICostProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AICostProfileCountAggregateInputType | true
    _min?: AICostProfileMinAggregateInputType
    _max?: AICostProfileMaxAggregateInputType
  }

  export type AICostProfileGroupByOutputType = {
    id: string
    modelId: string
    provider: string
    pricing: JsonValue
    effectiveFrom: Date
    effectiveTo: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AICostProfileCountAggregateOutputType | null
    _min: AICostProfileMinAggregateOutputType | null
    _max: AICostProfileMaxAggregateOutputType | null
  }

  type GetAICostProfileGroupByPayload<T extends AICostProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AICostProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AICostProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AICostProfileGroupByOutputType[P]>
            : GetScalarType<T[P], AICostProfileGroupByOutputType[P]>
        }
      >
    >


  export type AICostProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    provider?: boolean
    pricing?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aICostProfile"]>

  export type AICostProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    provider?: boolean
    pricing?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aICostProfile"]>

  export type AICostProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    provider?: boolean
    pricing?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aICostProfile"]>

  export type AICostProfileSelectScalar = {
    id?: boolean
    modelId?: boolean
    provider?: boolean
    pricing?: boolean
    effectiveFrom?: boolean
    effectiveTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AICostProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "modelId" | "provider" | "pricing" | "effectiveFrom" | "effectiveTo" | "createdAt" | "updatedAt", ExtArgs["result"]["aICostProfile"]>

  export type $AICostProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AICostProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      modelId: string
      provider: string
      pricing: Prisma.JsonValue
      effectiveFrom: Date
      effectiveTo: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aICostProfile"]>
    composites: {}
  }

  type AICostProfileGetPayload<S extends boolean | null | undefined | AICostProfileDefaultArgs> = $Result.GetResult<Prisma.$AICostProfilePayload, S>

  type AICostProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AICostProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AICostProfileCountAggregateInputType | true
    }

  export interface AICostProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AICostProfile'], meta: { name: 'AICostProfile' } }
    /**
     * Find zero or one AICostProfile that matches the filter.
     * @param {AICostProfileFindUniqueArgs} args - Arguments to find a AICostProfile
     * @example
     * // Get one AICostProfile
     * const aICostProfile = await prisma.aICostProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AICostProfileFindUniqueArgs>(args: SelectSubset<T, AICostProfileFindUniqueArgs<ExtArgs>>): Prisma__AICostProfileClient<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AICostProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AICostProfileFindUniqueOrThrowArgs} args - Arguments to find a AICostProfile
     * @example
     * // Get one AICostProfile
     * const aICostProfile = await prisma.aICostProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AICostProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, AICostProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AICostProfileClient<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostProfileFindFirstArgs} args - Arguments to find a AICostProfile
     * @example
     * // Get one AICostProfile
     * const aICostProfile = await prisma.aICostProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AICostProfileFindFirstArgs>(args?: SelectSubset<T, AICostProfileFindFirstArgs<ExtArgs>>): Prisma__AICostProfileClient<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostProfileFindFirstOrThrowArgs} args - Arguments to find a AICostProfile
     * @example
     * // Get one AICostProfile
     * const aICostProfile = await prisma.aICostProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AICostProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, AICostProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AICostProfileClient<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AICostProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AICostProfiles
     * const aICostProfiles = await prisma.aICostProfile.findMany()
     * 
     * // Get first 10 AICostProfiles
     * const aICostProfiles = await prisma.aICostProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aICostProfileWithIdOnly = await prisma.aICostProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AICostProfileFindManyArgs>(args?: SelectSubset<T, AICostProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AICostProfile.
     * @param {AICostProfileCreateArgs} args - Arguments to create a AICostProfile.
     * @example
     * // Create one AICostProfile
     * const AICostProfile = await prisma.aICostProfile.create({
     *   data: {
     *     // ... data to create a AICostProfile
     *   }
     * })
     * 
     */
    create<T extends AICostProfileCreateArgs>(args: SelectSubset<T, AICostProfileCreateArgs<ExtArgs>>): Prisma__AICostProfileClient<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AICostProfiles.
     * @param {AICostProfileCreateManyArgs} args - Arguments to create many AICostProfiles.
     * @example
     * // Create many AICostProfiles
     * const aICostProfile = await prisma.aICostProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AICostProfileCreateManyArgs>(args?: SelectSubset<T, AICostProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AICostProfiles and returns the data saved in the database.
     * @param {AICostProfileCreateManyAndReturnArgs} args - Arguments to create many AICostProfiles.
     * @example
     * // Create many AICostProfiles
     * const aICostProfile = await prisma.aICostProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AICostProfiles and only return the `id`
     * const aICostProfileWithIdOnly = await prisma.aICostProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AICostProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, AICostProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AICostProfile.
     * @param {AICostProfileDeleteArgs} args - Arguments to delete one AICostProfile.
     * @example
     * // Delete one AICostProfile
     * const AICostProfile = await prisma.aICostProfile.delete({
     *   where: {
     *     // ... filter to delete one AICostProfile
     *   }
     * })
     * 
     */
    delete<T extends AICostProfileDeleteArgs>(args: SelectSubset<T, AICostProfileDeleteArgs<ExtArgs>>): Prisma__AICostProfileClient<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AICostProfile.
     * @param {AICostProfileUpdateArgs} args - Arguments to update one AICostProfile.
     * @example
     * // Update one AICostProfile
     * const aICostProfile = await prisma.aICostProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AICostProfileUpdateArgs>(args: SelectSubset<T, AICostProfileUpdateArgs<ExtArgs>>): Prisma__AICostProfileClient<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AICostProfiles.
     * @param {AICostProfileDeleteManyArgs} args - Arguments to filter AICostProfiles to delete.
     * @example
     * // Delete a few AICostProfiles
     * const { count } = await prisma.aICostProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AICostProfileDeleteManyArgs>(args?: SelectSubset<T, AICostProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AICostProfiles
     * const aICostProfile = await prisma.aICostProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AICostProfileUpdateManyArgs>(args: SelectSubset<T, AICostProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostProfiles and returns the data updated in the database.
     * @param {AICostProfileUpdateManyAndReturnArgs} args - Arguments to update many AICostProfiles.
     * @example
     * // Update many AICostProfiles
     * const aICostProfile = await prisma.aICostProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AICostProfiles and only return the `id`
     * const aICostProfileWithIdOnly = await prisma.aICostProfile.updateManyAndReturn({
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
    updateManyAndReturn<T extends AICostProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, AICostProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AICostProfile.
     * @param {AICostProfileUpsertArgs} args - Arguments to update or create a AICostProfile.
     * @example
     * // Update or create a AICostProfile
     * const aICostProfile = await prisma.aICostProfile.upsert({
     *   create: {
     *     // ... data to create a AICostProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AICostProfile we want to update
     *   }
     * })
     */
    upsert<T extends AICostProfileUpsertArgs>(args: SelectSubset<T, AICostProfileUpsertArgs<ExtArgs>>): Prisma__AICostProfileClient<$Result.GetResult<Prisma.$AICostProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AICostProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostProfileCountArgs} args - Arguments to filter AICostProfiles to count.
     * @example
     * // Count the number of AICostProfiles
     * const count = await prisma.aICostProfile.count({
     *   where: {
     *     // ... the filter for the AICostProfiles we want to count
     *   }
     * })
    **/
    count<T extends AICostProfileCountArgs>(
      args?: Subset<T, AICostProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AICostProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AICostProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AICostProfileAggregateArgs>(args: Subset<T, AICostProfileAggregateArgs>): Prisma.PrismaPromise<GetAICostProfileAggregateType<T>>

    /**
     * Group by AICostProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostProfileGroupByArgs} args - Group by arguments.
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
      T extends AICostProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AICostProfileGroupByArgs['orderBy'] }
        : { orderBy?: AICostProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AICostProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAICostProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AICostProfile model
   */
  readonly fields: AICostProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AICostProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AICostProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AICostProfile model
   */
  interface AICostProfileFieldRefs {
    readonly id: FieldRef<"AICostProfile", 'String'>
    readonly modelId: FieldRef<"AICostProfile", 'String'>
    readonly provider: FieldRef<"AICostProfile", 'String'>
    readonly pricing: FieldRef<"AICostProfile", 'Json'>
    readonly effectiveFrom: FieldRef<"AICostProfile", 'DateTime'>
    readonly effectiveTo: FieldRef<"AICostProfile", 'DateTime'>
    readonly createdAt: FieldRef<"AICostProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"AICostProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AICostProfile findUnique
   */
  export type AICostProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * Filter, which AICostProfile to fetch.
     */
    where: AICostProfileWhereUniqueInput
  }

  /**
   * AICostProfile findUniqueOrThrow
   */
  export type AICostProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * Filter, which AICostProfile to fetch.
     */
    where: AICostProfileWhereUniqueInput
  }

  /**
   * AICostProfile findFirst
   */
  export type AICostProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * Filter, which AICostProfile to fetch.
     */
    where?: AICostProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostProfiles to fetch.
     */
    orderBy?: AICostProfileOrderByWithRelationInput | AICostProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostProfiles.
     */
    cursor?: AICostProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostProfiles.
     */
    distinct?: AICostProfileScalarFieldEnum | AICostProfileScalarFieldEnum[]
  }

  /**
   * AICostProfile findFirstOrThrow
   */
  export type AICostProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * Filter, which AICostProfile to fetch.
     */
    where?: AICostProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostProfiles to fetch.
     */
    orderBy?: AICostProfileOrderByWithRelationInput | AICostProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostProfiles.
     */
    cursor?: AICostProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostProfiles.
     */
    distinct?: AICostProfileScalarFieldEnum | AICostProfileScalarFieldEnum[]
  }

  /**
   * AICostProfile findMany
   */
  export type AICostProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * Filter, which AICostProfiles to fetch.
     */
    where?: AICostProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostProfiles to fetch.
     */
    orderBy?: AICostProfileOrderByWithRelationInput | AICostProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AICostProfiles.
     */
    cursor?: AICostProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostProfiles.
     */
    skip?: number
    distinct?: AICostProfileScalarFieldEnum | AICostProfileScalarFieldEnum[]
  }

  /**
   * AICostProfile create
   */
  export type AICostProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * The data needed to create a AICostProfile.
     */
    data: XOR<AICostProfileCreateInput, AICostProfileUncheckedCreateInput>
  }

  /**
   * AICostProfile createMany
   */
  export type AICostProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AICostProfiles.
     */
    data: AICostProfileCreateManyInput | AICostProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostProfile createManyAndReturn
   */
  export type AICostProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * The data used to create many AICostProfiles.
     */
    data: AICostProfileCreateManyInput | AICostProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostProfile update
   */
  export type AICostProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * The data needed to update a AICostProfile.
     */
    data: XOR<AICostProfileUpdateInput, AICostProfileUncheckedUpdateInput>
    /**
     * Choose, which AICostProfile to update.
     */
    where: AICostProfileWhereUniqueInput
  }

  /**
   * AICostProfile updateMany
   */
  export type AICostProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AICostProfiles.
     */
    data: XOR<AICostProfileUpdateManyMutationInput, AICostProfileUncheckedUpdateManyInput>
    /**
     * Filter which AICostProfiles to update
     */
    where?: AICostProfileWhereInput
    /**
     * Limit how many AICostProfiles to update.
     */
    limit?: number
  }

  /**
   * AICostProfile updateManyAndReturn
   */
  export type AICostProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * The data used to update AICostProfiles.
     */
    data: XOR<AICostProfileUpdateManyMutationInput, AICostProfileUncheckedUpdateManyInput>
    /**
     * Filter which AICostProfiles to update
     */
    where?: AICostProfileWhereInput
    /**
     * Limit how many AICostProfiles to update.
     */
    limit?: number
  }

  /**
   * AICostProfile upsert
   */
  export type AICostProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * The filter to search for the AICostProfile to update in case it exists.
     */
    where: AICostProfileWhereUniqueInput
    /**
     * In case the AICostProfile found by the `where` argument doesn't exist, create a new AICostProfile with this data.
     */
    create: XOR<AICostProfileCreateInput, AICostProfileUncheckedCreateInput>
    /**
     * In case the AICostProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AICostProfileUpdateInput, AICostProfileUncheckedUpdateInput>
  }

  /**
   * AICostProfile delete
   */
  export type AICostProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
    /**
     * Filter which AICostProfile to delete.
     */
    where: AICostProfileWhereUniqueInput
  }

  /**
   * AICostProfile deleteMany
   */
  export type AICostProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostProfiles to delete
     */
    where?: AICostProfileWhereInput
    /**
     * Limit how many AICostProfiles to delete.
     */
    limit?: number
  }

  /**
   * AICostProfile without action
   */
  export type AICostProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostProfile
     */
    select?: AICostProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostProfile
     */
    omit?: AICostProfileOmit<ExtArgs> | null
  }


  /**
   * Model AICostUsageAggregate
   */

  export type AggregateAICostUsageAggregate = {
    _count: AICostUsageAggregateCountAggregateOutputType | null
    _avg: AICostUsageAggregateAvgAggregateOutputType | null
    _sum: AICostUsageAggregateSumAggregateOutputType | null
    _min: AICostUsageAggregateMinAggregateOutputType | null
    _max: AICostUsageAggregateMaxAggregateOutputType | null
  }

  export type AICostUsageAggregateAvgAggregateOutputType = {
    totalTokensPrompt: number | null
    totalTokensCompletion: number | null
    totalCost: number | null
  }

  export type AICostUsageAggregateSumAggregateOutputType = {
    totalTokensPrompt: number | null
    totalTokensCompletion: number | null
    totalCost: number | null
  }

  export type AICostUsageAggregateMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    period: string | null
    periodStart: Date | null
    periodEnd: Date | null
    totalTokensPrompt: number | null
    totalTokensCompletion: number | null
    totalCost: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AICostUsageAggregateMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    period: string | null
    periodStart: Date | null
    periodEnd: Date | null
    totalTokensPrompt: number | null
    totalTokensCompletion: number | null
    totalCost: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AICostUsageAggregateCountAggregateOutputType = {
    id: number
    tenantId: number
    period: number
    periodStart: number
    periodEnd: number
    totalTokensPrompt: number
    totalTokensCompletion: number
    totalCost: number
    breakdownByModel: number
    breakdownByFeature: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AICostUsageAggregateAvgAggregateInputType = {
    totalTokensPrompt?: true
    totalTokensCompletion?: true
    totalCost?: true
  }

  export type AICostUsageAggregateSumAggregateInputType = {
    totalTokensPrompt?: true
    totalTokensCompletion?: true
    totalCost?: true
  }

  export type AICostUsageAggregateMinAggregateInputType = {
    id?: true
    tenantId?: true
    period?: true
    periodStart?: true
    periodEnd?: true
    totalTokensPrompt?: true
    totalTokensCompletion?: true
    totalCost?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AICostUsageAggregateMaxAggregateInputType = {
    id?: true
    tenantId?: true
    period?: true
    periodStart?: true
    periodEnd?: true
    totalTokensPrompt?: true
    totalTokensCompletion?: true
    totalCost?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AICostUsageAggregateCountAggregateInputType = {
    id?: true
    tenantId?: true
    period?: true
    periodStart?: true
    periodEnd?: true
    totalTokensPrompt?: true
    totalTokensCompletion?: true
    totalCost?: true
    breakdownByModel?: true
    breakdownByFeature?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AICostUsageAggregateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostUsageAggregate to aggregate.
     */
    where?: AICostUsageAggregateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostUsageAggregates to fetch.
     */
    orderBy?: AICostUsageAggregateOrderByWithRelationInput | AICostUsageAggregateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AICostUsageAggregateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostUsageAggregates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostUsageAggregates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AICostUsageAggregates
    **/
    _count?: true | AICostUsageAggregateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AICostUsageAggregateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AICostUsageAggregateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AICostUsageAggregateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AICostUsageAggregateMaxAggregateInputType
  }

  export type GetAICostUsageAggregateAggregateType<T extends AICostUsageAggregateAggregateArgs> = {
        [P in keyof T & keyof AggregateAICostUsageAggregate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAICostUsageAggregate[P]>
      : GetScalarType<T[P], AggregateAICostUsageAggregate[P]>
  }




  export type AICostUsageAggregateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AICostUsageAggregateWhereInput
    orderBy?: AICostUsageAggregateOrderByWithAggregationInput | AICostUsageAggregateOrderByWithAggregationInput[]
    by: AICostUsageAggregateScalarFieldEnum[] | AICostUsageAggregateScalarFieldEnum
    having?: AICostUsageAggregateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AICostUsageAggregateCountAggregateInputType | true
    _avg?: AICostUsageAggregateAvgAggregateInputType
    _sum?: AICostUsageAggregateSumAggregateInputType
    _min?: AICostUsageAggregateMinAggregateInputType
    _max?: AICostUsageAggregateMaxAggregateInputType
  }

  export type AICostUsageAggregateGroupByOutputType = {
    id: string
    tenantId: string
    period: string
    periodStart: Date
    periodEnd: Date
    totalTokensPrompt: number
    totalTokensCompletion: number
    totalCost: number
    breakdownByModel: JsonValue
    breakdownByFeature: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: AICostUsageAggregateCountAggregateOutputType | null
    _avg: AICostUsageAggregateAvgAggregateOutputType | null
    _sum: AICostUsageAggregateSumAggregateOutputType | null
    _min: AICostUsageAggregateMinAggregateOutputType | null
    _max: AICostUsageAggregateMaxAggregateOutputType | null
  }

  type GetAICostUsageAggregateGroupByPayload<T extends AICostUsageAggregateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AICostUsageAggregateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AICostUsageAggregateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AICostUsageAggregateGroupByOutputType[P]>
            : GetScalarType<T[P], AICostUsageAggregateGroupByOutputType[P]>
        }
      >
    >


  export type AICostUsageAggregateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    period?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    totalTokensPrompt?: boolean
    totalTokensCompletion?: boolean
    totalCost?: boolean
    breakdownByModel?: boolean
    breakdownByFeature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aICostUsageAggregate"]>

  export type AICostUsageAggregateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    period?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    totalTokensPrompt?: boolean
    totalTokensCompletion?: boolean
    totalCost?: boolean
    breakdownByModel?: boolean
    breakdownByFeature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aICostUsageAggregate"]>

  export type AICostUsageAggregateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    period?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    totalTokensPrompt?: boolean
    totalTokensCompletion?: boolean
    totalCost?: boolean
    breakdownByModel?: boolean
    breakdownByFeature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aICostUsageAggregate"]>

  export type AICostUsageAggregateSelectScalar = {
    id?: boolean
    tenantId?: boolean
    period?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    totalTokensPrompt?: boolean
    totalTokensCompletion?: boolean
    totalCost?: boolean
    breakdownByModel?: boolean
    breakdownByFeature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AICostUsageAggregateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "period" | "periodStart" | "periodEnd" | "totalTokensPrompt" | "totalTokensCompletion" | "totalCost" | "breakdownByModel" | "breakdownByFeature" | "createdAt" | "updatedAt", ExtArgs["result"]["aICostUsageAggregate"]>

  export type $AICostUsageAggregatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AICostUsageAggregate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      period: string
      periodStart: Date
      periodEnd: Date
      totalTokensPrompt: number
      totalTokensCompletion: number
      totalCost: number
      breakdownByModel: Prisma.JsonValue
      breakdownByFeature: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aICostUsageAggregate"]>
    composites: {}
  }

  type AICostUsageAggregateGetPayload<S extends boolean | null | undefined | AICostUsageAggregateDefaultArgs> = $Result.GetResult<Prisma.$AICostUsageAggregatePayload, S>

  type AICostUsageAggregateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AICostUsageAggregateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AICostUsageAggregateCountAggregateInputType | true
    }

  export interface AICostUsageAggregateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AICostUsageAggregate'], meta: { name: 'AICostUsageAggregate' } }
    /**
     * Find zero or one AICostUsageAggregate that matches the filter.
     * @param {AICostUsageAggregateFindUniqueArgs} args - Arguments to find a AICostUsageAggregate
     * @example
     * // Get one AICostUsageAggregate
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AICostUsageAggregateFindUniqueArgs>(args: SelectSubset<T, AICostUsageAggregateFindUniqueArgs<ExtArgs>>): Prisma__AICostUsageAggregateClient<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AICostUsageAggregate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AICostUsageAggregateFindUniqueOrThrowArgs} args - Arguments to find a AICostUsageAggregate
     * @example
     * // Get one AICostUsageAggregate
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AICostUsageAggregateFindUniqueOrThrowArgs>(args: SelectSubset<T, AICostUsageAggregateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AICostUsageAggregateClient<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostUsageAggregate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageAggregateFindFirstArgs} args - Arguments to find a AICostUsageAggregate
     * @example
     * // Get one AICostUsageAggregate
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AICostUsageAggregateFindFirstArgs>(args?: SelectSubset<T, AICostUsageAggregateFindFirstArgs<ExtArgs>>): Prisma__AICostUsageAggregateClient<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostUsageAggregate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageAggregateFindFirstOrThrowArgs} args - Arguments to find a AICostUsageAggregate
     * @example
     * // Get one AICostUsageAggregate
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AICostUsageAggregateFindFirstOrThrowArgs>(args?: SelectSubset<T, AICostUsageAggregateFindFirstOrThrowArgs<ExtArgs>>): Prisma__AICostUsageAggregateClient<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AICostUsageAggregates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageAggregateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AICostUsageAggregates
     * const aICostUsageAggregates = await prisma.aICostUsageAggregate.findMany()
     * 
     * // Get first 10 AICostUsageAggregates
     * const aICostUsageAggregates = await prisma.aICostUsageAggregate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aICostUsageAggregateWithIdOnly = await prisma.aICostUsageAggregate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AICostUsageAggregateFindManyArgs>(args?: SelectSubset<T, AICostUsageAggregateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AICostUsageAggregate.
     * @param {AICostUsageAggregateCreateArgs} args - Arguments to create a AICostUsageAggregate.
     * @example
     * // Create one AICostUsageAggregate
     * const AICostUsageAggregate = await prisma.aICostUsageAggregate.create({
     *   data: {
     *     // ... data to create a AICostUsageAggregate
     *   }
     * })
     * 
     */
    create<T extends AICostUsageAggregateCreateArgs>(args: SelectSubset<T, AICostUsageAggregateCreateArgs<ExtArgs>>): Prisma__AICostUsageAggregateClient<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AICostUsageAggregates.
     * @param {AICostUsageAggregateCreateManyArgs} args - Arguments to create many AICostUsageAggregates.
     * @example
     * // Create many AICostUsageAggregates
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AICostUsageAggregateCreateManyArgs>(args?: SelectSubset<T, AICostUsageAggregateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AICostUsageAggregates and returns the data saved in the database.
     * @param {AICostUsageAggregateCreateManyAndReturnArgs} args - Arguments to create many AICostUsageAggregates.
     * @example
     * // Create many AICostUsageAggregates
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AICostUsageAggregates and only return the `id`
     * const aICostUsageAggregateWithIdOnly = await prisma.aICostUsageAggregate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AICostUsageAggregateCreateManyAndReturnArgs>(args?: SelectSubset<T, AICostUsageAggregateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AICostUsageAggregate.
     * @param {AICostUsageAggregateDeleteArgs} args - Arguments to delete one AICostUsageAggregate.
     * @example
     * // Delete one AICostUsageAggregate
     * const AICostUsageAggregate = await prisma.aICostUsageAggregate.delete({
     *   where: {
     *     // ... filter to delete one AICostUsageAggregate
     *   }
     * })
     * 
     */
    delete<T extends AICostUsageAggregateDeleteArgs>(args: SelectSubset<T, AICostUsageAggregateDeleteArgs<ExtArgs>>): Prisma__AICostUsageAggregateClient<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AICostUsageAggregate.
     * @param {AICostUsageAggregateUpdateArgs} args - Arguments to update one AICostUsageAggregate.
     * @example
     * // Update one AICostUsageAggregate
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AICostUsageAggregateUpdateArgs>(args: SelectSubset<T, AICostUsageAggregateUpdateArgs<ExtArgs>>): Prisma__AICostUsageAggregateClient<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AICostUsageAggregates.
     * @param {AICostUsageAggregateDeleteManyArgs} args - Arguments to filter AICostUsageAggregates to delete.
     * @example
     * // Delete a few AICostUsageAggregates
     * const { count } = await prisma.aICostUsageAggregate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AICostUsageAggregateDeleteManyArgs>(args?: SelectSubset<T, AICostUsageAggregateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostUsageAggregates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageAggregateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AICostUsageAggregates
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AICostUsageAggregateUpdateManyArgs>(args: SelectSubset<T, AICostUsageAggregateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostUsageAggregates and returns the data updated in the database.
     * @param {AICostUsageAggregateUpdateManyAndReturnArgs} args - Arguments to update many AICostUsageAggregates.
     * @example
     * // Update many AICostUsageAggregates
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AICostUsageAggregates and only return the `id`
     * const aICostUsageAggregateWithIdOnly = await prisma.aICostUsageAggregate.updateManyAndReturn({
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
    updateManyAndReturn<T extends AICostUsageAggregateUpdateManyAndReturnArgs>(args: SelectSubset<T, AICostUsageAggregateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AICostUsageAggregate.
     * @param {AICostUsageAggregateUpsertArgs} args - Arguments to update or create a AICostUsageAggregate.
     * @example
     * // Update or create a AICostUsageAggregate
     * const aICostUsageAggregate = await prisma.aICostUsageAggregate.upsert({
     *   create: {
     *     // ... data to create a AICostUsageAggregate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AICostUsageAggregate we want to update
     *   }
     * })
     */
    upsert<T extends AICostUsageAggregateUpsertArgs>(args: SelectSubset<T, AICostUsageAggregateUpsertArgs<ExtArgs>>): Prisma__AICostUsageAggregateClient<$Result.GetResult<Prisma.$AICostUsageAggregatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AICostUsageAggregates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageAggregateCountArgs} args - Arguments to filter AICostUsageAggregates to count.
     * @example
     * // Count the number of AICostUsageAggregates
     * const count = await prisma.aICostUsageAggregate.count({
     *   where: {
     *     // ... the filter for the AICostUsageAggregates we want to count
     *   }
     * })
    **/
    count<T extends AICostUsageAggregateCountArgs>(
      args?: Subset<T, AICostUsageAggregateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AICostUsageAggregateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AICostUsageAggregate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageAggregateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AICostUsageAggregateAggregateArgs>(args: Subset<T, AICostUsageAggregateAggregateArgs>): Prisma.PrismaPromise<GetAICostUsageAggregateAggregateType<T>>

    /**
     * Group by AICostUsageAggregate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageAggregateGroupByArgs} args - Group by arguments.
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
      T extends AICostUsageAggregateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AICostUsageAggregateGroupByArgs['orderBy'] }
        : { orderBy?: AICostUsageAggregateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AICostUsageAggregateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAICostUsageAggregateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AICostUsageAggregate model
   */
  readonly fields: AICostUsageAggregateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AICostUsageAggregate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AICostUsageAggregateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AICostUsageAggregate model
   */
  interface AICostUsageAggregateFieldRefs {
    readonly id: FieldRef<"AICostUsageAggregate", 'String'>
    readonly tenantId: FieldRef<"AICostUsageAggregate", 'String'>
    readonly period: FieldRef<"AICostUsageAggregate", 'String'>
    readonly periodStart: FieldRef<"AICostUsageAggregate", 'DateTime'>
    readonly periodEnd: FieldRef<"AICostUsageAggregate", 'DateTime'>
    readonly totalTokensPrompt: FieldRef<"AICostUsageAggregate", 'Int'>
    readonly totalTokensCompletion: FieldRef<"AICostUsageAggregate", 'Int'>
    readonly totalCost: FieldRef<"AICostUsageAggregate", 'Float'>
    readonly breakdownByModel: FieldRef<"AICostUsageAggregate", 'Json'>
    readonly breakdownByFeature: FieldRef<"AICostUsageAggregate", 'Json'>
    readonly createdAt: FieldRef<"AICostUsageAggregate", 'DateTime'>
    readonly updatedAt: FieldRef<"AICostUsageAggregate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AICostUsageAggregate findUnique
   */
  export type AICostUsageAggregateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageAggregate to fetch.
     */
    where: AICostUsageAggregateWhereUniqueInput
  }

  /**
   * AICostUsageAggregate findUniqueOrThrow
   */
  export type AICostUsageAggregateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageAggregate to fetch.
     */
    where: AICostUsageAggregateWhereUniqueInput
  }

  /**
   * AICostUsageAggregate findFirst
   */
  export type AICostUsageAggregateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageAggregate to fetch.
     */
    where?: AICostUsageAggregateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostUsageAggregates to fetch.
     */
    orderBy?: AICostUsageAggregateOrderByWithRelationInput | AICostUsageAggregateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostUsageAggregates.
     */
    cursor?: AICostUsageAggregateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostUsageAggregates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostUsageAggregates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostUsageAggregates.
     */
    distinct?: AICostUsageAggregateScalarFieldEnum | AICostUsageAggregateScalarFieldEnum[]
  }

  /**
   * AICostUsageAggregate findFirstOrThrow
   */
  export type AICostUsageAggregateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageAggregate to fetch.
     */
    where?: AICostUsageAggregateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostUsageAggregates to fetch.
     */
    orderBy?: AICostUsageAggregateOrderByWithRelationInput | AICostUsageAggregateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostUsageAggregates.
     */
    cursor?: AICostUsageAggregateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostUsageAggregates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostUsageAggregates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostUsageAggregates.
     */
    distinct?: AICostUsageAggregateScalarFieldEnum | AICostUsageAggregateScalarFieldEnum[]
  }

  /**
   * AICostUsageAggregate findMany
   */
  export type AICostUsageAggregateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageAggregates to fetch.
     */
    where?: AICostUsageAggregateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostUsageAggregates to fetch.
     */
    orderBy?: AICostUsageAggregateOrderByWithRelationInput | AICostUsageAggregateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AICostUsageAggregates.
     */
    cursor?: AICostUsageAggregateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostUsageAggregates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostUsageAggregates.
     */
    skip?: number
    distinct?: AICostUsageAggregateScalarFieldEnum | AICostUsageAggregateScalarFieldEnum[]
  }

  /**
   * AICostUsageAggregate create
   */
  export type AICostUsageAggregateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * The data needed to create a AICostUsageAggregate.
     */
    data: XOR<AICostUsageAggregateCreateInput, AICostUsageAggregateUncheckedCreateInput>
  }

  /**
   * AICostUsageAggregate createMany
   */
  export type AICostUsageAggregateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AICostUsageAggregates.
     */
    data: AICostUsageAggregateCreateManyInput | AICostUsageAggregateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostUsageAggregate createManyAndReturn
   */
  export type AICostUsageAggregateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * The data used to create many AICostUsageAggregates.
     */
    data: AICostUsageAggregateCreateManyInput | AICostUsageAggregateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostUsageAggregate update
   */
  export type AICostUsageAggregateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * The data needed to update a AICostUsageAggregate.
     */
    data: XOR<AICostUsageAggregateUpdateInput, AICostUsageAggregateUncheckedUpdateInput>
    /**
     * Choose, which AICostUsageAggregate to update.
     */
    where: AICostUsageAggregateWhereUniqueInput
  }

  /**
   * AICostUsageAggregate updateMany
   */
  export type AICostUsageAggregateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AICostUsageAggregates.
     */
    data: XOR<AICostUsageAggregateUpdateManyMutationInput, AICostUsageAggregateUncheckedUpdateManyInput>
    /**
     * Filter which AICostUsageAggregates to update
     */
    where?: AICostUsageAggregateWhereInput
    /**
     * Limit how many AICostUsageAggregates to update.
     */
    limit?: number
  }

  /**
   * AICostUsageAggregate updateManyAndReturn
   */
  export type AICostUsageAggregateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * The data used to update AICostUsageAggregates.
     */
    data: XOR<AICostUsageAggregateUpdateManyMutationInput, AICostUsageAggregateUncheckedUpdateManyInput>
    /**
     * Filter which AICostUsageAggregates to update
     */
    where?: AICostUsageAggregateWhereInput
    /**
     * Limit how many AICostUsageAggregates to update.
     */
    limit?: number
  }

  /**
   * AICostUsageAggregate upsert
   */
  export type AICostUsageAggregateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * The filter to search for the AICostUsageAggregate to update in case it exists.
     */
    where: AICostUsageAggregateWhereUniqueInput
    /**
     * In case the AICostUsageAggregate found by the `where` argument doesn't exist, create a new AICostUsageAggregate with this data.
     */
    create: XOR<AICostUsageAggregateCreateInput, AICostUsageAggregateUncheckedCreateInput>
    /**
     * In case the AICostUsageAggregate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AICostUsageAggregateUpdateInput, AICostUsageAggregateUncheckedUpdateInput>
  }

  /**
   * AICostUsageAggregate delete
   */
  export type AICostUsageAggregateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
    /**
     * Filter which AICostUsageAggregate to delete.
     */
    where: AICostUsageAggregateWhereUniqueInput
  }

  /**
   * AICostUsageAggregate deleteMany
   */
  export type AICostUsageAggregateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostUsageAggregates to delete
     */
    where?: AICostUsageAggregateWhereInput
    /**
     * Limit how many AICostUsageAggregates to delete.
     */
    limit?: number
  }

  /**
   * AICostUsageAggregate without action
   */
  export type AICostUsageAggregateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageAggregate
     */
    select?: AICostUsageAggregateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageAggregate
     */
    omit?: AICostUsageAggregateOmit<ExtArgs> | null
  }


  /**
   * Model AICostAlert
   */

  export type AggregateAICostAlert = {
    _count: AICostAlertCountAggregateOutputType | null
    _min: AICostAlertMinAggregateOutputType | null
    _max: AICostAlertMaxAggregateOutputType | null
  }

  export type AICostAlertMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    type: string | null
    severity: string | null
    message: string | null
    createdAt: Date | null
    resolvedAt: Date | null
  }

  export type AICostAlertMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    type: string | null
    severity: string | null
    message: string | null
    createdAt: Date | null
    resolvedAt: Date | null
  }

  export type AICostAlertCountAggregateOutputType = {
    id: number
    tenantId: number
    type: number
    severity: number
    message: number
    metadata: number
    createdAt: number
    resolvedAt: number
    _all: number
  }


  export type AICostAlertMinAggregateInputType = {
    id?: true
    tenantId?: true
    type?: true
    severity?: true
    message?: true
    createdAt?: true
    resolvedAt?: true
  }

  export type AICostAlertMaxAggregateInputType = {
    id?: true
    tenantId?: true
    type?: true
    severity?: true
    message?: true
    createdAt?: true
    resolvedAt?: true
  }

  export type AICostAlertCountAggregateInputType = {
    id?: true
    tenantId?: true
    type?: true
    severity?: true
    message?: true
    metadata?: true
    createdAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type AICostAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostAlert to aggregate.
     */
    where?: AICostAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostAlerts to fetch.
     */
    orderBy?: AICostAlertOrderByWithRelationInput | AICostAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AICostAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AICostAlerts
    **/
    _count?: true | AICostAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AICostAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AICostAlertMaxAggregateInputType
  }

  export type GetAICostAlertAggregateType<T extends AICostAlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAICostAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAICostAlert[P]>
      : GetScalarType<T[P], AggregateAICostAlert[P]>
  }




  export type AICostAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AICostAlertWhereInput
    orderBy?: AICostAlertOrderByWithAggregationInput | AICostAlertOrderByWithAggregationInput[]
    by: AICostAlertScalarFieldEnum[] | AICostAlertScalarFieldEnum
    having?: AICostAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AICostAlertCountAggregateInputType | true
    _min?: AICostAlertMinAggregateInputType
    _max?: AICostAlertMaxAggregateInputType
  }

  export type AICostAlertGroupByOutputType = {
    id: string
    tenantId: string
    type: string
    severity: string
    message: string
    metadata: JsonValue
    createdAt: Date
    resolvedAt: Date | null
    _count: AICostAlertCountAggregateOutputType | null
    _min: AICostAlertMinAggregateOutputType | null
    _max: AICostAlertMaxAggregateOutputType | null
  }

  type GetAICostAlertGroupByPayload<T extends AICostAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AICostAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AICostAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AICostAlertGroupByOutputType[P]>
            : GetScalarType<T[P], AICostAlertGroupByOutputType[P]>
        }
      >
    >


  export type AICostAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aICostAlert"]>

  export type AICostAlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aICostAlert"]>

  export type AICostAlertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }, ExtArgs["result"]["aICostAlert"]>

  export type AICostAlertSelectScalar = {
    id?: boolean
    tenantId?: boolean
    type?: boolean
    severity?: boolean
    message?: boolean
    metadata?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }

  export type AICostAlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "type" | "severity" | "message" | "metadata" | "createdAt" | "resolvedAt", ExtArgs["result"]["aICostAlert"]>

  export type $AICostAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AICostAlert"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      type: string
      severity: string
      message: string
      metadata: Prisma.JsonValue
      createdAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["aICostAlert"]>
    composites: {}
  }

  type AICostAlertGetPayload<S extends boolean | null | undefined | AICostAlertDefaultArgs> = $Result.GetResult<Prisma.$AICostAlertPayload, S>

  type AICostAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AICostAlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AICostAlertCountAggregateInputType | true
    }

  export interface AICostAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AICostAlert'], meta: { name: 'AICostAlert' } }
    /**
     * Find zero or one AICostAlert that matches the filter.
     * @param {AICostAlertFindUniqueArgs} args - Arguments to find a AICostAlert
     * @example
     * // Get one AICostAlert
     * const aICostAlert = await prisma.aICostAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AICostAlertFindUniqueArgs>(args: SelectSubset<T, AICostAlertFindUniqueArgs<ExtArgs>>): Prisma__AICostAlertClient<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AICostAlert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AICostAlertFindUniqueOrThrowArgs} args - Arguments to find a AICostAlert
     * @example
     * // Get one AICostAlert
     * const aICostAlert = await prisma.aICostAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AICostAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AICostAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AICostAlertClient<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostAlertFindFirstArgs} args - Arguments to find a AICostAlert
     * @example
     * // Get one AICostAlert
     * const aICostAlert = await prisma.aICostAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AICostAlertFindFirstArgs>(args?: SelectSubset<T, AICostAlertFindFirstArgs<ExtArgs>>): Prisma__AICostAlertClient<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostAlertFindFirstOrThrowArgs} args - Arguments to find a AICostAlert
     * @example
     * // Get one AICostAlert
     * const aICostAlert = await prisma.aICostAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AICostAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AICostAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AICostAlertClient<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AICostAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AICostAlerts
     * const aICostAlerts = await prisma.aICostAlert.findMany()
     * 
     * // Get first 10 AICostAlerts
     * const aICostAlerts = await prisma.aICostAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aICostAlertWithIdOnly = await prisma.aICostAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AICostAlertFindManyArgs>(args?: SelectSubset<T, AICostAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AICostAlert.
     * @param {AICostAlertCreateArgs} args - Arguments to create a AICostAlert.
     * @example
     * // Create one AICostAlert
     * const AICostAlert = await prisma.aICostAlert.create({
     *   data: {
     *     // ... data to create a AICostAlert
     *   }
     * })
     * 
     */
    create<T extends AICostAlertCreateArgs>(args: SelectSubset<T, AICostAlertCreateArgs<ExtArgs>>): Prisma__AICostAlertClient<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AICostAlerts.
     * @param {AICostAlertCreateManyArgs} args - Arguments to create many AICostAlerts.
     * @example
     * // Create many AICostAlerts
     * const aICostAlert = await prisma.aICostAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AICostAlertCreateManyArgs>(args?: SelectSubset<T, AICostAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AICostAlerts and returns the data saved in the database.
     * @param {AICostAlertCreateManyAndReturnArgs} args - Arguments to create many AICostAlerts.
     * @example
     * // Create many AICostAlerts
     * const aICostAlert = await prisma.aICostAlert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AICostAlerts and only return the `id`
     * const aICostAlertWithIdOnly = await prisma.aICostAlert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AICostAlertCreateManyAndReturnArgs>(args?: SelectSubset<T, AICostAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AICostAlert.
     * @param {AICostAlertDeleteArgs} args - Arguments to delete one AICostAlert.
     * @example
     * // Delete one AICostAlert
     * const AICostAlert = await prisma.aICostAlert.delete({
     *   where: {
     *     // ... filter to delete one AICostAlert
     *   }
     * })
     * 
     */
    delete<T extends AICostAlertDeleteArgs>(args: SelectSubset<T, AICostAlertDeleteArgs<ExtArgs>>): Prisma__AICostAlertClient<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AICostAlert.
     * @param {AICostAlertUpdateArgs} args - Arguments to update one AICostAlert.
     * @example
     * // Update one AICostAlert
     * const aICostAlert = await prisma.aICostAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AICostAlertUpdateArgs>(args: SelectSubset<T, AICostAlertUpdateArgs<ExtArgs>>): Prisma__AICostAlertClient<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AICostAlerts.
     * @param {AICostAlertDeleteManyArgs} args - Arguments to filter AICostAlerts to delete.
     * @example
     * // Delete a few AICostAlerts
     * const { count } = await prisma.aICostAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AICostAlertDeleteManyArgs>(args?: SelectSubset<T, AICostAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AICostAlerts
     * const aICostAlert = await prisma.aICostAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AICostAlertUpdateManyArgs>(args: SelectSubset<T, AICostAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostAlerts and returns the data updated in the database.
     * @param {AICostAlertUpdateManyAndReturnArgs} args - Arguments to update many AICostAlerts.
     * @example
     * // Update many AICostAlerts
     * const aICostAlert = await prisma.aICostAlert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AICostAlerts and only return the `id`
     * const aICostAlertWithIdOnly = await prisma.aICostAlert.updateManyAndReturn({
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
    updateManyAndReturn<T extends AICostAlertUpdateManyAndReturnArgs>(args: SelectSubset<T, AICostAlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AICostAlert.
     * @param {AICostAlertUpsertArgs} args - Arguments to update or create a AICostAlert.
     * @example
     * // Update or create a AICostAlert
     * const aICostAlert = await prisma.aICostAlert.upsert({
     *   create: {
     *     // ... data to create a AICostAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AICostAlert we want to update
     *   }
     * })
     */
    upsert<T extends AICostAlertUpsertArgs>(args: SelectSubset<T, AICostAlertUpsertArgs<ExtArgs>>): Prisma__AICostAlertClient<$Result.GetResult<Prisma.$AICostAlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AICostAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostAlertCountArgs} args - Arguments to filter AICostAlerts to count.
     * @example
     * // Count the number of AICostAlerts
     * const count = await prisma.aICostAlert.count({
     *   where: {
     *     // ... the filter for the AICostAlerts we want to count
     *   }
     * })
    **/
    count<T extends AICostAlertCountArgs>(
      args?: Subset<T, AICostAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AICostAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AICostAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AICostAlertAggregateArgs>(args: Subset<T, AICostAlertAggregateArgs>): Prisma.PrismaPromise<GetAICostAlertAggregateType<T>>

    /**
     * Group by AICostAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostAlertGroupByArgs} args - Group by arguments.
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
      T extends AICostAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AICostAlertGroupByArgs['orderBy'] }
        : { orderBy?: AICostAlertGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AICostAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAICostAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AICostAlert model
   */
  readonly fields: AICostAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AICostAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AICostAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AICostAlert model
   */
  interface AICostAlertFieldRefs {
    readonly id: FieldRef<"AICostAlert", 'String'>
    readonly tenantId: FieldRef<"AICostAlert", 'String'>
    readonly type: FieldRef<"AICostAlert", 'String'>
    readonly severity: FieldRef<"AICostAlert", 'String'>
    readonly message: FieldRef<"AICostAlert", 'String'>
    readonly metadata: FieldRef<"AICostAlert", 'Json'>
    readonly createdAt: FieldRef<"AICostAlert", 'DateTime'>
    readonly resolvedAt: FieldRef<"AICostAlert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AICostAlert findUnique
   */
  export type AICostAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * Filter, which AICostAlert to fetch.
     */
    where: AICostAlertWhereUniqueInput
  }

  /**
   * AICostAlert findUniqueOrThrow
   */
  export type AICostAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * Filter, which AICostAlert to fetch.
     */
    where: AICostAlertWhereUniqueInput
  }

  /**
   * AICostAlert findFirst
   */
  export type AICostAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * Filter, which AICostAlert to fetch.
     */
    where?: AICostAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostAlerts to fetch.
     */
    orderBy?: AICostAlertOrderByWithRelationInput | AICostAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostAlerts.
     */
    cursor?: AICostAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostAlerts.
     */
    distinct?: AICostAlertScalarFieldEnum | AICostAlertScalarFieldEnum[]
  }

  /**
   * AICostAlert findFirstOrThrow
   */
  export type AICostAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * Filter, which AICostAlert to fetch.
     */
    where?: AICostAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostAlerts to fetch.
     */
    orderBy?: AICostAlertOrderByWithRelationInput | AICostAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostAlerts.
     */
    cursor?: AICostAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostAlerts.
     */
    distinct?: AICostAlertScalarFieldEnum | AICostAlertScalarFieldEnum[]
  }

  /**
   * AICostAlert findMany
   */
  export type AICostAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * Filter, which AICostAlerts to fetch.
     */
    where?: AICostAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostAlerts to fetch.
     */
    orderBy?: AICostAlertOrderByWithRelationInput | AICostAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AICostAlerts.
     */
    cursor?: AICostAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostAlerts.
     */
    skip?: number
    distinct?: AICostAlertScalarFieldEnum | AICostAlertScalarFieldEnum[]
  }

  /**
   * AICostAlert create
   */
  export type AICostAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * The data needed to create a AICostAlert.
     */
    data: XOR<AICostAlertCreateInput, AICostAlertUncheckedCreateInput>
  }

  /**
   * AICostAlert createMany
   */
  export type AICostAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AICostAlerts.
     */
    data: AICostAlertCreateManyInput | AICostAlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostAlert createManyAndReturn
   */
  export type AICostAlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * The data used to create many AICostAlerts.
     */
    data: AICostAlertCreateManyInput | AICostAlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostAlert update
   */
  export type AICostAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * The data needed to update a AICostAlert.
     */
    data: XOR<AICostAlertUpdateInput, AICostAlertUncheckedUpdateInput>
    /**
     * Choose, which AICostAlert to update.
     */
    where: AICostAlertWhereUniqueInput
  }

  /**
   * AICostAlert updateMany
   */
  export type AICostAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AICostAlerts.
     */
    data: XOR<AICostAlertUpdateManyMutationInput, AICostAlertUncheckedUpdateManyInput>
    /**
     * Filter which AICostAlerts to update
     */
    where?: AICostAlertWhereInput
    /**
     * Limit how many AICostAlerts to update.
     */
    limit?: number
  }

  /**
   * AICostAlert updateManyAndReturn
   */
  export type AICostAlertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * The data used to update AICostAlerts.
     */
    data: XOR<AICostAlertUpdateManyMutationInput, AICostAlertUncheckedUpdateManyInput>
    /**
     * Filter which AICostAlerts to update
     */
    where?: AICostAlertWhereInput
    /**
     * Limit how many AICostAlerts to update.
     */
    limit?: number
  }

  /**
   * AICostAlert upsert
   */
  export type AICostAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * The filter to search for the AICostAlert to update in case it exists.
     */
    where: AICostAlertWhereUniqueInput
    /**
     * In case the AICostAlert found by the `where` argument doesn't exist, create a new AICostAlert with this data.
     */
    create: XOR<AICostAlertCreateInput, AICostAlertUncheckedCreateInput>
    /**
     * In case the AICostAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AICostAlertUpdateInput, AICostAlertUncheckedUpdateInput>
  }

  /**
   * AICostAlert delete
   */
  export type AICostAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
    /**
     * Filter which AICostAlert to delete.
     */
    where: AICostAlertWhereUniqueInput
  }

  /**
   * AICostAlert deleteMany
   */
  export type AICostAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostAlerts to delete
     */
    where?: AICostAlertWhereInput
    /**
     * Limit how many AICostAlerts to delete.
     */
    limit?: number
  }

  /**
   * AICostAlert without action
   */
  export type AICostAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostAlert
     */
    select?: AICostAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostAlert
     */
    omit?: AICostAlertOmit<ExtArgs> | null
  }


  /**
   * Model AICostBudget
   */

  export type AggregateAICostBudget = {
    _count: AICostBudgetCountAggregateOutputType | null
    _avg: AICostBudgetAvgAggregateOutputType | null
    _sum: AICostBudgetSumAggregateOutputType | null
    _min: AICostBudgetMinAggregateOutputType | null
    _max: AICostBudgetMaxAggregateOutputType | null
  }

  export type AICostBudgetAvgAggregateOutputType = {
    monthlyTokenBudget: number | null
    monthlyCostBudget: number | null
    softLimitPercentage: number | null
    hardLimitPercentage: number | null
    currentTokensUsed: number | null
    currentCostUsed: number | null
  }

  export type AICostBudgetSumAggregateOutputType = {
    monthlyTokenBudget: number | null
    monthlyCostBudget: number | null
    softLimitPercentage: number | null
    hardLimitPercentage: number | null
    currentTokensUsed: number | null
    currentCostUsed: number | null
  }

  export type AICostBudgetMinAggregateOutputType = {
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

  export type AICostBudgetMaxAggregateOutputType = {
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

  export type AICostBudgetCountAggregateOutputType = {
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


  export type AICostBudgetAvgAggregateInputType = {
    monthlyTokenBudget?: true
    monthlyCostBudget?: true
    softLimitPercentage?: true
    hardLimitPercentage?: true
    currentTokensUsed?: true
    currentCostUsed?: true
  }

  export type AICostBudgetSumAggregateInputType = {
    monthlyTokenBudget?: true
    monthlyCostBudget?: true
    softLimitPercentage?: true
    hardLimitPercentage?: true
    currentTokensUsed?: true
    currentCostUsed?: true
  }

  export type AICostBudgetMinAggregateInputType = {
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

  export type AICostBudgetMaxAggregateInputType = {
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

  export type AICostBudgetCountAggregateInputType = {
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

  export type AICostBudgetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostBudget to aggregate.
     */
    where?: AICostBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostBudgets to fetch.
     */
    orderBy?: AICostBudgetOrderByWithRelationInput | AICostBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AICostBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AICostBudgets
    **/
    _count?: true | AICostBudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AICostBudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AICostBudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AICostBudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AICostBudgetMaxAggregateInputType
  }

  export type GetAICostBudgetAggregateType<T extends AICostBudgetAggregateArgs> = {
        [P in keyof T & keyof AggregateAICostBudget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAICostBudget[P]>
      : GetScalarType<T[P], AggregateAICostBudget[P]>
  }




  export type AICostBudgetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AICostBudgetWhereInput
    orderBy?: AICostBudgetOrderByWithAggregationInput | AICostBudgetOrderByWithAggregationInput[]
    by: AICostBudgetScalarFieldEnum[] | AICostBudgetScalarFieldEnum
    having?: AICostBudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AICostBudgetCountAggregateInputType | true
    _avg?: AICostBudgetAvgAggregateInputType
    _sum?: AICostBudgetSumAggregateInputType
    _min?: AICostBudgetMinAggregateInputType
    _max?: AICostBudgetMaxAggregateInputType
  }

  export type AICostBudgetGroupByOutputType = {
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
    _count: AICostBudgetCountAggregateOutputType | null
    _avg: AICostBudgetAvgAggregateOutputType | null
    _sum: AICostBudgetSumAggregateOutputType | null
    _min: AICostBudgetMinAggregateOutputType | null
    _max: AICostBudgetMaxAggregateOutputType | null
  }

  type GetAICostBudgetGroupByPayload<T extends AICostBudgetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AICostBudgetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AICostBudgetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AICostBudgetGroupByOutputType[P]>
            : GetScalarType<T[P], AICostBudgetGroupByOutputType[P]>
        }
      >
    >


  export type AICostBudgetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["aICostBudget"]>

  export type AICostBudgetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["aICostBudget"]>

  export type AICostBudgetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["aICostBudget"]>

  export type AICostBudgetSelectScalar = {
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

  export type AICostBudgetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "monthlyTokenBudget" | "monthlyCostBudget" | "softLimitPercentage" | "hardLimitPercentage" | "currentTokensUsed" | "currentCostUsed" | "periodStart" | "periodEnd" | "createdAt" | "updatedAt", ExtArgs["result"]["aICostBudget"]>

  export type $AICostBudgetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AICostBudget"
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
    }, ExtArgs["result"]["aICostBudget"]>
    composites: {}
  }

  type AICostBudgetGetPayload<S extends boolean | null | undefined | AICostBudgetDefaultArgs> = $Result.GetResult<Prisma.$AICostBudgetPayload, S>

  type AICostBudgetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AICostBudgetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AICostBudgetCountAggregateInputType | true
    }

  export interface AICostBudgetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AICostBudget'], meta: { name: 'AICostBudget' } }
    /**
     * Find zero or one AICostBudget that matches the filter.
     * @param {AICostBudgetFindUniqueArgs} args - Arguments to find a AICostBudget
     * @example
     * // Get one AICostBudget
     * const aICostBudget = await prisma.aICostBudget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AICostBudgetFindUniqueArgs>(args: SelectSubset<T, AICostBudgetFindUniqueArgs<ExtArgs>>): Prisma__AICostBudgetClient<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AICostBudget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AICostBudgetFindUniqueOrThrowArgs} args - Arguments to find a AICostBudget
     * @example
     * // Get one AICostBudget
     * const aICostBudget = await prisma.aICostBudget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AICostBudgetFindUniqueOrThrowArgs>(args: SelectSubset<T, AICostBudgetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AICostBudgetClient<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostBudget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostBudgetFindFirstArgs} args - Arguments to find a AICostBudget
     * @example
     * // Get one AICostBudget
     * const aICostBudget = await prisma.aICostBudget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AICostBudgetFindFirstArgs>(args?: SelectSubset<T, AICostBudgetFindFirstArgs<ExtArgs>>): Prisma__AICostBudgetClient<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostBudget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostBudgetFindFirstOrThrowArgs} args - Arguments to find a AICostBudget
     * @example
     * // Get one AICostBudget
     * const aICostBudget = await prisma.aICostBudget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AICostBudgetFindFirstOrThrowArgs>(args?: SelectSubset<T, AICostBudgetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AICostBudgetClient<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AICostBudgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostBudgetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AICostBudgets
     * const aICostBudgets = await prisma.aICostBudget.findMany()
     * 
     * // Get first 10 AICostBudgets
     * const aICostBudgets = await prisma.aICostBudget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aICostBudgetWithIdOnly = await prisma.aICostBudget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AICostBudgetFindManyArgs>(args?: SelectSubset<T, AICostBudgetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AICostBudget.
     * @param {AICostBudgetCreateArgs} args - Arguments to create a AICostBudget.
     * @example
     * // Create one AICostBudget
     * const AICostBudget = await prisma.aICostBudget.create({
     *   data: {
     *     // ... data to create a AICostBudget
     *   }
     * })
     * 
     */
    create<T extends AICostBudgetCreateArgs>(args: SelectSubset<T, AICostBudgetCreateArgs<ExtArgs>>): Prisma__AICostBudgetClient<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AICostBudgets.
     * @param {AICostBudgetCreateManyArgs} args - Arguments to create many AICostBudgets.
     * @example
     * // Create many AICostBudgets
     * const aICostBudget = await prisma.aICostBudget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AICostBudgetCreateManyArgs>(args?: SelectSubset<T, AICostBudgetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AICostBudgets and returns the data saved in the database.
     * @param {AICostBudgetCreateManyAndReturnArgs} args - Arguments to create many AICostBudgets.
     * @example
     * // Create many AICostBudgets
     * const aICostBudget = await prisma.aICostBudget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AICostBudgets and only return the `id`
     * const aICostBudgetWithIdOnly = await prisma.aICostBudget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AICostBudgetCreateManyAndReturnArgs>(args?: SelectSubset<T, AICostBudgetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AICostBudget.
     * @param {AICostBudgetDeleteArgs} args - Arguments to delete one AICostBudget.
     * @example
     * // Delete one AICostBudget
     * const AICostBudget = await prisma.aICostBudget.delete({
     *   where: {
     *     // ... filter to delete one AICostBudget
     *   }
     * })
     * 
     */
    delete<T extends AICostBudgetDeleteArgs>(args: SelectSubset<T, AICostBudgetDeleteArgs<ExtArgs>>): Prisma__AICostBudgetClient<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AICostBudget.
     * @param {AICostBudgetUpdateArgs} args - Arguments to update one AICostBudget.
     * @example
     * // Update one AICostBudget
     * const aICostBudget = await prisma.aICostBudget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AICostBudgetUpdateArgs>(args: SelectSubset<T, AICostBudgetUpdateArgs<ExtArgs>>): Prisma__AICostBudgetClient<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AICostBudgets.
     * @param {AICostBudgetDeleteManyArgs} args - Arguments to filter AICostBudgets to delete.
     * @example
     * // Delete a few AICostBudgets
     * const { count } = await prisma.aICostBudget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AICostBudgetDeleteManyArgs>(args?: SelectSubset<T, AICostBudgetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostBudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AICostBudgets
     * const aICostBudget = await prisma.aICostBudget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AICostBudgetUpdateManyArgs>(args: SelectSubset<T, AICostBudgetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostBudgets and returns the data updated in the database.
     * @param {AICostBudgetUpdateManyAndReturnArgs} args - Arguments to update many AICostBudgets.
     * @example
     * // Update many AICostBudgets
     * const aICostBudget = await prisma.aICostBudget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AICostBudgets and only return the `id`
     * const aICostBudgetWithIdOnly = await prisma.aICostBudget.updateManyAndReturn({
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
    updateManyAndReturn<T extends AICostBudgetUpdateManyAndReturnArgs>(args: SelectSubset<T, AICostBudgetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AICostBudget.
     * @param {AICostBudgetUpsertArgs} args - Arguments to update or create a AICostBudget.
     * @example
     * // Update or create a AICostBudget
     * const aICostBudget = await prisma.aICostBudget.upsert({
     *   create: {
     *     // ... data to create a AICostBudget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AICostBudget we want to update
     *   }
     * })
     */
    upsert<T extends AICostBudgetUpsertArgs>(args: SelectSubset<T, AICostBudgetUpsertArgs<ExtArgs>>): Prisma__AICostBudgetClient<$Result.GetResult<Prisma.$AICostBudgetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AICostBudgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostBudgetCountArgs} args - Arguments to filter AICostBudgets to count.
     * @example
     * // Count the number of AICostBudgets
     * const count = await prisma.aICostBudget.count({
     *   where: {
     *     // ... the filter for the AICostBudgets we want to count
     *   }
     * })
    **/
    count<T extends AICostBudgetCountArgs>(
      args?: Subset<T, AICostBudgetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AICostBudgetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AICostBudget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostBudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AICostBudgetAggregateArgs>(args: Subset<T, AICostBudgetAggregateArgs>): Prisma.PrismaPromise<GetAICostBudgetAggregateType<T>>

    /**
     * Group by AICostBudget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostBudgetGroupByArgs} args - Group by arguments.
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
      T extends AICostBudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AICostBudgetGroupByArgs['orderBy'] }
        : { orderBy?: AICostBudgetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AICostBudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAICostBudgetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AICostBudget model
   */
  readonly fields: AICostBudgetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AICostBudget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AICostBudgetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AICostBudget model
   */
  interface AICostBudgetFieldRefs {
    readonly id: FieldRef<"AICostBudget", 'String'>
    readonly tenantId: FieldRef<"AICostBudget", 'String'>
    readonly monthlyTokenBudget: FieldRef<"AICostBudget", 'Int'>
    readonly monthlyCostBudget: FieldRef<"AICostBudget", 'Float'>
    readonly softLimitPercentage: FieldRef<"AICostBudget", 'Int'>
    readonly hardLimitPercentage: FieldRef<"AICostBudget", 'Int'>
    readonly currentTokensUsed: FieldRef<"AICostBudget", 'Int'>
    readonly currentCostUsed: FieldRef<"AICostBudget", 'Float'>
    readonly periodStart: FieldRef<"AICostBudget", 'DateTime'>
    readonly periodEnd: FieldRef<"AICostBudget", 'DateTime'>
    readonly createdAt: FieldRef<"AICostBudget", 'DateTime'>
    readonly updatedAt: FieldRef<"AICostBudget", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AICostBudget findUnique
   */
  export type AICostBudgetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AICostBudget to fetch.
     */
    where: AICostBudgetWhereUniqueInput
  }

  /**
   * AICostBudget findUniqueOrThrow
   */
  export type AICostBudgetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AICostBudget to fetch.
     */
    where: AICostBudgetWhereUniqueInput
  }

  /**
   * AICostBudget findFirst
   */
  export type AICostBudgetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AICostBudget to fetch.
     */
    where?: AICostBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostBudgets to fetch.
     */
    orderBy?: AICostBudgetOrderByWithRelationInput | AICostBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostBudgets.
     */
    cursor?: AICostBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostBudgets.
     */
    distinct?: AICostBudgetScalarFieldEnum | AICostBudgetScalarFieldEnum[]
  }

  /**
   * AICostBudget findFirstOrThrow
   */
  export type AICostBudgetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AICostBudget to fetch.
     */
    where?: AICostBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostBudgets to fetch.
     */
    orderBy?: AICostBudgetOrderByWithRelationInput | AICostBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostBudgets.
     */
    cursor?: AICostBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostBudgets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostBudgets.
     */
    distinct?: AICostBudgetScalarFieldEnum | AICostBudgetScalarFieldEnum[]
  }

  /**
   * AICostBudget findMany
   */
  export type AICostBudgetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * Filter, which AICostBudgets to fetch.
     */
    where?: AICostBudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostBudgets to fetch.
     */
    orderBy?: AICostBudgetOrderByWithRelationInput | AICostBudgetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AICostBudgets.
     */
    cursor?: AICostBudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostBudgets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostBudgets.
     */
    skip?: number
    distinct?: AICostBudgetScalarFieldEnum | AICostBudgetScalarFieldEnum[]
  }

  /**
   * AICostBudget create
   */
  export type AICostBudgetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * The data needed to create a AICostBudget.
     */
    data: XOR<AICostBudgetCreateInput, AICostBudgetUncheckedCreateInput>
  }

  /**
   * AICostBudget createMany
   */
  export type AICostBudgetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AICostBudgets.
     */
    data: AICostBudgetCreateManyInput | AICostBudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostBudget createManyAndReturn
   */
  export type AICostBudgetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * The data used to create many AICostBudgets.
     */
    data: AICostBudgetCreateManyInput | AICostBudgetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostBudget update
   */
  export type AICostBudgetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * The data needed to update a AICostBudget.
     */
    data: XOR<AICostBudgetUpdateInput, AICostBudgetUncheckedUpdateInput>
    /**
     * Choose, which AICostBudget to update.
     */
    where: AICostBudgetWhereUniqueInput
  }

  /**
   * AICostBudget updateMany
   */
  export type AICostBudgetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AICostBudgets.
     */
    data: XOR<AICostBudgetUpdateManyMutationInput, AICostBudgetUncheckedUpdateManyInput>
    /**
     * Filter which AICostBudgets to update
     */
    where?: AICostBudgetWhereInput
    /**
     * Limit how many AICostBudgets to update.
     */
    limit?: number
  }

  /**
   * AICostBudget updateManyAndReturn
   */
  export type AICostBudgetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * The data used to update AICostBudgets.
     */
    data: XOR<AICostBudgetUpdateManyMutationInput, AICostBudgetUncheckedUpdateManyInput>
    /**
     * Filter which AICostBudgets to update
     */
    where?: AICostBudgetWhereInput
    /**
     * Limit how many AICostBudgets to update.
     */
    limit?: number
  }

  /**
   * AICostBudget upsert
   */
  export type AICostBudgetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * The filter to search for the AICostBudget to update in case it exists.
     */
    where: AICostBudgetWhereUniqueInput
    /**
     * In case the AICostBudget found by the `where` argument doesn't exist, create a new AICostBudget with this data.
     */
    create: XOR<AICostBudgetCreateInput, AICostBudgetUncheckedCreateInput>
    /**
     * In case the AICostBudget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AICostBudgetUpdateInput, AICostBudgetUncheckedUpdateInput>
  }

  /**
   * AICostBudget delete
   */
  export type AICostBudgetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
    /**
     * Filter which AICostBudget to delete.
     */
    where: AICostBudgetWhereUniqueInput
  }

  /**
   * AICostBudget deleteMany
   */
  export type AICostBudgetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostBudgets to delete
     */
    where?: AICostBudgetWhereInput
    /**
     * Limit how many AICostBudgets to delete.
     */
    limit?: number
  }

  /**
   * AICostBudget without action
   */
  export type AICostBudgetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostBudget
     */
    select?: AICostBudgetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostBudget
     */
    omit?: AICostBudgetOmit<ExtArgs> | null
  }


  /**
   * Model AICostUsageEvent
   */

  export type AggregateAICostUsageEvent = {
    _count: AICostUsageEventCountAggregateOutputType | null
    _avg: AICostUsageEventAvgAggregateOutputType | null
    _sum: AICostUsageEventSumAggregateOutputType | null
    _min: AICostUsageEventMinAggregateOutputType | null
    _max: AICostUsageEventMaxAggregateOutputType | null
  }

  export type AICostUsageEventAvgAggregateOutputType = {
    tokensPrompt: number | null
    tokensCompletion: number | null
    cost: number | null
  }

  export type AICostUsageEventSumAggregateOutputType = {
    tokensPrompt: number | null
    tokensCompletion: number | null
    cost: number | null
  }

  export type AICostUsageEventMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    feature: string | null
    tokensPrompt: number | null
    tokensCompletion: number | null
    cost: number | null
    timestamp: Date | null
  }

  export type AICostUsageEventMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    modelId: string | null
    feature: string | null
    tokensPrompt: number | null
    tokensCompletion: number | null
    cost: number | null
    timestamp: Date | null
  }

  export type AICostUsageEventCountAggregateOutputType = {
    id: number
    tenantId: number
    modelId: number
    feature: number
    tokensPrompt: number
    tokensCompletion: number
    cost: number
    timestamp: number
    metadata: number
    _all: number
  }


  export type AICostUsageEventAvgAggregateInputType = {
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
  }

  export type AICostUsageEventSumAggregateInputType = {
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
  }

  export type AICostUsageEventMinAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    feature?: true
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
    timestamp?: true
  }

  export type AICostUsageEventMaxAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    feature?: true
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
    timestamp?: true
  }

  export type AICostUsageEventCountAggregateInputType = {
    id?: true
    tenantId?: true
    modelId?: true
    feature?: true
    tokensPrompt?: true
    tokensCompletion?: true
    cost?: true
    timestamp?: true
    metadata?: true
    _all?: true
  }

  export type AICostUsageEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostUsageEvent to aggregate.
     */
    where?: AICostUsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostUsageEvents to fetch.
     */
    orderBy?: AICostUsageEventOrderByWithRelationInput | AICostUsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AICostUsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostUsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostUsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AICostUsageEvents
    **/
    _count?: true | AICostUsageEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AICostUsageEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AICostUsageEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AICostUsageEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AICostUsageEventMaxAggregateInputType
  }

  export type GetAICostUsageEventAggregateType<T extends AICostUsageEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAICostUsageEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAICostUsageEvent[P]>
      : GetScalarType<T[P], AggregateAICostUsageEvent[P]>
  }




  export type AICostUsageEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AICostUsageEventWhereInput
    orderBy?: AICostUsageEventOrderByWithAggregationInput | AICostUsageEventOrderByWithAggregationInput[]
    by: AICostUsageEventScalarFieldEnum[] | AICostUsageEventScalarFieldEnum
    having?: AICostUsageEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AICostUsageEventCountAggregateInputType | true
    _avg?: AICostUsageEventAvgAggregateInputType
    _sum?: AICostUsageEventSumAggregateInputType
    _min?: AICostUsageEventMinAggregateInputType
    _max?: AICostUsageEventMaxAggregateInputType
  }

  export type AICostUsageEventGroupByOutputType = {
    id: string
    tenantId: string
    modelId: string | null
    feature: string | null
    tokensPrompt: number
    tokensCompletion: number
    cost: number
    timestamp: Date
    metadata: JsonValue
    _count: AICostUsageEventCountAggregateOutputType | null
    _avg: AICostUsageEventAvgAggregateOutputType | null
    _sum: AICostUsageEventSumAggregateOutputType | null
    _min: AICostUsageEventMinAggregateOutputType | null
    _max: AICostUsageEventMaxAggregateOutputType | null
  }

  type GetAICostUsageEventGroupByPayload<T extends AICostUsageEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AICostUsageEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AICostUsageEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AICostUsageEventGroupByOutputType[P]>
            : GetScalarType<T[P], AICostUsageEventGroupByOutputType[P]>
        }
      >
    >


  export type AICostUsageEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    feature?: boolean
    tokensPrompt?: boolean
    tokensCompletion?: boolean
    cost?: boolean
    timestamp?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["aICostUsageEvent"]>

  export type AICostUsageEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    feature?: boolean
    tokensPrompt?: boolean
    tokensCompletion?: boolean
    cost?: boolean
    timestamp?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["aICostUsageEvent"]>

  export type AICostUsageEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    feature?: boolean
    tokensPrompt?: boolean
    tokensCompletion?: boolean
    cost?: boolean
    timestamp?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["aICostUsageEvent"]>

  export type AICostUsageEventSelectScalar = {
    id?: boolean
    tenantId?: boolean
    modelId?: boolean
    feature?: boolean
    tokensPrompt?: boolean
    tokensCompletion?: boolean
    cost?: boolean
    timestamp?: boolean
    metadata?: boolean
  }

  export type AICostUsageEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "modelId" | "feature" | "tokensPrompt" | "tokensCompletion" | "cost" | "timestamp" | "metadata", ExtArgs["result"]["aICostUsageEvent"]>

  export type $AICostUsageEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AICostUsageEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      modelId: string | null
      feature: string | null
      tokensPrompt: number
      tokensCompletion: number
      cost: number
      timestamp: Date
      metadata: Prisma.JsonValue
    }, ExtArgs["result"]["aICostUsageEvent"]>
    composites: {}
  }

  type AICostUsageEventGetPayload<S extends boolean | null | undefined | AICostUsageEventDefaultArgs> = $Result.GetResult<Prisma.$AICostUsageEventPayload, S>

  type AICostUsageEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AICostUsageEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AICostUsageEventCountAggregateInputType | true
    }

  export interface AICostUsageEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AICostUsageEvent'], meta: { name: 'AICostUsageEvent' } }
    /**
     * Find zero or one AICostUsageEvent that matches the filter.
     * @param {AICostUsageEventFindUniqueArgs} args - Arguments to find a AICostUsageEvent
     * @example
     * // Get one AICostUsageEvent
     * const aICostUsageEvent = await prisma.aICostUsageEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AICostUsageEventFindUniqueArgs>(args: SelectSubset<T, AICostUsageEventFindUniqueArgs<ExtArgs>>): Prisma__AICostUsageEventClient<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AICostUsageEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AICostUsageEventFindUniqueOrThrowArgs} args - Arguments to find a AICostUsageEvent
     * @example
     * // Get one AICostUsageEvent
     * const aICostUsageEvent = await prisma.aICostUsageEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AICostUsageEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AICostUsageEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AICostUsageEventClient<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostUsageEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageEventFindFirstArgs} args - Arguments to find a AICostUsageEvent
     * @example
     * // Get one AICostUsageEvent
     * const aICostUsageEvent = await prisma.aICostUsageEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AICostUsageEventFindFirstArgs>(args?: SelectSubset<T, AICostUsageEventFindFirstArgs<ExtArgs>>): Prisma__AICostUsageEventClient<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AICostUsageEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageEventFindFirstOrThrowArgs} args - Arguments to find a AICostUsageEvent
     * @example
     * // Get one AICostUsageEvent
     * const aICostUsageEvent = await prisma.aICostUsageEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AICostUsageEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AICostUsageEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AICostUsageEventClient<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AICostUsageEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AICostUsageEvents
     * const aICostUsageEvents = await prisma.aICostUsageEvent.findMany()
     * 
     * // Get first 10 AICostUsageEvents
     * const aICostUsageEvents = await prisma.aICostUsageEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aICostUsageEventWithIdOnly = await prisma.aICostUsageEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AICostUsageEventFindManyArgs>(args?: SelectSubset<T, AICostUsageEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AICostUsageEvent.
     * @param {AICostUsageEventCreateArgs} args - Arguments to create a AICostUsageEvent.
     * @example
     * // Create one AICostUsageEvent
     * const AICostUsageEvent = await prisma.aICostUsageEvent.create({
     *   data: {
     *     // ... data to create a AICostUsageEvent
     *   }
     * })
     * 
     */
    create<T extends AICostUsageEventCreateArgs>(args: SelectSubset<T, AICostUsageEventCreateArgs<ExtArgs>>): Prisma__AICostUsageEventClient<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AICostUsageEvents.
     * @param {AICostUsageEventCreateManyArgs} args - Arguments to create many AICostUsageEvents.
     * @example
     * // Create many AICostUsageEvents
     * const aICostUsageEvent = await prisma.aICostUsageEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AICostUsageEventCreateManyArgs>(args?: SelectSubset<T, AICostUsageEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AICostUsageEvents and returns the data saved in the database.
     * @param {AICostUsageEventCreateManyAndReturnArgs} args - Arguments to create many AICostUsageEvents.
     * @example
     * // Create many AICostUsageEvents
     * const aICostUsageEvent = await prisma.aICostUsageEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AICostUsageEvents and only return the `id`
     * const aICostUsageEventWithIdOnly = await prisma.aICostUsageEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AICostUsageEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AICostUsageEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AICostUsageEvent.
     * @param {AICostUsageEventDeleteArgs} args - Arguments to delete one AICostUsageEvent.
     * @example
     * // Delete one AICostUsageEvent
     * const AICostUsageEvent = await prisma.aICostUsageEvent.delete({
     *   where: {
     *     // ... filter to delete one AICostUsageEvent
     *   }
     * })
     * 
     */
    delete<T extends AICostUsageEventDeleteArgs>(args: SelectSubset<T, AICostUsageEventDeleteArgs<ExtArgs>>): Prisma__AICostUsageEventClient<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AICostUsageEvent.
     * @param {AICostUsageEventUpdateArgs} args - Arguments to update one AICostUsageEvent.
     * @example
     * // Update one AICostUsageEvent
     * const aICostUsageEvent = await prisma.aICostUsageEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AICostUsageEventUpdateArgs>(args: SelectSubset<T, AICostUsageEventUpdateArgs<ExtArgs>>): Prisma__AICostUsageEventClient<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AICostUsageEvents.
     * @param {AICostUsageEventDeleteManyArgs} args - Arguments to filter AICostUsageEvents to delete.
     * @example
     * // Delete a few AICostUsageEvents
     * const { count } = await prisma.aICostUsageEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AICostUsageEventDeleteManyArgs>(args?: SelectSubset<T, AICostUsageEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostUsageEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AICostUsageEvents
     * const aICostUsageEvent = await prisma.aICostUsageEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AICostUsageEventUpdateManyArgs>(args: SelectSubset<T, AICostUsageEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AICostUsageEvents and returns the data updated in the database.
     * @param {AICostUsageEventUpdateManyAndReturnArgs} args - Arguments to update many AICostUsageEvents.
     * @example
     * // Update many AICostUsageEvents
     * const aICostUsageEvent = await prisma.aICostUsageEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AICostUsageEvents and only return the `id`
     * const aICostUsageEventWithIdOnly = await prisma.aICostUsageEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends AICostUsageEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AICostUsageEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AICostUsageEvent.
     * @param {AICostUsageEventUpsertArgs} args - Arguments to update or create a AICostUsageEvent.
     * @example
     * // Update or create a AICostUsageEvent
     * const aICostUsageEvent = await prisma.aICostUsageEvent.upsert({
     *   create: {
     *     // ... data to create a AICostUsageEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AICostUsageEvent we want to update
     *   }
     * })
     */
    upsert<T extends AICostUsageEventUpsertArgs>(args: SelectSubset<T, AICostUsageEventUpsertArgs<ExtArgs>>): Prisma__AICostUsageEventClient<$Result.GetResult<Prisma.$AICostUsageEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AICostUsageEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageEventCountArgs} args - Arguments to filter AICostUsageEvents to count.
     * @example
     * // Count the number of AICostUsageEvents
     * const count = await prisma.aICostUsageEvent.count({
     *   where: {
     *     // ... the filter for the AICostUsageEvents we want to count
     *   }
     * })
    **/
    count<T extends AICostUsageEventCountArgs>(
      args?: Subset<T, AICostUsageEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AICostUsageEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AICostUsageEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AICostUsageEventAggregateArgs>(args: Subset<T, AICostUsageEventAggregateArgs>): Prisma.PrismaPromise<GetAICostUsageEventAggregateType<T>>

    /**
     * Group by AICostUsageEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AICostUsageEventGroupByArgs} args - Group by arguments.
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
      T extends AICostUsageEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AICostUsageEventGroupByArgs['orderBy'] }
        : { orderBy?: AICostUsageEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AICostUsageEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAICostUsageEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AICostUsageEvent model
   */
  readonly fields: AICostUsageEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AICostUsageEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AICostUsageEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AICostUsageEvent model
   */
  interface AICostUsageEventFieldRefs {
    readonly id: FieldRef<"AICostUsageEvent", 'String'>
    readonly tenantId: FieldRef<"AICostUsageEvent", 'String'>
    readonly modelId: FieldRef<"AICostUsageEvent", 'String'>
    readonly feature: FieldRef<"AICostUsageEvent", 'String'>
    readonly tokensPrompt: FieldRef<"AICostUsageEvent", 'Int'>
    readonly tokensCompletion: FieldRef<"AICostUsageEvent", 'Int'>
    readonly cost: FieldRef<"AICostUsageEvent", 'Float'>
    readonly timestamp: FieldRef<"AICostUsageEvent", 'DateTime'>
    readonly metadata: FieldRef<"AICostUsageEvent", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * AICostUsageEvent findUnique
   */
  export type AICostUsageEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageEvent to fetch.
     */
    where: AICostUsageEventWhereUniqueInput
  }

  /**
   * AICostUsageEvent findUniqueOrThrow
   */
  export type AICostUsageEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageEvent to fetch.
     */
    where: AICostUsageEventWhereUniqueInput
  }

  /**
   * AICostUsageEvent findFirst
   */
  export type AICostUsageEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageEvent to fetch.
     */
    where?: AICostUsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostUsageEvents to fetch.
     */
    orderBy?: AICostUsageEventOrderByWithRelationInput | AICostUsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostUsageEvents.
     */
    cursor?: AICostUsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostUsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostUsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostUsageEvents.
     */
    distinct?: AICostUsageEventScalarFieldEnum | AICostUsageEventScalarFieldEnum[]
  }

  /**
   * AICostUsageEvent findFirstOrThrow
   */
  export type AICostUsageEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageEvent to fetch.
     */
    where?: AICostUsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostUsageEvents to fetch.
     */
    orderBy?: AICostUsageEventOrderByWithRelationInput | AICostUsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AICostUsageEvents.
     */
    cursor?: AICostUsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostUsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostUsageEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AICostUsageEvents.
     */
    distinct?: AICostUsageEventScalarFieldEnum | AICostUsageEventScalarFieldEnum[]
  }

  /**
   * AICostUsageEvent findMany
   */
  export type AICostUsageEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * Filter, which AICostUsageEvents to fetch.
     */
    where?: AICostUsageEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AICostUsageEvents to fetch.
     */
    orderBy?: AICostUsageEventOrderByWithRelationInput | AICostUsageEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AICostUsageEvents.
     */
    cursor?: AICostUsageEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AICostUsageEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AICostUsageEvents.
     */
    skip?: number
    distinct?: AICostUsageEventScalarFieldEnum | AICostUsageEventScalarFieldEnum[]
  }

  /**
   * AICostUsageEvent create
   */
  export type AICostUsageEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * The data needed to create a AICostUsageEvent.
     */
    data: XOR<AICostUsageEventCreateInput, AICostUsageEventUncheckedCreateInput>
  }

  /**
   * AICostUsageEvent createMany
   */
  export type AICostUsageEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AICostUsageEvents.
     */
    data: AICostUsageEventCreateManyInput | AICostUsageEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostUsageEvent createManyAndReturn
   */
  export type AICostUsageEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * The data used to create many AICostUsageEvents.
     */
    data: AICostUsageEventCreateManyInput | AICostUsageEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AICostUsageEvent update
   */
  export type AICostUsageEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * The data needed to update a AICostUsageEvent.
     */
    data: XOR<AICostUsageEventUpdateInput, AICostUsageEventUncheckedUpdateInput>
    /**
     * Choose, which AICostUsageEvent to update.
     */
    where: AICostUsageEventWhereUniqueInput
  }

  /**
   * AICostUsageEvent updateMany
   */
  export type AICostUsageEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AICostUsageEvents.
     */
    data: XOR<AICostUsageEventUpdateManyMutationInput, AICostUsageEventUncheckedUpdateManyInput>
    /**
     * Filter which AICostUsageEvents to update
     */
    where?: AICostUsageEventWhereInput
    /**
     * Limit how many AICostUsageEvents to update.
     */
    limit?: number
  }

  /**
   * AICostUsageEvent updateManyAndReturn
   */
  export type AICostUsageEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * The data used to update AICostUsageEvents.
     */
    data: XOR<AICostUsageEventUpdateManyMutationInput, AICostUsageEventUncheckedUpdateManyInput>
    /**
     * Filter which AICostUsageEvents to update
     */
    where?: AICostUsageEventWhereInput
    /**
     * Limit how many AICostUsageEvents to update.
     */
    limit?: number
  }

  /**
   * AICostUsageEvent upsert
   */
  export type AICostUsageEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * The filter to search for the AICostUsageEvent to update in case it exists.
     */
    where: AICostUsageEventWhereUniqueInput
    /**
     * In case the AICostUsageEvent found by the `where` argument doesn't exist, create a new AICostUsageEvent with this data.
     */
    create: XOR<AICostUsageEventCreateInput, AICostUsageEventUncheckedCreateInput>
    /**
     * In case the AICostUsageEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AICostUsageEventUpdateInput, AICostUsageEventUncheckedUpdateInput>
  }

  /**
   * AICostUsageEvent delete
   */
  export type AICostUsageEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
    /**
     * Filter which AICostUsageEvent to delete.
     */
    where: AICostUsageEventWhereUniqueInput
  }

  /**
   * AICostUsageEvent deleteMany
   */
  export type AICostUsageEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AICostUsageEvents to delete
     */
    where?: AICostUsageEventWhereInput
    /**
     * Limit how many AICostUsageEvents to delete.
     */
    limit?: number
  }

  /**
   * AICostUsageEvent without action
   */
  export type AICostUsageEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AICostUsageEvent
     */
    select?: AICostUsageEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AICostUsageEvent
     */
    omit?: AICostUsageEventOmit<ExtArgs> | null
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


  export const AICostProfileScalarFieldEnum: {
    id: 'id',
    modelId: 'modelId',
    provider: 'provider',
    pricing: 'pricing',
    effectiveFrom: 'effectiveFrom',
    effectiveTo: 'effectiveTo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AICostProfileScalarFieldEnum = (typeof AICostProfileScalarFieldEnum)[keyof typeof AICostProfileScalarFieldEnum]


  export const AICostUsageAggregateScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    period: 'period',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    totalTokensPrompt: 'totalTokensPrompt',
    totalTokensCompletion: 'totalTokensCompletion',
    totalCost: 'totalCost',
    breakdownByModel: 'breakdownByModel',
    breakdownByFeature: 'breakdownByFeature',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AICostUsageAggregateScalarFieldEnum = (typeof AICostUsageAggregateScalarFieldEnum)[keyof typeof AICostUsageAggregateScalarFieldEnum]


  export const AICostAlertScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    type: 'type',
    severity: 'severity',
    message: 'message',
    metadata: 'metadata',
    createdAt: 'createdAt',
    resolvedAt: 'resolvedAt'
  };

  export type AICostAlertScalarFieldEnum = (typeof AICostAlertScalarFieldEnum)[keyof typeof AICostAlertScalarFieldEnum]


  export const AICostBudgetScalarFieldEnum: {
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

  export type AICostBudgetScalarFieldEnum = (typeof AICostBudgetScalarFieldEnum)[keyof typeof AICostBudgetScalarFieldEnum]


  export const AICostUsageEventScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    modelId: 'modelId',
    feature: 'feature',
    tokensPrompt: 'tokensPrompt',
    tokensCompletion: 'tokensCompletion',
    cost: 'cost',
    timestamp: 'timestamp',
    metadata: 'metadata'
  };

  export type AICostUsageEventScalarFieldEnum = (typeof AICostUsageEventScalarFieldEnum)[keyof typeof AICostUsageEventScalarFieldEnum]


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


  export type AICostProfileWhereInput = {
    AND?: AICostProfileWhereInput | AICostProfileWhereInput[]
    OR?: AICostProfileWhereInput[]
    NOT?: AICostProfileWhereInput | AICostProfileWhereInput[]
    id?: StringFilter<"AICostProfile"> | string
    modelId?: StringFilter<"AICostProfile"> | string
    provider?: StringFilter<"AICostProfile"> | string
    pricing?: JsonFilter<"AICostProfile">
    effectiveFrom?: DateTimeFilter<"AICostProfile"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"AICostProfile"> | Date | string | null
    createdAt?: DateTimeFilter<"AICostProfile"> | Date | string
    updatedAt?: DateTimeFilter<"AICostProfile"> | Date | string
  }

  export type AICostProfileOrderByWithRelationInput = {
    id?: SortOrder
    modelId?: SortOrder
    provider?: SortOrder
    pricing?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AICostProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AICostProfileWhereInput | AICostProfileWhereInput[]
    OR?: AICostProfileWhereInput[]
    NOT?: AICostProfileWhereInput | AICostProfileWhereInput[]
    modelId?: StringFilter<"AICostProfile"> | string
    provider?: StringFilter<"AICostProfile"> | string
    pricing?: JsonFilter<"AICostProfile">
    effectiveFrom?: DateTimeFilter<"AICostProfile"> | Date | string
    effectiveTo?: DateTimeNullableFilter<"AICostProfile"> | Date | string | null
    createdAt?: DateTimeFilter<"AICostProfile"> | Date | string
    updatedAt?: DateTimeFilter<"AICostProfile"> | Date | string
  }, "id">

  export type AICostProfileOrderByWithAggregationInput = {
    id?: SortOrder
    modelId?: SortOrder
    provider?: SortOrder
    pricing?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AICostProfileCountOrderByAggregateInput
    _max?: AICostProfileMaxOrderByAggregateInput
    _min?: AICostProfileMinOrderByAggregateInput
  }

  export type AICostProfileScalarWhereWithAggregatesInput = {
    AND?: AICostProfileScalarWhereWithAggregatesInput | AICostProfileScalarWhereWithAggregatesInput[]
    OR?: AICostProfileScalarWhereWithAggregatesInput[]
    NOT?: AICostProfileScalarWhereWithAggregatesInput | AICostProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AICostProfile"> | string
    modelId?: StringWithAggregatesFilter<"AICostProfile"> | string
    provider?: StringWithAggregatesFilter<"AICostProfile"> | string
    pricing?: JsonWithAggregatesFilter<"AICostProfile">
    effectiveFrom?: DateTimeWithAggregatesFilter<"AICostProfile"> | Date | string
    effectiveTo?: DateTimeNullableWithAggregatesFilter<"AICostProfile"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AICostProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AICostProfile"> | Date | string
  }

  export type AICostUsageAggregateWhereInput = {
    AND?: AICostUsageAggregateWhereInput | AICostUsageAggregateWhereInput[]
    OR?: AICostUsageAggregateWhereInput[]
    NOT?: AICostUsageAggregateWhereInput | AICostUsageAggregateWhereInput[]
    id?: StringFilter<"AICostUsageAggregate"> | string
    tenantId?: StringFilter<"AICostUsageAggregate"> | string
    period?: StringFilter<"AICostUsageAggregate"> | string
    periodStart?: DateTimeFilter<"AICostUsageAggregate"> | Date | string
    periodEnd?: DateTimeFilter<"AICostUsageAggregate"> | Date | string
    totalTokensPrompt?: IntFilter<"AICostUsageAggregate"> | number
    totalTokensCompletion?: IntFilter<"AICostUsageAggregate"> | number
    totalCost?: FloatFilter<"AICostUsageAggregate"> | number
    breakdownByModel?: JsonFilter<"AICostUsageAggregate">
    breakdownByFeature?: JsonFilter<"AICostUsageAggregate">
    createdAt?: DateTimeFilter<"AICostUsageAggregate"> | Date | string
    updatedAt?: DateTimeFilter<"AICostUsageAggregate"> | Date | string
  }

  export type AICostUsageAggregateOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    period?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalTokensPrompt?: SortOrder
    totalTokensCompletion?: SortOrder
    totalCost?: SortOrder
    breakdownByModel?: SortOrder
    breakdownByFeature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AICostUsageAggregateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_period_periodStart?: AICostUsageAggregateTenantIdPeriodPeriodStartCompoundUniqueInput
    AND?: AICostUsageAggregateWhereInput | AICostUsageAggregateWhereInput[]
    OR?: AICostUsageAggregateWhereInput[]
    NOT?: AICostUsageAggregateWhereInput | AICostUsageAggregateWhereInput[]
    tenantId?: StringFilter<"AICostUsageAggregate"> | string
    period?: StringFilter<"AICostUsageAggregate"> | string
    periodStart?: DateTimeFilter<"AICostUsageAggregate"> | Date | string
    periodEnd?: DateTimeFilter<"AICostUsageAggregate"> | Date | string
    totalTokensPrompt?: IntFilter<"AICostUsageAggregate"> | number
    totalTokensCompletion?: IntFilter<"AICostUsageAggregate"> | number
    totalCost?: FloatFilter<"AICostUsageAggregate"> | number
    breakdownByModel?: JsonFilter<"AICostUsageAggregate">
    breakdownByFeature?: JsonFilter<"AICostUsageAggregate">
    createdAt?: DateTimeFilter<"AICostUsageAggregate"> | Date | string
    updatedAt?: DateTimeFilter<"AICostUsageAggregate"> | Date | string
  }, "id" | "tenantId_period_periodStart">

  export type AICostUsageAggregateOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    period?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalTokensPrompt?: SortOrder
    totalTokensCompletion?: SortOrder
    totalCost?: SortOrder
    breakdownByModel?: SortOrder
    breakdownByFeature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AICostUsageAggregateCountOrderByAggregateInput
    _avg?: AICostUsageAggregateAvgOrderByAggregateInput
    _max?: AICostUsageAggregateMaxOrderByAggregateInput
    _min?: AICostUsageAggregateMinOrderByAggregateInput
    _sum?: AICostUsageAggregateSumOrderByAggregateInput
  }

  export type AICostUsageAggregateScalarWhereWithAggregatesInput = {
    AND?: AICostUsageAggregateScalarWhereWithAggregatesInput | AICostUsageAggregateScalarWhereWithAggregatesInput[]
    OR?: AICostUsageAggregateScalarWhereWithAggregatesInput[]
    NOT?: AICostUsageAggregateScalarWhereWithAggregatesInput | AICostUsageAggregateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AICostUsageAggregate"> | string
    tenantId?: StringWithAggregatesFilter<"AICostUsageAggregate"> | string
    period?: StringWithAggregatesFilter<"AICostUsageAggregate"> | string
    periodStart?: DateTimeWithAggregatesFilter<"AICostUsageAggregate"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"AICostUsageAggregate"> | Date | string
    totalTokensPrompt?: IntWithAggregatesFilter<"AICostUsageAggregate"> | number
    totalTokensCompletion?: IntWithAggregatesFilter<"AICostUsageAggregate"> | number
    totalCost?: FloatWithAggregatesFilter<"AICostUsageAggregate"> | number
    breakdownByModel?: JsonWithAggregatesFilter<"AICostUsageAggregate">
    breakdownByFeature?: JsonWithAggregatesFilter<"AICostUsageAggregate">
    createdAt?: DateTimeWithAggregatesFilter<"AICostUsageAggregate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AICostUsageAggregate"> | Date | string
  }

  export type AICostAlertWhereInput = {
    AND?: AICostAlertWhereInput | AICostAlertWhereInput[]
    OR?: AICostAlertWhereInput[]
    NOT?: AICostAlertWhereInput | AICostAlertWhereInput[]
    id?: StringFilter<"AICostAlert"> | string
    tenantId?: StringFilter<"AICostAlert"> | string
    type?: StringFilter<"AICostAlert"> | string
    severity?: StringFilter<"AICostAlert"> | string
    message?: StringFilter<"AICostAlert"> | string
    metadata?: JsonFilter<"AICostAlert">
    createdAt?: DateTimeFilter<"AICostAlert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"AICostAlert"> | Date | string | null
  }

  export type AICostAlertOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
  }

  export type AICostAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AICostAlertWhereInput | AICostAlertWhereInput[]
    OR?: AICostAlertWhereInput[]
    NOT?: AICostAlertWhereInput | AICostAlertWhereInput[]
    tenantId?: StringFilter<"AICostAlert"> | string
    type?: StringFilter<"AICostAlert"> | string
    severity?: StringFilter<"AICostAlert"> | string
    message?: StringFilter<"AICostAlert"> | string
    metadata?: JsonFilter<"AICostAlert">
    createdAt?: DateTimeFilter<"AICostAlert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"AICostAlert"> | Date | string | null
  }, "id">

  export type AICostAlertOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: AICostAlertCountOrderByAggregateInput
    _max?: AICostAlertMaxOrderByAggregateInput
    _min?: AICostAlertMinOrderByAggregateInput
  }

  export type AICostAlertScalarWhereWithAggregatesInput = {
    AND?: AICostAlertScalarWhereWithAggregatesInput | AICostAlertScalarWhereWithAggregatesInput[]
    OR?: AICostAlertScalarWhereWithAggregatesInput[]
    NOT?: AICostAlertScalarWhereWithAggregatesInput | AICostAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AICostAlert"> | string
    tenantId?: StringWithAggregatesFilter<"AICostAlert"> | string
    type?: StringWithAggregatesFilter<"AICostAlert"> | string
    severity?: StringWithAggregatesFilter<"AICostAlert"> | string
    message?: StringWithAggregatesFilter<"AICostAlert"> | string
    metadata?: JsonWithAggregatesFilter<"AICostAlert">
    createdAt?: DateTimeWithAggregatesFilter<"AICostAlert"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"AICostAlert"> | Date | string | null
  }

  export type AICostBudgetWhereInput = {
    AND?: AICostBudgetWhereInput | AICostBudgetWhereInput[]
    OR?: AICostBudgetWhereInput[]
    NOT?: AICostBudgetWhereInput | AICostBudgetWhereInput[]
    id?: StringFilter<"AICostBudget"> | string
    tenantId?: StringFilter<"AICostBudget"> | string
    monthlyTokenBudget?: IntFilter<"AICostBudget"> | number
    monthlyCostBudget?: FloatFilter<"AICostBudget"> | number
    softLimitPercentage?: IntFilter<"AICostBudget"> | number
    hardLimitPercentage?: IntFilter<"AICostBudget"> | number
    currentTokensUsed?: IntFilter<"AICostBudget"> | number
    currentCostUsed?: FloatFilter<"AICostBudget"> | number
    periodStart?: DateTimeFilter<"AICostBudget"> | Date | string
    periodEnd?: DateTimeFilter<"AICostBudget"> | Date | string
    createdAt?: DateTimeFilter<"AICostBudget"> | Date | string
    updatedAt?: DateTimeFilter<"AICostBudget"> | Date | string
  }

  export type AICostBudgetOrderByWithRelationInput = {
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

  export type AICostBudgetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId?: string
    AND?: AICostBudgetWhereInput | AICostBudgetWhereInput[]
    OR?: AICostBudgetWhereInput[]
    NOT?: AICostBudgetWhereInput | AICostBudgetWhereInput[]
    monthlyTokenBudget?: IntFilter<"AICostBudget"> | number
    monthlyCostBudget?: FloatFilter<"AICostBudget"> | number
    softLimitPercentage?: IntFilter<"AICostBudget"> | number
    hardLimitPercentage?: IntFilter<"AICostBudget"> | number
    currentTokensUsed?: IntFilter<"AICostBudget"> | number
    currentCostUsed?: FloatFilter<"AICostBudget"> | number
    periodStart?: DateTimeFilter<"AICostBudget"> | Date | string
    periodEnd?: DateTimeFilter<"AICostBudget"> | Date | string
    createdAt?: DateTimeFilter<"AICostBudget"> | Date | string
    updatedAt?: DateTimeFilter<"AICostBudget"> | Date | string
  }, "id" | "tenantId">

  export type AICostBudgetOrderByWithAggregationInput = {
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
    _count?: AICostBudgetCountOrderByAggregateInput
    _avg?: AICostBudgetAvgOrderByAggregateInput
    _max?: AICostBudgetMaxOrderByAggregateInput
    _min?: AICostBudgetMinOrderByAggregateInput
    _sum?: AICostBudgetSumOrderByAggregateInput
  }

  export type AICostBudgetScalarWhereWithAggregatesInput = {
    AND?: AICostBudgetScalarWhereWithAggregatesInput | AICostBudgetScalarWhereWithAggregatesInput[]
    OR?: AICostBudgetScalarWhereWithAggregatesInput[]
    NOT?: AICostBudgetScalarWhereWithAggregatesInput | AICostBudgetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AICostBudget"> | string
    tenantId?: StringWithAggregatesFilter<"AICostBudget"> | string
    monthlyTokenBudget?: IntWithAggregatesFilter<"AICostBudget"> | number
    monthlyCostBudget?: FloatWithAggregatesFilter<"AICostBudget"> | number
    softLimitPercentage?: IntWithAggregatesFilter<"AICostBudget"> | number
    hardLimitPercentage?: IntWithAggregatesFilter<"AICostBudget"> | number
    currentTokensUsed?: IntWithAggregatesFilter<"AICostBudget"> | number
    currentCostUsed?: FloatWithAggregatesFilter<"AICostBudget"> | number
    periodStart?: DateTimeWithAggregatesFilter<"AICostBudget"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"AICostBudget"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AICostBudget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AICostBudget"> | Date | string
  }

  export type AICostUsageEventWhereInput = {
    AND?: AICostUsageEventWhereInput | AICostUsageEventWhereInput[]
    OR?: AICostUsageEventWhereInput[]
    NOT?: AICostUsageEventWhereInput | AICostUsageEventWhereInput[]
    id?: StringFilter<"AICostUsageEvent"> | string
    tenantId?: StringFilter<"AICostUsageEvent"> | string
    modelId?: StringNullableFilter<"AICostUsageEvent"> | string | null
    feature?: StringNullableFilter<"AICostUsageEvent"> | string | null
    tokensPrompt?: IntFilter<"AICostUsageEvent"> | number
    tokensCompletion?: IntFilter<"AICostUsageEvent"> | number
    cost?: FloatFilter<"AICostUsageEvent"> | number
    timestamp?: DateTimeFilter<"AICostUsageEvent"> | Date | string
    metadata?: JsonFilter<"AICostUsageEvent">
  }

  export type AICostUsageEventOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrderInput | SortOrder
    feature?: SortOrderInput | SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrder
  }

  export type AICostUsageEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AICostUsageEventWhereInput | AICostUsageEventWhereInput[]
    OR?: AICostUsageEventWhereInput[]
    NOT?: AICostUsageEventWhereInput | AICostUsageEventWhereInput[]
    tenantId?: StringFilter<"AICostUsageEvent"> | string
    modelId?: StringNullableFilter<"AICostUsageEvent"> | string | null
    feature?: StringNullableFilter<"AICostUsageEvent"> | string | null
    tokensPrompt?: IntFilter<"AICostUsageEvent"> | number
    tokensCompletion?: IntFilter<"AICostUsageEvent"> | number
    cost?: FloatFilter<"AICostUsageEvent"> | number
    timestamp?: DateTimeFilter<"AICostUsageEvent"> | Date | string
    metadata?: JsonFilter<"AICostUsageEvent">
  }, "id">

  export type AICostUsageEventOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrderInput | SortOrder
    feature?: SortOrderInput | SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrder
    _count?: AICostUsageEventCountOrderByAggregateInput
    _avg?: AICostUsageEventAvgOrderByAggregateInput
    _max?: AICostUsageEventMaxOrderByAggregateInput
    _min?: AICostUsageEventMinOrderByAggregateInput
    _sum?: AICostUsageEventSumOrderByAggregateInput
  }

  export type AICostUsageEventScalarWhereWithAggregatesInput = {
    AND?: AICostUsageEventScalarWhereWithAggregatesInput | AICostUsageEventScalarWhereWithAggregatesInput[]
    OR?: AICostUsageEventScalarWhereWithAggregatesInput[]
    NOT?: AICostUsageEventScalarWhereWithAggregatesInput | AICostUsageEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AICostUsageEvent"> | string
    tenantId?: StringWithAggregatesFilter<"AICostUsageEvent"> | string
    modelId?: StringNullableWithAggregatesFilter<"AICostUsageEvent"> | string | null
    feature?: StringNullableWithAggregatesFilter<"AICostUsageEvent"> | string | null
    tokensPrompt?: IntWithAggregatesFilter<"AICostUsageEvent"> | number
    tokensCompletion?: IntWithAggregatesFilter<"AICostUsageEvent"> | number
    cost?: FloatWithAggregatesFilter<"AICostUsageEvent"> | number
    timestamp?: DateTimeWithAggregatesFilter<"AICostUsageEvent"> | Date | string
    metadata?: JsonWithAggregatesFilter<"AICostUsageEvent">
  }

  export type AICostProfileCreateInput = {
    id?: string
    modelId: string
    provider: string
    pricing: JsonNullValueInput | InputJsonValue
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AICostProfileUncheckedCreateInput = {
    id?: string
    modelId: string
    provider: string
    pricing: JsonNullValueInput | InputJsonValue
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AICostProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    pricing?: JsonNullValueInput | InputJsonValue
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AICostProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    pricing?: JsonNullValueInput | InputJsonValue
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AICostProfileCreateManyInput = {
    id?: string
    modelId: string
    provider: string
    pricing: JsonNullValueInput | InputJsonValue
    effectiveFrom?: Date | string
    effectiveTo?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AICostProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    pricing?: JsonNullValueInput | InputJsonValue
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AICostProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    pricing?: JsonNullValueInput | InputJsonValue
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AICostUsageAggregateCreateInput = {
    id?: string
    tenantId: string
    period: string
    periodStart: Date | string
    periodEnd: Date | string
    totalTokensPrompt?: number
    totalTokensCompletion?: number
    totalCost?: number
    breakdownByModel?: JsonNullValueInput | InputJsonValue
    breakdownByFeature?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AICostUsageAggregateUncheckedCreateInput = {
    id?: string
    tenantId: string
    period: string
    periodStart: Date | string
    periodEnd: Date | string
    totalTokensPrompt?: number
    totalTokensCompletion?: number
    totalCost?: number
    breakdownByModel?: JsonNullValueInput | InputJsonValue
    breakdownByFeature?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AICostUsageAggregateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalTokensPrompt?: IntFieldUpdateOperationsInput | number
    totalTokensCompletion?: IntFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    breakdownByModel?: JsonNullValueInput | InputJsonValue
    breakdownByFeature?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AICostUsageAggregateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalTokensPrompt?: IntFieldUpdateOperationsInput | number
    totalTokensCompletion?: IntFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    breakdownByModel?: JsonNullValueInput | InputJsonValue
    breakdownByFeature?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AICostUsageAggregateCreateManyInput = {
    id?: string
    tenantId: string
    period: string
    periodStart: Date | string
    periodEnd: Date | string
    totalTokensPrompt?: number
    totalTokensCompletion?: number
    totalCost?: number
    breakdownByModel?: JsonNullValueInput | InputJsonValue
    breakdownByFeature?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AICostUsageAggregateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalTokensPrompt?: IntFieldUpdateOperationsInput | number
    totalTokensCompletion?: IntFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    breakdownByModel?: JsonNullValueInput | InputJsonValue
    breakdownByFeature?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AICostUsageAggregateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalTokensPrompt?: IntFieldUpdateOperationsInput | number
    totalTokensCompletion?: IntFieldUpdateOperationsInput | number
    totalCost?: FloatFieldUpdateOperationsInput | number
    breakdownByModel?: JsonNullValueInput | InputJsonValue
    breakdownByFeature?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AICostAlertCreateInput = {
    id?: string
    tenantId: string
    type: string
    severity: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AICostAlertUncheckedCreateInput = {
    id?: string
    tenantId: string
    type: string
    severity: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AICostAlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AICostAlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AICostAlertCreateManyInput = {
    id?: string
    tenantId: string
    type: string
    severity: string
    message: string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type AICostAlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AICostAlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AICostBudgetCreateInput = {
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

  export type AICostBudgetUncheckedCreateInput = {
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

  export type AICostBudgetUpdateInput = {
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

  export type AICostBudgetUncheckedUpdateInput = {
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

  export type AICostBudgetCreateManyInput = {
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

  export type AICostBudgetUpdateManyMutationInput = {
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

  export type AICostBudgetUncheckedUpdateManyInput = {
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

  export type AICostUsageEventCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    feature?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AICostUsageEventUncheckedCreateInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    feature?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AICostUsageEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    feature?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AICostUsageEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    feature?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AICostUsageEventCreateManyInput = {
    id?: string
    tenantId: string
    modelId?: string | null
    feature?: string | null
    tokensPrompt?: number
    tokensCompletion?: number
    cost?: number
    timestamp?: Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AICostUsageEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    feature?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type AICostUsageEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    modelId?: NullableStringFieldUpdateOperationsInput | string | null
    feature?: NullableStringFieldUpdateOperationsInput | string | null
    tokensPrompt?: IntFieldUpdateOperationsInput | number
    tokensCompletion?: IntFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AICostProfileCountOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    provider?: SortOrder
    pricing?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AICostProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    provider?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AICostProfileMinOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    provider?: SortOrder
    effectiveFrom?: SortOrder
    effectiveTo?: SortOrder
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

  export type AICostUsageAggregateTenantIdPeriodPeriodStartCompoundUniqueInput = {
    tenantId: string
    period: string
    periodStart: Date | string
  }

  export type AICostUsageAggregateCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    period?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalTokensPrompt?: SortOrder
    totalTokensCompletion?: SortOrder
    totalCost?: SortOrder
    breakdownByModel?: SortOrder
    breakdownByFeature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AICostUsageAggregateAvgOrderByAggregateInput = {
    totalTokensPrompt?: SortOrder
    totalTokensCompletion?: SortOrder
    totalCost?: SortOrder
  }

  export type AICostUsageAggregateMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    period?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalTokensPrompt?: SortOrder
    totalTokensCompletion?: SortOrder
    totalCost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AICostUsageAggregateMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    period?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    totalTokensPrompt?: SortOrder
    totalTokensCompletion?: SortOrder
    totalCost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AICostUsageAggregateSumOrderByAggregateInput = {
    totalTokensPrompt?: SortOrder
    totalTokensCompletion?: SortOrder
    totalCost?: SortOrder
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

  export type AICostAlertCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AICostAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AICostAlertMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    type?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type AICostBudgetCountOrderByAggregateInput = {
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

  export type AICostBudgetAvgOrderByAggregateInput = {
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
  }

  export type AICostBudgetMaxOrderByAggregateInput = {
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

  export type AICostBudgetMinOrderByAggregateInput = {
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

  export type AICostBudgetSumOrderByAggregateInput = {
    monthlyTokenBudget?: SortOrder
    monthlyCostBudget?: SortOrder
    softLimitPercentage?: SortOrder
    hardLimitPercentage?: SortOrder
    currentTokensUsed?: SortOrder
    currentCostUsed?: SortOrder
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

  export type AICostUsageEventCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    feature?: SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrder
  }

  export type AICostUsageEventAvgOrderByAggregateInput = {
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
  }

  export type AICostUsageEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    feature?: SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    timestamp?: SortOrder
  }

  export type AICostUsageEventMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    modelId?: SortOrder
    feature?: SortOrder
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
    timestamp?: SortOrder
  }

  export type AICostUsageEventSumOrderByAggregateInput = {
    tokensPrompt?: SortOrder
    tokensCompletion?: SortOrder
    cost?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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