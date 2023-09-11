import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .required();

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
