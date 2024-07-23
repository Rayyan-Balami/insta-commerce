import { z } from "zod";

export const generalSchema = z.object({
  storeName: z
    .string()
    .min(1, { message: "Store name is required and cannot be empty." })
    .max(50, { message: "Store name cannot exceed 50 characters." }),
  storeDescription: z
    .string()
    .min(1, { message: "Store description is required and cannot be empty." })
    .max(500, { message: "Store description cannot exceed 500 characters." }),
});
