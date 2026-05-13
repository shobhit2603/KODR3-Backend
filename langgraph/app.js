import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import {
  StateGraph,
  START,
  END,
  MessagesAnnotation,
} from "@langchain/langgraph";
import { ToolNode, toolsCondition } from "@langchain/langgraph/prebuilt";
import { z } from "zod";

const getWeather = tool(
  async ({ city }) => {
    return `The weather in ${city} is sunny with a high of 35 degrees Celcius and low of 25 degrees Celsius.`;
  },
  {
    name: "get_weather",
    description: "Get the weather in a specific city.",
    schema: z.object({
      city: z.string().describe("The city to get the weather for."),
    }),
  },
);

const tools = [getWeather];

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-medium-latest",
}).bindTools(tools);

const callModel = async (state) => {
  const response = await model.invoke(state.messages);
  return { messages: [response] };
};

const toolNode = new ToolNode(tools);

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", toolsCondition)
  .addEdge("tools", "agent")
  .compile();


const result = await graph.invoke({
  messages: [new HumanMessage("Tell me the weather in Bhopal?")],
});

console.log(result.messages[result.messages.length - 1].content);
