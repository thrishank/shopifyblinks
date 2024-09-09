import { PrismaClient } from "@prisma/client";
import {
  ActionError,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
} from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

const headers = createActionHeaders();
const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const data = await prisma.blink.findUnique({
      where: {
        id: id!,
      },
    });

    if (!data) {
      return new Response("Not found", { status: 404 });
    }

    const payload: ActionGetResponse = {
      title: data.title,
      description: data.description!,
      icon: data.image!,
      label: data.title,
      links: {
        actions: [
          {
            label: `Buy Now ${data.price}`,
            href: new URL(
              `/api/blink?email=${data.email}&to=${data.walletAddres}&price=${data.price}`,
              req.url
            ).toString(),
            parameters: [
              {
                name: "name",
                type: "text",
                label: "Enter your name",
                required: true,
              },
              {
                name: "adress",
                type: "textarea",
                label: "Enter your street address",
                required: true,
              },
              {
                name: "state",
                label: "Enter your state",
                type: "text",
              },
              {
                name: "zip",
                label: "Enter your zip",
                type: "text",
              },
              {
                name: "country",
                label: "Enter your country",
                type: "text",
              },
              {
                name: "agree",
                type: "checkbox",
                label: "I agree to the terms and conditions",
                options: [
                  {
                    label: "Yes",
                    value: "yes",
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, { headers });
  } catch (e) {
    let message = "An error occurred";
    return new Response(message, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, { headers });
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const to = new PublicKey(url.searchParams.get("to")!);
    const price = parseFloat(url.searchParams.get("price")!);

    const body: ActionPostRequest = await req.json();

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers,
      });
    }
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const mint_address = new PublicKey(
      // "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa"
      "9jyEAn15hMY7f5iKdUTPE5ZGaxD4BfsbHggwHFYvgF61"
    );

    try {
      var from = await getAssociatedTokenAddress(mint_address, account);
      const tokenAccount = await connection.getTokenAccountBalance(from);

      if (tokenAccount.value.uiAmount! < price) {
        throw new Error("You don't have enough USDC to buy this product");
      }
    } catch (err) {
      console.log(err);
      let message =
        "You are not a USDC Token holder. Please hold USDC tokens to buy this product";
      return Response.json({ message } as ActionError, {
        status: 403,
        headers,
      });
    }
  } catch (e) {
    console.log(e);
    let message = "An unknown error occurred";
    if (typeof e == "string") message = e;
    return new Response(message, {
      status: 400,
      headers,
    });
  }
}
