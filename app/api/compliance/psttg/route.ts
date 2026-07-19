import { NextResponse } from "next/server";
import { evaluatePsttg } from "@/lib/policy";

export async function POST(request: Request) {
  const body = await request.json();
  const result = evaluatePsttg({
    transactions: Number(body.transactions ?? 0),
    revenueEuro: Number(body.revenueEuro ?? 0),
    taxIdVerified: Boolean(body.taxIdVerified)
  });

  return NextResponse.json(result);
}
