import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppointmentsModule } from "@/appointments/appointments.module";
import { AvailabilityModule } from "@/availability/availability.module";
import { BlockedSlotsModule } from "@/blocked-slots/blocked-slots.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configureAppointmentMiddleware } from "@/middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    AppointmentsModule,
    AvailabilityModule,
    BlockedSlotsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configureAppointmentMiddleware(consumer);
  }
}
