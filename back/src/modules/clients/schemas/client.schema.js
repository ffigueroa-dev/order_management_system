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
