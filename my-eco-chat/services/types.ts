import { z } from "zod";

export const chatResponseSchema = z.object({
  type: z.enum(["chat", "action_suggestion"]),
  message: z.string(),
  action: z.object({
    description: z.string(),
    impact: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"])
  }).optional(),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;