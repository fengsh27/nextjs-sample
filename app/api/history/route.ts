import { NextRequest, NextResponse } from "next/server";
import { getSession, createResponse } from "@/app/libs/iron-session-initializer";
import { getSessionManager, generateRandomId } from "@/app/libs/session-manager";

export async function GET(request: NextRequest) {
  const auth = request.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json({error: "Bad Request"}, {status: 401});
  }
  return NextResponse.json({history: "All histories"});
}
