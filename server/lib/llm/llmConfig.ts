// Make the LLM config changes here to switch provider/model

export const LLM_CONFIG = {
  provider: "vllm", // openai | claude | gemini | bedrock | vllm
  model: "Qwen/Qwen3-Omni-30B-A3B-Instruct",
  temperature: 0.7,

  vllm: {
    baseURL: "http://103.48.42.37:8000/v1",
    apiKey: "dummy",
  },
};
