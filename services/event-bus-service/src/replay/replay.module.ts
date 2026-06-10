import { Module } from "@nestjs/common";
import { EventBusHealthController, ReplayController } from "@/replay/replay.controller";
import { ReplayService } from "@/replay/replay.service";

@Module({
  controllers: [EventBusHealthController, ReplayController],
  providers: [ReplayService],
  exports: [ReplayService],
})
export class ReplayModule {}
