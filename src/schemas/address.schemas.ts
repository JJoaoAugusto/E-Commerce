import { z } from "zod";
import { userSchema } from "./user.schemas";

export const addressSchema = z.object({
  id: z.number().positive(),
  zipCode: z.string().min(8).max(8),
  state: z.string().min(2).max(3),
  city: z.string().max(60),
  block: z.string().max(60),
  street: z.string().max(60),
  number: z.number(),
  user: userSchema,
});

export const addressCreateSchema = addressSchema.omit({
  id: true,
  user: true,
});

export const addressUpdateSchema = addressCreateSchema.partial();

export const addressReturnSchema = addressSchema.omit({
  user: true,
});
