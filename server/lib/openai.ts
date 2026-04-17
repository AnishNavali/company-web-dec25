import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function cleanResponse(text: string): string {
  return text
    .replace(/\*/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function runAgent(
  instructions: string,
  userMessage: string
): Promise<string> {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: instructions },
      { role: "user", content: userMessage },
    ],
  });

  const response = completion.choices[0].message.content ?? "";

  console.log("Bot response:::", cleanResponse(response));

  return cleanResponse(response);
}
