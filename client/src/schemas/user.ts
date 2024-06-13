import { z } from 'zod';

export const textsUserSchemaErrors = {
  username: {
    max: 'Apelido muito longo',
    min: 'Apelido muito curto',
  },
  email: { email: 'Email inválido' },
  password: { min: 'A senha é curta demais!' },
};

const userSchemas = {
  username: z
    .string()
    .min(6, textsUserSchemaErrors.username.min)
    .max(40, textsUserSchemaErrors.username.max),
  email: z.string().email(textsUserSchemaErrors.email.email),
  password: z.string().min(8, textsUserSchemaErrors.password.min),
  confirmPassword: z.string().min(8, textsUserSchemaErrors.password.min),
};

export const userPostSchema = z
  .object({
    username: userSchemas.username,
    email: userSchemas.email,
    password: userSchemas.password,
    confirmPassword: userSchemas.confirmPassword,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas precisam ser iguais.',
    path: ['confirmPassword'],
  });

export const userLoginSchema = z.object({
  email: userSchemas.email,
  password: userSchemas.password,
});
