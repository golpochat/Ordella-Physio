import { Injectable, Logger } from "@nestjs/common";
import { NatsService } from "@/nats/nats.service";
import type { ReplayEventsDto } from "@/replay/dto/replay-events.dto";
import { parseDateRange } from "@/utils/replay-date-helpers";

@Injectable()
export class ReplayService {
  private readonly logger = new Logger(ReplayService.name);

  constructor(private readonly natsService: NatsService) {}

  async replay(dto: ReplayEventsDto) {
    const { start, end } = parseDateRange(dto.startDate, dto.endDate);
    const manager = await this.natsService.getConnection().jetstreamManager();
    const streamInfo = await manager.streams.info(dto.stream);

    this.logger.log(
      `Replay placeholder for stream=${dto.stream} subject=${dto.subject ?? "*"} tenant=${dto.tenantId ?? "*"}`,
    );

    return {
      stream: dto.stream,
      subject: dto.subject,
      tenantId: dto.tenantId,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      messagesReplayed: 0,
      streamSequence: streamInfo.state.last_seq,
      status: "queued",
    };
  }
}
