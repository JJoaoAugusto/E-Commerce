import { z } from "zod";
import { userSchema } from "./user.schemas";
import { productSchema } from "./product.schemas";

export const cartSchema = z.object({
  id: z.number().positive(),
  quantity: z.number().default(1),
  price: z.number().or(z.string()),
  user: userSchema,
  product: productSchema,
});

export const cartCreateSchema = cartSchema.omit({
  id: true,
  price: true,
  user: true,
  product: true,
});

export const cartUpdateSchema = cartCreateSchema.partial();

export const cartReturnSchema = cartSchema.omit({ user: true });

export const cartReadSchema = cartReturnSchema.array();
