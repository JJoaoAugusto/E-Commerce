import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(80),
  birth_date: z.date().or(z.string()),
  email: z.string().email().max(256),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  deletedAt: z.date().or(z.string()).nullish(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const userUpdateSchema = userCreateSchema.partial();

export const userReturnSchema = userSchema.omit({
  password: true,
});

export const userReadSchema = userReturnSchema.array();
