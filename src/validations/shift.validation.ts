import { z } from 'zod';

export const shiftValidationSchema = z.object({
  body: z.object({
    timestamp: z
      .string()
      .optional()
      .refine(value => !value || !isNaN(Date.parse(value)), {
        message: 'Data/hora em formato inválido',
      }),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export const shiftHistoryValidationSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .optional()
      .refine(value => !value || !isNaN(Number(value)), { message: 'Limite deve ser um número' }),
    offset: z
      .string()
      .optional()
      .refine(value => !value || !isNaN(Number(value)), { message: 'Offset deve ser um número' }),
  }),
});
