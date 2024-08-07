import { z } from "zod";

export const priceRangeSchema = z
  .object({
    min: z.coerce.number().int().min(1).or(z.literal("")),
    max: z.coerce.number().int().min(1).or(z.literal("")),
  })
  .refine((data) => {
    // Check if both fields are empty
    if (data.min === "" && data.max === "") {
      return false; // Silently enforce the rule without a message
    }
    // Check if both fields are provided and min is greater than max
    if (data.min !== "" && data.max !== "" && data.min > data.max) {
      return false; // Silently enforce the rule without a message
    }
    return true; // Validation passed
  });
