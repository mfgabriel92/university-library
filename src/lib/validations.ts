import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
