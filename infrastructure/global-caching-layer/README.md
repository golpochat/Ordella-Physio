# Global Caching Layer

Distributed caching, rate-limit storage, session cache, queue backing, and in-memory data operations for the **ordella-physio** cluster. Powered by **Redis Stack** (Redis + RediSearch, RedisJSON, RedisTimeSeries, RedisBloom).

## Quick start

```bash
cd infrastructure/global-caching-layer

# Ensure the shared Docker network exists (start deployment-layer first)
# docker compose -f ../../docker-compose.dev.yml up -d

docker compose up -d
```

| Service | URL | Purpose |
|---------|-----|---------|
| Redis | `localhost:6379` | Cache, queues, sessions, rate limits |
| Redis Stack Insight | `http://localhost:8001` | Built-in UI (redis-stack container) |
| Redis Insight | `http://localhost:8002` | Standalone Redis Insight UI |

Default password is set in `.env` (`REDIS_PASSWORD`). **Change it before production.**

## Port conflict note

Root `docker-compose.dev.yml` already runs `redis:7-alpine` on port **6379**. Do **not** run both stacks on the same host port. Either:

- Replace the deployment-layer Redis service with this layer, or
- Change `REDIS_PORT` in `.env` (e.g. `6380:6379`) when running alongside the main compose stack.

## Connect from microservices

Use the Docker network hostname `ordella-redis` from containers on `ordella_physio_backend`:

```
REDIS_URL=redis://:YOUR_PASSWORD@ordella-redis:6379
CACHE_REDIS_URL=redis://:YOUR_PASSWORD@ordella-redis:6379
QUEUE_REDIS_URL=redis://:YOUR_PASSWORD@ordella-redis:6379
```

From the host:

```
REDIS_URL=redis://:YOUR_PASSWORD@localhost:6379
```

### Multi-tenant key namespaces (recommended)

| DB / prefix | Use case |
|-------------|----------|
| `ordella:cache:{tenantId}:*` | General TTL cache |
| `ordella:session:{tenantId}:*` | User sessions, refresh tokens |
| `ordella:ratelimit:{tenantId}:*` | Token bucket / sliding window |
| `ordella:queue:*` | BullMQ / job queues |
| `ordella:idem:*` | Idempotency keys (Bloom + KV) |

Redis logical databases `0–31` can partition concerns; prefer key prefixes for cluster compatibility.

## Features (scaffold)

### Distributed cache
- Key/value and JSON document caching via Redis + RedisJSON
- TTL-based expiry (`EX`, `PX`, `SETEX`)
- Tenant-scoped keys: `ordella:cache:{tenantId}:...`
- Invalidation: `SCAN` + `DEL` / `UNLINK` by prefix (implement in `@ordella/caching`)

### Rate limiting storage
- Token bucket: `ordella:ratelimit:bucket:{tenantId}:{key}`
- Sliding window: sorted sets or RedisTimeSeries
- Per-tenant / per-user counters with TTL

### Session cache
- `ordella:session:{tenantId}:{userId}`
- Refresh token metadata, device fingerprints, temporary auth states
- Use TTL aligned with JWT refresh lifetime

### Queue backing
Backing store URLs for:
- Communication Service (`QUEUE_REDIS_URL`)
- Notification / reminder / webhook retry queues (BullMQ)

### RediSearch (optional indexes)
```redis
FT.CREATE ordella:logs ON HASH PREFIX 1 ordella:log:
FT.CREATE ordella:audit ON JSON PREFIX 1 ordella:audit:
```

### RedisTimeSeries (metrics)
```redis
TS.CREATE ordella:metrics:latency RETENTION 604800
TS.ADD ordella:metrics:latency * 42.5
```

### RedisBloom (idempotency / dedup)
```redis
BF.RESERVE ordella:bloom:events 0.01 1000000
BF.ADD ordella:bloom:events event-id-123
BF.EXISTS ordella:bloom:events event-id-123
```

## Configuration

| File | Purpose |
|------|---------|
| `redis.conf` | Core Redis: memory, persistence, modules |
| `redis-stack.conf` | Module placeholders and examples |
| `.env` | Password, ports, network name |

### Key `redis.conf` settings
- `maxmemory 2gb`, policy `allkeys-lru`
- AOF: `appendonly yes`, `appendfsync everysec`
- `databases 32`
- Password via `--requirepass` at container start

## Maintenance scripts

```bash
# Flush all databases (destructive)
./scripts/flush-all.sh

# Backup RDB/AOF to ./backups/<timestamp>/
./scripts/backup.sh

# Restore from a backup directory
./scripts/restore.sh ./backups/20250610-120000
```

On Windows, run via Git Bash or WSL.

## Redis Insight

1. Open `http://localhost:8002` (standalone) or `http://localhost:8001` (Stack bundled UI).
2. Add database: host `ordella-redis`, port `6379`, password from `.env`.
3. Browse keys, run commands, inspect JSON/time-series/bloom data.

## Health check

```bash
docker exec ordella-redis redis-cli -a "$REDIS_PASSWORD" ping
# PONG

docker exec ordella-redis redis-cli -a "$REDIS_PASSWORD" INFO modules
```

## Stop / remove

```bash
docker compose down        # keep data volume
docker compose down -v     # remove ordella_global_redis_data volume
```
