import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";

import { SecurityGuardsModule } from "@ordella/security";

import { DatabaseModule } from "@/database/database.module";

import { NotificationProviderModule } from "@/notification-provider.module";

import { configureNotificationProviderMiddleware } from "@/middleware";



@Module({

  imports: [

    SecurityGuardsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({

      isGlobal: true,

      envFilePath: [".env", ".env.local"],

    }),

    DatabaseModule,

    NotificationProviderModule,

  ],

})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    configureNotificationProviderMiddleware(consumer);

  }

}


