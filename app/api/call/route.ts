import { NextResponse } from "next/server";
import Retell from "retell-sdk";
import { prisma } from "@/lib/prisma";
import { buildSystemPrompt } from "@/lib/system-prompt";

export async function POST() {
  const agentId = process.env.RETELL_AGENT_ID;
  const apiKey = process.env.RETELL_API_KEY;

  if (!agentId || !apiKey) {
    return NextResponse.json(
      {
        error:
          "Retell is not configured. Set RETELL_API_KEY and RETELL_AGENT_ID in your .env file.",
      },
      { status: 500 }
    );
  }

  const business = await prisma.business.findFirst({
    orderBy: { createdAt: "asc" },
    include: { faqs: { orderBy: { order: "asc" } } },
  });

  if (!business) {
    return NextResponse.json(
      { error: "No business found. Run `npm run db:seed` first." },
      { status: 404 }
    );
  }

  const systemPrompt = buildSystemPrompt(business, business.faqs);

  const retell = new Retell({ apiKey });

  try {
    const webCall = await retell.call.createWebCall({
      agent_id: agentId,
      retell_llm_dynamic_variables: {
        system_prompt: systemPrompt,
      },
    });

    return NextResponse.json({
      accessToken: webCall.access_token,
      callId: webCall.call_id,
      businessId: business.id,
    });
  } catch (error) {
    console.error("Failed to create Retell web call", error);
    return NextResponse.json(
      { error: "Could not start the call. Check your Retell credentials." },
      { status: 502 }
    );
  }
}
