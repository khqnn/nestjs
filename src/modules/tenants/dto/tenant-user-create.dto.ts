
import {z} from 'zod';

export const createTenantUserSchema = z.object({
    role: z.string(),
    privileges: z.array(z.string()),
})

export type CreateTenantUserDto = z.infer<typeof createTenantUserSchema>