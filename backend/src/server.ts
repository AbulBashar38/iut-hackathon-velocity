import { createServer } from "node:http";

import app from "./app.js";
import config from "./config/index.js";
import { logger } from "./core/utils/logger.js";
import { startDiscordBot, stopDiscordBot } from "./modules/bot/discordBot.js";
import { energyMeter } from "./modules/usage/energyMeter.js";
import { simulationEngine } from "./simulation/simulationEngine.js";
import { initSocket } from "./socket/socketServer.js";

const main = (): void => {
  const httpServer = createServer(app);

  // Compose the runtime: sockets first (subscribes to the store), then start
  // the simulation which drives changes through the store to the sockets.
  initSocket(httpServer);
  simulationEngine.start();
  energyMeter.start();

  // Optional Discord bot — no-ops when DISCORD_BOT_TOKEN is unset.
  void startDiscordBot().catch((error) =>
    logger.error("Failed to start Discord bot", error),
  );

  httpServer.listen(config.port, () => {
    logger.info(`IoT Monitoring API listening on port ${config.port}`);
  });

  const shutdown = (signal: string): void => {
    logger.info(`${signal} received — shutting down gracefully`);
    simulationEngine.stop();
    energyMeter.stop();
    void stopDiscordBot();
    httpServer.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

main();
