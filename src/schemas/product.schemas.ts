import { z } from "zod";

export const productSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  description: z.string(),
  quantity: z.number(),
  price: z.number().or(z.string()),
  sale: z.number().nullish().default(0),
  image: z.string(),
  category: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export const productCreateSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const productUpdateSchema = productCreateSchema.partial();
