import { findUserByToken } from '../../utils/user';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  const userId = Number(req.headers.userid);
  const user = await findUserByToken(token);

  if (user === null || user.id !== userId) {
    return res.status(400).json({
      error: true,
      msg: 'Algo de errado na autenticação',
      data: {},
    });
  }

  next();
};
