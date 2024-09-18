import { authOptions } from "@/lib/auth";
import { encryptApiKey } from "@/lib/encrypt";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
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

    const cuurency_api_key = process.env.CURRENCY_API_KEY;
    const currency_url = `https://v6.exchangerate-api.com/v6/${cuurency_api_key}/latest/USD`;

    const currency = session?.user.currency;

    var updated_price = price;
    if (currency != "USD") {
      // if is to prevent the unnecessary api call
      const res = await axios.get(currency_url);
      const data = res.data.conversion_rates[currency!];
      const update_price_float = price / data;
      updated_price = update_price_float.toString();
    }
    console.log(updated_price);

    const blink = await prisma.blink.create({
      data: {
        title,
        description,
        image,
        price: updated_price,
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
