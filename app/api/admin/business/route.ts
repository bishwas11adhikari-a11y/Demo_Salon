import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { BusinessHours } from "@/lib/business-hours";

export async function PATCH(request: Request) {
  const body = await request.json();
  const {
    id,
    name,
    description,
    greeting,
    aiInstructions,
    businessHours,
  } = body as {
    id?: string;
    name?: string;
    description?: string;
    greeting?: string;
    aiInstructions?: string;
    businessHours?: BusinessHours;
  };

  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const business = await prisma.business.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(greeting !== undefined && { greeting }),
      ...(aiInstructions !== undefined && { aiInstructions }),
      ...(businessHours !== undefined && {
        businessHours: JSON.stringify(businessHours),
      }),
    },
  });

  return NextResponse.json({ business });
}
