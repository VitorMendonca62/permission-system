import { Response, Request } from 'express';
import { salesSchemas } from '../../schemas/sale';
import { verifySchema } from '../../utils/user';
import { errorInServer, transformInNumber } from '../../utils/general';
import CreateSaleUseCase from '../../modules/sales/useCases/CreateSale';
import { decode } from 'jsonwebtoken';
import { Role } from '@prisma/client';
import ShowSales from '../../modules/sales/useCases/ShowSales';

interface JwtPayload {
  id: number;
  role: Role;
}
export class SalesController {
  public async index(req: Request, res: Response) {
    const showSales = new ShowSales();
    const response = await showSales.showAll();
    return res.status(response.status).json(response);
  }

  public async show(req: Request, res: Response) {
    // Verificacao se o id do cookie é o mesmo do passado
    const id = req.params.id as unknown as number;

    const token = req.headers.authorization as string;
    const showSales = new ShowSales();
    const response = await showSales.showUserSale(Number(id), token);
    return res.status(response.status).json(response);
  }

  public async store(req: Request, res: Response) {
    // Verificar Schema
    const {
      userId: userIdString,
      saleId: saleIdString,
      salePrice: salePriceString,
    } = req.body;

    const [userId, saleId, salePrice] = transformInNumber([
      userIdString as string,
      saleIdString as string,
      salePriceString as string,
    ]);

    const resultVerifySchema = verifySchema(
      { userId, saleId, salePrice },
      salesSchemas,
    );
    if (resultVerifySchema) {
      return res.status(resultVerifySchema.status).json(resultVerifySchema);
    }

    try {
      // Vê se o cookies bate com o user a ser criado
      const token = req.headers.authorization as string;
      const userDecoded = decode(token) as JwtPayload;

      if (userIdString != userDecoded.id && userDecoded.role == 'user') {
        return res.status(400).json({
          error: true,
          msg: 'ID do usuário não bate com ID do cookie',
          data: {},
        });
      }

      const sale: ICreateSale = { userId, saleId, salePrice };
      const createSaleUseCase = new CreateSaleUseCase();
      const response = await createSaleUseCase.execute(sale);
      return res.status(response.status).json(response);
    } catch (err) {
      const responseErrorInServer = errorInServer(err);
      return res
        .status(responseErrorInServer.status)
        .json(responseErrorInServer);
    }
  }
}
