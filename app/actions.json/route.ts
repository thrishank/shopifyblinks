import { ActionsJson, createActionHeaders } from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      // map all root level routes to an action
      {
        pathPattern: "/*",
        apiPath: "/*",
      },
      // idempotent rule as the fallback
      {
        pathPattern: "/**",
        apiPath: "/**",
      },
    ],
  };

  return Response.json(payload, {
    headers: createActionHeaders(),
  });
};

export const OPTIONS = GET;
