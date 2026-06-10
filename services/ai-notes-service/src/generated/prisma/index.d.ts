
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
 * Model AiUsageLog
 * 
 */
export type AiUsageLog = $Result.DefaultSelection<Prisma.$AiUsageLogPayload>
/**
 * Model AiOutputRecord
 * 
 */
export type AiOutputRecord = $Result.DefaultSelection<Prisma.$AiOutputRecordPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AiUsageLogs
 * const aiUsageLogs = await prisma.aiUsageLog.findMany()
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
   * // Fetch zero or more AiUsageLogs
   * const aiUsageLogs = await prisma.aiUsageLog.findMany()
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
   * `prisma.aiUsageLog`: Exposes CRUD operations for the **AiUsageLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiUsageLogs
    * const aiUsageLogs = await prisma.aiUsageLog.findMany()
    * ```
    */
  get aiUsageLog(): Prisma.AiUsageLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiOutputRecord`: Exposes CRUD operations for the **AiOutputRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiOutputRecords
    * const aiOutputRecords = await prisma.aiOutputRecord.findMany()
    * ```
    */
  get aiOutputRecord(): Prisma.AiOutputRecordDelegate<ExtArgs, ClientOptions>;
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
    AiUsageLog: 'AiUsageLog',
    AiOutputRecord: 'AiOutputRecord'
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
      modelProps: "aiUsageLog" | "aiOutputRecord"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AiUsageLog: {
        payload: Prisma.$AiUsageLogPayload<ExtArgs>
        fields: Prisma.AiUsageLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiUsageLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiUsageLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>
          }
          findFirst: {
            args: Prisma.AiUsageLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiUsageLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>
          }
          findMany: {
            args: Prisma.AiUsageLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>[]
          }
          create: {
            args: Prisma.AiUsageLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>
          }
          createMany: {
            args: Prisma.AiUsageLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiUsageLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>[]
          }
          delete: {
            args: Prisma.AiUsageLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>
          }
          update: {
            args: Prisma.AiUsageLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>
          }
          deleteMany: {
            args: Prisma.AiUsageLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiUsageLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiUsageLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>[]
          }
          upsert: {
            args: Prisma.AiUsageLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiUsageLogPayload>
          }
          aggregate: {
            args: Prisma.AiUsageLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiUsageLog>
          }
          groupBy: {
            args: Prisma.AiUsageLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiUsageLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiUsageLogCountArgs<ExtArgs>
            result: $Utils.Optional<AiUsageLogCountAggregateOutputType> | number
          }
        }
      }
      AiOutputRecord: {
        payload: Prisma.$AiOutputRecordPayload<ExtArgs>
        fields: Prisma.AiOutputRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiOutputRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiOutputRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>
          }
          findFirst: {
            args: Prisma.AiOutputRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiOutputRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>
          }
          findMany: {
            args: Prisma.AiOutputRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>[]
          }
          create: {
            args: Prisma.AiOutputRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>
          }
          createMany: {
            args: Prisma.AiOutputRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiOutputRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>[]
          }
          delete: {
            args: Prisma.AiOutputRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>
          }
          update: {
            args: Prisma.AiOutputRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>
          }
          deleteMany: {
            args: Prisma.AiOutputRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiOutputRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiOutputRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>[]
          }
          upsert: {
            args: Prisma.AiOutputRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiOutputRecordPayload>
          }
          aggregate: {
            args: Prisma.AiOutputRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiOutputRecord>
          }
          groupBy: {
            args: Prisma.AiOutputRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiOutputRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiOutputRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AiOutputRecordCountAggregateOutputType> | number
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
    aiUsageLog?: AiUsageLogOmit
    aiOutputRecord?: AiOutputRecordOmit
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
   * Model AiUsageLog
   */

  export type AggregateAiUsageLog = {
    _count: AiUsageLogCountAggregateOutputType | null
    _avg: AiUsageLogAvgAggregateOutputType | null
    _sum: AiUsageLogSumAggregateOutputType | null
    _min: AiUsageLogMinAggregateOutputType | null
    _max: AiUsageLogMaxAggregateOutputType | null
  }

  export type AiUsageLogAvgAggregateOutputType = {
    promptTokens: number | null
    completionTokens: number | null
    totalTokens: number | null
  }

  export type AiUsageLogSumAggregateOutputType = {
    promptTokens: number | null
    completionTokens: number | null
    totalTokens: number | null
  }

  export type AiUsageLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    operation: string | null
    modelName: string | null
    promptTokens: number | null
    completionTokens: number | null
    totalTokens: number | null
    createdAt: Date | null
  }

  export type AiUsageLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    operation: string | null
    modelName: string | null
    promptTokens: number | null
    completionTokens: number | null
    totalTokens: number | null
    createdAt: Date | null
  }

  export type AiUsageLogCountAggregateOutputType = {
    id: number
    tenantId: number
    userId: number
    operation: number
    modelName: number
    promptTokens: number
    completionTokens: number
    totalTokens: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AiUsageLogAvgAggregateInputType = {
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
  }

  export type AiUsageLogSumAggregateInputType = {
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
  }

  export type AiUsageLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    operation?: true
    modelName?: true
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
    createdAt?: true
  }

  export type AiUsageLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    operation?: true
    modelName?: true
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
    createdAt?: true
  }

  export type AiUsageLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    operation?: true
    modelName?: true
    promptTokens?: true
    completionTokens?: true
    totalTokens?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AiUsageLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiUsageLog to aggregate.
     */
    where?: AiUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiUsageLogs to fetch.
     */
    orderBy?: AiUsageLogOrderByWithRelationInput | AiUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiUsageLogs
    **/
    _count?: true | AiUsageLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiUsageLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiUsageLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiUsageLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiUsageLogMaxAggregateInputType
  }

  export type GetAiUsageLogAggregateType<T extends AiUsageLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAiUsageLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiUsageLog[P]>
      : GetScalarType<T[P], AggregateAiUsageLog[P]>
  }




  export type AiUsageLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiUsageLogWhereInput
    orderBy?: AiUsageLogOrderByWithAggregationInput | AiUsageLogOrderByWithAggregationInput[]
    by: AiUsageLogScalarFieldEnum[] | AiUsageLogScalarFieldEnum
    having?: AiUsageLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiUsageLogCountAggregateInputType | true
    _avg?: AiUsageLogAvgAggregateInputType
    _sum?: AiUsageLogSumAggregateInputType
    _min?: AiUsageLogMinAggregateInputType
    _max?: AiUsageLogMaxAggregateInputType
  }

  export type AiUsageLogGroupByOutputType = {
    id: string
    tenantId: string
    userId: string
    operation: string
    modelName: string
    promptTokens: number
    completionTokens: number
    totalTokens: number
    metadata: JsonValue | null
    createdAt: Date
    _count: AiUsageLogCountAggregateOutputType | null
    _avg: AiUsageLogAvgAggregateOutputType | null
    _sum: AiUsageLogSumAggregateOutputType | null
    _min: AiUsageLogMinAggregateOutputType | null
    _max: AiUsageLogMaxAggregateOutputType | null
  }

  type GetAiUsageLogGroupByPayload<T extends AiUsageLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiUsageLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiUsageLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiUsageLogGroupByOutputType[P]>
            : GetScalarType<T[P], AiUsageLogGroupByOutputType[P]>
        }
      >
    >


  export type AiUsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    operation?: boolean
    modelName?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    totalTokens?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiUsageLog"]>

  export type AiUsageLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    operation?: boolean
    modelName?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    totalTokens?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiUsageLog"]>

  export type AiUsageLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    operation?: boolean
    modelName?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    totalTokens?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiUsageLog"]>

  export type AiUsageLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    operation?: boolean
    modelName?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    totalTokens?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AiUsageLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "userId" | "operation" | "modelName" | "promptTokens" | "completionTokens" | "totalTokens" | "metadata" | "createdAt", ExtArgs["result"]["aiUsageLog"]>

  export type $AiUsageLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiUsageLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      userId: string
      operation: string
      modelName: string
      promptTokens: number
      completionTokens: number
      totalTokens: number
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["aiUsageLog"]>
    composites: {}
  }

  type AiUsageLogGetPayload<S extends boolean | null | undefined | AiUsageLogDefaultArgs> = $Result.GetResult<Prisma.$AiUsageLogPayload, S>

  type AiUsageLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiUsageLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiUsageLogCountAggregateInputType | true
    }

  export interface AiUsageLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiUsageLog'], meta: { name: 'AiUsageLog' } }
    /**
     * Find zero or one AiUsageLog that matches the filter.
     * @param {AiUsageLogFindUniqueArgs} args - Arguments to find a AiUsageLog
     * @example
     * // Get one AiUsageLog
     * const aiUsageLog = await prisma.aiUsageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiUsageLogFindUniqueArgs>(args: SelectSubset<T, AiUsageLogFindUniqueArgs<ExtArgs>>): Prisma__AiUsageLogClient<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiUsageLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiUsageLogFindUniqueOrThrowArgs} args - Arguments to find a AiUsageLog
     * @example
     * // Get one AiUsageLog
     * const aiUsageLog = await prisma.aiUsageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiUsageLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AiUsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiUsageLogClient<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiUsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiUsageLogFindFirstArgs} args - Arguments to find a AiUsageLog
     * @example
     * // Get one AiUsageLog
     * const aiUsageLog = await prisma.aiUsageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiUsageLogFindFirstArgs>(args?: SelectSubset<T, AiUsageLogFindFirstArgs<ExtArgs>>): Prisma__AiUsageLogClient<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiUsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiUsageLogFindFirstOrThrowArgs} args - Arguments to find a AiUsageLog
     * @example
     * // Get one AiUsageLog
     * const aiUsageLog = await prisma.aiUsageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiUsageLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AiUsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiUsageLogClient<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiUsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiUsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiUsageLogs
     * const aiUsageLogs = await prisma.aiUsageLog.findMany()
     * 
     * // Get first 10 AiUsageLogs
     * const aiUsageLogs = await prisma.aiUsageLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiUsageLogWithIdOnly = await prisma.aiUsageLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiUsageLogFindManyArgs>(args?: SelectSubset<T, AiUsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiUsageLog.
     * @param {AiUsageLogCreateArgs} args - Arguments to create a AiUsageLog.
     * @example
     * // Create one AiUsageLog
     * const AiUsageLog = await prisma.aiUsageLog.create({
     *   data: {
     *     // ... data to create a AiUsageLog
     *   }
     * })
     * 
     */
    create<T extends AiUsageLogCreateArgs>(args: SelectSubset<T, AiUsageLogCreateArgs<ExtArgs>>): Prisma__AiUsageLogClient<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiUsageLogs.
     * @param {AiUsageLogCreateManyArgs} args - Arguments to create many AiUsageLogs.
     * @example
     * // Create many AiUsageLogs
     * const aiUsageLog = await prisma.aiUsageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiUsageLogCreateManyArgs>(args?: SelectSubset<T, AiUsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiUsageLogs and returns the data saved in the database.
     * @param {AiUsageLogCreateManyAndReturnArgs} args - Arguments to create many AiUsageLogs.
     * @example
     * // Create many AiUsageLogs
     * const aiUsageLog = await prisma.aiUsageLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiUsageLogs and only return the `id`
     * const aiUsageLogWithIdOnly = await prisma.aiUsageLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiUsageLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AiUsageLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiUsageLog.
     * @param {AiUsageLogDeleteArgs} args - Arguments to delete one AiUsageLog.
     * @example
     * // Delete one AiUsageLog
     * const AiUsageLog = await prisma.aiUsageLog.delete({
     *   where: {
     *     // ... filter to delete one AiUsageLog
     *   }
     * })
     * 
     */
    delete<T extends AiUsageLogDeleteArgs>(args: SelectSubset<T, AiUsageLogDeleteArgs<ExtArgs>>): Prisma__AiUsageLogClient<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiUsageLog.
     * @param {AiUsageLogUpdateArgs} args - Arguments to update one AiUsageLog.
     * @example
     * // Update one AiUsageLog
     * const aiUsageLog = await prisma.aiUsageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiUsageLogUpdateArgs>(args: SelectSubset<T, AiUsageLogUpdateArgs<ExtArgs>>): Prisma__AiUsageLogClient<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiUsageLogs.
     * @param {AiUsageLogDeleteManyArgs} args - Arguments to filter AiUsageLogs to delete.
     * @example
     * // Delete a few AiUsageLogs
     * const { count } = await prisma.aiUsageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiUsageLogDeleteManyArgs>(args?: SelectSubset<T, AiUsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiUsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiUsageLogs
     * const aiUsageLog = await prisma.aiUsageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiUsageLogUpdateManyArgs>(args: SelectSubset<T, AiUsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiUsageLogs and returns the data updated in the database.
     * @param {AiUsageLogUpdateManyAndReturnArgs} args - Arguments to update many AiUsageLogs.
     * @example
     * // Update many AiUsageLogs
     * const aiUsageLog = await prisma.aiUsageLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiUsageLogs and only return the `id`
     * const aiUsageLogWithIdOnly = await prisma.aiUsageLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AiUsageLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AiUsageLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiUsageLog.
     * @param {AiUsageLogUpsertArgs} args - Arguments to update or create a AiUsageLog.
     * @example
     * // Update or create a AiUsageLog
     * const aiUsageLog = await prisma.aiUsageLog.upsert({
     *   create: {
     *     // ... data to create a AiUsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiUsageLog we want to update
     *   }
     * })
     */
    upsert<T extends AiUsageLogUpsertArgs>(args: SelectSubset<T, AiUsageLogUpsertArgs<ExtArgs>>): Prisma__AiUsageLogClient<$Result.GetResult<Prisma.$AiUsageLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiUsageLogCountArgs} args - Arguments to filter AiUsageLogs to count.
     * @example
     * // Count the number of AiUsageLogs
     * const count = await prisma.aiUsageLog.count({
     *   where: {
     *     // ... the filter for the AiUsageLogs we want to count
     *   }
     * })
    **/
    count<T extends AiUsageLogCountArgs>(
      args?: Subset<T, AiUsageLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiUsageLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiUsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AiUsageLogAggregateArgs>(args: Subset<T, AiUsageLogAggregateArgs>): Prisma.PrismaPromise<GetAiUsageLogAggregateType<T>>

    /**
     * Group by AiUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiUsageLogGroupByArgs} args - Group by arguments.
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
      T extends AiUsageLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiUsageLogGroupByArgs['orderBy'] }
        : { orderBy?: AiUsageLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AiUsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiUsageLog model
   */
  readonly fields: AiUsageLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiUsageLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiUsageLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AiUsageLog model
   */
  interface AiUsageLogFieldRefs {
    readonly id: FieldRef<"AiUsageLog", 'String'>
    readonly tenantId: FieldRef<"AiUsageLog", 'String'>
    readonly userId: FieldRef<"AiUsageLog", 'String'>
    readonly operation: FieldRef<"AiUsageLog", 'String'>
    readonly modelName: FieldRef<"AiUsageLog", 'String'>
    readonly promptTokens: FieldRef<"AiUsageLog", 'Int'>
    readonly completionTokens: FieldRef<"AiUsageLog", 'Int'>
    readonly totalTokens: FieldRef<"AiUsageLog", 'Int'>
    readonly metadata: FieldRef<"AiUsageLog", 'Json'>
    readonly createdAt: FieldRef<"AiUsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiUsageLog findUnique
   */
  export type AiUsageLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * Filter, which AiUsageLog to fetch.
     */
    where: AiUsageLogWhereUniqueInput
  }

  /**
   * AiUsageLog findUniqueOrThrow
   */
  export type AiUsageLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * Filter, which AiUsageLog to fetch.
     */
    where: AiUsageLogWhereUniqueInput
  }

  /**
   * AiUsageLog findFirst
   */
  export type AiUsageLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * Filter, which AiUsageLog to fetch.
     */
    where?: AiUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiUsageLogs to fetch.
     */
    orderBy?: AiUsageLogOrderByWithRelationInput | AiUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiUsageLogs.
     */
    cursor?: AiUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiUsageLogs.
     */
    distinct?: AiUsageLogScalarFieldEnum | AiUsageLogScalarFieldEnum[]
  }

  /**
   * AiUsageLog findFirstOrThrow
   */
  export type AiUsageLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * Filter, which AiUsageLog to fetch.
     */
    where?: AiUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiUsageLogs to fetch.
     */
    orderBy?: AiUsageLogOrderByWithRelationInput | AiUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiUsageLogs.
     */
    cursor?: AiUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiUsageLogs.
     */
    distinct?: AiUsageLogScalarFieldEnum | AiUsageLogScalarFieldEnum[]
  }

  /**
   * AiUsageLog findMany
   */
  export type AiUsageLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * Filter, which AiUsageLogs to fetch.
     */
    where?: AiUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiUsageLogs to fetch.
     */
    orderBy?: AiUsageLogOrderByWithRelationInput | AiUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiUsageLogs.
     */
    cursor?: AiUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiUsageLogs.
     */
    skip?: number
    distinct?: AiUsageLogScalarFieldEnum | AiUsageLogScalarFieldEnum[]
  }

  /**
   * AiUsageLog create
   */
  export type AiUsageLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AiUsageLog.
     */
    data: XOR<AiUsageLogCreateInput, AiUsageLogUncheckedCreateInput>
  }

  /**
   * AiUsageLog createMany
   */
  export type AiUsageLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiUsageLogs.
     */
    data: AiUsageLogCreateManyInput | AiUsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiUsageLog createManyAndReturn
   */
  export type AiUsageLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * The data used to create many AiUsageLogs.
     */
    data: AiUsageLogCreateManyInput | AiUsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiUsageLog update
   */
  export type AiUsageLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AiUsageLog.
     */
    data: XOR<AiUsageLogUpdateInput, AiUsageLogUncheckedUpdateInput>
    /**
     * Choose, which AiUsageLog to update.
     */
    where: AiUsageLogWhereUniqueInput
  }

  /**
   * AiUsageLog updateMany
   */
  export type AiUsageLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiUsageLogs.
     */
    data: XOR<AiUsageLogUpdateManyMutationInput, AiUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which AiUsageLogs to update
     */
    where?: AiUsageLogWhereInput
    /**
     * Limit how many AiUsageLogs to update.
     */
    limit?: number
  }

  /**
   * AiUsageLog updateManyAndReturn
   */
  export type AiUsageLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * The data used to update AiUsageLogs.
     */
    data: XOR<AiUsageLogUpdateManyMutationInput, AiUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which AiUsageLogs to update
     */
    where?: AiUsageLogWhereInput
    /**
     * Limit how many AiUsageLogs to update.
     */
    limit?: number
  }

  /**
   * AiUsageLog upsert
   */
  export type AiUsageLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AiUsageLog to update in case it exists.
     */
    where: AiUsageLogWhereUniqueInput
    /**
     * In case the AiUsageLog found by the `where` argument doesn't exist, create a new AiUsageLog with this data.
     */
    create: XOR<AiUsageLogCreateInput, AiUsageLogUncheckedCreateInput>
    /**
     * In case the AiUsageLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiUsageLogUpdateInput, AiUsageLogUncheckedUpdateInput>
  }

  /**
   * AiUsageLog delete
   */
  export type AiUsageLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
    /**
     * Filter which AiUsageLog to delete.
     */
    where: AiUsageLogWhereUniqueInput
  }

  /**
   * AiUsageLog deleteMany
   */
  export type AiUsageLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiUsageLogs to delete
     */
    where?: AiUsageLogWhereInput
    /**
     * Limit how many AiUsageLogs to delete.
     */
    limit?: number
  }

  /**
   * AiUsageLog without action
   */
  export type AiUsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiUsageLog
     */
    select?: AiUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiUsageLog
     */
    omit?: AiUsageLogOmit<ExtArgs> | null
  }


  /**
   * Model AiOutputRecord
   */

  export type AggregateAiOutputRecord = {
    _count: AiOutputRecordCountAggregateOutputType | null
    _min: AiOutputRecordMinAggregateOutputType | null
    _max: AiOutputRecordMaxAggregateOutputType | null
  }

  export type AiOutputRecordMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    operation: string | null
    patientId: string | null
    appointmentId: string | null
    therapistId: string | null
    inputSummary: string | null
    accepted: boolean | null
    createdAt: Date | null
  }

  export type AiOutputRecordMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    operation: string | null
    patientId: string | null
    appointmentId: string | null
    therapistId: string | null
    inputSummary: string | null
    accepted: boolean | null
    createdAt: Date | null
  }

  export type AiOutputRecordCountAggregateOutputType = {
    id: number
    tenantId: number
    userId: number
    operation: number
    patientId: number
    appointmentId: number
    therapistId: number
    inputSummary: number
    output: number
    accepted: number
    createdAt: number
    _all: number
  }


  export type AiOutputRecordMinAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    operation?: true
    patientId?: true
    appointmentId?: true
    therapistId?: true
    inputSummary?: true
    accepted?: true
    createdAt?: true
  }

  export type AiOutputRecordMaxAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    operation?: true
    patientId?: true
    appointmentId?: true
    therapistId?: true
    inputSummary?: true
    accepted?: true
    createdAt?: true
  }

  export type AiOutputRecordCountAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    operation?: true
    patientId?: true
    appointmentId?: true
    therapistId?: true
    inputSummary?: true
    output?: true
    accepted?: true
    createdAt?: true
    _all?: true
  }

  export type AiOutputRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiOutputRecord to aggregate.
     */
    where?: AiOutputRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiOutputRecords to fetch.
     */
    orderBy?: AiOutputRecordOrderByWithRelationInput | AiOutputRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiOutputRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiOutputRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiOutputRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiOutputRecords
    **/
    _count?: true | AiOutputRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiOutputRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiOutputRecordMaxAggregateInputType
  }

  export type GetAiOutputRecordAggregateType<T extends AiOutputRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAiOutputRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiOutputRecord[P]>
      : GetScalarType<T[P], AggregateAiOutputRecord[P]>
  }




  export type AiOutputRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiOutputRecordWhereInput
    orderBy?: AiOutputRecordOrderByWithAggregationInput | AiOutputRecordOrderByWithAggregationInput[]
    by: AiOutputRecordScalarFieldEnum[] | AiOutputRecordScalarFieldEnum
    having?: AiOutputRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiOutputRecordCountAggregateInputType | true
    _min?: AiOutputRecordMinAggregateInputType
    _max?: AiOutputRecordMaxAggregateInputType
  }

  export type AiOutputRecordGroupByOutputType = {
    id: string
    tenantId: string
    userId: string
    operation: string
    patientId: string | null
    appointmentId: string | null
    therapistId: string | null
    inputSummary: string | null
    output: JsonValue
    accepted: boolean | null
    createdAt: Date
    _count: AiOutputRecordCountAggregateOutputType | null
    _min: AiOutputRecordMinAggregateOutputType | null
    _max: AiOutputRecordMaxAggregateOutputType | null
  }

  type GetAiOutputRecordGroupByPayload<T extends AiOutputRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiOutputRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiOutputRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiOutputRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AiOutputRecordGroupByOutputType[P]>
        }
      >
    >


  export type AiOutputRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    operation?: boolean
    patientId?: boolean
    appointmentId?: boolean
    therapistId?: boolean
    inputSummary?: boolean
    output?: boolean
    accepted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiOutputRecord"]>

  export type AiOutputRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    operation?: boolean
    patientId?: boolean
    appointmentId?: boolean
    therapistId?: boolean
    inputSummary?: boolean
    output?: boolean
    accepted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiOutputRecord"]>

  export type AiOutputRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    operation?: boolean
    patientId?: boolean
    appointmentId?: boolean
    therapistId?: boolean
    inputSummary?: boolean
    output?: boolean
    accepted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiOutputRecord"]>

  export type AiOutputRecordSelectScalar = {
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    operation?: boolean
    patientId?: boolean
    appointmentId?: boolean
    therapistId?: boolean
    inputSummary?: boolean
    output?: boolean
    accepted?: boolean
    createdAt?: boolean
  }

  export type AiOutputRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "userId" | "operation" | "patientId" | "appointmentId" | "therapistId" | "inputSummary" | "output" | "accepted" | "createdAt", ExtArgs["result"]["aiOutputRecord"]>

  export type $AiOutputRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiOutputRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      userId: string
      operation: string
      patientId: string | null
      appointmentId: string | null
      therapistId: string | null
      inputSummary: string | null
      output: Prisma.JsonValue
      accepted: boolean | null
      createdAt: Date
    }, ExtArgs["result"]["aiOutputRecord"]>
    composites: {}
  }

  type AiOutputRecordGetPayload<S extends boolean | null | undefined | AiOutputRecordDefaultArgs> = $Result.GetResult<Prisma.$AiOutputRecordPayload, S>

  type AiOutputRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiOutputRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiOutputRecordCountAggregateInputType | true
    }

  export interface AiOutputRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiOutputRecord'], meta: { name: 'AiOutputRecord' } }
    /**
     * Find zero or one AiOutputRecord that matches the filter.
     * @param {AiOutputRecordFindUniqueArgs} args - Arguments to find a AiOutputRecord
     * @example
     * // Get one AiOutputRecord
     * const aiOutputRecord = await prisma.aiOutputRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiOutputRecordFindUniqueArgs>(args: SelectSubset<T, AiOutputRecordFindUniqueArgs<ExtArgs>>): Prisma__AiOutputRecordClient<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiOutputRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiOutputRecordFindUniqueOrThrowArgs} args - Arguments to find a AiOutputRecord
     * @example
     * // Get one AiOutputRecord
     * const aiOutputRecord = await prisma.aiOutputRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiOutputRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AiOutputRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiOutputRecordClient<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiOutputRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiOutputRecordFindFirstArgs} args - Arguments to find a AiOutputRecord
     * @example
     * // Get one AiOutputRecord
     * const aiOutputRecord = await prisma.aiOutputRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiOutputRecordFindFirstArgs>(args?: SelectSubset<T, AiOutputRecordFindFirstArgs<ExtArgs>>): Prisma__AiOutputRecordClient<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiOutputRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiOutputRecordFindFirstOrThrowArgs} args - Arguments to find a AiOutputRecord
     * @example
     * // Get one AiOutputRecord
     * const aiOutputRecord = await prisma.aiOutputRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiOutputRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AiOutputRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiOutputRecordClient<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiOutputRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiOutputRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiOutputRecords
     * const aiOutputRecords = await prisma.aiOutputRecord.findMany()
     * 
     * // Get first 10 AiOutputRecords
     * const aiOutputRecords = await prisma.aiOutputRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiOutputRecordWithIdOnly = await prisma.aiOutputRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiOutputRecordFindManyArgs>(args?: SelectSubset<T, AiOutputRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiOutputRecord.
     * @param {AiOutputRecordCreateArgs} args - Arguments to create a AiOutputRecord.
     * @example
     * // Create one AiOutputRecord
     * const AiOutputRecord = await prisma.aiOutputRecord.create({
     *   data: {
     *     // ... data to create a AiOutputRecord
     *   }
     * })
     * 
     */
    create<T extends AiOutputRecordCreateArgs>(args: SelectSubset<T, AiOutputRecordCreateArgs<ExtArgs>>): Prisma__AiOutputRecordClient<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiOutputRecords.
     * @param {AiOutputRecordCreateManyArgs} args - Arguments to create many AiOutputRecords.
     * @example
     * // Create many AiOutputRecords
     * const aiOutputRecord = await prisma.aiOutputRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiOutputRecordCreateManyArgs>(args?: SelectSubset<T, AiOutputRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiOutputRecords and returns the data saved in the database.
     * @param {AiOutputRecordCreateManyAndReturnArgs} args - Arguments to create many AiOutputRecords.
     * @example
     * // Create many AiOutputRecords
     * const aiOutputRecord = await prisma.aiOutputRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiOutputRecords and only return the `id`
     * const aiOutputRecordWithIdOnly = await prisma.aiOutputRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiOutputRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, AiOutputRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiOutputRecord.
     * @param {AiOutputRecordDeleteArgs} args - Arguments to delete one AiOutputRecord.
     * @example
     * // Delete one AiOutputRecord
     * const AiOutputRecord = await prisma.aiOutputRecord.delete({
     *   where: {
     *     // ... filter to delete one AiOutputRecord
     *   }
     * })
     * 
     */
    delete<T extends AiOutputRecordDeleteArgs>(args: SelectSubset<T, AiOutputRecordDeleteArgs<ExtArgs>>): Prisma__AiOutputRecordClient<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiOutputRecord.
     * @param {AiOutputRecordUpdateArgs} args - Arguments to update one AiOutputRecord.
     * @example
     * // Update one AiOutputRecord
     * const aiOutputRecord = await prisma.aiOutputRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiOutputRecordUpdateArgs>(args: SelectSubset<T, AiOutputRecordUpdateArgs<ExtArgs>>): Prisma__AiOutputRecordClient<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiOutputRecords.
     * @param {AiOutputRecordDeleteManyArgs} args - Arguments to filter AiOutputRecords to delete.
     * @example
     * // Delete a few AiOutputRecords
     * const { count } = await prisma.aiOutputRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiOutputRecordDeleteManyArgs>(args?: SelectSubset<T, AiOutputRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiOutputRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiOutputRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiOutputRecords
     * const aiOutputRecord = await prisma.aiOutputRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiOutputRecordUpdateManyArgs>(args: SelectSubset<T, AiOutputRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiOutputRecords and returns the data updated in the database.
     * @param {AiOutputRecordUpdateManyAndReturnArgs} args - Arguments to update many AiOutputRecords.
     * @example
     * // Update many AiOutputRecords
     * const aiOutputRecord = await prisma.aiOutputRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiOutputRecords and only return the `id`
     * const aiOutputRecordWithIdOnly = await prisma.aiOutputRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends AiOutputRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, AiOutputRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiOutputRecord.
     * @param {AiOutputRecordUpsertArgs} args - Arguments to update or create a AiOutputRecord.
     * @example
     * // Update or create a AiOutputRecord
     * const aiOutputRecord = await prisma.aiOutputRecord.upsert({
     *   create: {
     *     // ... data to create a AiOutputRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiOutputRecord we want to update
     *   }
     * })
     */
    upsert<T extends AiOutputRecordUpsertArgs>(args: SelectSubset<T, AiOutputRecordUpsertArgs<ExtArgs>>): Prisma__AiOutputRecordClient<$Result.GetResult<Prisma.$AiOutputRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiOutputRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiOutputRecordCountArgs} args - Arguments to filter AiOutputRecords to count.
     * @example
     * // Count the number of AiOutputRecords
     * const count = await prisma.aiOutputRecord.count({
     *   where: {
     *     // ... the filter for the AiOutputRecords we want to count
     *   }
     * })
    **/
    count<T extends AiOutputRecordCountArgs>(
      args?: Subset<T, AiOutputRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiOutputRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiOutputRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiOutputRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AiOutputRecordAggregateArgs>(args: Subset<T, AiOutputRecordAggregateArgs>): Prisma.PrismaPromise<GetAiOutputRecordAggregateType<T>>

    /**
     * Group by AiOutputRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiOutputRecordGroupByArgs} args - Group by arguments.
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
      T extends AiOutputRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiOutputRecordGroupByArgs['orderBy'] }
        : { orderBy?: AiOutputRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AiOutputRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiOutputRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiOutputRecord model
   */
  readonly fields: AiOutputRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiOutputRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiOutputRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AiOutputRecord model
   */
  interface AiOutputRecordFieldRefs {
    readonly id: FieldRef<"AiOutputRecord", 'String'>
    readonly tenantId: FieldRef<"AiOutputRecord", 'String'>
    readonly userId: FieldRef<"AiOutputRecord", 'String'>
    readonly operation: FieldRef<"AiOutputRecord", 'String'>
    readonly patientId: FieldRef<"AiOutputRecord", 'String'>
    readonly appointmentId: FieldRef<"AiOutputRecord", 'String'>
    readonly therapistId: FieldRef<"AiOutputRecord", 'String'>
    readonly inputSummary: FieldRef<"AiOutputRecord", 'String'>
    readonly output: FieldRef<"AiOutputRecord", 'Json'>
    readonly accepted: FieldRef<"AiOutputRecord", 'Boolean'>
    readonly createdAt: FieldRef<"AiOutputRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiOutputRecord findUnique
   */
  export type AiOutputRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * Filter, which AiOutputRecord to fetch.
     */
    where: AiOutputRecordWhereUniqueInput
  }

  /**
   * AiOutputRecord findUniqueOrThrow
   */
  export type AiOutputRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * Filter, which AiOutputRecord to fetch.
     */
    where: AiOutputRecordWhereUniqueInput
  }

  /**
   * AiOutputRecord findFirst
   */
  export type AiOutputRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * Filter, which AiOutputRecord to fetch.
     */
    where?: AiOutputRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiOutputRecords to fetch.
     */
    orderBy?: AiOutputRecordOrderByWithRelationInput | AiOutputRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiOutputRecords.
     */
    cursor?: AiOutputRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiOutputRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiOutputRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiOutputRecords.
     */
    distinct?: AiOutputRecordScalarFieldEnum | AiOutputRecordScalarFieldEnum[]
  }

  /**
   * AiOutputRecord findFirstOrThrow
   */
  export type AiOutputRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * Filter, which AiOutputRecord to fetch.
     */
    where?: AiOutputRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiOutputRecords to fetch.
     */
    orderBy?: AiOutputRecordOrderByWithRelationInput | AiOutputRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiOutputRecords.
     */
    cursor?: AiOutputRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiOutputRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiOutputRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiOutputRecords.
     */
    distinct?: AiOutputRecordScalarFieldEnum | AiOutputRecordScalarFieldEnum[]
  }

  /**
   * AiOutputRecord findMany
   */
  export type AiOutputRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * Filter, which AiOutputRecords to fetch.
     */
    where?: AiOutputRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiOutputRecords to fetch.
     */
    orderBy?: AiOutputRecordOrderByWithRelationInput | AiOutputRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiOutputRecords.
     */
    cursor?: AiOutputRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiOutputRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiOutputRecords.
     */
    skip?: number
    distinct?: AiOutputRecordScalarFieldEnum | AiOutputRecordScalarFieldEnum[]
  }

  /**
   * AiOutputRecord create
   */
  export type AiOutputRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * The data needed to create a AiOutputRecord.
     */
    data: XOR<AiOutputRecordCreateInput, AiOutputRecordUncheckedCreateInput>
  }

  /**
   * AiOutputRecord createMany
   */
  export type AiOutputRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiOutputRecords.
     */
    data: AiOutputRecordCreateManyInput | AiOutputRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiOutputRecord createManyAndReturn
   */
  export type AiOutputRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * The data used to create many AiOutputRecords.
     */
    data: AiOutputRecordCreateManyInput | AiOutputRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiOutputRecord update
   */
  export type AiOutputRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * The data needed to update a AiOutputRecord.
     */
    data: XOR<AiOutputRecordUpdateInput, AiOutputRecordUncheckedUpdateInput>
    /**
     * Choose, which AiOutputRecord to update.
     */
    where: AiOutputRecordWhereUniqueInput
  }

  /**
   * AiOutputRecord updateMany
   */
  export type AiOutputRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiOutputRecords.
     */
    data: XOR<AiOutputRecordUpdateManyMutationInput, AiOutputRecordUncheckedUpdateManyInput>
    /**
     * Filter which AiOutputRecords to update
     */
    where?: AiOutputRecordWhereInput
    /**
     * Limit how many AiOutputRecords to update.
     */
    limit?: number
  }

  /**
   * AiOutputRecord updateManyAndReturn
   */
  export type AiOutputRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * The data used to update AiOutputRecords.
     */
    data: XOR<AiOutputRecordUpdateManyMutationInput, AiOutputRecordUncheckedUpdateManyInput>
    /**
     * Filter which AiOutputRecords to update
     */
    where?: AiOutputRecordWhereInput
    /**
     * Limit how many AiOutputRecords to update.
     */
    limit?: number
  }

  /**
   * AiOutputRecord upsert
   */
  export type AiOutputRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * The filter to search for the AiOutputRecord to update in case it exists.
     */
    where: AiOutputRecordWhereUniqueInput
    /**
     * In case the AiOutputRecord found by the `where` argument doesn't exist, create a new AiOutputRecord with this data.
     */
    create: XOR<AiOutputRecordCreateInput, AiOutputRecordUncheckedCreateInput>
    /**
     * In case the AiOutputRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiOutputRecordUpdateInput, AiOutputRecordUncheckedUpdateInput>
  }

  /**
   * AiOutputRecord delete
   */
  export type AiOutputRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
    /**
     * Filter which AiOutputRecord to delete.
     */
    where: AiOutputRecordWhereUniqueInput
  }

  /**
   * AiOutputRecord deleteMany
   */
  export type AiOutputRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiOutputRecords to delete
     */
    where?: AiOutputRecordWhereInput
    /**
     * Limit how many AiOutputRecords to delete.
     */
    limit?: number
  }

  /**
   * AiOutputRecord without action
   */
  export type AiOutputRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiOutputRecord
     */
    select?: AiOutputRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiOutputRecord
     */
    omit?: AiOutputRecordOmit<ExtArgs> | null
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


  export const AiUsageLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    operation: 'operation',
    modelName: 'modelName',
    promptTokens: 'promptTokens',
    completionTokens: 'completionTokens',
    totalTokens: 'totalTokens',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AiUsageLogScalarFieldEnum = (typeof AiUsageLogScalarFieldEnum)[keyof typeof AiUsageLogScalarFieldEnum]


  export const AiOutputRecordScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    operation: 'operation',
    patientId: 'patientId',
    appointmentId: 'appointmentId',
    therapistId: 'therapistId',
    inputSummary: 'inputSummary',
    output: 'output',
    accepted: 'accepted',
    createdAt: 'createdAt'
  };

  export type AiOutputRecordScalarFieldEnum = (typeof AiOutputRecordScalarFieldEnum)[keyof typeof AiOutputRecordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export type AiUsageLogWhereInput = {
    AND?: AiUsageLogWhereInput | AiUsageLogWhereInput[]
    OR?: AiUsageLogWhereInput[]
    NOT?: AiUsageLogWhereInput | AiUsageLogWhereInput[]
    id?: StringFilter<"AiUsageLog"> | string
    tenantId?: StringFilter<"AiUsageLog"> | string
    userId?: StringFilter<"AiUsageLog"> | string
    operation?: StringFilter<"AiUsageLog"> | string
    modelName?: StringFilter<"AiUsageLog"> | string
    promptTokens?: IntFilter<"AiUsageLog"> | number
    completionTokens?: IntFilter<"AiUsageLog"> | number
    totalTokens?: IntFilter<"AiUsageLog"> | number
    metadata?: JsonNullableFilter<"AiUsageLog">
    createdAt?: DateTimeFilter<"AiUsageLog"> | Date | string
  }

  export type AiUsageLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    modelName?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AiUsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiUsageLogWhereInput | AiUsageLogWhereInput[]
    OR?: AiUsageLogWhereInput[]
    NOT?: AiUsageLogWhereInput | AiUsageLogWhereInput[]
    tenantId?: StringFilter<"AiUsageLog"> | string
    userId?: StringFilter<"AiUsageLog"> | string
    operation?: StringFilter<"AiUsageLog"> | string
    modelName?: StringFilter<"AiUsageLog"> | string
    promptTokens?: IntFilter<"AiUsageLog"> | number
    completionTokens?: IntFilter<"AiUsageLog"> | number
    totalTokens?: IntFilter<"AiUsageLog"> | number
    metadata?: JsonNullableFilter<"AiUsageLog">
    createdAt?: DateTimeFilter<"AiUsageLog"> | Date | string
  }, "id">

  export type AiUsageLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    modelName?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AiUsageLogCountOrderByAggregateInput
    _avg?: AiUsageLogAvgOrderByAggregateInput
    _max?: AiUsageLogMaxOrderByAggregateInput
    _min?: AiUsageLogMinOrderByAggregateInput
    _sum?: AiUsageLogSumOrderByAggregateInput
  }

  export type AiUsageLogScalarWhereWithAggregatesInput = {
    AND?: AiUsageLogScalarWhereWithAggregatesInput | AiUsageLogScalarWhereWithAggregatesInput[]
    OR?: AiUsageLogScalarWhereWithAggregatesInput[]
    NOT?: AiUsageLogScalarWhereWithAggregatesInput | AiUsageLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiUsageLog"> | string
    tenantId?: StringWithAggregatesFilter<"AiUsageLog"> | string
    userId?: StringWithAggregatesFilter<"AiUsageLog"> | string
    operation?: StringWithAggregatesFilter<"AiUsageLog"> | string
    modelName?: StringWithAggregatesFilter<"AiUsageLog"> | string
    promptTokens?: IntWithAggregatesFilter<"AiUsageLog"> | number
    completionTokens?: IntWithAggregatesFilter<"AiUsageLog"> | number
    totalTokens?: IntWithAggregatesFilter<"AiUsageLog"> | number
    metadata?: JsonNullableWithAggregatesFilter<"AiUsageLog">
    createdAt?: DateTimeWithAggregatesFilter<"AiUsageLog"> | Date | string
  }

  export type AiOutputRecordWhereInput = {
    AND?: AiOutputRecordWhereInput | AiOutputRecordWhereInput[]
    OR?: AiOutputRecordWhereInput[]
    NOT?: AiOutputRecordWhereInput | AiOutputRecordWhereInput[]
    id?: StringFilter<"AiOutputRecord"> | string
    tenantId?: StringFilter<"AiOutputRecord"> | string
    userId?: StringFilter<"AiOutputRecord"> | string
    operation?: StringFilter<"AiOutputRecord"> | string
    patientId?: StringNullableFilter<"AiOutputRecord"> | string | null
    appointmentId?: StringNullableFilter<"AiOutputRecord"> | string | null
    therapistId?: StringNullableFilter<"AiOutputRecord"> | string | null
    inputSummary?: StringNullableFilter<"AiOutputRecord"> | string | null
    output?: JsonFilter<"AiOutputRecord">
    accepted?: BoolNullableFilter<"AiOutputRecord"> | boolean | null
    createdAt?: DateTimeFilter<"AiOutputRecord"> | Date | string
  }

  export type AiOutputRecordOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    patientId?: SortOrderInput | SortOrder
    appointmentId?: SortOrderInput | SortOrder
    therapistId?: SortOrderInput | SortOrder
    inputSummary?: SortOrderInput | SortOrder
    output?: SortOrder
    accepted?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AiOutputRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiOutputRecordWhereInput | AiOutputRecordWhereInput[]
    OR?: AiOutputRecordWhereInput[]
    NOT?: AiOutputRecordWhereInput | AiOutputRecordWhereInput[]
    tenantId?: StringFilter<"AiOutputRecord"> | string
    userId?: StringFilter<"AiOutputRecord"> | string
    operation?: StringFilter<"AiOutputRecord"> | string
    patientId?: StringNullableFilter<"AiOutputRecord"> | string | null
    appointmentId?: StringNullableFilter<"AiOutputRecord"> | string | null
    therapistId?: StringNullableFilter<"AiOutputRecord"> | string | null
    inputSummary?: StringNullableFilter<"AiOutputRecord"> | string | null
    output?: JsonFilter<"AiOutputRecord">
    accepted?: BoolNullableFilter<"AiOutputRecord"> | boolean | null
    createdAt?: DateTimeFilter<"AiOutputRecord"> | Date | string
  }, "id">

  export type AiOutputRecordOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    patientId?: SortOrderInput | SortOrder
    appointmentId?: SortOrderInput | SortOrder
    therapistId?: SortOrderInput | SortOrder
    inputSummary?: SortOrderInput | SortOrder
    output?: SortOrder
    accepted?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AiOutputRecordCountOrderByAggregateInput
    _max?: AiOutputRecordMaxOrderByAggregateInput
    _min?: AiOutputRecordMinOrderByAggregateInput
  }

  export type AiOutputRecordScalarWhereWithAggregatesInput = {
    AND?: AiOutputRecordScalarWhereWithAggregatesInput | AiOutputRecordScalarWhereWithAggregatesInput[]
    OR?: AiOutputRecordScalarWhereWithAggregatesInput[]
    NOT?: AiOutputRecordScalarWhereWithAggregatesInput | AiOutputRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiOutputRecord"> | string
    tenantId?: StringWithAggregatesFilter<"AiOutputRecord"> | string
    userId?: StringWithAggregatesFilter<"AiOutputRecord"> | string
    operation?: StringWithAggregatesFilter<"AiOutputRecord"> | string
    patientId?: StringNullableWithAggregatesFilter<"AiOutputRecord"> | string | null
    appointmentId?: StringNullableWithAggregatesFilter<"AiOutputRecord"> | string | null
    therapistId?: StringNullableWithAggregatesFilter<"AiOutputRecord"> | string | null
    inputSummary?: StringNullableWithAggregatesFilter<"AiOutputRecord"> | string | null
    output?: JsonWithAggregatesFilter<"AiOutputRecord">
    accepted?: BoolNullableWithAggregatesFilter<"AiOutputRecord"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"AiOutputRecord"> | Date | string
  }

  export type AiUsageLogCreateInput = {
    id?: string
    tenantId: string
    userId: string
    operation: string
    modelName: string
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiUsageLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    userId: string
    operation: string
    modelName: string
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiUsageLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiUsageLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiUsageLogCreateManyInput = {
    id?: string
    tenantId: string
    userId: string
    operation: string
    modelName: string
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AiUsageLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiUsageLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiOutputRecordCreateInput = {
    id?: string
    tenantId: string
    userId: string
    operation: string
    patientId?: string | null
    appointmentId?: string | null
    therapistId?: string | null
    inputSummary?: string | null
    output: JsonNullValueInput | InputJsonValue
    accepted?: boolean | null
    createdAt?: Date | string
  }

  export type AiOutputRecordUncheckedCreateInput = {
    id?: string
    tenantId: string
    userId: string
    operation: string
    patientId?: string | null
    appointmentId?: string | null
    therapistId?: string | null
    inputSummary?: string | null
    output: JsonNullValueInput | InputJsonValue
    accepted?: boolean | null
    createdAt?: Date | string
  }

  export type AiOutputRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    therapistId?: NullableStringFieldUpdateOperationsInput | string | null
    inputSummary?: NullableStringFieldUpdateOperationsInput | string | null
    output?: JsonNullValueInput | InputJsonValue
    accepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiOutputRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    therapistId?: NullableStringFieldUpdateOperationsInput | string | null
    inputSummary?: NullableStringFieldUpdateOperationsInput | string | null
    output?: JsonNullValueInput | InputJsonValue
    accepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiOutputRecordCreateManyInput = {
    id?: string
    tenantId: string
    userId: string
    operation: string
    patientId?: string | null
    appointmentId?: string | null
    therapistId?: string | null
    inputSummary?: string | null
    output: JsonNullValueInput | InputJsonValue
    accepted?: boolean | null
    createdAt?: Date | string
  }

  export type AiOutputRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    therapistId?: NullableStringFieldUpdateOperationsInput | string | null
    inputSummary?: NullableStringFieldUpdateOperationsInput | string | null
    output?: JsonNullValueInput | InputJsonValue
    accepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiOutputRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    therapistId?: NullableStringFieldUpdateOperationsInput | string | null
    inputSummary?: NullableStringFieldUpdateOperationsInput | string | null
    output?: JsonNullValueInput | InputJsonValue
    accepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
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

  export type AiUsageLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    modelName?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AiUsageLogAvgOrderByAggregateInput = {
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
  }

  export type AiUsageLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    modelName?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    createdAt?: SortOrder
  }

  export type AiUsageLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    modelName?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
    createdAt?: SortOrder
  }

  export type AiUsageLogSumOrderByAggregateInput = {
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    totalTokens?: SortOrder
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type AiOutputRecordCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    patientId?: SortOrder
    appointmentId?: SortOrder
    therapistId?: SortOrder
    inputSummary?: SortOrder
    output?: SortOrder
    accepted?: SortOrder
    createdAt?: SortOrder
  }

  export type AiOutputRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    patientId?: SortOrder
    appointmentId?: SortOrder
    therapistId?: SortOrder
    inputSummary?: SortOrder
    accepted?: SortOrder
    createdAt?: SortOrder
  }

  export type AiOutputRecordMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    operation?: SortOrder
    patientId?: SortOrder
    appointmentId?: SortOrder
    therapistId?: SortOrder
    inputSummary?: SortOrder
    accepted?: SortOrder
    createdAt?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
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

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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