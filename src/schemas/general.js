import { z } from "zod";

// Define allowed payment methods
const paymentMethods = [
  "Bank Transfer",
  "Cash on Delivery",
  "Credit Card",
  "Debit Card",
  "e-Sewa",
  "Khalti",
  "connectIPS",
  "IME Pay",
  "Prabhu Pay",
];

// Define allowed delivery methods
const deliveryMethods = ["pickup", "delivery"];

// Define schema for pickup and delivery locations
const locationSchema = z.object({
  address: z
    .string()
    .min(1, { message: "Address is required and cannot be empty." })
    .max(255, { message: "Address cannot exceed 255 characters." })
    .optional(),
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
    pickupLocations: z.array(locationSchema).optional(),
    deliveryLocations: z.array(locationSchema).optional(),
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
    deliveryMethod: z.array(z.enum(deliveryMethods)).optional(),
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
  )
  // Ensure that at least one delivery location is provided if delivery method is selected
  .refine(
    (data) => {
      if (
        data.deliveryMethod?.includes("delivery") &&
        data.deliveryLocations.length === 0
      ) {
        return false;
      }
      if (
        data.deliveryMethod?.includes("pickup") &&
        data.pickupLocations.length === 0
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Provide at least one delivery location for the selected delivery method.",
      path: ["deliveryMethod"],
    }
  );
