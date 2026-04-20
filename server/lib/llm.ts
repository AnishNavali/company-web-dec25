import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatBedrockConverse } from "@langchain/aws";
import OpenAI from "openai";

import { cleanResponse } from "./utils/cleanResponses";
import { LLM_CONFIG } from "./llm/llmConfig";

type Provider = "openai" | "claude" | "gemini" | "bedrock" | "vllm";

function getModel(provider: Provider, modelName: string, temperature: number) {
  switch (provider) {
    case "openai":
      return new ChatOpenAI({ model: modelName, temperature });

    case "claude":
      return new ChatAnthropic({ model: modelName, temperature });

    case "gemini":
      return new ChatGoogleGenerativeAI({ model: modelName, temperature });

    case "bedrock":
      return new ChatBedrockConverse({
        model: modelName, // aws model id
        region: process.env.AWS_REGION,
        temperature,
      });

    case "vllm": {
      const cfg = (LLM_CONFIG as { vllm?: { baseURL?: string; apiKey?: string } }).vllm || {};

      const client = new OpenAI({
        apiKey: cfg.apiKey || "dummy",
        baseURL: cfg.baseURL,
      });

      return {
        invoke: async (input: string) => {
          const completion = await client.chat.completions.create({
            model: modelName,
            messages: [
              {
                role: "system",
                content: input.split("User:")[0],
              },
              {
                role: "user",
                content: input.split("User:")[1] ?? "",
              },
            ],
          });

          return {
            content: completion.choices[0].message.content ?? "",
          };
        },
      };
    }

    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

export async function runAgent({
  instructions,
  userMessage,
}: {
  instructions: string;
  userMessage: string;
}): Promise<string> {
  const { provider, model, temperature } = LLM_CONFIG;

  const llm = getModel(provider as Provider, model, temperature);

  console.log("Provider:::", provider);
  console.log("Model:::", model);
  console.log("Input:::", userMessage);

  const input = `
      ${instructions}

      User: ${userMessage}
      `;

  const response = await llm.invoke(input);

  const content =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  console.log("Raw:", content);

  //const cleaned = cleanResponse(content);
  //console.log("Cleaned:", cleaned);

  //return cleaned;
  return content;
}
