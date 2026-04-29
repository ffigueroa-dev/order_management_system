import { z } from 'zod';

export const createOrderSchema = z
  .object({
    clientId: z.uuidv4({
      message: 'clientId must be a valid uuid',
    }),

    statusId: z.uuidv4({
      message: 'statusId must be a valid uuid',
    }),
    userId: z.uuidv4({
      message: 'userId must be a valid uuid',
    }),

    notes: z.string().min(1, 'notes cannot be empty').optional(),

    products: z
      .array(
        z.object({
          productId: z.uuidv4({
            message: 'productId must be a valid uuid',
          }),

          quantity: z
            .number()
            .int('quantity must be an integer')
            .positive('quantity must be greater than 0'),
        }),
      )
      .min(1, 'order must contain at least one product'),
  })
  .strict()
  .superRefine((data, ctx) => {
    const productIds = data.products.map((product) => product.productId);

    const duplicatedProducts = productIds.filter(
      (id, index) => productIds.indexOf(id) !== index,
    );

    if (duplicatedProducts.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'duplicated products are not allowed',
        path: ['products'],
      });
    }
  });
