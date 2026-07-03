import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

/**
 * Wraps an async Express handler so rejected promises are forwarded to the
 * global error handler instead of crashing the process. Removes the need for
 * try/catch in every controller.
 */
export const catchAsync =
  (handler: AsyncHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
