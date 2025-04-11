import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Nome é obrigatório' })
      .min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string({ required_error: 'Email é obrigatório' }).email('Email inválido'),
    password: z
      .string({ required_error: 'Senha é obrigatória' })
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    role: z.string({ required_error: 'Função é obrigatória' }).default('employee'),
  }),
});

export const updateUserSchema = createUserSchema.partial();

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email é obrigatório' }).email('Email inválido'),
    password_hash: z
      .string({ required_error: 'Senha é obrigatória' })
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
