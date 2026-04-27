import { z } from 'zod';

export const createStatusSchema = z.object({
  label: z.string().min(1),
  color: z.string().startsWith('#').min(7).max(7),
});
