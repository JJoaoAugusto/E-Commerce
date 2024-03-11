import { z } from "zod";
import {
  favoriteCreateSchema,
  favoriteReturnSchema,
  favoriteReadSchema,
} from "../schemas";

export type FavoriteCreate = z.infer<typeof favoriteCreateSchema>;

export type FavoriteReturn = z.infer<typeof favoriteReturnSchema>;

export type FavoriteRead = z.infer<typeof favoriteReadSchema>;
