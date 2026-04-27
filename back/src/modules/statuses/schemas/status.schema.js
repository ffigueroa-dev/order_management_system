import { z } from 'zod';

export const createStatusSchema = z
  .object({
    label: z.string().min(1),
    color: z.string().startsWith('#').min(7).max(7),
  })
  .strict();

export const updateStatusSchema = z
  .object({
    label: z.string().min(1).optional(),
    color: z.string().startsWith('#').min(7).max(7).optional(),
  })
  .strict();

  
export const findStatusSchema = z
  .object({
    id: z.uuidv4()
  })
  .strict();
