import { z } from 'zod';

export const createClientSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    fullAddress: z.string().min(6),
  })
  .strict();

export const findClientSchema = z
  .object({
    id: z.uuidv4(),
  })
  .strict();

export const updateClientSchema = z
  .object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    fullAddress: z.string().min(6).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
