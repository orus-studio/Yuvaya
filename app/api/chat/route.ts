import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const start = Date.now();
    const link = process.env.API_URL || "http://localhost:8000";
    const resp = await fetch(`${link}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const latency = Date.now() - start;

    const text = await resp.text();

    try {
      const json = JSON.parse(text);
      // prefer an explicit `reply` field if provided by backend
      const reply = json.reply ?? json.response ?? json;
      return NextResponse.json({ reply, latency, raw: json }, { status: resp.status });
    } catch {
      return NextResponse.json({ reply: text, latency }, { status: resp.status });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to proxy to chat server", latency: 0 },
      { status: 500 }
    );
  }
}
