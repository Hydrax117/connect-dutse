import { z } from "zod";
export const reportReasons = [
  "Fake product or service",
  "Scam or fraud",
  "Inappropriate content",
  "Misleading information",
  "Prohibited item",
  "Other",
] as const;
export const createReportSchema = z.object({
  listingId: z.string().min(1),
  reason: z.enum(reportReasons, { errorMap: () => ({ message: "Please select a valid reason" }) }),
  details: z.string().max(500).trim().optional(),
});
export type CreateReportInput = z.infer<typeof createReportSchema>;
