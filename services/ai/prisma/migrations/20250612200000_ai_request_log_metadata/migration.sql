-- AlterTable
ALTER TABLE "ai_request_logs" ADD COLUMN "metadata" JSONB NOT NULL DEFAULT '{}';
