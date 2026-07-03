import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import config from "../../config/index.js";
import { AppError } from "../errors/AppError.js";
import { logger } from "../utils/logger.js";

interface ErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
  stack?: string;
}

/**
 * Single place that translates any thrown value into a consistent error
 * response. Handles AppError, Zod validation errors, and unknown failures.
 */
export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  let statusCode = 500;
  let message = "Internal Server Error";
  const body: ErrorResponse = { success: false, message };

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    body.errors = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  } else if (err instanceof Error) {
    message = err.message;
  }

  body.message = message;

  if (config.nodeEnv !== "production" && err instanceof Error && err.stack) {
    body.stack = err.stack;
  }

  logger.error(`${statusCode} ${message}`, err);

  res.status(statusCode).json(body);
};
