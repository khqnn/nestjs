
import {z} from 'zod';

export const updateTenantUserSchema = z.object({
    role: z.string(),
    privileges: z.array(z.string()),
})

export type UpdateTenantUserDto = z.infer<typeof updateTenantUserSchema>