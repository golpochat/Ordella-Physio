
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
 * Model IntegrationProvider
 * 
 */
export type IntegrationProvider = $Result.DefaultSelection<Prisma.$IntegrationProviderPayload>
/**
 * Model TenantIntegration
 * 
 */
export type TenantIntegration = $Result.DefaultSelection<Prisma.$TenantIntegrationPayload>
/**
 * Model IntegrationUsageLog
 * 
 */
export type IntegrationUsageLog = $Result.DefaultSelection<Prisma.$IntegrationUsageLogPayload>
/**
 * Model OAuthState
 * 
 */
export type OAuthState = $Result.DefaultSelection<Prisma.$OAuthStatePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more IntegrationProviders
 * const integrationProviders = await prisma.integrationProvider.findMany()
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
   * // Fetch zero or more IntegrationProviders
   * const integrationProviders = await prisma.integrationProvider.findMany()
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
   * `prisma.integrationProvider`: Exposes CRUD operations for the **IntegrationProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IntegrationProviders
    * const integrationProviders = await prisma.integrationProvider.findMany()
    * ```
    */
  get integrationProvider(): Prisma.IntegrationProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenantIntegration`: Exposes CRUD operations for the **TenantIntegration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantIntegrations
    * const tenantIntegrations = await prisma.tenantIntegration.findMany()
    * ```
    */
  get tenantIntegration(): Prisma.TenantIntegrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.integrationUsageLog`: Exposes CRUD operations for the **IntegrationUsageLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IntegrationUsageLogs
    * const integrationUsageLogs = await prisma.integrationUsageLog.findMany()
    * ```
    */
  get integrationUsageLog(): Prisma.IntegrationUsageLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthState`: Exposes CRUD operations for the **OAuthState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthStates
    * const oAuthStates = await prisma.oAuthState.findMany()
    * ```
    */
  get oAuthState(): Prisma.OAuthStateDelegate<ExtArgs, ClientOptions>;
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
    IntegrationProvider: 'IntegrationProvider',
    TenantIntegration: 'TenantIntegration',
    IntegrationUsageLog: 'IntegrationUsageLog',
    OAuthState: 'OAuthState'
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
      modelProps: "integrationProvider" | "tenantIntegration" | "integrationUsageLog" | "oAuthState"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      IntegrationProvider: {
        payload: Prisma.$IntegrationProviderPayload<ExtArgs>
        fields: Prisma.IntegrationProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IntegrationProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IntegrationProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>
          }
          findFirst: {
            args: Prisma.IntegrationProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IntegrationProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>
          }
          findMany: {
            args: Prisma.IntegrationProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>[]
          }
          create: {
            args: Prisma.IntegrationProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>
          }
          createMany: {
            args: Prisma.IntegrationProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IntegrationProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>[]
          }
          delete: {
            args: Prisma.IntegrationProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>
          }
          update: {
            args: Prisma.IntegrationProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>
          }
          deleteMany: {
            args: Prisma.IntegrationProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IntegrationProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IntegrationProviderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>[]
          }
          upsert: {
            args: Prisma.IntegrationProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationProviderPayload>
          }
          aggregate: {
            args: Prisma.IntegrationProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIntegrationProvider>
          }
          groupBy: {
            args: Prisma.IntegrationProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<IntegrationProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.IntegrationProviderCountArgs<ExtArgs>
            result: $Utils.Optional<IntegrationProviderCountAggregateOutputType> | number
          }
        }
      }
      TenantIntegration: {
        payload: Prisma.$TenantIntegrationPayload<ExtArgs>
        fields: Prisma.TenantIntegrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantIntegrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantIntegrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>
          }
          findFirst: {
            args: Prisma.TenantIntegrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantIntegrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>
          }
          findMany: {
            args: Prisma.TenantIntegrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>[]
          }
          create: {
            args: Prisma.TenantIntegrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>
          }
          createMany: {
            args: Prisma.TenantIntegrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantIntegrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>[]
          }
          delete: {
            args: Prisma.TenantIntegrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>
          }
          update: {
            args: Prisma.TenantIntegrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>
          }
          deleteMany: {
            args: Prisma.TenantIntegrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantIntegrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantIntegrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>[]
          }
          upsert: {
            args: Prisma.TenantIntegrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantIntegrationPayload>
          }
          aggregate: {
            args: Prisma.TenantIntegrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantIntegration>
          }
          groupBy: {
            args: Prisma.TenantIntegrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantIntegrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantIntegrationCountArgs<ExtArgs>
            result: $Utils.Optional<TenantIntegrationCountAggregateOutputType> | number
          }
        }
      }
      IntegrationUsageLog: {
        payload: Prisma.$IntegrationUsageLogPayload<ExtArgs>
        fields: Prisma.IntegrationUsageLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IntegrationUsageLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IntegrationUsageLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>
          }
          findFirst: {
            args: Prisma.IntegrationUsageLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IntegrationUsageLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>
          }
          findMany: {
            args: Prisma.IntegrationUsageLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>[]
          }
          create: {
            args: Prisma.IntegrationUsageLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>
          }
          createMany: {
            args: Prisma.IntegrationUsageLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IntegrationUsageLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>[]
          }
          delete: {
            args: Prisma.IntegrationUsageLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>
          }
          update: {
            args: Prisma.IntegrationUsageLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>
          }
          deleteMany: {
            args: Prisma.IntegrationUsageLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IntegrationUsageLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IntegrationUsageLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>[]
          }
          upsert: {
            args: Prisma.IntegrationUsageLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationUsageLogPayload>
          }
          aggregate: {
            args: Prisma.IntegrationUsageLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIntegrationUsageLog>
          }
          groupBy: {
            args: Prisma.IntegrationUsageLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<IntegrationUsageLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.IntegrationUsageLogCountArgs<ExtArgs>
            result: $Utils.Optional<IntegrationUsageLogCountAggregateOutputType> | number
          }
        }
      }
      OAuthState: {
        payload: Prisma.$OAuthStatePayload<ExtArgs>
        fields: Prisma.OAuthStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthStateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthStateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>
          }
          findFirst: {
            args: Prisma.OAuthStateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthStateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>
          }
          findMany: {
            args: Prisma.OAuthStateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>[]
          }
          create: {
            args: Prisma.OAuthStateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>
          }
          createMany: {
            args: Prisma.OAuthStateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthStateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>[]
          }
          delete: {
            args: Prisma.OAuthStateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>
          }
          update: {
            args: Prisma.OAuthStateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>
          }
          deleteMany: {
            args: Prisma.OAuthStateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthStateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthStateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>[]
          }
          upsert: {
            args: Prisma.OAuthStateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthStatePayload>
          }
          aggregate: {
            args: Prisma.OAuthStateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthState>
          }
          groupBy: {
            args: Prisma.OAuthStateGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthStateCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthStateCountAggregateOutputType> | number
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
    integrationProvider?: IntegrationProviderOmit
    tenantIntegration?: TenantIntegrationOmit
    integrationUsageLog?: IntegrationUsageLogOmit
    oAuthState?: OAuthStateOmit
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
   * Count Type IntegrationProviderCountOutputType
   */

  export type IntegrationProviderCountOutputType = {
    integrations: number
  }

  export type IntegrationProviderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    integrations?: boolean | IntegrationProviderCountOutputTypeCountIntegrationsArgs
  }

  // Custom InputTypes
  /**
   * IntegrationProviderCountOutputType without action
   */
  export type IntegrationProviderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProviderCountOutputType
     */
    select?: IntegrationProviderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IntegrationProviderCountOutputType without action
   */
  export type IntegrationProviderCountOutputTypeCountIntegrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantIntegrationWhereInput
  }


  /**
   * Count Type TenantIntegrationCountOutputType
   */

  export type TenantIntegrationCountOutputType = {
    usageLogs: number
  }

  export type TenantIntegrationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usageLogs?: boolean | TenantIntegrationCountOutputTypeCountUsageLogsArgs
  }

  // Custom InputTypes
  /**
   * TenantIntegrationCountOutputType without action
   */
  export type TenantIntegrationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegrationCountOutputType
     */
    select?: TenantIntegrationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantIntegrationCountOutputType without action
   */
  export type TenantIntegrationCountOutputTypeCountUsageLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IntegrationUsageLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model IntegrationProvider
   */

  export type AggregateIntegrationProvider = {
    _count: IntegrationProviderCountAggregateOutputType | null
    _min: IntegrationProviderMinAggregateOutputType | null
    _max: IntegrationProviderMaxAggregateOutputType | null
  }

  export type IntegrationProviderMinAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    category: string | null
    description: string | null
    authType: string | null
    createdAt: Date | null
  }

  export type IntegrationProviderMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    category: string | null
    description: string | null
    authType: string | null
    createdAt: Date | null
  }

  export type IntegrationProviderCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    category: number
    description: number
    authType: number
    createdAt: number
    _all: number
  }


  export type IntegrationProviderMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    category?: true
    description?: true
    authType?: true
    createdAt?: true
  }

  export type IntegrationProviderMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    category?: true
    description?: true
    authType?: true
    createdAt?: true
  }

  export type IntegrationProviderCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    category?: true
    description?: true
    authType?: true
    createdAt?: true
    _all?: true
  }

  export type IntegrationProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IntegrationProvider to aggregate.
     */
    where?: IntegrationProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationProviders to fetch.
     */
    orderBy?: IntegrationProviderOrderByWithRelationInput | IntegrationProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IntegrationProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IntegrationProviders
    **/
    _count?: true | IntegrationProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IntegrationProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IntegrationProviderMaxAggregateInputType
  }

  export type GetIntegrationProviderAggregateType<T extends IntegrationProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateIntegrationProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIntegrationProvider[P]>
      : GetScalarType<T[P], AggregateIntegrationProvider[P]>
  }




  export type IntegrationProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IntegrationProviderWhereInput
    orderBy?: IntegrationProviderOrderByWithAggregationInput | IntegrationProviderOrderByWithAggregationInput[]
    by: IntegrationProviderScalarFieldEnum[] | IntegrationProviderScalarFieldEnum
    having?: IntegrationProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IntegrationProviderCountAggregateInputType | true
    _min?: IntegrationProviderMinAggregateInputType
    _max?: IntegrationProviderMaxAggregateInputType
  }

  export type IntegrationProviderGroupByOutputType = {
    id: string
    slug: string
    name: string
    category: string
    description: string
    authType: string
    createdAt: Date
    _count: IntegrationProviderCountAggregateOutputType | null
    _min: IntegrationProviderMinAggregateOutputType | null
    _max: IntegrationProviderMaxAggregateOutputType | null
  }

  type GetIntegrationProviderGroupByPayload<T extends IntegrationProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IntegrationProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IntegrationProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IntegrationProviderGroupByOutputType[P]>
            : GetScalarType<T[P], IntegrationProviderGroupByOutputType[P]>
        }
      >
    >


  export type IntegrationProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    authType?: boolean
    createdAt?: boolean
    integrations?: boolean | IntegrationProvider$integrationsArgs<ExtArgs>
    _count?: boolean | IntegrationProviderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["integrationProvider"]>

  export type IntegrationProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    authType?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["integrationProvider"]>

  export type IntegrationProviderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    authType?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["integrationProvider"]>

  export type IntegrationProviderSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    category?: boolean
    description?: boolean
    authType?: boolean
    createdAt?: boolean
  }

  export type IntegrationProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "category" | "description" | "authType" | "createdAt", ExtArgs["result"]["integrationProvider"]>
  export type IntegrationProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    integrations?: boolean | IntegrationProvider$integrationsArgs<ExtArgs>
    _count?: boolean | IntegrationProviderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IntegrationProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type IntegrationProviderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $IntegrationProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IntegrationProvider"
    objects: {
      integrations: Prisma.$TenantIntegrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      name: string
      category: string
      description: string
      authType: string
      createdAt: Date
    }, ExtArgs["result"]["integrationProvider"]>
    composites: {}
  }

  type IntegrationProviderGetPayload<S extends boolean | null | undefined | IntegrationProviderDefaultArgs> = $Result.GetResult<Prisma.$IntegrationProviderPayload, S>

  type IntegrationProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IntegrationProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IntegrationProviderCountAggregateInputType | true
    }

  export interface IntegrationProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IntegrationProvider'], meta: { name: 'IntegrationProvider' } }
    /**
     * Find zero or one IntegrationProvider that matches the filter.
     * @param {IntegrationProviderFindUniqueArgs} args - Arguments to find a IntegrationProvider
     * @example
     * // Get one IntegrationProvider
     * const integrationProvider = await prisma.integrationProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IntegrationProviderFindUniqueArgs>(args: SelectSubset<T, IntegrationProviderFindUniqueArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IntegrationProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IntegrationProviderFindUniqueOrThrowArgs} args - Arguments to find a IntegrationProvider
     * @example
     * // Get one IntegrationProvider
     * const integrationProvider = await prisma.integrationProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IntegrationProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, IntegrationProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IntegrationProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationProviderFindFirstArgs} args - Arguments to find a IntegrationProvider
     * @example
     * // Get one IntegrationProvider
     * const integrationProvider = await prisma.integrationProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IntegrationProviderFindFirstArgs>(args?: SelectSubset<T, IntegrationProviderFindFirstArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IntegrationProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationProviderFindFirstOrThrowArgs} args - Arguments to find a IntegrationProvider
     * @example
     * // Get one IntegrationProvider
     * const integrationProvider = await prisma.integrationProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IntegrationProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, IntegrationProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IntegrationProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IntegrationProviders
     * const integrationProviders = await prisma.integrationProvider.findMany()
     * 
     * // Get first 10 IntegrationProviders
     * const integrationProviders = await prisma.integrationProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const integrationProviderWithIdOnly = await prisma.integrationProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IntegrationProviderFindManyArgs>(args?: SelectSubset<T, IntegrationProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IntegrationProvider.
     * @param {IntegrationProviderCreateArgs} args - Arguments to create a IntegrationProvider.
     * @example
     * // Create one IntegrationProvider
     * const IntegrationProvider = await prisma.integrationProvider.create({
     *   data: {
     *     // ... data to create a IntegrationProvider
     *   }
     * })
     * 
     */
    create<T extends IntegrationProviderCreateArgs>(args: SelectSubset<T, IntegrationProviderCreateArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IntegrationProviders.
     * @param {IntegrationProviderCreateManyArgs} args - Arguments to create many IntegrationProviders.
     * @example
     * // Create many IntegrationProviders
     * const integrationProvider = await prisma.integrationProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IntegrationProviderCreateManyArgs>(args?: SelectSubset<T, IntegrationProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IntegrationProviders and returns the data saved in the database.
     * @param {IntegrationProviderCreateManyAndReturnArgs} args - Arguments to create many IntegrationProviders.
     * @example
     * // Create many IntegrationProviders
     * const integrationProvider = await prisma.integrationProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IntegrationProviders and only return the `id`
     * const integrationProviderWithIdOnly = await prisma.integrationProvider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IntegrationProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, IntegrationProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IntegrationProvider.
     * @param {IntegrationProviderDeleteArgs} args - Arguments to delete one IntegrationProvider.
     * @example
     * // Delete one IntegrationProvider
     * const IntegrationProvider = await prisma.integrationProvider.delete({
     *   where: {
     *     // ... filter to delete one IntegrationProvider
     *   }
     * })
     * 
     */
    delete<T extends IntegrationProviderDeleteArgs>(args: SelectSubset<T, IntegrationProviderDeleteArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IntegrationProvider.
     * @param {IntegrationProviderUpdateArgs} args - Arguments to update one IntegrationProvider.
     * @example
     * // Update one IntegrationProvider
     * const integrationProvider = await prisma.integrationProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IntegrationProviderUpdateArgs>(args: SelectSubset<T, IntegrationProviderUpdateArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IntegrationProviders.
     * @param {IntegrationProviderDeleteManyArgs} args - Arguments to filter IntegrationProviders to delete.
     * @example
     * // Delete a few IntegrationProviders
     * const { count } = await prisma.integrationProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IntegrationProviderDeleteManyArgs>(args?: SelectSubset<T, IntegrationProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IntegrationProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IntegrationProviders
     * const integrationProvider = await prisma.integrationProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IntegrationProviderUpdateManyArgs>(args: SelectSubset<T, IntegrationProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IntegrationProviders and returns the data updated in the database.
     * @param {IntegrationProviderUpdateManyAndReturnArgs} args - Arguments to update many IntegrationProviders.
     * @example
     * // Update many IntegrationProviders
     * const integrationProvider = await prisma.integrationProvider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IntegrationProviders and only return the `id`
     * const integrationProviderWithIdOnly = await prisma.integrationProvider.updateManyAndReturn({
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
    updateManyAndReturn<T extends IntegrationProviderUpdateManyAndReturnArgs>(args: SelectSubset<T, IntegrationProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IntegrationProvider.
     * @param {IntegrationProviderUpsertArgs} args - Arguments to update or create a IntegrationProvider.
     * @example
     * // Update or create a IntegrationProvider
     * const integrationProvider = await prisma.integrationProvider.upsert({
     *   create: {
     *     // ... data to create a IntegrationProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IntegrationProvider we want to update
     *   }
     * })
     */
    upsert<T extends IntegrationProviderUpsertArgs>(args: SelectSubset<T, IntegrationProviderUpsertArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IntegrationProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationProviderCountArgs} args - Arguments to filter IntegrationProviders to count.
     * @example
     * // Count the number of IntegrationProviders
     * const count = await prisma.integrationProvider.count({
     *   where: {
     *     // ... the filter for the IntegrationProviders we want to count
     *   }
     * })
    **/
    count<T extends IntegrationProviderCountArgs>(
      args?: Subset<T, IntegrationProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IntegrationProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IntegrationProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IntegrationProviderAggregateArgs>(args: Subset<T, IntegrationProviderAggregateArgs>): Prisma.PrismaPromise<GetIntegrationProviderAggregateType<T>>

    /**
     * Group by IntegrationProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationProviderGroupByArgs} args - Group by arguments.
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
      T extends IntegrationProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IntegrationProviderGroupByArgs['orderBy'] }
        : { orderBy?: IntegrationProviderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IntegrationProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIntegrationProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IntegrationProvider model
   */
  readonly fields: IntegrationProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IntegrationProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IntegrationProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    integrations<T extends IntegrationProvider$integrationsArgs<ExtArgs> = {}>(args?: Subset<T, IntegrationProvider$integrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the IntegrationProvider model
   */
  interface IntegrationProviderFieldRefs {
    readonly id: FieldRef<"IntegrationProvider", 'String'>
    readonly slug: FieldRef<"IntegrationProvider", 'String'>
    readonly name: FieldRef<"IntegrationProvider", 'String'>
    readonly category: FieldRef<"IntegrationProvider", 'String'>
    readonly description: FieldRef<"IntegrationProvider", 'String'>
    readonly authType: FieldRef<"IntegrationProvider", 'String'>
    readonly createdAt: FieldRef<"IntegrationProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IntegrationProvider findUnique
   */
  export type IntegrationProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationProvider to fetch.
     */
    where: IntegrationProviderWhereUniqueInput
  }

  /**
   * IntegrationProvider findUniqueOrThrow
   */
  export type IntegrationProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationProvider to fetch.
     */
    where: IntegrationProviderWhereUniqueInput
  }

  /**
   * IntegrationProvider findFirst
   */
  export type IntegrationProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationProvider to fetch.
     */
    where?: IntegrationProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationProviders to fetch.
     */
    orderBy?: IntegrationProviderOrderByWithRelationInput | IntegrationProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IntegrationProviders.
     */
    cursor?: IntegrationProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntegrationProviders.
     */
    distinct?: IntegrationProviderScalarFieldEnum | IntegrationProviderScalarFieldEnum[]
  }

  /**
   * IntegrationProvider findFirstOrThrow
   */
  export type IntegrationProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationProvider to fetch.
     */
    where?: IntegrationProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationProviders to fetch.
     */
    orderBy?: IntegrationProviderOrderByWithRelationInput | IntegrationProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IntegrationProviders.
     */
    cursor?: IntegrationProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntegrationProviders.
     */
    distinct?: IntegrationProviderScalarFieldEnum | IntegrationProviderScalarFieldEnum[]
  }

  /**
   * IntegrationProvider findMany
   */
  export type IntegrationProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationProviders to fetch.
     */
    where?: IntegrationProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationProviders to fetch.
     */
    orderBy?: IntegrationProviderOrderByWithRelationInput | IntegrationProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IntegrationProviders.
     */
    cursor?: IntegrationProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationProviders.
     */
    skip?: number
    distinct?: IntegrationProviderScalarFieldEnum | IntegrationProviderScalarFieldEnum[]
  }

  /**
   * IntegrationProvider create
   */
  export type IntegrationProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a IntegrationProvider.
     */
    data: XOR<IntegrationProviderCreateInput, IntegrationProviderUncheckedCreateInput>
  }

  /**
   * IntegrationProvider createMany
   */
  export type IntegrationProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IntegrationProviders.
     */
    data: IntegrationProviderCreateManyInput | IntegrationProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IntegrationProvider createManyAndReturn
   */
  export type IntegrationProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * The data used to create many IntegrationProviders.
     */
    data: IntegrationProviderCreateManyInput | IntegrationProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IntegrationProvider update
   */
  export type IntegrationProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a IntegrationProvider.
     */
    data: XOR<IntegrationProviderUpdateInput, IntegrationProviderUncheckedUpdateInput>
    /**
     * Choose, which IntegrationProvider to update.
     */
    where: IntegrationProviderWhereUniqueInput
  }

  /**
   * IntegrationProvider updateMany
   */
  export type IntegrationProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IntegrationProviders.
     */
    data: XOR<IntegrationProviderUpdateManyMutationInput, IntegrationProviderUncheckedUpdateManyInput>
    /**
     * Filter which IntegrationProviders to update
     */
    where?: IntegrationProviderWhereInput
    /**
     * Limit how many IntegrationProviders to update.
     */
    limit?: number
  }

  /**
   * IntegrationProvider updateManyAndReturn
   */
  export type IntegrationProviderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * The data used to update IntegrationProviders.
     */
    data: XOR<IntegrationProviderUpdateManyMutationInput, IntegrationProviderUncheckedUpdateManyInput>
    /**
     * Filter which IntegrationProviders to update
     */
    where?: IntegrationProviderWhereInput
    /**
     * Limit how many IntegrationProviders to update.
     */
    limit?: number
  }

  /**
   * IntegrationProvider upsert
   */
  export type IntegrationProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the IntegrationProvider to update in case it exists.
     */
    where: IntegrationProviderWhereUniqueInput
    /**
     * In case the IntegrationProvider found by the `where` argument doesn't exist, create a new IntegrationProvider with this data.
     */
    create: XOR<IntegrationProviderCreateInput, IntegrationProviderUncheckedCreateInput>
    /**
     * In case the IntegrationProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IntegrationProviderUpdateInput, IntegrationProviderUncheckedUpdateInput>
  }

  /**
   * IntegrationProvider delete
   */
  export type IntegrationProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
    /**
     * Filter which IntegrationProvider to delete.
     */
    where: IntegrationProviderWhereUniqueInput
  }

  /**
   * IntegrationProvider deleteMany
   */
  export type IntegrationProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IntegrationProviders to delete
     */
    where?: IntegrationProviderWhereInput
    /**
     * Limit how many IntegrationProviders to delete.
     */
    limit?: number
  }

  /**
   * IntegrationProvider.integrations
   */
  export type IntegrationProvider$integrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    where?: TenantIntegrationWhereInput
    orderBy?: TenantIntegrationOrderByWithRelationInput | TenantIntegrationOrderByWithRelationInput[]
    cursor?: TenantIntegrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantIntegrationScalarFieldEnum | TenantIntegrationScalarFieldEnum[]
  }

  /**
   * IntegrationProvider without action
   */
  export type IntegrationProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationProvider
     */
    select?: IntegrationProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationProvider
     */
    omit?: IntegrationProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationProviderInclude<ExtArgs> | null
  }


  /**
   * Model TenantIntegration
   */

  export type AggregateTenantIntegration = {
    _count: TenantIntegrationCountAggregateOutputType | null
    _min: TenantIntegrationMinAggregateOutputType | null
    _max: TenantIntegrationMaxAggregateOutputType | null
  }

  export type TenantIntegrationMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    apiKey: string | null
    apiSecret: string | null
    expiresAt: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantIntegrationMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    providerId: string | null
    accessToken: string | null
    refreshToken: string | null
    apiKey: string | null
    apiSecret: string | null
    expiresAt: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantIntegrationCountAggregateOutputType = {
    id: number
    tenantId: number
    providerId: number
    accessToken: number
    refreshToken: number
    apiKey: number
    apiSecret: number
    metadata: number
    expiresAt: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantIntegrationMinAggregateInputType = {
    id?: true
    tenantId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    apiKey?: true
    apiSecret?: true
    expiresAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantIntegrationMaxAggregateInputType = {
    id?: true
    tenantId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    apiKey?: true
    apiSecret?: true
    expiresAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantIntegrationCountAggregateInputType = {
    id?: true
    tenantId?: true
    providerId?: true
    accessToken?: true
    refreshToken?: true
    apiKey?: true
    apiSecret?: true
    metadata?: true
    expiresAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantIntegrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantIntegration to aggregate.
     */
    where?: TenantIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantIntegrations to fetch.
     */
    orderBy?: TenantIntegrationOrderByWithRelationInput | TenantIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantIntegrations
    **/
    _count?: true | TenantIntegrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantIntegrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantIntegrationMaxAggregateInputType
  }

  export type GetTenantIntegrationAggregateType<T extends TenantIntegrationAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantIntegration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantIntegration[P]>
      : GetScalarType<T[P], AggregateTenantIntegration[P]>
  }




  export type TenantIntegrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantIntegrationWhereInput
    orderBy?: TenantIntegrationOrderByWithAggregationInput | TenantIntegrationOrderByWithAggregationInput[]
    by: TenantIntegrationScalarFieldEnum[] | TenantIntegrationScalarFieldEnum
    having?: TenantIntegrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantIntegrationCountAggregateInputType | true
    _min?: TenantIntegrationMinAggregateInputType
    _max?: TenantIntegrationMaxAggregateInputType
  }

  export type TenantIntegrationGroupByOutputType = {
    id: string
    tenantId: string
    providerId: string
    accessToken: string | null
    refreshToken: string | null
    apiKey: string | null
    apiSecret: string | null
    metadata: JsonValue | null
    expiresAt: Date | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: TenantIntegrationCountAggregateOutputType | null
    _min: TenantIntegrationMinAggregateOutputType | null
    _max: TenantIntegrationMaxAggregateOutputType | null
  }

  type GetTenantIntegrationGroupByPayload<T extends TenantIntegrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantIntegrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantIntegrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantIntegrationGroupByOutputType[P]>
            : GetScalarType<T[P], TenantIntegrationGroupByOutputType[P]>
        }
      >
    >


  export type TenantIntegrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    metadata?: boolean
    expiresAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    provider?: boolean | IntegrationProviderDefaultArgs<ExtArgs>
    usageLogs?: boolean | TenantIntegration$usageLogsArgs<ExtArgs>
    _count?: boolean | TenantIntegrationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantIntegration"]>

  export type TenantIntegrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    metadata?: boolean
    expiresAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    provider?: boolean | IntegrationProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantIntegration"]>

  export type TenantIntegrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    metadata?: boolean
    expiresAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    provider?: boolean | IntegrationProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantIntegration"]>

  export type TenantIntegrationSelectScalar = {
    id?: boolean
    tenantId?: boolean
    providerId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    apiKey?: boolean
    apiSecret?: boolean
    metadata?: boolean
    expiresAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantIntegrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "providerId" | "accessToken" | "refreshToken" | "apiKey" | "apiSecret" | "metadata" | "expiresAt" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["tenantIntegration"]>
  export type TenantIntegrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | IntegrationProviderDefaultArgs<ExtArgs>
    usageLogs?: boolean | TenantIntegration$usageLogsArgs<ExtArgs>
    _count?: boolean | TenantIntegrationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIntegrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | IntegrationProviderDefaultArgs<ExtArgs>
  }
  export type TenantIntegrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | IntegrationProviderDefaultArgs<ExtArgs>
  }

  export type $TenantIntegrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantIntegration"
    objects: {
      provider: Prisma.$IntegrationProviderPayload<ExtArgs>
      usageLogs: Prisma.$IntegrationUsageLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      providerId: string
      accessToken: string | null
      refreshToken: string | null
      apiKey: string | null
      apiSecret: string | null
      metadata: Prisma.JsonValue | null
      expiresAt: Date | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenantIntegration"]>
    composites: {}
  }

  type TenantIntegrationGetPayload<S extends boolean | null | undefined | TenantIntegrationDefaultArgs> = $Result.GetResult<Prisma.$TenantIntegrationPayload, S>

  type TenantIntegrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantIntegrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantIntegrationCountAggregateInputType | true
    }

  export interface TenantIntegrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantIntegration'], meta: { name: 'TenantIntegration' } }
    /**
     * Find zero or one TenantIntegration that matches the filter.
     * @param {TenantIntegrationFindUniqueArgs} args - Arguments to find a TenantIntegration
     * @example
     * // Get one TenantIntegration
     * const tenantIntegration = await prisma.tenantIntegration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantIntegrationFindUniqueArgs>(args: SelectSubset<T, TenantIntegrationFindUniqueArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TenantIntegration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantIntegrationFindUniqueOrThrowArgs} args - Arguments to find a TenantIntegration
     * @example
     * // Get one TenantIntegration
     * const tenantIntegration = await prisma.tenantIntegration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantIntegrationFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantIntegrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantIntegration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantIntegrationFindFirstArgs} args - Arguments to find a TenantIntegration
     * @example
     * // Get one TenantIntegration
     * const tenantIntegration = await prisma.tenantIntegration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantIntegrationFindFirstArgs>(args?: SelectSubset<T, TenantIntegrationFindFirstArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantIntegration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantIntegrationFindFirstOrThrowArgs} args - Arguments to find a TenantIntegration
     * @example
     * // Get one TenantIntegration
     * const tenantIntegration = await prisma.tenantIntegration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantIntegrationFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantIntegrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TenantIntegrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantIntegrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantIntegrations
     * const tenantIntegrations = await prisma.tenantIntegration.findMany()
     * 
     * // Get first 10 TenantIntegrations
     * const tenantIntegrations = await prisma.tenantIntegration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantIntegrationWithIdOnly = await prisma.tenantIntegration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantIntegrationFindManyArgs>(args?: SelectSubset<T, TenantIntegrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TenantIntegration.
     * @param {TenantIntegrationCreateArgs} args - Arguments to create a TenantIntegration.
     * @example
     * // Create one TenantIntegration
     * const TenantIntegration = await prisma.tenantIntegration.create({
     *   data: {
     *     // ... data to create a TenantIntegration
     *   }
     * })
     * 
     */
    create<T extends TenantIntegrationCreateArgs>(args: SelectSubset<T, TenantIntegrationCreateArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TenantIntegrations.
     * @param {TenantIntegrationCreateManyArgs} args - Arguments to create many TenantIntegrations.
     * @example
     * // Create many TenantIntegrations
     * const tenantIntegration = await prisma.tenantIntegration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantIntegrationCreateManyArgs>(args?: SelectSubset<T, TenantIntegrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantIntegrations and returns the data saved in the database.
     * @param {TenantIntegrationCreateManyAndReturnArgs} args - Arguments to create many TenantIntegrations.
     * @example
     * // Create many TenantIntegrations
     * const tenantIntegration = await prisma.tenantIntegration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantIntegrations and only return the `id`
     * const tenantIntegrationWithIdOnly = await prisma.tenantIntegration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantIntegrationCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantIntegrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TenantIntegration.
     * @param {TenantIntegrationDeleteArgs} args - Arguments to delete one TenantIntegration.
     * @example
     * // Delete one TenantIntegration
     * const TenantIntegration = await prisma.tenantIntegration.delete({
     *   where: {
     *     // ... filter to delete one TenantIntegration
     *   }
     * })
     * 
     */
    delete<T extends TenantIntegrationDeleteArgs>(args: SelectSubset<T, TenantIntegrationDeleteArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TenantIntegration.
     * @param {TenantIntegrationUpdateArgs} args - Arguments to update one TenantIntegration.
     * @example
     * // Update one TenantIntegration
     * const tenantIntegration = await prisma.tenantIntegration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantIntegrationUpdateArgs>(args: SelectSubset<T, TenantIntegrationUpdateArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TenantIntegrations.
     * @param {TenantIntegrationDeleteManyArgs} args - Arguments to filter TenantIntegrations to delete.
     * @example
     * // Delete a few TenantIntegrations
     * const { count } = await prisma.tenantIntegration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantIntegrationDeleteManyArgs>(args?: SelectSubset<T, TenantIntegrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantIntegrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantIntegrations
     * const tenantIntegration = await prisma.tenantIntegration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantIntegrationUpdateManyArgs>(args: SelectSubset<T, TenantIntegrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantIntegrations and returns the data updated in the database.
     * @param {TenantIntegrationUpdateManyAndReturnArgs} args - Arguments to update many TenantIntegrations.
     * @example
     * // Update many TenantIntegrations
     * const tenantIntegration = await prisma.tenantIntegration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TenantIntegrations and only return the `id`
     * const tenantIntegrationWithIdOnly = await prisma.tenantIntegration.updateManyAndReturn({
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
    updateManyAndReturn<T extends TenantIntegrationUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantIntegrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TenantIntegration.
     * @param {TenantIntegrationUpsertArgs} args - Arguments to update or create a TenantIntegration.
     * @example
     * // Update or create a TenantIntegration
     * const tenantIntegration = await prisma.tenantIntegration.upsert({
     *   create: {
     *     // ... data to create a TenantIntegration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantIntegration we want to update
     *   }
     * })
     */
    upsert<T extends TenantIntegrationUpsertArgs>(args: SelectSubset<T, TenantIntegrationUpsertArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TenantIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantIntegrationCountArgs} args - Arguments to filter TenantIntegrations to count.
     * @example
     * // Count the number of TenantIntegrations
     * const count = await prisma.tenantIntegration.count({
     *   where: {
     *     // ... the filter for the TenantIntegrations we want to count
     *   }
     * })
    **/
    count<T extends TenantIntegrationCountArgs>(
      args?: Subset<T, TenantIntegrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantIntegrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantIntegrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TenantIntegrationAggregateArgs>(args: Subset<T, TenantIntegrationAggregateArgs>): Prisma.PrismaPromise<GetTenantIntegrationAggregateType<T>>

    /**
     * Group by TenantIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantIntegrationGroupByArgs} args - Group by arguments.
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
      T extends TenantIntegrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantIntegrationGroupByArgs['orderBy'] }
        : { orderBy?: TenantIntegrationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TenantIntegrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantIntegrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantIntegration model
   */
  readonly fields: TenantIntegrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantIntegration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantIntegrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provider<T extends IntegrationProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IntegrationProviderDefaultArgs<ExtArgs>>): Prisma__IntegrationProviderClient<$Result.GetResult<Prisma.$IntegrationProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usageLogs<T extends TenantIntegration$usageLogsArgs<ExtArgs> = {}>(args?: Subset<T, TenantIntegration$usageLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the TenantIntegration model
   */
  interface TenantIntegrationFieldRefs {
    readonly id: FieldRef<"TenantIntegration", 'String'>
    readonly tenantId: FieldRef<"TenantIntegration", 'String'>
    readonly providerId: FieldRef<"TenantIntegration", 'String'>
    readonly accessToken: FieldRef<"TenantIntegration", 'String'>
    readonly refreshToken: FieldRef<"TenantIntegration", 'String'>
    readonly apiKey: FieldRef<"TenantIntegration", 'String'>
    readonly apiSecret: FieldRef<"TenantIntegration", 'String'>
    readonly metadata: FieldRef<"TenantIntegration", 'Json'>
    readonly expiresAt: FieldRef<"TenantIntegration", 'DateTime'>
    readonly status: FieldRef<"TenantIntegration", 'String'>
    readonly createdAt: FieldRef<"TenantIntegration", 'DateTime'>
    readonly updatedAt: FieldRef<"TenantIntegration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TenantIntegration findUnique
   */
  export type TenantIntegrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which TenantIntegration to fetch.
     */
    where: TenantIntegrationWhereUniqueInput
  }

  /**
   * TenantIntegration findUniqueOrThrow
   */
  export type TenantIntegrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which TenantIntegration to fetch.
     */
    where: TenantIntegrationWhereUniqueInput
  }

  /**
   * TenantIntegration findFirst
   */
  export type TenantIntegrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which TenantIntegration to fetch.
     */
    where?: TenantIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantIntegrations to fetch.
     */
    orderBy?: TenantIntegrationOrderByWithRelationInput | TenantIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantIntegrations.
     */
    cursor?: TenantIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantIntegrations.
     */
    distinct?: TenantIntegrationScalarFieldEnum | TenantIntegrationScalarFieldEnum[]
  }

  /**
   * TenantIntegration findFirstOrThrow
   */
  export type TenantIntegrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which TenantIntegration to fetch.
     */
    where?: TenantIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantIntegrations to fetch.
     */
    orderBy?: TenantIntegrationOrderByWithRelationInput | TenantIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantIntegrations.
     */
    cursor?: TenantIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantIntegrations.
     */
    distinct?: TenantIntegrationScalarFieldEnum | TenantIntegrationScalarFieldEnum[]
  }

  /**
   * TenantIntegration findMany
   */
  export type TenantIntegrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * Filter, which TenantIntegrations to fetch.
     */
    where?: TenantIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantIntegrations to fetch.
     */
    orderBy?: TenantIntegrationOrderByWithRelationInput | TenantIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantIntegrations.
     */
    cursor?: TenantIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantIntegrations.
     */
    skip?: number
    distinct?: TenantIntegrationScalarFieldEnum | TenantIntegrationScalarFieldEnum[]
  }

  /**
   * TenantIntegration create
   */
  export type TenantIntegrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * The data needed to create a TenantIntegration.
     */
    data: XOR<TenantIntegrationCreateInput, TenantIntegrationUncheckedCreateInput>
  }

  /**
   * TenantIntegration createMany
   */
  export type TenantIntegrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantIntegrations.
     */
    data: TenantIntegrationCreateManyInput | TenantIntegrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantIntegration createManyAndReturn
   */
  export type TenantIntegrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * The data used to create many TenantIntegrations.
     */
    data: TenantIntegrationCreateManyInput | TenantIntegrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantIntegration update
   */
  export type TenantIntegrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * The data needed to update a TenantIntegration.
     */
    data: XOR<TenantIntegrationUpdateInput, TenantIntegrationUncheckedUpdateInput>
    /**
     * Choose, which TenantIntegration to update.
     */
    where: TenantIntegrationWhereUniqueInput
  }

  /**
   * TenantIntegration updateMany
   */
  export type TenantIntegrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantIntegrations.
     */
    data: XOR<TenantIntegrationUpdateManyMutationInput, TenantIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which TenantIntegrations to update
     */
    where?: TenantIntegrationWhereInput
    /**
     * Limit how many TenantIntegrations to update.
     */
    limit?: number
  }

  /**
   * TenantIntegration updateManyAndReturn
   */
  export type TenantIntegrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * The data used to update TenantIntegrations.
     */
    data: XOR<TenantIntegrationUpdateManyMutationInput, TenantIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which TenantIntegrations to update
     */
    where?: TenantIntegrationWhereInput
    /**
     * Limit how many TenantIntegrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantIntegration upsert
   */
  export type TenantIntegrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * The filter to search for the TenantIntegration to update in case it exists.
     */
    where: TenantIntegrationWhereUniqueInput
    /**
     * In case the TenantIntegration found by the `where` argument doesn't exist, create a new TenantIntegration with this data.
     */
    create: XOR<TenantIntegrationCreateInput, TenantIntegrationUncheckedCreateInput>
    /**
     * In case the TenantIntegration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantIntegrationUpdateInput, TenantIntegrationUncheckedUpdateInput>
  }

  /**
   * TenantIntegration delete
   */
  export type TenantIntegrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
    /**
     * Filter which TenantIntegration to delete.
     */
    where: TenantIntegrationWhereUniqueInput
  }

  /**
   * TenantIntegration deleteMany
   */
  export type TenantIntegrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantIntegrations to delete
     */
    where?: TenantIntegrationWhereInput
    /**
     * Limit how many TenantIntegrations to delete.
     */
    limit?: number
  }

  /**
   * TenantIntegration.usageLogs
   */
  export type TenantIntegration$usageLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    where?: IntegrationUsageLogWhereInput
    orderBy?: IntegrationUsageLogOrderByWithRelationInput | IntegrationUsageLogOrderByWithRelationInput[]
    cursor?: IntegrationUsageLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IntegrationUsageLogScalarFieldEnum | IntegrationUsageLogScalarFieldEnum[]
  }

  /**
   * TenantIntegration without action
   */
  export type TenantIntegrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantIntegration
     */
    select?: TenantIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantIntegration
     */
    omit?: TenantIntegrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantIntegrationInclude<ExtArgs> | null
  }


  /**
   * Model IntegrationUsageLog
   */

  export type AggregateIntegrationUsageLog = {
    _count: IntegrationUsageLogCountAggregateOutputType | null
    _min: IntegrationUsageLogMinAggregateOutputType | null
    _max: IntegrationUsageLogMaxAggregateOutputType | null
  }

  export type IntegrationUsageLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    integrationId: string | null
    action: string | null
    status: string | null
    createdAt: Date | null
  }

  export type IntegrationUsageLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    integrationId: string | null
    action: string | null
    status: string | null
    createdAt: Date | null
  }

  export type IntegrationUsageLogCountAggregateOutputType = {
    id: number
    tenantId: number
    integrationId: number
    action: number
    status: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type IntegrationUsageLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    integrationId?: true
    action?: true
    status?: true
    createdAt?: true
  }

  export type IntegrationUsageLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    integrationId?: true
    action?: true
    status?: true
    createdAt?: true
  }

  export type IntegrationUsageLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    integrationId?: true
    action?: true
    status?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type IntegrationUsageLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IntegrationUsageLog to aggregate.
     */
    where?: IntegrationUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationUsageLogs to fetch.
     */
    orderBy?: IntegrationUsageLogOrderByWithRelationInput | IntegrationUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IntegrationUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IntegrationUsageLogs
    **/
    _count?: true | IntegrationUsageLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IntegrationUsageLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IntegrationUsageLogMaxAggregateInputType
  }

  export type GetIntegrationUsageLogAggregateType<T extends IntegrationUsageLogAggregateArgs> = {
        [P in keyof T & keyof AggregateIntegrationUsageLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIntegrationUsageLog[P]>
      : GetScalarType<T[P], AggregateIntegrationUsageLog[P]>
  }




  export type IntegrationUsageLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IntegrationUsageLogWhereInput
    orderBy?: IntegrationUsageLogOrderByWithAggregationInput | IntegrationUsageLogOrderByWithAggregationInput[]
    by: IntegrationUsageLogScalarFieldEnum[] | IntegrationUsageLogScalarFieldEnum
    having?: IntegrationUsageLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IntegrationUsageLogCountAggregateInputType | true
    _min?: IntegrationUsageLogMinAggregateInputType
    _max?: IntegrationUsageLogMaxAggregateInputType
  }

  export type IntegrationUsageLogGroupByOutputType = {
    id: string
    tenantId: string
    integrationId: string
    action: string
    status: string
    metadata: JsonValue | null
    createdAt: Date
    _count: IntegrationUsageLogCountAggregateOutputType | null
    _min: IntegrationUsageLogMinAggregateOutputType | null
    _max: IntegrationUsageLogMaxAggregateOutputType | null
  }

  type GetIntegrationUsageLogGroupByPayload<T extends IntegrationUsageLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IntegrationUsageLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IntegrationUsageLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IntegrationUsageLogGroupByOutputType[P]>
            : GetScalarType<T[P], IntegrationUsageLogGroupByOutputType[P]>
        }
      >
    >


  export type IntegrationUsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    integrationId?: boolean
    action?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    integration?: boolean | TenantIntegrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["integrationUsageLog"]>

  export type IntegrationUsageLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    integrationId?: boolean
    action?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    integration?: boolean | TenantIntegrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["integrationUsageLog"]>

  export type IntegrationUsageLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    integrationId?: boolean
    action?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    integration?: boolean | TenantIntegrationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["integrationUsageLog"]>

  export type IntegrationUsageLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    integrationId?: boolean
    action?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type IntegrationUsageLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "integrationId" | "action" | "status" | "metadata" | "createdAt", ExtArgs["result"]["integrationUsageLog"]>
  export type IntegrationUsageLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    integration?: boolean | TenantIntegrationDefaultArgs<ExtArgs>
  }
  export type IntegrationUsageLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    integration?: boolean | TenantIntegrationDefaultArgs<ExtArgs>
  }
  export type IntegrationUsageLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    integration?: boolean | TenantIntegrationDefaultArgs<ExtArgs>
  }

  export type $IntegrationUsageLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IntegrationUsageLog"
    objects: {
      integration: Prisma.$TenantIntegrationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      integrationId: string
      action: string
      status: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["integrationUsageLog"]>
    composites: {}
  }

  type IntegrationUsageLogGetPayload<S extends boolean | null | undefined | IntegrationUsageLogDefaultArgs> = $Result.GetResult<Prisma.$IntegrationUsageLogPayload, S>

  type IntegrationUsageLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IntegrationUsageLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IntegrationUsageLogCountAggregateInputType | true
    }

  export interface IntegrationUsageLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IntegrationUsageLog'], meta: { name: 'IntegrationUsageLog' } }
    /**
     * Find zero or one IntegrationUsageLog that matches the filter.
     * @param {IntegrationUsageLogFindUniqueArgs} args - Arguments to find a IntegrationUsageLog
     * @example
     * // Get one IntegrationUsageLog
     * const integrationUsageLog = await prisma.integrationUsageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IntegrationUsageLogFindUniqueArgs>(args: SelectSubset<T, IntegrationUsageLogFindUniqueArgs<ExtArgs>>): Prisma__IntegrationUsageLogClient<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IntegrationUsageLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IntegrationUsageLogFindUniqueOrThrowArgs} args - Arguments to find a IntegrationUsageLog
     * @example
     * // Get one IntegrationUsageLog
     * const integrationUsageLog = await prisma.integrationUsageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IntegrationUsageLogFindUniqueOrThrowArgs>(args: SelectSubset<T, IntegrationUsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IntegrationUsageLogClient<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IntegrationUsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationUsageLogFindFirstArgs} args - Arguments to find a IntegrationUsageLog
     * @example
     * // Get one IntegrationUsageLog
     * const integrationUsageLog = await prisma.integrationUsageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IntegrationUsageLogFindFirstArgs>(args?: SelectSubset<T, IntegrationUsageLogFindFirstArgs<ExtArgs>>): Prisma__IntegrationUsageLogClient<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IntegrationUsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationUsageLogFindFirstOrThrowArgs} args - Arguments to find a IntegrationUsageLog
     * @example
     * // Get one IntegrationUsageLog
     * const integrationUsageLog = await prisma.integrationUsageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IntegrationUsageLogFindFirstOrThrowArgs>(args?: SelectSubset<T, IntegrationUsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__IntegrationUsageLogClient<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IntegrationUsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationUsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IntegrationUsageLogs
     * const integrationUsageLogs = await prisma.integrationUsageLog.findMany()
     * 
     * // Get first 10 IntegrationUsageLogs
     * const integrationUsageLogs = await prisma.integrationUsageLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const integrationUsageLogWithIdOnly = await prisma.integrationUsageLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IntegrationUsageLogFindManyArgs>(args?: SelectSubset<T, IntegrationUsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IntegrationUsageLog.
     * @param {IntegrationUsageLogCreateArgs} args - Arguments to create a IntegrationUsageLog.
     * @example
     * // Create one IntegrationUsageLog
     * const IntegrationUsageLog = await prisma.integrationUsageLog.create({
     *   data: {
     *     // ... data to create a IntegrationUsageLog
     *   }
     * })
     * 
     */
    create<T extends IntegrationUsageLogCreateArgs>(args: SelectSubset<T, IntegrationUsageLogCreateArgs<ExtArgs>>): Prisma__IntegrationUsageLogClient<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IntegrationUsageLogs.
     * @param {IntegrationUsageLogCreateManyArgs} args - Arguments to create many IntegrationUsageLogs.
     * @example
     * // Create many IntegrationUsageLogs
     * const integrationUsageLog = await prisma.integrationUsageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IntegrationUsageLogCreateManyArgs>(args?: SelectSubset<T, IntegrationUsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IntegrationUsageLogs and returns the data saved in the database.
     * @param {IntegrationUsageLogCreateManyAndReturnArgs} args - Arguments to create many IntegrationUsageLogs.
     * @example
     * // Create many IntegrationUsageLogs
     * const integrationUsageLog = await prisma.integrationUsageLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IntegrationUsageLogs and only return the `id`
     * const integrationUsageLogWithIdOnly = await prisma.integrationUsageLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IntegrationUsageLogCreateManyAndReturnArgs>(args?: SelectSubset<T, IntegrationUsageLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IntegrationUsageLog.
     * @param {IntegrationUsageLogDeleteArgs} args - Arguments to delete one IntegrationUsageLog.
     * @example
     * // Delete one IntegrationUsageLog
     * const IntegrationUsageLog = await prisma.integrationUsageLog.delete({
     *   where: {
     *     // ... filter to delete one IntegrationUsageLog
     *   }
     * })
     * 
     */
    delete<T extends IntegrationUsageLogDeleteArgs>(args: SelectSubset<T, IntegrationUsageLogDeleteArgs<ExtArgs>>): Prisma__IntegrationUsageLogClient<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IntegrationUsageLog.
     * @param {IntegrationUsageLogUpdateArgs} args - Arguments to update one IntegrationUsageLog.
     * @example
     * // Update one IntegrationUsageLog
     * const integrationUsageLog = await prisma.integrationUsageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IntegrationUsageLogUpdateArgs>(args: SelectSubset<T, IntegrationUsageLogUpdateArgs<ExtArgs>>): Prisma__IntegrationUsageLogClient<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IntegrationUsageLogs.
     * @param {IntegrationUsageLogDeleteManyArgs} args - Arguments to filter IntegrationUsageLogs to delete.
     * @example
     * // Delete a few IntegrationUsageLogs
     * const { count } = await prisma.integrationUsageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IntegrationUsageLogDeleteManyArgs>(args?: SelectSubset<T, IntegrationUsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IntegrationUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationUsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IntegrationUsageLogs
     * const integrationUsageLog = await prisma.integrationUsageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IntegrationUsageLogUpdateManyArgs>(args: SelectSubset<T, IntegrationUsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IntegrationUsageLogs and returns the data updated in the database.
     * @param {IntegrationUsageLogUpdateManyAndReturnArgs} args - Arguments to update many IntegrationUsageLogs.
     * @example
     * // Update many IntegrationUsageLogs
     * const integrationUsageLog = await prisma.integrationUsageLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IntegrationUsageLogs and only return the `id`
     * const integrationUsageLogWithIdOnly = await prisma.integrationUsageLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends IntegrationUsageLogUpdateManyAndReturnArgs>(args: SelectSubset<T, IntegrationUsageLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IntegrationUsageLog.
     * @param {IntegrationUsageLogUpsertArgs} args - Arguments to update or create a IntegrationUsageLog.
     * @example
     * // Update or create a IntegrationUsageLog
     * const integrationUsageLog = await prisma.integrationUsageLog.upsert({
     *   create: {
     *     // ... data to create a IntegrationUsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IntegrationUsageLog we want to update
     *   }
     * })
     */
    upsert<T extends IntegrationUsageLogUpsertArgs>(args: SelectSubset<T, IntegrationUsageLogUpsertArgs<ExtArgs>>): Prisma__IntegrationUsageLogClient<$Result.GetResult<Prisma.$IntegrationUsageLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IntegrationUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationUsageLogCountArgs} args - Arguments to filter IntegrationUsageLogs to count.
     * @example
     * // Count the number of IntegrationUsageLogs
     * const count = await prisma.integrationUsageLog.count({
     *   where: {
     *     // ... the filter for the IntegrationUsageLogs we want to count
     *   }
     * })
    **/
    count<T extends IntegrationUsageLogCountArgs>(
      args?: Subset<T, IntegrationUsageLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IntegrationUsageLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IntegrationUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationUsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IntegrationUsageLogAggregateArgs>(args: Subset<T, IntegrationUsageLogAggregateArgs>): Prisma.PrismaPromise<GetIntegrationUsageLogAggregateType<T>>

    /**
     * Group by IntegrationUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationUsageLogGroupByArgs} args - Group by arguments.
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
      T extends IntegrationUsageLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IntegrationUsageLogGroupByArgs['orderBy'] }
        : { orderBy?: IntegrationUsageLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, IntegrationUsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIntegrationUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IntegrationUsageLog model
   */
  readonly fields: IntegrationUsageLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IntegrationUsageLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IntegrationUsageLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    integration<T extends TenantIntegrationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantIntegrationDefaultArgs<ExtArgs>>): Prisma__TenantIntegrationClient<$Result.GetResult<Prisma.$TenantIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the IntegrationUsageLog model
   */
  interface IntegrationUsageLogFieldRefs {
    readonly id: FieldRef<"IntegrationUsageLog", 'String'>
    readonly tenantId: FieldRef<"IntegrationUsageLog", 'String'>
    readonly integrationId: FieldRef<"IntegrationUsageLog", 'String'>
    readonly action: FieldRef<"IntegrationUsageLog", 'String'>
    readonly status: FieldRef<"IntegrationUsageLog", 'String'>
    readonly metadata: FieldRef<"IntegrationUsageLog", 'Json'>
    readonly createdAt: FieldRef<"IntegrationUsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IntegrationUsageLog findUnique
   */
  export type IntegrationUsageLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationUsageLog to fetch.
     */
    where: IntegrationUsageLogWhereUniqueInput
  }

  /**
   * IntegrationUsageLog findUniqueOrThrow
   */
  export type IntegrationUsageLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationUsageLog to fetch.
     */
    where: IntegrationUsageLogWhereUniqueInput
  }

  /**
   * IntegrationUsageLog findFirst
   */
  export type IntegrationUsageLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationUsageLog to fetch.
     */
    where?: IntegrationUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationUsageLogs to fetch.
     */
    orderBy?: IntegrationUsageLogOrderByWithRelationInput | IntegrationUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IntegrationUsageLogs.
     */
    cursor?: IntegrationUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntegrationUsageLogs.
     */
    distinct?: IntegrationUsageLogScalarFieldEnum | IntegrationUsageLogScalarFieldEnum[]
  }

  /**
   * IntegrationUsageLog findFirstOrThrow
   */
  export type IntegrationUsageLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationUsageLog to fetch.
     */
    where?: IntegrationUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationUsageLogs to fetch.
     */
    orderBy?: IntegrationUsageLogOrderByWithRelationInput | IntegrationUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IntegrationUsageLogs.
     */
    cursor?: IntegrationUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IntegrationUsageLogs.
     */
    distinct?: IntegrationUsageLogScalarFieldEnum | IntegrationUsageLogScalarFieldEnum[]
  }

  /**
   * IntegrationUsageLog findMany
   */
  export type IntegrationUsageLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which IntegrationUsageLogs to fetch.
     */
    where?: IntegrationUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IntegrationUsageLogs to fetch.
     */
    orderBy?: IntegrationUsageLogOrderByWithRelationInput | IntegrationUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IntegrationUsageLogs.
     */
    cursor?: IntegrationUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IntegrationUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IntegrationUsageLogs.
     */
    skip?: number
    distinct?: IntegrationUsageLogScalarFieldEnum | IntegrationUsageLogScalarFieldEnum[]
  }

  /**
   * IntegrationUsageLog create
   */
  export type IntegrationUsageLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * The data needed to create a IntegrationUsageLog.
     */
    data: XOR<IntegrationUsageLogCreateInput, IntegrationUsageLogUncheckedCreateInput>
  }

  /**
   * IntegrationUsageLog createMany
   */
  export type IntegrationUsageLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IntegrationUsageLogs.
     */
    data: IntegrationUsageLogCreateManyInput | IntegrationUsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IntegrationUsageLog createManyAndReturn
   */
  export type IntegrationUsageLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * The data used to create many IntegrationUsageLogs.
     */
    data: IntegrationUsageLogCreateManyInput | IntegrationUsageLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IntegrationUsageLog update
   */
  export type IntegrationUsageLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * The data needed to update a IntegrationUsageLog.
     */
    data: XOR<IntegrationUsageLogUpdateInput, IntegrationUsageLogUncheckedUpdateInput>
    /**
     * Choose, which IntegrationUsageLog to update.
     */
    where: IntegrationUsageLogWhereUniqueInput
  }

  /**
   * IntegrationUsageLog updateMany
   */
  export type IntegrationUsageLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IntegrationUsageLogs.
     */
    data: XOR<IntegrationUsageLogUpdateManyMutationInput, IntegrationUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which IntegrationUsageLogs to update
     */
    where?: IntegrationUsageLogWhereInput
    /**
     * Limit how many IntegrationUsageLogs to update.
     */
    limit?: number
  }

  /**
   * IntegrationUsageLog updateManyAndReturn
   */
  export type IntegrationUsageLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * The data used to update IntegrationUsageLogs.
     */
    data: XOR<IntegrationUsageLogUpdateManyMutationInput, IntegrationUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which IntegrationUsageLogs to update
     */
    where?: IntegrationUsageLogWhereInput
    /**
     * Limit how many IntegrationUsageLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * IntegrationUsageLog upsert
   */
  export type IntegrationUsageLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * The filter to search for the IntegrationUsageLog to update in case it exists.
     */
    where: IntegrationUsageLogWhereUniqueInput
    /**
     * In case the IntegrationUsageLog found by the `where` argument doesn't exist, create a new IntegrationUsageLog with this data.
     */
    create: XOR<IntegrationUsageLogCreateInput, IntegrationUsageLogUncheckedCreateInput>
    /**
     * In case the IntegrationUsageLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IntegrationUsageLogUpdateInput, IntegrationUsageLogUncheckedUpdateInput>
  }

  /**
   * IntegrationUsageLog delete
   */
  export type IntegrationUsageLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
    /**
     * Filter which IntegrationUsageLog to delete.
     */
    where: IntegrationUsageLogWhereUniqueInput
  }

  /**
   * IntegrationUsageLog deleteMany
   */
  export type IntegrationUsageLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IntegrationUsageLogs to delete
     */
    where?: IntegrationUsageLogWhereInput
    /**
     * Limit how many IntegrationUsageLogs to delete.
     */
    limit?: number
  }

  /**
   * IntegrationUsageLog without action
   */
  export type IntegrationUsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IntegrationUsageLog
     */
    select?: IntegrationUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IntegrationUsageLog
     */
    omit?: IntegrationUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IntegrationUsageLogInclude<ExtArgs> | null
  }


  /**
   * Model OAuthState
   */

  export type AggregateOAuthState = {
    _count: OAuthStateCountAggregateOutputType | null
    _min: OAuthStateMinAggregateOutputType | null
    _max: OAuthStateMaxAggregateOutputType | null
  }

  export type OAuthStateMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    providerId: string | null
    userId: string | null
    state: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type OAuthStateMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    providerId: string | null
    userId: string | null
    state: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type OAuthStateCountAggregateOutputType = {
    id: number
    tenantId: number
    providerId: number
    userId: number
    state: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type OAuthStateMinAggregateInputType = {
    id?: true
    tenantId?: true
    providerId?: true
    userId?: true
    state?: true
    expiresAt?: true
    createdAt?: true
  }

  export type OAuthStateMaxAggregateInputType = {
    id?: true
    tenantId?: true
    providerId?: true
    userId?: true
    state?: true
    expiresAt?: true
    createdAt?: true
  }

  export type OAuthStateCountAggregateInputType = {
    id?: true
    tenantId?: true
    providerId?: true
    userId?: true
    state?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type OAuthStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthState to aggregate.
     */
    where?: OAuthStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthStates to fetch.
     */
    orderBy?: OAuthStateOrderByWithRelationInput | OAuthStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthStates
    **/
    _count?: true | OAuthStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthStateMaxAggregateInputType
  }

  export type GetOAuthStateAggregateType<T extends OAuthStateAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthState[P]>
      : GetScalarType<T[P], AggregateOAuthState[P]>
  }




  export type OAuthStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthStateWhereInput
    orderBy?: OAuthStateOrderByWithAggregationInput | OAuthStateOrderByWithAggregationInput[]
    by: OAuthStateScalarFieldEnum[] | OAuthStateScalarFieldEnum
    having?: OAuthStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthStateCountAggregateInputType | true
    _min?: OAuthStateMinAggregateInputType
    _max?: OAuthStateMaxAggregateInputType
  }

  export type OAuthStateGroupByOutputType = {
    id: string
    tenantId: string
    providerId: string
    userId: string
    state: string
    expiresAt: Date
    createdAt: Date
    _count: OAuthStateCountAggregateOutputType | null
    _min: OAuthStateMinAggregateOutputType | null
    _max: OAuthStateMaxAggregateOutputType | null
  }

  type GetOAuthStateGroupByPayload<T extends OAuthStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthStateGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthStateGroupByOutputType[P]>
        }
      >
    >


  export type OAuthStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    providerId?: boolean
    userId?: boolean
    state?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["oAuthState"]>

  export type OAuthStateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    providerId?: boolean
    userId?: boolean
    state?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["oAuthState"]>

  export type OAuthStateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    providerId?: boolean
    userId?: boolean
    state?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["oAuthState"]>

  export type OAuthStateSelectScalar = {
    id?: boolean
    tenantId?: boolean
    providerId?: boolean
    userId?: boolean
    state?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type OAuthStateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "providerId" | "userId" | "state" | "expiresAt" | "createdAt", ExtArgs["result"]["oAuthState"]>

  export type $OAuthStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthState"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      providerId: string
      userId: string
      state: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["oAuthState"]>
    composites: {}
  }

  type OAuthStateGetPayload<S extends boolean | null | undefined | OAuthStateDefaultArgs> = $Result.GetResult<Prisma.$OAuthStatePayload, S>

  type OAuthStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthStateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthStateCountAggregateInputType | true
    }

  export interface OAuthStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthState'], meta: { name: 'OAuthState' } }
    /**
     * Find zero or one OAuthState that matches the filter.
     * @param {OAuthStateFindUniqueArgs} args - Arguments to find a OAuthState
     * @example
     * // Get one OAuthState
     * const oAuthState = await prisma.oAuthState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthStateFindUniqueArgs>(args: SelectSubset<T, OAuthStateFindUniqueArgs<ExtArgs>>): Prisma__OAuthStateClient<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthState that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthStateFindUniqueOrThrowArgs} args - Arguments to find a OAuthState
     * @example
     * // Get one OAuthState
     * const oAuthState = await prisma.oAuthState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthStateFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthStateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthStateClient<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthStateFindFirstArgs} args - Arguments to find a OAuthState
     * @example
     * // Get one OAuthState
     * const oAuthState = await prisma.oAuthState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthStateFindFirstArgs>(args?: SelectSubset<T, OAuthStateFindFirstArgs<ExtArgs>>): Prisma__OAuthStateClient<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthStateFindFirstOrThrowArgs} args - Arguments to find a OAuthState
     * @example
     * // Get one OAuthState
     * const oAuthState = await prisma.oAuthState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthStateFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthStateFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthStateClient<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthStateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthStates
     * const oAuthStates = await prisma.oAuthState.findMany()
     * 
     * // Get first 10 OAuthStates
     * const oAuthStates = await prisma.oAuthState.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthStateWithIdOnly = await prisma.oAuthState.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthStateFindManyArgs>(args?: SelectSubset<T, OAuthStateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthState.
     * @param {OAuthStateCreateArgs} args - Arguments to create a OAuthState.
     * @example
     * // Create one OAuthState
     * const OAuthState = await prisma.oAuthState.create({
     *   data: {
     *     // ... data to create a OAuthState
     *   }
     * })
     * 
     */
    create<T extends OAuthStateCreateArgs>(args: SelectSubset<T, OAuthStateCreateArgs<ExtArgs>>): Prisma__OAuthStateClient<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthStates.
     * @param {OAuthStateCreateManyArgs} args - Arguments to create many OAuthStates.
     * @example
     * // Create many OAuthStates
     * const oAuthState = await prisma.oAuthState.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthStateCreateManyArgs>(args?: SelectSubset<T, OAuthStateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthStates and returns the data saved in the database.
     * @param {OAuthStateCreateManyAndReturnArgs} args - Arguments to create many OAuthStates.
     * @example
     * // Create many OAuthStates
     * const oAuthState = await prisma.oAuthState.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthStates and only return the `id`
     * const oAuthStateWithIdOnly = await prisma.oAuthState.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthStateCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthStateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthState.
     * @param {OAuthStateDeleteArgs} args - Arguments to delete one OAuthState.
     * @example
     * // Delete one OAuthState
     * const OAuthState = await prisma.oAuthState.delete({
     *   where: {
     *     // ... filter to delete one OAuthState
     *   }
     * })
     * 
     */
    delete<T extends OAuthStateDeleteArgs>(args: SelectSubset<T, OAuthStateDeleteArgs<ExtArgs>>): Prisma__OAuthStateClient<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthState.
     * @param {OAuthStateUpdateArgs} args - Arguments to update one OAuthState.
     * @example
     * // Update one OAuthState
     * const oAuthState = await prisma.oAuthState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthStateUpdateArgs>(args: SelectSubset<T, OAuthStateUpdateArgs<ExtArgs>>): Prisma__OAuthStateClient<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthStates.
     * @param {OAuthStateDeleteManyArgs} args - Arguments to filter OAuthStates to delete.
     * @example
     * // Delete a few OAuthStates
     * const { count } = await prisma.oAuthState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthStateDeleteManyArgs>(args?: SelectSubset<T, OAuthStateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthStates
     * const oAuthState = await prisma.oAuthState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthStateUpdateManyArgs>(args: SelectSubset<T, OAuthStateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthStates and returns the data updated in the database.
     * @param {OAuthStateUpdateManyAndReturnArgs} args - Arguments to update many OAuthStates.
     * @example
     * // Update many OAuthStates
     * const oAuthState = await prisma.oAuthState.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthStates and only return the `id`
     * const oAuthStateWithIdOnly = await prisma.oAuthState.updateManyAndReturn({
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
    updateManyAndReturn<T extends OAuthStateUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthStateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthState.
     * @param {OAuthStateUpsertArgs} args - Arguments to update or create a OAuthState.
     * @example
     * // Update or create a OAuthState
     * const oAuthState = await prisma.oAuthState.upsert({
     *   create: {
     *     // ... data to create a OAuthState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthState we want to update
     *   }
     * })
     */
    upsert<T extends OAuthStateUpsertArgs>(args: SelectSubset<T, OAuthStateUpsertArgs<ExtArgs>>): Prisma__OAuthStateClient<$Result.GetResult<Prisma.$OAuthStatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthStateCountArgs} args - Arguments to filter OAuthStates to count.
     * @example
     * // Count the number of OAuthStates
     * const count = await prisma.oAuthState.count({
     *   where: {
     *     // ... the filter for the OAuthStates we want to count
     *   }
     * })
    **/
    count<T extends OAuthStateCountArgs>(
      args?: Subset<T, OAuthStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OAuthStateAggregateArgs>(args: Subset<T, OAuthStateAggregateArgs>): Prisma.PrismaPromise<GetOAuthStateAggregateType<T>>

    /**
     * Group by OAuthState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthStateGroupByArgs} args - Group by arguments.
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
      T extends OAuthStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthStateGroupByArgs['orderBy'] }
        : { orderBy?: OAuthStateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OAuthStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthState model
   */
  readonly fields: OAuthStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the OAuthState model
   */
  interface OAuthStateFieldRefs {
    readonly id: FieldRef<"OAuthState", 'String'>
    readonly tenantId: FieldRef<"OAuthState", 'String'>
    readonly providerId: FieldRef<"OAuthState", 'String'>
    readonly userId: FieldRef<"OAuthState", 'String'>
    readonly state: FieldRef<"OAuthState", 'String'>
    readonly expiresAt: FieldRef<"OAuthState", 'DateTime'>
    readonly createdAt: FieldRef<"OAuthState", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthState findUnique
   */
  export type OAuthStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * Filter, which OAuthState to fetch.
     */
    where: OAuthStateWhereUniqueInput
  }

  /**
   * OAuthState findUniqueOrThrow
   */
  export type OAuthStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * Filter, which OAuthState to fetch.
     */
    where: OAuthStateWhereUniqueInput
  }

  /**
   * OAuthState findFirst
   */
  export type OAuthStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * Filter, which OAuthState to fetch.
     */
    where?: OAuthStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthStates to fetch.
     */
    orderBy?: OAuthStateOrderByWithRelationInput | OAuthStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthStates.
     */
    cursor?: OAuthStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthStates.
     */
    distinct?: OAuthStateScalarFieldEnum | OAuthStateScalarFieldEnum[]
  }

  /**
   * OAuthState findFirstOrThrow
   */
  export type OAuthStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * Filter, which OAuthState to fetch.
     */
    where?: OAuthStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthStates to fetch.
     */
    orderBy?: OAuthStateOrderByWithRelationInput | OAuthStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthStates.
     */
    cursor?: OAuthStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthStates.
     */
    distinct?: OAuthStateScalarFieldEnum | OAuthStateScalarFieldEnum[]
  }

  /**
   * OAuthState findMany
   */
  export type OAuthStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * Filter, which OAuthStates to fetch.
     */
    where?: OAuthStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthStates to fetch.
     */
    orderBy?: OAuthStateOrderByWithRelationInput | OAuthStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthStates.
     */
    cursor?: OAuthStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthStates.
     */
    skip?: number
    distinct?: OAuthStateScalarFieldEnum | OAuthStateScalarFieldEnum[]
  }

  /**
   * OAuthState create
   */
  export type OAuthStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * The data needed to create a OAuthState.
     */
    data: XOR<OAuthStateCreateInput, OAuthStateUncheckedCreateInput>
  }

  /**
   * OAuthState createMany
   */
  export type OAuthStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthStates.
     */
    data: OAuthStateCreateManyInput | OAuthStateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthState createManyAndReturn
   */
  export type OAuthStateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthStates.
     */
    data: OAuthStateCreateManyInput | OAuthStateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthState update
   */
  export type OAuthStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * The data needed to update a OAuthState.
     */
    data: XOR<OAuthStateUpdateInput, OAuthStateUncheckedUpdateInput>
    /**
     * Choose, which OAuthState to update.
     */
    where: OAuthStateWhereUniqueInput
  }

  /**
   * OAuthState updateMany
   */
  export type OAuthStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthStates.
     */
    data: XOR<OAuthStateUpdateManyMutationInput, OAuthStateUncheckedUpdateManyInput>
    /**
     * Filter which OAuthStates to update
     */
    where?: OAuthStateWhereInput
    /**
     * Limit how many OAuthStates to update.
     */
    limit?: number
  }

  /**
   * OAuthState updateManyAndReturn
   */
  export type OAuthStateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * The data used to update OAuthStates.
     */
    data: XOR<OAuthStateUpdateManyMutationInput, OAuthStateUncheckedUpdateManyInput>
    /**
     * Filter which OAuthStates to update
     */
    where?: OAuthStateWhereInput
    /**
     * Limit how many OAuthStates to update.
     */
    limit?: number
  }

  /**
   * OAuthState upsert
   */
  export type OAuthStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * The filter to search for the OAuthState to update in case it exists.
     */
    where: OAuthStateWhereUniqueInput
    /**
     * In case the OAuthState found by the `where` argument doesn't exist, create a new OAuthState with this data.
     */
    create: XOR<OAuthStateCreateInput, OAuthStateUncheckedCreateInput>
    /**
     * In case the OAuthState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthStateUpdateInput, OAuthStateUncheckedUpdateInput>
  }

  /**
   * OAuthState delete
   */
  export type OAuthStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
    /**
     * Filter which OAuthState to delete.
     */
    where: OAuthStateWhereUniqueInput
  }

  /**
   * OAuthState deleteMany
   */
  export type OAuthStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthStates to delete
     */
    where?: OAuthStateWhereInput
    /**
     * Limit how many OAuthStates to delete.
     */
    limit?: number
  }

  /**
   * OAuthState without action
   */
  export type OAuthStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthState
     */
    select?: OAuthStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthState
     */
    omit?: OAuthStateOmit<ExtArgs> | null
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


  export const IntegrationProviderScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    category: 'category',
    description: 'description',
    authType: 'authType',
    createdAt: 'createdAt'
  };

  export type IntegrationProviderScalarFieldEnum = (typeof IntegrationProviderScalarFieldEnum)[keyof typeof IntegrationProviderScalarFieldEnum]


  export const TenantIntegrationScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    providerId: 'providerId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    apiKey: 'apiKey',
    apiSecret: 'apiSecret',
    metadata: 'metadata',
    expiresAt: 'expiresAt',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantIntegrationScalarFieldEnum = (typeof TenantIntegrationScalarFieldEnum)[keyof typeof TenantIntegrationScalarFieldEnum]


  export const IntegrationUsageLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    integrationId: 'integrationId',
    action: 'action',
    status: 'status',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type IntegrationUsageLogScalarFieldEnum = (typeof IntegrationUsageLogScalarFieldEnum)[keyof typeof IntegrationUsageLogScalarFieldEnum]


  export const OAuthStateScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    providerId: 'providerId',
    userId: 'userId',
    state: 'state',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type OAuthStateScalarFieldEnum = (typeof OAuthStateScalarFieldEnum)[keyof typeof OAuthStateScalarFieldEnum]


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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


  export type IntegrationProviderWhereInput = {
    AND?: IntegrationProviderWhereInput | IntegrationProviderWhereInput[]
    OR?: IntegrationProviderWhereInput[]
    NOT?: IntegrationProviderWhereInput | IntegrationProviderWhereInput[]
    id?: StringFilter<"IntegrationProvider"> | string
    slug?: StringFilter<"IntegrationProvider"> | string
    name?: StringFilter<"IntegrationProvider"> | string
    category?: StringFilter<"IntegrationProvider"> | string
    description?: StringFilter<"IntegrationProvider"> | string
    authType?: StringFilter<"IntegrationProvider"> | string
    createdAt?: DateTimeFilter<"IntegrationProvider"> | Date | string
    integrations?: TenantIntegrationListRelationFilter
  }

  export type IntegrationProviderOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    authType?: SortOrder
    createdAt?: SortOrder
    integrations?: TenantIntegrationOrderByRelationAggregateInput
  }

  export type IntegrationProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: IntegrationProviderWhereInput | IntegrationProviderWhereInput[]
    OR?: IntegrationProviderWhereInput[]
    NOT?: IntegrationProviderWhereInput | IntegrationProviderWhereInput[]
    name?: StringFilter<"IntegrationProvider"> | string
    category?: StringFilter<"IntegrationProvider"> | string
    description?: StringFilter<"IntegrationProvider"> | string
    authType?: StringFilter<"IntegrationProvider"> | string
    createdAt?: DateTimeFilter<"IntegrationProvider"> | Date | string
    integrations?: TenantIntegrationListRelationFilter
  }, "id" | "slug">

  export type IntegrationProviderOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    authType?: SortOrder
    createdAt?: SortOrder
    _count?: IntegrationProviderCountOrderByAggregateInput
    _max?: IntegrationProviderMaxOrderByAggregateInput
    _min?: IntegrationProviderMinOrderByAggregateInput
  }

  export type IntegrationProviderScalarWhereWithAggregatesInput = {
    AND?: IntegrationProviderScalarWhereWithAggregatesInput | IntegrationProviderScalarWhereWithAggregatesInput[]
    OR?: IntegrationProviderScalarWhereWithAggregatesInput[]
    NOT?: IntegrationProviderScalarWhereWithAggregatesInput | IntegrationProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IntegrationProvider"> | string
    slug?: StringWithAggregatesFilter<"IntegrationProvider"> | string
    name?: StringWithAggregatesFilter<"IntegrationProvider"> | string
    category?: StringWithAggregatesFilter<"IntegrationProvider"> | string
    description?: StringWithAggregatesFilter<"IntegrationProvider"> | string
    authType?: StringWithAggregatesFilter<"IntegrationProvider"> | string
    createdAt?: DateTimeWithAggregatesFilter<"IntegrationProvider"> | Date | string
  }

  export type TenantIntegrationWhereInput = {
    AND?: TenantIntegrationWhereInput | TenantIntegrationWhereInput[]
    OR?: TenantIntegrationWhereInput[]
    NOT?: TenantIntegrationWhereInput | TenantIntegrationWhereInput[]
    id?: StringFilter<"TenantIntegration"> | string
    tenantId?: StringFilter<"TenantIntegration"> | string
    providerId?: StringFilter<"TenantIntegration"> | string
    accessToken?: StringNullableFilter<"TenantIntegration"> | string | null
    refreshToken?: StringNullableFilter<"TenantIntegration"> | string | null
    apiKey?: StringNullableFilter<"TenantIntegration"> | string | null
    apiSecret?: StringNullableFilter<"TenantIntegration"> | string | null
    metadata?: JsonNullableFilter<"TenantIntegration">
    expiresAt?: DateTimeNullableFilter<"TenantIntegration"> | Date | string | null
    status?: StringFilter<"TenantIntegration"> | string
    createdAt?: DateTimeFilter<"TenantIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"TenantIntegration"> | Date | string
    provider?: XOR<IntegrationProviderScalarRelationFilter, IntegrationProviderWhereInput>
    usageLogs?: IntegrationUsageLogListRelationFilter
  }

  export type TenantIntegrationOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    apiKey?: SortOrderInput | SortOrder
    apiSecret?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    provider?: IntegrationProviderOrderByWithRelationInput
    usageLogs?: IntegrationUsageLogOrderByRelationAggregateInput
  }

  export type TenantIntegrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_providerId?: TenantIntegrationTenantIdProviderIdCompoundUniqueInput
    AND?: TenantIntegrationWhereInput | TenantIntegrationWhereInput[]
    OR?: TenantIntegrationWhereInput[]
    NOT?: TenantIntegrationWhereInput | TenantIntegrationWhereInput[]
    tenantId?: StringFilter<"TenantIntegration"> | string
    providerId?: StringFilter<"TenantIntegration"> | string
    accessToken?: StringNullableFilter<"TenantIntegration"> | string | null
    refreshToken?: StringNullableFilter<"TenantIntegration"> | string | null
    apiKey?: StringNullableFilter<"TenantIntegration"> | string | null
    apiSecret?: StringNullableFilter<"TenantIntegration"> | string | null
    metadata?: JsonNullableFilter<"TenantIntegration">
    expiresAt?: DateTimeNullableFilter<"TenantIntegration"> | Date | string | null
    status?: StringFilter<"TenantIntegration"> | string
    createdAt?: DateTimeFilter<"TenantIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"TenantIntegration"> | Date | string
    provider?: XOR<IntegrationProviderScalarRelationFilter, IntegrationProviderWhereInput>
    usageLogs?: IntegrationUsageLogListRelationFilter
  }, "id" | "tenantId_providerId">

  export type TenantIntegrationOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    apiKey?: SortOrderInput | SortOrder
    apiSecret?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantIntegrationCountOrderByAggregateInput
    _max?: TenantIntegrationMaxOrderByAggregateInput
    _min?: TenantIntegrationMinOrderByAggregateInput
  }

  export type TenantIntegrationScalarWhereWithAggregatesInput = {
    AND?: TenantIntegrationScalarWhereWithAggregatesInput | TenantIntegrationScalarWhereWithAggregatesInput[]
    OR?: TenantIntegrationScalarWhereWithAggregatesInput[]
    NOT?: TenantIntegrationScalarWhereWithAggregatesInput | TenantIntegrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantIntegration"> | string
    tenantId?: StringWithAggregatesFilter<"TenantIntegration"> | string
    providerId?: StringWithAggregatesFilter<"TenantIntegration"> | string
    accessToken?: StringNullableWithAggregatesFilter<"TenantIntegration"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"TenantIntegration"> | string | null
    apiKey?: StringNullableWithAggregatesFilter<"TenantIntegration"> | string | null
    apiSecret?: StringNullableWithAggregatesFilter<"TenantIntegration"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"TenantIntegration">
    expiresAt?: DateTimeNullableWithAggregatesFilter<"TenantIntegration"> | Date | string | null
    status?: StringWithAggregatesFilter<"TenantIntegration"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TenantIntegration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TenantIntegration"> | Date | string
  }

  export type IntegrationUsageLogWhereInput = {
    AND?: IntegrationUsageLogWhereInput | IntegrationUsageLogWhereInput[]
    OR?: IntegrationUsageLogWhereInput[]
    NOT?: IntegrationUsageLogWhereInput | IntegrationUsageLogWhereInput[]
    id?: StringFilter<"IntegrationUsageLog"> | string
    tenantId?: StringFilter<"IntegrationUsageLog"> | string
    integrationId?: StringFilter<"IntegrationUsageLog"> | string
    action?: StringFilter<"IntegrationUsageLog"> | string
    status?: StringFilter<"IntegrationUsageLog"> | string
    metadata?: JsonNullableFilter<"IntegrationUsageLog">
    createdAt?: DateTimeFilter<"IntegrationUsageLog"> | Date | string
    integration?: XOR<TenantIntegrationScalarRelationFilter, TenantIntegrationWhereInput>
  }

  export type IntegrationUsageLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    integration?: TenantIntegrationOrderByWithRelationInput
  }

  export type IntegrationUsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IntegrationUsageLogWhereInput | IntegrationUsageLogWhereInput[]
    OR?: IntegrationUsageLogWhereInput[]
    NOT?: IntegrationUsageLogWhereInput | IntegrationUsageLogWhereInput[]
    tenantId?: StringFilter<"IntegrationUsageLog"> | string
    integrationId?: StringFilter<"IntegrationUsageLog"> | string
    action?: StringFilter<"IntegrationUsageLog"> | string
    status?: StringFilter<"IntegrationUsageLog"> | string
    metadata?: JsonNullableFilter<"IntegrationUsageLog">
    createdAt?: DateTimeFilter<"IntegrationUsageLog"> | Date | string
    integration?: XOR<TenantIntegrationScalarRelationFilter, TenantIntegrationWhereInput>
  }, "id">

  export type IntegrationUsageLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: IntegrationUsageLogCountOrderByAggregateInput
    _max?: IntegrationUsageLogMaxOrderByAggregateInput
    _min?: IntegrationUsageLogMinOrderByAggregateInput
  }

  export type IntegrationUsageLogScalarWhereWithAggregatesInput = {
    AND?: IntegrationUsageLogScalarWhereWithAggregatesInput | IntegrationUsageLogScalarWhereWithAggregatesInput[]
    OR?: IntegrationUsageLogScalarWhereWithAggregatesInput[]
    NOT?: IntegrationUsageLogScalarWhereWithAggregatesInput | IntegrationUsageLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IntegrationUsageLog"> | string
    tenantId?: StringWithAggregatesFilter<"IntegrationUsageLog"> | string
    integrationId?: StringWithAggregatesFilter<"IntegrationUsageLog"> | string
    action?: StringWithAggregatesFilter<"IntegrationUsageLog"> | string
    status?: StringWithAggregatesFilter<"IntegrationUsageLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"IntegrationUsageLog">
    createdAt?: DateTimeWithAggregatesFilter<"IntegrationUsageLog"> | Date | string
  }

  export type OAuthStateWhereInput = {
    AND?: OAuthStateWhereInput | OAuthStateWhereInput[]
    OR?: OAuthStateWhereInput[]
    NOT?: OAuthStateWhereInput | OAuthStateWhereInput[]
    id?: StringFilter<"OAuthState"> | string
    tenantId?: StringFilter<"OAuthState"> | string
    providerId?: StringFilter<"OAuthState"> | string
    userId?: StringFilter<"OAuthState"> | string
    state?: StringFilter<"OAuthState"> | string
    expiresAt?: DateTimeFilter<"OAuthState"> | Date | string
    createdAt?: DateTimeFilter<"OAuthState"> | Date | string
  }

  export type OAuthStateOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    state?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthStateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    state?: string
    AND?: OAuthStateWhereInput | OAuthStateWhereInput[]
    OR?: OAuthStateWhereInput[]
    NOT?: OAuthStateWhereInput | OAuthStateWhereInput[]
    tenantId?: StringFilter<"OAuthState"> | string
    providerId?: StringFilter<"OAuthState"> | string
    userId?: StringFilter<"OAuthState"> | string
    expiresAt?: DateTimeFilter<"OAuthState"> | Date | string
    createdAt?: DateTimeFilter<"OAuthState"> | Date | string
  }, "id" | "state">

  export type OAuthStateOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    state?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: OAuthStateCountOrderByAggregateInput
    _max?: OAuthStateMaxOrderByAggregateInput
    _min?: OAuthStateMinOrderByAggregateInput
  }

  export type OAuthStateScalarWhereWithAggregatesInput = {
    AND?: OAuthStateScalarWhereWithAggregatesInput | OAuthStateScalarWhereWithAggregatesInput[]
    OR?: OAuthStateScalarWhereWithAggregatesInput[]
    NOT?: OAuthStateScalarWhereWithAggregatesInput | OAuthStateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthState"> | string
    tenantId?: StringWithAggregatesFilter<"OAuthState"> | string
    providerId?: StringWithAggregatesFilter<"OAuthState"> | string
    userId?: StringWithAggregatesFilter<"OAuthState"> | string
    state?: StringWithAggregatesFilter<"OAuthState"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OAuthState"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"OAuthState"> | Date | string
  }

  export type IntegrationProviderCreateInput = {
    id?: string
    slug: string
    name: string
    category: string
    description: string
    authType: string
    createdAt?: Date | string
    integrations?: TenantIntegrationCreateNestedManyWithoutProviderInput
  }

  export type IntegrationProviderUncheckedCreateInput = {
    id?: string
    slug: string
    name: string
    category: string
    description: string
    authType: string
    createdAt?: Date | string
    integrations?: TenantIntegrationUncheckedCreateNestedManyWithoutProviderInput
  }

  export type IntegrationProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    integrations?: TenantIntegrationUpdateManyWithoutProviderNestedInput
  }

  export type IntegrationProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    integrations?: TenantIntegrationUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type IntegrationProviderCreateManyInput = {
    id?: string
    slug: string
    name: string
    category: string
    description: string
    authType: string
    createdAt?: Date | string
  }

  export type IntegrationProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantIntegrationCreateInput = {
    id?: string
    tenantId: string
    accessToken?: string | null
    refreshToken?: string | null
    apiKey?: string | null
    apiSecret?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    provider: IntegrationProviderCreateNestedOneWithoutIntegrationsInput
    usageLogs?: IntegrationUsageLogCreateNestedManyWithoutIntegrationInput
  }

  export type TenantIntegrationUncheckedCreateInput = {
    id?: string
    tenantId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    apiKey?: string | null
    apiSecret?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    usageLogs?: IntegrationUsageLogUncheckedCreateNestedManyWithoutIntegrationInput
  }

  export type TenantIntegrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: IntegrationProviderUpdateOneRequiredWithoutIntegrationsNestedInput
    usageLogs?: IntegrationUsageLogUpdateManyWithoutIntegrationNestedInput
  }

  export type TenantIntegrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLogs?: IntegrationUsageLogUncheckedUpdateManyWithoutIntegrationNestedInput
  }

  export type TenantIntegrationCreateManyInput = {
    id?: string
    tenantId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    apiKey?: string | null
    apiSecret?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantIntegrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantIntegrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUsageLogCreateInput = {
    id?: string
    tenantId: string
    action: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    integration: TenantIntegrationCreateNestedOneWithoutUsageLogsInput
  }

  export type IntegrationUsageLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    integrationId: string
    action: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type IntegrationUsageLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    integration?: TenantIntegrationUpdateOneRequiredWithoutUsageLogsNestedInput
  }

  export type IntegrationUsageLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUsageLogCreateManyInput = {
    id?: string
    tenantId: string
    integrationId: string
    action: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type IntegrationUsageLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUsageLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    integrationId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthStateCreateInput = {
    id?: string
    tenantId: string
    providerId: string
    userId: string
    state: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OAuthStateUncheckedCreateInput = {
    id?: string
    tenantId: string
    providerId: string
    userId: string
    state: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OAuthStateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthStateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthStateCreateManyInput = {
    id?: string
    tenantId: string
    providerId: string
    userId: string
    state: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type OAuthStateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthStateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type TenantIntegrationListRelationFilter = {
    every?: TenantIntegrationWhereInput
    some?: TenantIntegrationWhereInput
    none?: TenantIntegrationWhereInput
  }

  export type TenantIntegrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IntegrationProviderCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    authType?: SortOrder
    createdAt?: SortOrder
  }

  export type IntegrationProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    authType?: SortOrder
    createdAt?: SortOrder
  }

  export type IntegrationProviderMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    category?: SortOrder
    description?: SortOrder
    authType?: SortOrder
    createdAt?: SortOrder
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

  export type IntegrationProviderScalarRelationFilter = {
    is?: IntegrationProviderWhereInput
    isNot?: IntegrationProviderWhereInput
  }

  export type IntegrationUsageLogListRelationFilter = {
    every?: IntegrationUsageLogWhereInput
    some?: IntegrationUsageLogWhereInput
    none?: IntegrationUsageLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type IntegrationUsageLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantIntegrationTenantIdProviderIdCompoundUniqueInput = {
    tenantId: string
    providerId: string
  }

  export type TenantIntegrationCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    metadata?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantIntegrationMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantIntegrationMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    apiKey?: SortOrder
    apiSecret?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type TenantIntegrationScalarRelationFilter = {
    is?: TenantIntegrationWhereInput
    isNot?: TenantIntegrationWhereInput
  }

  export type IntegrationUsageLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type IntegrationUsageLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type IntegrationUsageLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    integrationId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthStateCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    state?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthStateMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    state?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OAuthStateMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    state?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantIntegrationCreateNestedManyWithoutProviderInput = {
    create?: XOR<TenantIntegrationCreateWithoutProviderInput, TenantIntegrationUncheckedCreateWithoutProviderInput> | TenantIntegrationCreateWithoutProviderInput[] | TenantIntegrationUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: TenantIntegrationCreateOrConnectWithoutProviderInput | TenantIntegrationCreateOrConnectWithoutProviderInput[]
    createMany?: TenantIntegrationCreateManyProviderInputEnvelope
    connect?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
  }

  export type TenantIntegrationUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<TenantIntegrationCreateWithoutProviderInput, TenantIntegrationUncheckedCreateWithoutProviderInput> | TenantIntegrationCreateWithoutProviderInput[] | TenantIntegrationUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: TenantIntegrationCreateOrConnectWithoutProviderInput | TenantIntegrationCreateOrConnectWithoutProviderInput[]
    createMany?: TenantIntegrationCreateManyProviderInputEnvelope
    connect?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TenantIntegrationUpdateManyWithoutProviderNestedInput = {
    create?: XOR<TenantIntegrationCreateWithoutProviderInput, TenantIntegrationUncheckedCreateWithoutProviderInput> | TenantIntegrationCreateWithoutProviderInput[] | TenantIntegrationUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: TenantIntegrationCreateOrConnectWithoutProviderInput | TenantIntegrationCreateOrConnectWithoutProviderInput[]
    upsert?: TenantIntegrationUpsertWithWhereUniqueWithoutProviderInput | TenantIntegrationUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: TenantIntegrationCreateManyProviderInputEnvelope
    set?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
    disconnect?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
    delete?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
    connect?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
    update?: TenantIntegrationUpdateWithWhereUniqueWithoutProviderInput | TenantIntegrationUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: TenantIntegrationUpdateManyWithWhereWithoutProviderInput | TenantIntegrationUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: TenantIntegrationScalarWhereInput | TenantIntegrationScalarWhereInput[]
  }

  export type TenantIntegrationUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<TenantIntegrationCreateWithoutProviderInput, TenantIntegrationUncheckedCreateWithoutProviderInput> | TenantIntegrationCreateWithoutProviderInput[] | TenantIntegrationUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: TenantIntegrationCreateOrConnectWithoutProviderInput | TenantIntegrationCreateOrConnectWithoutProviderInput[]
    upsert?: TenantIntegrationUpsertWithWhereUniqueWithoutProviderInput | TenantIntegrationUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: TenantIntegrationCreateManyProviderInputEnvelope
    set?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
    disconnect?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
    delete?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
    connect?: TenantIntegrationWhereUniqueInput | TenantIntegrationWhereUniqueInput[]
    update?: TenantIntegrationUpdateWithWhereUniqueWithoutProviderInput | TenantIntegrationUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: TenantIntegrationUpdateManyWithWhereWithoutProviderInput | TenantIntegrationUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: TenantIntegrationScalarWhereInput | TenantIntegrationScalarWhereInput[]
  }

  export type IntegrationProviderCreateNestedOneWithoutIntegrationsInput = {
    create?: XOR<IntegrationProviderCreateWithoutIntegrationsInput, IntegrationProviderUncheckedCreateWithoutIntegrationsInput>
    connectOrCreate?: IntegrationProviderCreateOrConnectWithoutIntegrationsInput
    connect?: IntegrationProviderWhereUniqueInput
  }

  export type IntegrationUsageLogCreateNestedManyWithoutIntegrationInput = {
    create?: XOR<IntegrationUsageLogCreateWithoutIntegrationInput, IntegrationUsageLogUncheckedCreateWithoutIntegrationInput> | IntegrationUsageLogCreateWithoutIntegrationInput[] | IntegrationUsageLogUncheckedCreateWithoutIntegrationInput[]
    connectOrCreate?: IntegrationUsageLogCreateOrConnectWithoutIntegrationInput | IntegrationUsageLogCreateOrConnectWithoutIntegrationInput[]
    createMany?: IntegrationUsageLogCreateManyIntegrationInputEnvelope
    connect?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
  }

  export type IntegrationUsageLogUncheckedCreateNestedManyWithoutIntegrationInput = {
    create?: XOR<IntegrationUsageLogCreateWithoutIntegrationInput, IntegrationUsageLogUncheckedCreateWithoutIntegrationInput> | IntegrationUsageLogCreateWithoutIntegrationInput[] | IntegrationUsageLogUncheckedCreateWithoutIntegrationInput[]
    connectOrCreate?: IntegrationUsageLogCreateOrConnectWithoutIntegrationInput | IntegrationUsageLogCreateOrConnectWithoutIntegrationInput[]
    createMany?: IntegrationUsageLogCreateManyIntegrationInputEnvelope
    connect?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntegrationProviderUpdateOneRequiredWithoutIntegrationsNestedInput = {
    create?: XOR<IntegrationProviderCreateWithoutIntegrationsInput, IntegrationProviderUncheckedCreateWithoutIntegrationsInput>
    connectOrCreate?: IntegrationProviderCreateOrConnectWithoutIntegrationsInput
    upsert?: IntegrationProviderUpsertWithoutIntegrationsInput
    connect?: IntegrationProviderWhereUniqueInput
    update?: XOR<XOR<IntegrationProviderUpdateToOneWithWhereWithoutIntegrationsInput, IntegrationProviderUpdateWithoutIntegrationsInput>, IntegrationProviderUncheckedUpdateWithoutIntegrationsInput>
  }

  export type IntegrationUsageLogUpdateManyWithoutIntegrationNestedInput = {
    create?: XOR<IntegrationUsageLogCreateWithoutIntegrationInput, IntegrationUsageLogUncheckedCreateWithoutIntegrationInput> | IntegrationUsageLogCreateWithoutIntegrationInput[] | IntegrationUsageLogUncheckedCreateWithoutIntegrationInput[]
    connectOrCreate?: IntegrationUsageLogCreateOrConnectWithoutIntegrationInput | IntegrationUsageLogCreateOrConnectWithoutIntegrationInput[]
    upsert?: IntegrationUsageLogUpsertWithWhereUniqueWithoutIntegrationInput | IntegrationUsageLogUpsertWithWhereUniqueWithoutIntegrationInput[]
    createMany?: IntegrationUsageLogCreateManyIntegrationInputEnvelope
    set?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
    disconnect?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
    delete?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
    connect?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
    update?: IntegrationUsageLogUpdateWithWhereUniqueWithoutIntegrationInput | IntegrationUsageLogUpdateWithWhereUniqueWithoutIntegrationInput[]
    updateMany?: IntegrationUsageLogUpdateManyWithWhereWithoutIntegrationInput | IntegrationUsageLogUpdateManyWithWhereWithoutIntegrationInput[]
    deleteMany?: IntegrationUsageLogScalarWhereInput | IntegrationUsageLogScalarWhereInput[]
  }

  export type IntegrationUsageLogUncheckedUpdateManyWithoutIntegrationNestedInput = {
    create?: XOR<IntegrationUsageLogCreateWithoutIntegrationInput, IntegrationUsageLogUncheckedCreateWithoutIntegrationInput> | IntegrationUsageLogCreateWithoutIntegrationInput[] | IntegrationUsageLogUncheckedCreateWithoutIntegrationInput[]
    connectOrCreate?: IntegrationUsageLogCreateOrConnectWithoutIntegrationInput | IntegrationUsageLogCreateOrConnectWithoutIntegrationInput[]
    upsert?: IntegrationUsageLogUpsertWithWhereUniqueWithoutIntegrationInput | IntegrationUsageLogUpsertWithWhereUniqueWithoutIntegrationInput[]
    createMany?: IntegrationUsageLogCreateManyIntegrationInputEnvelope
    set?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
    disconnect?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
    delete?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
    connect?: IntegrationUsageLogWhereUniqueInput | IntegrationUsageLogWhereUniqueInput[]
    update?: IntegrationUsageLogUpdateWithWhereUniqueWithoutIntegrationInput | IntegrationUsageLogUpdateWithWhereUniqueWithoutIntegrationInput[]
    updateMany?: IntegrationUsageLogUpdateManyWithWhereWithoutIntegrationInput | IntegrationUsageLogUpdateManyWithWhereWithoutIntegrationInput[]
    deleteMany?: IntegrationUsageLogScalarWhereInput | IntegrationUsageLogScalarWhereInput[]
  }

  export type TenantIntegrationCreateNestedOneWithoutUsageLogsInput = {
    create?: XOR<TenantIntegrationCreateWithoutUsageLogsInput, TenantIntegrationUncheckedCreateWithoutUsageLogsInput>
    connectOrCreate?: TenantIntegrationCreateOrConnectWithoutUsageLogsInput
    connect?: TenantIntegrationWhereUniqueInput
  }

  export type TenantIntegrationUpdateOneRequiredWithoutUsageLogsNestedInput = {
    create?: XOR<TenantIntegrationCreateWithoutUsageLogsInput, TenantIntegrationUncheckedCreateWithoutUsageLogsInput>
    connectOrCreate?: TenantIntegrationCreateOrConnectWithoutUsageLogsInput
    upsert?: TenantIntegrationUpsertWithoutUsageLogsInput
    connect?: TenantIntegrationWhereUniqueInput
    update?: XOR<XOR<TenantIntegrationUpdateToOneWithWhereWithoutUsageLogsInput, TenantIntegrationUpdateWithoutUsageLogsInput>, TenantIntegrationUncheckedUpdateWithoutUsageLogsInput>
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

  export type TenantIntegrationCreateWithoutProviderInput = {
    id?: string
    tenantId: string
    accessToken?: string | null
    refreshToken?: string | null
    apiKey?: string | null
    apiSecret?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    usageLogs?: IntegrationUsageLogCreateNestedManyWithoutIntegrationInput
  }

  export type TenantIntegrationUncheckedCreateWithoutProviderInput = {
    id?: string
    tenantId: string
    accessToken?: string | null
    refreshToken?: string | null
    apiKey?: string | null
    apiSecret?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    usageLogs?: IntegrationUsageLogUncheckedCreateNestedManyWithoutIntegrationInput
  }

  export type TenantIntegrationCreateOrConnectWithoutProviderInput = {
    where: TenantIntegrationWhereUniqueInput
    create: XOR<TenantIntegrationCreateWithoutProviderInput, TenantIntegrationUncheckedCreateWithoutProviderInput>
  }

  export type TenantIntegrationCreateManyProviderInputEnvelope = {
    data: TenantIntegrationCreateManyProviderInput | TenantIntegrationCreateManyProviderInput[]
    skipDuplicates?: boolean
  }

  export type TenantIntegrationUpsertWithWhereUniqueWithoutProviderInput = {
    where: TenantIntegrationWhereUniqueInput
    update: XOR<TenantIntegrationUpdateWithoutProviderInput, TenantIntegrationUncheckedUpdateWithoutProviderInput>
    create: XOR<TenantIntegrationCreateWithoutProviderInput, TenantIntegrationUncheckedCreateWithoutProviderInput>
  }

  export type TenantIntegrationUpdateWithWhereUniqueWithoutProviderInput = {
    where: TenantIntegrationWhereUniqueInput
    data: XOR<TenantIntegrationUpdateWithoutProviderInput, TenantIntegrationUncheckedUpdateWithoutProviderInput>
  }

  export type TenantIntegrationUpdateManyWithWhereWithoutProviderInput = {
    where: TenantIntegrationScalarWhereInput
    data: XOR<TenantIntegrationUpdateManyMutationInput, TenantIntegrationUncheckedUpdateManyWithoutProviderInput>
  }

  export type TenantIntegrationScalarWhereInput = {
    AND?: TenantIntegrationScalarWhereInput | TenantIntegrationScalarWhereInput[]
    OR?: TenantIntegrationScalarWhereInput[]
    NOT?: TenantIntegrationScalarWhereInput | TenantIntegrationScalarWhereInput[]
    id?: StringFilter<"TenantIntegration"> | string
    tenantId?: StringFilter<"TenantIntegration"> | string
    providerId?: StringFilter<"TenantIntegration"> | string
    accessToken?: StringNullableFilter<"TenantIntegration"> | string | null
    refreshToken?: StringNullableFilter<"TenantIntegration"> | string | null
    apiKey?: StringNullableFilter<"TenantIntegration"> | string | null
    apiSecret?: StringNullableFilter<"TenantIntegration"> | string | null
    metadata?: JsonNullableFilter<"TenantIntegration">
    expiresAt?: DateTimeNullableFilter<"TenantIntegration"> | Date | string | null
    status?: StringFilter<"TenantIntegration"> | string
    createdAt?: DateTimeFilter<"TenantIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"TenantIntegration"> | Date | string
  }

  export type IntegrationProviderCreateWithoutIntegrationsInput = {
    id?: string
    slug: string
    name: string
    category: string
    description: string
    authType: string
    createdAt?: Date | string
  }

  export type IntegrationProviderUncheckedCreateWithoutIntegrationsInput = {
    id?: string
    slug: string
    name: string
    category: string
    description: string
    authType: string
    createdAt?: Date | string
  }

  export type IntegrationProviderCreateOrConnectWithoutIntegrationsInput = {
    where: IntegrationProviderWhereUniqueInput
    create: XOR<IntegrationProviderCreateWithoutIntegrationsInput, IntegrationProviderUncheckedCreateWithoutIntegrationsInput>
  }

  export type IntegrationUsageLogCreateWithoutIntegrationInput = {
    id?: string
    tenantId: string
    action: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type IntegrationUsageLogUncheckedCreateWithoutIntegrationInput = {
    id?: string
    tenantId: string
    action: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type IntegrationUsageLogCreateOrConnectWithoutIntegrationInput = {
    where: IntegrationUsageLogWhereUniqueInput
    create: XOR<IntegrationUsageLogCreateWithoutIntegrationInput, IntegrationUsageLogUncheckedCreateWithoutIntegrationInput>
  }

  export type IntegrationUsageLogCreateManyIntegrationInputEnvelope = {
    data: IntegrationUsageLogCreateManyIntegrationInput | IntegrationUsageLogCreateManyIntegrationInput[]
    skipDuplicates?: boolean
  }

  export type IntegrationProviderUpsertWithoutIntegrationsInput = {
    update: XOR<IntegrationProviderUpdateWithoutIntegrationsInput, IntegrationProviderUncheckedUpdateWithoutIntegrationsInput>
    create: XOR<IntegrationProviderCreateWithoutIntegrationsInput, IntegrationProviderUncheckedCreateWithoutIntegrationsInput>
    where?: IntegrationProviderWhereInput
  }

  export type IntegrationProviderUpdateToOneWithWhereWithoutIntegrationsInput = {
    where?: IntegrationProviderWhereInput
    data: XOR<IntegrationProviderUpdateWithoutIntegrationsInput, IntegrationProviderUncheckedUpdateWithoutIntegrationsInput>
  }

  export type IntegrationProviderUpdateWithoutIntegrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationProviderUncheckedUpdateWithoutIntegrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    authType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUsageLogUpsertWithWhereUniqueWithoutIntegrationInput = {
    where: IntegrationUsageLogWhereUniqueInput
    update: XOR<IntegrationUsageLogUpdateWithoutIntegrationInput, IntegrationUsageLogUncheckedUpdateWithoutIntegrationInput>
    create: XOR<IntegrationUsageLogCreateWithoutIntegrationInput, IntegrationUsageLogUncheckedCreateWithoutIntegrationInput>
  }

  export type IntegrationUsageLogUpdateWithWhereUniqueWithoutIntegrationInput = {
    where: IntegrationUsageLogWhereUniqueInput
    data: XOR<IntegrationUsageLogUpdateWithoutIntegrationInput, IntegrationUsageLogUncheckedUpdateWithoutIntegrationInput>
  }

  export type IntegrationUsageLogUpdateManyWithWhereWithoutIntegrationInput = {
    where: IntegrationUsageLogScalarWhereInput
    data: XOR<IntegrationUsageLogUpdateManyMutationInput, IntegrationUsageLogUncheckedUpdateManyWithoutIntegrationInput>
  }

  export type IntegrationUsageLogScalarWhereInput = {
    AND?: IntegrationUsageLogScalarWhereInput | IntegrationUsageLogScalarWhereInput[]
    OR?: IntegrationUsageLogScalarWhereInput[]
    NOT?: IntegrationUsageLogScalarWhereInput | IntegrationUsageLogScalarWhereInput[]
    id?: StringFilter<"IntegrationUsageLog"> | string
    tenantId?: StringFilter<"IntegrationUsageLog"> | string
    integrationId?: StringFilter<"IntegrationUsageLog"> | string
    action?: StringFilter<"IntegrationUsageLog"> | string
    status?: StringFilter<"IntegrationUsageLog"> | string
    metadata?: JsonNullableFilter<"IntegrationUsageLog">
    createdAt?: DateTimeFilter<"IntegrationUsageLog"> | Date | string
  }

  export type TenantIntegrationCreateWithoutUsageLogsInput = {
    id?: string
    tenantId: string
    accessToken?: string | null
    refreshToken?: string | null
    apiKey?: string | null
    apiSecret?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    provider: IntegrationProviderCreateNestedOneWithoutIntegrationsInput
  }

  export type TenantIntegrationUncheckedCreateWithoutUsageLogsInput = {
    id?: string
    tenantId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    apiKey?: string | null
    apiSecret?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantIntegrationCreateOrConnectWithoutUsageLogsInput = {
    where: TenantIntegrationWhereUniqueInput
    create: XOR<TenantIntegrationCreateWithoutUsageLogsInput, TenantIntegrationUncheckedCreateWithoutUsageLogsInput>
  }

  export type TenantIntegrationUpsertWithoutUsageLogsInput = {
    update: XOR<TenantIntegrationUpdateWithoutUsageLogsInput, TenantIntegrationUncheckedUpdateWithoutUsageLogsInput>
    create: XOR<TenantIntegrationCreateWithoutUsageLogsInput, TenantIntegrationUncheckedCreateWithoutUsageLogsInput>
    where?: TenantIntegrationWhereInput
  }

  export type TenantIntegrationUpdateToOneWithWhereWithoutUsageLogsInput = {
    where?: TenantIntegrationWhereInput
    data: XOR<TenantIntegrationUpdateWithoutUsageLogsInput, TenantIntegrationUncheckedUpdateWithoutUsageLogsInput>
  }

  export type TenantIntegrationUpdateWithoutUsageLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: IntegrationProviderUpdateOneRequiredWithoutIntegrationsNestedInput
  }

  export type TenantIntegrationUncheckedUpdateWithoutUsageLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantIntegrationCreateManyProviderInput = {
    id?: string
    tenantId: string
    accessToken?: string | null
    refreshToken?: string | null
    apiKey?: string | null
    apiSecret?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantIntegrationUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLogs?: IntegrationUsageLogUpdateManyWithoutIntegrationNestedInput
  }

  export type TenantIntegrationUncheckedUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLogs?: IntegrationUsageLogUncheckedUpdateManyWithoutIntegrationNestedInput
  }

  export type TenantIntegrationUncheckedUpdateManyWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUsageLogCreateManyIntegrationInput = {
    id?: string
    tenantId: string
    action: string
    status: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type IntegrationUsageLogUpdateWithoutIntegrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUsageLogUncheckedUpdateWithoutIntegrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUsageLogUncheckedUpdateManyWithoutIntegrationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
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