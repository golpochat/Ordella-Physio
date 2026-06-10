import { loadEnv } from "../env/loader";
import { marketplaceEnvSchema } from "../env/schema";
import { createLazyConfig } from "../utils";

function createMarketplaceConfig() {
  const env = loadEnv(marketplaceEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    oauthCallbackUrl: env.MARKETPLACE_OAUTH_CALLBACK_URL,
    frontendCallbackUrl: env.MARKETPLACE_FRONTEND_CALLBACK_URL,
    googleClientId: env.GOOGLE_CLIENT_ID,
    googleClientSecret: env.GOOGLE_CLIENT_SECRET,
    dropboxClientId: env.DROPBOX_CLIENT_ID,
    dropboxClientSecret: env.DROPBOX_CLIENT_SECRET,
    onedriveClientId: env.ONEDRIVE_CLIENT_ID,
    onedriveClientSecret: env.ONEDRIVE_CLIENT_SECRET,
    zoomClientId: env.ZOOM_CLIENT_ID,
    zoomClientSecret: env.ZOOM_CLIENT_SECRET,
    appointmentServiceUrl: env.APPOINTMENT_SERVICE_URL,
    notesServiceUrl: env.NOTES_SERVICE_URL,
    communicationServiceUrl: env.COMMUNICATION_SERVICE_URL,
    billingServiceUrl: env.BILLING_SERVICE_URL,
  } as const;
}

export type MarketplaceConfig = ReturnType<typeof createMarketplaceConfig>;
export const marketplaceConfig = createLazyConfig(createMarketplaceConfig);
