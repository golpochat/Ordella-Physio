
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

}

export type TerminalType = $Enums.TerminalType

export const TerminalType: typeof $Enums.TerminalType

export type TerminalStatus = $Enums.TerminalStatus

export const TerminalStatus: typeof $Enums.TerminalStatus

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
    Terminal: 'Terminal'
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
      modelProps: "terminal"
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
    createdAt?: boolean
    updatedAt?: boolean
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
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TerminalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "locationId" | "name" | "code" | "type" | "ipAddress" | "macAddress" | "status" | "lastSeenAt" | "createdAt" | "updatedAt", ExtArgs["result"]["terminal"]>

  export type $TerminalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Terminal"
    objects: {}
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
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TerminalScalarFieldEnum = (typeof TerminalScalarFieldEnum)[keyof typeof TerminalScalarFieldEnum]


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
    createdAt?: DateTimeFilter<"Terminal"> | Date | string
    updatedAt?: DateTimeFilter<"Terminal"> | Date | string
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TerminalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
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
  }, "id" | "locationId_code">

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
    createdAt?: DateTimeWithAggregatesFilter<"Terminal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Terminal"> | Date | string
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
    createdAt?: Date | string
    updatedAt?: Date | string
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
    createdAt?: Date | string
    updatedAt?: Date | string
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
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