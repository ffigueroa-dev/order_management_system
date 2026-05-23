import { z } from 'zod';

export const createClientSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    fullAddress: z.string().min(6),
  })
  .strict();
