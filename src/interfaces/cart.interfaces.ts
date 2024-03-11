import { z } from "zod";
import {
  cartCreateSchema,
  cartReadSchema,
  cartReturnSchema,
  cartUpdateSchema,
} from "../schemas";

export type CartCreate = z.infer<typeof cartCreateSchema>;

export type CartUpdate = z.infer<typeof cartUpdateSchema>;

export type CartReturn = z.infer<typeof cartReturnSchema>;

export type CartRead = z.infer<typeof cartReadSchema>;
