import { max } from "date-fns";
import { z } from "zod";

// Define schema for SKU
export const skuSchema = z.object({
  sku: z.string()
    .min(1, { message: "SKU is required and cannot be empty." })
    .max(50, { message: "SKU cannot exceed 50 characters." }),
  price: z.coerce.number()
    .positive({ message: "Price must be a positive number." })
    .min(1, { message: "Price is required and cannot be zero." }),
  stock: z.coerce.number()
    .positive({ message: "Stock must be a positive number." })
    .min(1, { message: "Stock is required and cannot be zero." }),
  size: z.array(z.string())
    .nonempty({ message: "At least one size must be selected." }), // Changed to array
});

// Define schema for product
export const productSchema = z.object({
  name: z.string()
    .min(1, { message: "Product name is required and cannot be empty." })
    .max(50, { message: "Product name cannot exceed 50 characters." }),
  description: z.string()
    .min(1, { message: "Product description is required and cannot be empty." })
    .max(500, { message: "Product description cannot exceed 500 characters." }),
  skus: z.array(skuSchema),
  category: z.string()
    .min(1, { message: "Category is required and cannot be empty." }),
  status: z.enum(['active', 'draft', 'archived'], {
    errorMap: () => ({ message: "Status must be one of 'active', 'draft', or 'archive'." })
  }),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required").max(8, "Maximum of 8 images allowed"),
});
