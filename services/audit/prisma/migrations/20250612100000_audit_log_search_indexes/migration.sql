-- GIN index for metadata JSONB search
CREATE INDEX IF NOT EXISTS "audit_logs_metadata_gin_idx" ON "audit_logs" USING GIN ("metadata");
