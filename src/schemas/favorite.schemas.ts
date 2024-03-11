import { z } from "zod";
import { userSchema } from "./user.schemas";
import { productSchema } from "./product.schemas";

export const favoriteSchema = z.object({
  id: z.number().positive(),
  user: userSchema,
  product: productSchema,
});

export const favoriteCreateSchema = favoriteSchema.omit({
  id: true,
  user: true,
  product: true,
});

export const favoriteReturnSchema = favoriteSchema.omit({ user: true });

export const favoriteReadSchema = favoriteReturnSchema.array();
