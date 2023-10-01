import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getSessionManager, generateRandomId } from "@/app/libs/session-manager";
export async function GET(request: NextRequest) {
  const id = generateRandomId();
  const sessionMgr = await getSessionManager();
  await sessionMgr?.add_id(id);
  return NextResponse.json({id});
}


