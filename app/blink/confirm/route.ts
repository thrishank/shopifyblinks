import { decryptApiKey } from "@/lib/encrypt";
import { PrismaClient } from "@prisma/client";
import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  CompletedAction,
} from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";

const headers = createActionHeaders();

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers,
  });
};

export const OPTIONS = async () => Response.json(null, { headers });

interface dataType {
  email: string;
  phone?: string;
  name: string;
  address: string;
  state?: string;
  zip?: string;
  city?: string;
  country?: string;
}
const prisma = new PrismaClient();
export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);

    const data: dataType = JSON.parse(url.searchParams.get("data")!);
    const id = url.searchParams.get("id")!;

    const db_data = await prisma.blink.findUnique({
      where: { id },
    });

    const body: NextActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }

    let signature: string;
    try {
      signature = body.signature;
      if (!signature) throw "Invalid signature";
    } catch (err) {
      throw 'Invalid "signature" provided';
    }

    const connection = new Connection(clusterApiUrl("devnet"), {
      commitment: "confirmed",
    });

    try {
      let status = await connection.getSignatureStatus(signature);

      console.log("signature status:", status);

      if (!status) throw "Unknown signature status";

      // only accept `confirmed` and `finalized` transactions
      if (status.value?.confirmationStatus) {
        if (
          status.value.confirmationStatus != "confirmed" &&
          status.value.confirmationStatus != "finalized"
        ) {
          throw "Unable to confirm the transaction";
        }
      }
    } catch (err) {
      if (typeof err == "string") throw err;
      throw "Unable to confirm the provided signature";
    }

    /**
     * !TAKE CAUTION!
     *
     * since any client side request can access this public endpoint,
     * a malicious actor could provide a valid signature that does NOT
     * perform the previous action's transaction.
     *
     * todo: validate this transaction is what you expected the user to perform in the previous step
     */

    const transaction = await connection.getParsedTransaction(
      signature,
      "confirmed"
    );

    console.log("transaction: ", transaction);

    const orderData = {
      order: {
        email: data.email,
        fulfillment_status: "fulfilled",
        send_receipt: true,
        notify_customer: true,
        line_items: [
          {
            variant_id: 45614942421220,
            quantity: 1,
          },
        ],
        shipping_address: {
          first_name: data.name,
          address1: data.country,
          phone: data.phone,
          city: data.city,
          province: data.state,
          country: data.country,
          zip: data.zip,
        },
        note: "Ordered via Solana blinks",
        note_attributes: [
          {
            name: "payment_method",
            value: "cryptocurrency",
          },
          {
            name: "Transaction Signature",
            value: signature,
          },
          {
            name: "payer wallet address",
            value: account.toBase58(),
          },
        ],
      },
    };

    const shopifyWebsiteUrl = `${db_data?.website_url}/admin/api/2024-07/orders.json`;
    const token = decryptApiKey(db_data?.accessToken!);

    axios.post(shopifyWebsiteUrl, JSON.stringify(orderData), {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    const payload: CompletedAction = {
      type: "completed",
      title: "Order Created Successfully",
      icon: "https://i.sstatic.net/YbIni.png",
      label: "Complete!",
      description: `Your order has been created successfully. Please check your email for confirmation.`,
    };

    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};
