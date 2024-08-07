import { z } from "zod";

export const discountSchema = z
  .object({
    name: z
      .string()
      .min(1, "Minimum 1 characters")
      .max(25, "Maximum 25 characters"),
    type: z.enum(["all", "specific", "category"]).default("all"),
    products: z.array(z.string()).optional(),
    usagePeriod: z
      .enum(["noLimit", "limitedDay"])
      .default("noLimit"),
    limitedUsage: z.coerce.number().optional(),
    discountRate: z.coerce.number().min(1, "Minimum value is 1 %").max(100, "Maximum value is 100 %"),
    minimumPurchaseAmount: z.coerce.number().min(0).optional(),
    maximumPurchaseAmount: z.coerce.number().min(0).optional(),
    maximumDiscountAmount: z.coerce.number().min(0).optional(),
  })
  .refine(
    (data) =>
      data.type === "all" || (data.products && data.products.length > 0),
    {
      path: ["products"],
      message: "Products are required for this type",
    }
  )
  .refine(
    (data) =>
      data.usagePeriod === "noLimit" ||
      (data.limitedUsage && data.limitedUsage >= 1),
    {
      path: ["limitedUsage"],
      message: "Limited usage must be at least 1",
    }
  )
  .refine(
    (data) =>
      !data.minimumPurchaseAmount ||
      !data.maximumPurchaseAmount ||
      data.minimumPurchaseAmount < data.maximumPurchaseAmount,
    {
      path: ["maximumPurchaseAmount"],
      message:
        "Maximum purchase amount must be greater than minimum purchase amount",
    }
  )
  .refine(
    (data) =>
      !data.minimumPurchaseAmount ||
      !data.maximumDiscountAmount ||
      data.minimumPurchaseAmount < data.maximumDiscountAmount,
    {
      path: ["maximumDiscountAmount"],
      message:
        "Maximum discount amount must be greater than minimum purchase amount",
    }
  )
  .refine(
    (data) =>
      !data.maximumPurchaseAmount ||
      !data.maximumDiscountAmount ||
      data.maximumDiscountAmount < data.maximumPurchaseAmount,
    {
      path: ["maximumDiscountAmount"],
      message:
        "Maximum discount amount must be less than maximum purchase amount",
    }
  );
