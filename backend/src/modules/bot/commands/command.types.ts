export interface BotCommand {
  name: string;
  description: string;
  /** Produces the reply text for the given arguments. */
  execute: (args: string[]) => Promise<string>;
}
