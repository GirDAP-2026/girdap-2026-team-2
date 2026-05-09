import { z } from "zod";

export const voiceBodySchema = z.object({
  question: z.string().min(3, "Soru en az 3 karakter olmali."),
  companyId: z.string().optional(),
});
