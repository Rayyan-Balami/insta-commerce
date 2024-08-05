import { z } from "zod";

export const promoSchema = z.object({
  promoTitle: z
    .string()
    .min(1, { message: "Promo title is required and cannot be empty." })
    .max(50, { message: "Promo title cannot exceed 50 characters." }),
  promoDescription: z
    .string()
    .min(1, { message: "Promo description is required and cannot be empty." })
    .max(50, { message: "Promo description cannot exceed 500 characters." }),
  promoCTA: z
    .string()
    .min(1, { message: "Promo CTA is required and cannot be empty." })
    .max(25, { message: "Promo CTA cannot exceed 50 characters." }),
  promoURL: z
    .string()
    .url({ message: "Promo URL must be a valid URL." }),
});
