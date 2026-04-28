import { z } from 'zod';

export const createProductSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z
      .number()
      .positive()
      .refine((value) => Number(value.toFixed(2)) === value, {
        message: 'Price must have at most 2 decimal places',
      }),
  })
  .strict();
