
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
 * Model ProviderConfig
 * 
 */
export type ProviderConfig = $Result.DefaultSelection<Prisma.$ProviderConfigPayload>
/**
 * Model DeliveryLog
 * 
 */
export type DeliveryLog = $Result.DefaultSelection<Prisma.$DeliveryLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const NotificationChannel: {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  PUSH: 'PUSH',
  WHATSAPP: 'WHATSAPP',
  VIBER: 'VIBER'
};

export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel]


export const NotificationProviderName: {
  SENDGRID: 'SENDGRID',
  TWILIO: 'TWILIO',
  FIREBASE: 'FIREBASE',
  VIBER: 'VIBER',
  NONE: 'NONE'
};

export type NotificationProviderName = (typeof NotificationProviderName)[keyof typeof NotificationProviderName]


export const DeliveryStatus: {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export type DeliveryStatus = (typeof DeliveryStatus)[keyof typeof DeliveryStatus]

}

export type NotificationChannel = $Enums.NotificationChannel

export const NotificationChannel: typeof $Enums.NotificationChannel

export type NotificationProviderName = $Enums.NotificationProviderName

export const NotificationProviderName: typeof $Enums.NotificationProviderName

export type DeliveryStatus = $Enums.DeliveryStatus

export const DeliveryStatus: typeof $Enums.DeliveryStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ProviderConfigs
 * const providerConfigs = await prisma.providerConfig.findMany()
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
   * // Fetch zero or more ProviderConfigs
   * const providerConfigs = await prisma.providerConfig.findMany()
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
   * `prisma.providerConfig`: Exposes CRUD operations for the **ProviderConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProviderConfigs
    * const providerConfigs = await prisma.providerConfig.findMany()
    * ```
    */
  get providerConfig(): Prisma.ProviderConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deliveryLog`: Exposes CRUD operations for the **DeliveryLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeliveryLogs
    * const deliveryLogs = await prisma.deliveryLog.findMany()
    * ```
    */
  get deliveryLog(): Prisma.DeliveryLogDelegate<ExtArgs, ClientOptions>;
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
    ProviderConfig: 'ProviderConfig',
    DeliveryLog: 'DeliveryLog'
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
      modelProps: "providerConfig" | "deliveryLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ProviderConfig: {
        payload: Prisma.$ProviderConfigPayload<ExtArgs>
        fields: Prisma.ProviderConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProviderConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProviderConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>
          }
          findFirst: {
            args: Prisma.ProviderConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProviderConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>
          }
          findMany: {
            args: Prisma.ProviderConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>[]
          }
          create: {
            args: Prisma.ProviderConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>
          }
          createMany: {
            args: Prisma.ProviderConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProviderConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>[]
          }
          delete: {
            args: Prisma.ProviderConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>
          }
          update: {
            args: Prisma.ProviderConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>
          }
          deleteMany: {
            args: Prisma.ProviderConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProviderConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProviderConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>[]
          }
          upsert: {
            args: Prisma.ProviderConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderConfigPayload>
          }
          aggregate: {
            args: Prisma.ProviderConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProviderConfig>
          }
          groupBy: {
            args: Prisma.ProviderConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProviderConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProviderConfigCountArgs<ExtArgs>
            result: $Utils.Optional<ProviderConfigCountAggregateOutputType> | number
          }
        }
      }
      DeliveryLog: {
        payload: Prisma.$DeliveryLogPayload<ExtArgs>
        fields: Prisma.DeliveryLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>
          }
          findFirst: {
            args: Prisma.DeliveryLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>
          }
          findMany: {
            args: Prisma.DeliveryLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>[]
          }
          create: {
            args: Prisma.DeliveryLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>
          }
          createMany: {
            args: Prisma.DeliveryLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>[]
          }
          delete: {
            args: Prisma.DeliveryLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>
          }
          update: {
            args: Prisma.DeliveryLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>[]
          }
          upsert: {
            args: Prisma.DeliveryLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryLogPayload>
          }
          aggregate: {
            args: Prisma.DeliveryLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeliveryLog>
          }
          groupBy: {
            args: Prisma.DeliveryLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryLogCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryLogCountAggregateOutputType> | number
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
    providerConfig?: ProviderConfigOmit
    deliveryLog?: DeliveryLogOmit
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
   * Model ProviderConfig
   */

  export type AggregateProviderConfig = {
    _count: ProviderConfigCountAggregateOutputType | null
    _avg: ProviderConfigAvgAggregateOutputType | null
    _sum: ProviderConfigSumAggregateOutputType | null
    _min: ProviderConfigMinAggregateOutputType | null
    _max: ProviderConfigMaxAggregateOutputType | null
  }

  export type ProviderConfigAvgAggregateOutputType = {
    priority: number | null
  }

  export type ProviderConfigSumAggregateOutputType = {
    priority: number | null
  }

  export type ProviderConfigMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    channel: $Enums.NotificationChannel | null
    provider: $Enums.NotificationProviderName | null
    isActive: boolean | null
    priority: number | null
    isHealthy: boolean | null
    lastHealthCheckAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProviderConfigMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    channel: $Enums.NotificationChannel | null
    provider: $Enums.NotificationProviderName | null
    isActive: boolean | null
    priority: number | null
    isHealthy: boolean | null
    lastHealthCheckAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProviderConfigCountAggregateOutputType = {
    id: number
    tenantId: number
    channel: number
    provider: number
    credentials: number
    isActive: number
    priority: number
    isHealthy: number
    lastHealthCheckAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProviderConfigAvgAggregateInputType = {
    priority?: true
  }

  export type ProviderConfigSumAggregateInputType = {
    priority?: true
  }

  export type ProviderConfigMinAggregateInputType = {
    id?: true
    tenantId?: true
    channel?: true
    provider?: true
    isActive?: true
    priority?: true
    isHealthy?: true
    lastHealthCheckAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProviderConfigMaxAggregateInputType = {
    id?: true
    tenantId?: true
    channel?: true
    provider?: true
    isActive?: true
    priority?: true
    isHealthy?: true
    lastHealthCheckAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProviderConfigCountAggregateInputType = {
    id?: true
    tenantId?: true
    channel?: true
    provider?: true
    credentials?: true
    isActive?: true
    priority?: true
    isHealthy?: true
    lastHealthCheckAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProviderConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProviderConfig to aggregate.
     */
    where?: ProviderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderConfigs to fetch.
     */
    orderBy?: ProviderConfigOrderByWithRelationInput | ProviderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProviderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProviderConfigs
    **/
    _count?: true | ProviderConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProviderConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProviderConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProviderConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProviderConfigMaxAggregateInputType
  }

  export type GetProviderConfigAggregateType<T extends ProviderConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateProviderConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProviderConfig[P]>
      : GetScalarType<T[P], AggregateProviderConfig[P]>
  }




  export type ProviderConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProviderConfigWhereInput
    orderBy?: ProviderConfigOrderByWithAggregationInput | ProviderConfigOrderByWithAggregationInput[]
    by: ProviderConfigScalarFieldEnum[] | ProviderConfigScalarFieldEnum
    having?: ProviderConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProviderConfigCountAggregateInputType | true
    _avg?: ProviderConfigAvgAggregateInputType
    _sum?: ProviderConfigSumAggregateInputType
    _min?: ProviderConfigMinAggregateInputType
    _max?: ProviderConfigMaxAggregateInputType
  }

  export type ProviderConfigGroupByOutputType = {
    id: string
    tenantId: string
    channel: $Enums.NotificationChannel
    provider: $Enums.NotificationProviderName
    credentials: JsonValue
    isActive: boolean
    priority: number
    isHealthy: boolean
    lastHealthCheckAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ProviderConfigCountAggregateOutputType | null
    _avg: ProviderConfigAvgAggregateOutputType | null
    _sum: ProviderConfigSumAggregateOutputType | null
    _min: ProviderConfigMinAggregateOutputType | null
    _max: ProviderConfigMaxAggregateOutputType | null
  }

  type GetProviderConfigGroupByPayload<T extends ProviderConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProviderConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProviderConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderConfigGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderConfigGroupByOutputType[P]>
        }
      >
    >


  export type ProviderConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    channel?: boolean
    provider?: boolean
    credentials?: boolean
    isActive?: boolean
    priority?: boolean
    isHealthy?: boolean
    lastHealthCheckAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["providerConfig"]>

  export type ProviderConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    channel?: boolean
    provider?: boolean
    credentials?: boolean
    isActive?: boolean
    priority?: boolean
    isHealthy?: boolean
    lastHealthCheckAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["providerConfig"]>

  export type ProviderConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    channel?: boolean
    provider?: boolean
    credentials?: boolean
    isActive?: boolean
    priority?: boolean
    isHealthy?: boolean
    lastHealthCheckAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["providerConfig"]>

  export type ProviderConfigSelectScalar = {
    id?: boolean
    tenantId?: boolean
    channel?: boolean
    provider?: boolean
    credentials?: boolean
    isActive?: boolean
    priority?: boolean
    isHealthy?: boolean
    lastHealthCheckAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProviderConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "channel" | "provider" | "credentials" | "isActive" | "priority" | "isHealthy" | "lastHealthCheckAt" | "createdAt" | "updatedAt", ExtArgs["result"]["providerConfig"]>

  export type $ProviderConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProviderConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      channel: $Enums.NotificationChannel
      provider: $Enums.NotificationProviderName
      credentials: Prisma.JsonValue
      isActive: boolean
      priority: number
      isHealthy: boolean
      lastHealthCheckAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["providerConfig"]>
    composites: {}
  }

  type ProviderConfigGetPayload<S extends boolean | null | undefined | ProviderConfigDefaultArgs> = $Result.GetResult<Prisma.$ProviderConfigPayload, S>

  type ProviderConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProviderConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProviderConfigCountAggregateInputType | true
    }

  export interface ProviderConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProviderConfig'], meta: { name: 'ProviderConfig' } }
    /**
     * Find zero or one ProviderConfig that matches the filter.
     * @param {ProviderConfigFindUniqueArgs} args - Arguments to find a ProviderConfig
     * @example
     * // Get one ProviderConfig
     * const providerConfig = await prisma.providerConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProviderConfigFindUniqueArgs>(args: SelectSubset<T, ProviderConfigFindUniqueArgs<ExtArgs>>): Prisma__ProviderConfigClient<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProviderConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProviderConfigFindUniqueOrThrowArgs} args - Arguments to find a ProviderConfig
     * @example
     * // Get one ProviderConfig
     * const providerConfig = await prisma.providerConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProviderConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, ProviderConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProviderConfigClient<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProviderConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderConfigFindFirstArgs} args - Arguments to find a ProviderConfig
     * @example
     * // Get one ProviderConfig
     * const providerConfig = await prisma.providerConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProviderConfigFindFirstArgs>(args?: SelectSubset<T, ProviderConfigFindFirstArgs<ExtArgs>>): Prisma__ProviderConfigClient<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProviderConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderConfigFindFirstOrThrowArgs} args - Arguments to find a ProviderConfig
     * @example
     * // Get one ProviderConfig
     * const providerConfig = await prisma.providerConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProviderConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, ProviderConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProviderConfigClient<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProviderConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProviderConfigs
     * const providerConfigs = await prisma.providerConfig.findMany()
     * 
     * // Get first 10 ProviderConfigs
     * const providerConfigs = await prisma.providerConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const providerConfigWithIdOnly = await prisma.providerConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProviderConfigFindManyArgs>(args?: SelectSubset<T, ProviderConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProviderConfig.
     * @param {ProviderConfigCreateArgs} args - Arguments to create a ProviderConfig.
     * @example
     * // Create one ProviderConfig
     * const ProviderConfig = await prisma.providerConfig.create({
     *   data: {
     *     // ... data to create a ProviderConfig
     *   }
     * })
     * 
     */
    create<T extends ProviderConfigCreateArgs>(args: SelectSubset<T, ProviderConfigCreateArgs<ExtArgs>>): Prisma__ProviderConfigClient<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProviderConfigs.
     * @param {ProviderConfigCreateManyArgs} args - Arguments to create many ProviderConfigs.
     * @example
     * // Create many ProviderConfigs
     * const providerConfig = await prisma.providerConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProviderConfigCreateManyArgs>(args?: SelectSubset<T, ProviderConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProviderConfigs and returns the data saved in the database.
     * @param {ProviderConfigCreateManyAndReturnArgs} args - Arguments to create many ProviderConfigs.
     * @example
     * // Create many ProviderConfigs
     * const providerConfig = await prisma.providerConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProviderConfigs and only return the `id`
     * const providerConfigWithIdOnly = await prisma.providerConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProviderConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, ProviderConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProviderConfig.
     * @param {ProviderConfigDeleteArgs} args - Arguments to delete one ProviderConfig.
     * @example
     * // Delete one ProviderConfig
     * const ProviderConfig = await prisma.providerConfig.delete({
     *   where: {
     *     // ... filter to delete one ProviderConfig
     *   }
     * })
     * 
     */
    delete<T extends ProviderConfigDeleteArgs>(args: SelectSubset<T, ProviderConfigDeleteArgs<ExtArgs>>): Prisma__ProviderConfigClient<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProviderConfig.
     * @param {ProviderConfigUpdateArgs} args - Arguments to update one ProviderConfig.
     * @example
     * // Update one ProviderConfig
     * const providerConfig = await prisma.providerConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProviderConfigUpdateArgs>(args: SelectSubset<T, ProviderConfigUpdateArgs<ExtArgs>>): Prisma__ProviderConfigClient<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProviderConfigs.
     * @param {ProviderConfigDeleteManyArgs} args - Arguments to filter ProviderConfigs to delete.
     * @example
     * // Delete a few ProviderConfigs
     * const { count } = await prisma.providerConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProviderConfigDeleteManyArgs>(args?: SelectSubset<T, ProviderConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProviderConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProviderConfigs
     * const providerConfig = await prisma.providerConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProviderConfigUpdateManyArgs>(args: SelectSubset<T, ProviderConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProviderConfigs and returns the data updated in the database.
     * @param {ProviderConfigUpdateManyAndReturnArgs} args - Arguments to update many ProviderConfigs.
     * @example
     * // Update many ProviderConfigs
     * const providerConfig = await prisma.providerConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProviderConfigs and only return the `id`
     * const providerConfigWithIdOnly = await prisma.providerConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProviderConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, ProviderConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProviderConfig.
     * @param {ProviderConfigUpsertArgs} args - Arguments to update or create a ProviderConfig.
     * @example
     * // Update or create a ProviderConfig
     * const providerConfig = await prisma.providerConfig.upsert({
     *   create: {
     *     // ... data to create a ProviderConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProviderConfig we want to update
     *   }
     * })
     */
    upsert<T extends ProviderConfigUpsertArgs>(args: SelectSubset<T, ProviderConfigUpsertArgs<ExtArgs>>): Prisma__ProviderConfigClient<$Result.GetResult<Prisma.$ProviderConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProviderConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderConfigCountArgs} args - Arguments to filter ProviderConfigs to count.
     * @example
     * // Count the number of ProviderConfigs
     * const count = await prisma.providerConfig.count({
     *   where: {
     *     // ... the filter for the ProviderConfigs we want to count
     *   }
     * })
    **/
    count<T extends ProviderConfigCountArgs>(
      args?: Subset<T, ProviderConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProviderConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProviderConfigAggregateArgs>(args: Subset<T, ProviderConfigAggregateArgs>): Prisma.PrismaPromise<GetProviderConfigAggregateType<T>>

    /**
     * Group by ProviderConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderConfigGroupByArgs} args - Group by arguments.
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
      T extends ProviderConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderConfigGroupByArgs['orderBy'] }
        : { orderBy?: ProviderConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProviderConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProviderConfig model
   */
  readonly fields: ProviderConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProviderConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProviderConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ProviderConfig model
   */
  interface ProviderConfigFieldRefs {
    readonly id: FieldRef<"ProviderConfig", 'String'>
    readonly tenantId: FieldRef<"ProviderConfig", 'String'>
    readonly channel: FieldRef<"ProviderConfig", 'NotificationChannel'>
    readonly provider: FieldRef<"ProviderConfig", 'NotificationProviderName'>
    readonly credentials: FieldRef<"ProviderConfig", 'Json'>
    readonly isActive: FieldRef<"ProviderConfig", 'Boolean'>
    readonly priority: FieldRef<"ProviderConfig", 'Int'>
    readonly isHealthy: FieldRef<"ProviderConfig", 'Boolean'>
    readonly lastHealthCheckAt: FieldRef<"ProviderConfig", 'DateTime'>
    readonly createdAt: FieldRef<"ProviderConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"ProviderConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProviderConfig findUnique
   */
  export type ProviderConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which ProviderConfig to fetch.
     */
    where: ProviderConfigWhereUniqueInput
  }

  /**
   * ProviderConfig findUniqueOrThrow
   */
  export type ProviderConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which ProviderConfig to fetch.
     */
    where: ProviderConfigWhereUniqueInput
  }

  /**
   * ProviderConfig findFirst
   */
  export type ProviderConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which ProviderConfig to fetch.
     */
    where?: ProviderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderConfigs to fetch.
     */
    orderBy?: ProviderConfigOrderByWithRelationInput | ProviderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProviderConfigs.
     */
    cursor?: ProviderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProviderConfigs.
     */
    distinct?: ProviderConfigScalarFieldEnum | ProviderConfigScalarFieldEnum[]
  }

  /**
   * ProviderConfig findFirstOrThrow
   */
  export type ProviderConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which ProviderConfig to fetch.
     */
    where?: ProviderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderConfigs to fetch.
     */
    orderBy?: ProviderConfigOrderByWithRelationInput | ProviderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProviderConfigs.
     */
    cursor?: ProviderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProviderConfigs.
     */
    distinct?: ProviderConfigScalarFieldEnum | ProviderConfigScalarFieldEnum[]
  }

  /**
   * ProviderConfig findMany
   */
  export type ProviderConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * Filter, which ProviderConfigs to fetch.
     */
    where?: ProviderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProviderConfigs to fetch.
     */
    orderBy?: ProviderConfigOrderByWithRelationInput | ProviderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProviderConfigs.
     */
    cursor?: ProviderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProviderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProviderConfigs.
     */
    skip?: number
    distinct?: ProviderConfigScalarFieldEnum | ProviderConfigScalarFieldEnum[]
  }

  /**
   * ProviderConfig create
   */
  export type ProviderConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a ProviderConfig.
     */
    data: XOR<ProviderConfigCreateInput, ProviderConfigUncheckedCreateInput>
  }

  /**
   * ProviderConfig createMany
   */
  export type ProviderConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProviderConfigs.
     */
    data: ProviderConfigCreateManyInput | ProviderConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProviderConfig createManyAndReturn
   */
  export type ProviderConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * The data used to create many ProviderConfigs.
     */
    data: ProviderConfigCreateManyInput | ProviderConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProviderConfig update
   */
  export type ProviderConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a ProviderConfig.
     */
    data: XOR<ProviderConfigUpdateInput, ProviderConfigUncheckedUpdateInput>
    /**
     * Choose, which ProviderConfig to update.
     */
    where: ProviderConfigWhereUniqueInput
  }

  /**
   * ProviderConfig updateMany
   */
  export type ProviderConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProviderConfigs.
     */
    data: XOR<ProviderConfigUpdateManyMutationInput, ProviderConfigUncheckedUpdateManyInput>
    /**
     * Filter which ProviderConfigs to update
     */
    where?: ProviderConfigWhereInput
    /**
     * Limit how many ProviderConfigs to update.
     */
    limit?: number
  }

  /**
   * ProviderConfig updateManyAndReturn
   */
  export type ProviderConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * The data used to update ProviderConfigs.
     */
    data: XOR<ProviderConfigUpdateManyMutationInput, ProviderConfigUncheckedUpdateManyInput>
    /**
     * Filter which ProviderConfigs to update
     */
    where?: ProviderConfigWhereInput
    /**
     * Limit how many ProviderConfigs to update.
     */
    limit?: number
  }

  /**
   * ProviderConfig upsert
   */
  export type ProviderConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the ProviderConfig to update in case it exists.
     */
    where: ProviderConfigWhereUniqueInput
    /**
     * In case the ProviderConfig found by the `where` argument doesn't exist, create a new ProviderConfig with this data.
     */
    create: XOR<ProviderConfigCreateInput, ProviderConfigUncheckedCreateInput>
    /**
     * In case the ProviderConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderConfigUpdateInput, ProviderConfigUncheckedUpdateInput>
  }

  /**
   * ProviderConfig delete
   */
  export type ProviderConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
    /**
     * Filter which ProviderConfig to delete.
     */
    where: ProviderConfigWhereUniqueInput
  }

  /**
   * ProviderConfig deleteMany
   */
  export type ProviderConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProviderConfigs to delete
     */
    where?: ProviderConfigWhereInput
    /**
     * Limit how many ProviderConfigs to delete.
     */
    limit?: number
  }

  /**
   * ProviderConfig without action
   */
  export type ProviderConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderConfig
     */
    select?: ProviderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProviderConfig
     */
    omit?: ProviderConfigOmit<ExtArgs> | null
  }


  /**
   * Model DeliveryLog
   */

  export type AggregateDeliveryLog = {
    _count: DeliveryLogCountAggregateOutputType | null
    _avg: DeliveryLogAvgAggregateOutputType | null
    _sum: DeliveryLogSumAggregateOutputType | null
    _min: DeliveryLogMinAggregateOutputType | null
    _max: DeliveryLogMaxAggregateOutputType | null
  }

  export type DeliveryLogAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type DeliveryLogSumAggregateOutputType = {
    retryCount: number | null
  }

  export type DeliveryLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    channel: $Enums.NotificationChannel | null
    provider: $Enums.NotificationProviderName | null
    status: $Enums.DeliveryStatus | null
    errorMessage: string | null
    retryCount: number | null
    nextAttemptAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    channel: $Enums.NotificationChannel | null
    provider: $Enums.NotificationProviderName | null
    status: $Enums.DeliveryStatus | null
    errorMessage: string | null
    retryCount: number | null
    nextAttemptAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryLogCountAggregateOutputType = {
    id: number
    tenantId: number
    channel: number
    provider: number
    status: number
    errorMessage: number
    requestPayload: number
    responsePayload: number
    retryCount: number
    nextAttemptAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeliveryLogAvgAggregateInputType = {
    retryCount?: true
  }

  export type DeliveryLogSumAggregateInputType = {
    retryCount?: true
  }

  export type DeliveryLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    channel?: true
    provider?: true
    status?: true
    errorMessage?: true
    retryCount?: true
    nextAttemptAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    channel?: true
    provider?: true
    status?: true
    errorMessage?: true
    retryCount?: true
    nextAttemptAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    channel?: true
    provider?: true
    status?: true
    errorMessage?: true
    requestPayload?: true
    responsePayload?: true
    retryCount?: true
    nextAttemptAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeliveryLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryLog to aggregate.
     */
    where?: DeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryLogs to fetch.
     */
    orderBy?: DeliveryLogOrderByWithRelationInput | DeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeliveryLogs
    **/
    _count?: true | DeliveryLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliveryLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliveryLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryLogMaxAggregateInputType
  }

  export type GetDeliveryLogAggregateType<T extends DeliveryLogAggregateArgs> = {
        [P in keyof T & keyof AggregateDeliveryLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeliveryLog[P]>
      : GetScalarType<T[P], AggregateDeliveryLog[P]>
  }




  export type DeliveryLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryLogWhereInput
    orderBy?: DeliveryLogOrderByWithAggregationInput | DeliveryLogOrderByWithAggregationInput[]
    by: DeliveryLogScalarFieldEnum[] | DeliveryLogScalarFieldEnum
    having?: DeliveryLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryLogCountAggregateInputType | true
    _avg?: DeliveryLogAvgAggregateInputType
    _sum?: DeliveryLogSumAggregateInputType
    _min?: DeliveryLogMinAggregateInputType
    _max?: DeliveryLogMaxAggregateInputType
  }

  export type DeliveryLogGroupByOutputType = {
    id: string
    tenantId: string
    channel: $Enums.NotificationChannel
    provider: $Enums.NotificationProviderName
    status: $Enums.DeliveryStatus
    errorMessage: string | null
    requestPayload: JsonValue
    responsePayload: JsonValue | null
    retryCount: number
    nextAttemptAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DeliveryLogCountAggregateOutputType | null
    _avg: DeliveryLogAvgAggregateOutputType | null
    _sum: DeliveryLogSumAggregateOutputType | null
    _min: DeliveryLogMinAggregateOutputType | null
    _max: DeliveryLogMaxAggregateOutputType | null
  }

  type GetDeliveryLogGroupByPayload<T extends DeliveryLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryLogGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryLogGroupByOutputType[P]>
        }
      >
    >


  export type DeliveryLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    channel?: boolean
    provider?: boolean
    status?: boolean
    errorMessage?: boolean
    requestPayload?: boolean
    responsePayload?: boolean
    retryCount?: boolean
    nextAttemptAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryLog"]>

  export type DeliveryLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    channel?: boolean
    provider?: boolean
    status?: boolean
    errorMessage?: boolean
    requestPayload?: boolean
    responsePayload?: boolean
    retryCount?: boolean
    nextAttemptAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryLog"]>

  export type DeliveryLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    channel?: boolean
    provider?: boolean
    status?: boolean
    errorMessage?: boolean
    requestPayload?: boolean
    responsePayload?: boolean
    retryCount?: boolean
    nextAttemptAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deliveryLog"]>

  export type DeliveryLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    channel?: boolean
    provider?: boolean
    status?: boolean
    errorMessage?: boolean
    requestPayload?: boolean
    responsePayload?: boolean
    retryCount?: boolean
    nextAttemptAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeliveryLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "channel" | "provider" | "status" | "errorMessage" | "requestPayload" | "responsePayload" | "retryCount" | "nextAttemptAt" | "createdAt" | "updatedAt", ExtArgs["result"]["deliveryLog"]>

  export type $DeliveryLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeliveryLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      channel: $Enums.NotificationChannel
      provider: $Enums.NotificationProviderName
      status: $Enums.DeliveryStatus
      errorMessage: string | null
      requestPayload: Prisma.JsonValue
      responsePayload: Prisma.JsonValue | null
      retryCount: number
      nextAttemptAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deliveryLog"]>
    composites: {}
  }

  type DeliveryLogGetPayload<S extends boolean | null | undefined | DeliveryLogDefaultArgs> = $Result.GetResult<Prisma.$DeliveryLogPayload, S>

  type DeliveryLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryLogCountAggregateInputType | true
    }

  export interface DeliveryLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeliveryLog'], meta: { name: 'DeliveryLog' } }
    /**
     * Find zero or one DeliveryLog that matches the filter.
     * @param {DeliveryLogFindUniqueArgs} args - Arguments to find a DeliveryLog
     * @example
     * // Get one DeliveryLog
     * const deliveryLog = await prisma.deliveryLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryLogFindUniqueArgs>(args: SelectSubset<T, DeliveryLogFindUniqueArgs<ExtArgs>>): Prisma__DeliveryLogClient<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeliveryLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryLogFindUniqueOrThrowArgs} args - Arguments to find a DeliveryLog
     * @example
     * // Get one DeliveryLog
     * const deliveryLog = await prisma.deliveryLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryLogFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryLogClient<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryLogFindFirstArgs} args - Arguments to find a DeliveryLog
     * @example
     * // Get one DeliveryLog
     * const deliveryLog = await prisma.deliveryLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryLogFindFirstArgs>(args?: SelectSubset<T, DeliveryLogFindFirstArgs<ExtArgs>>): Prisma__DeliveryLogClient<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeliveryLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryLogFindFirstOrThrowArgs} args - Arguments to find a DeliveryLog
     * @example
     * // Get one DeliveryLog
     * const deliveryLog = await prisma.deliveryLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryLogFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryLogClient<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeliveryLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeliveryLogs
     * const deliveryLogs = await prisma.deliveryLog.findMany()
     * 
     * // Get first 10 DeliveryLogs
     * const deliveryLogs = await prisma.deliveryLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryLogWithIdOnly = await prisma.deliveryLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryLogFindManyArgs>(args?: SelectSubset<T, DeliveryLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeliveryLog.
     * @param {DeliveryLogCreateArgs} args - Arguments to create a DeliveryLog.
     * @example
     * // Create one DeliveryLog
     * const DeliveryLog = await prisma.deliveryLog.create({
     *   data: {
     *     // ... data to create a DeliveryLog
     *   }
     * })
     * 
     */
    create<T extends DeliveryLogCreateArgs>(args: SelectSubset<T, DeliveryLogCreateArgs<ExtArgs>>): Prisma__DeliveryLogClient<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeliveryLogs.
     * @param {DeliveryLogCreateManyArgs} args - Arguments to create many DeliveryLogs.
     * @example
     * // Create many DeliveryLogs
     * const deliveryLog = await prisma.deliveryLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryLogCreateManyArgs>(args?: SelectSubset<T, DeliveryLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeliveryLogs and returns the data saved in the database.
     * @param {DeliveryLogCreateManyAndReturnArgs} args - Arguments to create many DeliveryLogs.
     * @example
     * // Create many DeliveryLogs
     * const deliveryLog = await prisma.deliveryLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeliveryLogs and only return the `id`
     * const deliveryLogWithIdOnly = await prisma.deliveryLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryLogCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeliveryLog.
     * @param {DeliveryLogDeleteArgs} args - Arguments to delete one DeliveryLog.
     * @example
     * // Delete one DeliveryLog
     * const DeliveryLog = await prisma.deliveryLog.delete({
     *   where: {
     *     // ... filter to delete one DeliveryLog
     *   }
     * })
     * 
     */
    delete<T extends DeliveryLogDeleteArgs>(args: SelectSubset<T, DeliveryLogDeleteArgs<ExtArgs>>): Prisma__DeliveryLogClient<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeliveryLog.
     * @param {DeliveryLogUpdateArgs} args - Arguments to update one DeliveryLog.
     * @example
     * // Update one DeliveryLog
     * const deliveryLog = await prisma.deliveryLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryLogUpdateArgs>(args: SelectSubset<T, DeliveryLogUpdateArgs<ExtArgs>>): Prisma__DeliveryLogClient<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeliveryLogs.
     * @param {DeliveryLogDeleteManyArgs} args - Arguments to filter DeliveryLogs to delete.
     * @example
     * // Delete a few DeliveryLogs
     * const { count } = await prisma.deliveryLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryLogDeleteManyArgs>(args?: SelectSubset<T, DeliveryLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeliveryLogs
     * const deliveryLog = await prisma.deliveryLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryLogUpdateManyArgs>(args: SelectSubset<T, DeliveryLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeliveryLogs and returns the data updated in the database.
     * @param {DeliveryLogUpdateManyAndReturnArgs} args - Arguments to update many DeliveryLogs.
     * @example
     * // Update many DeliveryLogs
     * const deliveryLog = await prisma.deliveryLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeliveryLogs and only return the `id`
     * const deliveryLogWithIdOnly = await prisma.deliveryLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeliveryLogUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeliveryLog.
     * @param {DeliveryLogUpsertArgs} args - Arguments to update or create a DeliveryLog.
     * @example
     * // Update or create a DeliveryLog
     * const deliveryLog = await prisma.deliveryLog.upsert({
     *   create: {
     *     // ... data to create a DeliveryLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeliveryLog we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryLogUpsertArgs>(args: SelectSubset<T, DeliveryLogUpsertArgs<ExtArgs>>): Prisma__DeliveryLogClient<$Result.GetResult<Prisma.$DeliveryLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeliveryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryLogCountArgs} args - Arguments to filter DeliveryLogs to count.
     * @example
     * // Count the number of DeliveryLogs
     * const count = await prisma.deliveryLog.count({
     *   where: {
     *     // ... the filter for the DeliveryLogs we want to count
     *   }
     * })
    **/
    count<T extends DeliveryLogCountArgs>(
      args?: Subset<T, DeliveryLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeliveryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeliveryLogAggregateArgs>(args: Subset<T, DeliveryLogAggregateArgs>): Prisma.PrismaPromise<GetDeliveryLogAggregateType<T>>

    /**
     * Group by DeliveryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryLogGroupByArgs} args - Group by arguments.
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
      T extends DeliveryLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryLogGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DeliveryLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeliveryLog model
   */
  readonly fields: DeliveryLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeliveryLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the DeliveryLog model
   */
  interface DeliveryLogFieldRefs {
    readonly id: FieldRef<"DeliveryLog", 'String'>
    readonly tenantId: FieldRef<"DeliveryLog", 'String'>
    readonly channel: FieldRef<"DeliveryLog", 'NotificationChannel'>
    readonly provider: FieldRef<"DeliveryLog", 'NotificationProviderName'>
    readonly status: FieldRef<"DeliveryLog", 'DeliveryStatus'>
    readonly errorMessage: FieldRef<"DeliveryLog", 'String'>
    readonly requestPayload: FieldRef<"DeliveryLog", 'Json'>
    readonly responsePayload: FieldRef<"DeliveryLog", 'Json'>
    readonly retryCount: FieldRef<"DeliveryLog", 'Int'>
    readonly nextAttemptAt: FieldRef<"DeliveryLog", 'DateTime'>
    readonly createdAt: FieldRef<"DeliveryLog", 'DateTime'>
    readonly updatedAt: FieldRef<"DeliveryLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeliveryLog findUnique
   */
  export type DeliveryLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryLog to fetch.
     */
    where: DeliveryLogWhereUniqueInput
  }

  /**
   * DeliveryLog findUniqueOrThrow
   */
  export type DeliveryLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryLog to fetch.
     */
    where: DeliveryLogWhereUniqueInput
  }

  /**
   * DeliveryLog findFirst
   */
  export type DeliveryLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryLog to fetch.
     */
    where?: DeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryLogs to fetch.
     */
    orderBy?: DeliveryLogOrderByWithRelationInput | DeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryLogs.
     */
    cursor?: DeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryLogs.
     */
    distinct?: DeliveryLogScalarFieldEnum | DeliveryLogScalarFieldEnum[]
  }

  /**
   * DeliveryLog findFirstOrThrow
   */
  export type DeliveryLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryLog to fetch.
     */
    where?: DeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryLogs to fetch.
     */
    orderBy?: DeliveryLogOrderByWithRelationInput | DeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeliveryLogs.
     */
    cursor?: DeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeliveryLogs.
     */
    distinct?: DeliveryLogScalarFieldEnum | DeliveryLogScalarFieldEnum[]
  }

  /**
   * DeliveryLog findMany
   */
  export type DeliveryLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * Filter, which DeliveryLogs to fetch.
     */
    where?: DeliveryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeliveryLogs to fetch.
     */
    orderBy?: DeliveryLogOrderByWithRelationInput | DeliveryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeliveryLogs.
     */
    cursor?: DeliveryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeliveryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeliveryLogs.
     */
    skip?: number
    distinct?: DeliveryLogScalarFieldEnum | DeliveryLogScalarFieldEnum[]
  }

  /**
   * DeliveryLog create
   */
  export type DeliveryLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * The data needed to create a DeliveryLog.
     */
    data: XOR<DeliveryLogCreateInput, DeliveryLogUncheckedCreateInput>
  }

  /**
   * DeliveryLog createMany
   */
  export type DeliveryLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeliveryLogs.
     */
    data: DeliveryLogCreateManyInput | DeliveryLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryLog createManyAndReturn
   */
  export type DeliveryLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * The data used to create many DeliveryLogs.
     */
    data: DeliveryLogCreateManyInput | DeliveryLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeliveryLog update
   */
  export type DeliveryLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * The data needed to update a DeliveryLog.
     */
    data: XOR<DeliveryLogUpdateInput, DeliveryLogUncheckedUpdateInput>
    /**
     * Choose, which DeliveryLog to update.
     */
    where: DeliveryLogWhereUniqueInput
  }

  /**
   * DeliveryLog updateMany
   */
  export type DeliveryLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeliveryLogs.
     */
    data: XOR<DeliveryLogUpdateManyMutationInput, DeliveryLogUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryLogs to update
     */
    where?: DeliveryLogWhereInput
    /**
     * Limit how many DeliveryLogs to update.
     */
    limit?: number
  }

  /**
   * DeliveryLog updateManyAndReturn
   */
  export type DeliveryLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * The data used to update DeliveryLogs.
     */
    data: XOR<DeliveryLogUpdateManyMutationInput, DeliveryLogUncheckedUpdateManyInput>
    /**
     * Filter which DeliveryLogs to update
     */
    where?: DeliveryLogWhereInput
    /**
     * Limit how many DeliveryLogs to update.
     */
    limit?: number
  }

  /**
   * DeliveryLog upsert
   */
  export type DeliveryLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * The filter to search for the DeliveryLog to update in case it exists.
     */
    where: DeliveryLogWhereUniqueInput
    /**
     * In case the DeliveryLog found by the `where` argument doesn't exist, create a new DeliveryLog with this data.
     */
    create: XOR<DeliveryLogCreateInput, DeliveryLogUncheckedCreateInput>
    /**
     * In case the DeliveryLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryLogUpdateInput, DeliveryLogUncheckedUpdateInput>
  }

  /**
   * DeliveryLog delete
   */
  export type DeliveryLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
    /**
     * Filter which DeliveryLog to delete.
     */
    where: DeliveryLogWhereUniqueInput
  }

  /**
   * DeliveryLog deleteMany
   */
  export type DeliveryLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeliveryLogs to delete
     */
    where?: DeliveryLogWhereInput
    /**
     * Limit how many DeliveryLogs to delete.
     */
    limit?: number
  }

  /**
   * DeliveryLog without action
   */
  export type DeliveryLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryLog
     */
    select?: DeliveryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeliveryLog
     */
    omit?: DeliveryLogOmit<ExtArgs> | null
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


  export const ProviderConfigScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    channel: 'channel',
    provider: 'provider',
    credentials: 'credentials',
    isActive: 'isActive',
    priority: 'priority',
    isHealthy: 'isHealthy',
    lastHealthCheckAt: 'lastHealthCheckAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProviderConfigScalarFieldEnum = (typeof ProviderConfigScalarFieldEnum)[keyof typeof ProviderConfigScalarFieldEnum]


  export const DeliveryLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    channel: 'channel',
    provider: 'provider',
    status: 'status',
    errorMessage: 'errorMessage',
    requestPayload: 'requestPayload',
    responsePayload: 'responsePayload',
    retryCount: 'retryCount',
    nextAttemptAt: 'nextAttemptAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeliveryLogScalarFieldEnum = (typeof DeliveryLogScalarFieldEnum)[keyof typeof DeliveryLogScalarFieldEnum]


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
   * Reference to a field of type 'NotificationChannel'
   */
  export type EnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel'>
    


  /**
   * Reference to a field of type 'NotificationChannel[]'
   */
  export type ListEnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel[]'>
    


  /**
   * Reference to a field of type 'NotificationProviderName'
   */
  export type EnumNotificationProviderNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationProviderName'>
    


  /**
   * Reference to a field of type 'NotificationProviderName[]'
   */
  export type ListEnumNotificationProviderNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationProviderName[]'>
    


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'DeliveryStatus'
   */
  export type EnumDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryStatus'>
    


  /**
   * Reference to a field of type 'DeliveryStatus[]'
   */
  export type ListEnumDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryStatus[]'>
    


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


  export type ProviderConfigWhereInput = {
    AND?: ProviderConfigWhereInput | ProviderConfigWhereInput[]
    OR?: ProviderConfigWhereInput[]
    NOT?: ProviderConfigWhereInput | ProviderConfigWhereInput[]
    id?: StringFilter<"ProviderConfig"> | string
    tenantId?: StringFilter<"ProviderConfig"> | string
    channel?: EnumNotificationChannelFilter<"ProviderConfig"> | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFilter<"ProviderConfig"> | $Enums.NotificationProviderName
    credentials?: JsonFilter<"ProviderConfig">
    isActive?: BoolFilter<"ProviderConfig"> | boolean
    priority?: IntFilter<"ProviderConfig"> | number
    isHealthy?: BoolFilter<"ProviderConfig"> | boolean
    lastHealthCheckAt?: DateTimeNullableFilter<"ProviderConfig"> | Date | string | null
    createdAt?: DateTimeFilter<"ProviderConfig"> | Date | string
    updatedAt?: DateTimeFilter<"ProviderConfig"> | Date | string
  }

  export type ProviderConfigOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    credentials?: SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    isHealthy?: SortOrder
    lastHealthCheckAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProviderConfigWhereInput | ProviderConfigWhereInput[]
    OR?: ProviderConfigWhereInput[]
    NOT?: ProviderConfigWhereInput | ProviderConfigWhereInput[]
    tenantId?: StringFilter<"ProviderConfig"> | string
    channel?: EnumNotificationChannelFilter<"ProviderConfig"> | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFilter<"ProviderConfig"> | $Enums.NotificationProviderName
    credentials?: JsonFilter<"ProviderConfig">
    isActive?: BoolFilter<"ProviderConfig"> | boolean
    priority?: IntFilter<"ProviderConfig"> | number
    isHealthy?: BoolFilter<"ProviderConfig"> | boolean
    lastHealthCheckAt?: DateTimeNullableFilter<"ProviderConfig"> | Date | string | null
    createdAt?: DateTimeFilter<"ProviderConfig"> | Date | string
    updatedAt?: DateTimeFilter<"ProviderConfig"> | Date | string
  }, "id">

  export type ProviderConfigOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    credentials?: SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    isHealthy?: SortOrder
    lastHealthCheckAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProviderConfigCountOrderByAggregateInput
    _avg?: ProviderConfigAvgOrderByAggregateInput
    _max?: ProviderConfigMaxOrderByAggregateInput
    _min?: ProviderConfigMinOrderByAggregateInput
    _sum?: ProviderConfigSumOrderByAggregateInput
  }

  export type ProviderConfigScalarWhereWithAggregatesInput = {
    AND?: ProviderConfigScalarWhereWithAggregatesInput | ProviderConfigScalarWhereWithAggregatesInput[]
    OR?: ProviderConfigScalarWhereWithAggregatesInput[]
    NOT?: ProviderConfigScalarWhereWithAggregatesInput | ProviderConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProviderConfig"> | string
    tenantId?: StringWithAggregatesFilter<"ProviderConfig"> | string
    channel?: EnumNotificationChannelWithAggregatesFilter<"ProviderConfig"> | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameWithAggregatesFilter<"ProviderConfig"> | $Enums.NotificationProviderName
    credentials?: JsonWithAggregatesFilter<"ProviderConfig">
    isActive?: BoolWithAggregatesFilter<"ProviderConfig"> | boolean
    priority?: IntWithAggregatesFilter<"ProviderConfig"> | number
    isHealthy?: BoolWithAggregatesFilter<"ProviderConfig"> | boolean
    lastHealthCheckAt?: DateTimeNullableWithAggregatesFilter<"ProviderConfig"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProviderConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProviderConfig"> | Date | string
  }

  export type DeliveryLogWhereInput = {
    AND?: DeliveryLogWhereInput | DeliveryLogWhereInput[]
    OR?: DeliveryLogWhereInput[]
    NOT?: DeliveryLogWhereInput | DeliveryLogWhereInput[]
    id?: StringFilter<"DeliveryLog"> | string
    tenantId?: StringFilter<"DeliveryLog"> | string
    channel?: EnumNotificationChannelFilter<"DeliveryLog"> | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFilter<"DeliveryLog"> | $Enums.NotificationProviderName
    status?: EnumDeliveryStatusFilter<"DeliveryLog"> | $Enums.DeliveryStatus
    errorMessage?: StringNullableFilter<"DeliveryLog"> | string | null
    requestPayload?: JsonFilter<"DeliveryLog">
    responsePayload?: JsonNullableFilter<"DeliveryLog">
    retryCount?: IntFilter<"DeliveryLog"> | number
    nextAttemptAt?: DateTimeNullableFilter<"DeliveryLog"> | Date | string | null
    createdAt?: DateTimeFilter<"DeliveryLog"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryLog"> | Date | string
  }

  export type DeliveryLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    requestPayload?: SortOrder
    responsePayload?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    nextAttemptAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeliveryLogWhereInput | DeliveryLogWhereInput[]
    OR?: DeliveryLogWhereInput[]
    NOT?: DeliveryLogWhereInput | DeliveryLogWhereInput[]
    tenantId?: StringFilter<"DeliveryLog"> | string
    channel?: EnumNotificationChannelFilter<"DeliveryLog"> | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFilter<"DeliveryLog"> | $Enums.NotificationProviderName
    status?: EnumDeliveryStatusFilter<"DeliveryLog"> | $Enums.DeliveryStatus
    errorMessage?: StringNullableFilter<"DeliveryLog"> | string | null
    requestPayload?: JsonFilter<"DeliveryLog">
    responsePayload?: JsonNullableFilter<"DeliveryLog">
    retryCount?: IntFilter<"DeliveryLog"> | number
    nextAttemptAt?: DateTimeNullableFilter<"DeliveryLog"> | Date | string | null
    createdAt?: DateTimeFilter<"DeliveryLog"> | Date | string
    updatedAt?: DateTimeFilter<"DeliveryLog"> | Date | string
  }, "id">

  export type DeliveryLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    requestPayload?: SortOrder
    responsePayload?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    nextAttemptAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeliveryLogCountOrderByAggregateInput
    _avg?: DeliveryLogAvgOrderByAggregateInput
    _max?: DeliveryLogMaxOrderByAggregateInput
    _min?: DeliveryLogMinOrderByAggregateInput
    _sum?: DeliveryLogSumOrderByAggregateInput
  }

  export type DeliveryLogScalarWhereWithAggregatesInput = {
    AND?: DeliveryLogScalarWhereWithAggregatesInput | DeliveryLogScalarWhereWithAggregatesInput[]
    OR?: DeliveryLogScalarWhereWithAggregatesInput[]
    NOT?: DeliveryLogScalarWhereWithAggregatesInput | DeliveryLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeliveryLog"> | string
    tenantId?: StringWithAggregatesFilter<"DeliveryLog"> | string
    channel?: EnumNotificationChannelWithAggregatesFilter<"DeliveryLog"> | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameWithAggregatesFilter<"DeliveryLog"> | $Enums.NotificationProviderName
    status?: EnumDeliveryStatusWithAggregatesFilter<"DeliveryLog"> | $Enums.DeliveryStatus
    errorMessage?: StringNullableWithAggregatesFilter<"DeliveryLog"> | string | null
    requestPayload?: JsonWithAggregatesFilter<"DeliveryLog">
    responsePayload?: JsonNullableWithAggregatesFilter<"DeliveryLog">
    retryCount?: IntWithAggregatesFilter<"DeliveryLog"> | number
    nextAttemptAt?: DateTimeNullableWithAggregatesFilter<"DeliveryLog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DeliveryLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeliveryLog"> | Date | string
  }

  export type ProviderConfigCreateInput = {
    id?: string
    tenantId: string
    channel: $Enums.NotificationChannel
    provider: $Enums.NotificationProviderName
    credentials: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    priority?: number
    isHealthy?: boolean
    lastHealthCheckAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderConfigUncheckedCreateInput = {
    id?: string
    tenantId: string
    channel: $Enums.NotificationChannel
    provider: $Enums.NotificationProviderName
    credentials: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    priority?: number
    isHealthy?: boolean
    lastHealthCheckAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFieldUpdateOperationsInput | $Enums.NotificationProviderName
    credentials?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    isHealthy?: BoolFieldUpdateOperationsInput | boolean
    lastHealthCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFieldUpdateOperationsInput | $Enums.NotificationProviderName
    credentials?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    isHealthy?: BoolFieldUpdateOperationsInput | boolean
    lastHealthCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderConfigCreateManyInput = {
    id?: string
    tenantId: string
    channel: $Enums.NotificationChannel
    provider: $Enums.NotificationProviderName
    credentials: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    priority?: number
    isHealthy?: boolean
    lastHealthCheckAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFieldUpdateOperationsInput | $Enums.NotificationProviderName
    credentials?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    isHealthy?: BoolFieldUpdateOperationsInput | boolean
    lastHealthCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFieldUpdateOperationsInput | $Enums.NotificationProviderName
    credentials?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    priority?: IntFieldUpdateOperationsInput | number
    isHealthy?: BoolFieldUpdateOperationsInput | boolean
    lastHealthCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryLogCreateInput = {
    id?: string
    tenantId: string
    channel: $Enums.NotificationChannel
    provider: $Enums.NotificationProviderName
    status: $Enums.DeliveryStatus
    errorMessage?: string | null
    requestPayload: JsonNullValueInput | InputJsonValue
    responsePayload?: NullableJsonNullValueInput | InputJsonValue
    retryCount?: number
    nextAttemptAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    channel: $Enums.NotificationChannel
    provider: $Enums.NotificationProviderName
    status: $Enums.DeliveryStatus
    errorMessage?: string | null
    requestPayload: JsonNullValueInput | InputJsonValue
    responsePayload?: NullableJsonNullValueInput | InputJsonValue
    retryCount?: number
    nextAttemptAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFieldUpdateOperationsInput | $Enums.NotificationProviderName
    status?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    requestPayload?: JsonNullValueInput | InputJsonValue
    responsePayload?: NullableJsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFieldUpdateOperationsInput | $Enums.NotificationProviderName
    status?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    requestPayload?: JsonNullValueInput | InputJsonValue
    responsePayload?: NullableJsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryLogCreateManyInput = {
    id?: string
    tenantId: string
    channel: $Enums.NotificationChannel
    provider: $Enums.NotificationProviderName
    status: $Enums.DeliveryStatus
    errorMessage?: string | null
    requestPayload: JsonNullValueInput | InputJsonValue
    responsePayload?: NullableJsonNullValueInput | InputJsonValue
    retryCount?: number
    nextAttemptAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFieldUpdateOperationsInput | $Enums.NotificationProviderName
    status?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    requestPayload?: JsonNullValueInput | InputJsonValue
    responsePayload?: NullableJsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    provider?: EnumNotificationProviderNameFieldUpdateOperationsInput | $Enums.NotificationProviderName
    status?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    requestPayload?: JsonNullValueInput | InputJsonValue
    responsePayload?: NullableJsonNullValueInput | InputJsonValue
    retryCount?: IntFieldUpdateOperationsInput | number
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel
  }

  export type EnumNotificationProviderNameFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationProviderName | EnumNotificationProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationProviderName[] | ListEnumNotificationProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationProviderName[] | ListEnumNotificationProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationProviderNameFilter<$PrismaModel> | $Enums.NotificationProviderName
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

  export type ProviderConfigCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    credentials?: SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    isHealthy?: SortOrder
    lastHealthCheckAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderConfigAvgOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type ProviderConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    isHealthy?: SortOrder
    lastHealthCheckAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderConfigMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    isActive?: SortOrder
    priority?: SortOrder
    isHealthy?: SortOrder
    lastHealthCheckAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderConfigSumOrderByAggregateInput = {
    priority?: SortOrder
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

  export type EnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationChannelFilter<$PrismaModel>
    _max?: NestedEnumNotificationChannelFilter<$PrismaModel>
  }

  export type EnumNotificationProviderNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationProviderName | EnumNotificationProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationProviderName[] | ListEnumNotificationProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationProviderName[] | ListEnumNotificationProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationProviderNameWithAggregatesFilter<$PrismaModel> | $Enums.NotificationProviderName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationProviderNameFilter<$PrismaModel>
    _max?: NestedEnumNotificationProviderNameFilter<$PrismaModel>
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

  export type EnumDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryStatus | EnumDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeliveryStatusFilter<$PrismaModel> | $Enums.DeliveryStatus
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

  export type DeliveryLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    requestPayload?: SortOrder
    responsePayload?: SortOrder
    retryCount?: SortOrder
    nextAttemptAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryLogAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type DeliveryLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    nextAttemptAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    channel?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    nextAttemptAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryLogSumOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type EnumDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryStatus | EnumDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeliveryStatusFilter<$PrismaModel>
    _max?: NestedEnumDeliveryStatusFilter<$PrismaModel>
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumNotificationChannelFieldUpdateOperationsInput = {
    set?: $Enums.NotificationChannel
  }

  export type EnumNotificationProviderNameFieldUpdateOperationsInput = {
    set?: $Enums.NotificationProviderName
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumDeliveryStatusFieldUpdateOperationsInput = {
    set?: $Enums.DeliveryStatus
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

  export type NestedEnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel
  }

  export type NestedEnumNotificationProviderNameFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationProviderName | EnumNotificationProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationProviderName[] | ListEnumNotificationProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationProviderName[] | ListEnumNotificationProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationProviderNameFilter<$PrismaModel> | $Enums.NotificationProviderName
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationChannelFilter<$PrismaModel>
    _max?: NestedEnumNotificationChannelFilter<$PrismaModel>
  }

  export type NestedEnumNotificationProviderNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationProviderName | EnumNotificationProviderNameFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationProviderName[] | ListEnumNotificationProviderNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationProviderName[] | ListEnumNotificationProviderNameFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationProviderNameWithAggregatesFilter<$PrismaModel> | $Enums.NotificationProviderName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationProviderNameFilter<$PrismaModel>
    _max?: NestedEnumNotificationProviderNameFilter<$PrismaModel>
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

  export type NestedEnumDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryStatus | EnumDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeliveryStatusFilter<$PrismaModel> | $Enums.DeliveryStatus
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

  export type NestedEnumDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryStatus | EnumDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeliveryStatusFilter<$PrismaModel>
    _max?: NestedEnumDeliveryStatusFilter<$PrismaModel>
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