import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const SERVER_API_URL =
  process.env.SERVER_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000";

async function handleProxy(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const targetPath = path.join("/");
    const searchParams = req.nextUrl.search;

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Active session required",
        },
        { status: 401 }
      );
    }

    const jwtResult = await auth.api.signJWT({
      body: {
        payload: {
          sub: session.user.id,
          email: session.user.email,
          role: session.user.role || "learner",
        },
      },
    });

    const token = typeof jwtResult === "string" ? jwtResult : jwtResult?.token;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to generate JWT authentication token",
        },
        { status: 500 }
      );
    }

    const normalizedServerUrl = SERVER_API_URL.trim().replace(/\/$/, "");
    const backendUrl = `${normalizedServerUrl}/api/v1/${targetPath}${searchParams}`;

    const headers = new Headers();

    const contentType = req.headers.get("content-type");
    if (contentType) {
      headers.set("content-type", contentType);
    }

    headers.set("authorization", `Bearer ${token}`);

    let body: ArrayBuffer | undefined = undefined;
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      try {
        const buffer = await req.arrayBuffer();
        if (buffer && buffer.byteLength > 0) {
          body = buffer;
        }
      } catch {
        body = undefined;
      }
    }

    const response = await fetch(backendUrl, {
      method: req.method,
      headers,
      body,
      cache: "no-store",
    });

    const data = await response.arrayBuffer();
    const responseHeaders = new Headers();

    const responseContentType = response.headers.get("content-type");
    if (responseContentType) {
      responseHeaders.set("content-type", responseContentType);
    }

    return new NextResponse(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(
      "❌ [BFF Proxy Error]:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        success: false,
        message: "Failed to communicate with Express backend service.",
      },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
