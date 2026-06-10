# Tenant Region Mapping

Each clinic tenant is assigned a **home region** that determines where writes are processed and which regional stack owns the tenant's primary data.

## Data model

The `Tenant` model includes:

```
homeRegion  String  @default("eu-west")
```

Valid values: `eu-west`, `us-east`, `apac`.

### Defaults

| Scenario | Home region |
|----------|-------------|
| New tenant (no region specified) | `eu-west` |
| US-based clinic (explicit) | `us-east` |
| APAC clinic (explicit) | `apac` |

Set home region at tenant creation:

```json
POST /tenants
{
  "name": "London Physio",
  "slug": "london-physio",
  "homeRegion": "eu-west"
}
```

Update home region (Super Admin / Owner only):

```json
PATCH /tenants/:id
{
  "homeRegion": "us-east"
}
```

Migrating a tenant's home region requires a data migration window — update `homeRegion` only after data has been copied to the target region's primary.

## Routing behavior

### Standard users

1. User hits nearest regional gateway (via geo-DNS)
2. Gateway resolves `tenant.homeRegion` from tenant-service
3. If current region matches home region → process locally
4. If mismatch → gateway proxies request to home region API URL

### Super Admin (`SYSTEM` role)

- Cross-region routing is bypassed by default
- Super Admin can access all regions from any entry point
- Use `x-target-region: us-east` to explicitly query a specific region

### Response headers

| Header | Value |
|--------|-------|
| `x-ordella-region` | Region that served the response |
| `x-target-region` | (Request) Override region for SYSTEM users |

## Lookup API

Internal endpoint for gateway region resolution:

```
GET /tenants/internal/home-region/:tenantId
```

Response:

```json
{
  "tenantId": "abc123",
  "homeRegion": "eu-west"
}
```

## Tenant isolation

Region routing does not weaken tenant isolation:

- JWT and `x-tenant-id` are enforced at every regional gateway
- NATS subjects include tenant ID: `ordella.events.{tenantId}.*`
- Postgres row-level scoping by `tenantId` is unchanged
- Read replicas inherit the same tenant-scoped data

## Mapping reference

| Region code | AWS region | GCP region | Typical tenants |
|-------------|------------|------------|-----------------|
| `eu-west` | `eu-west-1` | `europe-west2` | UK, EU clinics |
| `us-east` | `us-east-1` | `us-east1` | North America |
| `apac` | `ap-southeast-1` | `asia-southeast1` | Australia, SE Asia |

## Configuration

Regional gateway environment variables:

```env
ORDELLA_REGION=eu-west
REGION_ROUTING_ENABLED=true
REGION_ENDPOINT_EU_WEST=https://api.eu.ordella-physio.com
REGION_ENDPOINT_US_EAST=https://api.us.ordella-physio.com
REGION_ENDPOINT_APAC=https://api.apac.ordella-physio.com
```

Disable region routing for single-region dev:

```env
REGION_ROUTING_ENABLED=false
```
