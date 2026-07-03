import config from "../../config/index.js";

/** Minimal leveled logger. Swappable for pino/winston behind this interface. */

type LogLevel = "debug" | "info" | "warn" | "error";

const write = (level: LogLevel, message: string, meta?: unknown): void => {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${level.toUpperCase()} ${message}`;
  const args = meta === undefined ? [line] : [line, meta];

  if (level === "error") {
    console.error(...args);
  } else if (level === "warn") {
    console.warn(...args);
  } else {
    console.log(...args);
  }
};

export const logger = {
  debug: (message: string, meta?: unknown): void => {
    if (config.nodeEnv !== "production") write("debug", message, meta);
  },
  info: (message: string, meta?: unknown): void => write("info", message, meta),
  warn: (message: string, meta?: unknown): void => write("warn", message, meta),
  error: (message: string, meta?: unknown): void =>
    write("error", message, meta),
};
