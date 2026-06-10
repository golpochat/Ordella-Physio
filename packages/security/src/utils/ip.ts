import type { Request } from "express";

const IPV4_PATTERN =
  /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)$/;
const IPV6_PATTERN = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

export function getClientIp(request: Request): string {
  const forwarded = request.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() ?? request.ip ?? "unknown";
  }

  return request.ip ?? request.socket.remoteAddress ?? "unknown";
}

export function validateIp(ip: string): boolean {
  const trimmed = ip.trim();
  return IPV4_PATTERN.test(trimmed) || IPV6_PATTERN.test(trimmed);
}
