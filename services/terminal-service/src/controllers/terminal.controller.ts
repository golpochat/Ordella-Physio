import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import type { CreateTerminalPayload, UpdateTerminalPayload } from "@/models/Terminal";
import { TerminalService } from "@/services/terminal.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { TerminalManageGuard } from "@/guards/terminal-manage.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";

@Controller("terminals")
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "terminal-service" };
  }

  @Get()
  @UseGuards(JwtGuard, TerminalManageGuard)
  list(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.terminalService.listTerminals(query, user);
  }

  @Post()
  @UseGuards(JwtGuard, TerminalManageGuard)
  create(
    @Body() payload: CreateTerminalPayload,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.terminalService.createTerminal(payload, user);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TerminalManageGuard)
  getById(@Param("id") id: string, @CurrentUser() user: AuthenticatedTerminalUser) {
    return this.terminalService.getTerminal(id, user);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TerminalManageGuard)
  update(
    @Param("id") id: string,
    @Body() payload: UpdateTerminalPayload,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.terminalService.updateTerminal(id, payload, user);
  }

  @Post(":id/deactivate")
  @UseGuards(JwtGuard, TerminalManageGuard)
  deactivate(@Param("id") id: string, @CurrentUser() user: AuthenticatedTerminalUser) {
    return this.terminalService.deactivateTerminal(id, user);
  }

  @Post(":id/activate")
  @UseGuards(JwtGuard, TerminalManageGuard)
  activate(@Param("id") id: string, @CurrentUser() user: AuthenticatedTerminalUser) {
    return this.terminalService.activateTerminal(id, user);
  }
}
