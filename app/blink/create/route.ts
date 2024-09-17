import { authOptions } from "@/lib/auth";
import { encryptApiKey } from "@/lib/encrypt";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    const token = encryptApiKey(session?.user.accessToken!);
    const url = session?.user.shopifyWebsiteUrl;

    const body = await req.json();
    const { title, description, image, price, wallet, varient_id } = body;

    const blink = await prisma.blink.create({
      data: {
        title,
        description,
        image,
        price,
        walletAddres: wallet,
        accessToken: token!,
        website_url: url!,
        varient_id: varient_id.toString(),
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
