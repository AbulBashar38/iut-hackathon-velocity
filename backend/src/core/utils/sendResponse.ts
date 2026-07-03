import type { Response } from "express";

interface SuccessPayload<T> {
  statusCode: number;
  message: string;
  data?: T;
}

/**
 * Sends a consistent success envelope. Errors never go through here — they are
 * handled exclusively by the global error handler.
 */
export const sendResponse = <T>(
  res: Response,
  { statusCode, message, data }: SuccessPayload<T>,
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
