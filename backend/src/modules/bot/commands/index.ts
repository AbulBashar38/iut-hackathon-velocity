import type { BotCommand } from "./command.types.js";
import { roomCommand } from "./room.command.js";
import { statusCommand } from "./status.command.js";
import { usageCommand } from "./usage.command.js";

const registry: BotCommand[] = [statusCommand, roomCommand, usageCommand];

/** name → command lookup. */
export const commands = new Map<string, BotCommand>(
  registry.map((command) => [command.name, command]),
);

/** Help text listing available commands. */
export const buildHelpText = (prefix: string): string =>
  [
    "Available commands:",
    ...registry.map((c) => `${prefix}${c.name} — ${c.description}`),
  ].join("\n");
