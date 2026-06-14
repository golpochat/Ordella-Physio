import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";
import { ValidationError } from "../utils/api-error";

type RequestPart = "body" | "query" | "params";

export function validateRequest(schema: ZodSchema, part: RequestPart = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[part]);
      Object.assign(req[part], parsed);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ValidationError("Validation failed", error.flatten()));
        return;
      }
      next(error);
    }
  };
}
