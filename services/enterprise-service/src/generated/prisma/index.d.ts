
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
 * Model SsoConfig
 * 
 */
export type SsoConfig = $Result.DefaultSelection<Prisma.$SsoConfigPayload>
/**
 * Model PermissionGroup
 * 
 */
export type PermissionGroup = $Result.DefaultSelection<Prisma.$PermissionGroupPayload>
/**
 * Model CustomRole
 * 
 */
export type CustomRole = $Result.DefaultSelection<Prisma.$CustomRolePayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model ApiKeyUsageLog
 * 
 */
export type ApiKeyUsageLog = $Result.DefaultSelection<Prisma.$ApiKeyUsageLogPayload>
/**
 * Model WebhookConfig
 * 
 */
export type WebhookConfig = $Result.DefaultSelection<Prisma.$WebhookConfigPayload>
/**
 * Model WebhookDelivery
 * 
 */
export type WebhookDelivery = $Result.DefaultSelection<Prisma.$WebhookDeliveryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SsoConfigs
 * const ssoConfigs = await prisma.ssoConfig.findMany()
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
   * // Fetch zero or more SsoConfigs
   * const ssoConfigs = await prisma.ssoConfig.findMany()
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
   * `prisma.ssoConfig`: Exposes CRUD operations for the **SsoConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SsoConfigs
    * const ssoConfigs = await prisma.ssoConfig.findMany()
    * ```
    */
  get ssoConfig(): Prisma.SsoConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permissionGroup`: Exposes CRUD operations for the **PermissionGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PermissionGroups
    * const permissionGroups = await prisma.permissionGroup.findMany()
    * ```
    */
  get permissionGroup(): Prisma.PermissionGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customRole`: Exposes CRUD operations for the **CustomRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomRoles
    * const customRoles = await prisma.customRole.findMany()
    * ```
    */
  get customRole(): Prisma.CustomRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKeyUsageLog`: Exposes CRUD operations for the **ApiKeyUsageLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeyUsageLogs
    * const apiKeyUsageLogs = await prisma.apiKeyUsageLog.findMany()
    * ```
    */
  get apiKeyUsageLog(): Prisma.ApiKeyUsageLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookConfig`: Exposes CRUD operations for the **WebhookConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookConfigs
    * const webhookConfigs = await prisma.webhookConfig.findMany()
    * ```
    */
  get webhookConfig(): Prisma.WebhookConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookDelivery`: Exposes CRUD operations for the **WebhookDelivery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookDeliveries
    * const webhookDeliveries = await prisma.webhookDelivery.findMany()
    * ```
    */
  get webhookDelivery(): Prisma.WebhookDeliveryDelegate<ExtArgs, ClientOptions>;
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
    SsoConfig: 'SsoConfig',
    PermissionGroup: 'PermissionGroup',
    CustomRole: 'CustomRole',
    AuditLog: 'AuditLog',
    ActivityLog: 'ActivityLog',
    ApiKey: 'ApiKey',
    ApiKeyUsageLog: 'ApiKeyUsageLog',
    WebhookConfig: 'WebhookConfig',
    WebhookDelivery: 'WebhookDelivery'
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
      modelProps: "ssoConfig" | "permissionGroup" | "customRole" | "auditLog" | "activityLog" | "apiKey" | "apiKeyUsageLog" | "webhookConfig" | "webhookDelivery"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SsoConfig: {
        payload: Prisma.$SsoConfigPayload<ExtArgs>
        fields: Prisma.SsoConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SsoConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SsoConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>
          }
          findFirst: {
            args: Prisma.SsoConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SsoConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>
          }
          findMany: {
            args: Prisma.SsoConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>[]
          }
          create: {
            args: Prisma.SsoConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>
          }
          createMany: {
            args: Prisma.SsoConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SsoConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>[]
          }
          delete: {
            args: Prisma.SsoConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>
          }
          update: {
            args: Prisma.SsoConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>
          }
          deleteMany: {
            args: Prisma.SsoConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SsoConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SsoConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>[]
          }
          upsert: {
            args: Prisma.SsoConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SsoConfigPayload>
          }
          aggregate: {
            args: Prisma.SsoConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSsoConfig>
          }
          groupBy: {
            args: Prisma.SsoConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SsoConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SsoConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SsoConfigCountAggregateOutputType> | number
          }
        }
      }
      PermissionGroup: {
        payload: Prisma.$PermissionGroupPayload<ExtArgs>
        fields: Prisma.PermissionGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>
          }
          findFirst: {
            args: Prisma.PermissionGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>
          }
          findMany: {
            args: Prisma.PermissionGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>[]
          }
          create: {
            args: Prisma.PermissionGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>
          }
          createMany: {
            args: Prisma.PermissionGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>[]
          }
          delete: {
            args: Prisma.PermissionGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>
          }
          update: {
            args: Prisma.PermissionGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>
          }
          deleteMany: {
            args: Prisma.PermissionGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>[]
          }
          upsert: {
            args: Prisma.PermissionGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionGroupPayload>
          }
          aggregate: {
            args: Prisma.PermissionGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermissionGroup>
          }
          groupBy: {
            args: Prisma.PermissionGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionGroupCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupCountAggregateOutputType> | number
          }
        }
      }
      CustomRole: {
        payload: Prisma.$CustomRolePayload<ExtArgs>
        fields: Prisma.CustomRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>
          }
          findFirst: {
            args: Prisma.CustomRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>
          }
          findMany: {
            args: Prisma.CustomRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>[]
          }
          create: {
            args: Prisma.CustomRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>
          }
          createMany: {
            args: Prisma.CustomRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>[]
          }
          delete: {
            args: Prisma.CustomRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>
          }
          update: {
            args: Prisma.CustomRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>
          }
          deleteMany: {
            args: Prisma.CustomRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>[]
          }
          upsert: {
            args: Prisma.CustomRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomRolePayload>
          }
          aggregate: {
            args: Prisma.CustomRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomRole>
          }
          groupBy: {
            args: Prisma.CustomRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomRoleCountArgs<ExtArgs>
            result: $Utils.Optional<CustomRoleCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      ApiKeyUsageLog: {
        payload: Prisma.$ApiKeyUsageLogPayload<ExtArgs>
        fields: Prisma.ApiKeyUsageLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyUsageLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyUsageLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyUsageLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyUsageLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>
          }
          findMany: {
            args: Prisma.ApiKeyUsageLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>[]
          }
          create: {
            args: Prisma.ApiKeyUsageLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>
          }
          createMany: {
            args: Prisma.ApiKeyUsageLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyUsageLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyUsageLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>
          }
          update: {
            args: Prisma.ApiKeyUsageLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyUsageLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUsageLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUsageLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUsageLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyUsageLogPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyUsageLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKeyUsageLog>
          }
          groupBy: {
            args: Prisma.ApiKeyUsageLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyUsageLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyUsageLogCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyUsageLogCountAggregateOutputType> | number
          }
        }
      }
      WebhookConfig: {
        payload: Prisma.$WebhookConfigPayload<ExtArgs>
        fields: Prisma.WebhookConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>
          }
          findFirst: {
            args: Prisma.WebhookConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>
          }
          findMany: {
            args: Prisma.WebhookConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>[]
          }
          create: {
            args: Prisma.WebhookConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>
          }
          createMany: {
            args: Prisma.WebhookConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>[]
          }
          delete: {
            args: Prisma.WebhookConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>
          }
          update: {
            args: Prisma.WebhookConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>
          }
          deleteMany: {
            args: Prisma.WebhookConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>[]
          }
          upsert: {
            args: Prisma.WebhookConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookConfigPayload>
          }
          aggregate: {
            args: Prisma.WebhookConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookConfig>
          }
          groupBy: {
            args: Prisma.WebhookConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookConfigCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookConfigCountAggregateOutputType> | number
          }
        }
      }
      WebhookDelivery: {
        payload: Prisma.$WebhookDeliveryPayload<ExtArgs>
        fields: Prisma.WebhookDeliveryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookDeliveryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookDeliveryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>
          }
          findFirst: {
            args: Prisma.WebhookDeliveryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookDeliveryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>
          }
          findMany: {
            args: Prisma.WebhookDeliveryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>[]
          }
          create: {
            args: Prisma.WebhookDeliveryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>
          }
          createMany: {
            args: Prisma.WebhookDeliveryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookDeliveryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>[]
          }
          delete: {
            args: Prisma.WebhookDeliveryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>
          }
          update: {
            args: Prisma.WebhookDeliveryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>
          }
          deleteMany: {
            args: Prisma.WebhookDeliveryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookDeliveryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookDeliveryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>[]
          }
          upsert: {
            args: Prisma.WebhookDeliveryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookDeliveryPayload>
          }
          aggregate: {
            args: Prisma.WebhookDeliveryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookDelivery>
          }
          groupBy: {
            args: Prisma.WebhookDeliveryGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookDeliveryGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookDeliveryCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookDeliveryCountAggregateOutputType> | number
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
    ssoConfig?: SsoConfigOmit
    permissionGroup?: PermissionGroupOmit
    customRole?: CustomRoleOmit
    auditLog?: AuditLogOmit
    activityLog?: ActivityLogOmit
    apiKey?: ApiKeyOmit
    apiKeyUsageLog?: ApiKeyUsageLogOmit
    webhookConfig?: WebhookConfigOmit
    webhookDelivery?: WebhookDeliveryOmit
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
   * Count Type PermissionGroupCountOutputType
   */

  export type PermissionGroupCountOutputType = {
    roles: number
  }

  export type PermissionGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermissionGroupCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * PermissionGroupCountOutputType without action
   */
  export type PermissionGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroupCountOutputType
     */
    select?: PermissionGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionGroupCountOutputType without action
   */
  export type PermissionGroupCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomRoleWhereInput
  }


  /**
   * Count Type CustomRoleCountOutputType
   */

  export type CustomRoleCountOutputType = {
    childRoles: number
  }

  export type CustomRoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    childRoles?: boolean | CustomRoleCountOutputTypeCountChildRolesArgs
  }

  // Custom InputTypes
  /**
   * CustomRoleCountOutputType without action
   */
  export type CustomRoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRoleCountOutputType
     */
    select?: CustomRoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomRoleCountOutputType without action
   */
  export type CustomRoleCountOutputTypeCountChildRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomRoleWhereInput
  }


  /**
   * Count Type ApiKeyCountOutputType
   */

  export type ApiKeyCountOutputType = {
    usageLogs: number
  }

  export type ApiKeyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usageLogs?: boolean | ApiKeyCountOutputTypeCountUsageLogsArgs
  }

  // Custom InputTypes
  /**
   * ApiKeyCountOutputType without action
   */
  export type ApiKeyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyCountOutputType
     */
    select?: ApiKeyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ApiKeyCountOutputType without action
   */
  export type ApiKeyCountOutputTypeCountUsageLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyUsageLogWhereInput
  }


  /**
   * Count Type WebhookConfigCountOutputType
   */

  export type WebhookConfigCountOutputType = {
    deliveries: number
  }

  export type WebhookConfigCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | WebhookConfigCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * WebhookConfigCountOutputType without action
   */
  export type WebhookConfigCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfigCountOutputType
     */
    select?: WebhookConfigCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WebhookConfigCountOutputType without action
   */
  export type WebhookConfigCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookDeliveryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model SsoConfig
   */

  export type AggregateSsoConfig = {
    _count: SsoConfigCountAggregateOutputType | null
    _min: SsoConfigMinAggregateOutputType | null
    _max: SsoConfigMaxAggregateOutputType | null
  }

  export type SsoConfigMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    name: string | null
    isEnabled: boolean | null
    entityId: string | null
    ssoUrl: string | null
    certificate: string | null
    clientId: string | null
    clientSecret: string | null
    issuerUrl: string | null
    metadataUrl: string | null
    redirectUri: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SsoConfigMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    provider: string | null
    name: string | null
    isEnabled: boolean | null
    entityId: string | null
    ssoUrl: string | null
    certificate: string | null
    clientId: string | null
    clientSecret: string | null
    issuerUrl: string | null
    metadataUrl: string | null
    redirectUri: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SsoConfigCountAggregateOutputType = {
    id: number
    tenantId: number
    provider: number
    name: number
    isEnabled: number
    entityId: number
    ssoUrl: number
    certificate: number
    clientId: number
    clientSecret: number
    issuerUrl: number
    metadataUrl: number
    redirectUri: number
    scopes: number
    attributeMap: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SsoConfigMinAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    name?: true
    isEnabled?: true
    entityId?: true
    ssoUrl?: true
    certificate?: true
    clientId?: true
    clientSecret?: true
    issuerUrl?: true
    metadataUrl?: true
    redirectUri?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SsoConfigMaxAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    name?: true
    isEnabled?: true
    entityId?: true
    ssoUrl?: true
    certificate?: true
    clientId?: true
    clientSecret?: true
    issuerUrl?: true
    metadataUrl?: true
    redirectUri?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SsoConfigCountAggregateInputType = {
    id?: true
    tenantId?: true
    provider?: true
    name?: true
    isEnabled?: true
    entityId?: true
    ssoUrl?: true
    certificate?: true
    clientId?: true
    clientSecret?: true
    issuerUrl?: true
    metadataUrl?: true
    redirectUri?: true
    scopes?: true
    attributeMap?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SsoConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SsoConfig to aggregate.
     */
    where?: SsoConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SsoConfigs to fetch.
     */
    orderBy?: SsoConfigOrderByWithRelationInput | SsoConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SsoConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SsoConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SsoConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SsoConfigs
    **/
    _count?: true | SsoConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SsoConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SsoConfigMaxAggregateInputType
  }

  export type GetSsoConfigAggregateType<T extends SsoConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSsoConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSsoConfig[P]>
      : GetScalarType<T[P], AggregateSsoConfig[P]>
  }




  export type SsoConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SsoConfigWhereInput
    orderBy?: SsoConfigOrderByWithAggregationInput | SsoConfigOrderByWithAggregationInput[]
    by: SsoConfigScalarFieldEnum[] | SsoConfigScalarFieldEnum
    having?: SsoConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SsoConfigCountAggregateInputType | true
    _min?: SsoConfigMinAggregateInputType
    _max?: SsoConfigMaxAggregateInputType
  }

  export type SsoConfigGroupByOutputType = {
    id: string
    tenantId: string
    provider: string
    name: string
    isEnabled: boolean
    entityId: string | null
    ssoUrl: string | null
    certificate: string | null
    clientId: string | null
    clientSecret: string | null
    issuerUrl: string | null
    metadataUrl: string | null
    redirectUri: string | null
    scopes: JsonValue | null
    attributeMap: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: SsoConfigCountAggregateOutputType | null
    _min: SsoConfigMinAggregateOutputType | null
    _max: SsoConfigMaxAggregateOutputType | null
  }

  type GetSsoConfigGroupByPayload<T extends SsoConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SsoConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SsoConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SsoConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SsoConfigGroupByOutputType[P]>
        }
      >
    >


  export type SsoConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    name?: boolean
    isEnabled?: boolean
    entityId?: boolean
    ssoUrl?: boolean
    certificate?: boolean
    clientId?: boolean
    clientSecret?: boolean
    issuerUrl?: boolean
    metadataUrl?: boolean
    redirectUri?: boolean
    scopes?: boolean
    attributeMap?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ssoConfig"]>

  export type SsoConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    name?: boolean
    isEnabled?: boolean
    entityId?: boolean
    ssoUrl?: boolean
    certificate?: boolean
    clientId?: boolean
    clientSecret?: boolean
    issuerUrl?: boolean
    metadataUrl?: boolean
    redirectUri?: boolean
    scopes?: boolean
    attributeMap?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ssoConfig"]>

  export type SsoConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    name?: boolean
    isEnabled?: boolean
    entityId?: boolean
    ssoUrl?: boolean
    certificate?: boolean
    clientId?: boolean
    clientSecret?: boolean
    issuerUrl?: boolean
    metadataUrl?: boolean
    redirectUri?: boolean
    scopes?: boolean
    attributeMap?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ssoConfig"]>

  export type SsoConfigSelectScalar = {
    id?: boolean
    tenantId?: boolean
    provider?: boolean
    name?: boolean
    isEnabled?: boolean
    entityId?: boolean
    ssoUrl?: boolean
    certificate?: boolean
    clientId?: boolean
    clientSecret?: boolean
    issuerUrl?: boolean
    metadataUrl?: boolean
    redirectUri?: boolean
    scopes?: boolean
    attributeMap?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SsoConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "provider" | "name" | "isEnabled" | "entityId" | "ssoUrl" | "certificate" | "clientId" | "clientSecret" | "issuerUrl" | "metadataUrl" | "redirectUri" | "scopes" | "attributeMap" | "createdAt" | "updatedAt", ExtArgs["result"]["ssoConfig"]>

  export type $SsoConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SsoConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      provider: string
      name: string
      isEnabled: boolean
      entityId: string | null
      ssoUrl: string | null
      certificate: string | null
      clientId: string | null
      clientSecret: string | null
      issuerUrl: string | null
      metadataUrl: string | null
      redirectUri: string | null
      scopes: Prisma.JsonValue | null
      attributeMap: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ssoConfig"]>
    composites: {}
  }

  type SsoConfigGetPayload<S extends boolean | null | undefined | SsoConfigDefaultArgs> = $Result.GetResult<Prisma.$SsoConfigPayload, S>

  type SsoConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SsoConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SsoConfigCountAggregateInputType | true
    }

  export interface SsoConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SsoConfig'], meta: { name: 'SsoConfig' } }
    /**
     * Find zero or one SsoConfig that matches the filter.
     * @param {SsoConfigFindUniqueArgs} args - Arguments to find a SsoConfig
     * @example
     * // Get one SsoConfig
     * const ssoConfig = await prisma.ssoConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SsoConfigFindUniqueArgs>(args: SelectSubset<T, SsoConfigFindUniqueArgs<ExtArgs>>): Prisma__SsoConfigClient<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SsoConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SsoConfigFindUniqueOrThrowArgs} args - Arguments to find a SsoConfig
     * @example
     * // Get one SsoConfig
     * const ssoConfig = await prisma.ssoConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SsoConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SsoConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SsoConfigClient<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SsoConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SsoConfigFindFirstArgs} args - Arguments to find a SsoConfig
     * @example
     * // Get one SsoConfig
     * const ssoConfig = await prisma.ssoConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SsoConfigFindFirstArgs>(args?: SelectSubset<T, SsoConfigFindFirstArgs<ExtArgs>>): Prisma__SsoConfigClient<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SsoConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SsoConfigFindFirstOrThrowArgs} args - Arguments to find a SsoConfig
     * @example
     * // Get one SsoConfig
     * const ssoConfig = await prisma.ssoConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SsoConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SsoConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SsoConfigClient<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SsoConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SsoConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SsoConfigs
     * const ssoConfigs = await prisma.ssoConfig.findMany()
     * 
     * // Get first 10 SsoConfigs
     * const ssoConfigs = await prisma.ssoConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ssoConfigWithIdOnly = await prisma.ssoConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SsoConfigFindManyArgs>(args?: SelectSubset<T, SsoConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SsoConfig.
     * @param {SsoConfigCreateArgs} args - Arguments to create a SsoConfig.
     * @example
     * // Create one SsoConfig
     * const SsoConfig = await prisma.ssoConfig.create({
     *   data: {
     *     // ... data to create a SsoConfig
     *   }
     * })
     * 
     */
    create<T extends SsoConfigCreateArgs>(args: SelectSubset<T, SsoConfigCreateArgs<ExtArgs>>): Prisma__SsoConfigClient<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SsoConfigs.
     * @param {SsoConfigCreateManyArgs} args - Arguments to create many SsoConfigs.
     * @example
     * // Create many SsoConfigs
     * const ssoConfig = await prisma.ssoConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SsoConfigCreateManyArgs>(args?: SelectSubset<T, SsoConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SsoConfigs and returns the data saved in the database.
     * @param {SsoConfigCreateManyAndReturnArgs} args - Arguments to create many SsoConfigs.
     * @example
     * // Create many SsoConfigs
     * const ssoConfig = await prisma.ssoConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SsoConfigs and only return the `id`
     * const ssoConfigWithIdOnly = await prisma.ssoConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SsoConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SsoConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SsoConfig.
     * @param {SsoConfigDeleteArgs} args - Arguments to delete one SsoConfig.
     * @example
     * // Delete one SsoConfig
     * const SsoConfig = await prisma.ssoConfig.delete({
     *   where: {
     *     // ... filter to delete one SsoConfig
     *   }
     * })
     * 
     */
    delete<T extends SsoConfigDeleteArgs>(args: SelectSubset<T, SsoConfigDeleteArgs<ExtArgs>>): Prisma__SsoConfigClient<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SsoConfig.
     * @param {SsoConfigUpdateArgs} args - Arguments to update one SsoConfig.
     * @example
     * // Update one SsoConfig
     * const ssoConfig = await prisma.ssoConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SsoConfigUpdateArgs>(args: SelectSubset<T, SsoConfigUpdateArgs<ExtArgs>>): Prisma__SsoConfigClient<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SsoConfigs.
     * @param {SsoConfigDeleteManyArgs} args - Arguments to filter SsoConfigs to delete.
     * @example
     * // Delete a few SsoConfigs
     * const { count } = await prisma.ssoConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SsoConfigDeleteManyArgs>(args?: SelectSubset<T, SsoConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SsoConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SsoConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SsoConfigs
     * const ssoConfig = await prisma.ssoConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SsoConfigUpdateManyArgs>(args: SelectSubset<T, SsoConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SsoConfigs and returns the data updated in the database.
     * @param {SsoConfigUpdateManyAndReturnArgs} args - Arguments to update many SsoConfigs.
     * @example
     * // Update many SsoConfigs
     * const ssoConfig = await prisma.ssoConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SsoConfigs and only return the `id`
     * const ssoConfigWithIdOnly = await prisma.ssoConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends SsoConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SsoConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SsoConfig.
     * @param {SsoConfigUpsertArgs} args - Arguments to update or create a SsoConfig.
     * @example
     * // Update or create a SsoConfig
     * const ssoConfig = await prisma.ssoConfig.upsert({
     *   create: {
     *     // ... data to create a SsoConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SsoConfig we want to update
     *   }
     * })
     */
    upsert<T extends SsoConfigUpsertArgs>(args: SelectSubset<T, SsoConfigUpsertArgs<ExtArgs>>): Prisma__SsoConfigClient<$Result.GetResult<Prisma.$SsoConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SsoConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SsoConfigCountArgs} args - Arguments to filter SsoConfigs to count.
     * @example
     * // Count the number of SsoConfigs
     * const count = await prisma.ssoConfig.count({
     *   where: {
     *     // ... the filter for the SsoConfigs we want to count
     *   }
     * })
    **/
    count<T extends SsoConfigCountArgs>(
      args?: Subset<T, SsoConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SsoConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SsoConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SsoConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SsoConfigAggregateArgs>(args: Subset<T, SsoConfigAggregateArgs>): Prisma.PrismaPromise<GetSsoConfigAggregateType<T>>

    /**
     * Group by SsoConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SsoConfigGroupByArgs} args - Group by arguments.
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
      T extends SsoConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SsoConfigGroupByArgs['orderBy'] }
        : { orderBy?: SsoConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SsoConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSsoConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SsoConfig model
   */
  readonly fields: SsoConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SsoConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SsoConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SsoConfig model
   */
  interface SsoConfigFieldRefs {
    readonly id: FieldRef<"SsoConfig", 'String'>
    readonly tenantId: FieldRef<"SsoConfig", 'String'>
    readonly provider: FieldRef<"SsoConfig", 'String'>
    readonly name: FieldRef<"SsoConfig", 'String'>
    readonly isEnabled: FieldRef<"SsoConfig", 'Boolean'>
    readonly entityId: FieldRef<"SsoConfig", 'String'>
    readonly ssoUrl: FieldRef<"SsoConfig", 'String'>
    readonly certificate: FieldRef<"SsoConfig", 'String'>
    readonly clientId: FieldRef<"SsoConfig", 'String'>
    readonly clientSecret: FieldRef<"SsoConfig", 'String'>
    readonly issuerUrl: FieldRef<"SsoConfig", 'String'>
    readonly metadataUrl: FieldRef<"SsoConfig", 'String'>
    readonly redirectUri: FieldRef<"SsoConfig", 'String'>
    readonly scopes: FieldRef<"SsoConfig", 'Json'>
    readonly attributeMap: FieldRef<"SsoConfig", 'Json'>
    readonly createdAt: FieldRef<"SsoConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"SsoConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SsoConfig findUnique
   */
  export type SsoConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * Filter, which SsoConfig to fetch.
     */
    where: SsoConfigWhereUniqueInput
  }

  /**
   * SsoConfig findUniqueOrThrow
   */
  export type SsoConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * Filter, which SsoConfig to fetch.
     */
    where: SsoConfigWhereUniqueInput
  }

  /**
   * SsoConfig findFirst
   */
  export type SsoConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * Filter, which SsoConfig to fetch.
     */
    where?: SsoConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SsoConfigs to fetch.
     */
    orderBy?: SsoConfigOrderByWithRelationInput | SsoConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SsoConfigs.
     */
    cursor?: SsoConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SsoConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SsoConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SsoConfigs.
     */
    distinct?: SsoConfigScalarFieldEnum | SsoConfigScalarFieldEnum[]
  }

  /**
   * SsoConfig findFirstOrThrow
   */
  export type SsoConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * Filter, which SsoConfig to fetch.
     */
    where?: SsoConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SsoConfigs to fetch.
     */
    orderBy?: SsoConfigOrderByWithRelationInput | SsoConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SsoConfigs.
     */
    cursor?: SsoConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SsoConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SsoConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SsoConfigs.
     */
    distinct?: SsoConfigScalarFieldEnum | SsoConfigScalarFieldEnum[]
  }

  /**
   * SsoConfig findMany
   */
  export type SsoConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * Filter, which SsoConfigs to fetch.
     */
    where?: SsoConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SsoConfigs to fetch.
     */
    orderBy?: SsoConfigOrderByWithRelationInput | SsoConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SsoConfigs.
     */
    cursor?: SsoConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SsoConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SsoConfigs.
     */
    skip?: number
    distinct?: SsoConfigScalarFieldEnum | SsoConfigScalarFieldEnum[]
  }

  /**
   * SsoConfig create
   */
  export type SsoConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SsoConfig.
     */
    data: XOR<SsoConfigCreateInput, SsoConfigUncheckedCreateInput>
  }

  /**
   * SsoConfig createMany
   */
  export type SsoConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SsoConfigs.
     */
    data: SsoConfigCreateManyInput | SsoConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SsoConfig createManyAndReturn
   */
  export type SsoConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SsoConfigs.
     */
    data: SsoConfigCreateManyInput | SsoConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SsoConfig update
   */
  export type SsoConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SsoConfig.
     */
    data: XOR<SsoConfigUpdateInput, SsoConfigUncheckedUpdateInput>
    /**
     * Choose, which SsoConfig to update.
     */
    where: SsoConfigWhereUniqueInput
  }

  /**
   * SsoConfig updateMany
   */
  export type SsoConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SsoConfigs.
     */
    data: XOR<SsoConfigUpdateManyMutationInput, SsoConfigUncheckedUpdateManyInput>
    /**
     * Filter which SsoConfigs to update
     */
    where?: SsoConfigWhereInput
    /**
     * Limit how many SsoConfigs to update.
     */
    limit?: number
  }

  /**
   * SsoConfig updateManyAndReturn
   */
  export type SsoConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * The data used to update SsoConfigs.
     */
    data: XOR<SsoConfigUpdateManyMutationInput, SsoConfigUncheckedUpdateManyInput>
    /**
     * Filter which SsoConfigs to update
     */
    where?: SsoConfigWhereInput
    /**
     * Limit how many SsoConfigs to update.
     */
    limit?: number
  }

  /**
   * SsoConfig upsert
   */
  export type SsoConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SsoConfig to update in case it exists.
     */
    where: SsoConfigWhereUniqueInput
    /**
     * In case the SsoConfig found by the `where` argument doesn't exist, create a new SsoConfig with this data.
     */
    create: XOR<SsoConfigCreateInput, SsoConfigUncheckedCreateInput>
    /**
     * In case the SsoConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SsoConfigUpdateInput, SsoConfigUncheckedUpdateInput>
  }

  /**
   * SsoConfig delete
   */
  export type SsoConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
    /**
     * Filter which SsoConfig to delete.
     */
    where: SsoConfigWhereUniqueInput
  }

  /**
   * SsoConfig deleteMany
   */
  export type SsoConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SsoConfigs to delete
     */
    where?: SsoConfigWhereInput
    /**
     * Limit how many SsoConfigs to delete.
     */
    limit?: number
  }

  /**
   * SsoConfig without action
   */
  export type SsoConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SsoConfig
     */
    select?: SsoConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SsoConfig
     */
    omit?: SsoConfigOmit<ExtArgs> | null
  }


  /**
   * Model PermissionGroup
   */

  export type AggregatePermissionGroup = {
    _count: PermissionGroupCountAggregateOutputType | null
    _min: PermissionGroupMinAggregateOutputType | null
    _max: PermissionGroupMaxAggregateOutputType | null
  }

  export type PermissionGroupMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionGroupMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionGroupCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    description: number
    permissions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PermissionGroupMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionGroupMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionGroupCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    description?: true
    permissions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PermissionGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermissionGroup to aggregate.
     */
    where?: PermissionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionGroups to fetch.
     */
    orderBy?: PermissionGroupOrderByWithRelationInput | PermissionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PermissionGroups
    **/
    _count?: true | PermissionGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionGroupMaxAggregateInputType
  }

  export type GetPermissionGroupAggregateType<T extends PermissionGroupAggregateArgs> = {
        [P in keyof T & keyof AggregatePermissionGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermissionGroup[P]>
      : GetScalarType<T[P], AggregatePermissionGroup[P]>
  }




  export type PermissionGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionGroupWhereInput
    orderBy?: PermissionGroupOrderByWithAggregationInput | PermissionGroupOrderByWithAggregationInput[]
    by: PermissionGroupScalarFieldEnum[] | PermissionGroupScalarFieldEnum
    having?: PermissionGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionGroupCountAggregateInputType | true
    _min?: PermissionGroupMinAggregateInputType
    _max?: PermissionGroupMaxAggregateInputType
  }

  export type PermissionGroupGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    description: string | null
    permissions: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: PermissionGroupCountAggregateOutputType | null
    _min: PermissionGroupMinAggregateOutputType | null
    _max: PermissionGroupMaxAggregateOutputType | null
  }

  type GetPermissionGroupGroupByPayload<T extends PermissionGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupGroupByOutputType[P]>
        }
      >
    >


  export type PermissionGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roles?: boolean | PermissionGroup$rolesArgs<ExtArgs>
    _count?: boolean | PermissionGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permissionGroup"]>

  export type PermissionGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permissionGroup"]>

  export type PermissionGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permissionGroup"]>

  export type PermissionGroupSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    description?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PermissionGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "description" | "permissions" | "createdAt" | "updatedAt", ExtArgs["result"]["permissionGroup"]>
  export type PermissionGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermissionGroup$rolesArgs<ExtArgs>
    _count?: boolean | PermissionGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermissionGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermissionGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PermissionGroup"
    objects: {
      roles: Prisma.$CustomRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      description: string | null
      permissions: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["permissionGroup"]>
    composites: {}
  }

  type PermissionGroupGetPayload<S extends boolean | null | undefined | PermissionGroupDefaultArgs> = $Result.GetResult<Prisma.$PermissionGroupPayload, S>

  type PermissionGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionGroupCountAggregateInputType | true
    }

  export interface PermissionGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PermissionGroup'], meta: { name: 'PermissionGroup' } }
    /**
     * Find zero or one PermissionGroup that matches the filter.
     * @param {PermissionGroupFindUniqueArgs} args - Arguments to find a PermissionGroup
     * @example
     * // Get one PermissionGroup
     * const permissionGroup = await prisma.permissionGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionGroupFindUniqueArgs>(args: SelectSubset<T, PermissionGroupFindUniqueArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PermissionGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionGroupFindUniqueOrThrowArgs} args - Arguments to find a PermissionGroup
     * @example
     * // Get one PermissionGroup
     * const permissionGroup = await prisma.permissionGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermissionGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupFindFirstArgs} args - Arguments to find a PermissionGroup
     * @example
     * // Get one PermissionGroup
     * const permissionGroup = await prisma.permissionGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionGroupFindFirstArgs>(args?: SelectSubset<T, PermissionGroupFindFirstArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermissionGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupFindFirstOrThrowArgs} args - Arguments to find a PermissionGroup
     * @example
     * // Get one PermissionGroup
     * const permissionGroup = await prisma.permissionGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PermissionGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PermissionGroups
     * const permissionGroups = await prisma.permissionGroup.findMany()
     * 
     * // Get first 10 PermissionGroups
     * const permissionGroups = await prisma.permissionGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionGroupWithIdOnly = await prisma.permissionGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionGroupFindManyArgs>(args?: SelectSubset<T, PermissionGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PermissionGroup.
     * @param {PermissionGroupCreateArgs} args - Arguments to create a PermissionGroup.
     * @example
     * // Create one PermissionGroup
     * const PermissionGroup = await prisma.permissionGroup.create({
     *   data: {
     *     // ... data to create a PermissionGroup
     *   }
     * })
     * 
     */
    create<T extends PermissionGroupCreateArgs>(args: SelectSubset<T, PermissionGroupCreateArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PermissionGroups.
     * @param {PermissionGroupCreateManyArgs} args - Arguments to create many PermissionGroups.
     * @example
     * // Create many PermissionGroups
     * const permissionGroup = await prisma.permissionGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionGroupCreateManyArgs>(args?: SelectSubset<T, PermissionGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PermissionGroups and returns the data saved in the database.
     * @param {PermissionGroupCreateManyAndReturnArgs} args - Arguments to create many PermissionGroups.
     * @example
     * // Create many PermissionGroups
     * const permissionGroup = await prisma.permissionGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PermissionGroups and only return the `id`
     * const permissionGroupWithIdOnly = await prisma.permissionGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PermissionGroup.
     * @param {PermissionGroupDeleteArgs} args - Arguments to delete one PermissionGroup.
     * @example
     * // Delete one PermissionGroup
     * const PermissionGroup = await prisma.permissionGroup.delete({
     *   where: {
     *     // ... filter to delete one PermissionGroup
     *   }
     * })
     * 
     */
    delete<T extends PermissionGroupDeleteArgs>(args: SelectSubset<T, PermissionGroupDeleteArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PermissionGroup.
     * @param {PermissionGroupUpdateArgs} args - Arguments to update one PermissionGroup.
     * @example
     * // Update one PermissionGroup
     * const permissionGroup = await prisma.permissionGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionGroupUpdateArgs>(args: SelectSubset<T, PermissionGroupUpdateArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PermissionGroups.
     * @param {PermissionGroupDeleteManyArgs} args - Arguments to filter PermissionGroups to delete.
     * @example
     * // Delete a few PermissionGroups
     * const { count } = await prisma.permissionGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionGroupDeleteManyArgs>(args?: SelectSubset<T, PermissionGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermissionGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PermissionGroups
     * const permissionGroup = await prisma.permissionGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionGroupUpdateManyArgs>(args: SelectSubset<T, PermissionGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermissionGroups and returns the data updated in the database.
     * @param {PermissionGroupUpdateManyAndReturnArgs} args - Arguments to update many PermissionGroups.
     * @example
     * // Update many PermissionGroups
     * const permissionGroup = await prisma.permissionGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PermissionGroups and only return the `id`
     * const permissionGroupWithIdOnly = await prisma.permissionGroup.updateManyAndReturn({
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
    updateManyAndReturn<T extends PermissionGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PermissionGroup.
     * @param {PermissionGroupUpsertArgs} args - Arguments to update or create a PermissionGroup.
     * @example
     * // Update or create a PermissionGroup
     * const permissionGroup = await prisma.permissionGroup.upsert({
     *   create: {
     *     // ... data to create a PermissionGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PermissionGroup we want to update
     *   }
     * })
     */
    upsert<T extends PermissionGroupUpsertArgs>(args: SelectSubset<T, PermissionGroupUpsertArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PermissionGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupCountArgs} args - Arguments to filter PermissionGroups to count.
     * @example
     * // Count the number of PermissionGroups
     * const count = await prisma.permissionGroup.count({
     *   where: {
     *     // ... the filter for the PermissionGroups we want to count
     *   }
     * })
    **/
    count<T extends PermissionGroupCountArgs>(
      args?: Subset<T, PermissionGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PermissionGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermissionGroupAggregateArgs>(args: Subset<T, PermissionGroupAggregateArgs>): Prisma.PrismaPromise<GetPermissionGroupAggregateType<T>>

    /**
     * Group by PermissionGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupGroupByArgs} args - Group by arguments.
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
      T extends PermissionGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermissionGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PermissionGroup model
   */
  readonly fields: PermissionGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PermissionGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends PermissionGroup$rolesArgs<ExtArgs> = {}>(args?: Subset<T, PermissionGroup$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PermissionGroup model
   */
  interface PermissionGroupFieldRefs {
    readonly id: FieldRef<"PermissionGroup", 'String'>
    readonly tenantId: FieldRef<"PermissionGroup", 'String'>
    readonly name: FieldRef<"PermissionGroup", 'String'>
    readonly description: FieldRef<"PermissionGroup", 'String'>
    readonly permissions: FieldRef<"PermissionGroup", 'Json'>
    readonly createdAt: FieldRef<"PermissionGroup", 'DateTime'>
    readonly updatedAt: FieldRef<"PermissionGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PermissionGroup findUnique
   */
  export type PermissionGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * Filter, which PermissionGroup to fetch.
     */
    where: PermissionGroupWhereUniqueInput
  }

  /**
   * PermissionGroup findUniqueOrThrow
   */
  export type PermissionGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * Filter, which PermissionGroup to fetch.
     */
    where: PermissionGroupWhereUniqueInput
  }

  /**
   * PermissionGroup findFirst
   */
  export type PermissionGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * Filter, which PermissionGroup to fetch.
     */
    where?: PermissionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionGroups to fetch.
     */
    orderBy?: PermissionGroupOrderByWithRelationInput | PermissionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermissionGroups.
     */
    cursor?: PermissionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionGroups.
     */
    distinct?: PermissionGroupScalarFieldEnum | PermissionGroupScalarFieldEnum[]
  }

  /**
   * PermissionGroup findFirstOrThrow
   */
  export type PermissionGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * Filter, which PermissionGroup to fetch.
     */
    where?: PermissionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionGroups to fetch.
     */
    orderBy?: PermissionGroupOrderByWithRelationInput | PermissionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermissionGroups.
     */
    cursor?: PermissionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionGroups.
     */
    distinct?: PermissionGroupScalarFieldEnum | PermissionGroupScalarFieldEnum[]
  }

  /**
   * PermissionGroup findMany
   */
  export type PermissionGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * Filter, which PermissionGroups to fetch.
     */
    where?: PermissionGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionGroups to fetch.
     */
    orderBy?: PermissionGroupOrderByWithRelationInput | PermissionGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PermissionGroups.
     */
    cursor?: PermissionGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionGroups.
     */
    skip?: number
    distinct?: PermissionGroupScalarFieldEnum | PermissionGroupScalarFieldEnum[]
  }

  /**
   * PermissionGroup create
   */
  export type PermissionGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a PermissionGroup.
     */
    data: XOR<PermissionGroupCreateInput, PermissionGroupUncheckedCreateInput>
  }

  /**
   * PermissionGroup createMany
   */
  export type PermissionGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PermissionGroups.
     */
    data: PermissionGroupCreateManyInput | PermissionGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PermissionGroup createManyAndReturn
   */
  export type PermissionGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * The data used to create many PermissionGroups.
     */
    data: PermissionGroupCreateManyInput | PermissionGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PermissionGroup update
   */
  export type PermissionGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a PermissionGroup.
     */
    data: XOR<PermissionGroupUpdateInput, PermissionGroupUncheckedUpdateInput>
    /**
     * Choose, which PermissionGroup to update.
     */
    where: PermissionGroupWhereUniqueInput
  }

  /**
   * PermissionGroup updateMany
   */
  export type PermissionGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PermissionGroups.
     */
    data: XOR<PermissionGroupUpdateManyMutationInput, PermissionGroupUncheckedUpdateManyInput>
    /**
     * Filter which PermissionGroups to update
     */
    where?: PermissionGroupWhereInput
    /**
     * Limit how many PermissionGroups to update.
     */
    limit?: number
  }

  /**
   * PermissionGroup updateManyAndReturn
   */
  export type PermissionGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * The data used to update PermissionGroups.
     */
    data: XOR<PermissionGroupUpdateManyMutationInput, PermissionGroupUncheckedUpdateManyInput>
    /**
     * Filter which PermissionGroups to update
     */
    where?: PermissionGroupWhereInput
    /**
     * Limit how many PermissionGroups to update.
     */
    limit?: number
  }

  /**
   * PermissionGroup upsert
   */
  export type PermissionGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the PermissionGroup to update in case it exists.
     */
    where: PermissionGroupWhereUniqueInput
    /**
     * In case the PermissionGroup found by the `where` argument doesn't exist, create a new PermissionGroup with this data.
     */
    create: XOR<PermissionGroupCreateInput, PermissionGroupUncheckedCreateInput>
    /**
     * In case the PermissionGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionGroupUpdateInput, PermissionGroupUncheckedUpdateInput>
  }

  /**
   * PermissionGroup delete
   */
  export type PermissionGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    /**
     * Filter which PermissionGroup to delete.
     */
    where: PermissionGroupWhereUniqueInput
  }

  /**
   * PermissionGroup deleteMany
   */
  export type PermissionGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermissionGroups to delete
     */
    where?: PermissionGroupWhereInput
    /**
     * Limit how many PermissionGroups to delete.
     */
    limit?: number
  }

  /**
   * PermissionGroup.roles
   */
  export type PermissionGroup$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    where?: CustomRoleWhereInput
    orderBy?: CustomRoleOrderByWithRelationInput | CustomRoleOrderByWithRelationInput[]
    cursor?: CustomRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomRoleScalarFieldEnum | CustomRoleScalarFieldEnum[]
  }

  /**
   * PermissionGroup without action
   */
  export type PermissionGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
  }


  /**
   * Model CustomRole
   */

  export type AggregateCustomRole = {
    _count: CustomRoleCountAggregateOutputType | null
    _min: CustomRoleMinAggregateOutputType | null
    _max: CustomRoleMaxAggregateOutputType | null
  }

  export type CustomRoleMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    slug: string | null
    description: string | null
    parentRoleId: string | null
    permissionGroupId: string | null
    isSystem: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomRoleMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    slug: string | null
    description: string | null
    parentRoleId: string | null
    permissionGroupId: string | null
    isSystem: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomRoleCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    slug: number
    description: number
    parentRoleId: number
    permissionGroupId: number
    permissions: number
    isSystem: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomRoleMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    slug?: true
    description?: true
    parentRoleId?: true
    permissionGroupId?: true
    isSystem?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomRoleMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    slug?: true
    description?: true
    parentRoleId?: true
    permissionGroupId?: true
    isSystem?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomRoleCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    slug?: true
    description?: true
    parentRoleId?: true
    permissionGroupId?: true
    permissions?: true
    isSystem?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomRole to aggregate.
     */
    where?: CustomRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomRoles to fetch.
     */
    orderBy?: CustomRoleOrderByWithRelationInput | CustomRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomRoles
    **/
    _count?: true | CustomRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomRoleMaxAggregateInputType
  }

  export type GetCustomRoleAggregateType<T extends CustomRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomRole[P]>
      : GetScalarType<T[P], AggregateCustomRole[P]>
  }




  export type CustomRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomRoleWhereInput
    orderBy?: CustomRoleOrderByWithAggregationInput | CustomRoleOrderByWithAggregationInput[]
    by: CustomRoleScalarFieldEnum[] | CustomRoleScalarFieldEnum
    having?: CustomRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomRoleCountAggregateInputType | true
    _min?: CustomRoleMinAggregateInputType
    _max?: CustomRoleMaxAggregateInputType
  }

  export type CustomRoleGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    slug: string
    description: string | null
    parentRoleId: string | null
    permissionGroupId: string | null
    permissions: JsonValue
    isSystem: boolean
    createdAt: Date
    updatedAt: Date
    _count: CustomRoleCountAggregateOutputType | null
    _min: CustomRoleMinAggregateOutputType | null
    _max: CustomRoleMaxAggregateOutputType | null
  }

  type GetCustomRoleGroupByPayload<T extends CustomRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomRoleGroupByOutputType[P]>
            : GetScalarType<T[P], CustomRoleGroupByOutputType[P]>
        }
      >
    >


  export type CustomRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parentRoleId?: boolean
    permissionGroupId?: boolean
    permissions?: boolean
    isSystem?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentRole?: boolean | CustomRole$parentRoleArgs<ExtArgs>
    childRoles?: boolean | CustomRole$childRolesArgs<ExtArgs>
    permissionGroup?: boolean | CustomRole$permissionGroupArgs<ExtArgs>
    _count?: boolean | CustomRoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customRole"]>

  export type CustomRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parentRoleId?: boolean
    permissionGroupId?: boolean
    permissions?: boolean
    isSystem?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentRole?: boolean | CustomRole$parentRoleArgs<ExtArgs>
    permissionGroup?: boolean | CustomRole$permissionGroupArgs<ExtArgs>
  }, ExtArgs["result"]["customRole"]>

  export type CustomRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parentRoleId?: boolean
    permissionGroupId?: boolean
    permissions?: boolean
    isSystem?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parentRole?: boolean | CustomRole$parentRoleArgs<ExtArgs>
    permissionGroup?: boolean | CustomRole$permissionGroupArgs<ExtArgs>
  }, ExtArgs["result"]["customRole"]>

  export type CustomRoleSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parentRoleId?: boolean
    permissionGroupId?: boolean
    permissions?: boolean
    isSystem?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "slug" | "description" | "parentRoleId" | "permissionGroupId" | "permissions" | "isSystem" | "createdAt" | "updatedAt", ExtArgs["result"]["customRole"]>
  export type CustomRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentRole?: boolean | CustomRole$parentRoleArgs<ExtArgs>
    childRoles?: boolean | CustomRole$childRolesArgs<ExtArgs>
    permissionGroup?: boolean | CustomRole$permissionGroupArgs<ExtArgs>
    _count?: boolean | CustomRoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentRole?: boolean | CustomRole$parentRoleArgs<ExtArgs>
    permissionGroup?: boolean | CustomRole$permissionGroupArgs<ExtArgs>
  }
  export type CustomRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentRole?: boolean | CustomRole$parentRoleArgs<ExtArgs>
    permissionGroup?: boolean | CustomRole$permissionGroupArgs<ExtArgs>
  }

  export type $CustomRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomRole"
    objects: {
      parentRole: Prisma.$CustomRolePayload<ExtArgs> | null
      childRoles: Prisma.$CustomRolePayload<ExtArgs>[]
      permissionGroup: Prisma.$PermissionGroupPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      slug: string
      description: string | null
      parentRoleId: string | null
      permissionGroupId: string | null
      permissions: Prisma.JsonValue
      isSystem: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customRole"]>
    composites: {}
  }

  type CustomRoleGetPayload<S extends boolean | null | undefined | CustomRoleDefaultArgs> = $Result.GetResult<Prisma.$CustomRolePayload, S>

  type CustomRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomRoleCountAggregateInputType | true
    }

  export interface CustomRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomRole'], meta: { name: 'CustomRole' } }
    /**
     * Find zero or one CustomRole that matches the filter.
     * @param {CustomRoleFindUniqueArgs} args - Arguments to find a CustomRole
     * @example
     * // Get one CustomRole
     * const customRole = await prisma.customRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomRoleFindUniqueArgs>(args: SelectSubset<T, CustomRoleFindUniqueArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomRoleFindUniqueOrThrowArgs} args - Arguments to find a CustomRole
     * @example
     * // Get one CustomRole
     * const customRole = await prisma.customRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomRoleFindFirstArgs} args - Arguments to find a CustomRole
     * @example
     * // Get one CustomRole
     * const customRole = await prisma.customRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomRoleFindFirstArgs>(args?: SelectSubset<T, CustomRoleFindFirstArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomRoleFindFirstOrThrowArgs} args - Arguments to find a CustomRole
     * @example
     * // Get one CustomRole
     * const customRole = await prisma.customRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomRoles
     * const customRoles = await prisma.customRole.findMany()
     * 
     * // Get first 10 CustomRoles
     * const customRoles = await prisma.customRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customRoleWithIdOnly = await prisma.customRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomRoleFindManyArgs>(args?: SelectSubset<T, CustomRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomRole.
     * @param {CustomRoleCreateArgs} args - Arguments to create a CustomRole.
     * @example
     * // Create one CustomRole
     * const CustomRole = await prisma.customRole.create({
     *   data: {
     *     // ... data to create a CustomRole
     *   }
     * })
     * 
     */
    create<T extends CustomRoleCreateArgs>(args: SelectSubset<T, CustomRoleCreateArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomRoles.
     * @param {CustomRoleCreateManyArgs} args - Arguments to create many CustomRoles.
     * @example
     * // Create many CustomRoles
     * const customRole = await prisma.customRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomRoleCreateManyArgs>(args?: SelectSubset<T, CustomRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomRoles and returns the data saved in the database.
     * @param {CustomRoleCreateManyAndReturnArgs} args - Arguments to create many CustomRoles.
     * @example
     * // Create many CustomRoles
     * const customRole = await prisma.customRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomRoles and only return the `id`
     * const customRoleWithIdOnly = await prisma.customRole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomRole.
     * @param {CustomRoleDeleteArgs} args - Arguments to delete one CustomRole.
     * @example
     * // Delete one CustomRole
     * const CustomRole = await prisma.customRole.delete({
     *   where: {
     *     // ... filter to delete one CustomRole
     *   }
     * })
     * 
     */
    delete<T extends CustomRoleDeleteArgs>(args: SelectSubset<T, CustomRoleDeleteArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomRole.
     * @param {CustomRoleUpdateArgs} args - Arguments to update one CustomRole.
     * @example
     * // Update one CustomRole
     * const customRole = await prisma.customRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomRoleUpdateArgs>(args: SelectSubset<T, CustomRoleUpdateArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomRoles.
     * @param {CustomRoleDeleteManyArgs} args - Arguments to filter CustomRoles to delete.
     * @example
     * // Delete a few CustomRoles
     * const { count } = await prisma.customRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomRoleDeleteManyArgs>(args?: SelectSubset<T, CustomRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomRoles
     * const customRole = await prisma.customRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomRoleUpdateManyArgs>(args: SelectSubset<T, CustomRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomRoles and returns the data updated in the database.
     * @param {CustomRoleUpdateManyAndReturnArgs} args - Arguments to update many CustomRoles.
     * @example
     * // Update many CustomRoles
     * const customRole = await prisma.customRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomRoles and only return the `id`
     * const customRoleWithIdOnly = await prisma.customRole.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomRole.
     * @param {CustomRoleUpsertArgs} args - Arguments to update or create a CustomRole.
     * @example
     * // Update or create a CustomRole
     * const customRole = await prisma.customRole.upsert({
     *   create: {
     *     // ... data to create a CustomRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomRole we want to update
     *   }
     * })
     */
    upsert<T extends CustomRoleUpsertArgs>(args: SelectSubset<T, CustomRoleUpsertArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomRoleCountArgs} args - Arguments to filter CustomRoles to count.
     * @example
     * // Count the number of CustomRoles
     * const count = await prisma.customRole.count({
     *   where: {
     *     // ... the filter for the CustomRoles we want to count
     *   }
     * })
    **/
    count<T extends CustomRoleCountArgs>(
      args?: Subset<T, CustomRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomRoleAggregateArgs>(args: Subset<T, CustomRoleAggregateArgs>): Prisma.PrismaPromise<GetCustomRoleAggregateType<T>>

    /**
     * Group by CustomRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomRoleGroupByArgs} args - Group by arguments.
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
      T extends CustomRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomRoleGroupByArgs['orderBy'] }
        : { orderBy?: CustomRoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomRole model
   */
  readonly fields: CustomRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parentRole<T extends CustomRole$parentRoleArgs<ExtArgs> = {}>(args?: Subset<T, CustomRole$parentRoleArgs<ExtArgs>>): Prisma__CustomRoleClient<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    childRoles<T extends CustomRole$childRolesArgs<ExtArgs> = {}>(args?: Subset<T, CustomRole$childRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissionGroup<T extends CustomRole$permissionGroupArgs<ExtArgs> = {}>(args?: Subset<T, CustomRole$permissionGroupArgs<ExtArgs>>): Prisma__PermissionGroupClient<$Result.GetResult<Prisma.$PermissionGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CustomRole model
   */
  interface CustomRoleFieldRefs {
    readonly id: FieldRef<"CustomRole", 'String'>
    readonly tenantId: FieldRef<"CustomRole", 'String'>
    readonly name: FieldRef<"CustomRole", 'String'>
    readonly slug: FieldRef<"CustomRole", 'String'>
    readonly description: FieldRef<"CustomRole", 'String'>
    readonly parentRoleId: FieldRef<"CustomRole", 'String'>
    readonly permissionGroupId: FieldRef<"CustomRole", 'String'>
    readonly permissions: FieldRef<"CustomRole", 'Json'>
    readonly isSystem: FieldRef<"CustomRole", 'Boolean'>
    readonly createdAt: FieldRef<"CustomRole", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomRole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomRole findUnique
   */
  export type CustomRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * Filter, which CustomRole to fetch.
     */
    where: CustomRoleWhereUniqueInput
  }

  /**
   * CustomRole findUniqueOrThrow
   */
  export type CustomRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * Filter, which CustomRole to fetch.
     */
    where: CustomRoleWhereUniqueInput
  }

  /**
   * CustomRole findFirst
   */
  export type CustomRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * Filter, which CustomRole to fetch.
     */
    where?: CustomRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomRoles to fetch.
     */
    orderBy?: CustomRoleOrderByWithRelationInput | CustomRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomRoles.
     */
    cursor?: CustomRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomRoles.
     */
    distinct?: CustomRoleScalarFieldEnum | CustomRoleScalarFieldEnum[]
  }

  /**
   * CustomRole findFirstOrThrow
   */
  export type CustomRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * Filter, which CustomRole to fetch.
     */
    where?: CustomRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomRoles to fetch.
     */
    orderBy?: CustomRoleOrderByWithRelationInput | CustomRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomRoles.
     */
    cursor?: CustomRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomRoles.
     */
    distinct?: CustomRoleScalarFieldEnum | CustomRoleScalarFieldEnum[]
  }

  /**
   * CustomRole findMany
   */
  export type CustomRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * Filter, which CustomRoles to fetch.
     */
    where?: CustomRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomRoles to fetch.
     */
    orderBy?: CustomRoleOrderByWithRelationInput | CustomRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomRoles.
     */
    cursor?: CustomRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomRoles.
     */
    skip?: number
    distinct?: CustomRoleScalarFieldEnum | CustomRoleScalarFieldEnum[]
  }

  /**
   * CustomRole create
   */
  export type CustomRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomRole.
     */
    data: XOR<CustomRoleCreateInput, CustomRoleUncheckedCreateInput>
  }

  /**
   * CustomRole createMany
   */
  export type CustomRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomRoles.
     */
    data: CustomRoleCreateManyInput | CustomRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomRole createManyAndReturn
   */
  export type CustomRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * The data used to create many CustomRoles.
     */
    data: CustomRoleCreateManyInput | CustomRoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomRole update
   */
  export type CustomRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomRole.
     */
    data: XOR<CustomRoleUpdateInput, CustomRoleUncheckedUpdateInput>
    /**
     * Choose, which CustomRole to update.
     */
    where: CustomRoleWhereUniqueInput
  }

  /**
   * CustomRole updateMany
   */
  export type CustomRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomRoles.
     */
    data: XOR<CustomRoleUpdateManyMutationInput, CustomRoleUncheckedUpdateManyInput>
    /**
     * Filter which CustomRoles to update
     */
    where?: CustomRoleWhereInput
    /**
     * Limit how many CustomRoles to update.
     */
    limit?: number
  }

  /**
   * CustomRole updateManyAndReturn
   */
  export type CustomRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * The data used to update CustomRoles.
     */
    data: XOR<CustomRoleUpdateManyMutationInput, CustomRoleUncheckedUpdateManyInput>
    /**
     * Filter which CustomRoles to update
     */
    where?: CustomRoleWhereInput
    /**
     * Limit how many CustomRoles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomRole upsert
   */
  export type CustomRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomRole to update in case it exists.
     */
    where: CustomRoleWhereUniqueInput
    /**
     * In case the CustomRole found by the `where` argument doesn't exist, create a new CustomRole with this data.
     */
    create: XOR<CustomRoleCreateInput, CustomRoleUncheckedCreateInput>
    /**
     * In case the CustomRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomRoleUpdateInput, CustomRoleUncheckedUpdateInput>
  }

  /**
   * CustomRole delete
   */
  export type CustomRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    /**
     * Filter which CustomRole to delete.
     */
    where: CustomRoleWhereUniqueInput
  }

  /**
   * CustomRole deleteMany
   */
  export type CustomRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomRoles to delete
     */
    where?: CustomRoleWhereInput
    /**
     * Limit how many CustomRoles to delete.
     */
    limit?: number
  }

  /**
   * CustomRole.parentRole
   */
  export type CustomRole$parentRoleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    where?: CustomRoleWhereInput
  }

  /**
   * CustomRole.childRoles
   */
  export type CustomRole$childRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
    where?: CustomRoleWhereInput
    orderBy?: CustomRoleOrderByWithRelationInput | CustomRoleOrderByWithRelationInput[]
    cursor?: CustomRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomRoleScalarFieldEnum | CustomRoleScalarFieldEnum[]
  }

  /**
   * CustomRole.permissionGroup
   */
  export type CustomRole$permissionGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionGroup
     */
    select?: PermissionGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionGroup
     */
    omit?: PermissionGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionGroupInclude<ExtArgs> | null
    where?: PermissionGroupWhereInput
  }

  /**
   * CustomRole without action
   */
  export type CustomRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomRole
     */
    select?: CustomRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomRole
     */
    omit?: CustomRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomRoleInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    actorId: string | null
    actorEmail: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    status: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    actorId: string | null
    actorEmail: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    status: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    tenantId: number
    actorId: number
    actorEmail: number
    action: number
    resource: number
    resourceId: number
    status: number
    metadata: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    actorId?: true
    actorEmail?: true
    action?: true
    resource?: true
    resourceId?: true
    status?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    actorId?: true
    actorEmail?: true
    action?: true
    resource?: true
    resourceId?: true
    status?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    actorId?: true
    actorEmail?: true
    action?: true
    resource?: true
    resourceId?: true
    status?: true
    metadata?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    tenantId: string
    actorId: string | null
    actorEmail: string | null
    action: string
    resource: string
    resourceId: string | null
    status: string
    metadata: JsonValue | null
    ipAddress: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    actorId?: boolean
    actorEmail?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    status?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    actorId?: boolean
    actorEmail?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    status?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    actorId?: boolean
    actorEmail?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    status?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    actorId?: boolean
    actorEmail?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    status?: boolean
    metadata?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "actorId" | "actorEmail" | "action" | "resource" | "resourceId" | "status" | "metadata" | "ipAddress" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      actorId: string | null
      actorEmail: string | null
      action: string
      resource: string
      resourceId: string | null
      status: string
      metadata: Prisma.JsonValue | null
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly tenantId: FieldRef<"AuditLog", 'String'>
    readonly actorId: FieldRef<"AuditLog", 'String'>
    readonly actorEmail: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly resource: FieldRef<"AuditLog", 'String'>
    readonly resourceId: FieldRef<"AuditLog", 'String'>
    readonly status: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    eventType: string | null
    source: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    userId: string | null
    eventType: string | null
    source: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    tenantId: number
    userId: number
    eventType: number
    source: number
    status: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    eventType?: true
    source?: true
    status?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    eventType?: true
    source?: true
    status?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    userId?: true
    eventType?: true
    source?: true
    status?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    tenantId: string
    userId: string | null
    eventType: string
    source: string
    status: string
    metadata: JsonValue | null
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    eventType?: boolean
    source?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    eventType?: boolean
    source?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    eventType?: boolean
    source?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    userId?: boolean
    eventType?: boolean
    source?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "userId" | "eventType" | "source" | "status" | "metadata" | "createdAt", ExtArgs["result"]["activityLog"]>

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      userId: string | null
      eventType: string
      source: string
      status: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
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
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly tenantId: FieldRef<"ActivityLog", 'String'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly eventType: FieldRef<"ActivityLog", 'String'>
    readonly source: FieldRef<"ActivityLog", 'String'>
    readonly status: FieldRef<"ActivityLog", 'String'>
    readonly metadata: FieldRef<"ActivityLog", 'Json'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    keyPrefix: string | null
    keyHash: string | null
    createdById: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    keyPrefix: string | null
    keyHash: string | null
    createdById: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    keyPrefix: number
    keyHash: number
    scopes: number
    createdById: number
    lastUsedAt: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    keyPrefix?: true
    keyHash?: true
    createdById?: true
    lastUsedAt?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    keyPrefix?: true
    keyHash?: true
    createdById?: true
    lastUsedAt?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    keyPrefix?: true
    keyHash?: true
    scopes?: true
    createdById?: true
    lastUsedAt?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    keyPrefix: string
    keyHash: string
    scopes: JsonValue
    createdById: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    keyPrefix?: boolean
    keyHash?: boolean
    scopes?: boolean
    createdById?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usageLogs?: boolean | ApiKey$usageLogsArgs<ExtArgs>
    _count?: boolean | ApiKeyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    keyPrefix?: boolean
    keyHash?: boolean
    scopes?: boolean
    createdById?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    keyPrefix?: boolean
    keyHash?: boolean
    scopes?: boolean
    createdById?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    keyPrefix?: boolean
    keyHash?: boolean
    scopes?: boolean
    createdById?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "keyPrefix" | "keyHash" | "scopes" | "createdById" | "lastUsedAt" | "expiresAt" | "revokedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["apiKey"]>
  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usageLogs?: boolean | ApiKey$usageLogsArgs<ExtArgs>
    _count?: boolean | ApiKeyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ApiKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      usageLogs: Prisma.$ApiKeyUsageLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      keyPrefix: string
      keyHash: string
      scopes: Prisma.JsonValue
      createdById: string | null
      lastUsedAt: Date | null
      expiresAt: Date | null
      revokedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys and returns the data updated in the database.
     * @param {ApiKeyUpdateManyAndReturnArgs} args - Arguments to update many ApiKeys.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
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
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usageLogs<T extends ApiKey$usageLogsArgs<ExtArgs> = {}>(args?: Subset<T, ApiKey$usageLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly tenantId: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly keyPrefix: FieldRef<"ApiKey", 'String'>
    readonly keyHash: FieldRef<"ApiKey", 'String'>
    readonly scopes: FieldRef<"ApiKey", 'Json'>
    readonly createdById: FieldRef<"ApiKey", 'String'>
    readonly lastUsedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly expiresAt: FieldRef<"ApiKey", 'DateTime'>
    readonly revokedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey updateManyAndReturn
   */
  export type ApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey.usageLogs
   */
  export type ApiKey$usageLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    where?: ApiKeyUsageLogWhereInput
    orderBy?: ApiKeyUsageLogOrderByWithRelationInput | ApiKeyUsageLogOrderByWithRelationInput[]
    cursor?: ApiKeyUsageLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiKeyUsageLogScalarFieldEnum | ApiKeyUsageLogScalarFieldEnum[]
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model ApiKeyUsageLog
   */

  export type AggregateApiKeyUsageLog = {
    _count: ApiKeyUsageLogCountAggregateOutputType | null
    _min: ApiKeyUsageLogMinAggregateOutputType | null
    _max: ApiKeyUsageLogMaxAggregateOutputType | null
  }

  export type ApiKeyUsageLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    apiKeyId: string | null
    endpoint: string | null
    method: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ApiKeyUsageLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    apiKeyId: string | null
    endpoint: string | null
    method: string | null
    status: string | null
    createdAt: Date | null
  }

  export type ApiKeyUsageLogCountAggregateOutputType = {
    id: number
    tenantId: number
    apiKeyId: number
    endpoint: number
    method: number
    status: number
    createdAt: number
    _all: number
  }


  export type ApiKeyUsageLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    apiKeyId?: true
    endpoint?: true
    method?: true
    status?: true
    createdAt?: true
  }

  export type ApiKeyUsageLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    apiKeyId?: true
    endpoint?: true
    method?: true
    status?: true
    createdAt?: true
  }

  export type ApiKeyUsageLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    apiKeyId?: true
    endpoint?: true
    method?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ApiKeyUsageLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeyUsageLog to aggregate.
     */
    where?: ApiKeyUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeyUsageLogs to fetch.
     */
    orderBy?: ApiKeyUsageLogOrderByWithRelationInput | ApiKeyUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeyUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeyUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeyUsageLogs
    **/
    _count?: true | ApiKeyUsageLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyUsageLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyUsageLogMaxAggregateInputType
  }

  export type GetApiKeyUsageLogAggregateType<T extends ApiKeyUsageLogAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKeyUsageLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKeyUsageLog[P]>
      : GetScalarType<T[P], AggregateApiKeyUsageLog[P]>
  }




  export type ApiKeyUsageLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyUsageLogWhereInput
    orderBy?: ApiKeyUsageLogOrderByWithAggregationInput | ApiKeyUsageLogOrderByWithAggregationInput[]
    by: ApiKeyUsageLogScalarFieldEnum[] | ApiKeyUsageLogScalarFieldEnum
    having?: ApiKeyUsageLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyUsageLogCountAggregateInputType | true
    _min?: ApiKeyUsageLogMinAggregateInputType
    _max?: ApiKeyUsageLogMaxAggregateInputType
  }

  export type ApiKeyUsageLogGroupByOutputType = {
    id: string
    tenantId: string
    apiKeyId: string
    endpoint: string
    method: string
    status: string
    createdAt: Date
    _count: ApiKeyUsageLogCountAggregateOutputType | null
    _min: ApiKeyUsageLogMinAggregateOutputType | null
    _max: ApiKeyUsageLogMaxAggregateOutputType | null
  }

  type GetApiKeyUsageLogGroupByPayload<T extends ApiKeyUsageLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyUsageLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyUsageLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyUsageLogGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyUsageLogGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeyUsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    apiKeyId?: boolean
    endpoint?: boolean
    method?: boolean
    status?: boolean
    createdAt?: boolean
    apiKey?: boolean | ApiKeyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKeyUsageLog"]>

  export type ApiKeyUsageLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    apiKeyId?: boolean
    endpoint?: boolean
    method?: boolean
    status?: boolean
    createdAt?: boolean
    apiKey?: boolean | ApiKeyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKeyUsageLog"]>

  export type ApiKeyUsageLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    apiKeyId?: boolean
    endpoint?: boolean
    method?: boolean
    status?: boolean
    createdAt?: boolean
    apiKey?: boolean | ApiKeyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKeyUsageLog"]>

  export type ApiKeyUsageLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    apiKeyId?: boolean
    endpoint?: boolean
    method?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ApiKeyUsageLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "apiKeyId" | "endpoint" | "method" | "status" | "createdAt", ExtArgs["result"]["apiKeyUsageLog"]>
  export type ApiKeyUsageLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apiKey?: boolean | ApiKeyDefaultArgs<ExtArgs>
  }
  export type ApiKeyUsageLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apiKey?: boolean | ApiKeyDefaultArgs<ExtArgs>
  }
  export type ApiKeyUsageLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apiKey?: boolean | ApiKeyDefaultArgs<ExtArgs>
  }

  export type $ApiKeyUsageLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKeyUsageLog"
    objects: {
      apiKey: Prisma.$ApiKeyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      apiKeyId: string
      endpoint: string
      method: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["apiKeyUsageLog"]>
    composites: {}
  }

  type ApiKeyUsageLogGetPayload<S extends boolean | null | undefined | ApiKeyUsageLogDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyUsageLogPayload, S>

  type ApiKeyUsageLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyUsageLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyUsageLogCountAggregateInputType | true
    }

  export interface ApiKeyUsageLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKeyUsageLog'], meta: { name: 'ApiKeyUsageLog' } }
    /**
     * Find zero or one ApiKeyUsageLog that matches the filter.
     * @param {ApiKeyUsageLogFindUniqueArgs} args - Arguments to find a ApiKeyUsageLog
     * @example
     * // Get one ApiKeyUsageLog
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyUsageLogFindUniqueArgs>(args: SelectSubset<T, ApiKeyUsageLogFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyUsageLogClient<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKeyUsageLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyUsageLogFindUniqueOrThrowArgs} args - Arguments to find a ApiKeyUsageLog
     * @example
     * // Get one ApiKeyUsageLog
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyUsageLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyUsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyUsageLogClient<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKeyUsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUsageLogFindFirstArgs} args - Arguments to find a ApiKeyUsageLog
     * @example
     * // Get one ApiKeyUsageLog
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyUsageLogFindFirstArgs>(args?: SelectSubset<T, ApiKeyUsageLogFindFirstArgs<ExtArgs>>): Prisma__ApiKeyUsageLogClient<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKeyUsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUsageLogFindFirstOrThrowArgs} args - Arguments to find a ApiKeyUsageLog
     * @example
     * // Get one ApiKeyUsageLog
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyUsageLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyUsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyUsageLogClient<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeyUsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeyUsageLogs
     * const apiKeyUsageLogs = await prisma.apiKeyUsageLog.findMany()
     * 
     * // Get first 10 ApiKeyUsageLogs
     * const apiKeyUsageLogs = await prisma.apiKeyUsageLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyUsageLogWithIdOnly = await prisma.apiKeyUsageLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyUsageLogFindManyArgs>(args?: SelectSubset<T, ApiKeyUsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKeyUsageLog.
     * @param {ApiKeyUsageLogCreateArgs} args - Arguments to create a ApiKeyUsageLog.
     * @example
     * // Create one ApiKeyUsageLog
     * const ApiKeyUsageLog = await prisma.apiKeyUsageLog.create({
     *   data: {
     *     // ... data to create a ApiKeyUsageLog
     *   }
     * })
     * 
     */
    create<T extends ApiKeyUsageLogCreateArgs>(args: SelectSubset<T, ApiKeyUsageLogCreateArgs<ExtArgs>>): Prisma__ApiKeyUsageLogClient<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeyUsageLogs.
     * @param {ApiKeyUsageLogCreateManyArgs} args - Arguments to create many ApiKeyUsageLogs.
     * @example
     * // Create many ApiKeyUsageLogs
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyUsageLogCreateManyArgs>(args?: SelectSubset<T, ApiKeyUsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeyUsageLogs and returns the data saved in the database.
     * @param {ApiKeyUsageLogCreateManyAndReturnArgs} args - Arguments to create many ApiKeyUsageLogs.
     * @example
     * // Create many ApiKeyUsageLogs
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeyUsageLogs and only return the `id`
     * const apiKeyUsageLogWithIdOnly = await prisma.apiKeyUsageLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyUsageLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyUsageLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKeyUsageLog.
     * @param {ApiKeyUsageLogDeleteArgs} args - Arguments to delete one ApiKeyUsageLog.
     * @example
     * // Delete one ApiKeyUsageLog
     * const ApiKeyUsageLog = await prisma.apiKeyUsageLog.delete({
     *   where: {
     *     // ... filter to delete one ApiKeyUsageLog
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyUsageLogDeleteArgs>(args: SelectSubset<T, ApiKeyUsageLogDeleteArgs<ExtArgs>>): Prisma__ApiKeyUsageLogClient<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKeyUsageLog.
     * @param {ApiKeyUsageLogUpdateArgs} args - Arguments to update one ApiKeyUsageLog.
     * @example
     * // Update one ApiKeyUsageLog
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUsageLogUpdateArgs>(args: SelectSubset<T, ApiKeyUsageLogUpdateArgs<ExtArgs>>): Prisma__ApiKeyUsageLogClient<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeyUsageLogs.
     * @param {ApiKeyUsageLogDeleteManyArgs} args - Arguments to filter ApiKeyUsageLogs to delete.
     * @example
     * // Delete a few ApiKeyUsageLogs
     * const { count } = await prisma.apiKeyUsageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyUsageLogDeleteManyArgs>(args?: SelectSubset<T, ApiKeyUsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeyUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeyUsageLogs
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUsageLogUpdateManyArgs>(args: SelectSubset<T, ApiKeyUsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeyUsageLogs and returns the data updated in the database.
     * @param {ApiKeyUsageLogUpdateManyAndReturnArgs} args - Arguments to update many ApiKeyUsageLogs.
     * @example
     * // Update many ApiKeyUsageLogs
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeyUsageLogs and only return the `id`
     * const apiKeyUsageLogWithIdOnly = await prisma.apiKeyUsageLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApiKeyUsageLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUsageLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKeyUsageLog.
     * @param {ApiKeyUsageLogUpsertArgs} args - Arguments to update or create a ApiKeyUsageLog.
     * @example
     * // Update or create a ApiKeyUsageLog
     * const apiKeyUsageLog = await prisma.apiKeyUsageLog.upsert({
     *   create: {
     *     // ... data to create a ApiKeyUsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKeyUsageLog we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUsageLogUpsertArgs>(args: SelectSubset<T, ApiKeyUsageLogUpsertArgs<ExtArgs>>): Prisma__ApiKeyUsageLogClient<$Result.GetResult<Prisma.$ApiKeyUsageLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeyUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUsageLogCountArgs} args - Arguments to filter ApiKeyUsageLogs to count.
     * @example
     * // Count the number of ApiKeyUsageLogs
     * const count = await prisma.apiKeyUsageLog.count({
     *   where: {
     *     // ... the filter for the ApiKeyUsageLogs we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyUsageLogCountArgs>(
      args?: Subset<T, ApiKeyUsageLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyUsageLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKeyUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApiKeyUsageLogAggregateArgs>(args: Subset<T, ApiKeyUsageLogAggregateArgs>): Prisma.PrismaPromise<GetApiKeyUsageLogAggregateType<T>>

    /**
     * Group by ApiKeyUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUsageLogGroupByArgs} args - Group by arguments.
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
      T extends ApiKeyUsageLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyUsageLogGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyUsageLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApiKeyUsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKeyUsageLog model
   */
  readonly fields: ApiKeyUsageLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKeyUsageLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyUsageLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    apiKey<T extends ApiKeyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApiKeyDefaultArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ApiKeyUsageLog model
   */
  interface ApiKeyUsageLogFieldRefs {
    readonly id: FieldRef<"ApiKeyUsageLog", 'String'>
    readonly tenantId: FieldRef<"ApiKeyUsageLog", 'String'>
    readonly apiKeyId: FieldRef<"ApiKeyUsageLog", 'String'>
    readonly endpoint: FieldRef<"ApiKeyUsageLog", 'String'>
    readonly method: FieldRef<"ApiKeyUsageLog", 'String'>
    readonly status: FieldRef<"ApiKeyUsageLog", 'String'>
    readonly createdAt: FieldRef<"ApiKeyUsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKeyUsageLog findUnique
   */
  export type ApiKeyUsageLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeyUsageLog to fetch.
     */
    where: ApiKeyUsageLogWhereUniqueInput
  }

  /**
   * ApiKeyUsageLog findUniqueOrThrow
   */
  export type ApiKeyUsageLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeyUsageLog to fetch.
     */
    where: ApiKeyUsageLogWhereUniqueInput
  }

  /**
   * ApiKeyUsageLog findFirst
   */
  export type ApiKeyUsageLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeyUsageLog to fetch.
     */
    where?: ApiKeyUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeyUsageLogs to fetch.
     */
    orderBy?: ApiKeyUsageLogOrderByWithRelationInput | ApiKeyUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeyUsageLogs.
     */
    cursor?: ApiKeyUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeyUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeyUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeyUsageLogs.
     */
    distinct?: ApiKeyUsageLogScalarFieldEnum | ApiKeyUsageLogScalarFieldEnum[]
  }

  /**
   * ApiKeyUsageLog findFirstOrThrow
   */
  export type ApiKeyUsageLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeyUsageLog to fetch.
     */
    where?: ApiKeyUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeyUsageLogs to fetch.
     */
    orderBy?: ApiKeyUsageLogOrderByWithRelationInput | ApiKeyUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeyUsageLogs.
     */
    cursor?: ApiKeyUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeyUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeyUsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeyUsageLogs.
     */
    distinct?: ApiKeyUsageLogScalarFieldEnum | ApiKeyUsageLogScalarFieldEnum[]
  }

  /**
   * ApiKeyUsageLog findMany
   */
  export type ApiKeyUsageLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeyUsageLogs to fetch.
     */
    where?: ApiKeyUsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeyUsageLogs to fetch.
     */
    orderBy?: ApiKeyUsageLogOrderByWithRelationInput | ApiKeyUsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeyUsageLogs.
     */
    cursor?: ApiKeyUsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeyUsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeyUsageLogs.
     */
    skip?: number
    distinct?: ApiKeyUsageLogScalarFieldEnum | ApiKeyUsageLogScalarFieldEnum[]
  }

  /**
   * ApiKeyUsageLog create
   */
  export type ApiKeyUsageLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKeyUsageLog.
     */
    data: XOR<ApiKeyUsageLogCreateInput, ApiKeyUsageLogUncheckedCreateInput>
  }

  /**
   * ApiKeyUsageLog createMany
   */
  export type ApiKeyUsageLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeyUsageLogs.
     */
    data: ApiKeyUsageLogCreateManyInput | ApiKeyUsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKeyUsageLog createManyAndReturn
   */
  export type ApiKeyUsageLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeyUsageLogs.
     */
    data: ApiKeyUsageLogCreateManyInput | ApiKeyUsageLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKeyUsageLog update
   */
  export type ApiKeyUsageLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKeyUsageLog.
     */
    data: XOR<ApiKeyUsageLogUpdateInput, ApiKeyUsageLogUncheckedUpdateInput>
    /**
     * Choose, which ApiKeyUsageLog to update.
     */
    where: ApiKeyUsageLogWhereUniqueInput
  }

  /**
   * ApiKeyUsageLog updateMany
   */
  export type ApiKeyUsageLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeyUsageLogs.
     */
    data: XOR<ApiKeyUsageLogUpdateManyMutationInput, ApiKeyUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeyUsageLogs to update
     */
    where?: ApiKeyUsageLogWhereInput
    /**
     * Limit how many ApiKeyUsageLogs to update.
     */
    limit?: number
  }

  /**
   * ApiKeyUsageLog updateManyAndReturn
   */
  export type ApiKeyUsageLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeyUsageLogs.
     */
    data: XOR<ApiKeyUsageLogUpdateManyMutationInput, ApiKeyUsageLogUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeyUsageLogs to update
     */
    where?: ApiKeyUsageLogWhereInput
    /**
     * Limit how many ApiKeyUsageLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKeyUsageLog upsert
   */
  export type ApiKeyUsageLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKeyUsageLog to update in case it exists.
     */
    where: ApiKeyUsageLogWhereUniqueInput
    /**
     * In case the ApiKeyUsageLog found by the `where` argument doesn't exist, create a new ApiKeyUsageLog with this data.
     */
    create: XOR<ApiKeyUsageLogCreateInput, ApiKeyUsageLogUncheckedCreateInput>
    /**
     * In case the ApiKeyUsageLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUsageLogUpdateInput, ApiKeyUsageLogUncheckedUpdateInput>
  }

  /**
   * ApiKeyUsageLog delete
   */
  export type ApiKeyUsageLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
    /**
     * Filter which ApiKeyUsageLog to delete.
     */
    where: ApiKeyUsageLogWhereUniqueInput
  }

  /**
   * ApiKeyUsageLog deleteMany
   */
  export type ApiKeyUsageLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeyUsageLogs to delete
     */
    where?: ApiKeyUsageLogWhereInput
    /**
     * Limit how many ApiKeyUsageLogs to delete.
     */
    limit?: number
  }

  /**
   * ApiKeyUsageLog without action
   */
  export type ApiKeyUsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKeyUsageLog
     */
    select?: ApiKeyUsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKeyUsageLog
     */
    omit?: ApiKeyUsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyUsageLogInclude<ExtArgs> | null
  }


  /**
   * Model WebhookConfig
   */

  export type AggregateWebhookConfig = {
    _count: WebhookConfigCountAggregateOutputType | null
    _avg: WebhookConfigAvgAggregateOutputType | null
    _sum: WebhookConfigSumAggregateOutputType | null
    _min: WebhookConfigMinAggregateOutputType | null
    _max: WebhookConfigMaxAggregateOutputType | null
  }

  export type WebhookConfigAvgAggregateOutputType = {
    maxRetries: number | null
  }

  export type WebhookConfigSumAggregateOutputType = {
    maxRetries: number | null
  }

  export type WebhookConfigMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    url: string | null
    secret: string | null
    isEnabled: boolean | null
    maxRetries: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookConfigMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    url: string | null
    secret: string | null
    isEnabled: boolean | null
    maxRetries: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookConfigCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    url: number
    secret: number
    eventTypes: number
    isEnabled: number
    maxRetries: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WebhookConfigAvgAggregateInputType = {
    maxRetries?: true
  }

  export type WebhookConfigSumAggregateInputType = {
    maxRetries?: true
  }

  export type WebhookConfigMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    url?: true
    secret?: true
    isEnabled?: true
    maxRetries?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookConfigMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    url?: true
    secret?: true
    isEnabled?: true
    maxRetries?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookConfigCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    url?: true
    secret?: true
    eventTypes?: true
    isEnabled?: true
    maxRetries?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WebhookConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookConfig to aggregate.
     */
    where?: WebhookConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookConfigs to fetch.
     */
    orderBy?: WebhookConfigOrderByWithRelationInput | WebhookConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookConfigs
    **/
    _count?: true | WebhookConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebhookConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebhookConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookConfigMaxAggregateInputType
  }

  export type GetWebhookConfigAggregateType<T extends WebhookConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookConfig[P]>
      : GetScalarType<T[P], AggregateWebhookConfig[P]>
  }




  export type WebhookConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookConfigWhereInput
    orderBy?: WebhookConfigOrderByWithAggregationInput | WebhookConfigOrderByWithAggregationInput[]
    by: WebhookConfigScalarFieldEnum[] | WebhookConfigScalarFieldEnum
    having?: WebhookConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookConfigCountAggregateInputType | true
    _avg?: WebhookConfigAvgAggregateInputType
    _sum?: WebhookConfigSumAggregateInputType
    _min?: WebhookConfigMinAggregateInputType
    _max?: WebhookConfigMaxAggregateInputType
  }

  export type WebhookConfigGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    url: string
    secret: string
    eventTypes: JsonValue
    isEnabled: boolean
    maxRetries: number
    createdAt: Date
    updatedAt: Date
    _count: WebhookConfigCountAggregateOutputType | null
    _avg: WebhookConfigAvgAggregateOutputType | null
    _sum: WebhookConfigSumAggregateOutputType | null
    _min: WebhookConfigMinAggregateOutputType | null
    _max: WebhookConfigMaxAggregateOutputType | null
  }

  type GetWebhookConfigGroupByPayload<T extends WebhookConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookConfigGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookConfigGroupByOutputType[P]>
        }
      >
    >


  export type WebhookConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    url?: boolean
    secret?: boolean
    eventTypes?: boolean
    isEnabled?: boolean
    maxRetries?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deliveries?: boolean | WebhookConfig$deliveriesArgs<ExtArgs>
    _count?: boolean | WebhookConfigCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookConfig"]>

  export type WebhookConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    url?: boolean
    secret?: boolean
    eventTypes?: boolean
    isEnabled?: boolean
    maxRetries?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webhookConfig"]>

  export type WebhookConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    url?: boolean
    secret?: boolean
    eventTypes?: boolean
    isEnabled?: boolean
    maxRetries?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["webhookConfig"]>

  export type WebhookConfigSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    url?: boolean
    secret?: boolean
    eventTypes?: boolean
    isEnabled?: boolean
    maxRetries?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WebhookConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "name" | "url" | "secret" | "eventTypes" | "isEnabled" | "maxRetries" | "createdAt" | "updatedAt", ExtArgs["result"]["webhookConfig"]>
  export type WebhookConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | WebhookConfig$deliveriesArgs<ExtArgs>
    _count?: boolean | WebhookConfigCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WebhookConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WebhookConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WebhookConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookConfig"
    objects: {
      deliveries: Prisma.$WebhookDeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      url: string
      secret: string
      eventTypes: Prisma.JsonValue
      isEnabled: boolean
      maxRetries: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["webhookConfig"]>
    composites: {}
  }

  type WebhookConfigGetPayload<S extends boolean | null | undefined | WebhookConfigDefaultArgs> = $Result.GetResult<Prisma.$WebhookConfigPayload, S>

  type WebhookConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookConfigCountAggregateInputType | true
    }

  export interface WebhookConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookConfig'], meta: { name: 'WebhookConfig' } }
    /**
     * Find zero or one WebhookConfig that matches the filter.
     * @param {WebhookConfigFindUniqueArgs} args - Arguments to find a WebhookConfig
     * @example
     * // Get one WebhookConfig
     * const webhookConfig = await prisma.webhookConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookConfigFindUniqueArgs>(args: SelectSubset<T, WebhookConfigFindUniqueArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookConfigFindUniqueOrThrowArgs} args - Arguments to find a WebhookConfig
     * @example
     * // Get one WebhookConfig
     * const webhookConfig = await prisma.webhookConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookConfigFindFirstArgs} args - Arguments to find a WebhookConfig
     * @example
     * // Get one WebhookConfig
     * const webhookConfig = await prisma.webhookConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookConfigFindFirstArgs>(args?: SelectSubset<T, WebhookConfigFindFirstArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookConfigFindFirstOrThrowArgs} args - Arguments to find a WebhookConfig
     * @example
     * // Get one WebhookConfig
     * const webhookConfig = await prisma.webhookConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookConfigs
     * const webhookConfigs = await prisma.webhookConfig.findMany()
     * 
     * // Get first 10 WebhookConfigs
     * const webhookConfigs = await prisma.webhookConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookConfigWithIdOnly = await prisma.webhookConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookConfigFindManyArgs>(args?: SelectSubset<T, WebhookConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookConfig.
     * @param {WebhookConfigCreateArgs} args - Arguments to create a WebhookConfig.
     * @example
     * // Create one WebhookConfig
     * const WebhookConfig = await prisma.webhookConfig.create({
     *   data: {
     *     // ... data to create a WebhookConfig
     *   }
     * })
     * 
     */
    create<T extends WebhookConfigCreateArgs>(args: SelectSubset<T, WebhookConfigCreateArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookConfigs.
     * @param {WebhookConfigCreateManyArgs} args - Arguments to create many WebhookConfigs.
     * @example
     * // Create many WebhookConfigs
     * const webhookConfig = await prisma.webhookConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookConfigCreateManyArgs>(args?: SelectSubset<T, WebhookConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookConfigs and returns the data saved in the database.
     * @param {WebhookConfigCreateManyAndReturnArgs} args - Arguments to create many WebhookConfigs.
     * @example
     * // Create many WebhookConfigs
     * const webhookConfig = await prisma.webhookConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookConfigs and only return the `id`
     * const webhookConfigWithIdOnly = await prisma.webhookConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookConfig.
     * @param {WebhookConfigDeleteArgs} args - Arguments to delete one WebhookConfig.
     * @example
     * // Delete one WebhookConfig
     * const WebhookConfig = await prisma.webhookConfig.delete({
     *   where: {
     *     // ... filter to delete one WebhookConfig
     *   }
     * })
     * 
     */
    delete<T extends WebhookConfigDeleteArgs>(args: SelectSubset<T, WebhookConfigDeleteArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookConfig.
     * @param {WebhookConfigUpdateArgs} args - Arguments to update one WebhookConfig.
     * @example
     * // Update one WebhookConfig
     * const webhookConfig = await prisma.webhookConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookConfigUpdateArgs>(args: SelectSubset<T, WebhookConfigUpdateArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookConfigs.
     * @param {WebhookConfigDeleteManyArgs} args - Arguments to filter WebhookConfigs to delete.
     * @example
     * // Delete a few WebhookConfigs
     * const { count } = await prisma.webhookConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookConfigDeleteManyArgs>(args?: SelectSubset<T, WebhookConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookConfigs
     * const webhookConfig = await prisma.webhookConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookConfigUpdateManyArgs>(args: SelectSubset<T, WebhookConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookConfigs and returns the data updated in the database.
     * @param {WebhookConfigUpdateManyAndReturnArgs} args - Arguments to update many WebhookConfigs.
     * @example
     * // Update many WebhookConfigs
     * const webhookConfig = await prisma.webhookConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookConfigs and only return the `id`
     * const webhookConfigWithIdOnly = await prisma.webhookConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends WebhookConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookConfig.
     * @param {WebhookConfigUpsertArgs} args - Arguments to update or create a WebhookConfig.
     * @example
     * // Update or create a WebhookConfig
     * const webhookConfig = await prisma.webhookConfig.upsert({
     *   create: {
     *     // ... data to create a WebhookConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookConfig we want to update
     *   }
     * })
     */
    upsert<T extends WebhookConfigUpsertArgs>(args: SelectSubset<T, WebhookConfigUpsertArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookConfigCountArgs} args - Arguments to filter WebhookConfigs to count.
     * @example
     * // Count the number of WebhookConfigs
     * const count = await prisma.webhookConfig.count({
     *   where: {
     *     // ... the filter for the WebhookConfigs we want to count
     *   }
     * })
    **/
    count<T extends WebhookConfigCountArgs>(
      args?: Subset<T, WebhookConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WebhookConfigAggregateArgs>(args: Subset<T, WebhookConfigAggregateArgs>): Prisma.PrismaPromise<GetWebhookConfigAggregateType<T>>

    /**
     * Group by WebhookConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookConfigGroupByArgs} args - Group by arguments.
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
      T extends WebhookConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookConfigGroupByArgs['orderBy'] }
        : { orderBy?: WebhookConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WebhookConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookConfig model
   */
  readonly fields: WebhookConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deliveries<T extends WebhookConfig$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, WebhookConfig$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the WebhookConfig model
   */
  interface WebhookConfigFieldRefs {
    readonly id: FieldRef<"WebhookConfig", 'String'>
    readonly tenantId: FieldRef<"WebhookConfig", 'String'>
    readonly name: FieldRef<"WebhookConfig", 'String'>
    readonly url: FieldRef<"WebhookConfig", 'String'>
    readonly secret: FieldRef<"WebhookConfig", 'String'>
    readonly eventTypes: FieldRef<"WebhookConfig", 'Json'>
    readonly isEnabled: FieldRef<"WebhookConfig", 'Boolean'>
    readonly maxRetries: FieldRef<"WebhookConfig", 'Int'>
    readonly createdAt: FieldRef<"WebhookConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"WebhookConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookConfig findUnique
   */
  export type WebhookConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * Filter, which WebhookConfig to fetch.
     */
    where: WebhookConfigWhereUniqueInput
  }

  /**
   * WebhookConfig findUniqueOrThrow
   */
  export type WebhookConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * Filter, which WebhookConfig to fetch.
     */
    where: WebhookConfigWhereUniqueInput
  }

  /**
   * WebhookConfig findFirst
   */
  export type WebhookConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * Filter, which WebhookConfig to fetch.
     */
    where?: WebhookConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookConfigs to fetch.
     */
    orderBy?: WebhookConfigOrderByWithRelationInput | WebhookConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookConfigs.
     */
    cursor?: WebhookConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookConfigs.
     */
    distinct?: WebhookConfigScalarFieldEnum | WebhookConfigScalarFieldEnum[]
  }

  /**
   * WebhookConfig findFirstOrThrow
   */
  export type WebhookConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * Filter, which WebhookConfig to fetch.
     */
    where?: WebhookConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookConfigs to fetch.
     */
    orderBy?: WebhookConfigOrderByWithRelationInput | WebhookConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookConfigs.
     */
    cursor?: WebhookConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookConfigs.
     */
    distinct?: WebhookConfigScalarFieldEnum | WebhookConfigScalarFieldEnum[]
  }

  /**
   * WebhookConfig findMany
   */
  export type WebhookConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * Filter, which WebhookConfigs to fetch.
     */
    where?: WebhookConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookConfigs to fetch.
     */
    orderBy?: WebhookConfigOrderByWithRelationInput | WebhookConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookConfigs.
     */
    cursor?: WebhookConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookConfigs.
     */
    skip?: number
    distinct?: WebhookConfigScalarFieldEnum | WebhookConfigScalarFieldEnum[]
  }

  /**
   * WebhookConfig create
   */
  export type WebhookConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookConfig.
     */
    data: XOR<WebhookConfigCreateInput, WebhookConfigUncheckedCreateInput>
  }

  /**
   * WebhookConfig createMany
   */
  export type WebhookConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookConfigs.
     */
    data: WebhookConfigCreateManyInput | WebhookConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookConfig createManyAndReturn
   */
  export type WebhookConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookConfigs.
     */
    data: WebhookConfigCreateManyInput | WebhookConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookConfig update
   */
  export type WebhookConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookConfig.
     */
    data: XOR<WebhookConfigUpdateInput, WebhookConfigUncheckedUpdateInput>
    /**
     * Choose, which WebhookConfig to update.
     */
    where: WebhookConfigWhereUniqueInput
  }

  /**
   * WebhookConfig updateMany
   */
  export type WebhookConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookConfigs.
     */
    data: XOR<WebhookConfigUpdateManyMutationInput, WebhookConfigUncheckedUpdateManyInput>
    /**
     * Filter which WebhookConfigs to update
     */
    where?: WebhookConfigWhereInput
    /**
     * Limit how many WebhookConfigs to update.
     */
    limit?: number
  }

  /**
   * WebhookConfig updateManyAndReturn
   */
  export type WebhookConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * The data used to update WebhookConfigs.
     */
    data: XOR<WebhookConfigUpdateManyMutationInput, WebhookConfigUncheckedUpdateManyInput>
    /**
     * Filter which WebhookConfigs to update
     */
    where?: WebhookConfigWhereInput
    /**
     * Limit how many WebhookConfigs to update.
     */
    limit?: number
  }

  /**
   * WebhookConfig upsert
   */
  export type WebhookConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookConfig to update in case it exists.
     */
    where: WebhookConfigWhereUniqueInput
    /**
     * In case the WebhookConfig found by the `where` argument doesn't exist, create a new WebhookConfig with this data.
     */
    create: XOR<WebhookConfigCreateInput, WebhookConfigUncheckedCreateInput>
    /**
     * In case the WebhookConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookConfigUpdateInput, WebhookConfigUncheckedUpdateInput>
  }

  /**
   * WebhookConfig delete
   */
  export type WebhookConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
    /**
     * Filter which WebhookConfig to delete.
     */
    where: WebhookConfigWhereUniqueInput
  }

  /**
   * WebhookConfig deleteMany
   */
  export type WebhookConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookConfigs to delete
     */
    where?: WebhookConfigWhereInput
    /**
     * Limit how many WebhookConfigs to delete.
     */
    limit?: number
  }

  /**
   * WebhookConfig.deliveries
   */
  export type WebhookConfig$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    where?: WebhookDeliveryWhereInput
    orderBy?: WebhookDeliveryOrderByWithRelationInput | WebhookDeliveryOrderByWithRelationInput[]
    cursor?: WebhookDeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookDeliveryScalarFieldEnum | WebhookDeliveryScalarFieldEnum[]
  }

  /**
   * WebhookConfig without action
   */
  export type WebhookConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookConfig
     */
    select?: WebhookConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookConfig
     */
    omit?: WebhookConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookConfigInclude<ExtArgs> | null
  }


  /**
   * Model WebhookDelivery
   */

  export type AggregateWebhookDelivery = {
    _count: WebhookDeliveryCountAggregateOutputType | null
    _avg: WebhookDeliveryAvgAggregateOutputType | null
    _sum: WebhookDeliverySumAggregateOutputType | null
    _min: WebhookDeliveryMinAggregateOutputType | null
    _max: WebhookDeliveryMaxAggregateOutputType | null
  }

  export type WebhookDeliveryAvgAggregateOutputType = {
    attemptCount: number | null
  }

  export type WebhookDeliverySumAggregateOutputType = {
    attemptCount: number | null
  }

  export type WebhookDeliveryMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    webhookId: string | null
    eventType: string | null
    status: string | null
    attemptCount: number | null
    nextRetryAt: Date | null
    lastResponse: string | null
    signature: string | null
    createdAt: Date | null
    deliveredAt: Date | null
  }

  export type WebhookDeliveryMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    webhookId: string | null
    eventType: string | null
    status: string | null
    attemptCount: number | null
    nextRetryAt: Date | null
    lastResponse: string | null
    signature: string | null
    createdAt: Date | null
    deliveredAt: Date | null
  }

  export type WebhookDeliveryCountAggregateOutputType = {
    id: number
    tenantId: number
    webhookId: number
    eventType: number
    payload: number
    status: number
    attemptCount: number
    nextRetryAt: number
    lastResponse: number
    signature: number
    createdAt: number
    deliveredAt: number
    _all: number
  }


  export type WebhookDeliveryAvgAggregateInputType = {
    attemptCount?: true
  }

  export type WebhookDeliverySumAggregateInputType = {
    attemptCount?: true
  }

  export type WebhookDeliveryMinAggregateInputType = {
    id?: true
    tenantId?: true
    webhookId?: true
    eventType?: true
    status?: true
    attemptCount?: true
    nextRetryAt?: true
    lastResponse?: true
    signature?: true
    createdAt?: true
    deliveredAt?: true
  }

  export type WebhookDeliveryMaxAggregateInputType = {
    id?: true
    tenantId?: true
    webhookId?: true
    eventType?: true
    status?: true
    attemptCount?: true
    nextRetryAt?: true
    lastResponse?: true
    signature?: true
    createdAt?: true
    deliveredAt?: true
  }

  export type WebhookDeliveryCountAggregateInputType = {
    id?: true
    tenantId?: true
    webhookId?: true
    eventType?: true
    payload?: true
    status?: true
    attemptCount?: true
    nextRetryAt?: true
    lastResponse?: true
    signature?: true
    createdAt?: true
    deliveredAt?: true
    _all?: true
  }

  export type WebhookDeliveryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookDelivery to aggregate.
     */
    where?: WebhookDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookDeliveries to fetch.
     */
    orderBy?: WebhookDeliveryOrderByWithRelationInput | WebhookDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookDeliveries
    **/
    _count?: true | WebhookDeliveryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebhookDeliveryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebhookDeliverySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookDeliveryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookDeliveryMaxAggregateInputType
  }

  export type GetWebhookDeliveryAggregateType<T extends WebhookDeliveryAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookDelivery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookDelivery[P]>
      : GetScalarType<T[P], AggregateWebhookDelivery[P]>
  }




  export type WebhookDeliveryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookDeliveryWhereInput
    orderBy?: WebhookDeliveryOrderByWithAggregationInput | WebhookDeliveryOrderByWithAggregationInput[]
    by: WebhookDeliveryScalarFieldEnum[] | WebhookDeliveryScalarFieldEnum
    having?: WebhookDeliveryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookDeliveryCountAggregateInputType | true
    _avg?: WebhookDeliveryAvgAggregateInputType
    _sum?: WebhookDeliverySumAggregateInputType
    _min?: WebhookDeliveryMinAggregateInputType
    _max?: WebhookDeliveryMaxAggregateInputType
  }

  export type WebhookDeliveryGroupByOutputType = {
    id: string
    tenantId: string
    webhookId: string
    eventType: string
    payload: JsonValue
    status: string
    attemptCount: number
    nextRetryAt: Date | null
    lastResponse: string | null
    signature: string | null
    createdAt: Date
    deliveredAt: Date | null
    _count: WebhookDeliveryCountAggregateOutputType | null
    _avg: WebhookDeliveryAvgAggregateOutputType | null
    _sum: WebhookDeliverySumAggregateOutputType | null
    _min: WebhookDeliveryMinAggregateOutputType | null
    _max: WebhookDeliveryMaxAggregateOutputType | null
  }

  type GetWebhookDeliveryGroupByPayload<T extends WebhookDeliveryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookDeliveryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookDeliveryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookDeliveryGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookDeliveryGroupByOutputType[P]>
        }
      >
    >


  export type WebhookDeliverySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    webhookId?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    attemptCount?: boolean
    nextRetryAt?: boolean
    lastResponse?: boolean
    signature?: boolean
    createdAt?: boolean
    deliveredAt?: boolean
    webhook?: boolean | WebhookConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookDelivery"]>

  export type WebhookDeliverySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    webhookId?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    attemptCount?: boolean
    nextRetryAt?: boolean
    lastResponse?: boolean
    signature?: boolean
    createdAt?: boolean
    deliveredAt?: boolean
    webhook?: boolean | WebhookConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookDelivery"]>

  export type WebhookDeliverySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    webhookId?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    attemptCount?: boolean
    nextRetryAt?: boolean
    lastResponse?: boolean
    signature?: boolean
    createdAt?: boolean
    deliveredAt?: boolean
    webhook?: boolean | WebhookConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookDelivery"]>

  export type WebhookDeliverySelectScalar = {
    id?: boolean
    tenantId?: boolean
    webhookId?: boolean
    eventType?: boolean
    payload?: boolean
    status?: boolean
    attemptCount?: boolean
    nextRetryAt?: boolean
    lastResponse?: boolean
    signature?: boolean
    createdAt?: boolean
    deliveredAt?: boolean
  }

  export type WebhookDeliveryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "webhookId" | "eventType" | "payload" | "status" | "attemptCount" | "nextRetryAt" | "lastResponse" | "signature" | "createdAt" | "deliveredAt", ExtArgs["result"]["webhookDelivery"]>
  export type WebhookDeliveryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    webhook?: boolean | WebhookConfigDefaultArgs<ExtArgs>
  }
  export type WebhookDeliveryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    webhook?: boolean | WebhookConfigDefaultArgs<ExtArgs>
  }
  export type WebhookDeliveryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    webhook?: boolean | WebhookConfigDefaultArgs<ExtArgs>
  }

  export type $WebhookDeliveryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookDelivery"
    objects: {
      webhook: Prisma.$WebhookConfigPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      webhookId: string
      eventType: string
      payload: Prisma.JsonValue
      status: string
      attemptCount: number
      nextRetryAt: Date | null
      lastResponse: string | null
      signature: string | null
      createdAt: Date
      deliveredAt: Date | null
    }, ExtArgs["result"]["webhookDelivery"]>
    composites: {}
  }

  type WebhookDeliveryGetPayload<S extends boolean | null | undefined | WebhookDeliveryDefaultArgs> = $Result.GetResult<Prisma.$WebhookDeliveryPayload, S>

  type WebhookDeliveryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookDeliveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookDeliveryCountAggregateInputType | true
    }

  export interface WebhookDeliveryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookDelivery'], meta: { name: 'WebhookDelivery' } }
    /**
     * Find zero or one WebhookDelivery that matches the filter.
     * @param {WebhookDeliveryFindUniqueArgs} args - Arguments to find a WebhookDelivery
     * @example
     * // Get one WebhookDelivery
     * const webhookDelivery = await prisma.webhookDelivery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookDeliveryFindUniqueArgs>(args: SelectSubset<T, WebhookDeliveryFindUniqueArgs<ExtArgs>>): Prisma__WebhookDeliveryClient<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookDelivery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookDeliveryFindUniqueOrThrowArgs} args - Arguments to find a WebhookDelivery
     * @example
     * // Get one WebhookDelivery
     * const webhookDelivery = await prisma.webhookDelivery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookDeliveryFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookDeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookDeliveryClient<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookDelivery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookDeliveryFindFirstArgs} args - Arguments to find a WebhookDelivery
     * @example
     * // Get one WebhookDelivery
     * const webhookDelivery = await prisma.webhookDelivery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookDeliveryFindFirstArgs>(args?: SelectSubset<T, WebhookDeliveryFindFirstArgs<ExtArgs>>): Prisma__WebhookDeliveryClient<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookDelivery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookDeliveryFindFirstOrThrowArgs} args - Arguments to find a WebhookDelivery
     * @example
     * // Get one WebhookDelivery
     * const webhookDelivery = await prisma.webhookDelivery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookDeliveryFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookDeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookDeliveryClient<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookDeliveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookDeliveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookDeliveries
     * const webhookDeliveries = await prisma.webhookDelivery.findMany()
     * 
     * // Get first 10 WebhookDeliveries
     * const webhookDeliveries = await prisma.webhookDelivery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookDeliveryWithIdOnly = await prisma.webhookDelivery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookDeliveryFindManyArgs>(args?: SelectSubset<T, WebhookDeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookDelivery.
     * @param {WebhookDeliveryCreateArgs} args - Arguments to create a WebhookDelivery.
     * @example
     * // Create one WebhookDelivery
     * const WebhookDelivery = await prisma.webhookDelivery.create({
     *   data: {
     *     // ... data to create a WebhookDelivery
     *   }
     * })
     * 
     */
    create<T extends WebhookDeliveryCreateArgs>(args: SelectSubset<T, WebhookDeliveryCreateArgs<ExtArgs>>): Prisma__WebhookDeliveryClient<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookDeliveries.
     * @param {WebhookDeliveryCreateManyArgs} args - Arguments to create many WebhookDeliveries.
     * @example
     * // Create many WebhookDeliveries
     * const webhookDelivery = await prisma.webhookDelivery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookDeliveryCreateManyArgs>(args?: SelectSubset<T, WebhookDeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookDeliveries and returns the data saved in the database.
     * @param {WebhookDeliveryCreateManyAndReturnArgs} args - Arguments to create many WebhookDeliveries.
     * @example
     * // Create many WebhookDeliveries
     * const webhookDelivery = await prisma.webhookDelivery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookDeliveries and only return the `id`
     * const webhookDeliveryWithIdOnly = await prisma.webhookDelivery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookDeliveryCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookDeliveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookDelivery.
     * @param {WebhookDeliveryDeleteArgs} args - Arguments to delete one WebhookDelivery.
     * @example
     * // Delete one WebhookDelivery
     * const WebhookDelivery = await prisma.webhookDelivery.delete({
     *   where: {
     *     // ... filter to delete one WebhookDelivery
     *   }
     * })
     * 
     */
    delete<T extends WebhookDeliveryDeleteArgs>(args: SelectSubset<T, WebhookDeliveryDeleteArgs<ExtArgs>>): Prisma__WebhookDeliveryClient<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookDelivery.
     * @param {WebhookDeliveryUpdateArgs} args - Arguments to update one WebhookDelivery.
     * @example
     * // Update one WebhookDelivery
     * const webhookDelivery = await prisma.webhookDelivery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookDeliveryUpdateArgs>(args: SelectSubset<T, WebhookDeliveryUpdateArgs<ExtArgs>>): Prisma__WebhookDeliveryClient<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookDeliveries.
     * @param {WebhookDeliveryDeleteManyArgs} args - Arguments to filter WebhookDeliveries to delete.
     * @example
     * // Delete a few WebhookDeliveries
     * const { count } = await prisma.webhookDelivery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookDeliveryDeleteManyArgs>(args?: SelectSubset<T, WebhookDeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookDeliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookDeliveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookDeliveries
     * const webhookDelivery = await prisma.webhookDelivery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookDeliveryUpdateManyArgs>(args: SelectSubset<T, WebhookDeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookDeliveries and returns the data updated in the database.
     * @param {WebhookDeliveryUpdateManyAndReturnArgs} args - Arguments to update many WebhookDeliveries.
     * @example
     * // Update many WebhookDeliveries
     * const webhookDelivery = await prisma.webhookDelivery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookDeliveries and only return the `id`
     * const webhookDeliveryWithIdOnly = await prisma.webhookDelivery.updateManyAndReturn({
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
    updateManyAndReturn<T extends WebhookDeliveryUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookDeliveryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookDelivery.
     * @param {WebhookDeliveryUpsertArgs} args - Arguments to update or create a WebhookDelivery.
     * @example
     * // Update or create a WebhookDelivery
     * const webhookDelivery = await prisma.webhookDelivery.upsert({
     *   create: {
     *     // ... data to create a WebhookDelivery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookDelivery we want to update
     *   }
     * })
     */
    upsert<T extends WebhookDeliveryUpsertArgs>(args: SelectSubset<T, WebhookDeliveryUpsertArgs<ExtArgs>>): Prisma__WebhookDeliveryClient<$Result.GetResult<Prisma.$WebhookDeliveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookDeliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookDeliveryCountArgs} args - Arguments to filter WebhookDeliveries to count.
     * @example
     * // Count the number of WebhookDeliveries
     * const count = await prisma.webhookDelivery.count({
     *   where: {
     *     // ... the filter for the WebhookDeliveries we want to count
     *   }
     * })
    **/
    count<T extends WebhookDeliveryCountArgs>(
      args?: Subset<T, WebhookDeliveryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookDeliveryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookDelivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookDeliveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WebhookDeliveryAggregateArgs>(args: Subset<T, WebhookDeliveryAggregateArgs>): Prisma.PrismaPromise<GetWebhookDeliveryAggregateType<T>>

    /**
     * Group by WebhookDelivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookDeliveryGroupByArgs} args - Group by arguments.
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
      T extends WebhookDeliveryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookDeliveryGroupByArgs['orderBy'] }
        : { orderBy?: WebhookDeliveryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WebhookDeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookDelivery model
   */
  readonly fields: WebhookDeliveryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookDelivery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookDeliveryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    webhook<T extends WebhookConfigDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WebhookConfigDefaultArgs<ExtArgs>>): Prisma__WebhookConfigClient<$Result.GetResult<Prisma.$WebhookConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WebhookDelivery model
   */
  interface WebhookDeliveryFieldRefs {
    readonly id: FieldRef<"WebhookDelivery", 'String'>
    readonly tenantId: FieldRef<"WebhookDelivery", 'String'>
    readonly webhookId: FieldRef<"WebhookDelivery", 'String'>
    readonly eventType: FieldRef<"WebhookDelivery", 'String'>
    readonly payload: FieldRef<"WebhookDelivery", 'Json'>
    readonly status: FieldRef<"WebhookDelivery", 'String'>
    readonly attemptCount: FieldRef<"WebhookDelivery", 'Int'>
    readonly nextRetryAt: FieldRef<"WebhookDelivery", 'DateTime'>
    readonly lastResponse: FieldRef<"WebhookDelivery", 'String'>
    readonly signature: FieldRef<"WebhookDelivery", 'String'>
    readonly createdAt: FieldRef<"WebhookDelivery", 'DateTime'>
    readonly deliveredAt: FieldRef<"WebhookDelivery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookDelivery findUnique
   */
  export type WebhookDeliveryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which WebhookDelivery to fetch.
     */
    where: WebhookDeliveryWhereUniqueInput
  }

  /**
   * WebhookDelivery findUniqueOrThrow
   */
  export type WebhookDeliveryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which WebhookDelivery to fetch.
     */
    where: WebhookDeliveryWhereUniqueInput
  }

  /**
   * WebhookDelivery findFirst
   */
  export type WebhookDeliveryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which WebhookDelivery to fetch.
     */
    where?: WebhookDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookDeliveries to fetch.
     */
    orderBy?: WebhookDeliveryOrderByWithRelationInput | WebhookDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookDeliveries.
     */
    cursor?: WebhookDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookDeliveries.
     */
    distinct?: WebhookDeliveryScalarFieldEnum | WebhookDeliveryScalarFieldEnum[]
  }

  /**
   * WebhookDelivery findFirstOrThrow
   */
  export type WebhookDeliveryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which WebhookDelivery to fetch.
     */
    where?: WebhookDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookDeliveries to fetch.
     */
    orderBy?: WebhookDeliveryOrderByWithRelationInput | WebhookDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookDeliveries.
     */
    cursor?: WebhookDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookDeliveries.
     */
    distinct?: WebhookDeliveryScalarFieldEnum | WebhookDeliveryScalarFieldEnum[]
  }

  /**
   * WebhookDelivery findMany
   */
  export type WebhookDeliveryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which WebhookDeliveries to fetch.
     */
    where?: WebhookDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookDeliveries to fetch.
     */
    orderBy?: WebhookDeliveryOrderByWithRelationInput | WebhookDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookDeliveries.
     */
    cursor?: WebhookDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookDeliveries.
     */
    skip?: number
    distinct?: WebhookDeliveryScalarFieldEnum | WebhookDeliveryScalarFieldEnum[]
  }

  /**
   * WebhookDelivery create
   */
  export type WebhookDeliveryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookDelivery.
     */
    data: XOR<WebhookDeliveryCreateInput, WebhookDeliveryUncheckedCreateInput>
  }

  /**
   * WebhookDelivery createMany
   */
  export type WebhookDeliveryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookDeliveries.
     */
    data: WebhookDeliveryCreateManyInput | WebhookDeliveryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookDelivery createManyAndReturn
   */
  export type WebhookDeliveryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookDeliveries.
     */
    data: WebhookDeliveryCreateManyInput | WebhookDeliveryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookDelivery update
   */
  export type WebhookDeliveryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookDelivery.
     */
    data: XOR<WebhookDeliveryUpdateInput, WebhookDeliveryUncheckedUpdateInput>
    /**
     * Choose, which WebhookDelivery to update.
     */
    where: WebhookDeliveryWhereUniqueInput
  }

  /**
   * WebhookDelivery updateMany
   */
  export type WebhookDeliveryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookDeliveries.
     */
    data: XOR<WebhookDeliveryUpdateManyMutationInput, WebhookDeliveryUncheckedUpdateManyInput>
    /**
     * Filter which WebhookDeliveries to update
     */
    where?: WebhookDeliveryWhereInput
    /**
     * Limit how many WebhookDeliveries to update.
     */
    limit?: number
  }

  /**
   * WebhookDelivery updateManyAndReturn
   */
  export type WebhookDeliveryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * The data used to update WebhookDeliveries.
     */
    data: XOR<WebhookDeliveryUpdateManyMutationInput, WebhookDeliveryUncheckedUpdateManyInput>
    /**
     * Filter which WebhookDeliveries to update
     */
    where?: WebhookDeliveryWhereInput
    /**
     * Limit how many WebhookDeliveries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookDelivery upsert
   */
  export type WebhookDeliveryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookDelivery to update in case it exists.
     */
    where: WebhookDeliveryWhereUniqueInput
    /**
     * In case the WebhookDelivery found by the `where` argument doesn't exist, create a new WebhookDelivery with this data.
     */
    create: XOR<WebhookDeliveryCreateInput, WebhookDeliveryUncheckedCreateInput>
    /**
     * In case the WebhookDelivery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookDeliveryUpdateInput, WebhookDeliveryUncheckedUpdateInput>
  }

  /**
   * WebhookDelivery delete
   */
  export type WebhookDeliveryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
    /**
     * Filter which WebhookDelivery to delete.
     */
    where: WebhookDeliveryWhereUniqueInput
  }

  /**
   * WebhookDelivery deleteMany
   */
  export type WebhookDeliveryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookDeliveries to delete
     */
    where?: WebhookDeliveryWhereInput
    /**
     * Limit how many WebhookDeliveries to delete.
     */
    limit?: number
  }

  /**
   * WebhookDelivery without action
   */
  export type WebhookDeliveryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookDelivery
     */
    select?: WebhookDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookDelivery
     */
    omit?: WebhookDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookDeliveryInclude<ExtArgs> | null
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


  export const SsoConfigScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    provider: 'provider',
    name: 'name',
    isEnabled: 'isEnabled',
    entityId: 'entityId',
    ssoUrl: 'ssoUrl',
    certificate: 'certificate',
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    issuerUrl: 'issuerUrl',
    metadataUrl: 'metadataUrl',
    redirectUri: 'redirectUri',
    scopes: 'scopes',
    attributeMap: 'attributeMap',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SsoConfigScalarFieldEnum = (typeof SsoConfigScalarFieldEnum)[keyof typeof SsoConfigScalarFieldEnum]


  export const PermissionGroupScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    description: 'description',
    permissions: 'permissions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PermissionGroupScalarFieldEnum = (typeof PermissionGroupScalarFieldEnum)[keyof typeof PermissionGroupScalarFieldEnum]


  export const CustomRoleScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    slug: 'slug',
    description: 'description',
    parentRoleId: 'parentRoleId',
    permissionGroupId: 'permissionGroupId',
    permissions: 'permissions',
    isSystem: 'isSystem',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomRoleScalarFieldEnum = (typeof CustomRoleScalarFieldEnum)[keyof typeof CustomRoleScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    actorId: 'actorId',
    actorEmail: 'actorEmail',
    action: 'action',
    resource: 'resource',
    resourceId: 'resourceId',
    status: 'status',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    userId: 'userId',
    eventType: 'eventType',
    source: 'source',
    status: 'status',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    keyPrefix: 'keyPrefix',
    keyHash: 'keyHash',
    scopes: 'scopes',
    createdById: 'createdById',
    lastUsedAt: 'lastUsedAt',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const ApiKeyUsageLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    apiKeyId: 'apiKeyId',
    endpoint: 'endpoint',
    method: 'method',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ApiKeyUsageLogScalarFieldEnum = (typeof ApiKeyUsageLogScalarFieldEnum)[keyof typeof ApiKeyUsageLogScalarFieldEnum]


  export const WebhookConfigScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    url: 'url',
    secret: 'secret',
    eventTypes: 'eventTypes',
    isEnabled: 'isEnabled',
    maxRetries: 'maxRetries',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WebhookConfigScalarFieldEnum = (typeof WebhookConfigScalarFieldEnum)[keyof typeof WebhookConfigScalarFieldEnum]


  export const WebhookDeliveryScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    webhookId: 'webhookId',
    eventType: 'eventType',
    payload: 'payload',
    status: 'status',
    attemptCount: 'attemptCount',
    nextRetryAt: 'nextRetryAt',
    lastResponse: 'lastResponse',
    signature: 'signature',
    createdAt: 'createdAt',
    deliveredAt: 'deliveredAt'
  };

  export type WebhookDeliveryScalarFieldEnum = (typeof WebhookDeliveryScalarFieldEnum)[keyof typeof WebhookDeliveryScalarFieldEnum]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type SsoConfigWhereInput = {
    AND?: SsoConfigWhereInput | SsoConfigWhereInput[]
    OR?: SsoConfigWhereInput[]
    NOT?: SsoConfigWhereInput | SsoConfigWhereInput[]
    id?: StringFilter<"SsoConfig"> | string
    tenantId?: StringFilter<"SsoConfig"> | string
    provider?: StringFilter<"SsoConfig"> | string
    name?: StringFilter<"SsoConfig"> | string
    isEnabled?: BoolFilter<"SsoConfig"> | boolean
    entityId?: StringNullableFilter<"SsoConfig"> | string | null
    ssoUrl?: StringNullableFilter<"SsoConfig"> | string | null
    certificate?: StringNullableFilter<"SsoConfig"> | string | null
    clientId?: StringNullableFilter<"SsoConfig"> | string | null
    clientSecret?: StringNullableFilter<"SsoConfig"> | string | null
    issuerUrl?: StringNullableFilter<"SsoConfig"> | string | null
    metadataUrl?: StringNullableFilter<"SsoConfig"> | string | null
    redirectUri?: StringNullableFilter<"SsoConfig"> | string | null
    scopes?: JsonNullableFilter<"SsoConfig">
    attributeMap?: JsonNullableFilter<"SsoConfig">
    createdAt?: DateTimeFilter<"SsoConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SsoConfig"> | Date | string
  }

  export type SsoConfigOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    isEnabled?: SortOrder
    entityId?: SortOrderInput | SortOrder
    ssoUrl?: SortOrderInput | SortOrder
    certificate?: SortOrderInput | SortOrder
    clientId?: SortOrderInput | SortOrder
    clientSecret?: SortOrderInput | SortOrder
    issuerUrl?: SortOrderInput | SortOrder
    metadataUrl?: SortOrderInput | SortOrder
    redirectUri?: SortOrderInput | SortOrder
    scopes?: SortOrderInput | SortOrder
    attributeMap?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SsoConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_provider?: SsoConfigTenantIdProviderCompoundUniqueInput
    AND?: SsoConfigWhereInput | SsoConfigWhereInput[]
    OR?: SsoConfigWhereInput[]
    NOT?: SsoConfigWhereInput | SsoConfigWhereInput[]
    tenantId?: StringFilter<"SsoConfig"> | string
    provider?: StringFilter<"SsoConfig"> | string
    name?: StringFilter<"SsoConfig"> | string
    isEnabled?: BoolFilter<"SsoConfig"> | boolean
    entityId?: StringNullableFilter<"SsoConfig"> | string | null
    ssoUrl?: StringNullableFilter<"SsoConfig"> | string | null
    certificate?: StringNullableFilter<"SsoConfig"> | string | null
    clientId?: StringNullableFilter<"SsoConfig"> | string | null
    clientSecret?: StringNullableFilter<"SsoConfig"> | string | null
    issuerUrl?: StringNullableFilter<"SsoConfig"> | string | null
    metadataUrl?: StringNullableFilter<"SsoConfig"> | string | null
    redirectUri?: StringNullableFilter<"SsoConfig"> | string | null
    scopes?: JsonNullableFilter<"SsoConfig">
    attributeMap?: JsonNullableFilter<"SsoConfig">
    createdAt?: DateTimeFilter<"SsoConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SsoConfig"> | Date | string
  }, "id" | "tenantId_provider">

  export type SsoConfigOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    isEnabled?: SortOrder
    entityId?: SortOrderInput | SortOrder
    ssoUrl?: SortOrderInput | SortOrder
    certificate?: SortOrderInput | SortOrder
    clientId?: SortOrderInput | SortOrder
    clientSecret?: SortOrderInput | SortOrder
    issuerUrl?: SortOrderInput | SortOrder
    metadataUrl?: SortOrderInput | SortOrder
    redirectUri?: SortOrderInput | SortOrder
    scopes?: SortOrderInput | SortOrder
    attributeMap?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SsoConfigCountOrderByAggregateInput
    _max?: SsoConfigMaxOrderByAggregateInput
    _min?: SsoConfigMinOrderByAggregateInput
  }

  export type SsoConfigScalarWhereWithAggregatesInput = {
    AND?: SsoConfigScalarWhereWithAggregatesInput | SsoConfigScalarWhereWithAggregatesInput[]
    OR?: SsoConfigScalarWhereWithAggregatesInput[]
    NOT?: SsoConfigScalarWhereWithAggregatesInput | SsoConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SsoConfig"> | string
    tenantId?: StringWithAggregatesFilter<"SsoConfig"> | string
    provider?: StringWithAggregatesFilter<"SsoConfig"> | string
    name?: StringWithAggregatesFilter<"SsoConfig"> | string
    isEnabled?: BoolWithAggregatesFilter<"SsoConfig"> | boolean
    entityId?: StringNullableWithAggregatesFilter<"SsoConfig"> | string | null
    ssoUrl?: StringNullableWithAggregatesFilter<"SsoConfig"> | string | null
    certificate?: StringNullableWithAggregatesFilter<"SsoConfig"> | string | null
    clientId?: StringNullableWithAggregatesFilter<"SsoConfig"> | string | null
    clientSecret?: StringNullableWithAggregatesFilter<"SsoConfig"> | string | null
    issuerUrl?: StringNullableWithAggregatesFilter<"SsoConfig"> | string | null
    metadataUrl?: StringNullableWithAggregatesFilter<"SsoConfig"> | string | null
    redirectUri?: StringNullableWithAggregatesFilter<"SsoConfig"> | string | null
    scopes?: JsonNullableWithAggregatesFilter<"SsoConfig">
    attributeMap?: JsonNullableWithAggregatesFilter<"SsoConfig">
    createdAt?: DateTimeWithAggregatesFilter<"SsoConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SsoConfig"> | Date | string
  }

  export type PermissionGroupWhereInput = {
    AND?: PermissionGroupWhereInput | PermissionGroupWhereInput[]
    OR?: PermissionGroupWhereInput[]
    NOT?: PermissionGroupWhereInput | PermissionGroupWhereInput[]
    id?: StringFilter<"PermissionGroup"> | string
    tenantId?: StringFilter<"PermissionGroup"> | string
    name?: StringFilter<"PermissionGroup"> | string
    description?: StringNullableFilter<"PermissionGroup"> | string | null
    permissions?: JsonFilter<"PermissionGroup">
    createdAt?: DateTimeFilter<"PermissionGroup"> | Date | string
    updatedAt?: DateTimeFilter<"PermissionGroup"> | Date | string
    roles?: CustomRoleListRelationFilter
  }

  export type PermissionGroupOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roles?: CustomRoleOrderByRelationAggregateInput
  }

  export type PermissionGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_name?: PermissionGroupTenantIdNameCompoundUniqueInput
    AND?: PermissionGroupWhereInput | PermissionGroupWhereInput[]
    OR?: PermissionGroupWhereInput[]
    NOT?: PermissionGroupWhereInput | PermissionGroupWhereInput[]
    tenantId?: StringFilter<"PermissionGroup"> | string
    name?: StringFilter<"PermissionGroup"> | string
    description?: StringNullableFilter<"PermissionGroup"> | string | null
    permissions?: JsonFilter<"PermissionGroup">
    createdAt?: DateTimeFilter<"PermissionGroup"> | Date | string
    updatedAt?: DateTimeFilter<"PermissionGroup"> | Date | string
    roles?: CustomRoleListRelationFilter
  }, "id" | "tenantId_name">

  export type PermissionGroupOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PermissionGroupCountOrderByAggregateInput
    _max?: PermissionGroupMaxOrderByAggregateInput
    _min?: PermissionGroupMinOrderByAggregateInput
  }

  export type PermissionGroupScalarWhereWithAggregatesInput = {
    AND?: PermissionGroupScalarWhereWithAggregatesInput | PermissionGroupScalarWhereWithAggregatesInput[]
    OR?: PermissionGroupScalarWhereWithAggregatesInput[]
    NOT?: PermissionGroupScalarWhereWithAggregatesInput | PermissionGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PermissionGroup"> | string
    tenantId?: StringWithAggregatesFilter<"PermissionGroup"> | string
    name?: StringWithAggregatesFilter<"PermissionGroup"> | string
    description?: StringNullableWithAggregatesFilter<"PermissionGroup"> | string | null
    permissions?: JsonWithAggregatesFilter<"PermissionGroup">
    createdAt?: DateTimeWithAggregatesFilter<"PermissionGroup"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PermissionGroup"> | Date | string
  }

  export type CustomRoleWhereInput = {
    AND?: CustomRoleWhereInput | CustomRoleWhereInput[]
    OR?: CustomRoleWhereInput[]
    NOT?: CustomRoleWhereInput | CustomRoleWhereInput[]
    id?: StringFilter<"CustomRole"> | string
    tenantId?: StringFilter<"CustomRole"> | string
    name?: StringFilter<"CustomRole"> | string
    slug?: StringFilter<"CustomRole"> | string
    description?: StringNullableFilter<"CustomRole"> | string | null
    parentRoleId?: StringNullableFilter<"CustomRole"> | string | null
    permissionGroupId?: StringNullableFilter<"CustomRole"> | string | null
    permissions?: JsonFilter<"CustomRole">
    isSystem?: BoolFilter<"CustomRole"> | boolean
    createdAt?: DateTimeFilter<"CustomRole"> | Date | string
    updatedAt?: DateTimeFilter<"CustomRole"> | Date | string
    parentRole?: XOR<CustomRoleNullableScalarRelationFilter, CustomRoleWhereInput> | null
    childRoles?: CustomRoleListRelationFilter
    permissionGroup?: XOR<PermissionGroupNullableScalarRelationFilter, PermissionGroupWhereInput> | null
  }

  export type CustomRoleOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    parentRoleId?: SortOrderInput | SortOrder
    permissionGroupId?: SortOrderInput | SortOrder
    permissions?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parentRole?: CustomRoleOrderByWithRelationInput
    childRoles?: CustomRoleOrderByRelationAggregateInput
    permissionGroup?: PermissionGroupOrderByWithRelationInput
  }

  export type CustomRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_slug?: CustomRoleTenantIdSlugCompoundUniqueInput
    AND?: CustomRoleWhereInput | CustomRoleWhereInput[]
    OR?: CustomRoleWhereInput[]
    NOT?: CustomRoleWhereInput | CustomRoleWhereInput[]
    tenantId?: StringFilter<"CustomRole"> | string
    name?: StringFilter<"CustomRole"> | string
    slug?: StringFilter<"CustomRole"> | string
    description?: StringNullableFilter<"CustomRole"> | string | null
    parentRoleId?: StringNullableFilter<"CustomRole"> | string | null
    permissionGroupId?: StringNullableFilter<"CustomRole"> | string | null
    permissions?: JsonFilter<"CustomRole">
    isSystem?: BoolFilter<"CustomRole"> | boolean
    createdAt?: DateTimeFilter<"CustomRole"> | Date | string
    updatedAt?: DateTimeFilter<"CustomRole"> | Date | string
    parentRole?: XOR<CustomRoleNullableScalarRelationFilter, CustomRoleWhereInput> | null
    childRoles?: CustomRoleListRelationFilter
    permissionGroup?: XOR<PermissionGroupNullableScalarRelationFilter, PermissionGroupWhereInput> | null
  }, "id" | "tenantId_slug">

  export type CustomRoleOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    parentRoleId?: SortOrderInput | SortOrder
    permissionGroupId?: SortOrderInput | SortOrder
    permissions?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomRoleCountOrderByAggregateInput
    _max?: CustomRoleMaxOrderByAggregateInput
    _min?: CustomRoleMinOrderByAggregateInput
  }

  export type CustomRoleScalarWhereWithAggregatesInput = {
    AND?: CustomRoleScalarWhereWithAggregatesInput | CustomRoleScalarWhereWithAggregatesInput[]
    OR?: CustomRoleScalarWhereWithAggregatesInput[]
    NOT?: CustomRoleScalarWhereWithAggregatesInput | CustomRoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomRole"> | string
    tenantId?: StringWithAggregatesFilter<"CustomRole"> | string
    name?: StringWithAggregatesFilter<"CustomRole"> | string
    slug?: StringWithAggregatesFilter<"CustomRole"> | string
    description?: StringNullableWithAggregatesFilter<"CustomRole"> | string | null
    parentRoleId?: StringNullableWithAggregatesFilter<"CustomRole"> | string | null
    permissionGroupId?: StringNullableWithAggregatesFilter<"CustomRole"> | string | null
    permissions?: JsonWithAggregatesFilter<"CustomRole">
    isSystem?: BoolWithAggregatesFilter<"CustomRole"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CustomRole"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomRole"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    tenantId?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    resource?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    status?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorEmail?: SortOrderInput | SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    tenantId?: StringFilter<"AuditLog"> | string
    actorId?: StringNullableFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    resource?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    status?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    actorId?: SortOrderInput | SortOrder
    actorEmail?: SortOrderInput | SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    tenantId?: StringWithAggregatesFilter<"AuditLog"> | string
    actorId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    actorEmail?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    resource?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    status?: StringWithAggregatesFilter<"AuditLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    tenantId?: StringFilter<"ActivityLog"> | string
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    eventType?: StringFilter<"ActivityLog"> | string
    source?: StringFilter<"ActivityLog"> | string
    status?: StringFilter<"ActivityLog"> | string
    metadata?: JsonNullableFilter<"ActivityLog">
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    source?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    tenantId?: StringFilter<"ActivityLog"> | string
    userId?: StringNullableFilter<"ActivityLog"> | string | null
    eventType?: StringFilter<"ActivityLog"> | string
    source?: StringFilter<"ActivityLog"> | string
    status?: StringFilter<"ActivityLog"> | string
    metadata?: JsonNullableFilter<"ActivityLog">
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    source?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    tenantId?: StringWithAggregatesFilter<"ActivityLog"> | string
    userId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    eventType?: StringWithAggregatesFilter<"ActivityLog"> | string
    source?: StringWithAggregatesFilter<"ActivityLog"> | string
    status?: StringWithAggregatesFilter<"ActivityLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"ActivityLog">
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    tenantId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    keyPrefix?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    scopes?: JsonFilter<"ApiKey">
    createdById?: StringNullableFilter<"ApiKey"> | string | null
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    usageLogs?: ApiKeyUsageLogListRelationFilter
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyPrefix?: SortOrder
    keyHash?: SortOrder
    scopes?: SortOrder
    createdById?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usageLogs?: ApiKeyUsageLogOrderByRelationAggregateInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    tenantId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    keyPrefix?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    scopes?: JsonFilter<"ApiKey">
    createdById?: StringNullableFilter<"ApiKey"> | string | null
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    usageLogs?: ApiKeyUsageLogListRelationFilter
  }, "id">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyPrefix?: SortOrder
    keyHash?: SortOrder
    scopes?: SortOrder
    createdById?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    tenantId?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringWithAggregatesFilter<"ApiKey"> | string
    keyPrefix?: StringWithAggregatesFilter<"ApiKey"> | string
    keyHash?: StringWithAggregatesFilter<"ApiKey"> | string
    scopes?: JsonWithAggregatesFilter<"ApiKey">
    createdById?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
  }

  export type ApiKeyUsageLogWhereInput = {
    AND?: ApiKeyUsageLogWhereInput | ApiKeyUsageLogWhereInput[]
    OR?: ApiKeyUsageLogWhereInput[]
    NOT?: ApiKeyUsageLogWhereInput | ApiKeyUsageLogWhereInput[]
    id?: StringFilter<"ApiKeyUsageLog"> | string
    tenantId?: StringFilter<"ApiKeyUsageLog"> | string
    apiKeyId?: StringFilter<"ApiKeyUsageLog"> | string
    endpoint?: StringFilter<"ApiKeyUsageLog"> | string
    method?: StringFilter<"ApiKeyUsageLog"> | string
    status?: StringFilter<"ApiKeyUsageLog"> | string
    createdAt?: DateTimeFilter<"ApiKeyUsageLog"> | Date | string
    apiKey?: XOR<ApiKeyScalarRelationFilter, ApiKeyWhereInput>
  }

  export type ApiKeyUsageLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    apiKeyId?: SortOrder
    endpoint?: SortOrder
    method?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    apiKey?: ApiKeyOrderByWithRelationInput
  }

  export type ApiKeyUsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApiKeyUsageLogWhereInput | ApiKeyUsageLogWhereInput[]
    OR?: ApiKeyUsageLogWhereInput[]
    NOT?: ApiKeyUsageLogWhereInput | ApiKeyUsageLogWhereInput[]
    tenantId?: StringFilter<"ApiKeyUsageLog"> | string
    apiKeyId?: StringFilter<"ApiKeyUsageLog"> | string
    endpoint?: StringFilter<"ApiKeyUsageLog"> | string
    method?: StringFilter<"ApiKeyUsageLog"> | string
    status?: StringFilter<"ApiKeyUsageLog"> | string
    createdAt?: DateTimeFilter<"ApiKeyUsageLog"> | Date | string
    apiKey?: XOR<ApiKeyScalarRelationFilter, ApiKeyWhereInput>
  }, "id">

  export type ApiKeyUsageLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    apiKeyId?: SortOrder
    endpoint?: SortOrder
    method?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ApiKeyUsageLogCountOrderByAggregateInput
    _max?: ApiKeyUsageLogMaxOrderByAggregateInput
    _min?: ApiKeyUsageLogMinOrderByAggregateInput
  }

  export type ApiKeyUsageLogScalarWhereWithAggregatesInput = {
    AND?: ApiKeyUsageLogScalarWhereWithAggregatesInput | ApiKeyUsageLogScalarWhereWithAggregatesInput[]
    OR?: ApiKeyUsageLogScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyUsageLogScalarWhereWithAggregatesInput | ApiKeyUsageLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKeyUsageLog"> | string
    tenantId?: StringWithAggregatesFilter<"ApiKeyUsageLog"> | string
    apiKeyId?: StringWithAggregatesFilter<"ApiKeyUsageLog"> | string
    endpoint?: StringWithAggregatesFilter<"ApiKeyUsageLog"> | string
    method?: StringWithAggregatesFilter<"ApiKeyUsageLog"> | string
    status?: StringWithAggregatesFilter<"ApiKeyUsageLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ApiKeyUsageLog"> | Date | string
  }

  export type WebhookConfigWhereInput = {
    AND?: WebhookConfigWhereInput | WebhookConfigWhereInput[]
    OR?: WebhookConfigWhereInput[]
    NOT?: WebhookConfigWhereInput | WebhookConfigWhereInput[]
    id?: StringFilter<"WebhookConfig"> | string
    tenantId?: StringFilter<"WebhookConfig"> | string
    name?: StringFilter<"WebhookConfig"> | string
    url?: StringFilter<"WebhookConfig"> | string
    secret?: StringFilter<"WebhookConfig"> | string
    eventTypes?: JsonFilter<"WebhookConfig">
    isEnabled?: BoolFilter<"WebhookConfig"> | boolean
    maxRetries?: IntFilter<"WebhookConfig"> | number
    createdAt?: DateTimeFilter<"WebhookConfig"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookConfig"> | Date | string
    deliveries?: WebhookDeliveryListRelationFilter
  }

  export type WebhookConfigOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    eventTypes?: SortOrder
    isEnabled?: SortOrder
    maxRetries?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deliveries?: WebhookDeliveryOrderByRelationAggregateInput
  }

  export type WebhookConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookConfigWhereInput | WebhookConfigWhereInput[]
    OR?: WebhookConfigWhereInput[]
    NOT?: WebhookConfigWhereInput | WebhookConfigWhereInput[]
    tenantId?: StringFilter<"WebhookConfig"> | string
    name?: StringFilter<"WebhookConfig"> | string
    url?: StringFilter<"WebhookConfig"> | string
    secret?: StringFilter<"WebhookConfig"> | string
    eventTypes?: JsonFilter<"WebhookConfig">
    isEnabled?: BoolFilter<"WebhookConfig"> | boolean
    maxRetries?: IntFilter<"WebhookConfig"> | number
    createdAt?: DateTimeFilter<"WebhookConfig"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookConfig"> | Date | string
    deliveries?: WebhookDeliveryListRelationFilter
  }, "id">

  export type WebhookConfigOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    eventTypes?: SortOrder
    isEnabled?: SortOrder
    maxRetries?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WebhookConfigCountOrderByAggregateInput
    _avg?: WebhookConfigAvgOrderByAggregateInput
    _max?: WebhookConfigMaxOrderByAggregateInput
    _min?: WebhookConfigMinOrderByAggregateInput
    _sum?: WebhookConfigSumOrderByAggregateInput
  }

  export type WebhookConfigScalarWhereWithAggregatesInput = {
    AND?: WebhookConfigScalarWhereWithAggregatesInput | WebhookConfigScalarWhereWithAggregatesInput[]
    OR?: WebhookConfigScalarWhereWithAggregatesInput[]
    NOT?: WebhookConfigScalarWhereWithAggregatesInput | WebhookConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookConfig"> | string
    tenantId?: StringWithAggregatesFilter<"WebhookConfig"> | string
    name?: StringWithAggregatesFilter<"WebhookConfig"> | string
    url?: StringWithAggregatesFilter<"WebhookConfig"> | string
    secret?: StringWithAggregatesFilter<"WebhookConfig"> | string
    eventTypes?: JsonWithAggregatesFilter<"WebhookConfig">
    isEnabled?: BoolWithAggregatesFilter<"WebhookConfig"> | boolean
    maxRetries?: IntWithAggregatesFilter<"WebhookConfig"> | number
    createdAt?: DateTimeWithAggregatesFilter<"WebhookConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WebhookConfig"> | Date | string
  }

  export type WebhookDeliveryWhereInput = {
    AND?: WebhookDeliveryWhereInput | WebhookDeliveryWhereInput[]
    OR?: WebhookDeliveryWhereInput[]
    NOT?: WebhookDeliveryWhereInput | WebhookDeliveryWhereInput[]
    id?: StringFilter<"WebhookDelivery"> | string
    tenantId?: StringFilter<"WebhookDelivery"> | string
    webhookId?: StringFilter<"WebhookDelivery"> | string
    eventType?: StringFilter<"WebhookDelivery"> | string
    payload?: JsonFilter<"WebhookDelivery">
    status?: StringFilter<"WebhookDelivery"> | string
    attemptCount?: IntFilter<"WebhookDelivery"> | number
    nextRetryAt?: DateTimeNullableFilter<"WebhookDelivery"> | Date | string | null
    lastResponse?: StringNullableFilter<"WebhookDelivery"> | string | null
    signature?: StringNullableFilter<"WebhookDelivery"> | string | null
    createdAt?: DateTimeFilter<"WebhookDelivery"> | Date | string
    deliveredAt?: DateTimeNullableFilter<"WebhookDelivery"> | Date | string | null
    webhook?: XOR<WebhookConfigScalarRelationFilter, WebhookConfigWhereInput>
  }

  export type WebhookDeliveryOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    webhookId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrderInput | SortOrder
    lastResponse?: SortOrderInput | SortOrder
    signature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    webhook?: WebhookConfigOrderByWithRelationInput
  }

  export type WebhookDeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookDeliveryWhereInput | WebhookDeliveryWhereInput[]
    OR?: WebhookDeliveryWhereInput[]
    NOT?: WebhookDeliveryWhereInput | WebhookDeliveryWhereInput[]
    tenantId?: StringFilter<"WebhookDelivery"> | string
    webhookId?: StringFilter<"WebhookDelivery"> | string
    eventType?: StringFilter<"WebhookDelivery"> | string
    payload?: JsonFilter<"WebhookDelivery">
    status?: StringFilter<"WebhookDelivery"> | string
    attemptCount?: IntFilter<"WebhookDelivery"> | number
    nextRetryAt?: DateTimeNullableFilter<"WebhookDelivery"> | Date | string | null
    lastResponse?: StringNullableFilter<"WebhookDelivery"> | string | null
    signature?: StringNullableFilter<"WebhookDelivery"> | string | null
    createdAt?: DateTimeFilter<"WebhookDelivery"> | Date | string
    deliveredAt?: DateTimeNullableFilter<"WebhookDelivery"> | Date | string | null
    webhook?: XOR<WebhookConfigScalarRelationFilter, WebhookConfigWhereInput>
  }, "id">

  export type WebhookDeliveryOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    webhookId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrderInput | SortOrder
    lastResponse?: SortOrderInput | SortOrder
    signature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    _count?: WebhookDeliveryCountOrderByAggregateInput
    _avg?: WebhookDeliveryAvgOrderByAggregateInput
    _max?: WebhookDeliveryMaxOrderByAggregateInput
    _min?: WebhookDeliveryMinOrderByAggregateInput
    _sum?: WebhookDeliverySumOrderByAggregateInput
  }

  export type WebhookDeliveryScalarWhereWithAggregatesInput = {
    AND?: WebhookDeliveryScalarWhereWithAggregatesInput | WebhookDeliveryScalarWhereWithAggregatesInput[]
    OR?: WebhookDeliveryScalarWhereWithAggregatesInput[]
    NOT?: WebhookDeliveryScalarWhereWithAggregatesInput | WebhookDeliveryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookDelivery"> | string
    tenantId?: StringWithAggregatesFilter<"WebhookDelivery"> | string
    webhookId?: StringWithAggregatesFilter<"WebhookDelivery"> | string
    eventType?: StringWithAggregatesFilter<"WebhookDelivery"> | string
    payload?: JsonWithAggregatesFilter<"WebhookDelivery">
    status?: StringWithAggregatesFilter<"WebhookDelivery"> | string
    attemptCount?: IntWithAggregatesFilter<"WebhookDelivery"> | number
    nextRetryAt?: DateTimeNullableWithAggregatesFilter<"WebhookDelivery"> | Date | string | null
    lastResponse?: StringNullableWithAggregatesFilter<"WebhookDelivery"> | string | null
    signature?: StringNullableWithAggregatesFilter<"WebhookDelivery"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WebhookDelivery"> | Date | string
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"WebhookDelivery"> | Date | string | null
  }

  export type SsoConfigCreateInput = {
    id?: string
    tenantId: string
    provider: string
    name: string
    isEnabled?: boolean
    entityId?: string | null
    ssoUrl?: string | null
    certificate?: string | null
    clientId?: string | null
    clientSecret?: string | null
    issuerUrl?: string | null
    metadataUrl?: string | null
    redirectUri?: string | null
    scopes?: NullableJsonNullValueInput | InputJsonValue
    attributeMap?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SsoConfigUncheckedCreateInput = {
    id?: string
    tenantId: string
    provider: string
    name: string
    isEnabled?: boolean
    entityId?: string | null
    ssoUrl?: string | null
    certificate?: string | null
    clientId?: string | null
    clientSecret?: string | null
    issuerUrl?: string | null
    metadataUrl?: string | null
    redirectUri?: string | null
    scopes?: NullableJsonNullValueInput | InputJsonValue
    attributeMap?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SsoConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    ssoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    issuerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    redirectUri?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: NullableJsonNullValueInput | InputJsonValue
    attributeMap?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SsoConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    ssoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    issuerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    redirectUri?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: NullableJsonNullValueInput | InputJsonValue
    attributeMap?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SsoConfigCreateManyInput = {
    id?: string
    tenantId: string
    provider: string
    name: string
    isEnabled?: boolean
    entityId?: string | null
    ssoUrl?: string | null
    certificate?: string | null
    clientId?: string | null
    clientSecret?: string | null
    issuerUrl?: string | null
    metadataUrl?: string | null
    redirectUri?: string | null
    scopes?: NullableJsonNullValueInput | InputJsonValue
    attributeMap?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SsoConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    ssoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    issuerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    redirectUri?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: NullableJsonNullValueInput | InputJsonValue
    attributeMap?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SsoConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    ssoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    certificate?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    issuerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    redirectUri?: NullableStringFieldUpdateOperationsInput | string | null
    scopes?: NullableJsonNullValueInput | InputJsonValue
    attributeMap?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionGroupCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: CustomRoleCreateNestedManyWithoutPermissionGroupInput
  }

  export type PermissionGroupUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: CustomRoleUncheckedCreateNestedManyWithoutPermissionGroupInput
  }

  export type PermissionGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: CustomRoleUpdateManyWithoutPermissionGroupNestedInput
  }

  export type PermissionGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: CustomRoleUncheckedUpdateManyWithoutPermissionGroupNestedInput
  }

  export type PermissionGroupCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomRoleCreateInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parentRole?: CustomRoleCreateNestedOneWithoutChildRolesInput
    childRoles?: CustomRoleCreateNestedManyWithoutParentRoleInput
    permissionGroup?: PermissionGroupCreateNestedOneWithoutRolesInput
  }

  export type CustomRoleUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    parentRoleId?: string | null
    permissionGroupId?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childRoles?: CustomRoleUncheckedCreateNestedManyWithoutParentRoleInput
  }

  export type CustomRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentRole?: CustomRoleUpdateOneWithoutChildRolesNestedInput
    childRoles?: CustomRoleUpdateManyWithoutParentRoleNestedInput
    permissionGroup?: PermissionGroupUpdateOneWithoutRolesNestedInput
  }

  export type CustomRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    permissionGroupId?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childRoles?: CustomRoleUncheckedUpdateManyWithoutParentRoleNestedInput
  }

  export type CustomRoleCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    parentRoleId?: string | null
    permissionGroupId?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    permissionGroupId?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    tenantId: string
    actorId?: string | null
    actorEmail?: string | null
    action: string
    resource: string
    resourceId?: string | null
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    actorId?: string | null
    actorEmail?: string | null
    action: string
    resource: string
    resourceId?: string | null
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    tenantId: string
    actorId?: string | null
    actorEmail?: string | null
    action: string
    resource: string
    resourceId?: string | null
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: NullableStringFieldUpdateOperationsInput | string | null
    actorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    eventType: string
    source: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    userId?: string | null
    eventType: string
    source: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    tenantId: string
    userId?: string | null
    eventType: string
    source: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateInput = {
    id?: string
    tenantId: string
    name: string
    keyPrefix: string
    keyHash: string
    scopes: JsonNullValueInput | InputJsonValue
    createdById?: string | null
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usageLogs?: ApiKeyUsageLogCreateNestedManyWithoutApiKeyInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    keyPrefix: string
    keyHash: string
    scopes: JsonNullValueInput | InputJsonValue
    createdById?: string | null
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usageLogs?: ApiKeyUsageLogUncheckedCreateNestedManyWithoutApiKeyInput
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLogs?: ApiKeyUsageLogUpdateManyWithoutApiKeyNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLogs?: ApiKeyUsageLogUncheckedUpdateManyWithoutApiKeyNestedInput
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    keyPrefix: string
    keyHash: string
    scopes: JsonNullValueInput | InputJsonValue
    createdById?: string | null
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUsageLogCreateInput = {
    id?: string
    tenantId: string
    endpoint: string
    method: string
    status: string
    createdAt?: Date | string
    apiKey: ApiKeyCreateNestedOneWithoutUsageLogsInput
  }

  export type ApiKeyUsageLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    apiKeyId: string
    endpoint: string
    method: string
    status: string
    createdAt?: Date | string
  }

  export type ApiKeyUsageLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKey?: ApiKeyUpdateOneRequiredWithoutUsageLogsNestedInput
  }

  export type ApiKeyUsageLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    apiKeyId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUsageLogCreateManyInput = {
    id?: string
    tenantId: string
    apiKeyId: string
    endpoint: string
    method: string
    status: string
    createdAt?: Date | string
  }

  export type ApiKeyUsageLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUsageLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    apiKeyId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookConfigCreateInput = {
    id?: string
    tenantId: string
    name: string
    url: string
    secret: string
    eventTypes: JsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    maxRetries?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: WebhookDeliveryCreateNestedManyWithoutWebhookInput
  }

  export type WebhookConfigUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    url: string
    secret: string
    eventTypes: JsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    maxRetries?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: WebhookDeliveryUncheckedCreateNestedManyWithoutWebhookInput
  }

  export type WebhookConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    eventTypes?: JsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: WebhookDeliveryUpdateManyWithoutWebhookNestedInput
  }

  export type WebhookConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    eventTypes?: JsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: WebhookDeliveryUncheckedUpdateManyWithoutWebhookNestedInput
  }

  export type WebhookConfigCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    url: string
    secret: string
    eventTypes: JsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    maxRetries?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    eventTypes?: JsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    eventTypes?: JsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookDeliveryCreateInput = {
    id?: string
    tenantId: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastResponse?: string | null
    signature?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
    webhook: WebhookConfigCreateNestedOneWithoutDeliveriesInput
  }

  export type WebhookDeliveryUncheckedCreateInput = {
    id?: string
    tenantId: string
    webhookId: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastResponse?: string | null
    signature?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type WebhookDeliveryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastResponse?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    webhook?: WebhookConfigUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type WebhookDeliveryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastResponse?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookDeliveryCreateManyInput = {
    id?: string
    tenantId: string
    webhookId: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastResponse?: string | null
    signature?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type WebhookDeliveryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastResponse?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookDeliveryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    webhookId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastResponse?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type SsoConfigTenantIdProviderCompoundUniqueInput = {
    tenantId: string
    provider: string
  }

  export type SsoConfigCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    isEnabled?: SortOrder
    entityId?: SortOrder
    ssoUrl?: SortOrder
    certificate?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    issuerUrl?: SortOrder
    metadataUrl?: SortOrder
    redirectUri?: SortOrder
    scopes?: SortOrder
    attributeMap?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SsoConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    isEnabled?: SortOrder
    entityId?: SortOrder
    ssoUrl?: SortOrder
    certificate?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    issuerUrl?: SortOrder
    metadataUrl?: SortOrder
    redirectUri?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SsoConfigMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    isEnabled?: SortOrder
    entityId?: SortOrder
    ssoUrl?: SortOrder
    certificate?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    issuerUrl?: SortOrder
    metadataUrl?: SortOrder
    redirectUri?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type CustomRoleListRelationFilter = {
    every?: CustomRoleWhereInput
    some?: CustomRoleWhereInput
    none?: CustomRoleWhereInput
  }

  export type CustomRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PermissionGroupTenantIdNameCompoundUniqueInput = {
    tenantId: string
    name: string
  }

  export type PermissionGroupCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionGroupMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    description?: SortOrder
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

  export type CustomRoleNullableScalarRelationFilter = {
    is?: CustomRoleWhereInput | null
    isNot?: CustomRoleWhereInput | null
  }

  export type PermissionGroupNullableScalarRelationFilter = {
    is?: PermissionGroupWhereInput | null
    isNot?: PermissionGroupWhereInput | null
  }

  export type CustomRoleTenantIdSlugCompoundUniqueInput = {
    tenantId: string
    slug: string
  }

  export type CustomRoleCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parentRoleId?: SortOrder
    permissionGroupId?: SortOrder
    permissions?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parentRoleId?: SortOrder
    permissionGroupId?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomRoleMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parentRoleId?: SortOrder
    permissionGroupId?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    actorId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    actorId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    actorId?: SortOrder
    actorEmail?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    source?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    source?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    source?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
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

  export type ApiKeyUsageLogListRelationFilter = {
    every?: ApiKeyUsageLogWhereInput
    some?: ApiKeyUsageLogWhereInput
    none?: ApiKeyUsageLogWhereInput
  }

  export type ApiKeyUsageLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyPrefix?: SortOrder
    keyHash?: SortOrder
    scopes?: SortOrder
    createdById?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyPrefix?: SortOrder
    keyHash?: SortOrder
    createdById?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    keyPrefix?: SortOrder
    keyHash?: SortOrder
    createdById?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type ApiKeyScalarRelationFilter = {
    is?: ApiKeyWhereInput
    isNot?: ApiKeyWhereInput
  }

  export type ApiKeyUsageLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    apiKeyId?: SortOrder
    endpoint?: SortOrder
    method?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiKeyUsageLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    apiKeyId?: SortOrder
    endpoint?: SortOrder
    method?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiKeyUsageLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    apiKeyId?: SortOrder
    endpoint?: SortOrder
    method?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
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

  export type WebhookDeliveryListRelationFilter = {
    every?: WebhookDeliveryWhereInput
    some?: WebhookDeliveryWhereInput
    none?: WebhookDeliveryWhereInput
  }

  export type WebhookDeliveryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebhookConfigCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    eventTypes?: SortOrder
    isEnabled?: SortOrder
    maxRetries?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookConfigAvgOrderByAggregateInput = {
    maxRetries?: SortOrder
  }

  export type WebhookConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    isEnabled?: SortOrder
    maxRetries?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookConfigMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    isEnabled?: SortOrder
    maxRetries?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookConfigSumOrderByAggregateInput = {
    maxRetries?: SortOrder
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

  export type WebhookConfigScalarRelationFilter = {
    is?: WebhookConfigWhereInput
    isNot?: WebhookConfigWhereInput
  }

  export type WebhookDeliveryCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    webhookId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrder
    lastResponse?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrder
  }

  export type WebhookDeliveryAvgOrderByAggregateInput = {
    attemptCount?: SortOrder
  }

  export type WebhookDeliveryMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    webhookId?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrder
    lastResponse?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrder
  }

  export type WebhookDeliveryMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    webhookId?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    attemptCount?: SortOrder
    nextRetryAt?: SortOrder
    lastResponse?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrder
  }

  export type WebhookDeliverySumOrderByAggregateInput = {
    attemptCount?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CustomRoleCreateNestedManyWithoutPermissionGroupInput = {
    create?: XOR<CustomRoleCreateWithoutPermissionGroupInput, CustomRoleUncheckedCreateWithoutPermissionGroupInput> | CustomRoleCreateWithoutPermissionGroupInput[] | CustomRoleUncheckedCreateWithoutPermissionGroupInput[]
    connectOrCreate?: CustomRoleCreateOrConnectWithoutPermissionGroupInput | CustomRoleCreateOrConnectWithoutPermissionGroupInput[]
    createMany?: CustomRoleCreateManyPermissionGroupInputEnvelope
    connect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
  }

  export type CustomRoleUncheckedCreateNestedManyWithoutPermissionGroupInput = {
    create?: XOR<CustomRoleCreateWithoutPermissionGroupInput, CustomRoleUncheckedCreateWithoutPermissionGroupInput> | CustomRoleCreateWithoutPermissionGroupInput[] | CustomRoleUncheckedCreateWithoutPermissionGroupInput[]
    connectOrCreate?: CustomRoleCreateOrConnectWithoutPermissionGroupInput | CustomRoleCreateOrConnectWithoutPermissionGroupInput[]
    createMany?: CustomRoleCreateManyPermissionGroupInputEnvelope
    connect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
  }

  export type CustomRoleUpdateManyWithoutPermissionGroupNestedInput = {
    create?: XOR<CustomRoleCreateWithoutPermissionGroupInput, CustomRoleUncheckedCreateWithoutPermissionGroupInput> | CustomRoleCreateWithoutPermissionGroupInput[] | CustomRoleUncheckedCreateWithoutPermissionGroupInput[]
    connectOrCreate?: CustomRoleCreateOrConnectWithoutPermissionGroupInput | CustomRoleCreateOrConnectWithoutPermissionGroupInput[]
    upsert?: CustomRoleUpsertWithWhereUniqueWithoutPermissionGroupInput | CustomRoleUpsertWithWhereUniqueWithoutPermissionGroupInput[]
    createMany?: CustomRoleCreateManyPermissionGroupInputEnvelope
    set?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    disconnect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    delete?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    connect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    update?: CustomRoleUpdateWithWhereUniqueWithoutPermissionGroupInput | CustomRoleUpdateWithWhereUniqueWithoutPermissionGroupInput[]
    updateMany?: CustomRoleUpdateManyWithWhereWithoutPermissionGroupInput | CustomRoleUpdateManyWithWhereWithoutPermissionGroupInput[]
    deleteMany?: CustomRoleScalarWhereInput | CustomRoleScalarWhereInput[]
  }

  export type CustomRoleUncheckedUpdateManyWithoutPermissionGroupNestedInput = {
    create?: XOR<CustomRoleCreateWithoutPermissionGroupInput, CustomRoleUncheckedCreateWithoutPermissionGroupInput> | CustomRoleCreateWithoutPermissionGroupInput[] | CustomRoleUncheckedCreateWithoutPermissionGroupInput[]
    connectOrCreate?: CustomRoleCreateOrConnectWithoutPermissionGroupInput | CustomRoleCreateOrConnectWithoutPermissionGroupInput[]
    upsert?: CustomRoleUpsertWithWhereUniqueWithoutPermissionGroupInput | CustomRoleUpsertWithWhereUniqueWithoutPermissionGroupInput[]
    createMany?: CustomRoleCreateManyPermissionGroupInputEnvelope
    set?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    disconnect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    delete?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    connect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    update?: CustomRoleUpdateWithWhereUniqueWithoutPermissionGroupInput | CustomRoleUpdateWithWhereUniqueWithoutPermissionGroupInput[]
    updateMany?: CustomRoleUpdateManyWithWhereWithoutPermissionGroupInput | CustomRoleUpdateManyWithWhereWithoutPermissionGroupInput[]
    deleteMany?: CustomRoleScalarWhereInput | CustomRoleScalarWhereInput[]
  }

  export type CustomRoleCreateNestedOneWithoutChildRolesInput = {
    create?: XOR<CustomRoleCreateWithoutChildRolesInput, CustomRoleUncheckedCreateWithoutChildRolesInput>
    connectOrCreate?: CustomRoleCreateOrConnectWithoutChildRolesInput
    connect?: CustomRoleWhereUniqueInput
  }

  export type CustomRoleCreateNestedManyWithoutParentRoleInput = {
    create?: XOR<CustomRoleCreateWithoutParentRoleInput, CustomRoleUncheckedCreateWithoutParentRoleInput> | CustomRoleCreateWithoutParentRoleInput[] | CustomRoleUncheckedCreateWithoutParentRoleInput[]
    connectOrCreate?: CustomRoleCreateOrConnectWithoutParentRoleInput | CustomRoleCreateOrConnectWithoutParentRoleInput[]
    createMany?: CustomRoleCreateManyParentRoleInputEnvelope
    connect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
  }

  export type PermissionGroupCreateNestedOneWithoutRolesInput = {
    create?: XOR<PermissionGroupCreateWithoutRolesInput, PermissionGroupUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PermissionGroupCreateOrConnectWithoutRolesInput
    connect?: PermissionGroupWhereUniqueInput
  }

  export type CustomRoleUncheckedCreateNestedManyWithoutParentRoleInput = {
    create?: XOR<CustomRoleCreateWithoutParentRoleInput, CustomRoleUncheckedCreateWithoutParentRoleInput> | CustomRoleCreateWithoutParentRoleInput[] | CustomRoleUncheckedCreateWithoutParentRoleInput[]
    connectOrCreate?: CustomRoleCreateOrConnectWithoutParentRoleInput | CustomRoleCreateOrConnectWithoutParentRoleInput[]
    createMany?: CustomRoleCreateManyParentRoleInputEnvelope
    connect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
  }

  export type CustomRoleUpdateOneWithoutChildRolesNestedInput = {
    create?: XOR<CustomRoleCreateWithoutChildRolesInput, CustomRoleUncheckedCreateWithoutChildRolesInput>
    connectOrCreate?: CustomRoleCreateOrConnectWithoutChildRolesInput
    upsert?: CustomRoleUpsertWithoutChildRolesInput
    disconnect?: CustomRoleWhereInput | boolean
    delete?: CustomRoleWhereInput | boolean
    connect?: CustomRoleWhereUniqueInput
    update?: XOR<XOR<CustomRoleUpdateToOneWithWhereWithoutChildRolesInput, CustomRoleUpdateWithoutChildRolesInput>, CustomRoleUncheckedUpdateWithoutChildRolesInput>
  }

  export type CustomRoleUpdateManyWithoutParentRoleNestedInput = {
    create?: XOR<CustomRoleCreateWithoutParentRoleInput, CustomRoleUncheckedCreateWithoutParentRoleInput> | CustomRoleCreateWithoutParentRoleInput[] | CustomRoleUncheckedCreateWithoutParentRoleInput[]
    connectOrCreate?: CustomRoleCreateOrConnectWithoutParentRoleInput | CustomRoleCreateOrConnectWithoutParentRoleInput[]
    upsert?: CustomRoleUpsertWithWhereUniqueWithoutParentRoleInput | CustomRoleUpsertWithWhereUniqueWithoutParentRoleInput[]
    createMany?: CustomRoleCreateManyParentRoleInputEnvelope
    set?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    disconnect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    delete?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    connect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    update?: CustomRoleUpdateWithWhereUniqueWithoutParentRoleInput | CustomRoleUpdateWithWhereUniqueWithoutParentRoleInput[]
    updateMany?: CustomRoleUpdateManyWithWhereWithoutParentRoleInput | CustomRoleUpdateManyWithWhereWithoutParentRoleInput[]
    deleteMany?: CustomRoleScalarWhereInput | CustomRoleScalarWhereInput[]
  }

  export type PermissionGroupUpdateOneWithoutRolesNestedInput = {
    create?: XOR<PermissionGroupCreateWithoutRolesInput, PermissionGroupUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PermissionGroupCreateOrConnectWithoutRolesInput
    upsert?: PermissionGroupUpsertWithoutRolesInput
    disconnect?: PermissionGroupWhereInput | boolean
    delete?: PermissionGroupWhereInput | boolean
    connect?: PermissionGroupWhereUniqueInput
    update?: XOR<XOR<PermissionGroupUpdateToOneWithWhereWithoutRolesInput, PermissionGroupUpdateWithoutRolesInput>, PermissionGroupUncheckedUpdateWithoutRolesInput>
  }

  export type CustomRoleUncheckedUpdateManyWithoutParentRoleNestedInput = {
    create?: XOR<CustomRoleCreateWithoutParentRoleInput, CustomRoleUncheckedCreateWithoutParentRoleInput> | CustomRoleCreateWithoutParentRoleInput[] | CustomRoleUncheckedCreateWithoutParentRoleInput[]
    connectOrCreate?: CustomRoleCreateOrConnectWithoutParentRoleInput | CustomRoleCreateOrConnectWithoutParentRoleInput[]
    upsert?: CustomRoleUpsertWithWhereUniqueWithoutParentRoleInput | CustomRoleUpsertWithWhereUniqueWithoutParentRoleInput[]
    createMany?: CustomRoleCreateManyParentRoleInputEnvelope
    set?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    disconnect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    delete?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    connect?: CustomRoleWhereUniqueInput | CustomRoleWhereUniqueInput[]
    update?: CustomRoleUpdateWithWhereUniqueWithoutParentRoleInput | CustomRoleUpdateWithWhereUniqueWithoutParentRoleInput[]
    updateMany?: CustomRoleUpdateManyWithWhereWithoutParentRoleInput | CustomRoleUpdateManyWithWhereWithoutParentRoleInput[]
    deleteMany?: CustomRoleScalarWhereInput | CustomRoleScalarWhereInput[]
  }

  export type ApiKeyUsageLogCreateNestedManyWithoutApiKeyInput = {
    create?: XOR<ApiKeyUsageLogCreateWithoutApiKeyInput, ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput> | ApiKeyUsageLogCreateWithoutApiKeyInput[] | ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput[]
    connectOrCreate?: ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput | ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput[]
    createMany?: ApiKeyUsageLogCreateManyApiKeyInputEnvelope
    connect?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
  }

  export type ApiKeyUsageLogUncheckedCreateNestedManyWithoutApiKeyInput = {
    create?: XOR<ApiKeyUsageLogCreateWithoutApiKeyInput, ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput> | ApiKeyUsageLogCreateWithoutApiKeyInput[] | ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput[]
    connectOrCreate?: ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput | ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput[]
    createMany?: ApiKeyUsageLogCreateManyApiKeyInputEnvelope
    connect?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ApiKeyUsageLogUpdateManyWithoutApiKeyNestedInput = {
    create?: XOR<ApiKeyUsageLogCreateWithoutApiKeyInput, ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput> | ApiKeyUsageLogCreateWithoutApiKeyInput[] | ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput[]
    connectOrCreate?: ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput | ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput[]
    upsert?: ApiKeyUsageLogUpsertWithWhereUniqueWithoutApiKeyInput | ApiKeyUsageLogUpsertWithWhereUniqueWithoutApiKeyInput[]
    createMany?: ApiKeyUsageLogCreateManyApiKeyInputEnvelope
    set?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
    disconnect?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
    delete?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
    connect?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
    update?: ApiKeyUsageLogUpdateWithWhereUniqueWithoutApiKeyInput | ApiKeyUsageLogUpdateWithWhereUniqueWithoutApiKeyInput[]
    updateMany?: ApiKeyUsageLogUpdateManyWithWhereWithoutApiKeyInput | ApiKeyUsageLogUpdateManyWithWhereWithoutApiKeyInput[]
    deleteMany?: ApiKeyUsageLogScalarWhereInput | ApiKeyUsageLogScalarWhereInput[]
  }

  export type ApiKeyUsageLogUncheckedUpdateManyWithoutApiKeyNestedInput = {
    create?: XOR<ApiKeyUsageLogCreateWithoutApiKeyInput, ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput> | ApiKeyUsageLogCreateWithoutApiKeyInput[] | ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput[]
    connectOrCreate?: ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput | ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput[]
    upsert?: ApiKeyUsageLogUpsertWithWhereUniqueWithoutApiKeyInput | ApiKeyUsageLogUpsertWithWhereUniqueWithoutApiKeyInput[]
    createMany?: ApiKeyUsageLogCreateManyApiKeyInputEnvelope
    set?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
    disconnect?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
    delete?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
    connect?: ApiKeyUsageLogWhereUniqueInput | ApiKeyUsageLogWhereUniqueInput[]
    update?: ApiKeyUsageLogUpdateWithWhereUniqueWithoutApiKeyInput | ApiKeyUsageLogUpdateWithWhereUniqueWithoutApiKeyInput[]
    updateMany?: ApiKeyUsageLogUpdateManyWithWhereWithoutApiKeyInput | ApiKeyUsageLogUpdateManyWithWhereWithoutApiKeyInput[]
    deleteMany?: ApiKeyUsageLogScalarWhereInput | ApiKeyUsageLogScalarWhereInput[]
  }

  export type ApiKeyCreateNestedOneWithoutUsageLogsInput = {
    create?: XOR<ApiKeyCreateWithoutUsageLogsInput, ApiKeyUncheckedCreateWithoutUsageLogsInput>
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUsageLogsInput
    connect?: ApiKeyWhereUniqueInput
  }

  export type ApiKeyUpdateOneRequiredWithoutUsageLogsNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUsageLogsInput, ApiKeyUncheckedCreateWithoutUsageLogsInput>
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUsageLogsInput
    upsert?: ApiKeyUpsertWithoutUsageLogsInput
    connect?: ApiKeyWhereUniqueInput
    update?: XOR<XOR<ApiKeyUpdateToOneWithWhereWithoutUsageLogsInput, ApiKeyUpdateWithoutUsageLogsInput>, ApiKeyUncheckedUpdateWithoutUsageLogsInput>
  }

  export type WebhookDeliveryCreateNestedManyWithoutWebhookInput = {
    create?: XOR<WebhookDeliveryCreateWithoutWebhookInput, WebhookDeliveryUncheckedCreateWithoutWebhookInput> | WebhookDeliveryCreateWithoutWebhookInput[] | WebhookDeliveryUncheckedCreateWithoutWebhookInput[]
    connectOrCreate?: WebhookDeliveryCreateOrConnectWithoutWebhookInput | WebhookDeliveryCreateOrConnectWithoutWebhookInput[]
    createMany?: WebhookDeliveryCreateManyWebhookInputEnvelope
    connect?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
  }

  export type WebhookDeliveryUncheckedCreateNestedManyWithoutWebhookInput = {
    create?: XOR<WebhookDeliveryCreateWithoutWebhookInput, WebhookDeliveryUncheckedCreateWithoutWebhookInput> | WebhookDeliveryCreateWithoutWebhookInput[] | WebhookDeliveryUncheckedCreateWithoutWebhookInput[]
    connectOrCreate?: WebhookDeliveryCreateOrConnectWithoutWebhookInput | WebhookDeliveryCreateOrConnectWithoutWebhookInput[]
    createMany?: WebhookDeliveryCreateManyWebhookInputEnvelope
    connect?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WebhookDeliveryUpdateManyWithoutWebhookNestedInput = {
    create?: XOR<WebhookDeliveryCreateWithoutWebhookInput, WebhookDeliveryUncheckedCreateWithoutWebhookInput> | WebhookDeliveryCreateWithoutWebhookInput[] | WebhookDeliveryUncheckedCreateWithoutWebhookInput[]
    connectOrCreate?: WebhookDeliveryCreateOrConnectWithoutWebhookInput | WebhookDeliveryCreateOrConnectWithoutWebhookInput[]
    upsert?: WebhookDeliveryUpsertWithWhereUniqueWithoutWebhookInput | WebhookDeliveryUpsertWithWhereUniqueWithoutWebhookInput[]
    createMany?: WebhookDeliveryCreateManyWebhookInputEnvelope
    set?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
    disconnect?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
    delete?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
    connect?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
    update?: WebhookDeliveryUpdateWithWhereUniqueWithoutWebhookInput | WebhookDeliveryUpdateWithWhereUniqueWithoutWebhookInput[]
    updateMany?: WebhookDeliveryUpdateManyWithWhereWithoutWebhookInput | WebhookDeliveryUpdateManyWithWhereWithoutWebhookInput[]
    deleteMany?: WebhookDeliveryScalarWhereInput | WebhookDeliveryScalarWhereInput[]
  }

  export type WebhookDeliveryUncheckedUpdateManyWithoutWebhookNestedInput = {
    create?: XOR<WebhookDeliveryCreateWithoutWebhookInput, WebhookDeliveryUncheckedCreateWithoutWebhookInput> | WebhookDeliveryCreateWithoutWebhookInput[] | WebhookDeliveryUncheckedCreateWithoutWebhookInput[]
    connectOrCreate?: WebhookDeliveryCreateOrConnectWithoutWebhookInput | WebhookDeliveryCreateOrConnectWithoutWebhookInput[]
    upsert?: WebhookDeliveryUpsertWithWhereUniqueWithoutWebhookInput | WebhookDeliveryUpsertWithWhereUniqueWithoutWebhookInput[]
    createMany?: WebhookDeliveryCreateManyWebhookInputEnvelope
    set?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
    disconnect?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
    delete?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
    connect?: WebhookDeliveryWhereUniqueInput | WebhookDeliveryWhereUniqueInput[]
    update?: WebhookDeliveryUpdateWithWhereUniqueWithoutWebhookInput | WebhookDeliveryUpdateWithWhereUniqueWithoutWebhookInput[]
    updateMany?: WebhookDeliveryUpdateManyWithWhereWithoutWebhookInput | WebhookDeliveryUpdateManyWithWhereWithoutWebhookInput[]
    deleteMany?: WebhookDeliveryScalarWhereInput | WebhookDeliveryScalarWhereInput[]
  }

  export type WebhookConfigCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<WebhookConfigCreateWithoutDeliveriesInput, WebhookConfigUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: WebhookConfigCreateOrConnectWithoutDeliveriesInput
    connect?: WebhookConfigWhereUniqueInput
  }

  export type WebhookConfigUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<WebhookConfigCreateWithoutDeliveriesInput, WebhookConfigUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: WebhookConfigCreateOrConnectWithoutDeliveriesInput
    upsert?: WebhookConfigUpsertWithoutDeliveriesInput
    connect?: WebhookConfigWhereUniqueInput
    update?: XOR<XOR<WebhookConfigUpdateToOneWithWhereWithoutDeliveriesInput, WebhookConfigUpdateWithoutDeliveriesInput>, WebhookConfigUncheckedUpdateWithoutDeliveriesInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type CustomRoleCreateWithoutPermissionGroupInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parentRole?: CustomRoleCreateNestedOneWithoutChildRolesInput
    childRoles?: CustomRoleCreateNestedManyWithoutParentRoleInput
  }

  export type CustomRoleUncheckedCreateWithoutPermissionGroupInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    parentRoleId?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childRoles?: CustomRoleUncheckedCreateNestedManyWithoutParentRoleInput
  }

  export type CustomRoleCreateOrConnectWithoutPermissionGroupInput = {
    where: CustomRoleWhereUniqueInput
    create: XOR<CustomRoleCreateWithoutPermissionGroupInput, CustomRoleUncheckedCreateWithoutPermissionGroupInput>
  }

  export type CustomRoleCreateManyPermissionGroupInputEnvelope = {
    data: CustomRoleCreateManyPermissionGroupInput | CustomRoleCreateManyPermissionGroupInput[]
    skipDuplicates?: boolean
  }

  export type CustomRoleUpsertWithWhereUniqueWithoutPermissionGroupInput = {
    where: CustomRoleWhereUniqueInput
    update: XOR<CustomRoleUpdateWithoutPermissionGroupInput, CustomRoleUncheckedUpdateWithoutPermissionGroupInput>
    create: XOR<CustomRoleCreateWithoutPermissionGroupInput, CustomRoleUncheckedCreateWithoutPermissionGroupInput>
  }

  export type CustomRoleUpdateWithWhereUniqueWithoutPermissionGroupInput = {
    where: CustomRoleWhereUniqueInput
    data: XOR<CustomRoleUpdateWithoutPermissionGroupInput, CustomRoleUncheckedUpdateWithoutPermissionGroupInput>
  }

  export type CustomRoleUpdateManyWithWhereWithoutPermissionGroupInput = {
    where: CustomRoleScalarWhereInput
    data: XOR<CustomRoleUpdateManyMutationInput, CustomRoleUncheckedUpdateManyWithoutPermissionGroupInput>
  }

  export type CustomRoleScalarWhereInput = {
    AND?: CustomRoleScalarWhereInput | CustomRoleScalarWhereInput[]
    OR?: CustomRoleScalarWhereInput[]
    NOT?: CustomRoleScalarWhereInput | CustomRoleScalarWhereInput[]
    id?: StringFilter<"CustomRole"> | string
    tenantId?: StringFilter<"CustomRole"> | string
    name?: StringFilter<"CustomRole"> | string
    slug?: StringFilter<"CustomRole"> | string
    description?: StringNullableFilter<"CustomRole"> | string | null
    parentRoleId?: StringNullableFilter<"CustomRole"> | string | null
    permissionGroupId?: StringNullableFilter<"CustomRole"> | string | null
    permissions?: JsonFilter<"CustomRole">
    isSystem?: BoolFilter<"CustomRole"> | boolean
    createdAt?: DateTimeFilter<"CustomRole"> | Date | string
    updatedAt?: DateTimeFilter<"CustomRole"> | Date | string
  }

  export type CustomRoleCreateWithoutChildRolesInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parentRole?: CustomRoleCreateNestedOneWithoutChildRolesInput
    permissionGroup?: PermissionGroupCreateNestedOneWithoutRolesInput
  }

  export type CustomRoleUncheckedCreateWithoutChildRolesInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    parentRoleId?: string | null
    permissionGroupId?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomRoleCreateOrConnectWithoutChildRolesInput = {
    where: CustomRoleWhereUniqueInput
    create: XOR<CustomRoleCreateWithoutChildRolesInput, CustomRoleUncheckedCreateWithoutChildRolesInput>
  }

  export type CustomRoleCreateWithoutParentRoleInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childRoles?: CustomRoleCreateNestedManyWithoutParentRoleInput
    permissionGroup?: PermissionGroupCreateNestedOneWithoutRolesInput
  }

  export type CustomRoleUncheckedCreateWithoutParentRoleInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    permissionGroupId?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    childRoles?: CustomRoleUncheckedCreateNestedManyWithoutParentRoleInput
  }

  export type CustomRoleCreateOrConnectWithoutParentRoleInput = {
    where: CustomRoleWhereUniqueInput
    create: XOR<CustomRoleCreateWithoutParentRoleInput, CustomRoleUncheckedCreateWithoutParentRoleInput>
  }

  export type CustomRoleCreateManyParentRoleInputEnvelope = {
    data: CustomRoleCreateManyParentRoleInput | CustomRoleCreateManyParentRoleInput[]
    skipDuplicates?: boolean
  }

  export type PermissionGroupCreateWithoutRolesInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionGroupUncheckedCreateWithoutRolesInput = {
    id?: string
    tenantId: string
    name: string
    description?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionGroupCreateOrConnectWithoutRolesInput = {
    where: PermissionGroupWhereUniqueInput
    create: XOR<PermissionGroupCreateWithoutRolesInput, PermissionGroupUncheckedCreateWithoutRolesInput>
  }

  export type CustomRoleUpsertWithoutChildRolesInput = {
    update: XOR<CustomRoleUpdateWithoutChildRolesInput, CustomRoleUncheckedUpdateWithoutChildRolesInput>
    create: XOR<CustomRoleCreateWithoutChildRolesInput, CustomRoleUncheckedCreateWithoutChildRolesInput>
    where?: CustomRoleWhereInput
  }

  export type CustomRoleUpdateToOneWithWhereWithoutChildRolesInput = {
    where?: CustomRoleWhereInput
    data: XOR<CustomRoleUpdateWithoutChildRolesInput, CustomRoleUncheckedUpdateWithoutChildRolesInput>
  }

  export type CustomRoleUpdateWithoutChildRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentRole?: CustomRoleUpdateOneWithoutChildRolesNestedInput
    permissionGroup?: PermissionGroupUpdateOneWithoutRolesNestedInput
  }

  export type CustomRoleUncheckedUpdateWithoutChildRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    permissionGroupId?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomRoleUpsertWithWhereUniqueWithoutParentRoleInput = {
    where: CustomRoleWhereUniqueInput
    update: XOR<CustomRoleUpdateWithoutParentRoleInput, CustomRoleUncheckedUpdateWithoutParentRoleInput>
    create: XOR<CustomRoleCreateWithoutParentRoleInput, CustomRoleUncheckedCreateWithoutParentRoleInput>
  }

  export type CustomRoleUpdateWithWhereUniqueWithoutParentRoleInput = {
    where: CustomRoleWhereUniqueInput
    data: XOR<CustomRoleUpdateWithoutParentRoleInput, CustomRoleUncheckedUpdateWithoutParentRoleInput>
  }

  export type CustomRoleUpdateManyWithWhereWithoutParentRoleInput = {
    where: CustomRoleScalarWhereInput
    data: XOR<CustomRoleUpdateManyMutationInput, CustomRoleUncheckedUpdateManyWithoutParentRoleInput>
  }

  export type PermissionGroupUpsertWithoutRolesInput = {
    update: XOR<PermissionGroupUpdateWithoutRolesInput, PermissionGroupUncheckedUpdateWithoutRolesInput>
    create: XOR<PermissionGroupCreateWithoutRolesInput, PermissionGroupUncheckedCreateWithoutRolesInput>
    where?: PermissionGroupWhereInput
  }

  export type PermissionGroupUpdateToOneWithWhereWithoutRolesInput = {
    where?: PermissionGroupWhereInput
    data: XOR<PermissionGroupUpdateWithoutRolesInput, PermissionGroupUncheckedUpdateWithoutRolesInput>
  }

  export type PermissionGroupUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionGroupUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUsageLogCreateWithoutApiKeyInput = {
    id?: string
    tenantId: string
    endpoint: string
    method: string
    status: string
    createdAt?: Date | string
  }

  export type ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput = {
    id?: string
    tenantId: string
    endpoint: string
    method: string
    status: string
    createdAt?: Date | string
  }

  export type ApiKeyUsageLogCreateOrConnectWithoutApiKeyInput = {
    where: ApiKeyUsageLogWhereUniqueInput
    create: XOR<ApiKeyUsageLogCreateWithoutApiKeyInput, ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput>
  }

  export type ApiKeyUsageLogCreateManyApiKeyInputEnvelope = {
    data: ApiKeyUsageLogCreateManyApiKeyInput | ApiKeyUsageLogCreateManyApiKeyInput[]
    skipDuplicates?: boolean
  }

  export type ApiKeyUsageLogUpsertWithWhereUniqueWithoutApiKeyInput = {
    where: ApiKeyUsageLogWhereUniqueInput
    update: XOR<ApiKeyUsageLogUpdateWithoutApiKeyInput, ApiKeyUsageLogUncheckedUpdateWithoutApiKeyInput>
    create: XOR<ApiKeyUsageLogCreateWithoutApiKeyInput, ApiKeyUsageLogUncheckedCreateWithoutApiKeyInput>
  }

  export type ApiKeyUsageLogUpdateWithWhereUniqueWithoutApiKeyInput = {
    where: ApiKeyUsageLogWhereUniqueInput
    data: XOR<ApiKeyUsageLogUpdateWithoutApiKeyInput, ApiKeyUsageLogUncheckedUpdateWithoutApiKeyInput>
  }

  export type ApiKeyUsageLogUpdateManyWithWhereWithoutApiKeyInput = {
    where: ApiKeyUsageLogScalarWhereInput
    data: XOR<ApiKeyUsageLogUpdateManyMutationInput, ApiKeyUsageLogUncheckedUpdateManyWithoutApiKeyInput>
  }

  export type ApiKeyUsageLogScalarWhereInput = {
    AND?: ApiKeyUsageLogScalarWhereInput | ApiKeyUsageLogScalarWhereInput[]
    OR?: ApiKeyUsageLogScalarWhereInput[]
    NOT?: ApiKeyUsageLogScalarWhereInput | ApiKeyUsageLogScalarWhereInput[]
    id?: StringFilter<"ApiKeyUsageLog"> | string
    tenantId?: StringFilter<"ApiKeyUsageLog"> | string
    apiKeyId?: StringFilter<"ApiKeyUsageLog"> | string
    endpoint?: StringFilter<"ApiKeyUsageLog"> | string
    method?: StringFilter<"ApiKeyUsageLog"> | string
    status?: StringFilter<"ApiKeyUsageLog"> | string
    createdAt?: DateTimeFilter<"ApiKeyUsageLog"> | Date | string
  }

  export type ApiKeyCreateWithoutUsageLogsInput = {
    id?: string
    tenantId: string
    name: string
    keyPrefix: string
    keyHash: string
    scopes: JsonNullValueInput | InputJsonValue
    createdById?: string | null
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUncheckedCreateWithoutUsageLogsInput = {
    id?: string
    tenantId: string
    name: string
    keyPrefix: string
    keyHash: string
    scopes: JsonNullValueInput | InputJsonValue
    createdById?: string | null
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutUsageLogsInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutUsageLogsInput, ApiKeyUncheckedCreateWithoutUsageLogsInput>
  }

  export type ApiKeyUpsertWithoutUsageLogsInput = {
    update: XOR<ApiKeyUpdateWithoutUsageLogsInput, ApiKeyUncheckedUpdateWithoutUsageLogsInput>
    create: XOR<ApiKeyCreateWithoutUsageLogsInput, ApiKeyUncheckedCreateWithoutUsageLogsInput>
    where?: ApiKeyWhereInput
  }

  export type ApiKeyUpdateToOneWithWhereWithoutUsageLogsInput = {
    where?: ApiKeyWhereInput
    data: XOR<ApiKeyUpdateWithoutUsageLogsInput, ApiKeyUncheckedUpdateWithoutUsageLogsInput>
  }

  export type ApiKeyUpdateWithoutUsageLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateWithoutUsageLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    scopes?: JsonNullValueInput | InputJsonValue
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookDeliveryCreateWithoutWebhookInput = {
    id?: string
    tenantId: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastResponse?: string | null
    signature?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type WebhookDeliveryUncheckedCreateWithoutWebhookInput = {
    id?: string
    tenantId: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastResponse?: string | null
    signature?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type WebhookDeliveryCreateOrConnectWithoutWebhookInput = {
    where: WebhookDeliveryWhereUniqueInput
    create: XOR<WebhookDeliveryCreateWithoutWebhookInput, WebhookDeliveryUncheckedCreateWithoutWebhookInput>
  }

  export type WebhookDeliveryCreateManyWebhookInputEnvelope = {
    data: WebhookDeliveryCreateManyWebhookInput | WebhookDeliveryCreateManyWebhookInput[]
    skipDuplicates?: boolean
  }

  export type WebhookDeliveryUpsertWithWhereUniqueWithoutWebhookInput = {
    where: WebhookDeliveryWhereUniqueInput
    update: XOR<WebhookDeliveryUpdateWithoutWebhookInput, WebhookDeliveryUncheckedUpdateWithoutWebhookInput>
    create: XOR<WebhookDeliveryCreateWithoutWebhookInput, WebhookDeliveryUncheckedCreateWithoutWebhookInput>
  }

  export type WebhookDeliveryUpdateWithWhereUniqueWithoutWebhookInput = {
    where: WebhookDeliveryWhereUniqueInput
    data: XOR<WebhookDeliveryUpdateWithoutWebhookInput, WebhookDeliveryUncheckedUpdateWithoutWebhookInput>
  }

  export type WebhookDeliveryUpdateManyWithWhereWithoutWebhookInput = {
    where: WebhookDeliveryScalarWhereInput
    data: XOR<WebhookDeliveryUpdateManyMutationInput, WebhookDeliveryUncheckedUpdateManyWithoutWebhookInput>
  }

  export type WebhookDeliveryScalarWhereInput = {
    AND?: WebhookDeliveryScalarWhereInput | WebhookDeliveryScalarWhereInput[]
    OR?: WebhookDeliveryScalarWhereInput[]
    NOT?: WebhookDeliveryScalarWhereInput | WebhookDeliveryScalarWhereInput[]
    id?: StringFilter<"WebhookDelivery"> | string
    tenantId?: StringFilter<"WebhookDelivery"> | string
    webhookId?: StringFilter<"WebhookDelivery"> | string
    eventType?: StringFilter<"WebhookDelivery"> | string
    payload?: JsonFilter<"WebhookDelivery">
    status?: StringFilter<"WebhookDelivery"> | string
    attemptCount?: IntFilter<"WebhookDelivery"> | number
    nextRetryAt?: DateTimeNullableFilter<"WebhookDelivery"> | Date | string | null
    lastResponse?: StringNullableFilter<"WebhookDelivery"> | string | null
    signature?: StringNullableFilter<"WebhookDelivery"> | string | null
    createdAt?: DateTimeFilter<"WebhookDelivery"> | Date | string
    deliveredAt?: DateTimeNullableFilter<"WebhookDelivery"> | Date | string | null
  }

  export type WebhookConfigCreateWithoutDeliveriesInput = {
    id?: string
    tenantId: string
    name: string
    url: string
    secret: string
    eventTypes: JsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    maxRetries?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookConfigUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    tenantId: string
    name: string
    url: string
    secret: string
    eventTypes: JsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    maxRetries?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookConfigCreateOrConnectWithoutDeliveriesInput = {
    where: WebhookConfigWhereUniqueInput
    create: XOR<WebhookConfigCreateWithoutDeliveriesInput, WebhookConfigUncheckedCreateWithoutDeliveriesInput>
  }

  export type WebhookConfigUpsertWithoutDeliveriesInput = {
    update: XOR<WebhookConfigUpdateWithoutDeliveriesInput, WebhookConfigUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<WebhookConfigCreateWithoutDeliveriesInput, WebhookConfigUncheckedCreateWithoutDeliveriesInput>
    where?: WebhookConfigWhereInput
  }

  export type WebhookConfigUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: WebhookConfigWhereInput
    data: XOR<WebhookConfigUpdateWithoutDeliveriesInput, WebhookConfigUncheckedUpdateWithoutDeliveriesInput>
  }

  export type WebhookConfigUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    eventTypes?: JsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookConfigUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    eventTypes?: JsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomRoleCreateManyPermissionGroupInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    parentRoleId?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomRoleUpdateWithoutPermissionGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentRole?: CustomRoleUpdateOneWithoutChildRolesNestedInput
    childRoles?: CustomRoleUpdateManyWithoutParentRoleNestedInput
  }

  export type CustomRoleUncheckedUpdateWithoutPermissionGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childRoles?: CustomRoleUncheckedUpdateManyWithoutParentRoleNestedInput
  }

  export type CustomRoleUncheckedUpdateManyWithoutPermissionGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentRoleId?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomRoleCreateManyParentRoleInput = {
    id?: string
    tenantId: string
    name: string
    slug: string
    description?: string | null
    permissionGroupId?: string | null
    permissions: JsonNullValueInput | InputJsonValue
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomRoleUpdateWithoutParentRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childRoles?: CustomRoleUpdateManyWithoutParentRoleNestedInput
    permissionGroup?: PermissionGroupUpdateOneWithoutRolesNestedInput
  }

  export type CustomRoleUncheckedUpdateWithoutParentRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissionGroupId?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childRoles?: CustomRoleUncheckedUpdateManyWithoutParentRoleNestedInput
  }

  export type CustomRoleUncheckedUpdateManyWithoutParentRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    permissionGroupId?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: JsonNullValueInput | InputJsonValue
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUsageLogCreateManyApiKeyInput = {
    id?: string
    tenantId: string
    endpoint: string
    method: string
    status: string
    createdAt?: Date | string
  }

  export type ApiKeyUsageLogUpdateWithoutApiKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUsageLogUncheckedUpdateWithoutApiKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUsageLogUncheckedUpdateManyWithoutApiKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    endpoint?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookDeliveryCreateManyWebhookInput = {
    id?: string
    tenantId: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    status?: string
    attemptCount?: number
    nextRetryAt?: Date | string | null
    lastResponse?: string | null
    signature?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type WebhookDeliveryUpdateWithoutWebhookInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastResponse?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookDeliveryUncheckedUpdateWithoutWebhookInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastResponse?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookDeliveryUncheckedUpdateManyWithoutWebhookInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    nextRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastResponse?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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