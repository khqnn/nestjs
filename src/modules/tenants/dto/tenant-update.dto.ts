
import {z} from 'zod';

export const updateTenantSchema = z.object({
    display_name: z.string(),
    description: z.string().nullable(),
})

export type UpdateTenantDto = z.infer<typeof updateTenantSchema>