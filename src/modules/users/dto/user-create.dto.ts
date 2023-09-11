

import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    photo: z.string().nullable(),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
