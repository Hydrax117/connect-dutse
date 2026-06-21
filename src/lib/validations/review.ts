import { z } from "zod";
import { MAX_RATING, MIN_RATING, REVIEW_COMMENT_MAX_LENGTH } from "@/lib/constants";
export const createReviewSchema = z.object({
  listingId: z.string().min(1),
  rating: z
    .number()
    .int()
    .min(MIN_RATING, `Rating must be at least ${MIN_RATING}`)
    .max(MAX_RATING, `Rating must be at most ${MAX_RATING}`),
  comment: z
    .string()
    .max(
      REVIEW_COMMENT_MAX_LENGTH,
      `Comment must be less than ${REVIEW_COMMENT_MAX_LENGTH} characters`,
    )
    .trim()
    .optional(),
});
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
