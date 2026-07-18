import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { businessId, question, answer } = body as {
    businessId?: string;
    question?: string;
    answer?: string;
  };

  if (!businessId || !question || !answer) {
    return NextResponse.json(
      { error: "businessId, question, and answer are required." },
      { status: 400 }
    );
  }

  const count = await prisma.faq.count({ where: { businessId } });

  const faq = await prisma.faq.create({
    data: { businessId, question, answer, order: count },
  });

  return NextResponse.json({ faq });
}
