import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  if (!BASE_URL) {
    return NextResponse.json(
      { detail: "API URL not configured." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { detail: "Invalid request body." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(`${BASE_URL}/applications/status/check/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { detail: "Failed to reach the application server." },
      { status: 502 },
    );
  }
}
