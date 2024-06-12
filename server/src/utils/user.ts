import { ZodError, ZodSchema } from 'zod';
import { decode } from 'jsonwebtoken';
import ShowUser from '../modules/user/useCases/ShowUser';
import { Users } from '@prisma/client';

interface JwtPayload {
  id: string;
}

export function verifySchema(data: unknown, schema: ZodSchema) {
  try {
    schema.parse(data);
    return false;
  } catch (err) {
    if (err instanceof ZodError) {
      const error = err.errors[0];
      return {
        msg: error.message,
        error: true,
        type: error.path[0],
        status: 400,
      };
    }
  }
}

export async function findUserByToken(
  token: string,
): Promise<Users | null> {
  const decodedToken = decode(token) as JwtPayload;
  const id = decodedToken.id;
  const showUser = new ShowUser();

  return await showUser.verifyWithId(Number(id));
}
