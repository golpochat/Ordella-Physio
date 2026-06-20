import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "@/guards/jwt.guard";
import { TerminalManageGuard } from "@/guards/terminal-manage.guard";
import { CurrentUser, TenantId } from "@/guards/current-user.decorator";
import { PosSessionService } from "@/services/pos-session.service";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";

type OpenSessionBody = {
  terminalId: string;
  openingCash?: number;
};

type AddItemBody = {
  description: string;
  quantity: number;
  unitPrice: number;
};

type CloseSessionBody = {
  closingCash: number;
};

type ReconcileBody = {
  actualTotal: number;
};

@Controller("terminals/pos/sessions")
export class PosSessionController {
  constructor(private readonly posSessionService: PosSessionService) {}

  @Post("open")
  @UseGuards(JwtGuard, TerminalManageGuard)
  open(
    @TenantId() tenantId: string,
    @Body() body: OpenSessionBody,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.posSessionService.openSession(tenantId, user, body);
  }

  @Get()
  @UseGuards(JwtGuard, TerminalManageGuard)
  list(
    @TenantId() tenantId: string,
    @Query("terminalId") terminalId: string | undefined,
    @Query("status") status: "OPEN" | "CLOSED" | "RECONCILED" | undefined,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.posSessionService.listSessions(tenantId, user, { terminalId, status });
  }

  @Get(":id")
  @UseGuards(JwtGuard, TerminalManageGuard)
  getById(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.posSessionService.getSession(tenantId, id, user);
  }

  @Post(":id/items")
  @UseGuards(JwtGuard, TerminalManageGuard)
  addItem(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() body: AddItemBody,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.posSessionService.addItem(tenantId, id, user, body);
  }

  @Post(":id/payment-intent")
  @UseGuards(JwtGuard, TerminalManageGuard)
  createPaymentIntent(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Headers("authorization") authHeader: string | undefined,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.posSessionService.createPaymentIntent(tenantId, id, user, authHeader);
  }

  @Post(":id/close")
  @UseGuards(JwtGuard, TerminalManageGuard)
  close(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() body: CloseSessionBody,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.posSessionService.closeSession(tenantId, id, user, body);
  }

  @Post(":id/reconcile")
  @UseGuards(JwtGuard, TerminalManageGuard)
  reconcile(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() body: ReconcileBody,
    @CurrentUser() user: AuthenticatedTerminalUser,
  ) {
    return this.posSessionService.reconcileSession(tenantId, id, user, body);
  }
}
