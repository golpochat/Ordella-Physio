import { Module } from "@nestjs/common";
import { MedicalRecordsService } from "@/medical-records/medical-records.service";
import { MedicalRecordsRepository } from "@/medical-records/medical-records.repository";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [EventsModule],
  providers: [MedicalRecordsService, MedicalRecordsRepository],
  exports: [MedicalRecordsService, MedicalRecordsRepository],
})
export class MedicalRecordsModule {}
