import { Pool, type PoolClient, type QueryResultRow } from "pg";
import Redis from "ioredis";
import { WORKFLOW_CONFIG } from "./stack";

export type DatabaseName =
  | "ordella_auth"
  | "ordella_tenant"
  | "ordella_patient"
  | "ordella_appointment"
  | "ordella_notes"
  | "ordella_billing"
  | "ordella_subscription_billing"
  | "ordella_ai_notes"
  | "ordella_marketplace"
  | "ordella_file_storage"
  | "ordella_audit";

const pools = new Map<DatabaseName, Pool>();

function buildConnectionString(database: DatabaseName): string {
  const { host, port, user, password } = WORKFLOW_CONFIG.postgres;
  return `postgresql://${user}:${password}@${host}:${port}/${database}?schema=public`;
}

export function getDbPool(database: DatabaseName): Pool {
  const existing = pools.get(database);
  if (existing) {
    return existing;
  }

  const pool = new Pool({
    connectionString: buildConnectionString(database),
    max: 4,
    idleTimeoutMillis: 10_000,
  });

  pools.set(database, pool);
  return pool;
}

export async function queryDb<T extends QueryResultRow = QueryResultRow>(
  database: DatabaseName,
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const pool = getDbPool(database);
  const result = await pool.query<T>(sql, params);
  return result.rows;
}

export async function withTransaction<T>(
  database: DatabaseName,
  callback: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const pool = getDbPool(database);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function probePostgres(): Promise<boolean> {
  try {
    const rows = await queryDb("ordella_auth", "SELECT 1 AS ok");
    return rows[0]?.ok === 1;
  } catch {
    return false;
  }
}

export async function countAuthUsers(tenantId: string): Promise<number> {
  const rows = await queryDb<{ count: string }>(
    "ordella_auth",
    `SELECT COUNT(*)::text AS count FROM users WHERE "tenantId" = $1`,
    [tenantId],
  );
  return Number(rows[0]?.count ?? 0);
}

export async function findAuthUserByEmail(tenantId: string, email: string) {
  const rows = await queryDb(
    "ordella_auth",
    `SELECT id, "tenantId", email, role, "isActive" FROM users WHERE "tenantId" = $1 AND email = $2 LIMIT 1`,
    [tenantId, email],
  );
  return rows[0] ?? null;
}

export async function countPatients(tenantId: string): Promise<number> {
  try {
    const rows = await queryDb<{ count: string }>(
      "ordella_patient",
      `SELECT COUNT(*)::text AS count FROM patients WHERE "tenantId" = $1`,
      [tenantId],
    );
    return Number(rows[0]?.count ?? 0);
  } catch {
    return -1;
  }
}

export async function countAppointments(tenantId: string): Promise<number> {
  try {
    const rows = await queryDb<{ count: string }>(
      "ordella_appointment",
      `SELECT COUNT(*)::text AS count FROM appointments WHERE "tenantId" = $1`,
      [tenantId],
    );
    return Number(rows[0]?.count ?? 0);
  } catch {
    return -1;
  }
}

export async function countNotes(tenantId: string): Promise<number> {
  try {
    const rows = await queryDb<{ count: string }>(
      "ordella_notes",
      `SELECT COUNT(*)::text AS count FROM notes WHERE "tenantId" = $1`,
      [tenantId],
    );
    return Number(rows[0]?.count ?? 0);
  } catch {
    return -1;
  }
}

export async function countAuditLogs(tenantId: string, action?: string): Promise<number> {
  try {
    const rows = action
      ? await queryDb<{ count: string }>(
          "ordella_audit",
          `SELECT COUNT(*)::text AS count FROM audit_logs WHERE "tenantId" = $1 AND action = $2`,
          [tenantId, action],
        )
      : await queryDb<{ count: string }>(
          "ordella_audit",
          `SELECT COUNT(*)::text AS count FROM audit_logs WHERE "tenantId" = $1`,
          [tenantId],
        );
    return Number(rows[0]?.count ?? 0);
  } catch {
    return -1;
  }
}

export async function getSubscriptionStatus(tenantId: string): Promise<string | null> {
  try {
    const rows = await queryDb<{ status: string }>(
      "ordella_subscription_billing",
      `SELECT status FROM tenant_subscriptions WHERE "tenantId" = $1 LIMIT 1`,
      [tenantId],
    );
    return rows[0]?.status ?? null;
  } catch {
    return null;
  }
}

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(WORKFLOW_CONFIG.redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 3_000,
      lazyConnect: true,
    });
  }
  return redisClient;
}

export async function probeRedis(): Promise<boolean> {
  try {
    const client = getRedisClient();
    await client.connect();
    const pong = await client.ping();
    return pong === "PONG";
  } catch {
    return false;
  }
}

export async function closeDbConnections(): Promise<void> {
  await Promise.all(Array.from(pools.values()).map((pool) => pool.end()));
  pools.clear();
  if (redisClient) {
    redisClient.disconnect();
    redisClient = null;
  }
}
