
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
 * Model Terminal
 * 
 */
export type Terminal = $Result.DefaultSelection<Prisma.$TerminalPayload>
/**
 * Model TerminalPairingCode
 * 
 */
export type TerminalPairingCode = $Result.DefaultSelection<Prisma.$TerminalPairingCodePayload>
/**
 * Model PosSession
 * 
 */
export type PosSession = $Result.DefaultSelection<Prisma.$PosSessionPayload>
/**
 * Model PosSessionItem
 * 
 */
export type PosSessionItem = $Result.DefaultSelection<Prisma.$PosSessionItemPayload>
/**
 * Model PosPayment
 * 
 */
export type PosPayment = $Result.DefaultSelection<Prisma.$PosPaymentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TerminalType: {
  POS: 'POS',
  KIOSK: 'KIOSK',
  PRINTER: 'PRINTER',
  TABLET: 'TABLET',
  OTHER: 'OTHER'
};

export type TerminalType = (typeof TerminalType)[keyof typeof TerminalType]


export const TerminalStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type TerminalStatus = (typeof TerminalStatus)[keyof typeof TerminalStatus]


export const PosSessionStatus: {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RECONCILED: 'RECONCILED'
};

export type PosSessionStatus = (typeof PosSessionStatus)[keyof typeof PosSessionStatus]


export const PosPaymentStatus: {
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type PosPaymentStatus = (typeof PosPaymentStatus)[keyof typeof PosPaymentStatus]

}

export type TerminalType = $Enums.TerminalType

export const TerminalType: typeof $Enums.TerminalType

export type TerminalStatus = $Enums.TerminalStatus

export const TerminalStatus: typeof $Enums.TerminalStatus

export type PosSessionStatus = $Enums.PosSessionStatus

export const PosSessionStatus: typeof $Enums.PosSessionStatus

export type PosPaymentStatus = $Enums.PosPaymentStatus

