import { z } from "zod";
import { LISTING_TITLE_MAX_LENGTH, LISTING_DESCRIPTION_MAX_LENGTH } from "@/lib/constants";
import { CategoryType, ProductCondition } from "@/types";

const baseListingSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(LISTING_TITLE_MAX_LENGTH, `Title must be less than ${LISTING_TITLE_MAX_LENGTH} characters`)
    .trim(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(
      LISTING_DESCRIPTION_MAX_LENGTH,
      `Description must be less than ${LISTING_DESCRIPTION_MAX_LENGTH} characters`,
    )
    .trim(),
  categoryId: z.string().min(1, "Please select a category"),
  location: z.string().min(1, "Location is required").trim(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const createProductSchema = baseListingSchema.extend({
  type: z.literal(CategoryType.PRODUCT),
  condition: z.nativeEnum(ProductCondition),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .max(100_000_000, "Price is too high"),
  negotiable: z.boolean().default(false),
});

export const createServiceSchema = baseListingSchema.extend({
  type: z.literal(CategoryType.SERVICE),
  experienceYears: z.number().int().min(0).max(50).optional(),
  startingPrice: z.number().positive().optional(),
  availability: z.string().max(200).trim().optional(),
});

export const createListingSchema = z.discriminatedUnion("type", [
  createProductSchema,
  createServiceSchema,
]);

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
