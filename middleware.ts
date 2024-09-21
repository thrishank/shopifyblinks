import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const url = req.url;

  const response = NextResponse.next();
  response.headers.set("blink-url", url);
 
  return response;
}

export const config = {
  matcher: "/blink",
};
