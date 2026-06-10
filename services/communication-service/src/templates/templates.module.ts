import { Module } from "@nestjs/common";
import { TemplatesController } from "@/templates/templates.controller";
import { TemplatesService } from "@/templates/templates.service";
import { TemplatesRepository } from "@/templates/templates.repository";
import { NotificationsModule } from "@/notifications/notifications.module";

@Module({
  imports: [NotificationsModule],
  controllers: [TemplatesController],
  providers: [TemplatesService, TemplatesRepository],
  exports: [TemplatesService, TemplatesRepository],
})
export class TemplatesModule {}
