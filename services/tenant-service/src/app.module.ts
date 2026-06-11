import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SecurityGuardsModule } from "@ordella/security";
import { TenantsModule } from "@/tenants/tenants.module";
import { LocationsModule } from "@/locations/locations.module";
import { StaffModule } from "@/staff/staff.module";
import { BrandingModule } from "@/branding/branding.module";
import { SubscriptionModule } from "@/subscription/subscription.module";
import { BillingModule } from "@/billing/billing.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configureTenantMiddleware } from "@/middleware";

@Module({
  imports: [
    SecurityGuardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    TenantsModule,
    LocationsModule,
    StaffModule,
    BrandingModule,
    SubscriptionModule,
    BillingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureTenantMiddleware(consumer);
  }
}
