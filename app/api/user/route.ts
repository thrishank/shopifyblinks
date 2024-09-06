import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { email, clerkId } = body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email,
          clerkId,
        },
      });
    }
    return NextResponse.json(
      { message: "User saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving user", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
