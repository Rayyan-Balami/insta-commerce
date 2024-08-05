import { z } from "zod";

export const codeSchema = z.object({
  code: z.string().min(5, "Code must be at least 5 characters")
  .max(10, "Code must be at most 10 characters"),
  type: z.enum(["all", "product", "category"]),
  products: z.array(z.string()).optional(),
  usagePeriod: z.enum(["noLimit", "limitedTimes", "limitedDays"]),
  limitedUsage: z.coerce.number()
    .min(1, "Limited usage must be at least 1")
    .optional(),
  discountRate: z.enum(["percentage", "fixedAmount"]),
  discountRateValue: z.coerce.number().min(0, "Discount rate must be a positive number"),
  minimumPurchaseAmount: z.coerce.number().min(0, "Minimum purchase amount must be a positive number"),
  maximumDiscountAmount: z.coerce.number().min(0, "Maximum discount amount must be a positive number"),
}).refine(
  (data) => data.discountRate !== "fixedAmount" || data.minimumPurchaseAmount >= data.discountRateValue,
  {
    message: "Minimum purchase amount must be at least the discount rate value",
    path: ["minimumPurchaseAmount"], // This is the field that will be marked with an error
  }
).refine(
  (data) => data.discountRate !== "percentage" || data.discountRateValue <= 100,
  {
    message: "Discount rate value must be less than or equal to 100",
    path: ["discountRateValue"],
  }
);
