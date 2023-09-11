import { z } from 'zod';

export const createTenantSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  description: z.string().nullable(),
});

export type CreateTenantDto = z.infer<typeof createTenantSchema>;
