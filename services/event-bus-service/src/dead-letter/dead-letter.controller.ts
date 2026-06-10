import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { listDeadLetterSchema, UseZodValidation } from "@ordella/validation";
import { DeadLetterService } from "@/dead-letter/dead-letter.service";
import type { ListDeadLetterDto } from "@/dead-letter/dto/list-dead-letter.dto";

@Controller("dead-letter")
export class DeadLetterController {
  constructor(private readonly deadLetterService: DeadLetterService) {}

  @Get()
  @UseZodValidation(listDeadLetterSchema)
  list(@Query() query: ListDeadLetterDto) {
    return this.deadLetterService.list(query);
  }

  @Post(":id/retry")
  retry(@Param("id") id: string) {
    return this.deadLetterService.retry(id);
  }
}
