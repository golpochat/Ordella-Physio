-- Align subscriptionStatus column with Prisma OrganizationSubscriptionStatus enum
CREATE TYPE "OrganizationSubscriptionStatus" AS ENUM ('ACTIVE', 'TRIALING', 'PAST_DUE', 'CANCELED');

ALTER TABLE "organizations"
  ALTER COLUMN "subscriptionStatus" TYPE "OrganizationSubscriptionStatus"
  USING (
    CASE
      WHEN "subscriptionStatus" IS NULL THEN NULL
      WHEN UPPER(REPLACE("subscriptionStatus", '-', '_')) IN ('ACTIVE', 'TRIALING', 'PAST_DUE', 'CANCELED')
        THEN UPPER(REPLACE("subscriptionStatus", '-', '_'))::"OrganizationSubscriptionStatus"
      ELSE NULL
    END
  );
