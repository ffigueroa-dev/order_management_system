import { z } from 'zod';

export const updateStatusSchema = z
  .object({
    label: z.string().min(1),
    color: z.string().startsWith('#').min(7).max(7),
  })
  .strict();
