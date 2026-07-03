import { botFactsService } from "../botFacts.service.js";
import { formatUsage } from "../formatters.js";
import { llm } from "../llm/llmClient.js";
import type { BotCommand } from "./command.types.js";

export const usageCommand: BotCommand = {
  name: "usage",
  description: "Current total power and today's estimated usage",
  async execute() {
    const base = formatUsage(botFactsService.getUsageFacts());
    return llm.enhance(base);
  },
};
