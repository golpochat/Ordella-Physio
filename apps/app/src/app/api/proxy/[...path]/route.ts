import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_TENANT_ID,
  getGatewayUrl,
  HEADER_TENANT_ID,
} from "@/lib/constants";

async function proxyRequest(request: NextRequest, path: string) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN)?.value;
  const tenantId = cookieStore.get(COOKIE_TENANT_ID)?.value ?? request.headers.get(HEADER_TENANT_ID);

  const url = `${getGatewayUrl()}/${path}${request.nextUrl.search}`;
  const headers = new Headers(request.headers);
  headers.delete("host");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  if (tenantId) headers.set(HEADER_TENANT_ID, tenantId);

  const body =
    request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();

  const upstream = await fetch(url, {
    method: request.method,
    headers,
    body,
  });

  const responseBody = await upstream.arrayBuffer();
  const response = new NextResponse(responseBody, { status: upstream.status });
  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "transfer-encoding") {
      response.headers.set(key, value);
    }
  });
  return response;
}

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path.join("/"));
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path.join("/"));
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path.join("/"));
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path.join("/"));
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(request, params.path.join("/"));
}
