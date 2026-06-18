
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
 * Model Prescription
 * 
 */
export type Prescription = $Result.DefaultSelection<Prisma.$PrescriptionPayload>
/**
 * Model PharmacyFulfillment
 * 
 */
export type PharmacyFulfillment = $Result.DefaultSelection<Prisma.$PharmacyFulfillmentPayload>
/**
 * Model PharmacyAuditLog
 * 
 */
export type PharmacyAuditLog = $Result.DefaultSelection<Prisma.$PharmacyAuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PrescriptionStatus: {
  DRAFT: 'DRAFT',
  ISSUED: 'ISSUED',
  DISPENSED: 'DISPENSED',
  CANCELLED: 'CANCELLED'
};

export type PrescriptionStatus = (typeof PrescriptionStatus)[keyof typeof PrescriptionStatus]


export const FulfillmentStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type FulfillmentStatus = (typeof FulfillmentStatus)[keyof typeof FulfillmentStatus]

}

export type PrescriptionStatus = $Enums.PrescriptionStatus

export const PrescriptionStatus: typeof $Enums.PrescriptionStatus

export type FulfillmentStatus = $Enums.FulfillmentStatus

export const FulfillmentStatus: typeof $Enums.FulfillmentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Prescriptions
 * const prescriptions = await prisma.prescription.findMany()
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
   * // Fetch zero or more Prescriptions
   * const prescriptions = await prisma.prescription.findMany()
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
   * `prisma.prescription`: Exposes CRUD operations for the **Prescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prescriptions
    * const prescriptions = await prisma.prescription.findMany()
    * ```
    */
  get prescription(): Prisma.PrescriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pharmacyFulfillment`: Exposes CRUD operations for the **PharmacyFulfillment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PharmacyFulfillments
    * const pharmacyFulfillments = await prisma.pharmacyFulfillment.findMany()
    * ```
    */
  get pharmacyFulfillment(): Prisma.PharmacyFulfillmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pharmacyAuditLog`: Exposes CRUD operations for the **PharmacyAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PharmacyAuditLogs
    * const pharmacyAuditLogs = await prisma.pharmacyAuditLog.findMany()
    * ```
    */
  get pharmacyAuditLog(): Prisma.PharmacyAuditLogDelegate<ExtArgs, ClientOptions>;
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
    Prescription: 'Prescription',
    PharmacyFulfillment: 'PharmacyFulfillment',
    PharmacyAuditLog: 'PharmacyAuditLog'
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
      modelProps: "prescription" | "pharmacyFulfillment" | "pharmacyAuditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Prescription: {
        payload: Prisma.$PrescriptionPayload<ExtArgs>
        fields: Prisma.PrescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findFirst: {
            args: Prisma.PrescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findMany: {
            args: Prisma.PrescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          create: {
            args: Prisma.PrescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          createMany: {
            args: Prisma.PrescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrescriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          delete: {
            args: Prisma.PrescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          update: {
            args: Prisma.PrescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          deleteMany: {
            args: Prisma.PrescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrescriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          upsert: {
            args: Prisma.PrescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          aggregate: {
            args: Prisma.PrescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrescription>
          }
          groupBy: {
            args: Prisma.PrescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionCountAggregateOutputType> | number
          }
        }
      }
      PharmacyFulfillment: {
        payload: Prisma.$PharmacyFulfillmentPayload<ExtArgs>
        fields: Prisma.PharmacyFulfillmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PharmacyFulfillmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PharmacyFulfillmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>
          }
          findFirst: {
            args: Prisma.PharmacyFulfillmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PharmacyFulfillmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>
          }
          findMany: {
            args: Prisma.PharmacyFulfillmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>[]
          }
          create: {
            args: Prisma.PharmacyFulfillmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>
          }
          createMany: {
            args: Prisma.PharmacyFulfillmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PharmacyFulfillmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>[]
          }
          delete: {
            args: Prisma.PharmacyFulfillmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>
          }
          update: {
            args: Prisma.PharmacyFulfillmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>
          }
          deleteMany: {
            args: Prisma.PharmacyFulfillmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PharmacyFulfillmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PharmacyFulfillmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>[]
          }
          upsert: {
            args: Prisma.PharmacyFulfillmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyFulfillmentPayload>
          }
          aggregate: {
            args: Prisma.PharmacyFulfillmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePharmacyFulfillment>
          }
          groupBy: {
            args: Prisma.PharmacyFulfillmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PharmacyFulfillmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PharmacyFulfillmentCountArgs<ExtArgs>
            result: $Utils.Optional<PharmacyFulfillmentCountAggregateOutputType> | number
          }
        }
      }
      PharmacyAuditLog: {
        payload: Prisma.$PharmacyAuditLogPayload<ExtArgs>
        fields: Prisma.PharmacyAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PharmacyAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PharmacyAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>
          }
          findFirst: {
            args: Prisma.PharmacyAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PharmacyAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>
          }
          findMany: {
            args: Prisma.PharmacyAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>[]
          }
          create: {
            args: Prisma.PharmacyAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>
          }
          createMany: {
            args: Prisma.PharmacyAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PharmacyAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>[]
          }
          delete: {
            args: Prisma.PharmacyAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>
          }
          update: {
            args: Prisma.PharmacyAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.PharmacyAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PharmacyAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PharmacyAuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>[]
          }
          upsert: {
            args: Prisma.PharmacyAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyAuditLogPayload>
          }
          aggregate: {
            args: Prisma.PharmacyAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePharmacyAuditLog>
          }
          groupBy: {
            args: Prisma.PharmacyAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<PharmacyAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.PharmacyAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<PharmacyAuditLogCountAggregateOutputType> | number
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
    prescription?: PrescriptionOmit
    pharmacyFulfillment?: PharmacyFulfillmentOmit
    pharmacyAuditLog?: PharmacyAuditLogOmit
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
   * Count Type PrescriptionCountOutputType
   */

  export type PrescriptionCountOutputType = {
    auditLogs: number
  }

  export type PrescriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | PrescriptionCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * PrescriptionCountOutputType without action
   */
  export type PrescriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrescriptionCountOutputType
     */
    select?: PrescriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PrescriptionCountOutputType without action
   */
  export type PrescriptionCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PharmacyAuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Prescription
   */

  export type AggregatePrescription = {
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  export type PrescriptionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    patientId: string | null
    therapistId: string | null
    medicationName: string | null
    dosage: string | null
    frequency: string | null
    duration: string | null
    notes: string | null
    status: $Enums.PrescriptionStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrescriptionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    patientId: string | null
    therapistId: string | null
    medicationName: string | null
    dosage: string | null
    frequency: string | null
    duration: string | null
    notes: string | null
    status: $Enums.PrescriptionStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrescriptionCountAggregateOutputType = {
    id: number
    tenantId: number
    patientId: number
    therapistId: number
    medicationName: number
    dosage: number
    frequency: number
    duration: number
    notes: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrescriptionMinAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    therapistId?: true
    medicationName?: true
    dosage?: true
    frequency?: true
    duration?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrescriptionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    therapistId?: true
    medicationName?: true
    dosage?: true
    frequency?: true
    duration?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrescriptionCountAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    therapistId?: true
    medicationName?: true
    dosage?: true
    frequency?: true
    duration?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescription to aggregate.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prescriptions
    **/
    _count?: true | PrescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrescriptionMaxAggregateInputType
  }

  export type GetPrescriptionAggregateType<T extends PrescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePrescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrescription[P]>
      : GetScalarType<T[P], AggregatePrescription[P]>
  }




  export type PrescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithAggregationInput | PrescriptionOrderByWithAggregationInput[]
    by: PrescriptionScalarFieldEnum[] | PrescriptionScalarFieldEnum
    having?: PrescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrescriptionCountAggregateInputType | true
    _min?: PrescriptionMinAggregateInputType
    _max?: PrescriptionMaxAggregateInputType
  }

  export type PrescriptionGroupByOutputType = {
    id: string
    tenantId: string
    patientId: string
    therapistId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    notes: string | null
    status: $Enums.PrescriptionStatus
    createdAt: Date
    updatedAt: Date
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  type GetPrescriptionGroupByPayload<T extends PrescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
        }
      >
    >


  export type PrescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    therapistId?: boolean
    medicationName?: boolean
    dosage?: boolean
    frequency?: boolean
    duration?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fulfillment?: boolean | Prescription$fulfillmentArgs<ExtArgs>
    auditLogs?: boolean | Prescription$auditLogsArgs<ExtArgs>
    _count?: boolean | PrescriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    therapistId?: boolean
    medicationName?: boolean
    dosage?: boolean
    frequency?: boolean
    duration?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    therapistId?: boolean
    medicationName?: boolean
    dosage?: boolean
    frequency?: boolean
    duration?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    therapistId?: boolean
    medicationName?: boolean
    dosage?: boolean
    frequency?: boolean
    duration?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrescriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "patientId" | "therapistId" | "medicationName" | "dosage" | "frequency" | "duration" | "notes" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["prescription"]>
  export type PrescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fulfillment?: boolean | Prescription$fulfillmentArgs<ExtArgs>
    auditLogs?: boolean | Prescription$auditLogsArgs<ExtArgs>
    _count?: boolean | PrescriptionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PrescriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PrescriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PrescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prescription"
    objects: {
      fulfillment: Prisma.$PharmacyFulfillmentPayload<ExtArgs> | null
      auditLogs: Prisma.$PharmacyAuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      patientId: string
      therapistId: string
      medicationName: string
      dosage: string
      frequency: string
      duration: string
      notes: string | null
      status: $Enums.PrescriptionStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["prescription"]>
    composites: {}
  }

  type PrescriptionGetPayload<S extends boolean | null | undefined | PrescriptionDefaultArgs> = $Result.GetResult<Prisma.$PrescriptionPayload, S>

  type PrescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrescriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrescriptionCountAggregateInputType | true
    }

  export interface PrescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prescription'], meta: { name: 'Prescription' } }
    /**
     * Find zero or one Prescription that matches the filter.
     * @param {PrescriptionFindUniqueArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrescriptionFindUniqueArgs>(args: SelectSubset<T, PrescriptionFindUniqueArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prescription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrescriptionFindUniqueOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, PrescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrescriptionFindFirstArgs>(args?: SelectSubset<T, PrescriptionFindFirstArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, PrescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prescriptions
     * const prescriptions = await prisma.prescription.findMany()
     * 
     * // Get first 10 Prescriptions
     * const prescriptions = await prisma.prescription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrescriptionFindManyArgs>(args?: SelectSubset<T, PrescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prescription.
     * @param {PrescriptionCreateArgs} args - Arguments to create a Prescription.
     * @example
     * // Create one Prescription
     * const Prescription = await prisma.prescription.create({
     *   data: {
     *     // ... data to create a Prescription
     *   }
     * })
     * 
     */
    create<T extends PrescriptionCreateArgs>(args: SelectSubset<T, PrescriptionCreateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prescriptions.
     * @param {PrescriptionCreateManyArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrescriptionCreateManyArgs>(args?: SelectSubset<T, PrescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prescriptions and returns the data saved in the database.
     * @param {PrescriptionCreateManyAndReturnArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrescriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, PrescriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prescription.
     * @param {PrescriptionDeleteArgs} args - Arguments to delete one Prescription.
     * @example
     * // Delete one Prescription
     * const Prescription = await prisma.prescription.delete({
     *   where: {
     *     // ... filter to delete one Prescription
     *   }
     * })
     * 
     */
    delete<T extends PrescriptionDeleteArgs>(args: SelectSubset<T, PrescriptionDeleteArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prescription.
     * @param {PrescriptionUpdateArgs} args - Arguments to update one Prescription.
     * @example
     * // Update one Prescription
     * const prescription = await prisma.prescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrescriptionUpdateArgs>(args: SelectSubset<T, PrescriptionUpdateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prescriptions.
     * @param {PrescriptionDeleteManyArgs} args - Arguments to filter Prescriptions to delete.
     * @example
     * // Delete a few Prescriptions
     * const { count } = await prisma.prescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrescriptionDeleteManyArgs>(args?: SelectSubset<T, PrescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrescriptionUpdateManyArgs>(args: SelectSubset<T, PrescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions and returns the data updated in the database.
     * @param {PrescriptionUpdateManyAndReturnArgs} args - Arguments to update many Prescriptions.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.updateManyAndReturn({
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
    updateManyAndReturn<T extends PrescriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, PrescriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prescription.
     * @param {PrescriptionUpsertArgs} args - Arguments to update or create a Prescription.
     * @example
     * // Update or create a Prescription
     * const prescription = await prisma.prescription.upsert({
     *   create: {
     *     // ... data to create a Prescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prescription we want to update
     *   }
     * })
     */
    upsert<T extends PrescriptionUpsertArgs>(args: SelectSubset<T, PrescriptionUpsertArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionCountArgs} args - Arguments to filter Prescriptions to count.
     * @example
     * // Count the number of Prescriptions
     * const count = await prisma.prescription.count({
     *   where: {
     *     // ... the filter for the Prescriptions we want to count
     *   }
     * })
    **/
    count<T extends PrescriptionCountArgs>(
      args?: Subset<T, PrescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrescriptionAggregateArgs>(args: Subset<T, PrescriptionAggregateArgs>): Prisma.PrismaPromise<GetPrescriptionAggregateType<T>>

    /**
     * Group by Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionGroupByArgs} args - Group by arguments.
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
      T extends PrescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrescriptionGroupByArgs['orderBy'] }
        : { orderBy?: PrescriptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PrescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prescription model
   */
  readonly fields: PrescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fulfillment<T extends Prescription$fulfillmentArgs<ExtArgs> = {}>(args?: Subset<T, Prescription$fulfillmentArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    auditLogs<T extends Prescription$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, Prescription$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Prescription model
   */
  interface PrescriptionFieldRefs {
    readonly id: FieldRef<"Prescription", 'String'>
    readonly tenantId: FieldRef<"Prescription", 'String'>
    readonly patientId: FieldRef<"Prescription", 'String'>
    readonly therapistId: FieldRef<"Prescription", 'String'>
    readonly medicationName: FieldRef<"Prescription", 'String'>
    readonly dosage: FieldRef<"Prescription", 'String'>
    readonly frequency: FieldRef<"Prescription", 'String'>
    readonly duration: FieldRef<"Prescription", 'String'>
    readonly notes: FieldRef<"Prescription", 'String'>
    readonly status: FieldRef<"Prescription", 'PrescriptionStatus'>
    readonly createdAt: FieldRef<"Prescription", 'DateTime'>
    readonly updatedAt: FieldRef<"Prescription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prescription findUnique
   */
  export type PrescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findUniqueOrThrow
   */
  export type PrescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findFirst
   */
  export type PrescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findFirstOrThrow
   */
  export type PrescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findMany
   */
  export type PrescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescriptions to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription create
   */
  export type PrescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Prescription.
     */
    data: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
  }

  /**
   * Prescription createMany
   */
  export type PrescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prescription createManyAndReturn
   */
  export type PrescriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prescription update
   */
  export type PrescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Prescription.
     */
    data: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
    /**
     * Choose, which Prescription to update.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription updateMany
   */
  export type PrescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
  }

  /**
   * Prescription updateManyAndReturn
   */
  export type PrescriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
  }

  /**
   * Prescription upsert
   */
  export type PrescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Prescription to update in case it exists.
     */
    where: PrescriptionWhereUniqueInput
    /**
     * In case the Prescription found by the `where` argument doesn't exist, create a new Prescription with this data.
     */
    create: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
    /**
     * In case the Prescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
  }

  /**
   * Prescription delete
   */
  export type PrescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter which Prescription to delete.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription deleteMany
   */
  export type PrescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescriptions to delete
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to delete.
     */
    limit?: number
  }

  /**
   * Prescription.fulfillment
   */
  export type Prescription$fulfillmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    where?: PharmacyFulfillmentWhereInput
  }

  /**
   * Prescription.auditLogs
   */
  export type Prescription$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    where?: PharmacyAuditLogWhereInput
    orderBy?: PharmacyAuditLogOrderByWithRelationInput | PharmacyAuditLogOrderByWithRelationInput[]
    cursor?: PharmacyAuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PharmacyAuditLogScalarFieldEnum | PharmacyAuditLogScalarFieldEnum[]
  }

  /**
   * Prescription without action
   */
  export type PrescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
  }


  /**
   * Model PharmacyFulfillment
   */

  export type AggregatePharmacyFulfillment = {
    _count: PharmacyFulfillmentCountAggregateOutputType | null
    _min: PharmacyFulfillmentMinAggregateOutputType | null
    _max: PharmacyFulfillmentMaxAggregateOutputType | null
  }

  export type PharmacyFulfillmentMinAggregateOutputType = {
    id: string | null
    prescriptionId: string | null
    status: $Enums.FulfillmentStatus | null
    filledBy: string | null
    filledAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PharmacyFulfillmentMaxAggregateOutputType = {
    id: string | null
    prescriptionId: string | null
    status: $Enums.FulfillmentStatus | null
    filledBy: string | null
    filledAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PharmacyFulfillmentCountAggregateOutputType = {
    id: number
    prescriptionId: number
    status: number
    filledBy: number
    filledAt: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PharmacyFulfillmentMinAggregateInputType = {
    id?: true
    prescriptionId?: true
    status?: true
    filledBy?: true
    filledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PharmacyFulfillmentMaxAggregateInputType = {
    id?: true
    prescriptionId?: true
    status?: true
    filledBy?: true
    filledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PharmacyFulfillmentCountAggregateInputType = {
    id?: true
    prescriptionId?: true
    status?: true
    filledBy?: true
    filledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PharmacyFulfillmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PharmacyFulfillment to aggregate.
     */
    where?: PharmacyFulfillmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyFulfillments to fetch.
     */
    orderBy?: PharmacyFulfillmentOrderByWithRelationInput | PharmacyFulfillmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PharmacyFulfillmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyFulfillments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyFulfillments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PharmacyFulfillments
    **/
    _count?: true | PharmacyFulfillmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PharmacyFulfillmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PharmacyFulfillmentMaxAggregateInputType
  }

  export type GetPharmacyFulfillmentAggregateType<T extends PharmacyFulfillmentAggregateArgs> = {
        [P in keyof T & keyof AggregatePharmacyFulfillment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePharmacyFulfillment[P]>
      : GetScalarType<T[P], AggregatePharmacyFulfillment[P]>
  }




  export type PharmacyFulfillmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PharmacyFulfillmentWhereInput
    orderBy?: PharmacyFulfillmentOrderByWithAggregationInput | PharmacyFulfillmentOrderByWithAggregationInput[]
    by: PharmacyFulfillmentScalarFieldEnum[] | PharmacyFulfillmentScalarFieldEnum
    having?: PharmacyFulfillmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PharmacyFulfillmentCountAggregateInputType | true
    _min?: PharmacyFulfillmentMinAggregateInputType
    _max?: PharmacyFulfillmentMaxAggregateInputType
  }

  export type PharmacyFulfillmentGroupByOutputType = {
    id: string
    prescriptionId: string
    status: $Enums.FulfillmentStatus
    filledBy: string | null
    filledAt: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: PharmacyFulfillmentCountAggregateOutputType | null
    _min: PharmacyFulfillmentMinAggregateOutputType | null
    _max: PharmacyFulfillmentMaxAggregateOutputType | null
  }

  type GetPharmacyFulfillmentGroupByPayload<T extends PharmacyFulfillmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PharmacyFulfillmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PharmacyFulfillmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PharmacyFulfillmentGroupByOutputType[P]>
            : GetScalarType<T[P], PharmacyFulfillmentGroupByOutputType[P]>
        }
      >
    >


  export type PharmacyFulfillmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    prescriptionId?: boolean
    status?: boolean
    filledBy?: boolean
    filledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pharmacyFulfillment"]>

  export type PharmacyFulfillmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    prescriptionId?: boolean
    status?: boolean
    filledBy?: boolean
    filledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pharmacyFulfillment"]>

  export type PharmacyFulfillmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    prescriptionId?: boolean
    status?: boolean
    filledBy?: boolean
    filledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pharmacyFulfillment"]>

  export type PharmacyFulfillmentSelectScalar = {
    id?: boolean
    prescriptionId?: boolean
    status?: boolean
    filledBy?: boolean
    filledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PharmacyFulfillmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "prescriptionId" | "status" | "filledBy" | "filledAt" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["pharmacyFulfillment"]>
  export type PharmacyFulfillmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }
  export type PharmacyFulfillmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }
  export type PharmacyFulfillmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }

  export type $PharmacyFulfillmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PharmacyFulfillment"
    objects: {
      prescription: Prisma.$PrescriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      prescriptionId: string
      status: $Enums.FulfillmentStatus
      filledBy: string | null
      filledAt: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pharmacyFulfillment"]>
    composites: {}
  }

  type PharmacyFulfillmentGetPayload<S extends boolean | null | undefined | PharmacyFulfillmentDefaultArgs> = $Result.GetResult<Prisma.$PharmacyFulfillmentPayload, S>

  type PharmacyFulfillmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PharmacyFulfillmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PharmacyFulfillmentCountAggregateInputType | true
    }

  export interface PharmacyFulfillmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PharmacyFulfillment'], meta: { name: 'PharmacyFulfillment' } }
    /**
     * Find zero or one PharmacyFulfillment that matches the filter.
     * @param {PharmacyFulfillmentFindUniqueArgs} args - Arguments to find a PharmacyFulfillment
     * @example
     * // Get one PharmacyFulfillment
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PharmacyFulfillmentFindUniqueArgs>(args: SelectSubset<T, PharmacyFulfillmentFindUniqueArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PharmacyFulfillment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PharmacyFulfillmentFindUniqueOrThrowArgs} args - Arguments to find a PharmacyFulfillment
     * @example
     * // Get one PharmacyFulfillment
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PharmacyFulfillmentFindUniqueOrThrowArgs>(args: SelectSubset<T, PharmacyFulfillmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PharmacyFulfillment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyFulfillmentFindFirstArgs} args - Arguments to find a PharmacyFulfillment
     * @example
     * // Get one PharmacyFulfillment
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PharmacyFulfillmentFindFirstArgs>(args?: SelectSubset<T, PharmacyFulfillmentFindFirstArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PharmacyFulfillment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyFulfillmentFindFirstOrThrowArgs} args - Arguments to find a PharmacyFulfillment
     * @example
     * // Get one PharmacyFulfillment
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PharmacyFulfillmentFindFirstOrThrowArgs>(args?: SelectSubset<T, PharmacyFulfillmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PharmacyFulfillments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyFulfillmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PharmacyFulfillments
     * const pharmacyFulfillments = await prisma.pharmacyFulfillment.findMany()
     * 
     * // Get first 10 PharmacyFulfillments
     * const pharmacyFulfillments = await prisma.pharmacyFulfillment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pharmacyFulfillmentWithIdOnly = await prisma.pharmacyFulfillment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PharmacyFulfillmentFindManyArgs>(args?: SelectSubset<T, PharmacyFulfillmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PharmacyFulfillment.
     * @param {PharmacyFulfillmentCreateArgs} args - Arguments to create a PharmacyFulfillment.
     * @example
     * // Create one PharmacyFulfillment
     * const PharmacyFulfillment = await prisma.pharmacyFulfillment.create({
     *   data: {
     *     // ... data to create a PharmacyFulfillment
     *   }
     * })
     * 
     */
    create<T extends PharmacyFulfillmentCreateArgs>(args: SelectSubset<T, PharmacyFulfillmentCreateArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PharmacyFulfillments.
     * @param {PharmacyFulfillmentCreateManyArgs} args - Arguments to create many PharmacyFulfillments.
     * @example
     * // Create many PharmacyFulfillments
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PharmacyFulfillmentCreateManyArgs>(args?: SelectSubset<T, PharmacyFulfillmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PharmacyFulfillments and returns the data saved in the database.
     * @param {PharmacyFulfillmentCreateManyAndReturnArgs} args - Arguments to create many PharmacyFulfillments.
     * @example
     * // Create many PharmacyFulfillments
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PharmacyFulfillments and only return the `id`
     * const pharmacyFulfillmentWithIdOnly = await prisma.pharmacyFulfillment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PharmacyFulfillmentCreateManyAndReturnArgs>(args?: SelectSubset<T, PharmacyFulfillmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PharmacyFulfillment.
     * @param {PharmacyFulfillmentDeleteArgs} args - Arguments to delete one PharmacyFulfillment.
     * @example
     * // Delete one PharmacyFulfillment
     * const PharmacyFulfillment = await prisma.pharmacyFulfillment.delete({
     *   where: {
     *     // ... filter to delete one PharmacyFulfillment
     *   }
     * })
     * 
     */
    delete<T extends PharmacyFulfillmentDeleteArgs>(args: SelectSubset<T, PharmacyFulfillmentDeleteArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PharmacyFulfillment.
     * @param {PharmacyFulfillmentUpdateArgs} args - Arguments to update one PharmacyFulfillment.
     * @example
     * // Update one PharmacyFulfillment
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PharmacyFulfillmentUpdateArgs>(args: SelectSubset<T, PharmacyFulfillmentUpdateArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PharmacyFulfillments.
     * @param {PharmacyFulfillmentDeleteManyArgs} args - Arguments to filter PharmacyFulfillments to delete.
     * @example
     * // Delete a few PharmacyFulfillments
     * const { count } = await prisma.pharmacyFulfillment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PharmacyFulfillmentDeleteManyArgs>(args?: SelectSubset<T, PharmacyFulfillmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PharmacyFulfillments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyFulfillmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PharmacyFulfillments
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PharmacyFulfillmentUpdateManyArgs>(args: SelectSubset<T, PharmacyFulfillmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PharmacyFulfillments and returns the data updated in the database.
     * @param {PharmacyFulfillmentUpdateManyAndReturnArgs} args - Arguments to update many PharmacyFulfillments.
     * @example
     * // Update many PharmacyFulfillments
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PharmacyFulfillments and only return the `id`
     * const pharmacyFulfillmentWithIdOnly = await prisma.pharmacyFulfillment.updateManyAndReturn({
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
    updateManyAndReturn<T extends PharmacyFulfillmentUpdateManyAndReturnArgs>(args: SelectSubset<T, PharmacyFulfillmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PharmacyFulfillment.
     * @param {PharmacyFulfillmentUpsertArgs} args - Arguments to update or create a PharmacyFulfillment.
     * @example
     * // Update or create a PharmacyFulfillment
     * const pharmacyFulfillment = await prisma.pharmacyFulfillment.upsert({
     *   create: {
     *     // ... data to create a PharmacyFulfillment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PharmacyFulfillment we want to update
     *   }
     * })
     */
    upsert<T extends PharmacyFulfillmentUpsertArgs>(args: SelectSubset<T, PharmacyFulfillmentUpsertArgs<ExtArgs>>): Prisma__PharmacyFulfillmentClient<$Result.GetResult<Prisma.$PharmacyFulfillmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PharmacyFulfillments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyFulfillmentCountArgs} args - Arguments to filter PharmacyFulfillments to count.
     * @example
     * // Count the number of PharmacyFulfillments
     * const count = await prisma.pharmacyFulfillment.count({
     *   where: {
     *     // ... the filter for the PharmacyFulfillments we want to count
     *   }
     * })
    **/
    count<T extends PharmacyFulfillmentCountArgs>(
      args?: Subset<T, PharmacyFulfillmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PharmacyFulfillmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PharmacyFulfillment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyFulfillmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PharmacyFulfillmentAggregateArgs>(args: Subset<T, PharmacyFulfillmentAggregateArgs>): Prisma.PrismaPromise<GetPharmacyFulfillmentAggregateType<T>>

    /**
     * Group by PharmacyFulfillment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyFulfillmentGroupByArgs} args - Group by arguments.
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
      T extends PharmacyFulfillmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PharmacyFulfillmentGroupByArgs['orderBy'] }
        : { orderBy?: PharmacyFulfillmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PharmacyFulfillmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPharmacyFulfillmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PharmacyFulfillment model
   */
  readonly fields: PharmacyFulfillmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PharmacyFulfillment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PharmacyFulfillmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prescription<T extends PrescriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PrescriptionDefaultArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PharmacyFulfillment model
   */
  interface PharmacyFulfillmentFieldRefs {
    readonly id: FieldRef<"PharmacyFulfillment", 'String'>
    readonly prescriptionId: FieldRef<"PharmacyFulfillment", 'String'>
    readonly status: FieldRef<"PharmacyFulfillment", 'FulfillmentStatus'>
    readonly filledBy: FieldRef<"PharmacyFulfillment", 'String'>
    readonly filledAt: FieldRef<"PharmacyFulfillment", 'DateTime'>
    readonly notes: FieldRef<"PharmacyFulfillment", 'String'>
    readonly createdAt: FieldRef<"PharmacyFulfillment", 'DateTime'>
    readonly updatedAt: FieldRef<"PharmacyFulfillment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PharmacyFulfillment findUnique
   */
  export type PharmacyFulfillmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyFulfillment to fetch.
     */
    where: PharmacyFulfillmentWhereUniqueInput
  }

  /**
   * PharmacyFulfillment findUniqueOrThrow
   */
  export type PharmacyFulfillmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyFulfillment to fetch.
     */
    where: PharmacyFulfillmentWhereUniqueInput
  }

  /**
   * PharmacyFulfillment findFirst
   */
  export type PharmacyFulfillmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyFulfillment to fetch.
     */
    where?: PharmacyFulfillmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyFulfillments to fetch.
     */
    orderBy?: PharmacyFulfillmentOrderByWithRelationInput | PharmacyFulfillmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PharmacyFulfillments.
     */
    cursor?: PharmacyFulfillmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyFulfillments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyFulfillments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PharmacyFulfillments.
     */
    distinct?: PharmacyFulfillmentScalarFieldEnum | PharmacyFulfillmentScalarFieldEnum[]
  }

  /**
   * PharmacyFulfillment findFirstOrThrow
   */
  export type PharmacyFulfillmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyFulfillment to fetch.
     */
    where?: PharmacyFulfillmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyFulfillments to fetch.
     */
    orderBy?: PharmacyFulfillmentOrderByWithRelationInput | PharmacyFulfillmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PharmacyFulfillments.
     */
    cursor?: PharmacyFulfillmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyFulfillments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyFulfillments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PharmacyFulfillments.
     */
    distinct?: PharmacyFulfillmentScalarFieldEnum | PharmacyFulfillmentScalarFieldEnum[]
  }

  /**
   * PharmacyFulfillment findMany
   */
  export type PharmacyFulfillmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyFulfillments to fetch.
     */
    where?: PharmacyFulfillmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyFulfillments to fetch.
     */
    orderBy?: PharmacyFulfillmentOrderByWithRelationInput | PharmacyFulfillmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PharmacyFulfillments.
     */
    cursor?: PharmacyFulfillmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyFulfillments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyFulfillments.
     */
    skip?: number
    distinct?: PharmacyFulfillmentScalarFieldEnum | PharmacyFulfillmentScalarFieldEnum[]
  }

  /**
   * PharmacyFulfillment create
   */
  export type PharmacyFulfillmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * The data needed to create a PharmacyFulfillment.
     */
    data: XOR<PharmacyFulfillmentCreateInput, PharmacyFulfillmentUncheckedCreateInput>
  }

  /**
   * PharmacyFulfillment createMany
   */
  export type PharmacyFulfillmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PharmacyFulfillments.
     */
    data: PharmacyFulfillmentCreateManyInput | PharmacyFulfillmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PharmacyFulfillment createManyAndReturn
   */
  export type PharmacyFulfillmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * The data used to create many PharmacyFulfillments.
     */
    data: PharmacyFulfillmentCreateManyInput | PharmacyFulfillmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PharmacyFulfillment update
   */
  export type PharmacyFulfillmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * The data needed to update a PharmacyFulfillment.
     */
    data: XOR<PharmacyFulfillmentUpdateInput, PharmacyFulfillmentUncheckedUpdateInput>
    /**
     * Choose, which PharmacyFulfillment to update.
     */
    where: PharmacyFulfillmentWhereUniqueInput
  }

  /**
   * PharmacyFulfillment updateMany
   */
  export type PharmacyFulfillmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PharmacyFulfillments.
     */
    data: XOR<PharmacyFulfillmentUpdateManyMutationInput, PharmacyFulfillmentUncheckedUpdateManyInput>
    /**
     * Filter which PharmacyFulfillments to update
     */
    where?: PharmacyFulfillmentWhereInput
    /**
     * Limit how many PharmacyFulfillments to update.
     */
    limit?: number
  }

  /**
   * PharmacyFulfillment updateManyAndReturn
   */
  export type PharmacyFulfillmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * The data used to update PharmacyFulfillments.
     */
    data: XOR<PharmacyFulfillmentUpdateManyMutationInput, PharmacyFulfillmentUncheckedUpdateManyInput>
    /**
     * Filter which PharmacyFulfillments to update
     */
    where?: PharmacyFulfillmentWhereInput
    /**
     * Limit how many PharmacyFulfillments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PharmacyFulfillment upsert
   */
  export type PharmacyFulfillmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * The filter to search for the PharmacyFulfillment to update in case it exists.
     */
    where: PharmacyFulfillmentWhereUniqueInput
    /**
     * In case the PharmacyFulfillment found by the `where` argument doesn't exist, create a new PharmacyFulfillment with this data.
     */
    create: XOR<PharmacyFulfillmentCreateInput, PharmacyFulfillmentUncheckedCreateInput>
    /**
     * In case the PharmacyFulfillment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PharmacyFulfillmentUpdateInput, PharmacyFulfillmentUncheckedUpdateInput>
  }

  /**
   * PharmacyFulfillment delete
   */
  export type PharmacyFulfillmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
    /**
     * Filter which PharmacyFulfillment to delete.
     */
    where: PharmacyFulfillmentWhereUniqueInput
  }

  /**
   * PharmacyFulfillment deleteMany
   */
  export type PharmacyFulfillmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PharmacyFulfillments to delete
     */
    where?: PharmacyFulfillmentWhereInput
    /**
     * Limit how many PharmacyFulfillments to delete.
     */
    limit?: number
  }

  /**
   * PharmacyFulfillment without action
   */
  export type PharmacyFulfillmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyFulfillment
     */
    select?: PharmacyFulfillmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyFulfillment
     */
    omit?: PharmacyFulfillmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyFulfillmentInclude<ExtArgs> | null
  }


  /**
   * Model PharmacyAuditLog
   */

  export type AggregatePharmacyAuditLog = {
    _count: PharmacyAuditLogCountAggregateOutputType | null
    _min: PharmacyAuditLogMinAggregateOutputType | null
    _max: PharmacyAuditLogMaxAggregateOutputType | null
  }

  export type PharmacyAuditLogMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    prescriptionId: string | null
    actorId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type PharmacyAuditLogMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    prescriptionId: string | null
    actorId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type PharmacyAuditLogCountAggregateOutputType = {
    id: number
    tenantId: number
    prescriptionId: number
    actorId: number
    action: number
    payload: number
    createdAt: number
    _all: number
  }


  export type PharmacyAuditLogMinAggregateInputType = {
    id?: true
    tenantId?: true
    prescriptionId?: true
    actorId?: true
    action?: true
    createdAt?: true
  }

  export type PharmacyAuditLogMaxAggregateInputType = {
    id?: true
    tenantId?: true
    prescriptionId?: true
    actorId?: true
    action?: true
    createdAt?: true
  }

  export type PharmacyAuditLogCountAggregateInputType = {
    id?: true
    tenantId?: true
    prescriptionId?: true
    actorId?: true
    action?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type PharmacyAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PharmacyAuditLog to aggregate.
     */
    where?: PharmacyAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyAuditLogs to fetch.
     */
    orderBy?: PharmacyAuditLogOrderByWithRelationInput | PharmacyAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PharmacyAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PharmacyAuditLogs
    **/
    _count?: true | PharmacyAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PharmacyAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PharmacyAuditLogMaxAggregateInputType
  }

  export type GetPharmacyAuditLogAggregateType<T extends PharmacyAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregatePharmacyAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePharmacyAuditLog[P]>
      : GetScalarType<T[P], AggregatePharmacyAuditLog[P]>
  }




  export type PharmacyAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PharmacyAuditLogWhereInput
    orderBy?: PharmacyAuditLogOrderByWithAggregationInput | PharmacyAuditLogOrderByWithAggregationInput[]
    by: PharmacyAuditLogScalarFieldEnum[] | PharmacyAuditLogScalarFieldEnum
    having?: PharmacyAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PharmacyAuditLogCountAggregateInputType | true
    _min?: PharmacyAuditLogMinAggregateInputType
    _max?: PharmacyAuditLogMaxAggregateInputType
  }

  export type PharmacyAuditLogGroupByOutputType = {
    id: string
    tenantId: string
    prescriptionId: string
    actorId: string
    action: string
    payload: JsonValue | null
    createdAt: Date
    _count: PharmacyAuditLogCountAggregateOutputType | null
    _min: PharmacyAuditLogMinAggregateOutputType | null
    _max: PharmacyAuditLogMaxAggregateOutputType | null
  }

  type GetPharmacyAuditLogGroupByPayload<T extends PharmacyAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PharmacyAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PharmacyAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PharmacyAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], PharmacyAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type PharmacyAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    prescriptionId?: boolean
    actorId?: boolean
    action?: boolean
    payload?: boolean
    createdAt?: boolean
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pharmacyAuditLog"]>

  export type PharmacyAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    prescriptionId?: boolean
    actorId?: boolean
    action?: boolean
    payload?: boolean
    createdAt?: boolean
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pharmacyAuditLog"]>

  export type PharmacyAuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    prescriptionId?: boolean
    actorId?: boolean
    action?: boolean
    payload?: boolean
    createdAt?: boolean
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pharmacyAuditLog"]>

  export type PharmacyAuditLogSelectScalar = {
    id?: boolean
    tenantId?: boolean
    prescriptionId?: boolean
    actorId?: boolean
    action?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type PharmacyAuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "prescriptionId" | "actorId" | "action" | "payload" | "createdAt", ExtArgs["result"]["pharmacyAuditLog"]>
  export type PharmacyAuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }
  export type PharmacyAuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }
  export type PharmacyAuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prescription?: boolean | PrescriptionDefaultArgs<ExtArgs>
  }

  export type $PharmacyAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PharmacyAuditLog"
    objects: {
      prescription: Prisma.$PrescriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      prescriptionId: string
      actorId: string
      action: string
      payload: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["pharmacyAuditLog"]>
    composites: {}
  }

  type PharmacyAuditLogGetPayload<S extends boolean | null | undefined | PharmacyAuditLogDefaultArgs> = $Result.GetResult<Prisma.$PharmacyAuditLogPayload, S>

  type PharmacyAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PharmacyAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PharmacyAuditLogCountAggregateInputType | true
    }

  export interface PharmacyAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PharmacyAuditLog'], meta: { name: 'PharmacyAuditLog' } }
    /**
     * Find zero or one PharmacyAuditLog that matches the filter.
     * @param {PharmacyAuditLogFindUniqueArgs} args - Arguments to find a PharmacyAuditLog
     * @example
     * // Get one PharmacyAuditLog
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PharmacyAuditLogFindUniqueArgs>(args: SelectSubset<T, PharmacyAuditLogFindUniqueArgs<ExtArgs>>): Prisma__PharmacyAuditLogClient<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PharmacyAuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PharmacyAuditLogFindUniqueOrThrowArgs} args - Arguments to find a PharmacyAuditLog
     * @example
     * // Get one PharmacyAuditLog
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PharmacyAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, PharmacyAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PharmacyAuditLogClient<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PharmacyAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyAuditLogFindFirstArgs} args - Arguments to find a PharmacyAuditLog
     * @example
     * // Get one PharmacyAuditLog
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PharmacyAuditLogFindFirstArgs>(args?: SelectSubset<T, PharmacyAuditLogFindFirstArgs<ExtArgs>>): Prisma__PharmacyAuditLogClient<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PharmacyAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyAuditLogFindFirstOrThrowArgs} args - Arguments to find a PharmacyAuditLog
     * @example
     * // Get one PharmacyAuditLog
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PharmacyAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, PharmacyAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__PharmacyAuditLogClient<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PharmacyAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PharmacyAuditLogs
     * const pharmacyAuditLogs = await prisma.pharmacyAuditLog.findMany()
     * 
     * // Get first 10 PharmacyAuditLogs
     * const pharmacyAuditLogs = await prisma.pharmacyAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pharmacyAuditLogWithIdOnly = await prisma.pharmacyAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PharmacyAuditLogFindManyArgs>(args?: SelectSubset<T, PharmacyAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PharmacyAuditLog.
     * @param {PharmacyAuditLogCreateArgs} args - Arguments to create a PharmacyAuditLog.
     * @example
     * // Create one PharmacyAuditLog
     * const PharmacyAuditLog = await prisma.pharmacyAuditLog.create({
     *   data: {
     *     // ... data to create a PharmacyAuditLog
     *   }
     * })
     * 
     */
    create<T extends PharmacyAuditLogCreateArgs>(args: SelectSubset<T, PharmacyAuditLogCreateArgs<ExtArgs>>): Prisma__PharmacyAuditLogClient<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PharmacyAuditLogs.
     * @param {PharmacyAuditLogCreateManyArgs} args - Arguments to create many PharmacyAuditLogs.
     * @example
     * // Create many PharmacyAuditLogs
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PharmacyAuditLogCreateManyArgs>(args?: SelectSubset<T, PharmacyAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PharmacyAuditLogs and returns the data saved in the database.
     * @param {PharmacyAuditLogCreateManyAndReturnArgs} args - Arguments to create many PharmacyAuditLogs.
     * @example
     * // Create many PharmacyAuditLogs
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PharmacyAuditLogs and only return the `id`
     * const pharmacyAuditLogWithIdOnly = await prisma.pharmacyAuditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PharmacyAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, PharmacyAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PharmacyAuditLog.
     * @param {PharmacyAuditLogDeleteArgs} args - Arguments to delete one PharmacyAuditLog.
     * @example
     * // Delete one PharmacyAuditLog
     * const PharmacyAuditLog = await prisma.pharmacyAuditLog.delete({
     *   where: {
     *     // ... filter to delete one PharmacyAuditLog
     *   }
     * })
     * 
     */
    delete<T extends PharmacyAuditLogDeleteArgs>(args: SelectSubset<T, PharmacyAuditLogDeleteArgs<ExtArgs>>): Prisma__PharmacyAuditLogClient<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PharmacyAuditLog.
     * @param {PharmacyAuditLogUpdateArgs} args - Arguments to update one PharmacyAuditLog.
     * @example
     * // Update one PharmacyAuditLog
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PharmacyAuditLogUpdateArgs>(args: SelectSubset<T, PharmacyAuditLogUpdateArgs<ExtArgs>>): Prisma__PharmacyAuditLogClient<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PharmacyAuditLogs.
     * @param {PharmacyAuditLogDeleteManyArgs} args - Arguments to filter PharmacyAuditLogs to delete.
     * @example
     * // Delete a few PharmacyAuditLogs
     * const { count } = await prisma.pharmacyAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PharmacyAuditLogDeleteManyArgs>(args?: SelectSubset<T, PharmacyAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PharmacyAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PharmacyAuditLogs
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PharmacyAuditLogUpdateManyArgs>(args: SelectSubset<T, PharmacyAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PharmacyAuditLogs and returns the data updated in the database.
     * @param {PharmacyAuditLogUpdateManyAndReturnArgs} args - Arguments to update many PharmacyAuditLogs.
     * @example
     * // Update many PharmacyAuditLogs
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PharmacyAuditLogs and only return the `id`
     * const pharmacyAuditLogWithIdOnly = await prisma.pharmacyAuditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends PharmacyAuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, PharmacyAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PharmacyAuditLog.
     * @param {PharmacyAuditLogUpsertArgs} args - Arguments to update or create a PharmacyAuditLog.
     * @example
     * // Update or create a PharmacyAuditLog
     * const pharmacyAuditLog = await prisma.pharmacyAuditLog.upsert({
     *   create: {
     *     // ... data to create a PharmacyAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PharmacyAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends PharmacyAuditLogUpsertArgs>(args: SelectSubset<T, PharmacyAuditLogUpsertArgs<ExtArgs>>): Prisma__PharmacyAuditLogClient<$Result.GetResult<Prisma.$PharmacyAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PharmacyAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyAuditLogCountArgs} args - Arguments to filter PharmacyAuditLogs to count.
     * @example
     * // Count the number of PharmacyAuditLogs
     * const count = await prisma.pharmacyAuditLog.count({
     *   where: {
     *     // ... the filter for the PharmacyAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends PharmacyAuditLogCountArgs>(
      args?: Subset<T, PharmacyAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PharmacyAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PharmacyAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PharmacyAuditLogAggregateArgs>(args: Subset<T, PharmacyAuditLogAggregateArgs>): Prisma.PrismaPromise<GetPharmacyAuditLogAggregateType<T>>

    /**
     * Group by PharmacyAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyAuditLogGroupByArgs} args - Group by arguments.
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
      T extends PharmacyAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PharmacyAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: PharmacyAuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PharmacyAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPharmacyAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PharmacyAuditLog model
   */
  readonly fields: PharmacyAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PharmacyAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PharmacyAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prescription<T extends PrescriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PrescriptionDefaultArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PharmacyAuditLog model
   */
  interface PharmacyAuditLogFieldRefs {
    readonly id: FieldRef<"PharmacyAuditLog", 'String'>
    readonly tenantId: FieldRef<"PharmacyAuditLog", 'String'>
    readonly prescriptionId: FieldRef<"PharmacyAuditLog", 'String'>
    readonly actorId: FieldRef<"PharmacyAuditLog", 'String'>
    readonly action: FieldRef<"PharmacyAuditLog", 'String'>
    readonly payload: FieldRef<"PharmacyAuditLog", 'Json'>
    readonly createdAt: FieldRef<"PharmacyAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PharmacyAuditLog findUnique
   */
  export type PharmacyAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyAuditLog to fetch.
     */
    where: PharmacyAuditLogWhereUniqueInput
  }

  /**
   * PharmacyAuditLog findUniqueOrThrow
   */
  export type PharmacyAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyAuditLog to fetch.
     */
    where: PharmacyAuditLogWhereUniqueInput
  }

  /**
   * PharmacyAuditLog findFirst
   */
  export type PharmacyAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyAuditLog to fetch.
     */
    where?: PharmacyAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyAuditLogs to fetch.
     */
    orderBy?: PharmacyAuditLogOrderByWithRelationInput | PharmacyAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PharmacyAuditLogs.
     */
    cursor?: PharmacyAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PharmacyAuditLogs.
     */
    distinct?: PharmacyAuditLogScalarFieldEnum | PharmacyAuditLogScalarFieldEnum[]
  }

  /**
   * PharmacyAuditLog findFirstOrThrow
   */
  export type PharmacyAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyAuditLog to fetch.
     */
    where?: PharmacyAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyAuditLogs to fetch.
     */
    orderBy?: PharmacyAuditLogOrderByWithRelationInput | PharmacyAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PharmacyAuditLogs.
     */
    cursor?: PharmacyAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PharmacyAuditLogs.
     */
    distinct?: PharmacyAuditLogScalarFieldEnum | PharmacyAuditLogScalarFieldEnum[]
  }

  /**
   * PharmacyAuditLog findMany
   */
  export type PharmacyAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which PharmacyAuditLogs to fetch.
     */
    where?: PharmacyAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyAuditLogs to fetch.
     */
    orderBy?: PharmacyAuditLogOrderByWithRelationInput | PharmacyAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PharmacyAuditLogs.
     */
    cursor?: PharmacyAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyAuditLogs.
     */
    skip?: number
    distinct?: PharmacyAuditLogScalarFieldEnum | PharmacyAuditLogScalarFieldEnum[]
  }

  /**
   * PharmacyAuditLog create
   */
  export type PharmacyAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a PharmacyAuditLog.
     */
    data: XOR<PharmacyAuditLogCreateInput, PharmacyAuditLogUncheckedCreateInput>
  }

  /**
   * PharmacyAuditLog createMany
   */
  export type PharmacyAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PharmacyAuditLogs.
     */
    data: PharmacyAuditLogCreateManyInput | PharmacyAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PharmacyAuditLog createManyAndReturn
   */
  export type PharmacyAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many PharmacyAuditLogs.
     */
    data: PharmacyAuditLogCreateManyInput | PharmacyAuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PharmacyAuditLog update
   */
  export type PharmacyAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a PharmacyAuditLog.
     */
    data: XOR<PharmacyAuditLogUpdateInput, PharmacyAuditLogUncheckedUpdateInput>
    /**
     * Choose, which PharmacyAuditLog to update.
     */
    where: PharmacyAuditLogWhereUniqueInput
  }

  /**
   * PharmacyAuditLog updateMany
   */
  export type PharmacyAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PharmacyAuditLogs.
     */
    data: XOR<PharmacyAuditLogUpdateManyMutationInput, PharmacyAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which PharmacyAuditLogs to update
     */
    where?: PharmacyAuditLogWhereInput
    /**
     * Limit how many PharmacyAuditLogs to update.
     */
    limit?: number
  }

  /**
   * PharmacyAuditLog updateManyAndReturn
   */
  export type PharmacyAuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * The data used to update PharmacyAuditLogs.
     */
    data: XOR<PharmacyAuditLogUpdateManyMutationInput, PharmacyAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which PharmacyAuditLogs to update
     */
    where?: PharmacyAuditLogWhereInput
    /**
     * Limit how many PharmacyAuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PharmacyAuditLog upsert
   */
  export type PharmacyAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the PharmacyAuditLog to update in case it exists.
     */
    where: PharmacyAuditLogWhereUniqueInput
    /**
     * In case the PharmacyAuditLog found by the `where` argument doesn't exist, create a new PharmacyAuditLog with this data.
     */
    create: XOR<PharmacyAuditLogCreateInput, PharmacyAuditLogUncheckedCreateInput>
    /**
     * In case the PharmacyAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PharmacyAuditLogUpdateInput, PharmacyAuditLogUncheckedUpdateInput>
  }

  /**
   * PharmacyAuditLog delete
   */
  export type PharmacyAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
    /**
     * Filter which PharmacyAuditLog to delete.
     */
    where: PharmacyAuditLogWhereUniqueInput
  }

  /**
   * PharmacyAuditLog deleteMany
   */
  export type PharmacyAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PharmacyAuditLogs to delete
     */
    where?: PharmacyAuditLogWhereInput
    /**
     * Limit how many PharmacyAuditLogs to delete.
     */
    limit?: number
  }

  /**
   * PharmacyAuditLog without action
   */
  export type PharmacyAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyAuditLog
     */
    select?: PharmacyAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PharmacyAuditLog
     */
    omit?: PharmacyAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PharmacyAuditLogInclude<ExtArgs> | null
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


  export const PrescriptionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    patientId: 'patientId',
    therapistId: 'therapistId',
    medicationName: 'medicationName',
    dosage: 'dosage',
    frequency: 'frequency',
    duration: 'duration',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum]


  export const PharmacyFulfillmentScalarFieldEnum: {
    id: 'id',
    prescriptionId: 'prescriptionId',
    status: 'status',
    filledBy: 'filledBy',
    filledAt: 'filledAt',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PharmacyFulfillmentScalarFieldEnum = (typeof PharmacyFulfillmentScalarFieldEnum)[keyof typeof PharmacyFulfillmentScalarFieldEnum]


  export const PharmacyAuditLogScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    prescriptionId: 'prescriptionId',
    actorId: 'actorId',
    action: 'action',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type PharmacyAuditLogScalarFieldEnum = (typeof PharmacyAuditLogScalarFieldEnum)[keyof typeof PharmacyAuditLogScalarFieldEnum]


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
   * Reference to a field of type 'PrescriptionStatus'
   */
  export type EnumPrescriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrescriptionStatus'>
    


  /**
   * Reference to a field of type 'PrescriptionStatus[]'
   */
  export type ListEnumPrescriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrescriptionStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'FulfillmentStatus'
   */
  export type EnumFulfillmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FulfillmentStatus'>
    


  /**
   * Reference to a field of type 'FulfillmentStatus[]'
   */
  export type ListEnumFulfillmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FulfillmentStatus[]'>
    


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


  export type PrescriptionWhereInput = {
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    id?: StringFilter<"Prescription"> | string
    tenantId?: StringFilter<"Prescription"> | string
    patientId?: StringFilter<"Prescription"> | string
    therapistId?: StringFilter<"Prescription"> | string
    medicationName?: StringFilter<"Prescription"> | string
    dosage?: StringFilter<"Prescription"> | string
    frequency?: StringFilter<"Prescription"> | string
    duration?: StringFilter<"Prescription"> | string
    notes?: StringNullableFilter<"Prescription"> | string | null
    status?: EnumPrescriptionStatusFilter<"Prescription"> | $Enums.PrescriptionStatus
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    fulfillment?: XOR<PharmacyFulfillmentNullableScalarRelationFilter, PharmacyFulfillmentWhereInput> | null
    auditLogs?: PharmacyAuditLogListRelationFilter
  }

  export type PrescriptionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    therapistId?: SortOrder
    medicationName?: SortOrder
    dosage?: SortOrder
    frequency?: SortOrder
    duration?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fulfillment?: PharmacyFulfillmentOrderByWithRelationInput
    auditLogs?: PharmacyAuditLogOrderByRelationAggregateInput
  }

  export type PrescriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    tenantId?: StringFilter<"Prescription"> | string
    patientId?: StringFilter<"Prescription"> | string
    therapistId?: StringFilter<"Prescription"> | string
    medicationName?: StringFilter<"Prescription"> | string
    dosage?: StringFilter<"Prescription"> | string
    frequency?: StringFilter<"Prescription"> | string
    duration?: StringFilter<"Prescription"> | string
    notes?: StringNullableFilter<"Prescription"> | string | null
    status?: EnumPrescriptionStatusFilter<"Prescription"> | $Enums.PrescriptionStatus
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    fulfillment?: XOR<PharmacyFulfillmentNullableScalarRelationFilter, PharmacyFulfillmentWhereInput> | null
    auditLogs?: PharmacyAuditLogListRelationFilter
  }, "id">

  export type PrescriptionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    therapistId?: SortOrder
    medicationName?: SortOrder
    dosage?: SortOrder
    frequency?: SortOrder
    duration?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrescriptionCountOrderByAggregateInput
    _max?: PrescriptionMaxOrderByAggregateInput
    _min?: PrescriptionMinOrderByAggregateInput
  }

  export type PrescriptionScalarWhereWithAggregatesInput = {
    AND?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    OR?: PrescriptionScalarWhereWithAggregatesInput[]
    NOT?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prescription"> | string
    tenantId?: StringWithAggregatesFilter<"Prescription"> | string
    patientId?: StringWithAggregatesFilter<"Prescription"> | string
    therapistId?: StringWithAggregatesFilter<"Prescription"> | string
    medicationName?: StringWithAggregatesFilter<"Prescription"> | string
    dosage?: StringWithAggregatesFilter<"Prescription"> | string
    frequency?: StringWithAggregatesFilter<"Prescription"> | string
    duration?: StringWithAggregatesFilter<"Prescription"> | string
    notes?: StringNullableWithAggregatesFilter<"Prescription"> | string | null
    status?: EnumPrescriptionStatusWithAggregatesFilter<"Prescription"> | $Enums.PrescriptionStatus
    createdAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
  }

  export type PharmacyFulfillmentWhereInput = {
    AND?: PharmacyFulfillmentWhereInput | PharmacyFulfillmentWhereInput[]
    OR?: PharmacyFulfillmentWhereInput[]
    NOT?: PharmacyFulfillmentWhereInput | PharmacyFulfillmentWhereInput[]
    id?: StringFilter<"PharmacyFulfillment"> | string
    prescriptionId?: StringFilter<"PharmacyFulfillment"> | string
    status?: EnumFulfillmentStatusFilter<"PharmacyFulfillment"> | $Enums.FulfillmentStatus
    filledBy?: StringNullableFilter<"PharmacyFulfillment"> | string | null
    filledAt?: DateTimeNullableFilter<"PharmacyFulfillment"> | Date | string | null
    notes?: StringNullableFilter<"PharmacyFulfillment"> | string | null
    createdAt?: DateTimeFilter<"PharmacyFulfillment"> | Date | string
    updatedAt?: DateTimeFilter<"PharmacyFulfillment"> | Date | string
    prescription?: XOR<PrescriptionScalarRelationFilter, PrescriptionWhereInput>
  }

  export type PharmacyFulfillmentOrderByWithRelationInput = {
    id?: SortOrder
    prescriptionId?: SortOrder
    status?: SortOrder
    filledBy?: SortOrderInput | SortOrder
    filledAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    prescription?: PrescriptionOrderByWithRelationInput
  }

  export type PharmacyFulfillmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    prescriptionId?: string
    AND?: PharmacyFulfillmentWhereInput | PharmacyFulfillmentWhereInput[]
    OR?: PharmacyFulfillmentWhereInput[]
    NOT?: PharmacyFulfillmentWhereInput | PharmacyFulfillmentWhereInput[]
    status?: EnumFulfillmentStatusFilter<"PharmacyFulfillment"> | $Enums.FulfillmentStatus
    filledBy?: StringNullableFilter<"PharmacyFulfillment"> | string | null
    filledAt?: DateTimeNullableFilter<"PharmacyFulfillment"> | Date | string | null
    notes?: StringNullableFilter<"PharmacyFulfillment"> | string | null
    createdAt?: DateTimeFilter<"PharmacyFulfillment"> | Date | string
    updatedAt?: DateTimeFilter<"PharmacyFulfillment"> | Date | string
    prescription?: XOR<PrescriptionScalarRelationFilter, PrescriptionWhereInput>
  }, "id" | "prescriptionId">

  export type PharmacyFulfillmentOrderByWithAggregationInput = {
    id?: SortOrder
    prescriptionId?: SortOrder
    status?: SortOrder
    filledBy?: SortOrderInput | SortOrder
    filledAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PharmacyFulfillmentCountOrderByAggregateInput
    _max?: PharmacyFulfillmentMaxOrderByAggregateInput
    _min?: PharmacyFulfillmentMinOrderByAggregateInput
  }

  export type PharmacyFulfillmentScalarWhereWithAggregatesInput = {
    AND?: PharmacyFulfillmentScalarWhereWithAggregatesInput | PharmacyFulfillmentScalarWhereWithAggregatesInput[]
    OR?: PharmacyFulfillmentScalarWhereWithAggregatesInput[]
    NOT?: PharmacyFulfillmentScalarWhereWithAggregatesInput | PharmacyFulfillmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PharmacyFulfillment"> | string
    prescriptionId?: StringWithAggregatesFilter<"PharmacyFulfillment"> | string
    status?: EnumFulfillmentStatusWithAggregatesFilter<"PharmacyFulfillment"> | $Enums.FulfillmentStatus
    filledBy?: StringNullableWithAggregatesFilter<"PharmacyFulfillment"> | string | null
    filledAt?: DateTimeNullableWithAggregatesFilter<"PharmacyFulfillment"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"PharmacyFulfillment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PharmacyFulfillment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PharmacyFulfillment"> | Date | string
  }

  export type PharmacyAuditLogWhereInput = {
    AND?: PharmacyAuditLogWhereInput | PharmacyAuditLogWhereInput[]
    OR?: PharmacyAuditLogWhereInput[]
    NOT?: PharmacyAuditLogWhereInput | PharmacyAuditLogWhereInput[]
    id?: StringFilter<"PharmacyAuditLog"> | string
    tenantId?: StringFilter<"PharmacyAuditLog"> | string
    prescriptionId?: StringFilter<"PharmacyAuditLog"> | string
    actorId?: StringFilter<"PharmacyAuditLog"> | string
    action?: StringFilter<"PharmacyAuditLog"> | string
    payload?: JsonNullableFilter<"PharmacyAuditLog">
    createdAt?: DateTimeFilter<"PharmacyAuditLog"> | Date | string
    prescription?: XOR<PrescriptionScalarRelationFilter, PrescriptionWhereInput>
  }

  export type PharmacyAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    prescriptionId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    prescription?: PrescriptionOrderByWithRelationInput
  }

  export type PharmacyAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PharmacyAuditLogWhereInput | PharmacyAuditLogWhereInput[]
    OR?: PharmacyAuditLogWhereInput[]
    NOT?: PharmacyAuditLogWhereInput | PharmacyAuditLogWhereInput[]
    tenantId?: StringFilter<"PharmacyAuditLog"> | string
    prescriptionId?: StringFilter<"PharmacyAuditLog"> | string
    actorId?: StringFilter<"PharmacyAuditLog"> | string
    action?: StringFilter<"PharmacyAuditLog"> | string
    payload?: JsonNullableFilter<"PharmacyAuditLog">
    createdAt?: DateTimeFilter<"PharmacyAuditLog"> | Date | string
    prescription?: XOR<PrescriptionScalarRelationFilter, PrescriptionWhereInput>
  }, "id">

  export type PharmacyAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    prescriptionId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    payload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PharmacyAuditLogCountOrderByAggregateInput
    _max?: PharmacyAuditLogMaxOrderByAggregateInput
    _min?: PharmacyAuditLogMinOrderByAggregateInput
  }

  export type PharmacyAuditLogScalarWhereWithAggregatesInput = {
    AND?: PharmacyAuditLogScalarWhereWithAggregatesInput | PharmacyAuditLogScalarWhereWithAggregatesInput[]
    OR?: PharmacyAuditLogScalarWhereWithAggregatesInput[]
    NOT?: PharmacyAuditLogScalarWhereWithAggregatesInput | PharmacyAuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PharmacyAuditLog"> | string
    tenantId?: StringWithAggregatesFilter<"PharmacyAuditLog"> | string
    prescriptionId?: StringWithAggregatesFilter<"PharmacyAuditLog"> | string
    actorId?: StringWithAggregatesFilter<"PharmacyAuditLog"> | string
    action?: StringWithAggregatesFilter<"PharmacyAuditLog"> | string
    payload?: JsonNullableWithAggregatesFilter<"PharmacyAuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"PharmacyAuditLog"> | Date | string
  }

  export type PrescriptionCreateInput = {
    id?: string
    tenantId: string
    patientId: string
    therapistId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    notes?: string | null
    status?: $Enums.PrescriptionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillment?: PharmacyFulfillmentCreateNestedOneWithoutPrescriptionInput
    auditLogs?: PharmacyAuditLogCreateNestedManyWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateInput = {
    id?: string
    tenantId: string
    patientId: string
    therapistId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    notes?: string | null
    status?: $Enums.PrescriptionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillment?: PharmacyFulfillmentUncheckedCreateNestedOneWithoutPrescriptionInput
    auditLogs?: PharmacyAuditLogUncheckedCreateNestedManyWithoutPrescriptionInput
  }

  export type PrescriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    therapistId?: StringFieldUpdateOperationsInput | string
    medicationName?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPrescriptionStatusFieldUpdateOperationsInput | $Enums.PrescriptionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillment?: PharmacyFulfillmentUpdateOneWithoutPrescriptionNestedInput
    auditLogs?: PharmacyAuditLogUpdateManyWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    therapistId?: StringFieldUpdateOperationsInput | string
    medicationName?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPrescriptionStatusFieldUpdateOperationsInput | $Enums.PrescriptionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillment?: PharmacyFulfillmentUncheckedUpdateOneWithoutPrescriptionNestedInput
    auditLogs?: PharmacyAuditLogUncheckedUpdateManyWithoutPrescriptionNestedInput
  }

  export type PrescriptionCreateManyInput = {
    id?: string
    tenantId: string
    patientId: string
    therapistId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    notes?: string | null
    status?: $Enums.PrescriptionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    therapistId?: StringFieldUpdateOperationsInput | string
    medicationName?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPrescriptionStatusFieldUpdateOperationsInput | $Enums.PrescriptionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    therapistId?: StringFieldUpdateOperationsInput | string
    medicationName?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPrescriptionStatusFieldUpdateOperationsInput | $Enums.PrescriptionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyFulfillmentCreateInput = {
    id?: string
    status?: $Enums.FulfillmentStatus
    filledBy?: string | null
    filledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prescription: PrescriptionCreateNestedOneWithoutFulfillmentInput
  }

  export type PharmacyFulfillmentUncheckedCreateInput = {
    id?: string
    prescriptionId: string
    status?: $Enums.FulfillmentStatus
    filledBy?: string | null
    filledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PharmacyFulfillmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFulfillmentStatusFieldUpdateOperationsInput | $Enums.FulfillmentStatus
    filledBy?: NullableStringFieldUpdateOperationsInput | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescription?: PrescriptionUpdateOneRequiredWithoutFulfillmentNestedInput
  }

  export type PharmacyFulfillmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    prescriptionId?: StringFieldUpdateOperationsInput | string
    status?: EnumFulfillmentStatusFieldUpdateOperationsInput | $Enums.FulfillmentStatus
    filledBy?: NullableStringFieldUpdateOperationsInput | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyFulfillmentCreateManyInput = {
    id?: string
    prescriptionId: string
    status?: $Enums.FulfillmentStatus
    filledBy?: string | null
    filledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PharmacyFulfillmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFulfillmentStatusFieldUpdateOperationsInput | $Enums.FulfillmentStatus
    filledBy?: NullableStringFieldUpdateOperationsInput | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyFulfillmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    prescriptionId?: StringFieldUpdateOperationsInput | string
    status?: EnumFulfillmentStatusFieldUpdateOperationsInput | $Enums.FulfillmentStatus
    filledBy?: NullableStringFieldUpdateOperationsInput | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyAuditLogCreateInput = {
    id?: string
    tenantId: string
    actorId: string
    action: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    prescription: PrescriptionCreateNestedOneWithoutAuditLogsInput
  }

  export type PharmacyAuditLogUncheckedCreateInput = {
    id?: string
    tenantId: string
    prescriptionId: string
    actorId: string
    action: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PharmacyAuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prescription?: PrescriptionUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type PharmacyAuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    prescriptionId?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyAuditLogCreateManyInput = {
    id?: string
    tenantId: string
    prescriptionId: string
    actorId: string
    action: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PharmacyAuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyAuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    prescriptionId?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
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

  export type EnumPrescriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PrescriptionStatus | EnumPrescriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PrescriptionStatus[] | ListEnumPrescriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrescriptionStatus[] | ListEnumPrescriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPrescriptionStatusFilter<$PrismaModel> | $Enums.PrescriptionStatus
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

  export type PharmacyFulfillmentNullableScalarRelationFilter = {
    is?: PharmacyFulfillmentWhereInput | null
    isNot?: PharmacyFulfillmentWhereInput | null
  }

  export type PharmacyAuditLogListRelationFilter = {
    every?: PharmacyAuditLogWhereInput
    some?: PharmacyAuditLogWhereInput
    none?: PharmacyAuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PharmacyAuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PrescriptionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    therapistId?: SortOrder
    medicationName?: SortOrder
    dosage?: SortOrder
    frequency?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrescriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    therapistId?: SortOrder
    medicationName?: SortOrder
    dosage?: SortOrder
    frequency?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrescriptionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    therapistId?: SortOrder
    medicationName?: SortOrder
    dosage?: SortOrder
    frequency?: SortOrder
    duration?: SortOrder
    notes?: SortOrder
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

  export type EnumPrescriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrescriptionStatus | EnumPrescriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PrescriptionStatus[] | ListEnumPrescriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrescriptionStatus[] | ListEnumPrescriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPrescriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PrescriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrescriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumPrescriptionStatusFilter<$PrismaModel>
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

  export type EnumFulfillmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FulfillmentStatus | EnumFulfillmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FulfillmentStatus[] | ListEnumFulfillmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FulfillmentStatus[] | ListEnumFulfillmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFulfillmentStatusFilter<$PrismaModel> | $Enums.FulfillmentStatus
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

  export type PrescriptionScalarRelationFilter = {
    is?: PrescriptionWhereInput
    isNot?: PrescriptionWhereInput
  }

  export type PharmacyFulfillmentCountOrderByAggregateInput = {
    id?: SortOrder
    prescriptionId?: SortOrder
    status?: SortOrder
    filledBy?: SortOrder
    filledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PharmacyFulfillmentMaxOrderByAggregateInput = {
    id?: SortOrder
    prescriptionId?: SortOrder
    status?: SortOrder
    filledBy?: SortOrder
    filledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PharmacyFulfillmentMinOrderByAggregateInput = {
    id?: SortOrder
    prescriptionId?: SortOrder
    status?: SortOrder
    filledBy?: SortOrder
    filledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumFulfillmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FulfillmentStatus | EnumFulfillmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FulfillmentStatus[] | ListEnumFulfillmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FulfillmentStatus[] | ListEnumFulfillmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFulfillmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.FulfillmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFulfillmentStatusFilter<$PrismaModel>
    _max?: NestedEnumFulfillmentStatusFilter<$PrismaModel>
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

  export type PharmacyAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    prescriptionId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type PharmacyAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    prescriptionId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type PharmacyAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    prescriptionId?: SortOrder
    actorId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
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

  export type PharmacyFulfillmentCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<PharmacyFulfillmentCreateWithoutPrescriptionInput, PharmacyFulfillmentUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: PharmacyFulfillmentCreateOrConnectWithoutPrescriptionInput
    connect?: PharmacyFulfillmentWhereUniqueInput
  }

  export type PharmacyAuditLogCreateNestedManyWithoutPrescriptionInput = {
    create?: XOR<PharmacyAuditLogCreateWithoutPrescriptionInput, PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput> | PharmacyAuditLogCreateWithoutPrescriptionInput[] | PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput[]
    connectOrCreate?: PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput | PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput[]
    createMany?: PharmacyAuditLogCreateManyPrescriptionInputEnvelope
    connect?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
  }

  export type PharmacyFulfillmentUncheckedCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<PharmacyFulfillmentCreateWithoutPrescriptionInput, PharmacyFulfillmentUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: PharmacyFulfillmentCreateOrConnectWithoutPrescriptionInput
    connect?: PharmacyFulfillmentWhereUniqueInput
  }

  export type PharmacyAuditLogUncheckedCreateNestedManyWithoutPrescriptionInput = {
    create?: XOR<PharmacyAuditLogCreateWithoutPrescriptionInput, PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput> | PharmacyAuditLogCreateWithoutPrescriptionInput[] | PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput[]
    connectOrCreate?: PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput | PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput[]
    createMany?: PharmacyAuditLogCreateManyPrescriptionInputEnvelope
    connect?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPrescriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.PrescriptionStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PharmacyFulfillmentUpdateOneWithoutPrescriptionNestedInput = {
    create?: XOR<PharmacyFulfillmentCreateWithoutPrescriptionInput, PharmacyFulfillmentUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: PharmacyFulfillmentCreateOrConnectWithoutPrescriptionInput
    upsert?: PharmacyFulfillmentUpsertWithoutPrescriptionInput
    disconnect?: PharmacyFulfillmentWhereInput | boolean
    delete?: PharmacyFulfillmentWhereInput | boolean
    connect?: PharmacyFulfillmentWhereUniqueInput
    update?: XOR<XOR<PharmacyFulfillmentUpdateToOneWithWhereWithoutPrescriptionInput, PharmacyFulfillmentUpdateWithoutPrescriptionInput>, PharmacyFulfillmentUncheckedUpdateWithoutPrescriptionInput>
  }

  export type PharmacyAuditLogUpdateManyWithoutPrescriptionNestedInput = {
    create?: XOR<PharmacyAuditLogCreateWithoutPrescriptionInput, PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput> | PharmacyAuditLogCreateWithoutPrescriptionInput[] | PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput[]
    connectOrCreate?: PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput | PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput[]
    upsert?: PharmacyAuditLogUpsertWithWhereUniqueWithoutPrescriptionInput | PharmacyAuditLogUpsertWithWhereUniqueWithoutPrescriptionInput[]
    createMany?: PharmacyAuditLogCreateManyPrescriptionInputEnvelope
    set?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
    disconnect?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
    delete?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
    connect?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
    update?: PharmacyAuditLogUpdateWithWhereUniqueWithoutPrescriptionInput | PharmacyAuditLogUpdateWithWhereUniqueWithoutPrescriptionInput[]
    updateMany?: PharmacyAuditLogUpdateManyWithWhereWithoutPrescriptionInput | PharmacyAuditLogUpdateManyWithWhereWithoutPrescriptionInput[]
    deleteMany?: PharmacyAuditLogScalarWhereInput | PharmacyAuditLogScalarWhereInput[]
  }

  export type PharmacyFulfillmentUncheckedUpdateOneWithoutPrescriptionNestedInput = {
    create?: XOR<PharmacyFulfillmentCreateWithoutPrescriptionInput, PharmacyFulfillmentUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: PharmacyFulfillmentCreateOrConnectWithoutPrescriptionInput
    upsert?: PharmacyFulfillmentUpsertWithoutPrescriptionInput
    disconnect?: PharmacyFulfillmentWhereInput | boolean
    delete?: PharmacyFulfillmentWhereInput | boolean
    connect?: PharmacyFulfillmentWhereUniqueInput
    update?: XOR<XOR<PharmacyFulfillmentUpdateToOneWithWhereWithoutPrescriptionInput, PharmacyFulfillmentUpdateWithoutPrescriptionInput>, PharmacyFulfillmentUncheckedUpdateWithoutPrescriptionInput>
  }

  export type PharmacyAuditLogUncheckedUpdateManyWithoutPrescriptionNestedInput = {
    create?: XOR<PharmacyAuditLogCreateWithoutPrescriptionInput, PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput> | PharmacyAuditLogCreateWithoutPrescriptionInput[] | PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput[]
    connectOrCreate?: PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput | PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput[]
    upsert?: PharmacyAuditLogUpsertWithWhereUniqueWithoutPrescriptionInput | PharmacyAuditLogUpsertWithWhereUniqueWithoutPrescriptionInput[]
    createMany?: PharmacyAuditLogCreateManyPrescriptionInputEnvelope
    set?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
    disconnect?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
    delete?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
    connect?: PharmacyAuditLogWhereUniqueInput | PharmacyAuditLogWhereUniqueInput[]
    update?: PharmacyAuditLogUpdateWithWhereUniqueWithoutPrescriptionInput | PharmacyAuditLogUpdateWithWhereUniqueWithoutPrescriptionInput[]
    updateMany?: PharmacyAuditLogUpdateManyWithWhereWithoutPrescriptionInput | PharmacyAuditLogUpdateManyWithWhereWithoutPrescriptionInput[]
    deleteMany?: PharmacyAuditLogScalarWhereInput | PharmacyAuditLogScalarWhereInput[]
  }

  export type PrescriptionCreateNestedOneWithoutFulfillmentInput = {
    create?: XOR<PrescriptionCreateWithoutFulfillmentInput, PrescriptionUncheckedCreateWithoutFulfillmentInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutFulfillmentInput
    connect?: PrescriptionWhereUniqueInput
  }

  export type EnumFulfillmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.FulfillmentStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PrescriptionUpdateOneRequiredWithoutFulfillmentNestedInput = {
    create?: XOR<PrescriptionCreateWithoutFulfillmentInput, PrescriptionUncheckedCreateWithoutFulfillmentInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutFulfillmentInput
    upsert?: PrescriptionUpsertWithoutFulfillmentInput
    connect?: PrescriptionWhereUniqueInput
    update?: XOR<XOR<PrescriptionUpdateToOneWithWhereWithoutFulfillmentInput, PrescriptionUpdateWithoutFulfillmentInput>, PrescriptionUncheckedUpdateWithoutFulfillmentInput>
  }

  export type PrescriptionCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<PrescriptionCreateWithoutAuditLogsInput, PrescriptionUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutAuditLogsInput
    connect?: PrescriptionWhereUniqueInput
  }

  export type PrescriptionUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<PrescriptionCreateWithoutAuditLogsInput, PrescriptionUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: PrescriptionCreateOrConnectWithoutAuditLogsInput
    upsert?: PrescriptionUpsertWithoutAuditLogsInput
    connect?: PrescriptionWhereUniqueInput
    update?: XOR<XOR<PrescriptionUpdateToOneWithWhereWithoutAuditLogsInput, PrescriptionUpdateWithoutAuditLogsInput>, PrescriptionUncheckedUpdateWithoutAuditLogsInput>
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

  export type NestedEnumPrescriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PrescriptionStatus | EnumPrescriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PrescriptionStatus[] | ListEnumPrescriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrescriptionStatus[] | ListEnumPrescriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPrescriptionStatusFilter<$PrismaModel> | $Enums.PrescriptionStatus
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

  export type NestedEnumPrescriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PrescriptionStatus | EnumPrescriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PrescriptionStatus[] | ListEnumPrescriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PrescriptionStatus[] | ListEnumPrescriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPrescriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PrescriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrescriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumPrescriptionStatusFilter<$PrismaModel>
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

  export type NestedEnumFulfillmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FulfillmentStatus | EnumFulfillmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FulfillmentStatus[] | ListEnumFulfillmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FulfillmentStatus[] | ListEnumFulfillmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFulfillmentStatusFilter<$PrismaModel> | $Enums.FulfillmentStatus
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

  export type NestedEnumFulfillmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FulfillmentStatus | EnumFulfillmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FulfillmentStatus[] | ListEnumFulfillmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FulfillmentStatus[] | ListEnumFulfillmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFulfillmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.FulfillmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFulfillmentStatusFilter<$PrismaModel>
    _max?: NestedEnumFulfillmentStatusFilter<$PrismaModel>
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

  export type PharmacyFulfillmentCreateWithoutPrescriptionInput = {
    id?: string
    status?: $Enums.FulfillmentStatus
    filledBy?: string | null
    filledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PharmacyFulfillmentUncheckedCreateWithoutPrescriptionInput = {
    id?: string
    status?: $Enums.FulfillmentStatus
    filledBy?: string | null
    filledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PharmacyFulfillmentCreateOrConnectWithoutPrescriptionInput = {
    where: PharmacyFulfillmentWhereUniqueInput
    create: XOR<PharmacyFulfillmentCreateWithoutPrescriptionInput, PharmacyFulfillmentUncheckedCreateWithoutPrescriptionInput>
  }

  export type PharmacyAuditLogCreateWithoutPrescriptionInput = {
    id?: string
    tenantId: string
    actorId: string
    action: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput = {
    id?: string
    tenantId: string
    actorId: string
    action: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PharmacyAuditLogCreateOrConnectWithoutPrescriptionInput = {
    where: PharmacyAuditLogWhereUniqueInput
    create: XOR<PharmacyAuditLogCreateWithoutPrescriptionInput, PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput>
  }

  export type PharmacyAuditLogCreateManyPrescriptionInputEnvelope = {
    data: PharmacyAuditLogCreateManyPrescriptionInput | PharmacyAuditLogCreateManyPrescriptionInput[]
    skipDuplicates?: boolean
  }

  export type PharmacyFulfillmentUpsertWithoutPrescriptionInput = {
    update: XOR<PharmacyFulfillmentUpdateWithoutPrescriptionInput, PharmacyFulfillmentUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<PharmacyFulfillmentCreateWithoutPrescriptionInput, PharmacyFulfillmentUncheckedCreateWithoutPrescriptionInput>
    where?: PharmacyFulfillmentWhereInput
  }

  export type PharmacyFulfillmentUpdateToOneWithWhereWithoutPrescriptionInput = {
    where?: PharmacyFulfillmentWhereInput
    data: XOR<PharmacyFulfillmentUpdateWithoutPrescriptionInput, PharmacyFulfillmentUncheckedUpdateWithoutPrescriptionInput>
  }

  export type PharmacyFulfillmentUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFulfillmentStatusFieldUpdateOperationsInput | $Enums.FulfillmentStatus
    filledBy?: NullableStringFieldUpdateOperationsInput | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyFulfillmentUncheckedUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFulfillmentStatusFieldUpdateOperationsInput | $Enums.FulfillmentStatus
    filledBy?: NullableStringFieldUpdateOperationsInput | string | null
    filledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyAuditLogUpsertWithWhereUniqueWithoutPrescriptionInput = {
    where: PharmacyAuditLogWhereUniqueInput
    update: XOR<PharmacyAuditLogUpdateWithoutPrescriptionInput, PharmacyAuditLogUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<PharmacyAuditLogCreateWithoutPrescriptionInput, PharmacyAuditLogUncheckedCreateWithoutPrescriptionInput>
  }

  export type PharmacyAuditLogUpdateWithWhereUniqueWithoutPrescriptionInput = {
    where: PharmacyAuditLogWhereUniqueInput
    data: XOR<PharmacyAuditLogUpdateWithoutPrescriptionInput, PharmacyAuditLogUncheckedUpdateWithoutPrescriptionInput>
  }

  export type PharmacyAuditLogUpdateManyWithWhereWithoutPrescriptionInput = {
    where: PharmacyAuditLogScalarWhereInput
    data: XOR<PharmacyAuditLogUpdateManyMutationInput, PharmacyAuditLogUncheckedUpdateManyWithoutPrescriptionInput>
  }

  export type PharmacyAuditLogScalarWhereInput = {
    AND?: PharmacyAuditLogScalarWhereInput | PharmacyAuditLogScalarWhereInput[]
    OR?: PharmacyAuditLogScalarWhereInput[]
    NOT?: PharmacyAuditLogScalarWhereInput | PharmacyAuditLogScalarWhereInput[]
    id?: StringFilter<"PharmacyAuditLog"> | string
    tenantId?: StringFilter<"PharmacyAuditLog"> | string
    prescriptionId?: StringFilter<"PharmacyAuditLog"> | string
    actorId?: StringFilter<"PharmacyAuditLog"> | string
    action?: StringFilter<"PharmacyAuditLog"> | string
    payload?: JsonNullableFilter<"PharmacyAuditLog">
    createdAt?: DateTimeFilter<"PharmacyAuditLog"> | Date | string
  }

  export type PrescriptionCreateWithoutFulfillmentInput = {
    id?: string
    tenantId: string
    patientId: string
    therapistId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    notes?: string | null
    status?: $Enums.PrescriptionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: PharmacyAuditLogCreateNestedManyWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutFulfillmentInput = {
    id?: string
    tenantId: string
    patientId: string
    therapistId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    notes?: string | null
    status?: $Enums.PrescriptionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: PharmacyAuditLogUncheckedCreateNestedManyWithoutPrescriptionInput
  }

  export type PrescriptionCreateOrConnectWithoutFulfillmentInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutFulfillmentInput, PrescriptionUncheckedCreateWithoutFulfillmentInput>
  }

  export type PrescriptionUpsertWithoutFulfillmentInput = {
    update: XOR<PrescriptionUpdateWithoutFulfillmentInput, PrescriptionUncheckedUpdateWithoutFulfillmentInput>
    create: XOR<PrescriptionCreateWithoutFulfillmentInput, PrescriptionUncheckedCreateWithoutFulfillmentInput>
    where?: PrescriptionWhereInput
  }

  export type PrescriptionUpdateToOneWithWhereWithoutFulfillmentInput = {
    where?: PrescriptionWhereInput
    data: XOR<PrescriptionUpdateWithoutFulfillmentInput, PrescriptionUncheckedUpdateWithoutFulfillmentInput>
  }

  export type PrescriptionUpdateWithoutFulfillmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    therapistId?: StringFieldUpdateOperationsInput | string
    medicationName?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPrescriptionStatusFieldUpdateOperationsInput | $Enums.PrescriptionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: PharmacyAuditLogUpdateManyWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutFulfillmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    therapistId?: StringFieldUpdateOperationsInput | string
    medicationName?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPrescriptionStatusFieldUpdateOperationsInput | $Enums.PrescriptionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: PharmacyAuditLogUncheckedUpdateManyWithoutPrescriptionNestedInput
  }

  export type PrescriptionCreateWithoutAuditLogsInput = {
    id?: string
    tenantId: string
    patientId: string
    therapistId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    notes?: string | null
    status?: $Enums.PrescriptionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillment?: PharmacyFulfillmentCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    tenantId: string
    patientId: string
    therapistId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    notes?: string | null
    status?: $Enums.PrescriptionStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillment?: PharmacyFulfillmentUncheckedCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionCreateOrConnectWithoutAuditLogsInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutAuditLogsInput, PrescriptionUncheckedCreateWithoutAuditLogsInput>
  }

  export type PrescriptionUpsertWithoutAuditLogsInput = {
    update: XOR<PrescriptionUpdateWithoutAuditLogsInput, PrescriptionUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<PrescriptionCreateWithoutAuditLogsInput, PrescriptionUncheckedCreateWithoutAuditLogsInput>
    where?: PrescriptionWhereInput
  }

  export type PrescriptionUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: PrescriptionWhereInput
    data: XOR<PrescriptionUpdateWithoutAuditLogsInput, PrescriptionUncheckedUpdateWithoutAuditLogsInput>
  }

  export type PrescriptionUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    therapistId?: StringFieldUpdateOperationsInput | string
    medicationName?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPrescriptionStatusFieldUpdateOperationsInput | $Enums.PrescriptionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillment?: PharmacyFulfillmentUpdateOneWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    therapistId?: StringFieldUpdateOperationsInput | string
    medicationName?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPrescriptionStatusFieldUpdateOperationsInput | $Enums.PrescriptionStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillment?: PharmacyFulfillmentUncheckedUpdateOneWithoutPrescriptionNestedInput
  }

  export type PharmacyAuditLogCreateManyPrescriptionInput = {
    id?: string
    tenantId: string
    actorId: string
    action: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PharmacyAuditLogUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyAuditLogUncheckedUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyAuditLogUncheckedUpdateManyWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
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