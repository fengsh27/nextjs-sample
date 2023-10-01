import { NextRequest, NextResponse } from "next/server";
import { getSession, createResponse } from "@/app/libs/iron-session-initializer";
import { getSessionManager, generateRandomId } from "@/app/libs/session-manager";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization");
  const sessionMgr = await getSessionManager();
  const has_id = await sessionMgr?.has_id(auth??"");
  if (!auth || !has_id) {
    return NextResponse.json({error: "Bad Request"}, {status: 400});
  }
  await sessionMgr?.refresh_id(auth);
  return NextResponse.json({history: "All histories"});
}
