import { z } from "zod";
import { userCreateSchema, userReadSchema, userReturnSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import { User } from "../entities";

export type UserCreate = z.infer<typeof userCreateSchema>;

export type UserUpdate = DeepPartial<User>;

export type UserReturn = z.infer<typeof userReturnSchema>;

export type UserRead = z.infer<typeof userReadSchema>;
