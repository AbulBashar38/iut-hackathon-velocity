import { botFactsService } from "../botFacts.service.js";
import { formatRoom } from "../formatters.js";
import { llm } from "../llm/llmClient.js";
import { ROOM_ALIAS_HINT, resolveRoom } from "../roomAlias.js";
import type { BotCommand } from "./command.types.js";

export const roomCommand: BotCommand = {
  name: "room",
  description: "Status of a specific room, e.g. !room work1",
  async execute(args) {
    const input = args.join(" ").trim();
    if (!input) {
      return `Usage: !room <name> (e.g. ${ROOM_ALIAS_HINT}).`;
    }

    const room = resolveRoom(input);
    if (!room) {
      return `Unknown room "${input}". Try: ${ROOM_ALIAS_HINT}.`;
    }

    const base = formatRoom(botFactsService.getRoomFacts(room));
    return llm.enhance(base);
  },
};
