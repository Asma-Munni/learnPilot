import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handleAuth(
  request: NextRequest,
): Promise<Response> {
  const { auth } = await import("@/lib/auth");

  return auth.handler(request);
}

export {
  handleAuth as GET,
  handleAuth as POST,
};