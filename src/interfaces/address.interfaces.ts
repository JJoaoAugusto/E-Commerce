import { z } from "zod";
import { addressCreateSchema, addressReturnSchema } from "../schemas";
import { DeepPartial } from "typeorm";
import { Address } from "../entities";

export type AddressCreate = z.infer<typeof addressCreateSchema>;

export type AddressUpdate = DeepPartial<Address>;

export type AddressReturn = z.infer<typeof addressReturnSchema>;
