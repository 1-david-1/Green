import { NextResponse } from "next/server";
import { validateWorkSlot } from "@/lib/policy";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateWorkSlot({
      dateOfBirth: String(body.dateOfBirth ?? ""),
      startTime: String(body.startTime ?? "08:00"),
      endTime: String(body.endTime ?? "10:00"),
      taskKey: String(body.taskKey ?? "weeding"),
      alreadyWorkedMinutesToday: Number(body.alreadyWorkedMinutesToday ?? 0),
      workedDaysThisWeek: Number(body.workedDaysThisWeek ?? 0),
      earnedThisMonthEuro: Number(body.earnedThisMonthEuro ?? 0)
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Invalid slot payload"
      },
      { status: 400 }
    );
  }
}
