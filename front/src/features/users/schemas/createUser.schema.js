import { z } from 'zod';

export const createUserSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
    type: z.enum(['owner', 'delivery']),
  })
  .strict();
