import { userSchema } from "./user.schemas";

export const sessionSchema = userSchema.pick({ email: true, password: true });
