import { z } from 'zod';

export const salesSchemas = z.object({
  userId: z.number(),
  saleId: z.number(),
  salePrice: z.number(),
});
