import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { TranscriptTurn } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json();
  const { businessId, startedAt, transcript } = body as {
    businessId?: string;
    startedAt?: string;
    transcript?: TranscriptTurn[];
  };

  if (!businessId || !Array.isArray(transcript)) {
    return NextResponse.json(
      { error: "businessId and transcript are required." },
      { status: 400 }
    );
  }

  const callLog = await prisma.callLog.create({
    data: {
      businessId,
      startedAt: startedAt ? new Date(startedAt) : new Date(),
      transcript: JSON.stringify(transcript),
    },
  });

  return NextResponse.json({ id: callLog.id });
}
