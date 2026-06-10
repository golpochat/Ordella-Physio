import { Module } from "@nestjs/common";
import { AttachmentsService } from "@/attachments/attachments.service";
import { AttachmentsRepository } from "@/attachments/attachments.repository";

@Module({
  providers: [AttachmentsService, AttachmentsRepository],
  exports: [AttachmentsService, AttachmentsRepository],
})
export class AttachmentsModule {}
