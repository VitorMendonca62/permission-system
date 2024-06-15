import { z } from 'zod';

export const salesSchemas = z.object({
  userId: z.preprocess(
    (userId) => Number(userId),
    z.number({ message: 'ID do usuário precisa ser um número' }),
  ),
  salePrice: z.preprocess(
    (salePrice) => Number((salePrice as string).replace(',', '.')),
    z.number({ message: 'Preço da venda precisa ser um número' }),
  ),
  saleId: z.preprocess(
    (saleId) => Number(saleId),
    z.number({ message: 'ID da venda precisa ser um número' }),
  ),
});
