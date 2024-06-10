import { Request, Response } from 'express';
import { verifySchema } from '../../utils/user';
import { userLoginSchema } from '../../schemas/user';
import { errorInServer } from '../../utils/general';
import LoginUser from '../../modules/user/useCases/LoginUser';

export class SessionController {
  async login(req: Request, res: Response) {
    const resultVerifySchema = verifySchema(req.body, userLoginSchema);
    if (resultVerifySchema) {
      return res.status(resultVerifySchema.status).json(resultVerifySchema);
    }

    try {
      const { email, password } = req.body;

      const loginUser = new LoginUser();

      const response = await loginUser.execute(email, password);

      if (response.error) {
        return res.status(response.status).json(response);
      }

      return res
        .setHeader('authorization', response.token as string)
        .status(response.status)
        .json(response);
    } catch (err: any) {
      const responseErrorInServer = errorInServer(err);

      return res
        .status(responseErrorInServer.status)
        .json(responseErrorInServer);
    }
  }
}
