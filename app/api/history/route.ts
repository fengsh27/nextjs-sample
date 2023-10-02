import { NextRequest, NextResponse } from "next/server";
import { getSession, createResponse } from "@/app/libs/iron-session-initializer";
import { getSessionManager, generateRandomId } from "@/app/libs/session-manager";

export async function GET(request: NextRequest) {
  
  return NextResponse.json({history: "All histories"});
}
