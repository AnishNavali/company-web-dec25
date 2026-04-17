import { NextRequest, NextResponse } from "next/server";
import { runAgent } from "@/server/lib/llm";
import { instructions, context } from "@/server/bots/customers";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const response = await runAgent({
      instructions,
      userMessage: `
        <context>
        ${context}
        </context>

        <user_message>
        ${message}
        </user_message>
      `,
    });

    return NextResponse.json({ response });
  } catch (err) {
    console.error("[customers bot error]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
