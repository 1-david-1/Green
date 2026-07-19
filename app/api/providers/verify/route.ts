import { NextResponse } from "next/server";
import { determineProviderCategory, type ProviderVerificationInput } from "@/lib/policy";

export async function POST(request: Request) {
  const body = (await request.json()) as ProviderVerificationInput;

  try {
    const result = determineProviderCategory(body);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Verification failed"
      },
      { status: 400 }
    );
  }
}
