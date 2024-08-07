import { z } from "zod";

export const contactSchema = z.object({
  email1: z.string().email(),
  email2: z.string().email().or(z.literal("")), // Allow empty string or valid email
  tel1: z.string().regex(/^\d{10}$/, "Must be a 10-digit number"),
  tel2: z.string().regex(/^\d{10}$/, "Must be a 10-digit number").or(z.literal("")), // Allow empty string or valid 10-digit number string
});