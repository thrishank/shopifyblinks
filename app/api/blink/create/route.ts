import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, image, price, wallet } = body;
    const blink = await prisma.blink.create({
      data: {
        title,
        description,
        image,
        price,
        walletAddres: wallet,
      },
    });
    return NextResponse.json(blink.id, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "error creating the blink" },
      { status: 500 }
    );
  }
}
