/**
 * Operational error carrying an HTTP status code.
 *
 * Services throw these to signal expected failures (not found, bad input)
 * without depending on Express. The global error handler translates them.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = "AppError";
    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(message: string): AppError {
    return new AppError(400, message);
  }

  static notFound(message = "Resource not found"): AppError {
    return new AppError(404, message);
  }

  static internal(message = "Internal Server Error"): AppError {
    return new AppError(500, message, false);
  }
}
