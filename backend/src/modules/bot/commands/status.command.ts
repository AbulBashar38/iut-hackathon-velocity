import { botFactsService } from "../botFacts.service.js";
import { formatStatus } from "../formatters.js";
import { llm } from "../llm/llmClient.js";
import type { BotCommand } from "./command.types.js";

export const statusCommand: BotCommand = {
  name: "status",
  description: "Full office status across all rooms",
  async execute() {
    const base = formatStatus(botFactsService.getStatusFacts());
    return llm.enhance(base);
  },
};
