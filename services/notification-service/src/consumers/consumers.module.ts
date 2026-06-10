import { Module } from "@nestjs/common";
import { NotificationsModule } from "@/notifications/notifications.module";
import { PlatformEventsConsumer } from "@/consumers/platform-events.consumer";

@Module({
  imports: [NotificationsModule],
  providers: [PlatformEventsConsumer],
})
export class ConsumersModule {}
