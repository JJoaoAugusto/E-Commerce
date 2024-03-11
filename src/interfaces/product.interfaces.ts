import { z } from "zod";
import { productCreateSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import { Product } from "../entities";

export type ProductCreate = z.infer<typeof productCreateSchema>;

export type ProductUpdate = DeepPartial<Product>;