export const PosPaymentStatus: typeof $Enums.PosPaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Terminals
 * const terminals = await prisma.terminal.findMany()
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
   * // Fetch zero or more Terminals
   * const terminals = await prisma.terminal.findMany()
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
   * `prisma.terminal`: Exposes CRUD operations for the **Terminal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Terminals
    * const terminals = await prisma.terminal.findMany()
    * ```
    */
  get terminal(): Prisma.TerminalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.terminalPairingCode`: Exposes CRUD operations for the **TerminalPairingCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TerminalPairingCodes
    * const terminalPairingCodes = await prisma.terminalPairingCode.findMany()
    * ```
    */
  get terminalPairingCode(): Prisma.TerminalPairingCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.posSession`: Exposes CRUD operations for the **PosSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PosSessions
    * const posSessions = await prisma.posSession.findMany()
    * ```
    */
  get posSession(): Prisma.PosSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.posSessionItem`: Exposes CRUD operations for the **PosSessionItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PosSessionItems
    * const posSessionItems = await prisma.posSessionItem.findMany()
    * ```
    */
  get posSessionItem(): Prisma.PosSessionItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.posPayment`: Exposes CRUD operations for the **PosPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PosPayments
    * const posPayments = await prisma.posPayment.findMany()
    * ```
    */
  get posPayment(): Prisma.PosPaymentDelegate<ExtArgs, ClientOptions>;
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
    Terminal: 'Terminal',
    TerminalPairingCode: 'TerminalPairingCode',
    PosSession: 'PosSession',
    PosSessionItem: 'PosSessionItem',
    PosPayment: 'PosPayment'
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
      modelProps: "terminal" | "terminalPairingCode" | "posSession" | "posSessionItem" | "posPayment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Terminal: {
        payload: Prisma.$TerminalPayload<ExtArgs>
        fields: Prisma.TerminalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TerminalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TerminalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>
          }
          findFirst: {
            args: Prisma.TerminalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TerminalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>
          }
          findMany: {
            args: Prisma.TerminalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>[]
          }
          create: {
            args: Prisma.TerminalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>
          }
          createMany: {
            args: Prisma.TerminalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TerminalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>[]
          }
          delete: {
            args: Prisma.TerminalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>
          }
          update: {
            args: Prisma.TerminalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>
          }
          deleteMany: {
            args: Prisma.TerminalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TerminalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TerminalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>[]
          }
          upsert: {
            args: Prisma.TerminalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPayload>
          }
          aggregate: {
            args: Prisma.TerminalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTerminal>
          }
          groupBy: {
            args: Prisma.TerminalGroupByArgs<ExtArgs>
            result: $Utils.Optional<TerminalGroupByOutputType>[]
          }
          count: {
            args: Prisma.TerminalCountArgs<ExtArgs>
            result: $Utils.Optional<TerminalCountAggregateOutputType> | number
          }
        }
      }
      TerminalPairingCode: {
        payload: Prisma.$TerminalPairingCodePayload<ExtArgs>
        fields: Prisma.TerminalPairingCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TerminalPairingCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TerminalPairingCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>
          }
          findFirst: {
            args: Prisma.TerminalPairingCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TerminalPairingCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>
          }
          findMany: {
            args: Prisma.TerminalPairingCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>[]
          }
          create: {
            args: Prisma.TerminalPairingCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>
          }
          createMany: {
            args: Prisma.TerminalPairingCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TerminalPairingCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>[]
          }
          delete: {
            args: Prisma.TerminalPairingCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>
          }
          update: {
            args: Prisma.TerminalPairingCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>
          }
          deleteMany: {
            args: Prisma.TerminalPairingCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TerminalPairingCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TerminalPairingCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>[]
          }
          upsert: {
            args: Prisma.TerminalPairingCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TerminalPairingCodePayload>
          }
          aggregate: {
            args: Prisma.TerminalPairingCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTerminalPairingCode>
          }
          groupBy: {
            args: Prisma.TerminalPairingCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TerminalPairingCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TerminalPairingCodeCountArgs<ExtArgs>
            result: $Utils.Optional<TerminalPairingCodeCountAggregateOutputType> | number
          }
        }
      }
      PosSession: {
        payload: Prisma.$PosSessionPayload<ExtArgs>
        fields: Prisma.PosSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PosSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PosSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>
          }
          findFirst: {
            args: Prisma.PosSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PosSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>
          }
          findMany: {
            args: Prisma.PosSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>[]
          }
          create: {
            args: Prisma.PosSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>
          }
          createMany: {
            args: Prisma.PosSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PosSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>[]
          }
          delete: {
            args: Prisma.PosSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>
          }
          update: {
            args: Prisma.PosSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>
          }
          deleteMany: {
            args: Prisma.PosSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PosSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PosSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>[]
          }
          upsert: {
            args: Prisma.PosSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionPayload>
          }
          aggregate: {
            args: Prisma.PosSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosSession>
          }
          groupBy: {
            args: Prisma.PosSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PosSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PosSessionCountArgs<ExtArgs>
            result: $Utils.Optional<PosSessionCountAggregateOutputType> | number
          }
        }
      }
      PosSessionItem: {
        payload: Prisma.$PosSessionItemPayload<ExtArgs>
        fields: Prisma.PosSessionItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PosSessionItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PosSessionItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>
          }
          findFirst: {
            args: Prisma.PosSessionItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PosSessionItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>
          }
          findMany: {
            args: Prisma.PosSessionItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>[]
          }
          create: {
            args: Prisma.PosSessionItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>
          }
          createMany: {
            args: Prisma.PosSessionItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PosSessionItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>[]
          }
          delete: {
            args: Prisma.PosSessionItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>
          }
          update: {
            args: Prisma.PosSessionItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>
          }
          deleteMany: {
            args: Prisma.PosSessionItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PosSessionItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PosSessionItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>[]
          }
          upsert: {
            args: Prisma.PosSessionItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosSessionItemPayload>
          }
          aggregate: {
            args: Prisma.PosSessionItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosSessionItem>
          }
          groupBy: {
            args: Prisma.PosSessionItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PosSessionItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PosSessionItemCountArgs<ExtArgs>
            result: $Utils.Optional<PosSessionItemCountAggregateOutputType> | number
          }
        }
      }
      PosPayment: {
        payload: Prisma.$PosPaymentPayload<ExtArgs>
        fields: Prisma.PosPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PosPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PosPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>
          }
          findFirst: {
            args: Prisma.PosPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PosPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>
          }
          findMany: {
            args: Prisma.PosPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>[]
          }
          create: {
            args: Prisma.PosPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>
          }
          createMany: {
            args: Prisma.PosPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PosPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>[]
          }
          delete: {
            args: Prisma.PosPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>
          }
          update: {
            args: Prisma.PosPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>
          }
          deleteMany: {
            args: Prisma.PosPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PosPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PosPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>[]
          }
          upsert: {
            args: Prisma.PosPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PosPaymentPayload>
          }
          aggregate: {
            args: Prisma.PosPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePosPayment>
          }
          groupBy: {
            args: Prisma.PosPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PosPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PosPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PosPaymentCountAggregateOutputType> | number
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
    terminal?: TerminalOmit
    terminalPairingCode?: TerminalPairingCodeOmit
    posSession?: PosSessionOmit
    posSessionItem?: PosSessionItemOmit
    posPayment?: PosPaymentOmit
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
   * Count Type TerminalCountOutputType
   */

  export type TerminalCountOutputType = {
    pairingCodes: number
    posSessions: number
  }

  export type TerminalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pairingCodes?: boolean | TerminalCountOutputTypeCountPairingCodesArgs
    posSessions?: boolean | TerminalCountOutputTypeCountPosSessionsArgs
  }

  // Custom InputTypes
  /**
   * TerminalCountOutputType without action
   */
  export type TerminalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalCountOutputType
     */
    select?: TerminalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TerminalCountOutputType without action
   */
  export type TerminalCountOutputTypeCountPairingCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TerminalPairingCodeWhereInput
  }

  /**
   * TerminalCountOutputType without action
   */
  export type TerminalCountOutputTypeCountPosSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PosSessionWhereInput
  }


  /**
   * Count Type PosSessionCountOutputType
   */

  export type PosSessionCountOutputType = {
    items: number
    payments: number
  }

  export type PosSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | PosSessionCountOutputTypeCountItemsArgs
    payments?: boolean | PosSessionCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * PosSessionCountOutputType without action
   */
  export type PosSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionCountOutputType
     */
    select?: PosSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PosSessionCountOutputType without action
   */
  export type PosSessionCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PosSessionItemWhereInput
  }

  /**
   * PosSessionCountOutputType without action
   */
  export type PosSessionCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PosPaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Terminal
   */

  export type AggregateTerminal = {
    _count: TerminalCountAggregateOutputType | null
    _min: TerminalMinAggregateOutputType | null
    _max: TerminalMaxAggregateOutputType | null
  }

  export type TerminalMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    locationId: string | null
    name: string | null
    code: string | null
    type: $Enums.TerminalType | null
    ipAddress: string | null
    macAddress: string | null
    status: $Enums.TerminalStatus | null
    lastSeenAt: Date | null
    deviceToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TerminalMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    locationId: string | null
    name: string | null
    code: string | null
    type: $Enums.TerminalType | null
    ipAddress: string | null
    macAddress: string | null
    status: $Enums.TerminalStatus | null
    lastSeenAt: Date | null
    deviceToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TerminalCountAggregateOutputType = {
    id: number
    tenantId: number
    locationId: number
    name: number
    code: number
    type: number
    ipAddress: number
    macAddress: number
    status: number
    lastSeenAt: number
    deviceToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TerminalMinAggregateInputType = {
    id?: true
    tenantId?: true
    locationId?: true
    name?: true
    code?: true
    type?: true
    ipAddress?: true
    macAddress?: true
    status?: true
    lastSeenAt?: true
    deviceToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TerminalMaxAggregateInputType = {
    id?: true
    tenantId?: true
    locationId?: true
    name?: true
    code?: true
    type?: true
    ipAddress?: true
    macAddress?: true
    status?: true
    lastSeenAt?: true
    deviceToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TerminalCountAggregateInputType = {
    id?: true
    tenantId?: true
    locationId?: true
    name?: true
    code?: true
    type?: true
    ipAddress?: true
    macAddress?: true
    status?: true
    lastSeenAt?: true
    deviceToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TerminalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Terminal to aggregate.
     */
    where?: TerminalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Terminals to fetch.
     */
    orderBy?: TerminalOrderByWithRelationInput | TerminalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TerminalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Terminals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Terminals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Terminals
    **/
    _count?: true | TerminalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TerminalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TerminalMaxAggregateInputType
  }

  export type GetTerminalAggregateType<T extends TerminalAggregateArgs> = {
        [P in keyof T & keyof AggregateTerminal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTerminal[P]>
      : GetScalarType<T[P], AggregateTerminal[P]>
  }




  export type TerminalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TerminalWhereInput
    orderBy?: TerminalOrderByWithAggregationInput | TerminalOrderByWithAggregationInput[]
    by: TerminalScalarFieldEnum[] | TerminalScalarFieldEnum
    having?: TerminalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TerminalCountAggregateInputType | true
    _min?: TerminalMinAggregateInputType
    _max?: TerminalMaxAggregateInputType
  }

  export type TerminalGroupByOutputType = {
    id: string
    tenantId: string
    locationId: string
    name: string
    code: string
    type: $Enums.TerminalType
    ipAddress: string | null
    macAddress: string | null
    status: $Enums.TerminalStatus
    lastSeenAt: Date | null
    deviceToken: string | null
    createdAt: Date
    updatedAt: Date
    _count: TerminalCountAggregateOutputType | null
    _min: TerminalMinAggregateOutputType | null
    _max: TerminalMaxAggregateOutputType | null
  }

  type GetTerminalGroupByPayload<T extends TerminalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TerminalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TerminalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TerminalGroupByOutputType[P]>
            : GetScalarType<T[P], TerminalGroupByOutputType[P]>
        }
      >
    >


  export type TerminalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    locationId?: boolean
    name?: boolean
    code?: boolean
    type?: boolean
    ipAddress?: boolean
    macAddress?: boolean
    status?: boolean
    lastSeenAt?: boolean
    deviceToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pairingCodes?: boolean | Terminal$pairingCodesArgs<ExtArgs>
    posSessions?: boolean | Terminal$posSessionsArgs<ExtArgs>
    _count?: boolean | TerminalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["terminal"]>

  export type TerminalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    locationId?: boolean
    name?: boolean
    code?: boolean
    type?: boolean
    ipAddress?: boolean
    macAddress?: boolean
    status?: boolean
    lastSeenAt?: boolean
    deviceToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["terminal"]>

  export type TerminalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    locationId?: boolean
    name?: boolean
    code?: boolean
    type?: boolean
    ipAddress?: boolean
    macAddress?: boolean
    status?: boolean
    lastSeenAt?: boolean
    deviceToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["terminal"]>

  export type TerminalSelectScalar = {
    id?: boolean
    tenantId?: boolean
    locationId?: boolean
    name?: boolean
    code?: boolean
    type?: boolean
    ipAddress?: boolean
    macAddress?: boolean
    status?: boolean
    lastSeenAt?: boolean
    deviceToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TerminalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "locationId" | "name" | "code" | "type" | "ipAddress" | "macAddress" | "status" | "lastSeenAt" | "deviceToken" | "createdAt" | "updatedAt", ExtArgs["result"]["terminal"]>
  export type TerminalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pairingCodes?: boolean | Terminal$pairingCodesArgs<ExtArgs>
    posSessions?: boolean | Terminal$posSessionsArgs<ExtArgs>
    _count?: boolean | TerminalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TerminalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TerminalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TerminalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Terminal"
    objects: {
      pairingCodes: Prisma.$TerminalPairingCodePayload<ExtArgs>[]
      posSessions: Prisma.$PosSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      locationId: string
      name: string
      code: string
      type: $Enums.TerminalType
      ipAddress: string | null
      macAddress: string | null
      status: $Enums.TerminalStatus
      lastSeenAt: Date | null
      deviceToken: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["terminal"]>
    composites: {}
  }

  type TerminalGetPayload<S extends boolean | null | undefined | TerminalDefaultArgs> = $Result.GetResult<Prisma.$TerminalPayload, S>

  type TerminalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TerminalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TerminalCountAggregateInputType | true
    }

  export interface TerminalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Terminal'], meta: { name: 'Terminal' } }
    /**
     * Find zero or one Terminal that matches the filter.
     * @param {TerminalFindUniqueArgs} args - Arguments to find a Terminal
     * @example
     * // Get one Terminal
     * const terminal = await prisma.terminal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TerminalFindUniqueArgs>(args: SelectSubset<T, TerminalFindUniqueArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Terminal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TerminalFindUniqueOrThrowArgs} args - Arguments to find a Terminal
     * @example
     * // Get one Terminal
     * const terminal = await prisma.terminal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TerminalFindUniqueOrThrowArgs>(args: SelectSubset<T, TerminalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Terminal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalFindFirstArgs} args - Arguments to find a Terminal
     * @example
     * // Get one Terminal
     * const terminal = await prisma.terminal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TerminalFindFirstArgs>(args?: SelectSubset<T, TerminalFindFirstArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Terminal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalFindFirstOrThrowArgs} args - Arguments to find a Terminal
     * @example
     * // Get one Terminal
     * const terminal = await prisma.terminal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TerminalFindFirstOrThrowArgs>(args?: SelectSubset<T, TerminalFindFirstOrThrowArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Terminals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Terminals
     * const terminals = await prisma.terminal.findMany()
     * 
     * // Get first 10 Terminals
     * const terminals = await prisma.terminal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const terminalWithIdOnly = await prisma.terminal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TerminalFindManyArgs>(args?: SelectSubset<T, TerminalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Terminal.
     * @param {TerminalCreateArgs} args - Arguments to create a Terminal.
     * @example
     * // Create one Terminal
     * const Terminal = await prisma.terminal.create({
     *   data: {
     *     // ... data to create a Terminal
     *   }
     * })
     * 
     */
    create<T extends TerminalCreateArgs>(args: SelectSubset<T, TerminalCreateArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Terminals.
     * @param {TerminalCreateManyArgs} args - Arguments to create many Terminals.
     * @example
     * // Create many Terminals
     * const terminal = await prisma.terminal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TerminalCreateManyArgs>(args?: SelectSubset<T, TerminalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Terminals and returns the data saved in the database.
     * @param {TerminalCreateManyAndReturnArgs} args - Arguments to create many Terminals.
     * @example
     * // Create many Terminals
     * const terminal = await prisma.terminal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Terminals and only return the `id`
     * const terminalWithIdOnly = await prisma.terminal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TerminalCreateManyAndReturnArgs>(args?: SelectSubset<T, TerminalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Terminal.
     * @param {TerminalDeleteArgs} args - Arguments to delete one Terminal.
     * @example
     * // Delete one Terminal
     * const Terminal = await prisma.terminal.delete({
     *   where: {
     *     // ... filter to delete one Terminal
     *   }
     * })
     * 
     */
    delete<T extends TerminalDeleteArgs>(args: SelectSubset<T, TerminalDeleteArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Terminal.
     * @param {TerminalUpdateArgs} args - Arguments to update one Terminal.
     * @example
     * // Update one Terminal
     * const terminal = await prisma.terminal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TerminalUpdateArgs>(args: SelectSubset<T, TerminalUpdateArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Terminals.
     * @param {TerminalDeleteManyArgs} args - Arguments to filter Terminals to delete.
     * @example
     * // Delete a few Terminals
     * const { count } = await prisma.terminal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TerminalDeleteManyArgs>(args?: SelectSubset<T, TerminalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Terminals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Terminals
     * const terminal = await prisma.terminal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TerminalUpdateManyArgs>(args: SelectSubset<T, TerminalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Terminals and returns the data updated in the database.
     * @param {TerminalUpdateManyAndReturnArgs} args - Arguments to update many Terminals.
     * @example
     * // Update many Terminals
     * const terminal = await prisma.terminal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Terminals and only return the `id`
     * const terminalWithIdOnly = await prisma.terminal.updateManyAndReturn({
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
    updateManyAndReturn<T extends TerminalUpdateManyAndReturnArgs>(args: SelectSubset<T, TerminalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Terminal.
     * @param {TerminalUpsertArgs} args - Arguments to update or create a Terminal.
     * @example
     * // Update or create a Terminal
     * const terminal = await prisma.terminal.upsert({
     *   create: {
     *     // ... data to create a Terminal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Terminal we want to update
     *   }
     * })
     */
    upsert<T extends TerminalUpsertArgs>(args: SelectSubset<T, TerminalUpsertArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Terminals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalCountArgs} args - Arguments to filter Terminals to count.
     * @example
     * // Count the number of Terminals
     * const count = await prisma.terminal.count({
     *   where: {
     *     // ... the filter for the Terminals we want to count
     *   }
     * })
    **/
    count<T extends TerminalCountArgs>(
      args?: Subset<T, TerminalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TerminalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Terminal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TerminalAggregateArgs>(args: Subset<T, TerminalAggregateArgs>): Prisma.PrismaPromise<GetTerminalAggregateType<T>>

    /**
     * Group by Terminal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalGroupByArgs} args - Group by arguments.
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
      T extends TerminalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TerminalGroupByArgs['orderBy'] }
        : { orderBy?: TerminalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TerminalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTerminalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Terminal model
   */
  readonly fields: TerminalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Terminal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TerminalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pairingCodes<T extends Terminal$pairingCodesArgs<ExtArgs> = {}>(args?: Subset<T, Terminal$pairingCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posSessions<T extends Terminal$posSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Terminal$posSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Terminal model
   */
  interface TerminalFieldRefs {
    readonly id: FieldRef<"Terminal", 'String'>
    readonly tenantId: FieldRef<"Terminal", 'String'>
    readonly locationId: FieldRef<"Terminal", 'String'>
    readonly name: FieldRef<"Terminal", 'String'>
    readonly code: FieldRef<"Terminal", 'String'>
    readonly type: FieldRef<"Terminal", 'TerminalType'>
    readonly ipAddress: FieldRef<"Terminal", 'String'>
    readonly macAddress: FieldRef<"Terminal", 'String'>
    readonly status: FieldRef<"Terminal", 'TerminalStatus'>
    readonly lastSeenAt: FieldRef<"Terminal", 'DateTime'>
    readonly deviceToken: FieldRef<"Terminal", 'String'>
    readonly createdAt: FieldRef<"Terminal", 'DateTime'>
    readonly updatedAt: FieldRef<"Terminal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Terminal findUnique
   */
  export type TerminalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * Filter, which Terminal to fetch.
     */
    where: TerminalWhereUniqueInput
  }

  /**
   * Terminal findUniqueOrThrow
   */
  export type TerminalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * Filter, which Terminal to fetch.
     */
    where: TerminalWhereUniqueInput
  }

  /**
   * Terminal findFirst
   */
  export type TerminalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * Filter, which Terminal to fetch.
     */
    where?: TerminalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Terminals to fetch.
     */
    orderBy?: TerminalOrderByWithRelationInput | TerminalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Terminals.
     */
    cursor?: TerminalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Terminals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Terminals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Terminals.
     */
    distinct?: TerminalScalarFieldEnum | TerminalScalarFieldEnum[]
  }

  /**
   * Terminal findFirstOrThrow
   */
  export type TerminalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * Filter, which Terminal to fetch.
     */
    where?: TerminalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Terminals to fetch.
     */
    orderBy?: TerminalOrderByWithRelationInput | TerminalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Terminals.
     */
    cursor?: TerminalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Terminals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Terminals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Terminals.
     */
    distinct?: TerminalScalarFieldEnum | TerminalScalarFieldEnum[]
  }

  /**
   * Terminal findMany
   */
  export type TerminalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * Filter, which Terminals to fetch.
     */
    where?: TerminalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Terminals to fetch.
     */
    orderBy?: TerminalOrderByWithRelationInput | TerminalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Terminals.
     */
    cursor?: TerminalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Terminals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Terminals.
     */
    skip?: number
    distinct?: TerminalScalarFieldEnum | TerminalScalarFieldEnum[]
  }

  /**
   * Terminal create
   */
  export type TerminalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * The data needed to create a Terminal.
     */
    data: XOR<TerminalCreateInput, TerminalUncheckedCreateInput>
  }

  /**
   * Terminal createMany
   */
  export type TerminalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Terminals.
     */
    data: TerminalCreateManyInput | TerminalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Terminal createManyAndReturn
   */
  export type TerminalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * The data used to create many Terminals.
     */
    data: TerminalCreateManyInput | TerminalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Terminal update
   */
  export type TerminalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * The data needed to update a Terminal.
     */
    data: XOR<TerminalUpdateInput, TerminalUncheckedUpdateInput>
    /**
     * Choose, which Terminal to update.
     */
    where: TerminalWhereUniqueInput
  }

  /**
   * Terminal updateMany
   */
  export type TerminalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Terminals.
     */
    data: XOR<TerminalUpdateManyMutationInput, TerminalUncheckedUpdateManyInput>
    /**
     * Filter which Terminals to update
     */
    where?: TerminalWhereInput
    /**
     * Limit how many Terminals to update.
     */
    limit?: number
  }

  /**
   * Terminal updateManyAndReturn
   */
  export type TerminalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * The data used to update Terminals.
     */
    data: XOR<TerminalUpdateManyMutationInput, TerminalUncheckedUpdateManyInput>
    /**
     * Filter which Terminals to update
     */
    where?: TerminalWhereInput
    /**
     * Limit how many Terminals to update.
     */
    limit?: number
  }

  /**
   * Terminal upsert
   */
  export type TerminalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * The filter to search for the Terminal to update in case it exists.
     */
    where: TerminalWhereUniqueInput
    /**
     * In case the Terminal found by the `where` argument doesn't exist, create a new Terminal with this data.
     */
    create: XOR<TerminalCreateInput, TerminalUncheckedCreateInput>
    /**
     * In case the Terminal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TerminalUpdateInput, TerminalUncheckedUpdateInput>
  }

  /**
   * Terminal delete
   */
  export type TerminalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
    /**
     * Filter which Terminal to delete.
     */
    where: TerminalWhereUniqueInput
  }

  /**
   * Terminal deleteMany
   */
  export type TerminalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Terminals to delete
     */
    where?: TerminalWhereInput
    /**
     * Limit how many Terminals to delete.
     */
    limit?: number
  }

  /**
   * Terminal.pairingCodes
   */
  export type Terminal$pairingCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    where?: TerminalPairingCodeWhereInput
    orderBy?: TerminalPairingCodeOrderByWithRelationInput | TerminalPairingCodeOrderByWithRelationInput[]
    cursor?: TerminalPairingCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TerminalPairingCodeScalarFieldEnum | TerminalPairingCodeScalarFieldEnum[]
  }

  /**
   * Terminal.posSessions
   */
  export type Terminal$posSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    where?: PosSessionWhereInput
    orderBy?: PosSessionOrderByWithRelationInput | PosSessionOrderByWithRelationInput[]
    cursor?: PosSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PosSessionScalarFieldEnum | PosSessionScalarFieldEnum[]
  }

  /**
   * Terminal without action
   */
  export type TerminalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Terminal
     */
    select?: TerminalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Terminal
     */
    omit?: TerminalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalInclude<ExtArgs> | null
  }


  /**
   * Model TerminalPairingCode
   */

  export type AggregateTerminalPairingCode = {
    _count: TerminalPairingCodeCountAggregateOutputType | null
    _min: TerminalPairingCodeMinAggregateOutputType | null
    _max: TerminalPairingCodeMaxAggregateOutputType | null
  }

  export type TerminalPairingCodeMinAggregateOutputType = {
    id: string | null
    terminalId: string | null
    code: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type TerminalPairingCodeMaxAggregateOutputType = {
    id: string | null
    terminalId: string | null
    code: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type TerminalPairingCodeCountAggregateOutputType = {
    id: number
    terminalId: number
    code: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type TerminalPairingCodeMinAggregateInputType = {
    id?: true
    terminalId?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type TerminalPairingCodeMaxAggregateInputType = {
    id?: true
    terminalId?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type TerminalPairingCodeCountAggregateInputType = {
    id?: true
    terminalId?: true
    code?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type TerminalPairingCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TerminalPairingCode to aggregate.
     */
    where?: TerminalPairingCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TerminalPairingCodes to fetch.
     */
    orderBy?: TerminalPairingCodeOrderByWithRelationInput | TerminalPairingCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TerminalPairingCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TerminalPairingCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TerminalPairingCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TerminalPairingCodes
    **/
    _count?: true | TerminalPairingCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TerminalPairingCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TerminalPairingCodeMaxAggregateInputType
  }

  export type GetTerminalPairingCodeAggregateType<T extends TerminalPairingCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateTerminalPairingCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTerminalPairingCode[P]>
      : GetScalarType<T[P], AggregateTerminalPairingCode[P]>
  }




  export type TerminalPairingCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TerminalPairingCodeWhereInput
    orderBy?: TerminalPairingCodeOrderByWithAggregationInput | TerminalPairingCodeOrderByWithAggregationInput[]
    by: TerminalPairingCodeScalarFieldEnum[] | TerminalPairingCodeScalarFieldEnum
    having?: TerminalPairingCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TerminalPairingCodeCountAggregateInputType | true
    _min?: TerminalPairingCodeMinAggregateInputType
    _max?: TerminalPairingCodeMaxAggregateInputType
  }

  export type TerminalPairingCodeGroupByOutputType = {
    id: string
    terminalId: string
    code: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: TerminalPairingCodeCountAggregateOutputType | null
    _min: TerminalPairingCodeMinAggregateOutputType | null
    _max: TerminalPairingCodeMaxAggregateOutputType | null
  }

  type GetTerminalPairingCodeGroupByPayload<T extends TerminalPairingCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TerminalPairingCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TerminalPairingCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TerminalPairingCodeGroupByOutputType[P]>
            : GetScalarType<T[P], TerminalPairingCodeGroupByOutputType[P]>
        }
      >
    >


  export type TerminalPairingCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    terminalId?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["terminalPairingCode"]>

  export type TerminalPairingCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    terminalId?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["terminalPairingCode"]>

  export type TerminalPairingCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    terminalId?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["terminalPairingCode"]>

  export type TerminalPairingCodeSelectScalar = {
    id?: boolean
    terminalId?: boolean
    code?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type TerminalPairingCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "terminalId" | "code" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["terminalPairingCode"]>
  export type TerminalPairingCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }
  export type TerminalPairingCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }
  export type TerminalPairingCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }

  export type $TerminalPairingCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TerminalPairingCode"
    objects: {
      terminal: Prisma.$TerminalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      terminalId: string
      code: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["terminalPairingCode"]>
    composites: {}
  }

  type TerminalPairingCodeGetPayload<S extends boolean | null | undefined | TerminalPairingCodeDefaultArgs> = $Result.GetResult<Prisma.$TerminalPairingCodePayload, S>

  type TerminalPairingCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TerminalPairingCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TerminalPairingCodeCountAggregateInputType | true
    }

  export interface TerminalPairingCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TerminalPairingCode'], meta: { name: 'TerminalPairingCode' } }
    /**
     * Find zero or one TerminalPairingCode that matches the filter.
     * @param {TerminalPairingCodeFindUniqueArgs} args - Arguments to find a TerminalPairingCode
     * @example
     * // Get one TerminalPairingCode
     * const terminalPairingCode = await prisma.terminalPairingCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TerminalPairingCodeFindUniqueArgs>(args: SelectSubset<T, TerminalPairingCodeFindUniqueArgs<ExtArgs>>): Prisma__TerminalPairingCodeClient<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TerminalPairingCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TerminalPairingCodeFindUniqueOrThrowArgs} args - Arguments to find a TerminalPairingCode
     * @example
     * // Get one TerminalPairingCode
     * const terminalPairingCode = await prisma.terminalPairingCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TerminalPairingCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, TerminalPairingCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TerminalPairingCodeClient<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TerminalPairingCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalPairingCodeFindFirstArgs} args - Arguments to find a TerminalPairingCode
     * @example
     * // Get one TerminalPairingCode
     * const terminalPairingCode = await prisma.terminalPairingCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TerminalPairingCodeFindFirstArgs>(args?: SelectSubset<T, TerminalPairingCodeFindFirstArgs<ExtArgs>>): Prisma__TerminalPairingCodeClient<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TerminalPairingCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalPairingCodeFindFirstOrThrowArgs} args - Arguments to find a TerminalPairingCode
     * @example
     * // Get one TerminalPairingCode
     * const terminalPairingCode = await prisma.terminalPairingCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TerminalPairingCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, TerminalPairingCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TerminalPairingCodeClient<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TerminalPairingCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalPairingCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TerminalPairingCodes
     * const terminalPairingCodes = await prisma.terminalPairingCode.findMany()
     * 
     * // Get first 10 TerminalPairingCodes
     * const terminalPairingCodes = await prisma.terminalPairingCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const terminalPairingCodeWithIdOnly = await prisma.terminalPairingCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TerminalPairingCodeFindManyArgs>(args?: SelectSubset<T, TerminalPairingCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TerminalPairingCode.
     * @param {TerminalPairingCodeCreateArgs} args - Arguments to create a TerminalPairingCode.
     * @example
     * // Create one TerminalPairingCode
     * const TerminalPairingCode = await prisma.terminalPairingCode.create({
     *   data: {
     *     // ... data to create a TerminalPairingCode
     *   }
     * })
     * 
     */
    create<T extends TerminalPairingCodeCreateArgs>(args: SelectSubset<T, TerminalPairingCodeCreateArgs<ExtArgs>>): Prisma__TerminalPairingCodeClient<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TerminalPairingCodes.
     * @param {TerminalPairingCodeCreateManyArgs} args - Arguments to create many TerminalPairingCodes.
     * @example
     * // Create many TerminalPairingCodes
     * const terminalPairingCode = await prisma.terminalPairingCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TerminalPairingCodeCreateManyArgs>(args?: SelectSubset<T, TerminalPairingCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TerminalPairingCodes and returns the data saved in the database.
     * @param {TerminalPairingCodeCreateManyAndReturnArgs} args - Arguments to create many TerminalPairingCodes.
     * @example
     * // Create many TerminalPairingCodes
     * const terminalPairingCode = await prisma.terminalPairingCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TerminalPairingCodes and only return the `id`
     * const terminalPairingCodeWithIdOnly = await prisma.terminalPairingCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TerminalPairingCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, TerminalPairingCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TerminalPairingCode.
     * @param {TerminalPairingCodeDeleteArgs} args - Arguments to delete one TerminalPairingCode.
     * @example
     * // Delete one TerminalPairingCode
     * const TerminalPairingCode = await prisma.terminalPairingCode.delete({
     *   where: {
     *     // ... filter to delete one TerminalPairingCode
     *   }
     * })
     * 
     */
    delete<T extends TerminalPairingCodeDeleteArgs>(args: SelectSubset<T, TerminalPairingCodeDeleteArgs<ExtArgs>>): Prisma__TerminalPairingCodeClient<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TerminalPairingCode.
     * @param {TerminalPairingCodeUpdateArgs} args - Arguments to update one TerminalPairingCode.
     * @example
     * // Update one TerminalPairingCode
     * const terminalPairingCode = await prisma.terminalPairingCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TerminalPairingCodeUpdateArgs>(args: SelectSubset<T, TerminalPairingCodeUpdateArgs<ExtArgs>>): Prisma__TerminalPairingCodeClient<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TerminalPairingCodes.
     * @param {TerminalPairingCodeDeleteManyArgs} args - Arguments to filter TerminalPairingCodes to delete.
     * @example
     * // Delete a few TerminalPairingCodes
     * const { count } = await prisma.terminalPairingCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TerminalPairingCodeDeleteManyArgs>(args?: SelectSubset<T, TerminalPairingCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TerminalPairingCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalPairingCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TerminalPairingCodes
     * const terminalPairingCode = await prisma.terminalPairingCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TerminalPairingCodeUpdateManyArgs>(args: SelectSubset<T, TerminalPairingCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TerminalPairingCodes and returns the data updated in the database.
     * @param {TerminalPairingCodeUpdateManyAndReturnArgs} args - Arguments to update many TerminalPairingCodes.
     * @example
     * // Update many TerminalPairingCodes
     * const terminalPairingCode = await prisma.terminalPairingCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TerminalPairingCodes and only return the `id`
     * const terminalPairingCodeWithIdOnly = await prisma.terminalPairingCode.updateManyAndReturn({
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
    updateManyAndReturn<T extends TerminalPairingCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, TerminalPairingCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TerminalPairingCode.
     * @param {TerminalPairingCodeUpsertArgs} args - Arguments to update or create a TerminalPairingCode.
     * @example
     * // Update or create a TerminalPairingCode
     * const terminalPairingCode = await prisma.terminalPairingCode.upsert({
     *   create: {
     *     // ... data to create a TerminalPairingCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TerminalPairingCode we want to update
     *   }
     * })
     */
    upsert<T extends TerminalPairingCodeUpsertArgs>(args: SelectSubset<T, TerminalPairingCodeUpsertArgs<ExtArgs>>): Prisma__TerminalPairingCodeClient<$Result.GetResult<Prisma.$TerminalPairingCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TerminalPairingCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalPairingCodeCountArgs} args - Arguments to filter TerminalPairingCodes to count.
     * @example
     * // Count the number of TerminalPairingCodes
     * const count = await prisma.terminalPairingCode.count({
     *   where: {
     *     // ... the filter for the TerminalPairingCodes we want to count
     *   }
     * })
    **/
    count<T extends TerminalPairingCodeCountArgs>(
      args?: Subset<T, TerminalPairingCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TerminalPairingCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TerminalPairingCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalPairingCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TerminalPairingCodeAggregateArgs>(args: Subset<T, TerminalPairingCodeAggregateArgs>): Prisma.PrismaPromise<GetTerminalPairingCodeAggregateType<T>>

    /**
     * Group by TerminalPairingCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TerminalPairingCodeGroupByArgs} args - Group by arguments.
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
      T extends TerminalPairingCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TerminalPairingCodeGroupByArgs['orderBy'] }
        : { orderBy?: TerminalPairingCodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TerminalPairingCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTerminalPairingCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TerminalPairingCode model
   */
  readonly fields: TerminalPairingCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TerminalPairingCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TerminalPairingCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    terminal<T extends TerminalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TerminalDefaultArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TerminalPairingCode model
   */
  interface TerminalPairingCodeFieldRefs {
    readonly id: FieldRef<"TerminalPairingCode", 'String'>
    readonly terminalId: FieldRef<"TerminalPairingCode", 'String'>
    readonly code: FieldRef<"TerminalPairingCode", 'String'>
    readonly expiresAt: FieldRef<"TerminalPairingCode", 'DateTime'>
    readonly usedAt: FieldRef<"TerminalPairingCode", 'DateTime'>
    readonly createdAt: FieldRef<"TerminalPairingCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TerminalPairingCode findUnique
   */
  export type TerminalPairingCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which TerminalPairingCode to fetch.
     */
    where: TerminalPairingCodeWhereUniqueInput
  }

  /**
   * TerminalPairingCode findUniqueOrThrow
   */
  export type TerminalPairingCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which TerminalPairingCode to fetch.
     */
    where: TerminalPairingCodeWhereUniqueInput
  }

  /**
   * TerminalPairingCode findFirst
   */
  export type TerminalPairingCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which TerminalPairingCode to fetch.
     */
    where?: TerminalPairingCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TerminalPairingCodes to fetch.
     */
    orderBy?: TerminalPairingCodeOrderByWithRelationInput | TerminalPairingCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TerminalPairingCodes.
     */
    cursor?: TerminalPairingCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TerminalPairingCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TerminalPairingCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TerminalPairingCodes.
     */
    distinct?: TerminalPairingCodeScalarFieldEnum | TerminalPairingCodeScalarFieldEnum[]
  }

  /**
   * TerminalPairingCode findFirstOrThrow
   */
  export type TerminalPairingCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which TerminalPairingCode to fetch.
     */
    where?: TerminalPairingCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TerminalPairingCodes to fetch.
     */
    orderBy?: TerminalPairingCodeOrderByWithRelationInput | TerminalPairingCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TerminalPairingCodes.
     */
    cursor?: TerminalPairingCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TerminalPairingCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TerminalPairingCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TerminalPairingCodes.
     */
    distinct?: TerminalPairingCodeScalarFieldEnum | TerminalPairingCodeScalarFieldEnum[]
  }

  /**
   * TerminalPairingCode findMany
   */
  export type TerminalPairingCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which TerminalPairingCodes to fetch.
     */
    where?: TerminalPairingCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TerminalPairingCodes to fetch.
     */
    orderBy?: TerminalPairingCodeOrderByWithRelationInput | TerminalPairingCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TerminalPairingCodes.
     */
    cursor?: TerminalPairingCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TerminalPairingCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TerminalPairingCodes.
     */
    skip?: number
    distinct?: TerminalPairingCodeScalarFieldEnum | TerminalPairingCodeScalarFieldEnum[]
  }

  /**
   * TerminalPairingCode create
   */
  export type TerminalPairingCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a TerminalPairingCode.
     */
    data: XOR<TerminalPairingCodeCreateInput, TerminalPairingCodeUncheckedCreateInput>
  }

  /**
   * TerminalPairingCode createMany
   */
  export type TerminalPairingCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TerminalPairingCodes.
     */
    data: TerminalPairingCodeCreateManyInput | TerminalPairingCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TerminalPairingCode createManyAndReturn
   */
  export type TerminalPairingCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * The data used to create many TerminalPairingCodes.
     */
    data: TerminalPairingCodeCreateManyInput | TerminalPairingCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TerminalPairingCode update
   */
  export type TerminalPairingCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a TerminalPairingCode.
     */
    data: XOR<TerminalPairingCodeUpdateInput, TerminalPairingCodeUncheckedUpdateInput>
    /**
     * Choose, which TerminalPairingCode to update.
     */
    where: TerminalPairingCodeWhereUniqueInput
  }

  /**
   * TerminalPairingCode updateMany
   */
  export type TerminalPairingCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TerminalPairingCodes.
     */
    data: XOR<TerminalPairingCodeUpdateManyMutationInput, TerminalPairingCodeUncheckedUpdateManyInput>
    /**
     * Filter which TerminalPairingCodes to update
     */
    where?: TerminalPairingCodeWhereInput
    /**
     * Limit how many TerminalPairingCodes to update.
     */
    limit?: number
  }

  /**
   * TerminalPairingCode updateManyAndReturn
   */
  export type TerminalPairingCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * The data used to update TerminalPairingCodes.
     */
    data: XOR<TerminalPairingCodeUpdateManyMutationInput, TerminalPairingCodeUncheckedUpdateManyInput>
    /**
     * Filter which TerminalPairingCodes to update
     */
    where?: TerminalPairingCodeWhereInput
    /**
     * Limit how many TerminalPairingCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TerminalPairingCode upsert
   */
  export type TerminalPairingCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the TerminalPairingCode to update in case it exists.
     */
    where: TerminalPairingCodeWhereUniqueInput
    /**
     * In case the TerminalPairingCode found by the `where` argument doesn't exist, create a new TerminalPairingCode with this data.
     */
    create: XOR<TerminalPairingCodeCreateInput, TerminalPairingCodeUncheckedCreateInput>
    /**
     * In case the TerminalPairingCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TerminalPairingCodeUpdateInput, TerminalPairingCodeUncheckedUpdateInput>
  }

  /**
   * TerminalPairingCode delete
   */
  export type TerminalPairingCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
    /**
     * Filter which TerminalPairingCode to delete.
     */
    where: TerminalPairingCodeWhereUniqueInput
  }

  /**
   * TerminalPairingCode deleteMany
   */
  export type TerminalPairingCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TerminalPairingCodes to delete
     */
    where?: TerminalPairingCodeWhereInput
    /**
     * Limit how many TerminalPairingCodes to delete.
     */
    limit?: number
  }

  /**
   * TerminalPairingCode without action
   */
  export type TerminalPairingCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TerminalPairingCode
     */
    select?: TerminalPairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TerminalPairingCode
     */
    omit?: TerminalPairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TerminalPairingCodeInclude<ExtArgs> | null
  }


  /**
   * Model PosSession
   */

  export type AggregatePosSession = {
    _count: PosSessionCountAggregateOutputType | null
    _avg: PosSessionAvgAggregateOutputType | null
    _sum: PosSessionSumAggregateOutputType | null
    _min: PosSessionMinAggregateOutputType | null
    _max: PosSessionMaxAggregateOutputType | null
  }

  export type PosSessionAvgAggregateOutputType = {
    openingCash: number | null
    closingCash: number | null
    expectedTotal: number | null
    actualTotal: number | null
    variance: number | null
  }

  export type PosSessionSumAggregateOutputType = {
    openingCash: number | null
    closingCash: number | null
    expectedTotal: number | null
    actualTotal: number | null
    variance: number | null
  }

  export type PosSessionMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    terminalId: string | null
    operatorId: string | null
    status: $Enums.PosSessionStatus | null
    openingCash: number | null
    closingCash: number | null
    expectedTotal: number | null
    actualTotal: number | null
    variance: number | null
    openedAt: Date | null
    closedAt: Date | null
    reconciledAt: Date | null
  }

  export type PosSessionMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    terminalId: string | null
    operatorId: string | null
    status: $Enums.PosSessionStatus | null
    openingCash: number | null
    closingCash: number | null
    expectedTotal: number | null
    actualTotal: number | null
    variance: number | null
    openedAt: Date | null
    closedAt: Date | null
    reconciledAt: Date | null
  }

  export type PosSessionCountAggregateOutputType = {
    id: number
    tenantId: number
    terminalId: number
    operatorId: number
    status: number
    openingCash: number
    closingCash: number
    expectedTotal: number
    actualTotal: number
    variance: number
    openedAt: number
    closedAt: number
    reconciledAt: number
    _all: number
  }


  export type PosSessionAvgAggregateInputType = {
    openingCash?: true
    closingCash?: true
    expectedTotal?: true
    actualTotal?: true
    variance?: true
  }

  export type PosSessionSumAggregateInputType = {
    openingCash?: true
    closingCash?: true
    expectedTotal?: true
    actualTotal?: true
    variance?: true
  }

  export type PosSessionMinAggregateInputType = {
    id?: true
    tenantId?: true
    terminalId?: true
    operatorId?: true
    status?: true
    openingCash?: true
    closingCash?: true
    expectedTotal?: true
    actualTotal?: true
    variance?: true
    openedAt?: true
    closedAt?: true
    reconciledAt?: true
  }

  export type PosSessionMaxAggregateInputType = {
    id?: true
    tenantId?: true
    terminalId?: true
    operatorId?: true
    status?: true
    openingCash?: true
    closingCash?: true
    expectedTotal?: true
    actualTotal?: true
    variance?: true
    openedAt?: true
    closedAt?: true
    reconciledAt?: true
  }

  export type PosSessionCountAggregateInputType = {
    id?: true
    tenantId?: true
    terminalId?: true
    operatorId?: true
    status?: true
    openingCash?: true
    closingCash?: true
    expectedTotal?: true
    actualTotal?: true
    variance?: true
    openedAt?: true
    closedAt?: true
    reconciledAt?: true
    _all?: true
  }

  export type PosSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PosSession to aggregate.
     */
    where?: PosSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosSessions to fetch.
     */
    orderBy?: PosSessionOrderByWithRelationInput | PosSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PosSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PosSessions
    **/
    _count?: true | PosSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PosSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PosSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PosSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PosSessionMaxAggregateInputType
  }

  export type GetPosSessionAggregateType<T extends PosSessionAggregateArgs> = {
        [P in keyof T & keyof AggregatePosSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosSession[P]>
      : GetScalarType<T[P], AggregatePosSession[P]>
  }




  export type PosSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PosSessionWhereInput
    orderBy?: PosSessionOrderByWithAggregationInput | PosSessionOrderByWithAggregationInput[]
    by: PosSessionScalarFieldEnum[] | PosSessionScalarFieldEnum
    having?: PosSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PosSessionCountAggregateInputType | true
    _avg?: PosSessionAvgAggregateInputType
    _sum?: PosSessionSumAggregateInputType
    _min?: PosSessionMinAggregateInputType
    _max?: PosSessionMaxAggregateInputType
  }

  export type PosSessionGroupByOutputType = {
    id: string
    tenantId: string
    terminalId: string
    operatorId: string
    status: $Enums.PosSessionStatus
    openingCash: number
    closingCash: number | null
    expectedTotal: number | null
    actualTotal: number | null
    variance: number | null
    openedAt: Date
    closedAt: Date | null
    reconciledAt: Date | null
    _count: PosSessionCountAggregateOutputType | null
    _avg: PosSessionAvgAggregateOutputType | null
    _sum: PosSessionSumAggregateOutputType | null
    _min: PosSessionMinAggregateOutputType | null
    _max: PosSessionMaxAggregateOutputType | null
  }

  type GetPosSessionGroupByPayload<T extends PosSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PosSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PosSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PosSessionGroupByOutputType[P]>
            : GetScalarType<T[P], PosSessionGroupByOutputType[P]>
        }
      >
    >


  export type PosSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    terminalId?: boolean
    operatorId?: boolean
    status?: boolean
    openingCash?: boolean
    closingCash?: boolean
    expectedTotal?: boolean
    actualTotal?: boolean
    variance?: boolean
    openedAt?: boolean
    closedAt?: boolean
    reconciledAt?: boolean
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
    items?: boolean | PosSession$itemsArgs<ExtArgs>
    payments?: boolean | PosSession$paymentsArgs<ExtArgs>
    _count?: boolean | PosSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posSession"]>

  export type PosSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    terminalId?: boolean
    operatorId?: boolean
    status?: boolean
    openingCash?: boolean
    closingCash?: boolean
    expectedTotal?: boolean
    actualTotal?: boolean
    variance?: boolean
    openedAt?: boolean
    closedAt?: boolean
    reconciledAt?: boolean
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posSession"]>

  export type PosSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    terminalId?: boolean
    operatorId?: boolean
    status?: boolean
    openingCash?: boolean
    closingCash?: boolean
    expectedTotal?: boolean
    actualTotal?: boolean
    variance?: boolean
    openedAt?: boolean
    closedAt?: boolean
    reconciledAt?: boolean
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posSession"]>

  export type PosSessionSelectScalar = {
    id?: boolean
    tenantId?: boolean
    terminalId?: boolean
    operatorId?: boolean
    status?: boolean
    openingCash?: boolean
    closingCash?: boolean
    expectedTotal?: boolean
    actualTotal?: boolean
    variance?: boolean
    openedAt?: boolean
    closedAt?: boolean
    reconciledAt?: boolean
  }

  export type PosSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "terminalId" | "operatorId" | "status" | "openingCash" | "closingCash" | "expectedTotal" | "actualTotal" | "variance" | "openedAt" | "closedAt" | "reconciledAt", ExtArgs["result"]["posSession"]>
  export type PosSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
    items?: boolean | PosSession$itemsArgs<ExtArgs>
    payments?: boolean | PosSession$paymentsArgs<ExtArgs>
    _count?: boolean | PosSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PosSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }
  export type PosSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    terminal?: boolean | TerminalDefaultArgs<ExtArgs>
  }

  export type $PosSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PosSession"
    objects: {
      terminal: Prisma.$TerminalPayload<ExtArgs>
      items: Prisma.$PosSessionItemPayload<ExtArgs>[]
      payments: Prisma.$PosPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      terminalId: string
      operatorId: string
      status: $Enums.PosSessionStatus
      openingCash: number
      closingCash: number | null
      expectedTotal: number | null
      actualTotal: number | null
      variance: number | null
      openedAt: Date
      closedAt: Date | null
      reconciledAt: Date | null
    }, ExtArgs["result"]["posSession"]>
    composites: {}
  }

  type PosSessionGetPayload<S extends boolean | null | undefined | PosSessionDefaultArgs> = $Result.GetResult<Prisma.$PosSessionPayload, S>

  type PosSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PosSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PosSessionCountAggregateInputType | true
    }

  export interface PosSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PosSession'], meta: { name: 'PosSession' } }
    /**
     * Find zero or one PosSession that matches the filter.
     * @param {PosSessionFindUniqueArgs} args - Arguments to find a PosSession
     * @example
     * // Get one PosSession
     * const posSession = await prisma.posSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PosSessionFindUniqueArgs>(args: SelectSubset<T, PosSessionFindUniqueArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PosSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PosSessionFindUniqueOrThrowArgs} args - Arguments to find a PosSession
     * @example
     * // Get one PosSession
     * const posSession = await prisma.posSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PosSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, PosSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PosSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionFindFirstArgs} args - Arguments to find a PosSession
     * @example
     * // Get one PosSession
     * const posSession = await prisma.posSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PosSessionFindFirstArgs>(args?: SelectSubset<T, PosSessionFindFirstArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PosSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionFindFirstOrThrowArgs} args - Arguments to find a PosSession
     * @example
     * // Get one PosSession
     * const posSession = await prisma.posSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PosSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, PosSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PosSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PosSessions
     * const posSessions = await prisma.posSession.findMany()
     * 
     * // Get first 10 PosSessions
     * const posSessions = await prisma.posSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const posSessionWithIdOnly = await prisma.posSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PosSessionFindManyArgs>(args?: SelectSubset<T, PosSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PosSession.
     * @param {PosSessionCreateArgs} args - Arguments to create a PosSession.
     * @example
     * // Create one PosSession
     * const PosSession = await prisma.posSession.create({
     *   data: {
     *     // ... data to create a PosSession
     *   }
     * })
     * 
     */
    create<T extends PosSessionCreateArgs>(args: SelectSubset<T, PosSessionCreateArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PosSessions.
     * @param {PosSessionCreateManyArgs} args - Arguments to create many PosSessions.
     * @example
     * // Create many PosSessions
     * const posSession = await prisma.posSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PosSessionCreateManyArgs>(args?: SelectSubset<T, PosSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PosSessions and returns the data saved in the database.
     * @param {PosSessionCreateManyAndReturnArgs} args - Arguments to create many PosSessions.
     * @example
     * // Create many PosSessions
     * const posSession = await prisma.posSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PosSessions and only return the `id`
     * const posSessionWithIdOnly = await prisma.posSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PosSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, PosSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PosSession.
     * @param {PosSessionDeleteArgs} args - Arguments to delete one PosSession.
     * @example
     * // Delete one PosSession
     * const PosSession = await prisma.posSession.delete({
     *   where: {
     *     // ... filter to delete one PosSession
     *   }
     * })
     * 
     */
    delete<T extends PosSessionDeleteArgs>(args: SelectSubset<T, PosSessionDeleteArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PosSession.
     * @param {PosSessionUpdateArgs} args - Arguments to update one PosSession.
     * @example
     * // Update one PosSession
     * const posSession = await prisma.posSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PosSessionUpdateArgs>(args: SelectSubset<T, PosSessionUpdateArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PosSessions.
     * @param {PosSessionDeleteManyArgs} args - Arguments to filter PosSessions to delete.
     * @example
     * // Delete a few PosSessions
     * const { count } = await prisma.posSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PosSessionDeleteManyArgs>(args?: SelectSubset<T, PosSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PosSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PosSessions
     * const posSession = await prisma.posSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PosSessionUpdateManyArgs>(args: SelectSubset<T, PosSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PosSessions and returns the data updated in the database.
     * @param {PosSessionUpdateManyAndReturnArgs} args - Arguments to update many PosSessions.
     * @example
     * // Update many PosSessions
     * const posSession = await prisma.posSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PosSessions and only return the `id`
     * const posSessionWithIdOnly = await prisma.posSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends PosSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, PosSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PosSession.
     * @param {PosSessionUpsertArgs} args - Arguments to update or create a PosSession.
     * @example
     * // Update or create a PosSession
     * const posSession = await prisma.posSession.upsert({
     *   create: {
     *     // ... data to create a PosSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PosSession we want to update
     *   }
     * })
     */
    upsert<T extends PosSessionUpsertArgs>(args: SelectSubset<T, PosSessionUpsertArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PosSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionCountArgs} args - Arguments to filter PosSessions to count.
     * @example
     * // Count the number of PosSessions
     * const count = await prisma.posSession.count({
     *   where: {
     *     // ... the filter for the PosSessions we want to count
     *   }
     * })
    **/
    count<T extends PosSessionCountArgs>(
      args?: Subset<T, PosSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PosSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PosSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PosSessionAggregateArgs>(args: Subset<T, PosSessionAggregateArgs>): Prisma.PrismaPromise<GetPosSessionAggregateType<T>>

    /**
     * Group by PosSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionGroupByArgs} args - Group by arguments.
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
      T extends PosSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PosSessionGroupByArgs['orderBy'] }
        : { orderBy?: PosSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PosSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPosSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PosSession model
   */
  readonly fields: PosSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PosSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PosSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    terminal<T extends TerminalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TerminalDefaultArgs<ExtArgs>>): Prisma__TerminalClient<$Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends PosSession$itemsArgs<ExtArgs> = {}>(args?: Subset<T, PosSession$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends PosSession$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, PosSession$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PosSession model
   */
  interface PosSessionFieldRefs {
    readonly id: FieldRef<"PosSession", 'String'>
    readonly tenantId: FieldRef<"PosSession", 'String'>
    readonly terminalId: FieldRef<"PosSession", 'String'>
    readonly operatorId: FieldRef<"PosSession", 'String'>
    readonly status: FieldRef<"PosSession", 'PosSessionStatus'>
    readonly openingCash: FieldRef<"PosSession", 'Int'>
    readonly closingCash: FieldRef<"PosSession", 'Int'>
    readonly expectedTotal: FieldRef<"PosSession", 'Int'>
    readonly actualTotal: FieldRef<"PosSession", 'Int'>
    readonly variance: FieldRef<"PosSession", 'Int'>
    readonly openedAt: FieldRef<"PosSession", 'DateTime'>
    readonly closedAt: FieldRef<"PosSession", 'DateTime'>
    readonly reconciledAt: FieldRef<"PosSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PosSession findUnique
   */
  export type PosSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * Filter, which PosSession to fetch.
     */
    where: PosSessionWhereUniqueInput
  }

  /**
   * PosSession findUniqueOrThrow
   */
  export type PosSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * Filter, which PosSession to fetch.
     */
    where: PosSessionWhereUniqueInput
  }

  /**
   * PosSession findFirst
   */
  export type PosSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * Filter, which PosSession to fetch.
     */
    where?: PosSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosSessions to fetch.
     */
    orderBy?: PosSessionOrderByWithRelationInput | PosSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PosSessions.
     */
    cursor?: PosSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PosSessions.
     */
    distinct?: PosSessionScalarFieldEnum | PosSessionScalarFieldEnum[]
  }

  /**
   * PosSession findFirstOrThrow
   */
  export type PosSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * Filter, which PosSession to fetch.
     */
    where?: PosSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosSessions to fetch.
     */
    orderBy?: PosSessionOrderByWithRelationInput | PosSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PosSessions.
     */
    cursor?: PosSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PosSessions.
     */
    distinct?: PosSessionScalarFieldEnum | PosSessionScalarFieldEnum[]
  }

  /**
   * PosSession findMany
   */
  export type PosSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * Filter, which PosSessions to fetch.
     */
    where?: PosSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosSessions to fetch.
     */
    orderBy?: PosSessionOrderByWithRelationInput | PosSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PosSessions.
     */
    cursor?: PosSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosSessions.
     */
    skip?: number
    distinct?: PosSessionScalarFieldEnum | PosSessionScalarFieldEnum[]
  }

  /**
   * PosSession create
   */
  export type PosSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a PosSession.
     */
    data: XOR<PosSessionCreateInput, PosSessionUncheckedCreateInput>
  }

  /**
   * PosSession createMany
   */
  export type PosSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PosSessions.
     */
    data: PosSessionCreateManyInput | PosSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PosSession createManyAndReturn
   */
  export type PosSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * The data used to create many PosSessions.
     */
    data: PosSessionCreateManyInput | PosSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PosSession update
   */
  export type PosSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a PosSession.
     */
    data: XOR<PosSessionUpdateInput, PosSessionUncheckedUpdateInput>
    /**
     * Choose, which PosSession to update.
     */
    where: PosSessionWhereUniqueInput
  }

  /**
   * PosSession updateMany
   */
  export type PosSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PosSessions.
     */
    data: XOR<PosSessionUpdateManyMutationInput, PosSessionUncheckedUpdateManyInput>
    /**
     * Filter which PosSessions to update
     */
    where?: PosSessionWhereInput
    /**
     * Limit how many PosSessions to update.
     */
    limit?: number
  }

  /**
   * PosSession updateManyAndReturn
   */
  export type PosSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * The data used to update PosSessions.
     */
    data: XOR<PosSessionUpdateManyMutationInput, PosSessionUncheckedUpdateManyInput>
    /**
     * Filter which PosSessions to update
     */
    where?: PosSessionWhereInput
    /**
     * Limit how many PosSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PosSession upsert
   */
  export type PosSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the PosSession to update in case it exists.
     */
    where: PosSessionWhereUniqueInput
    /**
     * In case the PosSession found by the `where` argument doesn't exist, create a new PosSession with this data.
     */
    create: XOR<PosSessionCreateInput, PosSessionUncheckedCreateInput>
    /**
     * In case the PosSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PosSessionUpdateInput, PosSessionUncheckedUpdateInput>
  }

  /**
   * PosSession delete
   */
  export type PosSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
    /**
     * Filter which PosSession to delete.
     */
    where: PosSessionWhereUniqueInput
  }

  /**
   * PosSession deleteMany
   */
  export type PosSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PosSessions to delete
     */
    where?: PosSessionWhereInput
    /**
     * Limit how many PosSessions to delete.
     */
    limit?: number
  }

  /**
   * PosSession.items
   */
  export type PosSession$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    where?: PosSessionItemWhereInput
    orderBy?: PosSessionItemOrderByWithRelationInput | PosSessionItemOrderByWithRelationInput[]
    cursor?: PosSessionItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PosSessionItemScalarFieldEnum | PosSessionItemScalarFieldEnum[]
  }

  /**
   * PosSession.payments
   */
  export type PosSession$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    where?: PosPaymentWhereInput
    orderBy?: PosPaymentOrderByWithRelationInput | PosPaymentOrderByWithRelationInput[]
    cursor?: PosPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PosPaymentScalarFieldEnum | PosPaymentScalarFieldEnum[]
  }

  /**
   * PosSession without action
   */
  export type PosSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSession
     */
    select?: PosSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSession
     */
    omit?: PosSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionInclude<ExtArgs> | null
  }


  /**
   * Model PosSessionItem
   */

  export type AggregatePosSessionItem = {
    _count: PosSessionItemCountAggregateOutputType | null
    _avg: PosSessionItemAvgAggregateOutputType | null
    _sum: PosSessionItemSumAggregateOutputType | null
    _min: PosSessionItemMinAggregateOutputType | null
    _max: PosSessionItemMaxAggregateOutputType | null
  }

  export type PosSessionItemAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
  }

  export type PosSessionItemSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
  }

  export type PosSessionItemMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    description: string | null
    quantity: number | null
    unitPrice: number | null
    createdAt: Date | null
  }

  export type PosSessionItemMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    description: string | null
    quantity: number | null
    unitPrice: number | null
    createdAt: Date | null
  }

  export type PosSessionItemCountAggregateOutputType = {
    id: number
    sessionId: number
    description: number
    quantity: number
    unitPrice: number
    createdAt: number
    _all: number
  }


  export type PosSessionItemAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type PosSessionItemSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
  }

  export type PosSessionItemMinAggregateInputType = {
    id?: true
    sessionId?: true
    description?: true
    quantity?: true
    unitPrice?: true
    createdAt?: true
  }

  export type PosSessionItemMaxAggregateInputType = {
    id?: true
    sessionId?: true
    description?: true
    quantity?: true
    unitPrice?: true
    createdAt?: true
  }

  export type PosSessionItemCountAggregateInputType = {
    id?: true
    sessionId?: true
    description?: true
    quantity?: true
    unitPrice?: true
    createdAt?: true
    _all?: true
  }

  export type PosSessionItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PosSessionItem to aggregate.
     */
    where?: PosSessionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosSessionItems to fetch.
     */
    orderBy?: PosSessionItemOrderByWithRelationInput | PosSessionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PosSessionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosSessionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosSessionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PosSessionItems
    **/
    _count?: true | PosSessionItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PosSessionItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PosSessionItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PosSessionItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PosSessionItemMaxAggregateInputType
  }

  export type GetPosSessionItemAggregateType<T extends PosSessionItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePosSessionItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosSessionItem[P]>
      : GetScalarType<T[P], AggregatePosSessionItem[P]>
  }




  export type PosSessionItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PosSessionItemWhereInput
    orderBy?: PosSessionItemOrderByWithAggregationInput | PosSessionItemOrderByWithAggregationInput[]
    by: PosSessionItemScalarFieldEnum[] | PosSessionItemScalarFieldEnum
    having?: PosSessionItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PosSessionItemCountAggregateInputType | true
    _avg?: PosSessionItemAvgAggregateInputType
    _sum?: PosSessionItemSumAggregateInputType
    _min?: PosSessionItemMinAggregateInputType
    _max?: PosSessionItemMaxAggregateInputType
  }

  export type PosSessionItemGroupByOutputType = {
    id: string
    sessionId: string
    description: string
    quantity: number
    unitPrice: number
    createdAt: Date
    _count: PosSessionItemCountAggregateOutputType | null
    _avg: PosSessionItemAvgAggregateOutputType | null
    _sum: PosSessionItemSumAggregateOutputType | null
    _min: PosSessionItemMinAggregateOutputType | null
    _max: PosSessionItemMaxAggregateOutputType | null
  }

  type GetPosSessionItemGroupByPayload<T extends PosSessionItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PosSessionItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PosSessionItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PosSessionItemGroupByOutputType[P]>
            : GetScalarType<T[P], PosSessionItemGroupByOutputType[P]>
        }
      >
    >


  export type PosSessionItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    createdAt?: boolean
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posSessionItem"]>

  export type PosSessionItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    createdAt?: boolean
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posSessionItem"]>

  export type PosSessionItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    createdAt?: boolean
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posSessionItem"]>

  export type PosSessionItemSelectScalar = {
    id?: boolean
    sessionId?: boolean
    description?: boolean
    quantity?: boolean
    unitPrice?: boolean
    createdAt?: boolean
  }

  export type PosSessionItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "description" | "quantity" | "unitPrice" | "createdAt", ExtArgs["result"]["posSessionItem"]>
  export type PosSessionItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }
  export type PosSessionItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }
  export type PosSessionItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }

  export type $PosSessionItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PosSessionItem"
    objects: {
      session: Prisma.$PosSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      description: string
      quantity: number
      unitPrice: number
      createdAt: Date
    }, ExtArgs["result"]["posSessionItem"]>
    composites: {}
  }

  type PosSessionItemGetPayload<S extends boolean | null | undefined | PosSessionItemDefaultArgs> = $Result.GetResult<Prisma.$PosSessionItemPayload, S>

  type PosSessionItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PosSessionItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PosSessionItemCountAggregateInputType | true
    }

  export interface PosSessionItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PosSessionItem'], meta: { name: 'PosSessionItem' } }
    /**
     * Find zero or one PosSessionItem that matches the filter.
     * @param {PosSessionItemFindUniqueArgs} args - Arguments to find a PosSessionItem
     * @example
     * // Get one PosSessionItem
     * const posSessionItem = await prisma.posSessionItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PosSessionItemFindUniqueArgs>(args: SelectSubset<T, PosSessionItemFindUniqueArgs<ExtArgs>>): Prisma__PosSessionItemClient<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PosSessionItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PosSessionItemFindUniqueOrThrowArgs} args - Arguments to find a PosSessionItem
     * @example
     * // Get one PosSessionItem
     * const posSessionItem = await prisma.posSessionItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PosSessionItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PosSessionItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PosSessionItemClient<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PosSessionItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionItemFindFirstArgs} args - Arguments to find a PosSessionItem
     * @example
     * // Get one PosSessionItem
     * const posSessionItem = await prisma.posSessionItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PosSessionItemFindFirstArgs>(args?: SelectSubset<T, PosSessionItemFindFirstArgs<ExtArgs>>): Prisma__PosSessionItemClient<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PosSessionItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionItemFindFirstOrThrowArgs} args - Arguments to find a PosSessionItem
     * @example
     * // Get one PosSessionItem
     * const posSessionItem = await prisma.posSessionItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PosSessionItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PosSessionItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PosSessionItemClient<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PosSessionItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PosSessionItems
     * const posSessionItems = await prisma.posSessionItem.findMany()
     * 
     * // Get first 10 PosSessionItems
     * const posSessionItems = await prisma.posSessionItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const posSessionItemWithIdOnly = await prisma.posSessionItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PosSessionItemFindManyArgs>(args?: SelectSubset<T, PosSessionItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PosSessionItem.
     * @param {PosSessionItemCreateArgs} args - Arguments to create a PosSessionItem.
     * @example
     * // Create one PosSessionItem
     * const PosSessionItem = await prisma.posSessionItem.create({
     *   data: {
     *     // ... data to create a PosSessionItem
     *   }
     * })
     * 
     */
    create<T extends PosSessionItemCreateArgs>(args: SelectSubset<T, PosSessionItemCreateArgs<ExtArgs>>): Prisma__PosSessionItemClient<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PosSessionItems.
     * @param {PosSessionItemCreateManyArgs} args - Arguments to create many PosSessionItems.
     * @example
     * // Create many PosSessionItems
     * const posSessionItem = await prisma.posSessionItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PosSessionItemCreateManyArgs>(args?: SelectSubset<T, PosSessionItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PosSessionItems and returns the data saved in the database.
     * @param {PosSessionItemCreateManyAndReturnArgs} args - Arguments to create many PosSessionItems.
     * @example
     * // Create many PosSessionItems
     * const posSessionItem = await prisma.posSessionItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PosSessionItems and only return the `id`
     * const posSessionItemWithIdOnly = await prisma.posSessionItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PosSessionItemCreateManyAndReturnArgs>(args?: SelectSubset<T, PosSessionItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PosSessionItem.
     * @param {PosSessionItemDeleteArgs} args - Arguments to delete one PosSessionItem.
     * @example
     * // Delete one PosSessionItem
     * const PosSessionItem = await prisma.posSessionItem.delete({
     *   where: {
     *     // ... filter to delete one PosSessionItem
     *   }
     * })
     * 
     */
    delete<T extends PosSessionItemDeleteArgs>(args: SelectSubset<T, PosSessionItemDeleteArgs<ExtArgs>>): Prisma__PosSessionItemClient<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PosSessionItem.
     * @param {PosSessionItemUpdateArgs} args - Arguments to update one PosSessionItem.
     * @example
     * // Update one PosSessionItem
     * const posSessionItem = await prisma.posSessionItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PosSessionItemUpdateArgs>(args: SelectSubset<T, PosSessionItemUpdateArgs<ExtArgs>>): Prisma__PosSessionItemClient<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PosSessionItems.
     * @param {PosSessionItemDeleteManyArgs} args - Arguments to filter PosSessionItems to delete.
     * @example
     * // Delete a few PosSessionItems
     * const { count } = await prisma.posSessionItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PosSessionItemDeleteManyArgs>(args?: SelectSubset<T, PosSessionItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PosSessionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PosSessionItems
     * const posSessionItem = await prisma.posSessionItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PosSessionItemUpdateManyArgs>(args: SelectSubset<T, PosSessionItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PosSessionItems and returns the data updated in the database.
     * @param {PosSessionItemUpdateManyAndReturnArgs} args - Arguments to update many PosSessionItems.
     * @example
     * // Update many PosSessionItems
     * const posSessionItem = await prisma.posSessionItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PosSessionItems and only return the `id`
     * const posSessionItemWithIdOnly = await prisma.posSessionItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends PosSessionItemUpdateManyAndReturnArgs>(args: SelectSubset<T, PosSessionItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PosSessionItem.
     * @param {PosSessionItemUpsertArgs} args - Arguments to update or create a PosSessionItem.
     * @example
     * // Update or create a PosSessionItem
     * const posSessionItem = await prisma.posSessionItem.upsert({
     *   create: {
     *     // ... data to create a PosSessionItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PosSessionItem we want to update
     *   }
     * })
     */
    upsert<T extends PosSessionItemUpsertArgs>(args: SelectSubset<T, PosSessionItemUpsertArgs<ExtArgs>>): Prisma__PosSessionItemClient<$Result.GetResult<Prisma.$PosSessionItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PosSessionItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionItemCountArgs} args - Arguments to filter PosSessionItems to count.
     * @example
     * // Count the number of PosSessionItems
     * const count = await prisma.posSessionItem.count({
     *   where: {
     *     // ... the filter for the PosSessionItems we want to count
     *   }
     * })
    **/
    count<T extends PosSessionItemCountArgs>(
      args?: Subset<T, PosSessionItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PosSessionItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PosSessionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PosSessionItemAggregateArgs>(args: Subset<T, PosSessionItemAggregateArgs>): Prisma.PrismaPromise<GetPosSessionItemAggregateType<T>>

    /**
     * Group by PosSessionItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosSessionItemGroupByArgs} args - Group by arguments.
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
      T extends PosSessionItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PosSessionItemGroupByArgs['orderBy'] }
        : { orderBy?: PosSessionItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PosSessionItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPosSessionItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PosSessionItem model
   */
  readonly fields: PosSessionItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PosSessionItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PosSessionItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends PosSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PosSessionDefaultArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PosSessionItem model
   */
  interface PosSessionItemFieldRefs {
    readonly id: FieldRef<"PosSessionItem", 'String'>
    readonly sessionId: FieldRef<"PosSessionItem", 'String'>
    readonly description: FieldRef<"PosSessionItem", 'String'>
    readonly quantity: FieldRef<"PosSessionItem", 'Int'>
    readonly unitPrice: FieldRef<"PosSessionItem", 'Int'>
    readonly createdAt: FieldRef<"PosSessionItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PosSessionItem findUnique
   */
  export type PosSessionItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * Filter, which PosSessionItem to fetch.
     */
    where: PosSessionItemWhereUniqueInput
  }

  /**
   * PosSessionItem findUniqueOrThrow
   */
  export type PosSessionItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * Filter, which PosSessionItem to fetch.
     */
    where: PosSessionItemWhereUniqueInput
  }

  /**
   * PosSessionItem findFirst
   */
  export type PosSessionItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * Filter, which PosSessionItem to fetch.
     */
    where?: PosSessionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosSessionItems to fetch.
     */
    orderBy?: PosSessionItemOrderByWithRelationInput | PosSessionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PosSessionItems.
     */
    cursor?: PosSessionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosSessionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosSessionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PosSessionItems.
     */
    distinct?: PosSessionItemScalarFieldEnum | PosSessionItemScalarFieldEnum[]
  }

  /**
   * PosSessionItem findFirstOrThrow
   */
  export type PosSessionItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * Filter, which PosSessionItem to fetch.
     */
    where?: PosSessionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosSessionItems to fetch.
     */
    orderBy?: PosSessionItemOrderByWithRelationInput | PosSessionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PosSessionItems.
     */
    cursor?: PosSessionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosSessionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosSessionItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PosSessionItems.
     */
    distinct?: PosSessionItemScalarFieldEnum | PosSessionItemScalarFieldEnum[]
  }

  /**
   * PosSessionItem findMany
   */
  export type PosSessionItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * Filter, which PosSessionItems to fetch.
     */
    where?: PosSessionItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosSessionItems to fetch.
     */
    orderBy?: PosSessionItemOrderByWithRelationInput | PosSessionItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PosSessionItems.
     */
    cursor?: PosSessionItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosSessionItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosSessionItems.
     */
    skip?: number
    distinct?: PosSessionItemScalarFieldEnum | PosSessionItemScalarFieldEnum[]
  }

  /**
   * PosSessionItem create
   */
  export type PosSessionItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PosSessionItem.
     */
    data: XOR<PosSessionItemCreateInput, PosSessionItemUncheckedCreateInput>
  }

  /**
   * PosSessionItem createMany
   */
  export type PosSessionItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PosSessionItems.
     */
    data: PosSessionItemCreateManyInput | PosSessionItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PosSessionItem createManyAndReturn
   */
  export type PosSessionItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * The data used to create many PosSessionItems.
     */
    data: PosSessionItemCreateManyInput | PosSessionItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PosSessionItem update
   */
  export type PosSessionItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PosSessionItem.
     */
    data: XOR<PosSessionItemUpdateInput, PosSessionItemUncheckedUpdateInput>
    /**
     * Choose, which PosSessionItem to update.
     */
    where: PosSessionItemWhereUniqueInput
  }

  /**
   * PosSessionItem updateMany
   */
  export type PosSessionItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PosSessionItems.
     */
    data: XOR<PosSessionItemUpdateManyMutationInput, PosSessionItemUncheckedUpdateManyInput>
    /**
     * Filter which PosSessionItems to update
     */
    where?: PosSessionItemWhereInput
    /**
     * Limit how many PosSessionItems to update.
     */
    limit?: number
  }

  /**
   * PosSessionItem updateManyAndReturn
   */
  export type PosSessionItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * The data used to update PosSessionItems.
     */
    data: XOR<PosSessionItemUpdateManyMutationInput, PosSessionItemUncheckedUpdateManyInput>
    /**
     * Filter which PosSessionItems to update
     */
    where?: PosSessionItemWhereInput
    /**
     * Limit how many PosSessionItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PosSessionItem upsert
   */
  export type PosSessionItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PosSessionItem to update in case it exists.
     */
    where: PosSessionItemWhereUniqueInput
    /**
     * In case the PosSessionItem found by the `where` argument doesn't exist, create a new PosSessionItem with this data.
     */
    create: XOR<PosSessionItemCreateInput, PosSessionItemUncheckedCreateInput>
    /**
     * In case the PosSessionItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PosSessionItemUpdateInput, PosSessionItemUncheckedUpdateInput>
  }

  /**
   * PosSessionItem delete
   */
  export type PosSessionItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
    /**
     * Filter which PosSessionItem to delete.
     */
    where: PosSessionItemWhereUniqueInput
  }

  /**
   * PosSessionItem deleteMany
   */
  export type PosSessionItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PosSessionItems to delete
     */
    where?: PosSessionItemWhereInput
    /**
     * Limit how many PosSessionItems to delete.
     */
    limit?: number
  }

  /**
   * PosSessionItem without action
   */
  export type PosSessionItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosSessionItem
     */
    select?: PosSessionItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosSessionItem
     */
    omit?: PosSessionItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosSessionItemInclude<ExtArgs> | null
  }


  /**
   * Model PosPayment
   */

  export type AggregatePosPayment = {
    _count: PosPaymentCountAggregateOutputType | null
    _avg: PosPaymentAvgAggregateOutputType | null
    _sum: PosPaymentSumAggregateOutputType | null
    _min: PosPaymentMinAggregateOutputType | null
    _max: PosPaymentMaxAggregateOutputType | null
  }

  export type PosPaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PosPaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PosPaymentMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    amount: number | null
    currency: string | null
    status: $Enums.PosPaymentStatus | null
    stripeIntentId: string | null
    paymentIntentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PosPaymentMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    amount: number | null
    currency: string | null
    status: $Enums.PosPaymentStatus | null
    stripeIntentId: string | null
    paymentIntentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PosPaymentCountAggregateOutputType = {
    id: number
    sessionId: number
    amount: number
    currency: number
    status: number
    stripeIntentId: number
    paymentIntentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PosPaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PosPaymentSumAggregateInputType = {
    amount?: true
  }

  export type PosPaymentMinAggregateInputType = {
    id?: true
    sessionId?: true
    amount?: true
    currency?: true
    status?: true
    stripeIntentId?: true
    paymentIntentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PosPaymentMaxAggregateInputType = {
    id?: true
    sessionId?: true
    amount?: true
    currency?: true
    status?: true
    stripeIntentId?: true
    paymentIntentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PosPaymentCountAggregateInputType = {
    id?: true
    sessionId?: true
    amount?: true
    currency?: true
    status?: true
    stripeIntentId?: true
    paymentIntentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PosPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PosPayment to aggregate.
     */
    where?: PosPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosPayments to fetch.
     */
    orderBy?: PosPaymentOrderByWithRelationInput | PosPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PosPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PosPayments
    **/
    _count?: true | PosPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PosPaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PosPaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PosPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PosPaymentMaxAggregateInputType
  }

  export type GetPosPaymentAggregateType<T extends PosPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePosPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePosPayment[P]>
      : GetScalarType<T[P], AggregatePosPayment[P]>
  }




  export type PosPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PosPaymentWhereInput
    orderBy?: PosPaymentOrderByWithAggregationInput | PosPaymentOrderByWithAggregationInput[]
    by: PosPaymentScalarFieldEnum[] | PosPaymentScalarFieldEnum
    having?: PosPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PosPaymentCountAggregateInputType | true
    _avg?: PosPaymentAvgAggregateInputType
    _sum?: PosPaymentSumAggregateInputType
    _min?: PosPaymentMinAggregateInputType
    _max?: PosPaymentMaxAggregateInputType
  }

  export type PosPaymentGroupByOutputType = {
    id: string
    sessionId: string
    amount: number
    currency: string
    status: $Enums.PosPaymentStatus
    stripeIntentId: string | null
    paymentIntentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PosPaymentCountAggregateOutputType | null
    _avg: PosPaymentAvgAggregateOutputType | null
    _sum: PosPaymentSumAggregateOutputType | null
    _min: PosPaymentMinAggregateOutputType | null
    _max: PosPaymentMaxAggregateOutputType | null
  }

  type GetPosPaymentGroupByPayload<T extends PosPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PosPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PosPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PosPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PosPaymentGroupByOutputType[P]>
        }
      >
    >


  export type PosPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    stripeIntentId?: boolean
    paymentIntentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posPayment"]>

  export type PosPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    stripeIntentId?: boolean
    paymentIntentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posPayment"]>

  export type PosPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    stripeIntentId?: boolean
    paymentIntentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["posPayment"]>

  export type PosPaymentSelectScalar = {
    id?: boolean
    sessionId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    stripeIntentId?: boolean
    paymentIntentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PosPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "amount" | "currency" | "status" | "stripeIntentId" | "paymentIntentId" | "createdAt" | "updatedAt", ExtArgs["result"]["posPayment"]>
  export type PosPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }
  export type PosPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }
  export type PosPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | PosSessionDefaultArgs<ExtArgs>
  }

  export type $PosPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PosPayment"
    objects: {
      session: Prisma.$PosSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      amount: number
      currency: string
      status: $Enums.PosPaymentStatus
      stripeIntentId: string | null
      paymentIntentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["posPayment"]>
    composites: {}
  }

  type PosPaymentGetPayload<S extends boolean | null | undefined | PosPaymentDefaultArgs> = $Result.GetResult<Prisma.$PosPaymentPayload, S>

  type PosPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PosPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PosPaymentCountAggregateInputType | true
    }

  export interface PosPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PosPayment'], meta: { name: 'PosPayment' } }
    /**
     * Find zero or one PosPayment that matches the filter.
     * @param {PosPaymentFindUniqueArgs} args - Arguments to find a PosPayment
     * @example
     * // Get one PosPayment
     * const posPayment = await prisma.posPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PosPaymentFindUniqueArgs>(args: SelectSubset<T, PosPaymentFindUniqueArgs<ExtArgs>>): Prisma__PosPaymentClient<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PosPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PosPaymentFindUniqueOrThrowArgs} args - Arguments to find a PosPayment
     * @example
     * // Get one PosPayment
     * const posPayment = await prisma.posPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PosPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PosPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PosPaymentClient<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PosPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosPaymentFindFirstArgs} args - Arguments to find a PosPayment
     * @example
     * // Get one PosPayment
     * const posPayment = await prisma.posPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PosPaymentFindFirstArgs>(args?: SelectSubset<T, PosPaymentFindFirstArgs<ExtArgs>>): Prisma__PosPaymentClient<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PosPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosPaymentFindFirstOrThrowArgs} args - Arguments to find a PosPayment
     * @example
     * // Get one PosPayment
     * const posPayment = await prisma.posPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PosPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PosPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PosPaymentClient<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PosPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PosPayments
     * const posPayments = await prisma.posPayment.findMany()
     * 
     * // Get first 10 PosPayments
     * const posPayments = await prisma.posPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const posPaymentWithIdOnly = await prisma.posPayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PosPaymentFindManyArgs>(args?: SelectSubset<T, PosPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PosPayment.
     * @param {PosPaymentCreateArgs} args - Arguments to create a PosPayment.
     * @example
     * // Create one PosPayment
     * const PosPayment = await prisma.posPayment.create({
     *   data: {
     *     // ... data to create a PosPayment
     *   }
     * })
     * 
     */
    create<T extends PosPaymentCreateArgs>(args: SelectSubset<T, PosPaymentCreateArgs<ExtArgs>>): Prisma__PosPaymentClient<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PosPayments.
     * @param {PosPaymentCreateManyArgs} args - Arguments to create many PosPayments.
     * @example
     * // Create many PosPayments
     * const posPayment = await prisma.posPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PosPaymentCreateManyArgs>(args?: SelectSubset<T, PosPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PosPayments and returns the data saved in the database.
     * @param {PosPaymentCreateManyAndReturnArgs} args - Arguments to create many PosPayments.
     * @example
     * // Create many PosPayments
     * const posPayment = await prisma.posPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PosPayments and only return the `id`
     * const posPaymentWithIdOnly = await prisma.posPayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PosPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PosPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PosPayment.
     * @param {PosPaymentDeleteArgs} args - Arguments to delete one PosPayment.
     * @example
     * // Delete one PosPayment
     * const PosPayment = await prisma.posPayment.delete({
     *   where: {
     *     // ... filter to delete one PosPayment
     *   }
     * })
     * 
     */
    delete<T extends PosPaymentDeleteArgs>(args: SelectSubset<T, PosPaymentDeleteArgs<ExtArgs>>): Prisma__PosPaymentClient<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PosPayment.
     * @param {PosPaymentUpdateArgs} args - Arguments to update one PosPayment.
     * @example
     * // Update one PosPayment
     * const posPayment = await prisma.posPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PosPaymentUpdateArgs>(args: SelectSubset<T, PosPaymentUpdateArgs<ExtArgs>>): Prisma__PosPaymentClient<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PosPayments.
     * @param {PosPaymentDeleteManyArgs} args - Arguments to filter PosPayments to delete.
     * @example
     * // Delete a few PosPayments
     * const { count } = await prisma.posPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PosPaymentDeleteManyArgs>(args?: SelectSubset<T, PosPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PosPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PosPayments
     * const posPayment = await prisma.posPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PosPaymentUpdateManyArgs>(args: SelectSubset<T, PosPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PosPayments and returns the data updated in the database.
     * @param {PosPaymentUpdateManyAndReturnArgs} args - Arguments to update many PosPayments.
     * @example
     * // Update many PosPayments
     * const posPayment = await prisma.posPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PosPayments and only return the `id`
     * const posPaymentWithIdOnly = await prisma.posPayment.updateManyAndReturn({
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
    updateManyAndReturn<T extends PosPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PosPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PosPayment.
     * @param {PosPaymentUpsertArgs} args - Arguments to update or create a PosPayment.
     * @example
     * // Update or create a PosPayment
     * const posPayment = await prisma.posPayment.upsert({
     *   create: {
     *     // ... data to create a PosPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PosPayment we want to update
     *   }
     * })
     */
    upsert<T extends PosPaymentUpsertArgs>(args: SelectSubset<T, PosPaymentUpsertArgs<ExtArgs>>): Prisma__PosPaymentClient<$Result.GetResult<Prisma.$PosPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PosPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosPaymentCountArgs} args - Arguments to filter PosPayments to count.
     * @example
     * // Count the number of PosPayments
     * const count = await prisma.posPayment.count({
     *   where: {
     *     // ... the filter for the PosPayments we want to count
     *   }
     * })
    **/
    count<T extends PosPaymentCountArgs>(
      args?: Subset<T, PosPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PosPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PosPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PosPaymentAggregateArgs>(args: Subset<T, PosPaymentAggregateArgs>): Prisma.PrismaPromise<GetPosPaymentAggregateType<T>>

    /**
     * Group by PosPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PosPaymentGroupByArgs} args - Group by arguments.
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
      T extends PosPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PosPaymentGroupByArgs['orderBy'] }
        : { orderBy?: PosPaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PosPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPosPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PosPayment model
   */
  readonly fields: PosPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PosPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PosPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends PosSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PosSessionDefaultArgs<ExtArgs>>): Prisma__PosSessionClient<$Result.GetResult<Prisma.$PosSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PosPayment model
   */
  interface PosPaymentFieldRefs {
    readonly id: FieldRef<"PosPayment", 'String'>
    readonly sessionId: FieldRef<"PosPayment", 'String'>
    readonly amount: FieldRef<"PosPayment", 'Int'>
    readonly currency: FieldRef<"PosPayment", 'String'>
    readonly status: FieldRef<"PosPayment", 'PosPaymentStatus'>
    readonly stripeIntentId: FieldRef<"PosPayment", 'String'>
    readonly paymentIntentId: FieldRef<"PosPayment", 'String'>
    readonly createdAt: FieldRef<"PosPayment", 'DateTime'>
    readonly updatedAt: FieldRef<"PosPayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PosPayment findUnique
   */
  export type PosPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PosPayment to fetch.
     */
    where: PosPaymentWhereUniqueInput
  }

  /**
   * PosPayment findUniqueOrThrow
   */
  export type PosPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PosPayment to fetch.
     */
    where: PosPaymentWhereUniqueInput
  }

  /**
   * PosPayment findFirst
   */
  export type PosPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PosPayment to fetch.
     */
    where?: PosPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosPayments to fetch.
     */
    orderBy?: PosPaymentOrderByWithRelationInput | PosPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PosPayments.
     */
    cursor?: PosPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PosPayments.
     */
    distinct?: PosPaymentScalarFieldEnum | PosPaymentScalarFieldEnum[]
  }

  /**
   * PosPayment findFirstOrThrow
   */
  export type PosPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PosPayment to fetch.
     */
    where?: PosPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosPayments to fetch.
     */
    orderBy?: PosPaymentOrderByWithRelationInput | PosPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PosPayments.
     */
    cursor?: PosPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PosPayments.
     */
    distinct?: PosPaymentScalarFieldEnum | PosPaymentScalarFieldEnum[]
  }

  /**
   * PosPayment findMany
   */
  export type PosPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * Filter, which PosPayments to fetch.
     */
    where?: PosPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PosPayments to fetch.
     */
    orderBy?: PosPaymentOrderByWithRelationInput | PosPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PosPayments.
     */
    cursor?: PosPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PosPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PosPayments.
     */
    skip?: number
    distinct?: PosPaymentScalarFieldEnum | PosPaymentScalarFieldEnum[]
  }

  /**
   * PosPayment create
   */
  export type PosPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a PosPayment.
     */
    data: XOR<PosPaymentCreateInput, PosPaymentUncheckedCreateInput>
  }

  /**
   * PosPayment createMany
   */
  export type PosPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PosPayments.
     */
    data: PosPaymentCreateManyInput | PosPaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PosPayment createManyAndReturn
   */
  export type PosPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many PosPayments.
     */
    data: PosPaymentCreateManyInput | PosPaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PosPayment update
   */
  export type PosPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a PosPayment.
     */
    data: XOR<PosPaymentUpdateInput, PosPaymentUncheckedUpdateInput>
    /**
     * Choose, which PosPayment to update.
     */
    where: PosPaymentWhereUniqueInput
  }

  /**
   * PosPayment updateMany
   */
  export type PosPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PosPayments.
     */
    data: XOR<PosPaymentUpdateManyMutationInput, PosPaymentUncheckedUpdateManyInput>
    /**
     * Filter which PosPayments to update
     */
    where?: PosPaymentWhereInput
    /**
     * Limit how many PosPayments to update.
     */
    limit?: number
  }

  /**
   * PosPayment updateManyAndReturn
   */
  export type PosPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * The data used to update PosPayments.
     */
    data: XOR<PosPaymentUpdateManyMutationInput, PosPaymentUncheckedUpdateManyInput>
    /**
     * Filter which PosPayments to update
     */
    where?: PosPaymentWhereInput
    /**
     * Limit how many PosPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PosPayment upsert
   */
  export type PosPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the PosPayment to update in case it exists.
     */
    where: PosPaymentWhereUniqueInput
    /**
     * In case the PosPayment found by the `where` argument doesn't exist, create a new PosPayment with this data.
     */
    create: XOR<PosPaymentCreateInput, PosPaymentUncheckedCreateInput>
    /**
     * In case the PosPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PosPaymentUpdateInput, PosPaymentUncheckedUpdateInput>
  }

  /**
   * PosPayment delete
   */
  export type PosPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
    /**
     * Filter which PosPayment to delete.
     */
    where: PosPaymentWhereUniqueInput
  }

  /**
   * PosPayment deleteMany
   */
  export type PosPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PosPayments to delete
     */
    where?: PosPaymentWhereInput
    /**
     * Limit how many PosPayments to delete.
     */
    limit?: number
  }

  /**
   * PosPayment without action
   */
  export type PosPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PosPayment
     */
    select?: PosPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PosPayment
     */
    omit?: PosPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PosPaymentInclude<ExtArgs> | null
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


  export const TerminalScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    locationId: 'locationId',
    name: 'name',
    code: 'code',
    type: 'type',
    ipAddress: 'ipAddress',
    macAddress: 'macAddress',
    status: 'status',
    lastSeenAt: 'lastSeenAt',
    deviceToken: 'deviceToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TerminalScalarFieldEnum = (typeof TerminalScalarFieldEnum)[keyof typeof TerminalScalarFieldEnum]


  export const TerminalPairingCodeScalarFieldEnum: {
    id: 'id',
    terminalId: 'terminalId',
    code: 'code',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type TerminalPairingCodeScalarFieldEnum = (typeof TerminalPairingCodeScalarFieldEnum)[keyof typeof TerminalPairingCodeScalarFieldEnum]


  export const PosSessionScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    terminalId: 'terminalId',
    operatorId: 'operatorId',
    status: 'status',
    openingCash: 'openingCash',
    closingCash: 'closingCash',
    expectedTotal: 'expectedTotal',
    actualTotal: 'actualTotal',
    variance: 'variance',
    openedAt: 'openedAt',
    closedAt: 'closedAt',
    reconciledAt: 'reconciledAt'
  };

  export type PosSessionScalarFieldEnum = (typeof PosSessionScalarFieldEnum)[keyof typeof PosSessionScalarFieldEnum]


  export const PosSessionItemScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    description: 'description',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    createdAt: 'createdAt'
  };

  export type PosSessionItemScalarFieldEnum = (typeof PosSessionItemScalarFieldEnum)[keyof typeof PosSessionItemScalarFieldEnum]


  export const PosPaymentScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    stripeIntentId: 'stripeIntentId',
    paymentIntentId: 'paymentIntentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PosPaymentScalarFieldEnum = (typeof PosPaymentScalarFieldEnum)[keyof typeof PosPaymentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'TerminalType'
   */
  export type EnumTerminalTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TerminalType'>
    


  /**
   * Reference to a field of type 'TerminalType[]'
   */
  export type ListEnumTerminalTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TerminalType[]'>
    


  /**
   * Reference to a field of type 'TerminalStatus'
   */
  export type EnumTerminalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TerminalStatus'>
    


  /**
   * Reference to a field of type 'TerminalStatus[]'
   */
  export type ListEnumTerminalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TerminalStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'PosSessionStatus'
   */
  export type EnumPosSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PosSessionStatus'>
    


  /**
   * Reference to a field of type 'PosSessionStatus[]'
   */
  export type ListEnumPosSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PosSessionStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PosPaymentStatus'
   */
  export type EnumPosPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PosPaymentStatus'>
    


  /**
   * Reference to a field of type 'PosPaymentStatus[]'
   */
  export type ListEnumPosPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PosPaymentStatus[]'>
    


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


  export type TerminalWhereInput = {
    AND?: TerminalWhereInput | TerminalWhereInput[]
    OR?: TerminalWhereInput[]
    NOT?: TerminalWhereInput | TerminalWhereInput[]
    id?: StringFilter<"Terminal"> | string
    tenantId?: StringFilter<"Terminal"> | string
    locationId?: StringFilter<"Terminal"> | string
    name?: StringFilter<"Terminal"> | string
    code?: StringFilter<"Terminal"> | string
    type?: EnumTerminalTypeFilter<"Terminal"> | $Enums.TerminalType
    ipAddress?: StringNullableFilter<"Terminal"> | string | null
    macAddress?: StringNullableFilter<"Terminal"> | string | null
    status?: EnumTerminalStatusFilter<"Terminal"> | $Enums.TerminalStatus
    lastSeenAt?: DateTimeNullableFilter<"Terminal"> | Date | string | null
    deviceToken?: StringNullableFilter<"Terminal"> | string | null
    createdAt?: DateTimeFilter<"Terminal"> | Date | string
    updatedAt?: DateTimeFilter<"Terminal"> | Date | string
    pairingCodes?: TerminalPairingCodeListRelationFilter
    posSessions?: PosSessionListRelationFilter
  }

  export type TerminalOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    locationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    type?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    macAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    deviceToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pairingCodes?: TerminalPairingCodeOrderByRelationAggregateInput
    posSessions?: PosSessionOrderByRelationAggregateInput
  }

  export type TerminalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    deviceToken?: string
    locationId_code?: TerminalLocationIdCodeCompoundUniqueInput
    AND?: TerminalWhereInput | TerminalWhereInput[]
    OR?: TerminalWhereInput[]
    NOT?: TerminalWhereInput | TerminalWhereInput[]
    tenantId?: StringFilter<"Terminal"> | string
    locationId?: StringFilter<"Terminal"> | string
    name?: StringFilter<"Terminal"> | string
    code?: StringFilter<"Terminal"> | string
    type?: EnumTerminalTypeFilter<"Terminal"> | $Enums.TerminalType
    ipAddress?: StringNullableFilter<"Terminal"> | string | null
    macAddress?: StringNullableFilter<"Terminal"> | string | null
    status?: EnumTerminalStatusFilter<"Terminal"> | $Enums.TerminalStatus
    lastSeenAt?: DateTimeNullableFilter<"Terminal"> | Date | string | null
    createdAt?: DateTimeFilter<"Terminal"> | Date | string
    updatedAt?: DateTimeFilter<"Terminal"> | Date | string
    pairingCodes?: TerminalPairingCodeListRelationFilter
    posSessions?: PosSessionListRelationFilter
  }, "id" | "deviceToken" | "locationId_code">

  export type TerminalOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    locationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    type?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    macAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    deviceToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TerminalCountOrderByAggregateInput
    _max?: TerminalMaxOrderByAggregateInput
    _min?: TerminalMinOrderByAggregateInput
  }

  export type TerminalScalarWhereWithAggregatesInput = {
    AND?: TerminalScalarWhereWithAggregatesInput | TerminalScalarWhereWithAggregatesInput[]
    OR?: TerminalScalarWhereWithAggregatesInput[]
    NOT?: TerminalScalarWhereWithAggregatesInput | TerminalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Terminal"> | string
    tenantId?: StringWithAggregatesFilter<"Terminal"> | string
    locationId?: StringWithAggregatesFilter<"Terminal"> | string
    name?: StringWithAggregatesFilter<"Terminal"> | string
    code?: StringWithAggregatesFilter<"Terminal"> | string
    type?: EnumTerminalTypeWithAggregatesFilter<"Terminal"> | $Enums.TerminalType
    ipAddress?: StringNullableWithAggregatesFilter<"Terminal"> | string | null
    macAddress?: StringNullableWithAggregatesFilter<"Terminal"> | string | null
    status?: EnumTerminalStatusWithAggregatesFilter<"Terminal"> | $Enums.TerminalStatus
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"Terminal"> | Date | string | null
    deviceToken?: StringNullableWithAggregatesFilter<"Terminal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Terminal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Terminal"> | Date | string
  }

  export type TerminalPairingCodeWhereInput = {
    AND?: TerminalPairingCodeWhereInput | TerminalPairingCodeWhereInput[]
    OR?: TerminalPairingCodeWhereInput[]
    NOT?: TerminalPairingCodeWhereInput | TerminalPairingCodeWhereInput[]
    id?: StringFilter<"TerminalPairingCode"> | string
    terminalId?: StringFilter<"TerminalPairingCode"> | string
    code?: StringFilter<"TerminalPairingCode"> | string
    expiresAt?: DateTimeFilter<"TerminalPairingCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"TerminalPairingCode"> | Date | string | null
    createdAt?: DateTimeFilter<"TerminalPairingCode"> | Date | string
    terminal?: XOR<TerminalScalarRelationFilter, TerminalWhereInput>
  }

  export type TerminalPairingCodeOrderByWithRelationInput = {
    id?: SortOrder
    terminalId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    terminal?: TerminalOrderByWithRelationInput
  }

  export type TerminalPairingCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: TerminalPairingCodeWhereInput | TerminalPairingCodeWhereInput[]
    OR?: TerminalPairingCodeWhereInput[]
    NOT?: TerminalPairingCodeWhereInput | TerminalPairingCodeWhereInput[]
    terminalId?: StringFilter<"TerminalPairingCode"> | string
    expiresAt?: DateTimeFilter<"TerminalPairingCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"TerminalPairingCode"> | Date | string | null
    createdAt?: DateTimeFilter<"TerminalPairingCode"> | Date | string
    terminal?: XOR<TerminalScalarRelationFilter, TerminalWhereInput>
  }, "id" | "code">

  export type TerminalPairingCodeOrderByWithAggregationInput = {
    id?: SortOrder
    terminalId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TerminalPairingCodeCountOrderByAggregateInput
    _max?: TerminalPairingCodeMaxOrderByAggregateInput
    _min?: TerminalPairingCodeMinOrderByAggregateInput
  }

  export type TerminalPairingCodeScalarWhereWithAggregatesInput = {
    AND?: TerminalPairingCodeScalarWhereWithAggregatesInput | TerminalPairingCodeScalarWhereWithAggregatesInput[]
    OR?: TerminalPairingCodeScalarWhereWithAggregatesInput[]
    NOT?: TerminalPairingCodeScalarWhereWithAggregatesInput | TerminalPairingCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TerminalPairingCode"> | string
    terminalId?: StringWithAggregatesFilter<"TerminalPairingCode"> | string
    code?: StringWithAggregatesFilter<"TerminalPairingCode"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"TerminalPairingCode"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"TerminalPairingCode"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TerminalPairingCode"> | Date | string
  }

  export type PosSessionWhereInput = {
    AND?: PosSessionWhereInput | PosSessionWhereInput[]
    OR?: PosSessionWhereInput[]
    NOT?: PosSessionWhereInput | PosSessionWhereInput[]
    id?: StringFilter<"PosSession"> | string
    tenantId?: StringFilter<"PosSession"> | string
    terminalId?: StringFilter<"PosSession"> | string
    operatorId?: StringFilter<"PosSession"> | string
    status?: EnumPosSessionStatusFilter<"PosSession"> | $Enums.PosSessionStatus
    openingCash?: IntFilter<"PosSession"> | number
    closingCash?: IntNullableFilter<"PosSession"> | number | null
    expectedTotal?: IntNullableFilter<"PosSession"> | number | null
    actualTotal?: IntNullableFilter<"PosSession"> | number | null
    variance?: IntNullableFilter<"PosSession"> | number | null
    openedAt?: DateTimeFilter<"PosSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"PosSession"> | Date | string | null
    reconciledAt?: DateTimeNullableFilter<"PosSession"> | Date | string | null
    terminal?: XOR<TerminalScalarRelationFilter, TerminalWhereInput>
    items?: PosSessionItemListRelationFilter
    payments?: PosPaymentListRelationFilter
  }

  export type PosSessionOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    terminalId?: SortOrder
    operatorId?: SortOrder
    status?: SortOrder
    openingCash?: SortOrder
    closingCash?: SortOrderInput | SortOrder
    expectedTotal?: SortOrderInput | SortOrder
    actualTotal?: SortOrderInput | SortOrder
    variance?: SortOrderInput | SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    reconciledAt?: SortOrderInput | SortOrder
    terminal?: TerminalOrderByWithRelationInput
    items?: PosSessionItemOrderByRelationAggregateInput
    payments?: PosPaymentOrderByRelationAggregateInput
  }

  export type PosSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PosSessionWhereInput | PosSessionWhereInput[]
    OR?: PosSessionWhereInput[]
    NOT?: PosSessionWhereInput | PosSessionWhereInput[]
    tenantId?: StringFilter<"PosSession"> | string
    terminalId?: StringFilter<"PosSession"> | string
    operatorId?: StringFilter<"PosSession"> | string
    status?: EnumPosSessionStatusFilter<"PosSession"> | $Enums.PosSessionStatus
    openingCash?: IntFilter<"PosSession"> | number
    closingCash?: IntNullableFilter<"PosSession"> | number | null
    expectedTotal?: IntNullableFilter<"PosSession"> | number | null
    actualTotal?: IntNullableFilter<"PosSession"> | number | null
    variance?: IntNullableFilter<"PosSession"> | number | null
    openedAt?: DateTimeFilter<"PosSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"PosSession"> | Date | string | null
    reconciledAt?: DateTimeNullableFilter<"PosSession"> | Date | string | null
    terminal?: XOR<TerminalScalarRelationFilter, TerminalWhereInput>
    items?: PosSessionItemListRelationFilter
    payments?: PosPaymentListRelationFilter
  }, "id">

  export type PosSessionOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    terminalId?: SortOrder
    operatorId?: SortOrder
    status?: SortOrder
    openingCash?: SortOrder
    closingCash?: SortOrderInput | SortOrder
    expectedTotal?: SortOrderInput | SortOrder
    actualTotal?: SortOrderInput | SortOrder
    variance?: SortOrderInput | SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    reconciledAt?: SortOrderInput | SortOrder
    _count?: PosSessionCountOrderByAggregateInput
    _avg?: PosSessionAvgOrderByAggregateInput
    _max?: PosSessionMaxOrderByAggregateInput
    _min?: PosSessionMinOrderByAggregateInput
    _sum?: PosSessionSumOrderByAggregateInput
  }

  export type PosSessionScalarWhereWithAggregatesInput = {
    AND?: PosSessionScalarWhereWithAggregatesInput | PosSessionScalarWhereWithAggregatesInput[]
    OR?: PosSessionScalarWhereWithAggregatesInput[]
    NOT?: PosSessionScalarWhereWithAggregatesInput | PosSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PosSession"> | string
    tenantId?: StringWithAggregatesFilter<"PosSession"> | string
    terminalId?: StringWithAggregatesFilter<"PosSession"> | string
    operatorId?: StringWithAggregatesFilter<"PosSession"> | string
    status?: EnumPosSessionStatusWithAggregatesFilter<"PosSession"> | $Enums.PosSessionStatus
    openingCash?: IntWithAggregatesFilter<"PosSession"> | number
    closingCash?: IntNullableWithAggregatesFilter<"PosSession"> | number | null
    expectedTotal?: IntNullableWithAggregatesFilter<"PosSession"> | number | null
    actualTotal?: IntNullableWithAggregatesFilter<"PosSession"> | number | null
    variance?: IntNullableWithAggregatesFilter<"PosSession"> | number | null
    openedAt?: DateTimeWithAggregatesFilter<"PosSession"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"PosSession"> | Date | string | null
    reconciledAt?: DateTimeNullableWithAggregatesFilter<"PosSession"> | Date | string | null
  }

  export type PosSessionItemWhereInput = {
    AND?: PosSessionItemWhereInput | PosSessionItemWhereInput[]
    OR?: PosSessionItemWhereInput[]
    NOT?: PosSessionItemWhereInput | PosSessionItemWhereInput[]
    id?: StringFilter<"PosSessionItem"> | string
    sessionId?: StringFilter<"PosSessionItem"> | string
    description?: StringFilter<"PosSessionItem"> | string
    quantity?: IntFilter<"PosSessionItem"> | number
    unitPrice?: IntFilter<"PosSessionItem"> | number
    createdAt?: DateTimeFilter<"PosSessionItem"> | Date | string
    session?: XOR<PosSessionScalarRelationFilter, PosSessionWhereInput>
  }

  export type PosSessionItemOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    createdAt?: SortOrder
    session?: PosSessionOrderByWithRelationInput
  }

  export type PosSessionItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PosSessionItemWhereInput | PosSessionItemWhereInput[]
    OR?: PosSessionItemWhereInput[]
    NOT?: PosSessionItemWhereInput | PosSessionItemWhereInput[]
    sessionId?: StringFilter<"PosSessionItem"> | string
    description?: StringFilter<"PosSessionItem"> | string
    quantity?: IntFilter<"PosSessionItem"> | number
    unitPrice?: IntFilter<"PosSessionItem"> | number
    createdAt?: DateTimeFilter<"PosSessionItem"> | Date | string
    session?: XOR<PosSessionScalarRelationFilter, PosSessionWhereInput>
  }, "id">

  export type PosSessionItemOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    createdAt?: SortOrder
    _count?: PosSessionItemCountOrderByAggregateInput
    _avg?: PosSessionItemAvgOrderByAggregateInput
    _max?: PosSessionItemMaxOrderByAggregateInput
    _min?: PosSessionItemMinOrderByAggregateInput
    _sum?: PosSessionItemSumOrderByAggregateInput
  }

  export type PosSessionItemScalarWhereWithAggregatesInput = {
    AND?: PosSessionItemScalarWhereWithAggregatesInput | PosSessionItemScalarWhereWithAggregatesInput[]
    OR?: PosSessionItemScalarWhereWithAggregatesInput[]
    NOT?: PosSessionItemScalarWhereWithAggregatesInput | PosSessionItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PosSessionItem"> | string
    sessionId?: StringWithAggregatesFilter<"PosSessionItem"> | string
    description?: StringWithAggregatesFilter<"PosSessionItem"> | string
    quantity?: IntWithAggregatesFilter<"PosSessionItem"> | number
    unitPrice?: IntWithAggregatesFilter<"PosSessionItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PosSessionItem"> | Date | string
  }

  export type PosPaymentWhereInput = {
    AND?: PosPaymentWhereInput | PosPaymentWhereInput[]
    OR?: PosPaymentWhereInput[]
    NOT?: PosPaymentWhereInput | PosPaymentWhereInput[]
    id?: StringFilter<"PosPayment"> | string
    sessionId?: StringFilter<"PosPayment"> | string
    amount?: IntFilter<"PosPayment"> | number
    currency?: StringFilter<"PosPayment"> | string
    status?: EnumPosPaymentStatusFilter<"PosPayment"> | $Enums.PosPaymentStatus
    stripeIntentId?: StringNullableFilter<"PosPayment"> | string | null
    paymentIntentId?: StringNullableFilter<"PosPayment"> | string | null
    createdAt?: DateTimeFilter<"PosPayment"> | Date | string
    updatedAt?: DateTimeFilter<"PosPayment"> | Date | string
    session?: XOR<PosSessionScalarRelationFilter, PosSessionWhereInput>
  }

  export type PosPaymentOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripeIntentId?: SortOrderInput | SortOrder
    paymentIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    session?: PosSessionOrderByWithRelationInput
  }

  export type PosPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PosPaymentWhereInput | PosPaymentWhereInput[]
    OR?: PosPaymentWhereInput[]
    NOT?: PosPaymentWhereInput | PosPaymentWhereInput[]
    sessionId?: StringFilter<"PosPayment"> | string
    amount?: IntFilter<"PosPayment"> | number
    currency?: StringFilter<"PosPayment"> | string
    status?: EnumPosPaymentStatusFilter<"PosPayment"> | $Enums.PosPaymentStatus
    stripeIntentId?: StringNullableFilter<"PosPayment"> | string | null
    paymentIntentId?: StringNullableFilter<"PosPayment"> | string | null
    createdAt?: DateTimeFilter<"PosPayment"> | Date | string
    updatedAt?: DateTimeFilter<"PosPayment"> | Date | string
    session?: XOR<PosSessionScalarRelationFilter, PosSessionWhereInput>
  }, "id">

  export type PosPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripeIntentId?: SortOrderInput | SortOrder
    paymentIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PosPaymentCountOrderByAggregateInput
    _avg?: PosPaymentAvgOrderByAggregateInput
    _max?: PosPaymentMaxOrderByAggregateInput
    _min?: PosPaymentMinOrderByAggregateInput
    _sum?: PosPaymentSumOrderByAggregateInput
  }

  export type PosPaymentScalarWhereWithAggregatesInput = {
    AND?: PosPaymentScalarWhereWithAggregatesInput | PosPaymentScalarWhereWithAggregatesInput[]
    OR?: PosPaymentScalarWhereWithAggregatesInput[]
    NOT?: PosPaymentScalarWhereWithAggregatesInput | PosPaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PosPayment"> | string
    sessionId?: StringWithAggregatesFilter<"PosPayment"> | string
    amount?: IntWithAggregatesFilter<"PosPayment"> | number
    currency?: StringWithAggregatesFilter<"PosPayment"> | string
    status?: EnumPosPaymentStatusWithAggregatesFilter<"PosPayment"> | $Enums.PosPaymentStatus
    stripeIntentId?: StringNullableWithAggregatesFilter<"PosPayment"> | string | null
    paymentIntentId?: StringNullableWithAggregatesFilter<"PosPayment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PosPayment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PosPayment"> | Date | string
  }

  export type TerminalCreateInput = {
    id?: string
    tenantId: string
    locationId: string
    name: string
    code: string
    type: $Enums.TerminalType
    ipAddress?: string | null
    macAddress?: string | null
    status?: $Enums.TerminalStatus
    lastSeenAt?: Date | string | null
    deviceToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pairingCodes?: TerminalPairingCodeCreateNestedManyWithoutTerminalInput
    posSessions?: PosSessionCreateNestedManyWithoutTerminalInput
  }

  export type TerminalUncheckedCreateInput = {
    id?: string
    tenantId: string
    locationId: string
    name: string
    code: string
    type: $Enums.TerminalType
    ipAddress?: string | null
    macAddress?: string | null
    status?: $Enums.TerminalStatus
    lastSeenAt?: Date | string | null
    deviceToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pairingCodes?: TerminalPairingCodeUncheckedCreateNestedManyWithoutTerminalInput
    posSessions?: PosSessionUncheckedCreateNestedManyWithoutTerminalInput
  }

  export type TerminalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumTerminalTypeFieldUpdateOperationsInput | $Enums.TerminalType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    macAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTerminalStatusFieldUpdateOperationsInput | $Enums.TerminalStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairingCodes?: TerminalPairingCodeUpdateManyWithoutTerminalNestedInput
    posSessions?: PosSessionUpdateManyWithoutTerminalNestedInput
  }

  export type TerminalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumTerminalTypeFieldUpdateOperationsInput | $Enums.TerminalType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    macAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTerminalStatusFieldUpdateOperationsInput | $Enums.TerminalStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairingCodes?: TerminalPairingCodeUncheckedUpdateManyWithoutTerminalNestedInput
    posSessions?: PosSessionUncheckedUpdateManyWithoutTerminalNestedInput
  }

  export type TerminalCreateManyInput = {
    id?: string
    tenantId: string
    locationId: string
    name: string
    code: string
    type: $Enums.TerminalType
    ipAddress?: string | null
    macAddress?: string | null
    status?: $Enums.TerminalStatus
    lastSeenAt?: Date | string | null
    deviceToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TerminalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumTerminalTypeFieldUpdateOperationsInput | $Enums.TerminalType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    macAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTerminalStatusFieldUpdateOperationsInput | $Enums.TerminalStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TerminalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumTerminalTypeFieldUpdateOperationsInput | $Enums.TerminalType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    macAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTerminalStatusFieldUpdateOperationsInput | $Enums.TerminalStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TerminalPairingCodeCreateInput = {
    id?: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    terminal: TerminalCreateNestedOneWithoutPairingCodesInput
  }

  export type TerminalPairingCodeUncheckedCreateInput = {
    id?: string
    terminalId: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TerminalPairingCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    terminal?: TerminalUpdateOneRequiredWithoutPairingCodesNestedInput
  }

  export type TerminalPairingCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    terminalId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TerminalPairingCodeCreateManyInput = {
    id?: string
    terminalId: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TerminalPairingCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TerminalPairingCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    terminalId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosSessionCreateInput = {
    id?: string
    tenantId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
    terminal: TerminalCreateNestedOneWithoutPosSessionsInput
    items?: PosSessionItemCreateNestedManyWithoutSessionInput
    payments?: PosPaymentCreateNestedManyWithoutSessionInput
  }

  export type PosSessionUncheckedCreateInput = {
    id?: string
    tenantId: string
    terminalId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
    items?: PosSessionItemUncheckedCreateNestedManyWithoutSessionInput
    payments?: PosPaymentUncheckedCreateNestedManyWithoutSessionInput
  }

  export type PosSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminal?: TerminalUpdateOneRequiredWithoutPosSessionsNestedInput
    items?: PosSessionItemUpdateManyWithoutSessionNestedInput
    payments?: PosPaymentUpdateManyWithoutSessionNestedInput
  }

  export type PosSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    terminalId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    items?: PosSessionItemUncheckedUpdateManyWithoutSessionNestedInput
    payments?: PosPaymentUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type PosSessionCreateManyInput = {
    id?: string
    tenantId: string
    terminalId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
  }

  export type PosSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PosSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    terminalId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PosSessionItemCreateInput = {
    id?: string
    description: string
    quantity?: number
    unitPrice: number
    createdAt?: Date | string
    session: PosSessionCreateNestedOneWithoutItemsInput
  }

  export type PosSessionItemUncheckedCreateInput = {
    id?: string
    sessionId: string
    description: string
    quantity?: number
    unitPrice: number
    createdAt?: Date | string
  }

  export type PosSessionItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: PosSessionUpdateOneRequiredWithoutItemsNestedInput
  }

  export type PosSessionItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosSessionItemCreateManyInput = {
    id?: string
    sessionId: string
    description: string
    quantity?: number
    unitPrice: number
    createdAt?: Date | string
  }

  export type PosSessionItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosSessionItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosPaymentCreateInput = {
    id?: string
    amount: number
    currency?: string
    status?: $Enums.PosPaymentStatus
    stripeIntentId?: string | null
    paymentIntentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    session: PosSessionCreateNestedOneWithoutPaymentsInput
  }

  export type PosPaymentUncheckedCreateInput = {
    id?: string
    sessionId: string
    amount: number
    currency?: string
    status?: $Enums.PosPaymentStatus
    stripeIntentId?: string | null
    paymentIntentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PosPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPosPaymentStatusFieldUpdateOperationsInput | $Enums.PosPaymentStatus
    stripeIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: PosSessionUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PosPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPosPaymentStatusFieldUpdateOperationsInput | $Enums.PosPaymentStatus
    stripeIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosPaymentCreateManyInput = {
    id?: string
    sessionId: string
    amount: number
    currency?: string
    status?: $Enums.PosPaymentStatus
    stripeIntentId?: string | null
    paymentIntentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PosPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPosPaymentStatusFieldUpdateOperationsInput | $Enums.PosPaymentStatus
    stripeIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPosPaymentStatusFieldUpdateOperationsInput | $Enums.PosPaymentStatus
    stripeIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumTerminalTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TerminalType | EnumTerminalTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TerminalType[] | ListEnumTerminalTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TerminalType[] | ListEnumTerminalTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTerminalTypeFilter<$PrismaModel> | $Enums.TerminalType
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

  export type EnumTerminalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TerminalStatus | EnumTerminalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TerminalStatus[] | ListEnumTerminalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TerminalStatus[] | ListEnumTerminalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTerminalStatusFilter<$PrismaModel> | $Enums.TerminalStatus
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

  export type TerminalPairingCodeListRelationFilter = {
    every?: TerminalPairingCodeWhereInput
    some?: TerminalPairingCodeWhereInput
    none?: TerminalPairingCodeWhereInput
  }

  export type PosSessionListRelationFilter = {
    every?: PosSessionWhereInput
    some?: PosSessionWhereInput
    none?: PosSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TerminalPairingCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PosSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TerminalLocationIdCodeCompoundUniqueInput = {
    locationId: string
    code: string
  }

  export type TerminalCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    locationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    type?: SortOrder
    ipAddress?: SortOrder
    macAddress?: SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrder
    deviceToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TerminalMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    locationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    type?: SortOrder
    ipAddress?: SortOrder
    macAddress?: SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrder
    deviceToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TerminalMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    locationId?: SortOrder
    name?: SortOrder
    code?: SortOrder
    type?: SortOrder
    ipAddress?: SortOrder
    macAddress?: SortOrder
    status?: SortOrder
    lastSeenAt?: SortOrder
    deviceToken?: SortOrder
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

  export type EnumTerminalTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TerminalType | EnumTerminalTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TerminalType[] | ListEnumTerminalTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TerminalType[] | ListEnumTerminalTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTerminalTypeWithAggregatesFilter<$PrismaModel> | $Enums.TerminalType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTerminalTypeFilter<$PrismaModel>
    _max?: NestedEnumTerminalTypeFilter<$PrismaModel>
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

  export type EnumTerminalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TerminalStatus | EnumTerminalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TerminalStatus[] | ListEnumTerminalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TerminalStatus[] | ListEnumTerminalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTerminalStatusWithAggregatesFilter<$PrismaModel> | $Enums.TerminalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTerminalStatusFilter<$PrismaModel>
    _max?: NestedEnumTerminalStatusFilter<$PrismaModel>
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

  export type TerminalScalarRelationFilter = {
    is?: TerminalWhereInput
    isNot?: TerminalWhereInput
  }

  export type TerminalPairingCodeCountOrderByAggregateInput = {
    id?: SortOrder
    terminalId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TerminalPairingCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    terminalId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TerminalPairingCodeMinOrderByAggregateInput = {
    id?: SortOrder
    terminalId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumPosSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PosSessionStatus | EnumPosSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PosSessionStatus[] | ListEnumPosSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PosSessionStatus[] | ListEnumPosSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPosSessionStatusFilter<$PrismaModel> | $Enums.PosSessionStatus
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

  export type PosSessionItemListRelationFilter = {
    every?: PosSessionItemWhereInput
    some?: PosSessionItemWhereInput
    none?: PosSessionItemWhereInput
  }

  export type PosPaymentListRelationFilter = {
    every?: PosPaymentWhereInput
    some?: PosPaymentWhereInput
    none?: PosPaymentWhereInput
  }

  export type PosSessionItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PosPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PosSessionCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    terminalId?: SortOrder
    operatorId?: SortOrder
    status?: SortOrder
    openingCash?: SortOrder
    closingCash?: SortOrder
    expectedTotal?: SortOrder
    actualTotal?: SortOrder
    variance?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    reconciledAt?: SortOrder
  }

  export type PosSessionAvgOrderByAggregateInput = {
    openingCash?: SortOrder
    closingCash?: SortOrder
    expectedTotal?: SortOrder
    actualTotal?: SortOrder
    variance?: SortOrder
  }

  export type PosSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    terminalId?: SortOrder
    operatorId?: SortOrder
    status?: SortOrder
    openingCash?: SortOrder
    closingCash?: SortOrder
    expectedTotal?: SortOrder
    actualTotal?: SortOrder
    variance?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    reconciledAt?: SortOrder
  }

  export type PosSessionMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    terminalId?: SortOrder
    operatorId?: SortOrder
    status?: SortOrder
    openingCash?: SortOrder
    closingCash?: SortOrder
    expectedTotal?: SortOrder
    actualTotal?: SortOrder
    variance?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    reconciledAt?: SortOrder
  }

  export type PosSessionSumOrderByAggregateInput = {
    openingCash?: SortOrder
    closingCash?: SortOrder
    expectedTotal?: SortOrder
    actualTotal?: SortOrder
    variance?: SortOrder
  }

  export type EnumPosSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PosSessionStatus | EnumPosSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PosSessionStatus[] | ListEnumPosSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PosSessionStatus[] | ListEnumPosSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPosSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PosSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPosSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumPosSessionStatusFilter<$PrismaModel>
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

  export type PosSessionScalarRelationFilter = {
    is?: PosSessionWhereInput
    isNot?: PosSessionWhereInput
  }

  export type PosSessionItemCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PosSessionItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type PosSessionItemMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PosSessionItemMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PosSessionItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
  }

  export type EnumPosPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PosPaymentStatus | EnumPosPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PosPaymentStatus[] | ListEnumPosPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PosPaymentStatus[] | ListEnumPosPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPosPaymentStatusFilter<$PrismaModel> | $Enums.PosPaymentStatus
  }

  export type PosPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripeIntentId?: SortOrder
    paymentIntentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PosPaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PosPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripeIntentId?: SortOrder
    paymentIntentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PosPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripeIntentId?: SortOrder
    paymentIntentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PosPaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPosPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PosPaymentStatus | EnumPosPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PosPaymentStatus[] | ListEnumPosPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PosPaymentStatus[] | ListEnumPosPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPosPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PosPaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPosPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPosPaymentStatusFilter<$PrismaModel>
  }

  export type TerminalPairingCodeCreateNestedManyWithoutTerminalInput = {
    create?: XOR<TerminalPairingCodeCreateWithoutTerminalInput, TerminalPairingCodeUncheckedCreateWithoutTerminalInput> | TerminalPairingCodeCreateWithoutTerminalInput[] | TerminalPairingCodeUncheckedCreateWithoutTerminalInput[]
    connectOrCreate?: TerminalPairingCodeCreateOrConnectWithoutTerminalInput | TerminalPairingCodeCreateOrConnectWithoutTerminalInput[]
    createMany?: TerminalPairingCodeCreateManyTerminalInputEnvelope
    connect?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
  }

  export type PosSessionCreateNestedManyWithoutTerminalInput = {
    create?: XOR<PosSessionCreateWithoutTerminalInput, PosSessionUncheckedCreateWithoutTerminalInput> | PosSessionCreateWithoutTerminalInput[] | PosSessionUncheckedCreateWithoutTerminalInput[]
    connectOrCreate?: PosSessionCreateOrConnectWithoutTerminalInput | PosSessionCreateOrConnectWithoutTerminalInput[]
    createMany?: PosSessionCreateManyTerminalInputEnvelope
    connect?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
  }

  export type TerminalPairingCodeUncheckedCreateNestedManyWithoutTerminalInput = {
    create?: XOR<TerminalPairingCodeCreateWithoutTerminalInput, TerminalPairingCodeUncheckedCreateWithoutTerminalInput> | TerminalPairingCodeCreateWithoutTerminalInput[] | TerminalPairingCodeUncheckedCreateWithoutTerminalInput[]
    connectOrCreate?: TerminalPairingCodeCreateOrConnectWithoutTerminalInput | TerminalPairingCodeCreateOrConnectWithoutTerminalInput[]
    createMany?: TerminalPairingCodeCreateManyTerminalInputEnvelope
    connect?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
  }

  export type PosSessionUncheckedCreateNestedManyWithoutTerminalInput = {
    create?: XOR<PosSessionCreateWithoutTerminalInput, PosSessionUncheckedCreateWithoutTerminalInput> | PosSessionCreateWithoutTerminalInput[] | PosSessionUncheckedCreateWithoutTerminalInput[]
    connectOrCreate?: PosSessionCreateOrConnectWithoutTerminalInput | PosSessionCreateOrConnectWithoutTerminalInput[]
    createMany?: PosSessionCreateManyTerminalInputEnvelope
    connect?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumTerminalTypeFieldUpdateOperationsInput = {
    set?: $Enums.TerminalType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumTerminalStatusFieldUpdateOperationsInput = {
    set?: $Enums.TerminalStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TerminalPairingCodeUpdateManyWithoutTerminalNestedInput = {
    create?: XOR<TerminalPairingCodeCreateWithoutTerminalInput, TerminalPairingCodeUncheckedCreateWithoutTerminalInput> | TerminalPairingCodeCreateWithoutTerminalInput[] | TerminalPairingCodeUncheckedCreateWithoutTerminalInput[]
    connectOrCreate?: TerminalPairingCodeCreateOrConnectWithoutTerminalInput | TerminalPairingCodeCreateOrConnectWithoutTerminalInput[]
    upsert?: TerminalPairingCodeUpsertWithWhereUniqueWithoutTerminalInput | TerminalPairingCodeUpsertWithWhereUniqueWithoutTerminalInput[]
    createMany?: TerminalPairingCodeCreateManyTerminalInputEnvelope
    set?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
    disconnect?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
    delete?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
    connect?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
    update?: TerminalPairingCodeUpdateWithWhereUniqueWithoutTerminalInput | TerminalPairingCodeUpdateWithWhereUniqueWithoutTerminalInput[]
    updateMany?: TerminalPairingCodeUpdateManyWithWhereWithoutTerminalInput | TerminalPairingCodeUpdateManyWithWhereWithoutTerminalInput[]
    deleteMany?: TerminalPairingCodeScalarWhereInput | TerminalPairingCodeScalarWhereInput[]
  }

  export type PosSessionUpdateManyWithoutTerminalNestedInput = {
    create?: XOR<PosSessionCreateWithoutTerminalInput, PosSessionUncheckedCreateWithoutTerminalInput> | PosSessionCreateWithoutTerminalInput[] | PosSessionUncheckedCreateWithoutTerminalInput[]
    connectOrCreate?: PosSessionCreateOrConnectWithoutTerminalInput | PosSessionCreateOrConnectWithoutTerminalInput[]
    upsert?: PosSessionUpsertWithWhereUniqueWithoutTerminalInput | PosSessionUpsertWithWhereUniqueWithoutTerminalInput[]
    createMany?: PosSessionCreateManyTerminalInputEnvelope
    set?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
    disconnect?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
    delete?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
    connect?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
    update?: PosSessionUpdateWithWhereUniqueWithoutTerminalInput | PosSessionUpdateWithWhereUniqueWithoutTerminalInput[]
    updateMany?: PosSessionUpdateManyWithWhereWithoutTerminalInput | PosSessionUpdateManyWithWhereWithoutTerminalInput[]
    deleteMany?: PosSessionScalarWhereInput | PosSessionScalarWhereInput[]
  }

  export type TerminalPairingCodeUncheckedUpdateManyWithoutTerminalNestedInput = {
    create?: XOR<TerminalPairingCodeCreateWithoutTerminalInput, TerminalPairingCodeUncheckedCreateWithoutTerminalInput> | TerminalPairingCodeCreateWithoutTerminalInput[] | TerminalPairingCodeUncheckedCreateWithoutTerminalInput[]
    connectOrCreate?: TerminalPairingCodeCreateOrConnectWithoutTerminalInput | TerminalPairingCodeCreateOrConnectWithoutTerminalInput[]
    upsert?: TerminalPairingCodeUpsertWithWhereUniqueWithoutTerminalInput | TerminalPairingCodeUpsertWithWhereUniqueWithoutTerminalInput[]
    createMany?: TerminalPairingCodeCreateManyTerminalInputEnvelope
    set?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
    disconnect?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
    delete?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
    connect?: TerminalPairingCodeWhereUniqueInput | TerminalPairingCodeWhereUniqueInput[]
    update?: TerminalPairingCodeUpdateWithWhereUniqueWithoutTerminalInput | TerminalPairingCodeUpdateWithWhereUniqueWithoutTerminalInput[]
    updateMany?: TerminalPairingCodeUpdateManyWithWhereWithoutTerminalInput | TerminalPairingCodeUpdateManyWithWhereWithoutTerminalInput[]
    deleteMany?: TerminalPairingCodeScalarWhereInput | TerminalPairingCodeScalarWhereInput[]
  }

  export type PosSessionUncheckedUpdateManyWithoutTerminalNestedInput = {
    create?: XOR<PosSessionCreateWithoutTerminalInput, PosSessionUncheckedCreateWithoutTerminalInput> | PosSessionCreateWithoutTerminalInput[] | PosSessionUncheckedCreateWithoutTerminalInput[]
    connectOrCreate?: PosSessionCreateOrConnectWithoutTerminalInput | PosSessionCreateOrConnectWithoutTerminalInput[]
    upsert?: PosSessionUpsertWithWhereUniqueWithoutTerminalInput | PosSessionUpsertWithWhereUniqueWithoutTerminalInput[]
    createMany?: PosSessionCreateManyTerminalInputEnvelope
    set?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
    disconnect?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
    delete?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
    connect?: PosSessionWhereUniqueInput | PosSessionWhereUniqueInput[]
    update?: PosSessionUpdateWithWhereUniqueWithoutTerminalInput | PosSessionUpdateWithWhereUniqueWithoutTerminalInput[]
    updateMany?: PosSessionUpdateManyWithWhereWithoutTerminalInput | PosSessionUpdateManyWithWhereWithoutTerminalInput[]
    deleteMany?: PosSessionScalarWhereInput | PosSessionScalarWhereInput[]
  }

  export type TerminalCreateNestedOneWithoutPairingCodesInput = {
    create?: XOR<TerminalCreateWithoutPairingCodesInput, TerminalUncheckedCreateWithoutPairingCodesInput>
    connectOrCreate?: TerminalCreateOrConnectWithoutPairingCodesInput
    connect?: TerminalWhereUniqueInput
  }

  export type TerminalUpdateOneRequiredWithoutPairingCodesNestedInput = {
    create?: XOR<TerminalCreateWithoutPairingCodesInput, TerminalUncheckedCreateWithoutPairingCodesInput>
    connectOrCreate?: TerminalCreateOrConnectWithoutPairingCodesInput
    upsert?: TerminalUpsertWithoutPairingCodesInput
    connect?: TerminalWhereUniqueInput
    update?: XOR<XOR<TerminalUpdateToOneWithWhereWithoutPairingCodesInput, TerminalUpdateWithoutPairingCodesInput>, TerminalUncheckedUpdateWithoutPairingCodesInput>
  }

  export type TerminalCreateNestedOneWithoutPosSessionsInput = {
    create?: XOR<TerminalCreateWithoutPosSessionsInput, TerminalUncheckedCreateWithoutPosSessionsInput>
    connectOrCreate?: TerminalCreateOrConnectWithoutPosSessionsInput
    connect?: TerminalWhereUniqueInput
  }

  export type PosSessionItemCreateNestedManyWithoutSessionInput = {
    create?: XOR<PosSessionItemCreateWithoutSessionInput, PosSessionItemUncheckedCreateWithoutSessionInput> | PosSessionItemCreateWithoutSessionInput[] | PosSessionItemUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: PosSessionItemCreateOrConnectWithoutSessionInput | PosSessionItemCreateOrConnectWithoutSessionInput[]
    createMany?: PosSessionItemCreateManySessionInputEnvelope
    connect?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
  }

  export type PosPaymentCreateNestedManyWithoutSessionInput = {
    create?: XOR<PosPaymentCreateWithoutSessionInput, PosPaymentUncheckedCreateWithoutSessionInput> | PosPaymentCreateWithoutSessionInput[] | PosPaymentUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: PosPaymentCreateOrConnectWithoutSessionInput | PosPaymentCreateOrConnectWithoutSessionInput[]
    createMany?: PosPaymentCreateManySessionInputEnvelope
    connect?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
  }

  export type PosSessionItemUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<PosSessionItemCreateWithoutSessionInput, PosSessionItemUncheckedCreateWithoutSessionInput> | PosSessionItemCreateWithoutSessionInput[] | PosSessionItemUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: PosSessionItemCreateOrConnectWithoutSessionInput | PosSessionItemCreateOrConnectWithoutSessionInput[]
    createMany?: PosSessionItemCreateManySessionInputEnvelope
    connect?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
  }

  export type PosPaymentUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<PosPaymentCreateWithoutSessionInput, PosPaymentUncheckedCreateWithoutSessionInput> | PosPaymentCreateWithoutSessionInput[] | PosPaymentUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: PosPaymentCreateOrConnectWithoutSessionInput | PosPaymentCreateOrConnectWithoutSessionInput[]
    createMany?: PosPaymentCreateManySessionInputEnvelope
    connect?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
  }

  export type EnumPosSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.PosSessionStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TerminalUpdateOneRequiredWithoutPosSessionsNestedInput = {
    create?: XOR<TerminalCreateWithoutPosSessionsInput, TerminalUncheckedCreateWithoutPosSessionsInput>
    connectOrCreate?: TerminalCreateOrConnectWithoutPosSessionsInput
    upsert?: TerminalUpsertWithoutPosSessionsInput
    connect?: TerminalWhereUniqueInput
    update?: XOR<XOR<TerminalUpdateToOneWithWhereWithoutPosSessionsInput, TerminalUpdateWithoutPosSessionsInput>, TerminalUncheckedUpdateWithoutPosSessionsInput>
  }

  export type PosSessionItemUpdateManyWithoutSessionNestedInput = {
    create?: XOR<PosSessionItemCreateWithoutSessionInput, PosSessionItemUncheckedCreateWithoutSessionInput> | PosSessionItemCreateWithoutSessionInput[] | PosSessionItemUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: PosSessionItemCreateOrConnectWithoutSessionInput | PosSessionItemCreateOrConnectWithoutSessionInput[]
    upsert?: PosSessionItemUpsertWithWhereUniqueWithoutSessionInput | PosSessionItemUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: PosSessionItemCreateManySessionInputEnvelope
    set?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
    disconnect?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
    delete?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
    connect?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
    update?: PosSessionItemUpdateWithWhereUniqueWithoutSessionInput | PosSessionItemUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: PosSessionItemUpdateManyWithWhereWithoutSessionInput | PosSessionItemUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: PosSessionItemScalarWhereInput | PosSessionItemScalarWhereInput[]
  }

  export type PosPaymentUpdateManyWithoutSessionNestedInput = {
    create?: XOR<PosPaymentCreateWithoutSessionInput, PosPaymentUncheckedCreateWithoutSessionInput> | PosPaymentCreateWithoutSessionInput[] | PosPaymentUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: PosPaymentCreateOrConnectWithoutSessionInput | PosPaymentCreateOrConnectWithoutSessionInput[]
    upsert?: PosPaymentUpsertWithWhereUniqueWithoutSessionInput | PosPaymentUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: PosPaymentCreateManySessionInputEnvelope
    set?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
    disconnect?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
    delete?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
    connect?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
    update?: PosPaymentUpdateWithWhereUniqueWithoutSessionInput | PosPaymentUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: PosPaymentUpdateManyWithWhereWithoutSessionInput | PosPaymentUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: PosPaymentScalarWhereInput | PosPaymentScalarWhereInput[]
  }

  export type PosSessionItemUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<PosSessionItemCreateWithoutSessionInput, PosSessionItemUncheckedCreateWithoutSessionInput> | PosSessionItemCreateWithoutSessionInput[] | PosSessionItemUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: PosSessionItemCreateOrConnectWithoutSessionInput | PosSessionItemCreateOrConnectWithoutSessionInput[]
    upsert?: PosSessionItemUpsertWithWhereUniqueWithoutSessionInput | PosSessionItemUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: PosSessionItemCreateManySessionInputEnvelope
    set?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
    disconnect?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
    delete?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
    connect?: PosSessionItemWhereUniqueInput | PosSessionItemWhereUniqueInput[]
    update?: PosSessionItemUpdateWithWhereUniqueWithoutSessionInput | PosSessionItemUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: PosSessionItemUpdateManyWithWhereWithoutSessionInput | PosSessionItemUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: PosSessionItemScalarWhereInput | PosSessionItemScalarWhereInput[]
  }

  export type PosPaymentUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<PosPaymentCreateWithoutSessionInput, PosPaymentUncheckedCreateWithoutSessionInput> | PosPaymentCreateWithoutSessionInput[] | PosPaymentUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: PosPaymentCreateOrConnectWithoutSessionInput | PosPaymentCreateOrConnectWithoutSessionInput[]
    upsert?: PosPaymentUpsertWithWhereUniqueWithoutSessionInput | PosPaymentUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: PosPaymentCreateManySessionInputEnvelope
    set?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
    disconnect?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
    delete?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
    connect?: PosPaymentWhereUniqueInput | PosPaymentWhereUniqueInput[]
    update?: PosPaymentUpdateWithWhereUniqueWithoutSessionInput | PosPaymentUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: PosPaymentUpdateManyWithWhereWithoutSessionInput | PosPaymentUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: PosPaymentScalarWhereInput | PosPaymentScalarWhereInput[]
  }

  export type PosSessionCreateNestedOneWithoutItemsInput = {
    create?: XOR<PosSessionCreateWithoutItemsInput, PosSessionUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PosSessionCreateOrConnectWithoutItemsInput
    connect?: PosSessionWhereUniqueInput
  }

  export type PosSessionUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<PosSessionCreateWithoutItemsInput, PosSessionUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PosSessionCreateOrConnectWithoutItemsInput
    upsert?: PosSessionUpsertWithoutItemsInput
    connect?: PosSessionWhereUniqueInput
    update?: XOR<XOR<PosSessionUpdateToOneWithWhereWithoutItemsInput, PosSessionUpdateWithoutItemsInput>, PosSessionUncheckedUpdateWithoutItemsInput>
  }

  export type PosSessionCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<PosSessionCreateWithoutPaymentsInput, PosSessionUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PosSessionCreateOrConnectWithoutPaymentsInput
    connect?: PosSessionWhereUniqueInput
  }

  export type EnumPosPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PosPaymentStatus
  }

  export type PosSessionUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<PosSessionCreateWithoutPaymentsInput, PosSessionUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PosSessionCreateOrConnectWithoutPaymentsInput
    upsert?: PosSessionUpsertWithoutPaymentsInput
    connect?: PosSessionWhereUniqueInput
    update?: XOR<XOR<PosSessionUpdateToOneWithWhereWithoutPaymentsInput, PosSessionUpdateWithoutPaymentsInput>, PosSessionUncheckedUpdateWithoutPaymentsInput>
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

  export type NestedEnumTerminalTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TerminalType | EnumTerminalTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TerminalType[] | ListEnumTerminalTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TerminalType[] | ListEnumTerminalTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTerminalTypeFilter<$PrismaModel> | $Enums.TerminalType
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

  export type NestedEnumTerminalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TerminalStatus | EnumTerminalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TerminalStatus[] | ListEnumTerminalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TerminalStatus[] | ListEnumTerminalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTerminalStatusFilter<$PrismaModel> | $Enums.TerminalStatus
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

  export type NestedEnumTerminalTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TerminalType | EnumTerminalTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TerminalType[] | ListEnumTerminalTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TerminalType[] | ListEnumTerminalTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTerminalTypeWithAggregatesFilter<$PrismaModel> | $Enums.TerminalType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTerminalTypeFilter<$PrismaModel>
    _max?: NestedEnumTerminalTypeFilter<$PrismaModel>
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

  export type NestedEnumTerminalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TerminalStatus | EnumTerminalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TerminalStatus[] | ListEnumTerminalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TerminalStatus[] | ListEnumTerminalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTerminalStatusWithAggregatesFilter<$PrismaModel> | $Enums.TerminalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTerminalStatusFilter<$PrismaModel>
    _max?: NestedEnumTerminalStatusFilter<$PrismaModel>
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

  export type NestedEnumPosSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PosSessionStatus | EnumPosSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PosSessionStatus[] | ListEnumPosSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PosSessionStatus[] | ListEnumPosSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPosSessionStatusFilter<$PrismaModel> | $Enums.PosSessionStatus
  }

  export type NestedEnumPosSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PosSessionStatus | EnumPosSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PosSessionStatus[] | ListEnumPosSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PosSessionStatus[] | ListEnumPosSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPosSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PosSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPosSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumPosSessionStatusFilter<$PrismaModel>
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

  export type NestedEnumPosPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PosPaymentStatus | EnumPosPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PosPaymentStatus[] | ListEnumPosPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PosPaymentStatus[] | ListEnumPosPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPosPaymentStatusFilter<$PrismaModel> | $Enums.PosPaymentStatus
  }

  export type NestedEnumPosPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PosPaymentStatus | EnumPosPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PosPaymentStatus[] | ListEnumPosPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PosPaymentStatus[] | ListEnumPosPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPosPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PosPaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPosPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPosPaymentStatusFilter<$PrismaModel>
  }

  export type TerminalPairingCodeCreateWithoutTerminalInput = {
    id?: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TerminalPairingCodeUncheckedCreateWithoutTerminalInput = {
    id?: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type TerminalPairingCodeCreateOrConnectWithoutTerminalInput = {
    where: TerminalPairingCodeWhereUniqueInput
    create: XOR<TerminalPairingCodeCreateWithoutTerminalInput, TerminalPairingCodeUncheckedCreateWithoutTerminalInput>
  }

  export type TerminalPairingCodeCreateManyTerminalInputEnvelope = {
    data: TerminalPairingCodeCreateManyTerminalInput | TerminalPairingCodeCreateManyTerminalInput[]
    skipDuplicates?: boolean
  }

  export type PosSessionCreateWithoutTerminalInput = {
    id?: string
    tenantId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
    items?: PosSessionItemCreateNestedManyWithoutSessionInput
    payments?: PosPaymentCreateNestedManyWithoutSessionInput
  }

  export type PosSessionUncheckedCreateWithoutTerminalInput = {
    id?: string
    tenantId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
    items?: PosSessionItemUncheckedCreateNestedManyWithoutSessionInput
    payments?: PosPaymentUncheckedCreateNestedManyWithoutSessionInput
  }

  export type PosSessionCreateOrConnectWithoutTerminalInput = {
    where: PosSessionWhereUniqueInput
    create: XOR<PosSessionCreateWithoutTerminalInput, PosSessionUncheckedCreateWithoutTerminalInput>
  }

  export type PosSessionCreateManyTerminalInputEnvelope = {
    data: PosSessionCreateManyTerminalInput | PosSessionCreateManyTerminalInput[]
    skipDuplicates?: boolean
  }

  export type TerminalPairingCodeUpsertWithWhereUniqueWithoutTerminalInput = {
    where: TerminalPairingCodeWhereUniqueInput
    update: XOR<TerminalPairingCodeUpdateWithoutTerminalInput, TerminalPairingCodeUncheckedUpdateWithoutTerminalInput>
    create: XOR<TerminalPairingCodeCreateWithoutTerminalInput, TerminalPairingCodeUncheckedCreateWithoutTerminalInput>
  }

  export type TerminalPairingCodeUpdateWithWhereUniqueWithoutTerminalInput = {
    where: TerminalPairingCodeWhereUniqueInput
    data: XOR<TerminalPairingCodeUpdateWithoutTerminalInput, TerminalPairingCodeUncheckedUpdateWithoutTerminalInput>
  }

  export type TerminalPairingCodeUpdateManyWithWhereWithoutTerminalInput = {
    where: TerminalPairingCodeScalarWhereInput
    data: XOR<TerminalPairingCodeUpdateManyMutationInput, TerminalPairingCodeUncheckedUpdateManyWithoutTerminalInput>
  }

  export type TerminalPairingCodeScalarWhereInput = {
    AND?: TerminalPairingCodeScalarWhereInput | TerminalPairingCodeScalarWhereInput[]
    OR?: TerminalPairingCodeScalarWhereInput[]
    NOT?: TerminalPairingCodeScalarWhereInput | TerminalPairingCodeScalarWhereInput[]
    id?: StringFilter<"TerminalPairingCode"> | string
    terminalId?: StringFilter<"TerminalPairingCode"> | string
    code?: StringFilter<"TerminalPairingCode"> | string
    expiresAt?: DateTimeFilter<"TerminalPairingCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"TerminalPairingCode"> | Date | string | null
    createdAt?: DateTimeFilter<"TerminalPairingCode"> | Date | string
  }

  export type PosSessionUpsertWithWhereUniqueWithoutTerminalInput = {
    where: PosSessionWhereUniqueInput
    update: XOR<PosSessionUpdateWithoutTerminalInput, PosSessionUncheckedUpdateWithoutTerminalInput>
    create: XOR<PosSessionCreateWithoutTerminalInput, PosSessionUncheckedCreateWithoutTerminalInput>
  }

  export type PosSessionUpdateWithWhereUniqueWithoutTerminalInput = {
    where: PosSessionWhereUniqueInput
    data: XOR<PosSessionUpdateWithoutTerminalInput, PosSessionUncheckedUpdateWithoutTerminalInput>
  }

  export type PosSessionUpdateManyWithWhereWithoutTerminalInput = {
    where: PosSessionScalarWhereInput
    data: XOR<PosSessionUpdateManyMutationInput, PosSessionUncheckedUpdateManyWithoutTerminalInput>
  }

  export type PosSessionScalarWhereInput = {
    AND?: PosSessionScalarWhereInput | PosSessionScalarWhereInput[]
    OR?: PosSessionScalarWhereInput[]
    NOT?: PosSessionScalarWhereInput | PosSessionScalarWhereInput[]
    id?: StringFilter<"PosSession"> | string
    tenantId?: StringFilter<"PosSession"> | string
    terminalId?: StringFilter<"PosSession"> | string
    operatorId?: StringFilter<"PosSession"> | string
    status?: EnumPosSessionStatusFilter<"PosSession"> | $Enums.PosSessionStatus
    openingCash?: IntFilter<"PosSession"> | number
    closingCash?: IntNullableFilter<"PosSession"> | number | null
    expectedTotal?: IntNullableFilter<"PosSession"> | number | null
    actualTotal?: IntNullableFilter<"PosSession"> | number | null
    variance?: IntNullableFilter<"PosSession"> | number | null
    openedAt?: DateTimeFilter<"PosSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"PosSession"> | Date | string | null
    reconciledAt?: DateTimeNullableFilter<"PosSession"> | Date | string | null
  }

  export type TerminalCreateWithoutPairingCodesInput = {
    id?: string
    tenantId: string
    locationId: string
    name: string
    code: string
    type: $Enums.TerminalType
    ipAddress?: string | null
    macAddress?: string | null
    status?: $Enums.TerminalStatus
    lastSeenAt?: Date | string | null
    deviceToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    posSessions?: PosSessionCreateNestedManyWithoutTerminalInput
  }

  export type TerminalUncheckedCreateWithoutPairingCodesInput = {
    id?: string
    tenantId: string
    locationId: string
    name: string
    code: string
    type: $Enums.TerminalType
    ipAddress?: string | null
    macAddress?: string | null
    status?: $Enums.TerminalStatus
    lastSeenAt?: Date | string | null
    deviceToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    posSessions?: PosSessionUncheckedCreateNestedManyWithoutTerminalInput
  }

  export type TerminalCreateOrConnectWithoutPairingCodesInput = {
    where: TerminalWhereUniqueInput
    create: XOR<TerminalCreateWithoutPairingCodesInput, TerminalUncheckedCreateWithoutPairingCodesInput>
  }

  export type TerminalUpsertWithoutPairingCodesInput = {
    update: XOR<TerminalUpdateWithoutPairingCodesInput, TerminalUncheckedUpdateWithoutPairingCodesInput>
    create: XOR<TerminalCreateWithoutPairingCodesInput, TerminalUncheckedCreateWithoutPairingCodesInput>
    where?: TerminalWhereInput
  }

  export type TerminalUpdateToOneWithWhereWithoutPairingCodesInput = {
    where?: TerminalWhereInput
    data: XOR<TerminalUpdateWithoutPairingCodesInput, TerminalUncheckedUpdateWithoutPairingCodesInput>
  }

  export type TerminalUpdateWithoutPairingCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumTerminalTypeFieldUpdateOperationsInput | $Enums.TerminalType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    macAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTerminalStatusFieldUpdateOperationsInput | $Enums.TerminalStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posSessions?: PosSessionUpdateManyWithoutTerminalNestedInput
  }

  export type TerminalUncheckedUpdateWithoutPairingCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumTerminalTypeFieldUpdateOperationsInput | $Enums.TerminalType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    macAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTerminalStatusFieldUpdateOperationsInput | $Enums.TerminalStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posSessions?: PosSessionUncheckedUpdateManyWithoutTerminalNestedInput
  }

  export type TerminalCreateWithoutPosSessionsInput = {
    id?: string
    tenantId: string
    locationId: string
    name: string
    code: string
    type: $Enums.TerminalType
    ipAddress?: string | null
    macAddress?: string | null
    status?: $Enums.TerminalStatus
    lastSeenAt?: Date | string | null
    deviceToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pairingCodes?: TerminalPairingCodeCreateNestedManyWithoutTerminalInput
  }

  export type TerminalUncheckedCreateWithoutPosSessionsInput = {
    id?: string
    tenantId: string
    locationId: string
    name: string
    code: string
    type: $Enums.TerminalType
    ipAddress?: string | null
    macAddress?: string | null
    status?: $Enums.TerminalStatus
    lastSeenAt?: Date | string | null
    deviceToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pairingCodes?: TerminalPairingCodeUncheckedCreateNestedManyWithoutTerminalInput
  }

  export type TerminalCreateOrConnectWithoutPosSessionsInput = {
    where: TerminalWhereUniqueInput
    create: XOR<TerminalCreateWithoutPosSessionsInput, TerminalUncheckedCreateWithoutPosSessionsInput>
  }

  export type PosSessionItemCreateWithoutSessionInput = {
    id?: string
    description: string
    quantity?: number
    unitPrice: number
    createdAt?: Date | string
  }

  export type PosSessionItemUncheckedCreateWithoutSessionInput = {
    id?: string
    description: string
    quantity?: number
    unitPrice: number
    createdAt?: Date | string
  }

  export type PosSessionItemCreateOrConnectWithoutSessionInput = {
    where: PosSessionItemWhereUniqueInput
    create: XOR<PosSessionItemCreateWithoutSessionInput, PosSessionItemUncheckedCreateWithoutSessionInput>
  }

  export type PosSessionItemCreateManySessionInputEnvelope = {
    data: PosSessionItemCreateManySessionInput | PosSessionItemCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type PosPaymentCreateWithoutSessionInput = {
    id?: string
    amount: number
    currency?: string
    status?: $Enums.PosPaymentStatus
    stripeIntentId?: string | null
    paymentIntentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PosPaymentUncheckedCreateWithoutSessionInput = {
    id?: string
    amount: number
    currency?: string
    status?: $Enums.PosPaymentStatus
    stripeIntentId?: string | null
    paymentIntentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PosPaymentCreateOrConnectWithoutSessionInput = {
    where: PosPaymentWhereUniqueInput
    create: XOR<PosPaymentCreateWithoutSessionInput, PosPaymentUncheckedCreateWithoutSessionInput>
  }

  export type PosPaymentCreateManySessionInputEnvelope = {
    data: PosPaymentCreateManySessionInput | PosPaymentCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type TerminalUpsertWithoutPosSessionsInput = {
    update: XOR<TerminalUpdateWithoutPosSessionsInput, TerminalUncheckedUpdateWithoutPosSessionsInput>
    create: XOR<TerminalCreateWithoutPosSessionsInput, TerminalUncheckedCreateWithoutPosSessionsInput>
    where?: TerminalWhereInput
  }

  export type TerminalUpdateToOneWithWhereWithoutPosSessionsInput = {
    where?: TerminalWhereInput
    data: XOR<TerminalUpdateWithoutPosSessionsInput, TerminalUncheckedUpdateWithoutPosSessionsInput>
  }

  export type TerminalUpdateWithoutPosSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumTerminalTypeFieldUpdateOperationsInput | $Enums.TerminalType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    macAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTerminalStatusFieldUpdateOperationsInput | $Enums.TerminalStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairingCodes?: TerminalPairingCodeUpdateManyWithoutTerminalNestedInput
  }

  export type TerminalUncheckedUpdateWithoutPosSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumTerminalTypeFieldUpdateOperationsInput | $Enums.TerminalType
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    macAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTerminalStatusFieldUpdateOperationsInput | $Enums.TerminalStatus
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deviceToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairingCodes?: TerminalPairingCodeUncheckedUpdateManyWithoutTerminalNestedInput
  }

  export type PosSessionItemUpsertWithWhereUniqueWithoutSessionInput = {
    where: PosSessionItemWhereUniqueInput
    update: XOR<PosSessionItemUpdateWithoutSessionInput, PosSessionItemUncheckedUpdateWithoutSessionInput>
    create: XOR<PosSessionItemCreateWithoutSessionInput, PosSessionItemUncheckedCreateWithoutSessionInput>
  }

  export type PosSessionItemUpdateWithWhereUniqueWithoutSessionInput = {
    where: PosSessionItemWhereUniqueInput
    data: XOR<PosSessionItemUpdateWithoutSessionInput, PosSessionItemUncheckedUpdateWithoutSessionInput>
  }

  export type PosSessionItemUpdateManyWithWhereWithoutSessionInput = {
    where: PosSessionItemScalarWhereInput
    data: XOR<PosSessionItemUpdateManyMutationInput, PosSessionItemUncheckedUpdateManyWithoutSessionInput>
  }

  export type PosSessionItemScalarWhereInput = {
    AND?: PosSessionItemScalarWhereInput | PosSessionItemScalarWhereInput[]
    OR?: PosSessionItemScalarWhereInput[]
    NOT?: PosSessionItemScalarWhereInput | PosSessionItemScalarWhereInput[]
    id?: StringFilter<"PosSessionItem"> | string
    sessionId?: StringFilter<"PosSessionItem"> | string
    description?: StringFilter<"PosSessionItem"> | string
    quantity?: IntFilter<"PosSessionItem"> | number
    unitPrice?: IntFilter<"PosSessionItem"> | number
    createdAt?: DateTimeFilter<"PosSessionItem"> | Date | string
  }

  export type PosPaymentUpsertWithWhereUniqueWithoutSessionInput = {
    where: PosPaymentWhereUniqueInput
    update: XOR<PosPaymentUpdateWithoutSessionInput, PosPaymentUncheckedUpdateWithoutSessionInput>
    create: XOR<PosPaymentCreateWithoutSessionInput, PosPaymentUncheckedCreateWithoutSessionInput>
  }

  export type PosPaymentUpdateWithWhereUniqueWithoutSessionInput = {
    where: PosPaymentWhereUniqueInput
    data: XOR<PosPaymentUpdateWithoutSessionInput, PosPaymentUncheckedUpdateWithoutSessionInput>
  }

  export type PosPaymentUpdateManyWithWhereWithoutSessionInput = {
    where: PosPaymentScalarWhereInput
    data: XOR<PosPaymentUpdateManyMutationInput, PosPaymentUncheckedUpdateManyWithoutSessionInput>
  }

  export type PosPaymentScalarWhereInput = {
    AND?: PosPaymentScalarWhereInput | PosPaymentScalarWhereInput[]
    OR?: PosPaymentScalarWhereInput[]
    NOT?: PosPaymentScalarWhereInput | PosPaymentScalarWhereInput[]
    id?: StringFilter<"PosPayment"> | string
    sessionId?: StringFilter<"PosPayment"> | string
    amount?: IntFilter<"PosPayment"> | number
    currency?: StringFilter<"PosPayment"> | string
    status?: EnumPosPaymentStatusFilter<"PosPayment"> | $Enums.PosPaymentStatus
    stripeIntentId?: StringNullableFilter<"PosPayment"> | string | null
    paymentIntentId?: StringNullableFilter<"PosPayment"> | string | null
    createdAt?: DateTimeFilter<"PosPayment"> | Date | string
    updatedAt?: DateTimeFilter<"PosPayment"> | Date | string
  }

  export type PosSessionCreateWithoutItemsInput = {
    id?: string
    tenantId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
    terminal: TerminalCreateNestedOneWithoutPosSessionsInput
    payments?: PosPaymentCreateNestedManyWithoutSessionInput
  }

  export type PosSessionUncheckedCreateWithoutItemsInput = {
    id?: string
    tenantId: string
    terminalId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
    payments?: PosPaymentUncheckedCreateNestedManyWithoutSessionInput
  }

  export type PosSessionCreateOrConnectWithoutItemsInput = {
    where: PosSessionWhereUniqueInput
    create: XOR<PosSessionCreateWithoutItemsInput, PosSessionUncheckedCreateWithoutItemsInput>
  }

  export type PosSessionUpsertWithoutItemsInput = {
    update: XOR<PosSessionUpdateWithoutItemsInput, PosSessionUncheckedUpdateWithoutItemsInput>
    create: XOR<PosSessionCreateWithoutItemsInput, PosSessionUncheckedCreateWithoutItemsInput>
    where?: PosSessionWhereInput
  }

  export type PosSessionUpdateToOneWithWhereWithoutItemsInput = {
    where?: PosSessionWhereInput
    data: XOR<PosSessionUpdateWithoutItemsInput, PosSessionUncheckedUpdateWithoutItemsInput>
  }

  export type PosSessionUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminal?: TerminalUpdateOneRequiredWithoutPosSessionsNestedInput
    payments?: PosPaymentUpdateManyWithoutSessionNestedInput
  }

  export type PosSessionUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    terminalId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    payments?: PosPaymentUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type PosSessionCreateWithoutPaymentsInput = {
    id?: string
    tenantId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
    terminal: TerminalCreateNestedOneWithoutPosSessionsInput
    items?: PosSessionItemCreateNestedManyWithoutSessionInput
  }

  export type PosSessionUncheckedCreateWithoutPaymentsInput = {
    id?: string
    tenantId: string
    terminalId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
    items?: PosSessionItemUncheckedCreateNestedManyWithoutSessionInput
  }

  export type PosSessionCreateOrConnectWithoutPaymentsInput = {
    where: PosSessionWhereUniqueInput
    create: XOR<PosSessionCreateWithoutPaymentsInput, PosSessionUncheckedCreateWithoutPaymentsInput>
  }

  export type PosSessionUpsertWithoutPaymentsInput = {
    update: XOR<PosSessionUpdateWithoutPaymentsInput, PosSessionUncheckedUpdateWithoutPaymentsInput>
    create: XOR<PosSessionCreateWithoutPaymentsInput, PosSessionUncheckedCreateWithoutPaymentsInput>
    where?: PosSessionWhereInput
  }

  export type PosSessionUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: PosSessionWhereInput
    data: XOR<PosSessionUpdateWithoutPaymentsInput, PosSessionUncheckedUpdateWithoutPaymentsInput>
  }

  export type PosSessionUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    terminal?: TerminalUpdateOneRequiredWithoutPosSessionsNestedInput
    items?: PosSessionItemUpdateManyWithoutSessionNestedInput
  }

  export type PosSessionUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    terminalId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    items?: PosSessionItemUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type TerminalPairingCodeCreateManyTerminalInput = {
    id?: string
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PosSessionCreateManyTerminalInput = {
    id?: string
    tenantId: string
    operatorId: string
    status?: $Enums.PosSessionStatus
    openingCash?: number
    closingCash?: number | null
    expectedTotal?: number | null
    actualTotal?: number | null
    variance?: number | null
    openedAt?: Date | string
    closedAt?: Date | string | null
    reconciledAt?: Date | string | null
  }

  export type TerminalPairingCodeUpdateWithoutTerminalInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TerminalPairingCodeUncheckedUpdateWithoutTerminalInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TerminalPairingCodeUncheckedUpdateManyWithoutTerminalInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosSessionUpdateWithoutTerminalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    items?: PosSessionItemUpdateManyWithoutSessionNestedInput
    payments?: PosPaymentUpdateManyWithoutSessionNestedInput
  }

  export type PosSessionUncheckedUpdateWithoutTerminalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    items?: PosSessionItemUncheckedUpdateManyWithoutSessionNestedInput
    payments?: PosPaymentUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type PosSessionUncheckedUpdateManyWithoutTerminalInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    operatorId?: StringFieldUpdateOperationsInput | string
    status?: EnumPosSessionStatusFieldUpdateOperationsInput | $Enums.PosSessionStatus
    openingCash?: IntFieldUpdateOperationsInput | number
    closingCash?: NullableIntFieldUpdateOperationsInput | number | null
    expectedTotal?: NullableIntFieldUpdateOperationsInput | number | null
    actualTotal?: NullableIntFieldUpdateOperationsInput | number | null
    variance?: NullableIntFieldUpdateOperationsInput | number | null
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reconciledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PosSessionItemCreateManySessionInput = {
    id?: string
    description: string
    quantity?: number
    unitPrice: number
    createdAt?: Date | string
  }

  export type PosPaymentCreateManySessionInput = {
    id?: string
    amount: number
    currency?: string
    status?: $Enums.PosPaymentStatus
    stripeIntentId?: string | null
    paymentIntentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PosSessionItemUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosSessionItemUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosSessionItemUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosPaymentUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPosPaymentStatusFieldUpdateOperationsInput | $Enums.PosPaymentStatus
    stripeIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosPaymentUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPosPaymentStatusFieldUpdateOperationsInput | $Enums.PosPaymentStatus
    stripeIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PosPaymentUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPosPaymentStatusFieldUpdateOperationsInput | $Enums.PosPaymentStatus
    stripeIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
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