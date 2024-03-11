import { z } from "zod";
import { sessionSchema } from "../schemas";

export type SessionCreate = z.infer<typeof sessionSchema>;

export type SessionReturn = { token: string; userId: number; userName: string };
