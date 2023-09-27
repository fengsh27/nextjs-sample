import { NextRequest, NextResponse } from "next/server";
import { getSession, createResponse } from "@/app/libs/iron-session-initializer";
import { generateRandomId } from "@/app/libs/session-manager";

export async function GET(request: NextRequest) {
  const response = new Response();
  const session = await getSession(request, response);
  if (!session.id) {
    session.id = generateRandomId();
    await session.save();
  }

  return response;
}
