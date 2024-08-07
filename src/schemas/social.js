import { z } from "zod";

export const socialSchema = z.object({
  facebook : z.string().url().or(z.literal("")),
  twitter : z.string().url().or(z.literal("")),
  linkedin : z.string().url().or(z.literal("")),
  instagram : z.string().url().or(z.literal("")),
  youtube : z.string().url().or(z.literal("")),
  tiktok : z.string().url().or(z.literal("")),
});