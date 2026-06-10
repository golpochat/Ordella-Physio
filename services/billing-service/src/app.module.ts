import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InvoicesModule } from "@/invoices/invoices.module";
import { TaxRatesModule } from "@/tax-rates/tax-rates.module";
import { DiscountsModule } from "@/discounts/discounts.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configureBillingMiddleware } from "@/middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    InvoicesModule,
    TaxRatesModule,
    DiscountsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureBillingMiddleware(consumer);
  }
}
