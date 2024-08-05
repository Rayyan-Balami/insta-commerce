import { z } from "zod";
// Define schema for banner
export const bannerSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required").max(8, "Maximum of 8 images allowed"),
});