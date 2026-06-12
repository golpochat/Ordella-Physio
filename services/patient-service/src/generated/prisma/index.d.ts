
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
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model PatientInsurance
 * 
 */
export type PatientInsurance = $Result.DefaultSelection<Prisma.$PatientInsurancePayload>
/**
 * Model MedicalRecord
 * 
 */
export type MedicalRecord = $Result.DefaultSelection<Prisma.$MedicalRecordPayload>
/**
 * Model PatientNote
 * 
 */
export type PatientNote = $Result.DefaultSelection<Prisma.$PatientNotePayload>
/**
 * Model PatientAttachment
 * 
 */
export type PatientAttachment = $Result.DefaultSelection<Prisma.$PatientAttachmentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  UNKNOWN: 'UNKNOWN'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const PatientStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type PatientStatus = (typeof PatientStatus)[keyof typeof PatientStatus]


export const PatientNoteType: {
  GENERAL: 'GENERAL',
  DIAGNOSIS: 'DIAGNOSIS',
  TREATMENT: 'TREATMENT',
  FOLLOW_UP: 'FOLLOW_UP',
  PHYSIOTHERAPY: 'PHYSIOTHERAPY',
  NURSING: 'NURSING'
};

export type PatientNoteType = (typeof PatientNoteType)[keyof typeof PatientNoteType]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type PatientStatus = $Enums.PatientStatus

export const PatientStatus: typeof $Enums.PatientStatus

export type PatientNoteType = $Enums.PatientNoteType

