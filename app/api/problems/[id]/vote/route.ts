import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const problem = await prisma.problem.update({
      where: {
        id: Number(id),
      },
      data: {
        votes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(problem);
  } catch {
    return NextResponse.json(
      { error: "Problem not found." },
      { status: 404 }
    );
  }
}