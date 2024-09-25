import { z } from "zod";

export const types = [
  { value: "all", label: "All" },
  { value: "product", label: "Product" },
  { value: "category", label: "Category" },
];

export const usagePeriods = [
  { value: "noLimit", label: "No Limit" },
  { value: "limitedDay", label: "Limited Day" },
];

export const discountSchema = z
  .object({
    name: z
      .string()
      .min(1, "Minimum 1 character")
      .max(100, "Maximum 100 characters"),
    type: z.enum(["all", "product", "category"]).default("all"),
    product: z.string().optional(),
    category: z.string().optional(),
    usagePeriod: z.enum(["noLimit", "limitedDay"]).default("noLimit"),
    limitedUsage: z.coerce.number().optional(),
    discountRate: z
      .coerce.number()
      .min(1, "Minimum value is 1%")
      .max(100, "Maximum value is 100%"),
    minimumPurchaseAmount: z.coerce.number().min(0).optional(),
    maximumDiscountAmount: z.coerce.number().min(0).optional(),
  })
  .refine(
    (data) => data.type !== "product" || (data.product && data.product.length > 0),
    {
      path: ["product"],
      message: "Product are required for this type",
    }
  )
  .refine(
    (data) => data.type !== "category" || (data.category && data.category.length > 0),
    {
      path: ["category"],
      message: "Category are required for this type",
    }
  )
  .refine(
    (data) => data.usagePeriod !== "limitedDay" || (data.limitedUsage && data.limitedUsage >= 1),
    {
      path: ["limitedUsage"],
      message: "Limited usage must be at least 1",
    }
  );