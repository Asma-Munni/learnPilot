import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = toNextJsHandler(auth);

export async function GET(req: NextRequest) {
  try {
    return await handler.GET(req);
  } catch (error: unknown) {
    console.error("❌ [Better Auth GET Error]:", error);
    const err = error as Error;
    return NextResponse.json(
      {
        message: "Internal Server Error in Better Auth GET handler",
        error: err?.message || String(error),
        stack: err?.stack,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handler.POST(req);
  } catch (error: unknown) {
    console.error("❌ [Better Auth POST Error]:", error);
    const err = error as Error;
    return NextResponse.json(
      {
        message: "Internal Server Error in Better Auth POST handler",
        error: err?.message || String(error),
        stack: err?.stack,
      },
      { status: 500 }
    );
  }
}