
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
 * Model Staff
 * 
 */
export type Staff = $Result.DefaultSelection<Prisma.$StaffPayload>
/**
 * Model StaffLocation
 * 
 */
export type StaffLocation = $Result.DefaultSelection<Prisma.$StaffLocationPayload>
/**
 * Model StaffConfig
 * 
 */
export type StaffConfig = $Result.DefaultSelection<Prisma.$StaffConfigPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StaffType: {
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  ADMIN: 'ADMIN',
  RECEPTIONIST: 'RECEPTIONIST',
  TECHNICIAN: 'TECHNICIAN',
  OTHER: 'OTHER'
};

export type StaffType = (typeof StaffType)[keyof typeof StaffType]


export const StaffStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type StaffStatus = (typeof StaffStatus)[keyof typeof StaffStatus]

}

export type StaffType = $Enums.StaffType

export const StaffType: typeof $Enums.StaffType

export type StaffStatus = $Enums.StaffStatus

export const StaffStatus: typeof $Enums.StaffStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Staff
 * const staff = await prisma.staff.findMany()
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
   * // Fetch zero or more Staff
   * const staff = await prisma.staff.findMany()
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
   * `prisma.staff`: Exposes CRUD operations for the **Staff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Staff
    * const staff = await prisma.staff.findMany()
    * ```
    */
  get staff(): Prisma.StaffDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffLocation`: Exposes CRUD operations for the **StaffLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffLocations
    * const staffLocations = await prisma.staffLocation.findMany()
    * ```
    */
  get staffLocation(): Prisma.StaffLocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffConfig`: Exposes CRUD operations for the **StaffConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffConfigs
    * const staffConfigs = await prisma.staffConfig.findMany()
    * ```
    */
  get staffConfig(): Prisma.StaffConfigDelegate<ExtArgs, ClientOptions>;
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
    Staff: 'Staff',
    StaffLocation: 'StaffLocation',
    StaffConfig: 'StaffConfig'
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
      modelProps: "staff" | "staffLocation" | "staffConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Staff: {
        payload: Prisma.$StaffPayload<ExtArgs>
        fields: Prisma.StaffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findFirst: {
            args: Prisma.StaffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          findMany: {
            args: Prisma.StaffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          create: {
            args: Prisma.StaffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          createMany: {
            args: Prisma.StaffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          delete: {
            args: Prisma.StaffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          update: {
            args: Prisma.StaffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          deleteMany: {
            args: Prisma.StaffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>[]
          }
          upsert: {
            args: Prisma.StaffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffPayload>
          }
          aggregate: {
            args: Prisma.StaffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaff>
          }
          groupBy: {
            args: Prisma.StaffGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffCountArgs<ExtArgs>
            result: $Utils.Optional<StaffCountAggregateOutputType> | number
          }
        }
      }
      StaffLocation: {
        payload: Prisma.$StaffLocationPayload<ExtArgs>
        fields: Prisma.StaffLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>
          }
          findFirst: {
            args: Prisma.StaffLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>
          }
          findMany: {
            args: Prisma.StaffLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>[]
          }
          create: {
            args: Prisma.StaffLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>
          }
          createMany: {
            args: Prisma.StaffLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>[]
          }
          delete: {
            args: Prisma.StaffLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>
          }
          update: {
            args: Prisma.StaffLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>
          }
          deleteMany: {
            args: Prisma.StaffLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>[]
          }
          upsert: {
            args: Prisma.StaffLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffLocationPayload>
          }
          aggregate: {
            args: Prisma.StaffLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffLocation>
          }
          groupBy: {
            args: Prisma.StaffLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffLocationCountArgs<ExtArgs>
            result: $Utils.Optional<StaffLocationCountAggregateOutputType> | number
          }
        }
      }
      StaffConfig: {
        payload: Prisma.$StaffConfigPayload<ExtArgs>
        fields: Prisma.StaffConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>
          }
          findFirst: {
            args: Prisma.StaffConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>
          }
          findMany: {
            args: Prisma.StaffConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>[]
          }
          create: {
            args: Prisma.StaffConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>
          }
          createMany: {
            args: Prisma.StaffConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>[]
          }
          delete: {
            args: Prisma.StaffConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>
          }
          update: {
            args: Prisma.StaffConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>
          }
          deleteMany: {
            args: Prisma.StaffConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>[]
          }
          upsert: {
            args: Prisma.StaffConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffConfigPayload>
          }
          aggregate: {
            args: Prisma.StaffConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffConfig>
          }
          groupBy: {
            args: Prisma.StaffConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffConfigCountArgs<ExtArgs>
            result: $Utils.Optional<StaffConfigCountAggregateOutputType> | number
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
    staff?: StaffOmit
    staffLocation?: StaffLocationOmit
    staffConfig?: StaffConfigOmit
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
   * Count Type StaffCountOutputType
   */

  export type StaffCountOutputType = {
    locations: number
    configs: number
  }

  export type StaffCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | StaffCountOutputTypeCountLocationsArgs
    configs?: boolean | StaffCountOutputTypeCountConfigsArgs
  }

  // Custom InputTypes
  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffCountOutputType
     */
    select?: StaffCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffLocationWhereInput
  }

  /**
   * StaffCountOutputType without action
   */
  export type StaffCountOutputTypeCountConfigsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffConfigWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Staff
   */

  export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  export type StaffMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    staffType: $Enums.StaffType | null
    roleId: string | null
    status: $Enums.StaffStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    staffType: $Enums.StaffType | null
    roleId: string | null
    status: $Enums.StaffStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffCountAggregateOutputType = {
    id: number
    tenantId: number
    firstName: number
    lastName: number
    email: number
    phone: number
    staffType: number
    roleId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffMinAggregateInputType = {
    id?: true
    tenantId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    staffType?: true
    roleId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffMaxAggregateInputType = {
    id?: true
    tenantId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    staffType?: true
    roleId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffCountAggregateInputType = {
    id?: true
    tenantId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    staffType?: true
    roleId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to aggregate.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Staff
    **/
    _count?: true | StaffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffMaxAggregateInputType
  }

  export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
        [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaff[P]>
      : GetScalarType<T[P], AggregateStaff[P]>
  }




  export type StaffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffWhereInput
    orderBy?: StaffOrderByWithAggregationInput | StaffOrderByWithAggregationInput[]
    by: StaffScalarFieldEnum[] | StaffScalarFieldEnum
    having?: StaffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffCountAggregateInputType | true
    _min?: StaffMinAggregateInputType
    _max?: StaffMaxAggregateInputType
  }

  export type StaffGroupByOutputType = {
    id: string
    tenantId: string
    firstName: string
    lastName: string
    email: string
    phone: string | null
    staffType: $Enums.StaffType
    roleId: string
    status: $Enums.StaffStatus
    createdAt: Date
    updatedAt: Date
    _count: StaffCountAggregateOutputType | null
    _min: StaffMinAggregateOutputType | null
    _max: StaffMaxAggregateOutputType | null
  }

  type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffGroupByOutputType[P]>
            : GetScalarType<T[P], StaffGroupByOutputType[P]>
        }
      >
    >


  export type StaffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    staffType?: boolean
    roleId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    locations?: boolean | Staff$locationsArgs<ExtArgs>
    configs?: boolean | Staff$configsArgs<ExtArgs>
    _count?: boolean | StaffCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    staffType?: boolean
    roleId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    staffType?: boolean
    roleId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staff"]>

  export type StaffSelectScalar = {
    id?: boolean
    tenantId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    staffType?: boolean
    roleId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StaffOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "firstName" | "lastName" | "email" | "phone" | "staffType" | "roleId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["staff"]>
  export type StaffInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | Staff$locationsArgs<ExtArgs>
    configs?: boolean | Staff$configsArgs<ExtArgs>
    _count?: boolean | StaffCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StaffIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StaffIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StaffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Staff"
    objects: {
      locations: Prisma.$StaffLocationPayload<ExtArgs>[]
      configs: Prisma.$StaffConfigPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      firstName: string
      lastName: string
      email: string
      phone: string | null
      staffType: $Enums.StaffType
      roleId: string
      status: $Enums.StaffStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staff"]>
    composites: {}
  }

  type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = $Result.GetResult<Prisma.$StaffPayload, S>

  type StaffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffCountAggregateInputType | true
    }

  export interface StaffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Staff'], meta: { name: 'Staff' } }
    /**
     * Find zero or one Staff that matches the filter.
     * @param {StaffFindUniqueArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffFindUniqueArgs>(args: SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Staff that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffFindUniqueOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffFindFirstArgs>(args?: SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Staff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindFirstOrThrowArgs} args - Arguments to find a Staff
     * @example
     * // Get one Staff
     * const staff = await prisma.staff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Staff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Staff
     * const staff = await prisma.staff.findMany()
     * 
     * // Get first 10 Staff
     * const staff = await prisma.staff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffWithIdOnly = await prisma.staff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffFindManyArgs>(args?: SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Staff.
     * @param {StaffCreateArgs} args - Arguments to create a Staff.
     * @example
     * // Create one Staff
     * const Staff = await prisma.staff.create({
     *   data: {
     *     // ... data to create a Staff
     *   }
     * })
     * 
     */
    create<T extends StaffCreateArgs>(args: SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Staff.
     * @param {StaffCreateManyArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffCreateManyArgs>(args?: SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Staff and returns the data saved in the database.
     * @param {StaffCreateManyAndReturnArgs} args - Arguments to create many Staff.
     * @example
     * // Create many Staff
     * const staff = await prisma.staff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Staff.
     * @param {StaffDeleteArgs} args - Arguments to delete one Staff.
     * @example
     * // Delete one Staff
     * const Staff = await prisma.staff.delete({
     *   where: {
     *     // ... filter to delete one Staff
     *   }
     * })
     * 
     */
    delete<T extends StaffDeleteArgs>(args: SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Staff.
     * @param {StaffUpdateArgs} args - Arguments to update one Staff.
     * @example
     * // Update one Staff
     * const staff = await prisma.staff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffUpdateArgs>(args: SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Staff.
     * @param {StaffDeleteManyArgs} args - Arguments to filter Staff to delete.
     * @example
     * // Delete a few Staff
     * const { count } = await prisma.staff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffDeleteManyArgs>(args?: SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffUpdateManyArgs>(args: SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Staff and returns the data updated in the database.
     * @param {StaffUpdateManyAndReturnArgs} args - Arguments to update many Staff.
     * @example
     * // Update many Staff
     * const staff = await prisma.staff.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Staff and only return the `id`
     * const staffWithIdOnly = await prisma.staff.updateManyAndReturn({
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
    updateManyAndReturn<T extends StaffUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Staff.
     * @param {StaffUpsertArgs} args - Arguments to update or create a Staff.
     * @example
     * // Update or create a Staff
     * const staff = await prisma.staff.upsert({
     *   create: {
     *     // ... data to create a Staff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Staff we want to update
     *   }
     * })
     */
    upsert<T extends StaffUpsertArgs>(args: SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffCountArgs} args - Arguments to filter Staff to count.
     * @example
     * // Count the number of Staff
     * const count = await prisma.staff.count({
     *   where: {
     *     // ... the filter for the Staff we want to count
     *   }
     * })
    **/
    count<T extends StaffCountArgs>(
      args?: Subset<T, StaffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffAggregateArgs>(args: Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>

    /**
     * Group by Staff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffGroupByArgs} args - Group by arguments.
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
      T extends StaffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffGroupByArgs['orderBy'] }
        : { orderBy?: StaffGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Staff model
   */
  readonly fields: StaffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Staff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    locations<T extends Staff$locationsArgs<ExtArgs> = {}>(args?: Subset<T, Staff$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    configs<T extends Staff$configsArgs<ExtArgs> = {}>(args?: Subset<T, Staff$configsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Staff model
   */
  interface StaffFieldRefs {
    readonly id: FieldRef<"Staff", 'String'>
    readonly tenantId: FieldRef<"Staff", 'String'>
    readonly firstName: FieldRef<"Staff", 'String'>
    readonly lastName: FieldRef<"Staff", 'String'>
    readonly email: FieldRef<"Staff", 'String'>
    readonly phone: FieldRef<"Staff", 'String'>
    readonly staffType: FieldRef<"Staff", 'StaffType'>
    readonly roleId: FieldRef<"Staff", 'String'>
    readonly status: FieldRef<"Staff", 'StaffStatus'>
    readonly createdAt: FieldRef<"Staff", 'DateTime'>
    readonly updatedAt: FieldRef<"Staff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Staff findUnique
   */
  export type StaffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findUniqueOrThrow
   */
  export type StaffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff findFirst
   */
  export type StaffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findFirstOrThrow
   */
  export type StaffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Staff.
     */
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff findMany
   */
  export type StaffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter, which Staff to fetch.
     */
    where?: StaffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Staff to fetch.
     */
    orderBy?: StaffOrderByWithRelationInput | StaffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Staff.
     */
    cursor?: StaffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Staff from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Staff.
     */
    skip?: number
    distinct?: StaffScalarFieldEnum | StaffScalarFieldEnum[]
  }

  /**
   * Staff create
   */
  export type StaffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to create a Staff.
     */
    data: XOR<StaffCreateInput, StaffUncheckedCreateInput>
  }

  /**
   * Staff createMany
   */
  export type StaffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff createManyAndReturn
   */
  export type StaffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to create many Staff.
     */
    data: StaffCreateManyInput | StaffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Staff update
   */
  export type StaffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The data needed to update a Staff.
     */
    data: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
    /**
     * Choose, which Staff to update.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff updateMany
   */
  export type StaffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff updateManyAndReturn
   */
  export type StaffUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * The data used to update Staff.
     */
    data: XOR<StaffUpdateManyMutationInput, StaffUncheckedUpdateManyInput>
    /**
     * Filter which Staff to update
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to update.
     */
    limit?: number
  }

  /**
   * Staff upsert
   */
  export type StaffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * The filter to search for the Staff to update in case it exists.
     */
    where: StaffWhereUniqueInput
    /**
     * In case the Staff found by the `where` argument doesn't exist, create a new Staff with this data.
     */
    create: XOR<StaffCreateInput, StaffUncheckedCreateInput>
    /**
     * In case the Staff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffUpdateInput, StaffUncheckedUpdateInput>
  }

  /**
   * Staff delete
   */
  export type StaffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
    /**
     * Filter which Staff to delete.
     */
    where: StaffWhereUniqueInput
  }

  /**
   * Staff deleteMany
   */
  export type StaffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Staff to delete
     */
    where?: StaffWhereInput
    /**
     * Limit how many Staff to delete.
     */
    limit?: number
  }

  /**
   * Staff.locations
   */
  export type Staff$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    where?: StaffLocationWhereInput
    orderBy?: StaffLocationOrderByWithRelationInput | StaffLocationOrderByWithRelationInput[]
    cursor?: StaffLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffLocationScalarFieldEnum | StaffLocationScalarFieldEnum[]
  }

  /**
   * Staff.configs
   */
  export type Staff$configsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    where?: StaffConfigWhereInput
    orderBy?: StaffConfigOrderByWithRelationInput | StaffConfigOrderByWithRelationInput[]
    cursor?: StaffConfigWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffConfigScalarFieldEnum | StaffConfigScalarFieldEnum[]
  }

  /**
   * Staff without action
   */
  export type StaffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Staff
     */
    select?: StaffSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Staff
     */
    omit?: StaffOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffInclude<ExtArgs> | null
  }


  /**
   * Model StaffLocation
   */

  export type AggregateStaffLocation = {
    _count: StaffLocationCountAggregateOutputType | null
    _min: StaffLocationMinAggregateOutputType | null
    _max: StaffLocationMaxAggregateOutputType | null
  }

  export type StaffLocationMinAggregateOutputType = {
    id: string | null
    staffId: string | null
    locationId: string | null
  }

  export type StaffLocationMaxAggregateOutputType = {
    id: string | null
    staffId: string | null
    locationId: string | null
  }

  export type StaffLocationCountAggregateOutputType = {
    id: number
    staffId: number
    locationId: number
    _all: number
  }


  export type StaffLocationMinAggregateInputType = {
    id?: true
    staffId?: true
    locationId?: true
  }

  export type StaffLocationMaxAggregateInputType = {
    id?: true
    staffId?: true
    locationId?: true
  }

  export type StaffLocationCountAggregateInputType = {
    id?: true
    staffId?: true
    locationId?: true
    _all?: true
  }

  export type StaffLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffLocation to aggregate.
     */
    where?: StaffLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffLocations to fetch.
     */
    orderBy?: StaffLocationOrderByWithRelationInput | StaffLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffLocations
    **/
    _count?: true | StaffLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffLocationMaxAggregateInputType
  }

  export type GetStaffLocationAggregateType<T extends StaffLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffLocation[P]>
      : GetScalarType<T[P], AggregateStaffLocation[P]>
  }




  export type StaffLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffLocationWhereInput
    orderBy?: StaffLocationOrderByWithAggregationInput | StaffLocationOrderByWithAggregationInput[]
    by: StaffLocationScalarFieldEnum[] | StaffLocationScalarFieldEnum
    having?: StaffLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffLocationCountAggregateInputType | true
    _min?: StaffLocationMinAggregateInputType
    _max?: StaffLocationMaxAggregateInputType
  }

  export type StaffLocationGroupByOutputType = {
    id: string
    staffId: string
    locationId: string
    _count: StaffLocationCountAggregateOutputType | null
    _min: StaffLocationMinAggregateOutputType | null
    _max: StaffLocationMaxAggregateOutputType | null
  }

  type GetStaffLocationGroupByPayload<T extends StaffLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffLocationGroupByOutputType[P]>
            : GetScalarType<T[P], StaffLocationGroupByOutputType[P]>
        }
      >
    >


  export type StaffLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    locationId?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffLocation"]>

  export type StaffLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    locationId?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffLocation"]>

  export type StaffLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    locationId?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffLocation"]>

  export type StaffLocationSelectScalar = {
    id?: boolean
    staffId?: boolean
    locationId?: boolean
  }

  export type StaffLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "staffId" | "locationId", ExtArgs["result"]["staffLocation"]>
  export type StaffLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }
  export type StaffLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }
  export type StaffLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }

  export type $StaffLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffLocation"
    objects: {
      staff: Prisma.$StaffPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      staffId: string
      locationId: string
    }, ExtArgs["result"]["staffLocation"]>
    composites: {}
  }

  type StaffLocationGetPayload<S extends boolean | null | undefined | StaffLocationDefaultArgs> = $Result.GetResult<Prisma.$StaffLocationPayload, S>

  type StaffLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffLocationCountAggregateInputType | true
    }

  export interface StaffLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffLocation'], meta: { name: 'StaffLocation' } }
    /**
     * Find zero or one StaffLocation that matches the filter.
     * @param {StaffLocationFindUniqueArgs} args - Arguments to find a StaffLocation
     * @example
     * // Get one StaffLocation
     * const staffLocation = await prisma.staffLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffLocationFindUniqueArgs>(args: SelectSubset<T, StaffLocationFindUniqueArgs<ExtArgs>>): Prisma__StaffLocationClient<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StaffLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffLocationFindUniqueOrThrowArgs} args - Arguments to find a StaffLocation
     * @example
     * // Get one StaffLocation
     * const staffLocation = await prisma.staffLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffLocationClient<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLocationFindFirstArgs} args - Arguments to find a StaffLocation
     * @example
     * // Get one StaffLocation
     * const staffLocation = await prisma.staffLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffLocationFindFirstArgs>(args?: SelectSubset<T, StaffLocationFindFirstArgs<ExtArgs>>): Prisma__StaffLocationClient<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLocationFindFirstOrThrowArgs} args - Arguments to find a StaffLocation
     * @example
     * // Get one StaffLocation
     * const staffLocation = await prisma.staffLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffLocationClient<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StaffLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffLocations
     * const staffLocations = await prisma.staffLocation.findMany()
     * 
     * // Get first 10 StaffLocations
     * const staffLocations = await prisma.staffLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffLocationWithIdOnly = await prisma.staffLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffLocationFindManyArgs>(args?: SelectSubset<T, StaffLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StaffLocation.
     * @param {StaffLocationCreateArgs} args - Arguments to create a StaffLocation.
     * @example
     * // Create one StaffLocation
     * const StaffLocation = await prisma.staffLocation.create({
     *   data: {
     *     // ... data to create a StaffLocation
     *   }
     * })
     * 
     */
    create<T extends StaffLocationCreateArgs>(args: SelectSubset<T, StaffLocationCreateArgs<ExtArgs>>): Prisma__StaffLocationClient<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StaffLocations.
     * @param {StaffLocationCreateManyArgs} args - Arguments to create many StaffLocations.
     * @example
     * // Create many StaffLocations
     * const staffLocation = await prisma.staffLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffLocationCreateManyArgs>(args?: SelectSubset<T, StaffLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffLocations and returns the data saved in the database.
     * @param {StaffLocationCreateManyAndReturnArgs} args - Arguments to create many StaffLocations.
     * @example
     * // Create many StaffLocations
     * const staffLocation = await prisma.staffLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffLocations and only return the `id`
     * const staffLocationWithIdOnly = await prisma.staffLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StaffLocation.
     * @param {StaffLocationDeleteArgs} args - Arguments to delete one StaffLocation.
     * @example
     * // Delete one StaffLocation
     * const StaffLocation = await prisma.staffLocation.delete({
     *   where: {
     *     // ... filter to delete one StaffLocation
     *   }
     * })
     * 
     */
    delete<T extends StaffLocationDeleteArgs>(args: SelectSubset<T, StaffLocationDeleteArgs<ExtArgs>>): Prisma__StaffLocationClient<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StaffLocation.
     * @param {StaffLocationUpdateArgs} args - Arguments to update one StaffLocation.
     * @example
     * // Update one StaffLocation
     * const staffLocation = await prisma.staffLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffLocationUpdateArgs>(args: SelectSubset<T, StaffLocationUpdateArgs<ExtArgs>>): Prisma__StaffLocationClient<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StaffLocations.
     * @param {StaffLocationDeleteManyArgs} args - Arguments to filter StaffLocations to delete.
     * @example
     * // Delete a few StaffLocations
     * const { count } = await prisma.staffLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffLocationDeleteManyArgs>(args?: SelectSubset<T, StaffLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffLocations
     * const staffLocation = await prisma.staffLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffLocationUpdateManyArgs>(args: SelectSubset<T, StaffLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffLocations and returns the data updated in the database.
     * @param {StaffLocationUpdateManyAndReturnArgs} args - Arguments to update many StaffLocations.
     * @example
     * // Update many StaffLocations
     * const staffLocation = await prisma.staffLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StaffLocations and only return the `id`
     * const staffLocationWithIdOnly = await prisma.staffLocation.updateManyAndReturn({
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
    updateManyAndReturn<T extends StaffLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StaffLocation.
     * @param {StaffLocationUpsertArgs} args - Arguments to update or create a StaffLocation.
     * @example
     * // Update or create a StaffLocation
     * const staffLocation = await prisma.staffLocation.upsert({
     *   create: {
     *     // ... data to create a StaffLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffLocation we want to update
     *   }
     * })
     */
    upsert<T extends StaffLocationUpsertArgs>(args: SelectSubset<T, StaffLocationUpsertArgs<ExtArgs>>): Prisma__StaffLocationClient<$Result.GetResult<Prisma.$StaffLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StaffLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLocationCountArgs} args - Arguments to filter StaffLocations to count.
     * @example
     * // Count the number of StaffLocations
     * const count = await prisma.staffLocation.count({
     *   where: {
     *     // ... the filter for the StaffLocations we want to count
     *   }
     * })
    **/
    count<T extends StaffLocationCountArgs>(
      args?: Subset<T, StaffLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffLocationAggregateArgs>(args: Subset<T, StaffLocationAggregateArgs>): Prisma.PrismaPromise<GetStaffLocationAggregateType<T>>

    /**
     * Group by StaffLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffLocationGroupByArgs} args - Group by arguments.
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
      T extends StaffLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffLocationGroupByArgs['orderBy'] }
        : { orderBy?: StaffLocationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffLocation model
   */
  readonly fields: StaffLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    staff<T extends StaffDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffDefaultArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the StaffLocation model
   */
  interface StaffLocationFieldRefs {
    readonly id: FieldRef<"StaffLocation", 'String'>
    readonly staffId: FieldRef<"StaffLocation", 'String'>
    readonly locationId: FieldRef<"StaffLocation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * StaffLocation findUnique
   */
  export type StaffLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * Filter, which StaffLocation to fetch.
     */
    where: StaffLocationWhereUniqueInput
  }

  /**
   * StaffLocation findUniqueOrThrow
   */
  export type StaffLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * Filter, which StaffLocation to fetch.
     */
    where: StaffLocationWhereUniqueInput
  }

  /**
   * StaffLocation findFirst
   */
  export type StaffLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * Filter, which StaffLocation to fetch.
     */
    where?: StaffLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffLocations to fetch.
     */
    orderBy?: StaffLocationOrderByWithRelationInput | StaffLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffLocations.
     */
    cursor?: StaffLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffLocations.
     */
    distinct?: StaffLocationScalarFieldEnum | StaffLocationScalarFieldEnum[]
  }

  /**
   * StaffLocation findFirstOrThrow
   */
  export type StaffLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * Filter, which StaffLocation to fetch.
     */
    where?: StaffLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffLocations to fetch.
     */
    orderBy?: StaffLocationOrderByWithRelationInput | StaffLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffLocations.
     */
    cursor?: StaffLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffLocations.
     */
    distinct?: StaffLocationScalarFieldEnum | StaffLocationScalarFieldEnum[]
  }

  /**
   * StaffLocation findMany
   */
  export type StaffLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * Filter, which StaffLocations to fetch.
     */
    where?: StaffLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffLocations to fetch.
     */
    orderBy?: StaffLocationOrderByWithRelationInput | StaffLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffLocations.
     */
    cursor?: StaffLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffLocations.
     */
    skip?: number
    distinct?: StaffLocationScalarFieldEnum | StaffLocationScalarFieldEnum[]
  }

  /**
   * StaffLocation create
   */
  export type StaffLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffLocation.
     */
    data: XOR<StaffLocationCreateInput, StaffLocationUncheckedCreateInput>
  }

  /**
   * StaffLocation createMany
   */
  export type StaffLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffLocations.
     */
    data: StaffLocationCreateManyInput | StaffLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffLocation createManyAndReturn
   */
  export type StaffLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * The data used to create many StaffLocations.
     */
    data: StaffLocationCreateManyInput | StaffLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffLocation update
   */
  export type StaffLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffLocation.
     */
    data: XOR<StaffLocationUpdateInput, StaffLocationUncheckedUpdateInput>
    /**
     * Choose, which StaffLocation to update.
     */
    where: StaffLocationWhereUniqueInput
  }

  /**
   * StaffLocation updateMany
   */
  export type StaffLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffLocations.
     */
    data: XOR<StaffLocationUpdateManyMutationInput, StaffLocationUncheckedUpdateManyInput>
    /**
     * Filter which StaffLocations to update
     */
    where?: StaffLocationWhereInput
    /**
     * Limit how many StaffLocations to update.
     */
    limit?: number
  }

  /**
   * StaffLocation updateManyAndReturn
   */
  export type StaffLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * The data used to update StaffLocations.
     */
    data: XOR<StaffLocationUpdateManyMutationInput, StaffLocationUncheckedUpdateManyInput>
    /**
     * Filter which StaffLocations to update
     */
    where?: StaffLocationWhereInput
    /**
     * Limit how many StaffLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffLocation upsert
   */
  export type StaffLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffLocation to update in case it exists.
     */
    where: StaffLocationWhereUniqueInput
    /**
     * In case the StaffLocation found by the `where` argument doesn't exist, create a new StaffLocation with this data.
     */
    create: XOR<StaffLocationCreateInput, StaffLocationUncheckedCreateInput>
    /**
     * In case the StaffLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffLocationUpdateInput, StaffLocationUncheckedUpdateInput>
  }

  /**
   * StaffLocation delete
   */
  export type StaffLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
    /**
     * Filter which StaffLocation to delete.
     */
    where: StaffLocationWhereUniqueInput
  }

  /**
   * StaffLocation deleteMany
   */
  export type StaffLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffLocations to delete
     */
    where?: StaffLocationWhereInput
    /**
     * Limit how many StaffLocations to delete.
     */
    limit?: number
  }

  /**
   * StaffLocation without action
   */
  export type StaffLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffLocation
     */
    select?: StaffLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffLocation
     */
    omit?: StaffLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffLocationInclude<ExtArgs> | null
  }


  /**
   * Model StaffConfig
   */

  export type AggregateStaffConfig = {
    _count: StaffConfigCountAggregateOutputType | null
    _min: StaffConfigMinAggregateOutputType | null
    _max: StaffConfigMaxAggregateOutputType | null
  }

  export type StaffConfigMinAggregateOutputType = {
    id: string | null
    staffId: string | null
    namespace: string | null
    updatedByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffConfigMaxAggregateOutputType = {
    id: string | null
    staffId: string | null
    namespace: string | null
    updatedByUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffConfigCountAggregateOutputType = {
    id: number
    staffId: number
    namespace: number
    data: number
    updatedByUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffConfigMinAggregateInputType = {
    id?: true
    staffId?: true
    namespace?: true
    updatedByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffConfigMaxAggregateInputType = {
    id?: true
    staffId?: true
    namespace?: true
    updatedByUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffConfigCountAggregateInputType = {
    id?: true
    staffId?: true
    namespace?: true
    data?: true
    updatedByUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffConfig to aggregate.
     */
    where?: StaffConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffConfigs to fetch.
     */
    orderBy?: StaffConfigOrderByWithRelationInput | StaffConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffConfigs
    **/
    _count?: true | StaffConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffConfigMaxAggregateInputType
  }

  export type GetStaffConfigAggregateType<T extends StaffConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffConfig[P]>
      : GetScalarType<T[P], AggregateStaffConfig[P]>
  }




  export type StaffConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffConfigWhereInput
    orderBy?: StaffConfigOrderByWithAggregationInput | StaffConfigOrderByWithAggregationInput[]
    by: StaffConfigScalarFieldEnum[] | StaffConfigScalarFieldEnum
    having?: StaffConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffConfigCountAggregateInputType | true
    _min?: StaffConfigMinAggregateInputType
    _max?: StaffConfigMaxAggregateInputType
  }

  export type StaffConfigGroupByOutputType = {
    id: string
    staffId: string
    namespace: string
    data: JsonValue
    updatedByUserId: string | null
    createdAt: Date
    updatedAt: Date
    _count: StaffConfigCountAggregateOutputType | null
    _min: StaffConfigMinAggregateOutputType | null
    _max: StaffConfigMaxAggregateOutputType | null
  }

  type GetStaffConfigGroupByPayload<T extends StaffConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffConfigGroupByOutputType[P]>
            : GetScalarType<T[P], StaffConfigGroupByOutputType[P]>
        }
      >
    >


  export type StaffConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    namespace?: boolean
    data?: boolean
    updatedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffConfig"]>

  export type StaffConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    namespace?: boolean
    data?: boolean
    updatedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffConfig"]>

  export type StaffConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    staffId?: boolean
    namespace?: boolean
    data?: boolean
    updatedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffConfig"]>

  export type StaffConfigSelectScalar = {
    id?: boolean
    staffId?: boolean
    namespace?: boolean
    data?: boolean
    updatedByUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StaffConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "staffId" | "namespace" | "data" | "updatedByUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["staffConfig"]>
  export type StaffConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }
  export type StaffConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }
  export type StaffConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staff?: boolean | StaffDefaultArgs<ExtArgs>
  }

  export type $StaffConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffConfig"
    objects: {
      staff: Prisma.$StaffPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      staffId: string
      namespace: string
      data: Prisma.JsonValue
      updatedByUserId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staffConfig"]>
    composites: {}
  }

  type StaffConfigGetPayload<S extends boolean | null | undefined | StaffConfigDefaultArgs> = $Result.GetResult<Prisma.$StaffConfigPayload, S>

  type StaffConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffConfigCountAggregateInputType | true
    }

  export interface StaffConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffConfig'], meta: { name: 'StaffConfig' } }
    /**
     * Find zero or one StaffConfig that matches the filter.
     * @param {StaffConfigFindUniqueArgs} args - Arguments to find a StaffConfig
     * @example
     * // Get one StaffConfig
     * const staffConfig = await prisma.staffConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffConfigFindUniqueArgs>(args: SelectSubset<T, StaffConfigFindUniqueArgs<ExtArgs>>): Prisma__StaffConfigClient<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StaffConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffConfigFindUniqueOrThrowArgs} args - Arguments to find a StaffConfig
     * @example
     * // Get one StaffConfig
     * const staffConfig = await prisma.staffConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffConfigClient<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffConfigFindFirstArgs} args - Arguments to find a StaffConfig
     * @example
     * // Get one StaffConfig
     * const staffConfig = await prisma.staffConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffConfigFindFirstArgs>(args?: SelectSubset<T, StaffConfigFindFirstArgs<ExtArgs>>): Prisma__StaffConfigClient<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffConfigFindFirstOrThrowArgs} args - Arguments to find a StaffConfig
     * @example
     * // Get one StaffConfig
     * const staffConfig = await prisma.staffConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffConfigClient<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StaffConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffConfigs
     * const staffConfigs = await prisma.staffConfig.findMany()
     * 
     * // Get first 10 StaffConfigs
     * const staffConfigs = await prisma.staffConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffConfigWithIdOnly = await prisma.staffConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffConfigFindManyArgs>(args?: SelectSubset<T, StaffConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StaffConfig.
     * @param {StaffConfigCreateArgs} args - Arguments to create a StaffConfig.
     * @example
     * // Create one StaffConfig
     * const StaffConfig = await prisma.staffConfig.create({
     *   data: {
     *     // ... data to create a StaffConfig
     *   }
     * })
     * 
     */
    create<T extends StaffConfigCreateArgs>(args: SelectSubset<T, StaffConfigCreateArgs<ExtArgs>>): Prisma__StaffConfigClient<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StaffConfigs.
     * @param {StaffConfigCreateManyArgs} args - Arguments to create many StaffConfigs.
     * @example
     * // Create many StaffConfigs
     * const staffConfig = await prisma.staffConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffConfigCreateManyArgs>(args?: SelectSubset<T, StaffConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffConfigs and returns the data saved in the database.
     * @param {StaffConfigCreateManyAndReturnArgs} args - Arguments to create many StaffConfigs.
     * @example
     * // Create many StaffConfigs
     * const staffConfig = await prisma.staffConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffConfigs and only return the `id`
     * const staffConfigWithIdOnly = await prisma.staffConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StaffConfig.
     * @param {StaffConfigDeleteArgs} args - Arguments to delete one StaffConfig.
     * @example
     * // Delete one StaffConfig
     * const StaffConfig = await prisma.staffConfig.delete({
     *   where: {
     *     // ... filter to delete one StaffConfig
     *   }
     * })
     * 
     */
    delete<T extends StaffConfigDeleteArgs>(args: SelectSubset<T, StaffConfigDeleteArgs<ExtArgs>>): Prisma__StaffConfigClient<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StaffConfig.
     * @param {StaffConfigUpdateArgs} args - Arguments to update one StaffConfig.
     * @example
     * // Update one StaffConfig
     * const staffConfig = await prisma.staffConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffConfigUpdateArgs>(args: SelectSubset<T, StaffConfigUpdateArgs<ExtArgs>>): Prisma__StaffConfigClient<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StaffConfigs.
     * @param {StaffConfigDeleteManyArgs} args - Arguments to filter StaffConfigs to delete.
     * @example
     * // Delete a few StaffConfigs
     * const { count } = await prisma.staffConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffConfigDeleteManyArgs>(args?: SelectSubset<T, StaffConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffConfigs
     * const staffConfig = await prisma.staffConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffConfigUpdateManyArgs>(args: SelectSubset<T, StaffConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffConfigs and returns the data updated in the database.
     * @param {StaffConfigUpdateManyAndReturnArgs} args - Arguments to update many StaffConfigs.
     * @example
     * // Update many StaffConfigs
     * const staffConfig = await prisma.staffConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StaffConfigs and only return the `id`
     * const staffConfigWithIdOnly = await prisma.staffConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends StaffConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StaffConfig.
     * @param {StaffConfigUpsertArgs} args - Arguments to update or create a StaffConfig.
     * @example
     * // Update or create a StaffConfig
     * const staffConfig = await prisma.staffConfig.upsert({
     *   create: {
     *     // ... data to create a StaffConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffConfig we want to update
     *   }
     * })
     */
    upsert<T extends StaffConfigUpsertArgs>(args: SelectSubset<T, StaffConfigUpsertArgs<ExtArgs>>): Prisma__StaffConfigClient<$Result.GetResult<Prisma.$StaffConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StaffConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffConfigCountArgs} args - Arguments to filter StaffConfigs to count.
     * @example
     * // Count the number of StaffConfigs
     * const count = await prisma.staffConfig.count({
     *   where: {
     *     // ... the filter for the StaffConfigs we want to count
     *   }
     * })
    **/
    count<T extends StaffConfigCountArgs>(
      args?: Subset<T, StaffConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffConfigAggregateArgs>(args: Subset<T, StaffConfigAggregateArgs>): Prisma.PrismaPromise<GetStaffConfigAggregateType<T>>

    /**
     * Group by StaffConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffConfigGroupByArgs} args - Group by arguments.
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
      T extends StaffConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffConfigGroupByArgs['orderBy'] }
        : { orderBy?: StaffConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffConfig model
   */
  readonly fields: StaffConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    staff<T extends StaffDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffDefaultArgs<ExtArgs>>): Prisma__StaffClient<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the StaffConfig model
   */
  interface StaffConfigFieldRefs {
    readonly id: FieldRef<"StaffConfig", 'String'>
    readonly staffId: FieldRef<"StaffConfig", 'String'>
    readonly namespace: FieldRef<"StaffConfig", 'String'>
    readonly data: FieldRef<"StaffConfig", 'Json'>
    readonly updatedByUserId: FieldRef<"StaffConfig", 'String'>
    readonly createdAt: FieldRef<"StaffConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"StaffConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StaffConfig findUnique
   */
  export type StaffConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * Filter, which StaffConfig to fetch.
     */
    where: StaffConfigWhereUniqueInput
  }

  /**
   * StaffConfig findUniqueOrThrow
   */
  export type StaffConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * Filter, which StaffConfig to fetch.
     */
    where: StaffConfigWhereUniqueInput
  }

  /**
   * StaffConfig findFirst
   */
  export type StaffConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * Filter, which StaffConfig to fetch.
     */
    where?: StaffConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffConfigs to fetch.
     */
    orderBy?: StaffConfigOrderByWithRelationInput | StaffConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffConfigs.
     */
    cursor?: StaffConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffConfigs.
     */
    distinct?: StaffConfigScalarFieldEnum | StaffConfigScalarFieldEnum[]
  }

  /**
   * StaffConfig findFirstOrThrow
   */
  export type StaffConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * Filter, which StaffConfig to fetch.
     */
    where?: StaffConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffConfigs to fetch.
     */
    orderBy?: StaffConfigOrderByWithRelationInput | StaffConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffConfigs.
     */
    cursor?: StaffConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffConfigs.
     */
    distinct?: StaffConfigScalarFieldEnum | StaffConfigScalarFieldEnum[]
  }

  /**
   * StaffConfig findMany
   */
  export type StaffConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * Filter, which StaffConfigs to fetch.
     */
    where?: StaffConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffConfigs to fetch.
     */
    orderBy?: StaffConfigOrderByWithRelationInput | StaffConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffConfigs.
     */
    cursor?: StaffConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffConfigs.
     */
    skip?: number
    distinct?: StaffConfigScalarFieldEnum | StaffConfigScalarFieldEnum[]
  }

  /**
   * StaffConfig create
   */
  export type StaffConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffConfig.
     */
    data: XOR<StaffConfigCreateInput, StaffConfigUncheckedCreateInput>
  }

  /**
   * StaffConfig createMany
   */
  export type StaffConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffConfigs.
     */
    data: StaffConfigCreateManyInput | StaffConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StaffConfig createManyAndReturn
   */
  export type StaffConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * The data used to create many StaffConfigs.
     */
    data: StaffConfigCreateManyInput | StaffConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffConfig update
   */
  export type StaffConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffConfig.
     */
    data: XOR<StaffConfigUpdateInput, StaffConfigUncheckedUpdateInput>
    /**
     * Choose, which StaffConfig to update.
     */
    where: StaffConfigWhereUniqueInput
  }

  /**
   * StaffConfig updateMany
   */
  export type StaffConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffConfigs.
     */
    data: XOR<StaffConfigUpdateManyMutationInput, StaffConfigUncheckedUpdateManyInput>
    /**
     * Filter which StaffConfigs to update
     */
    where?: StaffConfigWhereInput
    /**
     * Limit how many StaffConfigs to update.
     */
    limit?: number
  }

  /**
   * StaffConfig updateManyAndReturn
   */
  export type StaffConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * The data used to update StaffConfigs.
     */
    data: XOR<StaffConfigUpdateManyMutationInput, StaffConfigUncheckedUpdateManyInput>
    /**
     * Filter which StaffConfigs to update
     */
    where?: StaffConfigWhereInput
    /**
     * Limit how many StaffConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffConfig upsert
   */
  export type StaffConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffConfig to update in case it exists.
     */
    where: StaffConfigWhereUniqueInput
    /**
     * In case the StaffConfig found by the `where` argument doesn't exist, create a new StaffConfig with this data.
     */
    create: XOR<StaffConfigCreateInput, StaffConfigUncheckedCreateInput>
    /**
     * In case the StaffConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffConfigUpdateInput, StaffConfigUncheckedUpdateInput>
  }

  /**
   * StaffConfig delete
   */
  export type StaffConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
    /**
     * Filter which StaffConfig to delete.
     */
    where: StaffConfigWhereUniqueInput
  }

  /**
   * StaffConfig deleteMany
   */
  export type StaffConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffConfigs to delete
     */
    where?: StaffConfigWhereInput
    /**
     * Limit how many StaffConfigs to delete.
     */
    limit?: number
  }

  /**
   * StaffConfig without action
   */
  export type StaffConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffConfig
     */
    select?: StaffConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffConfig
     */
    omit?: StaffConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffConfigInclude<ExtArgs> | null
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


  export const StaffScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    staffType: 'staffType',
    roleId: 'roleId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffScalarFieldEnum = (typeof StaffScalarFieldEnum)[keyof typeof StaffScalarFieldEnum]


  export const StaffLocationScalarFieldEnum: {
    id: 'id',
    staffId: 'staffId',
    locationId: 'locationId'
  };

  export type StaffLocationScalarFieldEnum = (typeof StaffLocationScalarFieldEnum)[keyof typeof StaffLocationScalarFieldEnum]


  export const StaffConfigScalarFieldEnum: {
    id: 'id',
    staffId: 'staffId',
    namespace: 'namespace',
    data: 'data',
    updatedByUserId: 'updatedByUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffConfigScalarFieldEnum = (typeof StaffConfigScalarFieldEnum)[keyof typeof StaffConfigScalarFieldEnum]


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
   * Reference to a field of type 'StaffType'
   */
  export type EnumStaffTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StaffType'>
    


  /**
   * Reference to a field of type 'StaffType[]'
   */
  export type ListEnumStaffTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StaffType[]'>
    


  /**
   * Reference to a field of type 'StaffStatus'
   */
  export type EnumStaffStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StaffStatus'>
    


  /**
   * Reference to a field of type 'StaffStatus[]'
   */
  export type ListEnumStaffStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StaffStatus[]'>
    


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


  export type StaffWhereInput = {
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    id?: StringFilter<"Staff"> | string
    tenantId?: StringFilter<"Staff"> | string
    firstName?: StringFilter<"Staff"> | string
    lastName?: StringFilter<"Staff"> | string
    email?: StringFilter<"Staff"> | string
    phone?: StringNullableFilter<"Staff"> | string | null
    staffType?: EnumStaffTypeFilter<"Staff"> | $Enums.StaffType
    roleId?: StringFilter<"Staff"> | string
    status?: EnumStaffStatusFilter<"Staff"> | $Enums.StaffStatus
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
    locations?: StaffLocationListRelationFilter
    configs?: StaffConfigListRelationFilter
  }

  export type StaffOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    staffType?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    locations?: StaffLocationOrderByRelationAggregateInput
    configs?: StaffConfigOrderByRelationAggregateInput
  }

  export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_email?: StaffTenantIdEmailCompoundUniqueInput
    AND?: StaffWhereInput | StaffWhereInput[]
    OR?: StaffWhereInput[]
    NOT?: StaffWhereInput | StaffWhereInput[]
    tenantId?: StringFilter<"Staff"> | string
    firstName?: StringFilter<"Staff"> | string
    lastName?: StringFilter<"Staff"> | string
    email?: StringFilter<"Staff"> | string
    phone?: StringNullableFilter<"Staff"> | string | null
    staffType?: EnumStaffTypeFilter<"Staff"> | $Enums.StaffType
    roleId?: StringFilter<"Staff"> | string
    status?: EnumStaffStatusFilter<"Staff"> | $Enums.StaffStatus
    createdAt?: DateTimeFilter<"Staff"> | Date | string
    updatedAt?: DateTimeFilter<"Staff"> | Date | string
    locations?: StaffLocationListRelationFilter
    configs?: StaffConfigListRelationFilter
  }, "id" | "tenantId_email">

  export type StaffOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    staffType?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffCountOrderByAggregateInput
    _max?: StaffMaxOrderByAggregateInput
    _min?: StaffMinOrderByAggregateInput
  }

  export type StaffScalarWhereWithAggregatesInput = {
    AND?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    OR?: StaffScalarWhereWithAggregatesInput[]
    NOT?: StaffScalarWhereWithAggregatesInput | StaffScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Staff"> | string
    tenantId?: StringWithAggregatesFilter<"Staff"> | string
    firstName?: StringWithAggregatesFilter<"Staff"> | string
    lastName?: StringWithAggregatesFilter<"Staff"> | string
    email?: StringWithAggregatesFilter<"Staff"> | string
    phone?: StringNullableWithAggregatesFilter<"Staff"> | string | null
    staffType?: EnumStaffTypeWithAggregatesFilter<"Staff"> | $Enums.StaffType
    roleId?: StringWithAggregatesFilter<"Staff"> | string
    status?: EnumStaffStatusWithAggregatesFilter<"Staff"> | $Enums.StaffStatus
    createdAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Staff"> | Date | string
  }

  export type StaffLocationWhereInput = {
    AND?: StaffLocationWhereInput | StaffLocationWhereInput[]
    OR?: StaffLocationWhereInput[]
    NOT?: StaffLocationWhereInput | StaffLocationWhereInput[]
    id?: StringFilter<"StaffLocation"> | string
    staffId?: StringFilter<"StaffLocation"> | string
    locationId?: StringFilter<"StaffLocation"> | string
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
  }

  export type StaffLocationOrderByWithRelationInput = {
    id?: SortOrder
    staffId?: SortOrder
    locationId?: SortOrder
    staff?: StaffOrderByWithRelationInput
  }

  export type StaffLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    staffId_locationId?: StaffLocationStaffIdLocationIdCompoundUniqueInput
    AND?: StaffLocationWhereInput | StaffLocationWhereInput[]
    OR?: StaffLocationWhereInput[]
    NOT?: StaffLocationWhereInput | StaffLocationWhereInput[]
    staffId?: StringFilter<"StaffLocation"> | string
    locationId?: StringFilter<"StaffLocation"> | string
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
  }, "id" | "staffId_locationId">

  export type StaffLocationOrderByWithAggregationInput = {
    id?: SortOrder
    staffId?: SortOrder
    locationId?: SortOrder
    _count?: StaffLocationCountOrderByAggregateInput
    _max?: StaffLocationMaxOrderByAggregateInput
    _min?: StaffLocationMinOrderByAggregateInput
  }

  export type StaffLocationScalarWhereWithAggregatesInput = {
    AND?: StaffLocationScalarWhereWithAggregatesInput | StaffLocationScalarWhereWithAggregatesInput[]
    OR?: StaffLocationScalarWhereWithAggregatesInput[]
    NOT?: StaffLocationScalarWhereWithAggregatesInput | StaffLocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StaffLocation"> | string
    staffId?: StringWithAggregatesFilter<"StaffLocation"> | string
    locationId?: StringWithAggregatesFilter<"StaffLocation"> | string
  }

  export type StaffConfigWhereInput = {
    AND?: StaffConfigWhereInput | StaffConfigWhereInput[]
    OR?: StaffConfigWhereInput[]
    NOT?: StaffConfigWhereInput | StaffConfigWhereInput[]
    id?: StringFilter<"StaffConfig"> | string
    staffId?: StringFilter<"StaffConfig"> | string
    namespace?: StringFilter<"StaffConfig"> | string
    data?: JsonFilter<"StaffConfig">
    updatedByUserId?: StringNullableFilter<"StaffConfig"> | string | null
    createdAt?: DateTimeFilter<"StaffConfig"> | Date | string
    updatedAt?: DateTimeFilter<"StaffConfig"> | Date | string
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
  }

  export type StaffConfigOrderByWithRelationInput = {
    id?: SortOrder
    staffId?: SortOrder
    namespace?: SortOrder
    data?: SortOrder
    updatedByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    staff?: StaffOrderByWithRelationInput
  }

  export type StaffConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    staffId_namespace?: StaffConfigStaffIdNamespaceCompoundUniqueInput
    AND?: StaffConfigWhereInput | StaffConfigWhereInput[]
    OR?: StaffConfigWhereInput[]
    NOT?: StaffConfigWhereInput | StaffConfigWhereInput[]
    staffId?: StringFilter<"StaffConfig"> | string
    namespace?: StringFilter<"StaffConfig"> | string
    data?: JsonFilter<"StaffConfig">
    updatedByUserId?: StringNullableFilter<"StaffConfig"> | string | null
    createdAt?: DateTimeFilter<"StaffConfig"> | Date | string
    updatedAt?: DateTimeFilter<"StaffConfig"> | Date | string
    staff?: XOR<StaffScalarRelationFilter, StaffWhereInput>
  }, "id" | "staffId_namespace">

  export type StaffConfigOrderByWithAggregationInput = {
    id?: SortOrder
    staffId?: SortOrder
    namespace?: SortOrder
    data?: SortOrder
    updatedByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffConfigCountOrderByAggregateInput
    _max?: StaffConfigMaxOrderByAggregateInput
    _min?: StaffConfigMinOrderByAggregateInput
  }

  export type StaffConfigScalarWhereWithAggregatesInput = {
    AND?: StaffConfigScalarWhereWithAggregatesInput | StaffConfigScalarWhereWithAggregatesInput[]
    OR?: StaffConfigScalarWhereWithAggregatesInput[]
    NOT?: StaffConfigScalarWhereWithAggregatesInput | StaffConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StaffConfig"> | string
    staffId?: StringWithAggregatesFilter<"StaffConfig"> | string
    namespace?: StringWithAggregatesFilter<"StaffConfig"> | string
    data?: JsonWithAggregatesFilter<"StaffConfig">
    updatedByUserId?: StringNullableWithAggregatesFilter<"StaffConfig"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StaffConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StaffConfig"> | Date | string
  }

  export type StaffCreateInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    staffType: $Enums.StaffType
    roleId: string
    status?: $Enums.StaffStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: StaffLocationCreateNestedManyWithoutStaffInput
    configs?: StaffConfigCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    staffType: $Enums.StaffType
    roleId: string
    status?: $Enums.StaffStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: StaffLocationUncheckedCreateNestedManyWithoutStaffInput
    configs?: StaffConfigUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    staffType?: EnumStaffTypeFieldUpdateOperationsInput | $Enums.StaffType
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumStaffStatusFieldUpdateOperationsInput | $Enums.StaffStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: StaffLocationUpdateManyWithoutStaffNestedInput
    configs?: StaffConfigUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    staffType?: EnumStaffTypeFieldUpdateOperationsInput | $Enums.StaffType
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumStaffStatusFieldUpdateOperationsInput | $Enums.StaffStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: StaffLocationUncheckedUpdateManyWithoutStaffNestedInput
    configs?: StaffConfigUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type StaffCreateManyInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    staffType: $Enums.StaffType
    roleId: string
    status?: $Enums.StaffStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    staffType?: EnumStaffTypeFieldUpdateOperationsInput | $Enums.StaffType
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumStaffStatusFieldUpdateOperationsInput | $Enums.StaffStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    staffType?: EnumStaffTypeFieldUpdateOperationsInput | $Enums.StaffType
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumStaffStatusFieldUpdateOperationsInput | $Enums.StaffStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffLocationCreateInput = {
    id?: string
    locationId: string
    staff: StaffCreateNestedOneWithoutLocationsInput
  }

  export type StaffLocationUncheckedCreateInput = {
    id?: string
    staffId: string
    locationId: string
  }

  export type StaffLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    staff?: StaffUpdateOneRequiredWithoutLocationsNestedInput
  }

  export type StaffLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type StaffLocationCreateManyInput = {
    id?: string
    staffId: string
    locationId: string
  }

  export type StaffLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type StaffLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type StaffConfigCreateInput = {
    id?: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    staff: StaffCreateNestedOneWithoutConfigsInput
  }

  export type StaffConfigUncheckedCreateInput = {
    id?: string
    staffId: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staff?: StaffUpdateOneRequiredWithoutConfigsNestedInput
  }

  export type StaffConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffConfigCreateManyInput = {
    id?: string
    staffId: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumStaffTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffType | EnumStaffTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StaffType[] | ListEnumStaffTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffType[] | ListEnumStaffTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffTypeFilter<$PrismaModel> | $Enums.StaffType
  }

  export type EnumStaffStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffStatus | EnumStaffStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StaffStatus[] | ListEnumStaffStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffStatus[] | ListEnumStaffStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffStatusFilter<$PrismaModel> | $Enums.StaffStatus
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

  export type StaffLocationListRelationFilter = {
    every?: StaffLocationWhereInput
    some?: StaffLocationWhereInput
    none?: StaffLocationWhereInput
  }

  export type StaffConfigListRelationFilter = {
    every?: StaffConfigWhereInput
    some?: StaffConfigWhereInput
    none?: StaffConfigWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StaffLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffConfigOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffTenantIdEmailCompoundUniqueInput = {
    tenantId: string
    email: string
  }

  export type StaffCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    staffType?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    staffType?: SortOrder
    roleId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    staffType?: SortOrder
    roleId?: SortOrder
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

  export type EnumStaffTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffType | EnumStaffTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StaffType[] | ListEnumStaffTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffType[] | ListEnumStaffTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffTypeWithAggregatesFilter<$PrismaModel> | $Enums.StaffType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStaffTypeFilter<$PrismaModel>
    _max?: NestedEnumStaffTypeFilter<$PrismaModel>
  }

  export type EnumStaffStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffStatus | EnumStaffStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StaffStatus[] | ListEnumStaffStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffStatus[] | ListEnumStaffStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffStatusWithAggregatesFilter<$PrismaModel> | $Enums.StaffStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStaffStatusFilter<$PrismaModel>
    _max?: NestedEnumStaffStatusFilter<$PrismaModel>
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

  export type StaffScalarRelationFilter = {
    is?: StaffWhereInput
    isNot?: StaffWhereInput
  }

  export type StaffLocationStaffIdLocationIdCompoundUniqueInput = {
    staffId: string
    locationId: string
  }

  export type StaffLocationCountOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    locationId?: SortOrder
  }

  export type StaffLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    locationId?: SortOrder
  }

  export type StaffLocationMinOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    locationId?: SortOrder
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

  export type StaffConfigStaffIdNamespaceCompoundUniqueInput = {
    staffId: string
    namespace: string
  }

  export type StaffConfigCountOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    namespace?: SortOrder
    data?: SortOrder
    updatedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
    namespace?: SortOrder
    updatedByUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffConfigMinOrderByAggregateInput = {
    id?: SortOrder
    staffId?: SortOrder
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

  export type StaffLocationCreateNestedManyWithoutStaffInput = {
    create?: XOR<StaffLocationCreateWithoutStaffInput, StaffLocationUncheckedCreateWithoutStaffInput> | StaffLocationCreateWithoutStaffInput[] | StaffLocationUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffLocationCreateOrConnectWithoutStaffInput | StaffLocationCreateOrConnectWithoutStaffInput[]
    createMany?: StaffLocationCreateManyStaffInputEnvelope
    connect?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
  }

  export type StaffConfigCreateNestedManyWithoutStaffInput = {
    create?: XOR<StaffConfigCreateWithoutStaffInput, StaffConfigUncheckedCreateWithoutStaffInput> | StaffConfigCreateWithoutStaffInput[] | StaffConfigUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffConfigCreateOrConnectWithoutStaffInput | StaffConfigCreateOrConnectWithoutStaffInput[]
    createMany?: StaffConfigCreateManyStaffInputEnvelope
    connect?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
  }

  export type StaffLocationUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<StaffLocationCreateWithoutStaffInput, StaffLocationUncheckedCreateWithoutStaffInput> | StaffLocationCreateWithoutStaffInput[] | StaffLocationUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffLocationCreateOrConnectWithoutStaffInput | StaffLocationCreateOrConnectWithoutStaffInput[]
    createMany?: StaffLocationCreateManyStaffInputEnvelope
    connect?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
  }

  export type StaffConfigUncheckedCreateNestedManyWithoutStaffInput = {
    create?: XOR<StaffConfigCreateWithoutStaffInput, StaffConfigUncheckedCreateWithoutStaffInput> | StaffConfigCreateWithoutStaffInput[] | StaffConfigUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffConfigCreateOrConnectWithoutStaffInput | StaffConfigCreateOrConnectWithoutStaffInput[]
    createMany?: StaffConfigCreateManyStaffInputEnvelope
    connect?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumStaffTypeFieldUpdateOperationsInput = {
    set?: $Enums.StaffType
  }

  export type EnumStaffStatusFieldUpdateOperationsInput = {
    set?: $Enums.StaffStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StaffLocationUpdateManyWithoutStaffNestedInput = {
    create?: XOR<StaffLocationCreateWithoutStaffInput, StaffLocationUncheckedCreateWithoutStaffInput> | StaffLocationCreateWithoutStaffInput[] | StaffLocationUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffLocationCreateOrConnectWithoutStaffInput | StaffLocationCreateOrConnectWithoutStaffInput[]
    upsert?: StaffLocationUpsertWithWhereUniqueWithoutStaffInput | StaffLocationUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: StaffLocationCreateManyStaffInputEnvelope
    set?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
    disconnect?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
    delete?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
    connect?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
    update?: StaffLocationUpdateWithWhereUniqueWithoutStaffInput | StaffLocationUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: StaffLocationUpdateManyWithWhereWithoutStaffInput | StaffLocationUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: StaffLocationScalarWhereInput | StaffLocationScalarWhereInput[]
  }

  export type StaffConfigUpdateManyWithoutStaffNestedInput = {
    create?: XOR<StaffConfigCreateWithoutStaffInput, StaffConfigUncheckedCreateWithoutStaffInput> | StaffConfigCreateWithoutStaffInput[] | StaffConfigUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffConfigCreateOrConnectWithoutStaffInput | StaffConfigCreateOrConnectWithoutStaffInput[]
    upsert?: StaffConfigUpsertWithWhereUniqueWithoutStaffInput | StaffConfigUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: StaffConfigCreateManyStaffInputEnvelope
    set?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
    disconnect?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
    delete?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
    connect?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
    update?: StaffConfigUpdateWithWhereUniqueWithoutStaffInput | StaffConfigUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: StaffConfigUpdateManyWithWhereWithoutStaffInput | StaffConfigUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: StaffConfigScalarWhereInput | StaffConfigScalarWhereInput[]
  }

  export type StaffLocationUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<StaffLocationCreateWithoutStaffInput, StaffLocationUncheckedCreateWithoutStaffInput> | StaffLocationCreateWithoutStaffInput[] | StaffLocationUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffLocationCreateOrConnectWithoutStaffInput | StaffLocationCreateOrConnectWithoutStaffInput[]
    upsert?: StaffLocationUpsertWithWhereUniqueWithoutStaffInput | StaffLocationUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: StaffLocationCreateManyStaffInputEnvelope
    set?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
    disconnect?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
    delete?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
    connect?: StaffLocationWhereUniqueInput | StaffLocationWhereUniqueInput[]
    update?: StaffLocationUpdateWithWhereUniqueWithoutStaffInput | StaffLocationUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: StaffLocationUpdateManyWithWhereWithoutStaffInput | StaffLocationUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: StaffLocationScalarWhereInput | StaffLocationScalarWhereInput[]
  }

  export type StaffConfigUncheckedUpdateManyWithoutStaffNestedInput = {
    create?: XOR<StaffConfigCreateWithoutStaffInput, StaffConfigUncheckedCreateWithoutStaffInput> | StaffConfigCreateWithoutStaffInput[] | StaffConfigUncheckedCreateWithoutStaffInput[]
    connectOrCreate?: StaffConfigCreateOrConnectWithoutStaffInput | StaffConfigCreateOrConnectWithoutStaffInput[]
    upsert?: StaffConfigUpsertWithWhereUniqueWithoutStaffInput | StaffConfigUpsertWithWhereUniqueWithoutStaffInput[]
    createMany?: StaffConfigCreateManyStaffInputEnvelope
    set?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
    disconnect?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
    delete?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
    connect?: StaffConfigWhereUniqueInput | StaffConfigWhereUniqueInput[]
    update?: StaffConfigUpdateWithWhereUniqueWithoutStaffInput | StaffConfigUpdateWithWhereUniqueWithoutStaffInput[]
    updateMany?: StaffConfigUpdateManyWithWhereWithoutStaffInput | StaffConfigUpdateManyWithWhereWithoutStaffInput[]
    deleteMany?: StaffConfigScalarWhereInput | StaffConfigScalarWhereInput[]
  }

  export type StaffCreateNestedOneWithoutLocationsInput = {
    create?: XOR<StaffCreateWithoutLocationsInput, StaffUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutLocationsInput
    connect?: StaffWhereUniqueInput
  }

  export type StaffUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<StaffCreateWithoutLocationsInput, StaffUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutLocationsInput
    upsert?: StaffUpsertWithoutLocationsInput
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutLocationsInput, StaffUpdateWithoutLocationsInput>, StaffUncheckedUpdateWithoutLocationsInput>
  }

  export type StaffCreateNestedOneWithoutConfigsInput = {
    create?: XOR<StaffCreateWithoutConfigsInput, StaffUncheckedCreateWithoutConfigsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutConfigsInput
    connect?: StaffWhereUniqueInput
  }

  export type StaffUpdateOneRequiredWithoutConfigsNestedInput = {
    create?: XOR<StaffCreateWithoutConfigsInput, StaffUncheckedCreateWithoutConfigsInput>
    connectOrCreate?: StaffCreateOrConnectWithoutConfigsInput
    upsert?: StaffUpsertWithoutConfigsInput
    connect?: StaffWhereUniqueInput
    update?: XOR<XOR<StaffUpdateToOneWithWhereWithoutConfigsInput, StaffUpdateWithoutConfigsInput>, StaffUncheckedUpdateWithoutConfigsInput>
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

  export type NestedEnumStaffTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffType | EnumStaffTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StaffType[] | ListEnumStaffTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffType[] | ListEnumStaffTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffTypeFilter<$PrismaModel> | $Enums.StaffType
  }

  export type NestedEnumStaffStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffStatus | EnumStaffStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StaffStatus[] | ListEnumStaffStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffStatus[] | ListEnumStaffStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffStatusFilter<$PrismaModel> | $Enums.StaffStatus
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

  export type NestedEnumStaffTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffType | EnumStaffTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StaffType[] | ListEnumStaffTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffType[] | ListEnumStaffTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffTypeWithAggregatesFilter<$PrismaModel> | $Enums.StaffType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStaffTypeFilter<$PrismaModel>
    _max?: NestedEnumStaffTypeFilter<$PrismaModel>
  }

  export type NestedEnumStaffStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StaffStatus | EnumStaffStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StaffStatus[] | ListEnumStaffStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StaffStatus[] | ListEnumStaffStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStaffStatusWithAggregatesFilter<$PrismaModel> | $Enums.StaffStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStaffStatusFilter<$PrismaModel>
    _max?: NestedEnumStaffStatusFilter<$PrismaModel>
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

  export type StaffLocationCreateWithoutStaffInput = {
    id?: string
    locationId: string
  }

  export type StaffLocationUncheckedCreateWithoutStaffInput = {
    id?: string
    locationId: string
  }

  export type StaffLocationCreateOrConnectWithoutStaffInput = {
    where: StaffLocationWhereUniqueInput
    create: XOR<StaffLocationCreateWithoutStaffInput, StaffLocationUncheckedCreateWithoutStaffInput>
  }

  export type StaffLocationCreateManyStaffInputEnvelope = {
    data: StaffLocationCreateManyStaffInput | StaffLocationCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type StaffConfigCreateWithoutStaffInput = {
    id?: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffConfigUncheckedCreateWithoutStaffInput = {
    id?: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffConfigCreateOrConnectWithoutStaffInput = {
    where: StaffConfigWhereUniqueInput
    create: XOR<StaffConfigCreateWithoutStaffInput, StaffConfigUncheckedCreateWithoutStaffInput>
  }

  export type StaffConfigCreateManyStaffInputEnvelope = {
    data: StaffConfigCreateManyStaffInput | StaffConfigCreateManyStaffInput[]
    skipDuplicates?: boolean
  }

  export type StaffLocationUpsertWithWhereUniqueWithoutStaffInput = {
    where: StaffLocationWhereUniqueInput
    update: XOR<StaffLocationUpdateWithoutStaffInput, StaffLocationUncheckedUpdateWithoutStaffInput>
    create: XOR<StaffLocationCreateWithoutStaffInput, StaffLocationUncheckedCreateWithoutStaffInput>
  }

  export type StaffLocationUpdateWithWhereUniqueWithoutStaffInput = {
    where: StaffLocationWhereUniqueInput
    data: XOR<StaffLocationUpdateWithoutStaffInput, StaffLocationUncheckedUpdateWithoutStaffInput>
  }

  export type StaffLocationUpdateManyWithWhereWithoutStaffInput = {
    where: StaffLocationScalarWhereInput
    data: XOR<StaffLocationUpdateManyMutationInput, StaffLocationUncheckedUpdateManyWithoutStaffInput>
  }

  export type StaffLocationScalarWhereInput = {
    AND?: StaffLocationScalarWhereInput | StaffLocationScalarWhereInput[]
    OR?: StaffLocationScalarWhereInput[]
    NOT?: StaffLocationScalarWhereInput | StaffLocationScalarWhereInput[]
    id?: StringFilter<"StaffLocation"> | string
    staffId?: StringFilter<"StaffLocation"> | string
    locationId?: StringFilter<"StaffLocation"> | string
  }

  export type StaffConfigUpsertWithWhereUniqueWithoutStaffInput = {
    where: StaffConfigWhereUniqueInput
    update: XOR<StaffConfigUpdateWithoutStaffInput, StaffConfigUncheckedUpdateWithoutStaffInput>
    create: XOR<StaffConfigCreateWithoutStaffInput, StaffConfigUncheckedCreateWithoutStaffInput>
  }

  export type StaffConfigUpdateWithWhereUniqueWithoutStaffInput = {
    where: StaffConfigWhereUniqueInput
    data: XOR<StaffConfigUpdateWithoutStaffInput, StaffConfigUncheckedUpdateWithoutStaffInput>
  }

  export type StaffConfigUpdateManyWithWhereWithoutStaffInput = {
    where: StaffConfigScalarWhereInput
    data: XOR<StaffConfigUpdateManyMutationInput, StaffConfigUncheckedUpdateManyWithoutStaffInput>
  }

  export type StaffConfigScalarWhereInput = {
    AND?: StaffConfigScalarWhereInput | StaffConfigScalarWhereInput[]
    OR?: StaffConfigScalarWhereInput[]
    NOT?: StaffConfigScalarWhereInput | StaffConfigScalarWhereInput[]
    id?: StringFilter<"StaffConfig"> | string
    staffId?: StringFilter<"StaffConfig"> | string
    namespace?: StringFilter<"StaffConfig"> | string
    data?: JsonFilter<"StaffConfig">
    updatedByUserId?: StringNullableFilter<"StaffConfig"> | string | null
    createdAt?: DateTimeFilter<"StaffConfig"> | Date | string
    updatedAt?: DateTimeFilter<"StaffConfig"> | Date | string
  }

  export type StaffCreateWithoutLocationsInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    staffType: $Enums.StaffType
    roleId: string
    status?: $Enums.StaffStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    configs?: StaffConfigCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutLocationsInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    staffType: $Enums.StaffType
    roleId: string
    status?: $Enums.StaffStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    configs?: StaffConfigUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutLocationsInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutLocationsInput, StaffUncheckedCreateWithoutLocationsInput>
  }

  export type StaffUpsertWithoutLocationsInput = {
    update: XOR<StaffUpdateWithoutLocationsInput, StaffUncheckedUpdateWithoutLocationsInput>
    create: XOR<StaffCreateWithoutLocationsInput, StaffUncheckedCreateWithoutLocationsInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutLocationsInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutLocationsInput, StaffUncheckedUpdateWithoutLocationsInput>
  }

  export type StaffUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    staffType?: EnumStaffTypeFieldUpdateOperationsInput | $Enums.StaffType
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumStaffStatusFieldUpdateOperationsInput | $Enums.StaffStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configs?: StaffConfigUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    staffType?: EnumStaffTypeFieldUpdateOperationsInput | $Enums.StaffType
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumStaffStatusFieldUpdateOperationsInput | $Enums.StaffStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    configs?: StaffConfigUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type StaffCreateWithoutConfigsInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    staffType: $Enums.StaffType
    roleId: string
    status?: $Enums.StaffStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: StaffLocationCreateNestedManyWithoutStaffInput
  }

  export type StaffUncheckedCreateWithoutConfigsInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    staffType: $Enums.StaffType
    roleId: string
    status?: $Enums.StaffStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: StaffLocationUncheckedCreateNestedManyWithoutStaffInput
  }

  export type StaffCreateOrConnectWithoutConfigsInput = {
    where: StaffWhereUniqueInput
    create: XOR<StaffCreateWithoutConfigsInput, StaffUncheckedCreateWithoutConfigsInput>
  }

  export type StaffUpsertWithoutConfigsInput = {
    update: XOR<StaffUpdateWithoutConfigsInput, StaffUncheckedUpdateWithoutConfigsInput>
    create: XOR<StaffCreateWithoutConfigsInput, StaffUncheckedCreateWithoutConfigsInput>
    where?: StaffWhereInput
  }

  export type StaffUpdateToOneWithWhereWithoutConfigsInput = {
    where?: StaffWhereInput
    data: XOR<StaffUpdateWithoutConfigsInput, StaffUncheckedUpdateWithoutConfigsInput>
  }

  export type StaffUpdateWithoutConfigsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    staffType?: EnumStaffTypeFieldUpdateOperationsInput | $Enums.StaffType
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumStaffStatusFieldUpdateOperationsInput | $Enums.StaffStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: StaffLocationUpdateManyWithoutStaffNestedInput
  }

  export type StaffUncheckedUpdateWithoutConfigsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    staffType?: EnumStaffTypeFieldUpdateOperationsInput | $Enums.StaffType
    roleId?: StringFieldUpdateOperationsInput | string
    status?: EnumStaffStatusFieldUpdateOperationsInput | $Enums.StaffStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: StaffLocationUncheckedUpdateManyWithoutStaffNestedInput
  }

  export type StaffLocationCreateManyStaffInput = {
    id?: string
    locationId: string
  }

  export type StaffConfigCreateManyStaffInput = {
    id?: string
    namespace: string
    data: JsonNullValueInput | InputJsonValue
    updatedByUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffLocationUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type StaffLocationUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type StaffLocationUncheckedUpdateManyWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type StaffConfigUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffConfigUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffConfigUncheckedUpdateManyWithoutStaffInput = {
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