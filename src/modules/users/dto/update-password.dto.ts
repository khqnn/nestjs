import { z } from 'zod';

export const updatePasswordSchema = z
  .object({
    old_password: z.string(),
    new_password: z.string(),
  })
  .required();

export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;
