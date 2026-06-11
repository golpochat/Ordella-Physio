import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { authConfig } from "@ordella/config";
import { GlobalExceptionFilter } from "@ordella/errors";
import { AppModule } from "@/app.module";
import { getAvatarUploadDir } from "@/utils/fileUpload";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter({ loggerContext: "auth-service" }));
  app.useStaticAssets(getAvatarUploadDir(), { prefix: "/auth/uploads/avatars/" });

  const port = authConfig.port ?? Number(process.env.PORT ?? 3051);
  await app.listen(port);
  console.log(`Auth service listening on http://localhost:${port}`);
}

bootstrap();
