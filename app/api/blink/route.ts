import { PrismaClient } from "@prisma/client";
import {
  ActionError,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createActionHeaders,
  createPostResponse,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
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
              `/api/blink?to=${data.walletAddres}&price=${data.price}&id=${id}`,
              req.url
            ).toString(),
            parameters: [
              {
                name: "email",
                type: "email",
                label: "Enter your email",
                required: true,
              },
              {
                name: "phone",
                type: "number",
                label: "phone number with country code",
              },
              {
                name: "name",
                type: "text",
                label: "Enter your name",
                required: true,
              },
              {
                name: "adress",
                type: "textarea",
                label: "Address",
                required: true,
              },
              {
                name: "state",
                label: "Enter your state",
                type: "text",
              },
              {
                name: "zip",
                label: "PIN CODE",
                type: "text",
              },
              {
                name: "city",
                label: "city",
                type: "text",
              },
              {
                name: "country",
                label: "country/Region",
                type: "text",
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
    const to = new PublicKey(url.searchParams.get("to")!);
    const price = parseFloat(url.searchParams.get("price")!);
    const id = url.searchParams.get("id")!;

    const body: ActionPostRequest = await req.json();

    const connection = new Connection(
      clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

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
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      // "9jyEAn15hMY7f5iKdUTPE5ZGaxD4BfsbHggwHFYvgF61"
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
    const toAddr = await getAssociatedTokenAddress(mint_address, to);

    const instruction = createTransferInstruction(
      from,
      toAddr,
      account,
      price * 1_000_000
    );

    const tx = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(instruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction: tx,
        message:
          "If your transaction is successful and if you haven't received the confirmation email, please contact the support",
        links: {
          next: {
            type: "post",
            href: `/api/blink/confirm?&data=${JSON.stringify(
              body.data
            )}&id=${id}`,
          },
        },
      },
    });

    return Response.json(payload, { headers });
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
