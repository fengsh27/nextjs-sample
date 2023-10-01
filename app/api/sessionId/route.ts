import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { generateRandomId, getSessionManager } from "@/app/libs/session-manager";
export function GET(request: NextRequest) {
  const id = generateRandomId();
  getSessionManager().add_id(id);
  return NextResponse.json({id});
}


