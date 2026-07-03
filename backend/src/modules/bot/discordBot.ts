import {
  Client,
  Events,
  GatewayIntentBits,
  type Message,
} from "discord.js";

import config from "../../config/index.js";
import { logger } from "../../core/utils/logger.js";
import { alertService } from "../alert/alert.service.js";
import type { Alert } from "../../types/domain.js";
import { buildHelpText, commands } from "./commands/index.js";
import { formatAlert } from "./formatters.js";

let client: Client | null = null;
let unsubscribeAlerts: (() => void) | null = null;

const handleMessage = async (message: Message): Promise<void> => {
  if (message.author.bot) return;

  logger.info(
    `[Discord] message from ${message.author.tag}: "${message.content}"`,
  );

  const prefix = config.discord.commandPrefix;
  if (!message.content.startsWith(prefix)) return;

  const [rawName, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/\s+/);
  const name = (rawName ?? "").toLowerCase();

  const command = commands.get(name);

  try {
    if (!command) {
      await message.reply(buildHelpText(prefix));
      return;
    }
    const reply = await command.execute(args);
    await message.reply(reply);
  } catch (error) {
    logger.error(`Discord command '${name}' failed`, error);
    await message.reply("Sorry, something went wrong handling that command.");
  }
};

/** Posts a single alert to the configured channel. */
const postAlert = async (
  readyClient: Client<true>,
  channelId: string,
  alert: Alert,
): Promise<void> => {
  try {
    const channel = await readyClient.channels.fetch(channelId);
    if (channel?.isSendable()) {
      await channel.send(formatAlert(alert));
    } else {
      logger.warn(`Alert channel ${channelId} is not a sendable text channel`);
    }
  } catch (error) {
    logger.error("Failed to post alert to Discord", error);
  }
};

/** Subscribes the bot to live alerts, forwarding each to the alert channel. */
const setupAlertForwarding = (readyClient: Client<true>): void => {
  const channelId = config.discord.alertChannelId;
  if (!channelId) {
    logger.info("Discord live alerts disabled (no DISCORD_ALERT_CHANNEL_ID)");
    return;
  }

  unsubscribeAlerts = alertService.onAlert((alert) => {
    void postAlert(readyClient, channelId, alert);
  });
  logger.info("Discord live alerts enabled");
};

/** Starts the Discord bot if a token is configured; otherwise no-ops. */
export const startDiscordBot = async (): Promise<void> => {
  if (!config.discord.botToken) {
    logger.info("Discord bot disabled (no DISCORD_BOT_TOKEN)");
    return;
  }

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once(Events.ClientReady, (readyClient) => {
    logger.info(`Discord bot logged in as ${readyClient.user.tag}`);
    setupAlertForwarding(readyClient);
  });

  client.on(Events.MessageCreate, (message) => {
    void handleMessage(message);
  });

  await client.login(config.discord.botToken);
};

export const stopDiscordBot = async (): Promise<void> => {
  if (!client) return;
  unsubscribeAlerts?.();
  unsubscribeAlerts = null;
  await client.destroy();
  client = null;
  logger.info("Discord bot stopped");
};
