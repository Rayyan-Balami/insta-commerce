import { z } from "zod";

// Define schema for SKU
export const skuSchema = z.object({
  color: z
    .string()
    .min(1, { message: "Color is required and cannot be empty." })
    .max(50, { message: "Color cannot exceed 50 characters." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." })
    .min(1, { message: "Price is required and cannot be zero." }),
  stock: z.coerce
    .number()
    .positive({ message: "Stock must be a positive number." })
    .min(1, { message: "Stock is required and cannot be zero." }),
  size: z
    .array(z.string())
    .nonempty({ message: "At least one size must be selected." }),
});

// Define schema for product
export const productSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name is required and cannot be empty." })
    .max(255, { message: "Product name cannot exceed 255 characters." }),
  description: z
    .string()
    .min(1, { message: "Product description is required and cannot be empty." })
    .max(5000, { message: "Product description cannot exceed 5000 characters." }),
  skus: z
    .array(skuSchema)
    .nonempty({ message: "At least one SKU is required." })
    .max(10, { message: "A maximum of 10 SKUs is allowed." }),
  category: z
    .string()
    .min(1, { message: "Category is required and cannot be empty." }),
  status: z.enum(["active", "draft", "archived"], {
    errorMap: () => ({
      message: "Status must be one of 'active', 'draft', or 'archived'.",
    }),
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(8, "Maximum of 8 images allowed"),
  video: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}(\?[\S]*)?$/,
      {
        message: "Invalid YouTube URL.",
      }
    )
    .or(z.literal("")),
});