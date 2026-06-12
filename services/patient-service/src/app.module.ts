import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SecurityGuardsModule } from "@ordella/security";
import { PatientsModule } from "@/patients/patients.module";
import { MedicalRecordsModule } from "@/medical-records/medical-records.module";
import { PatientNotesModule } from "@/patient-notes/patient-notes.module";
import { PatientAttachmentsModule } from "@/patient-attachments/patient-attachments.module";
import { DatabaseModule } from "@/database/database.module";
import { EventsModule } from "@/events/events.module";
import { configurePatientMiddleware } from "@/middleware";

@Module({
  imports: [
    SecurityGuardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    DatabaseModule,
    EventsModule,
    PatientsModule,
    MedicalRecordsModule,
    PatientNotesModule,
    PatientAttachmentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    configurePatientMiddleware(consumer);
  }
}
