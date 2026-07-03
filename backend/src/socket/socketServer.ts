import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";

import config from "../config/index.js";
import { AppError } from "../core/errors/AppError.js";
import { logger } from "../core/utils/logger.js";
import { alertService } from "../modules/alert/alert.service.js";
import { powerService } from "../modules/power/power.service.js";
import { deviceStore } from "../store/deviceStore.js";
import {
  SOCKET_EVENTS,
  type ClientToServerEvents,
  type ServerToClientEvents,
} from "./events.js";

type MonitoringServer = Server<ClientToServerEvents, ServerToClientEvents>;

let io: MonitoringServer | null = null;

/**
 * Broadcasts the current state to all clients: full device snapshot, recomputed
 * power summary, and any newly triggered alerts.
 */
const broadcastState = (server: MonitoringServer): void => {
  const devices = deviceStore.getAll();

  server.emit(SOCKET_EVENTS.devicesUpdated, devices);
  server.emit(SOCKET_EVENTS.powerUpdated, powerService.getSummary());

  const newAlerts = alertService.evaluate(devices);
  for (const alert of newAlerts) {
    server.emit(SOCKET_EVENTS.alertCreated, alert);
  }
};

/** Initializes Socket.io on the HTTP server and wires it to the device store. */
export const initSocket = (httpServer: HttpServer): MonitoringServer => {
  io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: { origin: config.clientOrigin },
  });

  io.on("connection", (socket) => {
    logger.debug(`Socket connected: ${socket.id}`);

    // Sync late joiners with the current snapshot immediately.
    socket.emit(SOCKET_EVENTS.devicesUpdated, deviceStore.getAll());
    socket.emit(SOCKET_EVENTS.powerUpdated, powerService.getSummary());

    socket.on("disconnect", () => {
      logger.debug(`Socket disconnected: ${socket.id}`);
    });
  });

  // Any store change → rebroadcast. This is the single data-flow wiring point.
  deviceStore.onChange(() => {
    if (io) broadcastState(io);
  });

  logger.info("Socket.io initialized");
  return io;
};

/** Accessor for the initialized server (throws if used before init). */
export const getIO = (): MonitoringServer => {
  if (!io) {
    throw AppError.internal("Socket.io has not been initialized");
  }
  return io;
};
