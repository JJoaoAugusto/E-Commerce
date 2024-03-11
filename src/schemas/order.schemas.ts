import { z } from "zod";
import { userSchema } from "./user.schemas";
import { productSchema } from "./product.schemas";
import { addressSchema } from "./address.schemas";

// OrderItem

export const orderItemSchema = z.object({
  id: z.number().positive(),
  quantity: z.number().default(1),
  price: z.number(),
  product: productSchema,
});

export const orderItemCreateSchema = orderItemSchema.omit({
  id: true,
  quantity: true,
  price: true,
  product: true,
});

// Order

export const orderSchema = z.object({
  id: z.number().positive(),
  status: z.string(),
  user: userSchema,
  address: addressSchema,
  orderItems: orderItemSchema.array().optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export const orderCreateSchema = orderSchema.omit({
  id: true,
  status: true,
  user: true,
  address: true,
  orderItems: true,
  createdAt: true,
  updatedAt: true,
});

export const orderUpdateSchema = orderSchema.omit({
  id: true,
  user: true,
  address: true,
  orderItems: true,
  createdAt: true,
  updatedAt: true,
});

export const orderReturnSchema = orderSchema.omit({
  user: true,
  address: true,
  orderItems: true,
});
