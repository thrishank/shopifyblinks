import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const token = session?.user.accessToken;
  const shop_url = session?.user.shopifyWebsiteUrl;

  let url = `${shop_url}/admin/api/2024-07/products.json?limit=250`;
  console.log(url);
  try {
    const res = await axios.get(url, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
