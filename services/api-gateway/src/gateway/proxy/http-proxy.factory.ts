import { All, Controller, Req, Res, type Type } from "@nestjs/common";
import type { Request, Response } from "express";
import type { GatewayUser, ServiceEnvKey } from "@/constants";
import { Public, SkipTenant } from "@/gateway/guards/public.decorator";
import { ProxyService } from "./proxy.service";

export type ProxyControllerOptions = {
  public?: boolean;
  skipTenant?: boolean;
};

type GatewayRequest = Request & { user?: GatewayUser };

export function createProxyController(
  basePath: string,
  serviceEnvKey: ServiceEnvKey,
  options: ProxyControllerOptions = {},
): Type<unknown> {
  const { public: isPublic = false, skipTenant = false } = options;

  @Controller(basePath)
  class ServiceProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    @All("*")
    @All()
    forward(@Req() request: GatewayRequest, @Res() response: Response) {
      return this.proxyService.forward(request, response, serviceEnvKey, request.user);
    }
  }

  if (isPublic) {
    Public()(ServiceProxyController);
  }

  if (skipTenant) {
    SkipTenant()(ServiceProxyController);
  }

  Object.defineProperty(ServiceProxyController, "name", {
    value: `ProxyController_${basePath.replace(/\//g, "_") || "root"}`,
  });

  return ServiceProxyController;
}
