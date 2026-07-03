import type { ZodType } from "zod";

import { catchAsync } from "../utils/catchAsync.js";

interface RequestSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

/**
 * Validates request parts against Zod schemas. On success, parsed (and
 * coerced) values replace the originals. Zod errors flow to the global
 * error handler via catchAsync.
 *
 * Note: Express 5 exposes `req.query` as a read-only getter, so the parsed
 * query is attached with defineProperty rather than assignment.
 */
export const validateRequest = (schemas: RequestSchemas) =>
  catchAsync(async (req, _res, next) => {
    if (schemas.params) {
      req.params = (await schemas.params.parseAsync(
        req.params,
      )) as typeof req.params;
    }

    if (schemas.body) {
      req.body = await schemas.body.parseAsync(req.body);
    }

    if (schemas.query) {
      const parsedQuery = await schemas.query.parseAsync(req.query);
      Object.defineProperty(req, "query", {
        value: parsedQuery,
        configurable: true,
      });
    }

    next();
  });
