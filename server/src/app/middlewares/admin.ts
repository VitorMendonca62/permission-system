import { findUserByToken } from '../../utils/user';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  const user = await findUserByToken(token);

  if (user === null) {
    return res.status(404).json({
      error: true,
      msg: 'Usuário não existe',
      data: {},
    });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({
      error: true,
      msg: 'Você não tem permissão para acessar.',
      data: {},
    });
  }

  next();
};
