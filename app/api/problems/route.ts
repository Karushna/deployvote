import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = body.title?.trim();
    const description = body.description?.trim();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required." },
        { status: 400 }
      );
    }

    const problem = await prisma.problem.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(problem, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create problem." },
      { status: 500 }
    );
  }
}