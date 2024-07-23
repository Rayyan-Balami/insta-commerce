import { z } from "zod";

export const socialSchema = z.object({
  facebook : z.string().url().or(z.literal("")).optional(),
  twitter : z.string().url().or(z.literal("")).optional(),
  linkedin : z.string().url().or(z.literal("")).optional(),
  instagram : z.string().url().or(z.literal("")).optional(),
  youtube : z.string().url().or(z.literal("")).optional(),
  tiktok : z.string().url().or(z.literal("")).optional(),
});