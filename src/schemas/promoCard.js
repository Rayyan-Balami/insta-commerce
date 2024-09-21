import { z } from "zod";

export const promoSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Promo title is required and cannot be empty." })
      .max(100, { message: "Promo title cannot exceed 50 characters." }),
    description: z
      .string()
      .min(1, { message: "Promo description is required and cannot be empty." })
      .max(1000, {
        message: "Promo description cannot exceed 1000 characters.",
      }),
    CTA: z
      .string()
      .max(50, { message: "Promo CTA cannot exceed 25 characters." })
      .or(z.literal("")),
    URL: z
      .string()
      .url({ message: "Promo URL must be a valid URL." })
      .or(z.literal("")),
  })
  .refine((data) => {
    if (data.CTA && !data.URL) {

      return false;
    }
    if (!data.CTA && data.URL) {
      return false;
    }
    return true;
  },{
    message: "CTA and URL must be provided together.",
    path: ["CTA"],
  });
