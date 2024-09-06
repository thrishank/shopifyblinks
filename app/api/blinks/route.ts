import { ActionGetResponse, createActionHeaders } from "@solana/actions";

const headers = createActionHeaders();
// const prisma = new PrismaClient();

export function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const payload: ActionGetResponse = {
      title: "Blink",
      description: "",
      icon: "",
      label: "",
      links: {
        actions: [
          {
            label: "Buy Now",
            href: "",
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
                label: "Enter your address",
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
