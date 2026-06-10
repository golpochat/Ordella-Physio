import { z } from "zod";
import { parseNumber } from "../utils/parse";

export const page = z.preprocess(
  (value) => parseNumber(value) ?? value,
  z.number().int().min(1).default(1),
);

export const limit = z.preprocess(
  (value) => parseNumber(value) ?? value,
  z.number().int().min(1).max(100).default(20),
);

export const sort = z.string().min(1).optional();

export const order = z.enum(["asc", "desc"]).default("desc");

export const paginationSchema = z.object({
  page,
  limit,
  sort,
  order,
});

export type PaginationInput = z.infer<typeof paginationSchema>;
