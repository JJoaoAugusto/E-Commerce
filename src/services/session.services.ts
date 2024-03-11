import { compare } from "bcryptjs";
import { User } from "../entities";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces";
import { userRepository } from "../repositories";
import { sign } from "jsonwebtoken";
import { userReturnSchema } from "../schemas";

const create = async ({
  email,
  password,
}: SessionCreate): Promise<SessionReturn> => {
  const user: User | null = await userRepository.findOneBy({ email });
  if (!user) throw new AppError("Invalid credentials", 401);
  const samePassword: boolean = await compare(password, user.password);
  if (!samePassword) throw new AppError("Invalid credentials", 401);
  const token: string = sign(
    { admin: user.admin, userId: user.id },
    process.env.SECRET_KEY!,
    {
      subject: user.id.toString(),
      expiresIn: process.env.EXPIRES_IN!,
    }
  );
  const data = {
    token,
    userId: user.id,
    userName: user.name,
  };
  return data;
};

export default { create };
