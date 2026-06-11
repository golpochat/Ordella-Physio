
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
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model OrganizationConfig
 * 
 */
export type OrganizationConfig = $Result.DefaultSelection<Prisma.$OrganizationConfigPayload>
/**
 * Model OrganizationTenant
 * 
 */
export type OrganizationTenant = $Result.DefaultSelection<Prisma.$OrganizationTenantPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrganizationStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type OrganizationStatus = (typeof OrganizationStatus)[keyof typeof OrganizationStatus]

}

export type OrganizationStatus = $Enums.OrganizationStatus

export const OrganizationStatus: typeof $Enums.OrganizationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
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
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
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
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizationConfig`: Exposes CRUD operations for the **OrganizationConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationConfigs
    * const organizationConfigs = await prisma.organizationConfig.findMany()
    * ```
    */
  get organizationConfig(): Prisma.OrganizationConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organizationTenant`: Exposes CRUD operations for the **OrganizationTenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationTenants
    * const organizationTenants = await prisma.organizationTenant.findMany()
    * ```
    */
  get organizationTenant(): Prisma.OrganizationTenantDelegate<ExtArgs, ClientOptions>;
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
    Organization: 'Organization',
    OrganizationConfig: 'OrganizationConfig',
    OrganizationTenant: 'OrganizationTenant'
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
      modelProps: "organization" | "organizationConfig" | "organizationTenant"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      OrganizationConfig: {
        payload: Prisma.$OrganizationConfigPayload<ExtArgs>
        fields: Prisma.OrganizationConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>
          }
          findFirst: {
            args: Prisma.OrganizationConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>
          }
          findMany: {
            args: Prisma.OrganizationConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>[]
          }
          create: {
            args: Prisma.OrganizationConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>
          }
          createMany: {
            args: Prisma.OrganizationConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>[]
          }
          delete: {
            args: Prisma.OrganizationConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>
          }
          update: {
            args: Prisma.OrganizationConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationConfigPayload>
          }
          aggregate: {
            args: Prisma.OrganizationConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationConfig>
          }
          groupBy: {
            args: Prisma.OrganizationConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationConfigCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationConfigCountAggregateOutputType> | number
          }
        }
      }
      OrganizationTenant: {
        payload: Prisma.$OrganizationTenantPayload<ExtArgs>
        fields: Prisma.OrganizationTenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationTenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationTenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>
          }
          findFirst: {
            args: Prisma.OrganizationTenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationTenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>
          }
          findMany: {
            args: Prisma.OrganizationTenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>[]
          }
          create: {
            args: Prisma.OrganizationTenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>
          }
          createMany: {
            args: Prisma.OrganizationTenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationTenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>[]
          }
          delete: {
            args: Prisma.OrganizationTenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>
          }
          update: {
            args: Prisma.OrganizationTenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationTenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationTenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationTenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationTenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationTenantPayload>
          }
          aggregate: {
            args: Prisma.OrganizationTenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationTenant>
          }
          groupBy: {
            args: Prisma.OrganizationTenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationTenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationTenantCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationTenantCountAggregateOutputType> | number
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
    organization?: OrganizationOmit
    organizationConfig?: OrganizationConfigOmit
    organizationTenant?: OrganizationTenantOmit
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
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    tenantLinks: number
    configs: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenantLinks?: boolean | OrganizationCountOutputTypeCountTenantLinksArgs
    configs?: boolean | OrganizationCountOutputTypeCountConfigsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountTenantLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationTenantWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountConfigsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationConfigWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    description: string | null
    primaryContactName: string | null
    primaryContactEmail: string | null
    primaryContactPhone: string | null
    status: $Enums.OrganizationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    description: string | null
    primaryContactName: string | null
    primaryContactEmail: string | null
    primaryContactPhone: string | null
    status: $Enums.OrganizationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    code: number
    description: number
    primaryContactName: number
    primaryContactEmail: number
    primaryContactPhone: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    description?: true
    primaryContactName?: true
    primaryContactEmail?: true
    primaryContactPhone?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    description?: true
    primaryContactName?: true
    primaryContactEmail?: true
    primaryContactPhone?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    description?: true
    primaryContactName?: true
    primaryContactEmail?: true
    primaryContactPhone?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    code: string
    description: string | null
    primaryContactName: string
    primaryContactEmail: string
    primaryContactPhone: string | null
    status: $Enums.OrganizationStatus
    createdAt: Date
    updatedAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    primaryContactName?: boolean
    primaryContactEmail?: boolean
    primaryContactPhone?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenantLinks?: boolean | Organization$tenantLinksArgs<ExtArgs>
    configs?: boolean | Organization$configsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    primaryContactName?: boolean
    primaryContactEmail?: boolean
    primaryContactPhone?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    primaryContactName?: boolean
    primaryContactEmail?: boolean
    primaryContactPhone?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    primaryContactName?: boolean
    primaryContactEmail?: boolean
    primaryContactPhone?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "description" | "primaryContactName" | "primaryContactEmail" | "primaryContactPhone" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenantLinks?: boolean | Organization$tenantLinksArgs<ExtArgs>
    configs?: boolean | Organization$configsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      tenantLinks: Prisma.$OrganizationTenantPayload<ExtArgs>[]
      configs: Prisma.$OrganizationConfigPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      description: string | null
      primaryContactName: string
      primaryContactEmail: string
      primaryContactPhone: string | null
      status: $Enums.OrganizationStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
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
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenantLinks<T extends Organization$tenantLinksArgs<ExtArgs> = {}>(args?: Subset<T, Organization$tenantLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    configs<T extends Organization$configsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$configsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly code: FieldRef<"Organization", 'String'>
    readonly description: FieldRef<"Organization", 'String'>
    readonly primaryContactName: FieldRef<"Organization", 'String'>
    readonly primaryContactEmail: FieldRef<"Organization", 'String'>
    readonly primaryContactPhone: FieldRef<"Organization", 'String'>
    readonly status: FieldRef<"Organization", 'OrganizationStatus'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.tenantLinks
   */
  export type Organization$tenantLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    where?: OrganizationTenantWhereInput
    orderBy?: OrganizationTenantOrderByWithRelationInput | OrganizationTenantOrderByWithRelationInput[]
    cursor?: OrganizationTenantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationTenantScalarFieldEnum | OrganizationTenantScalarFieldEnum[]
  }

  /**
   * Organization.configs
   */
  export type Organization$configsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    where?: OrganizationConfigWhereInput
    orderBy?: OrganizationConfigOrderByWithRelationInput | OrganizationConfigOrderByWithRelationInput[]
    cursor?: OrganizationConfigWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationConfigScalarFieldEnum | OrganizationConfigScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationConfig
   */

  export type AggregateOrganizationConfig = {
    _count: OrganizationConfigCountAggregateOutputType | null
    _min: OrganizationConfigMinAggregateOutputType | null
    _max: OrganizationConfigMaxAggregateOutputType | null
  }

  export type OrganizationConfigMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    namespace: string | null
    updatedByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationConfigMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    namespace: string | null
    updatedByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationConfigCountAggregateOutputType = {
    id: number
    organizationId: number
    namespace: number
    data: number
    updatedByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationConfigMinAggregateInputType = {
    id?: true
    organizationId?: true
    namespace?: true
    updatedByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationConfigMaxAggregateInputType = {
    id?: true
    organizationId?: true
    namespace?: true
    updatedByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationConfigCountAggregateInputType = {
    id?: true
    organizationId?: true
    namespace?: true
    data?: true
    updatedByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationConfig to aggregate.
     */
    where?: OrganizationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationConfigs to fetch.
     */
    orderBy?: OrganizationConfigOrderByWithRelationInput | OrganizationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationConfigs
    **/
    _count?: true | OrganizationConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationConfigMaxAggregateInputType
  }

  export type GetOrganizationConfigAggregateType<T extends OrganizationConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationConfig[P]>
      : GetScalarType<T[P], AggregateOrganizationConfig[P]>
  }




  export type OrganizationConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationConfigWhereInput
    orderBy?: OrganizationConfigOrderByWithAggregationInput | OrganizationConfigOrderByWithAggregationInput[]
    by: OrganizationConfigScalarFieldEnum[] | OrganizationConfigScalarFieldEnum
    having?: OrganizationConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationConfigCountAggregateInputType | true
    _min?: OrganizationConfigMinAggregateInputType
    _max?: OrganizationConfigMaxAggregateInputType
  }

  export type OrganizationConfigGroupByOutputType = {
    id: string
    organizationId: string
    namespace: string
    data: JsonValue
    updatedByUserId: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrganizationConfigCountAggregateOutputType | null
    _min: OrganizationConfigMinAggregateOutputType | null
    _max: OrganizationConfigMaxAggregateOutputType | null
  }

  type GetOrganizationConfigGroupByPayload<T extends OrganizationConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationConfigGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationConfigGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    namespace?: boolean
    data?: boolean
    updatedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationConfig"]>

  export type OrganizationConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    namespace?: boolean
    data?: boolean
    updatedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationConfig"]>

  export type OrganizationConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    namespace?: boolean
    data?: boolean
    updatedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationConfig"]>

  export type OrganizationConfigSelectScalar = {
    id?: boolean
    organizationId?: boolean
    namespace?: boolean
    data?: boolean
    updatedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "namespace" | "data" | "updatedByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["organizationConfig"]>
  export type OrganizationConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $OrganizationConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationConfig"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      namespace: string
      data: Prisma.JsonValue
      updatedByUserId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organizationConfig"]>
    composites: {}
  }

  type OrganizationConfigGetPayload<S extends boolean | null | undefined | OrganizationConfigDefaultArgs> = $Result.GetResult<Prisma.$OrganizationConfigPayload, S>

  type OrganizationConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationConfigCountAggregateInputType | true
    }

  export interface OrganizationConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationConfig'], meta: { name: 'OrganizationConfig' } }
    /**
     * Find zero or one OrganizationConfig that matches the filter.
     * @param {OrganizationConfigFindUniqueArgs} args - Arguments to find a OrganizationConfig
     * @example
     * // Get one OrganizationConfig
     * const organizationConfig = await prisma.organizationConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationConfigFindUniqueArgs>(args: SelectSubset<T, OrganizationConfigFindUniqueArgs<ExtArgs>>): Prisma__OrganizationConfigClient<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizationConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationConfigFindUniqueOrThrowArgs} args - Arguments to find a OrganizationConfig
     * @example
     * // Get one OrganizationConfig
     * const organizationConfig = await prisma.organizationConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationConfigClient<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationConfigFindFirstArgs} args - Arguments to find a OrganizationConfig
     * @example
     * // Get one OrganizationConfig
     * const organizationConfig = await prisma.organizationConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationConfigFindFirstArgs>(args?: SelectSubset<T, OrganizationConfigFindFirstArgs<ExtArgs>>): Prisma__OrganizationConfigClient<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationConfigFindFirstOrThrowArgs} args - Arguments to find a OrganizationConfig
     * @example
     * // Get one OrganizationConfig
     * const organizationConfig = await prisma.organizationConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationConfigClient<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizationConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationConfigs
     * const organizationConfigs = await prisma.organizationConfig.findMany()
     * 
     * // Get first 10 OrganizationConfigs
     * const organizationConfigs = await prisma.organizationConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationConfigWithIdOnly = await prisma.organizationConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationConfigFindManyArgs>(args?: SelectSubset<T, OrganizationConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizationConfig.
     * @param {OrganizationConfigCreateArgs} args - Arguments to create a OrganizationConfig.
     * @example
     * // Create one OrganizationConfig
     * const OrganizationConfig = await prisma.organizationConfig.create({
     *   data: {
     *     // ... data to create a OrganizationConfig
     *   }
     * })
     * 
     */
    create<T extends OrganizationConfigCreateArgs>(args: SelectSubset<T, OrganizationConfigCreateArgs<ExtArgs>>): Prisma__OrganizationConfigClient<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizationConfigs.
     * @param {OrganizationConfigCreateManyArgs} args - Arguments to create many OrganizationConfigs.
     * @example
     * // Create many OrganizationConfigs
     * const organizationConfig = await prisma.organizationConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationConfigCreateManyArgs>(args?: SelectSubset<T, OrganizationConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationConfigs and returns the data saved in the database.
     * @param {OrganizationConfigCreateManyAndReturnArgs} args - Arguments to create many OrganizationConfigs.
     * @example
     * // Create many OrganizationConfigs
     * const organizationConfig = await prisma.organizationConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationConfigs and only return the `id`
     * const organizationConfigWithIdOnly = await prisma.organizationConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrganizationConfig.
     * @param {OrganizationConfigDeleteArgs} args - Arguments to delete one OrganizationConfig.
     * @example
     * // Delete one OrganizationConfig
     * const OrganizationConfig = await prisma.organizationConfig.delete({
     *   where: {
     *     // ... filter to delete one OrganizationConfig
     *   }
     * })
     * 
     */
    delete<T extends OrganizationConfigDeleteArgs>(args: SelectSubset<T, OrganizationConfigDeleteArgs<ExtArgs>>): Prisma__OrganizationConfigClient<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizationConfig.
     * @param {OrganizationConfigUpdateArgs} args - Arguments to update one OrganizationConfig.
     * @example
     * // Update one OrganizationConfig
     * const organizationConfig = await prisma.organizationConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationConfigUpdateArgs>(args: SelectSubset<T, OrganizationConfigUpdateArgs<ExtArgs>>): Prisma__OrganizationConfigClient<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizationConfigs.
     * @param {OrganizationConfigDeleteManyArgs} args - Arguments to filter OrganizationConfigs to delete.
     * @example
     * // Delete a few OrganizationConfigs
     * const { count } = await prisma.organizationConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationConfigDeleteManyArgs>(args?: SelectSubset<T, OrganizationConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationConfigs
     * const organizationConfig = await prisma.organizationConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationConfigUpdateManyArgs>(args: SelectSubset<T, OrganizationConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationConfigs and returns the data updated in the database.
     * @param {OrganizationConfigUpdateManyAndReturnArgs} args - Arguments to update many OrganizationConfigs.
     * @example
     * // Update many OrganizationConfigs
     * const organizationConfig = await prisma.organizationConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrganizationConfigs and only return the `id`
     * const organizationConfigWithIdOnly = await prisma.organizationConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrganizationConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrganizationConfig.
     * @param {OrganizationConfigUpsertArgs} args - Arguments to update or create a OrganizationConfig.
     * @example
     * // Update or create a OrganizationConfig
     * const organizationConfig = await prisma.organizationConfig.upsert({
     *   create: {
     *     // ... data to create a OrganizationConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationConfig we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationConfigUpsertArgs>(args: SelectSubset<T, OrganizationConfigUpsertArgs<ExtArgs>>): Prisma__OrganizationConfigClient<$Result.GetResult<Prisma.$OrganizationConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizationConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationConfigCountArgs} args - Arguments to filter OrganizationConfigs to count.
     * @example
     * // Count the number of OrganizationConfigs
     * const count = await prisma.organizationConfig.count({
     *   where: {
     *     // ... the filter for the OrganizationConfigs we want to count
     *   }
     * })
    **/
    count<T extends OrganizationConfigCountArgs>(
      args?: Subset<T, OrganizationConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationConfigAggregateArgs>(args: Subset<T, OrganizationConfigAggregateArgs>): Prisma.PrismaPromise<GetOrganizationConfigAggregateType<T>>

    /**
     * Group by OrganizationConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationConfigGroupByArgs} args - Group by arguments.
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
      T extends OrganizationConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationConfigGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationConfig model
   */
  readonly fields: OrganizationConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrganizationConfig model
   */
  interface OrganizationConfigFieldRefs {
    readonly id: FieldRef<"OrganizationConfig", 'String'>
    readonly organizationId: FieldRef<"OrganizationConfig", 'String'>
    readonly namespace: FieldRef<"OrganizationConfig", 'String'>
    readonly data: FieldRef<"OrganizationConfig", 'Json'>
    readonly updatedByUserId: FieldRef<"OrganizationConfig", 'String'>
    readonly createdAt: FieldRef<"OrganizationConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"OrganizationConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationConfig findUnique
   */
  export type OrganizationConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationConfig to fetch.
     */
    where: OrganizationConfigWhereUniqueInput
  }

  /**
   * OrganizationConfig findUniqueOrThrow
   */
  export type OrganizationConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationConfig to fetch.
     */
    where: OrganizationConfigWhereUniqueInput
  }

  /**
   * OrganizationConfig findFirst
   */
  export type OrganizationConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationConfig to fetch.
     */
    where?: OrganizationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationConfigs to fetch.
     */
    orderBy?: OrganizationConfigOrderByWithRelationInput | OrganizationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationConfigs.
     */
    cursor?: OrganizationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationConfigs.
     */
    distinct?: OrganizationConfigScalarFieldEnum | OrganizationConfigScalarFieldEnum[]
  }

  /**
   * OrganizationConfig findFirstOrThrow
   */
  export type OrganizationConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationConfig to fetch.
     */
    where?: OrganizationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationConfigs to fetch.
     */
    orderBy?: OrganizationConfigOrderByWithRelationInput | OrganizationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationConfigs.
     */
    cursor?: OrganizationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationConfigs.
     */
    distinct?: OrganizationConfigScalarFieldEnum | OrganizationConfigScalarFieldEnum[]
  }

  /**
   * OrganizationConfig findMany
   */
  export type OrganizationConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationConfigs to fetch.
     */
    where?: OrganizationConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationConfigs to fetch.
     */
    orderBy?: OrganizationConfigOrderByWithRelationInput | OrganizationConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationConfigs.
     */
    cursor?: OrganizationConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationConfigs.
     */
    skip?: number
    distinct?: OrganizationConfigScalarFieldEnum | OrganizationConfigScalarFieldEnum[]
  }

  /**
   * OrganizationConfig create
   */
  export type OrganizationConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationConfig.
     */
    data: XOR<OrganizationConfigCreateInput, OrganizationConfigUncheckedCreateInput>
  }

  /**
   * OrganizationConfig createMany
   */
  export type OrganizationConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationConfigs.
     */
    data: OrganizationConfigCreateManyInput | OrganizationConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationConfig createManyAndReturn
   */
  export type OrganizationConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * The data used to create many OrganizationConfigs.
     */
    data: OrganizationConfigCreateManyInput | OrganizationConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationConfig update
   */
  export type OrganizationConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationConfig.
     */
    data: XOR<OrganizationConfigUpdateInput, OrganizationConfigUncheckedUpdateInput>
    /**
     * Choose, which OrganizationConfig to update.
     */
    where: OrganizationConfigWhereUniqueInput
  }

  /**
   * OrganizationConfig updateMany
   */
  export type OrganizationConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationConfigs.
     */
    data: XOR<OrganizationConfigUpdateManyMutationInput, OrganizationConfigUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationConfigs to update
     */
    where?: OrganizationConfigWhereInput
    /**
     * Limit how many OrganizationConfigs to update.
     */
    limit?: number
  }

  /**
   * OrganizationConfig updateManyAndReturn
   */
  export type OrganizationConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * The data used to update OrganizationConfigs.
     */
    data: XOR<OrganizationConfigUpdateManyMutationInput, OrganizationConfigUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationConfigs to update
     */
    where?: OrganizationConfigWhereInput
    /**
     * Limit how many OrganizationConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationConfig upsert
   */
  export type OrganizationConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationConfig to update in case it exists.
     */
    where: OrganizationConfigWhereUniqueInput
    /**
     * In case the OrganizationConfig found by the `where` argument doesn't exist, create a new OrganizationConfig with this data.
     */
    create: XOR<OrganizationConfigCreateInput, OrganizationConfigUncheckedCreateInput>
    /**
     * In case the OrganizationConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationConfigUpdateInput, OrganizationConfigUncheckedUpdateInput>
  }

  /**
   * OrganizationConfig delete
   */
  export type OrganizationConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
    /**
     * Filter which OrganizationConfig to delete.
     */
    where: OrganizationConfigWhereUniqueInput
  }

  /**
   * OrganizationConfig deleteMany
   */
  export type OrganizationConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationConfigs to delete
     */
    where?: OrganizationConfigWhereInput
    /**
     * Limit how many OrganizationConfigs to delete.
     */
    limit?: number
  }

  /**
   * OrganizationConfig without action
   */
  export type OrganizationConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationConfig
     */
    select?: OrganizationConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationConfig
     */
    omit?: OrganizationConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationConfigInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationTenant
   */

  export type AggregateOrganizationTenant = {
    _count: OrganizationTenantCountAggregateOutputType | null
    _min: OrganizationTenantMinAggregateOutputType | null
    _max: OrganizationTenantMaxAggregateOutputType | null
  }

  export type OrganizationTenantMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    tenantId: string | null
    createdAt: Date | null
  }

  export type OrganizationTenantMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    tenantId: string | null
    createdAt: Date | null
  }

  export type OrganizationTenantCountAggregateOutputType = {
    id: number
    organizationId: number
    tenantId: number
    createdAt: number
    _all: number
  }


  export type OrganizationTenantMinAggregateInputType = {
    id?: true
    organizationId?: true
    tenantId?: true
    createdAt?: true
  }

  export type OrganizationTenantMaxAggregateInputType = {
    id?: true
    organizationId?: true
    tenantId?: true
    createdAt?: true
  }

  export type OrganizationTenantCountAggregateInputType = {
    id?: true
    organizationId?: true
    tenantId?: true
    createdAt?: true
    _all?: true
  }

  export type OrganizationTenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationTenant to aggregate.
     */
    where?: OrganizationTenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationTenants to fetch.
     */
    orderBy?: OrganizationTenantOrderByWithRelationInput | OrganizationTenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationTenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationTenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationTenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationTenants
    **/
    _count?: true | OrganizationTenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationTenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationTenantMaxAggregateInputType
  }

  export type GetOrganizationTenantAggregateType<T extends OrganizationTenantAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationTenant[P]>
      : GetScalarType<T[P], AggregateOrganizationTenant[P]>
  }




  export type OrganizationTenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationTenantWhereInput
    orderBy?: OrganizationTenantOrderByWithAggregationInput | OrganizationTenantOrderByWithAggregationInput[]
    by: OrganizationTenantScalarFieldEnum[] | OrganizationTenantScalarFieldEnum
    having?: OrganizationTenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationTenantCountAggregateInputType | true
    _min?: OrganizationTenantMinAggregateInputType
    _max?: OrganizationTenantMaxAggregateInputType
  }

  export type OrganizationTenantGroupByOutputType = {
    id: string
    organizationId: string
    tenantId: string
    createdAt: Date
    _count: OrganizationTenantCountAggregateOutputType | null
    _min: OrganizationTenantMinAggregateOutputType | null
    _max: OrganizationTenantMaxAggregateOutputType | null
  }

  type GetOrganizationTenantGroupByPayload<T extends OrganizationTenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationTenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationTenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationTenantGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationTenantGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationTenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationTenant"]>

  export type OrganizationTenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationTenant"]>

  export type OrganizationTenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    tenantId?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationTenant"]>

  export type OrganizationTenantSelectScalar = {
    id?: boolean
    organizationId?: boolean
    tenantId?: boolean
    createdAt?: boolean
  }

  export type OrganizationTenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organizationId" | "tenantId" | "createdAt", ExtArgs["result"]["organizationTenant"]>
  export type OrganizationTenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationTenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationTenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $OrganizationTenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationTenant"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      tenantId: string
      createdAt: Date
    }, ExtArgs["result"]["organizationTenant"]>
    composites: {}
  }

  type OrganizationTenantGetPayload<S extends boolean | null | undefined | OrganizationTenantDefaultArgs> = $Result.GetResult<Prisma.$OrganizationTenantPayload, S>

  type OrganizationTenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationTenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationTenantCountAggregateInputType | true
    }

  export interface OrganizationTenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationTenant'], meta: { name: 'OrganizationTenant' } }
    /**
     * Find zero or one OrganizationTenant that matches the filter.
     * @param {OrganizationTenantFindUniqueArgs} args - Arguments to find a OrganizationTenant
     * @example
     * // Get one OrganizationTenant
     * const organizationTenant = await prisma.organizationTenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationTenantFindUniqueArgs>(args: SelectSubset<T, OrganizationTenantFindUniqueArgs<ExtArgs>>): Prisma__OrganizationTenantClient<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrganizationTenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationTenantFindUniqueOrThrowArgs} args - Arguments to find a OrganizationTenant
     * @example
     * // Get one OrganizationTenant
     * const organizationTenant = await prisma.organizationTenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationTenantFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationTenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationTenantClient<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationTenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationTenantFindFirstArgs} args - Arguments to find a OrganizationTenant
     * @example
     * // Get one OrganizationTenant
     * const organizationTenant = await prisma.organizationTenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationTenantFindFirstArgs>(args?: SelectSubset<T, OrganizationTenantFindFirstArgs<ExtArgs>>): Prisma__OrganizationTenantClient<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrganizationTenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationTenantFindFirstOrThrowArgs} args - Arguments to find a OrganizationTenant
     * @example
     * // Get one OrganizationTenant
     * const organizationTenant = await prisma.organizationTenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationTenantFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationTenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationTenantClient<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrganizationTenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationTenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationTenants
     * const organizationTenants = await prisma.organizationTenant.findMany()
     * 
     * // Get first 10 OrganizationTenants
     * const organizationTenants = await prisma.organizationTenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationTenantWithIdOnly = await prisma.organizationTenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationTenantFindManyArgs>(args?: SelectSubset<T, OrganizationTenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrganizationTenant.
     * @param {OrganizationTenantCreateArgs} args - Arguments to create a OrganizationTenant.
     * @example
     * // Create one OrganizationTenant
     * const OrganizationTenant = await prisma.organizationTenant.create({
     *   data: {
     *     // ... data to create a OrganizationTenant
     *   }
     * })
     * 
     */
    create<T extends OrganizationTenantCreateArgs>(args: SelectSubset<T, OrganizationTenantCreateArgs<ExtArgs>>): Prisma__OrganizationTenantClient<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrganizationTenants.
     * @param {OrganizationTenantCreateManyArgs} args - Arguments to create many OrganizationTenants.
     * @example
     * // Create many OrganizationTenants
     * const organizationTenant = await prisma.organizationTenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationTenantCreateManyArgs>(args?: SelectSubset<T, OrganizationTenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationTenants and returns the data saved in the database.
     * @param {OrganizationTenantCreateManyAndReturnArgs} args - Arguments to create many OrganizationTenants.
     * @example
     * // Create many OrganizationTenants
     * const organizationTenant = await prisma.organizationTenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationTenants and only return the `id`
     * const organizationTenantWithIdOnly = await prisma.organizationTenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationTenantCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationTenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrganizationTenant.
     * @param {OrganizationTenantDeleteArgs} args - Arguments to delete one OrganizationTenant.
     * @example
     * // Delete one OrganizationTenant
     * const OrganizationTenant = await prisma.organizationTenant.delete({
     *   where: {
     *     // ... filter to delete one OrganizationTenant
     *   }
     * })
     * 
     */
    delete<T extends OrganizationTenantDeleteArgs>(args: SelectSubset<T, OrganizationTenantDeleteArgs<ExtArgs>>): Prisma__OrganizationTenantClient<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrganizationTenant.
     * @param {OrganizationTenantUpdateArgs} args - Arguments to update one OrganizationTenant.
     * @example
     * // Update one OrganizationTenant
     * const organizationTenant = await prisma.organizationTenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationTenantUpdateArgs>(args: SelectSubset<T, OrganizationTenantUpdateArgs<ExtArgs>>): Prisma__OrganizationTenantClient<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrganizationTenants.
     * @param {OrganizationTenantDeleteManyArgs} args - Arguments to filter OrganizationTenants to delete.
     * @example
     * // Delete a few OrganizationTenants
     * const { count } = await prisma.organizationTenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationTenantDeleteManyArgs>(args?: SelectSubset<T, OrganizationTenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationTenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationTenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationTenants
     * const organizationTenant = await prisma.organizationTenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationTenantUpdateManyArgs>(args: SelectSubset<T, OrganizationTenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationTenants and returns the data updated in the database.
     * @param {OrganizationTenantUpdateManyAndReturnArgs} args - Arguments to update many OrganizationTenants.
     * @example
     * // Update many OrganizationTenants
     * const organizationTenant = await prisma.organizationTenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrganizationTenants and only return the `id`
     * const organizationTenantWithIdOnly = await prisma.organizationTenant.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrganizationTenantUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationTenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrganizationTenant.
     * @param {OrganizationTenantUpsertArgs} args - Arguments to update or create a OrganizationTenant.
     * @example
     * // Update or create a OrganizationTenant
     * const organizationTenant = await prisma.organizationTenant.upsert({
     *   create: {
     *     // ... data to create a OrganizationTenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationTenant we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationTenantUpsertArgs>(args: SelectSubset<T, OrganizationTenantUpsertArgs<ExtArgs>>): Prisma__OrganizationTenantClient<$Result.GetResult<Prisma.$OrganizationTenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrganizationTenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationTenantCountArgs} args - Arguments to filter OrganizationTenants to count.
     * @example
     * // Count the number of OrganizationTenants
     * const count = await prisma.organizationTenant.count({
     *   where: {
     *     // ... the filter for the OrganizationTenants we want to count
     *   }
     * })
    **/
    count<T extends OrganizationTenantCountArgs>(
      args?: Subset<T, OrganizationTenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationTenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationTenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationTenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrganizationTenantAggregateArgs>(args: Subset<T, OrganizationTenantAggregateArgs>): Prisma.PrismaPromise<GetOrganizationTenantAggregateType<T>>

    /**
     * Group by OrganizationTenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationTenantGroupByArgs} args - Group by arguments.
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
      T extends OrganizationTenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationTenantGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationTenantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrganizationTenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationTenant model
   */
  readonly fields: OrganizationTenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationTenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationTenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrganizationTenant model
   */
  interface OrganizationTenantFieldRefs {
    readonly id: FieldRef<"OrganizationTenant", 'String'>
    readonly organizationId: FieldRef<"OrganizationTenant", 'String'>
    readonly tenantId: FieldRef<"OrganizationTenant", 'String'>
    readonly createdAt: FieldRef<"OrganizationTenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationTenant findUnique
   */
  export type OrganizationTenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationTenant to fetch.
     */
    where: OrganizationTenantWhereUniqueInput
  }

  /**
   * OrganizationTenant findUniqueOrThrow
   */
  export type OrganizationTenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationTenant to fetch.
     */
    where: OrganizationTenantWhereUniqueInput
  }

  /**
   * OrganizationTenant findFirst
   */
  export type OrganizationTenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationTenant to fetch.
     */
    where?: OrganizationTenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationTenants to fetch.
     */
    orderBy?: OrganizationTenantOrderByWithRelationInput | OrganizationTenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationTenants.
     */
    cursor?: OrganizationTenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationTenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationTenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationTenants.
     */
    distinct?: OrganizationTenantScalarFieldEnum | OrganizationTenantScalarFieldEnum[]
  }

  /**
   * OrganizationTenant findFirstOrThrow
   */
  export type OrganizationTenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationTenant to fetch.
     */
    where?: OrganizationTenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationTenants to fetch.
     */
    orderBy?: OrganizationTenantOrderByWithRelationInput | OrganizationTenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationTenants.
     */
    cursor?: OrganizationTenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationTenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationTenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationTenants.
     */
    distinct?: OrganizationTenantScalarFieldEnum | OrganizationTenantScalarFieldEnum[]
  }

  /**
   * OrganizationTenant findMany
   */
  export type OrganizationTenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationTenants to fetch.
     */
    where?: OrganizationTenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationTenants to fetch.
     */
    orderBy?: OrganizationTenantOrderByWithRelationInput | OrganizationTenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationTenants.
     */
    cursor?: OrganizationTenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationTenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationTenants.
     */
    skip?: number
    distinct?: OrganizationTenantScalarFieldEnum | OrganizationTenantScalarFieldEnum[]
  }

  /**
   * OrganizationTenant create
   */
  export type OrganizationTenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationTenant.
     */
    data: XOR<OrganizationTenantCreateInput, OrganizationTenantUncheckedCreateInput>
  }

  /**
   * OrganizationTenant createMany
   */
  export type OrganizationTenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationTenants.
     */
    data: OrganizationTenantCreateManyInput | OrganizationTenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationTenant createManyAndReturn
   */
  export type OrganizationTenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * The data used to create many OrganizationTenants.
     */
    data: OrganizationTenantCreateManyInput | OrganizationTenantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationTenant update
   */
  export type OrganizationTenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationTenant.
     */
    data: XOR<OrganizationTenantUpdateInput, OrganizationTenantUncheckedUpdateInput>
    /**
     * Choose, which OrganizationTenant to update.
     */
    where: OrganizationTenantWhereUniqueInput
  }

  /**
   * OrganizationTenant updateMany
   */
  export type OrganizationTenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationTenants.
     */
    data: XOR<OrganizationTenantUpdateManyMutationInput, OrganizationTenantUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationTenants to update
     */
    where?: OrganizationTenantWhereInput
    /**
     * Limit how many OrganizationTenants to update.
     */
    limit?: number
  }

  /**
   * OrganizationTenant updateManyAndReturn
   */
  export type OrganizationTenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * The data used to update OrganizationTenants.
     */
    data: XOR<OrganizationTenantUpdateManyMutationInput, OrganizationTenantUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationTenants to update
     */
    where?: OrganizationTenantWhereInput
    /**
     * Limit how many OrganizationTenants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationTenant upsert
   */
  export type OrganizationTenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationTenant to update in case it exists.
     */
    where: OrganizationTenantWhereUniqueInput
    /**
     * In case the OrganizationTenant found by the `where` argument doesn't exist, create a new OrganizationTenant with this data.
     */
    create: XOR<OrganizationTenantCreateInput, OrganizationTenantUncheckedCreateInput>
    /**
     * In case the OrganizationTenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationTenantUpdateInput, OrganizationTenantUncheckedUpdateInput>
  }

  /**
   * OrganizationTenant delete
   */
  export type OrganizationTenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
    /**
     * Filter which OrganizationTenant to delete.
     */
    where: OrganizationTenantWhereUniqueInput
  }

  /**
   * OrganizationTenant deleteMany
   */
  export type OrganizationTenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationTenants to delete
     */
    where?: OrganizationTenantWhereInput
    /**
     * Limit how many OrganizationTenants to delete.
     */
    limit?: number
  }

  /**
   * OrganizationTenant without action
   */
  export type OrganizationTenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationTenant
     */
    select?: OrganizationTenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrganizationTenant
     */
    omit?: OrganizationTenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationTenantInclude<ExtArgs> | null
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


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    description: 'description',
    primaryContactName: 'primaryContactName',
    primaryContactEmail: 'primaryContactEmail',
    primaryContactPhone: 'primaryContactPhone',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const OrganizationConfigScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    namespace: 'namespace',
    data: 'data',
    updatedByUserId: 'updatedByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationConfigScalarFieldEnum = (typeof OrganizationConfigScalarFieldEnum)[keyof typeof OrganizationConfigScalarFieldEnum]


  export const OrganizationTenantScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    tenantId: 'tenantId',
    createdAt: 'createdAt'
  };

  export type OrganizationTenantScalarFieldEnum = (typeof OrganizationTenantScalarFieldEnum)[keyof typeof OrganizationTenantScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'OrganizationStatus'
   */
  export type EnumOrganizationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrganizationStatus'>
    


  /**
   * Reference to a field of type 'OrganizationStatus[]'
   */
  export type ListEnumOrganizationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrganizationStatus[]'>
    


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


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    code?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    primaryContactName?: StringFilter<"Organization"> | string
    primaryContactEmail?: StringFilter<"Organization"> | string
    primaryContactPhone?: StringNullableFilter<"Organization"> | string | null
    status?: EnumOrganizationStatusFilter<"Organization"> | $Enums.OrganizationStatus
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    tenantLinks?: OrganizationTenantListRelationFilter
    configs?: OrganizationConfigListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrderInput | SortOrder
    primaryContactName?: SortOrder
    primaryContactEmail?: SortOrder
    primaryContactPhone?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenantLinks?: OrganizationTenantOrderByRelationAggregateInput
    configs?: OrganizationConfigOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    primaryContactName?: StringFilter<"Organization"> | string
    primaryContactEmail?: StringFilter<"Organization"> | string
    primaryContactPhone?: StringNullableFilter<"Organization"> | string | null
    status?: EnumOrganizationStatusFilter<"Organization"> | $Enums.OrganizationStatus
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    tenantLinks?: OrganizationTenantListRelationFilter
    configs?: OrganizationConfigListRelationFilter
  }, "id" | "code">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrderInput | SortOrder
    primaryContactName?: SortOrder
    primaryContactEmail?: SortOrder
    primaryContactPhone?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    code?: StringWithAggregatesFilter<"Organization"> | string
    description?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    primaryContactName?: StringWithAggregatesFilter<"Organization"> | string
    primaryContactEmail?: StringWithAggregatesFilter<"Organization"> | string
    primaryContactPhone?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    status?: EnumOrganizationStatusWithAggregatesFilter<"Organization"> | $Enums.OrganizationStatus
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type OrganizationConfigWhereInput = {
    AND?: OrganizationConfigWhereInput | OrganizationConfigWhereInput[]
    OR?: OrganizationConfigWhereInput[]
    NOT?: OrganizationConfigWhereInput | OrganizationConfigWhereInput[]
    id?: StringFilter<"OrganizationConfig"> | string
    organizationId?: StringFilter<"OrganizationConfig"> | string
    namespace?: StringFilter<"OrganizationConfig"> | string
    data?: JsonFilter<"OrganizationConfig">
    updatedByUserId?: StringNullableFilter<"OrganizationConfig"> | string | null
    createdAt?: DateTimeFilter<"OrganizationConfig"> | Date | string
    updatedAt?: DateTimeFilter<"OrganizationConfig"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type OrganizationConfigOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    namespace?: SortOrder
    data?: SortOrder
    updatedByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type OrganizationConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizationId_namespace?: OrganizationConfigOrganizationIdNamespaceCompoundUniqueInput
    AND?: OrganizationConfigWhereInput | OrganizationConfigWhereInput[]
    OR?: OrganizationConfigWhereInput[]
    NOT?: OrganizationConfigWhereInput | OrganizationConfigWhereInput[]
    organizationId?: StringFilter<"OrganizationConfig"> | string
    namespace?: StringFilter<"OrganizationConfig"> | string
    data?: JsonFilter<"OrganizationConfig">
    updatedByUserId?: StringNullableFilter<"OrganizationConfig"> | string | null
    createdAt?: DateTimeFilter<"OrganizationConfig"> | Date | string
    updatedAt?: DateTimeFilter<"OrganizationConfig"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "organizationId_namespace">

  export type OrganizationConfigOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    namespace?: SortOrder
    data?: SortOrder
    updatedByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationConfigCountOrderByAggregateInput
    _max?: OrganizationConfigMaxOrderByAggregateInput
    _min?: OrganizationConfigMinOrderByAggregateInput
  }

  export type OrganizationConfigScalarWhereWithAggregatesInput = {
    AND?: OrganizationConfigScalarWhereWithAggregatesInput | OrganizationConfigScalarWhereWithAggregatesInput[]
    OR?: OrganizationConfigScalarWhereWithAggregatesInput[]
    NOT?: OrganizationConfigScalarWhereWithAggregatesInput | OrganizationConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizationConfig"> | string
    organizationId?: StringWithAggregatesFilter<"OrganizationConfig"> | string
    namespace?: StringWithAggregatesFilter<"OrganizationConfig"> | string
    data?: JsonWithAggregatesFilter<"OrganizationConfig">
    updatedByUserId?: StringNullableWithAggregatesFilter<"OrganizationConfig"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrganizationConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OrganizationConfig"> | Date | string
  }

  export type OrganizationTenantWhereInput = {
    AND?: OrganizationTenantWhereInput | OrganizationTenantWhereInput[]
    OR?: OrganizationTenantWhereInput[]
    NOT?: OrganizationTenantWhereInput | OrganizationTenantWhereInput[]
    id?: StringFilter<"OrganizationTenant"> | string
    organizationId?: StringFilter<"OrganizationTenant"> | string
    tenantId?: StringFilter<"OrganizationTenant"> | string
    createdAt?: DateTimeFilter<"OrganizationTenant"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type OrganizationTenantOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type OrganizationTenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId?: string
    organizationId_tenantId?: OrganizationTenantOrganizationIdTenantIdCompoundUniqueInput
    AND?: OrganizationTenantWhereInput | OrganizationTenantWhereInput[]
    OR?: OrganizationTenantWhereInput[]
    NOT?: OrganizationTenantWhereInput | OrganizationTenantWhereInput[]
    organizationId?: StringFilter<"OrganizationTenant"> | string
    createdAt?: DateTimeFilter<"OrganizationTenant"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "organizationId_tenantId" | "tenantId">

  export type OrganizationTenantOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
    _count?: OrganizationTenantCountOrderByAggregateInput
    _max?: OrganizationTenantMaxOrderByAggregateInput
    _min?: OrganizationTenantMinOrderByAggregateInput
  }

  export type OrganizationTenantScalarWhereWithAggregatesInput = {
    AND?: OrganizationTenantScalarWhereWithAggregatesInput | OrganizationTenantScalarWhereWithAggregatesInput[]
    OR?: OrganizationTenantScalarWhereWithAggregatesInput[]
    NOT?: OrganizationTenantScalarWhereWithAggregatesInput | OrganizationTenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizationTenant"> | string
    organizationId?: StringWithAggregatesFilter<"OrganizationTenant"> | string
    tenantId?: StringWithAggregatesFilter<"OrganizationTenant"> | string
    createdAt?: DateTimeWithAggregatesFilter<"OrganizationTenant"> | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    code: string
    description?: string | null
    primaryContactName: string
    primaryContactEmail: string
    primaryContactPhone?: string | null
    status?: $Enums.OrganizationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantLinks?: OrganizationTenantCreateNestedManyWithoutOrganizationInput
    configs?: OrganizationConfigCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    description?: string | null
    primaryContactName: string
    primaryContactEmail: string
    primaryContactPhone?: string | null
    status?: $Enums.OrganizationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantLinks?: OrganizationTenantUncheckedCreateNestedManyWithoutOrganizationInput
    configs?: OrganizationConfigUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContactName?: StringFieldUpdateOperationsInput | string
    primaryContactEmail?: StringFieldUpdateOperationsInput | string
    primaryContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrganizationStatusFieldUpdateOperationsInput | $Enums.OrganizationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantLinks?: OrganizationTenantUpdateManyWithoutOrganizationNestedInput
    configs?: OrganizationConfigUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContactName?: StringFieldUpdateOperationsInput | string
    primaryContactEmail?: StringFieldUpdateOperationsInput | string
    primaryContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrganizationStatusFieldUpdateOperationsInput | $Enums.OrganizationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantLinks?: OrganizationTenantUncheckedUpdateManyWithoutOrganizationNestedInput
    configs?: OrganizationConfigUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    code: string
    description?: string | null
    primaryContactName: string
    primaryContactEmail: string
    primaryContactPhone?: string | null
    status?: $Enums.OrganizationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContactName?: StringFieldUpdateOperationsInput | string
    primaryContactEmail?: StringFieldUpdateOperationsInput | string
    primaryContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrganizationStatusFieldUpdateOperationsInput | $Enums.OrganizationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContactName?: StringFieldUpdateOperationsInput | string
    primaryContactEmail?: StringFieldUpdateOperationsInput | string
    primaryContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrganizationStatusFieldUpdateOperationsInput | $Enums.OrganizationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationConfigCreateInput = {
    id?: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutConfigsInput
  }

  export type OrganizationConfigUncheckedCreateInput = {
    id?: string
    organizationId: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutConfigsNestedInput
  }

  export type OrganizationConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationConfigCreateManyInput = {
    id?: string
    organizationId: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationTenantCreateInput = {
    id?: string
    tenantId: string
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutTenantLinksInput
  }

  export type OrganizationTenantUncheckedCreateInput = {
    id?: string
    organizationId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type OrganizationTenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutTenantLinksNestedInput
  }

  export type OrganizationTenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationTenantCreateManyInput = {
    id?: string
    organizationId: string
    tenantId: string
    createdAt?: Date | string
  }

  export type OrganizationTenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationTenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
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

  export type EnumOrganizationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationStatus | EnumOrganizationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrganizationStatus[] | ListEnumOrganizationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrganizationStatus[] | ListEnumOrganizationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrganizationStatusFilter<$PrismaModel> | $Enums.OrganizationStatus
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

  export type OrganizationTenantListRelationFilter = {
    every?: OrganizationTenantWhereInput
    some?: OrganizationTenantWhereInput
    none?: OrganizationTenantWhereInput
  }

  export type OrganizationConfigListRelationFilter = {
    every?: OrganizationConfigWhereInput
    some?: OrganizationConfigWhereInput
    none?: OrganizationConfigWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrganizationTenantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationConfigOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    primaryContactName?: SortOrder
    primaryContactEmail?: SortOrder
    primaryContactPhone?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    primaryContactName?: SortOrder
    primaryContactEmail?: SortOrder
    primaryContactPhone?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    primaryContactName?: SortOrder
    primaryContactEmail?: SortOrder
    primaryContactPhone?: SortOrder
    status?: SortOrder
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

  export type EnumOrganizationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationStatus | EnumOrganizationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrganizationStatus[] | ListEnumOrganizationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrganizationStatus[] | ListEnumOrganizationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrganizationStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrganizationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrganizationStatusFilter<$PrismaModel>
    _max?: NestedEnumOrganizationStatusFilter<$PrismaModel>
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

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type OrganizationConfigOrganizationIdNamespaceCompoundUniqueInput = {
    organizationId: string
    namespace: string
  }

  export type OrganizationConfigCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    namespace?: SortOrder
    data?: SortOrder
    updatedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    namespace?: SortOrder
    updatedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationConfigMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    namespace?: SortOrder
    updatedByUserId?: SortOrder
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

  export type OrganizationTenantOrganizationIdTenantIdCompoundUniqueInput = {
    organizationId: string
    tenantId: string
  }

  export type OrganizationTenantCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationTenantMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationTenantMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    tenantId?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationTenantCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationTenantCreateWithoutOrganizationInput, OrganizationTenantUncheckedCreateWithoutOrganizationInput> | OrganizationTenantCreateWithoutOrganizationInput[] | OrganizationTenantUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationTenantCreateOrConnectWithoutOrganizationInput | OrganizationTenantCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationTenantCreateManyOrganizationInputEnvelope
    connect?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
  }

  export type OrganizationConfigCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationConfigCreateWithoutOrganizationInput, OrganizationConfigUncheckedCreateWithoutOrganizationInput> | OrganizationConfigCreateWithoutOrganizationInput[] | OrganizationConfigUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationConfigCreateOrConnectWithoutOrganizationInput | OrganizationConfigCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationConfigCreateManyOrganizationInputEnvelope
    connect?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
  }

  export type OrganizationTenantUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationTenantCreateWithoutOrganizationInput, OrganizationTenantUncheckedCreateWithoutOrganizationInput> | OrganizationTenantCreateWithoutOrganizationInput[] | OrganizationTenantUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationTenantCreateOrConnectWithoutOrganizationInput | OrganizationTenantCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationTenantCreateManyOrganizationInputEnvelope
    connect?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
  }

  export type OrganizationConfigUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationConfigCreateWithoutOrganizationInput, OrganizationConfigUncheckedCreateWithoutOrganizationInput> | OrganizationConfigCreateWithoutOrganizationInput[] | OrganizationConfigUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationConfigCreateOrConnectWithoutOrganizationInput | OrganizationConfigCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationConfigCreateManyOrganizationInputEnvelope
    connect?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumOrganizationStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrganizationStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrganizationTenantUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationTenantCreateWithoutOrganizationInput, OrganizationTenantUncheckedCreateWithoutOrganizationInput> | OrganizationTenantCreateWithoutOrganizationInput[] | OrganizationTenantUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationTenantCreateOrConnectWithoutOrganizationInput | OrganizationTenantCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationTenantUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationTenantUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationTenantCreateManyOrganizationInputEnvelope
    set?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
    disconnect?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
    delete?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
    connect?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
    update?: OrganizationTenantUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationTenantUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationTenantUpdateManyWithWhereWithoutOrganizationInput | OrganizationTenantUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationTenantScalarWhereInput | OrganizationTenantScalarWhereInput[]
  }

  export type OrganizationConfigUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationConfigCreateWithoutOrganizationInput, OrganizationConfigUncheckedCreateWithoutOrganizationInput> | OrganizationConfigCreateWithoutOrganizationInput[] | OrganizationConfigUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationConfigCreateOrConnectWithoutOrganizationInput | OrganizationConfigCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationConfigUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationConfigUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationConfigCreateManyOrganizationInputEnvelope
    set?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
    disconnect?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
    delete?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
    connect?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
    update?: OrganizationConfigUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationConfigUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationConfigUpdateManyWithWhereWithoutOrganizationInput | OrganizationConfigUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationConfigScalarWhereInput | OrganizationConfigScalarWhereInput[]
  }

  export type OrganizationTenantUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationTenantCreateWithoutOrganizationInput, OrganizationTenantUncheckedCreateWithoutOrganizationInput> | OrganizationTenantCreateWithoutOrganizationInput[] | OrganizationTenantUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationTenantCreateOrConnectWithoutOrganizationInput | OrganizationTenantCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationTenantUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationTenantUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationTenantCreateManyOrganizationInputEnvelope
    set?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
    disconnect?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
    delete?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
    connect?: OrganizationTenantWhereUniqueInput | OrganizationTenantWhereUniqueInput[]
    update?: OrganizationTenantUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationTenantUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationTenantUpdateManyWithWhereWithoutOrganizationInput | OrganizationTenantUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationTenantScalarWhereInput | OrganizationTenantScalarWhereInput[]
  }

  export type OrganizationConfigUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationConfigCreateWithoutOrganizationInput, OrganizationConfigUncheckedCreateWithoutOrganizationInput> | OrganizationConfigCreateWithoutOrganizationInput[] | OrganizationConfigUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationConfigCreateOrConnectWithoutOrganizationInput | OrganizationConfigCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationConfigUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationConfigUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationConfigCreateManyOrganizationInputEnvelope
    set?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
    disconnect?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
    delete?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
    connect?: OrganizationConfigWhereUniqueInput | OrganizationConfigWhereUniqueInput[]
    update?: OrganizationConfigUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationConfigUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationConfigUpdateManyWithWhereWithoutOrganizationInput | OrganizationConfigUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationConfigScalarWhereInput | OrganizationConfigScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutConfigsInput = {
    create?: XOR<OrganizationCreateWithoutConfigsInput, OrganizationUncheckedCreateWithoutConfigsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutConfigsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutConfigsNestedInput = {
    create?: XOR<OrganizationCreateWithoutConfigsInput, OrganizationUncheckedCreateWithoutConfigsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutConfigsInput
    upsert?: OrganizationUpsertWithoutConfigsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutConfigsInput, OrganizationUpdateWithoutConfigsInput>, OrganizationUncheckedUpdateWithoutConfigsInput>
  }

  export type OrganizationCreateNestedOneWithoutTenantLinksInput = {
    create?: XOR<OrganizationCreateWithoutTenantLinksInput, OrganizationUncheckedCreateWithoutTenantLinksInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTenantLinksInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutTenantLinksNestedInput = {
    create?: XOR<OrganizationCreateWithoutTenantLinksInput, OrganizationUncheckedCreateWithoutTenantLinksInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutTenantLinksInput
    upsert?: OrganizationUpsertWithoutTenantLinksInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutTenantLinksInput, OrganizationUpdateWithoutTenantLinksInput>, OrganizationUncheckedUpdateWithoutTenantLinksInput>
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

  export type NestedEnumOrganizationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationStatus | EnumOrganizationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrganizationStatus[] | ListEnumOrganizationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrganizationStatus[] | ListEnumOrganizationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrganizationStatusFilter<$PrismaModel> | $Enums.OrganizationStatus
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

  export type NestedEnumOrganizationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrganizationStatus | EnumOrganizationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrganizationStatus[] | ListEnumOrganizationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrganizationStatus[] | ListEnumOrganizationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrganizationStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrganizationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrganizationStatusFilter<$PrismaModel>
    _max?: NestedEnumOrganizationStatusFilter<$PrismaModel>
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

  export type OrganizationTenantCreateWithoutOrganizationInput = {
    id?: string
    tenantId: string
    createdAt?: Date | string
  }

  export type OrganizationTenantUncheckedCreateWithoutOrganizationInput = {
    id?: string
    tenantId: string
    createdAt?: Date | string
  }

  export type OrganizationTenantCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationTenantWhereUniqueInput
    create: XOR<OrganizationTenantCreateWithoutOrganizationInput, OrganizationTenantUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationTenantCreateManyOrganizationInputEnvelope = {
    data: OrganizationTenantCreateManyOrganizationInput | OrganizationTenantCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationConfigCreateWithoutOrganizationInput = {
    id?: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationConfigUncheckedCreateWithoutOrganizationInput = {
    id?: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationConfigCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationConfigWhereUniqueInput
    create: XOR<OrganizationConfigCreateWithoutOrganizationInput, OrganizationConfigUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationConfigCreateManyOrganizationInputEnvelope = {
    data: OrganizationConfigCreateManyOrganizationInput | OrganizationConfigCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationTenantUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationTenantWhereUniqueInput
    update: XOR<OrganizationTenantUpdateWithoutOrganizationInput, OrganizationTenantUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationTenantCreateWithoutOrganizationInput, OrganizationTenantUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationTenantUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationTenantWhereUniqueInput
    data: XOR<OrganizationTenantUpdateWithoutOrganizationInput, OrganizationTenantUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationTenantUpdateManyWithWhereWithoutOrganizationInput = {
    where: OrganizationTenantScalarWhereInput
    data: XOR<OrganizationTenantUpdateManyMutationInput, OrganizationTenantUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type OrganizationTenantScalarWhereInput = {
    AND?: OrganizationTenantScalarWhereInput | OrganizationTenantScalarWhereInput[]
    OR?: OrganizationTenantScalarWhereInput[]
    NOT?: OrganizationTenantScalarWhereInput | OrganizationTenantScalarWhereInput[]
    id?: StringFilter<"OrganizationTenant"> | string
    organizationId?: StringFilter<"OrganizationTenant"> | string
    tenantId?: StringFilter<"OrganizationTenant"> | string
    createdAt?: DateTimeFilter<"OrganizationTenant"> | Date | string
  }

  export type OrganizationConfigUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationConfigWhereUniqueInput
    update: XOR<OrganizationConfigUpdateWithoutOrganizationInput, OrganizationConfigUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationConfigCreateWithoutOrganizationInput, OrganizationConfigUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationConfigUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationConfigWhereUniqueInput
    data: XOR<OrganizationConfigUpdateWithoutOrganizationInput, OrganizationConfigUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationConfigUpdateManyWithWhereWithoutOrganizationInput = {
    where: OrganizationConfigScalarWhereInput
    data: XOR<OrganizationConfigUpdateManyMutationInput, OrganizationConfigUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type OrganizationConfigScalarWhereInput = {
    AND?: OrganizationConfigScalarWhereInput | OrganizationConfigScalarWhereInput[]
    OR?: OrganizationConfigScalarWhereInput[]
    NOT?: OrganizationConfigScalarWhereInput | OrganizationConfigScalarWhereInput[]
    id?: StringFilter<"OrganizationConfig"> | string
    organizationId?: StringFilter<"OrganizationConfig"> | string
    namespace?: StringFilter<"OrganizationConfig"> | string
    data?: JsonFilter<"OrganizationConfig">
    updatedByUserId?: StringNullableFilter<"OrganizationConfig"> | string | null
    createdAt?: DateTimeFilter<"OrganizationConfig"> | Date | string
    updatedAt?: DateTimeFilter<"OrganizationConfig"> | Date | string
  }

  export type OrganizationCreateWithoutConfigsInput = {
    id?: string
    name: string
    code: string
    description?: string | null
    primaryContactName: string
    primaryContactEmail: string
    primaryContactPhone?: string | null
    status?: $Enums.OrganizationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantLinks?: OrganizationTenantCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutConfigsInput = {
    id?: string
    name: string
    code: string
    description?: string | null
    primaryContactName: string
    primaryContactEmail: string
    primaryContactPhone?: string | null
    status?: $Enums.OrganizationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    tenantLinks?: OrganizationTenantUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutConfigsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutConfigsInput, OrganizationUncheckedCreateWithoutConfigsInput>
  }

  export type OrganizationUpsertWithoutConfigsInput = {
    update: XOR<OrganizationUpdateWithoutConfigsInput, OrganizationUncheckedUpdateWithoutConfigsInput>
    create: XOR<OrganizationCreateWithoutConfigsInput, OrganizationUncheckedCreateWithoutConfigsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutConfigsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutConfigsInput, OrganizationUncheckedUpdateWithoutConfigsInput>
  }

  export type OrganizationUpdateWithoutConfigsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContactName?: StringFieldUpdateOperationsInput | string
    primaryContactEmail?: StringFieldUpdateOperationsInput | string
    primaryContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrganizationStatusFieldUpdateOperationsInput | $Enums.OrganizationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantLinks?: OrganizationTenantUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutConfigsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContactName?: StringFieldUpdateOperationsInput | string
    primaryContactEmail?: StringFieldUpdateOperationsInput | string
    primaryContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrganizationStatusFieldUpdateOperationsInput | $Enums.OrganizationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantLinks?: OrganizationTenantUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutTenantLinksInput = {
    id?: string
    name: string
    code: string
    description?: string | null
    primaryContactName: string
    primaryContactEmail: string
    primaryContactPhone?: string | null
    status?: $Enums.OrganizationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    configs?: OrganizationConfigCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutTenantLinksInput = {
    id?: string
    name: string
    code: string
    description?: string | null
    primaryContactName: string
    primaryContactEmail: string
    primaryContactPhone?: string | null
    status?: $Enums.OrganizationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    configs?: OrganizationConfigUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutTenantLinksInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutTenantLinksInput, OrganizationUncheckedCreateWithoutTenantLinksInput>
  }

  export type OrganizationUpsertWithoutTenantLinksInput = {
    update: XOR<OrganizationUpdateWithoutTenantLinksInput, OrganizationUncheckedUpdateWithoutTenantLinksInput>
    create: XOR<OrganizationCreateWithoutTenantLinksInput, OrganizationUncheckedCreateWithoutTenantLinksInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutTenantLinksInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutTenantLinksInput, OrganizationUncheckedUpdateWithoutTenantLinksInput>
  }

  export type OrganizationUpdateWithoutTenantLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContactName?: StringFieldUpdateOperationsInput | string
    primaryContactEmail?: StringFieldUpdateOperationsInput | string
    primaryContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrganizationStatusFieldUpdateOperationsInput | $Enums.OrganizationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configs?: OrganizationConfigUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutTenantLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    primaryContactName?: StringFieldUpdateOperationsInput | string
    primaryContactEmail?: StringFieldUpdateOperationsInput | string
    primaryContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrganizationStatusFieldUpdateOperationsInput | $Enums.OrganizationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configs?: OrganizationConfigUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationTenantCreateManyOrganizationInput = {
    id?: string
    tenantId: string
    createdAt?: Date | string
  }

  export type OrganizationConfigCreateManyOrganizationInput = {
    id?: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationTenantUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationTenantUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationTenantUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationConfigUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationConfigUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationConfigUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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