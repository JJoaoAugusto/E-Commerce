import { z } from "zod";
import {
  orderCreateSchema,
  orderUpdateSchema,
  orderReturnSchema,
} from "../schemas";
import { DeepPartial } from "typeorm";

export type OrderCreate = z.infer<typeof orderCreateSchema>;

export type OrderUpdate = DeepPartial<z.infer<typeof orderUpdateSchema>>;

export type OrderReturn = z.infer<typeof orderReturnSchema>;
