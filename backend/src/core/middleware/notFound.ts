import type { RequestHandler } from "express";

/** Terminal handler for unmatched routes → consistent 404. */
export const notFound: RequestHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
