import { z } from "zod";

// Define allowed payment methods
const paymentMethods = [
  "credit_card",
  "paypal",
  "bank_transfer",
  "e_sewa",
  "khalti",
  "imepay",
  "prabhu_pay",
  "connect_ips",
  "cash_on_delivery",
];

// Define allowed delivery methods
const deliveryMethods = ["pickup", "delivery"];

// Define schema for pickup and delivery locations
const locationSchema = z.object({
  address: z
    .string()
    .min(1, { message: "Address is required and cannot be empty." })
    .max(255, { message: "Address cannot exceed 255 characters." })
    .or(z.literal("")),
  fee: z.coerce.number().nonnegative({ message: "Fee cannot be negative." }),
});

// Define general schema
export const generalSchema = z
  .object({
    storeName: z
      .string()
      .min(1, { message: "Store name is required and cannot be empty." })
      .max(50, { message: "Store name cannot exceed 50 characters." }),
    storeDescription: z
      .string()
      .min(1, { message: "Store description is required and cannot be empty." })
      .max(5000, {
        message: "Store description cannot exceed 5000 characters.",
      }),
    pickup: z.array(locationSchema).optional(),
    delivery: z.array(locationSchema).optional(),
    storePromises: z
      .array(z.string())
      .max(10, { message: "A maximum of 10 store promises is allowed." })
      .optional(),
    minimumOrder: z.coerce
      .number()
      .min(1, { message: "Minimum order must be at least 1." }),
    maximumOrder: z.coerce
      .number()
      .min(1, { message: "Maximum order must be at least 1." }),
    currencySymbol: z
      .string()
      .min(1, { message: "Currency symbol is required and cannot be empty." })
      .max(5, { message: "Currency symbol cannot exceed 5 characters." }),
    paymentMethod: z
      .array(z.enum(paymentMethods))
      .nonempty({ message: "At least one payment method must be selected." }),
    deliveryMethod: z
      .array(z.enum(deliveryMethods))
      .nonempty({ message: "At least one delivery method must be selected." }),
  })
  .refine((data) => data.maximumOrder >= data.minimumOrder, {
    message: "Maximum order can't be less than minimum order.",
    path: ["maximumOrder"],
  })
  .refine((data) => data.minimumOrder <= data.maximumOrder, {
    message: "Minimum order can't be more than maximum order.",
    path: ["minimumOrder"],
  })
  .refine(
    (data) => data.storePromises.every((promise) => promise.length <= 50),
    {
      message: "Store promises cannot exceed 50 characters.",
      path: ["storePromises"],
    }
  );
