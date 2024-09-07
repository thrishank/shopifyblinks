import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { formData, walletInfo } = body;
    console.log(formData, walletInfo)
    const data = await prisma.user.update({
      where: {
        email: formData.email,
      },
      data: {
        shopifyAccessToken: formData.shopifyAccessToken,
        shopifyWebsite: formData.shopifyWebsiteUrl,
        walletAddress: walletInfo?.address,
        currency: formData.defaultCurrency,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 400 });
  }
}
