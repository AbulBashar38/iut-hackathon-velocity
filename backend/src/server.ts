import { createServer } from "node:http";

import app from "./app.js";
import config from "./config/index.js";
import { logger } from "./core/utils/logger.js";
import { simulationEngine } from "./simulation/simulationEngine.js";
import { initSocket } from "./socket/socketServer.js";

const main = (): void => {
  const httpServer = createServer(app);

  // Compose the runtime: sockets first (subscribes to the store), then start
  // the simulation which drives changes through the store to the sockets.
  initSocket(httpServer);
  simulationEngine.start();

  httpServer.listen(config.port, () => {
    logger.info(`IoT Monitoring API listening on port ${config.port}`);
  });

  const shutdown = (signal: string): void => {
    logger.info(`${signal} received — shutting down gracefully`);
    simulationEngine.stop();
    httpServer.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

main();
