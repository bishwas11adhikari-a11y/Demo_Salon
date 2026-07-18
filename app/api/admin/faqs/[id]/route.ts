import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { question, answer } = body as { question?: string; answer?: string };

  const faq = await prisma.faq.update({
    where: { id: params.id },
    data: {
      ...(question !== undefined && { question }),
      ...(answer !== undefined && { answer }),
    },
  });

  return NextResponse.json({ faq });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.faq.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
