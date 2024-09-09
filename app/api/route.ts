import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const x = await prisma.blink.deleteMany();
  return NextResponse.json(x);
}
