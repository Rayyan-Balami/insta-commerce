import { z } from "zod";

export const types = [
  { value: "all", label: "All" },
  { value: "product", label: "Product" },
  { value: "category", label: "Category" },
];

export const usagePeriods = [
  { value: "noLimit", label: "No Limit" },
  { value: "limitedDay", label: "Limited Day" },
  { value: "limitedCount", label: "Limited Count" },
];

export const discountTypes = [
  { value: "amount", label: "Amount" },
  { value: "percentage", label: "Percentage" },
];

export const promoCodeSchema = z
  .object({
    code: z
      .string()
      .min(1, "Minimum 1 character")
      .max(100, "Maximum 100 characters"),
    type: z.enum(["all", "product", "category"]).default("all"),
    product: z.string().optional(),
    category: z.string().optional(),
    usagePeriod: z.enum(["noLimit", "limitedDay", "limitedCount"]).default("noLimit"),
    limitedUsage: z.coerce.number().optional(),
    discountType: z.enum(["amount", "percentage"]).default("percentage"),
    discountValue: z.coerce.number().min(1, "Minimum value is 1"),
    minimumPurchaseAmount: z.coerce.number().min(0).optional(),
    maximumDiscountAmount: z.coerce.number().min(0).optional(),
  })
  .refine(
    (data) =>
      data.type !== "product" || (data.product && data.product.length > 0),
    {
      path: ["product"],
      message: "Product is required for this type",
    }
  )
  .refine(
    (data) =>
      data.type !== "category" || (data.category && data.category.length > 0),
    {
      path: ["category"],
      message: "Category is required for this type",
    }
  )
  .refine(
    (data) =>
      data.usagePeriod !== "limitedDay" ||
      (data.limitedUsage && data.limitedUsage >= 1),
    {
      path: ["limitedUsage"],
      message: "Limited usage must be at least 1",
    }
  )
  .refine(
    (data) =>
      data.usagePeriod !== "limitedCount" ||
      (data.limitedUsage && data.limitedUsage >= 1),
    {
      path: ["limitedUsage"],
      message: "Limited usage must be at least 1",
    }
  )
  .refine(
    (data) => data.discountType !== "percentage" || data.discountValue <= 100,
    {
      path: ["discountValue"],
      message: "Percentage discount cannot exceed 100%",
    }
  );