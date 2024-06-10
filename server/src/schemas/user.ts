import { z } from "zod";

export const textsUserSchemaErrors = {
  username: {
    max: "Apelido muito longo",
    min: "Apelido muito curto",
  },
  email: { email: "Email inválido" },
  password: { min: "A senha é curta demais!" },
};

const userSchemas = {
  username: z
    .string()
    .min(8, textsUserSchemaErrors.username.min)
    .max(40, textsUserSchemaErrors.username.max),
  email: z.string().email(textsUserSchemaErrors.email.email),
  password: z.string().min(8, textsUserSchemaErrors.password.min),
};

export const userPostSchema = z.object({
  username: userSchemas.username,
  email: userSchemas.email,
  password: userSchemas.password,
});

