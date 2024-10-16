import { z } from "zod";

// Define allowed payment methods
export const paymentMethods = [
  { value: "COD", label: "Cash on Delivery" },
  { value: "eSewa", label: "e-Sewa" },
  { value: "khalti", label: "Khalti", disabled: true },
  { value: "bankTransfer", label: "Bank Transfer", disabled: true },
  { value: "creditCard", label: "Credit Card", disabled: true },
  { value: "debitCard", label: "Debit Card", disabled: true },
  { value: "connectIPS", label: "connectIPS", disabled: true },
  { value: "imePay", label: "IME Pay", disabled: true },
  { value: "prabhuPay", label: "Prabhu Pay", disabled: true },
];

const paymentMethodValues = paymentMethods.map((method) => method.value);

// Define allowed delivery methods
export const deliveryMethods = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
];

const deliveryMethodValues = deliveryMethods.map((method) => method.value);

export const sizes = [
  { value: "free size", label: "Free Size" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "2xl", label: "2XL" },
  { value: "3xl", label: "3XL" },
  { value: "4xl", label: "4XL" },
  { value: "5xl", label: "5XL" },
  { value: "6xl", label: "6XL" },
  { value: "short", label: "Short" },
  { value: "tall", label: "Tall" },
  { value: "skinny", label: "Skinny" },
  { value: "chubby", label: "Chubby" },
];

export const sizeValues = sizes.map((size) => size.value);

// Define schema for pickup and delivery locations
const locationSchema = z.object({
  address: z
    .string()
    .min(1, { message: "Address is required and cannot be empty." })
    .max(255, { message: "Address cannot exceed 255 characters." })
    .optional(),
  latLong: z
    .string()
    .regex(/^[^,]+,[^,]+$/, {
      message: "Must contain exactly one comma, not at the start or end.",
    })
    .min(1, { message: "Latitude and longitude are required." })
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
      .array(
        z
          .string()
          .max(25, {
            message: "Each store promise can be a maximum of 25 characters.",
          })
      )
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
      .array(z.enum(paymentMethodValues))
      .nonempty({ message: "At least one payment method must be selected." }),
    deliveryMethod: z.array(z.enum(deliveryMethodValues)).optional(),
    categories: z
      .array(
        z
          .string()
          .max(25, {
            message: "Each category can be a maximum of 25 characters.",
          })
      )
      .nonempty({ message: "At least one category must be entered." })
      .max(100, { message: "A maximum of 100 categories is allowed." }),
    sizes: z
      .array(z.enum(sizeValues))
      .nonempty({ message: "At least one size must be selected." }),
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
