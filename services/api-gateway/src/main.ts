import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { gatewayConfig } from "@ordella/config";
import { CORRELATION_ID_HEADER, TENANT_HEADER } from "@ordella/middleware";
import { SanitizePipe } from "@ordella/validation";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const config = gatewayConfig;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }), new SanitizePipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Ordella API Gateway")
    .setDescription("Unified entry point for Ordella Physio microservices")
    .setVersion(process.env.SERVICE_VERSION ?? "0.0.0")
    .addBearerAuth()
    .addApiKey({ type: "apiKey", name: TENANT_HEADER, in: "header" }, "tenant")
    .addApiKey({ type: "apiKey", name: CORRELATION_ID_HEADER, in: "header" }, "correlation")
    .addTag("auth", "Authentication service routes")
    .addTag("tenant", "Tenant service routes")
    .addTag("patient", "Patient service routes")
    .addTag("appointment", "Appointment service routes")
    .addTag("notes", "Notes service routes")
    .addTag("billing", "Billing service routes")
    .addTag("payment", "Payment service routes")
    .addTag("communication", "Communication service routes")
    .addTag("reporting", "Reporting service routes")
    .addTag("health", "Gateway health and metrics")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  await app.listen(config.port);
  console.log(`API Gateway listening on http://localhost:${config.port}`);
}

bootstrap();
