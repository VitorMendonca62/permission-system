import { Request, Response } from 'express';
import { errorInServer } from '../../utils/general';
import { verifySchema } from '../../utils/user';
import { userPostSchema } from '../../schemas/user';
import CreateUserUseCase from '../../modules/user/useCases/CreateUser';

export class UserController {
  public async store(req: Request, res: Response) {
    // Verificar Schema
    const resultVerifySchema = verifySchema(req.body, userPostSchema);
    if (resultVerifySchema) {
      return res.status(resultVerifySchema.status).json(resultVerifySchema.msg);
    }

    try {
      const { username, email, password } = req.body;
      const user: IUserInCreate = { username, email, password };

      const createUserUseCase = new CreateUserUseCase();
      const response = await createUserUseCase.execute(user);
      return res.status(response.status).json(response);
      
    } catch (err: any) {
      console.log(err);
      const responseErrorInServer = errorInServer();
      return res
        .status(responseErrorInServer.status)
        .json(responseErrorInServer);
    }
  }
}
