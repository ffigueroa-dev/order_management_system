import { z } from 'zod';

export const updateUserSchema = z
  .object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.email().optional(),
    type: z.enum(['owner', 'delivery']).optional(),
  })
  .strict();