export const PatientNoteType: typeof $Enums.PatientNoteType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Patients
 * const patients = await prisma.patient.findMany()
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
   * // Fetch zero or more Patients
   * const patients = await prisma.patient.findMany()
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
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientInsurance`: Exposes CRUD operations for the **PatientInsurance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientInsurances
    * const patientInsurances = await prisma.patientInsurance.findMany()
    * ```
    */
  get patientInsurance(): Prisma.PatientInsuranceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicalRecord`: Exposes CRUD operations for the **MedicalRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicalRecords
    * const medicalRecords = await prisma.medicalRecord.findMany()
    * ```
    */
  get medicalRecord(): Prisma.MedicalRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientNote`: Exposes CRUD operations for the **PatientNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientNotes
    * const patientNotes = await prisma.patientNote.findMany()
    * ```
    */
  get patientNote(): Prisma.PatientNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientAttachment`: Exposes CRUD operations for the **PatientAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientAttachments
    * const patientAttachments = await prisma.patientAttachment.findMany()
    * ```
    */
  get patientAttachment(): Prisma.PatientAttachmentDelegate<ExtArgs, ClientOptions>;
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
    Patient: 'Patient',
    PatientInsurance: 'PatientInsurance',
    MedicalRecord: 'MedicalRecord',
    PatientNote: 'PatientNote',
    PatientAttachment: 'PatientAttachment'
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
      modelProps: "patient" | "patientInsurance" | "medicalRecord" | "patientNote" | "patientAttachment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      PatientInsurance: {
        payload: Prisma.$PatientInsurancePayload<ExtArgs>
        fields: Prisma.PatientInsuranceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientInsuranceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientInsuranceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>
          }
          findFirst: {
            args: Prisma.PatientInsuranceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientInsuranceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>
          }
          findMany: {
            args: Prisma.PatientInsuranceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>[]
          }
          create: {
            args: Prisma.PatientInsuranceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>
          }
          createMany: {
            args: Prisma.PatientInsuranceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientInsuranceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>[]
          }
          delete: {
            args: Prisma.PatientInsuranceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>
          }
          update: {
            args: Prisma.PatientInsuranceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>
          }
          deleteMany: {
            args: Prisma.PatientInsuranceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientInsuranceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientInsuranceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>[]
          }
          upsert: {
            args: Prisma.PatientInsuranceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientInsurancePayload>
          }
          aggregate: {
            args: Prisma.PatientInsuranceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientInsurance>
          }
          groupBy: {
            args: Prisma.PatientInsuranceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientInsuranceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientInsuranceCountArgs<ExtArgs>
            result: $Utils.Optional<PatientInsuranceCountAggregateOutputType> | number
          }
        }
      }
      MedicalRecord: {
        payload: Prisma.$MedicalRecordPayload<ExtArgs>
        fields: Prisma.MedicalRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicalRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicalRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          findFirst: {
            args: Prisma.MedicalRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicalRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          findMany: {
            args: Prisma.MedicalRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[]
          }
          create: {
            args: Prisma.MedicalRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          createMany: {
            args: Prisma.MedicalRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicalRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[]
          }
          delete: {
            args: Prisma.MedicalRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          update: {
            args: Prisma.MedicalRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          deleteMany: {
            args: Prisma.MedicalRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicalRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicalRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[]
          }
          upsert: {
            args: Prisma.MedicalRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          aggregate: {
            args: Prisma.MedicalRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicalRecord>
          }
          groupBy: {
            args: Prisma.MedicalRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicalRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicalRecordCountArgs<ExtArgs>
            result: $Utils.Optional<MedicalRecordCountAggregateOutputType> | number
          }
        }
      }
      PatientNote: {
        payload: Prisma.$PatientNotePayload<ExtArgs>
        fields: Prisma.PatientNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>
          }
          findFirst: {
            args: Prisma.PatientNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>
          }
          findMany: {
            args: Prisma.PatientNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>[]
          }
          create: {
            args: Prisma.PatientNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>
          }
          createMany: {
            args: Prisma.PatientNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>[]
          }
          delete: {
            args: Prisma.PatientNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>
          }
          update: {
            args: Prisma.PatientNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>
          }
          deleteMany: {
            args: Prisma.PatientNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>[]
          }
          upsert: {
            args: Prisma.PatientNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientNotePayload>
          }
          aggregate: {
            args: Prisma.PatientNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientNote>
          }
          groupBy: {
            args: Prisma.PatientNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientNoteCountArgs<ExtArgs>
            result: $Utils.Optional<PatientNoteCountAggregateOutputType> | number
          }
        }
      }
      PatientAttachment: {
        payload: Prisma.$PatientAttachmentPayload<ExtArgs>
        fields: Prisma.PatientAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>
          }
          findFirst: {
            args: Prisma.PatientAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>
          }
          findMany: {
            args: Prisma.PatientAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>[]
          }
          create: {
            args: Prisma.PatientAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>
          }
          createMany: {
            args: Prisma.PatientAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>[]
          }
          delete: {
            args: Prisma.PatientAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>
          }
          update: {
            args: Prisma.PatientAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.PatientAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.PatientAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientAttachmentPayload>
          }
          aggregate: {
            args: Prisma.PatientAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientAttachment>
          }
          groupBy: {
            args: Prisma.PatientAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<PatientAttachmentCountAggregateOutputType> | number
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
    patient?: PatientOmit
    patientInsurance?: PatientInsuranceOmit
    medicalRecord?: MedicalRecordOmit
    patientNote?: PatientNoteOmit
    patientAttachment?: PatientAttachmentOmit
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
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    patientNotes: number
    patientAttachments: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patientNotes?: boolean | PatientCountOutputTypeCountPatientNotesArgs
    patientAttachments?: boolean | PatientCountOutputTypeCountPatientAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountPatientNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientNoteWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountPatientAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientAttachmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender | null
    bloodGroup: string | null
    address: string | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    country: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    status: $Enums.PatientStatus | null
    notes: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender | null
    bloodGroup: string | null
    address: string | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    country: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    status: $Enums.PatientStatus | null
    notes: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    tenantId: number
    firstName: number
    lastName: number
    email: number
    phone: number
    dateOfBirth: number
    gender: number
    bloodGroup: number
    address: number
    addressLine1: number
    addressLine2: number
    city: number
    state: number
    postalCode: number
    country: number
    emergencyContactName: number
    emergencyContactPhone: number
    status: number
    notes: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientMinAggregateInputType = {
    id?: true
    tenantId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    dateOfBirth?: true
    gender?: true
    bloodGroup?: true
    address?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    status?: true
    notes?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    tenantId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    dateOfBirth?: true
    gender?: true
    bloodGroup?: true
    address?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    status?: true
    notes?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    tenantId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    dateOfBirth?: true
    gender?: true
    bloodGroup?: true
    address?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    status?: true
    notes?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    tenantId: string
    firstName: string
    lastName: string
    email: string | null
    phone: string | null
    dateOfBirth: Date | null
    gender: $Enums.Gender
    bloodGroup: string | null
    address: string | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    country: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    status: $Enums.PatientStatus
    notes: string | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    bloodGroup?: boolean
    address?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    status?: boolean
    notes?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    medicalRecord?: boolean | Patient$medicalRecordArgs<ExtArgs>
    insurance?: boolean | Patient$insuranceArgs<ExtArgs>
    patientNotes?: boolean | Patient$patientNotesArgs<ExtArgs>
    patientAttachments?: boolean | Patient$patientAttachmentsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    bloodGroup?: boolean
    address?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    status?: boolean
    notes?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    bloodGroup?: boolean
    address?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    status?: boolean
    notes?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    tenantId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    bloodGroup?: boolean
    address?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    status?: boolean
    notes?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "firstName" | "lastName" | "email" | "phone" | "dateOfBirth" | "gender" | "bloodGroup" | "address" | "addressLine1" | "addressLine2" | "city" | "state" | "postalCode" | "country" | "emergencyContactName" | "emergencyContactPhone" | "status" | "notes" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalRecord?: boolean | Patient$medicalRecordArgs<ExtArgs>
    insurance?: boolean | Patient$insuranceArgs<ExtArgs>
    patientNotes?: boolean | Patient$patientNotesArgs<ExtArgs>
    patientAttachments?: boolean | Patient$patientAttachmentsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      medicalRecord: Prisma.$MedicalRecordPayload<ExtArgs> | null
      insurance: Prisma.$PatientInsurancePayload<ExtArgs> | null
      patientNotes: Prisma.$PatientNotePayload<ExtArgs>[]
      patientAttachments: Prisma.$PatientAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      firstName: string
      lastName: string
      email: string | null
      phone: string | null
      dateOfBirth: Date | null
      gender: $Enums.Gender
      bloodGroup: string | null
      address: string | null
      addressLine1: string | null
      addressLine2: string | null
      city: string | null
      state: string | null
      postalCode: string | null
      country: string | null
      emergencyContactName: string | null
      emergencyContactPhone: string | null
      status: $Enums.PatientStatus
      notes: string | null
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
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
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medicalRecord<T extends Patient$medicalRecordArgs<ExtArgs> = {}>(args?: Subset<T, Patient$medicalRecordArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    insurance<T extends Patient$insuranceArgs<ExtArgs> = {}>(args?: Subset<T, Patient$insuranceArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    patientNotes<T extends Patient$patientNotesArgs<ExtArgs> = {}>(args?: Subset<T, Patient$patientNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    patientAttachments<T extends Patient$patientAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$patientAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly tenantId: FieldRef<"Patient", 'String'>
    readonly firstName: FieldRef<"Patient", 'String'>
    readonly lastName: FieldRef<"Patient", 'String'>
    readonly email: FieldRef<"Patient", 'String'>
    readonly phone: FieldRef<"Patient", 'String'>
    readonly dateOfBirth: FieldRef<"Patient", 'DateTime'>
    readonly gender: FieldRef<"Patient", 'Gender'>
    readonly bloodGroup: FieldRef<"Patient", 'String'>
    readonly address: FieldRef<"Patient", 'String'>
    readonly addressLine1: FieldRef<"Patient", 'String'>
    readonly addressLine2: FieldRef<"Patient", 'String'>
    readonly city: FieldRef<"Patient", 'String'>
    readonly state: FieldRef<"Patient", 'String'>
    readonly postalCode: FieldRef<"Patient", 'String'>
    readonly country: FieldRef<"Patient", 'String'>
    readonly emergencyContactName: FieldRef<"Patient", 'String'>
    readonly emergencyContactPhone: FieldRef<"Patient", 'String'>
    readonly status: FieldRef<"Patient", 'PatientStatus'>
    readonly notes: FieldRef<"Patient", 'String'>
    readonly deletedAt: FieldRef<"Patient", 'DateTime'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.medicalRecord
   */
  export type Patient$medicalRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    where?: MedicalRecordWhereInput
  }

  /**
   * Patient.insurance
   */
  export type Patient$insuranceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    where?: PatientInsuranceWhereInput
  }

  /**
   * Patient.patientNotes
   */
  export type Patient$patientNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    where?: PatientNoteWhereInput
    orderBy?: PatientNoteOrderByWithRelationInput | PatientNoteOrderByWithRelationInput[]
    cursor?: PatientNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientNoteScalarFieldEnum | PatientNoteScalarFieldEnum[]
  }

  /**
   * Patient.patientAttachments
   */
  export type Patient$patientAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    where?: PatientAttachmentWhereInput
    orderBy?: PatientAttachmentOrderByWithRelationInput | PatientAttachmentOrderByWithRelationInput[]
    cursor?: PatientAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientAttachmentScalarFieldEnum | PatientAttachmentScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model PatientInsurance
   */

  export type AggregatePatientInsurance = {
    _count: PatientInsuranceCountAggregateOutputType | null
    _min: PatientInsuranceMinAggregateOutputType | null
    _max: PatientInsuranceMaxAggregateOutputType | null
  }

  export type PatientInsuranceMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    providerName: string | null
    policyNumber: string | null
    expiryDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientInsuranceMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    providerName: string | null
    policyNumber: string | null
    expiryDate: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientInsuranceCountAggregateOutputType = {
    id: number
    patientId: number
    providerName: number
    policyNumber: number
    expiryDate: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientInsuranceMinAggregateInputType = {
    id?: true
    patientId?: true
    providerName?: true
    policyNumber?: true
    expiryDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientInsuranceMaxAggregateInputType = {
    id?: true
    patientId?: true
    providerName?: true
    policyNumber?: true
    expiryDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientInsuranceCountAggregateInputType = {
    id?: true
    patientId?: true
    providerName?: true
    policyNumber?: true
    expiryDate?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientInsuranceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientInsurance to aggregate.
     */
    where?: PatientInsuranceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientInsurances to fetch.
     */
    orderBy?: PatientInsuranceOrderByWithRelationInput | PatientInsuranceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientInsuranceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientInsurances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientInsurances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientInsurances
    **/
    _count?: true | PatientInsuranceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientInsuranceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientInsuranceMaxAggregateInputType
  }

  export type GetPatientInsuranceAggregateType<T extends PatientInsuranceAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientInsurance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientInsurance[P]>
      : GetScalarType<T[P], AggregatePatientInsurance[P]>
  }




  export type PatientInsuranceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientInsuranceWhereInput
    orderBy?: PatientInsuranceOrderByWithAggregationInput | PatientInsuranceOrderByWithAggregationInput[]
    by: PatientInsuranceScalarFieldEnum[] | PatientInsuranceScalarFieldEnum
    having?: PatientInsuranceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientInsuranceCountAggregateInputType | true
    _min?: PatientInsuranceMinAggregateInputType
    _max?: PatientInsuranceMaxAggregateInputType
  }

  export type PatientInsuranceGroupByOutputType = {
    id: string
    patientId: string
    providerName: string
    policyNumber: string
    expiryDate: Date
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: PatientInsuranceCountAggregateOutputType | null
    _min: PatientInsuranceMinAggregateOutputType | null
    _max: PatientInsuranceMaxAggregateOutputType | null
  }

  type GetPatientInsuranceGroupByPayload<T extends PatientInsuranceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientInsuranceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientInsuranceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientInsuranceGroupByOutputType[P]>
            : GetScalarType<T[P], PatientInsuranceGroupByOutputType[P]>
        }
      >
    >


  export type PatientInsuranceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    providerName?: boolean
    policyNumber?: boolean
    expiryDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientInsurance"]>

  export type PatientInsuranceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    providerName?: boolean
    policyNumber?: boolean
    expiryDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientInsurance"]>

  export type PatientInsuranceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    providerName?: boolean
    policyNumber?: boolean
    expiryDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientInsurance"]>

  export type PatientInsuranceSelectScalar = {
    id?: boolean
    patientId?: boolean
    providerName?: boolean
    policyNumber?: boolean
    expiryDate?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientInsuranceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "providerName" | "policyNumber" | "expiryDate" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["patientInsurance"]>
  export type PatientInsuranceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PatientInsuranceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PatientInsuranceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $PatientInsurancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientInsurance"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      providerName: string
      policyNumber: string
      expiryDate: Date
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patientInsurance"]>
    composites: {}
  }

  type PatientInsuranceGetPayload<S extends boolean | null | undefined | PatientInsuranceDefaultArgs> = $Result.GetResult<Prisma.$PatientInsurancePayload, S>

  type PatientInsuranceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientInsuranceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientInsuranceCountAggregateInputType | true
    }

  export interface PatientInsuranceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientInsurance'], meta: { name: 'PatientInsurance' } }
    /**
     * Find zero or one PatientInsurance that matches the filter.
     * @param {PatientInsuranceFindUniqueArgs} args - Arguments to find a PatientInsurance
     * @example
     * // Get one PatientInsurance
     * const patientInsurance = await prisma.patientInsurance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientInsuranceFindUniqueArgs>(args: SelectSubset<T, PatientInsuranceFindUniqueArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientInsurance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientInsuranceFindUniqueOrThrowArgs} args - Arguments to find a PatientInsurance
     * @example
     * // Get one PatientInsurance
     * const patientInsurance = await prisma.patientInsurance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientInsuranceFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientInsuranceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientInsurance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInsuranceFindFirstArgs} args - Arguments to find a PatientInsurance
     * @example
     * // Get one PatientInsurance
     * const patientInsurance = await prisma.patientInsurance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientInsuranceFindFirstArgs>(args?: SelectSubset<T, PatientInsuranceFindFirstArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientInsurance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInsuranceFindFirstOrThrowArgs} args - Arguments to find a PatientInsurance
     * @example
     * // Get one PatientInsurance
     * const patientInsurance = await prisma.patientInsurance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientInsuranceFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientInsuranceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientInsurances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInsuranceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientInsurances
     * const patientInsurances = await prisma.patientInsurance.findMany()
     * 
     * // Get first 10 PatientInsurances
     * const patientInsurances = await prisma.patientInsurance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientInsuranceWithIdOnly = await prisma.patientInsurance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientInsuranceFindManyArgs>(args?: SelectSubset<T, PatientInsuranceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientInsurance.
     * @param {PatientInsuranceCreateArgs} args - Arguments to create a PatientInsurance.
     * @example
     * // Create one PatientInsurance
     * const PatientInsurance = await prisma.patientInsurance.create({
     *   data: {
     *     // ... data to create a PatientInsurance
     *   }
     * })
     * 
     */
    create<T extends PatientInsuranceCreateArgs>(args: SelectSubset<T, PatientInsuranceCreateArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientInsurances.
     * @param {PatientInsuranceCreateManyArgs} args - Arguments to create many PatientInsurances.
     * @example
     * // Create many PatientInsurances
     * const patientInsurance = await prisma.patientInsurance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientInsuranceCreateManyArgs>(args?: SelectSubset<T, PatientInsuranceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatientInsurances and returns the data saved in the database.
     * @param {PatientInsuranceCreateManyAndReturnArgs} args - Arguments to create many PatientInsurances.
     * @example
     * // Create many PatientInsurances
     * const patientInsurance = await prisma.patientInsurance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatientInsurances and only return the `id`
     * const patientInsuranceWithIdOnly = await prisma.patientInsurance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientInsuranceCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientInsuranceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PatientInsurance.
     * @param {PatientInsuranceDeleteArgs} args - Arguments to delete one PatientInsurance.
     * @example
     * // Delete one PatientInsurance
     * const PatientInsurance = await prisma.patientInsurance.delete({
     *   where: {
     *     // ... filter to delete one PatientInsurance
     *   }
     * })
     * 
     */
    delete<T extends PatientInsuranceDeleteArgs>(args: SelectSubset<T, PatientInsuranceDeleteArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientInsurance.
     * @param {PatientInsuranceUpdateArgs} args - Arguments to update one PatientInsurance.
     * @example
     * // Update one PatientInsurance
     * const patientInsurance = await prisma.patientInsurance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientInsuranceUpdateArgs>(args: SelectSubset<T, PatientInsuranceUpdateArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientInsurances.
     * @param {PatientInsuranceDeleteManyArgs} args - Arguments to filter PatientInsurances to delete.
     * @example
     * // Delete a few PatientInsurances
     * const { count } = await prisma.patientInsurance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientInsuranceDeleteManyArgs>(args?: SelectSubset<T, PatientInsuranceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientInsurances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInsuranceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientInsurances
     * const patientInsurance = await prisma.patientInsurance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientInsuranceUpdateManyArgs>(args: SelectSubset<T, PatientInsuranceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientInsurances and returns the data updated in the database.
     * @param {PatientInsuranceUpdateManyAndReturnArgs} args - Arguments to update many PatientInsurances.
     * @example
     * // Update many PatientInsurances
     * const patientInsurance = await prisma.patientInsurance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatientInsurances and only return the `id`
     * const patientInsuranceWithIdOnly = await prisma.patientInsurance.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientInsuranceUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientInsuranceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PatientInsurance.
     * @param {PatientInsuranceUpsertArgs} args - Arguments to update or create a PatientInsurance.
     * @example
     * // Update or create a PatientInsurance
     * const patientInsurance = await prisma.patientInsurance.upsert({
     *   create: {
     *     // ... data to create a PatientInsurance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientInsurance we want to update
     *   }
     * })
     */
    upsert<T extends PatientInsuranceUpsertArgs>(args: SelectSubset<T, PatientInsuranceUpsertArgs<ExtArgs>>): Prisma__PatientInsuranceClient<$Result.GetResult<Prisma.$PatientInsurancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientInsurances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInsuranceCountArgs} args - Arguments to filter PatientInsurances to count.
     * @example
     * // Count the number of PatientInsurances
     * const count = await prisma.patientInsurance.count({
     *   where: {
     *     // ... the filter for the PatientInsurances we want to count
     *   }
     * })
    **/
    count<T extends PatientInsuranceCountArgs>(
      args?: Subset<T, PatientInsuranceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientInsuranceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientInsurance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInsuranceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientInsuranceAggregateArgs>(args: Subset<T, PatientInsuranceAggregateArgs>): Prisma.PrismaPromise<GetPatientInsuranceAggregateType<T>>

    /**
     * Group by PatientInsurance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientInsuranceGroupByArgs} args - Group by arguments.
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
      T extends PatientInsuranceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientInsuranceGroupByArgs['orderBy'] }
        : { orderBy?: PatientInsuranceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PatientInsuranceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientInsuranceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientInsurance model
   */
  readonly fields: PatientInsuranceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientInsurance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientInsuranceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PatientInsurance model
   */
  interface PatientInsuranceFieldRefs {
    readonly id: FieldRef<"PatientInsurance", 'String'>
    readonly patientId: FieldRef<"PatientInsurance", 'String'>
    readonly providerName: FieldRef<"PatientInsurance", 'String'>
    readonly policyNumber: FieldRef<"PatientInsurance", 'String'>
    readonly expiryDate: FieldRef<"PatientInsurance", 'DateTime'>
    readonly notes: FieldRef<"PatientInsurance", 'String'>
    readonly createdAt: FieldRef<"PatientInsurance", 'DateTime'>
    readonly updatedAt: FieldRef<"PatientInsurance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PatientInsurance findUnique
   */
  export type PatientInsuranceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * Filter, which PatientInsurance to fetch.
     */
    where: PatientInsuranceWhereUniqueInput
  }

  /**
   * PatientInsurance findUniqueOrThrow
   */
  export type PatientInsuranceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * Filter, which PatientInsurance to fetch.
     */
    where: PatientInsuranceWhereUniqueInput
  }

  /**
   * PatientInsurance findFirst
   */
  export type PatientInsuranceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * Filter, which PatientInsurance to fetch.
     */
    where?: PatientInsuranceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientInsurances to fetch.
     */
    orderBy?: PatientInsuranceOrderByWithRelationInput | PatientInsuranceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientInsurances.
     */
    cursor?: PatientInsuranceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientInsurances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientInsurances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientInsurances.
     */
    distinct?: PatientInsuranceScalarFieldEnum | PatientInsuranceScalarFieldEnum[]
  }

  /**
   * PatientInsurance findFirstOrThrow
   */
  export type PatientInsuranceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * Filter, which PatientInsurance to fetch.
     */
    where?: PatientInsuranceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientInsurances to fetch.
     */
    orderBy?: PatientInsuranceOrderByWithRelationInput | PatientInsuranceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientInsurances.
     */
    cursor?: PatientInsuranceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientInsurances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientInsurances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientInsurances.
     */
    distinct?: PatientInsuranceScalarFieldEnum | PatientInsuranceScalarFieldEnum[]
  }

  /**
   * PatientInsurance findMany
   */
  export type PatientInsuranceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * Filter, which PatientInsurances to fetch.
     */
    where?: PatientInsuranceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientInsurances to fetch.
     */
    orderBy?: PatientInsuranceOrderByWithRelationInput | PatientInsuranceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientInsurances.
     */
    cursor?: PatientInsuranceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientInsurances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientInsurances.
     */
    skip?: number
    distinct?: PatientInsuranceScalarFieldEnum | PatientInsuranceScalarFieldEnum[]
  }

  /**
   * PatientInsurance create
   */
  export type PatientInsuranceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientInsurance.
     */
    data: XOR<PatientInsuranceCreateInput, PatientInsuranceUncheckedCreateInput>
  }

  /**
   * PatientInsurance createMany
   */
  export type PatientInsuranceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientInsurances.
     */
    data: PatientInsuranceCreateManyInput | PatientInsuranceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientInsurance createManyAndReturn
   */
  export type PatientInsuranceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * The data used to create many PatientInsurances.
     */
    data: PatientInsuranceCreateManyInput | PatientInsuranceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientInsurance update
   */
  export type PatientInsuranceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientInsurance.
     */
    data: XOR<PatientInsuranceUpdateInput, PatientInsuranceUncheckedUpdateInput>
    /**
     * Choose, which PatientInsurance to update.
     */
    where: PatientInsuranceWhereUniqueInput
  }

  /**
   * PatientInsurance updateMany
   */
  export type PatientInsuranceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientInsurances.
     */
    data: XOR<PatientInsuranceUpdateManyMutationInput, PatientInsuranceUncheckedUpdateManyInput>
    /**
     * Filter which PatientInsurances to update
     */
    where?: PatientInsuranceWhereInput
    /**
     * Limit how many PatientInsurances to update.
     */
    limit?: number
  }

  /**
   * PatientInsurance updateManyAndReturn
   */
  export type PatientInsuranceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * The data used to update PatientInsurances.
     */
    data: XOR<PatientInsuranceUpdateManyMutationInput, PatientInsuranceUncheckedUpdateManyInput>
    /**
     * Filter which PatientInsurances to update
     */
    where?: PatientInsuranceWhereInput
    /**
     * Limit how many PatientInsurances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientInsurance upsert
   */
  export type PatientInsuranceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientInsurance to update in case it exists.
     */
    where: PatientInsuranceWhereUniqueInput
    /**
     * In case the PatientInsurance found by the `where` argument doesn't exist, create a new PatientInsurance with this data.
     */
    create: XOR<PatientInsuranceCreateInput, PatientInsuranceUncheckedCreateInput>
    /**
     * In case the PatientInsurance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientInsuranceUpdateInput, PatientInsuranceUncheckedUpdateInput>
  }

  /**
   * PatientInsurance delete
   */
  export type PatientInsuranceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
    /**
     * Filter which PatientInsurance to delete.
     */
    where: PatientInsuranceWhereUniqueInput
  }

  /**
   * PatientInsurance deleteMany
   */
  export type PatientInsuranceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientInsurances to delete
     */
    where?: PatientInsuranceWhereInput
    /**
     * Limit how many PatientInsurances to delete.
     */
    limit?: number
  }

  /**
   * PatientInsurance without action
   */
  export type PatientInsuranceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientInsurance
     */
    select?: PatientInsuranceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientInsurance
     */
    omit?: PatientInsuranceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInsuranceInclude<ExtArgs> | null
  }


  /**
   * Model MedicalRecord
   */

  export type AggregateMedicalRecord = {
    _count: MedicalRecordCountAggregateOutputType | null
    _min: MedicalRecordMinAggregateOutputType | null
    _max: MedicalRecordMaxAggregateOutputType | null
  }

  export type MedicalRecordMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    tenantId: string | null
    allergies: string | null
    medications: string | null
    conditions: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MedicalRecordMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    tenantId: string | null
    allergies: string | null
    medications: string | null
    conditions: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MedicalRecordCountAggregateOutputType = {
    id: number
    patientId: number
    tenantId: number
    allergies: number
    medications: number
    conditions: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MedicalRecordMinAggregateInputType = {
    id?: true
    patientId?: true
    tenantId?: true
    allergies?: true
    medications?: true
    conditions?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MedicalRecordMaxAggregateInputType = {
    id?: true
    patientId?: true
    tenantId?: true
    allergies?: true
    medications?: true
    conditions?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MedicalRecordCountAggregateInputType = {
    id?: true
    patientId?: true
    tenantId?: true
    allergies?: true
    medications?: true
    conditions?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MedicalRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalRecord to aggregate.
     */
    where?: MedicalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalRecords to fetch.
     */
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicalRecords
    **/
    _count?: true | MedicalRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicalRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicalRecordMaxAggregateInputType
  }

  export type GetMedicalRecordAggregateType<T extends MedicalRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalRecord[P]>
      : GetScalarType<T[P], AggregateMedicalRecord[P]>
  }




  export type MedicalRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalRecordWhereInput
    orderBy?: MedicalRecordOrderByWithAggregationInput | MedicalRecordOrderByWithAggregationInput[]
    by: MedicalRecordScalarFieldEnum[] | MedicalRecordScalarFieldEnum
    having?: MedicalRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicalRecordCountAggregateInputType | true
    _min?: MedicalRecordMinAggregateInputType
    _max?: MedicalRecordMaxAggregateInputType
  }

  export type MedicalRecordGroupByOutputType = {
    id: string
    patientId: string
    tenantId: string
    allergies: string | null
    medications: string | null
    conditions: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: MedicalRecordCountAggregateOutputType | null
    _min: MedicalRecordMinAggregateOutputType | null
    _max: MedicalRecordMaxAggregateOutputType | null
  }

  type GetMedicalRecordGroupByPayload<T extends MedicalRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicalRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicalRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicalRecordGroupByOutputType[P]>
            : GetScalarType<T[P], MedicalRecordGroupByOutputType[P]>
        }
      >
    >


  export type MedicalRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    tenantId?: boolean
    allergies?: boolean
    medications?: boolean
    conditions?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalRecord"]>

  export type MedicalRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    tenantId?: boolean
    allergies?: boolean
    medications?: boolean
    conditions?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalRecord"]>

  export type MedicalRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    tenantId?: boolean
    allergies?: boolean
    medications?: boolean
    conditions?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalRecord"]>

  export type MedicalRecordSelectScalar = {
    id?: boolean
    patientId?: boolean
    tenantId?: boolean
    allergies?: boolean
    medications?: boolean
    conditions?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MedicalRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "tenantId" | "allergies" | "medications" | "conditions" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["medicalRecord"]>
  export type MedicalRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type MedicalRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type MedicalRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $MedicalRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalRecord"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      tenantId: string
      allergies: string | null
      medications: string | null
      conditions: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["medicalRecord"]>
    composites: {}
  }

  type MedicalRecordGetPayload<S extends boolean | null | undefined | MedicalRecordDefaultArgs> = $Result.GetResult<Prisma.$MedicalRecordPayload, S>

  type MedicalRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicalRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicalRecordCountAggregateInputType | true
    }

  export interface MedicalRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicalRecord'], meta: { name: 'MedicalRecord' } }
    /**
     * Find zero or one MedicalRecord that matches the filter.
     * @param {MedicalRecordFindUniqueArgs} args - Arguments to find a MedicalRecord
     * @example
     * // Get one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicalRecordFindUniqueArgs>(args: SelectSubset<T, MedicalRecordFindUniqueArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicalRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicalRecordFindUniqueOrThrowArgs} args - Arguments to find a MedicalRecord
     * @example
     * // Get one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicalRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicalRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordFindFirstArgs} args - Arguments to find a MedicalRecord
     * @example
     * // Get one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicalRecordFindFirstArgs>(args?: SelectSubset<T, MedicalRecordFindFirstArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordFindFirstOrThrowArgs} args - Arguments to find a MedicalRecord
     * @example
     * // Get one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicalRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicalRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicalRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicalRecords
     * const medicalRecords = await prisma.medicalRecord.findMany()
     * 
     * // Get first 10 MedicalRecords
     * const medicalRecords = await prisma.medicalRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicalRecordWithIdOnly = await prisma.medicalRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicalRecordFindManyArgs>(args?: SelectSubset<T, MedicalRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicalRecord.
     * @param {MedicalRecordCreateArgs} args - Arguments to create a MedicalRecord.
     * @example
     * // Create one MedicalRecord
     * const MedicalRecord = await prisma.medicalRecord.create({
     *   data: {
     *     // ... data to create a MedicalRecord
     *   }
     * })
     * 
     */
    create<T extends MedicalRecordCreateArgs>(args: SelectSubset<T, MedicalRecordCreateArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicalRecords.
     * @param {MedicalRecordCreateManyArgs} args - Arguments to create many MedicalRecords.
     * @example
     * // Create many MedicalRecords
     * const medicalRecord = await prisma.medicalRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicalRecordCreateManyArgs>(args?: SelectSubset<T, MedicalRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicalRecords and returns the data saved in the database.
     * @param {MedicalRecordCreateManyAndReturnArgs} args - Arguments to create many MedicalRecords.
     * @example
     * // Create many MedicalRecords
     * const medicalRecord = await prisma.medicalRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicalRecords and only return the `id`
     * const medicalRecordWithIdOnly = await prisma.medicalRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicalRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicalRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicalRecord.
     * @param {MedicalRecordDeleteArgs} args - Arguments to delete one MedicalRecord.
     * @example
     * // Delete one MedicalRecord
     * const MedicalRecord = await prisma.medicalRecord.delete({
     *   where: {
     *     // ... filter to delete one MedicalRecord
     *   }
     * })
     * 
     */
    delete<T extends MedicalRecordDeleteArgs>(args: SelectSubset<T, MedicalRecordDeleteArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicalRecord.
     * @param {MedicalRecordUpdateArgs} args - Arguments to update one MedicalRecord.
     * @example
     * // Update one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicalRecordUpdateArgs>(args: SelectSubset<T, MedicalRecordUpdateArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicalRecords.
     * @param {MedicalRecordDeleteManyArgs} args - Arguments to filter MedicalRecords to delete.
     * @example
     * // Delete a few MedicalRecords
     * const { count } = await prisma.medicalRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicalRecordDeleteManyArgs>(args?: SelectSubset<T, MedicalRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicalRecords
     * const medicalRecord = await prisma.medicalRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicalRecordUpdateManyArgs>(args: SelectSubset<T, MedicalRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalRecords and returns the data updated in the database.
     * @param {MedicalRecordUpdateManyAndReturnArgs} args - Arguments to update many MedicalRecords.
     * @example
     * // Update many MedicalRecords
     * const medicalRecord = await prisma.medicalRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicalRecords and only return the `id`
     * const medicalRecordWithIdOnly = await prisma.medicalRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends MedicalRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicalRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicalRecord.
     * @param {MedicalRecordUpsertArgs} args - Arguments to update or create a MedicalRecord.
     * @example
     * // Update or create a MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.upsert({
     *   create: {
     *     // ... data to create a MedicalRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicalRecord we want to update
     *   }
     * })
     */
    upsert<T extends MedicalRecordUpsertArgs>(args: SelectSubset<T, MedicalRecordUpsertArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicalRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordCountArgs} args - Arguments to filter MedicalRecords to count.
     * @example
     * // Count the number of MedicalRecords
     * const count = await prisma.medicalRecord.count({
     *   where: {
     *     // ... the filter for the MedicalRecords we want to count
     *   }
     * })
    **/
    count<T extends MedicalRecordCountArgs>(
      args?: Subset<T, MedicalRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicalRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicalRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicalRecordAggregateArgs>(args: Subset<T, MedicalRecordAggregateArgs>): Prisma.PrismaPromise<GetMedicalRecordAggregateType<T>>

    /**
     * Group by MedicalRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordGroupByArgs} args - Group by arguments.
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
      T extends MedicalRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicalRecordGroupByArgs['orderBy'] }
        : { orderBy?: MedicalRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MedicalRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicalRecord model
   */
  readonly fields: MedicalRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicalRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicalRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MedicalRecord model
   */
  interface MedicalRecordFieldRefs {
    readonly id: FieldRef<"MedicalRecord", 'String'>
    readonly patientId: FieldRef<"MedicalRecord", 'String'>
    readonly tenantId: FieldRef<"MedicalRecord", 'String'>
    readonly allergies: FieldRef<"MedicalRecord", 'String'>
    readonly medications: FieldRef<"MedicalRecord", 'String'>
    readonly conditions: FieldRef<"MedicalRecord", 'String'>
    readonly notes: FieldRef<"MedicalRecord", 'String'>
    readonly createdAt: FieldRef<"MedicalRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"MedicalRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MedicalRecord findUnique
   */
  export type MedicalRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecord to fetch.
     */
    where: MedicalRecordWhereUniqueInput
  }

  /**
   * MedicalRecord findUniqueOrThrow
   */
  export type MedicalRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecord to fetch.
     */
    where: MedicalRecordWhereUniqueInput
  }

  /**
   * MedicalRecord findFirst
   */
  export type MedicalRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecord to fetch.
     */
    where?: MedicalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalRecords to fetch.
     */
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalRecords.
     */
    cursor?: MedicalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalRecords.
     */
    distinct?: MedicalRecordScalarFieldEnum | MedicalRecordScalarFieldEnum[]
  }

  /**
   * MedicalRecord findFirstOrThrow
   */
  export type MedicalRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecord to fetch.
     */
    where?: MedicalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalRecords to fetch.
     */
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalRecords.
     */
    cursor?: MedicalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalRecords.
     */
    distinct?: MedicalRecordScalarFieldEnum | MedicalRecordScalarFieldEnum[]
  }

  /**
   * MedicalRecord findMany
   */
  export type MedicalRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecords to fetch.
     */
    where?: MedicalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalRecords to fetch.
     */
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicalRecords.
     */
    cursor?: MedicalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalRecords.
     */
    skip?: number
    distinct?: MedicalRecordScalarFieldEnum | MedicalRecordScalarFieldEnum[]
  }

  /**
   * MedicalRecord create
   */
  export type MedicalRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicalRecord.
     */
    data: XOR<MedicalRecordCreateInput, MedicalRecordUncheckedCreateInput>
  }

  /**
   * MedicalRecord createMany
   */
  export type MedicalRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicalRecords.
     */
    data: MedicalRecordCreateManyInput | MedicalRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicalRecord createManyAndReturn
   */
  export type MedicalRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * The data used to create many MedicalRecords.
     */
    data: MedicalRecordCreateManyInput | MedicalRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalRecord update
   */
  export type MedicalRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicalRecord.
     */
    data: XOR<MedicalRecordUpdateInput, MedicalRecordUncheckedUpdateInput>
    /**
     * Choose, which MedicalRecord to update.
     */
    where: MedicalRecordWhereUniqueInput
  }

  /**
   * MedicalRecord updateMany
   */
  export type MedicalRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicalRecords.
     */
    data: XOR<MedicalRecordUpdateManyMutationInput, MedicalRecordUncheckedUpdateManyInput>
    /**
     * Filter which MedicalRecords to update
     */
    where?: MedicalRecordWhereInput
    /**
     * Limit how many MedicalRecords to update.
     */
    limit?: number
  }

  /**
   * MedicalRecord updateManyAndReturn
   */
  export type MedicalRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * The data used to update MedicalRecords.
     */
    data: XOR<MedicalRecordUpdateManyMutationInput, MedicalRecordUncheckedUpdateManyInput>
    /**
     * Filter which MedicalRecords to update
     */
    where?: MedicalRecordWhereInput
    /**
     * Limit how many MedicalRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalRecord upsert
   */
  export type MedicalRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicalRecord to update in case it exists.
     */
    where: MedicalRecordWhereUniqueInput
    /**
     * In case the MedicalRecord found by the `where` argument doesn't exist, create a new MedicalRecord with this data.
     */
    create: XOR<MedicalRecordCreateInput, MedicalRecordUncheckedCreateInput>
    /**
     * In case the MedicalRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicalRecordUpdateInput, MedicalRecordUncheckedUpdateInput>
  }

  /**
   * MedicalRecord delete
   */
  export type MedicalRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter which MedicalRecord to delete.
     */
    where: MedicalRecordWhereUniqueInput
  }

  /**
   * MedicalRecord deleteMany
   */
  export type MedicalRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalRecords to delete
     */
    where?: MedicalRecordWhereInput
    /**
     * Limit how many MedicalRecords to delete.
     */
    limit?: number
  }

  /**
   * MedicalRecord without action
   */
  export type MedicalRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
  }


  /**
   * Model PatientNote
   */

  export type AggregatePatientNote = {
    _count: PatientNoteCountAggregateOutputType | null
    _min: PatientNoteMinAggregateOutputType | null
    _max: PatientNoteMaxAggregateOutputType | null
  }

  export type PatientNoteMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    patientId: string | null
    staffId: string | null
    noteType: $Enums.PatientNoteType | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientNoteMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    patientId: string | null
    staffId: string | null
    noteType: $Enums.PatientNoteType | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientNoteCountAggregateOutputType = {
    id: number
    tenantId: number
    patientId: number
    staffId: number
    noteType: number
    title: number
    content: number
    attachments: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientNoteMinAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    staffId?: true
    noteType?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientNoteMaxAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    staffId?: true
    noteType?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientNoteCountAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    staffId?: true
    noteType?: true
    title?: true
    content?: true
    attachments?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientNote to aggregate.
     */
    where?: PatientNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientNotes to fetch.
     */
    orderBy?: PatientNoteOrderByWithRelationInput | PatientNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientNotes
    **/
    _count?: true | PatientNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientNoteMaxAggregateInputType
  }

  export type GetPatientNoteAggregateType<T extends PatientNoteAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientNote[P]>
      : GetScalarType<T[P], AggregatePatientNote[P]>
  }




  export type PatientNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientNoteWhereInput
    orderBy?: PatientNoteOrderByWithAggregationInput | PatientNoteOrderByWithAggregationInput[]
    by: PatientNoteScalarFieldEnum[] | PatientNoteScalarFieldEnum
    having?: PatientNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientNoteCountAggregateInputType | true
    _min?: PatientNoteMinAggregateInputType
    _max?: PatientNoteMaxAggregateInputType
  }

  export type PatientNoteGroupByOutputType = {
    id: string
    tenantId: string
    patientId: string
    staffId: string
    noteType: $Enums.PatientNoteType
    title: string
    content: string
    attachments: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PatientNoteCountAggregateOutputType | null
    _min: PatientNoteMinAggregateOutputType | null
    _max: PatientNoteMaxAggregateOutputType | null
  }

  type GetPatientNoteGroupByPayload<T extends PatientNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientNoteGroupByOutputType[P]>
            : GetScalarType<T[P], PatientNoteGroupByOutputType[P]>
        }
      >
    >


  export type PatientNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    staffId?: boolean
    noteType?: boolean
    title?: boolean
    content?: boolean
    attachments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientNote"]>

  export type PatientNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    staffId?: boolean
    noteType?: boolean
    title?: boolean
    content?: boolean
    attachments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientNote"]>

  export type PatientNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    staffId?: boolean
    noteType?: boolean
    title?: boolean
    content?: boolean
    attachments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientNote"]>

  export type PatientNoteSelectScalar = {
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    staffId?: boolean
    noteType?: boolean
    title?: boolean
    content?: boolean
    attachments?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "patientId" | "staffId" | "noteType" | "title" | "content" | "attachments" | "createdAt" | "updatedAt", ExtArgs["result"]["patientNote"]>
  export type PatientNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PatientNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PatientNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $PatientNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientNote"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      patientId: string
      staffId: string
      noteType: $Enums.PatientNoteType
      title: string
      content: string
      attachments: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patientNote"]>
    composites: {}
  }

  type PatientNoteGetPayload<S extends boolean | null | undefined | PatientNoteDefaultArgs> = $Result.GetResult<Prisma.$PatientNotePayload, S>

  type PatientNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientNoteCountAggregateInputType | true
    }

  export interface PatientNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientNote'], meta: { name: 'PatientNote' } }
    /**
     * Find zero or one PatientNote that matches the filter.
     * @param {PatientNoteFindUniqueArgs} args - Arguments to find a PatientNote
     * @example
     * // Get one PatientNote
     * const patientNote = await prisma.patientNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientNoteFindUniqueArgs>(args: SelectSubset<T, PatientNoteFindUniqueArgs<ExtArgs>>): Prisma__PatientNoteClient<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientNoteFindUniqueOrThrowArgs} args - Arguments to find a PatientNote
     * @example
     * // Get one PatientNote
     * const patientNote = await prisma.patientNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientNoteClient<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientNoteFindFirstArgs} args - Arguments to find a PatientNote
     * @example
     * // Get one PatientNote
     * const patientNote = await prisma.patientNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientNoteFindFirstArgs>(args?: SelectSubset<T, PatientNoteFindFirstArgs<ExtArgs>>): Prisma__PatientNoteClient<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientNoteFindFirstOrThrowArgs} args - Arguments to find a PatientNote
     * @example
     * // Get one PatientNote
     * const patientNote = await prisma.patientNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientNoteClient<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientNotes
     * const patientNotes = await prisma.patientNote.findMany()
     * 
     * // Get first 10 PatientNotes
     * const patientNotes = await prisma.patientNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientNoteWithIdOnly = await prisma.patientNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientNoteFindManyArgs>(args?: SelectSubset<T, PatientNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientNote.
     * @param {PatientNoteCreateArgs} args - Arguments to create a PatientNote.
     * @example
     * // Create one PatientNote
     * const PatientNote = await prisma.patientNote.create({
     *   data: {
     *     // ... data to create a PatientNote
     *   }
     * })
     * 
     */
    create<T extends PatientNoteCreateArgs>(args: SelectSubset<T, PatientNoteCreateArgs<ExtArgs>>): Prisma__PatientNoteClient<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientNotes.
     * @param {PatientNoteCreateManyArgs} args - Arguments to create many PatientNotes.
     * @example
     * // Create many PatientNotes
     * const patientNote = await prisma.patientNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientNoteCreateManyArgs>(args?: SelectSubset<T, PatientNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatientNotes and returns the data saved in the database.
     * @param {PatientNoteCreateManyAndReturnArgs} args - Arguments to create many PatientNotes.
     * @example
     * // Create many PatientNotes
     * const patientNote = await prisma.patientNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatientNotes and only return the `id`
     * const patientNoteWithIdOnly = await prisma.patientNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PatientNote.
     * @param {PatientNoteDeleteArgs} args - Arguments to delete one PatientNote.
     * @example
     * // Delete one PatientNote
     * const PatientNote = await prisma.patientNote.delete({
     *   where: {
     *     // ... filter to delete one PatientNote
     *   }
     * })
     * 
     */
    delete<T extends PatientNoteDeleteArgs>(args: SelectSubset<T, PatientNoteDeleteArgs<ExtArgs>>): Prisma__PatientNoteClient<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientNote.
     * @param {PatientNoteUpdateArgs} args - Arguments to update one PatientNote.
     * @example
     * // Update one PatientNote
     * const patientNote = await prisma.patientNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientNoteUpdateArgs>(args: SelectSubset<T, PatientNoteUpdateArgs<ExtArgs>>): Prisma__PatientNoteClient<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientNotes.
     * @param {PatientNoteDeleteManyArgs} args - Arguments to filter PatientNotes to delete.
     * @example
     * // Delete a few PatientNotes
     * const { count } = await prisma.patientNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientNoteDeleteManyArgs>(args?: SelectSubset<T, PatientNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientNotes
     * const patientNote = await prisma.patientNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientNoteUpdateManyArgs>(args: SelectSubset<T, PatientNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientNotes and returns the data updated in the database.
     * @param {PatientNoteUpdateManyAndReturnArgs} args - Arguments to update many PatientNotes.
     * @example
     * // Update many PatientNotes
     * const patientNote = await prisma.patientNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatientNotes and only return the `id`
     * const patientNoteWithIdOnly = await prisma.patientNote.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PatientNote.
     * @param {PatientNoteUpsertArgs} args - Arguments to update or create a PatientNote.
     * @example
     * // Update or create a PatientNote
     * const patientNote = await prisma.patientNote.upsert({
     *   create: {
     *     // ... data to create a PatientNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientNote we want to update
     *   }
     * })
     */
    upsert<T extends PatientNoteUpsertArgs>(args: SelectSubset<T, PatientNoteUpsertArgs<ExtArgs>>): Prisma__PatientNoteClient<$Result.GetResult<Prisma.$PatientNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientNoteCountArgs} args - Arguments to filter PatientNotes to count.
     * @example
     * // Count the number of PatientNotes
     * const count = await prisma.patientNote.count({
     *   where: {
     *     // ... the filter for the PatientNotes we want to count
     *   }
     * })
    **/
    count<T extends PatientNoteCountArgs>(
      args?: Subset<T, PatientNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientNoteAggregateArgs>(args: Subset<T, PatientNoteAggregateArgs>): Prisma.PrismaPromise<GetPatientNoteAggregateType<T>>

    /**
     * Group by PatientNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientNoteGroupByArgs} args - Group by arguments.
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
      T extends PatientNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientNoteGroupByArgs['orderBy'] }
        : { orderBy?: PatientNoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PatientNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientNote model
   */
  readonly fields: PatientNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PatientNote model
   */
  interface PatientNoteFieldRefs {
    readonly id: FieldRef<"PatientNote", 'String'>
    readonly tenantId: FieldRef<"PatientNote", 'String'>
    readonly patientId: FieldRef<"PatientNote", 'String'>
    readonly staffId: FieldRef<"PatientNote", 'String'>
    readonly noteType: FieldRef<"PatientNote", 'PatientNoteType'>
    readonly title: FieldRef<"PatientNote", 'String'>
    readonly content: FieldRef<"PatientNote", 'String'>
    readonly attachments: FieldRef<"PatientNote", 'Json'>
    readonly createdAt: FieldRef<"PatientNote", 'DateTime'>
    readonly updatedAt: FieldRef<"PatientNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PatientNote findUnique
   */
  export type PatientNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * Filter, which PatientNote to fetch.
     */
    where: PatientNoteWhereUniqueInput
  }

  /**
   * PatientNote findUniqueOrThrow
   */
  export type PatientNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * Filter, which PatientNote to fetch.
     */
    where: PatientNoteWhereUniqueInput
  }

  /**
   * PatientNote findFirst
   */
  export type PatientNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * Filter, which PatientNote to fetch.
     */
    where?: PatientNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientNotes to fetch.
     */
    orderBy?: PatientNoteOrderByWithRelationInput | PatientNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientNotes.
     */
    cursor?: PatientNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientNotes.
     */
    distinct?: PatientNoteScalarFieldEnum | PatientNoteScalarFieldEnum[]
  }

  /**
   * PatientNote findFirstOrThrow
   */
  export type PatientNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * Filter, which PatientNote to fetch.
     */
    where?: PatientNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientNotes to fetch.
     */
    orderBy?: PatientNoteOrderByWithRelationInput | PatientNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientNotes.
     */
    cursor?: PatientNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientNotes.
     */
    distinct?: PatientNoteScalarFieldEnum | PatientNoteScalarFieldEnum[]
  }

  /**
   * PatientNote findMany
   */
  export type PatientNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * Filter, which PatientNotes to fetch.
     */
    where?: PatientNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientNotes to fetch.
     */
    orderBy?: PatientNoteOrderByWithRelationInput | PatientNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientNotes.
     */
    cursor?: PatientNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientNotes.
     */
    skip?: number
    distinct?: PatientNoteScalarFieldEnum | PatientNoteScalarFieldEnum[]
  }

  /**
   * PatientNote create
   */
  export type PatientNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientNote.
     */
    data: XOR<PatientNoteCreateInput, PatientNoteUncheckedCreateInput>
  }

  /**
   * PatientNote createMany
   */
  export type PatientNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientNotes.
     */
    data: PatientNoteCreateManyInput | PatientNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientNote createManyAndReturn
   */
  export type PatientNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * The data used to create many PatientNotes.
     */
    data: PatientNoteCreateManyInput | PatientNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientNote update
   */
  export type PatientNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientNote.
     */
    data: XOR<PatientNoteUpdateInput, PatientNoteUncheckedUpdateInput>
    /**
     * Choose, which PatientNote to update.
     */
    where: PatientNoteWhereUniqueInput
  }

  /**
   * PatientNote updateMany
   */
  export type PatientNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientNotes.
     */
    data: XOR<PatientNoteUpdateManyMutationInput, PatientNoteUncheckedUpdateManyInput>
    /**
     * Filter which PatientNotes to update
     */
    where?: PatientNoteWhereInput
    /**
     * Limit how many PatientNotes to update.
     */
    limit?: number
  }

  /**
   * PatientNote updateManyAndReturn
   */
  export type PatientNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * The data used to update PatientNotes.
     */
    data: XOR<PatientNoteUpdateManyMutationInput, PatientNoteUncheckedUpdateManyInput>
    /**
     * Filter which PatientNotes to update
     */
    where?: PatientNoteWhereInput
    /**
     * Limit how many PatientNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientNote upsert
   */
  export type PatientNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientNote to update in case it exists.
     */
    where: PatientNoteWhereUniqueInput
    /**
     * In case the PatientNote found by the `where` argument doesn't exist, create a new PatientNote with this data.
     */
    create: XOR<PatientNoteCreateInput, PatientNoteUncheckedCreateInput>
    /**
     * In case the PatientNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientNoteUpdateInput, PatientNoteUncheckedUpdateInput>
  }

  /**
   * PatientNote delete
   */
  export type PatientNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
    /**
     * Filter which PatientNote to delete.
     */
    where: PatientNoteWhereUniqueInput
  }

  /**
   * PatientNote deleteMany
   */
  export type PatientNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientNotes to delete
     */
    where?: PatientNoteWhereInput
    /**
     * Limit how many PatientNotes to delete.
     */
    limit?: number
  }

  /**
   * PatientNote without action
   */
  export type PatientNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientNote
     */
    select?: PatientNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientNote
     */
    omit?: PatientNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientNoteInclude<ExtArgs> | null
  }


  /**
   * Model PatientAttachment
   */

  export type AggregatePatientAttachment = {
    _count: PatientAttachmentCountAggregateOutputType | null
    _avg: PatientAttachmentAvgAggregateOutputType | null
    _sum: PatientAttachmentSumAggregateOutputType | null
    _min: PatientAttachmentMinAggregateOutputType | null
    _max: PatientAttachmentMaxAggregateOutputType | null
  }

  export type PatientAttachmentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type PatientAttachmentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type PatientAttachmentMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    patientId: string | null
    uploadedByStaffId: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    storagePath: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PatientAttachmentMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    patientId: string | null
    uploadedByStaffId: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    storagePath: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PatientAttachmentCountAggregateOutputType = {
    id: number
    tenantId: number
    patientId: number
    uploadedByStaffId: number
    fileName: number
    fileType: number
    fileSize: number
    storagePath: number
    description: number
    createdAt: number
    _all: number
  }


  export type PatientAttachmentAvgAggregateInputType = {
    fileSize?: true
  }

  export type PatientAttachmentSumAggregateInputType = {
    fileSize?: true
  }

  export type PatientAttachmentMinAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    uploadedByStaffId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    storagePath?: true
    description?: true
    createdAt?: true
  }

  export type PatientAttachmentMaxAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    uploadedByStaffId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    storagePath?: true
    description?: true
    createdAt?: true
  }

  export type PatientAttachmentCountAggregateInputType = {
    id?: true
    tenantId?: true
    patientId?: true
    uploadedByStaffId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    storagePath?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type PatientAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientAttachment to aggregate.
     */
    where?: PatientAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientAttachments to fetch.
     */
    orderBy?: PatientAttachmentOrderByWithRelationInput | PatientAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientAttachments
    **/
    _count?: true | PatientAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PatientAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PatientAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientAttachmentMaxAggregateInputType
  }

  export type GetPatientAttachmentAggregateType<T extends PatientAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientAttachment[P]>
      : GetScalarType<T[P], AggregatePatientAttachment[P]>
  }




  export type PatientAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientAttachmentWhereInput
    orderBy?: PatientAttachmentOrderByWithAggregationInput | PatientAttachmentOrderByWithAggregationInput[]
    by: PatientAttachmentScalarFieldEnum[] | PatientAttachmentScalarFieldEnum
    having?: PatientAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientAttachmentCountAggregateInputType | true
    _avg?: PatientAttachmentAvgAggregateInputType
    _sum?: PatientAttachmentSumAggregateInputType
    _min?: PatientAttachmentMinAggregateInputType
    _max?: PatientAttachmentMaxAggregateInputType
  }

  export type PatientAttachmentGroupByOutputType = {
    id: string
    tenantId: string
    patientId: string
    uploadedByStaffId: string
    fileName: string
    fileType: string
    fileSize: number
    storagePath: string
    description: string | null
    createdAt: Date
    _count: PatientAttachmentCountAggregateOutputType | null
    _avg: PatientAttachmentAvgAggregateOutputType | null
    _sum: PatientAttachmentSumAggregateOutputType | null
    _min: PatientAttachmentMinAggregateOutputType | null
    _max: PatientAttachmentMaxAggregateOutputType | null
  }

  type GetPatientAttachmentGroupByPayload<T extends PatientAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], PatientAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type PatientAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    uploadedByStaffId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    storagePath?: boolean
    description?: boolean
    createdAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientAttachment"]>

  export type PatientAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    uploadedByStaffId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    storagePath?: boolean
    description?: boolean
    createdAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientAttachment"]>

  export type PatientAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    uploadedByStaffId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    storagePath?: boolean
    description?: boolean
    createdAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientAttachment"]>

  export type PatientAttachmentSelectScalar = {
    id?: boolean
    tenantId?: boolean
    patientId?: boolean
    uploadedByStaffId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    storagePath?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type PatientAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenantId" | "patientId" | "uploadedByStaffId" | "fileName" | "fileType" | "fileSize" | "storagePath" | "description" | "createdAt", ExtArgs["result"]["patientAttachment"]>
  export type PatientAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PatientAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PatientAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $PatientAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientAttachment"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      patientId: string
      uploadedByStaffId: string
      fileName: string
      fileType: string
      fileSize: number
      storagePath: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["patientAttachment"]>
    composites: {}
  }

  type PatientAttachmentGetPayload<S extends boolean | null | undefined | PatientAttachmentDefaultArgs> = $Result.GetResult<Prisma.$PatientAttachmentPayload, S>

  type PatientAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientAttachmentCountAggregateInputType | true
    }

  export interface PatientAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientAttachment'], meta: { name: 'PatientAttachment' } }
    /**
     * Find zero or one PatientAttachment that matches the filter.
     * @param {PatientAttachmentFindUniqueArgs} args - Arguments to find a PatientAttachment
     * @example
     * // Get one PatientAttachment
     * const patientAttachment = await prisma.patientAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientAttachmentFindUniqueArgs>(args: SelectSubset<T, PatientAttachmentFindUniqueArgs<ExtArgs>>): Prisma__PatientAttachmentClient<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientAttachmentFindUniqueOrThrowArgs} args - Arguments to find a PatientAttachment
     * @example
     * // Get one PatientAttachment
     * const patientAttachment = await prisma.patientAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientAttachmentClient<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAttachmentFindFirstArgs} args - Arguments to find a PatientAttachment
     * @example
     * // Get one PatientAttachment
     * const patientAttachment = await prisma.patientAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientAttachmentFindFirstArgs>(args?: SelectSubset<T, PatientAttachmentFindFirstArgs<ExtArgs>>): Prisma__PatientAttachmentClient<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAttachmentFindFirstOrThrowArgs} args - Arguments to find a PatientAttachment
     * @example
     * // Get one PatientAttachment
     * const patientAttachment = await prisma.patientAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientAttachmentClient<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientAttachments
     * const patientAttachments = await prisma.patientAttachment.findMany()
     * 
     * // Get first 10 PatientAttachments
     * const patientAttachments = await prisma.patientAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientAttachmentWithIdOnly = await prisma.patientAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientAttachmentFindManyArgs>(args?: SelectSubset<T, PatientAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientAttachment.
     * @param {PatientAttachmentCreateArgs} args - Arguments to create a PatientAttachment.
     * @example
     * // Create one PatientAttachment
     * const PatientAttachment = await prisma.patientAttachment.create({
     *   data: {
     *     // ... data to create a PatientAttachment
     *   }
     * })
     * 
     */
    create<T extends PatientAttachmentCreateArgs>(args: SelectSubset<T, PatientAttachmentCreateArgs<ExtArgs>>): Prisma__PatientAttachmentClient<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientAttachments.
     * @param {PatientAttachmentCreateManyArgs} args - Arguments to create many PatientAttachments.
     * @example
     * // Create many PatientAttachments
     * const patientAttachment = await prisma.patientAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientAttachmentCreateManyArgs>(args?: SelectSubset<T, PatientAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatientAttachments and returns the data saved in the database.
     * @param {PatientAttachmentCreateManyAndReturnArgs} args - Arguments to create many PatientAttachments.
     * @example
     * // Create many PatientAttachments
     * const patientAttachment = await prisma.patientAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatientAttachments and only return the `id`
     * const patientAttachmentWithIdOnly = await prisma.patientAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PatientAttachment.
     * @param {PatientAttachmentDeleteArgs} args - Arguments to delete one PatientAttachment.
     * @example
     * // Delete one PatientAttachment
     * const PatientAttachment = await prisma.patientAttachment.delete({
     *   where: {
     *     // ... filter to delete one PatientAttachment
     *   }
     * })
     * 
     */
    delete<T extends PatientAttachmentDeleteArgs>(args: SelectSubset<T, PatientAttachmentDeleteArgs<ExtArgs>>): Prisma__PatientAttachmentClient<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientAttachment.
     * @param {PatientAttachmentUpdateArgs} args - Arguments to update one PatientAttachment.
     * @example
     * // Update one PatientAttachment
     * const patientAttachment = await prisma.patientAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientAttachmentUpdateArgs>(args: SelectSubset<T, PatientAttachmentUpdateArgs<ExtArgs>>): Prisma__PatientAttachmentClient<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientAttachments.
     * @param {PatientAttachmentDeleteManyArgs} args - Arguments to filter PatientAttachments to delete.
     * @example
     * // Delete a few PatientAttachments
     * const { count } = await prisma.patientAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientAttachmentDeleteManyArgs>(args?: SelectSubset<T, PatientAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientAttachments
     * const patientAttachment = await prisma.patientAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientAttachmentUpdateManyArgs>(args: SelectSubset<T, PatientAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientAttachments and returns the data updated in the database.
     * @param {PatientAttachmentUpdateManyAndReturnArgs} args - Arguments to update many PatientAttachments.
     * @example
     * // Update many PatientAttachments
     * const patientAttachment = await prisma.patientAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatientAttachments and only return the `id`
     * const patientAttachmentWithIdOnly = await prisma.patientAttachment.updateManyAndReturn({
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
    updateManyAndReturn<T extends PatientAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PatientAttachment.
     * @param {PatientAttachmentUpsertArgs} args - Arguments to update or create a PatientAttachment.
     * @example
     * // Update or create a PatientAttachment
     * const patientAttachment = await prisma.patientAttachment.upsert({
     *   create: {
     *     // ... data to create a PatientAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientAttachment we want to update
     *   }
     * })
     */
    upsert<T extends PatientAttachmentUpsertArgs>(args: SelectSubset<T, PatientAttachmentUpsertArgs<ExtArgs>>): Prisma__PatientAttachmentClient<$Result.GetResult<Prisma.$PatientAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAttachmentCountArgs} args - Arguments to filter PatientAttachments to count.
     * @example
     * // Count the number of PatientAttachments
     * const count = await prisma.patientAttachment.count({
     *   where: {
     *     // ... the filter for the PatientAttachments we want to count
     *   }
     * })
    **/
    count<T extends PatientAttachmentCountArgs>(
      args?: Subset<T, PatientAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientAttachmentAggregateArgs>(args: Subset<T, PatientAttachmentAggregateArgs>): Prisma.PrismaPromise<GetPatientAttachmentAggregateType<T>>

    /**
     * Group by PatientAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAttachmentGroupByArgs} args - Group by arguments.
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
      T extends PatientAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: PatientAttachmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PatientAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientAttachment model
   */
  readonly fields: PatientAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PatientAttachment model
   */
  interface PatientAttachmentFieldRefs {
    readonly id: FieldRef<"PatientAttachment", 'String'>
    readonly tenantId: FieldRef<"PatientAttachment", 'String'>
    readonly patientId: FieldRef<"PatientAttachment", 'String'>
    readonly uploadedByStaffId: FieldRef<"PatientAttachment", 'String'>
    readonly fileName: FieldRef<"PatientAttachment", 'String'>
    readonly fileType: FieldRef<"PatientAttachment", 'String'>
    readonly fileSize: FieldRef<"PatientAttachment", 'Int'>
    readonly storagePath: FieldRef<"PatientAttachment", 'String'>
    readonly description: FieldRef<"PatientAttachment", 'String'>
    readonly createdAt: FieldRef<"PatientAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PatientAttachment findUnique
   */
  export type PatientAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PatientAttachment to fetch.
     */
    where: PatientAttachmentWhereUniqueInput
  }

  /**
   * PatientAttachment findUniqueOrThrow
   */
  export type PatientAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PatientAttachment to fetch.
     */
    where: PatientAttachmentWhereUniqueInput
  }

  /**
   * PatientAttachment findFirst
   */
  export type PatientAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PatientAttachment to fetch.
     */
    where?: PatientAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientAttachments to fetch.
     */
    orderBy?: PatientAttachmentOrderByWithRelationInput | PatientAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientAttachments.
     */
    cursor?: PatientAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientAttachments.
     */
    distinct?: PatientAttachmentScalarFieldEnum | PatientAttachmentScalarFieldEnum[]
  }

  /**
   * PatientAttachment findFirstOrThrow
   */
  export type PatientAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PatientAttachment to fetch.
     */
    where?: PatientAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientAttachments to fetch.
     */
    orderBy?: PatientAttachmentOrderByWithRelationInput | PatientAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientAttachments.
     */
    cursor?: PatientAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientAttachments.
     */
    distinct?: PatientAttachmentScalarFieldEnum | PatientAttachmentScalarFieldEnum[]
  }

  /**
   * PatientAttachment findMany
   */
  export type PatientAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PatientAttachments to fetch.
     */
    where?: PatientAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientAttachments to fetch.
     */
    orderBy?: PatientAttachmentOrderByWithRelationInput | PatientAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientAttachments.
     */
    cursor?: PatientAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientAttachments.
     */
    skip?: number
    distinct?: PatientAttachmentScalarFieldEnum | PatientAttachmentScalarFieldEnum[]
  }

  /**
   * PatientAttachment create
   */
  export type PatientAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientAttachment.
     */
    data: XOR<PatientAttachmentCreateInput, PatientAttachmentUncheckedCreateInput>
  }

  /**
   * PatientAttachment createMany
   */
  export type PatientAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientAttachments.
     */
    data: PatientAttachmentCreateManyInput | PatientAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientAttachment createManyAndReturn
   */
  export type PatientAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many PatientAttachments.
     */
    data: PatientAttachmentCreateManyInput | PatientAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientAttachment update
   */
  export type PatientAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientAttachment.
     */
    data: XOR<PatientAttachmentUpdateInput, PatientAttachmentUncheckedUpdateInput>
    /**
     * Choose, which PatientAttachment to update.
     */
    where: PatientAttachmentWhereUniqueInput
  }

  /**
   * PatientAttachment updateMany
   */
  export type PatientAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientAttachments.
     */
    data: XOR<PatientAttachmentUpdateManyMutationInput, PatientAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which PatientAttachments to update
     */
    where?: PatientAttachmentWhereInput
    /**
     * Limit how many PatientAttachments to update.
     */
    limit?: number
  }

  /**
   * PatientAttachment updateManyAndReturn
   */
  export type PatientAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update PatientAttachments.
     */
    data: XOR<PatientAttachmentUpdateManyMutationInput, PatientAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which PatientAttachments to update
     */
    where?: PatientAttachmentWhereInput
    /**
     * Limit how many PatientAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientAttachment upsert
   */
  export type PatientAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientAttachment to update in case it exists.
     */
    where: PatientAttachmentWhereUniqueInput
    /**
     * In case the PatientAttachment found by the `where` argument doesn't exist, create a new PatientAttachment with this data.
     */
    create: XOR<PatientAttachmentCreateInput, PatientAttachmentUncheckedCreateInput>
    /**
     * In case the PatientAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientAttachmentUpdateInput, PatientAttachmentUncheckedUpdateInput>
  }

  /**
   * PatientAttachment delete
   */
  export type PatientAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
    /**
     * Filter which PatientAttachment to delete.
     */
    where: PatientAttachmentWhereUniqueInput
  }

  /**
   * PatientAttachment deleteMany
   */
  export type PatientAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientAttachments to delete
     */
    where?: PatientAttachmentWhereInput
    /**
     * Limit how many PatientAttachments to delete.
     */
    limit?: number
  }

  /**
   * PatientAttachment without action
   */
  export type PatientAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientAttachment
     */
    select?: PatientAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientAttachment
     */
    omit?: PatientAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientAttachmentInclude<ExtArgs> | null
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


  export const PatientScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    bloodGroup: 'bloodGroup',
    address: 'address',
    addressLine1: 'addressLine1',
    addressLine2: 'addressLine2',
    city: 'city',
    state: 'state',
    postalCode: 'postalCode',
    country: 'country',
    emergencyContactName: 'emergencyContactName',
    emergencyContactPhone: 'emergencyContactPhone',
    status: 'status',
    notes: 'notes',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const PatientInsuranceScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    providerName: 'providerName',
    policyNumber: 'policyNumber',
    expiryDate: 'expiryDate',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientInsuranceScalarFieldEnum = (typeof PatientInsuranceScalarFieldEnum)[keyof typeof PatientInsuranceScalarFieldEnum]


  export const MedicalRecordScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    tenantId: 'tenantId',
    allergies: 'allergies',
    medications: 'medications',
    conditions: 'conditions',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MedicalRecordScalarFieldEnum = (typeof MedicalRecordScalarFieldEnum)[keyof typeof MedicalRecordScalarFieldEnum]


  export const PatientNoteScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    patientId: 'patientId',
    staffId: 'staffId',
    noteType: 'noteType',
    title: 'title',
    content: 'content',
    attachments: 'attachments',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientNoteScalarFieldEnum = (typeof PatientNoteScalarFieldEnum)[keyof typeof PatientNoteScalarFieldEnum]


  export const PatientAttachmentScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    patientId: 'patientId',
    uploadedByStaffId: 'uploadedByStaffId',
    fileName: 'fileName',
    fileType: 'fileType',
    fileSize: 'fileSize',
    storagePath: 'storagePath',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type PatientAttachmentScalarFieldEnum = (typeof PatientAttachmentScalarFieldEnum)[keyof typeof PatientAttachmentScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'PatientStatus'
   */
  export type EnumPatientStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PatientStatus'>
    


  /**
   * Reference to a field of type 'PatientStatus[]'
   */
  export type ListEnumPatientStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PatientStatus[]'>
    


  /**
   * Reference to a field of type 'PatientNoteType'
   */
  export type EnumPatientNoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PatientNoteType'>
    


  /**
   * Reference to a field of type 'PatientNoteType[]'
   */
  export type ListEnumPatientNoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PatientNoteType[]'>
    


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


  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    tenantId?: StringFilter<"Patient"> | string
    firstName?: StringFilter<"Patient"> | string
    lastName?: StringFilter<"Patient"> | string
    email?: StringNullableFilter<"Patient"> | string | null
    phone?: StringNullableFilter<"Patient"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Patient"> | Date | string | null
    gender?: EnumGenderFilter<"Patient"> | $Enums.Gender
    bloodGroup?: StringNullableFilter<"Patient"> | string | null
    address?: StringNullableFilter<"Patient"> | string | null
    addressLine1?: StringNullableFilter<"Patient"> | string | null
    addressLine2?: StringNullableFilter<"Patient"> | string | null
    city?: StringNullableFilter<"Patient"> | string | null
    state?: StringNullableFilter<"Patient"> | string | null
    postalCode?: StringNullableFilter<"Patient"> | string | null
    country?: StringNullableFilter<"Patient"> | string | null
    emergencyContactName?: StringNullableFilter<"Patient"> | string | null
    emergencyContactPhone?: StringNullableFilter<"Patient"> | string | null
    status?: EnumPatientStatusFilter<"Patient"> | $Enums.PatientStatus
    notes?: StringNullableFilter<"Patient"> | string | null
    deletedAt?: DateTimeNullableFilter<"Patient"> | Date | string | null
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    medicalRecord?: XOR<MedicalRecordNullableScalarRelationFilter, MedicalRecordWhereInput> | null
    insurance?: XOR<PatientInsuranceNullableScalarRelationFilter, PatientInsuranceWhereInput> | null
    patientNotes?: PatientNoteListRelationFilter
    patientAttachments?: PatientAttachmentListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    addressLine1?: SortOrderInput | SortOrder
    addressLine2?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    postalCode?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    medicalRecord?: MedicalRecordOrderByWithRelationInput
    insurance?: PatientInsuranceOrderByWithRelationInput
    patientNotes?: PatientNoteOrderByRelationAggregateInput
    patientAttachments?: PatientAttachmentOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_email?: PatientTenantIdEmailCompoundUniqueInput
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    tenantId?: StringFilter<"Patient"> | string
    firstName?: StringFilter<"Patient"> | string
    lastName?: StringFilter<"Patient"> | string
    email?: StringNullableFilter<"Patient"> | string | null
    phone?: StringNullableFilter<"Patient"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Patient"> | Date | string | null
    gender?: EnumGenderFilter<"Patient"> | $Enums.Gender
    bloodGroup?: StringNullableFilter<"Patient"> | string | null
    address?: StringNullableFilter<"Patient"> | string | null
    addressLine1?: StringNullableFilter<"Patient"> | string | null
    addressLine2?: StringNullableFilter<"Patient"> | string | null
    city?: StringNullableFilter<"Patient"> | string | null
    state?: StringNullableFilter<"Patient"> | string | null
    postalCode?: StringNullableFilter<"Patient"> | string | null
    country?: StringNullableFilter<"Patient"> | string | null
    emergencyContactName?: StringNullableFilter<"Patient"> | string | null
    emergencyContactPhone?: StringNullableFilter<"Patient"> | string | null
    status?: EnumPatientStatusFilter<"Patient"> | $Enums.PatientStatus
    notes?: StringNullableFilter<"Patient"> | string | null
    deletedAt?: DateTimeNullableFilter<"Patient"> | Date | string | null
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    medicalRecord?: XOR<MedicalRecordNullableScalarRelationFilter, MedicalRecordWhereInput> | null
    insurance?: XOR<PatientInsuranceNullableScalarRelationFilter, PatientInsuranceWhereInput> | null
    patientNotes?: PatientNoteListRelationFilter
    patientAttachments?: PatientAttachmentListRelationFilter
  }, "id" | "tenantId_email">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrder
    bloodGroup?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    addressLine1?: SortOrderInput | SortOrder
    addressLine2?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    postalCode?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    tenantId?: StringWithAggregatesFilter<"Patient"> | string
    firstName?: StringWithAggregatesFilter<"Patient"> | string
    lastName?: StringWithAggregatesFilter<"Patient"> | string
    email?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    gender?: EnumGenderWithAggregatesFilter<"Patient"> | $Enums.Gender
    bloodGroup?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    address?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    addressLine1?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    addressLine2?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    city?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    state?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    postalCode?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    country?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    emergencyContactName?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    emergencyContactPhone?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    status?: EnumPatientStatusWithAggregatesFilter<"Patient"> | $Enums.PatientStatus
    notes?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type PatientInsuranceWhereInput = {
    AND?: PatientInsuranceWhereInput | PatientInsuranceWhereInput[]
    OR?: PatientInsuranceWhereInput[]
    NOT?: PatientInsuranceWhereInput | PatientInsuranceWhereInput[]
    id?: StringFilter<"PatientInsurance"> | string
    patientId?: StringFilter<"PatientInsurance"> | string
    providerName?: StringFilter<"PatientInsurance"> | string
    policyNumber?: StringFilter<"PatientInsurance"> | string
    expiryDate?: DateTimeFilter<"PatientInsurance"> | Date | string
    notes?: StringNullableFilter<"PatientInsurance"> | string | null
    createdAt?: DateTimeFilter<"PatientInsurance"> | Date | string
    updatedAt?: DateTimeFilter<"PatientInsurance"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type PatientInsuranceOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    providerName?: SortOrder
    policyNumber?: SortOrder
    expiryDate?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type PatientInsuranceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    patientId?: string
    AND?: PatientInsuranceWhereInput | PatientInsuranceWhereInput[]
    OR?: PatientInsuranceWhereInput[]
    NOT?: PatientInsuranceWhereInput | PatientInsuranceWhereInput[]
    providerName?: StringFilter<"PatientInsurance"> | string
    policyNumber?: StringFilter<"PatientInsurance"> | string
    expiryDate?: DateTimeFilter<"PatientInsurance"> | Date | string
    notes?: StringNullableFilter<"PatientInsurance"> | string | null
    createdAt?: DateTimeFilter<"PatientInsurance"> | Date | string
    updatedAt?: DateTimeFilter<"PatientInsurance"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id" | "patientId">

  export type PatientInsuranceOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    providerName?: SortOrder
    policyNumber?: SortOrder
    expiryDate?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientInsuranceCountOrderByAggregateInput
    _max?: PatientInsuranceMaxOrderByAggregateInput
    _min?: PatientInsuranceMinOrderByAggregateInput
  }

  export type PatientInsuranceScalarWhereWithAggregatesInput = {
    AND?: PatientInsuranceScalarWhereWithAggregatesInput | PatientInsuranceScalarWhereWithAggregatesInput[]
    OR?: PatientInsuranceScalarWhereWithAggregatesInput[]
    NOT?: PatientInsuranceScalarWhereWithAggregatesInput | PatientInsuranceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PatientInsurance"> | string
    patientId?: StringWithAggregatesFilter<"PatientInsurance"> | string
    providerName?: StringWithAggregatesFilter<"PatientInsurance"> | string
    policyNumber?: StringWithAggregatesFilter<"PatientInsurance"> | string
    expiryDate?: DateTimeWithAggregatesFilter<"PatientInsurance"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"PatientInsurance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PatientInsurance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PatientInsurance"> | Date | string
  }

  export type MedicalRecordWhereInput = {
    AND?: MedicalRecordWhereInput | MedicalRecordWhereInput[]
    OR?: MedicalRecordWhereInput[]
    NOT?: MedicalRecordWhereInput | MedicalRecordWhereInput[]
    id?: StringFilter<"MedicalRecord"> | string
    patientId?: StringFilter<"MedicalRecord"> | string
    tenantId?: StringFilter<"MedicalRecord"> | string
    allergies?: StringNullableFilter<"MedicalRecord"> | string | null
    medications?: StringNullableFilter<"MedicalRecord"> | string | null
    conditions?: StringNullableFilter<"MedicalRecord"> | string | null
    notes?: StringNullableFilter<"MedicalRecord"> | string | null
    createdAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type MedicalRecordOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    tenantId?: SortOrder
    allergies?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    conditions?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type MedicalRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    patientId?: string
    AND?: MedicalRecordWhereInput | MedicalRecordWhereInput[]
    OR?: MedicalRecordWhereInput[]
    NOT?: MedicalRecordWhereInput | MedicalRecordWhereInput[]
    tenantId?: StringFilter<"MedicalRecord"> | string
    allergies?: StringNullableFilter<"MedicalRecord"> | string | null
    medications?: StringNullableFilter<"MedicalRecord"> | string | null
    conditions?: StringNullableFilter<"MedicalRecord"> | string | null
    notes?: StringNullableFilter<"MedicalRecord"> | string | null
    createdAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id" | "patientId">

  export type MedicalRecordOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    tenantId?: SortOrder
    allergies?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    conditions?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MedicalRecordCountOrderByAggregateInput
    _max?: MedicalRecordMaxOrderByAggregateInput
    _min?: MedicalRecordMinOrderByAggregateInput
  }

  export type MedicalRecordScalarWhereWithAggregatesInput = {
    AND?: MedicalRecordScalarWhereWithAggregatesInput | MedicalRecordScalarWhereWithAggregatesInput[]
    OR?: MedicalRecordScalarWhereWithAggregatesInput[]
    NOT?: MedicalRecordScalarWhereWithAggregatesInput | MedicalRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedicalRecord"> | string
    patientId?: StringWithAggregatesFilter<"MedicalRecord"> | string
    tenantId?: StringWithAggregatesFilter<"MedicalRecord"> | string
    allergies?: StringNullableWithAggregatesFilter<"MedicalRecord"> | string | null
    medications?: StringNullableWithAggregatesFilter<"MedicalRecord"> | string | null
    conditions?: StringNullableWithAggregatesFilter<"MedicalRecord"> | string | null
    notes?: StringNullableWithAggregatesFilter<"MedicalRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MedicalRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MedicalRecord"> | Date | string
  }

  export type PatientNoteWhereInput = {
    AND?: PatientNoteWhereInput | PatientNoteWhereInput[]
    OR?: PatientNoteWhereInput[]
    NOT?: PatientNoteWhereInput | PatientNoteWhereInput[]
    id?: StringFilter<"PatientNote"> | string
    tenantId?: StringFilter<"PatientNote"> | string
    patientId?: StringFilter<"PatientNote"> | string
    staffId?: StringFilter<"PatientNote"> | string
    noteType?: EnumPatientNoteTypeFilter<"PatientNote"> | $Enums.PatientNoteType
    title?: StringFilter<"PatientNote"> | string
    content?: StringFilter<"PatientNote"> | string
    attachments?: JsonNullableFilter<"PatientNote">
    createdAt?: DateTimeFilter<"PatientNote"> | Date | string
    updatedAt?: DateTimeFilter<"PatientNote"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type PatientNoteOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    staffId?: SortOrder
    noteType?: SortOrder
    title?: SortOrder
    content?: SortOrder
    attachments?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type PatientNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PatientNoteWhereInput | PatientNoteWhereInput[]
    OR?: PatientNoteWhereInput[]
    NOT?: PatientNoteWhereInput | PatientNoteWhereInput[]
    tenantId?: StringFilter<"PatientNote"> | string
    patientId?: StringFilter<"PatientNote"> | string
    staffId?: StringFilter<"PatientNote"> | string
    noteType?: EnumPatientNoteTypeFilter<"PatientNote"> | $Enums.PatientNoteType
    title?: StringFilter<"PatientNote"> | string
    content?: StringFilter<"PatientNote"> | string
    attachments?: JsonNullableFilter<"PatientNote">
    createdAt?: DateTimeFilter<"PatientNote"> | Date | string
    updatedAt?: DateTimeFilter<"PatientNote"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id">

  export type PatientNoteOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    staffId?: SortOrder
    noteType?: SortOrder
    title?: SortOrder
    content?: SortOrder
    attachments?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientNoteCountOrderByAggregateInput
    _max?: PatientNoteMaxOrderByAggregateInput
    _min?: PatientNoteMinOrderByAggregateInput
  }

  export type PatientNoteScalarWhereWithAggregatesInput = {
    AND?: PatientNoteScalarWhereWithAggregatesInput | PatientNoteScalarWhereWithAggregatesInput[]
    OR?: PatientNoteScalarWhereWithAggregatesInput[]
    NOT?: PatientNoteScalarWhereWithAggregatesInput | PatientNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PatientNote"> | string
    tenantId?: StringWithAggregatesFilter<"PatientNote"> | string
    patientId?: StringWithAggregatesFilter<"PatientNote"> | string
    staffId?: StringWithAggregatesFilter<"PatientNote"> | string
    noteType?: EnumPatientNoteTypeWithAggregatesFilter<"PatientNote"> | $Enums.PatientNoteType
    title?: StringWithAggregatesFilter<"PatientNote"> | string
    content?: StringWithAggregatesFilter<"PatientNote"> | string
    attachments?: JsonNullableWithAggregatesFilter<"PatientNote">
    createdAt?: DateTimeWithAggregatesFilter<"PatientNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PatientNote"> | Date | string
  }

  export type PatientAttachmentWhereInput = {
    AND?: PatientAttachmentWhereInput | PatientAttachmentWhereInput[]
    OR?: PatientAttachmentWhereInput[]
    NOT?: PatientAttachmentWhereInput | PatientAttachmentWhereInput[]
    id?: StringFilter<"PatientAttachment"> | string
    tenantId?: StringFilter<"PatientAttachment"> | string
    patientId?: StringFilter<"PatientAttachment"> | string
    uploadedByStaffId?: StringFilter<"PatientAttachment"> | string
    fileName?: StringFilter<"PatientAttachment"> | string
    fileType?: StringFilter<"PatientAttachment"> | string
    fileSize?: IntFilter<"PatientAttachment"> | number
    storagePath?: StringFilter<"PatientAttachment"> | string
    description?: StringNullableFilter<"PatientAttachment"> | string | null
    createdAt?: DateTimeFilter<"PatientAttachment"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type PatientAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    uploadedByStaffId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    storagePath?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type PatientAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PatientAttachmentWhereInput | PatientAttachmentWhereInput[]
    OR?: PatientAttachmentWhereInput[]
    NOT?: PatientAttachmentWhereInput | PatientAttachmentWhereInput[]
    tenantId?: StringFilter<"PatientAttachment"> | string
    patientId?: StringFilter<"PatientAttachment"> | string
    uploadedByStaffId?: StringFilter<"PatientAttachment"> | string
    fileName?: StringFilter<"PatientAttachment"> | string
    fileType?: StringFilter<"PatientAttachment"> | string
    fileSize?: IntFilter<"PatientAttachment"> | number
    storagePath?: StringFilter<"PatientAttachment"> | string
    description?: StringNullableFilter<"PatientAttachment"> | string | null
    createdAt?: DateTimeFilter<"PatientAttachment"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id">

  export type PatientAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    uploadedByStaffId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    storagePath?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PatientAttachmentCountOrderByAggregateInput
    _avg?: PatientAttachmentAvgOrderByAggregateInput
    _max?: PatientAttachmentMaxOrderByAggregateInput
    _min?: PatientAttachmentMinOrderByAggregateInput
    _sum?: PatientAttachmentSumOrderByAggregateInput
  }

  export type PatientAttachmentScalarWhereWithAggregatesInput = {
    AND?: PatientAttachmentScalarWhereWithAggregatesInput | PatientAttachmentScalarWhereWithAggregatesInput[]
    OR?: PatientAttachmentScalarWhereWithAggregatesInput[]
    NOT?: PatientAttachmentScalarWhereWithAggregatesInput | PatientAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PatientAttachment"> | string
    tenantId?: StringWithAggregatesFilter<"PatientAttachment"> | string
    patientId?: StringWithAggregatesFilter<"PatientAttachment"> | string
    uploadedByStaffId?: StringWithAggregatesFilter<"PatientAttachment"> | string
    fileName?: StringWithAggregatesFilter<"PatientAttachment"> | string
    fileType?: StringWithAggregatesFilter<"PatientAttachment"> | string
    fileSize?: IntWithAggregatesFilter<"PatientAttachment"> | number
    storagePath?: StringWithAggregatesFilter<"PatientAttachment"> | string
    description?: StringNullableWithAggregatesFilter<"PatientAttachment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PatientAttachment"> | Date | string
  }

  export type PatientCreateInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalRecord?: MedicalRecordCreateNestedOneWithoutPatientInput
    insurance?: PatientInsuranceCreateNestedOneWithoutPatientInput
    patientNotes?: PatientNoteCreateNestedManyWithoutPatientInput
    patientAttachments?: PatientAttachmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalRecord?: MedicalRecordUncheckedCreateNestedOneWithoutPatientInput
    insurance?: PatientInsuranceUncheckedCreateNestedOneWithoutPatientInput
    patientNotes?: PatientNoteUncheckedCreateNestedManyWithoutPatientInput
    patientAttachments?: PatientAttachmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalRecord?: MedicalRecordUpdateOneWithoutPatientNestedInput
    insurance?: PatientInsuranceUpdateOneWithoutPatientNestedInput
    patientNotes?: PatientNoteUpdateManyWithoutPatientNestedInput
    patientAttachments?: PatientAttachmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalRecord?: MedicalRecordUncheckedUpdateOneWithoutPatientNestedInput
    insurance?: PatientInsuranceUncheckedUpdateOneWithoutPatientNestedInput
    patientNotes?: PatientNoteUncheckedUpdateManyWithoutPatientNestedInput
    patientAttachments?: PatientAttachmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientInsuranceCreateInput = {
    id?: string
    providerName: string
    policyNumber: string
    expiryDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutInsuranceInput
  }

  export type PatientInsuranceUncheckedCreateInput = {
    id?: string
    patientId: string
    providerName: string
    policyNumber: string
    expiryDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientInsuranceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutInsuranceNestedInput
  }

  export type PatientInsuranceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientInsuranceCreateManyInput = {
    id?: string
    patientId: string
    providerName: string
    policyNumber: string
    expiryDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientInsuranceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientInsuranceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalRecordCreateInput = {
    id?: string
    tenantId: string
    allergies?: string | null
    medications?: string | null
    conditions?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutMedicalRecordInput
  }

  export type MedicalRecordUncheckedCreateInput = {
    id?: string
    patientId: string
    tenantId: string
    allergies?: string | null
    medications?: string | null
    conditions?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    conditions?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutMedicalRecordNestedInput
  }

  export type MedicalRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    conditions?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalRecordCreateManyInput = {
    id?: string
    patientId: string
    tenantId: string
    allergies?: string | null
    medications?: string | null
    conditions?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    conditions?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    conditions?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientNoteCreateInput = {
    id?: string
    tenantId: string
    staffId: string
    noteType: $Enums.PatientNoteType
    title: string
    content: string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutPatientNotesInput
  }

  export type PatientNoteUncheckedCreateInput = {
    id?: string
    tenantId: string
    patientId: string
    staffId: string
    noteType: $Enums.PatientNoteType
    title: string
    content: string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    noteType?: EnumPatientNoteTypeFieldUpdateOperationsInput | $Enums.PatientNoteType
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPatientNotesNestedInput
  }

  export type PatientNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    noteType?: EnumPatientNoteTypeFieldUpdateOperationsInput | $Enums.PatientNoteType
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientNoteCreateManyInput = {
    id?: string
    tenantId: string
    patientId: string
    staffId: string
    noteType: $Enums.PatientNoteType
    title: string
    content: string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    noteType?: EnumPatientNoteTypeFieldUpdateOperationsInput | $Enums.PatientNoteType
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    noteType?: EnumPatientNoteTypeFieldUpdateOperationsInput | $Enums.PatientNoteType
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientAttachmentCreateInput = {
    id?: string
    tenantId: string
    uploadedByStaffId: string
    fileName: string
    fileType: string
    fileSize: number
    storagePath: string
    description?: string | null
    createdAt?: Date | string
    patient: PatientCreateNestedOneWithoutPatientAttachmentsInput
  }

  export type PatientAttachmentUncheckedCreateInput = {
    id?: string
    tenantId: string
    patientId: string
    uploadedByStaffId: string
    fileName: string
    fileType: string
    fileSize: number
    storagePath: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PatientAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedByStaffId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPatientAttachmentsNestedInput
  }

  export type PatientAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    uploadedByStaffId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientAttachmentCreateManyInput = {
    id?: string
    tenantId: string
    patientId: string
    uploadedByStaffId: string
    fileName: string
    fileType: string
    fileSize: number
    storagePath: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PatientAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedByStaffId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    uploadedByStaffId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type EnumPatientStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientStatus | EnumPatientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientStatusFilter<$PrismaModel> | $Enums.PatientStatus
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

  export type MedicalRecordNullableScalarRelationFilter = {
    is?: MedicalRecordWhereInput | null
    isNot?: MedicalRecordWhereInput | null
  }

  export type PatientInsuranceNullableScalarRelationFilter = {
    is?: PatientInsuranceWhereInput | null
    isNot?: PatientInsuranceWhereInput | null
  }

  export type PatientNoteListRelationFilter = {
    every?: PatientNoteWhereInput
    some?: PatientNoteWhereInput
    none?: PatientNoteWhereInput
  }

  export type PatientAttachmentListRelationFilter = {
    every?: PatientAttachmentWhereInput
    some?: PatientAttachmentWhereInput
    none?: PatientAttachmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PatientNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientTenantIdEmailCompoundUniqueInput = {
    tenantId: string
    email: string
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    bloodGroup?: SortOrder
    address?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    bloodGroup?: SortOrder
    address?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    bloodGroup?: SortOrder
    address?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    deletedAt?: SortOrder
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

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type EnumPatientStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientStatus | EnumPatientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientStatusWithAggregatesFilter<$PrismaModel> | $Enums.PatientStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPatientStatusFilter<$PrismaModel>
    _max?: NestedEnumPatientStatusFilter<$PrismaModel>
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

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type PatientInsuranceCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    providerName?: SortOrder
    policyNumber?: SortOrder
    expiryDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientInsuranceMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    providerName?: SortOrder
    policyNumber?: SortOrder
    expiryDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientInsuranceMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    providerName?: SortOrder
    policyNumber?: SortOrder
    expiryDate?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalRecordCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    tenantId?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    conditions?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    tenantId?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    conditions?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalRecordMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    tenantId?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    conditions?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPatientNoteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientNoteType | EnumPatientNoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PatientNoteType[] | ListEnumPatientNoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientNoteType[] | ListEnumPatientNoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientNoteTypeFilter<$PrismaModel> | $Enums.PatientNoteType
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

  export type PatientNoteCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    staffId?: SortOrder
    noteType?: SortOrder
    title?: SortOrder
    content?: SortOrder
    attachments?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    staffId?: SortOrder
    noteType?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientNoteMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    staffId?: SortOrder
    noteType?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPatientNoteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientNoteType | EnumPatientNoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PatientNoteType[] | ListEnumPatientNoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientNoteType[] | ListEnumPatientNoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientNoteTypeWithAggregatesFilter<$PrismaModel> | $Enums.PatientNoteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPatientNoteTypeFilter<$PrismaModel>
    _max?: NestedEnumPatientNoteTypeFilter<$PrismaModel>
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

  export type PatientAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    uploadedByStaffId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    storagePath?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PatientAttachmentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type PatientAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    uploadedByStaffId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    storagePath?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PatientAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    patientId?: SortOrder
    uploadedByStaffId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    storagePath?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PatientAttachmentSumOrderByAggregateInput = {
    fileSize?: SortOrder
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

  export type MedicalRecordCreateNestedOneWithoutPatientInput = {
    create?: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput>
    connectOrCreate?: MedicalRecordCreateOrConnectWithoutPatientInput
    connect?: MedicalRecordWhereUniqueInput
  }

  export type PatientInsuranceCreateNestedOneWithoutPatientInput = {
    create?: XOR<PatientInsuranceCreateWithoutPatientInput, PatientInsuranceUncheckedCreateWithoutPatientInput>
    connectOrCreate?: PatientInsuranceCreateOrConnectWithoutPatientInput
    connect?: PatientInsuranceWhereUniqueInput
  }

  export type PatientNoteCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientNoteCreateWithoutPatientInput, PatientNoteUncheckedCreateWithoutPatientInput> | PatientNoteCreateWithoutPatientInput[] | PatientNoteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientNoteCreateOrConnectWithoutPatientInput | PatientNoteCreateOrConnectWithoutPatientInput[]
    createMany?: PatientNoteCreateManyPatientInputEnvelope
    connect?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
  }

  export type PatientAttachmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientAttachmentCreateWithoutPatientInput, PatientAttachmentUncheckedCreateWithoutPatientInput> | PatientAttachmentCreateWithoutPatientInput[] | PatientAttachmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientAttachmentCreateOrConnectWithoutPatientInput | PatientAttachmentCreateOrConnectWithoutPatientInput[]
    createMany?: PatientAttachmentCreateManyPatientInputEnvelope
    connect?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
  }

  export type MedicalRecordUncheckedCreateNestedOneWithoutPatientInput = {
    create?: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput>
    connectOrCreate?: MedicalRecordCreateOrConnectWithoutPatientInput
    connect?: MedicalRecordWhereUniqueInput
  }

  export type PatientInsuranceUncheckedCreateNestedOneWithoutPatientInput = {
    create?: XOR<PatientInsuranceCreateWithoutPatientInput, PatientInsuranceUncheckedCreateWithoutPatientInput>
    connectOrCreate?: PatientInsuranceCreateOrConnectWithoutPatientInput
    connect?: PatientInsuranceWhereUniqueInput
  }

  export type PatientNoteUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientNoteCreateWithoutPatientInput, PatientNoteUncheckedCreateWithoutPatientInput> | PatientNoteCreateWithoutPatientInput[] | PatientNoteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientNoteCreateOrConnectWithoutPatientInput | PatientNoteCreateOrConnectWithoutPatientInput[]
    createMany?: PatientNoteCreateManyPatientInputEnvelope
    connect?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
  }

  export type PatientAttachmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientAttachmentCreateWithoutPatientInput, PatientAttachmentUncheckedCreateWithoutPatientInput> | PatientAttachmentCreateWithoutPatientInput[] | PatientAttachmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientAttachmentCreateOrConnectWithoutPatientInput | PatientAttachmentCreateOrConnectWithoutPatientInput[]
    createMany?: PatientAttachmentCreateManyPatientInputEnvelope
    connect?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type EnumPatientStatusFieldUpdateOperationsInput = {
    set?: $Enums.PatientStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MedicalRecordUpdateOneWithoutPatientNestedInput = {
    create?: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput>
    connectOrCreate?: MedicalRecordCreateOrConnectWithoutPatientInput
    upsert?: MedicalRecordUpsertWithoutPatientInput
    disconnect?: MedicalRecordWhereInput | boolean
    delete?: MedicalRecordWhereInput | boolean
    connect?: MedicalRecordWhereUniqueInput
    update?: XOR<XOR<MedicalRecordUpdateToOneWithWhereWithoutPatientInput, MedicalRecordUpdateWithoutPatientInput>, MedicalRecordUncheckedUpdateWithoutPatientInput>
  }

  export type PatientInsuranceUpdateOneWithoutPatientNestedInput = {
    create?: XOR<PatientInsuranceCreateWithoutPatientInput, PatientInsuranceUncheckedCreateWithoutPatientInput>
    connectOrCreate?: PatientInsuranceCreateOrConnectWithoutPatientInput
    upsert?: PatientInsuranceUpsertWithoutPatientInput
    disconnect?: PatientInsuranceWhereInput | boolean
    delete?: PatientInsuranceWhereInput | boolean
    connect?: PatientInsuranceWhereUniqueInput
    update?: XOR<XOR<PatientInsuranceUpdateToOneWithWhereWithoutPatientInput, PatientInsuranceUpdateWithoutPatientInput>, PatientInsuranceUncheckedUpdateWithoutPatientInput>
  }

  export type PatientNoteUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientNoteCreateWithoutPatientInput, PatientNoteUncheckedCreateWithoutPatientInput> | PatientNoteCreateWithoutPatientInput[] | PatientNoteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientNoteCreateOrConnectWithoutPatientInput | PatientNoteCreateOrConnectWithoutPatientInput[]
    upsert?: PatientNoteUpsertWithWhereUniqueWithoutPatientInput | PatientNoteUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientNoteCreateManyPatientInputEnvelope
    set?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
    disconnect?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
    delete?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
    connect?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
    update?: PatientNoteUpdateWithWhereUniqueWithoutPatientInput | PatientNoteUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientNoteUpdateManyWithWhereWithoutPatientInput | PatientNoteUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientNoteScalarWhereInput | PatientNoteScalarWhereInput[]
  }

  export type PatientAttachmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientAttachmentCreateWithoutPatientInput, PatientAttachmentUncheckedCreateWithoutPatientInput> | PatientAttachmentCreateWithoutPatientInput[] | PatientAttachmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientAttachmentCreateOrConnectWithoutPatientInput | PatientAttachmentCreateOrConnectWithoutPatientInput[]
    upsert?: PatientAttachmentUpsertWithWhereUniqueWithoutPatientInput | PatientAttachmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientAttachmentCreateManyPatientInputEnvelope
    set?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
    disconnect?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
    delete?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
    connect?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
    update?: PatientAttachmentUpdateWithWhereUniqueWithoutPatientInput | PatientAttachmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientAttachmentUpdateManyWithWhereWithoutPatientInput | PatientAttachmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientAttachmentScalarWhereInput | PatientAttachmentScalarWhereInput[]
  }

  export type MedicalRecordUncheckedUpdateOneWithoutPatientNestedInput = {
    create?: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput>
    connectOrCreate?: MedicalRecordCreateOrConnectWithoutPatientInput
    upsert?: MedicalRecordUpsertWithoutPatientInput
    disconnect?: MedicalRecordWhereInput | boolean
    delete?: MedicalRecordWhereInput | boolean
    connect?: MedicalRecordWhereUniqueInput
    update?: XOR<XOR<MedicalRecordUpdateToOneWithWhereWithoutPatientInput, MedicalRecordUpdateWithoutPatientInput>, MedicalRecordUncheckedUpdateWithoutPatientInput>
  }

  export type PatientInsuranceUncheckedUpdateOneWithoutPatientNestedInput = {
    create?: XOR<PatientInsuranceCreateWithoutPatientInput, PatientInsuranceUncheckedCreateWithoutPatientInput>
    connectOrCreate?: PatientInsuranceCreateOrConnectWithoutPatientInput
    upsert?: PatientInsuranceUpsertWithoutPatientInput
    disconnect?: PatientInsuranceWhereInput | boolean
    delete?: PatientInsuranceWhereInput | boolean
    connect?: PatientInsuranceWhereUniqueInput
    update?: XOR<XOR<PatientInsuranceUpdateToOneWithWhereWithoutPatientInput, PatientInsuranceUpdateWithoutPatientInput>, PatientInsuranceUncheckedUpdateWithoutPatientInput>
  }

  export type PatientNoteUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientNoteCreateWithoutPatientInput, PatientNoteUncheckedCreateWithoutPatientInput> | PatientNoteCreateWithoutPatientInput[] | PatientNoteUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientNoteCreateOrConnectWithoutPatientInput | PatientNoteCreateOrConnectWithoutPatientInput[]
    upsert?: PatientNoteUpsertWithWhereUniqueWithoutPatientInput | PatientNoteUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientNoteCreateManyPatientInputEnvelope
    set?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
    disconnect?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
    delete?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
    connect?: PatientNoteWhereUniqueInput | PatientNoteWhereUniqueInput[]
    update?: PatientNoteUpdateWithWhereUniqueWithoutPatientInput | PatientNoteUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientNoteUpdateManyWithWhereWithoutPatientInput | PatientNoteUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientNoteScalarWhereInput | PatientNoteScalarWhereInput[]
  }

  export type PatientAttachmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientAttachmentCreateWithoutPatientInput, PatientAttachmentUncheckedCreateWithoutPatientInput> | PatientAttachmentCreateWithoutPatientInput[] | PatientAttachmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientAttachmentCreateOrConnectWithoutPatientInput | PatientAttachmentCreateOrConnectWithoutPatientInput[]
    upsert?: PatientAttachmentUpsertWithWhereUniqueWithoutPatientInput | PatientAttachmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientAttachmentCreateManyPatientInputEnvelope
    set?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
    disconnect?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
    delete?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
    connect?: PatientAttachmentWhereUniqueInput | PatientAttachmentWhereUniqueInput[]
    update?: PatientAttachmentUpdateWithWhereUniqueWithoutPatientInput | PatientAttachmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientAttachmentUpdateManyWithWhereWithoutPatientInput | PatientAttachmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientAttachmentScalarWhereInput | PatientAttachmentScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutInsuranceInput = {
    create?: XOR<PatientCreateWithoutInsuranceInput, PatientUncheckedCreateWithoutInsuranceInput>
    connectOrCreate?: PatientCreateOrConnectWithoutInsuranceInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutInsuranceNestedInput = {
    create?: XOR<PatientCreateWithoutInsuranceInput, PatientUncheckedCreateWithoutInsuranceInput>
    connectOrCreate?: PatientCreateOrConnectWithoutInsuranceInput
    upsert?: PatientUpsertWithoutInsuranceInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutInsuranceInput, PatientUpdateWithoutInsuranceInput>, PatientUncheckedUpdateWithoutInsuranceInput>
  }

  export type PatientCreateNestedOneWithoutMedicalRecordInput = {
    create?: XOR<PatientCreateWithoutMedicalRecordInput, PatientUncheckedCreateWithoutMedicalRecordInput>
    connectOrCreate?: PatientCreateOrConnectWithoutMedicalRecordInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutMedicalRecordNestedInput = {
    create?: XOR<PatientCreateWithoutMedicalRecordInput, PatientUncheckedCreateWithoutMedicalRecordInput>
    connectOrCreate?: PatientCreateOrConnectWithoutMedicalRecordInput
    upsert?: PatientUpsertWithoutMedicalRecordInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutMedicalRecordInput, PatientUpdateWithoutMedicalRecordInput>, PatientUncheckedUpdateWithoutMedicalRecordInput>
  }

  export type PatientCreateNestedOneWithoutPatientNotesInput = {
    create?: XOR<PatientCreateWithoutPatientNotesInput, PatientUncheckedCreateWithoutPatientNotesInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPatientNotesInput
    connect?: PatientWhereUniqueInput
  }

  export type EnumPatientNoteTypeFieldUpdateOperationsInput = {
    set?: $Enums.PatientNoteType
  }

  export type PatientUpdateOneRequiredWithoutPatientNotesNestedInput = {
    create?: XOR<PatientCreateWithoutPatientNotesInput, PatientUncheckedCreateWithoutPatientNotesInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPatientNotesInput
    upsert?: PatientUpsertWithoutPatientNotesInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutPatientNotesInput, PatientUpdateWithoutPatientNotesInput>, PatientUncheckedUpdateWithoutPatientNotesInput>
  }

  export type PatientCreateNestedOneWithoutPatientAttachmentsInput = {
    create?: XOR<PatientCreateWithoutPatientAttachmentsInput, PatientUncheckedCreateWithoutPatientAttachmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPatientAttachmentsInput
    connect?: PatientWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatientUpdateOneRequiredWithoutPatientAttachmentsNestedInput = {
    create?: XOR<PatientCreateWithoutPatientAttachmentsInput, PatientUncheckedCreateWithoutPatientAttachmentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPatientAttachmentsInput
    upsert?: PatientUpsertWithoutPatientAttachmentsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutPatientAttachmentsInput, PatientUpdateWithoutPatientAttachmentsInput>, PatientUncheckedUpdateWithoutPatientAttachmentsInput>
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

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumPatientStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientStatus | EnumPatientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientStatusFilter<$PrismaModel> | $Enums.PatientStatus
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

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumPatientStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientStatus | EnumPatientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientStatus[] | ListEnumPatientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientStatusWithAggregatesFilter<$PrismaModel> | $Enums.PatientStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPatientStatusFilter<$PrismaModel>
    _max?: NestedEnumPatientStatusFilter<$PrismaModel>
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

  export type NestedEnumPatientNoteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientNoteType | EnumPatientNoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PatientNoteType[] | ListEnumPatientNoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientNoteType[] | ListEnumPatientNoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientNoteTypeFilter<$PrismaModel> | $Enums.PatientNoteType
  }

  export type NestedEnumPatientNoteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PatientNoteType | EnumPatientNoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PatientNoteType[] | ListEnumPatientNoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PatientNoteType[] | ListEnumPatientNoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPatientNoteTypeWithAggregatesFilter<$PrismaModel> | $Enums.PatientNoteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPatientNoteTypeFilter<$PrismaModel>
    _max?: NestedEnumPatientNoteTypeFilter<$PrismaModel>
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

  export type MedicalRecordCreateWithoutPatientInput = {
    id?: string
    tenantId: string
    allergies?: string | null
    medications?: string | null
    conditions?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalRecordUncheckedCreateWithoutPatientInput = {
    id?: string
    tenantId: string
    allergies?: string | null
    medications?: string | null
    conditions?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalRecordCreateOrConnectWithoutPatientInput = {
    where: MedicalRecordWhereUniqueInput
    create: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput>
  }

  export type PatientInsuranceCreateWithoutPatientInput = {
    id?: string
    providerName: string
    policyNumber: string
    expiryDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientInsuranceUncheckedCreateWithoutPatientInput = {
    id?: string
    providerName: string
    policyNumber: string
    expiryDate: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientInsuranceCreateOrConnectWithoutPatientInput = {
    where: PatientInsuranceWhereUniqueInput
    create: XOR<PatientInsuranceCreateWithoutPatientInput, PatientInsuranceUncheckedCreateWithoutPatientInput>
  }

  export type PatientNoteCreateWithoutPatientInput = {
    id?: string
    tenantId: string
    staffId: string
    noteType: $Enums.PatientNoteType
    title: string
    content: string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientNoteUncheckedCreateWithoutPatientInput = {
    id?: string
    tenantId: string
    staffId: string
    noteType: $Enums.PatientNoteType
    title: string
    content: string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientNoteCreateOrConnectWithoutPatientInput = {
    where: PatientNoteWhereUniqueInput
    create: XOR<PatientNoteCreateWithoutPatientInput, PatientNoteUncheckedCreateWithoutPatientInput>
  }

  export type PatientNoteCreateManyPatientInputEnvelope = {
    data: PatientNoteCreateManyPatientInput | PatientNoteCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PatientAttachmentCreateWithoutPatientInput = {
    id?: string
    tenantId: string
    uploadedByStaffId: string
    fileName: string
    fileType: string
    fileSize: number
    storagePath: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PatientAttachmentUncheckedCreateWithoutPatientInput = {
    id?: string
    tenantId: string
    uploadedByStaffId: string
    fileName: string
    fileType: string
    fileSize: number
    storagePath: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PatientAttachmentCreateOrConnectWithoutPatientInput = {
    where: PatientAttachmentWhereUniqueInput
    create: XOR<PatientAttachmentCreateWithoutPatientInput, PatientAttachmentUncheckedCreateWithoutPatientInput>
  }

  export type PatientAttachmentCreateManyPatientInputEnvelope = {
    data: PatientAttachmentCreateManyPatientInput | PatientAttachmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type MedicalRecordUpsertWithoutPatientInput = {
    update: XOR<MedicalRecordUpdateWithoutPatientInput, MedicalRecordUncheckedUpdateWithoutPatientInput>
    create: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput>
    where?: MedicalRecordWhereInput
  }

  export type MedicalRecordUpdateToOneWithWhereWithoutPatientInput = {
    where?: MedicalRecordWhereInput
    data: XOR<MedicalRecordUpdateWithoutPatientInput, MedicalRecordUncheckedUpdateWithoutPatientInput>
  }

  export type MedicalRecordUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    conditions?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalRecordUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    conditions?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientInsuranceUpsertWithoutPatientInput = {
    update: XOR<PatientInsuranceUpdateWithoutPatientInput, PatientInsuranceUncheckedUpdateWithoutPatientInput>
    create: XOR<PatientInsuranceCreateWithoutPatientInput, PatientInsuranceUncheckedCreateWithoutPatientInput>
    where?: PatientInsuranceWhereInput
  }

  export type PatientInsuranceUpdateToOneWithWhereWithoutPatientInput = {
    where?: PatientInsuranceWhereInput
    data: XOR<PatientInsuranceUpdateWithoutPatientInput, PatientInsuranceUncheckedUpdateWithoutPatientInput>
  }

  export type PatientInsuranceUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientInsuranceUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientNoteUpsertWithWhereUniqueWithoutPatientInput = {
    where: PatientNoteWhereUniqueInput
    update: XOR<PatientNoteUpdateWithoutPatientInput, PatientNoteUncheckedUpdateWithoutPatientInput>
    create: XOR<PatientNoteCreateWithoutPatientInput, PatientNoteUncheckedCreateWithoutPatientInput>
  }

  export type PatientNoteUpdateWithWhereUniqueWithoutPatientInput = {
    where: PatientNoteWhereUniqueInput
    data: XOR<PatientNoteUpdateWithoutPatientInput, PatientNoteUncheckedUpdateWithoutPatientInput>
  }

  export type PatientNoteUpdateManyWithWhereWithoutPatientInput = {
    where: PatientNoteScalarWhereInput
    data: XOR<PatientNoteUpdateManyMutationInput, PatientNoteUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientNoteScalarWhereInput = {
    AND?: PatientNoteScalarWhereInput | PatientNoteScalarWhereInput[]
    OR?: PatientNoteScalarWhereInput[]
    NOT?: PatientNoteScalarWhereInput | PatientNoteScalarWhereInput[]
    id?: StringFilter<"PatientNote"> | string
    tenantId?: StringFilter<"PatientNote"> | string
    patientId?: StringFilter<"PatientNote"> | string
    staffId?: StringFilter<"PatientNote"> | string
    noteType?: EnumPatientNoteTypeFilter<"PatientNote"> | $Enums.PatientNoteType
    title?: StringFilter<"PatientNote"> | string
    content?: StringFilter<"PatientNote"> | string
    attachments?: JsonNullableFilter<"PatientNote">
    createdAt?: DateTimeFilter<"PatientNote"> | Date | string
    updatedAt?: DateTimeFilter<"PatientNote"> | Date | string
  }

  export type PatientAttachmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: PatientAttachmentWhereUniqueInput
    update: XOR<PatientAttachmentUpdateWithoutPatientInput, PatientAttachmentUncheckedUpdateWithoutPatientInput>
    create: XOR<PatientAttachmentCreateWithoutPatientInput, PatientAttachmentUncheckedCreateWithoutPatientInput>
  }

  export type PatientAttachmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: PatientAttachmentWhereUniqueInput
    data: XOR<PatientAttachmentUpdateWithoutPatientInput, PatientAttachmentUncheckedUpdateWithoutPatientInput>
  }

  export type PatientAttachmentUpdateManyWithWhereWithoutPatientInput = {
    where: PatientAttachmentScalarWhereInput
    data: XOR<PatientAttachmentUpdateManyMutationInput, PatientAttachmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientAttachmentScalarWhereInput = {
    AND?: PatientAttachmentScalarWhereInput | PatientAttachmentScalarWhereInput[]
    OR?: PatientAttachmentScalarWhereInput[]
    NOT?: PatientAttachmentScalarWhereInput | PatientAttachmentScalarWhereInput[]
    id?: StringFilter<"PatientAttachment"> | string
    tenantId?: StringFilter<"PatientAttachment"> | string
    patientId?: StringFilter<"PatientAttachment"> | string
    uploadedByStaffId?: StringFilter<"PatientAttachment"> | string
    fileName?: StringFilter<"PatientAttachment"> | string
    fileType?: StringFilter<"PatientAttachment"> | string
    fileSize?: IntFilter<"PatientAttachment"> | number
    storagePath?: StringFilter<"PatientAttachment"> | string
    description?: StringNullableFilter<"PatientAttachment"> | string | null
    createdAt?: DateTimeFilter<"PatientAttachment"> | Date | string
  }

  export type PatientCreateWithoutInsuranceInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalRecord?: MedicalRecordCreateNestedOneWithoutPatientInput
    patientNotes?: PatientNoteCreateNestedManyWithoutPatientInput
    patientAttachments?: PatientAttachmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutInsuranceInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalRecord?: MedicalRecordUncheckedCreateNestedOneWithoutPatientInput
    patientNotes?: PatientNoteUncheckedCreateNestedManyWithoutPatientInput
    patientAttachments?: PatientAttachmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutInsuranceInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutInsuranceInput, PatientUncheckedCreateWithoutInsuranceInput>
  }

  export type PatientUpsertWithoutInsuranceInput = {
    update: XOR<PatientUpdateWithoutInsuranceInput, PatientUncheckedUpdateWithoutInsuranceInput>
    create: XOR<PatientCreateWithoutInsuranceInput, PatientUncheckedCreateWithoutInsuranceInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutInsuranceInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutInsuranceInput, PatientUncheckedUpdateWithoutInsuranceInput>
  }

  export type PatientUpdateWithoutInsuranceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalRecord?: MedicalRecordUpdateOneWithoutPatientNestedInput
    patientNotes?: PatientNoteUpdateManyWithoutPatientNestedInput
    patientAttachments?: PatientAttachmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutInsuranceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalRecord?: MedicalRecordUncheckedUpdateOneWithoutPatientNestedInput
    patientNotes?: PatientNoteUncheckedUpdateManyWithoutPatientNestedInput
    patientAttachments?: PatientAttachmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateWithoutMedicalRecordInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    insurance?: PatientInsuranceCreateNestedOneWithoutPatientInput
    patientNotes?: PatientNoteCreateNestedManyWithoutPatientInput
    patientAttachments?: PatientAttachmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutMedicalRecordInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    insurance?: PatientInsuranceUncheckedCreateNestedOneWithoutPatientInput
    patientNotes?: PatientNoteUncheckedCreateNestedManyWithoutPatientInput
    patientAttachments?: PatientAttachmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutMedicalRecordInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutMedicalRecordInput, PatientUncheckedCreateWithoutMedicalRecordInput>
  }

  export type PatientUpsertWithoutMedicalRecordInput = {
    update: XOR<PatientUpdateWithoutMedicalRecordInput, PatientUncheckedUpdateWithoutMedicalRecordInput>
    create: XOR<PatientCreateWithoutMedicalRecordInput, PatientUncheckedCreateWithoutMedicalRecordInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutMedicalRecordInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutMedicalRecordInput, PatientUncheckedUpdateWithoutMedicalRecordInput>
  }

  export type PatientUpdateWithoutMedicalRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    insurance?: PatientInsuranceUpdateOneWithoutPatientNestedInput
    patientNotes?: PatientNoteUpdateManyWithoutPatientNestedInput
    patientAttachments?: PatientAttachmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutMedicalRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    insurance?: PatientInsuranceUncheckedUpdateOneWithoutPatientNestedInput
    patientNotes?: PatientNoteUncheckedUpdateManyWithoutPatientNestedInput
    patientAttachments?: PatientAttachmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateWithoutPatientNotesInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalRecord?: MedicalRecordCreateNestedOneWithoutPatientInput
    insurance?: PatientInsuranceCreateNestedOneWithoutPatientInput
    patientAttachments?: PatientAttachmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutPatientNotesInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalRecord?: MedicalRecordUncheckedCreateNestedOneWithoutPatientInput
    insurance?: PatientInsuranceUncheckedCreateNestedOneWithoutPatientInput
    patientAttachments?: PatientAttachmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutPatientNotesInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutPatientNotesInput, PatientUncheckedCreateWithoutPatientNotesInput>
  }

  export type PatientUpsertWithoutPatientNotesInput = {
    update: XOR<PatientUpdateWithoutPatientNotesInput, PatientUncheckedUpdateWithoutPatientNotesInput>
    create: XOR<PatientCreateWithoutPatientNotesInput, PatientUncheckedCreateWithoutPatientNotesInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutPatientNotesInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutPatientNotesInput, PatientUncheckedUpdateWithoutPatientNotesInput>
  }

  export type PatientUpdateWithoutPatientNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalRecord?: MedicalRecordUpdateOneWithoutPatientNestedInput
    insurance?: PatientInsuranceUpdateOneWithoutPatientNestedInput
    patientAttachments?: PatientAttachmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutPatientNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalRecord?: MedicalRecordUncheckedUpdateOneWithoutPatientNestedInput
    insurance?: PatientInsuranceUncheckedUpdateOneWithoutPatientNestedInput
    patientAttachments?: PatientAttachmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateWithoutPatientAttachmentsInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalRecord?: MedicalRecordCreateNestedOneWithoutPatientInput
    insurance?: PatientInsuranceCreateNestedOneWithoutPatientInput
    patientNotes?: PatientNoteCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutPatientAttachmentsInput = {
    id?: string
    tenantId: string
    firstName: string
    lastName: string
    email?: string | null
    phone?: string | null
    dateOfBirth?: Date | string | null
    gender?: $Enums.Gender
    bloodGroup?: string | null
    address?: string | null
    addressLine1?: string | null
    addressLine2?: string | null
    city?: string | null
    state?: string | null
    postalCode?: string | null
    country?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    status?: $Enums.PatientStatus
    notes?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalRecord?: MedicalRecordUncheckedCreateNestedOneWithoutPatientInput
    insurance?: PatientInsuranceUncheckedCreateNestedOneWithoutPatientInput
    patientNotes?: PatientNoteUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutPatientAttachmentsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutPatientAttachmentsInput, PatientUncheckedCreateWithoutPatientAttachmentsInput>
  }

  export type PatientUpsertWithoutPatientAttachmentsInput = {
    update: XOR<PatientUpdateWithoutPatientAttachmentsInput, PatientUncheckedUpdateWithoutPatientAttachmentsInput>
    create: XOR<PatientCreateWithoutPatientAttachmentsInput, PatientUncheckedCreateWithoutPatientAttachmentsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutPatientAttachmentsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutPatientAttachmentsInput, PatientUncheckedUpdateWithoutPatientAttachmentsInput>
  }

  export type PatientUpdateWithoutPatientAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalRecord?: MedicalRecordUpdateOneWithoutPatientNestedInput
    insurance?: PatientInsuranceUpdateOneWithoutPatientNestedInput
    patientNotes?: PatientNoteUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutPatientAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    bloodGroup?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPatientStatusFieldUpdateOperationsInput | $Enums.PatientStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalRecord?: MedicalRecordUncheckedUpdateOneWithoutPatientNestedInput
    insurance?: PatientInsuranceUncheckedUpdateOneWithoutPatientNestedInput
    patientNotes?: PatientNoteUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientNoteCreateManyPatientInput = {
    id?: string
    tenantId: string
    staffId: string
    noteType: $Enums.PatientNoteType
    title: string
    content: string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientAttachmentCreateManyPatientInput = {
    id?: string
    tenantId: string
    uploadedByStaffId: string
    fileName: string
    fileType: string
    fileSize: number
    storagePath: string
    description?: string | null
    createdAt?: Date | string
  }

  export type PatientNoteUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    noteType?: EnumPatientNoteTypeFieldUpdateOperationsInput | $Enums.PatientNoteType
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientNoteUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    noteType?: EnumPatientNoteTypeFieldUpdateOperationsInput | $Enums.PatientNoteType
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientNoteUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    staffId?: StringFieldUpdateOperationsInput | string
    noteType?: EnumPatientNoteTypeFieldUpdateOperationsInput | $Enums.PatientNoteType
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientAttachmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedByStaffId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientAttachmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedByStaffId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientAttachmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    uploadedByStaffId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    storagePath?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
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