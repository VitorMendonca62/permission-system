// Modules
import jwt from 'jsonwebtoken';

// Config
import authConfig from '../../config/auth';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(403).json({ msg: 'Token não fornecido', error: true });
  }

  try {
    jwt.verify(authToken, authConfig.secret);

    return next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Token inválido!',
      error: true,
      data: error,
    });
  }
};
