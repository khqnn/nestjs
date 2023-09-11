
import { z } from 'zod';

export const updateUserSchema = z
  .object({
    name: z.string(),
    photo: z.string().nullable(),
  })
  .required();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
