import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, ToolMessage } from "langchain";
import { tool } from "@langchain/core/tools";
import { StateGraph, START, END, StateSchema } from "@langchain/langgraph";
import z from "zod";

const getWeather = tool(
  async ({ city }) => {
    return `The weather in ${city} is sunny with a high of 75 degrees Fahrenheit.`;
  },
  {
    name: "get_weather",
    description: "Get the weather in a specific city.",
    schema: z.object({
      city: z.string().describe("The city to get the weather for."),
    }),
  },
);

const model = (new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-medium-latest",
})).bindTools([get_weather])

const state = new StateSchema({
  messages: z.array().default([]),
  aiResponse: z.string().default(""),
  tools: z.array().default([]),
});

const llmNode = async (state) => {
  const aiResponse = await model.invoke(state.messages);
  return {
    messages: aiResponse,
    aiResponse: aiResponse.content,
  };
};

const graph = new StateGraph(state)
  .addNode("llm", llmNode)
  .addEdge(START, "llm")
  .addEdge("llm", END)
  .compile();

const result = await graph.invoke({
  userInput: "Tell me the weather in Bhopal?",
});

console.log(result);
