import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PaymentIntentsModule } from "@/payment-intents/payment-intents.module";
import { RefundsModule } from "@/refunds/refunds.module";
import { PayoutsModule } from "@/payouts/payouts.module";
import { LedgerModule } from "@/ledger/ledger.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configurePaymentMiddleware } from "@/middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    PaymentIntentsModule,
    RefundsModule,
    PayoutsModule,
    LedgerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configurePaymentMiddleware(consumer);
  }
}
