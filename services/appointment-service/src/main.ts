import { NestFactory } from "@nestjs/core";
import { appointmentConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "appointment-service" }));

  const port = appointmentConfig.port ?? Number(process.env.PORT ?? 3054);
  await app.listen(port);
  console.log(`Appointment service listening on http://localhost:${port}`);
}

bootstrap();
