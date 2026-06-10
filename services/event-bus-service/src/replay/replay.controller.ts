import { Controller, Get, Post, Query } from "@nestjs/common";
import { replayEventsSchema, UseZodValidation } from "@ordella/validation";
import { ReplayService } from "@/replay/replay.service";
import type { ReplayEventsDto } from "@/replay/dto/replay-events.dto";

@Controller("event-bus")
export class EventBusHealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "event-bus-service" };
  }
}

@Controller("replay")
export class ReplayController {
  constructor(private readonly replayService: ReplayService) {}

  @Post()
  @UseZodValidation(replayEventsSchema)
  replay(@Query() dto: ReplayEventsDto) {
    return this.replayService.replay(dto);
  }
}
