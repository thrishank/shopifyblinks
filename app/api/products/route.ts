import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const token = session?.user.accessToken;
  const shop_url = session?.user.shopifyWebsiteUrl;

  if (typeof token !== "string" || typeof shop_url !== "string") {
    return NextResponse.json(
      { error: "Invalid token or website_url" },
      { status: 400 }
    );
  }

  let url = `${shop_url}/admin/api/2024-07/products.json?limit=250`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
