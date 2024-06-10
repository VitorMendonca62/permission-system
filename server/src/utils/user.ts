import { ZodError, ZodSchema } from 'zod';

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
