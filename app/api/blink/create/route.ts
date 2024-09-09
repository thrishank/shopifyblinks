import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const email = session.user?.email || "";
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const { title, description, image, price } = body;
    const blink = await prisma.blink.create({
      data: {
        title,
        description,
        image,
        price,
        email: [email],
        walletAddres: user.walletAddress!,
      },
    });
    return NextResponse.json({ data: blink }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "error updating the data" },
      { status: 500 }
    );
  }
}
